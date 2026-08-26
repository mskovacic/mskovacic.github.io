import { createClient } from "../supabase/client";

export interface GameRoom {
  id: string;
  host_id: string;
  player1_id: string | null;
  player2_id: string | null;
  status: "waiting" | "playing" | "completed";
  winner: string | null;
  completion_reason: "win" | "forfeit" | "both_left" | null;
  player1_last_seen_at: string | null;
  player2_last_seen_at: string | null;
  player1_rematch_ready: boolean;
  player2_rematch_ready: boolean;
  created_at: string;
  updated_at: string;
}

export interface GameState {
  id: string;
  room_id: string;
  game_state: number;
  player1_ships: Array<{ name: string; coordinates: Array<{ row: number; column: number }> }>;
  player2_ships: Array<{ name: string; coordinates: Array<{ row: number; column: number }> }>;
  player1_shots: Array<{ row: number; column: number }>;
  player2_shots: Array<{ row: number; column: number }>;
  player1_placed_ships: boolean;
  player2_placed_ships: boolean;
  created_at: string;
  updated_at: string;
}

function createPlayerId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = Math.random() * 16 | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

/**
 * Get or create a persistent player ID stored in localStorage
 */
export function getPersistentPlayerId(): string {
  const PLAYER_ID_KEY = "battleship_player_id";
  
  if (typeof window === "undefined") return createPlayerId();
  
  let playerId = window.localStorage.getItem(PLAYER_ID_KEY);
  if (!playerId) {
    playerId = createPlayerId();
    window.localStorage.setItem(PLAYER_ID_KEY, playerId);
  }
  
  return playerId;
}

/**
 * Find active games for a player (rooms where player is participant and game is not completed)
 */
export async function getPlayerActiveGames(playerId: string): Promise<GameRoom[]> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from("battleship_rooms")
    .select("*")
    .or(`player1_id.eq.${playerId},player2_id.eq.${playerId}`)
    .neq("status", "completed")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Create a new game room and return the room ID
 */
export async function createGameRoom(playerId?: string): Promise<string> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const player1Id = playerId || createPlayerId();

  const { data, error } = await supabase
    .from("battleship_rooms")
    .insert({
      host_id: player1Id,
      player1_id: player1Id,
      player1_last_seen_at: new Date().toISOString(),
      status: "waiting",
    })
    .select("id")
    .single();

  if (error) throw error;

  // Create the snapshot with the room, rather than when a guest joins. The
  // host can position ships while waiting, so delaying this would make those
  // placements impossible to persist and a joining guest could overwrite them
  // with an empty snapshot.
  const { error: stateError } = await supabase
    .from("battleship_game_states")
    .insert({
      room_id: data.id,
      game_state: 0,
      player1_ships: [],
      player2_ships: [],
      player1_shots: [],
      player2_shots: [],
    });

  if (stateError) throw stateError;
  return data.id;
}

/**
 * Join an existing game room as player 2
 */
export async function joinGameRoom(roomId: string, playerId?: string): Promise<boolean> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const player2Id = playerId || createPlayerId();

  const { data: room, error: fetchError } = await supabase
    .from("battleship_rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (fetchError) throw fetchError;

  if (room.status !== "waiting") {
    throw new Error("Game room is not available");
  }

  const { data: claimedRoom, error: updateError } = await supabase
    .from("battleship_rooms")
    .update({
      player2_id: player2Id,
      status: "playing",
      player2_last_seen_at: new Date().toISOString(),
    })
    .eq("id", roomId)
    .eq("status", "waiting")
    .is("player2_id", null)
    .select("id");

  if (updateError) throw updateError;
  if (!claimedRoom?.length) {
    throw new Error("Game room was just claimed by another guest");
  }

  return true;
}

export async function touchGameRoomPlayer(roomId: string, playerNumber: 1 | 2): Promise<void> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const column = playerNumber === 1 ? "player1_last_seen_at" : "player2_last_seen_at";
  const { error } = await supabase
    .from("battleship_rooms")
    .update({ [column]: new Date().toISOString() })
    .eq("id", roomId)
    .neq("status", "completed");

  if (error) throw error;
}

/**
 * Mark a player's session as gone and resolve the room when both players have
 * left. The lifecycle RPC uses the last-seen timestamps to complete the room
 * atomically, so a stale room cannot remain rejoinable indefinitely.
 */
export async function leaveGameRoom(roomId: string, playerNumber: 1 | 2): Promise<GameRoom | null> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const column = playerNumber === 1 ? "player1_last_seen_at" : "player2_last_seen_at";
  const { error } = await supabase
    .from("battleship_rooms")
    .update({ [column]: new Date(0).toISOString() })
    .eq("id", roomId)
    .neq("status", "completed");

  if (error) throw error;
  return resolveInactiveGameRoom(roomId);
}

export async function completeGameRoom(
  roomId: string,
  winner: "player1" | "player2",
  completionReason: "win" | "forfeit" = "win"
): Promise<void> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { error } = await supabase
    .from("battleship_rooms")
    .update({
      status: "completed",
      winner,
      completion_reason: completionReason,
      player1_rematch_ready: false,
      player2_rematch_ready: false,
    })
    .eq("id", roomId)
    .eq("status", "playing");

  if (error) throw error;
}

export async function resolveInactiveGameRoom(roomId: string): Promise<GameRoom | null> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase.rpc("resolve_battleship_inactive_room", {
    target_room_id: roomId,
  });

  if (error) throw error;
  return data;
}

export async function requestGameRematch(roomId: string, playerId: string): Promise<GameRoom> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase.rpc("request_battleship_rematch", {
    target_room_id: roomId,
    requesting_player_id: playerId,
  });

  if (error) throw error;
  return data;
}

/**
 * Get current game state for a room
 */
export async function getGameState(roomId: string): Promise<GameState | null> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from("battleship_game_states")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code === "PGRST116") {
    return null; // No state found
  }

  if (error) throw error;
  return data;
}

/**
 * Get a game room by ID
 */
export async function getGameRoom(roomId: string): Promise<GameRoom | null> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from("battleship_rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (error && error.code === "PGRST116") {
    return null; // Not found
  }

  if (error) throw error;
  return data;
}

/**
 * List rooms where exactly one player is waiting for a second player.
 */
export async function listWaitingRooms(): Promise<GameRoom[]> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from("battleship_rooms")
    .select("*")
    .eq("status", "waiting")
    .not("player1_id", "is", null)
    .is("player2_id", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Update game state
 */
export async function updateGameState(
  roomId: string,
  updates: Partial<GameState>
): Promise<GameState> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from("battleship_game_states")
    .update(updates)
    .eq("room_id", roomId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Record a game event
 */
export async function recordGameEvent(
  roomId: string,
  eventType: string,
  playerNumber: number | null = null,
  payload: any = null
): Promise<void> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { error } = await supabase.from("battleship_events").insert({
    room_id: roomId,
    event_type: eventType,
    player_number: playerNumber,
    payload,
  });

  if (error) throw error;
}

/**
 * Subscribe to game state changes for a room
 */
export function subscribeToGameState(
  roomId: string,
  callback: (state: GameState) => void
): (() => void) | null {
  const supabase = createClient();
  if (!supabase) return null;

  const subscription = supabase
    .channel(`battleship_state:${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "battleship_game_states",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        // A deleted room cascades to its state row. Do not feed the empty
        // DELETE payload into the game reducer while the room is completing.
        const nextState = payload.new as Partial<GameState>;
        if (!nextState?.room_id) return;
        callback(nextState as GameState);
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(subscription);
  };
}

/**
 * Subscribe to game events for a room
 */
export function subscribeToGameEvents(
  roomId: string,
  callback: (event: any) => void
): (() => void) | null {
  const supabase = createClient();
  if (!supabase) return null;

  const subscription = supabase
    .channel(`battleship_events:${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "battleship_events",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        const event = payload.new as Record<string, unknown>;
        if (!event?.id) return;
        callback(event);
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(subscription);
  };
}

/**
 * Subscribe to waiting room changes and refresh the room list automatically.
 */
export function subscribeToWaitingRooms(
  callback: (rooms: GameRoom[]) => void
): (() => void) | null {
  const supabase = createClient();
  if (!supabase) return null;

  const subscription = supabase
    .channel("battleship_waiting_rooms")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "battleship_rooms",
      },
      async () => {
        try {
          const rooms = await listWaitingRooms();
          callback(rooms);
        } catch (error) {
          console.error("Failed to refresh waiting rooms from realtime listener:", error);
        }
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(subscription);
  };
}

/**
 * Subscribe to room changes
 */
export function subscribeToGameRoom(
  roomId: string,
  callback: (room: GameRoom) => void
): (() => void) | null {
  const supabase = createClient();
  if (!supabase) return null;

  const subscription = supabase
    .channel(`battleship_room:${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "battleship_rooms",
        filter: `id=eq.${roomId}`,
      },
      (payload) => {
        const nextRoom = payload.new as Partial<GameRoom>;
        if (!nextRoom?.id) return;
        callback(nextRoom as GameRoom);
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(subscription);
  };
}

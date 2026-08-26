import { useReducer, useEffect, useState, useCallback, useRef } from "react";
import {
  checkIfSameCoordinate,
  makeNewMessages,
  makeMsgForWrongTiles,
  validateShipTiles,
  makeMsgForSelectingTiles,
  checkIfLstIncludesCoordinate,
  isWinner,
  getLastElm,
  findSinkShipNameOfCoordinate,
  makeMsgForSinkShip,
  makeMsgForShot,
  generateRandomShips,
} from "../helpers";
import {
  NEW_OPPONENT,
  NEW_MESSAGE,
  NEW_GAME,
  initialState,
  INITIAL_MSG_NO_OPPONENT,
  INITIAL_MSG_HAVE_OPPONENT,
  MSG_HAVE_OPPONENT,
  MSG_NO_OPPONENT,
  ships,
  CLEAR_TILES,
  SELECT_TILE,
  CONFIRM_TILES,
  MSG_INVALID_TILES,
  COMPLETE_SELECTION,
  SET_OPPONENT_SHIPS,
  OPPONENTS_TURN,
  MSG_ATTACK,
  MSG_DEFEND,
  MSG_WAITING_FOR_PLAYER,
  MSG_LOSE,
  MSG_WIN,
  MSG_OPPONENT_PLACING_SHIPS,
  MSG_ENTER_NEW_GAME,
  SHOT,
  OPPONENT_SHOT,
  END,
  RANDOM_PLACEMENT,
} from "../constants";
import {
  createGameRoom,
  joinGameRoom,
  getGameState,
  getGameRoom,
  listWaitingRooms,
  updateGameState,
  recordGameEvent,
  subscribeToGameState,
  subscribeToGameEvents,
  subscribeToWaitingRooms,
  subscribeToGameRoom,
  getPersistentPlayerId,
  getPlayerActiveGames,
  touchGameRoomPlayer,
  completeGameRoom,
  resolveInactiveGameRoom,
  leaveGameRoom,
  requestGameRematch,
  type GameRoom,
} from "../../../lib/supabase/supabaseGame";

const STORAGE_KEY = "battleship_username";

const getStoredUsername = () => {
  if (typeof window === "undefined") return "";

  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
};

const getStoredPlayerId = () => {
  if (typeof window === "undefined") return "";
  try {
    return getPersistentPlayerId();
  } catch {
    return "";
  }
};

const useGame = () => {
  const autoJoinAttemptedRef = useRef(false);
  const returnToCityRef = useRef(false);
  const processedEventIdsRef = useRef<Set<string>>(new Set());
  const lastShipsSyncKeyRef = useRef<string | null>(null);
  const terminalStateHandledRef = useRef<number | null>(null);
  const lastRoomUpdatedAtRef = useRef(0);
  const latestRoomRef = useRef<GameRoom | null>(null);
  const pendingLeaveTimerRef = useRef<number | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerNumber, setPlayerNumber] = useState<1 | 2 | null>(null);
  const [username, setUsernameState] = useState<string>(getStoredUsername());
  const [playerId] = useState<string>(getStoredPlayerId());
  const [phase, setPhase] = useState<"username" | "lobby" | "game">(
    getStoredUsername() ? "lobby" : "username"
  );
  const [availableRooms, setAvailableRooms] = useState<Array<{ id: string; created_at: string }>>([]);
  const [activeGames, setActiveGames] = useState<Array<{ id: string; status: string }>>([]);
  const [currentRoom, setCurrentRoom] = useState<GameRoom | null>(null);
  const [areRoomsLoading, setAreRoomsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncStateToSupabase = useCallback(
    async (updates: any) => {
      if (!roomId) return;
      try {
        await updateGameState(roomId, updates);
      } catch (err) {
        console.error("Failed to sync state:", err);
      }
    },
    [roomId]
  );

  const recordEvent = useCallback(
    async (
      eventType: string,
      payload: any = null,
      playerNum: number | null = null
    ) => {
      if (!roomId) return;
      try {
        await recordGameEvent(roomId, eventType, playerNum, payload);
      } catch (err) {
        console.error("Failed to record event:", err);
      }
    },
    [roomId]
  );

  const reducers: any = {
    [NEW_OPPONENT](state: any, { opponent }: any) {
      // Room updates arrive repeatedly (once from Realtime and again from the
      // fallback poll). Do not reset the local game every time the same room
      // snapshot is observed. In particular, the persisted game-state row is
      // initially `0`; that is a database bootstrap value, not a signal that a
      // joined room is still waiting.
      if (state.gotInitialOpponent && state.opponent === opponent) return state;

      const newGameState = opponent
        ? state.gameState === 0 ? 1 : state.gameState
        : 0;
      return {
        ...state,
        opponent,
        gotInitialOpponent: true,
        gameState: newGameState,
      };
    },
    [NEW_MESSAGE](state: any, { message }: any) {
      const { messages } = state;
      // Realtime and polling can cause the same transition effect to run more
      // than once. Keep the chat readable while still allowing the same text
      // to be sent again after another message has appeared.
      if (messages[messages.length - 1]?.message === message) return state;
      const newMessages = makeNewMessages(messages, message);
      return { ...state, haveSendInitialMsg: true, messages: newMessages };
    },
    [NEW_GAME](state: any) {
      const { messages } = state;
      const newMessages = makeNewMessages(messages, MSG_ENTER_NEW_GAME);
      return {
        ...initialState(),
        messages: newMessages,
        roomId: state.roomId,
        playerNumber: state.playerNumber,
      };
    },
    [CLEAR_TILES](state: any) {
      return { ...state, chosenTiles: [] };
    },
    [SELECT_TILE](state: any, { coordinate: selectedCoordinate }: any) {
      const { myShips, chosenTiles } = state;
      for (const { coordinates } of myShips) {
        const isOccupied = checkIfLstIncludesCoordinate(
          coordinates,
          selectedCoordinate
        );
        if (isOccupied) return state;
      }

      const isSelected = checkIfLstIncludesCoordinate(
        chosenTiles,
        selectedCoordinate
      );
      const newChosenTiles = isSelected
        ? chosenTiles.filter(
            (coordinate: any) =>
              !checkIfSameCoordinate(coordinate, selectedCoordinate)
          )
        : chosenTiles.concat([selectedCoordinate]);

      return { ...state, chosenTiles: newChosenTiles };
    },
    [CONFIRM_TILES](state: any) {
      const { shipTilesState, chosenTiles, messages, myShips } = state;
      const { name, numOfTiles } = ships[shipTilesState];
      const numOfChosenTiles = chosenTiles.length;

      const wrongNumOfTiles = numOfTiles !== numOfChosenTiles;
      if (wrongNumOfTiles) {
        const newMsg = makeMsgForWrongTiles(name, numOfTiles);
        const newMessages = makeNewMessages(messages, newMsg);
        return { ...state, messages: newMessages };
      }

      const sameRow = validateShipTiles(chosenTiles, "row", "column");
      const sameColumn = validateShipTiles(chosenTiles, "column", "row");

      if (!sameRow && !sameColumn) {
        const newMessages = makeNewMessages(messages, MSG_INVALID_TILES);
        return { ...state, messages: newMessages };
      }

      const newShip = { name, coordinates: chosenTiles };
      const newMyShips = myShips.concat([newShip]);
      const newShipTilesState = shipTilesState + 1;

      return {
        ...state,
        myShips: newMyShips,
        shipTilesState: newShipTilesState,
        chosenTiles: [],
      };
    },
    [COMPLETE_SELECTION](state: any) {
      return { ...state, gameState: 2 };
    },
    [RANDOM_PLACEMENT](state: any) {
      const randomShips = generateRandomShips(ships);
      return {
        ...state,
        myShips: randomShips,
        shipTilesState: ships.length,
        chosenTiles: [],
      };
    },
    [SET_OPPONENT_SHIPS](state: any, { opponentShips }: any) {
      const { gameState } = state;
      if (!Array.isArray(opponentShips) || opponentShips.length === 0) return state;
      // Player 1 always opens the attack when both layouts are ready. This
      // makes simultaneous placement deterministic instead of leaving both
      // clients in attack mode (or both waiting on the other client).
      const newGameState = gameState === 2
        ? state.playerNumber === 1 ? 3 : 4
        : gameState;
      return { ...state, opponentShips, gameState: newGameState };
    },
    [OPPONENTS_TURN](state: any) {
      return { ...state, gameState: 4 };
    },
    [SHOT](state: any, { coordinate }: any) {
      const { opponentShipsShot, opponentShips } = state;
      const alreadyShot = checkIfLstIncludesCoordinate(
        opponentShipsShot,
        coordinate
      );
      if (alreadyShot) return state;

      const newOpponentShipsShot = opponentShipsShot.concat([coordinate]);
      const hasWon = isWinner(opponentShips, newOpponentShipsShot);

      const newGameState = hasWon ? 5 : 4;

      return {
        ...state,
        opponentShipsShot: newOpponentShipsShot,
        gameState: newGameState,
      };
    },
    [OPPONENT_SHOT](state: any, { coordinate }: any) {
      const { myShipsShot } = state;
      const newMyShipsShot = myShipsShot.concat([coordinate]);
      return {
        ...state,
        myShipsShot: newMyShipsShot,
        gameState: 3,
      };
    },
    [END](state: any) {
      return { ...state, gameState: 6 };
    },
    UPDATE_STATE(state: any, { payload }: any) {
      // Update from Supabase
      const incomingMyShips = state.playerNumber === 1
        ? payload.player1_ships
        : payload.player2_ships;
      const incomingOpponentShips = state.playerNumber === 1
        ? payload.player2_ships
        : payload.player1_ships;
      const myShipsFromPayload = incomingMyShips ?? state.myShips;
      const opponentShipsFromPayload = Array.isArray(incomingOpponentShips)
        && incomingOpponentShips.length === 0
        ? state.opponentShips
        : incomingOpponentShips ?? state.opponentShips;
      const hasOpponentShips = Array.isArray(opponentShipsFromPayload)
        && opponentShipsFromPayload.length > 0;
      const placementComplete = Array.isArray(myShipsFromPayload)
        && myShipsFromPayload.length >= ships.length;
      const persistedGameState = Number(payload.game_state);
      // `game_state` is retained for completed games, but the active turn and
      // placement state are local transitions driven by events. Treating the
      // initial persisted 0 as authoritative was the source of the board
      // jumping back to the waiting screen after a player joined or placed.
      let nextGameState = state.gameState;
      if (persistedGameState >= 5) {
        nextGameState = persistedGameState;
      } else if (state.gameState === 0 && state.opponent) {
        nextGameState = 1;
      } else if (state.gameState === 1 && placementComplete) {
        nextGameState = 2;
      } else if (state.gameState === 2 && hasOpponentShips) {
        nextGameState = state.playerNumber === 1 ? 3 : 4;
      }

      return {
        ...state,
        gameState: nextGameState,
        shipTilesState: Math.max(state.shipTilesState, Array.isArray(myShipsFromPayload) ? myShipsFromPayload.length : 0),
        opponentShips: opponentShipsFromPayload,
        myShips: myShipsFromPayload,
        opponentShipsShot: state.playerNumber === 1
          ? payload.player2_shots ?? state.opponentShipsShot
          : payload.player1_shots ?? state.opponentShipsShot,
        myShipsShot: state.playerNumber === 1
          ? payload.player1_shots ?? state.myShipsShot
          : payload.player2_shots ?? state.myShipsShot,
      };
    },
  };

  const [state, dispatch] = useReducer(
    (state: any, action: any) => {
      return reducers[action.type]?.(state, action) || state;
    },
    {
      ...initialState(),
      roomId: null,
      playerNumber: null,
    }
  );

  const {
    gotInitialOpponent,
    opponent,
    haveSendInitialMsg,
    gameState,
    myShips,
    opponentShips,
    messages,
    shipTilesState,
    chosenTiles,
    opponentShipsShot,
    myShipsShot,
  } = state;

  const saveUsername = useCallback((nextUsername: string) => {
    const trimmedUsername = nextUsername.trim();
    if (!trimmedUsername) return false;

    setUsernameState(trimmedUsername);
    window.localStorage.setItem(STORAGE_KEY, trimmedUsername);
    setPhase("lobby");
    return true;
  }, []);

  const startNewGame = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if player already has active games
      const existingGames = await getPlayerActiveGames(playerId);
      if (existingGames.length > 0) {
        throw new Error("You already have an active game. Finish or abandon it before starting a new one.");
      }

      const newRoomId = await createGameRoom(playerId);
      setRoomId(newRoomId);
      setPlayerNumber(1);
      setPhase("game");
      window.history.replaceState({}, "", `?room=${newRoomId}`);
      dispatch({ type: NEW_MESSAGE, message: MSG_HAVE_OPPONENT });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create game room";
      console.error("Failed to create game room:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, playerId]);

  const joinExistingGame = useCallback(async (roomCode: string) => {
    const trimmedRoomCode = roomCode.trim();
    if (!trimmedRoomCode) {
      setError("Please enter a room code to join.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const room = await getGameRoom(trimmedRoomCode);
      if (!room) {
        throw new Error("That room does not exist.");
      }

      // Check if player is already in this room
      const isPlayerInRoom = room.player1_id === playerId || room.player2_id === playerId;
      
      if (isPlayerInRoom) {
        // Player is rejoining their own game
        const playerNum = room.player1_id === playerId ? 1 : 2;
        setRoomId(trimmedRoomCode);
        setPlayerNumber(playerNum);
        setCurrentRoom(room);
        setPhase("game");
        window.history.replaceState({}, "", `?room=${trimmedRoomCode}`);
        dispatch({ type: NEW_MESSAGE, message: MSG_HAVE_OPPONENT });
        return;
      }

      // Prevent joining a new room if player already has active games
      if (!isPlayerInRoom) {
        const existingGames = await getPlayerActiveGames(playerId);
        if (existingGames.length > 0) {
          throw new Error("You already have an active game. Finish or abandon it before joining another one.");
        }
      }

      if (room.status !== "waiting") {
        throw new Error("That room is already in progress or completed.");
      }

      if (!room.player1_id || room.player2_id) {
        throw new Error("That room is not available for a new player.");
      }

      await joinGameRoom(trimmedRoomCode, playerId);
      setRoomId(trimmedRoomCode);
      setPlayerNumber(2);
      setPhase("game");
      window.history.replaceState({}, "", `?room=${trimmedRoomCode}`);
      dispatch({ type: NEW_MESSAGE, message: MSG_HAVE_OPPONENT });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to join game room";
      console.error("Failed to join game room:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, playerId]);

  // Invited players arrive with the room in the URL. Automatically hydrate the
  // Battleship session so neither player has to paste a room code manually.
  useEffect(() => {
    if (typeof window === "undefined" || !username || autoJoinAttemptedRef.current) return;
    const invitedRoomId = new URLSearchParams(window.location.search).get("room");
    if (!invitedRoomId) return;

    autoJoinAttemptedRef.current = true;
    void joinExistingGame(invitedRoomId);
  }, [joinExistingGame, username]);

  useEffect(() => {
    if (phase !== "lobby") return;

    let isMounted = true;

    const loadRooms = async () => {
      setAreRoomsLoading(true);
      try {
        const rooms = await listWaitingRooms();
        const active = await getPlayerActiveGames(playerId);
        if (isMounted) {
          setAvailableRooms(rooms.map((room) => ({ id: room.id, created_at: room.created_at })));
          setActiveGames(active.map((room) => ({ id: room.id, status: room.status })));
        }
      } catch (err) {
        console.error("Failed to load waiting rooms:", err);
      } finally {
        if (isMounted) {
          setAreRoomsLoading(false);
        }
      }
    };

    void loadRooms();

    const unsubscribe = subscribeToWaitingRooms((rooms) => {
      if (!isMounted) return;
      setAvailableRooms(rooms.map((room) => ({ id: room.id, created_at: room.created_at })));
    });

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [phase, playerId]);

  // Subscribe to game state changes
  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = subscribeToGameState(roomId, (newState) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: newState,
      });
    });

    return () => unsubscribe?.();
  }, [roomId]);

  // Keep both players synchronized with the room itself. This is what wakes the
  // host when a guest joins and communicates completed-game/rematch status.
  useEffect(() => {
    if (!roomId || playerNumber === null) return;

    let isMounted = true;
    const applyRoom = (room: GameRoom) => {
      if (!isMounted) return;
      const roomUpdatedAt = Date.parse(room.updated_at);
      if (Number.isFinite(roomUpdatedAt) && roomUpdatedAt < lastRoomUpdatedAtRef.current) return;
      // A delayed REST response must not roll a realtime `playing` room back
      // to `waiting` after the second player has already been claimed.
      if (latestRoomRef.current?.status === "playing" && room.status === "waiting") return;
      if (Number.isFinite(roomUpdatedAt)) lastRoomUpdatedAtRef.current = roomUpdatedAt;
      latestRoomRef.current = room;
      setCurrentRoom(room);
      dispatch({ type: NEW_OPPONENT, opponent: Boolean(room.player1_id && room.player2_id) });

      if (room.status === "completed") {
        const didWin = room.winner === `player${playerNumber}`;
        dispatch({ type: "UPDATE_STATE", payload: { game_state: didWin ? 5 : 6 } });
      }
    };

    const refreshRoom = async () => {
      try {
        const room = await getGameRoom(roomId);
        if (!room) return;

        applyRoom(room);
        if (room.status === "playing") {
          const gameState = await getGameState(roomId);
          if (gameState && isMounted) {
            dispatch({ type: "UPDATE_STATE", payload: gameState });
          }
        }
      } catch (err) {
        console.error("Failed to load game room:", err);
      }
    };

    void refreshRoom();
    // Postgres Changes is the fast path; polling keeps the host moving if the
    // project has Realtime disabled or its websocket is temporarily offline.
    const refreshIntervalId = window.setInterval(() => void refreshRoom(), 3_000);

    const unsubscribe = subscribeToGameRoom(roomId, applyRoom);
    return () => {
      isMounted = false;
      window.clearInterval(refreshIntervalId);
      unsubscribe?.();
    };
  }, [roomId, playerNumber]);

  // Presence is persisted so a reconnecting player (or the scheduled database
  // job) can award a forfeit after an opponent has been gone for one minute.
  useEffect(() => {
    if (!roomId || playerNumber === null) return;

    const reportPresence = async () => {
      try {
        await touchGameRoomPlayer(roomId, playerNumber);
        await resolveInactiveGameRoom(roomId);
      } catch (err) {
        console.error("Failed to update game presence:", err);
      }
    };

    void reportPresence();
    const intervalId = window.setInterval(() => void reportPresence(), 15_000);
    return () => window.clearInterval(intervalId);
  }, [roomId, playerNumber]);

  // Leaving the Battleship route is an explicit presence change. Delay the
  // write slightly so React StrictMode's development-only effect replay does
  // not mark a freshly mounted player as gone.
  useEffect(() => {
    if (!roomId || playerNumber === null || typeof window === "undefined") return;

    if (pendingLeaveTimerRef.current !== null) {
      window.clearTimeout(pendingLeaveTimerRef.current);
      pendingLeaveTimerRef.current = null;
    }

    return () => {
      const leavingRoomId = roomId;
      const leavingPlayerNumber = playerNumber;
      pendingLeaveTimerRef.current = window.setTimeout(() => {
        pendingLeaveTimerRef.current = null;
        void leaveGameRoom(leavingRoomId, leavingPlayerNumber).catch((error) => {
          console.warn("Failed to mark Battleship player as left:", error);
        });
      }, 750);
    };
  }, [roomId, playerNumber]);

  // Subscribe to game events
  useEffect(() => {
    if (!roomId || playerNumber === null) return;

    const unsubscribe = subscribeToGameEvents(roomId, (event) => {
      // Only process events from the opponent
      if (event.player_number === playerNumber) return;
      if (event.id) {
        const eventId = String(event.id);
        if (processedEventIdsRef.current.has(eventId)) return;
        processedEventIdsRef.current.add(eventId);
        // Keep this bounded for long-lived rooms.
        if (processedEventIdsRef.current.size > 500) {
          const first = processedEventIdsRef.current.values().next().value;
          if (first) processedEventIdsRef.current.delete(first);
        }
      }

      switch (event.event_type) {
        case "ships_placed":
          dispatch({
            type: SET_OPPONENT_SHIPS,
            opponentShips: event.payload,
          });
          break;
        case "shot":
          dispatch({
            type: OPPONENT_SHOT,
            coordinate: event.payload,
          });
          break;
        case "end":
          dispatch({ type: END });
          break;
      }
    });

    return () => unsubscribe?.();
  }, [roomId, playerNumber]);


  useEffect(() => {
    if (gotInitialOpponent) {
      const message = opponent
        ? haveSendInitialMsg
          ? MSG_HAVE_OPPONENT
          : INITIAL_MSG_HAVE_OPPONENT
        : haveSendInitialMsg
        ? MSG_NO_OPPONENT
        : INITIAL_MSG_NO_OPPONENT;

      dispatch({ type: NEW_MESSAGE, message });
    }
  }, [opponent]);

  useEffect(() => {
    switch (gameState) {
      case 2:
        if (Array.isArray(opponentShips) && opponentShips.length > 0) {
          return dispatch({ type: SET_OPPONENT_SHIPS, opponentShips });
        }
        dispatch({ type: NEW_MESSAGE, message: MSG_OPPONENT_PLACING_SHIPS });
        break;
      case 3:
        const opponentLastShot = getLastElm(myShipsShot);
        if (opponentLastShot) {
          const shotMsg = makeMsgForShot(false, myShips, opponentLastShot);
          dispatch({ type: NEW_MESSAGE, message: shotMsg });

          const justSinkShipName = findSinkShipNameOfCoordinate(
            myShips,
            opponentLastShot,
            myShipsShot
          );
          if (justSinkShipName) {
            const sinkMsg = makeMsgForSinkShip(false, justSinkShipName);
            dispatch({ type: NEW_MESSAGE, message: sinkMsg });
          }
        }
        dispatch({ type: NEW_MESSAGE, message: MSG_ATTACK });
        break;
      case 4:
        const myLastShot = getLastElm(opponentShipsShot);
        if (myLastShot) {
          const shotMsg = makeMsgForShot(true, opponentShips, myLastShot);
          dispatch({ type: NEW_MESSAGE, message: shotMsg });

          const justSinkShipName = findSinkShipNameOfCoordinate(
            opponentShips,
            myLastShot,
            opponentShipsShot
          );
          if (justSinkShipName) {
            const sinkMsg = makeMsgForSinkShip(true, justSinkShipName);
            dispatch({ type: NEW_MESSAGE, message: sinkMsg });
          }
        }

        dispatch({ type: NEW_MESSAGE, message: MSG_DEFEND });
        break;
      case 5:
        if (terminalStateHandledRef.current === 5) break;
        terminalStateHandledRef.current = 5;
        dispatch({ type: NEW_MESSAGE, message: MSG_WIN });
        if (roomId && playerNumber !== null) {
          void completeGameRoom(roomId, `player${playerNumber}` as "player1" | "player2");
          void recordEvent("end", null, playerNumber);
        }
        if (!returnToCityRef.current && typeof window !== "undefined") {
          returnToCityRef.current = true;
          window.setTimeout(() => window.location.assign("/lobby"), 1800);
        }
        break;
      case 6:
        if (terminalStateHandledRef.current === 6) break;
        terminalStateHandledRef.current = 6;
        dispatch({ type: NEW_MESSAGE, message: MSG_LOSE });
        if (!returnToCityRef.current && typeof window !== "undefined") {
          returnToCityRef.current = true;
          window.setTimeout(() => window.location.assign("/lobby"), 1800);
        }
        break;
      default:
    }
  }, [gameState, playerNumber, recordEvent, roomId, syncStateToSupabase]);

  // Ship placement is persisted once per completed layout. Keeping this out of
  // the turn-message effect prevents every Realtime snapshot from inserting a
  // second `ships_placed` event and replaying the chat sequence.
  useEffect(() => {
    if (gameState !== 2 || playerNumber === null || myShips.length !== ships.length) return;
    const syncKey = `${playerNumber}:${JSON.stringify(myShips)}`;
    if (lastShipsSyncKeyRef.current === syncKey) return;
    lastShipsSyncKeyRef.current = syncKey;

    if (playerNumber === 1) {
      void syncStateToSupabase({ player1_ships: myShips, player1_placed_ships: true });
    } else {
      void syncStateToSupabase({ player2_ships: myShips, player2_placed_ships: true });
    }
    void recordEvent("ships_placed", myShips, playerNumber);
  }, [gameState, myShips, playerNumber, recordEvent, syncStateToSupabase]);

  useEffect(() => {
    if (gameState !== 1) return;
    if (shipTilesState === ships.length) {
      dispatch({ type: COMPLETE_SELECTION });
      return;
    }
    const { numOfTiles, name } = ships[shipTilesState];
    dispatch({
      type: NEW_MESSAGE,
      message: makeMsgForSelectingTiles(name, numOfTiles),
    });
  }, [gameState, shipTilesState]);

  const newGame = async () => {
    if (!roomId || currentRoom?.status !== "completed") return;

    try {
      const room = await requestGameRematch(roomId, playerId);
      setCurrentRoom(room);
      if (room.status === "playing") {
        terminalStateHandledRef.current = null;
        lastShipsSyncKeyRef.current = null;
        returnToCityRef.current = false;
        dispatch({ type: NEW_GAME });
        await recordEvent("new_game", null, playerNumber);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start rematch";
      console.error("Failed to request rematch:", err);
      setError(errorMessage);
    }
  };

  const showOpponentOverlay =
    gameState === 0
      ? MSG_WAITING_FOR_PLAYER
      : !opponentShips
      ? MSG_OPPONENT_PLACING_SHIPS
      : null;

  const showMyOverlay =
    gameState === 5 ? MSG_WIN : gameState === 6 ? MSG_LOSE : null;

  const showConfirmCancelButtons = gameState === 1;

  const clearTiles = () => {
    dispatch({ type: CLEAR_TILES });
  };

  const clickTile = (myBoard: boolean) => {
    if (myBoard) {
      return (coordinate: any) => {
        if (gameState === 1) dispatch({ type: SELECT_TILE, coordinate });
      };
    }
    return (coordinate: any) => {
      if (gameState === 3) {
        dispatch({ type: SHOT, coordinate });
        // Sync shot to Supabase
        const newShots = [...opponentShipsShot, coordinate];
        if (playerNumber === 1) {
          syncStateToSupabase({ player1_shots: newShots });
          recordEvent("shot", coordinate, playerNumber);
        } else if (playerNumber === 2) {
          syncStateToSupabase({ player2_shots: newShots });
          recordEvent("shot", coordinate, playerNumber);
        }
      }
    };
  };

  const confirmTiles = () => dispatch({ type: CONFIRM_TILES });

  const randomizeShips = () => dispatch({ type: RANDOM_PLACEMENT });

  const isGameOver = gameState === 5 || gameState === 6;
  const hasRequestedRematch = playerNumber === 1
    ? Boolean(currentRoom?.player1_rematch_ready)
    : Boolean(currentRoom?.player2_rematch_ready);
  const logState = { messages, newGame, isGameOver, hasRequestedRematch };

  const myState = {
    myBoard: true,
    placedShips: myShips,
    overlaySettings: showMyOverlay,
    title: "Your Board",
    showConfirmCancelButtons,
    clearTiles,
    clickTile: clickTile(true),
    chosenTiles,
    confirmTiles,
    randomizeShips,
    shot: myShipsShot,
    active: gameState === 4,
  };

  const opponentState = {
    placedShips: opponentShips,
    overlaySettings: showOpponentOverlay,
    title: "Opponent's Board",
    clickTile: clickTile(false),
    chosenTiles: [],
    shot: opponentShipsShot,
    active: gameState === 3,
  };

  if (isLoading) {
    return {
      logState: { 
        messages: [{ 
          time: new Date().toLocaleTimeString(), 
          message: "Loading game..." 
        }], 
        newGame 
      },
      myState: { ...myState, placedShips: [] },
      opponentState: { ...opponentState, placedShips: [] },
      error: null,
      isLoading: true,
      username,
      phase,
      availableRooms,
      areRoomsLoading,
      activeGames,
      saveUsername,
      startNewGame,
      joinExistingGame,
    };
  }

  if (error) {
    return {
      logState: { 
        messages: [{ 
          time: new Date().toLocaleTimeString(), 
          message: "Error initializing game" 
        }], 
        newGame 
      },
      myState: { ...myState, placedShips: [] },
      opponentState: { ...opponentState, placedShips: [] },
      error,
      isLoading: false,
      username,
      phase,
      availableRooms,
      areRoomsLoading,
      activeGames,
      saveUsername,
      startNewGame,
      joinExistingGame,
    };
  }

  return {
    logState,
    myState,
    opponentState,
    error: null,
    isLoading: false,
    username,
    phase,
    availableRooms,
    areRoomsLoading,
    activeGames,
    saveUsername,
    startNewGame,
    joinExistingGame,
  };
};

export default useGame;

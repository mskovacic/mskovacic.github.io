-- Give each room an explicit host, track player presence, and support rematches.
ALTER TABLE public.battleship_rooms
  ADD COLUMN IF NOT EXISTS host_id uuid,
  ADD COLUMN IF NOT EXISTS player1_last_seen_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS player2_last_seen_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS completion_reason text CHECK (completion_reason IN ('win', 'forfeit', 'both_left')),
  ADD COLUMN IF NOT EXISTS player1_rematch_ready boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS player2_rematch_ready boolean NOT NULL DEFAULT false;

UPDATE public.battleship_rooms
SET host_id = player1_id
WHERE host_id IS NULL AND player1_id IS NOT NULL;

ALTER TABLE public.battleship_rooms
  ADD CONSTRAINT battleship_rooms_host_required CHECK (host_id IS NOT NULL) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_battleship_rooms_presence
  ON public.battleship_rooms (status, player1_last_seen_at, player2_last_seen_at);

CREATE OR REPLACE FUNCTION public.resolve_battleship_inactive_room(target_room_id uuid)
RETURNS public.battleship_rooms
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  room public.battleship_rooms;
  host_left boolean;
  guest_left boolean;
BEGIN
  SELECT * INTO room
  FROM public.battleship_rooms
  WHERE id = target_room_id
  FOR UPDATE;

  IF NOT FOUND OR room.status <> 'playing' THEN
    RETURN room;
  END IF;

  host_left := room.player1_last_seen_at IS NULL
    OR room.player1_last_seen_at < now() - interval '1 minute';
  guest_left := room.player2_last_seen_at IS NULL
    OR room.player2_last_seen_at < now() - interval '1 minute';

  IF NOT host_left AND NOT guest_left THEN
    RETURN room;
  END IF;

  UPDATE public.battleship_rooms
  SET status = 'completed',
      winner = CASE
        WHEN host_left AND NOT guest_left THEN 'player2'
        WHEN guest_left AND NOT host_left THEN 'player1'
        ELSE NULL
      END,
      completion_reason = CASE WHEN host_left AND guest_left THEN 'both_left' ELSE 'forfeit' END,
      player1_rematch_ready = false,
      player2_rematch_ready = false,
      updated_at = now()
  WHERE id = target_room_id
  RETURNING * INTO room;

  RETURN room;
END;
$$;

CREATE OR REPLACE FUNCTION public.request_battleship_rematch(
  target_room_id uuid,
  requesting_player_id uuid
)
RETURNS public.battleship_rooms
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  room public.battleship_rooms;
BEGIN
  SELECT * INTO room
  FROM public.battleship_rooms
  WHERE id = target_room_id
  FOR UPDATE;

  IF NOT FOUND OR room.status <> 'completed' THEN
    RAISE EXCEPTION 'This game is not ready for a rematch';
  END IF;

  IF requesting_player_id = room.player1_id THEN
    room.player1_rematch_ready := true;
  ELSIF requesting_player_id = room.player2_id THEN
    room.player2_rematch_ready := true;
  ELSE
    RAISE EXCEPTION 'Only a player in this room can request a rematch';
  END IF;

  IF room.player1_rematch_ready AND room.player2_rematch_ready THEN
    UPDATE public.battleship_game_states
    SET game_state = 1,
        player1_ships = '[]'::jsonb,
        player2_ships = '[]'::jsonb,
        player1_shots = '[]'::jsonb,
        player2_shots = '[]'::jsonb,
        player1_placed_ships = false,
        player2_placed_ships = false,
        updated_at = now()
    WHERE room_id = target_room_id;

    UPDATE public.battleship_rooms
    SET status = 'playing',
        winner = NULL,
        completion_reason = NULL,
        player1_rematch_ready = false,
        player2_rematch_ready = false,
        player1_last_seen_at = now(),
        player2_last_seen_at = now(),
        updated_at = now()
    WHERE id = target_room_id
    RETURNING * INTO room;
  ELSE
    UPDATE public.battleship_rooms
    SET player1_rematch_ready = room.player1_rematch_ready,
        player2_rematch_ready = room.player2_rematch_ready,
        updated_at = now()
    WHERE id = target_room_id
    RETURNING * INTO room;
  END IF;

  RETURN room;
END;
$$;

-- This is also called by connected clients, but the scheduled check resolves
-- games even when both browser tabs have been closed.
CREATE OR REPLACE FUNCTION public.resolve_battleship_inactive_games()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  room_id uuid;
BEGIN
  FOR room_id IN
    SELECT id FROM public.battleship_rooms WHERE status = 'playing'
  LOOP
    PERFORM public.resolve_battleship_inactive_room(room_id);
  END LOOP;
END;
$$;

DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
  IF NOT EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'resolve-battleship-inactive-games'
  ) THEN
    PERFORM cron.schedule(
      'resolve-battleship-inactive-games',
      '* * * * *',
      'select public.resolve_battleship_inactive_games()'
    );
  END IF;
EXCEPTION
  WHEN undefined_table OR insufficient_privilege THEN
    RAISE NOTICE 'pg_cron is unavailable; inactive games will be resolved by connected clients.';
END;
$$;

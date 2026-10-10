-- Postgres Changes only emits for tables in the supabase_realtime publication.
-- Without this, a host never learns that a guest has joined its room.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'battleship_rooms'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.battleship_rooms;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'battleship_game_states'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.battleship_game_states;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'battleship_events'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.battleship_events;
  END IF;
END;
$$;

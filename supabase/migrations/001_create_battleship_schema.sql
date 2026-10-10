-- Create battleship game rooms table
CREATE TABLE IF NOT EXISTS public.battleship_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player1_id uuid,
  player2_id uuid,
  status text NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'completed')),
  winner text, -- 'player1' or 'player2' or null for in-progress
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create game state snapshots table
CREATE TABLE IF NOT EXISTS public.battleship_game_states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.battleship_rooms(id) ON DELETE CASCADE,
  game_state smallint NOT NULL DEFAULT 0, -- 0-6 matching useGame gameState
  player1_ships jsonb DEFAULT '[]'::jsonb,
  player2_ships jsonb DEFAULT '[]'::jsonb,
  player1_shots jsonb DEFAULT '[]'::jsonb,
  player2_shots jsonb DEFAULT '[]'::jsonb,
  player1_placed_ships boolean DEFAULT false,
  player2_placed_ships boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create game events log table
CREATE TABLE IF NOT EXISTS public.battleship_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.battleship_rooms(id) ON DELETE CASCADE,
  event_type text NOT NULL, -- 'opponent_joined', 'ships_placed', 'shot', 'end', 'new_game'
  player_number smallint, -- 1 or 2 (null for system events)
  payload jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.battleship_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battleship_game_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battleship_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for battleship_rooms (allow anon read/write for demo)
CREATE POLICY "battleship_rooms_allow_all" ON public.battleship_rooms
  FOR SELECT USING (true);

CREATE POLICY "battleship_rooms_allow_insert" ON public.battleship_rooms
  FOR INSERT WITH CHECK (true);

CREATE POLICY "battleship_rooms_allow_update" ON public.battleship_rooms
  FOR UPDATE USING (true) WITH CHECK (true);

-- RLS Policies for battleship_game_states (allow anon read/write for demo)
CREATE POLICY "battleship_game_states_allow_all" ON public.battleship_game_states
  FOR SELECT USING (true);

CREATE POLICY "battleship_game_states_allow_insert" ON public.battleship_game_states
  FOR INSERT WITH CHECK (true);

CREATE POLICY "battleship_game_states_allow_update" ON public.battleship_game_states
  FOR UPDATE USING (true) WITH CHECK (true);

-- RLS Policies for battleship_events (allow anon read/write for demo)
CREATE POLICY "battleship_events_allow_all" ON public.battleship_events
  FOR SELECT USING (true);

CREATE POLICY "battleship_events_allow_insert" ON public.battleship_events
  FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_battleship_rooms_status ON public.battleship_rooms(status);
CREATE INDEX idx_battleship_game_states_room_id ON public.battleship_game_states(room_id);
CREATE INDEX idx_battleship_events_room_id ON public.battleship_events(room_id);
CREATE INDEX idx_battleship_events_created_at ON public.battleship_events(created_at);

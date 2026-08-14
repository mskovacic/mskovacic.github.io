import { useState } from "react";
import { Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import Display from "~/features/battleship/components/display/display";
import LogList from "~/features/battleship/components/log/logList";
import Heading from "~/features/battleship/components/heading";
import LoadingErrorOverlay from "~/features/battleship/components/loadingErrorOverlay";
import useGame from "~/features/battleship/hooks/useGame";

export default function Battleship() {
  const {
    myState,
    opponentState,
    logState,
    error,
    isLoading,
    username,
    phase,
    availableRooms,
    areRoomsLoading,
    activeGames,
    saveUsername,
    startNewGame,
    joinExistingGame,
  } = useGame();

  const [draftUsername, setDraftUsername] = useState(username ?? "");
  const [roomCode, setRoomCode] = useState("");

  if (phase === "username") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper sx={{ p: 4, width: "100%", maxWidth: 420 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Welcome to the Battleship lobby
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Choose a username to continue.
          </Typography>
          <Stack component="form" spacing={2} onSubmit={(event) => {
            event.preventDefault();
            const saved = saveUsername(draftUsername);
            if (!saved) {
              return;
            }
          }}>
            <TextField
              label="Username"
              value={draftUsername}
              onChange={(event) => setDraftUsername(event.target.value)}
              autoFocus
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth>
              Continue
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (phase === "lobby") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            display: "grid",
            gridTemplateColumns: "1.3fr 0.7fr",
            gap: 3,
            alignItems: "start",
          }}
        >
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Battleship Lobby
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Welcome, <strong>{username}</strong>
            </Typography>

            <Stack spacing={2}>
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => startNewGame()}
                disabled={activeGames.length > 0}
                title={activeGames.length > 0 ? "You must finish your active game first" : ""}
              >
                Start a new game
              </Button>

              <TextField
                label="Room code"
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value)}
                placeholder="Paste a room code or UUID"
                fullWidth
                disabled={activeGames.length > 0}
              />

              <Button 
                variant="outlined" 
                size="large" 
                onClick={() => joinExistingGame(roomCode)}
                disabled={activeGames.length > 0}
                title={activeGames.length > 0 ? "You must finish your active game first" : ""}
              >
                Join existing game
              </Button>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3 }}>
            {activeGames.length > 0 && (
              <Box sx={{ mb: 3, pb: 2, borderBottom: "1px solid #e0e0e0" }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Your Active Games
                </Typography>
                <Stack spacing={1}>
                  {activeGames.map((game) => (
                    <Button
                      key={game.id}
                      variant="contained"
                      size="small"
                      onClick={() => joinExistingGame(game.id)}
                      sx={{ justifyContent: "flex-start", textTransform: "none" }}
                    >
                      Rejoin {game.id.slice(0, 8)}...
                    </Button>
                  ))}
                </Stack>
              </Box>
            )}

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Open rooms
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#4caf50",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.5 },
                    },
                  }}
                />
              </Typography>
            </Box>

            {areRoomsLoading ? (
              <Stack direction="row" spacing={1} role="status" sx={{ alignItems: "center" }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Loading rooms...
                </Typography>
              </Stack>
            ) : availableRooms.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No rooms are waiting right now. Start a new game to create one.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {availableRooms.map((room) => (
                  <Button
                    key={room.id}
                    variant="outlined"
                    onClick={() => joinExistingGame(room.id)}
                    sx={{ justifyContent: "space-between", textTransform: "none" }}
                  >
                    <span>Room {room.id.slice(0, 8)}</span>
                    <span>
                      {new Date(room.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </Button>
                ))}
              </Stack>
            )}
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <LoadingErrorOverlay isLoading={isLoading} error={error} />
      <Heading />
      <Display {...{ myState, opponentState }} />
      <LogList {...logState} />
    </>
  );
};

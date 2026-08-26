import { useEffect } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
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
    phase,
  } = useGame();

  const invitedRoom = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("room")
    : null;
  const shouldReturnToCity = !invitedRoom || Boolean(error);

  useEffect(() => {
    if (shouldReturnToCity && typeof window !== "undefined") {
      window.location.replace("/lobby");
    }
  }, [shouldReturnToCity]);

  if (shouldReturnToCity) {
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <Typography color="text.secondary">Returning to the city...</Typography>
      </Box>
    );
  }

  if (phase !== "game") {
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
        <Paper sx={{ p: 4, width: "100%", maxWidth: 420, textAlign: "center" }}>
          <CircularProgress size={28} sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            Joining your Battleship room...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Waiting for both players to enter the game.
          </Typography>
        </Paper>
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

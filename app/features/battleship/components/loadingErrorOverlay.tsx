import React from "react";
import { CircularProgress, Box, Typography, Container } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

interface LoadingErrorOverlayProps {
  isLoading: boolean;
  error: string | null;
}

const LoadingErrorOverlay: React.FC<LoadingErrorOverlayProps> = ({ isLoading, error }) => {
  if (!isLoading && !error) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 9999,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            padding: 4,
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          {isLoading && (
            <>
              <CircularProgress sx={{ mb: 2 }} size={60} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
                Initializing Game
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                Connecting to Supabase and loading your game...
              </Typography>
            </>
          )}

          {error && !isLoading && (
            <>
              <WarningIcon sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 500, color: "error.main" }}>
                Failed to Initialize Game
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "text.secondary",
                  wordBreak: "break-word",
                  fontFamily: "monospace",
                  backgroundColor: "#f5f5f5",
                  padding: 1.5,
                  borderRadius: 1,
                  textAlign: "left",
                }}
              >
                {error}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                Please check your Supabase configuration in .env.local and reload the page.
              </Typography>
              <Typography variant="caption" sx={{ mt: 1, display: "block", color: "text.secondary" }}>
                Required env variables:
                <br />
                VITE_SUPABASE_URL
                <br />
                VITE_SUPABASE_PUBLISHABLE_KEY
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default LoadingErrorOverlay;

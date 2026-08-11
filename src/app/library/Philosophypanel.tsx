// src/components/Library/PhilosophyPanel.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const BUTTERY_YELLOW = "#F9E8B0";

export function PhilosophyPanel() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        mt: 7,
        p: { xs: 3.5, sm: 5 },
        color: "background.default",
        background: (t) =>
          `linear-gradient(135deg, ${t.palette.secondary.main} 0%, #234840 100%)`,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: -140,
          right: -100,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: (t) =>
            `radial-gradient(circle, ${alpha(t.palette.primary.main, 0.16)} 0%, ${alpha(
              t.palette.primary.main,
              0,
            )} 70%)`,
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          bottom: -160,
          left: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(BUTTERY_YELLOW, 0.12)} 0%, ${alpha(
            BUTTERY_YELLOW,
            0,
          )} 70%)`,
          pointerEvents: "none",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "relative",
          width: 46,
          height: 46,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2.25,
          bgcolor: (t) => alpha(t.palette.primary.main, 0.18),
          boxShadow: (t) =>
            `inset 0 0 0 1.5px ${alpha(t.palette.primary.main, 0.4)}`,
          "& svg": {
            width: 22,
            height: 22,
            stroke: (t) => t.palette.primary.main,
            fill: "none",
            strokeWidth: 1.8,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        }}
      >
        <svg viewBox="0 0 24 24">
          <path d="M7 10c0-2.5 2-4 4-4M7 10v5a2 2 0 002 2h1v-7H7zM15 10c0-2.5 2-4 4-4M15 10v5a2 2 0 002 2h1v-7h-3z" />
        </svg>
      </Box>

      <Typography
        sx={{
          position: "relative",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "primary.main",
          mb: 1.25,
        }}
      >
        Why it's built this way
      </Typography>

      <Typography
        variant="h2"
        sx={{
          position: "relative",
          fontFamily: "var(--font-manrope), sans-serif",
          fontWeight: 700,
          fontSize: { xs: "1.6rem", sm: "2.15rem" },
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
          mb: 1.5,
        }}
      >
        Nothing banned, and one meal never decides anything
      </Typography>

      <Typography
        sx={{
          position: "relative",
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "#BFD8D2",
          maxWidth: "60ch",
        }}
      >
        The Library isn't a restriction list. It's written on the belief that a
        plan you can't live with is a plan you'll abandon — so nothing is off
        limits, and neither one meal nor one missed session is ever treated as a
        failure. The next one simply returns to the plan. That philosophy runs
        through every volume on the shelf.
      </Typography>
    </Box>
  );
}

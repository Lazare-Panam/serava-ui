// src/components/HowItWorksPage/CtaBand.tsx
// The dark closing CTA banner. bgcolor and the radial glow both come from
// theme tokens; the heading/paragraph/button text use secondary.contrastText
// rather than a literal "#FFFFFF" — theme.ts already defines that as
// pureWhite, so for once there's an exact token for what the mockup wanted,
// no override needed.
"use client";

import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

const BUTTERY_YELLOW = "#F9E8B0";

type CtaBandProps = {
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
};

export function CtaBand({ heading, subtext, ctaLabel, ctaHref }: CtaBandProps) {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        py: { xs: 9, md: 12.5 },
        background: (theme) =>
          `linear-gradient(160deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: "secondary.contrastText",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: -180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(BUTTERY_YELLOW, 0.14)} 0%, ${alpha(BUTTERY_YELLOW, 0)} 70%)`,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", mx: "auto", maxWidth: 1100, px: 3 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2.15rem" },
            color: "secondary.contrastText",
          }}
        >
          {heading}
        </Typography>

        <Typography
          sx={{
            mt: 1.75,
            mb: 4,
            mx: "auto",
            maxWidth: 480,
            color: (theme) => alpha(theme.palette.secondary.contrastText, 0.78),
          }}
        >
          {subtext}
        </Typography>

        <Button
          component={Link}
          href={ctaHref}
          variant="contained"
          size="large"
          sx={{
            borderRadius: 999,
            px: 4,
            py: 1.4,
            fontWeight: 600,
            bgcolor: "primary.main",
            color: "#FFFFFF",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          {ctaLabel}
        </Button>
      </Box>
    </Box>
  );
}
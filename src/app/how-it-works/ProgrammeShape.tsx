// src/components/HowItWorksPage/ProgrammeShape.tsx
// "Nine months, designed to end well" — a proportional three-segment bar
// (evaluate / treatment / titrate-down) recoloured onto the theme. Segment
// 2 (teal) and segment 3 (viridian) both carry white text — a deliberate
// override of theme.ts's primary.contrastText (which is charcoal, per its
// own AA rule), same call already made for the Pricing page's subscription
// card. Segment 1 (butter) keeps dark text since white-on-pale-yellow
// would be unreadable — that one uses status.amber, which happens to be
// almost the exact gold tone the mockup hand-picked for this same spot.
"use client";

import { alpha } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";

const BUTTERY_YELLOW = "#F9E8B0";

const PHASES = [
  {
    label: "Month 1",
    detail: "Begin and evaluate",
    flex: 1.4,
    background: alpha(BUTTERY_YELLOW, 0.7),
    textColor: "status.amber",
  },
  {
    label: "Months 2 to 7",
    detail: "Treatment, if suitable and stable",
    flex: 5,
    background: (theme: any) =>
      `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.primary.dark} 100%)`,
    textColor: "#FFFFFF",
  },
  {
    label: "Months 8 to 9",
    detail: "Titrate down and maintain",
    flex: 2.2,
    background: (theme: any) =>
      `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    textColor: "#FFFFFF",
  },
];

export function ProgrammeShape() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: { xs: 9, md: 12.5 },
      }}
    >
      <Box sx={{ mx: "auto", maxWidth: 1100, px: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <Box sx={{ width: 22, height: "1.5px", bgcolor: "primary.main" }} />
          <Typography
            variant="overline"
            sx={{
              color: "primary.dark",
              letterSpacing: "0.22em",
              fontWeight: 600,
            }}
          >
            The shape of the programme
          </Typography>
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2.15rem" },
            letterSpacing: "-0.02em",
            color: "secondary.main",
          }}
        >
          Nine months, designed to end well
        </Typography>

        <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
          Most services are open-ended by design. Ours is not: the ending is
          planned from day one.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.25,
            mt: 5.5,
          }}
        >
          {PHASES.map((phase) => (
            <Box
              key={phase.label}
              sx={{
                flex: { sm: phase.flex },
                width: { xs: "100%" },
                borderRadius: "14px",
                px: 1.75,
                py: 2.75,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "0.88rem",
                color: phase.textColor,
                background: phase.background,
                boxShadow:
                  "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
              }}
            >
              {phase.label}
              <Typography
                component="span"
                sx={{
                  display: "block",
                  mt: 0.6,
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  fontSize: "0.76rem",
                  opacity: 0.9,
                }}
              >
                {phase.detail}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          sx={{ mt: 2.25, fontSize: "0.92rem", color: "text.secondary" }}
        >
          Your prescriber may adjust this shape around you. Timings are a
          design, not a promise.
        </Typography>
      </Box>
    </Box>
  );
}

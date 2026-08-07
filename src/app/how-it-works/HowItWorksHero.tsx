// src/components/HowItWorksPage/HowItWorksHero.tsx
// Page hero for /how-it-works — eyebrow, headline, subtitle, and a row of
// three fact chips. Two soft radial-gradient blobs sit behind the copy for
// visual depth, same idea as the mockup's page-hero::before/::after, just
// built as real Boxes since pseudo-elements aren't a thing in sx. Both
// blobs pull their colour from the theme (primary teal, and the same
// literal "buttery yellow" already established in Pricing.tsx/
// ProgrammePaths.tsx for the one accent that has no palette token).
"use client";

import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { Box, Typography, Chip, Stack } from "@mui/material";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

// Same literal used in Pricing.tsx/ProgrammePaths.tsx — there's no palette
// entry for this exact warm yellow, so it's a documented exception rather
// than a stray hex value.
const BUTTERY_YELLOW = "#F9E8B0";

const FACT_CHIPS = [
  { icon: ScheduleRoundedIcon, label: "Designed around nine months" },
  { icon: LocalHospitalRoundedIcon, label: "Prescriber-led at every step" },
  { icon: CheckCircleRoundedIcon, label: "Free to check, no obligation" },
];

export function HowItWorksHero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        py: { xs: 10, md: 14 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -200,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: (theme) =>
            `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.14)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -160,
          left: -160,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(BUTTERY_YELLOW, 0.22)} 0%, ${alpha(BUTTERY_YELLOW, 0)} 70%)`,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", mx: "auto", maxWidth: 1100, px: 3 }}>
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
            How it works
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2.2rem", md: "3.3rem" },
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            color: "secondary.main",
            maxWidth: 900,
          }}
        >
          From first check to lasting maintenance
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 2.25,
            maxWidth: "60ch",
            fontSize: "1.14rem",
            lineHeight: 1.7,
            color: "text.secondary",
          }}
        >
          One supervised journey with a clear shape and a deliberate ending.
          Here is every step, what it involves, and what it costs at that point.
        </Typography>

        <Stack
          direction="row"
          spacing={1.25}
          sx={{ mt: 3, flexWrap: "wrap", rowGap: 1.25 }}
        >
          {FACT_CHIPS.map(({ icon: Icon, label }) => (
            <Chip
              key={label}
              icon={<Icon sx={{ color: "primary.dark", fontSize: 18 }} />}
              label={label}
              sx={{
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 999,
                px: 0.5,
                py: 2.5,
                fontSize: "0.84rem",
                fontWeight: 500,
                color: "text.secondary",
                boxShadow:
                  "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

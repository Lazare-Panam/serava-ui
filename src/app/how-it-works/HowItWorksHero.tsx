// src/components/HowItWorksPage/HowItWorksHero.tsx
// Page hero for /how-it-works — eyebrow, headline, subtitle, and a row of
// three fact chips. One soft radial-gradient blob sits behind the copy for
// visual depth (bottom-left), same idea as the mockup's page-hero::after,
// just built as a real Box since pseudo-elements aren't a thing in sx.
//
// Colour: this section is now fully yellow-themed, per request — the
// section background, the remaining blob, and the fact chips all use
// BUTTERY_YELLOW / BUTTERY_YELLOW_DEEP instead of primary teal. The
// top-right teal blob from the previous version has been removed entirely
// so no teal accent appears anywhere in this hero. BUTTERY_YELLOW is the
// same literal already established in Pricing.tsx/ProgrammePaths.tsx;
// BUTTERY_YELLOW_DEEP is new here, added for text/icon contrast on the
// yellow background (same reasoning as BUTTER_DEEP in JourneyTimeline.tsx —
// no palette token exists for this accent yet, so it's a documented
// exception rather than a stray hex value).
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
// New: a deeper gold for text/icons/borders on top of BUTTERY_YELLOW, where
// plain text.secondary or primary.dark (teal) would either clash or fail
// contrast against a yellow background. Same role as BUTTER_DEEP plays
// alongside BUTTER in JourneyTimeline.tsx.
const BUTTERY_YELLOW_DEEP = "#8A6D1A";

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
        // Was background.default — section background now uses the full
        // butter yellow rather than just a faint corner blob on top of the
        // theme's default background.
        bgcolor: BUTTERY_YELLOW,
        py: { xs: 10, md: 14 },
      }}
    >
      {/* Teal blob (previously top-right) removed — no teal accent left in
          this section, per "totally yellow" including the chips. */}
      <Box
        sx={{
          position: "absolute",
          bottom: -160,
          left: -160,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(BUTTERY_YELLOW_DEEP, 0.18)} 0%, ${alpha(BUTTERY_YELLOW_DEEP, 0)} 70%)`,
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
          <Box
            sx={{ width: 22, height: "1.5px", bgcolor: BUTTERY_YELLOW_DEEP }}
          />
          <Typography
            variant="overline"
            sx={{
              color: BUTTERY_YELLOW_DEEP,
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
              icon={<Icon sx={{ color: BUTTERY_YELLOW_DEEP, fontSize: 18 }} />}
              label={label}
              sx={{
                // Was background.paper / divider — chips now carry a
                // yellow-tinted surface + border instead of a neutral
                // white card, so they read as part of the same yellow
                // block rather than a contrasting white cutout.
                bgcolor: "#FFFFFF",
                border: "1px solid",
                borderColor: alpha(BUTTERY_YELLOW_DEEP, 0.35),
                borderRadius: 999,
                px: 0.5,
                py: 2.5,
                fontSize: "0.84rem",
                fontWeight: 500,
                color: BUTTERY_YELLOW_DEEP,
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

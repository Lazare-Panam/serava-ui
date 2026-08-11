// src/components/Library/LibraryPageHero.tsx
//
// The "bookshelf" visual is a deliberate redesign of the mockup's version,
// not a straight port — the original used writing-mode:vertical-rl to spin
// each spine's text 90 degrees inside a 30px-wide column at 0.66rem, which
// is close to unreadable even sighted (rotated text is genuinely harder to
// parse, not just stylistically bold), and the whole shelf was a single
// role="img" with ONE aria-label covering all three groups — meaning a
// screen reader user got "six meal volumes, three strength volumes, six
// foundations guides" as one blob and literally none of the 15 individual
// volume names anywhere in the accessibility tree, even though sighted
// users can read every spine. Fixed here: each spine is a real list item
// with its full title as visible, horizontal, readable text (still
// compact — this is a decorative-but-informative shelf, not the volume
// cards below it), and the group wrapper uses a proper <ul> so nothing is
// hidden from assistive tech that's visible on screen.
"use client";

import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const BUTTERY_YELLOW = "#F9E8B0"; // same literal PricingSection.tsx uses
const BUTTER_DEEP_TEXT = "#6B5410"; // mockup's --butter-deep, AA on butter
const TEAL_DEEP = "#146059";

type ShelfGroup = {
  id: string;
  label: string;
  accentBg: string;
  accentText: string;
  spines: string[];
};

const SHELF_GROUPS: ShelfGroup[] = [
  {
    id: "meal",
    label: "Meal · 6",
    accentBg: "secondary.main", // deepViridian
    accentText: "#FFFFFF",
    spines: ["Meal I", "Meal II", "Meal III", "Meal IV", "Meal V", "Meal VI"],
  },
  {
    id: "strength",
    label: "Strength · 3",
    accentBg: TEAL_DEEP,
    accentText: "#FFFFFF",
    spines: ["Strength I", "Strength II", "Strength III"],
  },
  {
    id: "foundation",
    label: "Foundations · 6",
    accentBg: BUTTERY_YELLOW,
    accentText: BUTTER_DEEP_TEXT,
    spines: [
      "Water",
      "The Safety Net",
      "The Supplement Guide",
      "Sleep",
      "The Mind",
      "The Bookends",
    ],
  },
];

export function LibraryPageHero() {
  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        pt: { xs: 7, md: 11 },
        overflow: "hidden",
        background: (t) =>
          `linear-gradient(180deg, ${t.palette.background.default} 0%, #F1F8F6 100%)`,
      }}
    >
      {/* Decorative glow blobs, same placement/idea as the mockup's
          ::before/::after radial gradients. */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: -200,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: (t) =>
            `radial-gradient(circle, ${alpha(t.palette.primary.main, 0.14)} 0%, ${alpha(
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
          left: -160,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(BUTTERY_YELLOW, 0.35)} 0%, ${alpha(
            BUTTERY_YELLOW,
            0,
          )} 70%)`,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          mx: "auto",
          maxWidth: 1152,
          px: 3,
          pb: 8,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.1,
            mb: 2,
          }}
        >
          <Box sx={{ width: 22, height: "1.5px", bgcolor: "primary.main" }} />
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: TEAL_DEEP,
            }}
          >
            The Library
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2.25rem", sm: "3rem", md: "3.3rem" },
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            color: "secondary.main",
            maxWidth: "18ch",
          }}
        >
          Every patient gets the full shelf
        </Typography>

        <Typography
          sx={{
            mt: 2.25,
            fontSize: "1.14rem",
            lineHeight: 1.7,
            color: "text.secondary",
            maxWidth: 640,
          }}
        >
          Written by our clinical team for real UK kitchens, supermarkets and
          living rooms. Yours from day one, included in every programme —
          nothing here is sold separately or held back.
        </Typography>

        {/* Bookshelf visual — three groups, each a real horizontally-
            readable list rather than rotated decorative text. */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 3, md: 3.5 },
            mt: { xs: 5, md: 6.5 },
            alignItems: "flex-end",
          }}
        >
          {SHELF_GROUPS.map((group) => (
            <Box
              key={group.id}
              sx={{ display: "flex", flexDirection: "column", minWidth: 132 }}
            >
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#8A9A93",
                  mb: 1.5,
                }}
              >
                {group.label}
              </Typography>

              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  m: 0,
                  p: 0,
                  display: "flex",
                  flexDirection: "column-reverse",
                  gap: "3px",
                }}
              >
                {group.spines.map((spine) => (
                  <Box
                    component="li"
                    key={spine}
                    sx={{
                      bgcolor: group.accentBg,
                      color: group.accentText,
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.7,
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                      boxShadow:
                        "0 1px 2px rgba(42,84,73,.05), 0 6px 16px -8px rgba(42,84,73,.10)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {spine}
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  height: 7,
                  borderRadius: "0 0 4px 4px",
                  mt: 0,
                  bgcolor:
                    group.id === "foundation"
                      ? BUTTER_DEEP_TEXT
                      : group.accentBg,
                  boxShadow: "0 10px 22px -6px rgba(42,84,73,.20)",
                }}
              />
            </Box>
          ))}
        </Box>

        <Typography
          sx={{
            mt: 3.5,
            fontSize: "0.92rem",
            color: "text.secondary",
          }}
        >
          Six meal volumes · three strength volumes · six foundations guides,
          plus session cards and a training log, ten pocket cards, and a
          pre-exercise readiness screen.
        </Typography>
      </Box>
    </Box>
  );
}

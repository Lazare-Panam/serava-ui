// src/components/Library/ExtrasRow.tsx
"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

const TEAL_DEEP = "#146059";

type Extra = {
  icon: ReactNode;
  title: string;
  description: string;
  // Optional cover image, same pattern as Volume in VolumeGroup.tsx —
  // left undefined below until real photography/artwork is ready. Add a
  // "image: \"...\"" line to any entry in EXTRAS to swap in a real one;
  // the card's layout doesn't shift either way since the slot's aspect
  // ratio is fixed.
  image?: string;
};

const EXTRAS: Extra[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h10M7 16h6" />
      </svg>
    ),
    title: "Session cards & a training log",
    description:
      "A quick-reference card for each strength venue, plus a log to track sessions as the habit takes hold.",
    image:
      "https://pblol2.blob.core.windows.net/serava-ui/lib/session-cards.jpeg",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 6h6M9 10h6M9 14h4" />
      </svg>
    ),
    title: "Ten pocket cards",
    description:
      "The whole Library condensed to wallet size, ready for the exact moment you need it: the menu, the shelf, the fridge door.",
    image:
      "https://pblol2.blob.core.windows.net/serava-ui/lib/ten-pocket-cards.jpeg",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    title: "A pre-exercise readiness screen",
    description:
      "A short check completed before starting any strength volume, to confirm it's safe for you to begin, or flag if anything needs a closer look first.",
    image:
      "https://pblol2.blob.core.windows.net/serava-ui/lib/pre-exercise.jpeg",
  },
];

export function ExtrasRow() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        gap: 2,
        mt: 5.5,
      }}
    >
      {EXTRAS.map((extra) => (
        <Box
          key={extra.title}
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow:
              "0 1px 2px rgba(42,84,73,.05), 0 6px 16px -8px rgba(42,84,73,.10)",
            transition:
              "transform 0.3s cubic-bezier(.2,.7,.3,1), box-shadow 0.3s cubic-bezier(.2,.7,.3,1)",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow:
                "0 2px 6px rgba(42,84,73,.05), 0 20px 44px -20px rgba(42,84,73,.20)",
            },
          }}
        >
          {/* Image slot — src left blank until real photography/artwork
              is ready. Same fixed-aspect-ratio + tinted-placeholder
              approach as VolumeGroup's VolumeCard, so this row stays
              visually consistent with the volume cards above it and
              doesn't reflow once real images are added. */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              bgcolor: extra.image ? "transparent" : TEAL_DEEP,
              opacity: extra.image ? 1 : 0.12,
            }}
          >
            {extra.image && (
              // eslint-disable-next-line @next/next/no-img-element -- swap for next/image once real, sized asset URLs are in place
              <img
                src={extra.image}
                alt={extra.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              py: "22px",
              px: "20px",
              display: "flex",
              gap: 1.75,
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "11px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: (t) =>
                  `radial-gradient(circle at 30% 30%, #EAF9F6, ${t.palette.background.default})`,
                boxShadow: "inset 0 0 0 1px rgba(42,179,166,.15)",
                "& svg": {
                  width: 18,
                  height: 18,
                  stroke: TEAL_DEEP,
                  fill: "none",
                  strokeWidth: 1.8,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                },
              }}
            >
              {extra.icon}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "0.94rem",
                  fontWeight: 600,
                  color: "secondary.main",
                  mb: 0.5,
                }}
              >
                {extra.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                {extra.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

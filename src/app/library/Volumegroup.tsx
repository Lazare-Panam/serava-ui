// src/components/Library/VolumeGroup.tsx
//
// One reusable section for each of the three volume groups (Meal,
// Strength, Foundations) — icon + heading + intro paragraph + a grid of
// VolumeCards — same "config array feeds one generic component" shape
// PricingSection.tsx already uses for its three pricing tiers.
"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export type Volume = {
  num: string; // "Volume I", "Guide III", etc.
  title: string;
  description: string;
  // Optional cover image for the card. Left undefined in libraryData.tsx
  // for now — fill in real URLs per volume when ready. Cards render a
  // placeholder block (no broken-image icon, no layout shift once a src
  // is added later since the aspect ratio is fixed either way).
  image?: string;
};

export type VolumeGroupAccent = "meal" | "strength" | "foundation";

const BUTTERY_YELLOW = "#F9E8B0";
const BUTTER_DEEP_TEXT = "#6B5410";
const TEAL_DEEP = "#146059";

// Same accent-token idea as PricingSection's ACCENT_TOKENS, scoped to
// what this component actually needs: an icon badge colour, an icon
// stroke colour, and the card's top accent border.
const ACCENT: Record<
  VolumeGroupAccent,
  { iconBg: string; iconStroke: string; cardTopBorder: string }
> = {
  meal: {
    iconBg: "secondary.main",
    iconStroke: "#FFFFFF",
    cardTopBorder: "secondary.main",
  },
  strength: {
    iconBg: TEAL_DEEP,
    iconStroke: "#FFFFFF",
    cardTopBorder: TEAL_DEEP,
  },
  foundation: {
    iconBg: BUTTERY_YELLOW,
    iconStroke: BUTTER_DEEP_TEXT,
    cardTopBorder: BUTTERY_YELLOW,
  },
};

function VolumeCard({
  volume,
  accent,
}: {
  volume: Volume;
  accent: VolumeGroupAccent;
}) {
  const tokens = ACCENT[accent];
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderTop: "3px solid",
        borderTopColor: tokens.cardTopBorder,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow:
          "0 1px 2px rgba(42,84,73,.05), 0 6px 16px -8px rgba(42,84,73,.10)",
        transition:
          "transform 0.3s cubic-bezier(.2,.7,.3,1), box-shadow 0.3s cubic-bezier(.2,.7,.3,1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            "0 2px 6px rgba(42,84,73,.05), 0 20px 44px -20px rgba(42,84,73,.20)",
        },
      }}
    >
      {/* Image slot — src left blank until real photography/artwork is
          ready. Fixed 16:9 box either way so adding a src later doesn't
          shift the grid, and a flat tinted placeholder (using the
          group's own accent, at low opacity) stands in instead of a
          broken-image icon or empty white gap. */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          bgcolor: volume.image ? "transparent" : tokens.cardTopBorder,
          opacity: volume.image ? 1 : 0.18,
        }}
      >
        {volume.image && (
          // eslint-disable-next-line @next/next/no-img-element -- swap for next/image once real, sized asset URLs are in place
          <img
            src={volume.image}
            alt={volume.title}
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

      <Box sx={{ py: "22px", px: "20px" }}>
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: TEAL_DEEP,
            mb: 1,
          }}
        >
          {volume.num}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.98rem",
            fontWeight: 600,
            color: "secondary.main",
            mb: 0.75,
          }}
        >
          {volume.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.87rem",
            color: "text.secondary",
            lineHeight: 1.65,
          }}
        >
          {volume.description}
        </Typography>
      </Box>
    </Box>
  );
}

export function VolumeGroup({
  accent,
  icon,
  title,
  intro,
  volumes,
}: {
  accent: VolumeGroupAccent;
  icon: ReactNode;
  title: string;
  intro: string;
  volumes: Volume[];
}) {
  const tokens = ACCENT[accent];
  return (
    <Box sx={{ mt: { xs: 5, md: 5.5 } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.75, mb: 2.75 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            bgcolor: tokens.iconBg,
            boxShadow: "0 6px 14px -6px rgba(42,84,73,.35)",
            "& svg": {
              width: 21,
              height: 21,
              stroke: tokens.iconStroke,
              fill: "none",
              strokeWidth: 1.7,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            },
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.6rem", sm: "2.15rem" },
            letterSpacing: "-0.02em",
            color: "secondary.main",
            m: 0,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: "1rem",
          color: "text.secondary",
          lineHeight: 1.7,
          mb: 2.75,
          maxWidth: "64ch",
        }}
      >
        {intro}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {volumes.map((volume) => (
          <VolumeCard key={volume.num} volume={volume} accent={accent} />
        ))}
      </Box>
    </Box>
  );
}

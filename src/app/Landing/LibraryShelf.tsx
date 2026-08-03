// src/components/LibraryShelf.tsx
// A visual "bookshelf" of the Lifestyle Library's volumes: spines of
// varying height and color sitting on a shelf board. Colors come from the
// theme, not the unrelated reference's "butter" token (not in our palette) —
// "The Safety Net" uses Status Amber instead, since amber already carries
// safety/caution meaning in the traffic-light system elsewhere on the site.
"use client";

import { Box, Typography } from "@mui/material";

type Spine = {
  label: string;
  height: number;
  width?: number;
  bgcolor: string;
  color: string;
};

const SPINES: Spine[] = [
  {
    label: "Meal Library I",
    height: 260,
    width: 52,
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    label: "Meal Library II",
    height: 260,
    width: 52,
    bgcolor: "secondary.dark",
    color: "secondary.contrastText",
  },
  {
    label: "Meal Library III",
    height: 260,
    width: 52,
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    label: "Meal Library IV",
    height: 260,
    width: 52,
    bgcolor: "secondary.dark",
    color: "secondary.contrastText",
  },
  {
    label: "Meal Library V",
    height: 260,
    width: 52,
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    label: "Meal Library VI",
    height: 260,
    width: 52,
    bgcolor: "secondary.dark",
    color: "secondary.contrastText",
  },
  {
    label: "Strength I",
    height: 280,
    width: 60,
    bgcolor: "accentBrand.main",
    color: "accentBrand.contrastText",
  },
  {
    label: "Strength II",
    height: 280,
    width: 60,
    bgcolor: "accentBrand.main",
    color: "accentBrand.contrastText",
  },
  {
    label: "Water",
    height: 220,
    width: 52,
    bgcolor: "primary.main",
    color: "primary.contrastText",
  },
  {
    label: "The Safety Net",
    height: 220,
    width: 52,
    bgcolor: "status.amber",
    color: "secondary.contrastText",
  },
  {
    label: "The Supplement Guide",
    height: 220,
    width: 52,
    bgcolor: "primary.main",
    color: "primary.contrastText",
  },
];

export function LibraryShelf() {
  return (
    <Box
      component="section"
      id="library"
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 8, md: 12 } }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "secondary.main",
          letterSpacing: "0.2em",
          fontWeight: 500,
        }}
      >
        The Library
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontWeight: 600,
          fontSize: { xs: "1.875rem", sm: "2.5rem" },
          mt: 1,
        }}
      >
        Every patient gets the full shelf
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, maxWidth: 640, fontSize: "1.125rem", lineHeight: 1.7 }}
      >
        Written by our clinical team for real UK kitchens, supermarkets and
        living rooms. Yours from day one, included.
      </Typography>

      <Box
        sx={{
          mt: 8,
          borderRadius: 6,
          bgcolor: "muted.main",
          p: { xs: 4, md: 8 },
        }}
      >
        <Box
          role="img"
          aria-label="The Serava Library: six meal volumes, two strength volumes, and three foundations guides"
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: { xs: 1.5, md: 2 },
            overflowX: "auto",
            pb: 1,
          }}
        >
          {SPINES.map((spine) => (
            <Box
              key={spine.label}
              sx={{
                height: spine.height,
                width: spine.width,
                flexShrink: 0,
                bgcolor: spine.bgcolor,
                color: spine.color,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.03em",
                textAlign: "center",
                px: 1,
                boxShadow: 2,
              }}
            >
              {spine.label}
            </Box>
          ))}
        </Box>

        {/* Shelf board: the ledge the spines sit on */}
        <Box
          sx={{
            mt: 0,
            height: 10,
            borderRadius: 5,
            bgcolor: "background.paper",
            boxShadow: "0 14px 28px rgba(0,0,0,0.14)",
          }}
        />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Six meal volumes, two strength volumes, three foundations guides, plus
        session cards, a training log and pocket cards.
      </Typography>
    </Box>
  );
}

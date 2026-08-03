// src/components/LibraryShelf.tsx
// The Lifestyle Library, shown as a grid of book-cover cards grouped by
// category. Uses hairline borders (per the brand doc's own preference)
// instead of heavy shadows, which avoids the washed-out "hazy" look.
"use client";

import { Box, Typography } from "@mui/material";

type Volume = {
  title: string;
  category: string;
  bgcolor: string;
  color: string;
};

const VOLUMES: Volume[] = [
  {
    title: "Meal Library I",
    category: "Meals",
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    title: "Meal Library II",
    category: "Meals",
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    title: "Meal Library III",
    category: "Meals",
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    title: "Meal Library IV",
    category: "Meals",
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    title: "Meal Library V",
    category: "Meals",
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    title: "Meal Library VI",
    category: "Meals",
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
  },
  {
    title: "Strength I",
    category: "Strength",
    bgcolor: "accentBrand.main",
    color: "accentBrand.contrastText",
  },
  {
    title: "Strength II",
    category: "Strength",
    bgcolor: "accentBrand.main",
    color: "accentBrand.contrastText",
  },
  {
    title: "Water",
    category: "Foundations",
    bgcolor: "primary.main",
    color: "primary.contrastText",
  },
  {
    title: "The Safety Net",
    category: "Foundations",
    bgcolor: "status.amber",
    color: "secondary.contrastText",
  },
  {
    title: "The Supplement Guide",
    category: "Foundations",
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
          mt: 6,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(6, 1fr)",
          },
          gap: 3,
        }}
      >
        {VOLUMES.map((volume) => (
          <Box
            key={volume.title}
            sx={{
              position: "relative",
              aspectRatio: "3 / 4",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: volume.bgcolor,
              color: volume.color,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2.5,
              overflow: "hidden",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                opacity: 0.8,
                fontWeight: 600,
              }}
            >
              {volume.category}
            </Typography>

            <Typography
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.25,
              }}
            >
              {volume.title}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        Six meal volumes, two strength volumes, three foundations guides, plus
        session cards, a training log and pocket cards.
      </Typography>
    </Box>
  );
}

// src/components/TrustBand.tsx
// Left: a static photo collage of lifestyle photography (no before/after or
// transformation imagery, per the brand's photography compliance rule).
// Right: a bold statement, subcopy, and the site's standard eligibility
// CTA, on a soft tinted panel.
"use client";

import Link from "next/link";
import { Box, Typography, Button, Stack } from "@mui/material";

type Photo = {
  src: string;
};

const PHOTOS: Photo[] = [
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/s-img-1.jpeg" },
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/s-img-2.jpeg" },
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/s-img-3.jpeg" },
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/s-img-4.jpeg" },
];

// Static collage: a 2-column grid with the left column offset lower than
// the right, so the four photos read as an arranged wall rather than a
// grid of identical tiles. No animation, no looping — just a fixed layout.
function PhotoCollage() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
        height: "100%",
      }}
    >
      <Stack spacing={2} sx={{ pt: 5 }}>
        <Box
          component="img"
          src={PHOTOS[0].src}
          alt=""
          sx={{
            width: "100%",
            height: 220,
            borderRadius: 3,
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          component="img"
          src={PHOTOS[2].src}
          alt=""
          sx={{
            width: "100%",
            height: 260,
            borderRadius: 3,
            objectFit: "cover",
            display: "block",
          }}
        />
      </Stack>
      <Stack spacing={2}>
        <Box
          component="img"
          src={PHOTOS[1].src}
          alt=""
          sx={{
            width: "100%",
            height: 260,
            borderRadius: 3,
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          component="img"
          src={PHOTOS[3].src}
          alt=""
          sx={{
            width: "100%",
            height: 220,
            borderRadius: 3,
            objectFit: "cover",
            display: "block",
          }}
        />
      </Stack>
    </Box>
  );
}

export function TrustBand() {
  return (
    <Box
      component="section"
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 6, md: 10 } }}
    >
      <Box
        sx={{
          borderRadius: 6,
          overflow: "hidden",
          p: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            mx: "auto",
            maxWidth: 1360,
            display: "grid",
            // Photo column widened again, 560px -> 660px, per "bit wider".
            // Text column keeps the remaining space (1fr).
            gridTemplateColumns: { xs: "1fr", md: "660px 1fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              height: 560,
            }}
          >
            <PhotoCollage />
          </Box>

          <Stack spacing={3}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2.25rem" },
                lineHeight: 1.15,
                color: "text.primary",
              }}
            >
              Treatment, made personal
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.05rem", lineHeight: 1.6 }}
            >
              Ongoing care from a prescriber, with regular check-ins, treatment
              adjusted as you go, and a programme built to end well rather than
              run indefinitely.
            </Typography>
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                height: 320,
                mt: 1,
              }}
            >
              <PhotoCollage />
            </Box>

            <Box>
              <Button
                component={Link}
                href="/eligibility"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.5,
                  fontSize: "1.05rem",
                  color: "#fff",
                }}
              >
                Check your eligibility
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

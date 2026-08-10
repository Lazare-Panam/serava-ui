// src/components/TrustBand.tsx
// Left: a continuously scrolling column of lifestyle photography (no
// before/after or transformation imagery, per the brand's photography
// compliance rule). Right: a bold statement, subcopy, and the site's
// standard eligibility CTA, on a soft tinted panel.
"use client";

import Link from "next/link";
import { alpha } from "@mui/material/styles";
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

function PhotoColumn() {
  const looped = [...PHOTOS, ...PHOTOS];

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        borderRadius: 4,
      }}
    >
      <Box
        className="trust-scroll"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {looped.map((photo, i) => (
          <Box
            key={`${photo.src}-${i}`}
            component="img"
            src={photo.src}
            alt=""
            sx={{
              height: 260,
              width: "100%",
              flexShrink: 0,
              borderRadius: 3,
              objectFit: "cover",
              display: "block",
            }}
          />
        ))}
      </Box>

      <style>{`
        .trust-scroll {
          animation: trust-scroll-up 28s linear infinite;
        }
        @keyframes trust-scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-scroll {
            animation: none;
          }
        }
      `}</style>
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
            maxWidth: 1100,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "420px 1fr" },
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
            <PhotoColumn />
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
              run indefinitely..
            </Typography>
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                height: 280,
                mt: 1,
              }}
            >
              <PhotoColumn />
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

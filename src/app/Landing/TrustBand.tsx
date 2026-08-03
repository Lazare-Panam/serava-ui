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
  caption: string;
};

const PHOTOS: Photo[] = [
  { caption: "Supported from day one" },
  { caption: "A prescriber, not just a form" },
  { caption: "Real reviews, on a fixed rhythm" },
  { caption: "A plan you keep, after the programme ends" },
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
            key={`${photo.caption}-${i}`}
            sx={{
              height: 260,
              flexShrink: 0,
              display: "flex",
              alignItems: "flex-end",
              p: 2,
              borderRadius: 3,
              bgcolor: "muted.main",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              {photo.caption}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 48,
          background: (t) =>
            `linear-gradient(to bottom, ${t.palette.background.default}, transparent)`,
        }}
      />
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          height: 48,
          background: (t) =>
            `linear-gradient(to top, ${t.palette.background.default}, transparent)`,
        }}
      />

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
          bgcolor: (t) => alpha(t.palette.accentBrand.main, 0.08),
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
                fontSize: { xs: "2.25rem", sm: "3rem" },
                lineHeight: 1.15,
                color: "text.primary",
              }}
            >
              Built around a prescriber, not a form and a hope.
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.25rem", lineHeight: 1.7 }}
            >
              Your programme is personal, supervised, and never something you do
              alone. From your first consultation to the planned end of
              treatment, someone is checking in with you.
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
                sx={{ borderRadius: 999, px: 4, py: 1.5, fontSize: "1.05rem" }}
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

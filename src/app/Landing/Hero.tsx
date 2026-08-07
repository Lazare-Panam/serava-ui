// src/components/Hero.tsx
// Wordmark (own full-width row), then copy: headline, body, CTAs — all
// laid over a full-bleed background video for the section (falls back to
// a still poster image if the video can't/shouldn't play). A soft scrim
// sits between the footage and the copy so the text stays legible
// regardless of what's busy in the frame underneath.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { Box, Typography, Button, Stack } from "@mui/material";

const HERO_VIDEO_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/hero/hero-video.mp4";
const HERO_POSTER_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/hero/hero-img.jpg";

export function Hero() {
  // Video only plays if the browser lets it autoplay AND the visitor
  // hasn't asked for reduced motion — either way we fall back to the
  // still poster, which is why it's set as a real CSS background on the
  // section (not just the <video poster> attribute): it's there
  // immediately, before the video has decided whether it can play at all.
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReducedMotion) setPlayVideo(true);
  }, []);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid",
        borderColor: "divider",
        minHeight: { xs: 600, md: 780 },
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${HERO_POSTER_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {playVideo && (
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER_URL}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
            objectFit: "cover",
          }}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </Box>
      )}

      <Box
        sx={{
          position: "relative",
          mx: "auto",
          maxWidth: 1152,
          px: 3,
          py: { xs: 8, md: 12 },
          width: "100%",
        }}
      >
        <Box sx={{ maxWidth: 640 }}>
          <Typography
            sx={{
              position: "relative",
              zIndex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              wordSpacing: "0.12em",
              lineHeight: 0.9,
              fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
              mb: { xs: 1, md: 2 },
              color: "background.paper",
            }}
          >
            Serava Health
          </Typography>

          <Stack spacing={3}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.75rem" },
                fontWeight: 600,
                lineHeight: 1.15,
                color: "background.paper",
              }}
            >
              Care,{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Clearly.
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 480,
                fontSize: "1.1rem",
                lineHeight: 1.65,
                color: (t) => alpha(t.palette.background.paper, 0.88),
              }}
            >
              Led by independent prescribers, the programme runs on one to one
              consultations, blood tests, and structured monitoring — with full
              lifestyle support throughout, and an ending built in from day one.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={Link}
                href="/eligibility"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.2,
                  fontSize: "0.98rem",
                  color: "#FFFFFF",
                }}
              >
                Check your eligibility →
              </Button>
              <Button
                component={Link}
                href="#how"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.2,
                  fontSize: "0.98rem",
                }}
              >
                How it works →
              </Button>
            </Stack>
            {/* <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "0.92rem" }}
            >
              Takes about five minutes. No obligation, and no payment to
              check.
            </Typography> */}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

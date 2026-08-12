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
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReducedMotion) setPlayVideo(true);
  }, []);

  return (
    <Box component="header">
      {/* Announcement banner — its own full-width row above the hero,
          not part of the hero's flex-centered content and not behind
          the absolutely-positioned video. */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          textAlign: "center",
          py: 1,
          px: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.82rem",
            fontWeight: 500,
            textTransform: "none",
          }}
        >
          New appointments added this week.{" "}
          <Box
            component={Link}
            href="/eligibility"
            sx={{
              color: "inherit",
              fontWeight: 700,
              textDecoration: "underline",
              textTransform: "none",
            }}
          >
            Book now
          </Box>
        </Typography>
      </Box>

      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 600, md: 780 },
          display: "flex",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          bgcolor: "#fff",
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
            sx={{
              position: "absolute",
              top: -1,
              left: -1,
              right: -1,
              bottom: -1,
              width: "calc(100% + 2px)",
              height: "calc(100% + 2px)",
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
                Weight loss is medicine, and it's treated that way here, led by
                an independent prescriber from day one, with one to one
                consultations, blood tests, and proper monitoring along the way.
                Full support throughout, and an ending that's planned from the
                start, not an afterthought.
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
                  href="/how-it-works"
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
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

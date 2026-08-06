// src/components/Hero.tsx
// Wordmark (own full-width row), then copy: headline, body, CTAs — all
// laid over a single full-bleed background photo for the section. A soft
// scrim sits between the photo and the copy so the text stays legible
// regardless of what's busy in the image underneath.
"use client";

import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { Box, Typography, Button, Stack } from "@mui/material";

export function Hero() {
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
        backgroundImage:
          "url(https://pblol2.blob.core.windows.net/serava-ui/hero/hero-img.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Scrim: a dark, on-brand (inkCharcoal) tint over the photo, heavier
          on the left where the copy sits and fading out toward the right.
          The type below is now light-coloured to read against the photo,
          so this scrim is what actually earns that contrast — remove it
          and the light text will wash out against a bright image. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg, rgba(29,36,48,0.8) 0%, rgba(29,36,48,0.64) 40%, rgba(29,36,48,0.22) 75%)",
        }}
      />

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

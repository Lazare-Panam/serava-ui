// src/components/Hero.tsx
// Left: wordmark (own full-width row), then a grid row below it: copy on
// the left, photo mosaic on the right as a real grid column — not an
// absolutely-positioned overlay — so the two can never visually collide
// regardless of wordmark text width at any screen size. Plain, uniform
// background — no gradient glows.
"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button, Stack } from "@mui/material";

function PhotoMosaic() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          flex: 1,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Image
          src="https://pblol2.blob.core.windows.net/serava-ui/hero/food-img.jpg"
          alt="A balanced, colourful meal"
          fill
          className="kenburns-a"
          style={{ objectFit: "cover" }}
          sizes="440px"
        />
      </Box>

      <Box
        sx={{
          position: "relative",
          flex: 1,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Image
          src="https://pblol2.blob.core.windows.net/serava-ui/hero/doctor.jpg"
          alt="A prescriber"
          fill
          className="kenburns-b"
          style={{ objectFit: "cover" }}
          sizes="440px"
        />
      </Box>

      <style>{`
        .kenburns-a {
          animation: kenburns-zoom 14s ease-in-out infinite alternate;
        }
        .kenburns-b {
          animation: kenburns-zoom 18s ease-in-out infinite alternate;
        }
        @keyframes kenburns-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kenburns-a, .kenburns-b {
            animation: none;
          }
        }
      `}</style>
    </Box>
  );
}

export function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          position: "relative",
          mx: "auto",
          maxWidth: 1152,
          px: 3,
          py: { xs: 6, md: 10 },
        }}
      >
        {/* Copy column (wordmark + headline + body + CTAs) and the photo
            mosaic are both direct children of this grid, so their top
            edges start at exactly the same vertical position — the
            mosaic's top now lines up with "Serava Health" itself. */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 440px" },
            gap: { xs: 5, md: 6 },
          }}
        >
          <Box>
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
                color: "primary.main",
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
                }}
              >
                Care,{" "}
                <Box component="span" sx={{ color: "secondary.main" }}>
                  Clearly.
                </Box>
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 480, fontSize: "1.1rem", lineHeight: 1.65 }}
              >
                Led by independent prescribers, the programme runs on one to one
                consultations, blood tests, and structured monitoring — with
                full lifestyle support throughout, and an ending built in from
                day one.
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

          {/* Mosaic: stretches to match the left column's full height, so
              its top edge lines up with the wordmark above it and its
              bottom edge lines up with the reassurance line. */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              height: "100%",
              minHeight: 480,
            }}
          >
            <PhotoMosaic />
          </Box>

          {/* Mobile: mosaic stacks below the copy in its own row */}
          <Box sx={{ display: { xs: "block", md: "none" }, height: 340 }}>
            <PhotoMosaic />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// src/components/Hero.tsx
// Left: eyebrow, headline, copy, CTAs, reassurance line.
// Right: a continuously scrolling photo carousel; every photo has its own
// MUI Tooltip revealing more detail on hover. Pure MUI, no Tailwind.
"use client";

import Link from "next/link";
import { Box, Typography, Button, Tooltip, Paper, Stack } from "@mui/material";

type PlaceholderPhoto = {
  caption: string;
  detail: string;
};

const PLACEHOLDER_IMAGES: PlaceholderPhoto[] = [
  {
    caption: "Cooking at home",
    detail:
      "Real meals from the Lifestyle Library, built around food you already buy.",
  },
  {
    caption: "Walking, everyday",
    detail:
      "Movement that fits your day, not a gym schedule you have to force.",
  },
  {
    caption: "Resistance band by the sofa",
    detail:
      "Strength training you can do at home, no equipment required beyond this.",
  },
  {
    caption: "Water jug with fruit",
    detail:
      "Simple hydration habits, covered in the Lifestyle Library's Water guide.",
  },
  {
    caption: "Supermarket shelves",
    detail:
      "Guidance for real UK supermarkets, not idealised meal-kit photography.",
  },
];

function PhotoCarousel({ fill = false }: { fill?: boolean }) {
  // Duplicate the list once so the CSS animation can loop seamlessly from
  // the midpoint back to the start with no visible seam.
  const looped = [...PLACEHOLDER_IMAGES, ...PLACEHOLDER_IMAGES];

  return (
    <Box
      sx={{
        position: "relative",
        ...(fill ? { height: "100%" } : { aspectRatio: "4 / 3" }),
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      <Stack className="scroll-column" spacing={2} sx={{ p: 2 }}>
        {looped.map((photo, i) => (
          <Tooltip
            key={`${photo.caption}-${i}`}
            title={photo.detail}
            placement="right"
            arrow
          >
            <Paper
              variant="outlined"
              sx={{
                height: 220,
                width: "100%",
                flexShrink: 0,
                display: "flex",
                alignItems: "flex-end",
                p: 2,
                borderRadius: 2,
                bgcolor: "muted.main",
                cursor: "default",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {photo.caption}
              </Typography>
            </Paper>
          </Tooltip>
        ))}
      </Stack>

      {/* Fade the top and bottom edges so photos don't hard-cut at the frame */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 64,
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
          height: 64,
          background: (t) =>
            `linear-gradient(to top, ${t.palette.background.default}, transparent)`,
        }}
      />

      <style>{`
        .scroll-column {
          animation: scroll-up 32s linear infinite;
        }
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-column {
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
      {/* Soft radial glows — each blob is actually two overlapping layers
          (teal + iris) that crossfade into one another on a loop, so the
          colour itself visibly swaps back and forth over time. The outer
          wrapper keeps the slow position drift from before. */}
      <Box
        className="glow-1"
        sx={{
          pointerEvents: "none",
          position: "absolute",
          right: -220,
          top: -280,
          height: 780,
          width: 780,
          filter: "blur(70px)",
        }}
      >
        <Box
          className="glow-1-teal"
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: (t) =>
              `radial-gradient(circle, ${t.palette.primary.main}b3 0%, ${t.palette.primary.main}59 45%, transparent 85%)`,
          }}
        />
        <Box
          className="glow-1-iris"
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: (t) =>
              `radial-gradient(circle, ${t.palette.accentBrand.main}b3 0%, ${t.palette.accentBrand.main}59 45%, transparent 85%)`,
          }}
        />
      </Box>

      <Box
        className="glow-2"
        sx={{
          pointerEvents: "none",
          position: "absolute",
          left: -220,
          bottom: -220,
          height: 600,
          width: 600,
          filter: "blur(70px)",
        }}
      >
        <Box
          className="glow-2-iris"
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: (t) =>
              `radial-gradient(circle, ${t.palette.accentBrand.main}b3 0%, ${t.palette.accentBrand.main}59 45%, transparent 85%)`,
          }}
        />
        <Box
          className="glow-2-teal"
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: (t) =>
              `radial-gradient(circle, ${t.palette.primary.main}b3 0%, ${t.palette.primary.main}59 45%, transparent 85%)`,
          }}
        />
      </Box>

      <style>{`
        .glow-1 {
          animation: glow-drift-1 22s ease-in-out infinite;
        }
        .glow-2 {
          animation: glow-drift-2 26s ease-in-out infinite;
        }
        .glow-1-teal {
          animation: crossfade-a 14s ease-in-out infinite;
        }
        .glow-1-iris {
          animation: crossfade-b 14s ease-in-out infinite;
        }
        .glow-2-iris {
          animation: crossfade-a 18s ease-in-out infinite;
        }
        .glow-2-teal {
          animation: crossfade-b 18s ease-in-out infinite;
        }
        @keyframes crossfade-a {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes crossfade-b {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes glow-drift-1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(-40px, 30px) scale(1.08); }
          50%  { transform: translate(20px, 60px) scale(0.96); }
          75%  { transform: translate(-25px, -20px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes glow-drift-2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          30%  { transform: translate(35px, -25px) scale(1.06); }
          60%  { transform: translate(-20px, -50px) scale(0.94); }
          85%  { transform: translate(25px, 15px) scale(1.03); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .glow-1, .glow-2, .glow-1-teal, .glow-1-iris, .glow-2-iris, .glow-2-teal {
            animation: none;
          }
        }
      `}</style>

      <Box
        sx={{
          position: "relative",
          mx: "auto",
          maxWidth: 1152,
          px: 3,
          py: { xs: 8, md: 12 },
        }}
      >
        {/* Photo column: absolutely positioned, z-index above the wordmark,
            runs the full height of the hero so it overlaps the wordmark's
            right edge — same device as the WW reference. */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            right: 24,
            top: 24,
            bottom: 24,
            width: 340,
            zIndex: 1,
          }}
        >
          <PhotoCarousel fill />
        </Box>

        {/* Wordmark: full width, single line, sits behind the photo column
            (z-index 1) so its right portion runs underneath it. Single
            Eucalyptus Teal per explicit request — this fails the brand
            doc's own text-contrast rule, flagged separately in chat.
            fontSize uses clamp() so it stays genuinely huge and scales
            fluidly with viewport width, matching the reference's scale. */}
        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            wordSpacing: "0.15em",
            lineHeight: 0.88,
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            mb: { xs: 2, md: 3 },
            color: "primary.main",
          }}
        >
          Serava Health
        </Typography>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            pr: { md: "440px" },
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                letterSpacing: "0.2em",
                fontWeight: 500,
              }}
            >
              Private weight management
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.25rem", sm: "3rem" },
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              Weight care,{" "}
              <Box component="span" sx={{ color: "secondary.main" }}>
                done properly.
              </Box>
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 480, fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              A programme led by independent prescribers: one to one
              consultations, blood tests, structured monitoring, and full
              lifestyle support, with a planned ending.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={Link}
                href="/eligibility"
                variant="contained"
                size="large"
                sx={{ borderRadius: 999, px: 4, color: "#FFFFFF" }}
              >
                Check your eligibility →
              </Button>
              <Button
                component={Link}
                href="#how"
                variant="outlined"
                size="large"
                sx={{ borderRadius: 999, px: 4 }}
              >
                How it works →
              </Button>
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Takes about five minutes. No obligation, and no payment to check.
            </Typography>
          </Stack>

          {/* Photo carousel repeats here for mobile, stacked below the copy
              instead of running alongside the wordmark. */}
          <Box
            sx={{ display: { xs: "block", md: "none" }, mt: 5, height: 320 }}
          >
            <PhotoCarousel fill />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

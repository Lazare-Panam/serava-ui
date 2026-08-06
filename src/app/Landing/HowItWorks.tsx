// src/components/HowItWorks.tsx
// Five-step journey. The connecting line draws in once on scroll, growing
// from step 1 across to step 5 — a straight line moving at constant speed —
// so the dot fill delays (a linear fraction of total duration) line up with
// where the line visually is at that moment. Each dot fills with colour and
// gains a white border as the line passes it. Only the dots themselves are
// clickable links (placeholder href="#" until real destinations exist),
// with a glossy sheen sweep on hover so they read as interactive. Falls
// back to a plain vertical timeline on mobile.
"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

type Step = {
  title: string;
  detail: string;
};

const STEPS: Step[] = [
  {
    title: "Eligibility check",
    detail:
      "A free five-minute form to see if this is likely to be safe and suitable.",
  },
  {
    title: "Medical questionnaire",
    detail:
      "A detailed history, plus identity, height and weight verification.",
  },
  {
    title: "Video consultation",
    detail:
      "Up to an hour, one to one with a prescriber. The decision is shared.",
  },
  {
    title: "Your plan and first delivery",
    detail: "Your treatment plan, your Library, and your first package.",
  },
  {
    title: "Reviews, then the off-ramp",
    detail:
      "Scheduled reviews, moving into a maintenance phase designed to bring things to a steady close.",
  },
];

// Total time for the line to draw across all five dots, step 1 to step 5.
// Each dot's fill delay is a fraction of this, so the last dot lights up
// right as the line finishes drawing.
const LINE_DURATION = 3.6;

// Diameter of the desktop dot. The line's vertical position is derived
// directly from this (half of it), so the two can never drift out of sync
// again — bump this and the line re-centres itself automatically.
const DOT_SIZE = 72;

// Shared sx for the glossy sheen sweep + hover pop, factored out since both
// the desktop and mobile dot are otherwise near-identical.
function shinyDotSx(drawn: boolean, delay: number) {
  return {
    position: "relative" as const,
    overflow: "hidden" as const,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: 1,
    border: "2px solid",
    borderColor: drawn ? "#FFFFFF" : "primary.main",
    bgcolor: drawn ? "primary.main" : "background.paper",
    color: drawn ? "#FFFFFF" : "secondary.main",
    cursor: "pointer",
    // color/border/background transition keeps its scroll-timed delay;
    // transform/box-shadow (hover feedback) get their own transition with
    // no delay, so hovering never feels laggy once "drawn" has fired.
    transition: `background-color 0.5s ease ${delay}s, color 0.5s ease ${delay}s, border-color 0.5s ease ${delay}s, transform 0.2s ease, box-shadow 0.2s ease`,
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-60%",
      width: "35%",
      height: "100%",
      background:
        "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
      transform: "skewX(-20deg)",
    },
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
    },
    "&:hover::after": {
      left: "115%",
      transition: "left 0.7s ease",
    },
  };
}

// The connecting line. It's a plain, perfectly flat horizontal stroke — no
// viewBox distortion to fight — positioned so its centre sits exactly at
// DOT_SIZE / 2 from the top of the row, which is exactly where the dot
// circles are centred too (they're the first thing in each grid column,
// so their own centre is also DOT_SIZE / 2 from the row's top). The ends
// fade out via a gradient rather than cutting off hard, which is what
// actually reads as "graceful" rather than a flat ruled line.
//
// Horizontally it runs from the centre of the first dot's column to the
// centre of the last dot's column (10% to 90%, since 5 equal columns put
// column i's centre at (i + 0.5) / 5), so it visually originates from and
// terminates in the dots themselves instead of floating past their edges.
function CareLinePath({ drawn }: { drawn: boolean }) {
  const gradientId = useId();

  return (
    <Box
      component="svg"
      viewBox="0 0 1000 6"
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        top: DOT_SIZE / 2,
        transform: "translateY(-50%)",
        width: "100%",
        height: 6,
        display: { xs: "none", md: "block" },
      }}
    >
      <defs>
        {/*
          gradientUnits must be userSpaceOnUse here. The default,
          objectBoundingBox, derives its coordinate system from the path's
          own bounding box — and a perfectly horizontal line has a
          bounding box with zero height. Per the SVG spec, an
          objectBoundingBox paint server on a zero-area bounding box simply
          doesn't render (not even a fallback colour), which is why the
          whole line vanished the moment this became a gradient instead of
          a flat stroke colour. userSpaceOnUse anchors x1/x2 to the same
          0–1000 coordinate space as the path's own "d" data, sidestepping
          the bounding-box calculation entirely.
        */}
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="100"
          y1="3"
          x2="900"
          y2="3"
        >
          <stop offset="0%" stopColor="#2AB3A6" stopOpacity={0} />
          <stop offset="8%" stopColor="#2AB3A6" stopOpacity={0.55} />
          <stop offset="92%" stopColor="#2AB3A6" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#2AB3A6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d="M100 3 L900 3"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: drawn ? 0 : 1,
          transition: `stroke-dashoffset ${LINE_DURATION}s linear`,
        }}
      />
    </Box>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setDrawn(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="section"
      id="how"
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 10, md: 16 } }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "secondary.main",
          letterSpacing: "0.2em",
          fontWeight: 500,
        }}
      >
        How it works
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontWeight: 600,
          fontSize: { xs: "2.25rem", sm: "3rem" },
          mt: 1,
        }}
      >
        Five steps, one continuous line of care
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, maxWidth: 720, fontSize: "1.125rem", lineHeight: 1.7 }}
      >
        You are never handed a prescription and left to it. Every step below is
        part of one supervised journey, and it ends with a plan, not a cliff
        edge.
      </Typography>

      {/* Desktop: five staggered dots along a scroll-drawn connecting line */}
      <Box
        ref={sectionRef}
        sx={{
          position: "relative",
          mt: 10,
          display: { xs: "none", md: "block" },
        }}
      >
        <CareLinePath drawn={drawn} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 4,
          }}
        >
          {STEPS.map((step, i) => {
            // Fraction of the line this dot roughly sits at (0 to 1),
            // used to time this dot's fill so it lands as the line arrives.
            const fraction = i / (STEPS.length - 1);
            const delay = fraction * LINE_DURATION;

            return (
              <Box key={step.title} sx={{ textAlign: "center" }}>
                <Box
                  component={Link}
                  href="#"
                  aria-label={`Step ${i + 1}: ${step.title}`}
                  sx={{
                    ...shinyDotSx(drawn, delay),
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    mx: "auto",
                    mb: 3,
                    fontSize: "1.25rem",
                  }}
                >
                  {i + 1}
                </Box>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "1.15rem", mb: 1 }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: 240, mx: "auto", lineHeight: 1.6 }}
                >
                  {step.detail}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Mobile: plain vertical timeline, no SVG — but dots still fill in
          sequence top-to-bottom, using the same shared trigger. */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          mt: 7,
          ml: 3,
          pl: 4,
          borderLeft: "3px solid",
          borderColor: "primary.main",
        }}
      >
        {STEPS.map((step, i) => {
          const fraction = i / (STEPS.length - 1);
          const delay = fraction * LINE_DURATION;

          return (
            <Box key={step.title} sx={{ position: "relative", py: 2.5 }}>
              <Box
                component={Link}
                href="#"
                aria-label={`Step ${i + 1}: ${step.title}`}
                sx={{
                  ...shinyDotSx(drawn, delay),
                  position: "absolute",
                  left: -60,
                  top: 18,
                  width: 44,
                  height: 44,
                  fontSize: "1rem",
                }}
              >
                {i + 1}
              </Box>
              <Typography
                sx={{ fontWeight: 600, fontSize: "1.05rem", mb: 0.5 }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {step.detail}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
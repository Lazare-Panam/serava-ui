// src/components/HowItWorks.tsx
// Five-step journey, connected by a continuous line that draws in once on
// scroll (the brand's "care line" device). Falls back to a plain vertical
// timeline on mobile, where the SVG line doesn't make sense at narrow width.
"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

type Step = {
  title: string;
  detail: string;
  offset: number; // vertical stagger, px — matches the reference's flowing layout
};

const STEPS: Step[] = [
  {
    title: "Eligibility check",
    detail:
      "A free five-minute form to see if this is likely to be safe and suitable.",
    offset: -6,
  },
  {
    title: "Medical questionnaire",
    detail:
      "A detailed history, plus identity, height and weight verification.",
    offset: 12,
  },
  {
    title: "Video consultation",
    detail:
      "Up to an hour, one to one with a prescriber. The decision is shared.",
    offset: -8,
  },
  {
    title: "Your plan and first delivery",
    detail: "Your treatment plan, your Library, and your first package.",
    offset: 12,
  },
  {
    title: "Reviews, then the off-ramp",
    detail: "Regular reviews, and a planned maintenance phase to finish.",
    offset: -4,
  },
];

function CareLinePath() {
  const pathRef = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setDrawn(true);
      return;
    }

    const el = pathRef.current;
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
      component="svg"
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 6,
        width: "100%",
        height: 120,
        display: { xs: "none", md: "block" },
      }}
    >
      <path
        ref={pathRef}
        d="M20 56 C 90 20, 150 96, 220 78 S 380 24, 500 52 S 660 100, 780 76 S 930 30, 985 54"
        fill="none"
        stroke="#2AB3A6"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.5}
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: drawn ? 0 : 1,
          transition: "stroke-dashoffset 1.6s ease",
        }}
      />
    </Box>
  );
}

export function HowItWorks() {
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
        sx={{
          position: "relative",
          mt: 10,
          display: { xs: "none", md: "block" },
        }}
      >
        <CareLinePath />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 4,
          }}
        >
          {STEPS.map((step, i) => (
            <Box
              key={step.title}
              sx={{
                textAlign: "center",
                transform: `translateY(${step.offset}px)`,
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  mx: "auto",
                  mb: 3,
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  border: "2px solid",
                  borderColor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "secondary.main",
                  boxShadow: 1,
                }}
              >
                {i + 1}
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: "1.15rem", mb: 1 }}>
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
          ))}
        </Box>
      </Box>

      {/* Mobile: plain vertical timeline, no SVG — matches the reference's
          own fallback, since a wavy line across a narrow column doesn't work */}
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
        {STEPS.map((step, i) => (
          <Box key={step.title} sx={{ position: "relative", py: 2.5 }}>
            <Box
              sx={{
                position: "absolute",
                left: -60,
                top: 18,
                width: 44,
                height: 44,
                borderRadius: "50%",
                bgcolor: "background.paper",
                border: "2px solid",
                borderColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                color: "secondary.main",
              }}
            >
              {i + 1}
            </Box>
            <Typography sx={{ fontWeight: 600, fontSize: "1.05rem", mb: 0.5 }}>
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
        ))}
      </Box>
    </Box>
  );
}

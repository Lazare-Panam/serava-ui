// src/components/HowItWorks.tsx
// Five-step journey. The connecting line draws in once on scroll, and each
// step's dot fills with colour on a delay timed to match roughly when the
// travelling line would reach it — line and dots share one trigger so
// they're synchronized, not two independent animations that happen to
// overlap. Dots sit in a flat row (no per-dot vertical stagger) and the
// line is a gentle, low-amplitude wave, so the line reliably stays close
// to every dot instead of drifting away from one at certain widths.
// Falls back to a plain vertical timeline on mobile.
"use client";

import { useEffect, useRef, useState } from "react";
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
    detail: "Regular reviews, and a planned maintenance phase to finish.",
  },
];

// Total time for the line to draw across all five dots. Each dot's fill
// delay is a fraction of this, so the last dot lights up right as the line
// finishes drawing.
const LINE_DURATION = 2.2;

function CareLinePath({ drawn }: { drawn: boolean }) {
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
        d="M20 54 C 90 44, 150 64, 220 56 S 380 46, 500 54 S 660 62, 780 54 S 930 46, 985 54"
        fill="none"
        stroke="#2AB3A6"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.5}
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: drawn ? 0 : 1,
          transition: `stroke-dashoffset ${LINE_DURATION}s ease`,
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
                  sx={{
                    width: 72,
                    height: 72,
                    mx: "auto",
                    mb: 3,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    boxShadow: 1,
                    border: "2px solid",
                    borderColor: "primary.main",
                    bgcolor: drawn ? "primary.main" : "background.paper",
                    color: drawn ? "#FFFFFF" : "secondary.main",
                    transition: "background-color 0.5s ease, color 0.5s ease",
                    transitionDelay: `${delay}s`,
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
                sx={{
                  position: "absolute",
                  left: -60,
                  top: 18,
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                  border: "2px solid",
                  borderColor: "primary.main",
                  bgcolor: drawn ? "primary.main" : "background.paper",
                  color: drawn ? "#FFFFFF" : "secondary.main",
                  transition: "background-color 0.5s ease, color 0.5s ease",
                  transitionDelay: `${delay}s`,
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

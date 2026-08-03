// src/components/Outcomes.tsx
// Three outcome cards on a light teal-tinted panel. All charts and the big
// numbers animate in once, when the section scrolls into view — the line
// draws, the donut fills, the area rises, the numbers count up. Respects
// prefers-reduced-motion (everything just appears in its final state).
//
// The figures below are ILLUSTRATIVE CONCEPT NUMBERS, not real outcomes
// data — you said this is fine for now since it's a work-in-progress
// concept. Before this goes live publicly, replace every number with a
// real, evidenced figure. Never publish a fabricated statistic.
// The partner-logo row is a structural placeholder only — do not add a
// real institution's name/logo unless a genuine, signed partnership exists.
"use client";

import { useEffect, useRef, useState } from "react";
import { alpha } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function AnimatedNumber({
  value,
  suffix = "",
  inView,
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

function TrendLine({ inView }: { inView: boolean }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 200 100"
      sx={{ width: "100%", height: 100 }}
      aria-hidden="true"
    >
      <path
        d="M10 20 C 60 30, 90 70, 130 80 S 180 88, 190 90"
        fill="none"
        stroke="#2AB3A6"
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: inView ? 0 : 1,
          transition: "stroke-dashoffset 1.4s ease",
        }}
      />
      <circle
        cx="10"
        cy="20"
        r="4"
        fill="#2AB3A6"
        opacity={inView ? 1 : 0}
        style={{ transition: "opacity 0.3s ease" }}
      />
      <circle
        cx="190"
        cy="90"
        r="4"
        fill="#2AB3A6"
        opacity={inView ? 1 : 0}
        style={{ transition: "opacity 0.3s ease 1.2s" }}
      />
    </Box>
  );
}

function DonutChart({ percent, inView }: { percent: number; inView: boolean }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - (inView ? percent : 0) / 100);

  return (
    <Box
      component="svg"
      viewBox="0 0 120 120"
      sx={{ width: 130, height: 130 }}
      aria-hidden="true"
    >
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth={12}
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="#2F5D50"
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 1.4s ease" }}
      />
    </Box>
  );
}

function TrendArea({ inView }: { inView: boolean }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 200 100"
      sx={{ width: "100%", height: 100 }}
      aria-hidden="true"
    >
      <path
        d="M10 80 L 50 65 L 90 70 L 130 40 L 170 25 L 190 15 L 190 100 L 10 100 Z"
        fill="rgba(42,179,166,0.20)"
        opacity={inView ? 1 : 0}
        style={{ transition: "opacity 1s ease 0.4s" }}
      />
      <path
        d="M10 80 L 50 65 L 90 70 L 130 40 L 170 25 L 190 15"
        fill="none"
        stroke="#2AB3A6"
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: inView ? 0 : 1,
          transition: "stroke-dashoffset 1.4s ease",
        }}
      />
    </Box>
  );
}

function BarCompare({ inView }: { inView: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 4,
        height: 140,
        mt: 2,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: 56,
            height: inView ? 60 : 0,
            bgcolor: "muted.main",
            borderRadius: 1.5,
            transition: "height 1.1s ease",
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          Without tests
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: 56,
            height: inView ? 120 : 0,
            background: "linear-gradient(180deg, #2AB3A6 0%, #1F8A80 100%)",
            borderRadius: 1.5,
            transition: "height 1.1s ease 0.15s",
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          With tests
        </Typography>
      </Box>
    </Box>
  );
}

export function Outcomes() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Box
      component="section"
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 8, md: 12 } }}
    >
      <Box
        ref={ref}
        sx={{
          borderRadius: 6,
          bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
          color: "text.primary",
          p: { xs: 4, md: 8 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 600,
            fontSize: { xs: "2rem", sm: "2.75rem" },
            textAlign: "center",
            mb: { xs: 6, md: 8 },
          }}
        >
          Outcomes we can{" "}
          <Box component="span" sx={{ color: "secondary.main" }}>
            measure
          </Box>
          , not just promise
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
            maxWidth: 1300,
            mx: "auto",
          }}
        >
          {/* Card 1: wide, spans both columns on desktop */}
          <Box
            sx={{
              gridColumn: { md: "1 / -1" },
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 3, md: 4 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 3,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                Average change vs. no support
              </Typography>
              <Typography
                sx={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 800,
                  fontSize: "3rem",
                  lineHeight: 1,
                }}
              >
                <AnimatedNumber value={5} suffix="×" inView={inView} />
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, maxWidth: 320 }}
              >
                Concept figure — to be replaced with a real, evidenced result
                once we have outcomes data.
              </Typography>
            </Box>
            <TrendLine inView={inView} />
          </Box>

          {/* Card 2: donut */}
          <Box
            sx={{
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                alignSelf: "flex-start",
              }}
            >
              Felt supported throughout
            </Typography>
            <DonutChart percent={68} inView={inView} />
            <Typography
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 800,
                fontSize: "2rem",
              }}
            >
              <AnimatedNumber value={68} suffix="%" inView={inView} />
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Concept figure — replace with a real result before shipping.
            </Typography>
          </Box>

          {/* Card 3: area trend */}
          <Box
            sx={{
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              Programme completion rate
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 800,
                fontSize: "2.25rem",
                mt: 1,
              }}
            >
              <AnimatedNumber value={82} suffix="%" inView={inView} />
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 1 }}
            >
              Concept figure — replace with a real result before shipping.
            </Typography>
            <TrendArea inView={inView} />
          </Box>

          {/* Card 4: bar comparison */}
          <Box
            sx={{
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              Blood tests and outcomes
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 800,
                fontSize: "2.25rem",
                mt: 1,
              }}
            >
              <AnimatedNumber value={2} suffix="×" inView={inView} />
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 1 }}
            >
              Concept figure — patients with monitoring blood tests are more
              likely to reach a meaningful result. Replace before shipping.
            </Typography>
            <BarCompare inView={inView} />
          </Box>
        </Box>

        {/* Partner row — structural placeholder only. Do not add a real
            institution's name/logo unless a genuine, signed partnership
            exists. Implying affiliation with an institution that hasn't
            actually partnered with Serava is a false claim, not a style
            choice. */}
        <Box sx={{ mt: { xs: 6, md: 8 }, textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            Partner institutions — add only if a real partnership exists
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 5,
              mt: 2,
              flexWrap: "wrap",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                sx={{
                  height: 32,
                  width: 100,
                  borderRadius: 1,
                  bgcolor: "muted.main",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

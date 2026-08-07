// src/components/Outcomes.tsx
// Outcome stats restyled as a cluster of frosted-glass tiles floating over
// a full-bleed lifestyle photo, instead of a flat card grid on a solid
// teal panel. Each tile fades and rises into place, staggered, the first
// time the section scrolls into view; the charts inside animate on that
// same trigger. Respects prefers-reduced-motion (everything just appears
// in its final state, no motion).
//
// The figures below are ILLUSTRATIVE CONCEPT NUMBERS, not real outcomes
// data — this is fine for now as a work-in-progress concept. Before this
// goes live publicly, replace every number with a real, evidenced figure.
// Never publish a fabricated statistic.
// The partner-logo row is a structural placeholder only — do not add a
// real institution's name/logo unless a genuine, signed partnership exists.
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { alpha } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

// Placeholder — no image was specified for this section. This reuses an
// asset already used elsewhere on the page (TrustBand); swap in a
// dedicated photo before shipping so it doesn't repeat.
const BACKGROUND_IMAGE_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/hero/sv-analytics-section.jpg";

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
      sx={{ width: 110, height: 110 }}
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
        height: 120,
        mt: 1,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: 48,
            height: inView ? 50 : 0,
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
            width: 48,
            height: inView ? 100 : 0,
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

// A single frosted-glass stat tile. Fades up into place on the section's
// shared `inView` trigger, with `delay` staggering the cluster so they
// don't all snap in at once — that stagger is most of what makes it read
// as "floating in" rather than a plain card grid just appearing.
function Tile({
  inView,
  delay = 0,
  sx,
  children,
}: {
  inView: boolean;
  delay?: number;
  sx?: SxProps<Theme>;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        borderRadius: 5,
        bgcolor: (t) => alpha(t.palette.background.paper, 0.85),
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 12px 32px rgba(29,36,48,0.18)",
        p: { xs: 2.5, sm: 3 },
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function TileLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
    >
      {children}
    </Typography>
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
          position: "relative",
          overflow: "hidden",
          borderRadius: 6,
          minHeight: { xs: 640, md: 760 },
          backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 4, md: 8 },
        }}
      >
        {/* A faint vignette, not a legibility scrim — the tiles and the
            heading pill below carry their own contrast (they're opaque
            glass surfaces), so this is purely for a bit of depth. */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 90% at 50% 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.18) 100%)",
          }}
        />

        <Box sx={{ position: "relative", textAlign: "center", maxWidth: 720 }}>
          <Box
            sx={{
              display: "inline-block",
              bgcolor: (t) => alpha(t.palette.background.paper, 0.85),
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderRadius: 999,
              px: 3,
              py: 1,
              mb: 3,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                letterSpacing: "0.2em",
                fontWeight: 600,
              }}
            >
              Outcomes
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 600,
              fontSize: { xs: "2rem", sm: "2.75rem" },
              color: "background.paper",
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            Outcomes we can{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              measure
            </Box>
            , not just promise
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 640,
            mt: { xs: 5, md: 7 },
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {/* Tile 1: donut */}
          <Tile inView={inView} delay={0}>
            <TileLabel>Felt supported throughout</TileLabel>
            <Box sx={{ display: "flex", justifyContent: "center", my: 1.5 }}>
              <DonutChart percent={68} inView={inView} />
            </Box>
            <Typography
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 800,
                fontSize: "1.75rem",
                textAlign: "center",
              }}
            >
              <AnimatedNumber value={68} suffix="%" inView={inView} />
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "center", mt: 0.5 }}
            >
              Concept figure — replace before shipping.
            </Typography>
          </Tile>

          {/* Tile 2: blood tests bar comparison */}
          <Tile inView={inView} delay={0.12}>
            <TileLabel>Blood tests and outcomes</TileLabel>
            <Typography
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 800,
                fontSize: "1.75rem",
                mt: 0.5,
              }}
            >
              <AnimatedNumber value={2} suffix="×" inView={inView} />
            </Typography>
            <BarCompare inView={inView} />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              Concept figure — replace before shipping.
            </Typography>
          </Tile>

          {/* Tile 3: wide — average change vs no support */}
          <Tile
            inView={inView}
            delay={0.24}
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              alignItems: "center",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Box>
              <TileLabel>Average change vs. no support</TileLabel>
              <Typography
                sx={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 800,
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  mt: 0.5,
                }}
              >
                <AnimatedNumber value={5} suffix="×" inView={inView} />
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  mt: 0.5,
                  maxWidth: 260,
                  mx: { xs: "auto", sm: 0 },
                }}
              >
                Concept figure — to be replaced with a real, evidenced result
                once we have outcomes data.
              </Typography>
            </Box>
            <TrendLine inView={inView} />
          </Tile>

          {/* Tile 4: wide — programme completion */}
          <Tile inView={inView} delay={0.36} sx={{ gridColumn: "1 / -1" }}>
            <TileLabel>Programme completion rate</TileLabel>
            <Typography
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 800,
                fontSize: "2rem",
                mt: 0.5,
              }}
            >
              <AnimatedNumber value={82} suffix="%" inView={inView} />
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 1 }}
            >
              Concept figure — replace with a real result before shipping.
            </Typography>
            <TrendArea inView={inView} />
          </Tile>
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
  );
}

// src/components/Outcomes.tsx
// Outcome stats as a cluster of frosted-glass tiles floating over a
// full-bleed lifestyle photo. Heading sits in its own frosted card (not
// just a text-shadow) so it reads clearly regardless of what's busy in the
// photo behind it. Tiles fade + rise + scale in, staggered, on an
// eased-out curve; the line and area charts are now "without Serava" vs.
// "with Serava" comparisons with real axes, not a single bare line.
// Respects prefers-reduced-motion (everything just appears in its final
// state, no motion).
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

// UAT-only stand-ins for a future real partner-logo row. These "glogo-*" /
// "g-logo-*" images are generic dummy marks with no real institution
// behind them — each one still carries its own "placeholder" caption
// underneath (not just the row-level note above) so nobody mistakes one
// for an actual confirmed partner while skimming the page. Do not replace
// these with a real institution's logo or name unless a genuine, signed
// partnership exists; swapping one in "for now, we'll confirm later" is
// exactly how a false affiliation claim quietly ships. When real
// partnerships exist, replace this whole array with the actual, approved
// logo files and drop the "placeholder" caption for that entry.
const PARTNER_PLACEHOLDERS = [
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/glogo-1.png", alt: "Dummy partner logo 1" },
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/g-logo-2.png", alt: "Dummy partner logo 2" },
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/uk-logo.png", alt: "Dummy partner logo 3" },
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/g-logo-4.png", alt: "Dummy partner logo 4" },
  { src: "https://pblol2.blob.core.windows.net/serava-ui/hero/g-logo-3.jpg", alt: "Dummy partner logo 5" },
];

const BACKGROUND_IMAGE_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/hero/sv-analytics-section.jpg";

// Ease-out-expo-ish curve, used everywhere instead of the browser's
// default "ease" — it decelerates hard at the end rather than coasting
// linearly, which is most of what makes motion read as "smooth" rather
// than mechanical.
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Single source of truth for how see-through every frosted glass tile is.
// Lower = more transparent (more of the photo shows through); higher =
// more solid/opaque. Dropped further (was 0.62) since the tiles were
// still reading as too solid over the photo.
const GLASS_OPACITY = 0.42;

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
  duration = 1300,
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
      setDisplay(Math.round(easeOutCubic(progress) * value));
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

// Small colour-swatch + label legend, shared by the line and area charts
// now that both show two series instead of one.
function ChartLegend({
  items,
}: {
  items: { color: string; label: string; dashed?: boolean }[];
}) {
  return (
    <Box sx={{ display: "flex", gap: 2.5, justifyContent: "center", mt: 0.5 }}>
      {items.map((item) => (
        <Box
          key={item.label}
          sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
        >
          <Box
            sx={{
              width: 14,
              height: item.dashed ? 0 : 3,
              borderRadius: 2,
              bgcolor: item.dashed ? "transparent" : item.color,
              borderTop: item.dashed ? `2px dashed ${item.color}` : "none",
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

// Shared x/y axis lines + end labels for the two time-series charts below.
// Deliberately unlabelled on the numeric scale (these are illustrative
// concept figures, not real measured data) — the axis exists to give the
// chart a frame of reference, not to imply a precision we don't have.
function ChartAxes({ xEnd = "Week 12" }: { xEnd?: string }) {
  return (
    <>
      <line x1="14" y1="8" x2="14" y2="86" stroke="rgba(29,36,48,0.18)" strokeWidth={1} />
      <line x1="14" y1="86" x2="192" y2="86" stroke="rgba(29,36,48,0.18)" strokeWidth={1} />
      <text x="14" y="97" fontSize="7" fill="rgba(29,36,48,0.45)">
        Start
      </text>
      <text x="192" y="97" fontSize="7" fill="rgba(29,36,48,0.45)" textAnchor="end">
        {xEnd}
      </text>
    </>
  );
}

// Line comparison: "without Serava" (flat, muted, dashed) vs. "with
// Serava" (rising, teal, solid) — draws in on `inView`, with the "with"
// line starting slightly after the "without" line so the contrast reads
// as a reveal rather than two lines snapping in at once.
function TrendLine({ inView }: { inView: boolean }) {
  return (
    <Box>
      <Box
        component="svg"
        viewBox="0 0 200 100"
        sx={{ width: "100%", height: 110 }}
        aria-hidden="true"
      >
        <ChartAxes />

        {/* Without Serava — modest, mostly flat improvement */}
        <path
          d="M14 78 C 60 76, 120 74, 192 71"
          fill="none"
          stroke="rgba(29,36,48,0.55)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="5 4"
          pathLength={1}
          style={{
            strokeDashoffset: inView ? 0 : 1,
            opacity: inView ? 1 : 0,
            transition: `opacity 0.5s ${EASE}, stroke-dashoffset 1.3s ${EASE}`,
          }}
        />

        {/* With Serava — steep rise */}
        <path
          d="M14 78 C 70 55, 130 28, 192 16"
          fill="none"
          stroke="#2AB3A6"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: `stroke-dashoffset 1.5s ${EASE} 0.25s`,
          }}
        />
        <circle
          cx="192"
          cy="16"
          r="4"
          fill="#2AB3A6"
          opacity={inView ? 1 : 0}
          style={{ transition: `opacity 0.4s ${EASE} 1.6s` }}
        />
      </Box>
      <ChartLegend
        items={[
          { color: "rgba(29,36,48,0.55)", label: "Without Serava", dashed: true },
          { color: "#2AB3A6", label: "With Serava" },
        ]}
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
        style={{ transition: `stroke-dashoffset 1.4s ${EASE}` }}
      />
    </Box>
  );
}

// Area comparison: "without Serava" (lower plateau) vs. "with Serava"
// (higher plateau) over the programme. The "with" fill animates in
// slightly after the "without" fill for the same reveal effect as the
// line chart above.
function TrendArea({ inView }: { inView: boolean }) {
  return (
    <Box>
      <Box
        component="svg"
        viewBox="0 0 200 100"
        sx={{ width: "100%", height: 110 }}
        aria-hidden="true"
      >
        <ChartAxes />

        {/* Without Serava */}
        <path
          d="M14 62 L 55 58 L 96 60 L 137 56 L 178 54 L 192 53 L 192 86 L 14 86 Z"
          fill="rgba(29,36,48,0.16)"
          opacity={inView ? 1 : 0}
          style={{ transition: `opacity 0.9s ${EASE} 0.15s` }}
        />
        <path
          d="M14 62 L 55 58 L 96 60 L 137 56 L 178 54 L 192 53"
          fill="none"
          stroke="rgba(29,36,48,0.55)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="5 4"
          opacity={inView ? 1 : 0}
          style={{ transition: `opacity 0.6s ${EASE} 0.15s` }}
        />

        {/* With Serava */}
        <path
          d="M14 80 L 55 65 L 96 48 L 137 32 L 178 20 L 192 15 L 192 86 L 14 86 Z"
          fill="rgba(42,179,166,0.22)"
          opacity={inView ? 1 : 0}
          style={{ transition: `opacity 1s ${EASE} 0.5s` }}
        />
        <path
          d="M14 80 L 55 65 L 96 48 L 137 32 L 178 20 L 192 15"
          fill="none"
          stroke="#2AB3A6"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: `stroke-dashoffset 1.4s ${EASE} 0.5s`,
          }}
        />
      </Box>
      <ChartLegend
        items={[
          { color: "rgba(29,36,48,0.55)", label: "Without Serava", dashed: true },
          { color: "#2AB3A6", label: "With Serava" },
        ]}
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
            // Was "muted.main" — a very pale grey-green that disappeared
            // entirely against the tile once the tile itself went
            // translucent. This needs enough of its own contrast to read
            // regardless of what's showing through the glass behind it.
            bgcolor: (t) => alpha(t.palette.text.primary, 0.38),
            border: "1px solid rgba(29,36,48,0.3)",
            borderRadius: 1.5,
            transition: `height 1.1s ${EASE}`,
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          Without Serava
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: 48,
            height: inView ? 100 : 0,
            background: "linear-gradient(180deg, #2AB3A6 0%, #1F8A80 100%)",
            borderRadius: 1.5,
            transition: `height 1.1s ${EASE} 0.15s`,
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          With Serava
        </Typography>
      </Box>
    </Box>
  );
}

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
        bgcolor: (t) => alpha(t.palette.background.paper, GLASS_OPACITY),
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 12px 32px rgba(29,36,48,0.18)",
        p: { xs: 2.5, sm: 3 },
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(24px) scale(0.97)",
        transition: `opacity 0.8s ${EASE} ${delay}s, transform 0.8s ${EASE} ${delay}s`,
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
          minHeight: { xs: 680, md: 800 },
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
        {/* A scrim positioned right behind the heading, not a full-bleed
            corner vignette — the previous version darkened the edges and
            left the top-center (right where the subject's face sits)
            untouched, which mattered when the heading was plain text but
            was masked by the old frosted card. Now that the card is gone,
            this is what actually earns the heading's contrast: it's a
            soft tint, not an opaque surface, so the photo (his eyes
            included) still reads through it — just darkened enough for
            white text to sit on top cleanly. */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(65% 55% at 50% 20%, rgba(15,22,20,0.5) 0%, rgba(15,22,20,0.18) 55%, rgba(0,0,0,0) 85%)",
          }}
        />

        {/* Heading sits directly on the photo now — no card, no blur — so
            the face behind it (including the eyes) stays visible. The
            small "Outcomes" label keeps its own tiny solid pill (it's
            small enough not to meaningfully block anything), and the
            headline itself relies on the scrim above plus a heavier
            text-shadow for contrast instead of an opaque backing. */}
        <Box sx={{ position: "relative", textAlign: "center", maxWidth: 720 }}>
          <Box
            sx={{
              display: "inline-block",
              bgcolor: "rgba(15,22,20,0.55)",
              borderRadius: 999,
              px: 2.5,
              py: 0.5,
              mb: 2,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "background.paper",
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
              fontSize: { xs: "1.75rem", sm: "2.5rem" },
              color: "background.paper",
              textShadow: "0 2px 4px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.35)",
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
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1.2fr" },
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

      {/* Partner row — an auto-scrolling marquee of GENERIC placeholder
          marks for UAT purposes only. Do not add a real institution's
          name/logo unless a genuine, signed partnership exists. Implying
          affiliation with an institution that hasn't actually partnered
          with Serava is a false claim, not a style choice — including
          "temporarily," for a demo. See PARTNER_PLACEHOLDERS above for
          the swap-in point once real, approved logos exist. */}
      <Box sx={{ mt: { xs: 6, md: 8 }, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          Illustrative placeholders — swap for real, approved partner logos
          once a partnership actually exists
        </Typography>

        <Box
          sx={{
            position: "relative",
            mt: 3,
            overflow: "hidden",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <Box
            className="partner-marquee"
            sx={{
              display: "flex",
              width: "max-content",
              gap: { xs: 5, md: 7 },
            }}
          >
            {[...PARTNER_PLACEHOLDERS, ...PARTNER_PLACEHOLDERS].map(
              ({ src, alt }, i) => (
                <Box
                  key={`${src}-${i}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={alt}
                    sx={{
                      height: 48,
                      width: "auto",
                      maxWidth: 180,
                      objectFit: "contain",
                      opacity: 0.75,
                      filter: "grayscale(60%)",
                    }}
                  />
                  {/* Per-logo reminder, not just the row-level caption
                      above — swap this out the moment this specific logo
                      is replaced with a real, approved one. */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      opacity: 0.6,
                      fontSize: "0.65rem",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Placeholder — real logo TBC
                  </Typography>
                </Box>
              ),
            )}
          </Box>

          <style>{`
            .partner-marquee {
              animation: partner-marquee-scroll 28s linear infinite;
            }
            .partner-marquee:hover {
              animation-play-state: paused;
            }
            @keyframes partner-marquee-scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .partner-marquee {
                animation: none;
              }
            }
          `}</style>
        </Box>
      </Box>
    </Box>
  );
}
// src/components/Library/LibraryPageHero.tsx
//
// The "bookshelf" visual is a deliberate redesign of the mockup's version,
// not a straight port — the original used writing-mode:vertical-rl to spin
// each spine's text 90 degrees inside a 30px-wide column at 0.66rem, which
// is close to unreadable even sighted (rotated text is genuinely harder to
// parse, not just stylistically bold), and the whole shelf was a single
// role="img" with ONE aria-label covering all three groups — meaning a
// screen reader user got "six meal volumes, three strength volumes, six
// foundations guides" as one blob and literally none of the 15 individual
// volume names anywhere in the accessibility tree, even though sighted
// users can read every spine. Fixed here: each spine is a real list item
// with its full title as visible, horizontal, readable text (still
// compact — this is a decorative-but-informative shelf, not the volume
// cards below it), and the group wrapper uses a proper <ul> so nothing is
// hidden from assistive tech that's visible on screen.
//
// Background swapped from the mist gradient to a looping hero video, same
// lazy-load-on-intersection + dark overlay treatment as VolumeGroup's
// Strength section — see that file for the reasoning on the overlay
// opacity trade-off (readable text vs. the video actually being visible).
// Every foreground element (eyebrow, heading, subhead, shelf labels,
// summary line) was dark-on-light before and is now white/near-white so
// it stays legible against the video instead of disappearing into it.
"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const BUTTERY_YELLOW = "#F9E8B0"; // same literal PricingSection.tsx uses
const BUTTER_DEEP_TEXT = "#6B5410"; // mockup's --butter-deep, AA on butter
const TEAL_DEEP = "#146059";

const HERO_VIDEO_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/lib/hero-video-lib.mp4";

type ShelfGroup = {
  id: string;
  label: string;
  accentBg: string;
  accentText: string;
  spines: string[];
};

const SHELF_GROUPS: ShelfGroup[] = [
  {
    id: "meal",
    label: "Meal · 6",
    accentBg: "secondary.main", // deepViridian
    accentText: "#FFFFFF",
    spines: ["Meal I", "Meal II", "Meal III", "Meal IV", "Meal V", "Meal VI"],
  },
  {
    id: "strength",
    label: "Strength · 3",
    accentBg: TEAL_DEEP,
    accentText: "#FFFFFF",
    spines: ["Strength I", "Strength II", "Strength III"],
  },
  {
    id: "foundation",
    label: "Foundations · 6",
    accentBg: BUTTERY_YELLOW,
    accentText: BUTTER_DEEP_TEXT,
    spines: [
      "Water",
      "The Safety Net",
      "The Supplement Guide",
      "Sleep",
      "The Mind",
      "The Bookends",
    ],
  },
];

// Lazily-loaded, looping background video — same IntersectionObserver
// pattern as VolumeGroup.tsx's LazyBackgroundVideo and
// ConsultationSection.tsx's LazyVideo (nothing fetched, not even
// metadata via preload="none", until the section is ~200px from
// entering the viewport). The hero is the very first thing on the page,
// so in practice this fires almost immediately on load — kept the same
// pattern anyway for consistency and so it behaves correctly if this
// component is ever reused further down a page.
function LazyHeroVideo({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        bgcolor: TEAL_DEEP, // placeholder tone while unloaded
      }}
    >
      {shouldLoad && (
        <Box
          component="video"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      {/* Dark wash so white heading/body text and the shelf's muted
          labels stay readable regardless of what's playing underneath —
          same reasoning and opacity range as VolumeGroup's Strength
          video overlay, kept consistent between the two video sections
          on this page. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,26,23,0.5) 0%, rgba(10,26,23,0.62) 100%)",
        }}
      />
    </Box>
  );
}

export function LibraryPageHero() {
  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        pt: { xs: 7, md: 11 },
        overflow: "hidden",
      }}
    >
      <LazyHeroVideo src={HERO_VIDEO_URL} />

      <Box
        sx={{
          position: "relative",
          mx: "auto",
          maxWidth: 1152,
          px: 3,
          pb: 8,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.1,
            mb: 2,
          }}
        >
          <Box sx={{ width: 22, height: "1.5px", bgcolor: "primary.main" }} />
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#FFFFFF",
            }}
          >
            The Library
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2.25rem", sm: "3rem", md: "3.3rem" },
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            maxWidth: "18ch",
          }}
        >
          Every patient gets the full shelf
        </Typography>

        <Typography
          sx={{
            mt: 2.25,
            fontSize: "1.14rem",
            lineHeight: 1.7,
            color: alpha("#FFFFFF", 0.85),
            maxWidth: 640,
          }}
        >
          Written by our clinical team for real UK kitchens, supermarkets and
          living rooms. Yours from day one, included in every programme —
          nothing here is sold separately or held back.
        </Typography>

        {/* Bookshelf visual — three groups, each a real horizontally-
            readable list rather than rotated decorative text. Spine
            chips already carry their own solid background colours, so
            they stay legible unchanged; only the muted group labels
            needed to flip from dark-on-light to light-on-dark. */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 3, md: 3.5 },
            mt: { xs: 5, md: 6.5 },
            alignItems: "flex-end",
          }}
        >
          {SHELF_GROUPS.map((group) => (
            <Box
              key={group.id}
              sx={{ display: "flex", flexDirection: "column", minWidth: 132 }}
            >
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: alpha("#FFFFFF", 0.72),
                  mb: 1.5,
                }}
              >
                {group.label}
              </Typography>

              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  m: 0,
                  p: 0,
                  display: "flex",
                  flexDirection: "column-reverse",
                  gap: "3px",
                }}
              >
                {group.spines.map((spine) => (
                  <Box
                    component="li"
                    key={spine}
                    sx={{
                      bgcolor: group.accentBg,
                      color: group.accentText,
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.7,
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                      boxShadow:
                        "0 1px 2px rgba(42,84,73,.05), 0 6px 16px -8px rgba(42,84,73,.10)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {spine}
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  height: 7,
                  borderRadius: "0 0 4px 4px",
                  mt: 0,
                  bgcolor:
                    group.id === "foundation"
                      ? BUTTER_DEEP_TEXT
                      : group.accentBg,
                  boxShadow: "0 10px 22px -6px rgba(42,84,73,.20)",
                }}
              />
            </Box>
          ))}
        </Box>

        <Typography
          sx={{
            mt: 3.5,
            fontSize: "0.92rem",
            color: alpha("#FFFFFF", 0.8),
          }}
        >
          Six meal volumes · three strength volumes · six foundations guides,
          plus session cards and a training log, ten pocket cards, and a
          pre-exercise readiness screen.
        </Typography>
      </Box>
    </Box>
  );
}

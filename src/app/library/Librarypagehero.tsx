// src/components/Library/LibraryPageHero.tsx
//
// Background is a looping hero video, lazy-loaded the same way as
// VolumeGroup's Strength section (nothing fetched until the section is
// near the viewport). Deliberately NO bookshelf visual below the copy —
// earlier drafts tried both a coded shelf (colour-coded spine chips) and
// a real book-spine photo over this same video; both were tried and
// explicitly rejected in favour of keeping this section to just the
// video + eyebrow/heading/subhead/summary line. Don't re-add either one
// without checking first — this minimal version is the one that's been
// approved.
//
// For context if a shelf visual ever comes back into scope: the original
// coded version used writing-mode:vertical-rl to spin each spine's text
// 90 degrees inside a 30px-wide column at 0.66rem (close to unreadable
// even sighted) and exposed only ONE aria-label for all three groups to
// screen readers, hiding all 15 individual volume names from assistive
// tech — worth avoiding that mistake again if this gets revisited.
"use client";

import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEO_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/lib/hero-video-lib.mp4";
const TEAL_DEEP = "#146059";

// Lazily-loaded, looping background video — same IntersectionObserver
// pattern as VolumeGroup.tsx's LazyBackgroundVideo and
// ConsultationSection.tsx's LazyVideo (nothing fetched, not even
// metadata via preload="none", until the section is ~200px from
// entering the viewport).
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
      {/* Dark wash so white heading/body text stays readable regardless
          of what's playing underneath — same opacity range used on
          VolumeGroup's Strength video overlay, kept consistent between
          the two video sections on this page. */}
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
        // Second size bump on request ("increase the size of the video a
        // bit more") — first pass went 7/11 -> 9/14 with minHeight
        // 480/620; this pushes further to 11/17 and 560/760. Overlay
        // opacity in LazyHeroVideo below is untouched — explicitly kept
        // as-is per instruction, only the section's height changed here.
        pt: { xs: 11, md: 17 },
        minHeight: { xs: 560, md: 760 },
        display: "flex",
        alignItems: "center",
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
          pb: 16,
          width: "100%",
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

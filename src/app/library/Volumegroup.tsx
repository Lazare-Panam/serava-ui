// src/components/Library/VolumeGroup.tsx
//
// One reusable section for each of the three volume groups (Meal,
// Strength, Foundations) — icon + heading + intro paragraph + a grid of
// VolumeCards — same "config array feeds one generic component" shape
// PricingSection.tsx already uses for its three pricing tiers.
//
// Strength is a deliberate exception to the "every card gets its own
// image" pattern: instead of 3 per-card image slots, the whole section
// sits on one shared looping background video (same lazy-load-on-
// intersection idiom ConsultationSection.tsx already uses for its video),
// and the 3 cards become translucent "glass" panels floating over it
// rather than opaque white cards. Pass videoBackground to opt a group
// into that treatment; Meal and Foundations don't pass it and render
// exactly as before.
"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";

export type Volume = {
  num: string; // "Volume I", "Guide III", etc.
  title: string;
  description: string;
  // Optional cover image for the card. Left undefined in libraryData.tsx
  // for now — fill in real URLs per volume when ready. Cards render a
  // placeholder block (no broken-image icon, no layout shift once a src
  // is added later since the aspect ratio is fixed either way). Ignored
  // entirely when the group has a videoBackground — those cards never
  // show a per-card image, by design (see file header).
  image?: string;
};

export type VolumeGroupAccent = "meal" | "strength" | "foundation";

const BUTTERY_YELLOW = "#F9E8B0";
const BUTTER_DEEP_TEXT = "#6B5410";
const TEAL_DEEP = "#146059";

// Same accent-token idea as PricingSection's ACCENT_TOKENS, scoped to
// what this component actually needs: an icon badge colour, an icon
// stroke colour, and the card's top accent border.
const ACCENT: Record<
  VolumeGroupAccent,
  { iconBg: string; iconStroke: string; cardTopBorder: string }
> = {
  meal: {
    iconBg: "secondary.main",
    iconStroke: "#FFFFFF",
    cardTopBorder: "secondary.main",
  },
  strength: {
    iconBg: TEAL_DEEP,
    iconStroke: "#FFFFFF",
    cardTopBorder: TEAL_DEEP,
  },
  foundation: {
    iconBg: BUTTERY_YELLOW,
    iconStroke: BUTTER_DEEP_TEXT,
    cardTopBorder: BUTTERY_YELLOW,
  },
};

// Lazily-loaded, looping background video — same IntersectionObserver
// pattern as ConsultationSection.tsx's LazyVideo (nothing fetched, not
// even metadata via preload="none", until the section is ~200px from
// entering the viewport). Kept local to this file rather than imported
// from ConsultationSection since that one is sized for a fixed split
// panel, not a full-bleed section background.
function LazyBackgroundVideo({ src }: { src: string }) {
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
        bgcolor: TEAL_DEEP, // placeholder tone while unloaded, matches the deep-teal grade below
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
      {/* Dark/teal gradient wash so white heading text and glass cards
          stay readable regardless of what's playing underneath — same
          reasoning PricingSection's photo band uses for its overlay.
          Lightened from 0.72–0.82 to 0.38–0.52 on request so the video
          itself actually reads through instead of being nearly opaque;
          glass-card contrast still holds because the cards carry their
          own translucent white fill + blur on top of this wash. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,26,23,0.38) 0%, rgba(10,26,23,0.52) 100%)",
        }}
      />
    </Box>
  );
}

function VolumeCard({
  volume,
  accent,
  onVideo,
}: {
  volume: Volume;
  accent: VolumeGroupAccent;
  onVideo: boolean;
}) {
  const tokens = ACCENT[accent];

  // "Glass" mode for cards floating over the Strength video — translucent
  // white fill + blur instead of a solid paper background, light text
  // instead of dark, and no per-card image slot (the video behind the
  // whole section fills that role instead).
  if (onVideo) {
    return (
      <Box
        sx={{
          bgcolor: alpha("#FFFFFF", 0.1),
          backdropFilter: "blur(14px)",
          border: "1px solid",
          borderColor: alpha("#FFFFFF", 0.22),
          borderTop: "3px solid",
          borderTopColor: alpha("#FFFFFF", 0.55),
          borderRadius: "16px",
          py: "22px",
          px: "20px",
          boxShadow: "0 12px 32px -12px rgba(0,0,0,0.45)",
          transition:
            "transform 0.3s cubic-bezier(.2,.7,.3,1), background-color 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            bgcolor: alpha("#FFFFFF", 0.16),
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#9FE6DC",
            mb: 1,
          }}
        >
          {volume.num}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.98rem",
            fontWeight: 600,
            color: "#FFFFFF",
            mb: 0.75,
          }}
        >
          {volume.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.87rem",
            color: alpha("#FFFFFF", 0.78),
            lineHeight: 1.65,
          }}
        >
          {volume.description}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderTop: "3px solid",
        borderTopColor: tokens.cardTopBorder,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow:
          "0 1px 2px rgba(42,84,73,.05), 0 6px 16px -8px rgba(42,84,73,.10)",
        transition:
          "transform 0.3s cubic-bezier(.2,.7,.3,1), box-shadow 0.3s cubic-bezier(.2,.7,.3,1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            "0 2px 6px rgba(42,84,73,.05), 0 20px 44px -20px rgba(42,84,73,.20)",
        },
      }}
    >
      {/* Image slot — src left blank until real photography/artwork is
          ready. Fixed 16:9 box either way so adding a src later doesn't
          shift the grid, and a flat tinted placeholder (using the
          group's own accent, at low opacity) stands in instead of a
          broken-image icon or empty white gap. */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          bgcolor: volume.image ? "transparent" : tokens.cardTopBorder,
          opacity: volume.image ? 1 : 0.18,
        }}
      >
        {volume.image && (
          // eslint-disable-next-line @next/next/no-img-element -- swap for next/image once real, sized asset URLs are in place
          <img
            src={volume.image}
            alt={volume.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </Box>

      <Box sx={{ py: "22px", px: "20px" }}>
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: TEAL_DEEP,
            mb: 1,
          }}
        >
          {volume.num}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.98rem",
            fontWeight: 600,
            color: "secondary.main",
            mb: 0.75,
          }}
        >
          {volume.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.87rem",
            color: "text.secondary",
            lineHeight: 1.65,
          }}
        >
          {volume.description}
        </Typography>
      </Box>
    </Box>
  );
}

// Shared header + intro + card-grid block, parameterised on onVideo so
// there's exactly one copy of this JSX regardless of which visual mode
// the group renders in — avoids the "two near-identical blocks that will
// silently drift apart the next time only one gets edited" trap.
function VolumeGroupBody({
  accent,
  icon,
  title,
  intro,
  volumes,
  onVideo,
}: {
  accent: VolumeGroupAccent;
  icon: ReactNode;
  title: string;
  intro: string;
  volumes: Volume[];
  onVideo: boolean;
}) {
  const tokens = ACCENT[accent];
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.75, mb: 2.75 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            bgcolor: onVideo ? alpha("#FFFFFF", 0.16) : tokens.iconBg,
            boxShadow: onVideo ? "none" : "0 6px 14px -6px rgba(42,84,73,.35)",
            "& svg": {
              width: 21,
              height: 21,
              stroke: onVideo ? "#FFFFFF" : tokens.iconStroke,
              fill: "none",
              strokeWidth: 1.7,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            },
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.6rem", sm: "2.15rem" },
            letterSpacing: "-0.02em",
            color: onVideo ? "#FFFFFF" : "secondary.main",
            m: 0,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: "1rem",
          color: onVideo ? alpha("#FFFFFF", 0.82) : "text.secondary",
          lineHeight: 1.7,
          mb: 2.75,
          maxWidth: "64ch",
        }}
      >
        {intro}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {volumes.map((volume) => (
          <VolumeCard
            key={volume.num}
            volume={volume}
            accent={accent}
            onVideo={onVideo}
          />
        ))}
      </Box>
    </>
  );
}

export function VolumeGroup({
  accent,
  icon,
  title,
  intro,
  volumes,
  videoBackground,
}: {
  accent: VolumeGroupAccent;
  icon: ReactNode;
  title: string;
  intro: string;
  volumes: Volume[];
  // When set, the group renders as a full-bleed section with this video
  // looping behind it, dark-washed for contrast, with cards in "glass"
  // mode instead of solid white — see file header for why Strength uses
  // this instead of per-card images.
  videoBackground?: string;
}) {
  const onVideo = Boolean(videoBackground);

  if (!videoBackground) {
    return (
      <Box sx={{ mt: { xs: 5, md: 5.5 } }}>
        <VolumeGroupBody
          accent={accent}
          icon={icon}
          title={title}
          intro={intro}
          volumes={volumes}
          onVideo={false}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        // Full-bleed breakout: regardless of how narrow the parent's
        // maxWidth wrapper is (page.tsx caps its section content at
        // 1152px), this panel stretches edge-to-edge across the actual
        // viewport. 100vw/50vw centering via left+margin is the standard
        // "break out of a centered max-width container" trick — it works
        // no matter what padding/maxWidth the parent above it uses,
        // without needing to change that parent.
        //
        // Caveat worth knowing: 100vw includes the vertical scrollbar's
        // width on some browsers (unlike 100%), which can introduce a
        // few pixels of horizontal overflow/scroll on desktop. Guarding
        // with maxWidth: "100%" on the *outer* page body would be the
        // real long-term fix if that shows up; not changed here since it
        // lives outside this component and isn't something to touch
        // without you seeing it happen first.
        position: "relative",
        overflow: "hidden",
        width: "100vw",
        maxWidth: "100vw",
        left: "50%",
        right: "50%",
        ml: "-50vw",
        mr: "-50vw",
        borderRadius: 0,
        mt: { xs: 5, md: 5.5 },
        // Taller panel — more breathing room top/bottom so the video
        // itself gets more visible real estate, per request to make this
        // "a little bigger."
        py: { xs: 8, md: 11 },
        px: { xs: 3, sm: 6, md: 10 },
      }}
    >
      <LazyBackgroundVideo src={videoBackground} />
      <Box
        sx={{
          position: "relative",
          maxWidth: 1152,
          mx: "auto",
        }}
      >
        <VolumeGroupBody
          accent={accent}
          icon={icon}
          title={title}
          intro={intro}
          volumes={volumes}
          onVideo={onVideo}
        />
      </Box>
    </Box>
  );
}

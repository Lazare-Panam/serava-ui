// src/components/Landing/Reveal.tsx
// Shared scroll-entrance wrapper for whole landing sections. Each section
// below already animates its own internals (HowItWorks' line draw,
// Outcomes' tile stagger, TrustBand's auto-scroll) — this is a separate,
// lighter layer on top: the section itself eases into place the first
// time it scrolls into view, so the page doesn't just pop each block in
// at full opacity the instant it crosses the viewport edge.
//
// Deliberately NOT one generic "fade up 20px" applied everywhere — that's
// the effect that reads as templated. Six distinct entrance shapes here
// (rise / slide-left / slide-right / scale / blur-rise / fade), assigned
// per section below so consecutive sections don't repeat the same move.
// Hero is intentionally left unwrapped: it's the first thing painted on
// load, not something the user scrolls to, so animating it in would just
// delay it rather than read as a reveal.
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Box } from "@mui/material";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export type RevealVariant =
  | "rise"
  | "slide-left"
  | "slide-right"
  | "scale-soft"
  | "blur-rise"
  | "fade";

const VARIANT_TRANSFORM: Record<
  RevealVariant,
  { hidden: string; shown: string }
> = {
  rise: { hidden: "translateY(32px)", shown: "translateY(0)" },
  "slide-left": { hidden: "translateX(-48px)", shown: "translateX(0)" },
  "slide-right": { hidden: "translateX(48px)", shown: "translateX(0)" },
  "scale-soft": { hidden: "scale(0.96)", shown: "scale(1)" },
  "blur-rise": { hidden: "translateY(20px)", shown: "translateY(0)" },
  fade: { hidden: "none", shown: "none" },
};

function useInView<T extends HTMLElement>(threshold: number) {
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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  duration = 0.9,
  threshold = 0.15,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);
  const { hidden, shown } = VARIANT_TRANSFORM[variant];
  const isBlur = variant === "blur-rise";

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? shown : hidden,
        filter: isBlur ? (inView ? "blur(0px)" : "blur(10px)") : undefined,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s${
          isBlur ? `, filter ${duration}s ${EASE} ${delay}s` : ""
        }`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Box>
  );
}

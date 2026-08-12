// src/app/how-it-works/JourneyTimeline.tsx
// The wavy vertical journey line + 5 numbered steps, ported from the mockup's
// .journey/.jline/.jstep/.jdot/.jmeta CSS. The squiggly SVG path is decorative
// (same as the original) and "draws itself" in as it scrolls into view — ported
// from the mockup's inline <script> IntersectionObserver, respecting
// prefers-reduced-motion the same way the original did.
//
// Content note: step 3's "£[x] consultation fee" and any other bracketed
// placeholders are carried over verbatim from the source mockup — replace with
// confirmed pricing/legal copy before shipping, per the mockup's own
// "designs, not promises" caveat.
"use client";

import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

const STEPS = [
  {
    n: 1,
    title: "The eligibility check",
    body: "A short form that checks whether treatment is likely to be safe and right for you, and which path best fits your situation. Either way, you'll get a clear answer. If we're not the right fit, we'll say so honestly and point you somewhere that is.",
    meta: [
      { label: "How long", value: "About five minutes" },
      { label: "Cost at this point", value: "Free" },
      {
        label: "What we ask",
        value:
          "Your age, height and weight, plus a handful of key safety questions",
      },
      {
        label: "Good to know",
        value:
          "This service is for adults 18 and over. Completing the form never guarantees a prescription",
      },
    ],
  },
  {
    n: 2,
    title: "The medical questionnaire",
    body: "If the first check looks promising, you'll complete a detailed medical history, so your prescriber can prepare properly ahead of your consultation. This is also where we verify your identity, height and weight independently, because safe prescribing in the UK depends on knowing exactly who we're caring for.",
    meta: [
      { label: "How long", value: "About 15 to 20 minutes" },
      { label: "Cost at this point", value: "Nothing yet" },
      {
        label: "What we need",
        value:
          "Your full health history, current medicines, photo ID and verified measurements",
      },
      {
        label: "Good to know",
        value:
          "Everything you share is stored securely as part of your clinical record",
      },
    ],
  },
  {
    n: 3,
    title: "The video consultation",
    body: "A one-to-one video appointment with your prescriber, lasting up to an hour. Together, you'll go through your history, your goals and your options, and reach a decision as a team. You're welcome to share your preference, but the final call is always your prescriber's. They may suggest something different, or nothing at all.",
    meta: [
      { label: "How long", value: "Up to one hour" },
      { label: "Cost at this point", value: "£[x] consultation fee" },
      {
        label: "Also part of assessment",
        value:
          "Baseline blood tests, arranged through our national testing partner",
      },
      {
        label: "Good to know",
        value: "Bring questions. This appointment belongs to you",
      },
    ],
  },
  {
    n: 4,
    title: "Your plan and first delivery",
    body: "If treatment's right for you, you'll receive your written treatment plan, your service agreement, and full access to the Lifestyle Library. Your first package is dispensed by our partner pharmacy and arrives in discreet, temperature-controlled packaging.",
    meta: [
      {
        label: "How long",
        value: "First delivery typically within days of your consultation",
      },
      {
        label: "Cost at this point",
        value: "Programme fee begins, confirmed with you before you pay",
      },
      {
        label: "What arrives",
        value: "Your treatment and everything you need to start well",
      },
      {
        label: "Good to know",
        value: "You're always free to use a pharmacy of your choice instead",
      },
    ],
  },
  {
    n: 5,
    title: "Reviews, then the off-ramp",
    body: "You'll be reviewed every four weeks, about 20 minutes each time, alongside monitoring blood tests and deliveries on the same rhythm. The final two months form a maintenance phase, where treatment is stepped down deliberately, so you finish with a plan that's truly yours to keep.",
    meta: [
      {
        label: "Rhythm",
        value: "Reviews and deliveries, both every four weeks",
      },
      {
        label: "We monitor",
        value: "Weight, wellbeing, side effects and bloods",
      },
      {
        label: "The ending",
        value: "Two months of titrating down and maintenance",
      },
      { label: "Good to know", value: "An off-ramp, not a cliff edge" },
    ],
  },
];

export function JourneyTimeline() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const len = path.getTotalLength();
    path.style.setProperty("--len", String(len));
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = reduced ? "0" : String(len);

    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            path.style.transition = "stroke-dashoffset 1.6s ease";
            path.style.strokeDashoffset = "0";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(path);

    return () => io.disconnect();
  }, []);

  return (
    <Box sx={{ position: "relative", pl: { xs: "74px", sm: "118px" } }}>
      <Box
        component="svg"
        viewBox="0 0 52 1200"
        preserveAspectRatio="none"
        aria-hidden="true"
        sx={{
          position: "absolute",
          left: { xs: 12, sm: 26 },
          top: "10px",
          bottom: "10px",
          width: { xs: 44, sm: 52 },
          height: "calc(100% - 20px)",
        }}
      >
        <path
          ref={pathRef}
          d="M26 0 C 4 130, 48 240, 26 360 S 6 590, 26 720 S 48 950, 26 1200"
          stroke="#2AB3A6"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          opacity={0.55}
        />
      </Box>

      {STEPS.map((step, i) => (
        <Box
          key={step.n}
          sx={{
            position: "relative",
            mb: i === STEPS.length - 1 ? 0 : 8,
            maxWidth: 640,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: { xs: "-64px", sm: "-92px" },
              top: "-2px",
              width: { xs: 44, sm: 52 },
              height: { xs: 44, sm: 52 },
              borderRadius: "50%",
              bgcolor: "background.paper",
              border: "2px solid",
              borderColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "secondary.main",
              zIndex: 2,
              boxShadow:
                "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
            }}
          >
            {step.n}
          </Box>

          <Typography variant="h2" sx={{ fontSize: "1.35rem", mb: 1.25 }}>
            {step.title}
          </Typography>
          <Typography sx={{ color: "text.primary" }}>{step.body}</Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: "12px 24px",
              mt: 2.5,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "20px",
              px: 3.25,
              py: 2.75,
              fontSize: "0.88rem",
              boxShadow:
                "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
            }}
          >
            {step.meta.map((m) => (
              <Box key={m.label}>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "primary.dark",
                    mb: 0.5,
                  }}
                >
                  {m.label}
                </Typography>
                {m.value}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

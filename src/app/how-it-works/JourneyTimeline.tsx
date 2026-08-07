// src/components/HowItWorksPage/JourneyTimeline.tsx
// The five-step vertical journey with a wavy connecting line that draws in
// on scroll. Same drawing technique as the homepage's HowItWorks.tsx
// CareLinePath (stroke-dashoffset animated via IntersectionObserver,
// respecting prefers-reduced-motion), just a vertical wavy path instead of
// a horizontal straight one, since that's this page's signature visual.
"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

type StepMeta = { label: string; value: string };
type Step = {
  id: number;
  title: string;
  description: string;
  meta: StepMeta[];
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "The eligibility check",
    description:
      "A short online form that checks whether treatment is likely to be safe and suitable for you, and which pathway fits your situation. You get a clear answer either way, and if we are not the right service, we say so and point you somewhere better.",
    meta: [
      { label: "How long", value: "About five minutes" },
      { label: "Cost at this point", value: "Free" },
      {
        label: "What we ask",
        value:
          "Age, height and weight, and a small number of key safety questions",
      },
      {
        label: "Good to know",
        value:
          "For adults 18 and over. Completing a form never guarantees a prescription",
      },
    ],
  },
  {
    id: 2,
    title: "The medical questionnaire",
    description:
      "If the first check looks suitable, you complete a detailed medical history so your prescriber can prepare properly. This is also where we independently verify your identity, height and weight, because in the UK safe prescribing depends on knowing exactly who we are treating.",
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
        value: "Everything is stored securely as part of your clinical record",
      },
    ],
  },
  {
    id: 3,
    title: "The video consultation",
    description:
      "A one to one video appointment with your prescriber, lasting up to an hour. You go through your history, your goals and your options together, and reach a shared decision. You can tell us your preference, but the clinical decision is your prescriber's, and they may recommend a different option, or none at all.",
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
    id: 4,
    title: "Your plan and first delivery",
    description:
      "If treatment is right for you, you receive your written treatment plan, your service agreement, and full access to the Lifestyle Library. Your first package is dispensed by our partner pharmacy and shipped in discreet, temperature-controlled packaging.",
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
        value: "You are free to use a pharmacy of your choice instead",
      },
    ],
  },
  {
    id: 5,
    title: "Reviews, then the off-ramp",
    description:
      "You are reviewed every two weeks (about 15 minutes) with a longer review every four weeks (about 30 minutes), alongside monitoring blood tests and deliveries every four weeks. The final two months are a compulsory maintenance phase: treatment is stepped down deliberately, and you finish with a plan that is yours to keep.",
    meta: [
      {
        label: "Rhythm",
        value: "Reviews every two weeks; deliveries every four weeks",
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

const DOT_SIZE = 52;
const LINE_DURATION = 1.6; // seconds, matches the mockup's 1.6s draw

function VerticalJourneyLine({ drawn }: { drawn: boolean }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 52 1200"
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{
        position: "absolute",
        left: 0,
        top: 5,
        bottom: 5,
        width: 52,
        height: "calc(100% - 10px)",
      }}
    >
      <path
        d="M26 0 C 4 130, 48 240, 26 360 S 6 590, 26 720 S 48 950, 26 1200"
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        style={{
          color: "inherit",
          opacity: 0.55,
          strokeDasharray: 1,
          strokeDashoffset: drawn ? 0 : 1,
          transition: `stroke-dashoffset ${LINE_DURATION}s ease`,
        }}
      />
    </Box>
  );
}

export function JourneyTimeline() {
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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="section"
      sx={{ mx: "auto", maxWidth: 1100, px: 3, py: { xs: 8, md: 12 } }}
    >
      <Box
        ref={sectionRef}
        sx={{
          position: "relative",
          mt: { xs: 4, md: 6 },
          pl: { xs: 9, md: 14.75 },
          color: "primary.main",
        }}
      >
        <VerticalJourneyLine drawn={drawn} />

        {STEPS.map((step, i) => (
          <Box
            key={step.id}
            sx={{
              position: "relative",
              maxWidth: 640,
              mb: i === STEPS.length - 1 ? 0 : { xs: 6, md: 8 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: { xs: -74, md: -115 },
                top: -2,
                width: DOT_SIZE,
                height: DOT_SIZE,
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
              {step.id}
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 700,
                fontSize: "1.35rem",
                letterSpacing: "-0.02em",
                color: "secondary.main",
                mb: 1.25,
              }}
            >
              {step.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, color: "text.secondary" }}
            >
              {step.description}
            </Typography>

            <Box
              sx={{
                mt: 2.5,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: { xs: 1.5, sm: "12px 24px" },
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "20px",
                p: { xs: 2.5, sm: 3.25 },
                fontSize: "0.88rem",
                boxShadow:
                  "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
              }}
            >
              {step.meta.map((item) => (
                <Box key={item.label}>
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
                    {item.label}
                  </Typography>
                  {item.value}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

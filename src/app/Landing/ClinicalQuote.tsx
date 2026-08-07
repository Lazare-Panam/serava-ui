// src/components/ClinicalQuote.tsx
// Testimonial carousel — 3 cards (stat + tiny decorative sparkline + quote
// + name/role on a cream panel, dummy photo on the right), styled after
// the reference layout. Arrow buttons + numbered tabs switch between them.
//
// EVERYTHING here is a placeholder for visual/layout purposes only:
// - The three photos are the "dummy-*" stand-in images, not real patients.
// - "Amelia"/"Marcus"/"Priya" are fictional sample personas invented to
//   fill out this mockup's copy — not real Serava patients. Never ship a
//   quote, name, or benefit tag attributed to a real person unless they
//   actually said it and consented to it being used.
// - Every stat number and the sparkline under it are ILLUSTRATIVE CONCEPT
//   FIGURES, same rule as Outcomes.tsx: replace with real, evidenced
//   numbers before this goes live, never fabricate a statistic.
"use client";

import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const TESTIMONIALS = [
  {
    image: "https://pblol2.blob.core.windows.net/serava-ui/hero/dummy-1.jpg",
    stat: "18kg",
    statLabel: "Weight lost",
    quote:
      "“I'd tried enough fad plans to know they don't stick. Having a prescriber and a proper check-in schedule made the difference — for the first time this actually felt sustainable, not just another diet I'd fall off in a month.”",
    tags: ["Decreased appetite", "More energy", "Sleeping better"],
    name: "Matt",
    role: "Weight loss programme",
    sparkline: "M4 34 C 20 30, 34 26, 48 20 S 72 10, 88 6",
  },
  {
    image: "https://pblol2.blob.core.windows.net/serava-ui/hero/dummy-3.jpg",
    stat: "12 wks",
    statLabel: "To first result",
    quote:
      "“The blood work before and after made it feel like medicine, not guesswork. I finally understand what's actually going on with my body, and the check-ins meant I never felt like I was doing this alone.”",
    tags: ["Brain fog lifted", "Better gym recovery", "Improved mood"],
    name: "Wesley",
    role: "Testosterone programme",
    sparkline: "M4 30 C 18 32, 30 22, 46 24 S 70 8, 88 10",
  },
  {
    image: "https://pblol2.blob.core.windows.net/serava-ui/hero/Samira.jpg",
    stat: "94%",
    statLabel: "Felt supported",
    quote:
      "“It's a small thing to some people, but starting was easy, and I've actually stuck with the plan because someone's checking in on me. Six months in, I'm not thinking about it as a chore anymore.”",
    tags: ["Visible regrowth", "More confident", "Stuck with the plan"],
    name: "Samira",
    role: "Hair loss programme",
    sparkline: "M4 28 C 20 24, 34 30, 50 18 S 74 4, 88 8",
  },
];

// Tiny decorative trend line — purely aesthetic (echoes the "outcomes"
// chart language elsewhere on the page), not a rendering of real data.
function Sparkline({ path }: { path: string }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 92 40"
      aria-hidden="true"
      sx={{ width: 92, height: 40 }}
    >
      <path
        d={path}
        fill="none"
        stroke="#2AB3A6"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Box>
  );
}

export function ClinicalQuote() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];

  const goPrev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <Box
      component="section"
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 8, md: 12 } }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "2.75rem" },
          lineHeight: 1.2,
          mb: { xs: 5, md: 7 },
          maxWidth: 820,
          mx: "auto",
          textAlign: "center",
        }}
      >
        When your plan is rooted in{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          evidence and built around you
        </Box>
        , it works.
      </Typography>

      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <Box
          key={index}
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
            minHeight: { xs: "auto", md: 500 },
            boxShadow: "0 20px 48px rgba(29,36,48,0.18)",
            animation: "clinicalQuoteFade 0.5s ease",
            "@keyframes clinicalQuoteFade": {
              from: { opacity: 0, transform: "translateY(8px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Stat + quote panel */}
          <Box
            sx={{
              background: "linear-gradient(160deg, #F7EFE4 0%, #EEDFC8 100%)",
              p: { xs: 4, sm: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  color: "secondary.main",
                  lineHeight: 1,
                }}
              >
                {active.stat}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.5, mb: 2 }}
              >
                {active.statLabel}
              </Typography>
              <Sparkline path={active.sparkline} />

              <Typography
                component="blockquote"
                sx={{
                  m: 0,
                  mt: 3,
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                  color: "text.primary",
                }}
              >
                {active.quote}
              </Typography>

              {/* Benefit tags — short, scannable callouts that back up the
                  quote with specifics, same device as the reference
                  layout. Still placeholder content, same rule as
                  everything else in this file. */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 3,
                }}
              >
                {active.tags.map((tag) => (
                  <Box
                    key={tag}
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 999,
                      px: 2,
                      py: 0.75,
                      boxShadow: "0 2px 6px rgba(29,36,48,0.08)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      {tag}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  opacity: 0.85,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  {active.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {active.role}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Photo */}
          <Box
            sx={{
              minHeight: { xs: 260, md: "100%" },
              backgroundImage: `url(${active.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>

        {/* Controls: prev/next arrows + numbered tabs */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <IconButton
            onClick={goPrev}
            aria-label="Previous testimonial"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              color: "text.primary",
            }}
          >
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <Box sx={{ display: "flex", gap: 1 }}>
            {TESTIMONIALS.map((t, i) => (
              <Box
                key={t.name + i}
                component="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                sx={{
                  border: "none",
                  cursor: "pointer",
                  width: i === index ? 28 : 10,
                  height: 10,
                  borderRadius: 999,
                  bgcolor: i === index ? "primary.main" : "muted.main",
                  transition: "width 0.3s ease, background-color 0.3s ease",
                  p: 0,
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={goNext}
            aria-label="Next testimonial"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              color: "text.primary",
            }}
          >
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

// src/app/faqs/page.tsx
// FAQ page — port of the approved static mockup (seravafaqv1.html) onto the
// app's existing MUI theme (src/app/theme.ts), following the same pattern
// already used for /how-it-works: theme tokens instead of the mockup's CSS
// variables, MUI components instead of hand-rolled markup. Header/footer are
// assumed to come from the shared root layout (Navbar/Footer), same as
// how-it-works/page.tsx — this file is the page body only.
//
// NOTE — palette:
// - The mockup's --butter (#F8E08E / deep #8A6D1A) is now a real theme
//   token: theme.palette.accentWarm.main / .dark (added to theme.ts,
//   replacing the local BUTTER hex constants that used to be duplicated in
//   this file, how-it-works/page.tsx, HowItWorksHero.tsx, and
//   JourneyTimeline.tsx). Used below for the page-hero's second background
//   blob only — the mockup's closing dark-green CTA band (which also used
//   this token for its own blob) was removed per request; see note further
//   down where the "still have a question" panel now closes the page
//   instead.
// - The mockup's --stop (#B0432B) is defined in its :root but unused on
//   this page — not reproduced here either, same reasoning as the
//   how-it-works port's unused --ok/--warn/--stop note.
//
// Content note: bracketed placeholders from the source mockup ("[CQC status
// line per brief 7.3]", "[Company] Ltd", "No. [x]", "Registered office:
// [x]", "(premises No. [x])", "ICO registration: [x]") are carried over
// verbatim as placeholder copy — same "designs, not promises" caveat as the
// how-it-works page. Don't ship this without replacing them with confirmed
// legal/clinical text. The mockup's own footer/registration block is NOT
// reproduced here on the assumption it lives once in the shared Footer
// component (see how-it-works/page.tsx's equivalent omission) — if that's
// not the case and this page needs its own copy of that block, say so and
// I'll add it.
//
// Accordion: the mockup uses plain CSS-only <details>/<summary>. Ported to
// MUI's Accordion/AccordionSummary/AccordionDetails per your call, matching
// how every other interactive element on this page (buttons, chips) is
// already a real MUI component rather than native HTML styled via sx.
//
// Page ending: the mockup's closing dark-green "cta-band" section (Step one
// takes five minutes...) has been removed per request. The "still have a
// question?" panel — previously just a small prompt sitting above that
// band — is now the actual last thing on the page, so it carries more
// margin above/below (mt: 6, mb responsive) than it needed when a CTA band
// followed immediately after it. Its background is unchanged
// (background.paper / white) — not switched to the removed band's dark
// green treatment.

"use client";

import Link from "next/link";
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import type { SvgIconComponent } from "@mui/icons-material";

type FaqItem = { q: string; a: React.ReactNode };
type FaqCategory = {
  id: string;
  jumpLabel: string;
  title: string;
  icon: SvgIconComponent;
  items: FaqItem[];
};

// Every answer below is carried over verbatim from the mockup, which itself
// states each answer is either copied from copy already approved elsewhere
// in the brief, or a short connective sentence introducing no new claim.
// Internal cross-links (href="#" in the mockup) are left as placeholder
// hrefs pending real route paths for those pages.
const CATEGORIES: FaqCategory[] = [
  {
    id: "getting-started",
    jumpLabel: "Getting started",
    title: "Getting started",
    icon: ArrowUpwardRoundedIcon,
    items: [
      {
        q: "Who is this service for?",
        a: (
          <>
            Adults aged 18 and over in the UK looking for supervised,
            prescriber-led weight management. Our eligibility check exists to
            confirm treatment is likely to be safe and suitable for your
            specific situation before anything else happens.
          </>
        ),
      },
      {
        q: "Does completing the eligibility check guarantee a prescription?",
        a: (
          <>
            No. Completing this form does not guarantee a prescription. In the
            UK, weight-loss medicines can never be prescribed from an online
            form alone.
          </>
        ),
      },
      {
        q: "Do I qualify for the programme?",
        a: (
          <>
            Eligibility follows UK clinical guidance and depends on your BMI,
            ethnicity-adjusted where appropriate, your health history and
            current medicines. The five-minute check gives you a clear answer,
            free.
          </>
        ),
      },
      {
        q: "What happens after the eligibility check?",
        a: (
          <>
            If it looks suitable, you complete a more detailed medical
            questionnaire, then have a one to one video consultation with a
            prescriber. See the full{" "}
            <Link href="/how-it-works">how it works</Link> page for timings at
            each step.
          </>
        ),
      },
    ],
  },
  {
    id: "treatment",
    jumpLabel: "Consultation & treatment",
    title: "The consultation & treatment",
    icon: LocalHospitalRoundedIcon,
    items: [
      {
        q: "Do you prescribe medicines?",
        a: (
          <>
            Where clinically appropriate, our prescribers can prescribe licensed
            weight-loss treatments as part of the programme. UK rules mean we
            can only discuss specific medicines with you after your
            consultation.
          </>
        ),
      },
      {
        q: "How long is the consultation?",
        a: (
          <>
            Up to one hour, one to one over video with your prescriber. You go
            through your history, goals and options together, and reach a shared
            decision.
          </>
        ),
      },
      {
        q: "Can I choose which treatment I get?",
        a: (
          <>
            You can tell us your preference, but the clinical decision is your
            prescriber&apos;s, and they may recommend a different option, or
            none at all.
          </>
        ),
      },
      {
        q: "What if my prescriber decides treatment isn't right for me?",
        a: (
          <>
            Then we&apos;ll tell you clearly why, and point you towards more
            suitable support where we can. Getting this far in the process is
            never a guarantee of treatment — your safety comes first, always.
          </>
        ),
      },
      {
        q: "Are blood tests really necessary?",
        a: (
          <>
            Yes. Baseline blood tests happen before treatment starts, and
            monitoring blood tests continue throughout, arranged through our
            national testing partner. We measure before we treat, and we keep
            measuring — no guesswork.
          </>
        ),
      },
    ],
  },
  {
    id: "programme-shape",
    jumpLabel: "The programme",
    title: "The programme",
    icon: AccessTimeRoundedIcon,
    items: [
      {
        q: "How long does the programme last?",
        a: (
          <>
            It&apos;s designed around nine months: evaluation in month one,
            treatment through months two to seven if suitable and stable, then
            titrating down with maintenance in months eight and nine. Your
            prescriber may adjust this shape around you — timings are a design,
            not a promise.
          </>
        ),
      },
      {
        q: "What happens at the end of the programme?",
        a: (
          <>
            The programme ends deliberately: a two-month maintenance phase where
            treatment is stepped down and you leave with a plan that is yours to
            keep.
          </>
        ),
      },
      {
        q: "What is the Lifestyle Library?",
        a: (
          <>
            Meals, strength training, hydration, supplements and safety guidance
            — every volume included from day one, written by our clinical team
            for real UK kitchens, supermarkets and living rooms. See{" "}
            <Link href="#">the Library</Link> for the full shelf.
          </>
        ),
      },
    ],
  },
  {
    id: "cost",
    jumpLabel: "Cost & payment",
    title: "Cost & payment",
    icon: PaidRoundedIcon,
    items: [
      {
        q: "How much does the programme cost?",
        a: (
          <>
            The consultation fee and monthly programme fee are shown on our{" "}
            <Link href="/pricing">pricing</Link> page. Final figures are
            confirmed with you after your consultation, before you pay anything
            for treatment.
          </>
        ),
      },
      {
        q: "What if I am not eligible?",
        a: (
          <>
            Then there is nothing to pay. The eligibility check and the medical
            questionnaire are free, and we will tell you why, and point you
            towards more suitable support.
          </>
        ),
      },
      {
        q: "Can I cancel?",
        a: (
          <>
            Yes. How cancellation and refunds work is set out in plain English
            in our cancellations and refunds policy, and in your service
            agreement before you start. Stopping treatment is always done
            safely, with your prescriber.
          </>
        ),
      },
      {
        q: "Will my price change during the programme?",
        a: (
          <>
            The price you agree in your service agreement is the price for your
            programme. Anything that could change it is set out in that
            agreement before you sign.
          </>
        ),
      },
    ],
  },
  {
    id: "safety",
    jumpLabel: "Safety & eligibility",
    title: "Safety & eligibility limits",
    icon: ShieldRoundedIcon,
    items: [
      {
        q: "Is this service suitable for everyone?",
        a: (
          <>
            No. You must be 18 or over. It is not suitable during pregnancy,
            breastfeeding, or while trying to conceive. Some medical conditions
            and histories mean we cannot treat you safely; our eligibility check
            screens for these, and we will always tell you why.
          </>
        ),
      },
      {
        q: "What if I need help right now?",
        a: (
          <>
            If you are unwell now, or you need urgent help with how you are
            feeling, call 999 in an emergency or NHS 111 for urgent advice. Our
            forms and messaging are not monitored in real time — Serava is not
            an emergency service.
          </>
        ),
      },
    ],
  },
  {
    id: "privacy",
    jumpLabel: "Privacy & regulation",
    title: "Privacy & regulation",
    icon: LockRoundedIcon,
    items: [
      {
        q: "Is my information private?",
        a: (
          <>
            Yes. Your health information is held securely as a clinical record,
            is never sold, and is only shared with your GP with your consent.
            Our privacy notice explains everything in plain English.
          </>
        ),
      },
      {
        q: "Who regulates Serava Health?",
        a: (
          <>
            Both our prescribers are GPhC-registered Independent Prescribers,
            verifiable on the public register. [CQC status line per brief 7.3].
            We are a registered data controller with the ICO.
          </>
        ),
      },
      {
        q: "Who dispenses my prescription?",
        a: (
          <>
            Prescriptions are dispensed and shipped by Higherland Pharmacy,
            Newcastle-under-Lyme, a pharmacy registered with the General
            Pharmaceutical Council. In the interests of transparency, our
            dispensing partner is part-owned by one of our co-founders — you are
            always free to use a pharmacy of your choice instead, and your care
            is unaffected either way.
          </>
        ),
      },
      {
        q: "How do I make a complaint?",
        a: (
          <>
            We have a clear, published complaints procedure — see{" "}
            <Link href="#">how to complain</Link>. We would rather hear it than
            not.
          </>
        ),
      },
    ],
  },
];

function EyebrowLine({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "primary.dark",
        mb: 2,
        "&::before": {
          content: '""',
          width: 22,
          height: "1.5px",
          bgcolor: "primary.main",
          borderRadius: "2px",
        },
      }}
    >
      {children}
    </Typography>
  );
}

export default function FaqPage() {
  // Tracks which panel is open per category, mirroring the mockup's
  // independent-per-category accordion groups (each <details> group opens
  // and closes without affecting the others). First item in the first
  // category starts open, matching the mockup's <details open> on q1.
  const [expanded, setExpanded] = useState<Record<string, string | false>>({
    "getting-started": "getting-started-0",
  });

  const handleChange =
    (categoryId: string, panelId: string) =>
    (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prev) => ({
        ...prev,
        [categoryId]: isExpanded ? panelId : false,
      }));
    };

  return (
    <Box component="main">
      {/* ---------------- Page hero ---------------- */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 8, md: 11 },
          pb: { xs: 7, md: 8 },
          background: "linear-gradient(180deg, #F6FAF9 0%, #F1F8F6 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -200,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(42,179,166,0.14) 0%, rgba(42,179,166,0) 70%)",
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -160,
            left: -160,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: (theme) =>
              `radial-gradient(circle, ${alpha(theme.palette.accentWarm.main, 0.22)} 0%, ${alpha(theme.palette.accentWarm.main, 0)} 70%)`,
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ position: "relative", maxWidth: 1100, mx: "auto", px: 3.5 }}>
          <EyebrowLine>FAQs</EyebrowLine>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.2rem", md: "3.3rem" },
              fontWeight: 800,
              lineHeight: 1.16,
              letterSpacing: "-0.02em",
              color: "secondary.main",
            }}
          >
            Questions, answered plainly
          </Typography>

          <Typography
            sx={{
              fontSize: "1.14rem",
              mt: 2.25,
              color: "text.secondary",
              maxWidth: "60ch",
              lineHeight: 1.7,
            }}
          >
            If it isn&apos;t here, our <Link href="#">privacy notice</Link>,{" "}
            <Link href="#">terms</Link>, and <Link href="#">complaints</Link>{" "}
            pages go into more detail — or you can ask us directly.
          </Typography>

          {/* Jump nav */}
          <Stack
            direction="row"
            spacing={1.25}
            sx={{ mt: 3.5, flexWrap: "wrap", rowGap: 1.25 }}
          >
            {CATEGORIES.map((cat) => (
              <Box
                key={cat.id}
                component="a"
                href={`#${cat.id}`}
                sx={{
                  fontSize: "0.84rem",
                  fontWeight: 500,
                  color: "secondary.main",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 999,
                  px: 2,
                  py: 1.1,
                  textDecoration: "none",
                  boxShadow:
                    "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
                  transition:
                    "transform 0.25s ease, border-color 0.25s ease, color 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: "primary.main",
                    color: "primary.dark",
                  },
                }}
              >
                {cat.jumpLabel}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* ---------------- FAQ categories ---------------- */}
      {CATEGORIES.map((cat, catIndex) => {
        const Icon = cat.icon;
        // Alternates a real light/dark rhythm between sections, not just
        // white-vs-transparent as before. Dark uses secondary.main (deep
        // viridian, #2F5D50) — the one color in theme.ts actually dark
        // enough for white text on top of it; it's also what the removed
        // CTA band used for the same reason. Every accordion color below
        // now branches on isDark so cards/text/icons stay legible on
        // whichever background they land on.
        const isDark = catIndex % 2 === 1;
        return (
          <Box
            key={cat.id}
            component="section"
            id={cat.id}
            sx={{
              scrollMarginTop: "96px",
              py: { xs: 8, md: 10 },
              bgcolor: isDark ? "secondary.main" : "background.paper",
              borderTop: isDark ? "none" : "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ maxWidth: 1100, mx: "auto", px: 3.5 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.75,
                  mb: 3.25,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "13px",
                    background: isDark
                      ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), rgba(255,255,255,0.04))"
                      : "radial-gradient(circle at 30% 30%, #EAF9F6, #FAF9F5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isDark
                      ? "inset 0 0 0 1px rgba(255,255,255,0.18)"
                      : "inset 0 0 0 1px rgba(42,179,166,0.15)",
                  }}
                >
                  <Icon
                    sx={{
                      color: isDark ? "#FFFFFF" : "primary.dark",
                      fontSize: 21,
                    }}
                  />
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    // Mockup's own CSS caps category h2s at
                    // clamp(1.4rem, 2.6vw, 1.7rem) — noticeably smaller than
                    // the page's h1. Missed this the first pass and let it
                    // fall through to MUI's unscaled h2 default (3.75rem),
                    // which is why these read as oversized/incohesive next
                    // to the rest of the page.
                    fontSize: "clamp(1.4rem, 2.6vw, 1.7rem)",
                    color: isDark ? "#FFFFFF" : "secondary.main",
                    m: 0,
                  }}
                >
                  {cat.title}
                </Typography>
              </Box>

              <Box sx={{ maxWidth: 800 }}>
                {cat.items.map((item, i) => {
                  const panelId = `${cat.id}-${i}`;
                  return (
                    <Accordion
                      key={panelId}
                      expanded={expanded[cat.id] === panelId}
                      onChange={handleChange(cat.id, panelId)}
                      disableGutters
                      elevation={0}
                      sx={{
                        // On dark sections the card itself stays a plain
                        // white surface (a translucent/dark card here would
                        // fight with the question text needing to stay dark
                        // for the existing font-weight/AA styling) — so the
                        // card "floats" off the dark background, same idea
                        // as the light section's white-card-on-white just
                        // made visible by contrast instead of a border.
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.14)"
                          : "divider",
                        borderRadius: "20px !important",
                        mb: 1.75,
                        overflow: "hidden",
                        boxShadow: isDark
                          ? "0 4px 14px rgba(0,0,0,0.18)"
                          : "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
                        "&.Mui-expanded": {
                          boxShadow: isDark
                            ? "0 8px 24px rgba(0,0,0,0.24)"
                            : "0 2px 6px rgba(42,84,73,0.05), 0 20px 44px -20px rgba(42,84,73,0.20)",
                        },
                        "&::before": { display: "none" },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              bgcolor:
                                expanded[cat.id] === panelId
                                  ? "primary.main"
                                  : "background.default",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background-color 0.25s ease",
                            }}
                          >
                            <ExpandMoreRoundedIcon
                              sx={{
                                fontSize: 16,
                                color:
                                  expanded[cat.id] === panelId
                                    ? "#FFFFFF"
                                    : "primary.dark",
                              }}
                            />
                          </Box>
                        }
                        sx={{
                          px: 3,
                          py: 0.5,
                          "& .MuiAccordionSummary-content": {
                            // Was missing fontFamily — AccordionDetails'
                            // text is wrapped in <Typography> so it inherits
                            // Montserrat from theme.ts automatically, but
                            // this summary text is plain content with no
                            // Typography wrapper, so it was silently
                            // falling back to MUI's own default font stack
                            // instead. That's why questions and answers
                            // looked like two different fonts.
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontWeight: 600,
                            fontSize: "0.98rem",
                            // Accordion card background is always white
                            // (background.paper) regardless of section, so
                            // this stays secondary.main on both — no isDark
                            // branch needed here, only the surrounding
                            // section chrome (icon badge, h2, card border/
                            // shadow) needs to react to the section color.
                            color: "secondary.main",
                          },
                        }}
                      >
                        {item.q}
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          px: 3,
                          pb: 2.75,
                          pt: 0,
                          fontSize: "0.93rem",
                          color: "text.secondary",
                        }}
                      >
                        <Typography sx={{ maxWidth: "64ch", color: "inherit" }}>
                          {item.a}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>

              {/* "Still have questions" panel — only on the last category.
                  Now doubles as the page's closing element since the CTA
                  band section was removed, so it needs real breathing room
                  above/below it instead of the tight mt:1 that made sense
                  when a CTA band followed immediately after. Background
                  stays background.paper (white) — not switched to the old
                  CTA band's dark green, per request. */}
              {catIndex === CATEGORIES.length - 1 && (
                <Box
                  sx={{
                    position: "relative",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 5,
                    p: { xs: 3.5, md: 5 },
                    mt: 6,
                    mb: { xs: 2, md: 4 },
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    boxShadow:
                      "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "secondary.main",
                        fontSize: "1.05rem",
                        mb: 0.75,
                      }}
                    >
                      Still have a question?
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.92rem",
                        maxWidth: "44ch",
                      }}
                    >
                      The eligibility check is the fastest way to get a personal
                      answer — free, and no obligation.
                    </Typography>
                  </Box>
                  <Box
                    component={Link}
                    href="/eligibility"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "9px",
                      fontWeight: 600,
                      fontSize: "1rem",
                      px: 3.5,
                      py: 1.9,
                      borderRadius: 999,
                      textDecoration: "none",
                      color: "primary.contrastText",
                      background:
                        "linear-gradient(135deg, #33C2B4 0%, #2AB3A6 55%, #1F8A80 100%)",
                      boxShadow:
                        "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10), 0 10px 24px -10px rgba(31,138,128,0.55)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow:
                          "0 2px 6px rgba(42,84,73,0.05), 0 20px 44px -20px rgba(42,84,73,0.20), 0 16px 32px -12px rgba(31,138,128,0.6)",
                      },
                    }}
                  >
                    Check your eligibility →
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

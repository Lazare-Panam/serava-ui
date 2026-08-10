"use client";

import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { Box, Typography, Button, Chip } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

// Same buttery yellow ProgrammePaths.tsx already uses for its "starting
// fresh" card, kept as a literal hex (not a theme token) for the same
// reason it is over there — there's no palette entry for it, and forcing
// one into theme.ts just for this one card isn't worth it.
const BUTTERY_YELLOW = "#F9E8B0";

type Plan = {
  id: string;
  badge: string;
  ribbon?: string;
  price: string;
  priceSuffix: string;
  chip: string;
  sectionedFeatures: { heading?: string; items: string[] }[];
  cta: string;
  href: string;
  accent: "amber" | "iris" | "teal";
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "suitability",
    badge: "Starting at",
    price: "Free",
    priceSuffix: "Steps one to three",
    chip: "No card required",
    sectionedFeatures: [
      {
        heading: "The process",
        items: [
          "The five-minute eligibility check",
          "The detailed medical questionnaire",
          "Your first video consultation, in full, one to one",
        ],
      },
      {
        heading: "What you get",
        items: [
          "A clear answer, with reasons either way",
          "No card required, and no commitment either way",
          "A referral elsewhere if we're not the right fit",
        ],
      },
    ],
    cta: "Start free",
    href: "/eligibility",
    accent: "amber",
  },
  {
    id: "subscription",
    badge: "Starting at",
    ribbon: "The programme",
    price: "£129",
    priceSuffix: "per month",
    chip: "Reviewed as we grow. See terms for details",
    sectionedFeatures: [
      {
        heading: "Clinical care",
        items: [
          "Prescriber consultations every four weeks",
          "Baseline and ongoing monitoring blood tests",
          "Independent identity, height and weight verification",
          "Titration management, adjusted by your prescriber",
        ],
      },
      {
        heading: "Included with your plan",
        items: [
          "The full Lifestyle Library, from day one",
          "Direct messaging with your care team, via the safety inbox",
          "A GP letter, with your consent",
          "Delivery handled for you by our pharmacy partner",
        ],
      },
      {
        heading: "Billing",
        items: [
          "Monthly billing throughout, with no prepaid blocks",
          "Medication billed separately, at cost, confirmed before you pay",
        ],
      },
    ],
    cta: "Check your eligibility →",
    href: "/eligibility",
    accent: "teal",
    featured: true,
  },
  {
    id: "maintenance",
    badge: "Starting at",
    price: "£119",
    priceSuffix: "per month",
    chip: "Where your plan winds down",
    sectionedFeatures: [
      {
        heading: "As treatment steps down",
        items: [
          "Consultation-led reviews on a steady rhythm",
          "Little to no medication cost at this stage",
          "Continued access to the full Lifestyle Library",
        ],
      },
      {
        heading: "Your ending",
        items: [
          "A plan that's yours to keep once you finish",
          "No re-enrolment needed to stay supported",
          "Built in from day one, not an afterthought",
        ],
      },
    ],
    cta: "Book a consultation",
    href: "/book",
    accent: "iris",
  },
];

// Plain palette-path strings (or the literal yellow) only — MUI's sx
// engine resolves these on its own, no theme access required, so nothing
// here can ever hit a "theme is unknown" problem.
//
// chipBg/chipTextColor are deliberately a HIGH-CONTRAST pairing against
// their own headerBg — not just a lighter tint of the same hue. The old
// amber chip (alpha(BUTTERY_YELLOW, 0.6) on top of BUTTERY_YELLOW) had
// almost no contrast against its own header, so it rendered as if the
// pill were missing entirely even though the Chip was there. Every
// variant now gets a solid, visibly-bounded pill like the other two.
const ACCENT_TOKENS = {
  amber: {
    headerBg: BUTTERY_YELLOW,
    headerText: "#3D2E00",
    checkColor: "#8A6D00",
    chipBg: "#3D2E00",
    chipTextColor: "#FFFFFF",
  },
  iris: {
    headerBg: "accentBrand.main",
    headerText: "accentBrand.contrastText",
    checkColor: "accentBrand.main",
    chipBg: (theme: any) => alpha(theme.palette.accentBrand.contrastText, 0.22),
    chipTextColor: "accentBrand.contrastText",
  },
  teal: {
    headerBg: "primary.main",
    headerText: "#FFFFFF",
    checkColor: "primary.main",
    chipBg: "rgba(255,255,255,0.22)",
    chipTextColor: "#FFFFFF",
  },
} as const;

function PricingCard({ plan }: { plan: Plan }) {
  const tokens = ACCENT_TOKENS[plan.accent];
  const isFeatured = Boolean(plan.featured);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: isFeatured ? "transparent" : "rgba(0,0,0,0.06)",
        boxShadow: isFeatured
          ? "0 28px 56px rgba(0,0,0,0.35)"
          : "0 8px 24px rgba(0,0,0,0.16)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        // Featured card is bigger in both dimensions, not just taller —
        // wider max-width plus its own min-height so it visibly stands
        // out from the other two rather than just having more content.
        minHeight: isFeatured ? 760 : 640,
        width: "100%",
        maxWidth: isFeatured ? 380 : 320,
        mx: "auto",
        // Nudge the featured card up slightly so it reads as "the" plan
        // rather than sitting flush in the same row as the other two.
        transform: isFeatured ? { md: "translateY(-16px)" } : "none",
        zIndex: isFeatured ? 2 : 1,
      }}
    >
      {plan.ribbon && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 150,
            height: 150,
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 32,
              right: -50,
              width: 200,
              textAlign: "center",
              transform: "rotate(45deg)",
              transformOrigin: "center",
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              py: 0.6,
            }}
          >
            {plan.ribbon}
          </Box>
        </Box>
      )}

      {/* Header block — the coloured zone carrying tier name + price */}
      <Box
        sx={{
          bgcolor: tokens.headerBg,
          color: tokens.headerText,
          p: isFeatured ? 5 : 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          {plan.badge}
        </Typography>

        <Typography
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 700,
            fontSize: isFeatured ? "3.25rem" : "2.75rem",
            lineHeight: 1.1,
            textTransform: "none",
            mt: 0.5,
          }}
        >
          {plan.price}
        </Typography>
        <Typography
          sx={{ fontSize: "0.85rem", opacity: 0.75, textTransform: "none" }}
        >
          {plan.priceSuffix}
        </Typography>

        <Chip
          label={plan.chip}
          size="small"
          sx={{
            mt: 2,
            height: "auto",
            bgcolor: tokens.chipBg,
            color: tokens.chipTextColor,
            fontWeight: 600,
            fontSize: "0.78rem",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
              lineHeight: 1.4,
              px: 1.5,
              py: 0.75,
              textTransform: "none",
            },
          }}
        />
      </Box>

      {/* Body — checklist + CTA, same treatment across every tier */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isFeatured ? 3 : 2.5,
          p: isFeatured ? 5 : 4,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: isFeatured ? 3 : 2.5,
            flexGrow: 1,
          }}
        >
          {plan.sectionedFeatures.map((section, idx) => (
            <Box
              key={section.heading ?? idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                pt: idx > 0 ? 2 : 0,
                borderTop: idx > 0 ? "1px solid" : "none",
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              {section.heading && (
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "text.disabled",
                  }}
                >
                  {section.heading}
                </Typography>
              )}
              {section.items.map((feature) => (
                <Box
                  key={feature}
                  sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor:
                        plan.accent === "amber"
                          ? alpha(BUTTERY_YELLOW, 0.5)
                          : plan.accent === "iris"
                            ? (theme: any) =>
                                alpha(theme.palette.accentBrand.main, 0.12)
                            : (theme: any) =>
                                alpha(theme.palette.primary.main, 0.14),
                      mt: "1px",
                    }}
                  >
                    <CheckRoundedIcon
                      sx={{ fontSize: 15, color: tokens.checkColor }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.92rem",
                      lineHeight: 1.55,
                      color: "text.secondary",
                      textTransform: "none",
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        <Button
          component={Link}
          href={plan.href}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 999,
            py: 1.2,
            mt: 1,
            fontWeight: 700,
            textTransform: "none",
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            "&:hover": { bgcolor: "secondary.main", opacity: 0.9 },
          }}
        >
          {plan.cta}
        </Button>
      </Box>
    </Box>
  );
}

export function PricingSection() {
  return (
    <Box
      component="section"
      id="pricing"
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 6, md: 10 } }}
    >
      {/* The tile — everything below (heading, cards, footer note) sits
          inside this one rounded dark-green panel. */}
      <Box
        sx={{
          borderRadius: 6,
          bgcolor: "secondary.main",
          px: { xs: 3, sm: 6 },
          py: { xs: 8, md: 12 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 20, height: "1px", bgcolor: "primary.main" }} />
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: "0.2em",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              Pricing
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 700,
              fontSize: { xs: "2.25rem", sm: "2.75rem" },
              color: "background.paper",
              textTransform: "none",
            }}
          >
            Pick the stage you're on
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 560,
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: (t) => alpha(t.palette.background.paper, 0.75),
              textTransform: "none",
            }}
          >
            Three stages, three prices — nothing hidden between them, and
            nothing to pay until you know this is right for you.
          </Typography>
        </Box>

        <Box
          sx={{
            mx: "auto",
            mt: { xs: 6, md: 12 },
            maxWidth: 1200,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "320px 380px 320px" },
            justifyContent: "center",
            gap: { xs: 4, md: 4 },
            alignItems: "stretch",
          }}
        >
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </Box>

        <Typography
          sx={{
            mt: { xs: 6, md: 10 },
            textAlign: "center",
            fontSize: "0.9rem",
            color: (t) => alpha(t.palette.background.paper, 0.7),
            textTransform: "none",
          }}
        >
          You pay nothing until you book your consultation. Full breakdown of
          what's included is on{" "}
          <Box
            component={Link}
            href="/programme"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            the programme
          </Box>{" "}
          page.
        </Typography>
      </Box>
    </Box>
  );
}

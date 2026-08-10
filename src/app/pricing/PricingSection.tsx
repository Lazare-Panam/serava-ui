"use client";

import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { Box, Typography, Button, Chip } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

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
};

// One icon per tier, shown as a small badge in the header — gives each
// card a visual anchor beyond the colour strip, rather than the tier
// name being the only thing distinguishing it.
const PLAN_ICON = {
  suitability: SpaRoundedIcon,
  subscription: FavoriteRoundedIcon,
  maintenance: AutorenewRoundedIcon,
} as const;

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
          "A same-week appointment slot, in most cases",
        ],
      },
      {
        heading: "What you get",
        items: [
          "A clear answer, with reasons either way",
          "No card required, and no commitment either way",
          "A referral elsewhere if we're not the right fit",
          "A written summary of the consultation to keep",
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
          "Your prescriber adjusts the pace, not a fixed schedule",
        ],
      },
      {
        heading: "Your ending",
        items: [
          "A plan that's yours to keep once you finish",
          "No re-enrolment needed to stay supported",
          "Built in from day one, not an afterthought",
          "A final review to confirm you're ready to step away",
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
//
// Full monochrome treatment — the ENTIRE card (header through footer,
// button included) is one solid accent colour now, not just a header
// strip over a white/pale-tinted body. Everything on top of that solid
// colour is a light/near-white text or icon so it reads against a
// saturated background, not a pale one. Each card is now unmistakably
// "the yellow card" / "the teal card" / "the iris card" — a single flat
// colour block per plan, not a colour cap on an otherwise neutral card.
const ACCENT_TOKENS = {
  amber: {
    cardBg: BUTTERY_YELLOW,
    text: "#3D2E00",
    secondaryText: "rgba(61,46,0,0.72)",
    iconBg: "rgba(61,46,0,0.16)",
    iconColor: "#3D2E00",
    checkBg: "rgba(61,46,0,0.16)",
    checkColor: "#3D2E00",
    chipBg: "#3D2E00",
    chipTextColor: "#FFFFFF",
    dividerColor: "rgba(61,46,0,0.16)",
    ctaBg: "#3D2E00",
    ctaText: "#FFFFFF",
  },
  iris: {
    cardBg: "accentBrand.main",
    text: "accentBrand.contrastText",
    secondaryText: (theme: any) =>
      alpha(theme.palette.accentBrand.contrastText, 0.72),
    iconBg: (theme: any) => alpha(theme.palette.accentBrand.contrastText, 0.18),
    iconColor: "accentBrand.contrastText",
    checkBg: (theme: any) =>
      alpha(theme.palette.accentBrand.contrastText, 0.18),
    checkColor: "accentBrand.contrastText",
    chipBg: (theme: any) => alpha(theme.palette.accentBrand.contrastText, 0.22),
    chipTextColor: "accentBrand.contrastText",
    dividerColor: (theme: any) =>
      alpha(theme.palette.accentBrand.contrastText, 0.18),
    ctaBg: "accentBrand.contrastText",
    ctaText: "accentBrand.main",
  },
  teal: {
    cardBg: "primary.main",
    text: "#FFFFFF",
    secondaryText: "rgba(255,255,255,0.72)",
    iconBg: "rgba(255,255,255,0.18)",
    iconColor: "#FFFFFF",
    checkBg: "rgba(255,255,255,0.18)",
    checkColor: "#FFFFFF",
    chipBg: "rgba(255,255,255,0.22)",
    chipTextColor: "#FFFFFF",
    dividerColor: "rgba(255,255,255,0.18)",
    ctaBg: "#FFFFFF",
    ctaText: "primary.main",
  },
} as const;

function PricingCard({ plan }: { plan: Plan }) {
  const tokens = ACCENT_TOKENS[plan.accent];
  const PlanIcon = PLAN_ICON[plan.id as keyof typeof PLAN_ICON];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        // Full monochrome card — one solid accent colour, header to
        // footer, instead of a colour strip over a neutral body.
        bgcolor: tokens.cardBg,
        border: "1px solid",
        borderColor: "rgba(0,0,0,0.06)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        // All three cards now the same size — no more featured-card
        // upsizing, vertical offset, or z-index bump, so they sit flush
        // in one row instead of the middle one popping out.
        minHeight: 640,
        width: "100%",
        maxWidth: 380,
        mx: "auto",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: { md: "translateY(-8px)" },
          boxShadow: "0 16px 36px rgba(0,0,0,0.22)",
        },
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

      {/* Header block — tier name + price. No separate background any
          more; it sits directly on the card's solid colour, with a
          small icon badge as its visual anchor. */}
      <Box
        sx={{
          color: tokens.text,
          p: 4,
          pb: 3,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: tokens.iconBg,
            mb: 2,
          }}
        >
          <PlanIcon sx={{ fontSize: 20, color: tokens.iconColor }} />
        </Box>

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
            fontSize: "2.75rem",
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

      {/* Body — checklist + CTA, same treatment across every tier.
          Gaps opened up throughout (section gap, item gap, line-height)
          so the list reads as scannable groups rather than a dense wall
          of small print. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 4,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            flexGrow: 1,
          }}
        >
          {plan.sectionedFeatures.map((section, idx) => (
            <Box
              key={section.heading ?? idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.75,
                pt: idx > 0 ? 2.5 : 0,
                borderTop: idx > 0 ? "1px solid" : "none",
                borderColor: tokens.dividerColor,
              }}
            >
              {section.heading && (
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: tokens.secondaryText,
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
                      bgcolor: tokens.checkBg,
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
                      lineHeight: 1.65,
                      color: tokens.text,
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

        {/* CTA button — kept only on the first (free/suitability) card.
            The other two no longer show a button underneath. */}
        {plan.id === "suitability" && (
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
              bgcolor: tokens.ctaBg,
              color: tokens.ctaText,
              "&:hover": { bgcolor: tokens.ctaBg, opacity: 0.88 },
            }}
          >
            {plan.cta}
          </Button>
        )}
      </Box>
    </Box>
  );
}

const SECTION_BG_IMAGE_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/p-bg.jpeg";

export function PricingSection() {
  return (
    <Box component="section" id="pricing" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Full-bleed background band — same footprint as before (no
          maxWidth/px gutter, no border radius, so it fills edge-to-edge),
          now a photo instead of a flat secondary.main green.
          p-bg.jpeg is itself a dark, busy leaf photo — the first overlay
          pass (72-80% black) crushed it down so far the photo barely
          read as anything, and worse, it dropped the heading/overline/
          intro text (which just changes colour, no shadow) below a
          usable contrast ratio against the same dark, textured
          background. Lightened the overlay a lot (28-45%, just enough
          to keep the busy leaf detail from fighting with the card grid)
          and added a text-shadow to the heading/overline/intro instead —
          a flat overlay alone can't guarantee contrast against a
          textured photo the way it could against a flat colour; a
          shadow separates the letters from whatever's directly behind
          them regardless of the photo's local brightness. */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${SECTION_BG_IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,22,20,0.28) 0%, rgba(15,22,20,0.45) 100%)",
          },
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
                // Shadow, not just colour, so this stays legible over the
                // busy leaf photo regardless of what's directly behind
                // any given letter — a lighter overlay alone can't
                // guarantee that on a textured background.
                textShadow: "0 2px 10px rgba(0,0,0,0.55)",
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
              textShadow: "0 4px 16px rgba(0,0,0,0.6)",
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
              color: (t) => alpha(t.palette.background.paper, 0.9),
              textTransform: "none",
              textShadow: "0 2px 10px rgba(0,0,0,0.55)",
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
            maxWidth: 1300,
            display: "grid",
            // Three equal-width columns — all three cards are now the
            // same size, so no more asymmetric 380/440/380 split.
            gridTemplateColumns: { xs: "1fr", md: "380px 380px 380px" },
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
            color: (t) => alpha(t.palette.background.paper, 0.85),
            textTransform: "none",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
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

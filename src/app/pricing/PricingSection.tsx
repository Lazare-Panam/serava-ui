// src/components/Landing/Pricing.tsx
// Three-tier pricing: a free eligibility/questionnaire stage, a one-time
// consultation fee, and a recurring subscription. Same card anatomy across
// all three (a coloured header block carrying the tier name/price, then a
// white body with the checklist and CTA) — only the header colour changes
// per tier. Colour lookups for plain palette tokens live in ACCENT_TOKENS;
// anything needing alpha-blending is computed inline via a `(theme) => ...`
// callback directly inside the relevant sx, the same pattern ProgrammePaths
// uses — no standalone helper function, so there's never a "theme"
// parameter sitting outside a typed context for TypeScript to choke on.
//
// Note: theme.ts sets `textTransform: "capitalize"` globally on
// MuiTypography and MuiChip (and "capitalize" on MuiButton too, despite
// typography.button being set to "none" — the component override wins).
// That's why every Typography/Chip below that's meant to read as normal
// sentence case has an explicit `textTransform: "none"` — without it,
// "Starting at" renders as "Starting At" and the chip's illustrative-price
// disclaimer gets title-cased word by word, which is what was happening
// before this fix. If you'd rather not fight this per-component, the real
// fix is removing those three overrides from theme.ts — this file just
// works around them locally instead, since that's a bigger, sitewide call.
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
  features: string[];
  cta: string;
  href: string;
  accent: "amber" | "iris" | "teal";
};

const PLANS: Plan[] = [
  {
    id: "suitability",
    badge: "Checking suitability",
    price: "Free",
    priceSuffix: "Steps one & two",
    chip: "No card required",
    features: [
      "The five-minute eligibility check",
      "The detailed medical questionnaire",
      "A clear answer either way",
    ],
    cta: "Start free",
    href: "/eligibility",
    accent: "amber",
  },
  {
    id: "consultation",
    badge: "One to one consultation",
    price: "£149",
    priceSuffix: "one-time consultation fee",
    chip: "Illustrative figure — final pricing under review, brief 10.1",
    features: [
      "A full video consultation, up to an hour, one to one with your prescriber",
      "Baseline blood tests as part of your assessment",
      "Independent identity and weight verification",
      "A shared decision on treatment with your prescriber",
    ],
    cta: "Book a consultation",
    href: "/book",
    accent: "iris",
  },
  {
    id: "subscription",
    badge: "The subscription",
    ribbon: "Full programme",
    price: "£199",
    priceSuffix: "per month",
    chip: "Illustrative figure — final pricing under review, brief 10.1",
    features: [
      "Reviews every two weeks, longer reviews every four",
      "Monitoring blood tests and cold-chain deliveries every four weeks",
      "The full Lifestyle Library, from day one",
      "A GP letter with consent, and a planned maintenance phase to finish",
    ],
    cta: "Check your eligibility →",
    href: "/eligibility",
    accent: "teal",
  },
];

// Plain palette-path strings (or the literal yellow) only — MUI's sx
// engine resolves these on its own, no theme access required, so nothing
// here can ever hit a "theme is unknown" problem.
const ACCENT_TOKENS = {
  amber: {
    headerBg: BUTTERY_YELLOW,
    headerText: "text.primary",
    checkColor: "status.amber",
    chipTextColor: "text.primary",
  },
  iris: {
    headerBg: "accentBrand.main",
    headerText: "accentBrand.contrastText",
    checkColor: "accentBrand.main",
    chipTextColor: "accentBrand.contrastText",
  },
  teal: {
    headerBg: "primary.main",
    headerText: "#FFFFFF",
    checkColor: "primary.main",
    chipTextColor: "#FFFFFF",
  },
} as const;

function PricingCard({ plan }: { plan: Plan }) {
  const tokens = ACCENT_TOKENS[plan.accent];
  const isFeatured = plan.accent === "teal";

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        bgcolor: "background.paper",
        boxShadow: isFeatured
          ? "0 24px 48px rgba(29,36,48,0.16)"
          : "0 12px 32px rgba(29,36,48,0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 640,
        width: "100%",
        maxWidth: 320,
        mx: "auto",
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
      <Box sx={{ bgcolor: tokens.headerBg, color: tokens.headerText, p: 4 }}>
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
            fontSize: "0.8rem",
            mt: 2.5,
            opacity: 0.75,
            textTransform: "none",
          }}
        >
          Starting at
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 700,
            fontSize: "2.75rem",
            lineHeight: 1.1,
            textTransform: "none",
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
            bgcolor:
              plan.accent === "amber"
                ? alpha(BUTTERY_YELLOW, 0.6)
                : plan.accent === "iris"
                  ? (theme) =>
                      alpha(theme.palette.accentBrand.contrastText, 0.18)
                  : (theme) => alpha(theme.palette.primary.contrastText, 0.14),
            color: tokens.chipTextColor,
            fontWeight: 500,
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
              lineHeight: 1.4,
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
          gap: 2,
          p: 4,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}
        >
          {plan.features.map((feature) => (
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
                        ? (theme) => alpha(theme.palette.accentBrand.main, 0.12)
                        : (theme) => alpha(theme.palette.primary.main, 0.14),
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
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 10, md: 16 } }}
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
          <Box sx={{ width: 20, height: "1px", bgcolor: "secondary.main" }} />
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
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
            textTransform: "none",
          }}
        >
          Pick the stage you're on
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 560,
            fontSize: "1.05rem",
            lineHeight: 1.7,
            textTransform: "none",
          }}
        >
          Three stages, three prices — nothing hidden between them, and nothing
          to pay until you know this is right for you.
        </Typography>
      </Box>

      <Box
        sx={{
          mx: "auto",
          mt: { xs: 6, md: 12 },
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 320px))" },
          justifyContent: "center",
          gap: { xs: 4, md: 5 },
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
          color: "text.secondary",
          textTransform: "none",
        }}
      >
        You pay nothing until you book your consultation. Full breakdown of
        what's included is on{" "}
        <Box
          component={Link}
          href="/programme"
          sx={{
            color: "secondary.main",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          the programme
        </Box>{" "}
        page.
      </Typography>
    </Box>
  );
}

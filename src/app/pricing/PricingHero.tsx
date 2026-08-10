// src/components/Landing/PricingHero.tsx
// Banner for the top of the pricing page — thin announcement strip, then a
// full-bleed rounded photo card with the headline bottom-left and a
// price + CTA block lower-right, then a trust row underneath (rating
// badge + a few icon/label callouts). Modelled on the reference layout.
//
// Two things deliberately NOT copied 1:1 from the reference:
// - The reference uses a real Trustpilot logo + a specific star rating and
//   review count. That's a genuine third-party brand plus a fabricated
//   number — copying it would both misuse Trustpilot's mark and imply a
//   review count Serava doesn't have. RATING_BADGE below is a generic
//   "rated by patients" badge instead — swap it for the real Trustpilot
//   embed script once there's an actual account to point at.
// - The reference's trust-row copy ("BMS accredited doctors") is specific
//   to that competitor's own accreditation (British Menopause Society —
//   not relevant to a GLP-1/testosterone/hair-loss programme). TRUST_ITEMS
//   below is generic to Serava's actual programme instead. Double check
//   the wording against what's actually true before this ships — same
//   rule as everywhere else in this codebase.
// - The £50/month headline price is an ILLUSTRATIVE CONCEPT FIGURE, same
//   caveat as PricingSection's "final pricing under review" chip.
"use client";

import Link from "next/link";
import { alpha } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const HERO_IMAGE_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/pricing-hero.jpeg";

const TRUST_ITEMS = [
  { icon: BadgeOutlinedIcon, label: "Independent prescribers" },
  { icon: MedicationOutlinedIcon, label: "Clinically proven medication" },
  { icon: AutorenewRoundedIcon, label: "Cancel subscription anytime" },
  { icon: VerifiedOutlinedIcon, label: "Regulated & UK-based" },
];

export function PricingHero() {
  return (
    <Box component="section" sx={{ pb: { xs: 6, md: 8 } }}>
      {/* Announcement strip */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          textAlign: "center",
          py: 1,
          px: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.82rem",
            fontWeight: 500,
            textTransform: "none",
          }}
        >
          New appointments added this week.{" "}
          <Box
            component={Link}
            href="/eligibility"
            sx={{
              color: "inherit",
              fontWeight: 700,
              textDecoration: "underline",
              textTransform: "none",
            }}
          >
            Book now
          </Box>
        </Typography>
      </Box>

      {/* Photo card — genuinely edge-to-edge now, same as Hero.tsx's video
          section: no px gutter, no border radius. The rounded-card
          treatment (small margin + radius) was still leaving a sliver of
          background on both sides at any viewport width, which read as
          "almost" full-bleed rather than actually full-bleed. */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 520, md: 640 },
          display: "flex",
          alignItems: "flex-end",
          backgroundImage: `url(${HERO_IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Bottom gradient so the headline stays legible regardless of
            what's in that part of the photo. */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,22,20,0) 40%, rgba(15,22,20,0.45) 100%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "flex-end" },
            justifyContent: "space-between",
            gap: { xs: 3, md: 4 },
            p: { xs: 3, sm: 5, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 700,
              fontSize: { xs: "2.1rem", sm: "2.75rem", md: "3.25rem" },
              lineHeight: 1.1,
              color: "background.paper",
              maxWidth: 460,
              textTransform: "none",
            }}
          >
            Complete care, no hidden costs
          </Typography>

          <Box sx={{ maxWidth: 340 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "background.paper",
                textTransform: "none",
              }}
            >
              Care from £50/month
            </Typography>
            <Typography
              sx={{
                mt: 0.75,
                mb: 2.5,
                fontSize: "0.92rem",
                lineHeight: 1.6,
                color: (t) => alpha(t.palette.background.paper, 0.85),
                textTransform: "none",
              }}
            >
              From your first appointment to your ongoing support, find out
              exactly what's included and how much it costs.
            </Typography>
            <Button
              component={Link}
              href="#pricing"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 999,
                px: 4,
                py: 1.2,
                fontSize: "0.95rem",
                fontWeight: 700,
                textTransform: "none",
                bgcolor: "background.paper",
                color: "text.primary",
                "&:hover": { bgcolor: "background.paper", opacity: 0.92 },
              }}
            >
              Find my care
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Trust row — same reasoning as the photo card above, no maxWidth
          cap, just a matching edge gutter. */}
      <Box
        sx={{
          mt: { xs: 3, md: 4 },
          px: { xs: 3, md: 4 },
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: { xs: 3, md: 4 },
        }}
      >
        {/* Generic rating badge — see file header: not the real Trustpilot
            mark, and no fabricated review count. Swap for the genuine
            embed once there's a real account to link. */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.25,
              bgcolor: "primary.main",
              borderRadius: 1,
              px: 0.75,
              py: 0.4,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <StarRoundedIcon
                key={i}
                sx={{ fontSize: 16, color: "#FFFFFF" }}
              />
            ))}
          </Box>
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "text.primary",
              textTransform: "none",
            }}
          >
            Rated by our patients
          </Typography>
        </Box>

        <Box
          sx={{
            width: "1px",
            height: 28,
            bgcolor: "divider",
            display: { xs: "none", sm: "block" },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2.5, md: 4 },
          }}
        >
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <Box
              key={label}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Icon sx={{ fontSize: 19, color: "text.secondary" }} />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "text.secondary",
                  fontWeight: 500,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

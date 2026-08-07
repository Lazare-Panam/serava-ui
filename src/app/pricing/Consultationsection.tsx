// src/components/Landing/ConsultationSection.tsx
// One to one consultation section — photo on the left (video-call.jpg),
// copy + price/duration rows + two FAQ accordions + CTA on the right.
// Modelled on the reference layout (specialist-appointment card with a
// circular +/− accordion toggle and a dark pill CTA underneath).
//
// One deliberate departure from the reference: it shows a struck-through
// "RRP £145" next to the real price — a was/now discount claim. Copying
// that would be inventing a discount Serava doesn't actually have, same
// category of problem as every other fabricated-number rule already
// enforced elsewhere in this codebase (Outcomes' stats, ClinicalQuote's
// numbers, the "illustrative figure" chips in PricingSection). Left it
// out entirely rather than making up an RRP — if there's a genuine
// discount to advertise later, add it back with a real number.
//
// The two accordion questions are also reworded to be about Serava's own
// prescribers rather than lifted verbatim from the reference (which named
// a specific competitor's specialists).
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CurrencyPoundRoundedIcon from "@mui/icons-material/CurrencyPoundRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const IMAGE_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/hero/video-call.jpg";

const FAQS = [
  {
    q: "What happens during a consultation?",
    a: "You'll meet your prescriber one to one over video, up to an hour, to talk through your health history, current medications, and what you're hoping to achieve. You'll leave with a personalised treatment recommendation and clear next steps — nothing is decided before you've had that conversation.",
  },
  {
    q: "How are Serava's prescribers different?",
    a: "Every prescriber is independent and UK-registered, and stays involved after that first call — through dosing decisions, monitoring blood tests, and scheduled reviews, rather than a one-off sign-off. The same person isn't guaranteed at every visit, but your records and plan carry over between reviews.",
  },
];

export function ConsultationSection() {
  const [expanded, setExpanded] = useState<number | false>(false);

  return (
    <Box
      component="section"
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 8, md: 12 } }}
    >
      <Box
        sx={{
          borderRadius: 6,
          overflow: "hidden",
          background: "linear-gradient(160deg, #F7EFE4 0%, #EEDFC8 100%)",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" },
          boxShadow: "0 20px 48px rgba(29,36,48,0.14)",
        }}
      >
        {/* Photo */}
        <Box
          sx={{
            minHeight: { xs: 320, md: "100%" },
            backgroundImage: `url(${IMAGE_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Copy */}
        <Box sx={{ p: { xs: 4, sm: 5, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem" },
              lineHeight: 1.15,
              textTransform: "none",
            }}
          >
            Your consultation, one to one
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2.5,
              color: "text.secondary",
              lineHeight: 1.7,
              fontSize: "1.05rem",
              textTransform: "none",
            }}
          >
            Meet with your prescriber to review your health history,
            medications, and goals. You'll leave with a personalised treatment
            recommendation and clear next steps.
          </Typography>

          <Box
            sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1.25 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CurrencyPoundRoundedIcon
                sx={{ fontSize: 20, color: "text.secondary" }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.98rem",
                  textTransform: "none",
                }}
              >
                One-off cost: £149
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeRoundedIcon
                sx={{ fontSize: 20, color: "text.secondary" }}
              />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "0.98rem",
                  color: "text.secondary",
                  textTransform: "none",
                }}
              >
                45 minutes, online
              </Typography>
            </Box>
          </Box>

          {/* Accordions */}
          <Box sx={{ mt: 4 }}>
            {FAQS.map((faq, i) => (
              <Accordion
                key={faq.q}
                disableGutters
                elevation={0}
                square
                expanded={expanded === i}
                onChange={(_, isExpanded) =>
                  setExpanded(isExpanded ? i : false)
                }
                sx={{
                  bgcolor: "transparent",
                  borderTop: "1px solid",
                  borderColor: "rgba(29,36,48,0.12)",
                  "&:last-of-type": {
                    borderBottom: "1px solid",
                    borderColor: "rgba(29,36,48,0.12)",
                  },
                  "&::before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        bgcolor: "rgba(29,36,48,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AddRoundedIcon sx={{ fontSize: 18 }} />
                    </Box>
                  }
                  sx={{
                    px: 0,
                    py: 1,
                    minHeight: "auto",
                    "& .MuiAccordionSummary-content": { my: 1 },
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                      transform: "rotate(45deg)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.98rem",
                      textTransform: "none",
                    }}
                  >
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.92rem",
                      lineHeight: 1.65,
                      textTransform: "none",
                    }}
                  >
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Button
            component={Link}
            href="/eligibility"
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              borderRadius: 999,
              px: 4,
              py: 1.2,
              alignSelf: "flex-start",
              fontWeight: 700,
              fontSize: "0.95rem",
              textTransform: "none",
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
              "&:hover": { bgcolor: "secondary.main", opacity: 0.9 },
            }}
          >
            Check your eligibility →
          </Button>

          <Typography
            sx={{
              mt: 1.5,
              fontSize: "0.82rem",
              color: "text.secondary",
              textTransform: "none",
            }}
          >
            Answer a few questions first to see if this is right for you.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

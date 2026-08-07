// src/components/Landing/MoneyFaqSection.tsx
// "Money questions, answered plainly" — a few pricing/cancellation FAQs,
// each its own white rounded card (not a joined accordion list) with a
// filled teal circular chevron toggle on the right, matching the
// reference. Content ties back to what PricingSection/PricingHero already
// promise (free eligibility check, cancel anytime, fixed programme price)
// so this section doesn't introduce anything inconsistent with them.
//
// Flagging for whoever ships this: these three answers describe actual
// policy (refunds, cancellation terms, price-lock behaviour) — confirm
// the wording against the real cancellations/refunds policy and service
// agreement before this goes live, same "don't ship an unverified claim"
// rule as the illustrative-number placeholders elsewhere.
//
// Also: theme.ts sets text.secondary to the exact same solid inkCharcoal
// as text.primary (no auto-lightening), so body copy below uses
// alpha(text.primary, 0.7) instead of the text.secondary token to
// actually get a softer tone.
"use client";

import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const FAQS = [
  {
    q: "What if I'm not eligible?",
    a: "Then there's nothing to pay. The eligibility check and the medical questionnaire are both free, and we'll explain why, and point you towards more suitable support.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. How cancellation and refunds work is set out in plain English in our cancellations and refunds policy, and in your service agreement before you start. Stopping treatment is always done safely, with your prescriber.",
  },
  {
    q: "Will my price change during the programme?",
    a: "The price you agree in your service agreement is the price for your programme. Anything that could change it is set out in that agreement before you sign.",
  },
];

export function MoneyFaqSection() {
  const [expanded, setExpanded] = useState<number | false>(0);

  return (
    <Box
      component="section"
      sx={{ mx: "auto", maxWidth: 900, px: 3, py: { xs: 8, md: 12 } }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontFamily: "var(--font-manrope), sans-serif",
          fontWeight: 700,
          fontSize: { xs: "1.875rem", sm: "2.25rem" },
          mb: { xs: 5, md: 6 },
          textTransform: "none",
        }}
      >
        Money questions, answered plainly
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {FAQS.map((faq, i) => (
          <Accordion
            key={faq.q}
            disableGutters
            elevation={0}
            square={false}
            expanded={expanded === i}
            onChange={(_, isExpanded) => setExpanded(isExpanded ? i : false)}
            sx={{
              borderRadius: "16px !important",
              overflow: "hidden",
              bgcolor: "background.paper",
              boxShadow: "0 8px 24px rgba(29,36,48,0.08)",
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ExpandMoreRoundedIcon sx={{ fontSize: 20, color: "#FFFFFF" }} />
                </Box>
              }
              sx={{
                px: { xs: 3, sm: 4 },
                py: 1,
                minHeight: "auto",
                "& .MuiAccordionSummary-content": { my: 2 },
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(180deg)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  textTransform: "none",
                }}
              >
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 3, sm: 4 }, pt: 0, pb: 3 }}>
              <Typography
                sx={{
                  color: (t) => alpha(t.palette.text.primary, 0.7),
                  fontSize: "0.98rem",
                  lineHeight: 1.7,
                  textTransform: "none",
                }}
              >
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
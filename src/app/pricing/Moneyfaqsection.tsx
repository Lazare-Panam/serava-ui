// src/components/Landing/MoneyFaqSection.tsx
// "Money questions, answered plainly" — five pricing/cancellation FAQs,
// each its own white rounded card on a warm off-white section background,
// with a filled teal circular chevron toggle on the right, matching the
// reference screenshot. All five start collapsed; only one card ever
// tracks as "expanded" at a time via the single `expanded` index below —
// change to a Set<number> if independent multi-open is ever wanted.
//
// Flagging for whoever ships this: these answers describe actual policy
// (refunds, cancellation terms, price-lock behaviour, medication billing).
// Confirm the wording against the real cancellations/refunds policy and
// service agreement before this goes live — same "don't ship an
// unverified claim" rule as the illustrative-number placeholders
// elsewhere in the pricing section.
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
    q: "Why is medication priced separately from the programme fee?",
    a: "So the cost stays transparent, and so a change in medication pricing never quietly changes what you pay for your care. Medication is billed at cost, and your prescriber confirms the figure with you before you pay anything for it.",
  },
  {
    q: "Will my medication cost change over time?",
    a: "It can, if your prescriber increases your dose as part of your treatment. You'll always be told the exact figure before it applies, so there's never a surprise on your bill.",
  },
  {
    q: "What if I am not eligible?",
    a: "Then there is nothing to pay. The eligibility check and the medical questionnaire are free, and we will tell you why, and point you towards more suitable support.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Billing is monthly throughout, with no prepaid blocks, so there's nothing to lose by stopping. You simply won't be charged again the following month. Coming off treatment is always done safely, with your prescriber, and our cancellations and refunds policy sets out the full detail in plain English.",
  },
  {
    q: "Will my price change during the programme?",
    a: "The price you agree in your service agreement is the price for your programme. Anything that could change it is set out in that agreement before you sign.",
  },
];

export function MoneyFaqSection() {
  // false = nothing open. Cards render fully collapsed on first paint —
  // no default index here, unlike the earlier draft that opened index 0.
  const [expanded, setExpanded] = useState<number | false>(false);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#EDE9DE",
        px: 3,
        py: { xs: 8, md: 10 },
      }}
    >
      <Box sx={{ mx: "auto", maxWidth: 900 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.6rem", sm: "1.9rem" },
            color: "secondary.main",
            mb: { xs: 4, md: 5 },
            textTransform: "none",
          }}
        >
          Money questions, answered plainly
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                boxShadow: "0 6px 18px rgba(29,36,48,0.08)",
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ExpandMoreRoundedIcon
                      sx={{ fontSize: 18, color: "#FFFFFF" }}
                    />
                  </Box>
                }
                sx={{
                  px: { xs: 3, sm: 4 },
                  py: 0.5,
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
                    fontSize: "0.98rem",
                    color: "secondary.main",
                    textTransform: "none",
                  }}
                >
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 3, sm: 4 }, pt: 0, pb: 3 }}>
                <Typography
                  sx={{
                    color: (theme: any) =>
                      alpha(theme.palette.text.primary, 0.72),
                    fontSize: "0.92rem",
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
    </Box>
  );
}

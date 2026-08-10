// src/components/Landing/MoneyFaqSection.tsx
// "Money questions, answered plainly" — five pricing/cancellation FAQs,
// each its own white rounded card on a warm off-white section background,
// with a filled teal circular chevron toggle on the right, matching the
// reference screenshot.
//
// Behaviour: every card opens/closes independently — tracked as a Set of
// open question keys rather than a single `expanded` index, so opening
// one no longer closes another that was already open. All start closed.
//
// Polish pass: MUI's default Accordion Collapse transition uses the
// theme's generic duration/easing, which reads as a slightly mechanical
// snap on a card this size. Transitions below are tuned explicitly
// (320ms, a custom cubic-bezier with a little overshoot-free ease-out)
// so open/close feels closer to a soft reveal than a toggle. Each card
// also gets a hover lift, a subtle ring when open, and a background tint
// on its icon button on hover — small things, but they're what makes a
// static-feeling accordion read as "designed" rather than default MUI.
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
    key: "medication-separate",
    q: "Why is medication priced separately from the programme fee?",
    a: "So the cost stays transparent, and so a change in medication pricing never quietly changes what you pay for your care. Medication is billed at cost, and your prescriber confirms the figure with you before you pay anything for it.",
  },
  {
    key: "medication-change",
    q: "Will my medication cost change over time?",
    a: "It can, if your prescriber increases your dose as part of your treatment. You'll always be told the exact figure before it applies, so there's never a surprise on your bill.",
  },
  {
    key: "not-eligible",
    q: "What if I am not eligible?",
    a: "Then there is nothing to pay. The eligibility check and the medical questionnaire are free, and we will tell you why, and point you towards more suitable support.",
  },
  {
    key: "cancel",
    q: "Can I cancel?",
    a: "Yes. Billing is monthly throughout, with no prepaid blocks, so there's nothing to lose by stopping. You simply won't be charged again the following month. Coming off treatment is always done safely, with your prescriber, and our cancellations and refunds policy sets out the full detail in plain English.",
  },
  {
    key: "price-change",
    q: "Will my price change during the programme?",
    a: "The price you agree in your service agreement is the price for your programme. Anything that could change it is set out in that agreement before you sign.",
  },
];

// Explicit, slightly-longer-than-default easing so expand/collapse reads
// as a soft reveal rather than a mechanical snap. Kept as a shared
// constant so every Accordion instance below animates identically.
const TRANSITION = "320ms cubic-bezier(0.4, 0.0, 0.2, 1)";

export function MoneyFaqSection() {
  // Independent open state per card — a Set of keys, not a single index,
  // so opening one card never forces another closed. Starts empty: every
  // card renders collapsed on first paint.
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}>
          {FAQS.map((faq) => {
            const isOpen = openKeys.has(faq.key);
            return (
              <Accordion
                key={faq.key}
                disableGutters
                elevation={0}
                square={false}
                expanded={isOpen}
                onChange={() => toggle(faq.key)}
                slotProps={{ transition: { timeout: 320 } }}
                sx={{
                  borderRadius: "16px !important",
                  overflow: "hidden",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: isOpen ? alpha("#1F6E5C", 0.28) : "transparent",
                  boxShadow: isOpen
                    ? "0 10px 28px rgba(29,36,48,0.14)"
                    : "0 6px 16px rgba(29,36,48,0.07)",
                  transition: `box-shadow ${TRANSITION}, border-color ${TRANSITION}, transform ${TRANSITION}`,
                  "&::before": { display: "none" },
                  "&:hover": {
                    boxShadow: "0 10px 26px rgba(29,36,48,0.12)",
                    transform: "translateY(-1px)",
                  },
                  // MUI's default Collapse transitions height with a
                  // built-in curve; overriding it here keeps content
                  // fade + height changing on the same easing/timing as
                  // everything else in this card, instead of feeling
                  // like two unrelated animations firing together.
                  "& .MuiCollapse-root": {
                    transition: `height ${TRANSITION} !important`,
                  },
                  "& .MuiCollapse-wrapperInner": {
                    transition: `opacity ${TRANSITION}`,
                    opacity: isOpen ? 1 : 0,
                  },
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
                        transition: `background-color ${TRANSITION}, transform ${TRANSITION}`,
                        "&:hover": {
                          bgcolor: (theme: any) =>
                            alpha(theme.palette.primary.main, 0.85),
                        },
                      }}
                    >
                      <ExpandMoreRoundedIcon
                        sx={{
                          fontSize: 18,
                          color: "#FFFFFF",
                          transition: `transform ${TRANSITION}`,
                        }}
                      />
                    </Box>
                  }
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: 0.5,
                    minHeight: "auto",
                    "& .MuiAccordionSummary-content": { my: 2 },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      transition: `transform ${TRANSITION}`,
                    },
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
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

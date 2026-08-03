// src/components/HonestySection.tsx
// Exclusion criteria and emergency disclaimer. The emergency callout uses
// Status Red — the most severe signal in the traffic-light system — since
// "call 999 if unwell" is genuinely urgent, not just cautionary advice.
"use client";

import { Box, Typography, Stack } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

const EXCLUSIONS = [
  "You must be 18 or over.",
  "It is not suitable during pregnancy, breastfeeding, or while trying to conceive.",
  "Some medical conditions and histories mean we cannot treat you safely; our eligibility check screens for these, and we will always tell you why.",
  "Completing a form never guarantees a prescription. Your prescriber decides, with you.",
];

export function HonestySection() {
  return (
    <Box
      component="section"
      sx={{ mx: "auto", maxWidth: 1600, px: 3, py: { xs: 8, md: 12 } }}
    >
      <Box
        sx={{
          borderRadius: 6,
          bgcolor: "muted.main",
          p: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
            maxWidth: 1300,
            mx: "auto",
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                letterSpacing: "0.2em",
                fontWeight: 600,
              }}
            >
              Honesty first
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 600,
                fontSize: { xs: "2.25rem", sm: "2.75rem" },
                mt: 1,
              }}
            >
              Who this service is not for
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, fontSize: "1.25rem", lineHeight: 1.7 }}
            >
              Trust starts with being clear about limits. This programme is not
              right for everyone, and we screen carefully.
            </Typography>

            <Stack spacing={2} sx={{ mt: 5 }}>
              {EXCLUSIONS.map((item) => (
                <Stack
                  key={item}
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: "flex-start",
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    p: 2.5,
                  }}
                >
                  <CheckOutlinedIcon
                    sx={{
                      color: "primary.main",
                      mt: "2px",
                      flexShrink: 0,
                      fontSize: 26,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}
                  >
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Visual anchor: a large safety-badge icon in a soft circle,
              giving this section the same "visual half" every other
              section on the page has (photo, chart, card grid). */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              height: 340,
              width: 340,
              mx: "auto",
              borderRadius: "50%",
              bgcolor: "background.paper",
            }}
          >
            <VerifiedUserOutlinedIcon
              sx={{ fontSize: 140, color: "secondary.main", opacity: 0.85 }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            maxWidth: 1300,
            mx: "auto",
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "status.red",
            bgcolor: "background.paper",
            p: { xs: 3, md: 4 },
          }}
        >
          <LocalHospitalOutlinedIcon
            sx={{ color: "status.red", mt: "4px", flexShrink: 0, fontSize: 28 }}
          />
          <Typography sx={{ fontSize: "1.15rem", lineHeight: 1.6 }}>
            <Box component="span" sx={{ fontWeight: 700 }}>
              If you are unwell now, call 999, or NHS 111 for urgent advice.
            </Box>{" "}
            Serava is not an emergency service.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

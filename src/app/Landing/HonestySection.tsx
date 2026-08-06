"use client";

import { Box, Typography, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

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
          position: "relative",
          overflow: "hidden",
          borderRadius: 6,
          backgroundImage:
            "url(https://pblol2.blob.core.windows.net/serava-ui/hero/s-img-5.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          p: { xs: 4, md: 8 },
        }}
      >
        {/* Scrim: everything in this section — heading, body, the
            exclusion list, the emergency notice, the icons — now sits
            directly on the photo with no white card surfaces underneath,
            so this scrim is the only thing keeping any of it legible.
            Heavier on the left where the copy is, fading out toward the
            visual anchor on the right. */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg, rgba(29,36,48,0.78) 0%, rgba(29,36,48,0.6) 45%, rgba(29,36,48,0.25) 80%)",
          }}
        />

        <Box sx={{ position: "relative" }}>
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
              {/* textTransform is explicit ("none"/"uppercase") on every
                  Typography below rather than left to inherit: the theme's
                  MuiTypography root override forces textTransform:
                  "capitalize" globally, which title-cases every word of
                  ordinary sentences ("You Must Be 18 Or Over.") — fine for
                  a short heading, but it reads as broken for body copy and
                  list text. Overriding it locally per-element is the
                  surgical fix; the real long-term fix is removing that
                  root override from theme.ts (or scoping it to just
                  buttons/labels) since it's quietly doing this to every
                  paragraph on the site, not only this section. */}
            
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: "2.25rem", sm: "2.75rem" },
                  mt: 5,
                  color: "background.paper",
                  textTransform: "none",
                }}
              >
                Who this service is not for
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: (t) => alpha(t.palette.background.paper, 0.88),
                  textTransform: "none",
                }}
              >
                Trust starts with being clear about limits. This programme is
                not right for everyone, and we screen carefully.
              </Typography>

              <Stack sx={{ mt: 5, mb: -5 }}>
                {EXCLUSIONS.map((item, i) => (
                  <Stack
                    key={item}
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: "flex-start",
                      py: 2.5,
                      borderTop: i === 0 ? "none" : "1px solid",
                      borderColor: (t) =>
                        alpha(t.palette.background.paper, 0.22),
                    }}
                  >
                    <CheckRoundedIcon
                      sx={{
                        color: "background.paper",
                        flexShrink: 0,
                        fontSize: 24,
                        mt: "2px",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.1rem",
                        lineHeight: 1.6,
                        color: "background.paper",
                        textTransform: "none",
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                height: 340,
                width: 340,
                mx: "auto",
              }}
            >
              <VerifiedUserRoundedIcon
                sx={{ fontSize: 180, color: "background.paper" }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              maxWidth: 1300,
              mx: "auto",
              display: "flex",
              gap: 2.5,
              alignItems: "center",
              borderRadius: 3,
              border: "1px solid",
              borderColor: (t) => alpha(t.palette.background.paper, 0.35),
              p: { xs: 3, md: 4 },
            }}
          >
            <LocalHospitalRoundedIcon
              sx={{ color: "background.paper", flexShrink: 0, fontSize: 26 }}
            />
            <Typography
              sx={{
                fontSize: "1.15rem",
                lineHeight: 1.6,
                color: "background.paper",
                textTransform: "none",
              }}
            >
              <Box component="span" sx={{ fontWeight: 700 }}>
                If you are unwell now, call 999, or NHS 111 for urgent advice.
              </Box>{" "}
              Serava is not an emergency service.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

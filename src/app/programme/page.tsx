// src/app/how-it-works/page.tsx
// "How it works" page — port of the approved static mockup (seravahowitworksv22.html)
// onto the app's existing MUI theme (src/app/theme.ts) rather than the mockup's own
// inline CSS variables. Colors below are pulled from theme tokens wherever the
// mockup's --teal/--viridian/--mist/--iris map onto them; see the NOTE below for the
// two mockup colors (butter, and the ok/warn/stop status trio) that don't yet exist
// as theme tokens.
//
// NOTE — palette gaps vs. the mockup:
// - The mockup's "phases bar" uses a third color, --butter (#F8E08E / deep #8A6D1A),
//   for the "Month 1" phase. theme.ts has no butter/amber token, so this file defines
//   it locally (BUTTER / BUTTER_DEEP consts below) rather than inventing a fake theme
//   key. If this becomes a recurring brand color, it should be promoted into theme.ts
//   the same way `accentBrand`/`muted` were.
// - The mockup also defines --ok/--warn/--stop, close to theme.ts's
//   success/warning/error, but unused on this particular page — not reproduced here.
//
// Content note: bracketed placeholders from the source mockup ("£[x] consultation
// fee", "[Company] Ltd", "No. [x]", GPhC numbers, CQC/ICO placeholders) are carried
// over verbatim as placeholder copy — same "designs, not promises" caveat as the
// original. Don't ship this without replacing them with confirmed legal/clinical text.

import { Box, Typography, Stack } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { JourneyTimeline } from "./Journeytimeline";

// Local placeholder color — see NOTE above. Not a theme token (yet).
const BUTTER = "#F8E08E";
const BUTTER_DEEP = "#8A6D1A";

const CHIPS = [
  { icon: AccessTimeRoundedIcon, label: "Designed around nine months" },
  { icon: ShieldRoundedIcon, label: "Prescriber-led at every step" },
  { icon: CheckCircleRoundedIcon, label: "Free to check, no obligation" },
];

const PHASES = [
  {
    key: "p1",
    flex: 1.4,
    label: "Month 1",
    sub: "Begin and evaluate",
    bg: `linear-gradient(135deg, #FCF0BE 0%, ${BUTTER} 100%)`,
    color: BUTTER_DEEP,
  },
  {
    key: "p2",
    flex: 5,
    label: "Months 2 to 7",
    sub: "Treatment, if suitable and stable",
    bg: "linear-gradient(135deg, #33C2B4 0%, #2AB3A6 55%, #1F8A80 100%)",
    color: "#FFFFFF",
  },
  {
    key: "p3",
    flex: 2.2,
    label: "Months 8 to 9",
    sub: "Titrate down and maintain",
    bg: "linear-gradient(135deg, #2F5D50 0%, #1F4238 100%)",
    color: "#F6FAF9",
  },
];

export default function HowItWorksPage() {
  return (
    <Box component="main">
      {/* ---------------- Page hero ---------------- */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 8, md: 11 },
          pb: { xs: 7, md: 8 },
          background: "linear-gradient(180deg, #F6FAF9 0%, #F1F8F6 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -200,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(42,179,166,0.14) 0%, rgba(42,179,166,0) 70%)",
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -160,
            left: -160,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BUTTER}38 0%, ${BUTTER}00 70%)`,
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ position: "relative", maxWidth: 1100, mx: "auto", px: 3.5 }}>
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "primary.dark",
              mb: 2,
              "&::before": {
                content: '""',
                width: 22,
                height: "1.5px",
                bgcolor: "primary.main",
                borderRadius: "2px",
              },
            }}
          >
            How it works
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.2rem", md: "3.3rem" },
              fontWeight: 800,
              lineHeight: 1.16,
              letterSpacing: "-0.02em",
              color: "secondary.main",
            }}
          >
            From your first check to lasting maintenance
          </Typography>

          <Typography
            sx={{
              fontSize: "1.14rem",
              mt: 2.25,
              color: "text.secondary",
              maxWidth: "60ch",
              lineHeight: 1.7,
            }}
          >
            One supervised journey, with a clear shape and a planned CHIPS.mapending.
            Here&apos;s every step: what&apos;s involved, and what it costs
            along the way.
          </Typography>

         
        </Box>
      </Box>

      {/* ---------------- Journey timeline ---------------- */}
      <Box component="section" sx={{ py: { xs: 9, md: 12.5 } }}>
        <Box sx={{ maxWidth: 1100, mx: "auto", px: 3.5 }}>
          <JourneyTimeline />
        </Box>
      </Box>

      {/* ---------------- Programme shape / phases bar ---------------- */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          py: { xs: 9, md: 12.5 },
        }}
      >
        <Box sx={{ maxWidth: 1100, mx: "auto", px: 3.5 }}>
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "primary.dark",
              mb: 2,
              "&::before": {
                content: '""',
                width: 22,
                height: "1.5px",
                bgcolor: "primary.main",
                borderRadius: "2px",
              },
            }}
          >
            The shape of the programme
          </Typography>
          <Typography variant="h2" sx={{ color: "secondary.main", mb: 1.5 }}>
            Nine months, designed to end well
          </Typography>
          <Typography sx={{ maxWidth: "64ch", color: "text.primary" }}>
            Most services are designed to be open-ended. Ours isn&apos;t. The
            ending is planned from day one.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.25}
            sx={{
              mt: 5.5,
              fontWeight: 600,
              fontSize: "0.88rem",
              textAlign: "center",
            }}
          >
            {PHASES.map((phase) => (
              <Box
                key={phase.key}
                sx={{
                  flex: { sm: phase.flex },
                  borderRadius: "14px",
                  px: 1.75,
                  py: 2.75,
                  background: phase.bg,
                  color: phase.color,
                  boxShadow:
                    "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10)",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: "inherit",
                  }}
                >
                  {phase.label}
                </Typography>
                <Typography
                  component="small"
                  sx={{
                    display: "block",
                    fontWeight: 400,
                    fontSize: "0.76rem",
                    mt: 0.6,
                    opacity: 0.9,
                    color: "inherit",
                  }}
                >
                  {phase.sub}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Typography
            sx={{ color: "text.secondary", fontSize: "0.92rem", mt: 2.25 }}
          >
            Your prescriber may adjust this shape around you. Timings are a
            design, not a promise.
          </Typography>
        </Box>
      </Box>

      {/* ---------------- CTA band ---------------- */}
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          py: { xs: 8, md: 12.5 },
          background: "linear-gradient(160deg, #2F5D50 0%, #234840 100%)",
          color: "#F6FAF9",
          "&::before": {
            content: '""',
            position: "absolute",
            bottom: -180,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BUTTER}24 0%, ${BUTTER}00 70%)`,
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ position: "relative", maxWidth: 1100, mx: "auto", px: 3.5 }}>
          <Typography variant="h2" sx={{ color: "#FFFFFF" }}>
            Step one takes five minutes
          </Typography>
          <Typography
            sx={{
              margin: "14px auto 32px",
              color: "#BFD8D2",
              maxWidth: "64ch",
            }}
          >
            Free, with no obligation, and if we&apos;re not the right service
            for you, we&apos;ll tell you honestly.
          </Typography>
          <Box
            component="a"
            href="#"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              fontWeight: 600,
              fontSize: "1rem",
              px: 3.5,
              py: 1.9,
              borderRadius: 999,
              textDecoration: "none",
              color: "primary.contrastText",
              background:
                "linear-gradient(135deg, #33C2B4 0%, #2AB3A6 55%, #1F8A80 100%)",
              boxShadow:
                "0 1px 2px rgba(42,84,73,0.05), 0 6px 16px -8px rgba(42,84,73,0.10), 0 10px 24px -10px rgba(31,138,128,0.55)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow:
                  "0 2px 6px rgba(42,84,73,0.05), 0 20px 44px -20px rgba(42,84,73,0.20), 0 16px 32px -12px rgba(31,138,128,0.6)",
              },
            }}
          >
            Check your eligibility
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

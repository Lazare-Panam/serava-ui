// src/components/ClinicalQuote.tsx
// Bold two-line statement, a photo, and a quote card on a dark panel —
// same visual device as the reference. The quote text and attribution
// below are PLACEHOLDERS: never invent a quote for a real, named person.
// Swap in the actual quote and the actual person's name/title before ship.
"use client";

import { Box, Typography, Paper } from "@mui/material";

export function ClinicalQuote() {
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
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          p: { xs: 4, md: 8 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "2.75rem" },
            lineHeight: 1.2,
            mb: { xs: 5, md: 7 },
            maxWidth: 820,
            mx: "auto",
            textAlign: "center",
          }}
        >
          When your plan is rooted in{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            evidence and built around you
          </Box>
          , it works.
        </Typography>

        <Box
          sx={{
            maxWidth: 1300,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
            gap: { xs: 3, md: 6 },
            alignItems: "stretch",
          }}
        >
          {/* Photo placeholder — swap for a real, consented photo of the
              actual quoted person. No stock or stand-in photography used
              under a real person's name. */}
          <Box
            sx={{
              minHeight: { xs: 220, md: 360 },
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Photo of quoted person
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              component="blockquote"
              sx={{
                fontSize: { xs: "1.15rem", md: "1.4rem" },
                lineHeight: 1.6,
                m: 0,
                mb: 4,
                fontWeight: 400,
              }}
            >
              “[Placeholder quote — replace with a real statement, given
              knowingly by the named person below, about evidence-based care and
              programmes built around the individual.]”
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
              [Full name — placeholder]
            </Typography>
            <Typography sx={{ fontSize: "0.95rem", opacity: 0.75 }}>
              [Role/title — placeholder]
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

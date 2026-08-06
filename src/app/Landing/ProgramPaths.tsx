// src/components/ProgrammePaths.tsx
// Two-path section: one card for people starting fresh, one for people
// already on a GLP-1 medication. Icons stand in for imagery — no injection
// pens, needles, or medication devices, per the photography compliance rule.
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";

export function ProgrammePaths() {
  return (
    <Box component="section" sx={{ mx: "auto", maxWidth: 1600, px: 3, py: 10 }}>
      <Box
        sx={{
          borderRadius: 6,
          bgcolor: "#F9E8B0", // buttery yellow, was muted.main (grey)
          px: { xs: 3, sm: 6 },
          py: { xs: 8, md: 10 },
        }}
      >
        <Box sx={{ mx: "auto", maxWidth: 640, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.875rem" },
              fontWeight: 600,
            }}
          >
            Built for wherever you're starting from.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, fontSize: "1.125rem", lineHeight: 1.7 }}
          >
            Your programme adapts to you — whether this is a first step, or
            you're already partway through treatment.
          </Typography>
        </Box>

        <Box
          sx={{
            mx: "auto",
            mt: 6,
            maxWidth: 1300,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {/* Path 1: starting fresh */}
          <Card
            variant="outlined"
            sx={{
              position: "relative",
              minHeight: 340,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
              borderColor: "transparent",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 3,
                pt: 3,
                pb: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                position: "relative",
                zIndex: 1,
              }}
            >
              <AssignmentOutlinedIcon
                sx={{ fontSize: 32, color: "primary.main" }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 600,
                }}
              >
                Start your programme
              </Typography>
            </Box>

            <CardContent
              sx={{
                position: "relative",
                zIndex: 1,
                pr: { xs: 2, sm: "42%" },
                pt: 2,
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.7, fontSize: "1.125rem" }}
              >
                A prescriber-led plan built around your goals, with clear
                guidance and support at every step. Where medication is part of
                your plan, it's dosed and adjusted by your prescriber —
                alongside regular check-ins and the ongoing support to help you
                stay on track.
              </Typography>
            </CardContent>

            {/* fade so the image reads as tucked into the card, not escaping it */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: 64,
                bottom: 0,
                width: "55%",
                zIndex: 0,
                background: (theme) =>
                  `linear-gradient(to right, ${theme.palette.background.paper} 0%, transparent 35%)`,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                right: -8,
                bottom: 8,
                zIndex: 0,
                height: 260,
                width: 280,
                transform: "rotate(1deg)",
              }}
            >
              <Image
                src="https://pblol2.blob.core.windows.net/serava-ui/hero/Serava_Collagen_Transparent.png"
                alt="Serava collagen product"
                fill
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 16px 20px rgba(0,0,0,0.25))",
                }}
                sizes="280px"
              />
            </Box>

            <CardActions
              sx={{
                position: "relative",
                zIndex: 1,
                mt: "auto",
                px: 2,
                py: 2,
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                href="/eligibility"
                variant="contained"
                size="large"
                sx={{ borderRadius: 999, px: 3, color: "#fff" }}
              >
                Check your eligibility
              </Button>
              <Button
                component={Link}
                href="/guide"
                variant="outlined"
                size="large"
                sx={{ borderRadius: 999, px: 3 }}
              >
                Learn more
              </Button>
            </CardActions>
          </Card>

          {/* Path 2: already on a GLP-1 medication */}
          <Card
            variant="outlined"
            sx={{
              position: "relative",
              minHeight: 340,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderColor: "transparent",
              boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 3,
                pt: 3,
                pb: 2,
                borderBottom: "1px solid",
                borderColor: "rgba(255,255,255,0.2)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <MonitorHeartOutlinedIcon sx={{ fontSize: 32, color: "#fff" }} />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Already taking a GLP-1 medication?
              </Typography>
            </Box>

            <CardContent
              sx={{
                position: "relative",
                zIndex: 1,
                pr: { xs: 2, sm: "42%" },
                pt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.7,
                  color: "#fff",
                  opacity: 0.85,
                  fontSize: "1.125rem",
                }}
              >
                Get tailored nutrition guidance, habit support, and structured
                reviews alongside your prescription — on a fixed rhythm, to help
                you stay consistent.
              </Typography>
            </CardContent>

            {/* fade so the image reads as tucked into the card, not escaping it */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: 64,
                bottom: 0,
                width: "55%",
                zIndex: 0,
                background: (theme) =>
                  `linear-gradient(to right, ${theme.palette.primary.main} 0%, transparent 35%)`,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                right: 16,
                bottom: 20,
                zIndex: 0,
                height: 240,
                width: 260,
                transform: "rotate(1deg)",
              }}
            >
              <Image
                src="https://pblol2.blob.core.windows.net/serava-ui/hero/Serava_Pill_Box_Transparent.png"
                alt="Serava pill organizer"
                fill
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 16px 20px rgba(0,0,0,0.3))",
                }}
                sizes="260px"
              />
            </Box>

            <CardActions
              sx={{
                position: "relative",
                zIndex: 1,
                mt: "auto",
                px: 2,
                py: 2,
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                href="/companion"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 3,
                  bgcolor: "secondary.main",
                  color: "secondary.contrastText",
                  "&:hover": { bgcolor: "secondary.dark" },
                }}
              >
                Join now
              </Button>
              <Button
                component={Link}
                href="/companion/learn-more"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 3,
                  borderWidth: 2,
                  borderColor: "#fff",
                  color: "#fff",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Learn more
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

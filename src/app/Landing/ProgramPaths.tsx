// src/components/ProgrammePaths.tsx
// Two-path section: one card for people starting fresh, one for people
// already on a GLP-1 medication. Icons stand in for imagery — no injection
// pens, needles, or medication devices, per the photography compliance rule.
"use client";

import Link from "next/link";
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
          bgcolor: "muted.main",
          px: { xs: 3, sm: 6 },
          py: { xs: 8, md: 10 },
        }}
      >
        <Box sx={{ mx: "auto", maxWidth: 640, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.875rem", sm: "2.25rem" },
              fontWeight: 600,
            }}
          >
            Built around you, on medication or not.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, fontSize: "1.125rem", lineHeight: 1.7 }}
          >
            Your programme adapts to where you are today, whether you are
            starting fresh or already taking a GLP-1 medication.
          </Typography>
        </Box>

        <Box
          sx={{
            mx: "auto",
            mt: 6,
            maxWidth: 1400,
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
            }}
          >
            <CardContent
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <AssignmentOutlinedIcon
                sx={{ fontSize: 36, color: "primary.main" }}
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
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: "70%", lineHeight: 1.7 }}
              >
                A prescriber-led plan built around your goals, with coaching and
                clear guidance at every step.
              </Typography>
            </CardContent>

            {/* Image slot: swap for a real product/app screenshot once
                ready. Sits behind the text (zIndex 0) so it never covers it. */}
            <Box
              sx={{
                position: "absolute",
                right: -16,
                top: "50%",
                zIndex: 0,
                height: 256,
                width: 288,
                transform: "translateY(-50%) rotate(3deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "action.hover",
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                App or product image
              </Typography>
            </Box>

            <CardActions
              sx={{
                position: "relative",
                zIndex: 1,
                mt: "auto",
                borderTop: "1px solid",
                borderColor: "divider",
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
                sx={{ borderRadius: 999, px: 3 }}
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
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
              borderColor: "secondary.main",
            }}
          >
            <CardContent
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <MonitorHeartOutlinedIcon
                sx={{ fontSize: 36, color: "secondary.contrastText" }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 600,
                  color: "secondary.contrastText",
                }}
              >
                Already taking a GLP-1 medication?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "70%",
                  lineHeight: 1.7,
                  color: "secondary.contrastText",
                  opacity: 0.85,
                }}
              >
                Get tailored nutrition guidance, habit support, and ongoing
                coaching alongside your prescription.
              </Typography>
            </CardContent>

            {/* Image slot: keep this to an icon, illustration, or lifestyle
                photo, never an injection pen, needle, or medication device,
                per the photography compliance rule. Sits behind the text
                (zIndex 0) so it never covers it. */}
            <Box
              sx={{
                position: "absolute",
                right: -16,
                top: "50%",
                zIndex: 0,
                height: 256,
                width: 288,
                transform: "translateY(-50%) rotate(3deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "rgba(255,255,255,0.3)",
                bgcolor: "rgba(255,255,255,0.1)",
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "secondary.contrastText", opacity: 0.7 }}
              >
                Lifestyle image, no medication devices
              </Typography>
            </Box>

            <CardActions
              sx={{
                position: "relative",
                zIndex: 1,
                mt: "auto",
                borderTop: "1px solid",
                borderColor: "rgba(255,255,255,0.2)",
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
                sx={{ borderRadius: 999, px: 3 }}
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
                  borderColor: "secondary.contrastText",
                  color: "secondary.contrastText",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "secondary.contrastText",
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

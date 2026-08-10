// src/components/Footer.tsx
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";

const LOGO_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/hero/sereva.logo.jpeg";

// Mirrors the primary nav in Navbar.tsx — keep these two lists in sync
// if the site's information architecture changes.
const EXPLORE_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "The programme", href: "/programme" },
  { label: "The Library", href: "/library" },
  { label: "Pricing", href: "/pricing" },
];

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

// Placeholder hrefs — swap in real profile URLs once they exist.
const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "X", href: "#", icon: XIcon },
];

type SubmitState = "idle" | "loading" | "success" | "error";

// Footer sits on the teal primary background. All text below is plain
// white (primary.contrastText is charcoal, tuned for teal buttons, not
// for this — so we hardcode "#FFFFFF" here instead of that token).
const FOOTER_TEXT = "#FFFFFF";

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <Stack spacing={1.75}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          color: FOOTER_TEXT,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: "0.78rem",
        }}
      >
        {title}
      </Typography>
      <Stack spacing={1.25} component="nav">
        {links.map((link) => (
          <Box
            key={link.href}
            component={Link}
            href={link.href}
            sx={{
              fontSize: "0.92rem",
              color: FOOTER_TEXT,
              textDecoration: "none",
              width: "fit-content",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {link.label}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");

  // Stubbed for now — no backend wired up yet. Replace this handler with
  // a real submission (API route / ESP call) when the endpoint exists.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      // TODO: replace with real submission, e.g.:
      // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Stack spacing={1.75} sx={{ maxWidth: 360, width: "100%" }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          color: FOOTER_TEXT,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: "0.78rem",
        }}
      >
        Stay in the loop
      </Typography>
      <Typography variant="body2" sx={{ color: FOOTER_TEXT }}>
        Occasional updates on the programme, new library content, and research
        we think is worth sharing. No spam.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
      >
        <TextField
          type="email"
          required
          size="small"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          aria-label="Email address"
          sx={{
            flex: "1 1 200px",
            // White field on teal reads much better than the default
            // outline, which nearly disappears against a colored bg.
            bgcolor: "background.paper",
            borderRadius: 999,
            "& .MuiOutlinedInput-root": {
              borderRadius: 999,
              "& fieldset": { border: "none" },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={status === "loading"}
          sx={{
            borderRadius: 999,
            px: 3,
            fontWeight: 700,
            // Solid white button so it doesn't vanish into the teal
            // background — same idea as the Hero's outlined button on video.
            bgcolor: "background.paper",
            color: "primary.main",
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: (t) => alpha(t.palette.background.paper, 0.85),
            },
          }}
        >
          {status === "loading" ? "Joining…" : "Subscribe"}
        </Button>
      </Box>

      {status === "success" && (
        <Typography variant="caption" sx={{ color: FOOTER_TEXT, fontWeight: 600 }}>
          You&apos;re on the list — thanks for signing up.
        </Typography>
      )}
      {status === "error" && (
        <Typography variant="caption" sx={{ color: "#FFD9D4", fontWeight: 600 }}>
          Something went wrong. Please try again.
        </Typography>
      )}
    </Stack>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        borderTop: "1px solid",
        borderColor: (t) => alpha(t.palette.primary.contrastText, 0.15),
      }}
    >
      <Container
        maxWidth={false}
        sx={{ maxWidth: 1600, px: 3, py: { xs: 6, md: 8 } }}
      >
        <Grid container spacing={{ xs: 5, md: 4 }}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2} sx={{ maxWidth: 320 }}>
              <Box
                component={Link}
                href="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  lineHeight: 0,
                  width: "fit-content",
                }}
              >
                {/* <Image
                  src={LOGO_URL}
                  alt="Serava Health"
                  width={280}
                  height={770}
                  style={{
                    height: 64,
                    width: "auto",
                    // Forces the logo artwork to render pure white,
                    // regardless of its original color: brightness(0)
                    // flattens all opaque pixels to black, invert(1)
                    // then flips that black to white. Needs the source
                    // logo to have a transparent background — if it has
                    // a solid white box baked into the JPEG, that box
                    // will just stay white-on-white, which is fine here.
                   
                  }}
                /> */}
              </Box>
              <Typography variant="body2" sx={{ color: FOOTER_TEXT }}>
                Evidence-based support for the people navigating perimenopause
                and menopause, built around you.
              </Typography>

              {/* Social icons — placeholder hrefs until real profiles exist */}
              <Stack direction="row" spacing={1}>
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <IconButton
                    key={label}
                    component={Link}
                    href={href}
                    aria-label={label}
                    size="small"
                    sx={{
                      color: FOOTER_TEXT,
                      border: "1px solid",
                      borderColor: alpha(FOOTER_TEXT, 0.4),
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: "background.paper",
                        borderColor: "background.paper",
                      },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Link columns */}
          <Grid size={{ xs: 6, md: 2 }}>
            <FooterLinkColumn title="Explore" links={EXPLORE_LINKS} />
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <FooterLinkColumn title="Legal" links={LEGAL_LINKS} />
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 2 }} sx={{ display: "flex" }}>
            <NewsletterForm />
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: { xs: 4, md: 5 },
            borderColor: alpha(FOOTER_TEXT, 0.15),
          }}
        />

        {/* Bottom bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" sx={{ color: FOOTER_TEXT }}>
            © {year} Serava Health. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {LEGAL_LINKS.map((link) => (
              <Box
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  fontSize: "0.8rem",
                  color: FOOTER_TEXT,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {link.label}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
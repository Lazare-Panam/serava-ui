// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Stack,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const LOGO_URL =
  "https://pblol2.blob.core.windows.net/serava-ui/hero/sereva.logo.jpeg";

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "The programme", href: "/programme" },
  { label: "The Library", href: "/library" },
  { label: "Pricing", href: "/pricing" },
  { label: "About us", href: "/about" },
  { label: "FAQs", href: "/faqs" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
        bgcolor: "#fff",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: 1600,
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        {/* Logo — flex-shrink: 0 so it never gets squeezed by the nav
            links on medium-width viewports before the mobile breakpoint
            kicks in and hides them entirely. */}
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            lineHeight: 0,
          }}
        >
          <Image
            src={LOGO_URL}
            alt="Serava Health"
            width={280}
            height={770}
            priority
            style={{ height: 66, width: "auto" }}
          />
        </Box>

        {/* Desktop nav links */}
        <Stack
          direction="row"
          spacing={4}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              sx={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "text.primary",
                textDecoration: "none",
                whiteSpace: "nowrap",
                "&:hover": { color: "primary.main" },
              }}
            >
              {link.label}
            </Box>
          ))}
        </Stack>

        {/* Desktop right-hand actions */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Box
            component={Link}
            href="/sign-in"
            sx={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "text.primary",
              textDecoration: "none",
              whiteSpace: "nowrap",
              "&:hover": { color: "primary.main" },
            }}
          >
            Sign in
          </Box>
          <Button
            component={Link}
            href="/eligibility"
            variant="contained"
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1,
              fontSize: "0.92rem",
              fontWeight: 700,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            Check your eligibility
          </Button>
        </Stack>

        {/* Mobile hamburger */}
        <IconButton
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuRoundedIcon />
        </IconButton>
      </Box>

      {/* Mobile drawer — links stacked, CTA pinned at the bottom so it's
          reachable without scrolling on most phones. */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: { width: 280, display: "flex", flexDirection: "column" },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 2,
          }}
        >
          <Image
            src={LOGO_URL}
            alt="Serava Health"
            width={110}
            height={32}
            style={{ height: 40, width: "auto" }}
          />
          <IconButton
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ py: 1 }}>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText
                primary={link.label}
                slotProps={{ primary: { sx: { fontWeight: 500 } } }}
              />
            </ListItemButton>
          ))}
          <ListItemButton
            component={Link}
            href="/sign-in"
            onClick={() => setMobileOpen(false)}
          >
            <ListItemText
              primary="Sign in"
              slotProps={{ primary: { sx: { fontWeight: 500 } } }}
            />
          </ListItemButton>
        </List>

        <Box sx={{ mt: "auto", p: 2 }}>
          <Button
            component={Link}
            href="/eligibility"
            variant="contained"
            fullWidth
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 999,
              py: 1.2,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Check your eligibility
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

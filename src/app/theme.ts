// src/app/theme.ts
"use client";
import { createTheme } from "@mui/material/styles";

// MUI's palette doesn't have "muted", "accent", or "status" by default —
// this extends the type so TypeScript knows about your custom tokens.
declare module "@mui/material/styles" {
  interface Palette {
    muted: { main: string; contrastText: string };
    accentBrand: { main: string; contrastText: string };
    status: { green: string; amber: string; red: string };
  }
  interface PaletteOptions {
    muted?: { main: string; contrastText: string };
    accentBrand?: { main: string; contrastText: string };
    status?: { green: string; amber: string; red: string };
  }
}

// Raw hex values, taken directly from your globals.css comments
const eucalyptusTeal = "#2AB3A6";
const inkCharcoal = "#1D2430";
const mistWhite = "#F6FAF9";
const pureWhite = "#FFFFFF";
const deepViridian = "#2F5D50";
const ruleGreyGreen = "#D7DDD9";
const irisAccent = "#6E6AE4";

const statusGreen = "#1E7A32"; // hsl(142 65% 32%) — confirm exact hex
const statusAmber = "#B8860B"; // hsl(38 92% 38%) — confirm exact hex
const statusRed = "#C0392B"; // hsl(4 74% 42%) — confirm exact hex

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: eucalyptusTeal,
      contrastText: inkCharcoal, // charcoal-on-teal, your AA rule
    },
    secondary: {
      main: deepViridian,
      contrastText: pureWhite,
    },
    error: {
      main: statusRed,
    },
    warning: {
      main: statusAmber,
    },
    success: {
      main: statusGreen,
    },
    background: {
      default: mistWhite,
      paper: pureWhite,
    },
    text: {
      primary: inkCharcoal,
      secondary: inkCharcoal, // MUI wants a secondary text color; reuse charcoal at reduced opacity if you want a softer tone
    },
    divider: ruleGreyGreen,
    // Custom palette entries — declared in the module augmentation above
    muted: {
      main: ruleGreyGreen,
      contrastText: inkCharcoal,
    },
    accentBrand: {
      main: irisAccent,
      contrastText: pureWhite,
    },
    status: {
      green: statusGreen,
      amber: statusAmber,
      red: statusRed,
    },
  },
  typography: {
    // Montserrat everywhere, via the --font-montserrat variable that
    // layout.tsx now generates with next/font/google (same pattern as the
    // old --font-manrope/--font-inter). No !important needed anywhere —
    // the variable was simply undefined before, which is the actual bug
    // that made h2/h5/paragraphs look unchanged.
    fontFamily: "var(--font-montserrat), sans-serif",
    h1: { fontFamily: "var(--font-montserrat), sans-serif" },
    h2: { fontFamily: "var(--font-montserrat), sans-serif" },
    h3: { fontFamily: "var(--font-montserrat), sans-serif" },
    h4: { fontFamily: "var(--font-montserrat), sans-serif" },
    h5: { fontFamily: "var(--font-montserrat), sans-serif" },
    h6: { fontFamily: "var(--font-montserrat), sans-serif" },
    body1: { fontFamily: "var(--font-montserrat), sans-serif" },
    body2: { fontFamily: "var(--font-montserrat), sans-serif" },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 12, // matches --radius: 0.75rem
  },
  components: {
    // CssBaseline (rendered in layout.tsx, right next to ThemeProvider)
    // picks up typography.fontFamily automatically — this override just
    // makes that explicit for raw <body> content not wrapped in
    // <Typography>. No !important or per-tag overrides needed now that
    // --font-montserrat is actually defined in layout.tsx.
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "var(--font-montserrat), sans-serif",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: "capitalize !important",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "capitalize !important",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          textTransform: "capitalize !important",
        },
      },
    },
  },
});

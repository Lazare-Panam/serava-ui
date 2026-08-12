// src/app/layout.tsx
import { Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { Navbar } from "./Common/Navbar";
import "./globals.css";
import { Footer } from "./Common/Footer";

// Replaces the old Manrope (headings) + Inter (body) pairing — theme.ts now
// points every typography variant at this single --font-montserrat variable.
// Weights: 400/500 for body text, 600/700 for headings and buttons.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

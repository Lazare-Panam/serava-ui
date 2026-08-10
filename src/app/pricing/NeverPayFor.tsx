"use client";

import { alpha } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const ITEMS: string[] = [
  "Hidden fees, or add-ons that should have been included.",
  "A programme that is not clinically right for you. If you are not eligible, there is nothing to pay.",
  "Pressure. No countdown timers, no expiring discounts, no sales calls.",
  "Your own records. Copies of your clinical information are always free.",
];

export function NeverPayFor() {
  return (
    <Box
      sx={{
        borderRadius: 5,
        bgcolor: "secondary.main",
        px: { xs: 4, sm: 6 },
        py: { xs: 5, sm: 6 },
        maxWidth: 1000,
        mx: "auto",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontWeight: 700,
          fontSize: { xs: "1.6rem", sm: "1.9rem" },
          color: "secondary.contrastText",
          textTransform: "none",
          mb: { xs: 3, sm: 3.5 },
        }}
      >
        What you will never pay for
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {ITEMS.map((item) => (
          <Box
            key={item}
            sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}
          >
            <Box
              sx={{
                flexShrink: 0,
                width: 22,
                height: 22,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid",
                borderColor: (theme) =>
                  alpha(theme.palette.secondary.contrastText, 0.5),
                mt: "1px",
              }}
            >
              <CheckRoundedIcon
                sx={{
                  fontSize: 14,
                  color: "secondary.contrastText",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: (theme) =>
                  alpha(theme.palette.secondary.contrastText, 0.9),
                textTransform: "none",
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

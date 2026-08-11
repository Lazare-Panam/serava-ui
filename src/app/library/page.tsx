// src/app/library/page.tsx

import { Box } from "@mui/material";
import { LibraryPageHero } from "./Librarypagehero";
import { VolumeGroup } from "./Volumegroup";
import { FoundationIcon, FOUNDATIONS_VOLUMES, MEAL_VOLUMES, MealIcon, STRENGTH_VOLUMES, StrengthIcon } from "./Librarydata";
import { ExtrasRow } from "./Extrasrow";
import { PhilosophyPanel } from "./Philosophypanel";



export const metadata = {
  title: "Serava Health | The Library",
  description:
    "The full Lifestyle Library included with every Serava programme: meal volumes, strength training, and foundations guides on water, safety and supplements.",
};

export default function LibraryPage() {
  return (
    <>

      <LibraryPageHero />

      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          py: { xs: 8.5, md: 12 },
        }}
      >
        <Box sx={{ mx: "auto", maxWidth: 1152, px: 3 }}>
          <VolumeGroup
            accent="meal"
            icon={<MealIcon />}
            title="The Meal Library"
            intro="Six volumes covering every kind of week — from cooking from scratch to no kitchen at all — so eating well never depends on one narrow routine."
            volumes={MEAL_VOLUMES}
          />
        </Box>
      </Box>

      <Box component="section" sx={{ py: { xs: 8.5, md: 12 } }}>
        <Box sx={{ mx: "auto", maxWidth: 1152, px: 3 }}>
          <VolumeGroup
            accent="strength"
            icon={<StrengthIcon />}
            title="Strength"
            intro="Three venues for the same programme, because muscle matters throughout the plan, not just at the end of it — swap between them freely, week to week."
            volumes={STRENGTH_VOLUMES}
          />
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          py: { xs: 8.5, md: 12 },
        }}
      >
        <Box sx={{ mx: "auto", maxWidth: 1152, px: 3 }}>
          <VolumeGroup
            accent="foundation"
            icon={<FoundationIcon />}
            title="Foundations"
            intro="Six shorter guides that sit underneath everything else — less about what to eat or how to train, more about staying safe, rested and steady throughout."
            volumes={FOUNDATIONS_VOLUMES}
          />

          <ExtrasRow />
          <PhilosophyPanel />
        </Box>
      </Box>


      
    </>
  );
}

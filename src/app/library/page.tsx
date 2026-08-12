import { Box } from "@mui/material";
import { LibraryPageHero } from "./Librarypagehero";
import { VolumeGroup } from "./Volumegroup";
import {
  FoundationIcon,
  FOUNDATIONS_VOLUMES,
  MEAL_VOLUMES,
  MealIcon,
  STRENGTH_VOLUMES,
  StrengthIcon,
} from "./Librarydata";
import { CtaBand } from "../how-it-works/CtaBand";
import { ExtrasRow } from "./Extrasrow";
import { PhilosophyPanel } from "./Philosophypanel";
import { Reveal } from "../Landing/Reveal";

export const metadata = {
  title: "Serava Health | The Library",
  description:
    "The full Lifestyle Library included with every Serava programme: meal volumes, strength training, and foundations guides on water, safety and supplements.",
};

export default function LibraryPage() {
  return (
    <>
      {/* LibraryPageHero stays unwrapped, same reasoning as Hero on the
          homepage and PricingHero on the pricing page — it's on-screen
          the instant the page loads, so there's nothing to "reveal" yet.
          Everything below is scrolled to, so each gets its own entrance
          shape, no two the same. */}
      <LibraryPageHero />

      <Reveal variant="rise">
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
              intro="Six shorter guides that sit underneath everything else, less about what to eat or how to train and more about staying safe, rested, and steady throughout."
              volumes={MEAL_VOLUMES}
            />
          </Box>
        </Box>
      </Reveal>

      <Reveal variant="scale-soft">
        <Box component="section" sx={{ py: { xs: 8.5, md: 12 } }}>
          {/* px: 0 on mobile (vs. the 3-unit gutter every other section
              uses) so the Strength video panel can go edge-to-edge on
              small screens — VolumeGroup applies its own internal px
              (3 on mobile, 5 on desktop) once videoBackground is set, and
              drops its border-radius to 0 on mobile too, so heading/card
              text still gets proper inset padding either way. Don't
              "fix" this back to a flat px: 3 without also reverting
              VolumeGroup's borderRadius/px overrides for its video mode —
              they're a matched pair. */}
          <Box sx={{ mx: "auto", maxWidth: 1152, px: { xs: 0, md: 3 } }}>
            <VolumeGroup
              accent="strength"
              icon={<StrengthIcon />}
              title="Strength"
              intro="Three venues for the same programme, because muscle matters throughout the plan, not just at the end of it — swap between them freely, week to week."
              volumes={STRENGTH_VOLUMES}
              videoBackground="https://pblol2.blob.core.windows.net/serava-ui/lib/ex-video.mp4"
            />
          </Box>
        </Box>
      </Reveal>

      <Reveal variant="blur-rise">
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
              intro="Six shorter guides that sit underneath everything else, less about what to eat or how to train and more about staying safe, rested, and steady throughout."
              volumes={FOUNDATIONS_VOLUMES}
            />

            <ExtrasRow />
            <PhilosophyPanel />
          </Box>
        </Box>
      </Reveal>
    </>
  );
}

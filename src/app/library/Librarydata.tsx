// src/components/Library/libraryData.tsx
//
// Content for the three volume groups, extracted verbatim from the
// approved copy in the mockup (v0.2, checked against the source "Serava
// — The Lifestyle Library, Master Index v0.6"). Per that mockup's own
// editorial rule, kept structural ("what kind of content this is") and
// left out anything clinical-protocol-specific (kcal ranges, gram
// targets, supplement timings) or internal-only (draft/version/sign-off
// details) — none of that belongs on a public page, and none of it was
// in the mockup's visible copy either.
// Note: this was previously "./Volumegroup" (lowercase g) — that only
// resolves on case-insensitive filesystems (macOS/Windows dev machines).
// The actual file is VolumeGroup.tsx, so on a case-sensitive filesystem
// (Linux CI, Vercel builds, most prod containers) that import silently
// fails to resolve and the build breaks — fixed to match the real
// filename exactly.
import { Volume } from "./Volumegroup";
export const MEAL_VOLUMES: Volume[] = [
  {
    num: "Volume I",
    title: "Main Meals — The Home-Cooked Collection",
    description:
      "A collection of everyday mains built around a repeatable plate formula, with batch cooking and storecupboard staples. The core volume for anyone who cooks.",
  },
  {
    num: "Volume II",
    title: "Breakfasts, Lighter Meals & Snacks — The Everyday Collection",
    description:
      "Breakfasts, lighter meals, and a snack list that doubles as a shopping list. The volume everyone starts with.",
  },
  {
    num: "Volume III",
    title: "The Supermarket Navigator",
    description:
      "A quick way to judge any ready meal, plus zero-cook assembly meals for weeks with no time or energy to cook.",
  },
  {
    num: "Volume IV",
    title: "Eating Out & Takeaways",
    description:
      "Practical guidance for restaurants, alcohol, and takeaway nights, covering ten different cuisines.",
  },
  {
    num: "Volume V",
    title: "The Plant-Based Collection",
    description:
      "Meat-free mains and protein guidance for a fully plant-based approach, with conversions that work across the whole Library.",
  },
  {
    num: "Volume VI",
    title: "The Workday",
    description:
      "Packed lunches, no-fridge and no-microwave solutions, canteens, forecourts, and shift work.",
  },
];

// Strength intentionally has NO per-volume `image` here. This group is
// rendered by VolumeGroup with videoBackground set (see page.tsx), which
// puts one shared looping video behind all 3 cards instead of individual
// images — VolumeCard ignores `image` entirely whenever a group is in
// that video mode. Adding an `image` to any of these 3 entries would
// simply have no effect; don't be surprised when it doesn't show up.
export const STRENGTH_VOLUMES: Volume[] = [
  {
    num: "Volume I",
    title: "The Gym Programme",
    description:
      "A twice-weekly, machine-led programme, plus the gym itself explained — inductions, etiquette, off-peak times, and why machines are the smart starting tool.",
  },
  {
    num: "Volume II",
    title: "The Home Programme",
    description:
      "The identical programme, done from a living room with a chair, a wall, the stairs and a rucksack.",
  },
  {
    num: "Volume III",
    title: "The Band Programme",
    description:
      "The same programme again, using a set of resistance bands — the travel and small-space option, with the safety rules that keep it that way.",
  },
];

export const FOUNDATIONS_VOLUMES: Volume[] = [
  {
    num: "Guide I",
    title: "Water — The Hydration Guide",
    description:
      "A practical daily hydration target and routine, issued from day one.",
    image: "https://pblol2.blob.core.windows.net/serava-ui/lib/water-lib.jpeg",
  },
  {
    num: "Guide II",
    title: "The Safety Net",
    description:
      "How to recognise side effects, when to act, and who to call — issued at your first prescription.",
    image:
      "https://pblol2.blob.core.windows.net/serava-ui/lib/the-safety-net.jpeg",
  },
  {
    num: "Guide III",
    title: "The Supplement Guide",
    description:
      "A plain-English look at what might be worth considering alongside your plan, and what generally isn't.",
    image: "https://pblol2.blob.core.windows.net/serava-ui/lib/supplement.jpeg",
  },
  {
    num: "Guide IV",
    title: "Sleep — The Third Pillar",
    description:
      "Why sleep matters to the programme, with a practical routine and signposting if sleep itself is the problem.",
    image: "https://pblol2.blob.core.windows.net/serava-ui/lib/sleep.jpeg",
  },
  {
    num: "Guide V",
    title: "The Mind — The Fourth Pillar",
    description:
      "Practical tools for cravings, habits and mindset, built for the moments the plan gets hard.",
    image: "https://pblol2.blob.core.windows.net/serava-ui/lib/mind.jpeg",
  },
  {
    num: "Guide VI",
    title: "The Bookends",
    description:
      "Warm-up, cool-down, and simple mobility guidance to pair with any Strength volume.",
    image: "https://pblol2.blob.core.windows.net/serava-ui/lib/bookend.jpeg",
  },
];

// Icons — same paths as the mockup (they're deliberate, on-brand line
// icons, not placeholder art), just moved into components so VolumeGroup
// can take them as props instead of inlining raw <svg> per usage.
export function MealIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 5h7v14H4zM13 5h7v14h-7z" />
      <path d="M7 9h1M16 9h1" />
    </svg>
  );
}

export function StrengthIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M6 8v8M18 8v8M2 10v4M22 10v4M6 12h12" />
    </svg>
  );
}

export function FoundationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// src/app/how-it-works/page.tsx

import { CtaBand } from "./CtaBand";
import { HowItWorksHero } from "./HowItWorksHero";
import { JourneyTimeline } from "./JourneyTimeline";
import { ProgrammeShape } from "./ProgrammeShape";


export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <JourneyTimeline />
      <ProgrammeShape />
      <CtaBand
        heading="Step one takes five minutes"
        subtext="Free, and no obligation. If we are not the right service for you, we will say so."
        ctaLabel="Check your eligibility"
        ctaHref="/eligibility"
      />
    </>
  );
}
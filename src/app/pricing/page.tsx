// src/app/pricing/page.tsx
import { ConsultationSection } from "./Consultationsection";
import { MoneyFaqSection } from "./Moneyfaqsection";
import { PricingHero } from "./PricingHero";
import { PricingSection } from "./PricingSection";
import { NeverPayFor } from "./NeverPayFor";
import { Reveal } from "../Landing/Reveal";

export default function PricingPage() {
  return (
    <>
      {/* PricingHero stays unwrapped, same reasoning as Hero on the
          homepage — it's on-screen the instant the page loads, so
          there's nothing to "reveal" yet. Everything below is scrolled
          to, so each gets its own entrance shape, no two the same. */}
      <PricingHero />
      <Reveal variant="rise">
        <PricingSection />
      </Reveal>
      <Reveal variant="slide-left">
        <NeverPayFor />
      </Reveal>
      <Reveal variant="scale-soft">
        <ConsultationSection />
      </Reveal>
      <Reveal variant="blur-rise">
        <MoneyFaqSection />
      </Reveal>
    </>
  );
}

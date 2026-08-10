// src/app/pricing/page.tsx
import { ConsultationSection } from "./Consultationsection";
import { MoneyFaqSection } from "./Moneyfaqsection";
import { PricingHero } from "./PricingHero";
import { PricingSection } from "./PricingSection";
import { NeverPayFor } from "./NeverPayFor";
export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingSection />
      <NeverPayFor />
      <ConsultationSection />
      <MoneyFaqSection />
    </>
  );
}

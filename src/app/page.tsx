import Image from "next/image";
import { Hero } from "./Landing/Hero";
import { ProgrammePaths } from "./Landing/ProgramPaths";
import { HowItWorks } from "./Landing/HowItWorks";
import { TrustBand } from "./Landing/TrustBand";
import { ClinicalQuote } from "./Landing/ClinicalQuote";

import { Outcomes } from "./Landing/Outcomes";
import { HonestySection } from "./Landing/HonestySection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgrammePaths />
      <HowItWorks />
      <TrustBand />
      <ClinicalQuote />
      <Outcomes />
      <HonestySection />
    </>
  );
}

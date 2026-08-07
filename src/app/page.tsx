"use client";

import { Hero } from "./Landing/Hero";
import { ProgrammePaths } from "./Landing/ProgramPaths";
import { HowItWorks } from "./Landing/HowItWorks";
import { TrustBand } from "./Landing/TrustBand";
import { ClinicalQuote } from "./Landing/ClinicalQuote";
import { Reveal } from "./Landing/Reveal";

import { Outcomes } from "./Landing/Outcomes";
import { HonestySection } from "./Landing/HonestySection";

export default function Home() {
  // Force every page load (including a plain refresh) to start at the
  // top. Without this, the browser's default scroll restoration jumps
  // you back to wherever you were scrolled to before refreshing — which
  // also means the Reveal animations below the fold never get a fresh
  // chance to play, since their IntersectionObservers would fire before
  // the page has even settled into view.


  return (
    <>
      {/* Hero stays unwrapped — it's on-screen the instant the page loads,
          so there's nothing to "reveal": animating it would just delay the
          first thing the visitor sees. Everything below is scrolled to,
          so each gets its own entrance, each a different shape so the
          page doesn't feel like the same fade-up copy-pasted six times. */}
      <Hero />
      <Reveal variant="scale-soft">
        <ProgrammePaths />
      </Reveal>
      <Reveal variant="rise">
        <HowItWorks />
      </Reveal>
      <Reveal variant="slide-left">
        <TrustBand />
      </Reveal>
      <Reveal variant="blur-rise">
        <ClinicalQuote />
      </Reveal>
      <Reveal variant="slide-right">
        <Outcomes />
      </Reveal>
      <Reveal variant="fade" duration={1.1}>
        <HonestySection />
      </Reveal>
    </>
  );
}

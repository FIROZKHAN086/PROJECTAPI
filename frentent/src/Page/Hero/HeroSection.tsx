"use client";
import HeroBackground from "./components/HeroBackground";
import HeroBadge from "./components/HeroBadge";
import HeroTitle from "./components/HeroTitle";
import HeroSubtitle from "./components/HeroSubtitle";
import HeroVisual from "./components/HeroVisual";
import HeroScrollHint from "./components/HeroScrollHint";
import HeroParticles from "./components/HeroParticles";
import HeroFeatures from "./components/HeroFeatures";

export default function HeroSection() {
  return (
    <>
      <section
        aria-label="ProjectAPI hero"
        className="relative min-h-screen overflow-hidden bg-[#11120D] text-[#FFFBF4]"
      >
        <HeroBackground />
        <HeroParticles />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1140px] flex-col items-center justify-center px-6 py-24 text-center sm:py-28">
          <HeroBadge />
          <HeroTitle />
          <HeroSubtitle />
         
          <HeroFeatures />
          <HeroVisual />
          <HeroScrollHint />
        </div>
      </section>
    </>
  );
}

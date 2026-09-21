import HeroBackground from "./components/HeroBackground";
import HeroBadge from "./components/HeroBadge";
import HeroTitle from "./components/HeroTitle";
import HeroSubtitle from "./components/HeroSubtitle";
import HeroCTA from "./components/HeroCTA";
import HeroStats from "./components/HeroStats";
import HeroVisual from "./components/HeroVisual";
import HeroScrollHint from "./components/HeroScrollHint";

export default function HeroSection() {
  return (
    <section
      aria-label="ProjectAPI hero"
      className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#FFFBF4]"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1140px] flex-col items-center justify-center px-6 py-24 text-center sm:py-28">
        <HeroBadge />
        <HeroTitle />
        <HeroSubtitle />
        <HeroCTA />
        <HeroStats />
        <HeroVisual />
      <HeroScrollHint />
      </div>
    </section>
  );
}
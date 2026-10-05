import ProblemHeader from "./components/ProblemHeader";
import PainPointsCard from "./components/PainPointsCard";
import SolutionStepsCard from "./components/SolutionStepsCard";
import FlowArrow from "./components/FlowArrow";

export default function ProblemSolutionSection() {
  return (
    <section
      id="problem-solution"
      className="relative overflow-hidden bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased"
    >
      <main className="mx-auto max-w-[1140px] px-6 py-24 sm:py-32">
        <div className="flex flex-col gap-16">
          <ProblemHeader />

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_72px_1fr] md:gap-4">
            <PainPointsCard />
            <FlowArrow />
            <SolutionStepsCard />
          </div>
        </div>
      </main>
    </section>
  );
}
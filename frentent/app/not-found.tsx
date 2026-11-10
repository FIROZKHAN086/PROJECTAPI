import Link from "next/link";
import { ArrowLeft, Home, Search } from "@/src/Components/DynamicIcons";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#11120D] px-6 py-16 text-[#FFFBF4]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,222,128,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#4ADE80_1px,transparent_1px),linear-gradient(90deg,#4ADE80_1px,transparent_1px)] [background-size:48px_48px]" />

      <section className="relative z-10 w-full max-w-2xl text-center">
        <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-3xl border border-[#4ADE80]/25 bg-[#4ADE80]/10 shadow-[0_0_60px_rgba(74,222,128,0.12)]">
          <Search className="size-9 text-[#4ADE80]" aria-hidden="true" />
        </div>

        <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-[#4ADE80]">
          Error 404
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-[#D8CFBC]/70 sm:text-lg">
          This route does not exist or may have moved. Let&apos;s get you back to
          a useful place in ProjectAPI.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#4ADE80] px-5 text-sm font-semibold text-[#07130B] transition hover:bg-[#86EFAC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11120D]"
          >
            <Home className="size-4" aria-hidden="true" />
            Go home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-[#FFFBF4] transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11120D]"
          >
            Open dashboard
            <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

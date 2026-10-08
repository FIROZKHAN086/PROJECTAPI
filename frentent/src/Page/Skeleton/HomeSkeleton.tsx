import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div
      suppressHydrationWarning={true}
      className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased overflow-hidden"
    >
      <main className="max-w-[1140px] mx-auto px-6 py-12 flex flex-col items-center text-center">
        <Skeleton className="h-9 w-[320px] rounded-full bg-white/10" />

        <div className="mt-8 flex flex-col items-center gap-4">
          <Skeleton className="h-14 w-[520px] max-w-full bg-white/10" />
          <Skeleton className="h-14 w-[640px] max-w-full bg-white/10" />
        </div>

        <Skeleton className="mt-5 h-5 w-[420px] max-w-full bg-white/10" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Skeleton className="h-10 w-[180px] rounded-lg bg-[#FBF7F4]" />
          <Skeleton className="h-10 w-[160px] rounded-lg bg-white/10" />
        </div>

        <div className="mt-12 w-full max-w-[1140px] rounded-2xl border border-white/10 bg-[#141414] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="rounded-xl border border-white/10 bg-[#0F0F0F] p-5">
              <Skeleton className="h-40 w-full rounded-lg bg-white/5" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-2/3 bg-white/10" />
                <Skeleton className="h-3 w-1/2 bg-white/10" />
              </div>
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0F0F0F] p-5">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-12 rounded bg-[#4ADE80]/20" />
                <Skeleton className="h-6 w-40 bg-white/10" />
                <Skeleton className="ml-auto h-6 w-16 rounded-full bg-[#4ADE80]/10" />
              </div>
              <Skeleton className="mt-4 h-44 w-full rounded-lg bg-black/40" />
              <div className="mt-4 flex items-center gap-4">
                <Skeleton className="h-3 w-20 bg-white/10" />
                <Skeleton className="h-3 w-24 bg-white/10" />
                <Skeleton className="h-3 w-20 bg-white/10" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 py-3 px-6 border-t border-white/10 bg-[#0F0F0F]/50">
            <Skeleton className="h-6 w-[140px] rounded-full bg-white/10" />
          </div>
        </div>
      </main>
    </div>
  );
}
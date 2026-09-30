"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoginSkeleton() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
     
      <div className="w-full max-w-[1120px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
     
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            {/* Badge pill */}
            <Skeleton className="h-7 w-56 rounded-full bg-white/[0.06]" />

            {/* Heading */}
            <div className="space-y-3">
              <Skeleton className="h-10 w-[90%] rounded-lg bg-white/[0.06]" />
              <Skeleton className="h-10 w-[70%] rounded-lg bg-white/[0.06]" />
            </div>

            {/* Subtext */}
            <div className="space-y-2.5 pt-1">
              <Skeleton className="h-4 w-full rounded-md bg-white/[0.05]" />
              <Skeleton className="h-4 w-[85%] rounded-md bg-white/[0.05]" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 bg-[#141414] border border-white/10 rounded-lg"
              >
                <Skeleton className="size-4 rounded-md bg-white/[0.08]" />
                <Skeleton className="h-3.5 flex-1 rounded-md bg-white/[0.06]" />
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 pt-4 border-t border-white/10">
            <div className="flex -space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="size-8 rounded-full border-2 border-[#0A0A0A] bg-white/[0.08]"
                />
              ))}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-32 rounded-md bg-white/[0.06]" />
              <Skeleton className="h-3 w-40 rounded-md bg-white/[0.05]" />
            </div>
          </div>
        </div>

        {/* ---------------- Right Column — Auth Form ---------------- */}
        <div className="w-full max-w-[420px] mx-auto lg:mx-0">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Mobile brand */}
            <div className="lg:hidden mb-6">
              <Skeleton className="h-7 w-32 rounded-md bg-white/[0.08]" />
            </div>

            {/* Heading + subtext */}
            <div className="mb-6 space-y-2.5">
              <Skeleton className="h-7 w-40 rounded-md bg-white/[0.08]" />
              <Skeleton className="h-4 w-64 rounded-md bg-white/[0.05]" />
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-14 rounded-md bg-white/[0.06]" />
                <Skeleton className="h-11 w-full rounded-lg bg-white/[0.06]" />
              </div>

              {/* Password label + forgot */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-16 rounded-md bg-white/[0.06]" />
                  <Skeleton className="h-3 w-14 rounded-md bg-white/[0.05]" />
                </div>
                <Skeleton className="h-11 w-full rounded-lg bg-white/[0.06]" />
              </div>

              {/* Submit button */}
              <Skeleton className="h-11 w-full rounded-lg bg-white/[0.08]" />
            </div>

            {/* Desktop toggle (bottom right) */}
            <div className="hidden lg:flex absolute bottom-5 right-8 items-center gap-1.5">
              <Skeleton className="h-3.5 w-40 rounded-md bg-white/[0.05]" />
              <Skeleton className="h-3.5 w-14 rounded-md bg-white/[0.07]" />
            </div>

            {/* Mobile toggle */}
            <div className="lg:hidden mt-6 flex justify-center items-center gap-1.5">
              <Skeleton className="h-3.5 w-40 rounded-md bg-white/[0.05]" />
              <Skeleton className="h-3.5 w-14 rounded-md bg-white/[0.07]" />
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-4 grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 bg-[#141414] border border-white/10 rounded-lg"
              >
                <Skeleton className="size-3.5 rounded-md bg-white/[0.08]" />
                <Skeleton className="h-3 flex-1 rounded-md bg-white/[0.06]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { Skeleton } from "@/components/ui/skeleton";


export const FormSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 bg-white/[0.06]" />
        <Skeleton className="h-20 w-full rounded-xl bg-white/[0.06]" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 bg-white/[0.06]" />
        <Skeleton className="h-32 w-full rounded-xl bg-white/[0.06]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 bg-white/[0.06]" />
          <Skeleton className="h-10 w-full rounded-xl bg-white/[0.06]" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 bg-white/[0.06]" />
          <Skeleton className="h-10 w-full rounded-xl bg-white/[0.06]" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 bg-white/[0.06]" />
        <Skeleton className="h-20 w-full rounded-xl bg-white/[0.06]" />
      </div>
    </div>
  );
};
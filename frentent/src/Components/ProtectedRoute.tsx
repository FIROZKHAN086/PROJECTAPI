"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/src/lib/hooks";
import { LoaderCircle } from "lucide-react";

const PUBLIC_ROUTES = ["/", "/login", "/about", "/contact"];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAppSelector((s) => s.auth);

  const isPublic = PUBLIC_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  useEffect(() => {
    if (isLoading) return;

    if (!user && !isPublic) {
      router.replace("/login?auth=login");
    }

    if (user && pathname === "/login") {
      router.replace("/");
    }
  }, [user, isLoading, isPublic, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <LoaderCircle className="size-6 text-[#D8CFBC] animate-spin" />
      </div>
    );
  }

  if (!user && !isPublic) return null;
  if (user && pathname === "/login") return null;

  return <>{children}</>;
}

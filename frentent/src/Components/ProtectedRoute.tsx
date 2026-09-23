"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/src/lib/hooks";

const PUBLIC_ROUTES = ["/", "/login", "/about", "/contact", "/docs"];

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
      router.replace("/dashboard");
    }
  }, [user, isLoading, isPublic, pathname, router]);

  return <>{children}</>;
}
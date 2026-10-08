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

  const isVerified = Boolean(user) && user?.userVerified === true;

  useEffect(() => {
    if (isLoading) return;

    if (!isVerified && !isPublic) {
      router.replace("/login?auth=login");
    }

    if (isVerified && pathname === "/login") {
      router.replace("/dashboard");
    }
  }, [isVerified, isLoading, isPublic, pathname, router]);

  return <>{children}</>;
}
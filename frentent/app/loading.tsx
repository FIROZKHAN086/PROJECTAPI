"use client";

import HomeSkeleton from "@/src/Skeleton/HomeSkeleton";
import LoginSkeleton from "@/src/Skeleton/LoginSkeleton";
import { usePathname } from "next/navigation";



export default function Loading() {
  const pathname = usePathname();

  if (pathname === "/") {
    return <HomeSkeleton />;
  }

  if (pathname === "/login") {
    return <LoginSkeleton />;
  }

  return <HomeSkeleton/>;

}
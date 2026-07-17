"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/src/Components/Navbar";
import Footer from "@/src/Components/Footer";
import SmoothScrollProvider from "@/src/Components/SmoothScrollProvider";
import ProtectedRoute from "@/src/Components/ProtectedRoute";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
  }

  return (
    <SmoothScrollProvider>
      
      <ProtectedRoute>{children}</ProtectedRoute>
  
    </SmoothScrollProvider>
  );
}

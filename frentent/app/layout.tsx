import type { Metadata } from "next";
import { Unbounded, Cause } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/src/Components/SmoothScrollProvider";
import Providers from "@/src/Components/Providers";
import Navbar from "@/src/Components/Navbar";
import Footer from "@/src/Components/Footer";
import ProtectedRoute from "@/src/Components/ProtectedRoute";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-unbounded",
});
const cause = Cause({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cause",
});

export const metadata: Metadata = {
  title: "ProjectAPI",
  description: "A project management tool for developers and teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${unbounded.variable} ${cause.variable} antialiased`}
    >
      <body
        suppressHydrationWarning={true}
        className="min-h-full flex flex-col bg-[#11120D] text-[#FFFBF4]"
      >
        <Providers>
          <SmoothScrollProvider>
            <Navbar />
            <ProtectedRoute>{children}</ProtectedRoute>
            <Footer />
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
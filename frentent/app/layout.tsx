import type { Metadata, Viewport } from "next";
import { Unbounded,  Comic_Relief } from "next/font/google";
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
const cause = Comic_Relief({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cause",
});

export const metadata: Metadata = {
  title: {
    default: "ProjectAPI — Project & API Management for Developers",
    template: "%s · ProjectAPI",
  },
  description:
    "ProjectAPI is a modern project management and API toolkit for developers and teams — create projects, manage API keys, test endpoints, and ship faster.",
  applicationName: "ProjectAPI",
  authors: [{ name: "ProjectAPI" }],
  creator: "ProjectAPI",
  keywords: [
    "project management",
    "API management",
    "developer tools",
    "REST API testing",
    "API keys",
    "project dashboard",
    "developer portfolio",
  ],
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ProjectAPI",
    title: "ProjectAPI — Project & API Management for Developers",
    description:
      "Create projects, manage API keys, test endpoints, and ship faster with a premium developer dashboard.",
  },
  twitter: {
    card: "summary",
    title: "ProjectAPI — Project & API Management for Developers",
    description:
      "Create projects, manage API keys, test endpoints, and ship faster with a premium developer dashboard.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#07070B",
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
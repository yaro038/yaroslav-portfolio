import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Yaroslav Domanov — Full Stack Software Engineer",
  description:
    "Portfolio of Yaroslav Domanov — Full Stack Software Engineer building scalable SaaS and AI-enabled systems with React, Next.js, Node.js, and cloud platforms.",
  openGraph: {
    title: "Yaroslav Domanov — Full Stack Software Engineer",
    description:
      "Scalable SaaS, AI-enabled systems, and high-performance full-stack engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full antialiased" suppressHydrationWarning>
        <div className="atmosphere" aria-hidden />
        <div className="noise" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

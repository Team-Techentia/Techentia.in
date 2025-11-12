import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Techentia | AI, Blockchain, and Full-Stack Agency",
  description: "Techentia builds world-class AI, Web3, and full-stack products for ambitious startups.",
  keywords: ["AI agency", "blockchain development", "web3 development", "SaaS development", "Techentia"],
  openGraph: {
    title: "Techentia",
    description: "Building global tech products — faster, smarter, scalable.",
    url: "https://techentia.com",
    siteName: "Techentia",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "Techentia Preview" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Techentia",
    title: "Techentia | Building the Future",
    description: "Custom AI, Blockchain & Full-stack solutions.",
    images: ["/slogo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

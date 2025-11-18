import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
      <body className={`${poppins.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

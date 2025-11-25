// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Cursor, Providers } from "@/components";
import { Bebas_Neue, Urbanist } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${bebas.variable} ${urbanist.variable} antialiased`} suppressHydrationWarning>
        <Cursor />
        <Providers>
          {children}
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem("techentia_theme");
                  const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  const dark = saved === "dark" || (!saved && system);
                  const html = document.documentElement;
                  html.classList.toggle("dark", dark);
                  html.classList.toggle("light", !dark);
                  html.setAttribute("data-theme", dark ? "dark" : "light");
                } catch (_) {}
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}


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
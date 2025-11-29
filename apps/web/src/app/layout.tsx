// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Urbanist } from "next/font/google";
import { Cursor } from "@/components";

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
        {children}
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
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Techentia",
              url: "https://techentia.com",
              logo: "https://techentia.com/images/logo.jpg",
              sameAs: [
                "https://x.com/techentia",
                "https://instagram.com/techentia",
                "https://linkedin.com/company/techentia"
              ],
              description:
                "Techentia builds world-class AI, Web3, and full-stack products for ambitious startups.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Delhi",
                addressRegion: "DL",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "work@techentia.in",
                contactType: "customer support",
              },
            })
          }}
        />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://techentia.com"),
  title: {
    default: "Techentia - AI, Blockchain & Full-Stack Agency",
    template: "%s | Techentia"
  },
  description: "Techentia builds world-class AI, Web3, and full-stack products for ambitious startups",
  keywords: ["AI agency", "blockchain development", "web3 development", "SaaS development", "Techentia", "MVP development", "Startup product development",],
  openGraph: {
    title: "Techentia - Building AI & Web3 Products",
    description: "We turn ideas into scalable AI, blockchain, and full-stack solutions",
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
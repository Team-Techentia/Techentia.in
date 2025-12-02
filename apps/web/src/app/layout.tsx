// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Urbanist } from "next/font/google";
import { Cursor } from "@/components";
import { TechentiaMetaData, TechentiaStructuredData } from "@/lib/consts";
import { Suspense } from "react";

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

export const metadata: Metadata = TechentiaMetaData;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
            __html: JSON.stringify(TechentiaStructuredData)
          }}
        />
      </head>

      <body className={`${bebas.variable} ${urbanist.variable} antialiased`} suppressHydrationWarning>
        {children}
        <Suspense fallback={null}>
          <Cursor />
        </Suspense>
      </body>
    </html>
  );
}
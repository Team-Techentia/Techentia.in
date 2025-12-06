// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Inter, Urbanist } from "next/font/google";
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

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-regular",
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

        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id=GTM-MTVKKS8H'+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MTVKKS8H');
      `,
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GTM-MTVKKS8H"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GTM-MTVKKS8H');
      `,
          }}
        />
      </head>

      <body className={`${bebas.variable} ${urbanist.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MTVKKS8H" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        {children}
        <Suspense fallback={null}>
          {/* <Cursor /> */}
        </Suspense>
      </body>
    </html >
  );
}
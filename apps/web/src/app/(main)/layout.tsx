// app/(main)/layout.tsx

import React from "react";
import { Navbar, ThemeProvider } from "@/components";

export default function HomeRootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className={`h-dvh sm:min-h-screen flex flex-col bg-background text-foreground`}>
        <Navbar />
        <main className="w-full max-w-7xl max-4xl:max-w-[90%] 4xl:max-w-[1900px] mx-auto flex flex-col flex-1 mb-0.5 py-28 md:pt-20 bg-yellow-60 px-4 sm:px-7">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}

// app/blog/layout.tsx

import React, { Suspense } from "react";
import { HomeLayout, Loader, Providers } from "@/components";

export default function HomeRootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Suspense fallback={<Loader />}>
        <HomeLayout>
          {children}
        </HomeLayout>
      </Suspense>
    </Providers>
  );
}

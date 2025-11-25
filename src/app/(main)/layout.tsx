// app/(home)/layout.tsx

import React, { Suspense } from "react";
import { HomeLayout, Loader } from "@/components";

export default function HomeRootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <HomeLayout>
        {children}
      </HomeLayout>
    </Suspense>
  );
}

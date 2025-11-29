// app/(main)/(home)/page.tsx

import { Hero, Services, } from "./_components";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <div className="flex-1 bg-red-60 flex flex-col gap-5 py-20">
        <Hero />
        <Services />
      </div>
    </>
  );
}
// app/(main)/(home)/page.tsx

import { About, Contact, Hero, Services, } from "./_components";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <div className="flex-1 bg-red-60 flex flex-col gap-24 pt-12 sm:pt-14 pb-12">
        <Hero />
        {/* <Services /> */}
        <About />
        <Contact />
      </div>
    </>
  );
}
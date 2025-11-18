"use client";
import { Navbar } from "@/components";

export default function HomeLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <>
      <div className={`min-h-screen flex flex-col bg-background text-foreground`}>
        <Navbar />
        <main className="w-full max-w-7xl flex flex-col flex-1 mb-0.5 bg-yellow-600 xl:max-w-[90%] mx-auto pt-28 md:pt-16 px-4 sm:px-6">
          {children}
        </main>
      </div>
    </>
  );
}

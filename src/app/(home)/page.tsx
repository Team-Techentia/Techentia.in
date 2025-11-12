// app/page.tsx
"use client";

import { ThemeToggle } from "@/components";
import { Search, User } from "lucide-react";

function Navigation() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center" aria-label="Techentia Home">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--accent)] text-white font-bold text-xl hover:bg-[var(--accent)]/90 transition-colors">
              T
            </div>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Services", "Works", "About", "Contact Us"].map((txt) => (
              <a
                key={txt}
                href={`#${txt.toLowerCase().replace(" ", "")}`}
                className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
              >
                {txt}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
              <Search className="size-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
              <User className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function EthereumVideo() {
  return (
    <div className="relative flex items-center justify-center">
      <video
        src="/videos/ethereum.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-80 h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 25px 50px rgba(90,57,202,.3))" }}
        aria-label="Rotating Ethereum coin"
      />
      <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 blur-3xl animate-pulse pointer-events-none" />
    </div>
  );
}

function HeroContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
        EXPERT SERVICES THAT DRIVE{" "}
        <span className="relative inline-block">
          REAL GROWTH
          <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-[var(--accent)]" />
        </span>
      </h1>

      <p className="max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur. Id massa ac convallis magna ut eget et id
        quisque. Nisi imperdiet ipsum tellus quis a diam. Turpis duis purus ut sapien.
        Lorem ipsum dolor sit amet consectetur.
      </p>

      <button
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--accent)] px-8 py-4 font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--accent)]/30"
      >
        <span className="relative z-10">GET IN TOUCH</span>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-20 size-96 rounded-full bg-[var(--primary)] opacity-30 blur-3xl dark:bg-[var(--accent)]/10" />
      <div className="absolute bottom-20 left-20 size-96 rounded-full bg-[var(--secondary)] opacity-30 blur-3xl dark:bg-[var(--secondary)]/5" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Navigation />

      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <HeroContent />
            <div className="flex justify-center lg:justify-end">
              <EthereumVideo />
            </div>
          </div>
        </div>
      </main>

      <BackgroundEffects />
    </div>
  );
}
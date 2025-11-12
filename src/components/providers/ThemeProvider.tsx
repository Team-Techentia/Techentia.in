// components/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";

type ThemeCtx = {
  toggle: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeCtx>({
  toggle: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);

    const html = document.documentElement;
    html.classList.toggle("dark", shouldBeDark);
    html.classList.toggle("light", !shouldBeDark);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        html.classList.toggle("dark", e.matches);
        html.classList.toggle("light", !e.matches);
      }
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    const willBeDark = !html.classList.contains("dark");

    html.classList.toggle("dark", willBeDark);
    html.classList.toggle("light", !willBeDark);
    localStorage.setItem("theme", willBeDark ? "dark" : "light");
  };

  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <ThemeContext.Provider value={{ toggle, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
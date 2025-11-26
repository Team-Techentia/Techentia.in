"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeCtx = { toggle: () => void; isDark: boolean; };

const ThemeContext = createContext<ThemeCtx>({ toggle: () => { }, isDark: false, });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    const html = document.documentElement;

    html.classList.toggle("dark", next);
    html.classList.toggle("light", !next);
    html.setAttribute("data-theme", next ? "dark" : "light");

    localStorage.setItem("techentia_theme", next ? "dark" : "light");
    setIsDark(next);
  };

  if (isDark === null) return null;

  return (
    <ThemeContext.Provider value={{ toggle, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
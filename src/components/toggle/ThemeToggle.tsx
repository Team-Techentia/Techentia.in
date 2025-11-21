// components/ThemeToggle.tsx
"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function ThemeToggle() {
  const { toggle, isDark } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
      aria-label="Toggle dark mode"
    >
      {
        !isDark ?
          <Sun className="size-5 text-foreground" /> :
          <Moon className="size-5 text-yellow-400" />
      }
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
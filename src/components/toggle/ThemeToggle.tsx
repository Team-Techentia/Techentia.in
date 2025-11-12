// components/ThemeToggle.tsx
"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function ThemeToggle() {
  const { toggle, isDark } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      <Sun className="size-5 block dark:hidden text-gray-700" />
      <Moon className="size-5 hidden dark:block text-yellow-400" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
import { useCallback, useState } from "react";

export type Theme = "dark" | "light";

// index.html applies the saved theme before paint; this keeps React in sync with it
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === "light" ? "light" : "dark"));

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Storage can be blocked (private mode); the theme still applies for this visit
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}

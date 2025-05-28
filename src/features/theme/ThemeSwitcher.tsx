"use client";

import { useEffect, useState } from "react";
import { THEMES } from "./theme.constants";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>(THEMES.LIGHT);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || THEMES.LIGHT;
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="toggle toggle-sm"
        checked={theme === THEMES.DARK}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <span className="text-lg">{theme === THEMES.LIGHT ? "☀️" : "🌙"}</span>
    </div>
  );
};

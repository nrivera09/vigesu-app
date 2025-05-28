export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeType = keyof typeof THEMES;

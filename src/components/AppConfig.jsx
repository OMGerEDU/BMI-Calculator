// This file replaces the functionality that would be in tailwind.config.js
// Since we can't add that file directly, we'll configure our theme values here
// and use them consistently across components

export const themeConfig = {
  colors: {
    primary: "#1F2937",
    secondary: "#3B82F6",
    accent: "#10B981",
    background: "#F9FAFB",
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
  }
};

// This function can be used to add theme-specific class names
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx,jsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: { borderRadius: { '2xl': '1rem' } } },
  darkMode: "media",
  plugins: [],
} satisfies Config;

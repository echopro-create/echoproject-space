import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        background: "var(--colors-background)",
        text: "var(--colors-text)",
        muted: "var(--colors-muted)",
        border: "var(--colors-border)",
        primary: "var(--colors-primary)"
      },
      borderRadius: { DEFAULT: "12px", xl: "24px" }
    }
  },
  plugins: []
} satisfies Config;
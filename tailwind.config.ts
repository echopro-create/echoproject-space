import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./lib/**/*.{js,ts,jsx,tsx,mdx}","./styles/**/*.css"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg))",
        text: "rgb(var(--text))",
        muted: "rgb(var(--muted))",
        primary: "rgb(var(--primary))",
        "primary-text": "rgb(var(--primary-text))",
        border: "rgba(var(--text),0.12)"
      },
      borderRadius: { xl:"var(--radius-xl)", "2xl":"var(--radius-2xl)" }
    },
    container: { center: true, padding: "16px" }
  },
  plugins: [require("@tailwindcss/typography")]
};
export default config;

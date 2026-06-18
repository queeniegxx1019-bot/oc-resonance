import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#0f1410",
          900: "#121a14",
          800: "#162018",
          700: "#1e2c22",
        },
        sage: {
          300: "#c9e4a0",
          400: "#b8d88a",
          500: "#8fb86a",
          muted: "#9db39a",
        },
        blossom: {
          300: "#e8a0b8",
          400: "#d488a8",
        },
        mist: "#e8f0e4",
      },
      fontFamily: {
        display: ["var(--font-display-zh)", "var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(80,120,70,0.35), transparent), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(120,80,100,0.15), transparent)",
        "card-shine":
          "radial-gradient(ellipse at top, rgba(201,228,160,0.08), transparent 60%)",
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(12px, -18px) rotate(4deg)" },
          "50%": { transform: "translate(-8px, -32px) rotate(-3deg)" },
          "75%": { transform: "translate(16px, -12px) rotate(2deg)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 8px 32px rgba(201, 228, 160, 0.25)",
        "glow-lg": "0 12px 40px rgba(201, 228, 160, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;

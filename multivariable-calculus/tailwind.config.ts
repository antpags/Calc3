import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        coal: "#141414",
        parchment: "#f5f2e9",
        gold: {
          50: "#fff9e6",
          100: "#ffefb8",
          300: "#e8c766",
          400: "#d8aa2d",
          500: "#b98a12",
          600: "#8f670a",
        },
      },
      fontFamily: {
        serif: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Palatino", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(216,170,45,.42), 0 22px 80px rgba(0,0,0,.45)",
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseGold: { "0%, 100%": { boxShadow: "0 0 0 0 rgba(216,170,45,.22)" }, "50%": { boxShadow: "0 0 0 10px rgba(216,170,45,0)" } },
      },
      animation: {
        rise: "rise .6s ease-out both",
        "pulse-gold": "pulseGold 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 50%, 100%': { opacity: 1 },
          '25%, 75%': { opacity: 0 },
        },
      },
    
      colors: {
        primary: {
          DEFAULT: "#b20e10",
          light: "#d12a2d",
          dark: "#6e090b",
          soft: "#f7e4e4",
        },
        accent: {
          DEFAULT: "#fef2f2",
          dark: "#fce4e4",
        },
        background: "#fafafa",
        card: "#ffffff",
        border: "#e5e5e5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(178, 14, 16, 0.25)",
      },
    },
  },
  plugins: [animate],
};

export default config;

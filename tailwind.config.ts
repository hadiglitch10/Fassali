import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#DEC07A",
          dark: "#A8872E",
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "Cairo", "sans-serif"],
        arabic: ["var(--font-cairo)", "Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

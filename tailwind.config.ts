import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1B3A5C", light: "#2A5580", dark: "#122840" },
        accent: { DEFAULT: "#2563EB", light: "#60A5FA", dark: "#1D4ED8" },
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

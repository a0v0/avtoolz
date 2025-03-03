import type { Config } from "tailwindcss";

const { heroui } = require("@heroui/react");
const { addDynamicIconSelectors } = require("@iconify/tailwind");

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui(), addDynamicIconSelectors()],
} satisfies Config;

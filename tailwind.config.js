import {nextui} from "@nextui-org/theme";
const {addDynamicIconSelectors} = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/*.html",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(), addDynamicIconSelectors()],
};

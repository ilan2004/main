// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        '250vh': '250vh',
      },
    },

  },
  darkMode: "class",
  plugins: [nextui()],
});

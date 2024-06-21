/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./index.html",
    "./main.js",
    "./**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0E0913",
        dark: "#000703",
        primary: "#CE9122",
        primaryAlt: "#983FB4",
      },
    },
  },
  plugins: [],
};

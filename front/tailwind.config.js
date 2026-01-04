/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        pink: {
          500: '#ec4899',
        },
        primary: "#0072ff",
        secondary: "#ffeb3b",
        success: "#4caf50",
        info: "#2196f3",
        muted: "#fafafa",
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
    require('flowbite/plugin'),
    // require('@tailwindcss/typography'), // Removed because package is missing
  ],
}

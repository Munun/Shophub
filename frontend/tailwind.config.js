/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary': '#ea580c',    // Deep Orange (main)
          'secondary': '#fb923c',   // Light Orange (accents)
          'dark': '#9a3412',        // Dark Orange (text/borders)
          'light': '#fed7aa',       // Pale Orange (backgrounds)
        }
      }
    },
  },
  plugins: [],
}

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
          'navy': '#1e3a8a',       // Primary - trust
          'slate': '#64748b',       // Secondary - calm
          'emerald': '#10b981',     // Success
          'orange': '#f97316',      // CTA only
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-maroon': '#800000',
        'brand-gold': '#FFD700',
        'brand-cream': '#FFFDD0'
      }
    },
  },
  plugins: [],
}

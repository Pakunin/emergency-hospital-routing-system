/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#111827",
        darkCard: "#1f2937",
        accentRed: "#ef4444"
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f172a", // slate-900
          foreground: "#f8fafc", // slate-50
        },
        muted: {
          DEFAULT: "#f1f5f9", // slate-100
          foreground: "#64748b", // slate-500
        },
        accent: {
          DEFAULT: "#f1f5f9", // slate-100
          foreground: "#0f172a", // slate-900
        },
      },
    },
  },
  plugins: [],
}
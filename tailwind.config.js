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
          blue: '#1e3a8a',
          dark: '#0f172a',
          light: '#3b82f6',
        },
        accent: {
          green: '#10b981',
          light: '#34d399',
        },
      },
    },
  },
  plugins: [],
}


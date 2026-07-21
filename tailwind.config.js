/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        blue: {
          600: '#2563eb',
        },
        purple: {
          600: '#9333ea',
        },
        pink: {
          600: '#ec4899',
        },
      },
      backdropBlur: {
        xl: '20px',
      },
    },
  },
  plugins: [],
}

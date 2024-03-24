/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Langar"', 'system-ui']
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-animated')],
}
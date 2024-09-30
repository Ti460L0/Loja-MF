/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster'],
      },
      colors: {
        gold: '#cea42e',
        lightGold: '#e4d494',
        brown: '#79472a',
        lightBrown: '#a98753',
        beige: '#d0c6b0',
        black: '#000000',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}

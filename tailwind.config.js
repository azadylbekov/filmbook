/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'green': '#20BC7A',
      'hover-green': '#118c58',
      'dark-green': '#0C2E37'
    },
    fontFamily: {
      poppins: ['Poppins', 'Roboto'],
    },
  },
  plugins: [
  ],
}

// 416346
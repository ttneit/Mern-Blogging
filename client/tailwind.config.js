/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        header: [ 'sans-serif'],
        body: [ 'serif'],
        nav: ['Open Sans', 'sans-serif'],
        footer: ['Lato', 'sans-serif'],
        blockquote: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [flowbite.plugin(),require('tailwind-scrollbar'),],
}


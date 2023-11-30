/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#FFFFFF',
        'secondary': '#303030',
        'button-primary': '#424242',
        'button-hover': '#889093',
        'dropdown': '#4A4A4A',
        'table-header': '#424242'
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    },   
  },
  plugins: [],
}

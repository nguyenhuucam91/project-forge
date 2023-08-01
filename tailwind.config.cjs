/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#6DAEC8',
        secondaryColor: '#E6F7FF',
        grayColor: '#EBECF0'
      }
    }
  },
  plugins: []
}

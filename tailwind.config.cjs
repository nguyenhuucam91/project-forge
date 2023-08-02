/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#6DAEC8',
        secondaryColor: '#E6F7FF',
        blueColor: '#206bc4',
        grayColor: '#EBECF0'
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
}

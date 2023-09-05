/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grayColor: '#EBECF0',
        text_primary: '#101828',
        text_secondary: '#667085',
        primary: {
          50: '#e2f6ff',
          100: '#b4e6ff',
          200: '#83d6ff',
          300: '#50c6ff',
          400: '#2bb9ff',
          500: '#16acff',
          600: '#189ef4',
          700: '#1a8bdf',
          800: '#187acb',
          900: '#1859a8'
        }
      },
      screens: {
        md2: '920px'
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
}

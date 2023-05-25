/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'false',
  theme: {
    extend: {
      colors: {
        'pantone-3005': '#0071C5',
        'custom-blue': '#0072E5',
        myBlue: {
          50: '#F0F7FF',
          100: '#C2E0FF',
          200: '#80BFFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007FFF',
          600: '#0072E5',
          700: '#0059B2',
          800: '#004C99',
          900: '#003A75',
        }
      },
    },
  },
  plugins: [],
}


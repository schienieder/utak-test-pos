/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        custom: '80px minmax(0, 1fr) 300px',
      },
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
      },
    },
  },
};

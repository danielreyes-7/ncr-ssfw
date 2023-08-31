/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#33c237',
          foreground: '#ebeceb',
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}'],
  darkMode: 'class', // allows toggling dark mode manually
  theme: {
    // Global consistent corner radius: all rounded-* utilities resolve to 4px.
    borderRadius: {
      DEFAULT: '4px',
      none: '0',
      sm: '4px',
      md: '4px',
      lg: '4px',
      xl: '4px',
      '2xl': '4px',
      '3xl': '4px',
      full: '9999px',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

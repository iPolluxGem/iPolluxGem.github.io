/** @type {import('tailwindcss').Config} */
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
        sans: [
          "LXGW 975 Yuan SC",
          "Noto Sans SC",
          "Noto Sans",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        serif: [
          "WenJin Mincho",
          "Noto Serif SC",
          "Noto Serif",
          "Songti SC",
          "SimSun",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        side: [
          "LXGW 975 Yuan SC",
          "Noto Sans SC",
          "Noto Sans",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        system: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "PingFang SC",
          "Microsoft YaHei",
          "Helvetica Neue",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Noto Color Emoji",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

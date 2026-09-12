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
      /* ── 主题色板 ─────────────────────────────────────────────────────
         值与 src/styles/variables.styl 的 CSS 变量一一对应：改颜色只改那里。
         text-green        主题绿 --primary（亮/暗同值）
                           ① 黑/灰文字 hover 高亮：text-75 hover:text-green
                           ② 本来就是绿字的地方（当前项、箭头图标、年份圆环）：text-green
         text-green-deep   绿字再 hover 的强调色 --accent-hover（亮 #376d4d / 暗 #ddeee4）
                           正文/授权块链接、分页页码与箭头、返回顶部：hover:text-green-deep
         注意：这里覆盖了 Tailwind 默认的 green 调色板（green-500 等不再可用，本项目未使用）。*/
      colors: {
        green: 'var(--primary)',
        'green-deep': 'var(--accent-hover)',
      },
      fontFamily: {
        sans: [
          '"LXGW 975 Yuan SC"', // 名字里含数字，必须带引号，否则整条 font-family 声明会被浏览器丢弃
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
          '"LXGW 975 Yuan SC"', // 同上
          "Noto Sans SC",
          "Noto Sans",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        kai: [
          "LXGW WenKai",
          "Kaiti SC",
          "KaiTi",
          "STKaiti",
          "serif",
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

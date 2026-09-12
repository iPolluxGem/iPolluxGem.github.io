import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import swup from '@swup/astro'
import Compress from 'astro-compress'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import rehypeComponents from 'rehype-components' /* Render the custom directive content */
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive' /* Handle directives */
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives'
import remarkMath from 'remark-math'
import remarkSectionize from 'remark-sectionize'
import { AdmonitionComponent } from './src/plugins/rehype-component-admonition.mjs'
import { GithubCardComponent } from './src/plugins/rehype-component-github-card.mjs'
import { parseDirectiveNode } from './src/plugins/remark-directive-rehype.js'
import { remarkExcerpt } from './src/plugins/remark-excerpt.js'
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.hanbun-hoshi.top/',
  trailingSlash: 'always',
  integrations: [
    tailwind({
      nesting: true,
    }),
    swup({
      theme: false,
      animationClass: 'transition-swup-', // see https://swup.js.org/options/#animationselector
      // the default value `transition-` cause transition delay
      // when the Tailwind class `transition-all` is used
      containers: ['main', '#toc'],
      smoothScrolling: true,
      cache: true,
      preload: true,
      accessibility: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    }),
    icon(),
    svelte(),
    sitemap(),
    Compress({
      CSS: false,
      Image: false,
      Action: {
        Passed: async () => true, // https://github.com/PlayForm/Compress/issues/376
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      // ── 代码块明暗双主题 ─────────────────────────────────────────
      // 亮色用 github-light、暗色用 github-dark（都是 Shiki 内置主题，零额外依赖）。
      // defaultColor: false 让 Shiki 不再写死内联颜色，改为在 pre 与每个 token 上输出
      // --shiki-light / --shiki-dark 变量，由 markdown.css 按当前状态取用。
      // 状态有三种：跟随站点主题（默认）/ 强制亮色 / 强制暗色；后两者由代码块右上角的
      // 按钮切换（忽略站点主题），样式见 markdown.css 的「代码块明暗双主题」。
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
    remarkPlugins: [
      remarkMath,
      remarkReadingTime,
      remarkExcerpt,
      remarkGithubAdmonitionsToDirectives,
      remarkDirective,
      remarkSectionize,
      parseDirectiveNode,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeComponents,
        {
          components: {
            github: GithubCardComponent,
            note: (x, y) => AdmonitionComponent(x, y, 'note'),
            tip: (x, y) => AdmonitionComponent(x, y, 'tip'),
            important: (x, y) => AdmonitionComponent(x, y, 'important'),
            caution: (x, y) => AdmonitionComponent(x, y, 'caution'),
            warning: (x, y) => AdmonitionComponent(x, y, 'warning'),
          },
        },
      ],
    ],
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // temporarily suppress this warning
          if (
            warning.message.includes('is dynamically imported by') &&
            warning.message.includes('but also statically imported by')
          ) {
            return
          }
          warn(warning)
        },
      },
    },
  },
  redirects: {
    '/2025/01/04/weekly-y25w1/': '/posts/weekly-y25w1/',
    '/2024/12/29/new-pc/': '/posts/new-pc/',
    '/2024/12/07/back-here/': '/posts/back-here/',
    '/2024/09/30/quit_job/': '/posts/quit_job/',
    '/2024/09/23/nichijou_ending_songs/': '/posts/nichijou_ending_songs/',
    '/2024/09/21/fix_fav/': '/posts/fix_fav/',
    '/2024/09/19/internet_yamero/': '/posts/internet_yamero/',
    '/2024/09/16/self-reflection/': '/posts/self-reflection/',
    '/2024/09/15/night_write/': '/posts/night_write/',
    '/2024/08/10/rime_color_scheme/': '/posts/rime_color_scheme/',
    '/2024/01/31/reading_2024_01/': '/posts/reading_2024_01/',
    '/2023/12/29/my_2023/': '/posts/my_2023/',
    '/archives/': '/archive/',
  },
})

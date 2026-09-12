import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: '半分星',
  subtitle: '其出弥远，其知弥少',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW'
  themeColor: {
    hue: 157,         // Background & neutral tint hue, matches the accent color #009e61 (green)
    fixed: true,      // Theme color picker removed; accent color fixed to #009e61
  },
  toc: {
    enable: true,           // Display the table of contents on the right side of the post
    depth: 2                // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [    // Leave this array empty to use the default favicon
    {
     src: '/favicon/favicon.jpg',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    LinkPreset.Friends,
  ],
}

export const profileConfig: ProfileConfig = {
  name: '半分星',
  bio: "Roads? Where we're going we don't need roads.",
  links: [
    {
      name: 'mail',
      icon: 'material-symbols:stacked-email-rounded',       // Visit https://icones.js.org/ for icon codes. You will need to install the corresponding icon set if it's not already included. `pnpm add @iconify-json/<icon-set-name>`
      url: 'mailto:kevin.j.quan@hotmail.com',
    },
    {
      name: 'Steam',
      icon: 'fa6-brands:steam',
      url: 'https://steamcommunity.com/id/kevinpollux/',
    },
    {
      name: 'Bilibili',
      icon: 'fa6-brands:bilibili',
      url: 'https://space.bilibili.com/68327955',
    },
    {
      name: 'Douban',
      icon: 'ri:douban-fill',
      url: 'https://www.douban.com/people/hanbunhs/',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}

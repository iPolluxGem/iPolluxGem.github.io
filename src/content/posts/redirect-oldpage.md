---
title: 更换 Astro 框架后如何重定向原先的博客地址
published: 2025-01-08
tags: ['博客']
category: '瞎折腾'
draft: false
---

原先用的是 Hexo 的框架，博文的地址结构是 `.../YYYY/MM/DD/title-string`，而 Astro 的结构是 `.../posts/title-string`，这就导致之前被 Google 之类的搜索引擎抓取的页面没法正确定向，而是会显示 Github Page 的 404 页面，所以就要设置 301 重定向。

开始是在 Google Search Console 里折腾了半天，打算把原先的地址全都「移除」掉，但这个移除只有六个月有效，六个月后就可能又出现在搜索结果里，而那个移除的文档又相当对小白不友好，所以回头看 Astro 的文档，结果发现自己一直在骑驴找驴。根据文档，很快就设置好了重定向。点进老链接后会出现一个重定向页面，不过也好了，剩了很多其他的麻烦事，毕竟我也懒得自己弄 SEO（小博客而已，搞什么 SEO）。

具体操作如下：
在博客根目录的 astro.config.mjs 文件中结尾，新增（推荐用 Visual Studio Code，可以成对标记花括号，防止放错位置）：

```javascript
export default defineConfig({
  redirects: {    // New
  '' : '',
  },    // New
}
```

在 `'' : '',` 里的第一对引号里填旧地址，在第二对引号里填新地址，注意删去相同的部分，只保留不同的部分。以这篇博客为例，就应该是：

```javascript
export default defineConfig({
  redirects: {    // New
  '/2025/01/08/redirect-oldpage/' : '/posts/redirect-oldpage/',
  },    // New
}
```

注意这里如果你要输入很多行的话，最好装上 VS Code 的 Astro 插件，这样输完一行，回车后，只要输入前半部分，VS Code 就会自动帮你预测后半部分，直接 Tab 就可以了。
就这么简单，虽然实际跳转的时候不太美观，但至少可以正常跳转了，比较省心。

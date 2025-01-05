---
title: 迁移到 Astro
published: 2025-01-05
tags: ['博客']
category: '瞎折腾'
draft: false
---

其实这种文章没什么意义……但总感觉还是需要写一下。总之就是，迁移到了 Astro 为基础的 Fuwari 主题。这俩的链接都在博客页面 [footer](#copyright-year) 里。
其实以外的简单，但是把部署过程放在 Github 上 Github Action 自己进行总有点不安全感。本地侧的操作倒还好，都是固定的生成-预览操作。部署也是 Github Desktop 全都包揽。其实早该完成，拖延到晚上主要是因为最开始没有特别理解这个过程，导致 clone 了好几个没必要的 repo。
大概整理一下，实际流程如下（只以 Github Page + 已有自己域名为例）：

- （如果有的话）备份一份（clone 到本地）原先的 userid.github.io 的仓库，然后删除。方便后面迁移文章，以及翻车了可以及时改回去。
- Fork 主题的 repo。fork 的时候不要 fork 一个同名的，直接选以模板创建，然后把名称直接改成 userid.github.io。
- 在本地 clone 刚刚 fork 出来的 repo。如果你和我一样是在本地有一个叫 Blog 的文件夹来存博客文件，clone 的时候为了防止报错，要么你懂 git，git 的时候把深度改一下；如果是用 Github Desktop，直接在 clone 的页面里，把 clone 地址设置成你想要的地址（不要提前新建文件夹，clone 的时候会自动建的），比如 E:\Blog，然后 clone 就行了。
- 然后按照主题的说明运行命令，下载依赖、改配置文件、替换博客文章、改文件头。改的时候不要漏了结尾的逗号，tag 和 category 可以用中文，但要加单引号。如果配置文件里博客名称、简介之类的用了把 straight single quote 当撇号的英文，则需要用双引号把整段包起来。
- 然后打开命令行，`pupm build`，如果报错，而且你确认没有问题，就关了重新来一次，可能就好了。然后 `pupm preview`，要是预览显示正常就基本成功了。
- 把仓库 push 到 github 上，然后打开 astro 的官方 Github 配置指南。
- 按照页面里说的进行，具体就是（这里的个别步骤，比如新建 CNAME 和在设置里添加域名，都是我确实弄了，但不确定是不是必要的步骤）
  - 第一步：在 public 里新建一个 CNAME 文件，指向你自己的域名。注意这里的 public 和 Hexo 的 `/public` 目录完全不同，如果之前你用 Hexo 别下意识弄混了。Astro 在 build 之后生成的目录是 `/dist`，但不能像 Hexo 那样只在 repo 里放这一个文件夹。如果你完全不需要 CSS 那另说。
  - 第二步：在 repo 页面的设置里，把 source 改成 Github Action，然后在他给的里面搜索 “astro”，然后选 “config”
  - 第三步：在新打开的页面里，把文件名改成 deploy，扩展名不动
  - 第四步：把官方指南上的那段代码整个复制进去，然后右上角 Commit
  - 第五步：在 repo 设置里的 Page 选项卡（侧栏第二组最后一个）里，把域名添加上去。不带 https
  - 第六步：在 repo 页的 Action 选项卡里的左边，选 Deploy to Github Pages。等到完成
- 打开自己域名，正常的话就正常了。

就是这样。其实还挺省事的。以后更新文章之后，`pnpm build`，然后 `pnpm preview` 预览看下效果，没问题的话就可以 push 了，一般设置完 Action 之后，你 push 了就会自动跑流程开始部署。看好了就检查下页面，没问题就行。

---
title: Tailwind CSS v3.3 为我们带来了哪些惊喜？
link: tailwind-update-v3-3
catalog: true
date: 2023-04-05 19:44:00 
lang: cn
tags:
- 前端
- Tailwind
- CSS
categories:
- [笔记, 前端]
---

工作中同事突然群里提了一嘴：Tailwind v3.3这个新特性不错欸，行高字号终于可以写一个类了，于是摸鱼看了下 Tailwind 更新，不说废话，直接上总结~

[Tailwind CSS v3.3](https://tailwindcss.com/blog/tailwindcss-v3-3) 于 2023 年 3 月 28 日发布了，这是一个非常棒的版本，它为我们带来了许多新的特性和改进，让我们的开发更加高效和灵活。在本文中，将介绍一些最令人兴奋的新功能，包括：

1. [用于深色的扩展调色板](https://tailwindcss.com/blog/tailwindcss-v3-3#extended-color-palette-for-darker-darks)：为扩展的颜色调色板，为每种颜色增加了更深的 950 色阶，现在有11种色调，eg： `bg-slate-950`

    ![image](https://x.cosine.ren/_next/image?url=https%3A%2F%2Fipfs.4everland.xyz%2Fipfs%2Fbafkreielweltorekhrbei6domwmzn6gvk6jzjdv436eudm2k7wptgplcza&w=3840&q=75)

2. [ESM 和 TypeScript 支持](https://tailwindcss.com/blog/tailwindcss-v3-3#esm-and-typescript-support)：支持 ESM 和 TypeScript 配置文件，让你可以用现代的语法和类型检查来配置 Tailwind CSS。

3. [微调渐变颜色停止位置](https://tailwindcss.com/blog/tailwindcss-v3-3#fine-tune-gradient-color-stop-positions) ：让你可以精确地控制渐变效果，可以准确指定渐变颜色中每个色标的位置。如 `from-5%`、`via-35%` 和 `to-85%`
    ![image](https://x.cosine.ren/_next/image?url=https%3A%2F%2Fipfs.4everland.xyz%2Fipfs%2Fbafkreih3sqnpjd57nxxzbg6a7goe546gt5pycaanaohsoolbknugssqs5u&w=3840&q=75)

4. [开箱即用的 Line-clamp](https://tailwindcss.com/blog/tailwindcss-v3-3#line-clamp-out-of-the-box) ：无需插件即可截断多行文本，如 `line-clamp-3`。
    > 我们在两年多前发布了我们的官方 line-clamp 插件，尽管它使用了一堆奇怪的已弃用的 -webkit-* 东西，但它适用于所有浏览器，而且它将永远有效，所以我们决定将它整合到框架中本身。

5. [🌟字体大小及行高简写](https://tailwindcss.com/blog/tailwindcss-v3-3#new-line-height-shorthand-for-font-size-utilities) ：这个很有用，可以使用一个类设置字体大小和行高（不在预设中时），如 `text-lg/7`、 `text-sm/[17px]` 、 `text-[20px]/[24px]`
    ![image](https://x.cosine.ren/_next/image?url=https%3A%2F%2Fipfs.4everland.xyz%2Fipfs%2Fbafkreidwfwf7e7c2ch4acqgp6ajgs6hk6jrznddejcttwl4mq3ulc4rrbi&w=3840&q=75)

6. [🌟CSS 变量的简写语法](https://tailwindcss.com/blog/tailwindcss-v3-3#css-variables-without-the-var)：支持 CSS 变量的简写语法，让你可以用任意值而不需要 var() 函数，使用如下：
**before**:  `bg-[var(--brand-color)]`
**after**: `bg-[--brand-color]`

7. [可配置的 font-variation-settings](https://tailwindcss.com/blog/tailwindcss-v3-3#configure-font-variation-settings-for-custom-font-families)：支持配置 font-variation-settings，让你可以直接使用 font-* 工具类来设置字体变化

8. [🌟新的 list-style-image 实用类](https://tailwindcss.com/blog/tailwindcss-v3-3#new-list-style-image-utilities) ：这个也很有用，想使用图片作为您的列表项标记吗？那么现在可以使用新的 `list-image-*` 实用程序。eg：  `list-image-[url(carrot.png)]`
    ![image](https://x.cosine.ren/_next/image?url=https%3A%2F%2Fipfs.4everland.xyz%2Fipfs%2Fbafkreidqys3lkalcynkpr2wrm2opf4od6p5fhtlqqmtx4dqjevxuwg5kra&w=3840&q=75)

9. [🌟新的 hyphens 实用类](https://tailwindcss.com/blog/tailwindcss-v3-3#new-hyphens-utilities)：用于微调断字行为。
    听说过 &shy; HTML 实体吗？在添加对这些 hyphens-* 实用类的支持之前，我们也没听说。
    使用 hyphens-manual 和仔细放置的 &shy; ，您可以告诉浏览器在需要跨多行分隔单词时在何处插入连字符。

10. [🌟新的 caption-side 实用类](https://tailwindcss.com/blog/tailwindcss-v3-3#new-caption-side-utilities)：用于控制表格内标题元素对齐的实用类，可以给表格添加标题并设置位置。详见 [Caption Side
](https://tailwindcss.com/docs/caption-side)
    - `caption-bottom` 将标题元素定位在表格的顶部
    - `caption-bottom` 将标题元素定位在表格的底部。

以上这些只是一部分最亮眼的新特性，如果你想了解更多的细节和改进，请查看完整的[发布说明](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.3.0)。如果你想尽快升级到 v3.3 版本，只需要从 npm 安装最新的 tailwindcss 包即可：

```bash
npm install -D tailwindcss@latest
```

你也可以在 [Tailwind Play](https://play.tailwindcss.com/) 上在线体验所有的新特性。

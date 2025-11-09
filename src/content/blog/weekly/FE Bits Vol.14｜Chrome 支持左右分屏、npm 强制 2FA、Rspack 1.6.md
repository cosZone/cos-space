---
title: FE Bits Vol.14｜Chrome 支持左右分屏、npm 强制 2FA、Rspack 1.6
description: 本期聚焦 Chrome 分屏实验、Rspack 1.6 性能与输出优化与 npm Token 安全收紧，精选动效与排版实践（text-wrap、纯 CSS 交错、View Transitions）及深度好文（JS Source Map、sticky/剪贴板），并带来 Storybook 10、htmx 4.0、React Email 5 等工具更新与 CodePen 灵感。
link: weekly-14
catalog: true
lang: cn
date: 2025-11-09 20:40:00
tags:
  - 前端
  - JavaScript
  - CSS
categories:
  - 周刊
---

> 本周刊更新时间期望是在每周天，网站在建设中……
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。
> QQ 讨论小群 598022684，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 11 月 9 日，星期天。

今天去华南植物园看了看，大意了，没带驱蚊水被蚊子咬死了

![](https://r2.cosine.ren/i/2025/11/a50eb805cd18b39c53c0fdb0f7e041c1.webp)
![](https://r2.cosine.ren/i/2025/11/5cb8eb023e770eeffa6ee05bf06f86ff.webp)
![](https://r2.cosine.ren/i/2025/11/3ef571f8fe46fcf69df7ea3867fda38b.webp)

## 生态与社区动态

- [Chrome supports split views (behind a flag)](https://www.stefanjudis.com/blog/chrome-split-views/)：Chrome 也终于能左右分屏啦，打开实验性功能 `chrome://flags#side-by-side` 就能体验新功能。

- [Announcing Rspack 1.6](https://rspack.rs/blog/announcing-1-6)：Rspack 1.6 在 tree-shaking、ESM 输出优化、懒加载、JSX 保留、Source Map 处理等方面都有重大改进。

- [npm 安全更新：classic token 创建将被禁用与 granular token 的更改](https://github.blog/changelog/2025-11-05-npm-security-update-classic-token-creation-disabled-and-granular-token-changes/)：自 2025 年 11 月 5 日起，npm 将正式禁用新建经典 (classic) token，并强化细化 (granular) token 的安全策略，包括强制启用双重验证 (2FA) 及限定有效期为 90 天。现存的经典 token 将在 11 月 19 日彻底失效，原定于 2026 年 2 月 3 日之后到期的现有 token 已调整为在该日期到期。

## 文章与视频

- [OpenSpec 使用心得](https://4ark.me/posts/2025-11-04-openspec/)：一篇很好的 AI 辅助开发实践总结，安利了[OpenSpec](https://github.com/Fission-AI/OpenSpec) 感觉挺不错的～「规范驱动的团队协作」

- [Sstacking 工作流](https://www.stacking.dev/)：本文介绍了一种名为 “Stacking” 的开发工作流，通过将大型改动拆分为多个相互依赖的、小而独立的 PR，实现并行开发与评审。这篇其实是之前的看到的文章里看到的，觉得有用，Mark 一下。

- [Web 动画性能层列表 - Motion Blog](https://motion.dev/blog/web-animation-performance-tier-list)：作者用一份分级榜单，讲明哪些网页动画方式最流畅、哪些最耗性能，从浏览器渲染管线的底层原理出发，给出实践经验。

- [为什么 TypeScript 救不了你](https://cekrem.github.io/posts/why-typescript-wont-save-you/)：这篇文章提醒我们，TypeScript 让你感觉安全，但那并不意味着你的代码真的安全。

- [剪贴板 API：我们是如何走到这一步的？](https://cekrem.github.io/posts/clipboard-api-how-hard-can-it-be/)：作者本想简单实现“复制到剪贴板”，结果掉进了浏览器兼容性的大坑，一路吐槽、反思到 Web 平台复杂性的根源。

  > 对开发者而言，重要的不只是解决问题，而是理解复杂系统背后的现实与妥协。

- [“最讨厌”的 CSS 特性：tan()](https://css-tricks.com/the-most-hated-css-feature-tan/)：作者用轻松的方式聊了聊 CSS 里被误解的三角函数 `tan()`，展示它其实超有用。

- [The Weird Parts of position: sticky](https://frontendmasters.com/blog/the-weird-parts-of-position-sticky)：一篇深入剖析 `position: sticky` 在实际开发中为何“失灵”的技术文章，帮你搞懂它那些令人抓狂的常见失效原因。

- [pathLength 使 SVG 路径动画更容易管理](https://www.stefanjudis.com/today-i-learned/pathlength-makes-makes-svg-path-animations-easier-to-manage/)：用 pathLength 属性轻松搞定 SVG 路径动画，不再为计算路径长度烦恼。

- [JavaScript Source Map 的内部工作原理](https://www.polarsignals.com/blog/posts/2025/11/04/javascript-source-maps-internals)：硬核好文，还是很棒的交互式，带你深入了解 Source Map 背后的结构与编码秘密，让调试压缩后的 JS 不再黑盒。

- [利用小屏幕发挥创意](https://css-tricks.com/getting-creative-with-small-screens/)：展示了如何运用 CSS 工具如 `@container queries`、`CSS Grid`、`Scroll Snap` 与 `shape-outside`，创造富有节奏和层次的小屏幕布局。核心思想是不要让响应式设计变成“折叠”，而要让设计随设备与姿态（orientation）而“适应”，让视觉叙事在任何尺寸下保持鲜活。

## CSS 新特性

- [什么时候使用 CSS text-wrap: balance 和 text-wrap: pretty](https://blog.logrocket.com/css-text-wrap-balance-vs-text-wrap-pretty/)：介绍了 text-wrap 在浏览器支持成熟后的两种热门用法 balance 和 pretty ，以及他们应该在什么时候使用。

  > balance 通过调整行长平衡视觉比例，提升排版对称性，小段文本（标题、卡片内容）适合 balance。
  > pretty 避免“孤字行”(orphans)，平衡段落末行排版。段落性文字可尝试 pretty 以优化阅读体验。

- [Staggered Animation with CSS sibling Functions](https://frontendmasters.com/blog/staggered-animation-with-css-sibling-functions/)：介绍了 CSS 中新的 `sibling-index()` 和 `sibling-count()` 两个函数，它们让我们可以直接通过纯 CSS 计算元素在兄弟节点中的相对位置，实现无需 JavaScript 的 “交错动画（Staggered Animation）”。

- [一些实用的视图转换的例子来增强你的 UI](https://piccalil.li/blog/some-practical-examples-of-view-transitions-to-elevate-your-ui/?ref=articles-rss-feed)：用几个实用范例展示如何利用 View Transition API 让网页交互动画更顺滑。

## 工具推荐与库更新

- [sindresorhus/image-dimensions](https://github.com/sindresorhus/image-dimensions)：一个轻量工具，可在任何现代 JavaScript 环境快速获取 JPEG、PNG/APNG、GIF、WebP、AVIF 和 HEIF 图像格式的像素宽度和高度。
- [Storybook 10](https://storybook.js.org/blog/storybook-10/)：全面转向仅 ESM 模块，支持 Vitest 4。
- [htmx 4.0 Alpha](https://htmx.org/essays/the-fetchening/)：由 v2 直接跃升 v4 的架构演进。
- [React Email 5.0](https://resend.com/blog/react-email-5)：新版本带来深色模式切换与 Tailwind 4 支持。
- 其他更新：包括 Turborepo 2.6、Video.js 10、ESLint Config Inspector v1.4。

## Codepen 精选

[CSS 作用域自定义属性轨迹网格](https://codepen.io/jh3y/pen/wBMXOVz)

> 在 Jhey Tompkins 设计的这款可配置 Pen 中，将鼠标悬停在加号网格上，即可观看它们变换颜色和旋转。您还可以通过顶部的控制面板调整网格大小和主题颜色。

![](https://r2.cosine.ren/i/2025/11/3e06142e131775bee2a5af0652950f7e.gif)

[Cards path marquee CSS only](https://codepen.io/DenDionigi/pen/bNEvoMN)

> 在 DenDionigi 制作的这款现代字幕动画中，卡片淡入，过山车式循环，然后淡出。

![](https://r2.cosine.ren/i/2025/11/4d705a56f02230769c49df303be0b2fe.gif)

[Chrome：使用 @function 的 CSS 滚动](https://codepen.io/pimskie/pen/jEWKQdB)

> pimskie 用这个滚动文字特效向我们展示了“超赞”的效果。向下滚动，你会看到文字从左右两侧逐渐融合，然后查看 CSS 面板，了解实现这一效果的自定义 @function 函数。

![](https://r2.cosine.ren/i/2025/11/e89fe0f7891a319eea62562567f7cb77.gif)

## Refs

- [Codepen Spark #480](https://codepen.io/spark/480)
- [JavaScript Weekly #760](https://javascriptweekly.com/issues/760)
- [Node Weekly Issue 599: November 4, 2025](https://nodeweekly.com/issues/599)

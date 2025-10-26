---
title: FE Bits Vol.12｜Next.js 16 发布、Docusaurus 3.9 AI 搜索、ChatGPT Atlas 发布
description: 本期速览：Next.js 16 发布、ChatGPT Atlas 登场、Cloudflare Sandbox 上线；RSC 性能实测；URLPattern 入 Baseline；CSS 新特性与 ColorMate。
link: weekly-12
catalog: true
lang: cn
date: 2025-10-26 18:50:00
tags:
  - 前端
  - JavaScript
  - CSS
  - AI
categories:
  - 周刊
---

> 本周刊更新时间期望是在每周天，网站在建设中……
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。
> QQ 讨论小群 598022684，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 10 月 26 日，星期天。

这周终于闲一些了，沉迷了一阵子土豆兄弟（类吸血鬼幸存者游戏），这类游戏之前玩过通神榜，但是土豆兄弟一直没玩过。

下周就要去成都呆一周了，周五请假去九寨沟玩耍，浅浅期待一下。

## 生态与社区动态

- [Next.js 16 发布](https://nextjs.org/blog/next-16)：Next.js 16 正式版，此次更新让 Turbopack 成为默认打包器，React Compiler 支持正式稳定，并且引入了全新的 Cache Components、Next.js Devtools MCP，统一代理文件 `proxy.ts` 取代 `middleware.ts`。

- [介绍 ChatGPT Atlas](https://openai.com/index/introducing-chatgpt-atlas/)：OpenAI 推出嵌入 ChatGPT 的新一代浏览器 ChatGPT Atlas，将 ChatGPT 深度整合进网页使用场景，使 AI 能理解网页内容、保留浏览记忆、自动执行任务。用户在浏览时可直接与 ChatGPT 对话、分析网页或完成操作，无需切换应用。

- [Cloudflare Sandbox SDK](https://sandbox.cloudflare.com/)：Cloudflare 推出的安全、可扩展的云端沙盒环境，可在隔离容器中执行命令、运行服务、操作文件并生成可公开访问的 URL。（适用于 Workers 付费计划，[介绍文章](https://developers.cloudflare.com/sandbox/)）

- [Meta 发布 Docusaurus 3.9，带有新的 AI 搜索功能](https://www.infoq.com/news/2025/10/docusaurus-3-9-ai-search)：Docusaurus 3.9 发布，新版本引入 Algolia DocSearch v4 的 AI 搜索与改进的国际化配置。

## 文章与视频

- [重新思考 JavaScript 中的异步循环](https://allthingssmitty.com/2025/10/20/rethinking-async-loops-in-javascript/)：分析了在 JavaScript 中使用 `await` 在循环语句时常见的性能与语义陷阱，说明了 `for...of`、`map()`、`Promise.all()`、`Promise.allSettled()` 及第三方工具（如 `p-limit`）在不同异步并发需求下的使用场景与利弊。

- [React 服务器组件：它们真的能提高性能吗？](https://www.developerway.com/posts/react-server-components-performance)：一篇以数据为主的实证研究，比较 CSR、SSR 与 RSC 的性能优劣及实现差异。

结果显示，CSR 初次加载最慢但交互最快；SSR 可改善 LCP 但是有“无交互”的空窗期；RSC 若结合 Streaming 和 Suspense 可获得最佳平衡，但实际迁移复杂且对架构要求高。单纯引入 RSC 并不会自动带来性能提升，收益主要来自异步数据流与渲染策略的改写。

> 如果应用是客户端和服务器组件的混合体，单独的服务端组件并不能提高性能。它们无法减少足够的大小以产生可测量的性能影响。流式传输和 Suspense 才是关键。主要性能优势来自于完全重写数据获取，使其成为服务端组件优先。

- [互联网被攻破的内幕：Log4Shell 不为人知的故事](https://github.blog/open-source/inside-the-breach-that-broke-the-internet-the-untold-story-of-log4shell/)：讲述 Log4j 维护者及开源社区如何应对震撼全球互联网的 Log4Shell 漏洞事件，以及这一事件如何推动开源安全体系的重塑。（还挺有趣的）

- [How to Fix Any Bug](https://overreacted.io/how-to-fix-any-bug/)：Dan Abramov 以一个真实调试案例，阐述系统化调试思维。从找到可复现 (repro) 开始，逐步缩小问题范围直到发现根因。这是一篇少有的教你如何进行调试，解决问题的文章。

- [25 分钟了解 25 个 CSS 特性](https://frontendfoc.us/link/175928/web)：Adam Argyle 介绍包括滚动驱动动画、数值函数、自定义滚动条样式等在内的 25 个新特性，并提供演示文稿。

- [URLPattern 现在是 Baselin 可用的](https://web.dev/blog/baseline-urlpattern)：介绍了已进入 Baseline 的新浏览器功能 **URLPattern API**，它为 URL 匹配和路由提供了标准、简洁且高性能的原生解决方案。可以查阅 [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) 了解完整信息。

- [面向初学者的 Web 开发：CSS 布局——flexbox、网格、媒体查询和容器查询](https://2ality.com/2025/10/css-layout.html)：面向新手的 CSS 布局指南，系统讲解 flexbox、grid、media query 与 container query 的核心概念与实践。

- [使用 CSS if() 和 clamp() 实现更智能的流体排版](https://dropletdrift.com/smarter-fluid-typography-with-css-if-and-clamp/)：介绍如何结合 CSS `if()` 与 `clamp()` 函数，实现更智能的响应式文字排版体系。
  `clamp()` 简化了最小值、理想值与最大值的控制，而 `if()` 的引入则让样式具备条件判断能力，可根据文本类型（如标题或正文）动态调整缩放比例，从而实现更灵活、可复用且可渐进增强的字体响应方案。

## CSS 新特性

- [CSS reading-flow 和 reading-order 属性简介](https://www.zhangxinxu.com/wordpress/2025/10/css-reading-flow-order/)：对 CSS 新特性 `reading-flow` 与 `reading-order` 的深入解读，它们解决了传统 `tabindex` 在复杂布局下控制焦点顺序困难的问题。

- [Dynamic Tooltip Position with Anchor Positioning III](https://css-tip.com/tooltip-anchor-3/)：使用纯 CSS 的锚点定位新特性实现 tooltip 的自适应位置调整，是系列文章中的第三篇文章，这次考虑了角落位置。

- [closedBy=any](https://nerdy.dev/closedby-any)：介绍 HTML `<dialog>` 元素中 `closedBy="any"` 属性的用法，让对话框可通过点击外部轻松关闭。此功能已在 Chrome 和 Firefox 中实现，计 Safari 也会支持。

## 趣味项目与工具

- [ColorMate](https://colormate.site/palette-generator)：又一款面向设计师与开发者的免费在线配色工具，可快速生成符合无障碍标准的调色板。用户可提取图片配色、即时预览 UI 效果、进行对比度测试，并将结果以 HEX、CSS 或 PNG 格式导出。它还提供由 AI 命名、锁定颜色及实时生成新方案的功能，并收录多种热门配色示例。
  ![](https://r2.cosine.ren/i/2025/10/f472571f062deef6aa58bc182902e90c.webp)

## Codepen 精选

- [纯 CSS 进度环 + 地图曲率（凹面圆角）](https://codepen.io/thebabydino/pen/ogbGXoj)
  > Ana Tudor 用这种精湛的凹面圆角效果回应了 [Reddit 的请求](https://codepen.io/thebabydino/pen/ogbGXoj)，使用了 shape() 和 mask 后备方案。

![](https://r2.cosine.ren/i/2025/10/b7c191efc5a48eeb90228f3bc3510c64.webp)

- [threejs/gsap 液体形态幻灯片](https://codepen.io/filipz/pen/JoGNQzm)
  > Filip Zrnzevic 将 GSAP 和 WebGL 结合起来，实现了华丽的液体幻灯片过渡效果。点击预览并按下 "H" 键打开控制面板，尝试所有不同的效果。

![](https://r2.cosine.ren/i/2025/10/664752ee57e87cad6faa450a3c303107.gif)

## Refs

- [Node Weekly Issue 597: October 21, 2025](https://nodeweekly.com/issues/597)
- [Frontend Focus Issue 714: October 22, 2025](https://frontendfoc.us/issues/714)
- [JavaScript Weekly Issue 758: October 24, 2025](https://javascriptweekly.com/issues/758)
- [CodePen Spark #477](https://codepen.io/spark/477)
- [CodePen Spark #476](https://codepen.io/spark/476)

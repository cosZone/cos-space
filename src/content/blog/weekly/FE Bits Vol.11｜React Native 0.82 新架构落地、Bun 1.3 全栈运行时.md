---
title: FE Bits Vol.11｜React Native 0.82 新架构落地、Bun 1.3 全栈运行时
description: 本期速览：拆解 Cloudflare Workers 性能基准测试；Firefox 144 支持视图过渡；Bun 1.3；React Native 0.82 新架构；Next.js 16 Beta；Node.js 25 性能升级。
link: weekly-11
catalog: true
lang: cn
date: 2025-10-19 19:00:00
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

今天是 2025 年 10 月 19 日，星期天。

这周也在忙项目，天天在家远程办公，搬完家总算安定下来一些了，想了想感觉好久没有出去旅游了，所以买了 10 月 29 号到成都的机票，准备去成都呆一周，周末去九寨沟玩耍，希望一切顺利吧～去九寨沟是我小时候的梦想之一，想要去看看秋天的九寨沟，在最佳观赏时期看看彩林和五花海。

很有意思，以前上大学的时候，没钱没空，所以也不喜欢旅游，现在的话反而觉得能到处跑跑看看风景也挺好的，又喜欢上了旅游，今年 5 月份去云南大理旅居了一个月的感觉非常爽，所以还想多尝试尝试不同城市。

## 生态与社区动态

- [拆解 Cloudflare Workers CPU 性能基准测试](https://blog.cloudflare.com/unpacking-cloudflare-workers-cpu-performance-benchmarks/)：Cloudflare 不愧是赛博活菩萨捏，大气的，10 月 5 日 Vercel CEO 发推说 [Worker 的性能差](https://x.com/rauchg/status/1974508248687632740)，仅仅一周，Cloudflare 就承认错误并修复，发了这篇分析文章，甚至还在某些情况下帮助 Vercel 加速了。

- [Firefox 144 发布](https://www.firefox.com/en-US/firefox/144.0/releasenotes/)，支持了 View Transitions API Level 1，现在所有主流浏览器现在都支持视图过渡。

  > MDN 发布了一个适合初学者的 [CSS View Transitions 入门指南](https://developer.mozilla.org/en-US/blog/view-transitions-beginner-guide/)，帮助开发者理解视图过渡动画的基础概念。

- [Bun 1.3](https://bun.com/blog/bun-v1.3)：以「全栈运行时」为核心定位的最大版本更新，Bun 1.3 意图将 Bun 打造成一个包含所有功能的全栈 JavaScript 运行时。

- [React Native 0.82](https://reactnative.dev/blog/2025/10/08/react-native-0.82)：正式成为首个完全基于“新架构 (New Architecture)”运行的版本，标志着旧架构时代的结束。该版本引入实验性的 Hermes V1 引擎，默认集成 React 19.1.1，并增加 DOM Node APIs 支持，使原生组件可用 DOM 风格方法访问。

- [Next.js 16 (beta)](https://nextjs.org/blog/next-16-beta)：Next.js 16 测试版发布，全面引入稳定版 Turbopack、改进缓存系统与路由架构，并支持 React Compiler 与 React 19.2 特性、改进默认配置、移除旧实验功能。

- [Node.js v25.0.0 发布](https://nodejs.org/en/blog/release/v25.0.0)：将 V8 升级到 14.1，带来了主要的性能提升，内置了 base64/hex 转换，以及持续进行的 WebAssembly 和 JIT 管道优化。默认启用 Web Storage、新增 `--allow-net` 权限参数、改进 `JSON.stringify` 性能。

## 文章与视频

- [如何优化移动设备的视口以实现更快的交互](https://www.debugbear.com/blog/optimize-viewport-for-mobile)：讲解如何优化移动端视口 (viewport) 以减少点击延迟、提升交互速度与性能，并以 Qatar Airways 官网为反例分析常见误区。

- [50 Reasons to Build a Website](https://frontendmasters.com/blog/50-reasons-to-build-a-website/)：以 50 个生活化的理由，回答 “为什么在 2025 年仍然要建网站” 这个问题，我喜欢这些理由。

  > 「你的乐队需要有一个网站，这是肯定的」
  > 「你刚开始接触观鸟，你想要一个网站来发布你看到的酷鸟」
  > 「你认为网络技术可以像油画和画布一样，成为艺术家的工具。你制作网站就像画家作画一样」

- [Why typeof null === object](https://pzarycki.com/en/posts/js-null/)：特别深入的解析，解释为什么在 JavaScript 中 `typeof null` 会返回 `object`，作者复原了早期 C 语言实现及源码宏定义，揭示 `null` 被识别为对象的根本原因是早期 32 位系统的对齐与标记约定。尽管这一问题可轻易修复，但考虑到巨大的兼容性影响，标准委员会选择保留这一行为，使它成为语言历史上的经典遗产。

- [HTML 最鲜为人知的秘密：output 标签](https://denodell.com/blog/html-best-kept-secret-output-tag)：介绍了 HTML 中一个鲜为人知但功能强大的 <output> 标签，它能在网页上自然地显示计算或用户操作结果，并具备天然的无障碍（Accessibility）支持，但却一直被忽略。

- [URL 设计中隐藏的成本](https://alfy.blog/2025/10/16/hidden-cost-of-url-design.html)：作者回顾在为客户构建电商平台时，以“简洁扁平 (flat)”的 URL 结构取代分层路径的决策，虽然提升了用户体验，却带来了后端性能下降与运维成本上升。

> 当我们为客户设计一个电子商务平台时，我们做出了一个看似简单、用户友好的决定：使用简洁的扁平 URL。产品位于 /nike-air-zoom ，类别位于 /shoes ，页面位于 /about-us 。没有前缀，没有 /product/ 或 /category/ 的杂乱。路径简单，感觉简约。

> 这个草率做出的决定，没有经过适当的讨论，后来让我们花费了数小时进行优化。
> 问题不在于 URL 本身。问题在于我们将 URL 设计视为一个用户体验决策，而实际上它是一个具有连锁技术影响的根本性架构决策。每次对应用程序的请求都会触发两次后端 API 调用。每个爬取格式不正确的 URL 的机器人都会击中数据库两次。每个 404 错误都很昂贵。

> 本文并非探讨你已读过无数次的 URL 最佳实践（保持 URL 简短、避免特殊字符、使用连字符而非下划线）。它要讨论的是鲜少被提及的议题：URL 结构如何塑造整个应用程序的架构、性能特征及运营成本。

- [Web Components 的杀手级特性](https://daverupert.com/2025/10/custom-elements-manifest-killer-feature/)：深入介绍了 Custom Elements Manifest (CEM) —— Web Components 生态中一个由社区推动的 JSON 标准，用于自动化提取与共享组件 API 信息，作者认为 CEM 是“Web Components 的杀手级特性”。

- [无需 JavaScript 即可实现深色模式切换](https://www.jessestuart.ca/posts/2025-10-12-implementing-dark-mode-toggle-without-javascript/)：介绍如何仅用 CSS 与 HTML 实现一个支持系统与用户手动切换的暗色模式按钮，并可选用少量 JavaScript 增强体验。

### CSS 新特性

- [Modern CSS Round-Out Tabs](https://frontendmasters.com/blog/modern-css-round-out-tabs/)：用现代 CSS 的 shape() 函数重新实现“圆边标签页”设计，无需多余元素即可绘制复杂弧形界面。[Codepen 示例](https://codepen.io/editor/chriscoyier/pen/0199caa8-5073-7e79-8002-e30d5532a6c4)
  ![](https://r2.cosine.ren/i/2025/10/d4680c782aa542ae5bc31b7ecf0c9e45.webp)

- [动态位置的 tooltip 与锚点定位 II](https://css-tip.com/tooltip-anchor-2/)：介绍如何利用 CSS 的 anchor 定位体系使 tooltip 智能地在四个方向上自动调整位置并保持箭头指向锚点。在[上一篇文章](https://css-tip.com/tooltip-anchor/)中，创建了一个在顶部和底部之间切换位置的 tooltip。现在可以调整代码，使其在四个位置（顶部、底部、左侧和右侧）之间切换。无论工具提示位于哪个位置，都会指向锚点。

- [使用容器查询单位实现向另一侧的过渡](https://ryanmulligan.dev/blog/transition-to-the-other-side/)：通过 CSS 的容器级尺寸单位（如 `cqi` 和 `cqb`），可以让元素基于父容器动态计算移动距离，实现灵活、性能佳且语义清晰的动画效果。
  ![](https://r2.cosine.ren/i/2025/10/8f09ef6b9b8e5f5afc399b4219b96325.webp)

## 趣味项目与工具

- [olegshulyakov/llama.ui: A minimal interface for AI Companion that runs entirely in your browser.](https://github.com/olegshulyakov/llama.ui)：一款完全在浏览器中运行的基于 `llama.cpp` 的开源本地 AI 对话界面项，专注隐私、简洁与易用。它支持多模型服务（如 LM Studio、Ollama、vLLM、OpenAI 等），界面现代，支持 Markdown 渲染、LaTeX 数学公式、主题切换和会话管理。
  ![](https://r2.cosine.ren/i/2025/10/e5c47262c549892da5e3d63d97c894f3.webp)

- [rictic/jsonriver](https://github.com/rictic/jsonriver)：一个基于 JavaScript 标准特性的轻量高速流式 JSON 解析器，可实时按数据流逐步生成完整值。

- [weijunext/ogimage-click](https://github.com/weijunext/ogimage-click)：又一个快速生成精美的 Open Graph 图片的开源在线工具，支持实时预览与多种导出格式。
  ![](https://r2.cosine.ren/i/2025/10/3b3d2c395570636c80c5e60eae4f8540.webp)

### Codepen 精选

- [Pure CSS angled columns layout options](https://codepen.io/thebabydino/pen/WbrjrZM)：Ana Tudor 展示三种 CSS 斜列布局技术，两种基于 `clip-path`，第三种使用 `transform: skew`，并以清晰注释说明，第三种方法倾斜容器，然后反向倾斜图片。
  ![](https://r2.cosine.ren/i/2025/10/4e79fab6d8764fc3c5e518b073ad2b0b.webp)

- [Juicy](https://codepen.io/atzedent/pen/jEWmNOd)：Matthias Hurrle 的又一次关于次表面散射（subsurface scattering）的实验，模拟水果糖果风格的魔方。
  ![](https://r2.cosine.ren/i/2025/10/41fbb8b791bfcc4471a4583ce6808260.webp)

- [404 Error Face](https://codepen.io/jkantner/pen/YPwZWoy)：Jon Kantner 基于 [Camo Creative 的设计](https://dribbble.com/shots/25810110-ERROR-404)，将 404 错误页转为循环动画，用趣味视觉缓解用户体验挫败感。

![](https://r2.cosine.ren/i/2025/10/939a6d463f3f189136131779d1f44a81.gif)

## Refs

- [CodePen Spark #473 Sad 404s, Juicy WebGL, and a Halftone Reveal](https://codepen.io/spark/473)
- [JavaScript Weekly Issue 757: October 17, 2025](https://javascriptweekly.com/issues/757)
- [React Status Issue 448: October 15, 2025](https://react.statuscode.com/issues/448)
- [Frontend Focus Issue 713: October 15, 2025](https://frontendfoc.us/issues/713)

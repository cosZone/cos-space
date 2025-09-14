---
title: FE Bits Vol.7｜chalk 和 debug 等 npm 包安全警告；Remotion 赞助 Mediabunny
description: Remotion 停止自研转赞助 Mediabunny；npm 作者 Qix 与 DuckDB 团队相继账号被黑，多个热门包被注入恶意代码，引发供应链安全危机。文章方面涵盖字体特性、React Native 新架构迁移、ES2023 安全数组方法、Rust 构建的 JS 运行时 Andromeda、CSS 折射与色彩动态技巧等。趣味工具包括 SVG Path 编辑器、动画优先的 ForgeUI、图像对比库 BlazeDiff 等。Deno 2.5 版本更新权限管理。
link: weekly-7
catalog: true
lang: cn
date: 2025-09-14 17:25:00
tags:
  - 前端
  - JavaScript
  - CSS
categories:
  - 周刊
---

> 本周刊更新时间期望是在每周天，网站在建设中……\
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。\
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。\
> QQ 讨论小群 598022684，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～\
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 9 月 14 日，星期日。

这几天一直很消沉，没来由的难过，但是还是要打起精神！情绪周期就是这么的不讲道理，但是听歌就会好很多，安利一首歌：[「雪路」- 诗岸/wukino](https://music.163.com/song?id=2701880637)

## 生态与社区动态

- [Sponsoring Mediabunny | Remotion](https://www.remotion.dev/blog/mediabunny)：Remotion 宣布停止自研 Web 多媒体库，转而赞助并协作推进 [Mediabunny](https://github.com/Vanilagy/mediabunny)，致力于打造 Web 上的开源多媒体工具链。

- [npm 作者 Qix 被邮件钓鱼，npm 账号失陷](https://socket.dev/blog/npm-author-qix-compromised-in-major-supply-chain-attack)，发布了多个恶意版本的流行包，如 chalk、debug、color 等热门包，以下是受到影响的包版本：

```plain
ansi-styles@6.2.2
debug@4.4.2
chalk@5.6.1
supports-color@10.2.1
strip-ansi@7.1.1
ansi-regex@6.2.1
wrap-ansi@9.0.1
color-convert@3.1.1
color-name@2.0.1
is-arrayish@0.3.3
slice-ansi@7.1.1
color@5.0.1
color-string@2.1.1
simple-swizzle@0.2.3
supports-hyperlinks@4.1.1
has-ansi@6.0.1
chalk-template@1.1.1
backslash@0.2.1
```

同时，DuckDB 相关包的 npm 账户 duckdb_admin 也遭到入侵，并[发布了多个恶意版本](https://socket.dev/blog/duckdb-npm-account-compromised-in-continuing-supply-chain-attack)。注入的代码与 Qix 攻击中使用的钱包吸金恶意软件相同。

```plain
duckdb@1.3.3 – ~14.9万次每周下载量。（发布于2025-09-09 01:13:07 UTC）
@duckdb/duckdb-wasm@1.29.2 – ~65k 每周下载量。（发布于 2025-09-09 01:11:47 UTC）
@duckdb/node-api@1.3.3 – 约 83k 每周下载量。(发布于 2025-09-09 01:12:15 UTC)
@duckdb/node-bindings@1.3.3 – ~72k 每周下载量。（发布于 2025-09-09 01:11:13 UTC）
```

## 文章与视频

- [你不知道的字体特性](https://sinja.io/blog/get-maximum-out-of-your-font)：是关于字体很好的文章，介绍现代字体（尤其是 OpenType 与 Variable Fonts）中鲜为人知但极其实用的特性，以及在 CSS 中调用这些功能的方法。这篇文章还推荐了一个可以玩这些可变字体的网站 [v-fonts.com](https://v-fonts.com/)

- [Migrating to React Native's New Architecture (2025)](https://shopify.engineering/react-native-new-architecture)：Shopify 分享其两大核心应用迁移至 React Native 新架构的经验与实践策略。

- [JavaScript 中的安全数组方法](https://allthingssmitty.com/2025/09/08/finally-safe-array-methods-in-javascript/)：介绍 ES2023 新增的不可变 (non-mutating) 数组方法 `toSorted()` `toReversed()` 和 `toSpliced()`，这些新方法的行为与它们的可变对应方法类似，但返回一个新数组而不是修改原始数组。

- [Andromeda](http://tryandromeda.dev/) 是一个新的由 Rust 构建的 JavaScript & TypeScript 运行时，核心由 Nova 引擎驱动，主打内存安全、零配置、GPU 硬件加速和丰富的 Web API 支持。

- [浏览器中的液态玻璃：使用 CSS 和 SVG 进行折射](https://kube.io/blog/liquid-glass-css-svg/)。超级棒的交互式教程，并且技术解析的也很全面，内含非常多 demo，把 Web Liquid Glass 玩明白了，非常值得一看。

![demo1](https://r2.cosine.ren/i/2025/09/1e4bb669975ad8b7ec4ae83b562bb4a9.webp)

本文通过物理折射原理（Snell 定律）、几何曲面函数、向量场计算以及 SVG displacement map，逐步构建出类似 Apple Liquid Glass 的玻璃折射与高光效果。作者在 Chrome 中实现了交互式演示，并展示了如何组合折射与高光生成 UI 组件。

![demo2](https://r2.cosine.ren/i/2025/09/3e5cb2c8bdf85c91e22af5f21de9d9cf.webp)

需要注意的是该方法目前仍为实验性质，仅 Chromium 支持 `backdrop-filter` 调用 `SVG filter`，且性能也堪忧，可作为 Electron 等环境下的实验性特效；非生产级实现。

- [Color Shifting in CSS](https://www.joshwcomeau.com/animation/color-shifting/)：本文通过构建粒子效果的案例，揭示了在 CSS 中实现颜色动态变化时会遇到的限制，如 RGB 插值导致灰色过渡，并提出利用 CSS filter 中的 hue-rotate() 作为更佳的解决方案。

- [You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)：讨论在 UI 设计中，动画何时有助于用户体验，何时反而适得其反。

- [How To Set Up Express 5 For Production In 2025](https://www.reactsquad.io/blog/how-to-set-up-express-5-in-2025)：一步步讲解如何在 2025 年用 TypeScript 搭建生产可用的 Express 5 应用，包括项目初始化、代码风格校验、测试驱动开发、路由设计、认证与数据库集成等内容。

- [Too many tools: How to manage frontend tool overload](https://blog.logrocket.com/frontend-tool-overload/)：探讨前端开发中工具过度繁多的问题，并告诉开发者应如何管理“工具过载”以改善开发者体验。我觉得这篇说的很好，学习 “新趋势” ≠ “立刻引入”，应基于实验和需求，而非市场营销热度。

### CSS 新特性

[通过九个新模块重新学习 CSS](https://web.dev/blog/learn-css-refresh?hl=zh-cn)：Web.dev 更新了 Learn CSS 课程，新增 9 个模块以覆盖近四年 CSS 的新特性。

- [CSS 嵌套](https://web.dev/learn/css/nesting?hl=zh-cn)
- [容器查询](https://web.dev/learn/css/container-queries?hl=zh-cn)
- [自定义属性](https://web.dev/learn/css/custom-properties?hl=zh-cn)
- [计数器](https://web.dev/learn/css/counters?hl=zh-cn)
- [光标和指针](https://web.dev/learn/css/cursors-and-pointers?hl=zh-cn)
- [锚点定位](https://web.dev/learn/css/anchor-positioning?hl=zh-cn)
- [浮层和对话框](https://web.dev/learn/css/popover-and-dialog?hl=zh-cn)
- [单页应用 (SPA) 的视图过渡](https://web.dev/learn/css/view-transitions-spas?hl=zh-cn)
- [路径、形状、剪切和遮罩](https://web.dev/learn/css/paths-shapes-clipping-masking?hl=zh-cn)

更新后的模块紧贴近几年 CSS 标准发展与浏览器支持，所有教学功能均已达到或即将进入 Baseline 状态，包括 Interop 2025 中的新特性，如锚点定位和视图转换。每个模块配有明确的浏览器支持信息，保证学习即用。

- [What Can We Actually Do With corner-shape?](https://css-tricks.com/what-can-we-actually-do-with-corner-shape/)：深入探索 `corner-shape` 在 CSS 中的潜力与实际应用案例

## 趣味项目与工具

- [Yqnn/svg-path-editor: Online editor to create and manipulate SVG paths](https://yqnn.github.io/svg-path-editor/)：一个开源的在线 SVG Path 编辑器，开发者可以直接在浏览器中创建与修改路径，支持命令面板、快捷键、路径变换、坐标切换以及 ViewBox 调整等功能。 [GitHub 地址](https://github.com/Yqnn/svg-path-editor)

- [Splidejs/splide](https://github.com/Splidejs/splide)：Splide 是一个轻量级、灵活且易于访问的滑动器和轮播(slider & carousel)库，兼具高性能与可访问性。

- [harlan-zw/mdream](https://github.com/harlan-zw/mdream)：mdream 可以将任何网站转换为干净的 markdown 和 llms.txt。提高您网站的 AI 可发现性或为您的项目生成 LLM 上下文。

- [Cosmic UI](https://www.cosmic-ui.com/) 科技感组件库？！不过感觉组件有点少，很新的组件库。

![](https://r2.cosine.ren/i/2025/09/6c0a03aafd29e0838bd1c67af6406a82.webp)

- [ForgeUI](https://github.com/AmanShakya0018/forgeui)｜[官网](https://forgeui.in/)

ForgeUI 是一个基于 React 的实验性组件库，重点在于“动画优先”的设计理念，提供动画表单、动态卡片、闪烁文字等现代化 UI 组件，旨在帮助开发者快速实现富交互界面。其技术栈包括 Next.js、TypeScript、Tailwind CSS、shadcn/ui 和 Framer Motion。项目定位更像是作者的“个人实验室”，供开发者参考与取用，而非正式社区驱动的开源产品。

![](https://r2.cosine.ren/i/2025/09/d34ffd174e909f6746840b88e2772b2b.webp)

- [Andromeda](https://tryandromeda.dev/) 是由 Nova 引擎驱动的最新 JavaScript 运行时。它使用 Rust ，拥有直接 GPU 加速图形支持、单文件编译和内存安全功能。

- [BlazeDiff](https://github.com/teimurjan/blazediff)：一个高性能、像素级精准的 JavaScript 图像对比库，比 [pixelmatch](https://github.com/mapbox/pixelmatch) 快约 1.5 倍，且保持相同的精度和输出质量。

- 太美了！诗人 David Whyte 的官网，以 WebGL 呈现水彩画般的互动质感，创造独特的艺术体验。
  - 介绍文章：https://webgl.souhonzan.org/entry/?v=3004
  - 网站地址：https://davidwhyte.com/experience/
    ![](https://r2.cosine.ren/i/2025/09/4dc928fd490b5d77c9b2e79e550f967c.webp)

## 库更新

- [Deno 2.5: Permissions in the config file](https://deno.com/blog/v2.5)：Deno 2.5 带来配置文件权限集、改进测试 API、依赖管理优化和性能提升等一系列更新。

## Refs

- [Node Weekly Issue 592: September 9, 2025](https://nodeweekly.com/issues/592)：本期涵盖 Node.js 生态最新动态，包括 LavaMoat 工具、Node.js 新版本发布、性能实践案例、以及丰富的库/框架更新。
- [React Status Issue 443: September 10, 2025](https://react.statuscode.com/issues/443)：React 每周精选，涵盖 TanStack DB、WorkOS RBAC、Storybook 10、React Norway 2026、大量工具更新与 JavaScript 生态新闻。
- [Frontend Focus Issue 708: September 11, 2025](https://frontendfoc.us/issues/708)：前端资讯简报，涵盖 CSS 技术探索、Web 工具动态及业界新闻

## 晒手办

本周去年买的 GSC 的芙莉莲到了！神！面雕也很好看，后面就应该没什么手办要买了～

![](https://r2.cosine.ren/i/2025/09/6c88e32260931810448be3d82ffe2f4e.webp)

![](https://r2.cosine.ren/i/2025/09/51ad28bf00e83e8d31350ebd22adf2e7.webp)

![](https://r2.cosine.ren/i/2025/09/1c782f9b1d49e53de41a00a99d8109f2.webp)

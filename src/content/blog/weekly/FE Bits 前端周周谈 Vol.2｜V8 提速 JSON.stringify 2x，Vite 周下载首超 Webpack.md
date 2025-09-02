---
title: FE Bits 前端周周谈 Vol.2｜V8 提速 JSON.stringify 2x，Vite 周下载首超 Webpack
description: 本期周刊聚焦生态与社区动态，亮点包括 V8 引擎提升 JSON.stringify 性能两倍，Vite npm 周下载量首超 Webpack，Vite 生态如 Rolldown 启动提速和 Oxlint 类型检查进展。内容涵盖 npm、Deno 社区新闻、新发布 CSS 特性、深度文章（如 Tree Shaking、RAG、字符编码）及 AwesomeIndex、Kibo UI 等工具库更新。
link: weekly-2
catalog: true
lang: cn
date: 2025-08-10 04:20:00
tags:
  - 前端
  - JavaScript
  - NodeJS
  - 工程化
  - CSS
  - AI
categories:
  - 周刊
---

大家好，今天是 2025 年 8 月 10 日，星期日。

本周末我去参加了深圳的疯狂星期六，很有意思，少数派的场地非常漂亮，空调很足，而且充满了生活气息，然后听老麦讲述少数派的成长历程，了解了很多少数派的故事，大伙聊得也很开心。

![](https://r2.cosine.ren/i/2025/08/bbf6471a619f1793c47c16b134109715.webp)

![](https://r2.cosine.ren/i/2025/08/1f785ab736fb2377a32100f6c9ae1b17.webp)

![](https://r2.cosine.ren/i/2025/08/6d6f4fb51f04ddd2b8669a5fa70148d2.webp)

![](https://r2.cosine.ren/i/2025/08/503d1f924c1eab90cc92f8391580e738.webp)

我是真的觉得少数派的审美很好，网站和各种周边设计都是，非常高级～

![](https://r2.cosine.ren/i/2025/08/ff273e07dd476f82445aeb28f4b15683.webp)

下面进入正题～

# 生态与社区动态

## 社区动态

- V8 团队将 `JSON.stringify` 性能提升两倍多，预计升级到 V8 13.8（Node 24 使用 13.6）后，Node.js 性能将大幅受益（[详细解读](https://v8.dev/blog/json-stringify)）。
- npm 现支持使用 OpenID Connect (OIDC) 进行 CI/CD 自动安全发布（[官方说明](https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/)）。
- Deno 团队简析与 Oracle 的“JavaScript 商标”争端，并联名呼吁“释放 JavaScript”（[视频摘要](https://www.youtube.com/watch?v=_tGwOv3scKw)，[公开信](https://javascript.tm/)）。
- 虽然与前端不相关，但是值得提一嘴的是，OpenAI 本周宣布推出两款开放权重语言模型 gpt-oss-120b 与 gpt-oss-20b，并在 8 月 7 日推出 GPT-5，将其设为 ChatGPT 的新默认模型，向 Plus、Pro、Team 以及免费层用户分阶段推送；Pro/Team 用户能选择延时推理的 “GPT-5 Thinking Pro”
- 本周 [关于沉浸式翻译的两个疑问：泄漏隐私 && 限制第三方 API](https://www.appinn.com/immersive-translate-2-questions/)，沉浸式反应快照功能引发敏感内容被索引，以及限制第三方 API 使用风波【已撤回】引发热议。
- Cloudflare 指 Perplexity 绕过 no‑crawl 指令；Perplexity 回应称 “过度的封锁伤害所有人”。[报道](https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/)｜[回应](https://x.com/perplexity_ai/status/1952531537385456019)
- Web Platform 更新：本期偏重 Firefox 的新特性合辑，值得关注标准落地与兼容性动向。[What's new to the web platform](https://web.dev/blog/web-platform-07-2025?hl=zh-cn)

### Chrome 139 中的新功能

[New in Chrome 139](https://developer.chrome.com/blog/new-in-chrome-139?hl=en)，Chrome 139 现已推出，这篇文章分享了该版本的一些关键功能。阅读完整的  [Chrome 139 版本说明](https://developer.chrome.com/release-notes/139)

> 此版本的亮点：
>
> - 设备上的语音识别功能已加入 [Web Speech API](https://developer.chrome.com/blog/new-in-chrome-139?hl=en#on-device-web-speech-api).
> - 新增 `CSS corner shaping` 属性允许开发者自定义角的形状与曲度，超越传统的 `border-radius`。
> - 在 CSS 中尝试 [自定义函数（custom functions）](https://developer.chrome.com/blog/new-in-chrome-139?hl=en#custom-functions) 。

### ViteLand 2025 年 7 月更新摘要

[What’s New in ViteLand: July 2025 Recap](https://voidzero.dev/posts/whats-new-jul-2025)

本文梳理了 ViteLand 生态系统在 2025 年 7 月的核心进展，涵盖 Vite、Vitest、Oxc、Rolldown 等项目的重大更新。特别预告了备受期待的首届线下 ViteConf 及全新产品 Vite+，并揭示即将上映的官方纪录片亮点，详情如下。

- [7 月底 Vite 的 npm 周下载量首次超越 Webpack](https://x.com/youyuxi/status/1950234261573038444)，2025 年 7 月 22 日～ 7 月 28 日这一周，历史上首次 Vite 在 npm 上的的每周下载量超过了 Webpack 的每周下载量。

![](https://r2.cosine.ren/i/2025/08/c35c01c526268bf3f312090eb23d873e.webp)

> 5 年前，当 Vite 作为一个副业开始时，谁会想到这一点？

- Vite 7 发布，新增  `buildApp` hook，升级至  **纯 ESM 包**，要求 Node.js ≥18（因 Node.js 18 已停止维护）。
- Rolldown-Vite 新版本支持  `tsconfig`  路径解析（`resolve.tsconfigPaths`）和开箱即用的 Yarn Plug-and-Play，性能优化启动速度提升  2.1 倍，缩短 TTI（交互时间）和冷启动时间。

> 得益于一些[深入的 JavaScript 引擎优化技巧](https://github.com/rolldown/rolldown/pull/5319)，Rolldown 的启动时间减少了 2.1 倍。

- Oxlint 引入类型感知 Linting（Type-aware linting），支持  `no-floating-promise`  等规则，即将推出的第一个版本将包括两条规则，下一个版本将包括来自  `typescript-eslint`  的所有类型感知规则，无性能损耗；实验性支持  [JS 自定义规则](https://www.linkedin.com/feed/update/urn:li:activity:7352247568610783232/)（兼容 ESLint API）。
- Vitest 推出[视觉回归测试](https://github.com/vitest-dev/vitest/releases/tag/v4.0.0-beta.4)：通过浏览器模式直接对比组件截图（Beta 版支持）；
- [napi-rs 的创建者](https://github.com/Brooooooklyn) Brooklyn 加入 VoidZero 团队，NAPI-RS v3 发布。

### 有趣的动态

1. [一个分号能带来多大的不同？](https://blog.tomayac.com/2025/07/26/what-a-difference-a-semicolon-makes/)
   点击了解 JavaScript 的这个经典陷阱。作者在调试时随意插入了 `console.log(‘here’)` 语句并未加分号，位置恰好出现在 IIFE（立即执行函数）之前。缺少分号导致 JavaScript 引擎将后续的 function 代码当作 `console.log` 的参数，最终抛出 `TypeError`。

   > Mastodon 上的  Andre  让我想起了  Chris Coyier  出色的  Web 开发荣誉徽章  ，所以我现在自豪地佩戴着我的徽章：“调试了一个多小时的东西，修复实际上是一个字符”

2. [关于锚元素的 href 的冷知识](https://blog.jim-nielsen.com/2025/href-value-possibilities/)
   本文深入探讨了 HTML 锚点 `<a>` 标签中 `href` 属性的一些不常见但非常实用的值。文章不仅回顾了 `mailto:`、文本片段 (text fragments) 等已知用法，更重点介绍了一些鲜为人知的技巧，例如使用 `""`、`.` 和 `?` 对当前页面进行不同方式的重载，以及它们如何处理 URL 的查询参数和哈希。此外，文章还涵盖了 `data:` URL、媒体片段和 PDF 页面链接等。

# 文章与视频

- 📓 [Bundler Tree Shaking 原理及差异 · web-infra-dev · Discussion #28](https://github.com/orgs/web-infra-dev/discussions/28)：该文章通过对比 Webpack、esbuild、Turbopack 和 Rollup，深入剖析了主流打包工具在 Tree Shaking 实现上的原理、优化粒度及策略差异。
- 📓 [Project AIRI DevLog @ 2025.08.01](https://airi.moeru.ai/docs/zh-Hans/blog/DevLog-2025.08.01/)：通过 TextDecoder 和 Intl.Segmenter 实现流式 UTF-8 字节流的字素簇分割，解决多语言实时文本动画的字符组合难题，并开源轻量库 [Clustr](https://github.com/sumimakito/clustr)。
- 📓 [Unexpected security footguns in Go's parsers](https://blog.trailofbits.com/2025/06/17/unexpected-security-footguns-in-gos-parsers/)：这篇文章揭示了 Go 语言中 JSON、XML 和 YAML 解析器存在的、易被忽视的不安全默认行为，这些行为可能导致认证绕过等严重安全漏洞。其中很多提到的点对 Go 以外的很多情况也都适用。
- 📓 [每个程序员都应掌握的 10 个 UTF-8 和 UTF-16 字符编码核心概念](https://javarevisited.blogspot.com/2021/05/essential-utf-8-and-utf-16-character..html)：本文系统梳理了关于 UTF-8 和 UTF-16 的核心概念、区别与实际应用。作者指出，许多程序员往往忽视编码细节，直到遇到乱码和兼容性问题。文章逐一澄清常见误区，比较了编码方式的空间效率、兼容性、字节顺序（endianness）、业界标准，以及不同编码对非英语字符和国际数据的支持。![](https://r2.cosine.ren/i/2025/08/e0a06907cdd88bf0e68295bc34b106af.webp)

- 📓 [浅谈 RAG 并基于 NodeJS 实现基础向量检索服务 - 掘金](https://juejin.cn/post/7534918138505953314)：该文章通过讲解文本分片、向量化、多路召回与重排等核心环节，详细拆解了 RAG 的技术原理，并基于 NodeJS 实现了一个基础的向量检索服务。，
- 📓 [对比 Oxlint 与 Biome 的类型感知实现差异](https://www.solberg.is/fast-type-aware-linting)：本文详细比较了两种面向 TypeScript 项目的新一代极快类型感知代码检查 (Type-aware Linting) 工具：Biome 和 Oxlint。

> 过去 ESLint / TypeScript-ESLint 虽然类型安全性强，但大规模代码库下执行极慢。Rust 语言重写的 Biome 和 Oxlint，速度提升到秒级，但最初仅支持语法级规则，缺乏类型安全。 Biome 通过全新 Rust 实现的类型分析器（Biotype）逐步覆盖类型规则，但实现难度高且与 TypeScript 官方存在行为偏差风险； Oxlint 则正在采取不同的赌注：等待官方 TypeScript 编译器变得更快。Oxlint 采用与 TypeScript 官方保持一致的 Go 端口 tsgo，并通过 tsgolint 实现与 typescript-eslint 完全一致的 40 条类型规则，且性能提升明显。

文中追踪社区方案、开发进展及主要作者观点，认为 Oxlint 的技术路线更具前景，最终或将以极快速度和官方一致性替代当前混合 linting 方案。

- 📓 [Making my GitHub heatmap widget](https://leanrada.com/notes/github-heatmap-widget/)  这篇文章介绍了作者如何通过抓取 GitHub 贡献日历的 HTML、将其处理成 JSON 格式，再用一个自定义 WebComponent 将其渲染成个人网站上的热力图小部件。
- 📓 [How I use Claude Code (+ my best tips)](https://www.builder.io/blog/claude-code)：Claude Code 最佳实践与权限安全建议，内含 hook 通知、智能 PR 审查、大型代码库处理等实用技巧。
- 🎥 [快速实现主题切换动效](https://www.youtube.com/watch?v=f_aqzyIDudI?utm_source=CSS-Weekly&utm_campaign=Issue-617&utm_medium=web)：视频讲解如何使用 `view-transition` 为网站添加优雅流畅的主题切换动画，提升用户体验。[圆形过渡示例](https://codepen.io/kevinpowell/pen/xbGeNQy/ef22ccea0c2d257ae1a748f5fd4646da)、[旋转立方体示例](https://codepen.io/ragnar_ock/pen/QwbYbOQ)
- 📓 开发者观点：[Rust、Python、TypeScript 将形成未来三强格局](https://smallcultfollowing.com/babysteps/blog/2025/07/31/rs-py-ts-trifecta/)。
- 📓 [React Query Selectors， Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)：本文深入探讨了 React Query 中 `select` 选项的高级用法，旨在实现极致的性能优化。
- 📓 [Get the number of auto-fit/auto-fill columns in CSS](https://frontendmasters.com/blog/count-auto-fill-columns/)：这篇文章介绍了一种纯 CSS 技巧，通过结合容器查询和数学函数（包括使用三角函数处理兼容性问题）来动态计算`auto-fit`/`auto-fill`网格的列数，进而实现复杂的响应式布局。
- 🎥 [JavaScript 如何真正发展：与 Daniel Ehrenberg 的 TC39 内部对话](https://www.youtube.com/watch?v=v9Al9-0jkoQ)。有没有想过谁实际上决定了 JavaScript 是如何发展的？
- 📓 [6 Weeks of Claude Code](https://blog.puzzmo.com/posts/2025/07/30/six-weeks-of-claude-code/)：一位开发者分享了使用 Claude Code 六周的经验，认为它极大地解放了生产力，使其能以前所未有的速度清理技术债和进行项目创新，从根本上改变了编程的工作方式。
- 📓 [karminski/one-small-step](https://github.com/karminski/one-small-step)：一个旨在通过 5 分钟短文快速科普人工智能、硬件等前沿技术概念与原理的教程项目。

## CSS 新特性

- [Infinite Marquee Animation using Modern CSS](https://frontendmasters.com/blog/infinite-marquee-animation-using-modern-css/)：使用 CSS 动画实现无限滚动 Logo 动画，无需额外 JS 与重复 HTML。
- [CSS if() 条件样式函数实用指南](https://blog.logrocket.com/css-if-function-conditional-styling/)：详细介绍全新 CSS `if()` 条件函数用法，对比从前经典的条件处理技巧，这一函数为 CSS 带来了原生的条件样式能力，极大简化了以往通过媒体查询、自定义属性等方式实现条件逻辑的复杂性。
  - 中文博客推荐阅读 [CSS 倒反天罡居然支持 if()函数了](https://www.zhangxinxu.com/wordpress/2025/07/css-if-function/)
- [通过滚动驱动的 CSS 动画重新实现经典视差效果](https://css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations/) 本文详细介绍了如何利用新兴的 CSS 滚动驱动动画技术，以纯 CSS 的方式重新实现经典的视差滚动 (Parallax) 效果。与传统 JavaScript 方案相比，纯 CSS 将动画移出主线程运行，提升性能和流畅度。文章通过实例讲解了 `animation-timeline` 属性的两种核心时间轴函数 `scroll()` 和 `view()` 的使用场景与区别，并进一步介绍了如何使用 `animation-range` 属性精确控制动画的触发时机与范围。

# 工具与库更新

## 工具与趣站

- [CSS-only 轮播图库](https://chrome.dev/carousel/)：展示 CSS 轮播规范及纯 CSS Demo 站点，为无 JS 场景提供灵感资源。
- [AwesomeIndex](https://awesomeindex.dev/)：一个聚合搜索工具，它能让开发者一次性搜索数百个 GitHub 上高质量的 “Awesome” 精选列表。这些列表包含了各种主题下的优质资源、工具和学习资料，AwesomeIndex 将这些分散的宝贵信息集中起来，极大地提高了查找和发现特定领域资源的效率。
- [Kibo UI](https://github.com/haydenbleasel/kibo)：Kibo UI 是一个基于 shadcn 的扩展组件库，开箱即用，shadcn/ui 专注于包装 Radix UI 中的原语，而 Kibo UI 则被设计为一个更全面的组件库，可用于构建更复杂的应用程序。（PS：其作者将其中的 AI 组件[捐赠](https://github.com/haydenbleasel/kibo/issues/215#issuecomment-3165413345)给了 Vercel 来创建 [AI Elements](https://www.notion.so/Vol-2-24afb21d4089809ca8aac3c58859259c?pvs=21) 组件库）

> 嘿！我将 Kibo 的 AI 组件捐赠给 Vercel 来创建 AI 元素——我们已经投入了大量工作来改进它们，所以我绝对建议升级到 AI 元素。 大多数组件都有相同的名称，许多组件都经过升级，还有一些新的组件。我认为我们将 Input 重命名为 PromptInput，但除此之外，应该可以无缝切换！ 另外，如果您运行 npx kibo-ui add ai，它将使用 AI Elements 👍

![](https://r2.cosine.ren/i/2025/08/60ba61d1beb235eb52ea2bf90c2bc907.webp)

- [smart-webapp-template](https://github.com/innei-template/smart-webapp-template) 一个精心设计的 Vite + React 模板，具有精心设计的 Claude 和 Cursor 规则，展示了如何与 AI 协作构建高质量的 Web 页面。

> 拾一.ens18 (@oQuery)：一个好的 template 是 AI Coding 奠基，如果 ai 写的通篇都是蓝字渐变风格，真该换一个好的 template。我重新整理了一个我一直在用的 template，里面所有的设计风格、组织架构都调教完了。

- [Colored, Glowing Edge Card](https://codepen.io/simeydotme/pen/RNWoPRj)：Simon Goellner 制作了一个炫酷的发光卡片效果 Demo，还可以切换昼夜模式。 ![](https://r2.cosine.ren/i/2025/08/a0836579729567e898e378ce288a2298.webp)

- [Hyprnote](https://github.com/fastrepl/hyprnote)：一款主打“本地优先”和隐私安全的 AI 会议笔记工具，能将你的会议实时转录并智能生成摘要，确保数据绝不外泄，可接入 Ollama 本地模型和第三方 API ![](https://r2.cosine.ren/i/2025/08/c67e6d03e0a1262d705a2fe7b802593b.webp)

- [HivisionIDPhotos](https://github.com/Zeyi-Lin/HivisionIDPhotos) 一个轻量级的 AI 证件照制作算法，CPU 即可。包括智能抠图、自动排版与多规格美颜，支持多种部署形态，有 comfyUI 工作流部署等。![](https://r2.cosine.ren/i/2025/08/30fd91e125b4e466afdcfc990b46ac6f.webp)

- [GitHub 个人主页头图生成器](https://leviarista.github.io/github-profile-header-generator/)：主题、背景与装饰可自定义。
- [ResumePolice: 简历警察 🕵️‍♂️ 疯狂逮捕](https://github.com/itMrBoy/resumePolice)：一个开源的 AI 项目，提供“简历警察”提示词与 Dify 工作流，帮助求职者优化简历并生成面试问题。
- [SnapAI](https://github.com/betomoedano/snapai)：SnapAI 是一个开源的面向 React Native 和 Expo 开发人员的 AI 驱动的图标生成 CLI。需要一个 OpenAI API 密钥来生成图标，每个图标的成本为 ~$0.04 🎥 [观看视频教程](https://youtu.be/PwZ7mEuHt84)
- [Liseré](https://lisere.ankur.design/)：Liseré 是一个轻量级且可组合的 React 组件，用于文本突出显示。它使您可以精确控制用户如何选择、注释文本以及与文本交互。适合代码文档、教程以及交互式文本突出显示和选择。

## 库更新

- Node.js v22.18（LTS）默认启用 TypeScript 类型剥离，`node app.ts` 成为现实，就像 Bun 或 Deno 一样，不过目前它仍然是实验性功能。（[版本公告](https://nodejs.org/en/blog/release/v22.18.0))。
- pnpm 10.14 支持直接定义并自动下载/固定 Node.js、Deno、Bun 运行时至本地项目。[详情](https://pnpm.io/blog/releases/10.14)
- Vercel 发布了 [AI SDK 5](https://vercel.com/blog/ai-sdk-5)，本次重大更新的核心是为全栈 AI 应用提供端到端的类型安全，尤其是在聊天交互和 Agent 功能上。
- [Shopify 发布 FlashList v2](https://shopify.engineering/flashlist-v2)，基于 React Native 新架构的彻底重写版本，旨在解决 v1 的核心痛点。通过利用新架构的同步布局测量能力，v2 完全消除了对项目尺寸估算的依赖，从而实现了更快的加载速度、像素级精准的滚动定位和更流畅的渲染性能。
- [Apache ECharts 6.0](https://echarts.apache.org/handbook/en/basics/release-note/v6-feature/) 正式发布，带来了 12 项重大升级，旨在将数据可视化提升到新的水平。本次更新围绕三大核心维度展开：全新的默认主题、动态主题切换和深色模式支持；新增弦图、蜂群图、断轴、散点图抖动、增强的 K 线图等图表类型；引入矩阵坐标系、增强自定义系列和优化坐标轴标签。
- [NPKILL](https://npkill.js.org/) 工具（v1.0 临近）：专注 `node_modules` 垃圾清理，作者[计划扩展至清理更多其他类型的代码“垃圾”](https://imzaldih.com/en/post/npkill-future-beyond-node-modules/)。
- 最小的 React 框架 Waku v0.24 版本宣布了一项重大迁移，其底层实现已转向采用 Vite 官方的 RSC 插件  `@vitejs/plugin-rsc`  和 [Vite Environment API](https://vite.dev/guide/api-environment.html)。

# 深入分析

本篇章为对感兴趣的文章或 Demo 等进行的一些详细分析～

> 其中有些地方使用我自己开发的 MoeCopy AI 浏览器插件进行的网页总结！[开源](https://github.com/yusixian/moe-copy-ai)，超轻量级，填入自己的 apikey 即可使用，还在开发阶段，欢迎尝试~喜欢的话可以给个 star！[Chrome 商店](https://chromewebstore.google.com/detail/moe-copy-ai/dfmlcfckmfgabpgbaobgapdfmjiihnck) > ![](https://r2.cosine.ren/i/2025/08/aebfe917c26f8502c1ff7789651d3ef0.webp)

## 使 Rolldown 的启动时间减少了 2.1 倍的 PR

看到 [What’s New in ViteLand: July 2025 Recap](https://voidzero.dev/posts/whats-new-jul-2025) 里提到的这段话比较感兴趣，去瞅了一眼。

> 得益于一些深入的 JavaScript 引擎优化技巧 ，Rolldown 的启动时间减少了 2.1 倍。这可以缩短交互时间，更好地为无服务器提供冷启动，并有利于您的开发服务器启动速度。

里面是这个 PR [feat: use PIFE for callbacks passed to `__esmMin` wrapper by sapphi-red · Pull Request #5319 · rolldown/rolldown](https://github.com/rolldown/rolldown/pull/5319) 提出了在 rolldown 打包工具中对传递给 `__esmMin` 包装器的回调函数应用 PIFE 优化，以提升启动时运行性能。实测结果显示，在特定项目上启动性能提升超过 2 倍，但代码体积略有增长。

PIFE？于是又翻了翻，翻到了这个 PR

[feat(codegen): keep arrow function PIFEs by sapphi-red · Pull Request #12353 · oxc-project/oxc](https://github.com/oxc-project/oxc/pull/12353)，里面提到了：

> PIFE 是 “Possibly-Invoked Function Expressions” 的缩写。它是一个用括号表达式包装的函数表达式。 PIFE 对可能被急切调用（invoked eagerly）的函数进行注释。当 v8 遇到此类表达式时，它会急切地编译它们（而不是稍后编译）。有关更多详细信息，请参阅  v8 的博客文章  。
>
> 博客文章只提到了正则的 FunctionExpressions，但也支持 ArrowFunctions。将急切编译（eagerly compiled）的案例有：
>
> - 当 `!` 出现在函数文字之前时（例如 `!function(){}`）
> - 当函数表达式用括号包装时（例如 `(function () {}), (async function () {}))`）
> - 当箭头函数用括号包裹时（例如 `console.log((() => {})))`）
> - 当 `()` 或标记模板出现在函数文字之后（仅在某些情况下）（例如 `~function(){}()`）
> - 当使用[显式编译提示](https://v8.dev/blog/explicit-compile-hints)时（例如  `# allFunctionsCalledOnLoad`）
>
> 在代码生成中保持 PIFE 原样将解锁优化，例如  [rolldown/rolldown#5319](https://github.com/rolldown/rolldown/pull/5319) .

## 有趣的音量控制 UI Demo

本周的 [CodePenSpark#462](https://codepen.io/spark/462) 精选了一系列以前端技术实现的音量控制 UI。

1. 创意 UI 组件实现

   - 弹性音量开关：由 Aaron Iker 制作的 SVG 弹性音量开关，具有令人愉悦的回弹和翻转动画效果。
   - 复古音量旋钮：一个外观酷似塑料的复古圆形范围滑块，可作为音量旋钮使用。
   - CSS 音量计：Alvaro Montoro 使用纯 CSS 将原生范围输入框转换为一个带有颜色编码的动态音量计。
   - 单元素音量控件：展示了如何仅用 CSS 和原生范围滑块创建一个无需 JavaScript 的多格音量控制条。
   - 麦克风切换按钮：一个经典的、交互状态清晰且支持键盘访问的麦克风切换按钮。
   - CSS 平衡滑块：Jhey Tompkins 制作的可配置范围滑块组合，具有丰富的拉伸和增强等视觉效果选项。

2. 交互式与实验性项目
   - 光圈科技舞会：灵感源自游戏《传送门》的动画场景，点击图标可播放音乐并观看角色跳舞。
   - SVG 声波标记实验：一个艺术性的 UI 实验，尝试用相对简单的 SVG 标记来渲染声波效果。
   - 寂静之地 - 音量控制动画：一个音频交互式动画，用户通过麦克风发声来揭示隐藏在树林中的生物。
   - 声音颜色选择器：一个独特的颜色选择器，将声音与视觉结合 (联觉 Chromesthesia)，点击不同颜色会听到对应的声音。

主要分析一下其中的这个[合成音量旋钮](https://codepen.io/josetxu/pen/zYmvQMV)，一个拟物风格的音量旋钮控件：旋钮跟随鼠标角度旋转，环形发光条按音量比例点亮，数字显示 00–99，同步控制 `<audio>` 的 `volume`，并带有“静音/恢复播放”的按钮。

![](https://r2.cosine.ren/i/2025/08/3f5e4c6fa4246ed1d4837ff7d4bbf975.webp)

### 核心技术点（视觉）

1. 立体拟物与光晕

   - 通过多重 `box-shadow` + `filter: drop-shadow(...)` 叠加（外投影/内投影）营造金属质感与体积感。
   - `.knob::before/::after` 与 `.slider::before`、`.glow::before/::after` 使用伪元素堆叠，分层画出旋钮面板、内圈光环、外圈刻度等。

2. CSS 自定义属性驱动

   - 用 `--vol`（0–100）作为“状态源”，在 `.glow:after` 的 `linear-gradient` 中通过 `calc(var(--vol) * 1%)` 控制亮起弧度。
   - `--c1`、`--mut`、`--tra` 控制主题色、静音色、过渡曲线，`.slider:active *` 动态变更色调，产生交互高亮。

3. 刻度与环形高亮

   - `.glow:before` 通过一组不同角度的 `linear-gradient` 叠加生成刻度线；中间用径向渐变“镂空”。
   - `.slider { transform: rotate(90deg) }` 将整体旋转，配合 `linear-gradient(-90deg, ...)` 的方向，让“起点在顶部”的视觉更直观。

4. 静音按钮纯 CSS 图形

   - `.mute span:before` 用 `clip-path` 勾出“喇叭”图形，`.mute span:after` 用 `≫/✖` 字符表现声波/静音，`content` 随类名切换。

5. 数码管字体与发光
   - `@font-face` 引入 Alarm Clock 字体，`.number` 叠加内发光和淡色“88”遮罩，营造电子数码屏效果。

### 核心技术点（交互）

1. 角度计算与旋钮旋转

   - `calculateDegree(e)` 用 `Math.atan2` 计算“指针相对于屏幕中心”的角度（注意：是相对窗口中心，而不是旋钮中心）。
   - 按住旋钮 `mousedown` 后监听 `mousemove`，实时设置 `knob.style.transform = rotate(deg)`。

2. 角度到音量映射

   - 通过对 `val = angle + 90` 的分段处理，把整圈角度映射到 0–1 的音量值 `ran`，对应 `--vol` 与 `<audio>.volume`。
   - 数字显示 00–99，特意避免显示 100（`if(num==100) num='99'`）。

3. 播放/暂停与样式同步
   - 点击静音按钮切换 `muted` 类并 `play()/pause()`，视觉与状态一致。

# Refs

- [Node Weekly Issue 589: August 5, 2025](https://nodeweekly.com/issues/589)
- [React Status Issue 439: August 6, 2025](https://react.statuscode.com/issues/439)
- [Frontend Focus Issue 704: August 6, 2025](https://frontendfoc.us/issues/704)
- [Issue #617 – CSS Weekly](https://feedpress.me/link/24028/17112418/issue-617)

# 结语

周刊第二期到这里就结束啦，欢迎多多反馈纠错！

上一期结束以后我想了一想，既然要轻轻松松的氛围，那可以在文末配一些日常~

所以，晒猫时间到！

![两只喵](https://r2.cosine.ren/i/2025/08/037d2f228c5c0932528d630752fd04a7.webp)

腊八喵：于 2024 年 2 月 22 日猫 の 日的时候领养的小橘白猫，因为小姐姐捡到她的时候在腊八，于是这只小可爱叫腊八~
领养的时候还是大概 5 个月大 3.55kg 的小肥猫！现在都已经变成老猫了～

![腊八](https://r2.cosine.ren/i/2025/08/c26b56018c59619bc16d6bcaac1cad8b.webp)

可乐喵：2024 年 10 月来给腊八作伴的重点色布偶公猫～那个时候还是 3 个月大的小猫咪。

![可乐](https://r2.cosine.ren/i/2025/08/e1442003b385135f2a9425d60658e43e.webp)

感谢观看～

> 更新时间期望是在每周天，若本周内容少，则可能合并到下一期作为双周刊。
> 推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。
> 建了个 QQ 讨论小群 598022684 欢迎加入，日常讨论前端技术 & 生活，也可在群里投稿自己的文章~ 随意加入，比较偏向粉丝群的性质，前期群聊不活跃也很正常。
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

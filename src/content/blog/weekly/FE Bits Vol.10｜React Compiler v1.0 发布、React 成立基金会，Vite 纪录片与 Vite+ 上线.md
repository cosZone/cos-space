---
title: FE Bits Vol.10｜React Compiler v1.0 发布、React 成立基金会，Vite 纪录片与 Vite+ 上线
description: 假期合刊：React Compiler 首个稳定版本 v1.0 发布，React 成立基金会；Vite 纪录片与 Vite+ 上线；Chrome 自动撤销通知权限；ElevenLabs UI、Coinbase CDS 开源；CodePen 精选呈现 WebGL、Anchor 定位等灵感。
link: weekly-10
catalog: true
lang: cn
date: 2025-10-12 12:00:00
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

今天是 2025 年 10 月 12 日，星期天。

搬家加上去医院各种情况，导致这个国庆假期其实也没咋歇，所以网站得再咕咕咕一阵子了，还没做到满意的程度～

等到 10 月底，大概才能安顿下来了。

这周将国庆假期里的消息也合并进来了，所以内容相对比较多。

## 生态与社区动态

- [React Compiler v1.0](https://react.dev/blog/2025/10/07/react-compiler-1)：React 官方发布首个稳定版 React Compiler，通过自动记忆化（memoization）在构建时优化组件性能。

- [介绍 React 基金会](https://react.dev/blog/2025/10/07/introducing-the-react-foundation)：React 官方宣布将成立独立的 React 基金会（React Foundation），并将 React 与 React Native 从 Meta 转移至该基金会名下，以推动社区自治和生态中立化。基金会将管理基础设施、举办 React Conf、支持生态项目并发放资助。同时，React 将建立独立的技术治理结构，由社区贡献者共同制定方向，确保没有单一机构主导。

- [减少通知超载，在 Chrome 浏览器中获得更安静的浏览体验](https://blog.chromium.org/2025/10/automatic-notification-permission.html)：Chrome 宣布推出新的自动通知权限撤销功能，会自动取消那些用户近期未互动且推送频繁的网站通知授权，以减少通知噪音

- [Vite: The Documentary](https://www.youtube.com/watch?v=bmWQqAKLgT4)：Vite 一部由 [@CultRepo](https://x.com/CultRepo) 制作的讲述 Vite 从 Vue 开发者的副项目成长为现代前端标准工具的纪录片。以 Evan You 从 Webpack 限制中寻找突破为起点，揭示了 Vite 如何利用原生 ES Modules 与即时开发服务器 Dev Server 技术实现极速构建体验。

  > 与此同时，VueConf 2025 上说的 Vite+ 也上线了，[Vite+](https://viteplus.dev/) 是一体化 Web 工具链，集成开发、构建、测试、格式化、缓存等功能，面向企业级性能与团队协作。

- [What’s new in Svelte: October 2025](https://svelte.dev/blog/whats-new-in-svelte-october-2025)：9 月 Svelte 更新重点围绕 Remote Functions 增强、异步 SSR 与社区新工具生态的拓展。

- [What’s New in ViteLand: September 2025 Recap](https://voidzero.dev/posts/whats-new-sep-2025)：ViteLand 2025 年 9 月的月度回顾，涵盖 Vite、Vitest、Rolldown 及 Oxc 的新进展，性能优化细节与社区生态亮点。下面是详细回顾：

**Rolldown 性能与体积优化**

- Windows 平台重新实现文件元数据读取函数，构建性能提升 10–30%。
- macOS 平台优化多线程 I/O，限制线程至 4 个后性能升至 10–45%。
- 调整 Source map 忽略机制，构建带 Source map 时提速 20–30%。
- 通过直接嵌入 Oxc helper 减少二进制体积约 200KB。
- [相关 PR 参考实现](https://github.com/oxc-project/oxc-resolver/pull/691)、[集成方式更新](https://github.com/rolldown/rolldown/pull/6220)。

**项目更新**

- **Vite**：`create-vite` 向导现支持 Rolldown 选项，[GitHub 参考](https://github.com/vitejs/vite/issues/20820)。
- **Vitest**：VS Code 扩展新增浏览器模式调试，[PR](https://github.com/vitest-dev/vscode/pull/662)；未来版本将原生支持 Playwright Trace Viewer。
- **Rolldown**：支持 `/* @__NO_SIDE_EFFECTS__ */` 注解跨 Chunk 优化；改进 Tree-shaking 与 Dead Code 消除。
- **Oxc / Oxlint**：Lint 性能整体提升 5–50%，支持 `preserve-caught-error` 规则并提供自动修复；修复内存泄漏问题；发布 Next.js 示例，[性能优化汇总列表](https://gist.github.com/Boshen/7ee09b4cd22fcb8146b75f55c5ac5321)。

## 文章与视频

- [Birth of Prettier](https://blog.vjeux.com/2025/javascript/birth-of-prettier.html)：Prettier 的诞生故事 —— 从「空格 vs Tab 圣战」到自动化格式化的行业标准，Prettier 作者 Vjeux 回顾了从学生时代对代码格式要求的启蒙，到在 Facebook 亲历代码风格冲突，并探索各种格式化方案（如 gofmt、dartfmt）失败的原因；最终，他与合作者 James Long 等人推动 Prettier 诞生。

- [如何为 Astro 静态网站添加快速客户端搜索功能](https://evilmartians.com/chronicles/how-to-add-fast-client-side-search-to-astro-static-sites)：介绍了如何在使用 Astro 构建的静态网站中集成高性能客户端全文搜索功能。作者比较了 AI 或第三方方案的局限，最终提出通过 Astro 的构建时（build-time）端点生成 JSON 索引，并结合 MiniSearch 与 Svelte 构建搜索 UI 的方式，实现无需远程 API 的、本地可定制的快速搜索体验。

- [CSS Counters 的作用](https://frontendmasters.com/blog/css-counters-in-action/)：介绍如何运用 CSS 的计数器（CSS Counters）在页面中动态生成编号，实现如行号、章节编号等功能。

- [如何在不使用 reduce 的情况下对 JavaScript 中的数组进行分组](https://allthingssmitty.com/2025/10/06/grouping-arrays-in-modern-javascript-object-groupby-and-map-groupby/)：介绍 ES2024 新增的 `Object.groupBy()` 和 `Map.groupBy()`，它们让数组分组操作更简单、更具可读性。

- [Core Web Vitals 的历史](https://frontendfoc.us/link/175288/web)：Addy Osmani 回顾 Core Web Vitals 的发展历程，说明其在改善用户等待时间与整体性能体验上的重要作用。

- [现代 CSS 颜色实用指南 - 第 1 部分](https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-one/)：带你了解现代 CSS 色彩系统的重大变革与写法更新。重点包括新版 `rgb()` 与 `hsl()` 的语法变化、相对颜色（relative colours）的用法、改进的亮暗主题处理方式、颜色空间（colour spaces）的应用，以及应对更广色域设备的新工具。

- [针对特定字符使用 CSS 规则](https://shkspr.mobi/blog/2025/09/targetting-specific-characters-with-css-rules/)：用 CSS 精确选择并修改特定字符外观的创意实验，结论是可以使用 CSS 规则来针对特定字符更改他们的字体，遗憾的是只能改字体。

- [如何使用 GSAP 制作 WebGL 着色器动画：涟漪、揭示和动态模糊效果](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/)：一篇由浅入深讲解如何结合 GSAP 动画与 WebGL 着色器，实现实时交互动效（如涟漪、遮罩、动态模糊）的技术教程。

- [Vue 基础知识：Vue 中的状态管理](https://www.telerik.com/blogs/vue-basics-state-management-vue)：本文系统讲解了如何在 Vue 中进行状态管理，从 `ref/reactive` 到 `props/emits`、`provide/inject`，再到官方状态管理库 Pinia，帮助开发者理解不同规模下的状态管理选择。

- [Vibe engineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/)：不满 Vibe Coding，Simon Willison 提出“Vibe Engineering”概念，指代一种更严谨、更成熟的 AI 辅助软件开发方式。作者强调，与“vibe coding”的快速原型化不同，vibe engineering 是资深工程师在熟练掌控 LLM（Large Language Model）与 coding agent 的条件下，通过完善的测试、文档、版本控制与审查体系，将 AI 作为高阶编码助手来加速高质量软件的生产过程。

### CSS 新特性

- [动态位置的 tooltip 与锚点定位](https://css-tip.com/tooltip-anchor/)：介绍如何利用 CSS 锚点定位新特性（Anchor Positioning） 创建动态位置的 tooltip，使其在视窗中始终可见并自动调整箭头方向。

- [利用 shape-outside 发挥创意](https://css-tricks.com/getting-creative-with-shape-outside/)：探讨如何利用 CSS `shape-outside` 打破矩形布局，使文字与图片自然融合，打造更具节奏与表现力的阅读体验。

- [视图转换的新功能（2025 年更新）](https://developer.chrome.com/blog/view-transitions-in-2025?hl=en)：2025 年 View Transitions API 在浏览器与框架支持、工具调试及新特性上迎来多项进展。

- [我们完全错过了 width/height: stretch](https://css-tricks.com/we-completely-missed-width-height-stretch/)：介绍 `width: stretch` 与 `height: stretch` 这两个新加入 CSS 标准的属性值。作者探讨了它与 `box-sizing: border-box` 的区别、动画特性（animatable）以及当前的浏览器支持情况。
  虽然 `stretch` 功能简单，但它解决了长期以来 `width: 100%` 受内边距影响导致溢出的问题，为布局控制带来了更直观、更可靠的选择。

## 趣味项目与工具

### ElevenLabs UI

[elevenlabs/ui](https://github.com/elevenlabs/ui)：一个基于 shadcn/ui 的组件库，旨在帮助您更快地构建音频和智能体应用程序，项目以 MIT 许可证开源，音频组件特别多。
![](https://r2.cosine.ren/i/2025/10/807634fd97a38b03e692d64cf4c6c2aa.webp)

> 来源于 [X 上的 Guangzheng Li：“elevenlabs 刚刚开源了兼容 shadcn ui 的前端组件，有大量和音频输入输出相关的组件 看了一下质量都挺高的，不只是样式，有的交互逻辑都完全生产可用，有音频组件相关需求的小伙伴不要错过”](https://fixupx.com/iguangzhengli/status/1975792599484276747)

### Coinbase CDS

[Coinbase 开源 CDS（Coinbase Design System）](https://github.com/coinbase/cds/tree/master)：Coinbase 团队将其针对 React 和 React Native 的跨平台组件库设计系统开源（Apache 2），其中不乏一些具有复杂效果的组件，如 [RollingNumber](https://cds.coinbase.com/components/numbers/RollingNumber/)。

### Accented 无障碍测试工具

[Accented](https://accented.dev/)：一个基于 axe-core 的前端库，用于持续无障碍性 (Accessibility) 测试并可视化问题高亮显示。将几行代码添加到您的 Web 应用中，您将看到交互式提示将在存在可访问性问题的元素旁边出现。

[Introducing](https://accented.dev/blog/2025-07-16-introducing-accented) | [Playground](<https://stackblitz.com/edit/pomerantsev-accented-fyzsdyzs?file=src%2Fmain.tsx&title=Accented%20playground%20(React%20%20%20TypeScript)>)

### Harmonizer：基于 OKLCH 和 APCA 对比公式的色板生成工具

[evilmartians/harmonizer](https://github.com/evilmartians/harmonizer) 是一款基于 OKLCH 色彩模型与 APCA 对比公式的工具，用于生成一致且具可访问性的 UI 色彩调色板。

![](https://r2.cosine.ren/i/2025/10/227bf30632b15897932d15a4ccaefb0a.webp)

可在 Figma 插件或 Web 界面中使用，利用 OKLCH 与 APCA 生成具一致亮度与对比度的配色方案。该工具通过定义光度等级、色相与背景上下文，自动生成可在浅色与深色模式中保持视觉一致的色彩体系。支持导出多种开发格式（Tailwind、CSS 变量、JSON）

[lirantal/npm-security-best-practices](https://github.com/lirantal/npm-security-best-practices)：一份针对 npm 包管理器的安全最佳实践清单，帮助开发者防范供应链攻击并强化依赖安全。

### Codepen 精选

- [Spooky Spectral Ghost](https://codepen.io/filipz/pen/GgpMOEq)：以 WebGL 与 Three.js 制作的一个诡异的鬼魂，用户可通过控制面板自定义多种参数，由 Filip Zrnzevic 制作。

![](https://r2.cosine.ren/i/2025/10/8d27dd9142822a1721d8497d96a108a6.webp)

- [digraph sink](https://codepen.io/collection/yyapOP)：Sophia Wood 基于 P5.js 的数学视觉系列 Mathtober，融合算法与艺术表现，展现图形生成美学。

![](https://r2.cosine.ren/i/2025/10/9eadfabbf955db3ea94cc56f7d7e9d36.webp)

- [resizable slide panels 🤙](https://codepen.io/jh3y/pen/NPxxawM)：Jhey Tompkins 创作的可调整尺寸幻灯组件，展示响应式交互设计的灵活性。

![](https://r2.cosine.ren/i/2025/10/35e8a8ad47da3c8f899907a4cc11044e.webp)

- [Tubes Cursor](https://codepen.io/soju22/pen/qEbdVjK)：Kevin Levron 使用 Three.js 制作的动态光标特效，灵感来自流动玻璃质感。

![](https://r2.cosine.ren/i/2025/10/7e00e34a93b9a514764d9a5cd1649f3a.webp)

- [Thinking in Squircles](https://codepen.io/davatron5000/pen/YPwzNwm)：Dave Rupert 探索 CSS 新属性 `corner-shape` 带来的“squircle”（圆角混合形）绘制逻辑，提出“CSS squircle 更像被拉伸的圆，而非被压扁的方形”，并延伸至[Chris Smith 的作品](https://codepen.io/BlogFire/pen/RNrPdMO)。

![](https://r2.cosine.ren/i/2025/10/946ee9c779243e8935597d2766d5cd91.webp)

- [Elastic neon radio buttons with GSAP and SVG](https://codepen.io/jdillon/pen/zxrvwWv)：使用 GSAP 和 SVG 的弹性霓虹灯单选按钮。

![](https://r2.cosine.ren/i/2025/10/517b508d3f9443819eb14cc5243114af.webp)

- [Anchor Positioned Popover with Contrast Slider](https://codepen.io/simeydotme/pen/vELOQEz)：Simon Goellner 将新的 Popover API、锚点定位、浅色/深色配色主题以及他自己的范围滑块标记库与受 [Praha37v](https://x.com/Praha37v/status/1970410110347608489) 启发的流畅设计相结合，打造了这个完全现代化的范围滑块。

![](https://r2.cosine.ren/i/2025/10/17a80855e06ad5969c31dac2c9aa0c55.webp)

## 生态更新

- [React 19.2 – React](https://react.dev/blog/2025/10/01/react-19-2)：React 19.2 发布，带来更强的性能、服务端渲染改进与开发体验优化。

  - 本次更新的重点包括全新 `<Activity />` 组件、`useEffectEvent` hook、`cacheSignal`、性能追踪 (Performance Tracks)、部分预渲染 (Partial Pre-rendering) 功能，批处理 SSR 的 Suspense 边界修复，在 Node.js 中支持 Web Streams 以进行流式 SSR 的功能。

- [What's coming in ESLint v10.0.0 - ESLint - Pluggable JavaScript Linter](https://eslint.org/blog/2025/10/whats-coming-in-eslint-10.0.0/)：ESLint 团队公布 v10.0.0 的最终特性计划，重点聚焦在配置系统全面切换至 Flat Config、Node.js 支持更新、AST 改进及遗留 API 清理。

- [ESLint v9.37.0 released](https://eslint.org/blog/2025/10/eslint-v9.37.0-released/)：本次 ESLint v9.37.0 作为小版本更新，重点增强了对 TypeScript 规则的支持（如 `no-restricted-imports` 增加 `allowTypeImports`）、优化了 `--concurrency=auto` 在缓存和多线程场景下的启发式逻辑以提升 lint 性能，并改进了 `preserve-caught-error` 对计算属性语法的识别。

## Refs

- [CodePen Spark#472](https://codepen.io/spark/472)
- [CodePen Spark#471](https://codepen.io/spark/471)
- [React Status Issue 447: October 8, 2025](https://react.statuscode.com/issues/447)
- [Frontend Focus Issue 712: October 8, 2025](https://frontendfoc.us/issues/712)
- [Node Weekly Issue 595: October 7, 2025](https://nodeweekly.com/issues/595)

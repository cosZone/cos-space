---
title: FE Bits Vol.5｜Nx 包被投毒、ESLint 多线程 Linting 和 Firefox 实验性 PWA
description: 本期聚焦 Nx 供应链投毒、Remix v3 转向 Preact、Firefox 实验 PWA 与 Chrome DevTools 网络面板 AI。实践与教程涵盖 sendBeacon 上报、字体加载最佳实践、hidden=until-found、Big O 与 Semver 性能。CSS 专题包括 interpolate-size、corner-shape、Anchor Positioning、纯 CSS 电梯与 clip/offset-path 深入。工具与版本侧有 CSS HDR Gradients、LiftKit、electron-liquid-glass、Uppy，以及 ESLint 并行、Zod Codecs、Node 24.7、Rspack 1.5 与 Prisma 6.15
link: weekly-5
catalog: true
lang: cn
date: 2025-08-31 18:00:00
tags:
  - 前端
  - JavaScript
  - HTML
  - CSS
  - AI
categories:
  - 周刊
---

> 本周刊更新时间期望是在每周天，网站在建设中……\
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quality RSS](https://quaily.com/cosine/feed/atom)。\
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。\
> QQ 讨论小群 598022684，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～\
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 8 月 31 日，星期日。

本周比较喜欢的是这篇文章：[Getting Creative With Images in Long-Form Content | CSS-Tricks](https://css-tricks.com/getting-creative-with-images-in-long-form-content/)，探讨了如何通过突破常规的图片布局、网格设计、CSS 形状、字幕与留白等手法，让长文中的图片不仅是插图，更能塑造阅读节奏与体验。

现在只需要一个 [`shape-outside`](https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside) 和 [`shape-image-threshold`](https://developer.mozilla.org/en-US/docs/Web/CSS/shape-image-threshold) 就可以实现这样的图像 Alpha 通道环绕效果了。

以及，CSS `shade-*` 的支持已经广泛可用（Baseline Widely available）了。

有点小感慨，回忆了一下以前的各种黑魔法 hack 实现，和现在的越来越多的 CSS 新特性。

![](https://r2.cosine.ren/i/2025/08/076bf2caac62bd6ce7f1efda58849784.webp)

## 生态与社区动态

- [供应链安全警报：流行 Nx 构建系统软件包遭数据窃取恶意软件入侵](https://www.stepsecurity.io/blog/supply-chain-security-alert-popular-nx-build-system-package-compromised-with-data-stealing-malware)：nx 包被投毒，通过调用 AI CLI 工具窃取敏感资料。由于 nx 包 Github 仓库的 Github Actions 权限配置错误，导致 npm Token 被黑客窃取。黑客在短时间内发布了多个带毒新版本软件包，诱导受害者升级，恶意软件会通过 postinstall 过程安装，这已是第几起类似事件。

- [重塑 Remix：V3 将放弃 React，转而使用 Preact 的分叉](https://www.infoq.com/news/2025/08/remix-run-v3-drops-react/)：Remix v3 将弃用 React、改用 Preact 分叉以“自有”更多栈并最小化依赖，强调 Web API、运行时优先与可组合性并优化 LLM，社区反应不一且预览版尚未发布。 [[Remix 原文]](https://remix.run/blog/wake-up-remix)

- 上周这事儿，还有后续呢。[微软正式表态 Windows 11 8 月更新与 SSD 硬盘故障无任何联系｜ WI1138854 - 小众软件](https://www.appinn.com/windows11-aug-update-no-ssd-issue/)：微软称经调查与遥测未发现 KB5063878 与 SSD/HDD 故障有关，暂无证据表明更新致存储问题，并将继续监控反馈。

- JavaScript 的商标问题还在战斗，[JavaScript’s trademark problem](https://2ality.com/2025/08/javascript-trademark.html)：解析 Oracle 持有 “JavaScript” 商标带来的法律风险，并提出三条路径：迫使其放弃商标（Deno 诉讼）、改名或以“JS”替代；若前者成功，ECMAScript 或可更名为“JavaScript standard”。

- [在 Firefox 中尝试 PWA，并告诉我们您的想法！](https://connect.mozilla.org/t5/firefox-labs/give-web-apps-in-firefox-a-try-on-labs-and-tell-us-what-you/td-p/101900)：Firefox 浏览器 在 Release 142 推出实验性 Web Apps（PWA）功能，欢迎试用并反馈。

- [面向网络的 AI 辅助功能](https://developer.chrome.com/docs/devtools/ai-assistance/network?hl=zh-cn)：Chrome 把 AI 助手集成到了 DevTools 的网络面板中，现在可以基于所选请求进行分析与对话，包括打开方式、上下文与原始数据查看、示例提示、历史管理及反馈机制。

## 文章与视频

- [Say bye with JavaScript Beacon](https://hemath.dev/blog/say-bye-with-javascript-beacon/)：作者指出在 beforeunload/unload 里用 XMLHttpRequest 或 fetch 上报并不可靠，因为浏览器不会为脚本阻塞卸载流程，网络请求易被取消；推荐使用信标接口 (Beacon API) 的 `navigator.sendBeacon` 进行 `fire-and-forget` 异步上报：无需回调或 Promise，JS 立即结束，由浏览器后台传输；虽仅支持 POST 且负载很小，但非常适合离开页面、实时埋点与轻量级前后端同步等无需等待响应的场景。

  - 有关 Beacon API 的更多信息，请查看 MDN https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API

- [你的字体加载错误（这会影响你的性能）](https://www.jonoalderson.com/performance/youre-loading-fonts-wrong/)：系统梳理网页字体从历史到工程实践的全部要点，指出常见误区并给出面向性能、可访问性与合规的最优加载方案，也是很有意思的一篇文章。

  > EOT：Internet Explorer 的专有格式，谢天谢地已经灭绝。
  > ![“谢天谢地已经灭绝”](https://r2.cosine.ren/i/2025/08/131bf178ccbfa4502f84040880d82b53.webp)

- [了解 daisyUI 5 中的新功能以及如何迁移](https://blog.logrocket.com/daisyui-5-whats-new/)：daisyUI 5 完全重写，以更轻量快速并引入强大的新主题引擎和组件，全面配合 Tailwind CSS 4，带来更高性能与更强定制能力。

- [HTML 之快速了解 hidden=until-found 的作用 « 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2025/08/html-hidden-until-found/)：介绍 `hidden` 的 `until-found` 隐藏机制及 `beforematch` 事件，基于 `content-visibility:hidden` 在锚点/页面查找时自动显现，适用于折叠内容、帮助信息与标签页，Chrome 已支持多年，Safari 亦已跟进。

- [Big O](https://samwho.dev/big-o/)：讲算法复杂度的一篇文章，有丰富的交互式 demo，以求和、冒泡排序与二分查找等可视化示例通俗讲解 Big O（`O(1)`、`O(log n)`、`O(n)`、`O(n^2)`）的增长规律，并给出用 Set/Map、索引遍历与结果缓存等实用性能优化建议。

- [加速 JavaScript 生态系统 - Semver](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-12/)：一次性能剖析，展示如何让包管理器中的语义化版本（Semver）比较提速至 33x

### CSS

- [你“可能”不再需要 JavaScript](https://lyra.horse/blog/2025/08/you-dont-need-js/)：一篇以实践与立场并重的长文，作者以“很多站点并不需要 JavaScript”为引子，系统展示现代 CSS 的强大与可用性，展示仅用 HTML/CSS 即可实现动画、主题、表单校验、组件交互与移动端适配。

- [interpolate-size 属性是渐进增强的典范](https://piccalil.li/blog/the-interpolate-size-property-is-a-great-example-of-progressive-enhancement/)：用 CSS 属性 (interpolate-size) 在支持的浏览器里平滑过渡到 height: auto，并以渐进增强保证旧浏览器得到最小可用体验

- [抢先学习大开眼界的 CSS corner-shape 属性 « 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2025/08/css-corner-shape/)：详解 CSS 新特性 corner-shape，基于 border-radius 自定义角形（round/squircle/scoop/bevel/notch/square 或 superellipse(K)），支持按方位设置与平滑动画，目前仅 Chrome 139+ 支持。

- [锚点定位基础](https://ishadeed.com/article/anchor-positioning/)：本文系统介绍了 CSS 锚点定位（Anchor Positioning）基础：通过为任意元素定义锚（`anchor-name`）并在目标元素使用 `position-anchor`、`anchor()` 或 `position-area` 等特性，实现在不重构 DOM 的前提下，将元素稳定地相对其他元素对齐，并用 `position-try-fallbacks`（如 `flip-block`、`flip-inline`）优雅处理视口溢出问题。

- [gradient.style 的制作](https://nerdy.dev/the-making-of-gradient.style)：从草图到上线，作者分享如何在遵循 CSS Images 规范下，把渐变的 `color stops`、`double positions` 与 `transition hints` 可视化，并落地为可用的设计与开发工具 [CSS HDR Gradients](https://gradient.style/)

- [CSS 电梯：带有楼层导航功能的纯 CSS 状态机](https://css-tricks.com/css-elevator-a-pure-css-state-machine-with-floor-navigation/)，介绍如何仅用现代 CSS（`:has()`、`@property`、自定义属性、计数器等）构建可交互的电梯状态机，实现楼层导航、方向指示、按距离调速动画与无障碍播报，无需 JavaScript，并给出实际应用场景。

![](https://r2.cosine.ren/i/2025/08/aa14bcaf1a0f519afe06eea000bc68db.webp)

> 这部电梯不仅仅是一个玩具。这是一个蓝图。考虑以下实际用途：
>
> - 没有 JavaScript 的交互式原型
> - 使用实时状态的窗体中的进度指示器
> - 具有库存或状态机制的游戏 UI
> - 逻辑谜题或教育工具（仅 CSS 状态跟踪！)
> - 减少对性能或沙盒环境的 JavaScript 依赖
> - 这些技术在静态应用程序或受限脚本环境（例如电子邮件、某些内容管理系统小部件）中特别有用。

然后是两篇关于 CSS path 的教程，这两篇文章的质量非常高，交互 demo 特别多，是很棒的教程。

- [The `-path` of Least Resistance (Part 1)](https://frontendmasters.com/blog/the-path-of-least-resistance-part-1/)：本文深入讲解了 CSS `clip-path` 的语法与用法，从基础图形到复杂自定义路径，展示了如何突破方框限制，让界面元素拥有更灵活和富有表现力的形状。

- [The `-path` of Least Resistance (Part 2)](https://frontendmasters.com/blog/the-path-of-least-resistance-part-2/)：深入讲解 CSS `offset-path` 路径动画，用 `offset-distance` 沿自定义路线运动，结合 `offset-anchor` / `offset-position` / `offset-rotate` 与变换顺序控制锚点与朝向，解析闭合/开放路径及负/溢出距离、ray() 无限射线、性能优化与减弱动效可访问性等要点。

## 工具与库更新

- [CSS HDR Gradients](https://gradient.style/) 这个工具相当棒～生成 CSS 渐变的工具，亮点是有很全的色彩空间支持。 [[GitHub 地址]](https://github.com/argyleink/gradient-style)
  ![](https://r2.cosine.ren/i/2025/08/b0c6070f587085b5ad1d0379548d540a.webp)

- [Chainlift/liftkit](https://github.com/Chainlift/liftkit)：LiftKit 是一个基于黄金比例的 UI 框架，它的核心是一组公式和变量，结合 Material 3 提供动态颜色与光学间距校正；通过模板或 CLI 可快速集成到 Next.js，支持按需安装与 CSS 树摇，附带 Figma/Webflow 资源与 FAQ，但按钮变体和变量文档仍在完善中。
  ![](https://r2.cosine.ren/i/2025/08/d800d0d0e28c8879f5fc569c8036ef53.webp)

- [Meridius-Labs/electron-liquid-glass](https://github.com/Meridius-Labs/electron-liquid-glass)：一个在 macOS 上为 Electron 应用提供原生 NSGlassEffectView 炫酷玻璃效果的库，零配置即可使用并支持自定义。支持 TypeScript、自动暗黑模式、可定制边角和颜色，且有预编译二进制文件。仅限 macOS，在其他平台上会安全降级为 no-op（无效果但不报错）。

- [transloadit/uppy](https://github.com/transloadit/uppy) 模块化 JavaScript 文件上传器 Uppy，支持多源选择、断点续传、可插拔 UI 与后端集成，快速为任意应用构建可靠上传体验

### 库更新

- [ESLint v9.34.0 中的新功能：多线程 Linting](https://eslint.org/blog/2025/08/multithread-linting/) —— ESLint v9.34.0 原生支持多线程并行 lint，通过 `--concurrency` 启用，在大项目中可带来约 1.3x ～ 3.01x 提速，并提供基准与缓存等优化建议。

- [Introducing Zod Codecs](https://colinhacks.com/essays/introducing-zod-codecs)：Zod 4.1 引入编解码器（codec）API，实现类型安全的双向数据转换，弥补 transform 的单向缺陷。

- [Node.js v24.7.0 (Current)](https://nodejs.org/en/blog/release/v24.7.0)：引入后量子密码学（Post-Quantum Cryptography）与 Web Cryptography 现代算法、在单个可执行应用程序中 Node.js 执行参数支持及根证书更新到 NSS 3.114 的一次重要版本

- [Rspack 1.5 发布公告 - Rspack](https://rspack.rs/zh/blog/announcing-1-5)：新版本聚焦构建性能、浏览器运行与生态升级，带来 barrel 文件延迟构建、原生文件监听、常量/枚举内联、模块联邦运行时提升等一系列优化与新特性，Rstack 其他进展如下：

> - Rslint 发布：TypeScript 优先的新一代 Linter（Go 实现，基于 typescript-go），支持 ESLint 风格配置、IDE 插件、自动修复，已覆盖 50+ 条 @typescript-eslint 规则；见 [Rslint 官网](https://rslint.rs/)。
> - Rsbuild 1.5：默认开启 lazyCompilation、lazyBarrel、inlineEnum、typeReexportsPresence 等，加速开发与准确类型处理；新增 [output.module](https://rsbuild.rs/zh/config/output/module) 支持 Node.js ESM 产物，后续将扩展到 Web。
>   Rslib 0.12：模板集成 Rstest 测试框架，推进全新 ESM 产物方案，目标对齐 esbuild/Rollup 的产物质量并保持 webpack 互操作一致性；参考 [interop 测试](https://jserfeng.github.io/interop-test/by-test-case)。
>   Rspress 2.0 beta：新增 Markdown 文本复制组件，配合 [@rspress/plugin-llms](https://v2.rspress.rs/plugin/official-plugins/llms) 自动生成符合 llms.txt 标准的文件，方便大模型处理内容。
>   Rsdoctor 1.2：新增聚合模块精确分析与全新 Treemap 视图，改善可视化与准确性；详见 [Rsdoctor 1.2 发布博客](https://rsdoctor.rs/zh/blog/release/release-note-1_2)。
>   Rstest 0.2：新增完整 mock API（ESM 支持）、watch 模式增量重跑与 CLI 快捷键，显著提升测试效率；见 [Mock API 文档](https://rstest.rs/api/rstest/mockModules)。

- Prisma 都整的加了个 AI 安全护栏了，太体贴了，[Prisma 6.15.0](https://github.com/prisma/prisma/releases/tag/6.15.0) 发布：新增 AI 安全护栏、统一 prisma-client 运行时配置、支持 Vercel Fluid 连接池、Management API GA、Pipedream 集成、create-db 输出 JSON、直连能力接近 GA。

  > Prisma ORM 现在包括内置安全检查，可在 AI 编码助手触发时防止破坏性命令。CLI 可以识别它何时被流行的 AI 代理执行，例如 Claude Code、Gemini CLI、Qwen Code、Cursor、Aider 和 Replit。

- Electron 37.4、Faker 10.0、Tiptap 3.3、RxDB 16.18……

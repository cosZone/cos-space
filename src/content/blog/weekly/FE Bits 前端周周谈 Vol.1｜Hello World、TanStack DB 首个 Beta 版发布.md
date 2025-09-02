---
title: FE Bits 前端周周谈 Vol.1｜Hello World、TanStack DB 首个 Beta 版发布
description: 本期为 FE Bits 前端周周谈创刊号，精选并总结了过去一周全球泛前端生态的新动向、重要技术动态、文章推荐、工具和代码库更新，以及深入分析几篇行业高质量内容。内容涵盖 TypeScript、React、CSS Masonry、Web 安全、Node.js/Bun、新一代前端架构（Remix 3）、Web 交互特效、独立开发实践等。
link: weekly-1-hello-world
catalog: true
lang: cn
date: 2025-08-02 22:20:50
tags:
  - 前端
  - JavaScript
  - 全栈
  - AI
categories:
  - 周刊
---

本来在犹豫要不要博客上也发一份，想了想我的更新频率，那还是发吧～～

# 前言

今天是 2025 年 8 月 2 日，星期六，不是什么特殊日子。

我是 cos（cosine），之前在自己的[频道](https://tg.cosine.ren/)经常进行一些输出，想将其记录下来，于是写下了这个周刊的描述，先开始再说！

> 随性更新，捡拾那些值得细品的泛前端圈子的新鲜事，不争高低，只作播报，把最新、最好玩的技术，第一时间分享给同样好奇的你～
> 这里没什么大新闻推送，也不卷热点。就像在朋友圈跟你碎碎念，聊聊最近前端和技术圈的那些有趣小事。
> 不是每条都要“颠覆世界”，但都让我觉得“哎，这不错，想和你分享”。
> 可能是偶尔深夜刷到的新闻，也可能是偶尔工作摸鱼时的灵感，或者一段小小的吐槽。
> 总之代码和生活都要松弛一点，慢慢看、慢慢聊，别让新技术把自己搞得太紧张。
> 反正我也不急——你也别急～

其实这些新闻平常自己都能看，我只不过借助 AI 和自己的总结做了一些汇总以及翻译的工作，因为中文互联网的前端精品周刊现在难得一见，大多数都停更了或是扩圈了，索性自己做了～

我希望这个周刊不那么严肃，更自然一些，但是还在摸索阶段，暂时是我一个人维护，所以很依赖 AI 和自动化，相对的就少了些人味儿，非常欢迎评论反馈。

更新时间期望是在每周天，若本周内容少，则可能合并到下一期作为双周刊～推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。

本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注

# 生态与社区动态

> AI 简评：嚯，社区最近可真热闹！TypeScript 5.9 RC 带着 import defer 和 Node 20 新模块来串门了，TanStack DB 也端出首个 Beta 版，给 Query 加了点“本地存储魔法”，增量更新嗖嗖快。HTML 和 Stack Overflow 两大年度调查又开张了，React 依然是“梦中情框架”，Svelte 则靠“魅力值”圈粉。Parcel 和 React Native 也没闲着，一个猛攻 React Server Components，一个在 iOS 上搞预编译号称要“快十倍”，卷得飞起！es-toolkit 悄悄上位，成了 Lodash 的“平替明星”，Vercel 更是整了个新活“Fluid compute”——说白了就是“无服务器的服务器”（这名字起得...绝了）。至于 Tabs vs Spaces 的“圣战”？有人宣布“大局已定”：Spaces 党赢了。安全方面嘛... npm 江湖不太平，is 包被钓鱼劫持，Stylus 更是惨遭“连坐”乌龙被误删（现已复活），吓得谷歌赶紧掏出“OSS Rebuild”当救兵。哦对了，W3C 发了份“价值观宣言”，而最甜的是——MDN 文档网站过 20 岁生日啦！

## 社区动态

- [TypeScript 5.9 RC 发布](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9-rc/)，带来 `import defer` 和 `--module node20` 等新特性。
- [TanStack DB 首个 Beta 版发布](https://tanstack.com/blog/tanstack-db-0.1-the-embedded-client-database-for-tanstack-query)，为 TanStack Query 带来高效增量更新与乐观写入能力，实现在本地侧存储场景的差分数据流 (differential dataflow)。
- [HTML 2025 状况调查开启](https://survey.devographics.com/en-US/survey/state-of-html/2025)，旨在收集前端开发者对 HTML 发展状况的意见。
- [Stack Overflow 2025 调查](https://survey.stackoverflow.co/2025/)显示 React 继续蝉联 “最受开发者渴望（most desired）” Web 技术头名，尽管 Svelte 更 “受人钦佩（admired）”
- [Parcel 深入支持 React Server Components](https://devongovett.me/blog/parcel-rsc.html)，并解析 "use client" 等指令的实际作用机制。
- [React Native 下一个版本中引入预编译的 iOS 版本](https://expo.dev/blog/precompiled-react-native-for-ios)，RC3 阶段承诺将构建时间缩短 10 倍
- [es-toolkit](https://es-toolkit.dev/) 成为 Lodash 100% 兼容替代，已被 Storybook、Recharts 等主流项目采用。
- [Vercel 发布 Fluid compute 平台](https://vercel.com/blog/fluid-how-we-built-serverless-servers)，该平台本质上提供 “无服务器服务器（serverless servers）”。
- [一名开发者声称，关于 tabs 与 spaces](https://xn--gckvb8fzb.com/tabs-vs-spaces-the-war-is-over/) 的争论趋于结束，主流语言倾向使用 spaces。
- [MDN 文档网站庆祝成立 20 周年](https://developer.mozilla.org/en-US/blog/mdn-turns-20/)，目前拥有超 14,000 页内容，是 Web 开发的重要资料库

> 浏览器制造商之间有一个悠久的传统，即互相发送蛋糕以纪念重要的里程碑。一个好的蛋糕对于保持团队之间的协作精神非常重要，这些团队有时会竞争，但最终会建立一个每个人都可以享受的开放网络。Microsoft 为 Firefox 2、3 和 4 发送了 Mozilla 蛋糕，我们还为 IE10 发送了 Mozilla 蛋糕
> ![](https://static.quail.ink/media/5nvv9tzl8w.webp)

> 编者按：好有意思的庆祝生日

- [2025 Stack Overflow 开发者调查结果公布](https://survey.stackoverflow.co/2025)，涵盖开发工具、AI 代理、LLM 使用现状等
- W3C 发布概述 “支撑 W3C 使命的价值观” 的[重要新文档](https://www.w3.org/TR/2025/STMT-w3c-vision-20250729/)

## 安全动态

- 对 npm 生态系统的攻击仍在继续，[`is`  包通过](https://nodeweekly.com/link/172337/web)与 npm 相关的域名抢注域名被劫持，该域被用来[网络钓鱼登录详细信息。](https://nodeweekly.com/link/172338/web)
- [npm 不慎移除了被广泛使用的 Stylus 库](https://www.bleepingcomputer.com/news/security/npm-accidentally-removes-stylus-package-breaks-builds-and-pipelines/)，导致全球开发者构建和 CI/CD 流程中断。移除原因是 Stylus 的一位维护者发布了无关的恶意软件包，导致其账户及关联软件包被禁，Stylus 库也因此受牵连。现 npm 页面已恢复。
- [谷歌推出了 OSS Rebuild](https://security.googleblog.com/2025/07/introducing-oss-rebuild-open-source.html)，试图通过允许将包与上游进行比较来使开源生态系统（如 npm）更加安全。

# 文章与视频

- 《[TailwindCSS v4 全新颜色系统与主题切换](https://innei.in/posts/tech/tailwindcss-v4-color-system-theme-switching-guide)》本文介绍了在 TailwindCSS 中实现暗色模式（dark mode）颜色切换的演变，从使用 CSS 变量到新版 v4 应用 color-mix() 混色函数和 @layer 层级特性。作者也推荐了自己开发的 [Pastel](https://github.com/Innei/Pastel) 颜色系统库以便更好应用这些特性。
- 《[独立开发穷鬼套餐(Web 实践篇)](https://guangzhengli.com/blog/zh/indie-hacker-poor-stack)》本文聚焦独立开发，分析独立开发者在成本敏感阶段时，推荐基于 Next.js 生态、善用云平台/Cloudflare/VPS 的免费与低价服务组合，少花时间精力在技术堆栈和云服务“薅羊毛”上，把更多心力放在产品打磨与市场推广上，实现“低成本、高专注、快试错”的独立开发之路。
- 《[The Useless useCallback](https://tkdodo.eu/blog/the-useless-use-callback)》React useCallback 的滥用现象与性能相关实践讨论，分析 useCallback、useMemo 潜在问题，展望 React Compiler 与 useEffectEvent 等新工具的改善能力。

> 编者按：也算是 React 的日经问题了 hhh

- 《[Performance Extensibility API](https://csswizardry.com/2025/07/the-extensibility-api/)》允许自定义轨迹供 Chrome DevTools 性能面板分析，本文探讨了该 API 如何弥补浏览器元性能指标（如 Core Web Vitals 指标）的不足，并展示了在实际 Web 性能监测和优化中的应用方法。
- 《[Responsive Video is (Almost) Easy Now](https://www.kooslooijesteijn.net/blog/responsive-video-easy)》介绍了响应式视频的实现，通过 html 的 video 标签，如何提供垂直和横向视频以适应不同场景。
- 《[Remix 3 和 React-中心架构的终结](https://thenewstack.io/remix-3-and-the-end-of-react-centric-architectures/)》 探索 React 未来架构趋势。
- 《[Next.js 运行时密钥注入实战](https://phase.dev/blog/instrumenting-nextjs-with-runtime-secret-injection/)》 深入分析密钥管理在微服务和 SSR 场景下的重要性
- 《[将 JSX 改写为 Astro 的思考](https://carlosn.com.br/blog/post/notes-on-rewriting-jsx-as-astro/)》 带来组件语法和工程结构的迁移经验。
- 《[The Multi-Repository TypeScript Problem](https://nodeweekly.com/link/172343/web)》探讨 TypeScript 多仓库（multi-repo）间的类型安全问题及解决方法。
- 《[JavaScript 中的逻辑赋值操作符：小语法，大胜利](https://allthingssmitty.com/2025/07/28/logical-assignment-operators-in-javascript-small-syntax-big-wins/)》分析 JavaScript 逻辑赋值操作符的语法进步及实际开发中带来的便利。
- 《[When Is WebAssembly Going to Get DOM Support?](https://queue.acm.org/detail.cfm?id=3746174)》本文分析了 WASM 与 DOM 等 Web API 的集成现状和未来。作者认为，WASM 最初和 JavaScript 分离，但可以通过 JS 间接操作 DOM。目前主流浏览器没有推动标准化原生 DOM 支持这方面标准。开发者应关注性能和可维护性，选好工具链高效开发，不必追求完全“无 JS”的 WASM 方案。
- 《[Liquid Glass on the Web](https://frontendmasters.com/blog/liquid-glass-on-the-web/)》 一个 Liquid Glass Web 实现合集 demo 整理，有几个实现的确实漂亮啊～

![image.webp](https://static.quail.ink/media/km88lix2y2.webp)

![image.webp](https://static.quail.ink/media/e3nn5hwlnm.webp)

- 《[使用 Three.js、WebGPU 和 TSL 进行交互式文本销毁](https://tympanus.net/codrops/2025/07/22/interactive-text-destruction-with-three-js-webgpu-and-tsl/)》本篇文章系统地讲解了如何借助 Three.js、WebGPU 以及 Three Shader Language（TSL），实现炫酷的 3D 交互文字爆炸效果动画。内容覆盖从字体准备、场景搭建、顶点及物理模拟，到高级后处理，完整展示了现代 Web 图形技术的艺术与技术融合。

![image.webp](https://static.quail.ink/media/4n664t43d5.webp)

> 编者按：看了这篇突然意识到我写的那篇好烂，完全不是面向基础的教程哈哈哈～感觉这种一步步来的真不好写。

- 🎥【[Bun 的创建者谈构建 Bun 和 Node.js 兼容性](https://www.youtube.com/watch?v=VGjJWXFYyQo)】解析 Bun 作为 Node.js 生态“替代品”的兼容性挑战与工程实践。

## CSS 新特性

- 《[Brick by brick: Help us build CSS Masonry](https://developer.chrome.com/blog/masonry-update?hl=en)》Chrome 和 Edge 团队宣布 CSS Masonry 布局已在 Chrome/Edge 140 中开放开发者测试，文章详细介绍了 CSS Masonry 的概念、与现有布局的对比、两种正在讨论的语法提案等
- 《[Making a Masonry Layout That Works Today | CSS-Tricks](https://css-tricks.com/making-a-masonry-layout-that-works-today/)》介绍了当前 CSS Masonry 的浏览器支持现状及其多种语法方案，并提出了一种通过简洁 JavaScript 实现兼容所有主流浏览器的马赛克布局方法。
- 《[Creating a scroll-spy with 2 lines of CSS](https://una.im/scroll-target-group/)》：Chrome 140 浏览器引入 `scroll-target-group` 和 `:target-current`，可用两行 CSS 实现目录高亮跟踪效果，将其添加为用户的渐进式增强功能非常容易。_作为一项标准轨道功能，它最终应该会跨浏览器登陆。_

# 代码、工具与库更新

- [World Clock Slider](https://codepen.io/jkantner/pen/pvjNNVz)：这是一款智能时钟组件，支持滑动快速查看各时区城市当前时间。操作流畅，还支持深色模式，非常酷。
  ![demo](https://static.quail.ink/media/9477dbmeyp.webp)
- [StaticSearch](https://github.com/craigbuckler/staticsearch)：为静态站点增添搜索，无需后端，基于 Javascript，数据存储为 JSON。
- [Oklchroma](https://oklchroma.utilitybend.com/)：基于 OKLCH 色彩空间的一键和谐色板生成器，内置曲线渐变算法。
- [AudioTee.js](https://stronglytyped.uk/articles/audioteejs-macos-system-audio-capture-nodejs)：为 Node.js 捕捉 macOS 系统音频输出，并以 PCM 格式定期输出。
- [FossFLOW](https://github.com/stan-smith/FossFLOW)：等距基础架构图形工具，支持丰富图标与数据管理
- [difit](https://github.com/yoshiko-pg/difit)：使用 GitHub 风格查看器查看和审查本地 git 差异的 CLI 工具，评论还可以作为 AI 提示进行复制。
- [7.css](https://khang-nd.github.io/7.css/)：忠实还原经典 Windows 7/XP UI 的 CSS 设计系统
- [Better Upload](https://better-upload.com/) 支持各类 S3 兼容存储的极简文件上传，适配 Next.js、TanStack Start、Remix 和 Hono 等框架。
- [Transformers.js 3.7](https://github.com/huggingface/transformers.js/releases/tag/3.7.0)：在浏览器与 Node.js 侧支持 ONNX 预训练模型推理，v3.7 增加了 Voxtral（语音转录及音频理解）、LFM2 和 ModernBERT 支持。
- [match-sorter 8.1](https://github.com/kentcdodds/match-sorter)：为数组筛选和排序提供确定性算法，便于开发者实现可预期的最优匹配排序。
- [React Native Reanimated 4](https://blog.swmansion.com/reanimated-4-stable-release-the-future-of-react-native-animations-ba68210c3713) 正式带来类 CSS 动画与过渡体验到 React Native，兼具复杂能力与高性能。
- [Rooks.js 8.4](https://rooks.vercel.app/docs) 提供接近 100 个自定义 hooks，涵盖在线状态、窗口大小、语音合成、键盘输入等各类场景。

# 深入分析

本篇章为结合 AI 摘要对感兴趣的文章进行的一些详细分析～

> 使用我自己开发的 [MoeCopy AI](https://github.com/yusixian/moe-copy-ai) 浏览器插件进行的网页总结！超轻量级，填入自己的 apikey 即可使用，欢迎尝试~喜欢的话可以给个 star。 [Chrome 商店](https://chromewebstore.google.com/detail/moe-copy-ai/dfmlcfckmfgabpgbaobgapdfmjiihnck)

## 过去十年的许多、许多、许多 JavaScript 运行时

史学家看过来！（很好的文章）
[The many, many, many JavaScript runtimes of the last decade](https://buttondown.com/whatever_jamie/archive/the-many-many-many-javascript-runtimes-of-the-last-decade/)

> AI 摘要：过去十年，JavaScript（简称 JS）运行时（JavaScript Runtime）经历了爆炸性增长，跨越云、边缘（Eadge）、微控制器、智能电视、移动/桌面原生应用（Native App）等众多环境。随着 Node.js、Deno、Bun、Cloudflare Workers、Hermes、QuickJS 等不同引擎和运行时的出现，JS 开发者获得了前所未有的选择自由。文章系统梳理了驱动 JS 运行时百花齐放的原因：硬件性能多样化、任务场景多元化、与原生 API 的融合需求以及跨平台/多语言互操作等。最终结论是：没有哪一个 JS 运行时能“一统天下”，不同场景必然产生不同最优解，也促成了生态繁荣与技术创新的持续推进。

### 1. 服务端、边缘计算和云端

- Node.js （V8 引擎，2009）
- AWS Lambda/Lambda@Edge （Node.js 作为底层）
- Cloudflare Workers （workerd 运行时，V8 引擎定制版）
- Deno （V8 引擎，2018/2019）
- Deno Deploy （Deno 的云端运行时）
- Bun（JavaScriptCore 引擎，2022）
- WinterJS（SpiderMonkey 引擎，2023, Wasmer）
- Wasmer Edge（基于 Wasmer 的 WebAssembly 平台，支持 WinterJS）
- LLRT（AWS, QuickJS 引擎，2024）

### 2. 微控制器与低资源环境

- Duktape（极小 JS 引擎，2013）
- Espruino（JS on 微控制器，2013）
- mjs（极小 JS 引擎，2013）
- JerryScript（2014）
- Moddable/XS（XS 引擎，2018 左右）
- elk（极小 JS 引擎，2021）

基于以上引擎的运行时：

- IoT.js（JerryScript，2015）
- Microlattice.js（JerryScript，2016）
- low.js（Node.js 精简版，基于 Duktape，2018）

### 3. 多语言/跨语言（Polyglot）引擎及运行时

- Rhino（Java 实现的 JS 引擎，1997，JVM）
- Nashorn（JDK 8，继任 Rhino，2014，JVM）
- Graal.js（GraalVM，JDK 11, 2018，支持 Node.js SDK）
- jint（C# .NET，2013）
- PyNarcissus（Python，2009）
- langjs（Python，2009）
- jispy（Python，2014）
- twostroke（Ruby，2011）
- Opal（Ruby，2013）
- elsa（Go，2020）
- Boa、toyjs、rquickjs、spiderfire、Nova、jaws（Rust，2018-2024）
- Kiesel（Zig，2023）

JavaScript 引擎甚至正在 JavaScript 中实现！

- Narcissus（JS 实现，2007-2010，被 Mozilla 用作快速原型设计新 JavaScript 语言特性的测试平台）
- Jscomp（JS -> C++ AoT 编译器，2015，用 JavaScript 编写的 AoT 编译器，可生成 C++ 可执行代码）
- Porffor（JS->WASM/C，2023）
- Oliver Medhurst（继承 Porffor，改编为 WASM / C）
- Shadow（JS 实现 Web 引擎，2023）

> 尽管有争议的是，并非所有这些项目都是完全“多语言”的——有些仅仅是解释器，不提供双向语言互操作。

### 4. 桌面/移动/智能电视原生应用相关运行时/框架

### 基于 WebView 方案

- Adobe 发布的 PhoneGap （2009，WebView，内置 JS 引擎）
  - 在此过程中，它被开源为  Cordova，并为其创建了一个 UI 工具包 Ionic
  - Ionic 团队在 2019 年继续宣布 Cordova 的继任者 Capacitor。
- Electron（2015 更名）
  - 其根源可以追溯到 node-webkit（2012），后更名 NW.js（2015）。
  - 2013 年 GitHub 开始开发  Atom Shell（类似 NW.js），在 2015 年更名为 Electron
- 智能电视上：
  - Amazon Fire TV / Fire Stick / 三星 Tizen TV（Chromium + Cordova）
  - Apple TV 曾经提供过一个 TVMLKit JS 框架（基于 JavaScriptCore）
    - 不是基于 Web 技术的，只是实现了非常少量的 DOM 规范。
  - Roku（BrightScript，非 ECMAScript）

### React Native 生态

- React Native（JS runtime 最初为 JavaScriptCore，后为 Hermes，还可对接多种引擎）
  - Hermes（Meta 自研引擎，2019，2022 成为默认，Static Hermes 为 2023 继任者）
  - React Native 开始实现与引擎无关的  [JavaScript 接口 （JSI）](https://reactnative.dev/architecture/landing-page#fast-javascriptnative-interfacing)， 使其能够适应各种引擎的使用。现已在 Hermes 和 JSC、V8、QuickJS、Chakra、Duktape。
    > 事实上，React Native 看起来将成为最不受引擎影响的 JavaScript 运行时，因为微软、 Callstack 和 React Native 社区（包括我自己！）目前正在努力提供[对 Node-API 的支持](https://www.callstack.com/blog/announcing-node-api-support-for-react-native) ，它的支持甚至比 JSI 更广泛（稍后会详细介绍）。考虑到 Static Hermes 承诺提供的一流本地代码互操作，它从最初的单引擎、消息发布运行时到现在，它已经走过了漫长的道路。

### 其他原生方案

- NativeScript（2014，JSCore/V8，后统一为 V8，现重构为基于 Node-API 的引擎无关库，支持 iOS/Android/Universal Windows/Android TV/Android Wear/tvOS PoC）
- Node.js 在本地应用开发的尝试
  - Node.js 最初主要用于服务端，参与本地应用开发场景通常仅用于调用 Node.js SDK 或本地插件，难以构建完整 GUI 应用。
  - 2017 年 Janea Systems 首次将 Node.js 移植到移动端（核心障碍为 iOS 禁止 JIT），采用换引擎策略（使用 ChakraCore、SpiderMonkey、JavaScriptCore、JerryScript 等）来规避限制，逐步向 JITless V8 靠拢。
  - 保持小众影响，截至 2023 年由 André Staltz 继续维护移动端适配。
  - 三星亦自行基于 Escargot 引擎开发轻量级 Node.js，用于 Tizen OS，但影响范围有限。
  - 桌面侧围绕 Node.js 开发了多种本地功能库（如 NodObjC、objc、NativeScript for macOS、NodeRT、nodeQt、NodeGUI 等），但未能成长为可与 Electron 竞争的主流端到端开发框架。

### 5. 其他/补充/提及但未展开介绍的

- Lynx（字节跳动 2025，PrimJS 引擎，兼容 JSCore/QuickJS/V8 via Node-API）
- LibWeb（Ladybird 浏览器，LibJS 引擎，2020）

> 除此之外，我还有一份荣誉奖清单，我根本没有设法融入故事中（尽管不可否认，有些超出了“过去十年”的界限）。即：

- gjs（基于 SpiderMonkey 的 JavaScript 运行时，与 GNOME 绑定。，2008）
- MuJS（高度可嵌入，2013）
- JavaScript for Automation（JXA）：Apple 基于 JavaScriptCore 的 JavaScript 运行时
- dukluv/txiki.js（libuv + Duktape/QuickJS，2014/2019）
- Napa.js（多线程，V8，2016）
- Bare（小型模块化 JS 运行时，2022）
- lo.js（2023，支持 C 互操作）

### 6. 引擎名录归集

- V8（Google，Node.js/Deno 等）
- JavaScriptCore (JSC)（Apple，Safari/Bun/React Native 最早）
- Hermes（Meta，React Native）
- QuickJS（Fabrice Bellard，LLRT 等）
- SpiderMonkey（Mozilla，WinterJS/gjs 等）
- Chakra/ChakraCore（MS，Node-ChakraCore/React Native Windows）
- JerryScript
- Duktape
- XS
- PrimJS（字节，基于 QuickJS）

---

文章基本把近十年里主流、偶像级、新锐和小众 JavaScript 运行时、底层引擎、跨语环境集成的实现大盘点了一圈，覆盖了：

- 云、边缘（Edge）、服务器
- IoT & 微控制器
- 跨端原生开发
- 桌面和 TV 等特殊平台
- 多语言互操作
- 各类底层引擎及其实现

如有遗漏，可从原文结尾的附录挖掘更多“提及但未详谈”的小众项目。

所以，归纳下来文章列举的 JavaScript 运行时主要有：

---

Node.js、Cloudflare Workers、Deno、Deno Deploy、Bun、WinterJS、Wasmer Edge、LLRT、Duktape、Espruino、mjs、JerryScript、Moddable/XS、elk、IoT.js、Microlattice.js、low.js、Rhino、Nashorn、Graal.js、jint、PyNarcissus、langjs、jispy、twostroke、Opal、elsa、Boa、toyjs、rquickjs、spiderfire、Nova、jaws、Kiesel、Narcissus、Porffor、Cordova/PhoneGap、Ionic、Capacitor、Electron、NW.js、React Native（Hermes/JSC/V8/QuickJS/Chakra/Duktape）、Expo、NativeScript、Node.js for mobile（及各变体）、Lynx、LibWeb、gjs、MuJS、JXA、dukluv、Napa.js、txiki.js、Bare、lo.js 等等。

上面提到的或者支撑它们的引擎分散为：V8、JavaScriptCore、Hermes、QuickJS、SpiderMonkey、Chakra、JerryScript、Duktape、XS、PrimJS 等。

真的是很多很多呀～

## Remix 3 和以 React 为中心的架构的终结

[Remix 3 and the End of React-Centric Architectures](https://thenewstack.io/remix-3-and-the-end-of-react-centric-architectures/)

> AI 摘要：本文主要介绍了 Remix 3 发布带来的重要变革，即前端开发不再仅仅以 React 为中心，标志着“React-Centric”（以 React 为核心）的架构时代逐步走向终结。Remix 3 提供了对多种前端框架的原生支持，推动了更开放和多元的 Web 架构趋势。文章探讨了 Remix 3 的主要特性、技术创新，以及这种变化对开发社区、代码结构和生态系统的深远影响。

1. Remix 3 的技术变革
   - Remix 3 不再仅局限于 React，开始支持多种前端框架，为开发者带来更大自由度。
   - 介绍了 Remix 3 在路由机制、数据获取和渲染模型（Rendering Model）方面的核心创新。
2. React-Centric 架构的局限与挑战
   - 讨论了以往 React 过度主导导致的问题，如锁定生态、代码耦合度过高等。
   - 强调开放式架构能更好地满足不同业务场景的需要。
3. 跨生态与多框架兼容
   - Remix 3 运用抽象层和适配机制，实现与 Vue、Svelte、Solid 等多个现代前端框架的集成。
   - 探讨“未来前端开发”趋势，将突破单一框架限制，转向以业务为中心的、更可插拔的架构设计。
4. 开发者与社区影响
   - Remix 3 带动了更活跃的社区讨论，促进开发者在不同技术栈之间自由协作与交流。
   - 开发体验升级：更灵活的工具链、更高的生产力和可维护性。

## 创建一个适用于当下的 Masonry 布局 | CSS-Tricks

[Making a Masonry Layout That Works Today | CSS-Tricks](https://css-tricks.com/making-a-masonry-layout-that-works-today/)

> AI 摘要：本文介绍了当前 CSS 渐进网格布局（Masonry Layout）的浏览器支持现状及其多种语法方案，并提出了一种通过简洁 JavaScript 实现兼容所有主流浏览器的马赛克布局方法。作者详细解释了实现原理、兼容图片和响应式布局的技巧，同时分享了相关工具库的使用方法，为 CSS Grid 用户提供了生产可用、灵活可控的 masonry 解决方案。

1. CSS Masonry 布局的社区动态与支持现状
   - Masonry 布局的引入持续讨论中，语法有三种主要提案：`display: masonry`、`grid-template-rows: masonry`、`item-pack: collapse`
   - 当前未达成统一标准，不同浏览器支持程度不一（如 Firefox、Chrome 正在分别测试不同语法）
2. JS Polyfill 实现 Masonry 兼容性
   - 介绍如何检测浏览器是否原生支持 `grid-template-rows: masonry`
   - 若未支持，则使用 Polyfill 方案，纯 JavaScript 实现 Masonry 效果（仅需约 66 行代码）
3. Masonry 实现原理详解
   - 利用 CSS Grid 的特性，将 `grid-auto-rows` 设为 0，`row-gap` 设为 1px
   - 通过 JS 获取每个网格项实际高度后，调整 `grid-row-end`，实现项自适应高度并“堆叠”
   - 恢复正确的行间隔后，布局完成，兼容性强
4. 对图片和媒体的兼容处理
   - 首次渲染时图片未加载完成会导致布局错乱，需监听图片/视频加载后再计算布局
   - 提供相关 JS 辅助函数，确保所有媒体加载完毕再执行布局函数
5. 响应式自适配
   - 使用 ResizeObserver 监听容器宽度变化，实现自适应响应式布局
6. 工具库与复用建议
   - 推荐使用作者开源的 Splendid Labz 库快速集成 Masonry 布局及更多布局工具
   - 提供 npm、CSS、JS 完整使用示例

## 理解 Chrome DevTools 中的性能扩展 API（Performance Extensibility API）

[Making Sense of the Performance Extensibility API – CSS Wizardry](https://csswizardry.com/2025/07/the-extensibility-api/)

> AI 摘要：Google Chrome 的 Performance Extensibility API （性能扩展 API）允许开发者将自定义的性能标记（performance.mark）和测量（performance.measure）集成进 Chrome DevTools 的性能面板，使自有应用、团队代码与第三方包可实现更细粒度、结构化和可视化的性能剖析。文中不仅介绍 API 的最小可用实践和高级特性（如自定义 track、颜色、分组与元数据），还探讨了如何借助这些新能力更好地组织跨团队、跨模块或第三方依赖的性能数据，以提升前端调优的效率和可读性。

1. 背景与意义

   - Google Chrome 推出的 Performance Extensibility API 能让开发者自定义性能分析数据，在 DevTools 性能面板中更清晰展现。
   - 适用于关注特定应用片段性能、跨团队协作及 API/第三方包开发者等多类场景。

2. 现有能力回顾（性能.mark 与 .measure）

   - 介绍 performance.mark() 与 performance.measure() 的基础用法，展示如何标记重要事件并测量阶段耗时。
   - DevTools 能自动捕获这些标记，方便用时长和起止点可视化查看。

3. Extensibility API 的最小实现

   - 启用 DevTools 新特性（Show custom tracks）。
   - 使用 mark 时 dataType 必填，measure 时 track 必填，其他均为可选。
   - mark 实现更明显的“标志”，但缺乏精确时间信息，偏向定位关注点而非精确计时。
   - measure 则可直接建立自定义轨道，并展现分时区间。

4. 高级用法与增强能力

   - 支持自定义颜色（限定调色板）、显示 toolTipText 与挂载元数据（properties）。
   - measure 可作详细事件描述和元数据列举（例如资源加载性能拆解）。
   - 所有扩展项 (color、tooltipText、properties) 均适用于 mark 与 measure，但 measure 的实用性更强。

5. track 与 trackGroup 的组织能力

   - 支持创建自定义 track（如 CSS、JS、API）以区分不同事件流。
   - 支持 trackGroup，将多个 track 归为一个分组（例如 First Party < CSS、JS>），适合团队协作及区分自有与第三方数据流。
   - 实现方式简便，极大提升了跨团队、模块性能整理与溯源的效率。

6. 实践建议与最佳实践

   - 推荐从最小实现用法入手，不建议对 mark 过度扩展。
   - 优先使用 measure 进行自定义 track/trackGroup 的组织管理。
   - 针对第三方库或框架，鼓励将自有 Instrumentation 移入单独 trackGroup，以提升定位和用例分析效率。

7. 附录：实用代码示例
   - 提供结合 Resource Timing API 的实践 demo，展示如何自动获取和展示资源性能细节。

## 无用的 useCallback

[The Useless useCallback](https://tkdodo.eu/blog/the-useless-use-callback)

> AI 摘要：本文深入探讨了 React 的 useCallback（及部分 useMemo）在许多开发实践中被滥用、实际无效甚至带来额外复杂性的现象。作者指出，只有在需要“引用稳定性”（referential stability）时才有必要使用 memoization（记忆化），但多数情况下由于组件、props 或 state 的传递与依赖管理不当，memoization 实际无法带来性能提升，甚至反而让代码维护变得困难。作者以真实项目为例，分析了 memoization 的链式依赖是如何轻易被打破，进而推荐采用最新引用（Latest Ref Pattern）和即将推出的 useEffectEvent 方案来简化副作用依赖管理。

1. 记忆化的真正动机
   - 只有两大理由：性能优化、降低副作用（effect）频繁触发。
   - 核心是保持“引用稳定性”，以防止不必要的重新渲染或副作用。
2. 错误/无用的 useCallback 场景分析
   - 如果目标组件本身未被 React.memo 包裹，useCallback/useMemo 完全无效。
   - 组件自身如果不关心 props 的引用稳定性，多余的 memoization 没有任何作用，例如原生 button 的事件处理。
   - 不应将传入的非原始 props 用作内部依赖（dependency array），因为无法控制其稳定性。
3. 真实工作中链式 memoization 失效的例子
   - 多层 useMemo/useCallback、props 层层传递，一旦其中任意一环未 memoize，所有下游优化失效。
   - 该问题不仅无法通过“层层 memoize”彻底修复，反而增加了理解和维护的负担，导致开发者难以溯源、清理无用优化。
4. 新的依赖管理模式推荐
   - 最新引用（Latest Ref Pattern）：通过 useRef 保存当前最新值，通过 effect 始终同步，无需被动依赖。
   - useEffectEvent（即将推出的 React 原生特性）：可直接在副作用 effect 内安全访问最新 props/state，无需显性依赖。
5. 结论与建议
   - 仅在确有必要的场景使用 useCallback/useMemo，切勿滥用。
   - 优先采用更健壮的依赖管理模式，减少人为记忆化的复杂性，提升组件可维护性和开发体验。

## Web Components 中 Shadow DOM 的原理和实际应用

[Web Components: Working With Shadow DOM — Smashing Magazine](https://www.smashingmagazine.com/2025/07/web-components-working-with-shadow-dom/)

> AI 摘要：本文深入介绍了 Web Components 中 Shadow DOM（影子 DOM）的原理和实际应用。作者不仅阐述了 Shadow DOM 在隔离 HTML 和 CSS、避免组件冲突中的重要性，也详细讲解了如何通过命令式和声明式方式创建 Shadow Root 以及相关配置（如克隆、序列化、焦点委托），并介绍了 slot（插槽）机制以实现内容分发。文章面向希望提升组件封装性、可维护性和安全性的前端开发者提供了清晰的实践指南。

1. Web Components 与 Shadow DOM 概述
   - Web Components 由 Custom Elements（自定义元素）、HTML Templates（模板）和 Shadow DOM 等技术组成，三者可单独或组合使用。
   - 传统 DOM 架构容易导致样式与脚本污染，难以维护。
   - Shadow DOM 可实现 DOM、CSS、JS 的局部封装，提升组件独立性与安全性。
2. 为什么需要 Shadow DOM
   - 现代应用常集成来自不同来源的组件，容易出现 ID 冲突与样式覆盖问题。
   - 原生 HTML 元素如 video、details 等都标准使用 Shadow DOM 避免全局影响。
3. Shadow Root 的宿主元素与创建方式
   - 多数 HTML 元素（如 div、section、span 等）均可作为 Shadow Root 宿主。
   - 创建方式分为：
     - 命令式（JavaScript）：attachShadow({mode})，可选择 open（开放）或 closed（私有）模式，建议默认使用 closed，以增强安全性。
     - 声明式（HTML）：利用 `<template shadowrootmode="">` 内嵌 shadow root，可和 Custom Elements 配合使用，支持 open/closed 模式。
   - 讨论 open/closed 模式的脚本访问区别与安全考虑。
4. Shadow DOM 配置项
   - clonable：允许带有 shadow root 的节点可被完整克隆（包括模板内容），提升组件复用性。
   - serializable：能将 shadow root 内容序列化为字符串，便于缓存或跨节点注入，但需注意闭合模式下的数据泄露风险。
   - delegatesFocus：启用后，宿主获得焦点时自动将焦点转移到 shadow root 内第一个可聚焦元素，常用于自定义表单组件，增强用户体验。
5. Slot（插槽）与内容分发
   - 通过 slot，可实现宿主与 Shadow DOM 之间的内容插入与分发，支持默认与命名插槽，并可定义 fallback（回退）内容。
   - slotchange 事件用于监听 slot 内容变化，便于实现响应式组件行为。
   - slotted 内容仍属于 light DOM，可在文档级直接操作。
6. 实用建议与局限性
   - 推荐以 closed-first 策略增强组件安全性，特殊场景下才使用 open。
   - 注意表单与可访问性（ARIA）相关的局限，部分需要借助 ElementInternals 等新 API 进一步处理。

## 是时候让现代 CSS 终结单页应用程序了

[It's time for modern CSS to kill the SPA](https://www.jonoalderson.com/conjecture/its-time-for-modern-css-to-kill-the-spa/)

> AI 摘要：本文章批判了将 SPA（单页应用，Single Page Application）作为优先方案的潮流，指出随着现代 CSS 和浏览器（如 View Transitions API、Speculation Rules 等）的进步，实现流畅、原生的页面交互已不再需要复杂的 JS 框架和大量前端代码。作者呼吁开发者回归标准的 HTML + CSS + 浏览器原生能力，构建更快速、可维护、SEO 友好的网站，并强调 SPA 带来的复杂性、性能损耗、可访问性问题，以及与浏览器发展脱节的弊端。

1. “类应用”迷思与 SPA 的错误假设
   - 许多项目由于“要像 app 一样流畅”的陈旧要求选择了 SPA 架构，而忽略了是否真的需要。
   - 选择 SPA 并非出于真正的技术需求，而是为交互流畅度妥协了架构简洁性。
   - 现在的假设已过时，SPA 不再是唯一可实现流畅体验的方法。
2. SPA 的“伪流畅”与性能危害
   - SPA 的“无刷新感”常常是假象，实际表现为加载动画、滚动错乱、路由行为不一致等问题。
   - 大量 JavaScript 的引入导致性能下降，SEO 变得复杂，体验反而变差。
   - 现代 SPA 阈值带来的技术负担，不成比例的为“流畅度”买单。
3. 现代 Web 平台演进（CSS 与浏览器原生特性）
   - 浏览器原生已支持声明式页面过渡（View Transitions API），无需 JS 也能实现淡入淡出动画等高级体验。
   - 结合 Speculation Rules（预测性预加载），可实现点击即开的导航体验，无需 JS 路由。
   - 原生 MPA（多页面应用，Multi-page Application）方案能够通过 CSS 动画实现元素过渡、状态保存、URL 正确性等。
   - 示例代码简明说明如何用 CSS 实现页面转场与共享元素动画。
4. 浏览器赋能与简单架构的优势
   - 现代浏览器提供诸如 Back/Forward Cache（前进后退缓存）等特性，只要结构易读、无 JS 路由劫持即可天然获得极佳体验。
   - 浏览器愿意协助性能优化，但前提是开发者不要人为增加复杂度。
5. 性能现实对比：SPA vs 现代 MPA
   - 真实 SPA（如 Next.js 等）JS 体积大，加载慢，SEO 和导航表现不稳定。
   - MPA + View Transitions + Speculation Rules 几乎无需 JS，加载极快，自然支持 SEO 和历史管理。
   - 原生方法不仅替代 SPA 行为，而且性能和可维护性更佳。
6. 反思：“网站不是 APP”
   - 普通网站无需 SPA 的状态管理、复杂路由、大量组件或 hydration。
   - 使用过度的 JS 反而增加了网站开发、运维成本和用户负担。
   - 理性选择开发手段，应“用网站的方式造网站”，拥抱标准技术栈。
7. 展望与建议：用现代 web 技术构建网站
   - 原生 declarative transition（声明式过渡）、预渲染、降级兼容性、易维护架构等已足以满足绝大多数场景。
   - SPA 是旧时代局限下的策略，如今实属多余。
   - 建议开发者用现代服务端渲染和单纯 HTML + CSS 构建主站，只在必要时合理由加 JS 增强。

## 使用 Three.js、WebGPU 和 Three Shader Language (TSL) 实现互动文字破坏效果

[Interactive Text Destruction with Three.js, WebGPU, and TSL](https://tympanus.net/codrops/2025/07/22/interactive-text-destruction-with-three-js-webgpu-and-tsl/) | [Demo](https://tympanus.net/Tutorials/InteractiveTextDestruction/)

> AI 摘要：本文是一篇关于使用 Three.js、WebGPU 和 Three Shader Language (TSL) 实现互动文字破坏效果的详细教程。作者通过一步步的代码示例和讲解，展示了如何在 Web 上创建动态的 3D 文字效果，利用指针位置和弹簧物理原理实现文字的变形与破坏动画，同时结合后处理技术增强视觉效果。文章不仅提供了技术实现细节，还分享了作者对 Web 互动体验发展的感悟，强调了 Three.js 等工具如何让 Web 重新焕发创意活力。

1. 文字几何体 (TextGeometry)：
   • 内容：使用 TextGeometry 创建 3D 文字，配置字体、大小、深度、斜角等参数，并应用 MeshStandardMaterial 材质。通过计算 BoundingBox 将文字居中对齐。
   • 总结：实现了 3D 文字的创建与居中，为后续的互动效果做好准备。
2. Three Shader Language (TSL)：
   • 内容：详细介绍了使用 TSL 实现文字破坏效果的核心逻辑。包括存储顶点原始位置和法线、创建模拟数据的存储缓冲区、在 GPU 上运行初始化和更新计算函数、使用 uniforms 传递指针位置等数据、通过弹簧物理和摩擦力实现动态变形效果、添加噪声和旋转以增强动画的混乱感。
   • 总结：通过 TSL 实现了基于指针位置的顶点变形和动态动画效果，展示了 GPU 计算在互动设计中的应用。
3. 材质与后处理：
   • 内容：调整材质的发光颜色 (emissive color)，通过速度缓冲区偏移色调以产生多样化效果，并添加雾效和背景颜色。引入后处理技术，包括环境光遮蔽 (AO)、泛光 (bloom) 和噪声效果，提升画面质感。
   • 总结：通过材质调整和后处理技术，增强了视觉表现力，使破坏效果更具冲击力。

## 独立开发穷鬼套餐(Web 实践篇)

https://guangzhengli.com/blog/zh/indie-hacker-poor-stack

> AI 摘要：本文系统梳理了独立开发者在 Web 全栈开发过程中，如何以低成本（穷鬼套餐）快速启动和迭代产品。作者结合自身实战，详细分析了主流的技术栈（以 Next.js 为核心）、多种低成本云部署模式（如免费云平台、全栈 Cloudflare、自托管等），以及项目启动常见成本项（域名、邮件、支付等）的选择建议，旨在帮助新手独立开发者找到成本控制与效率兼顾、专注产品本身的最佳路径。

1. 最新技术栈的选择 - 推荐 Next.js 作为首选全栈开发框架，因其生态活跃、文档齐全、AI 代码生成友好。
   详细列举配套库与工具（如 Drizzle ORM、Better Auth、Stripe、React Email、Tailwind CSS 等），并说明每类工具的优点与适用场景。 - 解释选择原则，强调“三方依赖的通用性”及“易于在不同平台部署”。
2. 明确你的需求和成本
   - 强调“盈利/准备盈利”型项目需严肃对待成本预算。
   - 简述独立开发三种低成本路径：A. 利用云平台免费额度（如 Supabase/Neon/Vercel 等），B. 全部服务基于 Cloudflare，C. 自托管（廉价 VPS + 开源 PaaS 平台）。
   - 分析各模式优劣：云平台部署简单、运维压力小但成本不稳定；Cloudflare 适合高流量/无收入阶段；自托管自由度高但需解决运维/安全等问题。
3. 云平台方式
   - 细分为“入门级完全免费组合”“面向小商业的稳定运营组合”，逐项对比主流云平台（Vercel、Railway、[Fly.io](http://fly.io/)）、数据库（Supabase、Neon、Upstash）、对象存储（Cloudflare R2）、邮件服务（Resend）等的免费额度与核心优缺点。
   - 强调高流量/免费额度耗尽时，成本可能快速上涨，需要有盈利模式支撑。
   - 建议新手优先选择云服务，节约运维精力，把重心放在产品与营销上。
4. 完全利用 Cloudflare 平台
   - 总结 Cloudflare 作为一体化服务平台的优势（免费 CDN、极低成本、服务丰富），适用于“愿意折腾”及“高流量低收入”独立开发者。
   - 介绍 Workers 计算、D1 数据库、KV 存储、R2 对象存储等服务的免费额度及场景限制。
   - 结合实际项目案例，说明小型/海外流量项目长期运行的可行性。
5. 自托管部署
   - 分析自托管的技术栈组合、支持工具（如 Dokploy、Coolify、Uptime Kuma、Umami、Unsend、n8n 等），一并覆盖数据分析、监控、邮件、数据库等服务。
   - 优点：极致成本控制与可控性，缺点：需自担安全、备份、扩容及持续运维压力。
6. 其它成本项
   - 域名：推荐优先在 Cloudflare 购买，兼顾成本、速度、稳定性。
   - 邮件服务：若依赖登录/营销可选择 Resend、plunk 或自托管方案（Unsend+AWS SES 等）。
   - 支付平台：建议优先 Stripe/Paddle，初期可探索 [Creem.io](http://creem.io/) 等新平台并分享认证/提现实战经验。
7. 最后
   - 提醒“穷鬼套餐不等于无止境折腾”，独立开发应聚焦产品与市场验证，合理分配时间资源。
   - 推荐自己开发的 NextDevKit 作为一键多平台部署利器，降低初学者技术门槛。
   - 鼓励读者分享各自技术栈与实践经验，集思广益，持续优化开发与部署流程。

# Refs

- [⚛️ React Status #438 — July 30, 2025](https://react.statuscode.com/issues/438)
- [📢 Node Weekly #588 — July 29, 202](https://nodeweekly.com/issues/588)
- [Frontend Focus #703 — July 30, 2025](https://frontendfoc.us/issues/703)

# 结语

周刊第一期到这里就结束啦，欢迎多多反馈纠错！

> 其实这些新闻平常自己都能看，我只不过借助 AI 和自己的总结做了一些汇总以及翻译的工作，因为现在中文互联网的前端精品周刊现在难得一见，大多数都停更了或是扩圈了，索性自己做了～我希望这个周刊不那么严肃，更自然一些，但是还在摸索阶段，暂时是我一个人维护，所以很依赖 AI 和自动化，相对的就少了些人味儿，非常欢迎评论反馈。

感谢观看～

> 推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。
> 公开群聊评论区：[@cosine_public](https://t.me/cosine_public) 欢迎加入，也可在群里投稿自己的文章~
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注

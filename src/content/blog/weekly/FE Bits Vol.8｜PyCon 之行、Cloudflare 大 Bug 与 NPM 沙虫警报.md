---
title: FE Bits Vol.8｜PyCon 之行、Cloudflare 大 Bug 与 NPM 沙虫警报
description: 本期聚焦前端安全与浏览器更新：Cloudflare 因 useEffect 误用致宕机复盘，NPM“沙虫”供应链攻击警报，pnpm 推出延迟安装降风险；Chrome 140 与 Safari 26 上线多项特性，Browserslist 支持 Baseline；附 CSS 2025 新能力、依赖治理与实用工具精选。
link: weekly-8
catalog: true
lang: cn
date: 2025-09-22 20:00:00
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

今天是 2025 年 9 月 22 日，星期一。上周真是忙的晕头转向，所以推迟到今天才更新。

上周五请了假去上海，逛了上海海洋水族馆。

![](https://r2.cosine.ren/i/2025/09/bd879db41bd25a701d95a766628b45eb.webp)
![](https://r2.cosine.ren/i/2025/09/08223e367289e2debc133319eab07b6a.webp)

周六参加了 pycon 见了偶像 Manjusaka，值了，晚上航班还延误了，从晚上 8 点一直到凌晨 4 点才到家，好惨啊。

《不要用 Next.js.webp》
![不要用 Next](https://r2.cosine.ren/i/2025/09/5d9c1fc5985f34810fb804f9ee92df1a.webp)

![](https://r2.cosine.ren/i/2025/09/58fee61709a997d59745fa3d04cfb4f5.webp)

## 生态与社区动态

- [深入了解 Cloudflare 2025 年 9 月 12 日的仪表板和 API 中断情况](https://blog.cloudflare.com/deep-dive-into-cloudflares-sept-12-dashboard-and-api-outage/)： React `useEffect` 使用不当导致 Cloudflare 仪表盘宕机的案例，提醒开发者谨慎处理副作用。

文中详细回顾了 Cloudflare 宕机事件。事故由前端 React useEffect 依赖配置错误引发，高频 API 调用叠加了服务端更新，造成雪崩式过载。Cloudflare 分享了事故时间线、恢复措施以及未来的改进方向，包括自动化回滚、容量管理、请求重试控制和可观测性提升等关键经验。

也算是前端界的大 bug 了（乐）

- NPM 安全还有高手：[实时更新：Shai-Hulud，史上最危险的 NPM 安全漏洞，影响 CrowdStrike 和数百个流行软件包](https://www.koi.security/blog/shai-hulud-npm-supply-chain-attack-crowdstrike-tinycolor)

> NPM 生态系统出现极具破坏性的蠕虫病毒，以沙丘中的虚拟生物沙虫命名，能够自动感染其他 NPM 包。
> 沙虫病毒的工作方式是当感染开发者设备后，会自动搜寻各种凭据包括 NPM 凭据，然后自动篡改这名开发者有权限操作的包并加入蠕虫，目前已经有超过 178 个软件包被感染。

- [Meet the GitHub MCP Registry: The fastest way to discover MCP Servers](https://github.blog/ai-and-ml/github-copilot/meet-the-github-mcp-registry-the-fastest-way-to-discover-mcp-servers/)：GitHub 推出官方 [MCP Registry](https://github.com/mcp)，统一入口快速发现和使用 MCP servers。

- [New in Chrome 140](https://developer.chrome.com/blog/new-in-chrome-140?hl=en)：Chrome 140 更新了 `ToggleEvent` 的新属性 `source` 用于追踪触发元素，允许在 CSS `content` 的 alt 文本中使用 `counter()` 和 `counters()` 提升无障碍体验，以及在 `@font-face` 规则中支持 `font-variation-settings` 描述符，用于更精细的字体调整。这些改进提升了开发者调试、无障碍支持和排版控制的能力。

- [Help Us Raise $200k to Free JavaScript from Oracle | Deno](https://deno.com/blog/javascript-tm-gofundme)：Deno 发起众筹，请求社区支持诉讼，挑战 Oracle 对 “JavaScript” 商标的垄断，使其回归公共领域。

- [Safari 26 更新可独立安装](https://bsky.app/profile/jensimmons.bsky.social/post/3lyxz5i26cs2i)，无需整个 macOS 更新。

> 你知道吗？在 macOS 上，您只需更新到 Safari 26，同时仍可保持在 macOS 15 Sequoia 或甚至 macOS 14 Sonoma 上。
> 前往  > 系统设置 > 通用 > 软件更新。在“也可用”下，您会找到 Safari。点击“立即更新”。

> Did you know that on macOS, you can update just to Safari 26, while remaining on macOS 15 Sequoia or even macOS 14 Sonoma?
> Go to  > System Settings > General > Software Update. Under “Also Available” you’ll find Safari listed. Click “Update Now”.

- [Browserslist](https://web.dev/blog/browserslist-supports-baseline?hl=en) 已支持 Baseline 功能匹配

- Interop 2026 特性征集，鼓励开发者提出统一实现的标准 ([Propose a feature](https://web.dev/blog/interop-2026-proposals))

- Chromium [新增 `ariaNotify()` 方法](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Accessibility/AriaNotify/explainer.md)，便于辅助技术信息传递。

## 文章与视频

- [You Don't Need Animations](https://frontendfoc.us/link/174382/web)：讨论动画的使用场景与设计原则，强调合理使用而非泛滥。

- [Apple has a private CSS property to add Liquid Glass effects to web content](https://alastair.is/apple-has-a-private-css-property-to-add-liquid-glass-effects-to-web-content/)：作者在研究 WebKit 更新日志时发现 Apple 正在引入一个私有 CSS 属性 `-apple-visual-effect`，它可以让 Web 内容利用 Liquid Glass 效果。虽然该功能目前既不能在 Safari 上使用，也无法通过常规 WKWebView 使用，除非启用私有设置 `useSystemAppearance`，因此开发者不能直接用于 App Store 应用。但这一变化揭示：Apple 自己已经在内部使用该功能，说明 webview 在系统应用中的整合比用户意识到的更深入，印证了所谓 “The Toupée Theory of In-App Webviews” —— 好的 webview 被无感知地使用，坏的才被用户注意。

- [谈谈 AI 编程工具的进化与 Vibe Coding](https://guangzhengli.com/blog/zh/vibe-coding-and-context-coding)：这篇文章讲的观念我很认可，Vibe Coding 并不是一个好名字，更愿意把基于 AI 辅助编程的方式称之为 Context Coding 即上下文编程。

- [面向现实世界的中低端移动设备（2025 年）](https://csswizardry.com/2025/08/low-and-mid-tier-mobile-for-the-real-world-2025/)：探讨 2025 年真实低端与中端手机在 Web 性能测试中的选机建议与方法论。

- [Oh no, not again... a meditation on NPM supply chain attacks](https://tane.dev/2025/09/oh-no-not-again...-a-meditation-on-npm-supply-chain-attacks/)：关于 NPM 软件供应链攻击现状与历史的反思。

- [How to keep package.json under control](https://blog.val.town/gardening-dependencies)：探讨在复杂 React 应用中如何管理和精简 `package.json` 依赖，提出一系列依赖治理方法与工具。

- [Fetch streams are great, but not for measuring upload/download progress](https://jakearchibald.com/2025/fetch-streams-not-for-progress/)：探讨 `fetch` API 的流式上传/下载支持及其局限性，尤其是不适合用来测量进度。

- [Replace Your Animated GIFs with SVGs](https://frontendmasters.com/blog/replace-your-animated-gifs-with-svgs/)：深入介绍如何用 SVG 动画替代传统 GIF，实现更小文件体积与更高可扩展性

- [While you’re fixing the fun stuff, fix the important stuff too](https://piccalil.li/blog/while-youre-fixing-the-fun-stuff-fix-the-important-stuff-too/)：在修复有趣的小问题时，不妨顺手解决更重要的底层问题。

### CSS 新特性

- [你需要知道的现代 CSS（2025 版）](https://frontendmasters.com/blog/what-you-need-to-know-about-modern-css-2025-edition/)：本文梳理了 2025 年现代 CSS 的最新进展，包括动画到 `auto`、`@function`、`if()`、`text-wrap`、`linear()` easing、`shape()`、增强的 `attr()`、`reading-flow` 等特性。这些新功能大多提升了样式抽象能力、响应式设计的灵活性和排版的可控性，同时展现了 Chrome 为主、Safari/Firefox 跟进的支持现状，并给出 Polyfill 和渐进增强的可行性建议。

- [又一个 JS 交互被干掉了：如何实现导航菜单匹配？关于 scroll-target-group 属性与 :target-current 伪类](https://www.zhangxinxu.com/wordpress/2025/09/css-scroll-target-group/)：介绍如何用纯 CSS 的 scroll-target-group 与 :target-current 实现滚动导航联动，无需额外 JS。之前看到了不少英文博文解析，中文的可算有张鑫旭大佬的了。

## 趣味项目与工具

- [linear() easing generator](https://linear-easing-generator.netlify.app/)：可以将 JavaScript 或 SVG 中的缓动函数 (easing function) 转换为 CSS `linear()` 格式，从而在无需 JavaScript 的情况下实现复杂的动画效果，例如 bounce、spring、elastic 等。是从上文「使用 CSS linear()函数实现更逼真的物理动画效果
  」中看到的工具。 ![](https://r2.cosine.ren/i/2025/09/c62a232f473a07a60d572174deab05fa.webp)

- [bahdotsh/wrkflw: Validate and Run GitHub Actions locally](https://github.com/bahdotsh/wrkflw)：一款本地运行和验证 GitHub Actions 的命令行工具。

- [cchanxzy/react-currency-input-field: React component for an input field](https://github.com/cchanxzy/react-currency-input-field)：一个轻量级 React 货币输入组件，支持多种格式化与国际化配置。

- [webpro-nl/knip](https://github.com/webpro-nl/knip)：一个帮助 JavaScript / TypeScript 项目检测未使用文件、依赖和导出的分析工具，是在上面的文章中看到的。

- [WisPaper](https://www.wispaper.ai/scholar-search/) 是复旦大学研发的免费学术智能助手，面向科研人员，整合了 AI 学术搜索、本地文献管理、精准翻译、智能对话和核心总结等功能，帮助研究者快速检索全球高质量文献，突破语言障碍，提炼摘要要点，大幅提高科研效率。（从[小众软件](https://www.appinn.com/wispaper/)处看到的）

- [史上最简单，在线 FFmpeg！浏览器直接用 + AI 懂人话，不用下载、不用命令行](https://www.appinn.com/ffmpeg-online-tools/)：一款通过浏览器即可使用的 FFmpeg 工具，支持自然语言操作和本地处理。在线地址：https://vidmix.app/ffmpeg-in-plain-english/

- [Volume: A 3D OKLCH Color Palette Creator](https://www.volumecolor.io/editor)：3D 色彩选择工具，将配色体验转化为空间化探索。

![](https://r2.cosine.ren/i/2025/09/53bb93ff41165c65c3393edff2e7e134.webp)

- [Gallery Button](https://codepen.io/RAFA3L/pen/GgpLNrW)：超酷的纯 CSS 相册预览动画，具备折叠展开的纸张效果。

![](https://r2.cosine.ren/i/2025/09/32efbec46cf75a0c56ca4f0a573adcf3.webp)

- [[WebGL] Refraction cursor over video](https://codepen.io/jhnsnc/pen/ByoEmoq)：基于 shader 实现类似液态玻璃的折射光标效果

## 生态更新

- [pnpm 10.16](https://pnpm.io/blog/releases/10.16) 新增 minimumReleaseAge 设置，延迟依赖安装，避免第一时间安装可能受攻击的版本，允许通过 minimumReleaseAgeExclude 针对特定包（如 webpack）排除该限制，始终获取最新版本。近期流行包被攻击事件频发，pnpm 借此降低恶意版本扩散风险。

- [Lynx 3.4 正式发布](https://mp.weixin.qq.com/s/vg_fUb97q2s9zxrzjpZ2DQ)：带来 HarmonyOS 支持、新开发者工具、输入组件与动画增强等多项更新。

- [WebKit Features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)：Safari 26.0 带来 Safari 26.0 增加了 75 项新功能、3 项弃用和 171 项其他改进，涵盖 CSS、WebGPU、Digital Credentials API、visionOS 沉浸式媒体、SwiftUI 集成等。

- [Node.js v24.8.0 Release](https://nodejs.org/en/blog/release/v24.8.0)：Node.js 发布 v24.8.0（Current）版本，带来重要功能更新与修复。
  - 引入了对 HTTP/2 网络调用在 Chrome DevTools 的调试支持。
  - 对 crypto 模块新增了多项 Web Cryptography 算法（如 Ed448、ML-DSA、KMAC、Argon2、SLH-DSA 等）
  - 为 worker 添加 cpu profile API。

## Refs

- [React Status Issue 444: September 17, 2025](https://react.statuscode.com/issues/444)：本期涵盖 React 社区动态、依赖管理最佳实践、AI 代码审查工具、前端新版本发布与 JavaScript 生态最新进展。
- [Node Weekly Issue 593: September 16, 2025](https://nodeweekly.com/issues/593)：本期聚焦 Node.js 与生态更新，包括包管理安全、Electron 与 QUIC 进展、新书与教程推荐，以及工具与社区动态。
- [Frontend Focus Issue 709: September 17, 2025](https://frontendfoc.us/issues/709)：前端领域的最新动态、技术文章与工具资源合集。
- [Web Weekly #168](https://www.stefanjudis.com/blog/web-weekly-168/)：一周前端与 Web 技术动态，涵盖 CSS、可访问性、浏览器新特性以及工具推荐。
- [CodePen Spark](https://codepen.io/spark/469)：一份 CodePen 精选，涵盖 CSS 动画、WebGL 效果、前端新 API 与开发实践分享的周刊内容。

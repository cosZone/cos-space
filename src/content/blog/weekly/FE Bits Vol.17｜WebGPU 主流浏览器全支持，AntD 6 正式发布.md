---
title: FE Bits Vol.17｜WebGPU 主流浏览器全支持，AntD 6 正式发布
description: 本期周刊：博客 UI 更新并更名为 astro-koharu，域名迁至 blog.cosine.ren；计划自研评论与迁移旧评。社区要闻：WebGPU 主流浏览器全面支持、Ant Design 6 发布、Edge 上线站点级扩展开关、npm 再现供应链攻击、TanStack Pacer 发布、Better Auth 1.4 更新；精选文章与 CSS 新特性、工具与代码示例一览。
link: weekly-17
catalog: true
lang: cn
date: 2025-11-30 20:35:00
tags:
  - 前端
  - JavaScript
  - CSS
categories:
  - 周刊
---

> 本期网址 https://blog.cosine.ren/post/weekly-17
> 本周刊更新时间期望是在每周天
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。
> QQ 讨论小群 598022684，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～
> 本周刊文章内容同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 11 月 30 日，星期天。

给博客优化了一下 UI，代码块和列表、标题的样式都加上了，然后给博客主题换了个名字，正式一些。

![](https://r2.cosine.ren/i/2025/11/eeae70b254e02df105e0119f2be173d6.webp)
![](https://r2.cosine.ren/i/2025/11/bdaf68d2324e4b4f1dcd758c5bd25276.webp)

现在的主题叫 [astro-koharu](https://github.com/cosZone/astro-koharu)，博客的正式地址也挪到了 [blog.cosine.ren](http://blog.cosine.ren)，很开心。

> “小春日和” （こはるびより）指的是晚秋到初冬这段时期，持续的一段似春天般温暖的晴天。也就是中文中的“小阳春”。
> 灵感来自 Hexo 的 Shoka 主题，但不再追求一比一复刻，而是保留它的优点，用更轻量的技术栈，做一款属于自己的个人博客主题。

下一步打算自己弄个评论系统，Remark42 感觉没动力用，想参考 [Valine](https://valine.js.org/) 自己弄一个，然后把旧的评论迁移过去。

## 生态与社区动态

- [主流浏览器现已支持 WebGPU](https://web.dev/blog/webgpu-supported-major-browsers?hl=zh-cn)：WebGPU 现已在主流浏览器全面支持了，但是 Safari 是 iOS 26 才支持，而且 Safari 移动端给的显存嘛……少少的。

- [Edge 终于支持网站级扩展开关：新增「允许在此网站使用扩展」功能｜可针对任意网站，一键关闭所有扩展](https://www.appinn.com/edge-site-extension-toggle/)：Edge 出了个实用小功能，可以对单个网站一键关掉所有扩展（这下真的是只要你不做就会有浏览器帮你做这个功能了，想给我那个破插件加一直懒得加来着，Chrome 能不能跟进啊）

- [npm 再次爆发 “Shai Hulud” 供应链攻击](https://socket.dev/blog/shai-hulud-strikes-again-v2)，利用 post-install 脚本窃取 token。

- TanStack 最近发布了 [TanStack Pacer](https://tanstack.com/pacer/latest)，这是一个框架无关的性能优化工具集，提供防抖、节流、限流、队列管理与批处理等核心原语，适用于任何 JavaScript 框架。
  它提供了一个专用的 React 适配器（`@tanstack/react-pacer`），在核心 Pacer 工具之上提供了一组易于使用的 hook，例如 `useDebouncedValue`、 `useThrottledCallback` 、 `useQueuedState` 和 `useBatcher`。

### Ant Design 组件库发布 v6

[🎉 Ant Design 6.0 来了！ 🎉](https://github.com/ant-design/ant-design/issues/55805)

单开一个标题以表尊重～

- **React 版本提升**：最低要求 React 18，推荐使用 React 19。
- **启用 React Compiler**：在构建产物中优化性能，开发者可自行选择是否开启。
- **纯 CSS Variables 样式架构**：不再兼容 IE，样式实现零运行时（zeroRuntime）模式，支持实时多主题切换。
- **组件语义化结构**：所有组件 DOM 结构优化，支持函数式类名配置 (`classNames`) 与内联样式 (`styles`)，提升定制能力与可维护性。
- **移除废弃 API**：彻底移除 v4 遗留逻辑，统一 API 命名，同时兼容 v5 的使用方式。

#### 新组件与功能增强

- **Masonry 瀑布流组件**：优化图片展示与卡片排布体验。
- **Tooltip 支持平移切换**：多内容提示实现滑动过渡。
- **InputNumber spinner 模式**：交互式加减按钮布局更直观。
- **Drawer 支持拖拽**：用户可调整抽屉大小。
- **模糊蒙版背景**：所有弹层默认使用模糊效果，可按需关闭。
- **不再支持 IE**，建议替换废弃 API。

#### One More Thing —— Ant Design X 2.0

- 面向 AI 场景的组件库同步升级，提供更智能的交互能力。
- 新版本强化渲染性能与灵活性，是探索 AI 驱动界面的关键工具。
- 更多详情可参考 [🎉 Ant Design X 2.0 正式发布了 🎉](https://github.com/ant-design/x/issues/1358)。

### Better Auth v1.4

[Better Auth 1.4](https://www.better-auth.com/blog/1-4) 发布，引入了无数据库的 Stateless Auth、SCIM Provisioning、OAuth 自定义状态、数据库 joins 优化、JWT 密钥轮换、API Key 二级存储、CLI 索引支持、SSO 域名验证等众多特性。此外，还推出了支持 UUID 主键、强化的邮箱变更流程、新的错误页、更好的插件结构和多项安全改善。

## 文章与视频

- [从「写代码」到「验代码」：AI 搭档写走 3 年，我踩出来的协作路线图](https://yousali.com/posts/20251124-how-to-coding-with-ai/)：在推上看到一篇[好文章](https://x.com/y0usali/status/1993276386963079478)，写给已经在或准备在真实生产项目里用 AI Coding 的后端 / 全栈工程师和技术管理者。它不会教你「按钮在哪里」「哪个 prompt 最神」，而是想在大约 15 分钟里，帮你搞清楚三件事：

  - 哪些任务交给 AI 最「划算」；
  - 怎么让项目本身变得更「AI 友好」，提高一次命中率；
  - 当生成不再是瓶颈时，工程师应该如何设计验证流程，把时间花在真正值钱的地方。

- [谈谈不自律的良好生活 - 少数派](https://sspai.com/post/103819)：很温柔的文章，提出「自洽而非自律」，「好好生活」不靠逼迫，而靠理解与自洽。
  入选年度我最喜欢的文章，值得停下来，慢慢看。

- [The Performance Inequality Gap, 2026](https://infrequently.org/2025/11/performance-inequality-gap-2026/)：作者继续延续多年系列，对 2026 年移动与桌面设备的性能、网络条件及网页负载趋势进行分析。
  核心观点是：移动端尤其低端 Android 设备的硬件与网络改善速度，赶不上网页体积膨胀的速度。

- [Why use React?](https://adactio.com/journal/22265)：一篇发问式思考文章，探讨为什么开发者选择 React，以及这项选择对前端用户体验意味着什么。作者倡导让框架留在服务器，充分利用浏览器本身的强大功能。

- [Migrating 6000 React tests using AI Agents and ASTs](https://eliocapella.com/blog/ai-library-migration-guide/)：一次关于用 AI Agents 和 AST 自动迁移 6000 个 React 测试的实战记录，是一篇好文章。
  作者公司使用旧版 React Testing Library 编写了 970 个测试文件，总计 6000 个多测试用例。而升级至 v14 后 API 完全异步化，行为变化大，手动迁移代价极高，于是作者决定尝试用 AI 辅助完成大规模迁移。
  比较感慨的是其中的迁移过程，最后一周时间共执行 50 次迁移，形成 50 个独立 PR，每个 PR 半小时。作者展望未来 AI 将进一步解放开发者，从“重复劳动”转向更有创造力的工作。

- [以 0.0001 美分的价格干掉 Next.js 服务器](https://www.harmonyintelligence.com/taking-down-next-js-servers)：Harmony Intelligence 团队发现了一个未经身份验证的拒绝服务 (DoS) 漏洞，该漏洞仅需一个 HTTP 请求和极少的资源即可导致自托管的 Next.js 服务器崩溃。通过限制请求大小的反向代理可以防止此攻击；仅靠速率限制不足以提供充分的保护。
  受影响范围：所有带有中间件的自托管 Next.js 服务器（Vercel 托管的不受影响）。
  受影响版本：≤15.5.4 的旧版本。
  缓解措施：升级/ 配置诸如 nginx 反向代理限制请求体大小

- [用代码和 Git 管理 DNS 记录 —— DNSControl 和 GitHub Actions CI/CD 实践](https://blog.skk.moe/post/dns-as-code-via-dnscontrol/)

- [写在 PicGo 即将 8 周年之际](https://sspai.com/post/104040)：也是一篇很有「情感」的文章啊。

## CSS 新特性

- [巧用 CSS ::details-content 伪元素实现任意展开动画](https://www.zhangxinxu.com/wordpress/2025/11/css-details-target-content-open/)：聊聊 `<details>` 元素这几年新增加的 `::details-content` 伪元素，使得内容展开收起可实现平滑动画。同时讲解了内容锚点（hash）自动展开机制，以及 `scroll-margin-block-start` 的小技巧。

- [light-dark() isn't always the same as prefers-color-scheme](https://www.stefanjudis.com/today-i-learned/light-dark-isnt-the-same-as-prefers-color-scheme/)：作者发现新的 CSS 函数 light-dark() 并非 prefers-color-scheme 的替代品，它们在实现逻辑上有细微却重要的差异。`prefers-color-scheme` 更偏向全局系统偏好，而 `light-dark()` 更适合组件级主题控制。

- [How to Add and Remove Items From a Native CSS Carousel (……with CSS)](https://frontendmasters.com/blog/how-to-add-and-remove-items-from-a-native-css-carousel-with-css/)：本文介绍如何利用 CSS Overflow Module Level 5 的新特性（如 `::scroll-button()` 与 `::scroll-marker`）创建一个完全不用 JavaScript 的原生 CSS 轮播组件。通过结合 HTML 的复选框控制展示项、CSS 伪元素控制滚动行为与可视化反馈，作者实现了可动态增删轮播项、支持自动滚动、滚动锚点定位的完整组件，展示了未来 CSS 在交互与状态管理上的潜力。

## 工具

- [Color Palette Pro](https://colorpalette.pro/)：一款能像音乐合成器一样自由调制色彩的在线调色工具，支持多种色彩空间与样式切换，实时生成色阶、色环、阴影与高光调和效果，非常适合设计师进行系统化配色或视觉一致性探索。
  ![](https://r2.cosine.ren/i/2025/11/0b4ecbdb5000d0cb584b73af3c4fb391.webp)

- [JavaScript Algorithms and Data Structures](https://github.com/trekhleb/javascript-algorithms)
  一个涵盖经典算法与数据结构的 JavaScript 示例仓库，其中每个算法和数据结构都有其独立的 README 文件，包含相关的解释和进一步阅读的链接。

- [williamtroup/Heat.js](https://github.com/williamtroup/Heat.js)：Heat.js 是一个零依赖、基于 TypeScript 开发的轻量前端可视化库，可生成可定制的热力图、图表和统计数据。开发者可通过配置 DOM 属性（data-heat-js）或使用 API 快速实现自定义热力图等。

## Codepen 精选

### Concentric Border Radii

https://codepen.io/botteu/pen/YPKBrJX

> “快来看看！这个内容器的边框半径取决于外容器的边框半径以及内外容器之间的内边距。” 在这个来自 botteu 的交互式 Pen 中，您可以滑动滑块来尝试不同的半径、内边距和颜色。

![](https://r2.cosine.ren/i/2025/11/9de30b5a6757dcc4363636ea41c7ec66.webp)

## Refs

- [Web Weekly #176](https://www.stefanjudis.com/blog/web-weekly-176/)
- [JavaScript Weekly Issue 763: November 28, 2025](https://javascriptweekly.com/issues/763)
- [Code Spark #484](https://codepen.io/spark/484)

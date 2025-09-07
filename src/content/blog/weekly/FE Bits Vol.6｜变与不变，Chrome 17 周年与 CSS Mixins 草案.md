---
title: FE Bits Vol.6｜变与不变，Chrome 17 周年与 CSS Mixins 草案
description: 本文围绕前端发展的“变”与“不变”展开：一方面，外在技术形态如 CSS 标准、构建工具和框架在持续迭代；另一方面，核心设计思想如状态管理、组件分解、渲染优化和可维护性却始终存在。文章提醒开发者要在技术潮流中抓住长期有效的原则，并同时关注前端作为创意表达的特质。后续内容还收录了生态动态、CSS 新特性、社区文章、趣味项目及手办分享，展现了前端社区的活跃与多元。
link: weekly-6
catalog: true
lang: cn
date: 2025-09-07 18:30:00
tags:
  - 前端
  - JavaScript
  - CSS
  - AI
categories:
  - 周刊
---

> 本周刊更新时间期望是在每周天，网站在建设中……\
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。\
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。\
> QQ 讨论小群 598022684，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～\
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 9 月 7 日，星期日。

## 浅谈前端的变与不变

这个小标题听着好唬人，其实各行各业都适用。

前阵子看到有人讨论“如何系统性地学习前端”，提到很多前端架构层面的东西多年未变，更应该关注整体架构设计和代码复杂度的控制。

我很赞同这个说法，不过我也想补充几点。前端其实是个非常宽泛的领域，细分下去有 toC 前端、toB 前端、基建前端、WebGL 前端等等。想要系统学习，首先得明确方向：是专注用户体验，还是深耕业务逻辑，或是投入工具链开发？不同方向要深耕的内容截然不同。

此外，前端并不是一成不变的。用户也不只有企业系统的用户，还有很多专注于创意表达、视觉展示的类型。游戏前端是前端，未来的 VR/XR 页面也是前端，浏览器插件/小程序开发是前端，Node 开发也算前端——甚至再泛化一点，跨端开发也未尝不是前端的一种延伸。

以一个 toC 前端的视角给建议的话，前端动画、CSS、Three、交互表现、性能优化、SEO……每块背后都是一整个知识体系，往深里去挖是学不完的。而技术选型，往往得跟着业务需求走，并没有一套通吃的“最佳实践”。

另一方面，前端技术本身也在持续的”变“。就拿 CSS 来说，这些年一直在努力干掉预处理器等变得更好用：原生嵌套语法、`@if` 函数、锚点定位、容器查询、`shape()` 函数……很多我们曾经要靠预处理器或 `Hack` 方式实现的，现在都渐渐标准化了。浏览器兼容性也在稳步提升，连 Safari 都在努力跟上——比如 WebGPU 在 iOS 26 中终于要得到支持了（虽然我平时也没少吐槽 Safari，但能看到更多特性被支持、渐进增强变得更可行，确实是好事）。

虽然前端至今仍有很多历史遗留问题都很糟糕，但我们也该看到它正在变好。如果你对这个话题感兴趣，推荐之前读到的一篇很棒的文章：[HTML is Dead, Long Live HTML](https://acko.net/blog/html-is-dead-long-live-html/)，很深刻。

那么以我之见，前端的“变”，更多体现在外在技术形态的快速迭代——CSS 标准不断更新、构建工具推陈出新、框架生态此起彼伏。今天流行 Webpack，明天可能就换 Vite；才刚理解 Vue 2，Vue 3 的 Composition API 又成了主流。这种变化是表层的、工具性的，也恰恰是前端最容易被别人看到最容易吐槽的。

而“不变”的，是底层的问题和核心设计思想：如何管理状态、如何分解组件、如何优化渲染效率、如何实现可维护的代码结构、如何保障用户体验的一致性。这些命题从早期的 jQuery 时代到如今的 React、Solid.js，从未消失，只是在不同的技术范式下以不同的语法和架构重现，任何语言。

我认为前端的发展，本质上是一场“表达方式的演进”，而不是“问题的替换”。

因此学好前端，并不是盲目追逐每一个新工具或框架，而是要在变化中识别出那些持久不变的原则——理解它们，才能真正建立起属于自己的、可迁移的技术能力。

最后想说的是，前端远不止是“熟练度”的竞赛。它既有界面的表象，也有工程的深度；既要应对交互的细节，也要把握架构的稳定。写一个动画，可以只是 setInterval，也可以深入到渲染原理、性能层级与视觉算法。选择“如何做”，本身就是一个技术判断和架构思考的过程。

任何一门手艺，重复和积累是基础。但如果你认为前端仅仅停留在“切页面、调样式、写交互”，那真的太小看这个领域了。

所谓“没有技术含量”，或许只是因为还没走到真正复杂的问题面前。

写到这儿发现其实好像适用于任何方向，哈哈。

---

偶尔也会想，前端真正的魅力，可能恰恰在于它离“表达”那么近。

看多了海外那些小而美的网站，真的有点羡慕——一张专辑、一位画师、一项公益倡议、一家街角酒店、甚至一款本地食品，都有人愿意为之精心制作一个独具风格的小网站。它们不一定复杂，却充满个性，带着创作者的温度与巧思。

![Example](https://r2.cosine.ren/i/2025/09/efb3976a4b849c7560cf47f472090f70.webp)

这种“什么都能出个小网站展示”的文化，让人想起 Web 最初的样子，一直有人骂，一直有人爱。前端不仅是实现需求的工具，也可以成为创意表达的画布。

也许这正是前端技术一直吸引人的一点：它始终承载着人们对美的追求、对创意的表达，以及对每一个想法都值得被好好呈现的信念。

## 生态与社区动态

- Google Chrome 迎来 17 周年，同时 Google 在[反垄断案中保住了 Chrome](https://www.theverge.com/policy/717087/google-search-remedies-ruling-chrome)。这里有一篇[深度文章](https://addyosmani.com/blog/chrome-17th/)回顾了 Chrome 浏览器 17 年的发展历程，从发布到成为全球最广泛使用的浏览器。

- [ViteLand 2025 年 8 月更新回顾](https://voidzero.dev/posts/whats-new-aug-2025)：Oxlint 推出类型感知功能和自定义 JavaScript 插件支持，旨在成为完整的原生速度 linter。Vite 引入 React Server Component 支持，并更新了 @vitejs/plugin-react。Vitest v4 测试版支持视觉回归测试，并优化了启动速度。Rolldown-Vite 默认启用原生插件，并持续优化打包器性能，如 inlineConst 功能。Oxc 也改进了代码压缩和对 styled-components 的支持。

  > - tsup [现在不再积极维护了](https://x.com/TheAlexLichter/status/1956248974203007334)。幸运的是，可以通过简单的命令轻松切换到 [tsdown](https://tsdown.dev/guide/migrate-from-tsup)
  > - 您还记得 GitLab 使用 rolldown-vite 将构建速度提高了 2.6 倍吗？现在，在启用所有原生插件后，他们的[构建时间减少了 7 倍](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/180509#note_2678001031)，从 Vite 的 2.5 分钟缩短到 rolldown-vite 的 22 秒。这比他们现有的 Webpack 构建速度也快了 43 倍。

- [GitHub 添加了对 WebP 图像的支持](https://github.blog/changelog/2025-08-28-added-support-for-webp-images/)：GitHub 全面支持 WebP 图片上传与预览，现在用户可以在评论、Issue、Pull Request、Gist 与代码仓库中直接上传和预览 `.webp` 文件，此前需要下载才能查看。

- [使用带有 Suspenseful Data 数据的 Activity 组件](https://www.simeongriggs.dev/use-the-activity-boundary-to-hide-suspenseful-components)：React 19 实验性组件 Activity 可以通过 mode 属性控制子组件的隐藏/显示，其独特之处在于：当组件被隐藏时，它会卸载副作用（Effects），但保持组件的本地状态，并且继续以低优先级执行 Suspense 数据请求。相比传统的父级过滤或全量查询方式，Activity 能在复杂场景中提高性能、用户体验和可维护性。

- [Arc、Dia 被 Atlassian 以 6.1 亿美元收购](https://www.appinn.com/atlassian-acquires-arc-dia/)：Atlassian 宣布以 6.1 亿美元收购 The Browser Company，也就是 Arc、Dia 浏览器所在公司。

## 文章与视频

- [谈谈 AI 编程工具的进化与 Vibe Coding](https://guangzhengli.com/blog/zh/vibe-coding-and-context-coding)：区分 Vibe Coding 与 Context Coding，系统梳理 Copilot、Cursor、Claude Code 的上下文工程（Context Engineering）路径与实践取舍，并给出可操作的方法论与职业思考

- [关于 CSS 颜色插值你需要了解的内容 | CSS-Tricks](https://css-tricks.com/what-you-need-to-know-about-css-color-interpolation/)：深入讲解 CSS 中的颜色插值 (color interpolation)，如何在不同色彩空间下实现更平滑与细腻的过渡效果。

- [CSS 对齐的基础知识](https://css-tip.com/explore/alignment/)：这篇讲 CSS 对齐讲的很明白，感觉之前看 align-items 和 justify-content 都朦朦胧胧的，还得是一起讲最好。

- [#92 Liquid Glass 之外 Apple 的改变](https://fenx.work/outside-of-liquid-glass-apple-changes/)：内容十分有趣，因此收录于此，剖析 Apple 新视觉语言 Liquid Glass 的应用与问题，探讨其在 iOS、iPadOS 和 macOS 上的设计影响。

- [从服务器状态推导客户端状态](https://tkdodo.eu/blog/deriving-client-state-from-server-state)：探讨如何避免冗余同步，通过“派生状态(derive state)”来更优雅地保持 Client State 与 Server State 的一致性。

- [不要继承 box-sizing](https://www.oddbird.net/2025/09/04/box-model/)：作者论证为什么不应该通过继承的方式来设置 `box-sizing`，而应该直接统一声明并在需要时覆盖。

- [为什么浏览器会限制 JavaScript 定时器？](https://nolanlawson.com/2025/08/31/why-do-browsers-throttle-javascript-timers/)：探讨浏览器为何限制 JavaScript 定时器 (timers)，并通过实验比较不同定时方案的性能差异，最终推荐使用 Scheduler API。

- [是否应该预加载字体以提升性能？](https://www.erwinhofman.com/blog/should-you-preload-fonts-for-performance/)：预加载字体可能提升性能，但也可能拖慢首屏渲染 (FCP/LCP)，这篇文章权衡了预加载在不同场景下的风险与收益，并提出了实践建议：仅预加载关键字体、自托管字体、谨慎区分文本字体与图标字体。

- [为什么语言模型会产生幻觉](https://openai.com/index/why-language-models-hallucinate)：OpenAI 团队解释大语言模型为何会生成“幻觉”(hallucinations)，以及如何通过优化评估方法与训练方式减少此类错误。

### CSS 新特性

- [5 个使用新 @function 规则的实用 CSS 函数](https://una.im/5-css-functions/)：本文介绍了 CSS 新推出的 `@function` 规则，展示了如何通过自定义函数为样式表带来逻辑能力，使 CSS 更加动态、可维护，并提升设计系统的表达能力。作者通过五个实用案例（数值取反、透明度管理、流体排版、条件圆角、响应式侧边栏）以及一个 `light-dark` 主题切换函数，说明了现代 CSS 在逻辑处理和组件化方向上的巨大潜力，并展望了未来 `@mixin` 和 `@apply` 等特性的应用场景。

> CSS 函数和 [Mixins Draft Spec](https://drafts.csswg.org/css-mixins-1/) 是一个非常令人兴奋的规范。我们刚刚获得了 `@function` 规则，但还有更多内容！我尤其期待 `@mixin` 和 `@apply` 功能，它们能让你编写接受变量输入的 CSS 代码块，并输出动态样式。这将使创建比函数更复杂的样式成为可能。例如 CSS 函数仅能输出单一结果值，而 mixin 可同时应用多种样式。

- [Mixins & Functions to Streamline CSS](https://www.oddbird.net/2025/08/27/winging-it-24/)：探讨如何利用 CSS 的 Mixins 与 Functions 优化开发流程，并结合最新 CSSWG 会议动态。

- [@function 自定义函数让 CSS 支持编程啦](https://www.zhangxinxu.com/wordpress/2025/09/css-function-at-rules/)：介绍 CSS 新特性 @function 规则及其应用案例，展示其在编程化 CSS 中的潜力。

## 趣味项目与工具

- [Rainbow Loop 彩虹循环](https://codepen.io/creativeocean/pen/YPyjZmM) 精彩的 GSAP 驱动的 SVG 动画。

![RainbowLoop](https://r2.cosine.ren/i/2025/09/4ac5b3efd771f066214973db26683f67.gif)

- 趣站 [musicForProgramming();](https://musicforprogramming.net/latest/)：一个简约的文本版音乐站，为程序员在写代码时提供背景环境音乐的精选集，设计也很有趣。

![musicForProgramming](https://r2.cosine.ren/i/2025/09/d8fc0acb7d860cf51ef578e8fb9dba3f.webp)

- [90's Cursor Effects](https://tholman.com/cursor-effects/)：一个怀旧的光标效果集合，为现代浏览器优化，简单易用。

![Cursor Effects](https://r2.cosine.ren/i/2025/09/8e2d52308fc54e684c168e231cb9b482.webp)

- [bahdotsh/wrkflw](https://github.com/bahdotsh/wrkflw)：WRKFLW 是一款强大的命令行工具，用于在本地验证和执行 GitHub Actions 工作流程，无需完整的 GitHub 环境。它帮助开发者在将更改推送到 GitHub 之前，直接在他们的机器上测试他们的工作流程。

- [useautumn/autumn](https://github.com/useautumn/autumn)：Autumn 是一个介于 Stripe 与应用之间的开源计费中间层，支持订阅 (subscription)、额度充值 (credit systems)、基于使用量的定价 (usage-based models) 等复杂计费方式。它通过简化支付流程、解耦计费逻辑与应用代码，帮助开发者避免繁琐的 webhook、升级/降级、取消及支付失败。「记得之前看到过，现在又看到了于是记一下」

- [Awesome-Nano-Banana🍌-images](https://github.com/PicoTrex/Awesome-Nano-Banana-images)：一个展示 Google Nano-banana 在多种图像生成与编辑任务中的效果和提示词的精选案例库。

## Refs

- [Frontend Focus Issue 707: September 3, 2025](https://frontendfoc.us/issues/707)：本期聚焦 Anchor Positioning、Chrome 发展史、AI 辅助开发与 CSS 创意应用等前端热点。
- [JavaScript Weekly Issue 751: September 5, 2025](https://javascriptweekly.com/issues/751)：本期涵盖了浏览器定时器机制、AI 辅助开发、Chrome 发展史、Lean 语言、重要框架与工具的更新，以及社区分享的有趣项目。
- [Web Weekly #167](https://www.stefanjudis.com/blog/web-weekly-167/)：涵盖了本周前端世界的最新动态，包括 CSS 新特性、现代正则表达式、浏览器生态与可访问性话题等。
- [React Status Issue 442: September 3, 2025](https://react.statuscode.com/issues/442)：React 社区动态、工具更新与前端生态的最新资讯

## 晒手办

在最后，晒晒新手办！《我的 Miku 泡面压太多了怎么办》

这次收到的手办袖子上有点溢胶。不过整体还可以，很可爱！
![手办照1](https://r2.cosine.ren/i/2025/09/836fb95a2e6098cfb3dfcd90eb7400bd.webp)
![手办照2](https://r2.cosine.ren/i/2025/09/7a66be67d7ae417d255d02dcb79871ce.webp)

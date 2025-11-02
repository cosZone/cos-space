---
title: FE Bits Vol.13 ｜TypeScript 首次成为 GitHub 最常用语言、VoidZero A 轮融资 1250 万美元
description: Chrome 142 上线，GitHub 年度报告 TypeScript 登顶与 AI 成标配，Vercel 支持 Bun，VoidZero 获 A 轮，ViteConf/React Conf 重磅更新，CSS Typed Arithmetic 与锚点定位等实用精选。
link: weekly-13
catalog: true
lang: cn
date: 2025-11-02 21:50:00
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

今天是 2025 年 11 月 2 日，星期天。

周五去九寨沟游玩了一天，超级棒，即使是阴天也不影响它的美，难怪说「九寨归来不看水」，真的是很美。

九寨沟的交通是最折腾的，成都到九寨沟高铁 1 个半小时，高铁站到景区还要 2 个小时，一来一回快 7 个小时，一天特种兵行程的话真的巨累（建议俩天）但就算是现在这样据说也比以前交通方便多了，高铁站近几年才通的。

景区的车辆调度确实快，除了换左右线的时候排队时间比较长（半小时）其他都挺快的，几分钟就能上车，这可是 4w 人的旺季。

山里天气不像天气预报一样一直有雨，偶尔下一点点而已，带的伞都没用上。

懒得暴走，所以先逛中线，然后坐车逛完了右线，去左线看长海-五彩池，这个行程感觉挺省力的。

九寨沟秋景
![九寨沟秋景1](https://r2.cosine.ren/i/2025/11/5217e574a5a2ad3641ec703cb3facb26.webp)
![九寨沟秋景2](https://r2.cosine.ren/i/2025/11/e849096d3628b142dbcf25fc1770b0e8.webp)

中线的几个海子：
![中线1](https://r2.cosine.ren/i/2025/11/a5282ad4e324d736b97879a023464595.webp)
![中线2](https://r2.cosine.ren/i/2025/11/b7a0312a0f473160ad6a877c479ea4db.webp)
![中线3](https://r2.cosine.ren/i/2025/11/ecfcece196e14a7958635997412bbb55.webp)

五彩池
![五彩池](https://r2.cosine.ren/i/2025/11/2fd075712d793a8167dbcf5fda9d4942.webp)

长海
![长海1](https://r2.cosine.ren/i/2025/11/73a1c1e4ba80b7c33bf72151563855ef.webp)
![长海2](https://r2.cosine.ren/i/2025/11/7c20dc480f4a1e4eb4ab7378a4751d54.webp)

## 生态与社区动态

- [New in Chrome 142](https://developer.chrome.com/blog/new-in-chrome-142)：Chrome 142 引入了多项前端开发相关的新特性，包括用于滚动标记的 `:target-before` 与 `:target-after` 伪类、支持比较运算符的 CSS 样式容器查询 (style container queries) 与 `if()` 函数的范围语法 (range syntax)，以及可用于交互触发的 `interestfor` 属性。

- [Octoverse：每秒钟都有一个新的开发者加入 GitHub， AI 将 TypeScript 带到了 #1](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)：2025 年 GitHub 的年度报告，比较有意思，摘了其中几个点看看：

> 1. GitHub 总用户达 1.8 亿，年增 3600 万，创下历史最高增长率。每秒新增 1 名开发者，印度贡献 500 万以上新用户，占全球新增 14%。
> 2. 生成式人工智能如今已成为开发中的标准配置。超过 110 万个公共代码库正在使用 LLM SDK，其中仅过去 12 个月就新增了 693,867 个项目（同比增长 178%）。开发者们还合并了创纪录的 5.187 亿个拉取请求（同比增长 29%），80% 的新开发者在第一周就开始使用 Copilot。
> 3. TypeScript 首次成为 GitHub 最常用语言，超越 Python 和 JavaScript。即便如此，Python 在人工智能和数据科学工作负载方面仍然占据主导地位，而 JavaScript/TypeScript 生态系统的整体活跃度仍然高于 Python 本身。
> 4. 总计 3.95 亿个公共存储库托管了 11.2 亿次贡献和 5.187 亿次合并拉取请求——每一次都是一项记录。

还有很多很多数据，感兴趣的建议阅读原文。

- [VoidZero Raises $12.5M Series A](https://voidzero.dev/posts/announcing-series-a)：VoidZero 宣布获得 1250 万美元 A 轮融资，本轮融资旨在加速推进其统一 JavaScript 工具链「Vite+」的稳定发布，以及推动旗下开源项目的持续发展。团队引入多位优秀工程师，包括 `napi-rs` 作者和多个 OSS 核心贡献者。

- [Vercel 现在支持 Bun 运行时](https://bun.com/blog/vercel-adds-native-bun-support)：Vercel 宣布正式支持 Bun Runtime（运行时），开发者现在可以直接在 Vercel 上运行基于 Bun 的应用。

- [ViteConf 2025 Recap](https://voidzero.dev/posts/whats-new-viteconf-2025)：ViteConf 2025 回顾，包括 Vite+、Oxlint JS 插件、Vite DevTools、Nitro v3、Vitest 4 及性能工具链新进展。

- [React Conf 2025 Recap](https://react.dev/blog/2025/10/16/react-conf-2025-recap)：React Conf 2025 回顾，展示了 React 生态最新成果，包括 React Compiler v1.0 正式版、React Foundation 成立、React 19.2 与 React Native 新架构的重大更新等。

- [Electron 39](https://www.electronjs.org/blog/electron-39-0)：Electron 39 发布，升级到 Chromium 142.0.7444.52、V8 14.2 和 Node 22.20.0 的升级。

## 文章与视频

- [原生 CSS 中的 Springs 和 Bounces](https://www.joshwcomeau.com/animation/linear-timing-function/)：介绍如何利用原生 CSS 的 linear() 函数实现类似物理弹簧(spring)和反弹(bounce)的动画效果，并探讨其优劣与应用方式。

- [使用 details 元素、网格和子网格实现纯 CSS Tabs](https://css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid/)：介绍如何仅使用 HTML `<details>` 元素与 CSS Grid / Subgrid 构建可访问的选项卡 (Tabs)

- [今天就开始在你的网站上使用视图转换吧](https://piccalil.li/blog/start-implementing-view-transitions-on-your-websites-today/?ref=articles-rss-feed)：深入介绍如何在网站中应用 View Transition API 实现页面间的平滑转场动画。

- [我使用 Claude Code 开发 Rolldown 的体验](https://hyf.me/blog/claude-code-in-rolldown)：在 Rolldown 开发中高强度使用 Claude Code 进行真实开发的思考与经验分享。
  从 [周报 #102 - 我是如何使用 AI 的](https://www.pseudoyu.com/posts/weekly_review_102) 里看到的文章，我觉得说的都挺对的，现在 AI 确实是很好的副驾驶了，我也是同时用着 codex / claude code / cursor 感觉爽翻天了。

- [Junior Dev Tip: "Scroll Up"](https://alex.party/posts/2025-10-08-junior-dev-tip-scroll-up/)：一次初级开发者调试错误的故事，提醒大家“多滚动一点，认真读错误信息”。

> 大多数情况下，工具都会提供相关信息。真的只需要多花几秒钟，仔细阅读一下提示信息就行。

- [Directives and the Platform Boundary | TanStack Blog](https://tanstack.com/blog/directives-and-the-platform-boundary)：探讨框架自创 “use server”、“use client” 等自定义指令 (Directive) 趋势。这些指令表面上像平台特性，却缺乏标准规范，模糊了语言与框架的界线，引发生态混乱、工具负担与可移植性风险。作者主张指令应保持极少且标准化，用于语言层；而具参数化、策略性或扩展需求的功能应采用显式 API（好文，No Directive！）

- [我创建了 10 次相同的应用：评估移动性能框架](https://www.lorenstew.art/blog/10-kanban-boards)：作者以构建同一款 Kanban App 十次的方法，系统测试十个现代前端框架在移动端性能上的差异。

- [一个不断预测 Web 死亡的人](https://tedium.co/2025/10/25/web-dead-predictions-george-colony/)：回顾 Forrester 创始人 George Colony 30 年来多次预测 “Web 已死” 的荒谬历史，从最初批评 Web 静态、缺乏交互性，到 2000 年代鼓吹 “XInternet”，再到 2010 年代推崇 “App Internet”，以及 2020 年代声称生成式 AI 会取代 Web，揭示技术悲观主义的循环与 Web 的持久生命力。

## CSS 新特性

- [不使用 JavaScript 获取屏幕宽度和高度](https://css-tip.com/screen-dimension/)：介绍如何使用纯 CSS 获取屏幕宽高（像素值），无需使用 JavaScript。需注意的是，Safari 上应使用 dvh 才准确，其中包括了 [CSS 类型化算术 (Typed Arithmetic)](https://css-tricks.com/css-typed-arithmetic/#aa-wrapping-up-the-dawn-of-computational-css) 这个技巧，100vw/1px 得到纯数字的 px 值，[CSS Typed Arithmetic 支持度](https://developer.mozilla.org/en-US/docs/Web/CSS/calc#browser_compatibility)为 Safari 26 / Chrome 140，Firefox 暂不支持。

- [精准定位的 Tooltip：基础篇](https://frontendmasters.com/blog/perfectly-pointed-tooltips-a-foundation/)：本文详细介绍了如何利用现代 CSS 的锚点定位 (Anchor Positioning) API 来创建能够智能定位、避免溢出的工具提示 (Tooltip)，全程无需 JavaScript。（是之前 CSS Tips 锚点定位一系列教程的总结，都是 Temani Afif 写的，不同的是这篇讲解的比较多）

## 趣味项目与工具

- [spoilerjs | Beautiful Spoiler Effects](https://spoilerjs.sh4jid.me/)：一个框架无关的 Web Components，用粒子动画实现优雅的“剧透（Spoiler）”效果。

- [vue-command](https://ndabap.github.io/vue-command/)：一个基于 Vue.js 的功能齐全、特性丰富的终端模拟器组件。

## Codepen 精选

[Details & Summary 🍏 ::details-content/content-visibility](https://codepen.io/jh3y/pen/JoGpOGV)

> Jhey Tompkins 为 details & summary 构建了一个出色的交互式展示，使用 `::details-content` / `content-visibility` 纯 CSS 实现，无需 JavaScript。"

![](https://r2.cosine.ren/i/2025/10/6911b49209e50dad930e0a131867cdf4.webp)

[自定义曲线滚动条](https://codepen.io/cbolson/pen/vELrOPz)

> Chris Bolson 分享了曲线滚动条主题的两种变体：一种是超级曲线，另一种是更微妙的曲线。"滚动条遵循容器的边框半径，长度根据内容数量计算"。

核心原理是隐藏原生滚动条，在容器上方叠加一层 SVG，画一条沿容器圆角轮廓的轨迹，并将滚动条当作这条路径上的一段子路径来渲染，用视口高度与内容高度的比例计算滚动条长度。

拖动时根据指针的垂直位置换算滚动比例写回 scrollTop，滚动与窗口尺寸变化时同步重算路径，颜色与粗细则由 CSS 变量和交互状态控制。

酷是挺酷的，但是感觉 UX 不太符合用户直觉？

![](https://r2.cosine.ren/i/2025/10/efc5ef51443edf61a97d3c00a9bb1ab7.gif)

[Circular Ranges](https://codepen.io/stoumann/pen/JoGrEBJ)

> Mads Stoumann 演示了他的 "带有可选索引和标签的圆形范围滑块自定义元素"，并展示了从部分曲线到完整圆形的圆形范围滑块。

![](https://r2.cosine.ren/i/2025/10/b7abd1016f44e8e5810d758b6ddd4735.webp)

[Frutiger Aero Card](https://codepen.io/TheMOZZARELLA/pen/MYKErbJ)

> MOZZARELLA 以 CSS 重现 [Frutiger Aero](https://en.wikipedia.org/wiki/Frutiger_Aero) 风格的亮面卡片，呈现柔和渐变光效。

好亮的风格。

![](https://r2.cosine.ren/i/2025/10/7d01cbca68972a724621792f9c5f86ce.webp)

[Wood Board](https://codepen.io/finnhvman/pen/pvgaBQo)

> Bence Szabo 发布仅 353 字节的 SVG 木纹纹理，是其 [#PetitePatterns (极简纹理系列)](https://codepen.io/collection/DRMKdB)之一。

![](https://r2.cosine.ren/i/2025/10/01508ab31545af8399ef41866a488cf5.webp)

## Refs

- [Codepen Spark #478](https://codepen.io/spark/478)
- [JavaScript Weekly Issue 759: October 31, 2025](https://javascriptweekly.com/issues/759)
- [Node Weekly Issue 598: October 28, 2025](https://nodeweekly.com/issues/598)
- [React Status Issue 449: October 29, 2025](https://react.statuscode.com/issues/449)
- [Frontend Focus Issue 715: October 29, 2025](https://frontendfoc.us/issues/715)

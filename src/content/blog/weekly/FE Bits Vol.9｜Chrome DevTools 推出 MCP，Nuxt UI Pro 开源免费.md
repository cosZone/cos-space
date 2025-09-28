---
title: FE Bits Vol.9｜Chrome DevTools 推出 MCP，Nuxt UI Pro 开源免费
description: 本期速览：Chrome 推出 DevTools MCP 赋能 AI，Nuxt UI v4/Pro 开源免费；Cloudflare 发布 Email Service 私测；npm 强化供应链安全；Webflow 赞助 Astro；Wasm 3.0 发布。精选图片优化、findLast、Subgrid/@starting-style 等文章与实用工具。下周国庆停更，周刊网站开工。
link: weekly-9
catalog: true
lang: cn
date: 2025-09-28 22:45:00
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

今天是 2025 年 9 月 28 日，星期天，快到国庆假期了呢。下周假期，周刊停更一期！

决定还是给周刊写个网站，争取在十一假期里把周刊网站整出来～

## 生态与社区动态

- [Chrome DevTools (MCP) for your AI agent](https://developer.chrome.com/blog/chrome-devtools-mcp?hl=en)：Chrome 推出 MCP 服务，将 DevTools 能力赋能 AI 编程助手，实现实时调试和性能分析。[GitHub 地址](https://github.com/ChromeDevTools/chrome-devtools-mcp)

- NuxtUI Pro 现在也开源免费了。[Nuxt UI v4](https://nuxt.com/blog/nuxt-ui-v4)：Nuxt UI v4 正式发布，统一了 Nuxt UI 与 Nuxt UI Pro，提供 110+ 组件、12 模板及完整 Figma Kit。[开源地址](https://github.com/nuxt/ui)

- [Announcing Cloudflare Email Service’s private beta](https://blog.cloudflare.com/email-service/)：Cloudflare 推出 Email Service 私有测试版，提供集成的邮件发送与路由功能，简化开发者应用中的邮件处理。

> Cloudflare 推出了基于 worker 的邮件发送能力，这样真的一站式搞定了自定义域名邮箱的收发。任何人都可以简单快速的搞定自己的域名邮箱（尤其是独立开发者们）
> 而且还可以导入外部库，让邮件样式更加美化，这哪还需要啥 resend 啊
> [Source](https://x.com/zhangjintao9020/status/1971252154552975814)

- [Our plan for a more secure npm supply chain](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)：GitHub 公布强化 npm 供应链安全的路线图，聚焦身份认证、发布机制与社区协作，以应对近期攻击事件。包括本地发布强制启用双因素认证（2FA）、具有七天有限生命周期的细粒度令牌和 [Trusted publishing](https://repos.openssf.org/trusted-publishers-for-all-package-repositories)。

- [Webflow Donates $150,000 to Support Astro's Open Source Mission](https://astro.build/blog/webflow-official-partner/)：Webflow 成为 Astro 最新官方赞助商，捐赠 15 万美元并宣布采用 Astro 驱动其 AI 应用生成能力。

## 文章与视频

- [Your Images Are (Probably) Oversized](https://reasonunderpressure.com/blog/posts/your-images-are-probably-oversized)：一篇深入探讨网页前端中图片加载与优化的文章，重点揭示开发者常见的“图片过大”问题，并提供 `srcset` 与 `sizes` 的最佳实践指南。

- [You may be looking for a useSyncExternalStore](https://swizec.com/blog/you-may-be-looking-for-a-useSyncExternalStore/)：当你用 `useEffect` + `useState` 写订阅逻辑时，其实可能应该用 `useSyncExternalStore` 来避免客户端渲染抖动 (jank)。

- [Stop using .reverse().find(): meet findLast()](https://allthingssmitty.com/2025/09/22/stop-using-reverse-find-meet-findlast/)：介绍 ES2023 新增的 `findLast()` 和 `findLastIndex()` 方法，替代繁琐的 `.reverse().find()` 实现更高效的数组反向查找。

- [Animating Elements through framer motion with React.js](https://medium.com/@biswas.sukanta47/animating-elements-through-framer-motion-with-react-js-cdcfb2ce68b8)：一文介绍如何通过 Framer Motion 在 React 中实现丰富动画效果，从基础到进阶实例演示。

- [The Web’s Most Tolerated Feature - Bocoup](https://www.bocoup.com/blog/the-webs-most-tolerated-feature)：一篇回顾 CSS `zoom` 属性从 IE 独有特性到最终进入标准规范的 25 年历程

- [We Keep Reinventing CSS, but Styling Was Never the Problem](https://denodell.com/blog/we-keep-reinventing-css)：文章探讨了前端开发中不断“重塑” CSS 的现象，并指出问题根源并非 CSS 本身，而是现代前端架构与 CSS 的错位。

- [Subgrid: how to line up elements to your heart’s content](https://webkit.org/blog/17339/subgrid-how-to-line-up-elements-to-your-hearts-content/)：介绍 CSS Grid 中的 Subgrid 功能以及如何在实际场景中保持元素对齐。

- [CSS offset and animation-composition for Rotating Menus](https://frontendmasters.com/blog/css-offset-and-animation-composition-for-rotating-menus/)：讲解如何用 CSS 的 `offset` 和 `animation-composition` 将菜单项布局在圆形路径上，来高效实现旋转菜单动画。

![](https://r2.cosine.ren/i/2025/09/601698e26e81a1f93cd31d316cf566df.webp)

### CSS 新特性

- [The Big Gotcha With @starting-style](https://www.joshwcomeau.com/css/starting-style/)：深入探讨 CSS 新特性 @starting-style 的优势与陷阱，以及如何应对其特有的 specificity 问题。

- [Integrating CSS Cascade Layers To An Existing Project](https://www.smashingmagazine.com/2025/09/integrating-css-cascade-layers-existing-project/)：本文通过一个真实的 Discord Bot 网站案例，详细展示了如何将 CSS Cascade Layers 集成到已有的杂乱 CSS 项目中。

- [CSS Typed Arithmetic](https://css-tricks.com/css-typed-arithmetic/)：文章介绍 CSS 类型化算术（CSS Typed Arithmetic）的概念和规则，强调其核心突破在于允许将带单位的值相除，得到一个可复用的无单位数值。此功能让不同 CSS 数据类型之间可以互相计算与转换，从而实现过去只能依赖 JavaScript 或黑科技技巧的动态布局和交互。借助 Typed Arithmetic 可实现诸如字体大小影响透明度、元素宽度控制颜色或动画路径等操作。

## 趣味项目与工具

- [NickvanDyke/eslint-plugin-react-you-might-not-need-an-effect](https://github.com/NickvanDyke/eslint-plugin-react-you-might-not-need-an-effect)：一个 ESLint 插件，用于检测 React 中不必要的 `useEffect`，让代码更简洁、更快、更安全。

- [IINA](https://iina.io/) 开源 macOS 播放器最近[新增 JavaScript 插件系统](https://github.com/iina/iina/releases/tag/v1.4.0)，扩展功能性。(这个是我一直在用的播放器)

- [abinthomasonline/repo2txt](https://github.com/abinthomasonline/repo2txt)：一个可在浏览器运行的工具，将 GitHub 仓库或本地目录转换为格式化文本文件，方便用于 LLM 提示输入。

![](https://r2.cosine.ren/i/2025/09/7bb0b103b287a5ea3b7cb386021d4095.gif)

- [Logoipsum](https://logoipsum.com/): 100 个免费的 SVG 占位符标志。一种在设计中临时添加逼真外观标志的巧妙方法。允许您从 10 个不同的类别中选择，并可以交互式地在本站导航栏中预览所选标志。

![](https://r2.cosine.ren/i/2025/09/a12bf8279310c1318a79d6714ce31868.webp)

- [FlyCut Caption](https://github.com/x007xyz/flycut-caption?tab=readme-ov-file)：一个基于 Whisper 模型与 Transformers.js 的视频字幕生成与编辑工具，支持全流程的智能字幕识别、编辑、预览和导出。[Demo](https://caption.flycut.co/en/tool)

- [Colf](https://colf.dev/)：一个新颖的在线编程挑战，结合 leetcode、code golf 与 AI prompting 的在线挑战平台，看谁用最少 token 完成编程任务。
  ![](https://r2.cosine.ren/i/2025/09/7c31e7f458ca280b4883bf852284a20f.webp)

- [The Coyier CSS Starter](https://frontendmasters.com/blog/the-coyier-css-starter/)：Chris Coyier 的个人化 CSS Starter，强调实用性、可读性与易用性，并非传统 CSS Reset。

## 生态更新

- [TanStack Start v1 Release Candidate | TanStack Blog](https://tanstack.com/blog/announcing-tanstack-start-v1)：TanStack Start 发布 v1 候选版（Release Candidate），进入即将稳定的最后阶段。

- [Middleware in React Router](https://remix.run/blog/middleware)：React Router 7.9.0 稳定支持 middleware 功能，为开发者带来更灵活的请求处理和数据共享能力。

- [Wasm 3.0 Completed - WebAssembly](https://webassembly.org/news/2025-09-17-wasm-3.0/)：Wasm 3.0 正式发布，带来包括 64 位寻址、多内存、GC、类型系统增强、异常处理等在内的重大更新，迈向更强大的跨语言低层平台。

## Refs

- [JavaScript Weekly Issue 754: September 26, 2025](https://javascriptweekly.com/issues/754)：本期聚焦 AI 代码审查、CLI 工具、前端框架更新以及多个新版本发布。

- [React Status Issue 445: September 24, 2025](https://react.statuscode.com/issues/445)：React 生态最新动态，每周精选资讯、框架发布、工具更新与社区新闻。

- [Frontend Focus Issue 710: September 24, 2025](https://frontendfoc.us/issues/710)：前端周刊，汇总 CSS、WebAssembly、AI 工具等最新动态与资源分享。

- [Awesome JavaScript Weekly - Issue 488, Sep 25, 2025](https://js.libhunt.com/newsletter/488)：本期涵盖 JavaScript 相关的新工具、库、数据库更新和开发资源推荐。

- [683: iOS 26 Safari, Material Support on the Web, and Fixing The Button Problem](https://shoptalkshow.com/683/)：讨论 Safari iOS 26 新功能、CSS 美学、TypeScript 适用场景与技术栈重构思考。

- [科技爱好者周刊（第 367 期）：Nano Banana 的几个妙用](https://www.ruanyifeng.com/blog/2025/09/weekly-issue-367.html)：谷歌最新图像模型 Nano Banana 的应用案例与科技热点合集。

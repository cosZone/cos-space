---
title: FE Bits Vol.4｜Next 15.5、RN 0.81、几个顺手工具
description: 本周前端周刊汇总 Next.js 15.5、ReactNative 0.81、TC39 进展与 Win11 补丁争议，推荐 RSC 实践、Chrome 内置 AI API、LLM 局限等文章及多款工具库。
link: weekly-4
catalog: true
lang: cn
date: 2025-08-24 12:00:00
tags:
  - 前端
  - CSS
  - AI
categories:
  - 周刊
---

> 本周刊更新时间期望是在每周天，网站在建设中……\
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quality RSS](https://quaily.com/cosine/feed/atom)。\
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。\
> 建了个 QQ 讨论小群 598022684 欢迎加入，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～\
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 8 月 24 日，星期日。

本周我给我开发的 MoeCopy AI 浏览器插件写了个文档站 https://moe.cosine.ren/docs

本浏览器插件[开源](https://github.com/yusixian/moe-copy-ai)，轻量级，填入自己的 apikey 即可使用，欢迎尝试，喜欢的话可以给个 star。

感觉这周挺忙，也没有很多时间搜集素材搞深入分析，所以这期是比较简单的汇总。

## 写在前面的碎碎念

这周在工作群给不了解的同事发了下关于 Cursor 定价调整的说明，感觉也可以同步一下这里。

Cursor 的定价列表：https://docs.cursor.com/zh/account/pricing

Cursor 的定价曾经调整过很多次，被骂惨了。最早是随便用，pro 就可以，每月 500 次快速请求用完了会进入慢速请求模式但是还是能用。后面调了好几次，慢慢变成请求计费取消慢速请求，现在变成了：

> Pro ($20/月)：适合主要使用 Tab 功能，偶尔使用 agent 的用户。
> Pro+ ($60/月)：适合几乎每个工作日都使用 agent 编程的用户。
> Ultra ($200/月)：适合使用 agent 完成大部分编程工作的高级用户。

请求限制是：

> Pro：约 225 次 Sonnet 4 请求，约 550 次 Gemini 请求，或约 650 次 GPT 4.1 请求
> Pro+：约 675 次 Sonnet 4 请求，约 1,650 次 Gemini 请求，或约 1,950 次 GPT 4.1 请求
> Ultra：约 4,500 次 Sonnet 4 请求，约 11,000 次 Gemini 请求，或约 13,000 次 GPT 4.1 请求

官方还说「像 Opus 4 这样的模型每次请求消耗更多令牌，比其他模型更快达到使用限制。我们建议有选择性和有意识地选择这些模型。」就是烧不起 token 了

超过就会转很笨的 auto 模型，或者开 max 模式按量付费，所以现在 Cursor 不划算了，对于开发来说只用 tab 就够了。

Teams 版本就是按人头计费， 40 美元/月

> 团队席位每月为每个用户提供 500 个请求。每次使用代理时，大多数模型将消耗一个请求。少数模型成本更高：当您启用思考功能时，Sonnet 3.7 和 Sonnet 4 消耗两个请求。MAX 模式定价基于令牌计算，根据模型提供商的 API 价格。

省流的话，就是现在个人档/团队档位是按请求次数计费，加钱加档位只是免费请求的量会更多，没有任何新功能，所有档位都包含所有功能，超过免费量就会转很笨的 auto 模型，或者开 max 模式按 token 付费。

官方似乎也意识到了这点，现在还专门在定价说明里强调 20 刀的版本「适合主要使用 Tab 功能，偶尔使用代理的用户」

该跑路的应该在七月份的定价调整的时候就跑路了吧，感觉现在留下的都是离不开他的 Tab 或者是年付订阅的了。

个人的话其实是已经用 Claude Code 替代 Cursor 的对话很久了，只用 Cursor 的 Tab 功能，他的 Tab 功能目前还是没有找到平替的。

## 生态与社区动态

- [微软 8 月份更新 Win11，真把用户的 1TB 硬盘炸了？还能抢救吗？](https://www.appinn.com/windows11-kb5063878/)
- [Reflections on the React Community](https://leerob.com/reflections)：Lee 回顾自己十年 React 与 Next.js 的经历，反思社区建设、开源与商业动机的矛盾，以及 React Server Components 的发展与挑战，并呼吁对开源贡献者保持善意与理解。
- [JavaScript 的未来：等待我们的是什么](https://jsdev.space/future-of-javascript/)：文章总结了最新 TC39 提案进展，展示了从资源管理 `using`、`Array.fromAsync` 到随机数、数据不可变等功能如何塑造 JavaScript 的未来发展。
- [Next.js 15.5 Released](https://nextjs.org/blog/next-15-5)，引入了 Turbopack 构建（beta）、稳定的 Node.js 中间件、TypeScript 路由类型完善、弃用 `next lint`，并提前提示 Next.js 16 的弃用变化。
- [React Native 0.81](https://reactnative.dev/blog/2025/08/12/react-native-0.81)：本次更新带来 Android 16 支持、iOS 预编译构建加速、弃用 SafeAreaView、移除内置 JSC 以及多项性能改进和破坏性变更。

## 文章与视频

- 📓 [瘸腿的巨人](https://blog.solazy.me/20250821/)：非常有趣的观点。

> 无论一个人在某个领域攀登到多高的位置，他首先是一个普通人。和我们一样，他们需要呼吸、进食，如果饮食单一也同样会营养不良。他们之所以成为「大 V」或专家，往往只是因为后天的发展路径、精力分配以及行业机遇，让他们在特定的道路上走得更远，处理着与我们不尽相同的问题。

作者在社交媒体上观察到一些在各自领域有影响力的用户，在某些话题上表现出知识的局限性。他们将大量时间和精力投入到专业领域，牺牲了对其他领域的了解。而这种“瘸腿”的状态使得他们在熟悉领域之外显得脆弱，这种现象在现代社会普遍存在，深度追求往往伴随着其他方面的不足。学会理解和接受这种现象，认识到“巨人”也是普通人，他们的“瘸腿”是时代和社会分工的产物。

> 追求任何一个领域的深度，似乎都不可避免地要以牺牲其他领域的广度为代价。
> 所以，当我再看到那些平日里敬仰的专业人士，在他们不熟悉的领域发表一些浅薄言论时，我慢慢学会了不再感到惊讶或失望。我看到的，不再是一个偶像的崩塌，而只是一个将所有精力都投入到一条腿上的人，不小心用另一条腿走路的样子。

- 📓 [Server and Client Component Composition in Practice](https://aurorascharff.no/posts/server-client-component-composition-in-practice/)：探索 Server Component 与 Client Component 的组合实践。
- 📓 [设计 Chrome 的内置 AI Web API](https://domenic.me/builtin-ai-api-design/)：Google Chrome 团队成员 Domenic 分享了有关 Chrome 最新 AI 功能 API 设计方式的一些见解。
- 📓 [Circular gallery of rounded images](https://css-tip.com/circular-gallery/)：利用 CSS 的 `offset` 属性和 `:nth-child` 选择器，即可创建一个将多张图片排列成同心圆的画廊效果，还可以实现带动画版本的。 ![Demo](https://r2.cosine.ren/i/2025/08/5ee99b98a64edc1adc243971d013450a.webp)
- 📓 [如何因 Shopify webhook 解析错误导致数据库完全删除](https://www.ingressr.com/blog/webhook-security-incident-analysis/)：一次错误的 Shopify Webhook 解析因 JavaScript 解构与 ORM 行为理解不当导致全库数据被删除，但最终依靠完善的备份机制成功恢复，凸显输入验证、认证与防御性编程的重要性。
- 📓 [Why LLMs Can't Really Build Software - Zed Blog](https://zed.dev/blog/why-llms-cant-build-software)：探讨 LLMs 目前无法真正构建软件的观点，认为其缺乏像人类工程师一样建立并维持清晰"心智模型"的能力
- 📓 [Web Design: What is the web capable of that is hard to express in design software?](https://frontendmasters.com/blog/web-design-what-is-the-web-capable-of-that-is-hard-to-express-in-design-software/)：探讨设计软件与真实 Web 技术能力之间的差距，强调动态、响应式和交互特性难以在设计稿中表达。
- 📓 [OpenAI Cookbook](https://cookbook.openai.com/)：OpenAI 在发布 GPT-5 的时候也发布了一些全新的教程，涵盖提示词指南、新工具使用及代码编写等内容。
- 📓 [Obsessing Over Smooth radial-gradient() Disc Edges](https://frontendmasters.com/blog/obsessing-over-smooth-radial-gradient-disc-edges/)：探讨如何利用 CSS 的 `resolution` 媒体查询，解决 `radial-gradient` 创建的圆形边缘锯齿问题。
- 📓 [An Interactive Guide to SVG Paths](https://www.joshwcomeau.com/svg/interactive-guide-to-paths/)：深入探讨 SVG 的 path 元素，详细介绍如何绘制 Bézier 曲线和弧形的优质教程。
- 📓 [终端（Terminal）、TTY 和 Shell，还有 SSH，一次搞懂它们到底是什么？ - 小众软件](https://www.appinn.com/terminal-tty-and-shell/)：科普了计算机中多个相关概念，包括终端（Terminal）、TTY、Shell 及 SSH 协议，帮助读者理解这些术语的定义与功能，以及它们在现代计算机中的应用和重要性。

## 工具与库更新

### 工具

- [CPTI - 程序员 16 型人格测试](https://cpti.browserfly.app/zh/)：程序员的 MBTI 人格测试，AI 描述挺准确，想法很有趣。
- [RegExp Equivalence Checker](https://gruhn.github.io/regex-utils/equiv-checker.html)：一个可检测两个正则表达式是否匹配相同字符串的在线工具，并展示差异示例与支持的语法。
- [Lookin](https://github.com/hughkli/Lookin)：最近看 iOS 开发看到的，Lookin 是一个由腾讯微信读书团队开发的、专为 iOS 开发者设计的免费开源 UI 调试工具。作者的介绍文章在 https://mp.weixin.qq.com/s/DL28y2qHkuDv4W_zLUbKcg ![](https://r2.cosine.ren/i/2025/08/fd19abb2ef884a9aea1d57e518d490ed.webp)
- [MaterialYouNewTab](https://github.com/prem-k-r/MaterialYouNewTab)：这是一个灵感来源于谷歌“Material You”设计的简洁新标签页浏览器扩展。 ![](https://r2.cosine.ren/i/2025/08/7988a5ac9b72625631a6faf8c58858e7.webp)
- [Streamdown](https://github.com/vercel/streamdown)：Vercel 出的一款专为 AI 流式响应设计的 react-markdown 替代品，能智能处理并渲染不完整的 Markdown 内容。
- [IntraScribe](https://github.com/weynechen/intrascribe)：一个专为重视数据隐私的团队设计的本地化语音转录与总结工具，确保所有数据保留在本地服务器。
- [MingCute](https://github.com/Richard9394/MingCute)：一个精心设计的开源图标库，提供多种风格与格式，适合网页和移动端的设计与开发使用。 ![](https://r2.cosine.ren/i/2025/08/736ce0bc3d7a70405f248a78963b0e6c.webp)

### 库更新

1. [Next.js 15.5 Released](https://nextjs.org/blog/next-15-5)

   - Turbopack Builds（测试版）：生产 turbopack 版本（下一个版本 --turbopack）现在处于测试阶段
   - Node.js 中间件（稳定版）：Node.js 运行时对中间件的支持现在稳定
   - TypeScript 改进：类型化路由、路由导出验证和路由类型帮助程序
   - next lint：弃用 next lint 命令，现在可以在 ESLint（综合规则）、Biome（快速且规则较少）或无 linter 之间进行选择。ESLint 项目现在生成显式的 eslint.config.mjs 文件，而不是依赖下一个 lint 命令包装器，从而为您的 lint 规则提供完全的透明度。

2. [React Native 0.81 Released](https://reactnative.dev/blog/2025/08/12/react-native-0.81)：

   - 默认支持 Android 16 (强制 edge-to-edge views)
   - iOS 预编译构建实验性支持，速度提升最高 10 倍
   - Expo SDK 54 开启 beta，集成 RN 0.81 + React 19.1

3. Waku 0.25, Astro 5.13, ESLint v9.33.0, Fastify 5.5, pnpm 10.15, Biome 2.2……

完～

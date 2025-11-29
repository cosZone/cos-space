---
title: FE Bits Vol.15｜Chrome 宽高动画重排优化，Node Type Stripping 稳定
description: 本期聚焦：周刊站点上线征建议，pnpm10.21安全性优化、TC39东京议程、Node25.2 Type Stripping稳定，Chrome宽高动画与CSS容器查询 range 进展，另收录 Visual Types、JS Engines Zoo 等趣站/Codepen。
link: weekly-15
catalog: true
lang: cn
date: 2025-11-16 21:00:00
tags:
  - 前端
  - JavaScript
  - CSS
  - TypeScript
categories:
  - 周刊
---

> 本周刊更新时间期望是在每周天，网站在建设中……
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quaily RSS](https://quaily.com/cosine/feed/atom)。
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。
> QQ 讨论小群 598022684，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 11 月 16 日，星期天。

[周刊网站](https://blog.cosine.ren/weekly) 先打了个样，域名估计还会换，后续等迁移的东西都迁移过来了之后再把原来 hexo 的版本换掉。

在博客的基础上加上了周刊栏目，欢迎提建议，还有很多要优化的，搜索和评论还没加上，但是欢迎来看看提建议。

仓库在 https://github.com/cosZone/astro-koharu

我发现我的拖延症还是没好，不发出来就会一直拖～所以发出来鞭策鞭策自己。

![](https://r2.cosine.ren/i/2025/11/c84e26403a6cc9d19e06abe60c785ba3.webp)

## 生态与社区动态

- [pnpm 10.21](https://pnpm.io/blog/releases/10.21)：可根据 `engines.runtime` 自动安装依赖所需 Node 版本，并引入 `trustPolicy` 防止供应链攻击。

  > 当依赖声明了特定 Node.js 版本（在 engines.runtime 字段中），pnpm 会自动安装该版本并绑定 CLI 应用运行时，保证依赖与运行环境一致。若存在 postinstall 脚本，也会在匹配版本的 Node.js 下执行。
  > 信任策略 (trustPolicy) 设置：新增配置项，可设置为 no-downgrade，当包的信任等级比之前版本下降时，会阻止安装，防止潜在安全风险。

- TC39（JavaScript 语言标准化委员会）第 111 次会议将于 2025 年 11 月在东京举办的，[会议议程公布](https://javascriptweekly.com/link/177064/web)。

> Stage 4 候选提案：
>
> 1. [Iterator Sequencing](https://github.com/tc39/proposal-iterator-sequencing)
> 2. [JSON.parse source text access](https://github.com/tc39/proposal-json-parse-with-source)
> 3. [Temporal](https://github.com/tc39/proposal-temporal) 状态更新
> 4. [Locale Info API](https://docs.google.com/presentation/d/17FKrRkWCfNdYui9uRQDRYzv2c3cOCp6ZM7Rly9MwGHM/edit)

> Stage 0 新议题：
>
> 1. 迭代支持改进（Iterator Join、TypedArray Concatenation、FindWithin）
> 2. [Class spread syntax](https://github.com/LeaVerou/proposal-class-spread)
> 3. [Class field introspection](https://github.com/LeaVerou/proposal-class-field-introspection)
> 4. 若干新 Intl 提案（Energy Units、Unit Protocol 等）。

- [Node.js v25.2.0](https://nodejs.org/en/blog/release/v25.2.0)：Type Stripping 功能标记为稳定。

- [esbuild 0.27](https://github.com/evanw/esbuild/releases/tag/v0.27.0)：带破坏性更新，提示锁定版本。

## 文章与视频

- [在 Chrome 浏览器中，在特定条件下，  对 CSS width  或  height  进行动画处理不再强制执行主线程动画](https://www.bram.us/2025/11/13/animating-css-width-or-height-no-longer-force-a-main-thread-animation-in-chrome-under-the-right-conditions/)：从性能角度来看，对 CSS `width`  和  `height`  进行动画处理是不好的，因为它会导致[渲染管线](https://web.dev/articles/rendering-performance#the_pixel_pipeline)中发生布局操作（也称重排）。 **这一点至今仍然正确。**

但最近的 Chrome Canary 版本中最近有一个令人兴奋的动画/性能改进：

> 在 Chrome 144.0.7512.0（当前 Canary 版本）中，我们扩展了  `width` / `height`  检查，以检查  `width`  或  `height`  是否真的发生了变化。
> 💡 如果  `width` / `height`  不变，则无需计算布局，因此也无需强制动画在主线程上运行。

- [Crafting Generative CSS Worlds | Codrops](https://tympanus.net/codrops/2025/11/10/crafting-generative-css-worlds/)：用纯 CSS 打造 3D 等距地形世界，通过层叠网格与 3D 变换构建出一个像素风的生成式世界。作者介绍了从镜头视角设置，到多层网格架构、地形单元的几何定义，再到噪声生成高度图和性能优化等完整技术路径。网站为 [CSS Terrain Generator](https://terra.layoutit.com)

![](https://r2.cosine.ren/i/2025/11/4fbd67686dc24a1340d6518801e8b67d.webp)

- [Perfecting Baseline](https://piccalil.li/blog/perfecting-baseline/?ref=articles-rss-feed)：一篇讲述 Web 平台特性 “Baseline” 概念如何诞生、发展和优化的技术随笔，让开发者理解它的价值与局限。

- [JavaScript Engines Zoo](https://ivankra.github.io/javascript-zoo/)：汇总 100 多个 JS 引擎的数据、性能与发展史，附带 Dockerfiles 可直接实验。（好名字）

![](https://r2.cosine.ren/i/2025/11/dbb190c5ed37a627dbc9e8da12fe3670.webp)

- [Visual Types](https://types.kitlangton.com/)：一份以直观方式解释 TypeScript 类型系统核心概念的交互式视觉笔记，将抽象的类型关系转为集合论直观类比。作者通过对基础类型、联合类型、交叉类型、泛型(Type Alias/Generic)、条件类型(Conditional Types)等模块的分解说明，让开发者从“类型是值的集合”这一基本理念出发，逐步理解 TypeScript 在编译期的推导与约束机制。

![](https://r2.cosine.ren/i/2025/11/8437c312ca3bfd09016a618d35fb323e.webp)

- [Effectively Monitoring Web Performance](https://www.smashingmagazine.com/2025/11/effectively-monitoring-web-performance/)：如何系统化地监测网站性能，打造持续高效的前端体验。

## CSS 新特性

- [The Range Syntax Has Come to Container Style Queries and if()](https://css-tricks.com/the-range-syntax-has-come-to-container-style-queries-and-if/)：CSS 条件逻辑又升级啦，现在范围语法（range syntax）也能用在容器样式查询和 `if()` 函数里了。

也就是说，可以做到以下行为：

```css
/* Range query for rain percent (new) */
@container style(--rain-percent > 45%) {
  .weather-card {
    background: linear-gradient(140deg, skyblue, lightblue);
  }
}
```

- [Responsive List of Stacked/Overlapping Images](https://css-tip.com/responsive-stacked-img/)：用现代 CSS （如 `container-type` 与 `cqw` 单位）写出自适应重叠头像列表。图片间的间距可根据容器宽度与元素数量自动调整，无需固定值或“魔法数字”，布局既灵活，又保持了视觉平衡。

![](https://r2.cosine.ren/i/2025/11/ca29da482557619505200d6b78dcc017.webp)

## 趣站与 Codepen 精选

### Messenger

“Messenger” 是一个以小行星递送员为主题的互动网页，于 2025 年 11 月 10 日获得 Awwwards 的 Site of the Day (SOTD)。作品通过精巧的角色系统与动态 NPC 设置，打造沉浸式探索体验。色彩仅用两种主色，极简又具叙事性；技术实现上兼顾动画流畅度、响应式设计和可访问性。整体评分 7.92/10，在美术、交互与动画实现方面表现突出，是网页叙事和视觉创作的优秀范例。

> 这是一个小星球，但总得有人送货。

https://messenger.abeto.co/

![](https://r2.cosine.ren/i/2025/11/db8f2a0babea60b03f1446709ee561c0.webp)

### Red Alp [448]

[Code golfing a tiny demo using maths and a pinch of insanity](https://blog.pkh.me/p/45-code-golfing-a-tiny-demo-using-maths-and-a-pinch-of-insanity)：作者用极端的代码压缩和数学技巧，把一段 GLSL 着色器压缩到仅 448 字符，创造出奇妙的 3D 山景与云雾效果。

![](https://r2.cosine.ren/i/2025/11/a0f3be3bdc91f26f480edb9b1f7f0de2.gif)

可在此处查看 [demo](https://b.pkh.me/2025-09-08-red-alp.htm)

### Hopping Marbles 跳跃的弹珠

[Hopping Marbles](https://codepen.io/jkantner/pen/LEGvzLO)：循环的纯 CSS + SVG 的跳跃弹珠动画，很有创意！

> “一段以弹珠为主角的伪 3D 循环动画，设计成类似预加载器的效果。此外，孔洞底部还使用了特殊的 SVG clip paths 以及一些秘密交替的路径。”——Jon Kantner

![](https://r2.cosine.ren/i/2025/11/33425e261335170807ebd4c99ac25dbb.gif)

## Refs

- [Codepen Spark #481](https://codepen.io/spark/481)
- [Node Weekly Issue 600: November 11, 2025](https://nodeweekly.com/issues/600)
- [JavaScript Weekly Issue 761: November 14, 2025](https://javascriptweekly.com/issues/761)

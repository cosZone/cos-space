---
title: FE Bits Vol.3｜CSS attr() 类型化进化，PostCSS 复盘 12 年
description: 本周前端周刊介绍了 GitHub CEO 辞职、微软关闭 Lens、RSLint 发布等动态，聚焦 CSS attr()、anchor positioning、PostCSS 经验复盘、AI 工具实践、开源项目的演进与社区思考。工具推荐包括 CSS-Questions、self.so、Online CSS Analyzer、Omnara AI 监工等，有实用 CSS 新特性与开发资源。
link: weekly-3
catalog: true
lang: cn
date: 2025-08-17 12:00:00
tags:
  - 前端
  - CSS
  - AI
categories:
  - 周刊
---

> 本周刊更新时间期望是在每周天，网站在建设中……
> 目前推荐使用 [Folo](https://folo.is/) 订阅本周刊的 [Quality RSS](https://quaily.com/cosine/feed/atom)。
> 公众号 前端周周谈 FE Bits，点击阅读原文链接可查看原文。
> 建了个 QQ 讨论小群 598022684 欢迎加入，日常讨论前端技术 & 生活，也可在群里投稿自己的文章，随意加入，比较偏向粉丝群的性质～
> 本周刊同时也开源在 [fe-bits-weekly](https://github.com/yusixian/fe-bits-weekly)，欢迎关注。

今天是 2025 年 8 月 17 日，星期日。

这周二我迎来了我的 24 岁生日，回想往昔颇为感慨，没想到这就已经 24 岁了，一转眼妹妹都高考完上大一了，时间过的真的是很快的。

这周内容较少，不过也够了，就没合并成双周刊。

## 生态与社区动态

本周没有什么大动态，那就放一些我关心的比较有趣的文章或事儿吧～

- Rstack 家族新成员 [RSLint](https://github.com/web-infra-dev/rslint) 发布，实验阶段，由 typescript-go 提供支持。
- GitHub CEO Thomas Dohmke 宣布辞职创业，将任至 2025 年底，GitHub 并入微软不再独立运营。[Auf Wiedersehen, GitHub ♥️](https://github.blog/news-insights/company-news/goodbye-github/)
- [微软关闭 12 年历史的 Microsoft Lens](https://www.appinn.com/microsoft-lens-shutdown/) 微软宣布将于 2025 年 9 月 15 日起逐步关闭其拥有 12 年历史的文档扫描应用 Microsoft Lens，并计划由其 AI 助手 Copilot 取代。
- [Rsdoctor 1.2 发布：打包产物体积一目了然](https://mp.weixin.qq.com/s/L36fFeFsNikTnaoA_HuW2w)：Rsdoctor 1.2 新增聚合模块体积分析、Gzip 压缩展示、Rsdoctor MCP 和 Treemap 可视化增强。
- [Google 发布了 Gemma-3-270M 超小型多模态模型](https://huggingface.co/google/gemma-3-270m)，适合端侧与低资源场景。
- [Chrome 140 Beta 版 | Blog | Chrome for Developers](https://developer.chrome.com/blog/chrome-140-beta?hl=zh-cn)：Chrome 140 Beta 引入 CSS 类型化算术、HTTP Cookie 前缀等新特性，并优化视图过渡与本地网络访问限制。

## 文章与视频

- 📓 [我们从创建 PostCSS 中学到了什么](https://evilmartians.com/chronicles/what-we-learned-from-creating-postcss)：Andrey Sitnik 分享了过去 12 年来创建和维护 PostCSS 开源项目的经验教训。

- 📓 [开源项目的「死与新生」 - 云游君](https://www.yunyoujun.cn/posts/death-and-rebirth-of-open-source-projects) 从开发者视角探讨如何通过社区运营、决策优化与长期主义延长开源项目生命周期，并坦然面对项目迭代与更替。

- 📓 [超短篇：苹果系统迁移史 - 哔哩哔哩](https://www.bilibili.com/opus/1100638498347548688)：台长的超长文，推荐阅读，很有意思！

- 📓 [CSS @container scroll-state 容器滚动查询](https://www.zhangxinxu.com/wordpress/2025/08/css-container-scroll-state/)：讲解 CSS 中 `@container scroll-state` 滚动容器查询的新玩法，介绍如何基于容器滚动状态进行样式响应与交互。

- 📓 [How to style a broken image](https://css-tip.com/broken-image/)：CSS 小贴士，如何优雅处理图片加载失败的样式与占位。

- 📓 [普通人也能用得上的 Context Engineering 技巧](https://baoyu.io/blog/context-engineering-skills-for-normal-users)：这篇文章面向普通用户，提炼了实用的“上下文工程”技巧：通过精简会话与任务、主动提供关键信息，以及借助 Agent 选择合适模型、提供工具并先做计划来获取更准确的上下文，从而显著提升使用 AI 的效果与效率。

- 📓 [我如何录制、编辑并发布 YouTube 视频](https://www.stefanjudis.com/blog/how-i-record-edit-and-publish-youtube-videos/)：Stefan Judis 详细分享了他制作 YouTube 技术视频的完整流程，涵盖从选题、代码准备、录制（Screenflow、Keynote）、编辑（Descript）到硬件设备和实用技巧等方方面面。

- 播客 [捕蛇者说 Ep 56. 对话 Hawstein：从独立开发，到追寻人生的意义](https://pythonhunter.org/episodes/ep56)：对《一个独立创造者的五年》作者 Hawstein 的长谈，涉及自由代价与存在主义议题。从独立开发切入，谈人生规划与意义追寻。

> 本期节目，我们请到了《一个独立创造者的五年》的作者 Hawstein。从独立开发切入，我们聊了很多关于自身和时代的思考。做了六年捕蛇者说，本期是我个人（laike9m）最喜欢的一期，也希望大家喜欢。
> 本期关键词：
> 独立开发 / 人生规划 / 现代性与分工 / 副业模式 / 开源 / 自由的代价 / 存在主义危机 / 技术乐观 / 死亡思考

我很喜欢这期播客，很有意思。

### CSS 新特性

- 📓 [A gentle introduction to anchor positioning](https://webkit.org/blog/17240/a-gentle-introduction-to-anchor-positioning/)：CSS 锚点定位功能让元素能基于另一元素位置自动布局，简化响应式菜单和提示框的实现。

有关 `CSS attr()` 的几篇优秀文章：

- 📓 [如何在 CSS 中使用 attr() 属性设置列、颜色和字体大小](https://frontendmasters.com/blog/how-to-use-attr-in-css-for-columns-colors-and-font-size/)：进阶示例讲解 attr() 在列布局、颜色与字号的玩法，并提供了相关资料推荐

- 📓 [CSS attr() 现已支持类型](https://www.amitmerchant.com/attr-function-types-css/)：Amit Merchant 通过这个很棒的教程向我们提供了如何在 `attr()` 中使用类型的概要，演示了它设置宽度和背景值是多么方便。

- 📓 [una.im | attr() 的新功能](https://una.im/advanced-attr/)：CSS 的`attr()`函数新增了类型转换功能，可直接将 HTML 属性值作为颜色、数字等类型用于样式，无需 JavaScript 介入。

- 📓 [CSS attr() 已升级 | Chrome for Developers](https://developer.chrome.com/blog/advanced-attr?hl=zh-cn)：Chrome 团队官方详解 attr() 升级的背景与实践，围绕类型支持、可用性与示例代码的系统介绍。

本期的 [CodePen Spark#464](https://codepen.io/spark/464) 就是围绕 CSS `attr()` 为主题的

## 工具与库更新

- [CSS-Questions | CSS-Tricks](https://css-tricks.com/css-questions/)：Sunkanmi Fafowora 推出 CSS-Questions 网站，提供 100 多道题与综合 20 题速测，帮助你检验 CSS 知识的掌握情况。

- [self.so](https://www.self.so/)：把你的简历一键变成可发布的个人网站。上传简历 PDF，经 Llama Guard 审核与 Qwen 2.5 解析后生成站点，基于 Next.js、Clerk、S3、Upstash，开源，可 Vercel 部署。

- [RSS Anything](https://rss.diffbot.com/)：使用 [Diffbot 的 Extract API](https://www.diffbot.com/products/extract/) 将网站上的链接列表转换为 RSS 提要。

- [Tiny Helpers](https://tiny-helpers.dev/)：开发者与设计师的在线小工具大全。涵盖颜色、CSS、图像、图标、性能、可访问性、API 等数百款工具，并可按名称或时间浏览。![Tiny Helpers ScreenShot](https://r2.cosine.ren/i/2025/08/3d06e7c10c50176abbcb9ad06837b453.webp)

- [Online CSS Analyzer - Project Wallace](https://www.projectwallace.com/analyze-css)：Project Wallace 维护了一组 CSS 工具，可输入 url 分析当前的 CSS 代码库。强烈推荐！
  ![CSS Analyzer ScreenShot](https://r2.cosine.ren/i/2025/08/00804aa32209f3896c75c58091d12c1c.webp)

- [Liquid Glass | Cubiq](https://codepen.io/thecubiq/pen/ZYbQmZN)：又一个可交互的“液态玻璃”滤镜与拖拽特效演示。通过背景滤镜和拖拽手柄欣赏流体质感的 UI 交互。
  ![](https://r2.cosine.ren/i/2025/08/96971ca73ca24b340060f05b04e5292b.webp)

- [Repetition Image Animation](https://codepen.io/blacklead-studio/pen/QwjGRmo)：在这个由 GSAP 驱动的 demo 中，一张走廊的照片伸缩成一系列迷幻的镜厅效果。切换不同的变体，并查看单击和拖动时会发生什么。
  ![](https://r2.cosine.ren/i/2025/08/32e5aa2f0bfb1814864acd5696e070e5.webp)

- [Omnara AI 监工](https://github.com/omnara-ai/omnara)：一个开源的 AI 代理“任务控制台”，可在手机/网页上实时监控与交互（通知、问答、远程启动），支持 Claude/Cursor/Copilot 等，并提供 SDK、MCP/REST 接口与 iOS/Web 客户端。

- [Defuddle](https://github.com/kepano/defuddle)：一个从网页中提取并清理主要内容的工具，旨在提供易于阅读且结构化的内容，便于进一步处理或转换为 Markdown。

- [KittenTTS](https://github.com/KittenML/KittenTTS)：KittenTTS 是一款超轻量级（25MB、无需 GPU）的英文文本转语音模型，可在任何设备上运行并提供惊艳效果，仅支持英文。

## 深入分析

### 我们从创建 PostCSS 中学到了什么

[What we learned from creating PostCSS](https://evilmartians.com/chronicles/what-we-learned-from-creating-postcss)

这篇文章感觉很有意思，所以浅记录一下。

> AI 摘要：这是一篇 PostCSS 12 年演进的复盘：从 Autoprefixer 的诞生到 PostCSS 成为被 Google、Wikipedia、Tailwind 等采用、月下载量 4 亿的开源基础设施。作者围绕产品定位、插件策略、性能架构、版本演进、社区与生态、与竞品相处以及维护者防止倦怠的实践，给出一套贯穿前端工具链建设与开源运营的可复用方法论：以用户可用为先、以架构赢性能、以默认值减少配置、以人情味促协作、以渐进式变更稳生态。

作者从中学到了以下几课：

**第 -1 课：与您的大客户更加合作。** 至少让他们有机会向您发送带有原型的拉取请求。
**第 0 课：不要忘记预留大量时间来编写文档和推广您的开源项目。** 此外，请毫不犹豫地直接联系潜在客户，建议他们使用您的图库。

> 投入与写代码相当的时间做 README 与对外沟通，主动向 Webpack 推荐用 PostCSS 做解析器，带来关键增长。

**第 1 课：插件和内置功能之间的平衡。** 如果您有插件，请为大多数用户提供开箱即用的完整解决方案。只有有独特需求的人才应该禁用/启用插件。

> 默认情况下，PostCSS 不执行任何作用。要让它完成任何工作，您需要添加一个特定的插件
> 这种方法有两个问题：人们不喜欢做出选择，而且大多数项目无论如何都需要相同的功能。
> 因此，PostCSS 用户总是抱怨在不知道他们需要什么的情况下与这个庞大的插件列表作斗争。
> 将此与令人惊叹的 Lightning CSS 进行比较，后者已经内置了基本功能（如 polyfills、捆绑和缩小），并且仅在特定用例中需要插件。
> 这让我想起了 Ruby on Rails 中的良好实践：约定高于配置。为用户建议一些默认值;不要要求他们定义一切。

**第 2 课：不要害怕为时已晚。** Chrome 停增前缀与 CSS Houdini 的宣布，都未让 Autoprefixer 与 PostCSS 失去价值；实际落地速度与有效性才是市场检验。尽快做原型、看真实结果，不被“新技术将取代一切”的叙事带偏。

**第 3 课：对于性能，架构比编程语言更重要。**

> 用 JS 编写的 PostCSS 比用 C++ 编写的 Sass 快 4 倍。不是因为 JS 是一种更好的编程语言，而是因为更好的架构和内存管理。
> JS 社区被炒作毒害，大公司经常使用它。因此，我们都在思考原始的非黑即白的概念，例如 “C++ 比 JS 快” 或 “Rust 的一切都更快” 。
> 用 Rust 编写的 Lightning CSS 比 PostCSS 更快（总的来说，它是一个出色的工具）。也就是说，我认为这是因为 Devon Govett 能够进一步改进架构和内存控制，而不仅仅是通过将相同的算法从 JS 重写到 Rust。
> 我特别想强调内存管理在性能中的重要性。例如，同样用 JS 编写的 CSSTree 当时比 PostCSS 快约 1.5 倍，主要是通过巧妙地重用对象来最大限度地减少对垃圾收集器的调用。

**第 4 课：通过确保问题不会再次出现来避免倦怠**
防止问题的最佳方法是：

- 添加类型以防止错误地使用 API。
- 添加额外的 JS 代码以检查 API 使用情况。
- 添加文档应该始终是最后一步，因为许多用户不阅读文档。但通常它是唯一的选择

**第 5 课：在第一个主要版本中弃用，在下一个主要版本中删除**

对 API 进行重大更改的最佳方法是滴答法(tick-tack)：

- 在第一个主要版本上，将 API 标记为已弃用。
- 然后，仅在下一个主要版本中删除此 API。

**第 6 课：提供塑造生态系统的最佳实践**

使用指南、示例和模版等来推广良好做法并阻止不良做法。不要以为人们会自己发现所有最佳实践！

> 不要忘记，文档中的示例不仅仅是插图，而是在社区中形成习惯的东西。明智地使用它们！

**第 7 课：与竞争对手成为朋友**

> 在开源中，我们都是免费工作的，任何新的 “竞争对手” 都可以让你免于花自己的时间免费支持人们。

**第 8 课：人情味对社区很重要**

- 人的纽带：给插件作者寄明信片/贴纸、出差拜访活跃贡献者，建立真实连接。
- 品牌风格：Autoprefixer 的“骑士”与 PostCSS 的“炼金术”主题，让项目更有趣、更易形成文化认同。

最后，是给开源维护者的一些“有争议”的小贴士。

- 尽量无构建：库用原生 JS 源码配合手写 .d.ts 或 TypeDoc，方便直接安装分支测试与 node_modules 内即时调试复制。
- 静态站点别用 React：项目文档与官网用 Astro 或纯静态 HTML，维护成本更低、更稳。

完 ovo

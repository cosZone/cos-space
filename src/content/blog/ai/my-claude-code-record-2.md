---
title: 我的 Claude Code 使用小记 2
link: my-claude-code-record-2
catalog: true
date: 2025-12-07 02:55:03
tags:
  - AI
  - ClaudeCode
categories:
  - [笔记, AI]
---

本文地址

https://blog.cosine.ren/post/my-claude-code-record-2

距离我 8 月份写下《[我的 Claude Code 使用小记](https://blog.cosine.ren/post/my-claude-code-record)》已经过去了近 4 个月，在这段时间的高强度使用后，是时候分享一些新的体验了。

很短，并且比较支离破碎流水账，主要是为了记录。

## 使用数据一览

统计工具使用 [opcode](https://github.com/winfunc/opcode)

![20251205-近 30 天用量显示 01](https://r2.cosine.ren/i/2025/12/57e168afdc5a8a2f589c12b5943d91f7.webp)
![](https://r2.cosine.ren/i/2025/12/606ae9b7d31727199a70d2ac2c45d9d5.webp)

数据可以看出，**近 30 天我消耗了 743$ 的 Token**，使用量集中在单个项目上。背后的原因是：公司报销了几个月的 100$ 的 Claude Code Max，让我们几位前端和后端工程师一起尝试**从零到一构建一个"相对复杂"的 Swift 原生音视频 APP**。现在 APP 已经接近上架阶段。

## 使用体验

起初我非常担心账号会被封禁，因为社交媒体上各种封号消息层出不穷。但这 4 个月下来，我的账号一直安然无恙。退一步说，即使真的被封，Anthropic 也会退款，重新注册一个账号即可继续使用。

而要我说我的使用体验的话，那就是：

> **每月 100 美元的 Claude Code Max 带来的辅助价值，远超这个价格本身。**
> 即使公司后续不再报销，我也会自费继续订阅。

最近 30 天我烧掉的 743$ 的 Token，都是有计划、有目的的使用。给出的结果都很令人满意。

在使用 Claude Code CLI 的同时，我也一直订阅着 Cursor（公司以前报销的年费）和订阅了 3 个月的 Codex。中间有一段时间，体感 Claude Code 确实经历了“降智期”，并且在他们修复了 bug 之后，体验就好起来了，但自从 **Claude Opus 4.5** 发布后，它就很少让我失望了（当然，对于那些明知它做不来的任务，我也不会强求）。

Codex 我体验的时间则不太多，体感上的话 Codex CLI 的体验还是挺好的，就是太慢了，并且 20$ 特别容易限额，虽说慢工出细活，可是大部分工作还是用 CC 做。

Claude 以前也是，但出了 sonnet 和 opus 4.5 之后做到了有速度的同时，大部分情况不用改，小部分情况下，我只需要小改一下就可以用，那就更没有想用 codex 的理由了。

相比之下，Cursor 最大的作用还是他的 Tab 补全，他的 Agent 我已经很少用了。

## 我的工作流

### Skills

Skills 是 Claude 可动态加载的指令、脚本和资源集合，用于提升特定任务表现。它帮助 Claude 重复执行标准化任务，如文档制作、数据分析或任务自动化。

官方文章：「[什么是技能](https://support.claude.com/en/articles/12512176-what-are-skills)」、「[如何在 Claude 中使用](https://support.claude.com/en/articles/12512180-using-skills-in-claude)」及「[如何创建自定义技能](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)」
更全面的一篇：[Agent Skills - Claude Code Docs](https://code.claude.com/docs/en/skills#create-a-skill)

可以通过在 Claude Code 中运行以下命令，将 GitHub 存储库注册为 Claude Code 插件市场：

```plain
# 把 https://github.com/anthropics/skills 注册为插件市场
/plugin marketplace add anthropics/skills
# 安装 document-skills
/plugin install document-skills@anthropic-agent-skills
```

安装插件后，您只需提及该技能即可使用。例如，如果安装了 `document-skills` 插件，可以让 Claude Code 执行类似这样的操作：“使用 PDF 技能从 `path/to/some-file.pdf` 中提取表单字段”。

#### 创建自定义技能

只需包含一个 `SKILL.md` 文件，含 YAML 格式的前置信息与任务指令。前置信息需包含两个字段：`name`（唯一标识符）和 `description`（功能与使用说明）。官方有模板示例 `template-skill`，帮助快速生成自定义技能结构。

也可以使用这个进行新 skill 的创建：[claude-code/plugins/plugin-dev](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev)

```plain
/plugin marketplace add anthropics/claude-code
/plugin install plugin-dev@claude-code-plugins
```

触发词 "create a skill", "add a skill to plugin", "write a new skill", "improve skill description", "organize skill content"

这个 plugin-dev 技能可以用来创建 ClaudeCode 的各种东西，不限于配置 Hook、MCP、插件结构、配置、命令、智能体 (Agent) 到技能 (Skill)

#### 用来做什么？

官方提供的几个 Skills 示例在这里，可以按需选择。

- [algorithmic-art](https://github.com/anthropics/skills/blob/main/skills/algorithmic-art/SKILL.md)：利用 p5.js 制作算法艺术 (generative art)
- [brand-guidelines](https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md)：将 Anthropic 的官方品牌颜色和字体应用于任何需要 Anthropic 风格和感觉的物品。当需要使用品牌颜色或风格指南、视觉格式或公司设计标准时，请使用此功能。
- [canvas-design](https://github.com/anthropics/skills/blob/main/skills/canvas-design/SKILL.md)：运用设计理念，创作精美的 .png 和 .pdf 格式视觉作品。当用户要求创作海报、艺术作品、设计或其他静态作品时，应该运用这项技能。
- [doc-coauthoring](https://github.com/anthropics/skills/blob/main/skills/doc-coauthoring/SKILL.md)：引导用户完成结构化的文档协作工作流程。适用于用户需要编写文档、提案、技术规范、决策文档或类似结构化内容的情况。目标是编写一份真正对读者有用的文档。
- ……

我用到的 Skill 主要是他的[前端设计技能](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)，现在可以用 [Claude Code 的 Skill 弥补他的前端设计技能](https://www.claude.com/blog/improving-frontend-design-through-skills)，在 Claude Code 里用这两条命令：

```bash
/plugin marketplace add anthropics/claude-code
# 安装 frontend-design 技能
/plugin install frontend-design@claude-code-plugins
```

https://x.com/trq212/status/1993786550656897491

其他 Claude Code 官方使用的 Skills 可以在 [claude-code/plugins](https://github.com/anthropics/claude-code/tree/main/plugins) 中找到。

![](https://r2.cosine.ren/i/2025/12/e380c6a9748d6419c9120de67caefbed.webp)

更细致的，就先不深入讲了。

### 学习项目

1. 使用 Claude Code 的 Plan Mode，以博客项目为例子，看一下 Plan Mode 的流程

```bash
> 我需要对这个项目进行学习，学习其整体结构与核心实现，输出一系列 md 文档在 docs 文件夹下供我参考。
```

Plan Mode 会询问你一些问题，提交后再继续进行规划：

![](https://r2.cosine.ren/i/2025/11/96308fe8e286ce8d3e94aa70c54d4ab5.webp)

确认后，他会接着进行追问补充：

![](https://r2.cosine.ren/i/2025/11/8f5059d926bb26fc61a64c3eb4c57f83.webp)

最后会问你是自动接受更改还是手动允许 edit，有 git 进行管理那当然是自动接受。

![](https://r2.cosine.ren/i/2025/11/909bc9169f74627bc07720c0bcfb12b4.webp)

Claude Code 特别喜欢画这种 ASCII 图，你也可以在 `CLAUDE.md` 中特别要求他不画这些。

![](https://r2.cosine.ren/i/2025/11/f58eda5e26c2a82a2a3bcedd37d75bd8.webp)

最终生成的示例文档，可以在这里进行查看。注意只是用来做个示例，项目本身是不断变化的，这个文档只是适合初上手来进行学习。

![](https://r2.cosine.ren/i/2025/11/7308bffabf29bd7c50d32eb2e885b8fa.webp)

生成的文档质量嘛，虽然有些地方还是会有错漏，并且经常使用各种 ASCII 图，作为新项目了解学习来说我觉得是够的。（当然，不要傻傻呼呼的认为全都是对的，实际看到哪里还需要以代码为准）

### 新功能从 0 到 1

1. 使用 Claude Code 的 Plan Mode，让模型只输出“变更计划（哪些文件、改动点、预期 diff）”，先不写代码。
2. ClaudeCode 的 Plan Mode 会生成计划，并询问一些你可能没讲清楚的地方
3. 补充并 Review 计划完毕后让他按计划生成代码，落到本地跑编译与最小样例。
4. 再次要求模型自检：列出潜在失败场景、边界条件和建议测试用例。
5. 做小改动和对接打磨，然后 Commit

````bash
# 使用 Claude Sonnet 4.5
> @docs/overview/10-markdown-system.md 开始进行优化，我有以下需求：[Image #1]
  1. 行内代码 `` 语法 的优化
  2. 代码块 ``` 的优化，希望加上复制按钮，模仿 mac 窗口样式，左侧三个圆点+代码语言显示，右侧是全屏预览、复制按钮
  3. 标题的样式优化，标题后的 # 与标题居中对齐，标题前加一个弱化的小 H3 H4 标签标明是几级标题
  4. 列表样式优化（无序和有序）
````

![](https://r2.cosine.ren/i/2025/11/a2e70368414daf8731b2255dfbe9d9dc.webp)
![](https://r2.cosine.ren/i/2025/11/1e11583842e24dad27f3c02480757989.webp)

### Bugfix

这些我就懒得放示例了，也是基本上一句话就可以，有的需要更多的人力介入。

1. 喂给他报错日志/最小复现工程。
2. 让模型列出“定位假说清单、验证步骤、最小改动方案”。
3. 实现、自检

### 重构/迁移

1. 同样 Plan Mode 描述重构需求，让其生成文档计划等
2. 让模型先写 codemod，只在小部分上试跑。
3. 观察 diff，定义切分点和随时可回滚的边界。
4. 分批推进，并进行回归测试。

### 模型与工具的选型与切换

好用的模型有很多，成本和使用场景也需要考虑，以下是我选模型的基准：

- 重要的架构设计/大重构：用强模型（质量优先）。
- 批量生成测试/样例：用便宜模型（成本优先）。
- 读 log / 写小脚本/摘要：用更快模型（速度优先）。
- 小模型可以用 Plan Mode 先生产 “变更计划 + 验收用例” 的 PRD，spec 驱动开发，而大模型负责实现。

### Happy

最近在尝试 [happy](https://github.com/slopus/happy)，相当好用，可以手机或平板随时随地访问家里或者服务器上的 Claude Code 写代码。

是因为看到了这条 Tweet 才决定使用一下体验的：

https://x.com/twsxtd/status/1995826728972026168

https://happy.engineering/docs/use-cases/hemingway-technique/

> 欧内斯特·海明威在写作时使用了一个聪明的技巧。他会说到一半就停下来，或者在他知道接下来要说什么的时候停下来。这样第二天再开始写就容易多了。他不需要考虑从哪里开始。这个想法很简单：通过准备好清晰的下一步来保持你的动力。
>
> 作为一名开发者，我听说过把未完成的工作留到第二天早上再继续。但这种提高效率的技巧对我来说从来没用。安排一项有意义的任务需要 10 到 20 分钟，这对于即兴发挥来说太长了。尤其是在我已经加班到很晚的时候，我最不想做的就是再花 20 分钟为明天的工作做准备。
>
> 现在有了 Claude Code 和 MCP 工具（适用于 JIRA 或 Linear），一切都改变了。我可以躺在床上运行自定义的睡前任务，而不是刷 Reddit 或 Instagram。我已经设置了 `~/.claude/agents/bedtime.md` 文件，用来查找简单的任务。这些任务我今晚可以开始，明天就能完成。
>
> 我描述一下我想要的功能或者我正在思考的问题。然后我和克劳德一起花大约 5 分钟时间进行规划。我们制定了一个我满意的实施方案。方案经我批准后，克劳德就开始着手实施。我把手机插上充电器，然后睡觉。
>
> 我醒来时，Happy 发来一条通知：“4 个文件待审核，新增 237 行代码”。这件小事让我一天有个美好的开始。

![](https://r2.cosine.ren/i/2025/12/430d35d96d4b49061d0ffbbf119a96b3.webp)

注重隐私的话，可以 [自部署 happy server 远程操控 claude code 以及 codex](https://zhuanlan.zhihu.com/p/1951677637014561414)，官方也都提供[教程](https://happy.engineering/docs/guides/self-hosting/)，可以说是很贴心了。

## FAQ

Q：我该如何知道哪个模型编程性能最好？
A：[WebDev Leaderboard | LMArena](https://lmarena.ai/leaderboard/webdev) 可以作为一部分参考，但是更多的还是要靠自己对性能、成本的考虑。

![2025-11-29 数据](https://r2.cosine.ren/i/2025/11/0b9a3167e74e1426e37b6deffb430f14.webp)

Q：什么时候不要用 AI？  
A：技术债务极重、逻辑到处乱飞的大型老项目，想要用 AI 一定不能直接“给我实现 XXX”，可以用它先梳理一遍老项目的坑，并自己加以补充，再进行实现。强烈推荐看下面的文章。

## 文章推荐

关于 Claude Code 以及 AI 辅助编程，以下这些文章推荐阅读。

https://x.com/y0usali/status/1993276386963079478

1. [从「写代码」到「验代码」：AI 搭档写走 3 年，我踩出来的协作路线图](https://yousali.com/posts/20251124-how-to-coding-with-ai/)：在推上看到一篇好文章，写给已经在或准备在真实生产项目里用 AI Coding 的后端 / 全栈工程师和技术管理者。它不会教你「按钮在哪里」「哪个 prompt 最神」，而是想在大约 15 分钟里，帮你搞清楚三件事：哪些任务交给 AI 最「划算」；怎么让项目本身变得更「AI 友好」，提高一次命中率；当生成不再是瓶颈时，工程师应该如何设计验证流程，把时间花在真正值钱的地方。

2. [Migrating 6000 React tests using AI Agents and ASTs](https://eliocapella.com/blog/ai-library-migration-guide/)：好文章，关于使用 AI 进行重构迁移的教科书式文章。
3. [我使用 Claude Code 开发 Rolldown 的体验](https://hyf.me/blog/claude-code-in-rolldown)：在 Rolldown 开发中高强度使用 Claude Code 进行真实开发的思考与经验分享。
   > 几个月前，我自认为对 AI 认知是比较贴切，能写点脚本、做下网页开发，但处理不了 Rolldown 这种复杂度的项目。
   > 而现在，过去两周里，它几乎替我写了所有的代码。整个流程没有魔法，只有跟着官方文档《[Claude Code: Best practices for agentic coding](https://www.anthropic.com/engineering/claude-code-best-practices)》的笨拙使用，仅仅是这样，就已经颠覆了我的认知。
4. [周报 #102 - 我是如何使用 AI 的](https://www.pseudoyu.com/posts/weekly_review_102)：作者分享了自己在开发、文档和日程管理中如何高频使用 AI 工具的实战经验，
5. [谈谈 AI 编程工具的进化与 Vibe Coding](https://guangzhengli.com/blog/zh/vibe-coding-and-context-coding)：“氛围编程（Vibe Coding）” 的实际含义是让 AI 全流程写代码，开发者几乎不干预。当前被泛化为所有 AI 辅助编程形式，但作者主张应将它与与 Context Coding 区分
6. [How to Fix Any Bug](https://overreacted.io/how-to-fix-any-bug/)：少有的讲述「在 vibe coding 中如何调试问题」的文章～当然也适合正常的 bugfix。
7. [How to write a great agents.md: Lessons from over 2,500 repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)：GitHub 分析了超过 2500 个公开仓库中的 agents.md 文件，归纳出优秀 `agents.md` 的写法（这个很有用）
8. [OpenSpec 使用心得](https://4ark.me/posts/2025-11-04-openspec/#3-%E5%88%9B%E5%BB%BA%E6%8F%90%E6%A1%88)：安利了 [OpenSpec](https://github.com/Fission-AI/OpenSpec) 驱动开发
9. [Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)：一篇教你如何写出既清晰又高效的 CLAUDE.md 的文章。

我觉得这篇[谈谈 AI 编程工具的进化与 Vibe Coding](https://guangzhengli.com/blog/zh/vibe-coding-and-context-coding)里的一段话说得很好：

> 从这个阶段开始，水平一般的程序员的数量会开始减少直到消亡，这个过程与其说是 AI 抢走了工作饭碗，不如说是被优秀的程序员抢走了工作饭碗，并且这两者的收入在这个阶段的差距也会不断加大。

> 时代的大潮浩浩荡荡，我并不想把未来想的过于悲观，也不想把事情讲的过于残酷，但在工业机器的轰鸣下，没有人会真的在意那些古法手工制作者的声音。在计算机出现之前，你也难以想象售票员、电话接线员是多么庞大的一个群体。

> 当然，我并不是说编程水平一般的程序员就找不到出路了，实际上在 AI 的加持下，一个编程水平一般的程序员，如果有不错的商业嗅觉，加上一定的营销能力，创造的商业价值远比在社会分工中当个螺丝钉要大的多。

> 过去可能需要很多人相互协作才能完成的工作，利用 AI 的杠杆可以大大的缩减工作时间和人员规模，未来的独立开发和小规模的团队协作一定会变得更加主流。

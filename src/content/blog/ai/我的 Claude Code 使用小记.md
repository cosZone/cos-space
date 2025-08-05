---
title: 我的 Claude Code 使用小记
link: my-claude-code-record
catalog: true
date: 2025-08-05 20:02:05
tags:
  - AI
  - ClaudeCode
  - AI编程
categories:
  - [笔记, AI]
---

从上个月 9 号开始从 Cursor 转使用 Claude Code 也快一个月了，我算是中度使用，也轻松回本（20$ 一个月），现在 Cursor 就主要负责 tab 补全了，日常全是 Claude Code 更好用，下面是 ccusage 截图。

![](https://r2.cosine.ren/i/2025/08/11f52c337f2d54eaf4f67b46aec3e263.webp)
![](https://r2.cosine.ren/i/2025/08/3fc8b17834935b4043391eba47aae310.webp)

太太太太太爽了，用 sonnet-4 对我来说已经足矣，很聪明，下面记录一下日常使用的小技巧。本篇没什么干货，只有一些记录～

## 小知识

从 [6 Weeks of Claude Code - Puzzmo Blog](https://blog.puzzmo.com/posts/2025/07/30/six-weeks-of-claude-code/) 和 [How I use Claude Code (+ my best tips)](https://www.builder.io/blog/claude-code) 等文章里学到了几个小知识，还有一些是之前看到的。

1. 通过 hook 在 claude 的 `settings.json` 设置通知音（[Claude Code 设置 - Anthropic](https://docs.anthropic.com/zh-CN/docs/claude-code/settings)），如在完成的时候语音通知我 “任务完成”，在请求权限时通知我 “等待许可”，可参考 [钩子参考 - Anthropic](https://docs.anthropic.com/zh-CN/docs/claude-code/hooks)

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Funk.aiff && say \\\"等待许可\\"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff && say \\\"任务完成\\"
          }
        ]
      }
    ]
  }
}
```

2. 通过 permissions 设置常用的命令直接放过，不用每次都允许，也不用担心 `--dangerously-skip-permissions` 乱删东西。

```json
{
  "permissions": {
    "allow": ["Bash(grep:*)", "Bash(find:*)", "Bash(mkdir:*)", "Bash(rg:*)", "Bash(ls:*)", "Bash(awk:*)"]
  }
}
```

2. 由于它是一个终端接口，所以从 Command + V 粘贴剪贴板中的图像不起作用。请改用 Control + V（在 mac 上）

3. 创建自定义斜杠命令。ClaudeCode 可以非常轻松地添加自定义斜杠命令。要添加命令，只需创建一个  `.claude/commands`  文件夹，将命令名称添加为扩展名为  `.md`  的文件。只需用自然语言编写这些内容，然后可以使用  `$ARGUMENTS`  字符串将参数放入提示中。 具体官方教程在 [斜杠命令 - Anthropic](https://docs.anthropic.com/zh-CN/docs/claude-code/slash-commands#%E4%B8%AA%E4%BA%BA%E5%91%BD%E4%BB%A4)

```bash
# 创建个人命令
mkdir -p ~/.claude/commands
echo "审查此代码的安全漏洞：" > ~/.claude/commands/security-review.md
```

可使用 [GitHub - brennercruvinel/CCPlugins](https://github.com/brennercruvinel/CCPlugins) 添加一部份指令，他提供了一些主要命令，如:

- `/cleanproject`、`/commit`、`/format`、`/scaffold`、`/test`、`/implement`、`/refactor` 实现一键清理、初始化和重构等。
- 代码质量与安全：`/review`、`/security-scan`、`/predict-issues` 等执行代码 Review，自动检测和修复安全漏洞、导入问题、TODO 等。
- 高级分析：`/understand`、`/explain-like-senior`、`/make-it-pretty` 提供全局架构分析、高级代码解释和可读性优化。
- 会话与项目管理：`/session-start`、`/session-end`、`/docs`、`/todos-to-issues`、`/undo` 增加会话持续性，保障开发过程可追溯和可回滚。

## 使用 Claude Code 进行项目的快速学习

[常见工作流程 - Anthropic](https://docs.anthropic.com/zh-CN/docs/claude-code/common-workflows#%E7%90%86%E8%A7%A3%E6%96%B0%E4%BB%A3%E7%A0%81%E5%BA%93) 官方也有给一些常用流程的示例教程。

比如我想学习这个项目 [GitHub - webclipper/web-clipper](https://github.com/webclipper/web-clipper) 想让 AI 给我进行进行分析，学习其中抓取网页的精髓。

首先 clone 项目到本地，`/init` 生成 `CLAUDE.md` 项目文档，然后我会问他：

`我需要对这个项目进行学习，学习其整体结构与其是如何抓取 web 内容的，输出一系列 md 文档在 docs 文件夹下供我参考。`

```bash
> @CLAUDE.md @src/ @docs/ 我需要对这个项目进行学习，学习其整体结构与其是如何抓取 web 内容的，输出一系列 md 文档在 docs 文件夹下供我参考。
⎿  Read CLAUDE.md (65 lines)
  ⎿  Listed directory src/
  ⎿  Listed directory docs/
  ⎿  ⧉ Selected 46 lines from CLAUDE.md in Cursor

⏺ I'll help you learn the web-clipper project by creating comprehensive documentation. Let me first create a todo list to plan this learning
  documentation task.
...

⏺ Update Todos
  ⎿  ☒ Create docs directory structure
     ☒ Analyze and document overall project architecture
     ☒ Document web content capture mechanism
     ☒ Document service plugin system
     ☒ Document extension system
     ☒ Document IPC communication system
     ☒ Document build and deployment process

⏺ Write(docs/README.md)
  ⎿  Wrote 137 lines to docs/README.md
     # Web-Clipper 学习文档
     本文档集合详细解析了 Web-Clipper 项目的整体架构、核心机制和技术实现，旨在帮助开发者深入理解这个通用网页剪藏浏览器扩展的设计思路和实现细节。
     ## 文档目录
     ### 1. [项目架构概览](./01-architecture-overview.md)
     - 项目简介和核心架构模式
     - 主要目录结构和技术栈
     - 三个主要入口点的职责分工
     … +127 lines (ctrl+r to expand)

⏺ 我已经完成了对 Web-Clipper 项目的全面学习和文档化工作。在 docs/ 文件夹下创建了完整的学习文档系列：

  已创建的文档

  1. docs/01-architecture-overview.md - 整体架构和技术栈
  2. docs/02-content-capture-mechanism.md - 网页内容抓取的核心实现
  3. docs/03-service-plugin-system.md - 25+ 服务的插件架构
  4. docs/04-extension-system.md - 6 种扩展的生命周期管理
  5. docs/05-ipc-communication-system.md - 进程间通信架构
  6. docs/06-build-and-deployment.md - Webpack 构建配置
  7. docs/README.md - 学习指南和文档导航

  核心发现

  Web-Clipper 是一个设计精良的浏览器扩展项目，具有以下突出特点：

  - 高度模块化: 通过动态服务发现和扩展系统实现了极高的可扩展性
  - 类型安全: 完整的 TypeScript 支持确保代码质量
  - 架构先进: 使用依赖注入、通道化通信等现代架构模式
  - 多浏览器支持: 一套代码适配 Chrome 和 Firefox
  - 用户体验优秀: 智能内容提取、国际化支持、灵活配置

  这些文档将帮助你深入理解项目的设计思路和实现细节，是学习浏览器扩展开发和大型 TypeScript 项目架构的优秀参考资料。
```

这样生成出来的一系列 md 不仅准确度高，而且易于学习，相当推荐的说。

![](https://r2.cosine.ren/i/2025/08/db2179092e838b0f4c07ccb1d4417804.webp)

继续追问核心实现：

```bash
> 继续深入分析智能提取的实现，以及图片是如何进行提取的。也输出 markdown 文件
  ⎿  Found 10 new diagnostic issues in 1 file (ctrl-r to expand)
⏺ 我将深入分析智能提取和图片提取的实现机制，并创建详细的文档。
⏺ Update Todos
  ⎿  ☐ Analyze intelligent content extraction mechanism
     ☐ Analyze image extraction and processing
     ☐ Document Readability algorithm implementation
     ☐ Document screenshot capture and processing
     ☐ Document image hosting integration
     ☐ Create comprehensive analysis document
```

结果：也清晰无误的分析了大概 577 行的 md，如果想要更深入某个部份同理。

![](https://r2.cosine.ren/i/2025/08/56a6f617039bfbec640bbd75b160b3cb.webp)

也试了试上文提到的 CCPlugin 中的 `/understand`，但是这个实测没有上面这个质量好，应该是辅助开发过程中使用的。

## 推荐阅读

- [6 Weeks of Claude Code - Puzzmo Blog](https://blog.puzzmo.com/posts/2025/07/30/six-weeks-of-claude-code/)
- [How I use Claude Code (+ my best tips)](https://www.builder.io/blog/claude-code)
- 上下文这块真得好好看看这个：[AI 编码方法论：从探索到精进的系统化实践 | 静かな森](https://innei.in/posts/tech/ai-coding-methodology-systematic-practice)
- [初探 Context Engineering | 静かな森](https://innei.in/posts/programming/exploring-context-engineering)

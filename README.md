# astro-koharu

“小春日和” 风格的 Astro 博客主题。

“小春日和” （こはるびより）指的是晚秋到初冬这段时期，持续的一段似春天般温暖的晴天。也就是中文中的“小阳春”。

灵感来自 Hexo 的 Shoka 主题，但不再追求一比一复刻，而是保留它的优点，用更轻量的技术栈，做一款属于自己的个人博客主题。

- 基于 **Astro**，静态输出，加载轻快
- 萌系 / 二次元 / 粉蓝配色，适合 ACG、前端、手账向个人站
- 支持多分类、多标签，但不会强迫你用复杂信息架构
- 尽可能的减少性能开销
- 使用 pagefind 实现无后端的全站搜索。

## 部署

### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cosZone/astro-koharu&project-name=astro-koharu&repository-name=astro-koharu)

### 本地开发

1. 克隆项目到本地

```bash
git clone https://github.com/cosZone/astro-koharu
```

2. 进入项目目录并安装依赖

```bash
cd astro-koharu
pnpm i
```

3. 启动项目

```bash
pnpm dev
```

## 功能特性

### 草稿功能

支持在本地预览草稿文章，生产环境自动隐藏。

在文章的 frontmatter 中添加 `draft: true`：

```markdown
---
title: 我的草稿文章
date: 2025-12-06
categories:
  - AI
tags:
  - Claude Code
draft: true
---

这是一篇草稿文章。
```

**工作原理：**

- **开发环境** (`pnpm dev`)：显示所有文章，包括草稿，方便预览
- **生产环境** (`pnpm build`)：仅显示已发布文章，自动排除 `draft: true` 的文章

**覆盖范围：**

草稿过滤应用于整站，包括：
- 首页文章列表
- 文章分页列表
- 分类页面
- 标签页面
- 归档页面
- RSS Feed
- 网站统计（文章数、字数、阅读时间）

## 🙏 鸣谢

感谢以下项目对 astro-koharu 的开发提供的灵感及参考：

- [mx-space](https://github.com/mx-space)
- [Hexo 主题 Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- [waterwater.moe](https://github.com/lawvs/lawvs.github.io)
- [yfi.moe](https://github.com/yy4382/yfi.moe)
- [4ark.me](https://github.com/gd4Ark/gd4Ark.github.io)
- ...

## TODO

- [ ] 智能文章[相关推荐](https://alexop.dev/posts/semantic-related-posts-astro-transformersjs/)
- [ ] PathLength 实现 [文末签名动画](https://www.stefanjudis.com/today-i-learned/pathlength-makes-makes-svg-path-animations-easier-to-manage/)
- [ ] 文档
- [ ] [Page CMS](https://css-tricks.com/using-pages-cms-for-static-site-content-management/)

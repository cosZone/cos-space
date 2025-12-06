---
title: astro-koharu 使用指南
link: astro-koharu-guide
catalog: true
date: 2025-12-06 20:00:00
description: astro-koharu 博客系统完整使用指南，包含快速开始、配置说明、文章系统、界面功能等详细介绍
tags:
  - Astro
  - 博客
  - 教程
categories:
  - 工具
---

本文基本由 AI 制作，还处于 WIP 阶段。

一份完整的 astro-koharu 博客系统使用指南，帮助你快速上手并充分利用所有功能特性。

## 一、快速开始

### 项目简介

astro-koharu 是一个基于 Astro 5.x 构建的现代化博客系统，从 Hexo 迁移而来，设计灵感来自 [Shoka](https://github.com/amehime/hexo-theme-shoka) 主题。

**核心特点：**

- 基于 Astro 5.x，静态站点生成，性能优异
- 优雅的深色/浅色主题切换
- 基于 Pagefind 的无后端全站搜索
- 完整的 Markdown 增强功能（GFM、代码高亮、自动目录）
- 灵活的多级分类与标签系统
- 特色周刊/系列文章支持
- 响应式设计
- 草稿与置顶功能
- 阅读进度条与阅读时间估算
- 友链系统与归档页面
- RSS 订阅支持

### 本地开发

```bash
# 克隆项目
git clone https://github.com/cosZone/astro-koharu.git
cd astro-koharu

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

### 快速部署

使用 Vercel 进行一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cosZone/astro-koharu&project-name=astro-koharu&repository-name=astro-koharu)

## 二、基本配置

### 站点配置

编辑 `src/constants/site-config.ts` 文件配置站点基本信息：

```typescript
export const siteConfig: SiteConfig = {
  title: '余弦の博客',           // 网站标题
  alternate: 'cosine',           // 英文短名（用作 logo 文本）
  subtitle: 'WA 的一声就哭了',   // 副标题
  name: 'cos',                   // 站点作者简称
  description: 'FE / ACG / ...',  // 站点简介
  avatar: '/img/avatar.webp',    // 头像路径
  showLogo: true,                // 是否显示 logo
  author: 'cos',                 // 文章作者
  site: 'https://blog.cosine.ren/', // 站点域名
  startYear: 2020,               // 站点创建年份
  keywords: ['cos', 'cosine', '博客', '前端'], // SEO 关键词
};
```

**特色分类配置：**

在首页底部展示的精选分类卡片：

```typescript
featuredCategories: [
  {
    link: 'life',              // 分类链接（对应 category_map）
    label: '随笔',             // 显示名称
    image: '/img/cover/2.webp', // 封面图片
    description: '生活记录、年度总结等', // 描述
  },
  // ... 更多分类
]
```

**周刊/系列配置：**

配置特色系列（如周刊）：

```typescript
featuredSeries: {
  categoryName: '周刊',        // 分类名称
  label: 'FE Bits',           // 显示标签
  fullName: 'FE Bits 前端周周谈', // 完整名称
  description: '...',         // 描述
  cover: '/img/weekly_header.webp', // 封面图
  enabled: true,              // 是否启用
  links: {                    // 相关链接
    github: 'https://github.com/...',
    rss: 'https://...',
    chrome: 'https://...',
  },
}
```

### 社交媒体配置

在 `src/constants/site-config.ts` 中配置社交媒体链接：

```typescript
export const socialConfig: SocialConfig = {
  github: {
    url: 'https://github.com/yusixian',
    icon: 'ri:github-fill',      // Iconify 图标名
    color: '#191717',            // 主题色
  },
  bilibili: {
    url: 'https://space.bilibili.com/10730895',
    icon: 'ri:bilibili-fill',
    color: '#da708a',
  },
  // ... 更多平台
};
```

支持的平台：GitHub, Twitter, Bilibili, 网易云音乐, Email, RSS 等。

### 导航配置

编辑 `src/constants/router.ts` 自定义导航菜单：

```typescript
export const routers: Router[] = [
  { name: '首页', path: Routes.Home, icon: 'fa6-solid:house-chimney' },
  { name: '周刊', path: Routes.Weekly, icon: 'ri:newspaper-line' },
  {
    name: '文章',
    icon: 'ri:quill-pen-ai-fill',
    children: [  // 支持嵌套子菜单
      { name: '分类', path: Routes.Categories, icon: 'ri:grid-fill' },
      { name: '标签', path: Routes.Tags, icon: 'fa6-solid:tags' },
      { name: '归档', path: Routes.Archives, icon: 'ri:archive-2-fill' },
    ],
  },
  { name: '友链', path: Routes.Friends, icon: 'ri:links-line' },
  { name: '关于', path: Routes.About, icon: 'fa6-regular:circle-user' },
];
```

### 分类映射配置

编辑 `_config.yml` 配置中文分类名到 URL slug 的映射：

```yaml
category_map:
  随笔: life
  笔记: note
  前端: front-end
  后端: back-end
  工具: tools
  周刊: weekly
  AI: ai
```

这样，"随笔" 分类的 URL 会是 `/categories/life`，而不是 `/categories/随笔`。

## 三、文章系统

### 创建文章

在 `src/content/blog/` 目录下创建 Markdown 文件。目录结构会影响文章的分类：

```plain
src/content/blog/
├── life/              # 随笔分类
│   └── 2024-life-review.md
├── note/
│   ├── front-end/     # 笔记 > 前端
│   │   └── react/
│   │       └── React学习小记.md
│   └── algorithm/     # 笔记 > 算法
│       └── 动态规划学习笔记.md
└── tools/             # 工具分类
    └── vscode插件推荐.md
```

### Frontmatter 字段说明

每篇文章开头需要包含 YAML frontmatter：

**必填字段：**

```yaml
---
title: 文章标题 # 必填
date: 2024-12-06 # 必填，发布日期
---
```

**常用可选字段：**

```yaml
---
title: 文章标题
date: 2024-12-06
description: 文章摘要描述 # 用于 SEO 和列表展示
link: custom-url-slug # 自定义 URL（默认使用文件名）
cover: /img/cover/1.webp # 封面图片
tags: # 标签列表
  - JavaScript
  - React
categories: # 分类（见下方详细说明）
  - 笔记
subtitle: 副标题 # 文章副标题
catalog: true # 是否显示目录（默认 true）
draft: false # 是否为草稿（默认 false）
sticky: false # 是否置顶（默认 false）
---
```

### 分类系统

astro-koharu 支持灵活的分类配置：

**单层分类：**

```yaml
categories:
  - 工具 # 或者 ['工具']
```

对应 URL: `/categories/tools`（根据 `_config.yml` 映射）

**多层嵌套分类：**

```yaml
categories:
  - [笔记, 前端, React]
```

这会创建层级关系：笔记 → 前端 → React

对应 URL: `/categories/note/front-end/react`

### 标签系统

标签是扁平的，不支持层级：

```yaml
tags:
  - JavaScript
  - TypeScript
  - 学习笔记
```

所有标签会在 `/tags` 页面展示，点击标签可查看该标签下的所有文章。

### 草稿功能

设置 `draft: true` 将文章标记为草稿：

```yaml
---
title: 未完成的文章
draft: true
---
```

**行为：**

- **本地开发** (`pnpm dev`)：草稿可见，文章卡片右上角显示 "DRAFT" 标识
- **生产构建** (`pnpm build`)：草稿自动过滤，不会出现在任何列表中

### 置顶功能

设置 `sticky: true` 将文章置顶：

```yaml
---
title: 重要公告
sticky: true
---
```

**行为：**

- 置顶文章显示在首页 "置顶文章" 区域
- 置顶文章按日期排序（最新的在前）
- 不影响其他页面（分类、标签、归档）的排序

### 周刊/系列文章

如果配置了 `featuredSeries`（见基本配置），该分类下的文章会：

1. 在首页置顶区域显示最新一篇
2. 拥有专属的周刊页面 (`/weekly`)
3. 不出现在普通文章列表中

**示例：**

```yaml
---
title: FE Bits Vol.16
categories:
  - 周刊 # 对应 featuredSeries.categoryName
---
```

## 四、界面功能

### 主题切换

点击右上角的太阳/月亮图标切换深色/浅色模式。

**技术特性：**

- 使用 View Transitions API 提供平滑的主题切换动画
- 主题偏好保存在 `localStorage`
- 页面加载时立即应用保存的主题，防止闪烁 (FOUC)
- 支持跨页面导航保持主题状态

**代码高亮：**

- 浅色模式：`github-light`
- 深色模式：`github-dark`

### 全站搜索

基于 [Pagefind](https://pagefind.app/) 的静态站点搜索，无需后端服务器。

**打开搜索：**

- 点击导航栏搜索图标
- 快捷键：`Cmd/Ctrl + K`

**关闭搜索：**

- 点击对话框外部
- 点击关闭按钮
- 按 `ESC` 键

**特性：**

- 支持中文分词
- 实时搜索结果
- 高亮匹配关键词
- 显示文章摘要和元信息

### 文章阅读功能

**目录导航 (Table of Contents)：**

- 自动提取文章标题（h2-h4）生成目录
- 点击目录项跳转到对应章节
- 滚动时自动高亮当前章节
- 桌面端显示在右侧边栏，移动端折叠

**阅读进度条：**

- 页面顶部显示阅读进度
- 实时更新当前阅读位置

**标题锚点链接：**

- 每个标题自动生成 ID
- 悬停标题时显示 `#` 链接图标
- 点击可复制带锚点的 URL

**系列文章导航：**

文章底部显示同系列的上一篇/下一篇：

- 基于最深层分类自动分组
- 按发布日期排序
- 显示文章标题和封面

**阅读时间估算：**

文章卡片显示预计阅读时间（基于字数计算）。

### 响应式设计

**桌面端：**

- 双栏布局（主内容 + 侧边栏）
- 固定导航栏
- 悬浮目录

**平板：**

- 自适应布局调整
- 简化侧边栏

**移动端：**

- 单栏布局
- 抽屉式导航菜单（汉堡菜单）
- 折叠式目录
- 触摸优化的交互

## 五、特色功能

### 周刊系统

如果启用了 `featuredSeries`，会自动生成周刊相关功能：

**专属周刊页面** (`/weekly`)：

- 显示所有周刊文章
- 周刊头图和介绍
- 相关链接（GitHub, RSS 等）

**首页展示：**

- 最新周刊文章置顶显示
- 独立于普通文章列表

### 归档页面

访问 `/archives` 查看所有文章的归档视图：

- 按年份分组
- 显示每年的文章数量
- 时间线式展示
- 包含文章发布日期、标题、分类

### 友链系统

访问 `/friends` 查看友情链接页面：

**功能：**

- 友链卡片展示
- 友链申请表单（可自定义）
- 支持头像、名称、描述、链接

### Markdown 增强

**语法支持：**

- GitHub Flavored Markdown (GFM)
  - 表格
  - 任务列表
  - 删除线
  - 自动链接

**代码高亮：**

- 基于 Shiki
- 支持双主题（深色/浅色）
- 支持语言标注
- 行号显示

示例：

````markdown
```javascript
function hello() {
  console.log('Hello, world!');
}
```
````

**标题自动链接：**

所有标题自动生成可点击的锚点链接。

**链接自动嵌入：**

独行的特殊链接会自动转换为嵌入组件：

- **Twitter/X 链接**：自动嵌入 Tweet 组件
- **CodePen 链接**：自动嵌入交互式 CodePen 演示
- **其他链接**：显示 OG 预览卡片（包含标题、描述、图片等）

示例：

```markdown
<!-- 独行链接会被嵌入 -->
https://twitter.com/username/status/123456789

https://codepen.io/username/pen/PenId

https://github.com/user/repo

<!-- 段落中的链接保持不变 -->
这是一个 [普通链接](https://example.com)，不会被嵌入。
```

**其他增强：**

- 自动目录生成
- 阅读时间计算
- 外部链接自动添加 `target="_blank"`

### RSS 订阅

访问 `/rss.xml` 获取 RSS feed。

**包含内容：**

- 最新文章列表
- 文章摘要
- 发布日期
- 文章链接

### 数据统计

集成 Umami 分析（可选）。

在 `astro.config.mjs` 中配置：

```javascript
umami({
  id: 'your-website-id',
  endpointUrl: 'https://stats.example.com',
  hostUrl: 'https://stats.example.com',
});
```

## 六、开发指南

### 目录结构

```plain
astro-koharu/
├── src/
│   ├── components/      # 组件
│   │   ├── common/      # 通用组件（错误边界等）
│   │   ├── ui/          # UI 组件（按钮、卡片等）
│   │   ├── layout/      # 布局组件（头部、侧边栏等）
│   │   ├── post/        # 文章相关组件
│   │   ├── category/    # 分类组件
│   │   └── theme/       # 主题切换
│   ├── content/
│   │   └── blog/        # 博客文章（Markdown）
│   ├── layouts/         # 页面布局模板
│   ├── pages/           # 页面路由
│   ├── lib/             # 工具函数
│   ├── hooks/           # React hooks
│   ├── constants/       # 常量配置
│   ├── scripts/         # 构建脚本
│   ├── styles/          # 全局样式
│   └── types/           # TypeScript 类型定义
├── public/              # 静态资源
│   └── img/             # 图片资源
├── _config.yml          # 分类映射配置
├── astro.config.mjs     # Astro 配置
├── tailwind.config.ts   # Tailwind 配置
└── tsconfig.json        # TypeScript 配置
```

### 路径别名

项目配置了以下路径别名（在 `tsconfig.json` 中）：

```typescript
import { something } from '@/xxx';           // → src/xxx
import Component from '@components/xxx';     // → src/components/xxx
import { util } from '@lib/xxx';            // → src/lib/xxx
import config from '@constants/xxx';        // → src/constants/xxx
// ... 更多别名见 tsconfig.json
```

### 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（默认 localhost:4321）

# 构建
pnpm build            # 构建生产版本
pnpm preview          # 预览生产构建

# 代码质量
pnpm lint             # 运行 ESLint
pnpm lint-md          # 检查 Markdown 文件
pnpm lint-md:fix      # 自动修复 Markdown 问题
pnpm knip             # 查找未使用的文件和依赖

# 工具
pnpm change           # 生成 CHANGELOG.md（基于 git-cliff）
```

### 如何添加新页面

1. 在 `src/pages/` 目录创建 `.astro` 文件
2. Astro 使用文件系统路由，文件路径即 URL 路径

示例：

```plain
src/pages/about.astro       → /about
src/pages/tags/[tag].astro  → /tags/:tag（动态路由）
```

### 如何自定义样式

**全局样式：**

编辑 `src/styles/index.css`。

**组件样式：**

使用 Tailwind CSS 工具类或 Astro 的 `<style>` 标签。

**Tailwind 配置：**

编辑 `tailwind.config.ts` 自定义主题、颜色、字体等。

**主题变量：**

在 `src/styles/index.css` 中定义的 CSS 变量：

```css
:root {
  --primary-color: #ff6b6b;
  /* ... 更多变量 */
}
```

### 动画系统

使用 CSS 动画以及 [Motion](https://motion.dev/)。

**动画配置：**

在 `src/constants/anim/` 目录中：

- `spring.ts` - 弹簧动画配置
- `variants.ts` - 动画变体定义
- `props.ts` - 可复用的动画属性

**使用示例：**

```tsx
import { motion } from 'motion/react';
import { fadeIn } from '@constants/anim/variants';

<motion.div variants={fadeIn} initial="hidden" animate="visible">
  内容
</motion.div>
```

## 七、与 Hexo/Shoka 主题的对比

### 保留的特性

- ✅ 分类和标签系统
- ✅ 文章置顶功能
- ✅ 深色/浅色主题切换
- ✅ 响应式设计
- ✅ 友链页面
- ✅ 归档页面

### 改进之处

**性能：**

- ⚡ 静态站点生成 (SSG)，加载速度更快
- ⚡ 按需加载 JavaScript
- ⚡ 图片优化

**开发体验：**

- 🛠️ TypeScript 类型安全
- 🛠️ 热模块替换 (HMR)
- 🛠️ 现代化的开发工具链

**功能增强：**

- 🔍 更强大的全站搜索（Pagefind）
- 📝 内容集合 (Content Collections) 类型安全
- 🎨 Tailwind CSS 4.x 样式系统
- 🌊 View Transitions API 页面过渡

### 技术栈差异

| 方面     | Hexo + Shoka   | astro-koharu        |
| -------- | -------------- | ------------------- |
| 框架     | Hexo (Node.js) | Astro 5.x           |
| 模板引擎 | EJS/Pug        | Astro + React       |
| 样式     | Stylus         | Tailwind CSS 4.x    |
| 构建工具 | Webpack        | Vite                |
| 类型检查 | 无             | TypeScript          |
| 内容管理 | 文件系统       | Content Collections |

## 八、常见问题

### 1. 如何修改封面图片？

在文章 frontmatter 中设置 `cover` 字段：

```yaml
cover: /img/cover/1.webp
```

图片放在 `public/img/` 目录。如果不设置，会使用默认封面。

### 2. 如何自定义域名？

部署到 Vercel 后，在 Vercel 项目设置中添加自定义域名，然后更新 `src/constants/site-config.ts` 中的 `site` 字段。

### 3. 如何添加评论功能？

项目预留了评论组件位置（`src/components/comment/`），你可以集成 Giscus、Waline 等评论系统。

### 4. 草稿文章如何预览？

运行 `pnpm dev` 本地开发模式，草稿会自动显示（带 DRAFT 标识）。

### 5. 如何关闭某些功能？

- **关闭周刊**：设置 `featuredSeries.enabled = false`
- **关闭搜索**：移除 `astro.config.mjs` 中的 `pagefind()` 集成
- **关闭统计**：移除 `umami()` 集成

### 6. 如何更改文章 URL 格式？

默认使用文件名作为 URL。可以通过 `link` 字段自定义：

```yaml
link: my-custom-url
```

## 九、参考资源

- [Astro 官方文档](https://docs.astro.build/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Motion 文档](https://motion.dev/docs)
- [Pagefind 文档](https://pagefind.app/)
- [Shoka 主题文档](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)

## 十、更新日志

查看 [CHANGELOG.md](https://github.com/cosZone/astro-koharu/blob/main/CHANGELOG.md) 了解版本更新历史。

---

如有问题或建议，欢迎在 [GitHub Issues](https://github.com/cosZone/astro-koharu/issues) 中反馈。

# 架构设计与技术栈

## Astro Islands 架构理念

astro-koharu 采用 Astro 的 **Islands Architecture（群岛架构）**，这是理解整个项目的核心。

### 什么是 Islands 架构？

传统 SPA（单页应用）将整个页面作为一个 JavaScript 应用，导致：

- 首屏加载大量 JS
- 静态内容也需要 JS 渲染
- SEO 不友好

Islands 架构的理念是：**页面默认是静态 HTML，只有需要交互的部分（"岛屿"）才加载 JavaScript**。

```plain
┌─────────────────────────────────────────────────────────────┐
│                    静态 HTML 页面（海洋）                     │
│  ┌─────────────┐                      ┌─────────────┐       │
│  │   React     │                      │   React     │       │
│  │  组件岛屿    │                      │  组件岛屿    │       │
│  │ (有交互)    │                      │ (有交互)    │       │
│  └─────────────┘                      └─────────────┘       │
│                                                             │
│       静态内容（无 JS）    静态内容（无 JS）                  │
│                                                             │
│  ┌─────────────┐                                            │
│  │   Astro     │         纯 HTML + CSS                      │
│  │   组件      │         无需 JavaScript                     │
│  │ (静态渲染)  │                                            │
│  └─────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
```

### 在 astro-koharu 中的体现

```typescript
// 静态 Astro 组件 - 不产生任何 JS
// src/components/post/PostList.astro
---
const posts = await getSortedPosts();
---
<ul>
  {posts.map(post => <PostItemCard post={post} />)}
</ul>

// 交互式 React 组件 - 只在需要时加载 JS
// src/pages/index.astro
<ThemeToggle client:load />        // 页面加载时激活
<SearchDialog client:visible />    // 滚动到可见时激活
<MenuIcon client:idle />           // 浏览器空闲时激活
```

---

## 技术选型解析

### 为什么选择 Astro？

| 需求       | Astro 的优势                   |
| ---------- | ------------------------------ |
| 博客静态化 | 默认生成纯 HTML，完美适配 CDN  |
| SEO 友好   | 服务端渲染，爬虫可直接读取内容 |
| 内容管理   | Content Collections 原生支持   |
| 性能优先   | 零 JS 起步，按需加载           |
| 框架灵活   | 可混用 React、Vue、Svelte      |

### 为什么选择 React？

项目中的交互组件使用 React 19，原因：

1. **生态成熟**：丰富的 UI 库（Radix UI、Floating UI）
2. **Hooks 强大**：复杂状态逻辑易于管理
3. **TypeScript 支持**：类型推导完善
4. **Motion 库**：动画库原生支持 React

### 为什么选择 Tailwind CSS 4？

1. **原子化 CSS**：无需命名，快速开发
2. **按需生成**：只打包使用的样式
3. **设计系统**：通过配置统一设计令牌
4. **暗色模式**：`dark:` 前缀原生支持

### 为什么选择 Nanostores？

状态管理选择 Nanostores 而非 Redux/Zustand：

1. **极轻量**：< 1KB
2. **框架无关**：Astro 和 React 都能用
3. **简单 API**：`atom` + `useStore` 即可
4. **无样板代码**：无需 Provider 包裹

---

## 配置文件详解

### astro.config.mjs

这是 Astro 的核心配置文件：

```javascript
// astro.config.mjs
import react from '@astrojs/react';
import { siteConfig } from './src/constants/site-config';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';
import umami from '@yeskunall/astro-umami';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import pagefind from 'astro-pagefind';

export default defineConfig({
  // 1. 站点 URL（用于生成绝对路径）
  site: siteConfig.site, // 'https://blog.cosine.ren/'

  // 2. Markdown 处理配置
  markdown: {
    gfm: true, // GitHub Flavored Markdown
    rehypePlugins: [
      rehypeSlug, // 为标题生成 ID
      [
        rehypeAutolinkHeadings, // 为标题添加锚点链接
        {
          behavior: 'append', // 在标题后追加链接
          properties: {
            className: ['anchor-link'],
          },
        },
      ],
    ],
    shikiConfig: {
      themes: {
        light: 'github-light', // 浅色代码主题
        dark: 'github-dark', // 深色代码主题
      },
    },
  },

  // 3. Astro 集成
  integrations: [
    react(), // React 支持
    icon({
      // 图标系统
      include: {
        gg: ['*'], // gg 图标集
        'fa6-regular': ['*'],
        'fa6-solid': ['*'],
        ri: ['*'], // Remix Icon
      },
    }),
    umami({
      // 访问统计
      id: '14de13b0-3220-4beb-8f0b-e08b17724991',
      endpointUrl: 'https://stats.cosine.ren',
      hostUrl: 'https://stats.cosine.ren',
    }),
    pagefind(), // 静态搜索
  ],

  // 4. 开发工具栏
  devToolbar: {
    enabled: true,
  },

  // 5. Vite 配置（底层构建工具）
  vite: {
    plugins: [
      svgr(), // SVG 转 React 组件
      tailwindcss(), // Tailwind CSS
    ],
  },

  // 6. URL 末尾斜杠处理
  trailingSlash: 'ignore', // /about 和 /about/ 都有效
});
```

### 关键配置说明

#### Markdown 处理流程

```plain
Markdown 文件
     ↓
   解析为 AST（语法树）
     ↓
   rehypeSlug → 为 ## 标题 生成 id="标题"
     ↓
   rehypeAutolinkHeadings → 添加 <a href="#标题">🔗</a>
     ↓
   Shiki → 代码块语法高亮
     ↓
   输出 HTML
```

#### 图标系统配置

`astro-icon` 集成了 Iconify 图标库，配置中包含 4 个图标集：

```jsx
// 使用方式
import { Icon } from 'astro-icon/components';

<Icon name="ri:github-fill" />        // Remix Icon
<Icon name="fa6-solid:house" />       // Font Awesome 6 Solid
<Icon name="fa6-regular:heart" />     // Font Awesome 6 Regular
<Icon name="gg:menu" />               // css.gg 图标
```

### tsconfig.json

TypeScript 配置文件：

```json
{
  "extends": "astro/tsconfigs/strict", // 继承 Astro 严格配置
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx", // React 17+ JSX 转换
    "jsxImportSource": "react", // 自动导入 React
    "baseUrl": "src", // 基础路径
    "paths": {
      // 路径别名
      "@/*": ["*"],
      "@components/*": ["components/*"],
      "@lib/*": ["lib/*"]
      // ... 其他别名
    }
  }
}
```

#### 路径别名工作原理

```typescript
// 不使用别名
import { cn } from '../../../lib/utils';

// 使用别名（推荐）
import { cn } from '@lib/utils';
```

编译时，TypeScript 将 `@lib/utils` 解析为 `src/lib/utils`。

---

## 主布局架构

### Layout.astro 分析

主布局文件 `src/layouts/Layout.astro` 是所有页面的基础：

```astro
---
// 1. 类型定义
interface Props {
  title: string;
  description?: string;
  siderType?: HomeSiderType;
  post?: BlogPost;
}

// 2. 组件导入
import FloatingGroup from '@components/layout/FloatingGroup.astro';
import Header from '@components/layout/Header.astro';
import MobileDrawer from '@components/layout/MobileDrawer.astro';
import { ClientRouter } from 'astro:transitions';
import '@styles/index.css'; // 全局样式
---

<!doctype html>
<html transition:name="root" lang="zh-CN">
  <head>
    <!-- 3. SEO 元数据 -->
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />

    <!-- 4. View Transitions -->
    <ClientRouter />

    <!-- 5. 主题初始化（防止闪屏） -->
    <script is:inline>
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      }
    </script>
  </head>

  <body>
    <div class="flex min-h-screen flex-col">
      <!-- 6. 页面结构 -->
      <Header />
      <main class="relative flex grow flex-col gap-4">
        <slot />
        <!-- 页面内容插入点 -->
      </main>
      <FloatingGroup />
      <MobileDrawer type={siderType} post={post} />
    </div>
  </body>
</html>
```

### 架构流程图

```plain
┌─────────────────────────────────────────────────────────────┐
│                         Layout.astro                         │
├─────────────────────────────────────────────────────────────┤
│  <head>                                                      │
│  ├── SEO 元数据（title, description, og:*）                  │
│  ├── ClientRouter（页面过渡动画）                             │
│  ├── LoadingIndicator（加载指示器）                          │
│  └── 主题初始化脚本（inline，立即执行）                       │
├─────────────────────────────────────────────────────────────┤
│  <body>                                                      │
│  │                                                           │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │                    Header                           │ │
│  │  │  ┌─────────┐ ┌───────────────────┐ ┌─────────────┐ │ │
│  │  │  │  Logo   │ │    Navigator      │ │ ThemeToggle │ │ │
│  │  │  └─────────┘ └───────────────────┘ └─────────────┘ │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  │                                                           │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │                    <main>                           │ │
│  │  │                                                     │ │
│  │  │                    <slot />                         │ │
│  │  │              （页面特定内容）                         │ │
│  │  │                                                     │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  │                                                           │
│  │  ┌──────────────┐           ┌───────────────────────┐    │
│  │  │ FloatingGroup│           │     MobileDrawer      │    │
│  │  │  - 返回顶部  │           │   （移动端侧边栏）     │    │
│  │  │  - 搜索按钮  │           │                       │    │
│  │  └──────────────┘           └───────────────────────┘    │
│  │                                                           │
│  └───────────────────────────────────────────────────────────│
└─────────────────────────────────────────────────────────────┘
```

---

## 构建流程

### 开发模式 (pnpm dev)

```plain
源文件变更
    ↓
Vite HMR（热模块替换）
    ↓
浏览器自动刷新
```

### 生产构建 (pnpm build)

```plain
src/ 源文件
    ↓
Astro 编译
├── .astro 组件 → 静态 HTML
├── .tsx 组件 → JavaScript bundles（按需）
├── .md 文件 → HTML（Content Collections）
└── .css 文件 → 优化后的 CSS
    ↓
Vite 打包优化
├── 代码分割
├── Tree shaking
└── 资源压缩
    ↓
Pagefind 索引生成（全文搜索）
    ↓
dist/ 输出目录
├── index.html
├── _astro/
│   ├── *.js (chunks)
│   └── *.css
├── post/
│   └── [slug]/index.html
└── pagefind/
    └── 搜索索引文件
```

---

## 客户端指令详解

Astro 提供了多种 `client:*` 指令来控制组件何时加载 JavaScript：

### 指令对比

| 指令             | 何时加载 JS    | 适用场景                   |
| ---------------- | -------------- | -------------------------- |
| `client:load`    | 页面加载时立即 | 关键交互（主题切换、导航） |
| `client:idle`    | 浏览器空闲时   | 非关键功能（评论、统计）   |
| `client:visible` | 组件可见时     | 懒加载（图表、底部组件）   |
| `client:media`   | 媒体查询匹配时 | 响应式功能                 |
| `client:only`    | 仅客户端渲染   | 依赖浏览器 API             |

### 项目中的使用示例

```astro
// src/layouts/Layout.astro // 主题切换 - 关键功能，立即加载
<ThemeToggle client:load />

// src/components/layout/Header.astro // 下拉导航 - 需要交互
<DropdownNav client:load router={router} />

// src/pages/index.astro // 搜索对话框 - 可见时再加载
<SearchDialog client:visible />

// 菜单图标 - 空闲时加载
<MenuIcon client:idle />
```

---

## View Transitions（页面过渡）

Astro 内置了 View Transitions API 支持，实现页面切换动画：

### 配置方式

```astro
// Layout.astro import {ClientRouter} from 'astro:transitions';

<html transition:name="root">
  <head>
    <ClientRouter />
  </head>
</html>
```

### 工作原理

```plain
用户点击链接
     ↓
Astro 拦截导航
     ↓
预加载目标页面
     ↓
View Transitions API
├── 旧页面淡出
└── 新页面淡入
     ↓
更新 URL（无刷新）
```

### 主题切换兼容

由于页面过渡不触发完整刷新，需要在每次导航后检查主题：

```javascript
// Layout.astro
document.addEventListener('astro:page-load', () => {
  // 每次页面加载（包括过渡后）检查主题
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
});
```

---

## 学习要点

1. **Islands 架构核心**：页面默认静态，交互组件按需加载 JavaScript
2. **Astro vs React 分工**：
   - Astro 组件：静态内容、布局、SEO
   - React 组件：交互、动画、复杂状态
3. **配置层次**：
   - `astro.config.mjs`：框架级配置
   - `tsconfig.json`：TypeScript 和路径别名
   - `tailwind.config.mjs`：样式系统
4. **客户端指令**：`client:load/idle/visible` 控制 JS 加载时机
5. **View Transitions**：无刷新页面切换，提升用户体验

---

## 相关文件

| 文件                           | 说明            |
| ------------------------------ | --------------- |
| `astro.config.mjs`             | Astro 核心配置  |
| `tsconfig.json`                | TypeScript 配置 |
| `src/layouts/Layout.astro`     | 主布局模板      |
| `src/constants/site-config.ts` | 站点配置        |
| `package.json`                 | 依赖和脚本      |

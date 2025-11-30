# 样式系统（Tailwind + 设计令牌）

## 概述

astro-koharu 使用 **Tailwind CSS 4.x** 作为样式框架，结合**设计令牌系统**实现一致的视觉设计。

### 样式系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                      样式系统层次                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   设计令牌 (design-tokens.ts)                                │
│   ├── colors - 颜色系统                                     │
│   ├── spacing - 间距刻度                                    │
│   ├── shadows - 阴影系统                                    │
│   ├── borderRadius - 圆角                                   │
│   └── animation - 动画配置                                  │
│              │                                              │
│              ▼                                              │
│   Tailwind 配置 (tailwind.config.mjs)                       │
│   ├── extend colors/shadows/etc                            │
│   ├── custom screens                                       │
│   └── plugins                                              │
│              │                                              │
│              ▼                                              │
│   CSS 变量 (shadcn.css, theme/index.css)                    │
│   ├── :root - 浅色模式变量                                  │
│   └── .dark - 深色模式变量                                  │
│              │                                              │
│              ▼                                              │
│   组件样式                                                   │
│   ├── Tailwind 类名                                         │
│   └── cn() 工具函数                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 样式文件组织

### `src/styles/index.css`

入口文件，按顺序导入所有样式：

```css
/* 字体定义 */
@import './theme/font.css';

/* Tailwind 基础 */
@import './global/tailwind.css';

/* shadcn 主题变量 */
@import './global/shadcn.css';

/* 全局动画 */
@import './global/animate.css';

/* 组件样式 */
@import './components/wave.css';
@import './components/category.css';
@import './components/post.css';
@import './components/pagefind.css';

/* 主题样式 */
@import './theme/index.css';
@import './theme/theme-transition.css';
@import './theme/markdown.css';
```

### 目录结构

```
src/styles/
├── index.css              # 入口文件
├── global/
│   ├── tailwind.css       # Tailwind 指令
│   ├── shadcn.css         # shadcn 主题变量
│   ├── animate.css        # 全局动画
│   ├── reset.css          # CSS 重置
│   └── utils.css          # 工具类
├── theme/
│   ├── font.css           # 字体定义
│   ├── index.css          # 主题变量
│   ├── theme-transition.css # 主题切换动画
│   └── markdown.css       # Markdown 样式
└── components/
    ├── wave.css           # 波浪效果
    ├── category.css       # 分类组件
    ├── post.css           # 文章组件
    └── pagefind.css       # 搜索样式
```

---

## CSS 变量系统

### shadcn 主题变量

```css
/* src/styles/global/shadcn.css */

@layer base {
  :root {
    /* 背景和前景 */
    --background: 0 0% 100%;
    --foreground: 0 0% 20%;

    /* 卡片 */
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    /* 弹出框 */
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    /* 主色调（粉红色主题） */
    --primary: 351 77% 62%;
    --primary-foreground: 355.7 100% 97.3%;

    /* 次要色 */
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    /* 静音色 */
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 0 0% 20% / 0.5;

    /* 强调色 */
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    /* 危险色 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    /* 边框和输入 */
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 346.8 77.2% 49.8%;

    /* 圆角 */
    --radius: 0.5rem;
  }

  /* 深色模式 */
  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 0 0% 95%;

    --card: 0 0% 13%;
    --card-foreground: 0 0% 95%;

    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 95%;

    --primary: 350 77% 70%;
    --primary-foreground: 355.7 100% 97.3%;

    /* ... 其他深色变量 */
  }
}
```

### 使用 CSS 变量

```css
/* 在组件中使用 */
.card {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border-radius: var(--radius);
}

/* Tailwind 类中使用 */
<div class="bg-card text-card-foreground rounded-lg" />
```

---

## Tailwind 配置

### `tailwind.config.mjs`

```javascript
import {
  colors,
  shadows,
  borderRadius,
  animation as animationTokens,
} from './src/constants/design-tokens.ts';

export default {
  // 深色模式通过 class 控制
  darkMode: ['class'],

  theme: {
    // 响应式断点（自定义）
    screens: {
      xs: { max: '480px' },
      md: { max: '768px' },
      lg: { max: '1440px' },
      '2xl': '1440px',
      tablet: { max: '992px' },
      desktop: { min: '1480px' },
    },

    extend: {
      // 从设计令牌导入颜色
      colors: {
        ...colors,
        // 渐变色变量
        'gradient-start': 'var(--gradient-bg-start)',
        'gradient-end': 'var(--gradient-bg-end)',
        // 自定义颜色
        logo: '#e91e63',
        mandy: {
          50: '#fef2f3',
          // ... 完整色板
          950: '#470a1a',
        },
      },

      // 阴影系统
      boxShadow: {
        ...shadows,
      },

      // 圆角
      borderRadius: {
        ...borderRadius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // 动画
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'slide-in-from-right': {
          from: { opacity: '0', transform: 'translateX(12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-in-out',
      },

      // 过渡时间（从设计令牌）
      transitionDuration: {
        fast: `${animationTokens.duration.fast}ms`,
        normal: `${animationTokens.duration.normal}ms`,
        slow: `${animationTokens.duration.slow}ms`,
      },

      // 缓动函数
      transitionTimingFunction: {
        ...animationTokens.easing,
      },

      // 渐变背景
      backgroundImage: {
        gradient: 'var(--gradient-bg)',
        'gradient-pink': 'var(--gradient-pink)',
        'gradient-header': 'var(--gradient-header)',
        'gradient-shoka-button': 'var(--gradient-shoka-button)',
      },

      // 字体
      fontFamily: {
        sans: ['寒蝉全圆体', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'chill-round': ['寒蝉全圆体', 'sans-serif'],
      },

      // 自定义间距
      spacing: {
        7.5: '1.875rem',
        15: '3.75rem',
        17: '4.25rem',
      },
    },
  },

  // 插件
  plugins: [
    require('@tailwindcss/container-queries'),  // 容器查询
    require('tailwindcss-animate'),              // 动画工具
    require('@tailwindcss/typography'),          // 排版
  ],
};
```

### 自定义断点说明

```javascript
screens: {
  xs: { max: '480px' },      // 小于 480px
  md: { max: '768px' },      // 小于 768px
  lg: { max: '1440px' },     // 小于 1440px
  '2xl': '1440px',           // 大于等于 1440px
  tablet: { max: '992px' },  // 平板及以下
  desktop: { min: '1480px' }, // 桌面
}

// 使用
<div class="hidden tablet:block" />  // 平板及以下显示
<div class="desktop:flex" />         // 桌面显示
```

---

## 设计令牌系统

### 颜色系统

```typescript
// src/constants/design-tokens.ts

export const colors = {
  // 语义化颜色（使用 CSS 变量）
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },

  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
  },

  // 主题色（Shoka 粉红）
  shoka: {
    DEFAULT: '#E95469',
    light: '#FF6B7A',
    dark: '#D63F55',
  },

  // 主题切换图标色
  themeToggle: {
    sun: '#ffbb52',
    moon: '#17181c',
  },

  // UI 颜色
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },

  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  border: 'hsl(var(--border))',
};
```

### 间距刻度

```typescript
export const spacing = {
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  // ... 更多
};

// 命名快捷方式
export const spacingNames = {
  xs: spacing[2],   // 8px
  sm: spacing[3],   // 12px
  md: spacing[4],   // 16px
  lg: spacing[6],   // 24px
  xl: spacing[8],   // 32px
  '2xl': spacing[12], // 48px
};
```

### 阴影系统

```typescript
export const shadows = {
  none: 'none',

  // 层级 1：微妙深度
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',

  // 层级 2：卡片级别
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

  // 层级 3：浮动卡片、下拉菜单
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

  // 层级 4：模态框、弹出框
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // 自定义阴影
  card: '0 0.625rem 1.875rem rgba(90, 97, 105, 0.12)',
  'shoka-button': '0px 0px 16px 0px rgb(233, 84, 105, 0.8)',
};
```

### Z-Index 管理

```typescript
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};
```

---

## cn() 工具函数

### 实现

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 功能

1. **`clsx`**：处理条件类名
2. **`twMerge`**：智能合并 Tailwind 类，解决冲突

### 使用示例

```tsx
// 条件类名
<button className={cn(
  'px-4 py-2 rounded',
  variant === 'primary' && 'bg-primary text-white',
  variant === 'outline' && 'border border-primary',
  disabled && 'opacity-50 cursor-not-allowed',
  className, // 允许外部覆盖
)} />

// 冲突解决
cn('px-4', 'px-6')  // → 'px-6' (后者覆盖)
cn('text-red-500', 'text-blue-500')  // → 'text-blue-500'
```

---

## 响应式设计

### 断点使用

```html
<!-- 移动优先 -->
<div class="flex flex-col md:flex-row lg:grid lg:grid-cols-3">
  <!-- 移动端：垂直排列 -->
  <!-- 平板：水平排列 -->
  <!-- 桌面：三列网格 -->
</div>

<!-- 隐藏/显示 -->
<nav class="hidden tablet:flex">
  <!-- 平板及以下显示 -->
</nav>

<aside class="tablet:hidden">
  <!-- 平板及以下隐藏 -->
</aside>
```

### 容器查询

```html
<!-- 使用 @container 查询 -->
<div class="@container">
  <div class="@md:flex @lg:grid @lg:grid-cols-2">
    <!-- 根据容器宽度响应 -->
  </div>
</div>
```

---

## 排版样式

### Markdown 内容

```css
/* src/styles/theme/markdown.css */

.prose {
  @apply text-foreground;

  /* 标题 */
  h1, h2, h3, h4, h5, h6 {
    @apply text-foreground font-bold;
  }

  /* 链接 */
  a {
    @apply text-primary hover:text-primary/80;
  }

  /* 代码块 */
  pre {
    @apply bg-muted rounded-lg overflow-x-auto;
  }

  code {
    @apply bg-muted px-1 py-0.5 rounded text-sm;
  }

  /* 引用 */
  blockquote {
    @apply border-l-4 border-primary pl-4 italic;
  }
}
```

### Typography 插件

```html
<!-- 使用 prose 类 -->
<article class="prose dark:prose-invert">
  <!-- Markdown 渲染内容自动应用排版样式 -->
</article>
```

---

## 渐变背景

### CSS 变量定义

```css
:root {
  --gradient-bg-start: #ed719a;
  --gradient-bg-end: #ffffff;
  --gradient-bg: linear-gradient(180deg, var(--gradient-bg-start), var(--gradient-bg-end));

  --gradient-shoka-button: linear-gradient(135deg, #e9536a 0%, #f47c93 100%);
  --gradient-header: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);
}

.dark {
  --gradient-bg-start: #212832;
  --gradient-bg-end: #3f4659;
}
```

### 使用

```html
<div class="bg-gradient">
  <!-- 使用渐变背景 -->
</div>

<button class="bg-gradient-shoka-button">
  <!-- 主题色渐变按钮 -->
</button>
```

---

## 最佳实践

### 1. 使用语义化颜色

```tsx
// ✅ 好：使用语义化变量
<div className="bg-background text-foreground" />
<div className="bg-card text-card-foreground" />
<button className="bg-primary text-primary-foreground" />

// ❌ 差：硬编码颜色
<div className="bg-white text-black dark:bg-gray-900 dark:text-white" />
```

### 2. 使用设计令牌

```tsx
// ✅ 好：从设计令牌获取值
import { animation } from '@constants/design-tokens';

<motion.div transition={animation.spring.default} />

// ❌ 差：硬编码值
<motion.div transition={{ stiffness: 300, damping: 30 }} />
```

### 3. 使用 cn() 合并类名

```tsx
// ✅ 好：使用 cn() 处理条件和覆盖
<button className={cn('px-4 py-2', isActive && 'bg-primary', className)} />

// ❌ 差：手动拼接
<button className={`px-4 py-2 ${isActive ? 'bg-primary' : ''} ${className}`} />
```

### 4. 移动优先

```tsx
// ✅ 好：移动优先，逐步增强
<div className="flex flex-col md:flex-row lg:grid" />

// ❌ 差：桌面优先，逐步降级
<div className="grid lg:flex lg:flex-row md:flex-col" />
```

---

## 学习要点

1. **CSS 变量系统**：`:root` 和 `.dark` 定义主题变量
2. **设计令牌**：统一管理颜色、间距、阴影等
3. **Tailwind 配置**：扩展默认配置，导入设计令牌
4. **cn() 函数**：智能合并 Tailwind 类名
5. **响应式设计**：自定义断点 + 容器查询
6. **排版**：Typography 插件 + prose 类

---

## 相关文件

| 文件 | 说明 |
|------|------|
| `src/styles/index.css` | 样式入口 |
| `src/styles/global/shadcn.css` | 主题 CSS 变量 |
| `src/styles/theme/index.css` | 自定义主题变量 |
| `src/styles/theme/markdown.css` | Markdown 排版 |
| `src/constants/design-tokens.ts` | 设计令牌定义 |
| `tailwind.config.mjs` | Tailwind 配置 |
| `src/lib/utils.ts` | cn() 工具函数 |

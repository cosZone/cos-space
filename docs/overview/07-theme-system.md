# 主题系统实现

## 概述

astro-koharu 实现了完整的深色/浅色主题切换功能，包括：

1. **FOUC 防护**：防止页面加载时的主题闪烁
2. **localStorage 持久化**：记住用户偏好
3. **系统主题跟随**：默认跟随系统设置
4. **View Transitions 动画**：主题切换的圆形扩散动画
5. **Astro 页面过渡兼容**：确保主题在页面切换后保持

---

## 主题切换原理

### 整体流程

```
┌─────────────────────────────────────────────────────────────┐
│                    主题系统工作流程                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  1. 页面加载（HTML 解析阶段）                                │
│     - 内联脚本立即执行                                       │
│     - 检查 localStorage.theme                               │
│     - 检查 prefers-color-scheme                             │
│     - 设置 <html class="dark/light">                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  2. 页面渲染                                                 │
│     - CSS 变量根据 .dark/.light 类生效                       │
│     - ThemeToggle 组件初始化                                 │
│     - checkbox 状态同步                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  3. 用户切换主题                                             │
│     - checkbox 状态改变                                      │
│     - View Transitions API 触发                             │
│     - 圆形扩散动画                                           │
│     - localStorage 更新                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Astro 页面过渡                                           │
│     - astro:page-load 事件                                   │
│     - 重新检查主题                                           │
│     - 重新绑定事件                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## FOUC 防护

### 什么是 FOUC？

**FOUC**（Flash of Unstyled Content）是指页面加载时，由于主题状态未及时应用，导致页面短暂显示错误主题的现象。

### 解决方案：内联脚本

在 `Layout.astro` 的 `<head>` 中使用 `is:inline` 脚本：

```astro
<!-- src/layouts/Layout.astro -->
<head>
  <!-- 立即执行，在 DOM 渲染前完成 -->
  <script is:inline>
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
       window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  </script>
</head>
```

### 为什么使用 `is:inline`？

| 特性 | 普通脚本 | `is:inline` 脚本 |
|------|---------|-----------------|
| 执行时机 | 延迟执行 | 立即执行 |
| 打包处理 | 会被打包 | 保持原样 |
| 阻塞渲染 | 否 | 是（短暂） |
| 适用场景 | 功能脚本 | 关键初始化 |

---

## ThemeToggle 组件

### 完整实现

```astro
<!-- src/components/theme/ThemeToggle.astro -->

<!-- 切换按钮 UI -->
<div
  class="theme-toggle scale-80 cursor-pointer transition duration-300 hover:scale-90"
  id="theme-toggle-btn"
  role="button"
  tabindex="0"
  aria-label="toggle theme"
>
  <label class="toggle" aria-label="toggle theme">
    <input type="checkbox" id="theme-checkbox" />
    <div></div>
  </label>
</div>

<script>
  function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const checkbox = document.getElementById('theme-checkbox') as HTMLInputElement | null;
    if (!toggleBtn || !checkbox) return;

    // 防止重复绑定事件（Astro 页面过渡时会重新执行）
    if (toggleBtn.dataset.listenerAttached === 'true') return;

    const rootElement = document.documentElement;

    // 同步 checkbox 状态与当前主题
    const isDarkMode = rootElement.classList.contains('dark');
    checkbox.checked = isDarkMode;

    function toggleTheme() {
      if (!checkbox) return;
      const isDark = checkbox.checked;

      // 获取按钮位置作为动画起点
      const toggleElement = document.querySelector('.theme-toggle');
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;

      if (toggleElement) {
        const rect = toggleElement.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }

      // 添加主题过渡类
      rootElement.classList.add('theme-transition');

      // 检查浏览器是否支持 View Transitions API
      if (!document.startViewTransition) {
        // 降级处理
        applyTheme(isDark);
        setTimeout(() => {
          rootElement.classList.remove('theme-transition');
        }, 100);
        return;
      }

      // 使用 View Transitions API
      const transition = document.startViewTransition(() => {
        applyTheme(isDark);
      });

      // 设置动画起点
      transition.ready
        .then(() => {
          rootElement.style.setProperty('--x', `${x}px`);
          rootElement.style.setProperty('--y', `${y}px`);
        })
        .catch(console.error);

      // 清理
      transition.finished
        .then(() => rootElement.classList.remove('theme-transition'))
        .catch(() => rootElement.classList.remove('theme-transition'));
    }

    function applyTheme(isDark: boolean): void {
      if (isDark) {
        rootElement.classList.add('dark');
        rootElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        rootElement.classList.remove('dark');
        rootElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    }

    checkbox.addEventListener('change', toggleTheme);
    toggleBtn.dataset.listenerAttached = 'true';
  }

  // 首次加载
  setupThemeToggle();

  // Astro 页面过渡后重新设置
  document.addEventListener('astro:page-load', setupThemeToggle);
</script>
```

### 关键代码解析

#### 1. 防止重复绑定

```javascript
if (toggleBtn.dataset.listenerAttached === 'true') return;
// ...
toggleBtn.dataset.listenerAttached = 'true';
```

Astro 页面过渡时会重新执行脚本，需要防止事件重复绑定。

#### 2. View Transitions API

```javascript
const transition = document.startViewTransition(() => {
  applyTheme(isDark);
});

transition.ready.then(() => {
  rootElement.style.setProperty('--x', `${x}px`);
  rootElement.style.setProperty('--y', `${y}px`);
});
```

View Transitions API 允许在 DOM 变化时创建平滑过渡动画。

#### 3. Astro 页面过渡兼容

```javascript
document.addEventListener('astro:page-load', setupThemeToggle);
```

每次 Astro 页面过渡完成后，重新初始化组件。

---

## 太阳/月亮动画

### CSS 实现

```css
/* 默认状态（浅色模式）：太阳 */
.toggle input + div {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  position: relative;
  /* 使用 box-shadow 创建太阳主体 */
  box-shadow: inset 16px -16px 0 0 var(--theme-toggle-color, #ffbb52);
  transform: scale(1) rotate(-2deg);
  transition:
    box-shadow 0.5s ease 0s,
    transform 0.4s ease 0.1s;
}

/* 太阳光线（8条） */
.toggle input + div:after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  /* 使用多重 box-shadow 创建光线 */
  box-shadow:
    0 -23px 0 var(--theme-toggle-color),     /* 上 */
    0 23px 0 var(--theme-toggle-color),      /* 下 */
    23px 0 0 var(--theme-toggle-color),      /* 右 */
    -23px 0 0 var(--theme-toggle-color),     /* 左 */
    15px 15px 0 var(--theme-toggle-color),   /* 右下 */
    -15px 15px 0 var(--theme-toggle-color),  /* 左下 */
    15px -15px 0 var(--theme-toggle-color),  /* 右上 */
    -15px -15px 0 var(--theme-toggle-color); /* 左上 */
  transform: scale(0);  /* 初始隐藏 */
  transition: all 0.3s ease;
}

/* 选中状态（深色模式）：月亮 */
.toggle input:checked + div {
  /* 更大的 inset shadow 形成月亮形状 */
  box-shadow: inset 32px -32px 0 0 var(--theme-background-color, #17181c);
  transform: scale(0.5) rotate(0deg);
}

/* 月亮的圆形背景 */
.toggle input:checked + div:before {
  background: var(--theme-toggle-color, #ffbb52);
}

/* 深色模式下光线放大 */
.toggle input:checked + div:after {
  transform: scale(1.5);
}
```

### 动画效果图

```
浅色模式（太阳）              深色模式（月亮）
    ·  ·  ·                     ╭──────╮
   ·  ╭──╮  ·                  │      │
  ·  │    │  ·       ──→      │   ○  │
   ·  ╰──╯  ·                  │      │
    ·  ·  ·                     ╰──────╯

  黄色圆 + 8条光线             圆形 + 内凹阴影
```

---

## View Transitions 圆形扩散动画

### CSS 配置

```css
/* src/styles/theme/theme-transition.css */

/* 主题切换时的特殊动画 */
.theme-transition::view-transition-old(root),
.theme-transition::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 旧视图淡出 */
.theme-transition::view-transition-old(root) {
  z-index: 1;
}

/* 新视图圆形扩散 */
.theme-transition::view-transition-new(root) {
  z-index: 9999;
  /* 从按钮位置开始的圆形 clip-path */
  clip-path: circle(0% at var(--x, 50%) var(--y, 50%));
  animation: theme-clip 0.5s ease-out forwards;
}

@keyframes theme-clip {
  from {
    clip-path: circle(0% at var(--x, 50%) var(--y, 50%));
  }
  to {
    clip-path: circle(150% at var(--x, 50%) var(--y, 50%));
  }
}
```

### 动画原理

```
1. 点击切换按钮
   ┌─────────────────────┐
   │                     │
   │         ●          │  ← 点击位置 (--x, --y)
   │                     │
   └─────────────────────┘

2. 圆形开始扩散
   ┌─────────────────────┐
   │      ╭────╮         │
   │     │  ●  │        │  ← circle(10%)
   │      ╰────╯         │
   └─────────────────────┘

3. 继续扩大
   ┌─────────────────────┐
   │ ╭──────────────╮    │
   │ │       ●      │    │  ← circle(50%)
   │ ╰──────────────╯    │
   └─────────────────────┘

4. 覆盖整个页面
   ┌─────────────────────┐
   │                     │
   │         ●          │  ← circle(150%)
   │                     │
   └─────────────────────┘
```

---

## Astro 页面过渡兼容

### 问题

Astro 的 View Transitions 不会触发完整页面刷新，导致：
- 主题状态可能不同步
- 事件监听器可能丢失

### 解决方案

```javascript
// Layout.astro - 每次页面加载后检查主题
<script>
  function checkTheme() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
       window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }

  // 每次页面加载（包括过渡后）检查主题
  document.addEventListener('astro:page-load', checkTheme);
</script>
```

---

## localStorage 持久化

### 存储结构

```javascript
// 键: 'theme'
// 值: 'dark' | 'light' | undefined

localStorage.setItem('theme', 'dark');   // 深色模式
localStorage.setItem('theme', 'light');  // 浅色模式
localStorage.removeItem('theme');         // 跟随系统
```

### 优先级

```javascript
// 检查顺序
if (localStorage.theme === 'dark') {
  // 1. 用户明确选择深色
} else if (localStorage.theme === 'light') {
  // 2. 用户明确选择浅色
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // 3. 系统偏好深色
} else {
  // 4. 默认浅色
}
```

---

## CSS 变量系统

### 主题变量定义

```css
/* src/styles/theme/index.css */

/* 浅色模式变量 */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... 更多变量 */
}

/* 深色模式变量 */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... 更多变量 */
}
```

### 使用变量

```css
/* Tailwind CSS 中使用 */
.bg-background {
  background-color: hsl(var(--background));
}

.text-foreground {
  color: hsl(var(--foreground));
}

/* 自定义 CSS 中使用 */
.custom-element {
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
}
```

---

## 无障碍支持

### ARIA 属性

```html
<div
  role="button"
  tabindex="0"
  aria-label="toggle theme"
>
  <label aria-label="toggle theme">
    <input type="checkbox" />
  </label>
</div>
```

### 键盘支持

```javascript
// 支持 Enter 和 Space 键切换
toggleBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    checkbox.click();
  }
});
```

---

## 学习要点

1. **FOUC 防护**：使用 `is:inline` 脚本在渲染前设置主题
2. **View Transitions API**：实现圆形扩散动画效果
3. **localStorage**：持久化用户主题偏好
4. **系统主题跟随**：使用 `prefers-color-scheme` 媒体查询
5. **Astro 兼容**：监听 `astro:page-load` 事件
6. **CSS box-shadow**：创建太阳/月亮图标动画
7. **CSS 变量**：实现主题色统一管理

---

## 相关文件

| 文件 | 说明 |
|------|------|
| `src/components/theme/ThemeToggle.astro` | 主题切换组件 |
| `src/layouts/Layout.astro` | 主题初始化脚本 |
| `src/styles/theme/index.css` | 主题 CSS 变量 |
| `src/styles/theme/theme-transition.css` | 主题过渡动画 |

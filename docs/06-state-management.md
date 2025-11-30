# 状态管理（Nanostores）

## 为什么选择 Nanostores？

astro-koharu 使用 **Nanostores** 进行全局状态管理，而非更流行的 Redux 或 Zustand。原因如下：

| 特性 | Nanostores | Redux | Zustand |
|------|-----------|-------|---------|
| 体积 | ~1KB | ~7KB | ~3KB |
| 框架无关 | 是 | 否 | 否 |
| Astro 支持 | 原生 | 需要适配 | 需要适配 |
| 学习曲线 | 极低 | 高 | 中 |
| 样板代码 | 几乎没有 | 大量 | 少量 |

### 核心优势

1. **极轻量**：压缩后不到 1KB
2. **框架无关**：在 Astro 和 React 中都能使用
3. **简单 API**：只需 `atom` 和 `useStore`
4. **无 Provider**：不需要包裹根组件
5. **TypeScript 友好**：完整的类型推导

---

## 基础概念

### Atom（原子状态）

Atom 是最基础的状态单元，存储单个值：

```typescript
import { atom } from 'nanostores';

// 创建一个 atom
const count = atom<number>(0);

// 读取值
console.log(count.get());  // 0

// 设置值
count.set(1);

// 订阅变化
const unsubscribe = count.subscribe((value) => {
  console.log('新值:', value);
});

// 取消订阅
unsubscribe();
```

### 在 React 中使用

```tsx
import { useStore } from '@nanostores/react';
import { count } from './store';

function Counter() {
  // useStore 会在 atom 变化时触发重渲染
  const value = useStore(count);

  return (
    <div>
      <p>计数: {value}</p>
      <button onClick={() => count.set(value + 1)}>+1</button>
    </div>
  );
}
```

---

## 项目中的状态架构

```
src/store/
├── app.ts      # 应用状态（侧边栏类型等）
└── ui.ts       # UI 状态（抽屉、菜单、搜索等）
```

### 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     Nanostores 状态层                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   app.ts                         ui.ts                      │
│   ┌─────────────────────┐       ┌─────────────────────┐    │
│   │ homeSiderSegmentType│       │ drawerOpen          │    │
│   │ homeSiderType       │       │ mobileMenuOpen      │    │
│   └─────────────────────┘       │ modalOpen           │    │
│                                 │ searchOpen          │    │
│                                 │                     │    │
│                                 │ toggleDrawer()      │    │
│                                 │ openDrawer()        │    │
│                                 │ closeDrawer()       │    │
│                                 └─────────────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   React 组件                    Astro 组件                  │
│   ┌─────────────────────┐       ┌─────────────────────┐    │
│   │ MenuIcon.tsx        │       │ HomeSider.astro     │    │
│   │ DropdownNav.tsx     │       │ MobileDrawer.astro  │    │
│   │ SearchDialog.tsx    │       │ FloatingGroup.astro │    │
│   └─────────────────────┘       └─────────────────────┘    │
│          │                              │                   │
│          │  useStore()                  │  subscribe()      │
│          └──────────────────────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## UI 状态详解

### `src/store/ui.ts`

```typescript
/**
 * 全局 UI 状态管理
 *
 * 基于 Nanostores 的全局状态，用于需要跨 Astro/React 边界通信的 UI 组件。
 * 替代了之前的 CustomEvent 模式，提供更好的类型安全和响应性。
 */

import { atom } from 'nanostores';

/**
 * 移动端抽屉状态
 * 控制侧边栏的显示/隐藏
 * 被 MenuIcon、HomeSider、FloatingGroup 使用
 */
export const drawerOpen = atom<boolean>(false);

/**
 * 移动端菜单状态
 * 控制响应式导航菜单的显示/隐藏
 */
export const mobileMenuOpen = atom<boolean>(false);

/**
 * 模态框状态
 * 通用模态框状态，供未来使用
 */
export const modalOpen = atom<boolean>(false);

/**
 * 搜索模态框状态
 * 控制搜索框的显示/隐藏
 */
export const searchOpen = atom<boolean>(false);

/**
 * 便捷函数 - 切换抽屉状态
 */
export function toggleDrawer(): void {
  drawerOpen.set(!drawerOpen.get());
}

/**
 * 便捷函数 - 打开抽屉
 */
export function openDrawer(): void {
  drawerOpen.set(true);
}

/**
 * 便捷函数 - 关闭抽屉
 */
export function closeDrawer(): void {
  drawerOpen.set(false);
}

/**
 * 便捷函数 - 切换移动菜单
 */
export function toggleMobileMenu(): void {
  mobileMenuOpen.set(!mobileMenuOpen.get());
}

/**
 * 便捷函数 - 切换模态框
 */
export function toggleModal(): void {
  modalOpen.set(!modalOpen.get());
}

/**
 * 便捷函数 - 切换搜索框
 */
export function toggleSearch(): void {
  searchOpen.set(!searchOpen.get());
}
```

### 状态说明

| 状态 | 类型 | 用途 |
|------|------|------|
| `drawerOpen` | `boolean` | 移动端侧边栏抽屉 |
| `mobileMenuOpen` | `boolean` | 移动端导航菜单 |
| `modalOpen` | `boolean` | 通用模态框 |
| `searchOpen` | `boolean` | 搜索对话框 |

---

## 应用状态详解

### `src/store/app.ts`

```typescript
import { HomeSiderSegmentType, HomeSiderType } from '@constants/enum';
import { atom } from 'nanostores';

/**
 * 侧边栏分段类型
 * 控制侧边栏显示的内容类型（信息/目录/系列）
 */
export const homeSiderSegmentType = atom<HomeSiderSegmentType>(
  HomeSiderSegmentType.INFO
);

/**
 * 侧边栏类型
 * 控制侧边栏的整体模式（首页/文章页/无）
 */
export const homeSiderType = atom<HomeSiderType>(HomeSiderType.HOME);
```

### 枚举定义

```typescript
// src/constants/enum.ts

export enum HomeSiderSegmentType {
  INFO = 'INFO',           // 信息面板
  DIRECTORY = 'DIRECTORY', // 目录导航
  SERIES = 'SERIES',       // 系列文章
}

export enum HomeSiderType {
  HOME = 'HOME',  // 首页模式
  POST = 'POST',  // 文章页模式
  NONE = 'NONE',  // 无侧边栏
}
```

---

## 在 React 组件中使用

### MenuIcon 组件示例

```tsx
// src/components/ui/MenuIcon.tsx
'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { useStore } from '@nanostores/react';
import { drawerOpen, toggleDrawer } from '@store/ui';

const MenuIcon = ({ className, id }: MenuIconProps) => {
  // 1. 订阅状态
  const isOpen = useStore(drawerOpen);
  const controls = useAnimation();

  // 2. 状态变化时触发动画
  useEffect(() => {
    controls.start(isOpen ? 'opened' : 'closed');
  }, [isOpen, controls]);

  // 3. 点击时切换状态
  const handleToggle = () => {
    toggleDrawer();
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isOpen ? '关闭菜单' : '打开菜单'}
      aria-expanded={isOpen}
    >
      <svg>
        <motion.g variants={lineVariants} animate={controls} custom={1}>
          <line x1="3" y1="6" x2="21" y2="6" />
        </motion.g>
        {/* 更多线条... */}
      </svg>
    </button>
  );
};
```

### 关键点

1. **`useStore`**：自动订阅 atom 变化，状态更新时组件重渲染
2. **`toggleDrawer()`**：使用便捷函数而非直接 `set`
3. **双向绑定**：UI 反映状态，点击改变状态

---

## 在 Astro 组件中使用

### 使用 `<script>` 标签

```astro
<!-- src/components/layout/MobileDrawer.astro -->
<div id="mobile-drawer" class="hidden">
  <!-- 抽屉内容 -->
</div>

<script>
  import { drawerOpen } from '@store/ui';

  // 订阅状态变化
  drawerOpen.subscribe((isOpen) => {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) {
      drawer.classList.toggle('hidden', !isOpen);
    }
  });
</script>
```

### 使用 React 岛屿

```astro
<!-- src/components/layout/HomeSider.astro -->
---
import { HomeSiderSegmented } from './HomeSiderSegmented';
---

<div class="sider-container">
  <!-- React 组件处理交互 -->
  <HomeSiderSegmented
    client:load
    defaultValue={defaultSegmentType}
  />

  <!-- 静态内容 -->
  <div class="sider-content">
    <slot />
  </div>
</div>
```

---

## 状态通信流程

### 场景：点击菜单图标打开抽屉

```
┌─────────────────────────────────────────────────────────────┐
│  1. 用户点击 MenuIcon                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  2. toggleDrawer() 被调用                                    │
│     drawerOpen.set(!drawerOpen.get())                       │
│     drawerOpen: false → true                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  3. 所有订阅者收到通知                                        │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ MenuIcon.tsx    │  │ MobileDrawer    │                  │
│  │ useStore() 触发 │  │ subscribe() 触发│                  │
│  │ 重渲染          │  │ DOM 更新        │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  4. UI 更新                                                  │
│  - MenuIcon 动画切换到 X 形状                                │
│  - MobileDrawer 滑入显示                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 最佳实践

### 1. 状态粒度

每个 atom 只存储一个关注点：

```typescript
// ✅ 好：细粒度状态
export const drawerOpen = atom<boolean>(false);
export const searchOpen = atom<boolean>(false);

// ❌ 差：粗粒度状态
export const uiState = atom({
  drawerOpen: false,
  searchOpen: false,
  // 更多...
});
```

### 2. 便捷函数

为常用操作提供便捷函数：

```typescript
// ✅ 好：提供语义化函数
export function toggleDrawer(): void {
  drawerOpen.set(!drawerOpen.get());
}

// 使用
toggleDrawer();

// ❌ 差：直接操作
drawerOpen.set(!drawerOpen.get());
```

### 3. 类型安全

利用 TypeScript 泛型确保类型安全：

```typescript
// 带泛型的 atom
export const homeSiderType = atom<HomeSiderType>(HomeSiderType.HOME);

// 类型检查
homeSiderType.set(HomeSiderType.POST);  // ✅
homeSiderType.set('invalid');           // ❌ 类型错误
```

### 4. 组件解耦

状态逻辑与组件逻辑分离：

```typescript
// store/ui.ts - 状态定义
export const drawerOpen = atom<boolean>(false);
export function toggleDrawer(): void { /* ... */ }

// MenuIcon.tsx - 只关心 UI
const MenuIcon = () => {
  const isOpen = useStore(drawerOpen);
  return <button onClick={toggleDrawer}>...</button>;
};
```

---

## 与之前方案的对比

### CustomEvent 模式（旧）

```javascript
// 发送事件
window.dispatchEvent(new CustomEvent('drawer-toggle', { detail: true }));

// 监听事件
window.addEventListener('drawer-toggle', (e) => {
  const isOpen = e.detail;
  // 更新 UI
});
```

**问题**：
- 无类型安全
- 难以追踪状态
- 容易产生内存泄漏

### Nanostores 模式（新）

```typescript
// 更新状态
drawerOpen.set(true);

// 订阅状态
const unsubscribe = drawerOpen.subscribe((isOpen) => {
  // 更新 UI
});
```

**优势**：
- 完整类型推导
- 状态可追踪
- 自动清理订阅

---

## 学习要点

1. **Nanostores 基础**：`atom` 创建状态，`useStore` 订阅状态
2. **跨框架通信**：React 用 `useStore`，Astro 用 `subscribe`
3. **状态粒度**：每个 atom 只存一个值
4. **便捷函数**：封装常用操作，提高可读性
5. **类型安全**：利用泛型确保状态类型正确
6. **替代方案**：比 CustomEvent 更安全、更易维护

---

## 相关文件

| 文件 | 说明 |
|------|------|
| `src/store/app.ts` | 应用状态 |
| `src/store/ui.ts` | UI 状态 |
| `src/constants/enum.ts` | 状态枚举 |
| `src/components/ui/MenuIcon.tsx` | 使用状态的组件示例 |
| `src/components/layout/MobileDrawer.astro` | Astro 中使用状态 |

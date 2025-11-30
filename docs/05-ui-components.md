# UI 组件库实现

## 设计理念

astro-koharu 的 UI 组件库遵循 **shadcn/ui** 的设计理念：

1. **组件即代码**：组件直接存放在项目中，可完全自定义
2. **CVA 变体系统**：使用 class-variance-authority 管理样式变体
3. **Radix UI 基础**：底层使用无样式的 Radix UI 原语
4. **Tailwind 样式**：使用 Tailwind CSS 原子类定义样式
5. **类型安全**：完整的 TypeScript 支持

```
┌─────────────────────────────────────────────────────────────┐
│                    组件层次结构                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   业务组件                                                   │
│   ├── DropdownNav                                           │
│   ├── SearchDialog                                          │
│   └── SeriesNavigation                                      │
│              │                                              │
│              ▼                                              │
│   UI 组件 (src/components/ui/)                              │
│   ├── Button  ─────────┬──→ CVA 变体系统                    │
│   ├── Popover ─────────┼──→ Floating UI                     │
│   ├── Card    ─────────┼──→ Compound Components             │
│   └── Dialog  ─────────┼──→ Radix UI                        │
│              │         │                                    │
│              ▼         ▼                                    │
│   工具函数                                                   │
│   └── cn() ← clsx + tailwind-merge                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 核心工具函数

### `cn()` 函数

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**功能说明**：

1. **`clsx`**：合并多个类名，支持条件类名
2. **`twMerge`**：智能合并 Tailwind 类，避免冲突

**使用示例**：

```tsx
// 基础合并
cn('px-4 py-2', 'text-white')
// → 'px-4 py-2 text-white'

// 条件类名
cn('base-class', {
  'active-class': isActive,
  'disabled-class': isDisabled,
})
// → 'base-class active-class' (当 isActive 为 true)

// 冲突解决（twMerge 的作用）
cn('px-4', 'px-6')  // → 'px-6' (后者覆盖前者)
cn('text-red-500', 'text-blue-500')  // → 'text-blue-500'

// 实际使用
<button className={cn(
  'px-4 py-2 rounded',
  variant === 'primary' && 'bg-blue-500 text-white',
  className  // 允许外部覆盖
)}>
```

---

## Button 组件

### CVA 变体系统

```tsx
// src/components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

// 定义变体
const buttonVariants = cva(
  // 基础样式（所有变体共享）
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      // 外观变体
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'gradient-shoka': 'bg-gradient-shoka-button text-primary-foreground',
      },
      // 尺寸变体
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    // 默认变体
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
```

### 组件实现

```tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 使用 asChild 时，Button 的样式会应用到子元素上
   * 常用于包装 Link 组件
   */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // asChild 为 true 时，使用 Slot 渲染子元素
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

### 使用示例

```tsx
// 基础用法
<Button variant="default" size="md">
  Click me
</Button>

// 不同变体
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="gradient-shoka">渐变按钮</Button>

// 不同尺寸
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// asChild 模式（包装 Link）
<Button asChild>
  <a href="/about">About</a>
</Button>

// 禁用状态
<Button disabled>Disabled</Button>
```

---

## Popover 组件

### 核心特性

Popover 是一个复杂的浮动 UI 组件，整合了多个库：

- **Floating UI**：精准定位
- **Motion**：动画效果
- **自定义 Hooks**：状态管理

### 完整实现

```tsx
// src/components/ui/popover.tsx
import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useHover,
  useInteractions,
  useRole,
  type Placement,
} from '@floating-ui/react';
import { useControlledState } from '@hooks/useControlledState';
import { useFloatingUI } from '@hooks/useFloatingUI';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import React, { cloneElement } from 'react';
import { animation } from '@constants/design-tokens';
import { withFloatingErrorBoundary } from '@components/common/FloatingErrorBoundary';

type PopoverProps = {
  /** 受控模式：是否打开 */
  open?: boolean;
  /** 状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 渲染弹出内容 */
  render: (data: { close: () => void }) => React.ReactNode;
  /** 定位方向 */
  placement?: Placement;
  /** 触发元素 */
  children: React.JSX.Element;
  /** 自定义样式 */
  className?: string;
  /** 偏移距离 */
  offset?: number;
  /** 自定义动画 */
  motionProps?: MotionProps;
  /** 触发方式 */
  trigger?: 'click' | 'hover';
};

function Popover({
  children,
  render,
  open: passedOpen,
  placement,
  onOpenChange,
  className,
  offset: offsetNum = 10,
  motionProps,
  trigger = 'click',
}: React.PropsWithChildren<PopoverProps>) {
  // 1. 状态管理（支持受控/非受控）
  const [isOpen, setIsOpen] = useControlledState({
    value: passedOpen,
    defaultValue: false,
    onChange: onOpenChange,
  });

  // 2. 浮动定位
  const { refs, floatingStyles, context } = useFloatingUI({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    offset: offsetNum,
    transform: false,
  });

  // 3. 交互处理
  const hover = useHover(context, {
    enabled: trigger === 'hover',
    delay: { open: 0, close: animation.duration.fast },
  });
  const click = useClick(context, {
    enabled: trigger === 'click',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    useDismiss(context),  // 点击外部关闭
    useRole(context),     // ARIA 角色
  ]);

  return (
    <>
      {/* 4. 触发元素 */}
      {cloneElement(
        children,
        getReferenceProps({ ref: refs.setReference, ...children.props })
      )}

      {/* 5. 弹出内容（带动画） */}
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <motion.div
                className={cn(
                  'z-10 rounded-ss-2xl rounded-ee-2xl bg-black/30 backdrop-blur-sm',
                  className
                )}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, originY: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={animation.spring.popoverContent}
                style={{ ...floatingStyles }}
                {...motionProps}
                {...getFloatingProps({ ref: refs.setFloating })}
              >
                {render({ close: () => setIsOpen(false) })}
              </motion.div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  );
}

// 6. 错误边界包装 + memo 优化
const PopoverWithErrorBoundary = withFloatingErrorBoundary(Popover, 'Popover');
export default React.memo(PopoverWithErrorBoundary);
```

### 架构分层

```
┌─────────────────────────────────────────────────────────────┐
│                      Popover 组件                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  状态层                                                      │
│  └── useControlledState ─→ 支持受控/非受控模式               │
│                                                             │
│  定位层                                                      │
│  └── useFloatingUI ─→ Floating UI 配置                      │
│      ├── 自动翻转                                            │
│      ├── 边界检测                                            │
│      └── 偏移计算                                            │
│                                                             │
│  交互层                                                      │
│  └── useInteractions                                        │
│      ├── useHover ─→ hover 触发                             │
│      ├── useClick ─→ click 触发                             │
│      ├── useDismiss ─→ 点击外部关闭                         │
│      └── useRole ─→ ARIA 角色                               │
│                                                             │
│  渲染层                                                      │
│  ├── FloatingPortal ─→ 传送到 body                          │
│  ├── FloatingFocusManager ─→ 焦点管理                       │
│  └── motion.div ─→ 动画效果                                 │
│                                                             │
│  安全层                                                      │
│  └── withFloatingErrorBoundary ─→ 错误隔离                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 使用示例

```tsx
// Hover 触发的下拉菜单
<Popover
  trigger="hover"
  placement="bottom-start"
  render={({ close }) => (
    <div className="flex flex-col">
      <a href="/about" onClick={close}>About</a>
      <a href="/contact" onClick={close}>Contact</a>
    </div>
  )}
>
  <button>Menu</button>
</Popover>

// Click 触发的弹出框
<Popover
  trigger="click"
  placement="bottom"
  offset={15}
  render={({ close }) => (
    <div className="p-4">
      <p>弹出内容</p>
      <Button onClick={close}>关闭</Button>
    </div>
  )}
>
  <Button>打开弹出框</Button>
</Popover>

// 受控模式
const [isOpen, setIsOpen] = useState(false);

<Popover
  open={isOpen}
  onOpenChange={setIsOpen}
  render={() => <div>内容</div>}
>
  <Button>触发器</Button>
</Popover>
```

---

## Card 组件

### Compound Component 模式

Card 采用组合组件模式，将复杂组件拆分为多个子组件：

```tsx
// src/components/ui/card.tsx
import * as React from 'react';
import { cn } from '@lib/utils';

// 主容器
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-card text-card-foreground rounded-lg border shadow-xs',
        className
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

// 头部区域
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

// 标题
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl leading-none font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

// 描述
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

// 内容区域
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

// 底部区域
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
```

### 使用示例

```tsx
// 完整卡片
<Card>
  <CardHeader>
    <CardTitle>文章标题</CardTitle>
    <CardDescription>这是文章的简短描述</CardDescription>
  </CardHeader>
  <CardContent>
    <p>文章内容在这里...</p>
  </CardContent>
  <CardFooter>
    <Button>阅读更多</Button>
  </CardFooter>
</Card>

// 简洁卡片
<Card>
  <CardContent className="pt-6">
    <p>简单内容</p>
  </CardContent>
</Card>

// 自定义样式
<Card className="border-primary">
  <CardHeader className="bg-primary/10">
    <CardTitle className="text-primary">特色卡片</CardTitle>
  </CardHeader>
  <CardContent>
    <p>内容</p>
  </CardContent>
</Card>
```

---

## useControlledState Hook

### 受控/非受控模式统一

```tsx
// src/hooks/useControlledState.ts

export interface UseControlledStateOptions<T> {
  /** 受控值 */
  value?: T;
  /** 非受控默认值 */
  defaultValue?: T;
  /** 值变化回调 */
  onChange?: (value: T) => void;
}

export function useControlledState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControlledStateOptions<T>): [T | undefined, (value: T) => void] {
  // 判断是否为受控模式
  const isControlled = controlledValue !== undefined;
  const isControlledRef = useRef(isControlled);

  // 开发环境警告：模式切换
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (isControlled !== isControlledRef.current) {
        console.warn(
          'useControlledState: 组件从' +
          `${isControlledRef.current ? '受控' : '非受控'}切换到` +
          `${isControlled ? '受控' : '非受控'}模式，这是反模式。`
        );
      }
    }
    isControlledRef.current = isControlled;
  }, [isControlled]);

  // 非受控模式的内部状态
  const [internalValue, setInternalValue] = useState(defaultValue);

  // 返回的值
  const value = isControlled ? controlledValue : internalValue;

  // 设置值的函数
  const setValue = useCallback(
    (newValue: T) => {
      // 非受控模式：更新内部状态
      if (!isControlled) {
        setInternalValue(newValue);
      }
      // 两种模式都调用 onChange
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  return [value, setValue];
}
```

### 使用场景

```tsx
// 组件支持两种模式
function Dropdown({ value, defaultValue, onChange }) {
  const [selectedValue, setSelectedValue] = useControlledState({
    value,
    defaultValue,
    onChange,
  });

  return (
    <select
      value={selectedValue}
      onChange={(e) => setSelectedValue(e.target.value)}
    >
      {/* options */}
    </select>
  );
}

// 非受控使用
<Dropdown defaultValue="option1" />

// 受控使用
const [value, setValue] = useState('option1');
<Dropdown value={value} onChange={setValue} />
```

---

## 组件设计原则

### 1. forwardRef 模式

所有 UI 组件都使用 `forwardRef` 转发 ref：

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);
```

### 2. displayName 设置

便于 DevTools 调试：

```tsx
Button.displayName = 'Button';
```

### 3. 类型导出

导出 Props 类型供外部使用：

```tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export { Button, type ButtonProps };
```

### 4. 默认值处理

使用 `??` 或 `defaultVariants` 处理默认值：

```tsx
const Comp = asChild ? Slot : 'button';
const offset = offsetNum ?? 10;
```

---

## UI 组件列表

```
src/components/ui/
├── button.tsx      # 按钮组件（CVA 变体示例）
├── card.tsx        # 卡片组件（组合组件示例）
├── popover.tsx     # 弹出框（Floating UI 示例）
├── tooltip.tsx     # 工具提示
├── badge.tsx       # 徽章
├── avatar.tsx      # 头像
├── divider.tsx     # 分割线
├── segmented.tsx   # 分段控制器
├── MenuIcon.tsx    # 菜单图标（动画）
├── dialog/         # 对话框
├── cover/          # 封面组件
├── loading/        # 加载组件
├── navigator/      # 导航组件
└── segmented/      # 分段控制器
```

---

## 学习要点

1. **CVA 变体系统**：使用 class-variance-authority 管理样式变体
2. **cn() 函数**：clsx + tailwind-merge 智能合并类名
3. **组合组件模式**：Card 拆分为多个子组件，灵活组合
4. **受控/非受控统一**：useControlledState 让组件支持两种模式
5. **Floating UI 集成**：Popover 展示浮动定位的最佳实践
6. **forwardRef**：所有 UI 组件都应转发 ref
7. **错误边界**：浮动组件使用 withFloatingErrorBoundary 隔离错误

---

## 相关文件

| 文件 | 说明 |
|------|------|
| `src/components/ui/button.tsx` | 按钮组件 |
| `src/components/ui/card.tsx` | 卡片组件 |
| `src/components/ui/popover.tsx` | 弹出框组件 |
| `src/lib/utils.ts` | cn() 工具函数 |
| `src/hooks/useControlledState.ts` | 受控状态 Hook |
| `src/hooks/useFloatingUI.ts` | 浮动定位 Hook |
| `src/constants/design-tokens.ts` | 设计令牌 |

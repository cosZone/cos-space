---
title: Floating UI 使用经验分享 - Dialog
link: floating-ui-experience-dialog
catalog: true
date: 2023-06-16 15:11:15
tags:
- 前端
- floating-ui
categories:
- [笔记, 前端]
---
上文：[Floating UI 使用经验分享 - Popover](https://x.cosine.ren/floating-ui-experience-popover)

在本文中，我将分享如何使用 Floating UI 来创建另一种常见的浮动 UI 组件——**Dialog（对话框）**。Dialog 是一个浮动元素，显示需要立即关注的信息，他会出现在页面内容上并**阻止与页面的交互**，直到它被关闭。

它与弹出框有类似的交互，但有两个主要区别：

- 它是模态的，并在对话框后面呈现一个背景，使后面的内容变暗，使页面的其余部分无法访问。
- 它在视口中居中，不锚定到任何特定的参考元素。

一个可访问的对话框组件具有以下要点：

- **`Dismissal`**：当用户按下  `esc`  键或在打开的对话框外按下时，它会关闭。
- **`Role`**：元素被赋予相关的角色和 ARIA 属性，以便屏幕阅读器可以访问。
- **`Focus management`**: 焦点完全被困在对话框中，必须由用户解除。

## 目标组件

目标：实现一个这样的 [Dialog Demo](https://codesandbox.io/p/github/yusixian/template_next-tailwind-ts-app/draft/floating-ui-demo?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522cliy1hgl0000c3n6pvv513prs%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522cliy1hgl0000e3n6pp1gi2ror%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B30.144189604643344%252C69.85581039535666%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cliy1hgl0000c3n6pvv513prs%2522%253A%257B%2522id%2522%253A%2522cliy1hgl0000c3n6pvv513prs%2522%252C%2522activeTabId%2522%253A%2522cliy7qs8n01863n6pa3mu15c2%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fcomponents%252Flayout%252Fheader.tsx%2522%252C%2522id%2522%253A%2522cliy3gxpt018d3n6ps8hu337g%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Ftailwind.config.js%2522%252C%2522id%2522%253A%2522cliy3jpfx04rq3n6po9angg9v%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpages%252Fpopover%252Findex.tsx%2522%252C%2522id%2522%253A%2522cliy3q2v500jr3n6pgen3zde9%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fcomponents%252Fpopover%252Findex.tsx%2522%252C%2522id%2522%253A%2522cliy3the301cs3n6pdebjzwn2%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fyarn.lock%2522%252C%2522id%2522%253A%2522cliy7qs8n01863n6pa3mu15c2%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%252C%2522cliy1hgl0000e3n6pp1gi2ror%2522%253A%257B%2522id%2522%253A%2522cliy1hgl0000e3n6pp1gi2ror%2522%252C%2522activeTabId%2522%253A%2522cliy3g70o010z3n6phyzf4utw%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cliy3mfy308fk3n6papetdvvy%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%252C%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522id%2522%253A%2522cliy3g70o010z3n6phyzf4utw%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%252C%257B%2522id%2522%253A%2522cliy7qu0901bs3n6pd3utu0os%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522cliy7qw300009g3jb4o26bhdb%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D) 👇

![Pasted image 20230616145507](https://x.cosine.ren/_next/image?url=https%3A%2F%2Fipfs.4everland.xyz%2Fipfs%2Fbafkreibyfgdiqbg7x7xvfoho3w3lzsdr46zoj3sq56k5hwzv52quvucami&w=1920&q=75)

接下来我们需要创建一个名为 `Dialog` 的 React 组件，它使用了 `@floating-ui/react` 库来创建一个可交互的浮动对话框。以下是对该组件的设想：

### 组件参数

`Dialog` 组件需要接受以下参数：

- `rootId`：浮动元素的根元素，可选。
- `open`：控制对话框是否打开的布尔值。
- `initialOpen`：对话框初始是否打开的布尔值，默认为 `false`。
- `onOpenChange`：当对话框打开状态改变时的回调函数，接受一个布尔值参数。
- `render`：一个函数，接受一个对象参数，该对象包含一个 `close` 方法，用于关闭对话框。该函数返回要在对话框中渲染的 React 节点。
- `className`：应用于对话框的 CSS 类名。
- `overlayClass`：应用于浮动覆盖层的 CSS 类名。
- `containerClass`：应用于对话框容器的 CSS 类名。
- `isDismiss`：一个布尔值，决定是否启用点击外部区域关闭对话框的功能，默认为 `true`。
- `children`：React 子元素，可以是一个按钮，点击后打开该弹窗。
- `showCloseButton`：一个布尔值，决定是否显示关闭按钮，默认为 `true`。

### 组件功能

`Dialog` 组件的主要功能是创建一个可交互的浮动对话框，它可以通过点击关闭按钮或点击对话框外部区域来关闭。对话框的打开和关闭状态可以通过 `open` 和 `onOpenChange` 参数进行控制（受控），也可以通过内部状态进行自动管理（非受控）。

`Dialog` 组件使用了 `@floating-ui/react` 库的多个 Hook：

- `useFloating`：用于管理对话框的打开和关闭状态。
- `useClick`、`useRole` 和 `useDismiss`：用于处理对话框的交互，如点击和角色管理。
- `useInteractions`：用于获取和设置交互属性。

此外，`Dialog` 组件还使用了 `FloatingPortal`、`FloatingOverlay` 和 `FloatingFocusManager` 组件来创建浮动对话框的 UI。

### 完整代码

结合实际可以写出这样一个功能较为完整的 Dialog 案例，可以自定义遮罩层、内部元素的样式，也可以控制点击遮罩层是否关闭弹窗等，还可以结合 Framer-motion 制作弹窗动画等（以后有机会也写一篇）

```tsx
import {  
  FloatingFocusManager,  
  FloatingOverlay,  
  FloatingPortal,  
  useClick,  
  useDismiss,  
  useFloating,  
  useInteractions,  
  useRole,  
} from '@floating-ui/react';  
import clsx from 'clsx';  
import React, { cloneElement, useState } from 'react';  
import { CgClose } from 'react-icons![](file:///C:\Users\34504\AppData\Roaming\Tencent\QQTempSys\3)6GH))S[9A2G57O0%MM45V.gif)';  
  
type DialogProps = {  
  rootId?: string;  
  open?: boolean;  
  initialOpen?: boolean;  
  onOpenChange?: (open: boolean) => void;  
  children?: JSX.Element;  
  render: (props: { close: () => void }) => React.ReactNode;  
  className?: string;  
  overlayClass?: string;  
  containerClass?: string;  
  isDismiss?: boolean;  
  showCloseButton?: boolean;  
};  
  
export default function Dialog({  
  initialOpen = false,  
  open: controlledOpen,  
  onOpenChange: setControlledOpen,  
  children,  
  className,  
  render,  
  rootId: customRootId,  
  overlayClass,  
  containerClass,  
  showCloseButton = true,  
  isDismiss = true,  
}: DialogProps) {  
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);  
  const open = controlledOpen ?? uncontrolledOpen;  
  const setOpen = setControlledOpen ?? setUncontrolledOpen;  
  
  const { reference, floating, context } = useFloating({  
    open,  
    onOpenChange: setOpen,  
  });  
  
  const click = useClick(context);  
  const role = useRole(context);  
  const dismiss = useDismiss(context, { enabled: isDismiss, outsidePressEvent: 'mousedown' });  
  
  const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss]);  
  
  const onClose = () => setOpen(false);  
  
  return (  
    <>  
      {children && cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}  
      <FloatingPortal id={customRootId}>  
        {open && (  
          <FloatingOverlay  
            className={clsx('absolute inset-0 z-10 flex h-full w-full items-center', overlayClass ?? 'bg-black/60')}  
            lockScroll  
          >  
            <div className={clsx('m-auto grid place-items-center', containerClass)}>  
              <FloatingFocusManager context={context}>  
                <div  
                  className={clsx('relative overflow-hidden rounded-md bg-white', className ?? 'mx-24')}  
                  ref={floating}  
                  {...getFloatingProps()}  
                >  
                  {showCloseButton && <CgClose className="absolute right-2 top-2 h-6 w-6 cursor-pointer" onClick={onClose} />}  
                  {render({ close: onClose })}  
                </div>  
              </FloatingFocusManager>  
            </div>  
          </FloatingOverlay>  
        )}  
      </FloatingPortal>  
    </>  
  );  
}
```

## Basic Dialog Hooks

官方示例 👉 [CodeSandbox demo](https://codesandbox.io/s/stoic-bas-frzus0?file=/src/App.tsx)

此示例演示如何创建用于单个实例的对话框以熟悉基础知识。

让我们看一下这个例子：

### Open state

```jsx
import {useState} from 'react';
 
function Dialog() {
  const [isOpen, setIsOpen] = useState(false);
}
```

`isOpen` 确定对话框当前是否在屏幕上打开。它用于条件渲染。

### useFloating hook

[useFloating hook](https://floating-ui.com/docs/dialog#usefloating-hook)

`useFloating()` hook为我们的对话提供上下文。我们需要传递一些信息：

- `open` ：来自我们上面的 `useState()` 挂钩的打开状态。
- `onOpenChange`: 对话框打开或关闭时调用的回调函数。我们将使用它来更新我们的 `isOpen` 状态。

```jsx
import {useFloating} from '@floating-ui/react';
 
function Dialog() {
  const [isOpen, setIsOpen] = useState(false);
 
  const {refs, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
}
```

### Interaction hooks

[Interaction hooks](https://floating-ui.com/docs/dialog#interaction-hooks)

- `useClick()` 添加了在**单击引用元素**时**打开或关闭对话框**的功能。但是，对话框可能不会附加到引用元素，因此这是可选的。(一般对话框都是独立出来Portal的，也就是上下文是body)
- `useDismiss()` 添加了当用户按下 `esc` 键或在对话框外按下时关闭对话框的功能。可以将其的 `outsidePressEvent` 选项设置为 `'mousedown'` 以便触摸事件变得懒惰并且不会穿过背景，因为默认行为是急切的。（不太好理解，大概是）
- `useRole()` 将 `dialog` 的正确 ARIA 属性添加到对话框和引用元素。

最后， `useInteractions()` 将他们所有的 props 合并到 prop getters 中，然后就可以用于渲染。

```jsx
import {
  // ...
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useId,
} from '@floating-ui/react';
 
function Dialog() {
  const [isOpen, setIsOpen] = useState(false);
 
  const {refs, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
 
  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown',
  });
  const role = useRole(context);
 
  // Merge all the interactions into prop getters
  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
    dismiss,
    role,
  ]);
 
  // Set up label and description ids
  const labelId = useId();
  const descriptionId = useId();
}
```

### Rendering

[Rendering](https://floating-ui.com/docs/dialog#rendering)

现在我们已经设置了所有的变量和hook，可以渲染我们的元素了。

```jsx
function Dialog() {
  // ...
  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Reference element
      </button>
      {isOpen && (
        <FloatingOverlay
          lockScroll
          style={{background: 'rgba(0, 0, 0, 0.8)'}}
        >
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              aria-labelledby={labelId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
            >
              <h2 id={labelId}>Heading element</h2>
              <p id={descriptionId}>Description element</p>
              <button onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </>
  );
}
```

- `{...getReferenceProps()}` / `{...getFloatingProps()}`  上一篇说过，将 props 从交互挂钩传播到相关元素上。它们包含诸如 `onClick` 、 `aria-expanded` 等道具。

#### FloatingPortal & FloatingOverlay & FloatingFocusManager

- `<FloatingOverlay />` 是一个在浮动元素后面**渲染背景覆盖元素**的组件，具有**锁定主体滚动**的能力。 [FloatingOverlay docs](https://floating-ui.com/docs/FloatingOverlay)
  - 提供了一个固定的基本样式，使背景内容变暗并阻止浮动元素后面的指针事件。
  - 它是一个常规的 `<div/>`，因此可以通过任何CSS解决方案进行样式设置。
- `<FloatingFocusManager />`
  - [FloatingPortal docs](https://floating-ui.com/docs/floatingportal) 一个管理和控制页面中浮动元素焦点的组件
  - 自动检测焦点变化，调整页面上的浮动元素的位置和状态，确保页面上所有元素的可访问性和可用性。
  - 默认情况通常**将焦点捕获在内部**。
  - 它应该**直接包裹浮动元素**，并且**只在对话框也被渲染时才被渲染**。  [FloatingFocusManager docs](https://floating-ui.com/docs/floatingfocusmanager)
    - `<FloatingPortal />`将浮动元素传送到给定的容器元素中——默认情况下，在应用程序根之外并进入 body。
    - 可以自定义 root，也就是可选择具有 id 的节点，或者创建它并将其附加到指定的根（body）

```jsx
import {FloatingPortal} from '@floating-ui/react';
 
function Tooltip() {
  return (
    isOpen && (
      <FloatingPortal>
        <div>Floating element</div>
      </FloatingPortal>
    )
  );
}
```

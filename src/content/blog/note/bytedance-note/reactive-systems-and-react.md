---
title: 青训营 |「响应式系统与 React」
link: note/front-end/bytedance-note/responsive-system-and-react
catalog: true
date: 2022-01-21 14:30:17
subtitle: 本节课大致介绍了响应式编程、React及其原理，介绍了组件化、一些应用级框架
lang: cn
tags:
- 前端
- 响应式
- React
- Hook
categories:
- [笔记, 青训营笔记]
---
## React的历史与应用

**应用**

- 前端应用开发，如 Facebook，Instagram，Netflix网页版。
- 移动原生应用开发，如Instagram，Discord，Oculus。
- 结合Electron，进行桌面应用开发。

**历史**

- 2010年 Facebook 在其php生态中，引入了xhp框架，首次引入了组合式组件的思想，启发了后来的React的设计。
- 2011年Jordan Walke创造了FaxJS，也就是后来的React原型:
  - 既可以在客户端渲染也可以在服务端渲染
  - 响应式，当状态变更时，UI会自动更新。
  - 性能好，快速渲染
  - 高度封装组件，函数式声明，
- 2013年React 正式开源，在2013 JSConf 上 Jordan Walke介绍了这款全新的框架：React
- 2014年 - 今天 生态大爆发，各种围绕React的新工具/新框架开始涌现

## React设计思路

### UI编程痛点

1. 当状态更新时，UI不会自动更新，需要**手动地调用DOM**进行更新。
2. 欠缺基本的代码层面的**封装**和**隔离**，代码层面没有**组件化**。
3. UI之间的数据依赖关系，需要手动维护，如果依赖链路长．则会遇到“Callback Hell”（回调地狱）。

### 响应式与转换式

转换式系统：给定**输入**求解**输出**，如编译器、数值计算

响应式系统：监听事件，消息驱动，如监控系统、UI界面

事件 -> 执行既定的回调 ->  状态变更 -> UI更新

### 响应式编程和组件化

那么我们就希望解决以上痛点：

- 状态更新，UI自动更新。
- 前端代码组件化,可复用，可封装。
- 状态之间的互相依赖关系，只需声明即可。

![image.png](https://backblaze.cosine.ren/juejin/f0fb3eaa27394eb4a07ec92c11e62d3b~tplv-k3u1fbpfcp-watermark.png)

**组件化**

1. 组件一个是 原子组件/或组件的组合
2. 组件内部拥有状态，外部不可见
3. 父组件可将状态传入组件内部，来控制子组件的运转。

### 状态归属问题

**当前价格** 属于Root结点！因为要向下传递，这其实不合理，在下面的状态管理库里会讲到这个的解决方法。

状态应该归属于两个节点（或多个）向上寻找到的**最近共同祖先**。

思考：

1. React是单向数据流,还是双向数据流?

答：单向的，永远是只有父组件给子组件传东西，但这并不代表子组件不能改变父组件的状态。

2. 如何解决状态不合理上升的问题?

答：通过状态管理库，接下来也会讲到。

3. 组件的状态改变后，如何更新DOM?

答：讲解React实现中会提到。

组件设计：

- 组件声明了状态和UI的映射
- 组件有Props（外部）/State（内部）两种属性
  - Props接受父组件传入的状态
  - State是内部的属性。
- 可被其他组件组成

> ps：学过小程序的同学应该知道，小程序中的属性的双向绑定实际上应该也有用到了这个思想。

### 生命周期

挂载 -> 状态更新 -> 卸载

## React（hooks）的写法

关于React Hook可以参看官方文档，以下内容大部分摘自：[Hook 简介 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/hooks-intro.html)

> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### State Hook

```react
import React, {useState} from 'react';
function Example() {
 // 声明一个叫 “count” 的 state 变量。
 const [count, setCount] = useState(0);
    return (
        <div>
         <p>You clicked {count} times</p>
   <button onClick={() => setCount(count + 1)}>
          Click me
            </button>
        </div>
    );
}
```

上面这段函数用来显示一个计数器，当点击按钮时，计数器的值就会自动增加

> 在这里，`useState` 就是一个 *Hook* 。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。`useState` 会返回一对值：**当前状态**和**其更新函数**，你可以在事件处理函数中或其他一些地方调用这个函数。

> `useState` 唯一的参数就是初始 state。在上面的例子中，我们的计数器是从零开始的，所以初始 state 就是 `0`。值得注意的是，不同于 `this.state`，这里的 state 不一定要是一个对象 —— 如果你有需要，它也可以是。这个初始 state 参数只有在第一次渲染时会被用到。

> Hook 是一些可以让你在函数组件里 **“钩入”** React state 及生命周期等特性的函数。

可以在一个组件中多次使用 State Hook:

```react
function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

### Effect Hook

**函数副作用**是指当调用函数时，除了**返回值**之外，还会**对主调用函数产生其他附加的影响**。例如修改全局变量（函数外的变量）或修改参数。纯函数就是指没有函数副作用的函数，这在js那一节里都有讲过。

> 例如，下面这个组件在 React 更新 DOM 后会设置一个页面标题：

```react
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

> 当你调用 `useEffect` 时，就是在告诉 React 在 **完成对 DOM 的更改后运行你的“副作用”函数** 。由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。

### Hook的使用法则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 Hook。**不要**在**循环、条件判断或者子函数**中调用。
- 只能在 **React 的函数组件**中调用 Hook。**不要**在**其他 JavaScript 函数**中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中）

> 同时，我们提供了 [linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)来自动执行这些规则。这些规则乍看起来会有一些限制和令人困惑，但是要让 Hook 正常工作，它们至关重要。

以上是React官方文档的说法

## React的实现

三个问题：

1. [JSX](https://zh-hans.reactjs.org/docs/introducing-jsx.html#gatsby-focus-wrapper) 是不符合JS标准的语法
2. 返回的JSX改变时，如何更新DOM?
3. State/Props更新时， 要重新触发render函数

### Problem1

解决办法也很简单，就是将JSX转换为符合JS语法的

```react
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// 等价于 
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

### Problem2

返回的JSX本身是类似DOM的一种东西，但不是DOM，DOM操作本身是十分耗费性能的。所以需要将返回的JSX与原来的DOM结构计算一个diff（差别）？但是这个diff算法本身不能太耗时，尽可能小，尽可能短。

#### Virtual DOM （虚拟DOM）

[Virtual DOM](https://zh-hans.reactjs.org/docs/faq-internals.html#gatsby-focus-wrapper) 是一种用于与真实DOM同步，而在JS内存中维护的一个**对象**，它具有和DOM类似的树状结构并可以和DOM建立一一对应的关系。

>这种方式赋予了 React 声明式的 API：您告诉 React 希望让 UI 是什么状态，React 就确保 DOM 匹配该状态。这使您可以从属性操作、事件处理和手动 DOM 更新这些在构建应用程序时必要的操作中解放出来。

状态更新 -> diff 比对Virtual DOM和真实DOM - > Re-render Virtual DOM 改变我们的真实DOM

#### How to Diff??

更新次数少 <- 权衡 -> 计算速度快

完美的最小Diff算法，需要 O(n^3) 的复杂度

而牺牲理论最小Diff，换取时间，得到了 O(n)  复杂度的算法，他是局部最优的。Heuristic O(n) Algorithm （启发式算法）

- 不同类型的元素 -> 替换

- 同类型的DOM元素 -> 更新

- 同类型的组件元素 -> 递归

这个算法只遍历了一遍，就可以算出diff。

而这也是React一个弊病，一个组件发生改变时，其子组件全部会重新渲染。要解决这个问题，就要看接下来的React的状态管理库。

## React的状态管理库

### 核心思想

**将状态抽离到UI外部进行统一管理**，但是这是会降低组件的复用性，所以这一般出现在业务代码中。以下几种框架，用哪个都行

- [Redux中文文档](https://www.redux.org.cn/)
- [XState - JavaScript State Machines and Statecharts](https://xstate.js.org/)
- [MobX 介绍 · MobX 中文文档](https://cn.mobx.js.org/)
- [Recoil 中文文档 | Recoil 中文网 (recoiljs.cn)](https://www.recoiljs.cn/)

### 状态机

收到外部事件后根据当前状态，迁移到下一个状态。

哪些状态适合放到状态管理库？

- 可能会被很多层级的组件用到的状态

## 应用级框架科普

React本身是没有提供足够多的工程能力，如路由、页面配置等等。

- [Next.js - React 应用开发框架](https://www.nextjs.cn/) 硅谷明星创业公司Vercel的 React开发框架,稳定,开发体验好，支持Unbundled Dev,sWC等,其同样有Serverless一键部署平台帮助开发者快速完成部署。口号是"Let's Make Web Faster"
- [Modern.js - 现代 Web 工程体系 (modernjs.dev)](https://modernjs.dev/) 字节跳动Web Infra团队研发的全栈开发框架,内瓷了很多开箱即用的能力与最佳实践，可以减少很多调研选择工具的时间。
- [Get Started with Blitz (blitzjs.com)](https://blitzjs.com/docs/get-started)无API思想的全栈开发框架,开发过程中无需写API 调用与CRUD逻辑,适合前后端紧密小团队项目。

## 课后作业

1. React组件的render函数，在哪些时机下，会被重新执行?
2. React这种函数式编程,和vue这种基于模版语法的前端框架，各有什么优点和缺点?
3. React推荐使用组合来进行组件的复用,而不是继承，背后有什么样的考虑?

个人理解

## 总结感想

本节课大致介绍了React及其原理，介绍了组件化、一些应用级框架

> 本文引用的内容大部分来自牛岱老师的课，以及React官方文档

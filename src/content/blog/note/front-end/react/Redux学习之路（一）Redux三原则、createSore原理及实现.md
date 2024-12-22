---
title: Redux学习之路（一）Redux三原则、createSore原理及实现
link: redux-learning-1
catalog: true
lang: cn
subtitle: Redux三原则、Reducer、getState、dispatch、subscribe原理及实现
date: 2022-02-15 21:13:52
cover: img/header_img/93604793_p0.jpg
tags:
- 前端
- Redux
categories:
- [笔记, 前端, React]
---

开新坑……记录一下学习使用Redux的历程，主要来自[Redux 中文官网](https://cn.redux.js.org/introduction/getting-started)、[Redux入门系列视频](https://app.egghead.io/courses/getting-started-with-redux)及其里面的教程里的[笔记和转录](https://github.com/tayiorbeii/egghead.io_redux_course_notes)。

包括了Redux三原则、Reducer、getState、dispatch、subscribe原理及实现

> 首先要明确一点，虽然 Redux 是一个很不错的管理状态工具，但还是要考虑下它是否适合你的场景。

> **不要仅仅因为有人说过应该使用 Redux 而使用，而是应该花一些时间来了解使用它的潜在好处和取舍**。

<!-- more -->

这篇文章是下面这个教学视频里的1-8期视频，阐述了Redux三原则和Redux中的Reducer、（getState、dispatch、subscribe）以及createStore的原理及实现，并且实现了一个简易的计数器。看完基本上对Redux就有了一个大致的了解

为什么学捏，主要是因为最近看的项目或多或少都有Redux的使用，~~不学压根看不懂~~

> **Redux 入门 —— 系列视频**
> Redux 的创建者 Dan Abramov 在 30 个短片（2-5 分钟）中展示了各种概念。链接的 Github 仓库包含视频的笔记和转录。
> [Redux入门系列视频](https://app.egghead.io/courses/getting-started-with-redux)
> [笔记和转录](https://github.com/tayiorbeii/egghead.io_redux_course_notes)

# 简介

什么是Redux

> Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。
>
> 可以让你开发出行为稳定可预测的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供超爽的开发体验，比如有一个时间旅行调试器可以编辑后实时预览。
>
> Redux 除了和 React 一起用外，还支持其它界面库。它体小精悍（只有2kB，包括依赖），却有很强大的插件扩展生态。

## 什么需要使用 Redux

首先要明确一点，虽然 Redux 是一个很不错的管理状态工具，但还是要考虑下它是否适合你的场景。**不要仅仅因为有人说过应该使用 Redux 而使用 - 应该花一些时间来了解使用它的潜在好处和取舍**。

当在自己的项目中遇到如下问题时，建议开始使用 Redux：

- 你有很多数据**随时间而变化**
- 你希望状态有一个**唯一确定的来源**（single source of truth）
- 你发现将所有状态放在顶层组件中管理已不可维护

# Redux 三原则

## 原则1：单一不可变状态树

[Redux: The Single Immutable State Tree from @dan_abramov on @eggheadio](https://app.egghead.io/lessons/react-redux-the-single-immutable-state-tree?pl=fundamentals-of-redux-course-from-dan-abramov-bd5cc867)

单一不可变状态树（The Single Immutable State Tree），注意几个关键词：**单一**、**不可变**、**状态树**。

Redux的第一个原则就是：**应用程序的整个状态将由一个JavaScript对象来表示**，无论这个应用是简单的小应用还是拥有大量UI和状态变化的复杂应用程序。而这个JavaScript对象就称之为状态树。

这是一个Todo应用程序中可能具备的状态：

```js
"current_state:"
[object Object] {
  todos: [[object Object] {
    completed: true,
    id: 0,
    text: "hey",
  }, [object Object] {
    completed: false,
    id: 1,
    text: "ho",
  }],
  visibilityFilter: "SHOW_ACTIVE"
}
```

## 原则2：状态树只读

[Redux: Describing State Changes with Actions from @dan_abramov on @eggheadio](https://app.egghead.io/lessons/react-redux-describing-state-changes-with-actions?pl=fundamentals-of-redux-course-from-dan-abramov-bd5cc867)

Redux 的第二个原则是**状态树是只读的**。我们是没有办法直接修改或写入它的，只能通过**“发起Action”**这个行为来对其进行修改。

Action是描述更改的一个普通JS对象，它是对该数据所做的更改的最小表示形式，它的结构完全取决于我们自己，唯一的要求是他必须有一个绑定的属性type，（通常使用字符串，因为它是可序列化的）。

### dispatch an action

例如：Todo应用程序中，显示Todo的组建并不知道如何将项目添加到列表中，他们知道的只是他们需要分派（dispatch）一个action，它具有一个类型type:"add todo"，以及一个todo的文本和一个序号。

如果切换一个任务，同样，组件不知道它是怎么发生的。他们所需要做的就是分派一个具有type的action，切换todo，并传入想要切换到的todo的ID。

如上可以看出，状态是只读的，并且**只能通过dispatch操作**进行修改。

## 原则3：要描述状态变化，必须编写一个纯函数（Reducer）

[Redux: Pure and Impure Functions | egghead.io](https://egghead.io/lessons/react-redux-pure-and-impure-functions)

[Redux: The Reducer Function | egghead.io](https://egghead.io/lessons/react-redux-the-reducer-function)

而Redux的第三个原则就是：要描述状态变化，必须编写一个纯函数，该纯函数采用应用的**先前状态（previous state）**和**发起的action（the action being dispatched）**，然后**返回**应用的**下一个状态（next state ）**。而这个纯函数称为**Reducer**。

### 理解纯函数与非纯函数

首先我们要理解什么是纯函数/非纯函数，因为Redux有时候需要我们编写纯函数。

在之前的博客里也提到过：[【第二届青训营-寒假前端场】- 「跟着月影学 JavaScript」笔记](https://ysx.cosine.ren/cn/js-learning/#思考)，这里再重温一遍。

> 纯函数是指**一个函数的返回结果只依赖于它的参数**，并且在**执行过程中没有任何副作用**，这也意味着，它不会对外界产生任何影响。

可以非常确定的说，使用相同的参数集调用纯函数，将得到相同的返回值。他们是**可预测**的。

此外，纯函数不会修改传递给它们的值。例如，接受数组的squareAll函数不会覆盖此数组内的项。相反，它通过使用项目映射返回一个新的数组。

纯函数示例：

```js
function square(x) {
    return x*x;
}
function squareAll(items) {
    return items.map(square); // 注意，这里是生成了一个新的数组而非直接return items
}
```

非纯函数示例：

```js
function square(x) {
  updateXInDatabase(x); // 对数据库中的x也产生了影响
  return x * x;
}
function squareAll(items) {
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i]); // 并且直接修改了items...
  }
}
```

之前在学习React的时候就了解过了，不可变这个概念，对于很多场景下都有帮助，如React官方文档井字棋实现中的 [时间旅行](https://react.docschina.org/tutorial/tutorial.html#implementing-time-travel) 功能，倘若每一步都在原来的对象上进行变换，撤销等工作就会变得非常复杂。

### Reducer

> React 开创了这样一种观点：**当 UI 层被描述为应用程序状态的纯函数时，它是最可预测的。**
>
> Redux 用另一个想法补充了这种方法：应用中的状态突变必须由纯函数描述，该函数采用上一个状态和正在调度的操作，并返回应用程序的下一个状态。

即使在大型应用程序中，仍然只需要一个函数来计算应用程序的新状态。它根据整个应用程序的先前状态和正在调度的操作来执行此操作。

但是，这个操作不一定很慢。如果状态的某些部分没有更改，则其引用可以保持原样。这就是使Redux快速的原因。

下面是[一个完整示例](https://embed.plnkr.co/github/eggheadio-projects/getting-started-with-redux/master/04-javascript-redux-the-reducer-function?show=script,preview)

#### 初始状态

初始state中，todos为空，过滤器为显示全部

![请添加图片描述](https://img-blog.csdnimg.cn/f822113c342e41ab9cd838fdc131528e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 添加Todo

变化如图： 一开始的state中，todos没有内容，过滤器为显示全部。发起action之后的state中todos多了个todo，过滤视图未变化

![请添加图片描述](https://img-blog.csdnimg.cn/4a14f3babf634389b4e04739d2a0c6a3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 完成Todo

点击一个todo将其置为完成，可以看到发起这个action的时候，todos的文本没有变化，状态complete被置为完成了……
![请添加图片描述](https://img-blog.csdnimg.cn/54b8c98b25bc437e8ba0ada524b49667.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 更改过滤视图

再添加一个todo后点击过滤器Active，观察前后state，可以发现，只是visibilityFilter状态由"SHOW_ALL"改变为"SHOW_ACTIVE"了，todos的内容还是没有变化的（abcd并没有被删掉）

![请添加图片描述](https://img-blog.csdnimg.cn/49e77e2ac6974684b4952b259a39f803.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)

# 编写一个带有测试的计数器Reducer

[Redux: Writing a Counter Reducer with Tests | egghead.io](https://egghead.io/lessons/react-redux-writing-a-counter-reducer-with-tests)

我们要编写的第一个函数是针对计数器示例的减速器。我们还将使用 [`expect`](https://jestjs.io/docs/expect) 来进行断言。

[eggheadio-projects/getting-started-with-redux: null - Plunker (plnkr.co)](https://embed.plnkr.co/github/eggheadio-projects/getting-started-with-redux/master/05-react-redux-writing-a-counter-reducer-with-tests?show=script,preview)

```js
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect(
  counter(1, { type: 'SOMETHING_ELSE' }) 
).toEqual(1);

expect(
  counter(undefined, {})
).toEqual(0);

```

如上，counter这个Reducer设置了两个可识别的type（INCREMENT、DECREMENT），分别表示计数+1，-1。在写入Reducer时，如果传入的 `state` 是未定义的，则需要返回一个表示初始状态的对象（initstate）。在这个计数器的例子中，我们返回0，因为我们的计数从 `0` 开始。如果传入的 `action` **不是Reducer所能识别的**（SOMETHING_ELSE），我们**只返回当前`state`**。

# 存储方法：getState()、dispatch()和subscribe()

[Redux: Store Methods: getState(), dispatch(), and subscribe() | egghead.io](https://egghead.io/lessons/react-redux-store-methods-getstate-dispatch-and-subscribe)

本节使用了Redux中内置的函数。我们使用ES6析构语法引入了[`createStore`](https://cn.redux.js.org/api/createstore).

```js
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const { createStore } = Redux; // Redux CDN import syntax
// import { createStore } from 'redux' // npm module syntax

const store = createStore(counter);
```

> [`createStore`](https://cn.redux.js.org/api/createstore) 创建一个 Redux [store](https://cn.redux.js.org/api/store) 来以存放应用中所有的 state。**应用中应有且仅有一个 store**。
>
> **参数**
>
> 1. **`reducer` *(Function)*:** 接收两个参数，分别是**当前的 state 树和要处理的 [action](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#action)**，**返回新的 [state 树](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#state)。**
> 2. **[`preloadedState`] *(any)*: 初始时的 state**。 在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 [`combineReducers`](https://cn.redux.js.org/api/combinereducers) 创建 `reducer`，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 `reducer` 可理解的内容。
> 3. **`enhancer` *(Function)*: Store enhancer**，可选。可以用第三方第能力如中间价、时间旅行、持久化来增强 store。是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。Redux 中唯一内置的 store enhander 是 [`applyMiddleware()`](https://cn.redux.js.org/api/applymiddleware)。
>
> **返回值**
>
> ([*`Store`*](https://cn.redux.js.org/api/store)): 保存了应用所有 state 的对象。改变 state 的惟一方法是 [dispatch](https://cn.redux.js.org/api/store#dispatchaction) action。你也可以 [subscribe 监听](https://cn.redux.js.org/api/store#subscribelistener) state 的变化，然后更新 UI。

`createStore`所创建的`store`有3个重要方法

## getState() 获取状态

[`getState()`](https://cn.redux.js.org/api/store/#getstate)检索 Redux 存储的**当前状态**。返回应用当前的 state 树。它与 store 的最后一个 reducer 返回值相同。

## dispatch() 调度，发起action

[`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction) 是最常用的。分发 action。这是**触发 state 变化的惟一途径**。

它将使用当前 `getState()`的结果和传入的 `action` 以**同步方式**调用 store 的 reduce 函数。**它的返回值会被作为下一个 state**。从现在开始，这就成为了 [`getState()`](https://cn.redux.js.org/api/store/#getstate) 的返回值，同时**变化监听器(change listener)会被触发**。

## subscribe() 注册

添加一个**变化监听器**。**每当 dispatch action 的时候就会执行**，state 树中的一部分**可能**已经变化。可以在回调函数里调用 [`getState()`](https://cn.redux.js.org/api/store/#getstate) 来拿到当前 state。

你可以在变化监听器里面进行 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction)，但你需要注意下面的事项：

1. 监听器调用 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction) 仅仅应当发生在**响应用户的 actions** 或者**特殊的条件**限制下（比如： 在 store 有一个特殊的字段时 dispatch action）。虽然没有任何条件去调用 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction) 在技术上是可行的，但是**随着每次 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction) 改变 store 可能会导致陷入无穷的循环。**
2. 订阅器（subscriptions） 在**每次 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction) 调用之前都会保存一份快照**。当你在正在调用监听器（listener）的时候订阅(subscribe)或者去掉订阅（unsubscribe），**对当前的 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction) 不会有任何影响**。但是对于下一次的 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction)，无论嵌套与否，都会**使用订阅列表里最近的一次快照。**
3. 订阅器不应该注意到所有 state 的变化，在订阅器被调用之前，往往由于嵌套的 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction) 导致 state 发生多次的改变。**保证所有的监听器都注册在 [`dispatch()`](https://cn.redux.js.org/api/store/#dispatchaction) 启动之前**，这样，在调用监听器的时候就会传入监听器所存在时间里最新的一次 state。

这是一个底层 API。多数情况下，你不会直接使用它，会使用一些 React（或其它库）的绑定。如果你想让回调函数执行的时候使用当前的 state，你可以 [写一个定制的 `observeStore` 工具](https://github.com/rackt/redux/issues/303#issuecomment-125184409)。 `Store` 也是一个 [`Observable`](https://github.com/zenparsing/es-observable)， 所以你可以使用 [RxJS](https://github.com/ReactiveX/RxJS) 的这样的库来 `subscribe` 订阅更新。

如果需要解绑这个变化监听器，执行 `subscribe` 返回的函数即可。

```js
// ... `counter` reducer as above ...

const { createStore } = Redux;
const store = createStore(counter);

store.subscribe(() => {
  document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
    store.dispatch({ type : 'INCREMENT' })
});
```

按照以上方法的话，初始状态不会被更新，因为渲染发生在subscribe的回调之后，而经过补救过后：

```js
const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render(); // 先调用一次来渲染初始状态0, 之后的渲染则在每次dispatch之后

document.addEventListener('click', () => {
    store.dispatch({ type : 'INCREMENT' })
});
```

上面的官网摘下来的文档看似很难理解，看看接下来的简易实现就能理解了。

# 实现一个简易版的createStore~

[Redux: Implementing Store from Scratch | egghead.io](https://egghead.io/lessons/react-redux-implementing-store-from-scratch)

 在前面的学习中，我们研究了如何使用`createStore()`，但是为了更好理解它，让我们从头开始编写它！

首先复盘前面的案例，我们知道

- `createStore`函数接收一个`reducer`函数，这个reducer函数返回当前state，会被内部的`dispatch`函数所调用

- `createStore`函数创建出来的store需要拥有两个变量：
  - `state` 当前状态，它是一个JavaScript对象，
  - `listeners` 监听器数组，它是一个函数数组对象

- `createStore`函数创建出来的store需要拥有这三个方法：`getState`，`dispatch`和`subscribe`
  - `getState` 方法返回当前state
  - `dispatch` 函数是更改内部state的唯一方法，它传入一个action，通过将内部的当前state和action传入`reducer`函数（createStore的入参）来计算新的state。更新后，我们通知每个变化监听器（通过调用它们） dispatch
  - `subscribe` 传入一个listener函数作为参数，将其放入内部的listener数组，为了取消订阅事件监听器，`subscribe`需要返回一个函数， **调用这个返回的函数就可以取消监听**，这个函数内部通过[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)将listeners数组赋值为一个新的监听器数组（去除了与当前监听相同引用后返回的新监听器数组）。`subscribe`
  - 在返回`store`时，我们需要要填充初始状态。我们要分派一个假的 `action` 来让 `reducer` 返回初始值。

```js
const createStore = (reducer) => { // 返回 store，可以调用getState、dispatch、subscribe
 let state; 
    let listeners = [];
    const getState = () => state;   // 外部可以通过调用getState获取当前state

    const dispatch = (action) => {
        state = reducer(state, action); // 因为reducer是纯函数，所以每次返回的state不会修改原先的state~
        listeners.forEach(listener => listener());     // 在dispatch事件中，调用reducer成功后调用监听器们~
    }

    const subscribe = (listener) => {   // 添加监听！
        listeners.push(listener);
        return () => {      // 为了能够取消监听器，返回一个函数
            listeners = listeners.filter(l => l !== listener);
        }
    }

    dispatch({});   // 为了让state有一个初始状态！

    return { getState, dispatch, subscribe };
};
```

# 改进计数器

[Redux: Implementing Store from Scratch | egghead.io](https://egghead.io/lessons/react-redux-react-counter-example)

改进后示例：[Counter (cos)](https://codepen.io/yusixian/pen/ExbwLro?editors=0010)

在上文我们实现了一个计数器的Reducer，在这里我们改进一下，用React实际的将其渲染出来

## 编写Counter组件

编写一个Counter组件，该组件是一个"哑"组件（dump component）。它**不包含任何业务逻辑**。

> **哑组件仅指定如何将当前状态呈现到输出中，以及如何将通过 prop 传递的回调函数绑定到事件处理程序。**

```jsx
// Counter 组件
const Counter = ({
  value,
  onIncrement,
  onDecrement,
  onElse
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    <button onClick={onElse}>else</button>
  </div>
);
// 该组件的渲染函数
const render = () => {
  console.log("render!");
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({
        type:'INCREMENT'
      })}
      onDecrement={() => store.dispatch({
        type:'DECREMENT'
      })}
      onElse={() => store.dispatch({
        type:'else'
      })}
      />, document.getElementById('root')
  );
}

```

当该哑组件呈现时，我们指定其值应该从Redux存储的当前状态中获取值。当用户按下一个按钮时，相应的action将被dispatch到Redux的store。

## 调用createStore、添加监听

 调用createStore创建一个store， 调用store.subscribe添加一个render监听器

```jsx
const counter = (state = 0, action) => {
  console.log("now state:", state);
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
} 
// store create with counter reducer
const { createStore } = Redux;
const store = createStore(counter);
store.subscribe(render);  // 添加监听，每次状态更新都会重新渲染
render();
```

reducer指定如何根据当前state和传入的action计算下一个state。 最后，我们订阅store（传入render函数），这样render函数在每次调用dispatch改变state时运行。

> ps:原文这里是 "Finally, we subscribe to the Redux store so our `render()` function runs any time the state changes so our `Counter` gets the current state." 说是每当state变化时触发render，根据上文createStore的实现来说感觉不准确，state就算值没变化也会触发，每次dispatch即发送action时都会render，实际试了试也是这样的（也许可以理解为，Redux要求每次dispatch都有改变状态的意图，后面视频要是有提到的话我再回来勘误）
>
> [Redux： React Counter example |egghead.io](https://egghead.io/lessons/react-redux-react-counter-example)

## 查看过程

通过下面的例子了解一下这个过程：

运行试试：[Counter (cos)](https://codepen.io/yusixian/pen/ExbwLro?editors=0010)

### 初始值

一开始什么都不做，可以看到createStore的时候就进行了一次dispatch，通过reducer（即counter函数）将state置为初始值0后进行了一次渲染。（注意）

![请添加图片描述](https://img-blog.csdnimg.cn/9b113a7febad4ad2bb8341e8223b1ec2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_14,color_FFFFFF,t_70,g_se,x_16)

### 增加计数

点一下+，发现又调用了一次render

![请添加图片描述](https://img-blog.csdnimg.cn/5c0284c69db64293870f69de2bf01b12.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_19,color_FFFFFF,t_70,g_se,x_16)

### else

点了好几次else之后，发现每次都会重新渲染，但是state的值看起来似乎没变，而且组件表面上看也没有变化
![请添加图片描述](https://img-blog.csdnimg.cn/1b350d01bf9849cface43da5551098a4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_16,color_FFFFFF,t_70,g_se,x_16)

# 总结

首先要明确一点，虽然 Redux 是一个很不错的管理状态工具，但还是要考虑下它是否适合你的场景。

- **不要仅仅因为有人说过应该使用 Redux 而使用，而是应该花一些时间来了解使用它的潜在好处和取舍**。

看完这1-8期视频，基本上了解了Redux什么时候用比较好与它的缺点，了解了Redux三原则和Redux中的Reducer、（getState、dispatch、subscribe）以及createStore的原理及实现，并且实现了一个极其简易的计数器（顺带知道了哑组件是啥）。

Redux三原则：

- 应用程序的**整个状态**将由一个JavaScript对象来表示，而这个JavaScript对象就称之为**状态树**。
- **状态树是只读的**。没办法直接修改或写入，只能通过**“发起Action”**这个行为来间接对其进行修改。
- 描述状态变化必须编写一个纯函数，采用应用的**先前状态state**和**发起的action**，然后**返回**应用的**下一个state（next state ）**。而这个纯函数称为**Reducer**。

`createStore`函数接收一个`reducer`函数，这个`Reducer`函数返回当前state，会被内部的`dispatch`函数所调用

- `createStore`函数创建出来的store需要拥有两个变量：
  - `state` 当前状态，它是一个JavaScript对象，
  - `listeners` 监听器数组，它是一个函数数组对象

- `createStore`函数创建出来的store还需要拥有这三个方法：`getState`，`dispatch` 和`subscribe`

  - `getState` 方法返回当前state
  - `dispatch` 函数传入一个action，通过将内部的当前state和action传入`reducer`函数（createStore的入参）来计算新的state。更新后，我们通知每个变化监听器（通过调用它们） dispatch
  - `subscribe` 传入一个listener函数作为参数，将其放入内部的listener数组，为了取消订阅事件监听器，`subscribe`需要返回一个函数， **调用这个返回的函数就可以取消监听**，这个函数内部通过[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)将listeners数组赋值为一个新的监听器数组（去除了与当前监听相同引用后返回的新监听器数组）。`subscribe`
  - 在返回`store`时，我们需要要填充初始状态。我们要分派一个假的 `action` 来让 `reducer` 返回初始值。

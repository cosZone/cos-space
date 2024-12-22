---
title: 青训营 |「跟着月影学 JavaScript」笔记
link: note/front-end/bytedance-note/javascript-learing
catalog: true
date: 2022-01-17 14:30:17
subtitle: 面向对象的设计、高阶函数（节流、防抖、批处理、可迭代化）
lang: cn
tags:
- 前端
- JavaScript
- 纯函数
categories:
- [笔记, 青训营笔记]
---

这节课是由月影老师讲的，干货满满，包括了面向对象的设计、组件封装、高阶函数（节流、防抖、批处理、可迭代化）

# 本堂课重点内容

## 写好js的原则

### 各司其责

举个栗子：写一段JS，控制一个网页，让他支持浅色/深色两种模式。你会怎么做呢？

我的第一反应：写一个深色类，在切换按钮事件进行切换。这也是课件里讲的第二版。

- 第一版 直接切换样式，不妥，但能用

```js
const btn = document.getElementById('modeBtn');
btn.addEventListener('click', (e) => {
  const body = document.body;
  if(e.target.innerHTML === '☀️') {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    e.target.innerHTML = '🌙';
  } else {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    e.target.innerHTML = '☀️';
  }
});
```

- 第二版 封装了深色类

```js
const btn = document.getElementById('modeBtn');
btn.addEventListener('click', (e) => {
  const body = document.body;
  if(body.className !== 'night') {
    body.className = 'nignt';
  } else {
    body.className = '';
  }
});
```

- 第三版 既然是**完全的展示行为**，那么可以完全由html和css实现

  将切换作为一个type为 [`checkbox`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/checkbox) 控件，id为 `modeCheckBox`，使用 `label` 标签的 [`for`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label#attr-for) 控件，id为 `modeCheckBox`，使用 `label` 标签的 [`for`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label#attr-for) 属性将其关联到这个控件，再把checkbox隐藏掉即可实现点击切换模式。![image-20220117144502775.png](https://backblaze.cosine.ren/juejin/4575ccd15ded4293bc8e7dbf2c6e6bb0~tplv-k3u1fbpfcp-watermark.png)

  "~~只要不写代码就不会有bug~~" ，这也是各司其责的一种体现。

总结：需要避免不必要的由js直接操作样式，可以用class来表示状态，而纯展示类的交互寻求零JS方案。版本2也是有其好处的，如适应性是不一定有版本3的好的。

### 组件封装

组件是指web页面上抽出来的一个个包含模板(HTML)、功能（JS）和样式（CSS）的单元，好的组件具备封装性、正确性、扩展性和复用性。虽然现在由于有很多优秀的组件存在，往往我们不需要去自己设计一个组件，但我们也要去试着了解他们的实现。

举个栗子：用原生JS写一个电商网站的轮播图，应该怎么实现？

- 结构：HTML中的无序列表（ `<ul>` ）
  - 轮播图是典型的列表结构，可以用无序列表 `<ul>` 元素来实现，每个图放在一个li标签中。

- 表现：CSS 绝对定位
  - 使用CSS的绝对定位，将图片重叠在一个位置
  - 切换状态使用修饰符（modifier）
    - selected
  - 轮播图切换动画使用CSS  [`transition`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition) 实现
- 行为：JS
  - API设计应保证原子操作，职责单一，满足灵活性
    - ps：原子操作就是指 不可中断的一个或一系列操作，比如操作系统中的原语wait、read等。
  - 封装一些事件：getSelectedItem()、getSelectedItemIndex()、slidTo()、slideNext()、slidePrevious()……
  - 更进一步：控制流，使用自定义事件来进行解耦。

总结：组件封装需要注意其结构设计、展现效果、行为设计（API、Event等）是否达标

思考：如何来改进这个轮播图？

#### **重构1：插件化，解耦**

- 将控制元素抽取成一个个插件（左右小箭头、底下的四个小圆点）等等![image.png](https://backblaze.cosine.ren/juejin/71de521e581e4c4e82d9f6a312d2c638~tplv-k3u1fbpfcp-watermark.png)

- 插件与组件之间通过依赖注入方式建立联系、

  ![image.png](https://backblaze.cosine.ren/juejin/d148965ec0654ec3914515d835445368~tplv-k3u1fbpfcp-watermark.png)

这样的好处？组件的构造器做的工作就只是将组件们一一注册了，日后复用的时候不需要的组件直接将构造器注释掉即，无需关注其他的。

再进一步扩展？

#### 重构2：模板化

将html也模板化，做到只需一个 `<div class='slider‘></div>` 就能实现图片轮播，修改控制器的构造，传入图片列表。

#### 重构3：抽象化

将通用的组件模型，抽象出来一个组件类（Component），其他组件类通过继承该类并实现其render方法。

![image.png](https://backblaze.cosine.ren/juejin/d7805999b1dc4c5581483ac56a72e383~tplv-k3u1fbpfcp-watermark.png)

```js
class Component{
    constructor(id, opts = {name, data: []}) {
        this.container = document.getElementById(id);
        this.options = opts;
        this.container.innerHTML = this.render(opts.data);
    }
    registerPlugins(...plugins) { 
        plugins.forEach( plugin => {
            const pluginContainer = document.createElement( 'div');
            pluginContainer.className = `${name}__plugin`;
            pluginContainer.innerHTML = plugin.render(this.options.data);
            this.container.appendchild(pluginContainer);

            plugin.action(this);
        });
    }
    render(data) {
        /* abstract */
        return ''
    }
}
```

总结：

- 组件设计的原则——封装性、正确性、拓展性和复用性
- 实现步骤：结构设计、展现效果、行为设计
- 三次重构
  - 插件化
  - 模板化
  - 抽象化
- 改进：CSS模板化、父子组件的状态同步和消息通信等等

### 过程抽象

- 处理局部细节控制的一些方法

- 函数式编程思想的基础应用

  ![image.png](https://backblaze.cosine.ren/juejin/948dc7f6553a40c5b6fa717ce9fafaf4~tplv-k3u1fbpfcp-watermark.png)

#### 应用：操作次数限制

- 一些异步交互
- 一次性的HTTP请求

有这样一段代码，在每次点击时延时2s后移除该节点，但如果用户在该节点还没完全移除的时候又点了几次则会报错。

```js
const list = document.querySelector('ul');
const buttons = list.querySelectorAll('button');
buttons.forEach((button)=>{
    button.addEventListener('click', (evt) => {
        const target = evt.target;
        target.parentNode.className = 'completed';
        setTimeout(()=>{
            list.removeChild(target.parentNode);
        },2000);
    })
});
```

   而这个操作次数的限制，则可以抽象出来一个高级函数

```js
function once(fn) {
    return function(...args) {
        if(fn) {
            const ret = fn.apply(this, args);
            fn = null;
            return ret;
        }
    }
}
const list = document.querySelector('ul');
const buttons = list.querySelectorAll('button');
buttons.forEach((button)=>{
    button.addEventListener('click', once((evt) => {
        const target = evt.target;
        target.parentNode.className = 'completed';
        setTimeout(()=>{
            list.removeChild(target.parentNode);
        },2000);
    }))
});
```

如代码中显示的那样，这个函数once接受一个函数，返回的也是一个函数，判断接受的函数是否为null，若不为null则执行这个函数并返回其结果，若接受的函数为null则返回一个不进行任何操作的函数。click事件注册的实际上是once返回的函数，这样再怎么点击也不会报错了。

> ps：好精彩的应用例子！

为了让 ”只执行一次“ 这个需求覆盖不同的事件处理，将这个需求剥离出来，这个过程就称之为 **过程抽象**

## 高阶函数

- 以函数作为参数
- 以函数作为返回值
- 常用于作为 **函数装饰器**

```js
funtion HOF(fn) {
    return function(...args) {
        return fn.apply(this, args);
    }
}
```

### 常用高阶函数

#### Once 只执行一次

前文讲过，这里不再阐述

#### Throttle 节流

为函数添加一个间隔time，每隔time事件调用一次函数，节省其需求，比如某个事件很容易持续的发生（如鼠标移上去就触发），那么他会一直速度特别快的调用这个事件函数，这个时候为其加一个节流函数则可以防止崩溃节约流量。

```js
function throttle(fn, time = 500) {
    let timer;
    return function(...args) {
        if(!timer) {
            fn.apply(this, args);
            timer = setTimeout(() => {
                timer = null;
            }, time);
        }
    }
}
btn.onclick = throttle(function(e){
    /* 事件处理 */
    circle.innerHTML = parseInt(circle.innerHTML)+1;
    circle.className = 'fade';
    setTimeout(() => circle.className = '', 250);
});
```

对原始的函数进行包装，没有timer的话就注册一个timer，500ms后取消，因为在这500ms中这个timer都还存在，所以不会去执行函数（或者说执行空函数），500ms后timer取消了，函数就可以被调用执行了。

#### Debounce 防抖

在上面的节流中，timer存在期间是不会去执行函数，而防抖是在每次事件一开始的时候清空timer，然后设置timer为dur，当事件调用dur时间并且没有新的事件再次调用时（比如鼠标移动后悬停一段时间），函数就可以被调用执行了。

```js
function debounce(fn, dur) {
    dur = dur || 100;   // dur若不存在则设置dur为100ms
    var timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, dur);
    }
}
```

#### Consumer

这是将一个函数变成类似setTimeout这样的异步操作的函数，如调用了很多次某事件，将这些事件丢到一个列表中，按设定好的时间隔一段时间并执行返回其结果。先来看代码：

```js
function consumer(fn, time) {
    let tasks = [],
        timer;
    return function (...args) {
        tasks.push(fn.bind(this, ...args));
        if(timer == null) {
            timer = setInterval(() => {
                tasks.shift().call(this);
                if(tasks.length <= 0) {
                    clearInterval(timer);
                    timer = null;
                }
            }, time);
        }
    }
}
btn.onclick = consumer((evt) => {
    /*
     * 事件处理 如每次调用了很多次某事件，将这些事件丢到
     * 一个列表中，按设定好的时间隔一段时间并执行返回其结果。 
     */
    let t = parseInt(count.innerHTML.slice(1)) + 1;
    count.className = 'hit';
    let r = t * 7 % 256,
        g = t * 17  % 128,
        b = t * 31  % 128;
    count.style.color = `rgb(${r}, ${g}, ${b})`.trim();
    setTimeout(() => {
        count.className = 'hide';
    }, 500);
}, 800);
```

这里的事件处理实现了点击按钮时执行这个不断显示+count并在500ms后渐隐，而快速点击时，则将这个点击事件存储到是事件列表中每隔800ms执行（不然上一个+count还未消失）。

要弄明白函数原理，得从其中的bind函数和shift函数和call说起：

> [`bind()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

> [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) 方法从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。与之相反的则是 [`unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) 插入第一个元素。
>
> 与之相似的一对方法还有，[`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) 和 [`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) ，他们作用于数组最后一个元素

> [`call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

那么不难看出上面这个函数的用途，将每次准备调用的函数放入tasks列表中，若定时器为空则设置一个定时器执行内容 `定时执行tasks出队，若全部tasks已经清空（当前没有任务了）则将定时器清除` ，若定时器不为空则不做操作（但放到tasks列表中了）。

#### Iterative

将一个函数，变成可迭代使用的的，这通常用于一个函数要给一组对象执行批量操作的时候。如批量设置颜色，代码如下：

```js
const isIterable = obj => obj != null && typeof obj[Symbol.iterator] === 'function';
function iterative(fn) {
    return function(subject, ...rest) {
        if(isIterable(subject)) {
            const ret = [];
            for(let obj of subject) {
                ret.push(fn.apply(this, [obj, ...rest]));
            }
            return ret;
        }
        return fn.apply(this, [subject, ...rest]);
    }
}
const setColor = iterative((el, color) => {
    el.style.color = color;
})
const els = document.querySelectorAll('li:nth-child(2n+1)');
setColor(els, 'red');
```

#### Toggle

切换状态，也可以封装成一个高级函数，这样有多少种状态只要添加到里面就可以了。

例子：

```js
function toggle(...actions) {
    return function (...args) {
        let action = actions.shift();
        action.push(action);
        return action.apply(this, args);
    }
}
// 多少态都可以!
switcher.onclick = toggle(
    evt => evt.target.className = 'off',
    evt => evt.target.className = 'on'
);
```

#### 思考

为什么要使用高阶函数？

了解一个概念：**纯函数，是指一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用**

这也就意味着，纯函数是非常靠谱的，不会对外界产生影响。

- 方便进行单元测试！
- 减少系统中非纯函数的数量，从而使得系统可靠性增加

#### 其他一些思考

- 命令式与声明式，没有优劣之分
- 过程抽象 / HOF / 装饰器
- 命令式 / 声明式
- 代码风格、效率、质量的权衡。
  - 根据场景来权衡

## 总结感想

太牛了！！

看完这节课，收获非常多，实现一个真正意义上的组件原来需要这么多步骤，原来js也能实现如此面向对象的设计，结合之前学过的c++/java的设计模式，发现都是有共通之处的，一个组件可以向下细分为许许多多的子组件。后面的高阶函数更是知识盲区，原来js还能实现这些方法

> 本文引用的内容大部分来自月影老师的课以及MDN。

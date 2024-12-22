---
title: 前端面试之onclick与addEventListener区别详述
link: onclick-and-addeventlistener-difference
catalog: true
subtitle: 今天面试官问了这么一个问题：onClick与addEventListener有哪些区别呢
date: 2022-04-04 21:10:52
cover: img/header_img/galaxy-ngc-3190-wallpaper-for-2880x1800-60-653.jpg
tags:
- 前端
- 面试题
- JavaScript
categories:
- [笔记, 前端, JavaScript]
---

今天面试官问了这么一个问题：`onclick` 与 `addEventListener` 有哪些区别呢

很好问住了，自己答得不太满意，下来自己查了查红宝书第17章事件和MDN，大概了解了是怎么一回事

上来先把答案摆上：

# 区别

`addEventListener()` 是 W3C DOM 规范中提供的注册事件监听器的方法。它的优点包括：

- **允许给一个事件注册多个监听器**
  - 特别是在使用AJAX 库，JavaScript模块，或其他需要第三方库/插件的代码
- 提供了一种更精细的手段控制 `listener` 的触发阶段（可以选择捕获或者冒泡）
- 它对 **任何 DOM 元素** 都是有效的，而不仅仅只对 HTML 元素有效。
- 它注册的事件可以通过 [`removeEventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)来移除
  - 也就是说若添加的是匿名事件函数就无法移除了
- `this` 的值是触发事件的元素的引用
  - `console.log(e.currentTarget === this) // true`

而 `onclick` 是 [注册 `listener`的旧方法](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#older_way_to_register_event_listeners "Permalink to 注册 listener 的旧方法")

- 该方法会替换掉这个元素上所有已存在的onclick事件，其他on事件也是类似的。
- 无法精细控制冒泡与否等
- 移除可通过直接将onclick事件替换为null

## 兼容性

`addEventListener` 在DOM 2 [Events](https://www.w3.org/TR/DOM-Level-2-Events) 规范中引入

- 在IE 9之前，必须使用 `attachEvent` 而不是使用`addEventListener`
- `attachEvent`方法有个缺点，`this` 的值会变成 `window` 对象的引用而不是触发事件的元素

而 `onclick` 是 DOM 0 规范的基本内容

- **几乎所有浏览器都支持**，而且不需要特殊的跨浏览器兼容代码
- 因此通常这个方法被用于动态地注册事件处理器，除非必须使用 `addEventListener()` 才能提供的特殊特性

# [addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

> **EventTarget.addEventListener()** 方法将指定的监听器注册到 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 上，当该对象触发指定的事件时，指定的回调函数就会被执行。 事件目标可以是一个文档上的元素 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element),[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)和[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)或者任何其他支持事件的对象 (比如 `XMLHttpRequest`)`。`

>`addEventListener()`的工作原理是将实现[`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener)的函数或对象添加到调用它的[`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)上的指定事件类型的事件侦听器列表中。

`addEventListener` 中有三个参数，`type`、`listener` 和 `useCapture`，其中第一个参数为 [事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)（`click`、`mousemove` 等，第二个参数为事件的回调函数，第三个参数为一个指定有关 `listener` 属性的可选参数**对象**，需注意的是：
> 在旧版本的DOM的规定中， `addEventListener()`的第三个参数是一个布尔值表示是否在捕获阶段调用事件处理程序。随着时间的推移，很明显需要更多的选项。与其在方法之中添加更多参数（传递可选值将会变得异常复杂），倒不如把第三个参数改为一个包含了各种属性的对象，这些属性的值用来被配置删除事件侦听器的过程。\
> 因为旧版本的浏览器（以及一些相对不算古老的）仍然假定第三个参数是布尔值，你需要编写一些代码来有效地处理这种情况。你可以对每一个你感兴趣的options值进行特性检测。

也就是说，`addEventListener` 需要额外的代码来兼容旧浏览器，而onclick不需要，在要考虑兼容性的场景下就需要好好考虑。

## 事件中的this

`addEventListener` 中 `this` 的值通常情况下都是触发事件的元素的引用
    - `console.log(e.currentTarget === this) // true`

但是箭头函数不然，[箭头函数没有自己的this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，箭头函数只会从自己的作用域链的上一层继承 `this`

# [onclick](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onclick)

> 全局事件处理器（[`GlobalEventHandlers`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers)）的 **`onclick`** 属性，是处理当前元素的 [`click`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event "click") 事件的事件处理器（[event handler](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers)）。

> 当用户点击一个元素时，会触发 `click` 事件。在每次点击的整个过程中，`click` 事件的运行顺序在 [`mousedown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousedown_event "mousedown") 和 [`mouseup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseup_event "mouseup") 事件之后。

> **备注：**  当你使用 `click` 事件去触发一个动作时，也要考虑向 [`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event "keydown") 事件添加此动作，以便允许不使用鼠标或触摸屏的用户进行同样的操作。
MDN上讲的没那么详细，红宝书中对onclick的描述有很重要的几点

## 拓展作用域链

```javascript
<script> 
function showMessage() { 
    console.log("Hello world!"); 
} 
</script> 
<input type="button" value="Click Me" onclick="showMessage()"/> 
```

上面以`onclick`方式指定的事件处理程序会创建一个函数来封装属性的值。（**但是不建议这么做**，原因结尾有）

这个函数有一个特殊的局部变量 `event`，其中保存的就是 `event` 对象

```html
<!-- 输出"click" --> 
<input type="button" value="Click Me" onclick="console.log(event.type)"> 
```

有了这个对象，就不用开发者另外定义其他变量，也不用从包装函数的参数列表中去取了。 在这个函数中，`this` 值相当于事件的目标元素，如下面的例子所示：  

```html
<!-- 输出"Click Me" --> 
<input type="button" value="Click Me" onclick="console.log(this.value)"> 
```

这个动态创建的包装函数还有一个特别有意思的地方，就是**其作用域链被扩展**了。在这个函数中， `document` 和元素自身的成员都可以被当成局部变量来访问。而这是通过使用 `with` 实现的：

```javascript
function() { 
    with(document) { 
        with(this) { 
        // 属性值 
        } 
    } 
}
```

这也是为什么在onclick定义的事件，调用document上的事件时可以免去document前缀，实际上是它在前面还做了一层包装。

使用 HTML 指定onclick事件处理的一个问题是使 HTML 与 JavaScript 变得强耦合，如果需要修改事件处理程序，则必须在 HTML 和 JavaScript 中都进行修改，**不建议使用 HTML事件处理程序，而建议使用 JavaScript 指定事件处理程序的主要原因。**

也就是在js中，当真正需要使用onclick时，使用如下方式：

```javascript
let btn = document.getElementById("myBtn"); 
btn.onclick = function(e) { 
    console.log(e.type); // "click" 
};
```

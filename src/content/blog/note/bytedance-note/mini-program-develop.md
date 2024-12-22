---
title: 青训营 |「小程序技术全解」笔记
link: note/front-end/bytedance-note/mini-program-develop
catalog: true
date: 2022-01-30 14:30:17
subtitle: 讲解了小程序的发展历程和技术解析，并实现了一个简易的番茄钟小程序~
lang: cn
tags:
- 前端
- 小程序
- JavaScript
categories:
- [笔记, 青训营笔记]
---
终于到了我超期待的一门课~~

课程目标：

- 认识和了解小程序的业务产品价值
- 学习和掌握小程序相关技术原理

# 小程序的发展历程

## 发展历程

![image.png](https://backblaze.cosine.ren/juejin/8351c2bbcb5447849468f92d38fdf8e2~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/B1cc1fef439a46f2b9896883a2f390f6~Tplv-K3u1fbpfcp-Watermark.png)

## 核心数据

![image.png](https://backblaze.cosine.ren/juejin/D8a26b7b0fee4ea7b6284b5e65f51541~Tplv-K3u1fbpfcp-Watermark.png)

## 小程序生态

![image.png](https://backblaze.cosine.ren/juejin/69d41db65da44e10ba461a8dfb994d9c~tplv-k3u1fbpfcp-watermark.png)

# 业务价值

## 与WEB的区别

- 有着固定的语法以及统一的版本管理， 平台可以更**方便的进行审核**
- **平台能够控制各个入口**，如二维码，文章内嵌，端内分享。入口上也能带来更好的用户体验
- 小程序基于特殊的架构，在流畅度上比WEB更好，有**更优秀的跳转体验**

## 三大价值

### 渠道价值

- 便捷导流

由于小程序的便捷性，依托于超级平台，小程序能够充分为很多场景导流，如美团和美团优选微信小程序带来的流量占比分别是40%和80%

### 业务探索价值

- 快速试错

相比原生APP来说，小程序的开发难度和成本都降低的很多，这就创造了很多场景开发者能够用小程序来**快速试错**，不断探索新的业务价值

### 数字升级价值

- 容错空间大，覆盖范围广

线下到线上如何做？从轻消费类的快餐、茶饮到地产汽车等大宗消费，小程序都展示了良好的容错空间。线下场景的小程序覆盖范围很广。

# 小程序技术解析

## 小程序原理

第三方开发应用最简单最方便的方式？

- WebView + JSBridge
  - WebView：移动端提供的运行JavaScript的环境，相当于App内的浏览器页面
  - JSBridge：顾名思义，作为桥梁开发者可以调用App本身的一些api

几个问题：

- 无网络的情况体验不佳
- 网页切换体验不佳
- **如何管控保证安全**

而小程序通过以下方式，解决了这些问题：

- 开发门槛低——HTML+JS+CSS
- 接近原生的使用体验——资源加载 + 渲染 + 页面切换
- 安全管控——独立JS沙箱：隔绝操作dom的方式
  - 不操作DOM如何控制页面渲染？
  - Data -> 根据数据处理DOM -> 页面

![image.png](https://backblaze.cosine.ren/juejin/9395e25b321e44b1b78c0f9735d9a07d~Tplv-K3u1fbpfcp-Watermark.png)

## 小程序语法

![image.png](https://backblaze.cosine.ren/juejin/ca88825a4bdf46fbbe95df9a0b1f77cf~tplv-k3u1fbpfcp-watermark.png)

如图：比如字节小程序是TTML/JS/TTSS，而微信小程序则是WXML/JS/WXSS，对应HTML/JS/CSS

## 实现简易番茄时钟

下面试一试在微信小程序上实现如图一个番茄钟~（不同的小程序语法上大同小异）

[代码片段](https://developers.weixin.qq.com/s/XpqAlHm87owi)

![番茄钟.gif](https://backblaze.cosine.ren/juejin/B8ada35bb88143319ce17603de92c141~Tplv-K3u1fbpfcp-Watermark.gif)

### 编写tomatoClock.wxml（html）

简单的用html写个界面先~

```html
<view class="container">
  <view class="clock">{{timeText}}</view>
  <button wx:if="{{running}}" class="button" bindtap="onReset">重置</button>
  <button wx:else class="button" bindtap="onStart">开始</button>
</view>
```

{{timeText}} 实现页面与js中数据的**双向绑定**（该数据更新时页面也会进行渲染~）

### 编写tomatoClock.js

编写js进行事件函数、该页面数据的绑定

```js
// pages/apply/tomatoClock/tomatoClock.js
const DEFAULT_TIME = 25*60; // 25分钟
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const mText = `0${minutes}`.slice(-2);
  const sText = `0${seconds}`.slice(-2);
  return `${mText} : ${sText}`;
}
```

从后往前截断实现前导0补全，就可以展示两位数时间（学到了！）

然后是事件的处理，setTimer函数设置一个间隔1s的定时器，设置初始time为默认时间，每隔1s使得当前time-1(同时页面也会刷新)，onStart事件在开始时设置定时器并置running为true，onReset事件在重置时时清除定时器，设置running为false并将timeText设置为默认时间

```js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    timeText: formatTime(DEFAULT_TIME),
    running: false
  },
  setTimer:function() {
    this.timer = setInterval(() => {
      this.time = this.time - 1;
      if(this.time < 0) {
        clearInterval(this.timer);
        return;
      }
      this.setData({
        timeText: formatTime(this.time)
      })
    }, 1000);
  },
  // 事件函数 开始时设置定时器并置running为true
  onStart: function() {
    if(!this.timer) {
      this.time = DEFAULT_TIME;
      this.setTimer();
      this.setData({
        running: true
      })
    }
  },
  // 事件函数 重置时清除定时器，设置running为false并将timeText设置为默认时间
  onReset: function() {
    clearInterval(this.timer);
    this.timer = null;
    this.time = DEFAULT_TIME;
    this.setData({
      timeText: formatTime(DEFAULT_TIME),
      running: false
    });
  },
  // else 生命周期函数（监听页面加载、渲染等）
})
```

### 编写一点点wxss（css）

可以在app.wxss中，实现全局通用的css如container等

```css
/**app.wxss**/
page { background-color: #97ABFF; }
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 200rpx 0;
  box-sizing: border-box;
  background-color: #97ABFF;  
} 

```

在页面自己的css里(index.wxss)，写该页面所需的css~

```css
/**index.wxss**/
.clock {
  line-height: 400rpx;
  width: 400rpx;
  text-align: center;
  border-radius: 50%;
  border: 5px solid white;

  color: white;
  font-size: 50px;
  font-weight: bold;
}

.button {
  margin-top: 200rpx;
  text-align: center;
  border-radius: 10px;
  border: 3px solid white; 
  background-color: transparent;

  font-size: 25px;
  color: white;
  padding: 5px 10px;
}
```

# 相关拓展

什么是跨端框架？

- 复杂应用构建
- 一次开发可以跨多端（微信小程序、各系小程序等等）

## 跨端框架介绍

![image.png](https://backblaze.cosine.ren/juejin/f1de2849950d40598918c9d0d4299aff~tplv-k3u1fbpfcp-watermark.png)

## 跨端框架原理

### 编译时

#### AST 语法树

[抽象语法树 - 维基百科](https://zh.wikipedia.org/wiki/抽象語法樹)

> 在[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)中，**抽象语法树**（**A**bstract **S**yntax **T**ree，AST），或简称**语法树**（Syntax tree），是[源代码](https://zh.wikipedia.org/wiki/源代码)[语法](https://zh.wikipedia.org/wiki/语法学)结构的一种抽象表示。它以[树状](https://zh.wikipedia.org/wiki/树_(图论))的形式表现[编程语言](https://zh.wikipedia.org/wiki/编程语言)的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似于 `if-condition-then` 这样的条件跳转语句，可以使用带有三个分支的节点来表示。
>
> 和抽象语法树相对的是具体语法树（通常称作[分析树](https://zh.wikipedia.org/wiki/分析树)）。一般的，在源代码的翻译和[编译](https://zh.wikipedia.org/wiki/编译)过程中，[语法分析器](https://zh.wikipedia.org/wiki/語法分析器)创建出分析树，然后从分析树生成AST。一旦AST被创建出来，在后续的处理过程中，比如[语义分析](https://zh.wikipedia.org/wiki/语义分析)阶段，会添加一些信息。

![image.png](https://backblaze.cosine.ren/juejin/a563ebdd42444d7e9f722ae3e570e268~tplv-k3u1fbpfcp-watermark.png)

解析 -> 生成AST语法树 ->生成页面

![image.png](https://backblaze.cosine.ren/juejin/16a0e587d4f9463e8687ed7c3fddbd76~Tplv-K3u1fbpfcp-Watermark.png)

如：

```html
<View>{foo ? <View /> : <Text />}</View>
```

-> 转化为字节小程序的语法

```html
<view><block tt: if={foo}><view /></block><block tt:else><text /></block></view>
```

天然缺陷：无法**完全抹平差异**！

- 小程序本身是有很多限制的
- 所以大部分方案都是运行时方案

### 运行时

#### 虚拟DOM

本质为js中的一个对象，有很多dom中的属性值标签等，通过这个对象可以生成我们的实际DOM

#### Template组件

小程序中提供的动态生成的模板。

![image.png](https://backblaze.cosine.ren/juejin/C7eda62883404711b6b97dab0323c7ed~Tplv-K3u1fbpfcp-Watermark.png)

#### 运行时结构

![image.png](https://backblaze.cosine.ren/juejin/001298b57b23466a94e02a31bfb1c1ba~tplv-k3u1fbpfcp-watermark.png)

- 运行时的方案也不是完美的
- 在一些场景下相比原生小程序的语法性能会更差
- 大部分场景下都可！

# 总结感想

这节课大致讲解了小程序的发展历程和技术解析，实现了一个简易的番茄钟小程序~

> 本文引用的大部分内容来自张晓伟老师的课

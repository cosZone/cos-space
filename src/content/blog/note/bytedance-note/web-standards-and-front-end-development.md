---
title: 青训营 |「Web 标准与前端开发」
link: note/front-end/bytedance-note/web-standards-and-front-end-development
catalog: true
date: 2022-01-19 14:30:17
subtitle: 本节课主要讲了前端开发的历程、应用领域，推荐了前端的学习路线图，以及一些Web标准
lang: cn
tags:
- 前端
- JavaScript
- Web标准
- W3C
categories:
- [笔记, 青训营笔记]
---
## 关于前端开发

### 起源、架构、变迁

> "Suppose all the information stored on computers everywhere were linked. Suppose l could program my computer to create a space in which everything could be linked to everything."
>
> ——Tim Berners-Lee, inventor of the World Wide Web

“设想一下存储在计算机上的所有信息都是互相链接的。再设想一下我可以给我的电脑编程，并创建一个空间，让所有东西都可以互相链接。” 有点儿万物互联的感觉了

**Web于1989年初诞生**，起初的Web仅由三种技术构成

- HTML
- HTTP
- URL

而CSS和JavaScript是几年之后才出现的。

Web技术的变迁：

![image.png](https://backblaze.cosine.ren/juejin/58d7d580688b47b1a24fb357c3da429c~Tplv-K3u1fbpfcp-Zoom-1.png)

- 只读时代，客户端相当于一个静态的页面，想更新页面只能发送网络请求，无法在不刷新的情况下更新页面
- 体验时代，客户端实现了静态向动态的跨越，拥有了动态交互能力，在后台就可以通过js向服务器发送请求，通过修改DOM将更新的内容展示在网页中。当时的谷歌地图等都使用了这种技术。
- 敏捷时代，即现在的主流，用户的体验越来越受到重视，前端受到了重视，前端开发开始变得模块化、组件化，这个时代出现了React、Vue等知名框架，也出现了Webpack这类的打包工具。

### 前端应用的领域

**To Business 企业**

字节的火山引擎、公有云等等，表现为一个为企业提供许多种类的服务的网站，规模庞大也很赚钱的一个领域。

**To Customer 客户**

最早期的网页就是一个信息分享的作用，现在的直接触达客户的网站，包括电商平台、在线教育、手机端的H5等等，都是ToC的应用。

**To Develop 开发者**

提高Web开发效率的工具，代码编辑器等等。

**浏览器**

桌面浏览器：Chrome、FireFox、Edge等

移动浏览器：安卓、IOS

![image.png](https://backblaze.cosine.ren/juejin/8e140473202645999232469856fdca3c~Tplv-K3u1fbpfcp-Zoom-1.png)

**终端和跨端**

命令行/终端

- [Webpack CLI](https://webpack.docschina.org/api/cli/)
- [Babel CLI](https://www.babeljs.cn/docs/babel-cli)
- [Vue CLI](https://cli.vuejs.org/zh/guide/)
- [React CLI](https://create-react-app.dev/)

**桌面跨端**

- Electron
- NW.js

**移动跨端**

- React Native
- Flutter

### 语言、框架、工具

- 基本语言，~~这个图蚌埠住了~~ 这个图简洁明了，除了前端三大件之外，还有WebAssembly

![1.gif](https://backblaze.cosine.ren/juejin/C1c15977cef94ef4abde7098d511eda0~Tplv-K3u1fbpfcp-Zoom-1.gif)

- 框架

![image.png](https://backblaze.cosine.ren/juejin/9bbc3b8479ca415f92e9207abb9dbf8b~Tplv-K3u1fbpfcp-Zoom-1.png)

### 浏览器、网络、服务器

**浏览器** 推荐文章：

- 原文：共4个章节 [Inside look at modern web browser (part 1) | Web | Google Developers](https://developers.google.com/web/updates/2018/09/inside-browser-part1)
- 译文：[深入理解现代浏览器](https://blog.csdn.net/qiwoo_weekly/article/details/92808161)

![image.png](https://backblaze.cosine.ren/juejin/17e3df475b36424fa57685a2c7a761bf~Tplv-K3u1fbpfcp-Zoom-1.png)

**网络**

[An overview of HTTP - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)

![image.png](https://backblaze.cosine.ren/juejin/31a2adcd9c024ab9ad75926edc3e34db~Tplv-K3u1fbpfcp-Zoom-1.png)

### 学习路线图

[Frontend Developer Roadmap: Learn to become a modern frontend developer](https://roadmap.sh/frontend)

![VZ~FCE_%F6S1B88TIKL{F35.png](https://backblaze.cosine.ren/juejin/1bc95578bb4c449cbdec5f5ae8dd89dd~Tplv-K3u1fbpfcp-Zoom-1.png))

## 关于Web标准

- [W3C](https://www.w3.org/): World Wide Web Consortium （通常意义上的Web标准）

  - 官网：<https://www.w3.org/>
  - Github：<https://github.com/w3c>
  - 规范查询：[All Standards and Drafts - W3C](https://www.w3.org/TR/)

- [Ecma](https://www.ecma-international.org/): Ecma International（ECMAScript标准化规范）

  - Ecma TC39官网：[Home - Ecma International (ecma-international.org)](https://www.ecma-international.org/)
  - TC39：[TC39 – Specifying JavaScript.](https://tc39.es/)
  - Github：[Ecma TC39 (github.com)](https://github.com/tc39)
  - Discourse（讨论组）：[TC39 - Specifying JavaScript (es.discourse.group)](https://es.discourse.group/)

- [WHATWG](https://whatwg.org/): Web Hypertext Application Technology Working Group

  - 官网：[Web Hypertext Application Technology Working Group (WHATWG)](https://whatwg.org/)
  - Github：[WHATWG (github.com)](https://github.com/whatwg)
  - 规范查询：[Standards — WHATWG](https://spec.whatwg.org/)

- [IETF](https://www.ietf.org/): Internet Engineering Task Force

  - 官网：[IETF | Internet Engineering Task Force](https://www.ietf.org/)
  - Github：[Internet Engineering Task Force (IETF) (github.com)](https://github.com/ietf)

### W3C及Ecma会员

![image.png](https://backblaze.cosine.ren/juejin/D2f9b0b4e98e4eed85ba7c371639eb82~Tplv-K3u1fbpfcp-Zoom-1.png)

### W3C规范制定流程

- [The W3C Recommendation Track Process](https://www.w3.org/2004/02/Process-20040205/tr.html)

![image.png](https://backblaze.cosine.ren/juejin/B86499181e2642198da7e523f2d5168e~Tplv-K3u1fbpfcp-Zoom-1.png)

- Explainer demo
- Find the right community/group
- Web IDL for APIs link
- Step-by-step algorithms
- Github,Markdown, respec,bikeshed,etc.
- Get an early review w3ctag/design-reviews
- Write web-platform-tests (WPT) testsl.

Ecma TC39规范制定流程

![image.png](https://backblaze.cosine.ren/juejin/E2f0332cee904b2eb3b95280629b8e48~Tplv-K3u1fbpfcp-Zoom-1.png)

- Championing a proposal at TC39
- How to write a good explainer
- Presenting a Proposal to TC39
- Reading a proposal draft
- Stage 3 Proposal Reviews
- How to experiment with a proposal before Stage 4
- Implementing and shipping TC39 proposals

### 如何参与——关注会议

> **W3C会议** w3C Technical Plenary / Advisory Committee Meetings Week（简称TPAC）是W3C一年一度的全球技术大会，汇集 W3C各工作小组成员（工作组、兴趣组、社区组等）、咨询委员会 （AB）、技术架构组（TAG）、会员单位代表（AC）、公众特邀专家以及全球社区成员，通过为期1-2周的集中互动交流，深入探讨未来开放Web平台技术方向。

- 年度大会

  - AC
  - TPAC（Technical Plenary and Advisory Committee）

- 工作组会议

  - 每月会议
  - 各种研讨会

## 总结感想

作为一名前端工程师，掌握web标准、了解浏览器和网络、及时获取技术的更新都是很重要的。这节课讲的学习路线图为前端的学习有一个很好的梳理，而推荐的文章更是让我对浏览器有了一个更深刻的了解，好评！

> 本文引用的内容大部分来自李松峰老师的课以及MDN。

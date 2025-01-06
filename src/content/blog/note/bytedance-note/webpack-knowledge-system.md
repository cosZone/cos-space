---
title: 青训营 |「构建Webpack知识体系」
link: note/front-end/bytedance-note/webpack-knowledge-system
catalog: true
date: 2022-01-27 14:30:17
subtitle: 这节课详细讲了Webpack的Webpack的作用、配置结构及其关键配置项，还讲了Loader中的链式调用、插件的实现原理与一些其他特性等，可以看出老师对Webpack的研究非常详细透彻，课上都是直接进行调试进入loader内部等帮助我们理解。
lang: cn
tags:
  - 前端
  - JavaScript
  - Webpack
categories:
  - [笔记, 青训营笔记]
---

# 本节课重点内容

- 理解前端"工程化"概念、工具、目标
- 一个团队总要有那么几个人熟悉 Webpack, 某种程度上可以成为个人的核心竞争力
- **高阶前端必经之路**

课程目标：

- 理解 Webpack 的基本用法
- 通过介绍 Webpack 功能、Loader 与 Plugin 组件设计，建立一个知识体系
- 不会事无巨细，介绍 Webpack 所有
- 也不是深入源码，讲解底层实现原理

## 什么是 Webpack

前端项目由什么构成? —— **资源**

![image.png](https://backblaze.cosine.ren/juejin/344365689d9447139272c56e5f449266~tplv-k3u1fbpfcp-watermark.png)

旧时代手动管理这些资源，但有以下几个对开发效率影响非常大的缺点：

- 依赖手工，比如有 50 个 JS 文件……**操作过程繁琐**
- 当代码文件之间有**依赖**的时候，就得**严格按依赖顺序**书写
- 开发与生产环境一致，难以接入 TS 或 JS 新特性
- 比较**难接入 Less、Sass 等工具**
- JS、 图片、CSS 资源管理模型不一致

后来，出现了很多前端工程化工具，特别是 Webpack

![image.png](https://backblaze.cosine.ren/juejin/57b71acd81ee4932ac44cace3f6c94a5~tplv-k3u1fbpfcp-watermark.png)

Web 本质上是一种前端资源**编译**、**打包**工具

- 多份资源文件打包成一个 Bundle
- 支持
  - Babel、Eslint、 TS、 CoffeScript、Less、 Sass
- 支持模块化处理 css、图片等资源文件
- 支持 HMR + 开发服务器
- 支持**持续监听**、**持续构建**
- 支持**代码分离**
- 支持 Tree-shaking
- 支持 Sourcemap
- ...

## Webpack 打包核心流程

### 示例

1. 安装（注意用管理员权限打开命令行）

   ```plain
   npm i -D webpack webpack-cli
   ```

   ![image.png](https://backblaze.cosine.ren/juejin/e51b8a1d34ef475b80cc4d6306ad835c~tplv-k3u1fbpfcp-watermark.png)

2. 编辑配置文件 webpack.config.js

   ```plain
   module.exports = {
       entry: 'main.js',   // 定义当前项目的入口文件
       output: {   // 定义当前项目的输出文件
           filename: "[name].js",
           path: path.join(__dirname, "./dist"),
       },
       module: {// 定义一些loader相关的内容，可在下文看到
           rules: [{
               test: /\.less$/i,
               use: ['style-loader', 'css-loader', 'less-loader']
           }]
       }
   }
   ```

3. 执行编译命令

   ```js
   npx webpack
   ```

### 步骤

**Entry => Dependencies Lookup => Transform => Bundle => Output**

极度简化版：

![image.png](https://backblaze.cosine.ren/juejin/a45521b552134b25aadb15c67b37604c~tplv-k3u1fbpfcp-watermark.png)

1. 从 entry 中的入口文件开始启动编译
2. 依赖解析：根据`require` 或者 `import` 等语句找到以来资源
3. 根据`module` 配置，调用资源转移器将非 JS 资源编译为 JS 内容，直至所有资源处理完毕
4. 资源合并打包：将转译后的资源内容合并打包为可直接在浏览器运行的 JS 文件

**模块化 + 一致性**

- 多个文件资源合并成一个，减少 http 请求数
- 支持模块化开发
- 支持高级 JS 特性
- 支持 Typescript、 CoffeeScript 方言
- 统一图片、CSS、字体等其它资源的处理模型
- Etc...

### 关键配置项（如何使用？）

关于 Webpack 的使用方法，基本都围绕 **配置** 展开，而这些配置大致可划分为两类：

- **流程类**：作用于流程中某个 or 若干个环节，**直接影响打包效果**的配置项
- **工具类**：主流程之外，提供更多**工程化能力**的配置项

ps：官网文档确实，看不太懂（）

配置总览：

![image.png](https://backblaze.cosine.ren/juejin/d9b763cad5574ed682942cf0151072b3~tplv-k3u1fbpfcp-watermark.png)

按使用频率，主要有以下几大配置项

- entry/output——程序输入输出，必需的

- module/plugins

  - 如图，比如我这个项目需要加载 less 文件，需要导入以下 loader 等

    ![image.png](https://backblaze.cosine.ren/juejin/d690d2590a604b43b0cd5a1be79684e2~tplv-k3u1fbpfcp-watermark.png)

- mode

- watch/devServer/devtool

[Webpack 配置官方文档](https://webpack.js.org/configuration/)

### 使用 Webpack 处理 CSS/less 等

1. 安装 Loader

   ```plain
   npm add -D css- Loader style-loader
   ```

2. 添加 module 处理 css 文件

![image.png](https://backblaze.cosine.ren/juejin/d690d2590a604b43b0cd5a1be79684e2~tplv-k3u1fbpfcp-watermark.png)

#### 思考题

- Loader 有什么作用？为什么这里需要用到 css-loader、style-loader
- 与旧时代，在 HTML 文件中维护 CSS 相比，这种方式会有什么优劣处?
- 有没有接触过 Less、Sass、 Stylus 这一类 CSS 预编译框架？如何在 Webpack 接入这些工具？
  - 答：接触过 less

参考资料：

- [Css-loader](https://github.com/webpack-contrib/css-loader)
- [Webpack 原理系列七：如何编写 loader](https://mp.weixin.qq.com/s/TPWcB4MfVrTgFtVxsShNFA)
- [Style-loader](https://webpack.js.org/loaders/style-loader/)

### 使用 Webpack 接入 Babel

1. 安装依赖

   ```plain
   npm -D @babel/core @babel/preset-env babel-loader
   ```

2. 声明入口 `entry`& 产物出口`output`

3. 添加 module 处理 css 文件

   ```js
   module: {
     rules: [
       {
         test: /\.js?$/,
         use: [
           {
             loader: 'babel-loader',
             options: {
               presets: [['@babel/preset-env']],
             },
           },
         ],
       },
     ];
   }
   ```

4. 执行 `npx webpack`

#### 思考题

- Babel 具体有什么功能
- Babel 与 Webpack 分别解决了什么问题？为何两者能协作到一起了？

参考资料：

- [Babel-loader](https://webpack.js.org/loaders/babel-loader/)
- [Babel 官网](https://babeljs.io/)
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

### 使用 Webpack 生成 html

1. 安装依赖

   ```plain
   npm i -D html-webpack-plugin
   ```

2. 配置

``plain`
const path = require( ”path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   entry: "./src/index",
   output: {
       filename:“ [name]. js",
       path: path.join(__dirname, "./dist"),
   },
   plugins: [new HtmlWebpackPlugin()]
};``plain`

3. 执行`npx webpack`

#### 思考题

- 相比于手工维护 HTML 内容，这种自动生成的方式有什么优缺点？

参考资料：

- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

### 使用 Webpack——HMR

Hot Module Replacement——模块热替换（写的代码会被立刻更新到浏览器上~）

1. 开启 HMR

   ```js
   module.exports={
    // ...
    devServer: {
           hot:true; // 必需
       }
   };
   ```

2. 启动 webpack

原理可参考：[Webpack 原理系列十：HMR 原理全解析 (qq.com)](https://mp.weixin.qq.com/s/cbYMpuc4hnV9NA4VfqJLvg)

### 使用 Webpack——Tree-Shaking

Tree-Shaking -树摇，用于删除**Dead Code**

**Dead Code**

- 代码没有被用到，不可到达
- 代码的执行结果不会被用到
- 代码只读不写

Tree-Shaking

- 模块导出了，但未被其他模块使用

开启步骤？

- mode: "production"
- optimization: {usedExports: true}

```plain
  module.exports = {
   entry: "./src/ index",
   mode: "production",
   devtool: false,
   optimization: {
    usedExports: true,
   },
  };
```

ps：对工具类库如 Lodash 有奇效，能**大大减小产物体积**

### 其他工具

- 缓存
- Sourcemap （前面的课程中有提过）
- 性能监控
- 日志
- 代码压缩
- 分包
- ...

### 思考题

- 除上面提到的内容，还有哪些配置可划分为“流程类” 配置？
- 工具类配置具体有什么作用？包括 devtool/cache/stat 等

## 理解 Loader

Loader 核心功能：**将非 JS 资源转换为 JS 资源**

1. 安装 Loader

   ```js
   npm add -D css-loader style-loader less-loader
   ```

2. 添加 module 处理 less 文件

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/i,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"，
                ],
            },
        ],
    },
};
```

### 认识 Loader：链式调用

- **less-loader**: 实现**less => css 的转换**
- **css-loader**: 实现**css => js 的转换**，将 CSS 包装成类似 module.exports = "${css}" 的内容，包装后的内容符合 JavaScript 语法
- **style-loader**：**将 css 模块包进 require 语句**，并在运行时调用**injectStyle**等函数将内容**注入到页面的 style 标签**

![image.png](https://backblaze.cosine.ren/juejin/0786afef4d7342b2b0b435b99ef3f803~tplv-k3u1fbpfcp-watermark.png)

### 认识 Loader：其他特性

**特点**

- 链式执行
- 支持异步执行
- 分 normal、pitch 两种模式
- 参考：[Webpack 原理系列七：如何编写 loader (qq.com)](https://mp.weixin.qq.com/s/TPWcB4MfVrTgFtVxsShNFA)

![image.png](https://backblaze.cosine.ren/juejin/Fef30223a8864fb58bf070778e3524b5~Tplv-K3u1fbpfcp-Watermark.png)

```plain
module.exports = function(source, sourceMap?, data?) {
 // source 为loader的输入
 //可能是文件内容，也可能是上一个loader处理结果
 return source;
};
```

### 常用 Loader

- 站在使用角度，建议掌握这些常见 Loader 的**功能、配置方法**

![image.png](https://backblaze.cosine.ren/juejin/01ecc31afc78422592a443c3763a48aa~Tplv-K3u1fbpfcp-Watermark.png)

### 思考题

- Loader 输入是什么？要求的输出是什么？
- Loader 的链式调用是什么意思？如何串联多个 Loader？
- Loader 中如何处理异步场景？要抛一个异常的话要怎么抛

## 理解插件 Plugin

### 什么是插件

- 很多知名工具，如:
  - VS Code、Web Storm、Chrome、Firefox
  - Babel、Webpack、 Rollup、 Eslint
  - Vue、Redux、 Quill、 Axios
- 等等，都设计了所谓"插件”架构，为什么?

**插件可以提升整个应用的拓展性**

假设一个应用没有任何插件，整一个就是特别复杂的过程，那么：

- **新人**需要了解整个流程细节，**上手成本高**
- 功能迭代成本高，**牵一发动全身**
- **功能僵化**，作为开源项目而言缺乏成长性

心智成本高 => 可维护性低 => 生命力弱
插件架构精髓：**对扩展开放，对修改封闭**，其实就是**开闭原则**

![image.png](https://backblaze.cosine.ren/juejin/729fd73d4e2d48cfa49ff74643a69430~tplv-k3u1fbpfcp-watermark.png)

甚至，Webpack 本身的很多功能也是基于插件实现的

![image.png](https://backblaze.cosine.ren/juejin/38a9e6a208bc49cfbd3f3fd097d962a7~tplv-k3u1fbpfcp-watermark.png)

### 如何编写插件

首先：插件围绕 **钩子** 展开

```js
class SomePlugin {
  apply(compile) {
    compiler.hooks.thisCompilation.tap('SomePlugin', (compilation) => {});
  }
}
```

#### 钩子

1. 时机：编译过程的特定节点，Webpack 会以钩子形式**通知插件此刻正在发生什么事情**；

2. 上下文：通过 tapable 提供的回调机制，以**参数方式传递上下文**信息;

3. 交互：在上下文参数对象中附带了很多存在 side effect 的交互接口，插件可以通过这些接口改变

   ![image.png](https://backblaze.cosine.ren/juejin/f1acd0b48add4b4d8bb32ce5342aa905~tplv-k3u1fbpfcp-watermark.png)

   时机：compier.hooks.compilation

   参数：compilation 等

   交互：dependencyFactories.set

#### 思考题

- Loader 与插件有什么区同点?
- "钩子“有什么作用?如何监听钩子函数?

参考资料：

- [一文吃透 Webpack 核心原理](https://mp.weixin.qq.com/s/SbJNbSVzSPSKBe2YStn2Zw)
- [Webpack 插件架构深度讲解](https://mp.weixin.qq.com/s/tXkGx6Ckt9ucT2o8tNM-8w)

## 如何学习 Webpack

### 入门级：学会灵活应用

- 理解打包流程
- 熟练掌握常用配置项、Loader、 插件的使用方法，能够灵活搭建集成 Vue、React、 Babel、 Eslint、 Less、 Sass、 图片处理等工具的 Webpack 环境
- 掌握常见脚手架工具的用法，例如: Vue-cli、 create-react- app、@angular/cli

![image.png](https://backblaze.cosine.ren/juejin/e58e7df7056e41ba8eae0945a2bfedf4~tplv-k3u1fbpfcp-watermark.png)

### 进阶：学会扩展 Webpack

- 理解 Loader、 Plugin 机制，能够**自行开发 Webpack 组件**
- 理解常见**性能优化**手段，并能用于解决实际问题
- 理解**前端工程化概念**与**生态现状**

### 大师：源码级理解 Webpack 打包编译原理

- 阅读源码，理解 Webpack 编译、打包原理，甚至能够参与共建

# 总结感想

这节课详细讲了 Webpack 的 Webpack 的作用、配置结构及其关键配置项，还讲了 Loader 中的链式调用、插件的实现原理与一些其他特性等，可以看出老师对 Webpack 的研究非常详细透彻，课上都是直接进行调试进入 loader 内部等帮助我们理解。老师还总结了 Webpack 知识体系：[Webpack 5 知识体系 - GitMind](https://gitmind.cn/app/doc/fac1c196e29b8f9052239f16cff7d4c7)。

## Q&A

Q：面试要掌握到什么程度

A：网上很多面试主要围绕三种主题

- Loader 有什么作用？怎么写 loader？常用 loader 有哪些
  - 常用 loader：css-loader、style-loader、vue-loader、file-loader、eslint-loader、babel-loader 等
- 插件有什么用？怎么写插件？编译原理？
- Bundle、chunk、module 分别是什么含义？

一些资源：[深入浅出 Webpack](https://webpack.wuhaolin.cn/)

> 本文引用的大部分内容来自范文杰老师的课，欢迎关注老师的公众号：**Tecvan**

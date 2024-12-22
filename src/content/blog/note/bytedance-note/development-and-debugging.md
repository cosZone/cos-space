---
title: 青训营 |「前端必须知道的开发调试知识」
link: note/front-end/bytedance-note/development-and-debugging
catalog: true
date: 2022-01-20 14:30:17
subtitle: Chorme devTools的调试使用、移动端调试等
lang: cn
tags:
- CSS
- JavaScript
- 前端
- 调试
categories:
- [笔记, 青训营笔记]
---
## 前端Debug的特点

**多平台**

浏览器、Hybrid、NodeJs、小程序、桌面应用……

**多环境**

本地开发环境、线上环境

**多工具**

Chrome devTools、Charles、Spy-Debugger、Whistle、vConsole……

**多技巧**

Console、BreakPoint、sourceMap、代理……

## Chorme devTools

Chorme devTools谷歌浏览器自带的调试工具，功能非常之强大，包括现在很多浏览器也采用了这个调试工具，它既可以动态的添加/删除样式并实时的显示出来

![image.png](https://backblaze.cosine.ren/juejin/94e325f9e70142a7b8e3f555ee9d78cd~tplv-k3u1fbpfcp-watermark.png)

### 强制状态显示

可以将一些特定状态下显示的元素显示出来（比如hover、active等）
![image.png](https://backblaze.cosine.ren/juejin/fab92caa05ae492981e842122447f988~tplv-k3u1fbpfcp-watermark.png)

也可以通过右侧的样式栏强制元素状态/添加伪类等等![image.png](https://backblaze.cosine.ren/juejin/E233f0153dbd4105a857af41c5521fbd~Tplv-K3u1fbpfcp-Watermark.png)

还可以筛选样式

![image.png](https://backblaze.cosine.ren/juejin/8f864d2402684b37ad6c449981b801f0~Tplv-K3u1fbpfcp-Watermark.png)

### 截图

是的没错，可以对节点进行截图，非常的amazing啊（bushi

![image.png](https://backblaze.cosine.ren/juejin/56537482cd824642adb2cfa6e8853f6a~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/D1dd335f74a540b588747691e953ff81~Tplv-K3u1fbpfcp-Watermark.png)

### console

js中的console.log就会记录在这儿，不用多说了吧，想必都用过~

不过有一点需要提及的是，也可以输出带样式的文字方便调试时即时定位，如：

```js
console.log('%s %o,%c%s', 'hello', {name:'我是姓名', age: 18}, 'font-size:20px; color:red; ', 'Welcome to bytedance!');
```

这里的%s是输出字符串，%o输出对象，%c输出样式（用过c/c++格式化输出的都晓得，不过这里的%c是样式嗷）

![image.png](https://backblaze.cosine.ren/juejin/6526a282fb864ce5a748bb1db356a222~tplv-k3u1fbpfcp-watermark.png)

console.table可以具象化的展示一个对象数组，非常方便

```js
const persons = [{id:1, name:'张三', age: 18, des: '好耶'},{id:2, name:'李四', age: 24, des: '我是李四'}, {id:3, name:'王五', age: 20, des: '这是什么'}];
```

![image.png](https://backblaze.cosine.ren/juejin/ef323dac5afd41bda639c3b7f56bee4a~tplv-k3u1fbpfcp-watermark.png)

树形结构dir

![image.png](https://backblaze.cosine.ren/juejin/2762569bf23e480aabdf8f8c5fa8b8e8~Tplv-K3u1fbpfcp-Watermark.png)

### Soure Tab

顾名思义，展示源代码中的内容，可以增加断点、进行单步调试等。

![image.png](https://backblaze.cosine.ren/juejin/5dfbad740c6c49f29b1a149ae40fad0a~tplv-k3u1fbpfcp-watermark.png)

在代码中某行执行 `debugger` 或打个断点就会在执行到这行的时候暂停，之后就可以继续单步调试了，之后的调试就不做过多介绍了，直接上手试试就能明白。（后端调试多了这个很容易习惯x相当于打了个断点）

其他还有当请求发生时打断点：XHR/fetch breakpoints、给元素结构添加断点（删除等）、**scope可以查看作用域列表，(包括[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures))**、CallStack可以查看当前JavaScript代码的调用栈等。

### 压缩后的代码如何调试？SouceMap

前端代码天生具有“开源”属性，出于安全考虑，JavaScript代码通常会被webpack等工具进行压缩，而压缩后的代码通常只有一行，变量使用a、b等进行替换，整体变得不可阅读，那么压缩后的代码如何调试呢？

webpack 打包时可以多产出一个[Source Map](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit)程序，会将压缩后的代码和真实的文件进行[映射](https://www.murzwin.com/base64vlq.html))，抛出异常时就将其映射出来，而在上线后将Source Map映射删除。

### Perfomance

性能面板，可以生成报告，包括

![image.png](https://backblaze.cosine.ren/juejin/348524fc8aa9465ab097f7af30e81d33~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/fc744d9b92ec438692d96add9980ba7a~tplv-k3u1fbpfcp-watermark.png)

### NetWork

查看网络请求的面板，查看请求头/响应等等。

![image.png](https://backblaze.cosine.ren/juejin/07e1c95a1b9b4e989250301f9d35d5f6~tplv-k3u1fbpfcp-watermark.png)

### Application

该面板展示与本地存储相关的信息

- Local Storage
- Session Storage
- IndexedDB
- Web SQL
- Cookie

小技巧：点击该面板下的Storage面板中的Clear Site Data就可以清除该网页的本地存储数据，无需打开浏览器设置进行清除。

![image.png](https://backblaze.cosine.ren/juejin/fb0e5e2661de47fba572db570fb27539~tplv-k3u1fbpfcp-watermark.png)

## 移动端 H5 调试

### 真机调试

#### ios

1. 使用Lightning 数据线将iPhone与Mac相连

2. iPhone开启Web检查器(设置 -> Safari -> 高级 -> 开启Web检查器)

3. iPhone使用Safari浏览器打开要调试的页面

4. Mac打开 Safari浏览器调试(菜单栏 -> 开发 -> iPhone设备名 -> 选择调试页面)

5. 在弹出的Safari Developer Tools中调试

> 没有iPhone设备可以在Mac AppStore安装Xcode使用其内置的ios模拟器

#### Android

1. 使用USB数据线将手机与电脑相连
2. 手机进入开发者模式。勾选USB调试。并允许调试
3. 电脑打开Chrome浏览器，在地址栏输入: chrome://inspect/1devices并勾选Discover USB devices选项
4. 手机允许远程调试，并访问调试页面
5. 电脑点击inspect 按钮8622
6. 进入调试界面

> 这种方法一般不推荐，直接使用手机扫码查看体验更佳

### 代理调试

之前使用手机利用fidder改代理抓包，现在也可以使用代理工具在手机上调试前端页面。原理如下：

- 电脑作为代理服务器
- 手机通过HTTP代理连接到电脑
- 手机上的请求都经过代理服务器

老师课堂上用的是Charles为例子，我就以之前手机上抓包为例了，亲测可行，详细步骤可以看这篇博客，需要安装证书才能抓取到HTTPS请求[【fiddler】用fiddler实现android手机抓包_michaelwoshi的博客-CSDN博客_fiddler手机抓包](https://blog.csdn.net/michaelwoshi/article/details/114173158)

改完代理就可以使用手机访问开发环境页面了！其他常用工具如下：

![image.png](https://backblaze.cosine.ren/juejin/D84f0673cabe4810b9996efe6c1e8d0a~Tplv-K3u1fbpfcp-Watermark.png)

## 常用开发调试技巧

### 线上及时修改Override

1. 打开Sources面板下的的Overrides
2. 点击Select folders for Overrides。选择一个本地的空文件夹目录。
3. 允许授权
4. 在page中修改代码，修改完成后保存
5. 打开devTools ，点击右上角的三个小点 -> More tools ->  Changes，就能看到所有修改了

记录的非常直观，改完刷新也不会再消失了，还能查看修改了那些地方

### 利用代理解决开发阶段的跨域问题

浏览器本身有一个 [同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy) ，不同源的请求会产生跨域问题，即协议、ip、端口号这三者有任何一个不同,就会产生跨域问题

### 启用本地source map

线上不存在Source Map时可以用Map Local网络映射功能来访问本地的Source Map文件

### 小黄鸭调试大法

> 传说中程序大师随身携带一只小黄鸭，在调试代码的时候会在桌上放上这只小黄鸭,然后详细地向鸭子解释每行代码，然后很快就将问题定位修复了。
>
> ——《程序员修炼之道》

原来是出自这吗233333，这是梳理自己问题逻辑的一个好方法。

## 总结感想

前端开发的调试也是非常重要的一环，这节课非常详细的讲了PC端谷歌开发者工具的使用和移动端开发的调试，令人受益匪浅。

> 本文引用的内容大部分来自秃头披风侠老师（？）的课、MDN以及一篇外部博客，[【fiddler】用fiddler实现android手机抓包_michaelwoshi的博客-CSDN博客_fiddler手机抓包](https://blog.csdn.net/michaelwoshi/article/details/114173158)

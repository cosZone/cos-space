---
title: 青训营 |「Node.js 与前端开发实战」
link: note/front-end/bytedance-note/nodejs-develop
catalog: true
date: 2022-01-24 14:30:17
subtitle: 这节课从Node.js介绍起，实现了其编写Http Server的一个实战（并用Promise优化回调，还对SSR有了一定的了解），并在延伸话题里老师也给出了一些建议与拓展阅读，好欸~
lang: cn
tags:
- 前端
- JavaScript
- Node.js
categories:
- [笔记, 青训营笔记]
---
# 本节课重点内容

## Node.js 的应用场景（why）

- 前端工程化

  - 早期的jQuery等库都是直接在页面中引入，后来模块化逐渐成熟，Node.js赋予了开发者在浏览器外运行代码的能力，前端逐渐模块化、

  - Bundle：[webpack](https://www.webpackjs.com/)、[Vite](https://cn.vitejs.dev/)、[esbuild](https://esbuild.docschina.org/)、[Parcel](https://www.parceljs.cn/)等

  - Uglify：[UglifyJS](https://lisperator.net/uglifyjs/)

  - Transplie：[babeljs](https://babeljs.io/)、[TypeScript](https://www.tslang.cn/)

    >个人理解：Transplie就是将ES6这样最新的语法转译成低版本的写法，实现浏览器兼容  

  - 其他语言加入前段工程化的竞争：[esbuild](https://esbuild.docschina.org/)、[Parcel](https://www.parceljs.cn/) 、prisma等
  - 现状：Node.js难以替代

- Web服务端应用

  - 学习曲线平缓，**开发效率较高**
  - **运行效率接近常见的编译语言**
  - 社区生态丰富及**工具链成熟**（npm，V8 inspector）
  - 与前端结合的场景会有优势（SSR，**同构前端应用**。 编写页面 和 后端数据的获取和填充都由 JavaScript 来完成）
  - 现状：竞争激烈，Node.js 有自己独特的优势

- Electron**跨端**桌面应用

  - 商业应用: vscode、slack、discord、zoom
  - 大型公司内的效率工具
  - 现状:大部分场景在选型时，都值得考虑

## Node.js运行时结构（what）

![image.png](https://backblaze.cosine.ren/juejin/B4e16f59c5ba42b39cc07156fb27ef84~Tplv-K3u1fbpfcp-Watermark.png)

- N-API：用户代码中利用npm安装的一些包
- [V8](http://nodejs.cn/learn/the-v8-javascript-engine)：JavaScript Runtime，诊断调试工具(inspector)
- [libuv](https://luohaha.github.io/Chinese-uvbook/source/introduction.html)：eventloop (事件循环)，syscall (系统调用)
  - 举例：用node-fetch发起请求时
  - 整个过程中底层会调用非常多的c++代码

**特点**

- 异步I/O：

  ```js
  setTimeout(() => {
      console.log('B');
  })
  console.log('A');
  ```

  - 一个常见场景：**读取文件**时。当Node.js执行I/O操作时，会在响应返回后恢复操作，而**不是阻塞线程并占用额外内存等待**。（内存占用更少）

    ![image.png](https://backblaze.cosine.ren/juejin/68794c8de61049ed90ecc828b3436dc5~tplv-k3u1fbpfcp-watermark.png)

- 单线程

  - worker_thread可以起一个独立线程，但每个线程的模型没有太大变化

    ```js
    function fibonacci(num:number):number {
     if(num === 1 || num === 2) {
            return 1;
        }
        return fibonacci(num-1) + fibonacci(num-2);
    }
    fibonacci(42)
    fibonacci(43)
    ```

  - JS单线程

    - 实际:JS线程 + uv线程池（4个线程） + V8任务线程池 + V8 Inspector线程

  - 优点：不用考虑多线程状态同步问题，**也就不需要锁**。同时还能比较高效地利用系统资源;

  - 缺点：**阻塞会产生更多负面影响**、异步问题、延时有要求的场景需要考虑。

    - 解决办法：多进程或多线程

- 跨平台（大部分功能、api）

  - 想用linux上的Socket，而不同平台上调用的又不一样，只需：

    ```js
    const net = require('net')
    const socket = new net.Socket('/tmp/socket.sock')
    ```

  - Node.js跨平台 + **JS无需编译环境**（+ **Web跨平台** + 诊断工具跨平台）
    - = **开发成本低**（大部分场景无需担心跨平台问题），整体学习成本低

## 编写Http Server （how）

### 安装Node.js

- Mac, Linux推荐使用nvm。**多版本管理。**
- Windows推荐nvm4w或是[官方安装包](https://nodejs.org/en/download/)。
- 安装慢，安装失败的情况，设置安装源
  - NVM_NODEJS_ORG_MIRROR=<https://npmmirror.com/mirrors/node> nvm install 16

### 编写Http Server + Client, 收发GET, POST请求

- 前提：安装好Node.js，以管理员权限打开cmd下转至当前文件目录下

#### Http Server

- 首先编写一个server.js，如下

  - [`createServer`](https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener) 说明

    >req 请求，res响应

    [`server.listen`](https://nodejs.org/api/http.html#serverlisten) 说明

    > port 要监听的端口号，成功后的回调函数

  - ```js
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.end('hello'); // 响应直接就是hello
    });
    const port = 3000;
    server.listen(port, () => {
        console.log(`server listens on:${port}`); // 监听3000端口
    })

- 使用node启动，此时输入localhost:3000就可以看到hello

![image.png](https://backblaze.cosine.ren/juejin/86eaa345e5ea499ca25569b7b2cbd9d3~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/7baced8533a046adb95f1acd0a92bd87~tplv-k3u1fbpfcp-watermark.png)

- 改为JSON版

```js
  const server = http.createServer((req, res) => {
      // receive body from client
      const bufs = [];    // 取传的数据
      req.on('data', data => {
          bufs.push(data);
      });
      req.on('end', () => {
          const buf = Buffer.concat(bufs).toString('utf-8');
          let msg = 'Hello';
          try {
              reqData = JSON.parse(buf);
              msg = reqData.msg;
          } catch (err) {
              res.end('invalid json');
          }
          // response
          const responseJson = {
              msg: `receive：${msg}`
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(responseJson));
      });
  });
  ```

- ![image.png](https://backblaze.cosine.ren/juejin/25a3c3639d4947b290df7623d97a87bb~Tplv-K3u1fbpfcp-Watermark.png)
- ![image.png](https://backblaze.cosine.ren/juejin/a752766165644b1c8bf4e1493a482c6a~tplv-k3u1fbpfcp-watermark.png)

#### Http Client

- [`http.request(url[, options\][, callback])`](http://nodejs.cn/api/http/http_request_url_options_callback.html)

```js
const http = require('http');
const body = JSON.stringify({ msg: 'hello from my own client' });
// [url] [option] [callback]
const req = http.request('http://127.0.0.1:3000', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
    },
}, (res) => {   // 响应体   
    const bufs = [];
    res.on('data', data => {
        bufs.push(data);
    });
    res.on('end', () => {
        const buf = Buffer.concat(bufs);
        const receive = JSON.parse(buf);
        console.log('receive json.msg is:', receive);
    });
})
req.end(body);
```

![image.png](https://backblaze.cosine.ren/juejin/2ccdb0821cb0403093a6192544066cbc~tplv-k3u1fbpfcp-watermark.png)

#### Promisify

可以用 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) + [async和await](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Async_await) 重写这两个例子（why？）

> 当 [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) 关键字与异步函数一起使用时，它的真正优势就变得明显了 —— 事实上， **await 只在异步函数里面才起作用**。它可以放在任何异步的，基于 promise 的函数之前。它会暂停代码在该行上，直到 promise 完成，然后返回结果值。在暂停的同时，其他正在等待执行的代码就有机会执行了
>
> `async/await` 让你的代码看起来是同步的，在某种程度上，也使得它的行为更加地同步。 `await` 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样。它确实可以允许其他任务在此期间继续运行，但您自己的代码被阻塞。

- 回调写太多容易找不到，不宜维护

  ```js
  function wait(t) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve();
          }, t);
      });
  }
  wait(1000).then(() => { console.log('get called'); });
  ```

- 并不是所有回调都适合改写成Promise

  - 适合只被调用一次的回调函数

  ```js
  const server = http.createServer(async (req, res) => {  // 注意这里的async
      // receive body from client 改成了Promise形式
      const msg = await new Promise((resolve, reject) => {    //执行完再交给msg
          const bufs = [];    
          req.on('data', data => {
              bufs.push(data);
          });
          req.on('error', (err) => {
              reject(err);
          })
          req.on('end', () => {
              const buf = Buffer.concat(bufs).toString('utf-8');
              let msg = 'Hello';
              try {
                  reqData = JSON.parse(buf);
                  msg = reqData.msg;
              } catch (err) {
                  // 
              }
              resolve(msg);
          });
      });
      // response
      const responseJson = {
          msg: `receive：${msg}`
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(responseJson));
  });
  ```

![image.png](https://backblaze.cosine.ren/juejin/9dbdf3381e8a493983e2d317ed9c5a43~Tplv-K3u1fbpfcp-Watermark.png)

### 编写静态文件服务器

编写一个简单的静态服务，接受用户发过来的http请求，拿到图片的url约定为静态文件服务器磁盘上对应的路径，再把具体内容返回给用户。这次除了 [http](http://nodejs.cn/api/http.html) 模块，还需要 [fs](http://nodejs.cn/api/fs.html) 模块和 [path](http://nodejs.cn/api/path.html) 模块

先编写一个简单的 index.html，放于static目录下

![image.png](https://backblaze.cosine.ren/juejin/4896177811004202ac15fc53ea8746ee~tplv-k3u1fbpfcp-watermark.png)

#### static_server.js

```js
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
// __dirname是当前这个文件所在位置, ./为当前文件所在文件夹 folderPath即为static文件夹相对于当前文件路径
const folderPath = path.resolve(__dirname, './static');

const server = http.createServer((req, res) => {  // 注意这里的async
    // expected http://127.0.0.1:3000/index.html
    const info = url.parse(req.url);

    // static/index.html
    const filepath = path.resolve(folderPath, './'+info.path);
    console.log('filepath', filepath);
    // stream风格的api，其内部内存使用率更好
    const filestream = fs.createReadStream(filepath);
    filestream.pipe(res);
});
const port = 3000;
server.listen(port, () => {
    console.log(`server listens on:${port}`);
})
```

![image.png](https://backblaze.cosine.ren/juejin/002356c010394791918d5d7deb0005ea~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/6eb03ea97a7a4263835a1261bb207849~tplv-k3u1fbpfcp-watermark.png)

- 与高性能、可靠的服务相比，还差什么?

1. **CDN**：**缓存+加速**
2. **分布式**储存，**容灾**（服务器挂了也能正常服务）

### 编写React SSR服务

- SSR (server side rendering)有什么特点？
- 相比传统HTML模版引擎:避免重复编写代码
- 相比SPA (single page application)：首屏渲染更快，SEO（搜索引擎优化）友好
- 缺点：
  - 通常qps（每秒查询率）较低，前端代码编写时需要考虑服务端渲染情况
  - 编写比较难，编写js还要考虑前端中的表现

#### 安装React

```
npm init
npm i react react-dom
```

#### 编写示例

```react
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const http = require('http');
function App(props) {
    return React.createElement('div', {}, props.children || 'Hello');
}
const server = http.createServer((req, res) => {
    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>My Application</title>
            </head>
            <body>
                ${ReactDOMServer.renderToString(
                    React.createElement(App, {}, 'my_content'))}
                <script>
                    alert('yes');
                </script>
            </body>
        </html>
    `);
})
const port = 3000;
server.listen(port, () => {
    console.log('listening on: ', port);
})
```

![image.png](https://backblaze.cosine.ren/juejin/258be264f1104f669d64d5ee1883dafe~tplv-k3u1fbpfcp-watermark.png)

- SSR难点

1. 需要处理打包代码
2. 需要思考前端代码在服务端运行时的逻辑
3. 移除对服务端无意义的副作用，或重置环境

### 适用inspector进行调试、诊断

- V8 Inspector:开箱即用、特性丰富强大、与前端开发一致、跨平
  台

  - `node -- inspect`
  - `open http://localhost:9229/json`

  ![image.png](https://backblaze.cosine.ren/juejin/73f242fda3c741b6abdb6a9b8cceab2e~tplv-k3u1fbpfcp-watermark.png)

- 场景:
  - 查看console.log内容
  - breakpoint
  - 高CPU、死循环: cpuprofile
  - 高内存占用：heapsnapshot（堆快照）
  - 性能分析

### 部署简介

写完了，如何部署到生产环境捏？

- 部署要解决的问题

  - 守护进程：当进程退出时，重新拉起

  - 多进程：cluster便捷地利用多进程
  - 记录进程状态，用于诊断

- 容器环境

  - 通常有健康检查的手段，只需考虑多核cpu利用率即可

## 延伸话题

### 快速了解Node.js代码

[Node. js Core贡献入门](https://github.com/joyeecheung/talks/blob/master/code_and_learn_2019_beijing/contributing-to-node-core.pdf)

- 好处
  - 从使用者的角色逐步理解底层细节，可以解决更复杂的问题，
  - 自我证明，有助于职业发展;
  - 解决社区问题，促进社区发展;
- 难点:
  - 花时间（真实）

### 编译Node.js

- 为什么要学习编译Node.js
  - 认知:黑盒到白盒，发生问题时能有迹可循
  - 贡献代码的第一步
- 如何编译
  - ./configure &&make install
  - 演示：给net模块添加自定义属性

### 诊断/追踪

- 诊断是一个低频、重要同时也相当有挑战的方向。是企业衡量自己能否依赖一个门语言的重要参考。
- 技术咨询行业中的热门角色。
- 难点:
  - 需要了解Node.js底层，需要了解操作系统以及各种工具
  - 需要经验

### WASM, NAPI

- Node.js(因为V8)是执行WASM代码的天然容器，和浏览器WASM是同一运行时，同时Node.js支持WASI。
- NAPI执行C接口的代码(C/C++/Rust...)，同时能保留原生代码的性能。
- 不同编程语言间通信的一种方案。

## 总结感想

本节课从Node.js介绍起，实现了其编写Http Server的一个实战（并用Promise优化回调，还对SSR有了一定的了解），并在延伸话题里老师也给出了一些建议与拓展阅读，好欸~

> 本文引用的内容大部分来自欧阳亚东老师的课以及MDN。

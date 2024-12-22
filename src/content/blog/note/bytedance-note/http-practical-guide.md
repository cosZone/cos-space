---
title: 青训营 |「HTTP实用指南」
link: note/front-end/bytedance-note/http-utilization-guide
catalog: true
date: 2022-01-22 14:30:17
subtitle: HTTP及其常见协议分析、报文结构、缓存策略分析，以及其具体的业务场景使用。 
lang: cn
tags:
- 前端
- HTTP
- 网络协议
categories:
- [笔记, 青训营笔记]
---
## 初识HTTP

输入url -> browser进程处理输入信息 -> 浏览器内核向服务器发起请求 -> 浏览器内核读取响应 -> 浏览器内核进行渲染 -> browser进程页面加载完成

![image.png](https://backblaze.cosine.ren/juejin/9a81ba0daea2499d9ca9253dd00a85f4~tplv-k3u1fbpfcp-watermark.png)

- Hyper Text Transfer Protocol （**HTTP**）超文本传输协议

- 他是**应用层协议**，**基于传输层的TCP协议**

- 请求、响应

- 简单**可扩展**（可以自定义请求头，只要客户端服务端之间可以理解）

- **无状态**

  ![image.png](https://backblaze.cosine.ren/juejin/71a3574b7e6543d09c08554cafabdbbc~tplv-k3u1fbpfcp-watermark.png)

## 协议分析

### 发展历程

![image.png](https://backblaze.cosine.ren/juejin/C8fd8b74bdc34c1b9fd2d22fc14c7fb5~Tplv-K3u1fbpfcp-Watermark.png)

### 报文结构

#### HTTP/1.1

![image.png](https://backblaze.cosine.ren/juejin/5850baf73f724ff5bcd11fdc34d78472~tplv-k3u1fbpfcp-watermark.png)

如图，可以看到请求和响应的请求头、返回的状态码、等等

| Method  | 说明                                                         |
| :-----: | ------------------------------------------------------------ |
|   GET   | **请求一个指定资源**的表示形式，使用GET的请求应该只用于**获取数据** |
|  POST   | 用于**将实体提交**到指定的资源，通常导致在服务器上的状态变化或副作用 |
|   PUT   | 用请求有效载荷**替换目标资源的所有当前表示**                 |
| DELETE  | **删除**指定的资源                                           |
|  HEAD   | 请求一个与GET请求的响应相同的响应，但没有响应体（用的比较少） |
| CONNECT | 建立一个到由目标资源标识的服务器的隧道。（用的比较少）       |
| OPTIONS | 用于描述目标资源的通信选项。                                 |
|  TRACE  | 沿着到目标资源的路径执行一个消息环回**测试**。（用的比较少） |
|  PATCH  | 用于对资源**应用部分修改。**                                 |

- Safe（安全的）：不会修改服务器数据的方法，如读数据 GET、HEAD、OPTIONS等

- Idempotent（幂等）：同样的请求被执行一次与连续执行多次的效果是一样的，服务器的状态也是一样的，所有safe的方法都是Idempotent的 如GET、HEAD、OPTIONS、PUT、DELETE等

#### 状态码

![image.png](https://backblaze.cosine.ren/juejin/D8e8407af23e4723a0c0e392d47b1ca6~Tplv-K3u1fbpfcp-Watermark.png)

- 200 OK - 客户端**请求成功**
- 301 - 资源（网页等）被**永久转移**到了其它URL
- 302 - **临时跳转**
- 401 - Unauthorized - 请求未经授权
- 404 - 请求资源不存在，可能是输入了错误的URL
- 500 - 服务器内部发生了不可预期的错误
- 504 Gateway Timeout - 网关或者代理的服务器无法在规定的时间内获得想要的响应

#### RESTful API

一种API设计风格：REST - Representational State Transfer

- 每一个URI代表—种资源
- 客户端和服务器之间，传递这种资源的某种**表现层**
- 客户端通过HTTP method，对服务器端资源进行操作，实现"**表现层状态转化**"。

| 请求            | 返回码                  |                             含义                             |
| --------------- | ----------------------- | :----------------------------------------------------------: |
| GET /zoos       | **2**00 OK              |           **列出所有**动物园，服务器**成功返回**了           |
| POST /zoos      | **2**01 CREATED         |            **新建**一个动物园，服务器**创建成功**            |
| PUT /zOos/ID    | **400 INVALID REQUEST** | **更新**某个指定动物园的信息(提供该动物园的全部信息)； 用户发出的请求有错误,服务器没有进行新建或修改数据的操作 |
| DELETE /zoos/ID | **2**04 NO CONTENT      |               **删除**某个动物园，删除数据成功               |

#### 常用请求头

|      请求头       |                             说明                             |
| :---------------: | :----------------------------------------------------------: |
|      Accept       | 接收类型，表示浏览器支持的MIME类型**（对标服务端返回的Content-Type）** |
|   Content-Type    |               客户端发送出去**实体内容的类型**               |
|   Cache-Control   |         指定请求和响应遵循的**缓存机制**，如no-cache         |
| lf-Modified-Since | 对应服务端的Last-Modified，用来**匹配看文件是否变动**，**只能精确到1s之内** |
|      Expires      |   缓存控制，在这个时间内不会请求，直接使用缓存，服务端时间   |
|      Max-age      | 代表资源在**本地缓存多少秒**，**有效时间内不会请求，而是使用缓存** |
|   If-None-Match   | 对应服务端的ETag，用来**匹配文件内容是否改变** **（非常精确)** |
|    **Cookie**     |             有cookie并且**同域**访问时会自动带上             |
|      Referer      | 该页面的来源URL(适用于所有类型的请求，会**精确到详细页面地址**, csrf拦截常用到这个字段) |
|      Origin       | 最初的请求是从哪里发起的（(只会**精确到端口**) ，Origin比Referer更尊重隐私** |
|    User-Agent     |             用户客户端的一些必要信息，如UA头部等             |

#### 常用响应头

|           响应头            |                             说明                             |
| :-------------------------: | :----------------------------------------------------------: |
|        Content-Type         |                  服务端返回的实体内容的类型                  |
|        Cache-Control        |           指定请求和响应遵循的缓存机制，如no-cache           |
|       Last- Modified        |                    请求资源的最后修改时间                    |
|           Expires           |        应该在什么时候认为文档已经过期，从而不再缓存它        |
|           Max-age           |  客户端的本地资源应该缓存多少秒，开启了Cache-Control后有效   |
|            ETag             |           资源的特定版本的标识符，Etags类似于指纹            |
|         Set-Cookie          | **设置和页面关联的cookie**,服务器通过这个头部把cookie传给客户端 |
|           Server            |                     服务器的一些相关信息                     |
| Access-Control-Allow-Origin |             服务器端允许的请求Origin头部(如为*)              |

#### 缓存

**强缓存**

本地有了直接用就好了

- Expires（到期时间），时间戳
- Cache-Control
  - 可缓存性
    - no-cache：协商缓存验证
    - no-store：不使用任何缓存
    - public、private等
  - 到期
    - max-age：单位是**秒**，存储的最大生存周期，**相对于请求**的时间
  - 重新验证*重新加载
    - must-revalidate：一旦资源过期，在成功向原始服务器验证之前，不能使用）（）

**协商缓存**

与Server端要通信，再确定要不要用它

- Etag/If-None-Match：资源的**特定版本**的标识符，类似于指纹
- Last-Modified/If-Modified-Since：**最后的修改时间**。（绝对的）

![image.png](https://backblaze.cosine.ren/juejin/2fa3937e36504331b968f36cc592ea69~tplv-k3u1fbpfcp-watermark.png)

#### Cookie

Set-Cookie - response

| Name=value                   | 各种cookie的名称和值                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Expires=Date                 | Cookie的有效期，缺省时Cookie仅在浏览器关闭之前有效。         |
| Path= Path                   | 限制指定Cookie的发送范围的文件目录，默认为当前               |
| Domain=domain                | 限制cookie生效的域名，默认为创建cookie的服务域名             |
| secure                       | 仅在HTTPS安全连接时，才可以发送Cookie                        |
| HttpOnly                     | JavaScript脚本无法获得Cookie                                 |
| SameSite=[None\|Strict\|Lax] | **None同站、跨站请求都可发送**；**Strict仅在同站发送** ；允许与顶级导航一起发送，并将与第三方网站发起的GET请求一起发送 |

#### 发展

HTTP/2概述：**更快**、更**稳定**、更**简单**

- 帧(frame)

  - HTTP/2通信的最小单位，每个帧都包含**帧头**，至少也会标识出当前帧所属的数据流。
  - 1.0传输的是文本，而2中传的则是二进制数据，效率更高。并有新的压缩算法。

  - ![image.png](https://backblaze.cosine.ren/juejin/877080ecc022407f98696529903fbfb9~tplv-k3u1fbpfcp-watermark.png)

- **消息**：与逻辑请求或响应消息对应的完整的一系列帧。

- **数据流**：已建立的连接内的双向字节流，可以承载一条或多条消息。

  - **交错发送**，接受方**重组织**。

    ![image.png](https://backblaze.cosine.ren/juejin/b8f4367cce8a442082ea52011ff2a9af~tplv-k3u1fbpfcp-watermark.png)

- HTTP/2连接都是**永久**的，而且仅需要每个来源一个连接
- **流控制**：阻止发送方向接收方发送大量数据的机制
- 服务器推送
  - ![image.png](https://backblaze.cosine.ren/juejin/3d4e113bad5648bc8af55a2718a1479b~tplv-k3u1fbpfcp-watermark.png)

#### HTTPS概述

- HTTPS : Hypertext Transfer Protocol Secure

- 经过TSL/SSL加密
- 对称加密：加密和解密都是使用**同一个**密钥
- 非对称加密：加密和解密需要使用两个不同的密钥：公钥（public key）和私钥（private key）

![image.png](https://backblaze.cosine.ren/juejin/1009e0f80d914907973254f7c8cc82b7~tplv-k3u1fbpfcp-watermark.png)

## 常见场景分析

### 静态资源

以 [今日头条](https://www.toutiao.com) 为例，打开网络面板查看其请求，找到css文件的请求。

![image.png](https://backblaze.cosine.ren/juejin/E8f6f35c47e54bb892d07ee1d4e7db2d~Tplv-K3u1fbpfcp-Watermark.png)

可以看到返回的状态码为200，那么是不是真的发起了请求呢（旁边的括号就说了，**从磁盘缓存**）

![image.png](https://backblaze.cosine.ren/juejin/04f6432045814362935592b3af367547~tplv-k3u1fbpfcp-watermark.png)

由上图响应头，可以看出：

- 缓存策略？
  - 强缓存（max-age=xxxxx）
    - Cache-control：换算一下，1年
- 其他信息？
  - 允许所有域名访问（access-control-allow-origin）
  - 资源类型：css（content-type）

静态资源方案：缓存 + CDN + 文件名hash

- CDN：Content Delivery Network
- 通过用户就近性和服务器负载的判断，CDN确保内容以一种极为高效的方式为用户的请求提供服务

![image.png](https://backblaze.cosine.ren/juejin/cde86baff3c44f16b7f17b22e2c5ef9c~tplv-k3u1fbpfcp-watermark.png)

那么缓存期那么久，怎么保证用户拿到的内容是**最新**的呢？

文件名hash，当文件内容有变化时文件名变换/加上版本号，这样缓存中的文件就无法match，就只能重新请求了。

### 登陆 - 跨域

![image.png](https://backblaze.cosine.ren/juejin/14d0c5c682da4bc2981be6a10e7ed0e1~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/93d61665e6c9484e8f23165d40e2e9ba~tplv-k3u1fbpfcp-watermark.png)

跨域问题，导致了请求方法为OPTION

![image.png](https://backblaze.cosine.ren/juejin/3a5913eec32942e4887cb1b34250882a~tplv-k3u1fbpfcp-watermark.png)

**协议、主机名、端口**任意一者不同都会出现**跨域**问题（HTTP的默认端口号443）

![image.png](https://backblaze.cosine.ren/juejin/e7d485f486e840459fcd1aaf2f127db5~tplv-k3u1fbpfcp-watermark.png)

#### 解决跨域问题

- [跨源资源共享（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)（ Cross-Origin Resource Sharing ）

  - >`跨源资源共享` ([CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS))（或通俗地译为跨域资源共享）是一种基于 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头的机制，该机制通过允许服务器标示除了它自己以外的其它[origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)（域，协议和端口），这样浏览器可以访问加载这些资源。跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的"预检"请求。在预检中，浏览器发送的头中标示有HTTP方法和真实请求中会用到的头。
    >
    >出于安全性，浏览器限制脚本内发起的跨源HTTP请求。 例如，`XMLHttpRequest` 和 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 遵循[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)。这意味着使用这些 API 的 Web 应用程序只能从加载应用程序的同一个域请求 HTTP 资源，**除非响应报文包含了正确 CORS 响应头。**

  - 预请求：获知服务端是否允许该跨源请求（**复杂请求**）

  - 相关协议头

    - access-control-....

- 代理服务器

  - 同源策略是浏览器的安全策略，不是HTTP的

- Iframe 诸多不便

![image.png](https://backblaze.cosine.ren/juejin/8def5bc00bf34904b2f174f4ea4b3205~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/1330a016575f4d45be1b36544098b7da~tplv-k3u1fbpfcp-watermark.png)

如上图，登陆时向什么地址做了什么动作？

- 使用了post方法
- 目标域名：<https://sso.toutiao.com>
- 目标为：path/quick_login/v2/

携带了哪些信息，返回了哪些信息？

- 携带信息
  - Post body，数据格式为form
  - 希望获取的数据格式为json
  - 已有的cookie
- 返回信息
  - 数据格式json
  - 种cookie的信息

那么下一次进入页面的时候，为什么能够记住登陆态呢？

#### 鉴权

- Session + cookie （大部分这种门户网站）
  - 用户发起提交请求给服务器，包括用户名密码等等
  - 服务器处理，鉴别其正确性，若正确则返回Session将其种到cookie（Set-Cookie:session = ......）
  - 用户再发送时：GET Cookie:session=....
  - 服务器处理鉴别后返回一些登陆信息的
- JWT（JSON web token）
  - 服务器本地不会存储
  - 返回的token唯一性，登陆时间短等

![image.png](https://backblaze.cosine.ren/juejin/94072b3ee6964bfe9ccd6d1a790996da~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/50f8486f6a4b450c87558ff15c5a41c8~tplv-k3u1fbpfcp-watermark.png)

- SSO：单点登录（Single Sign On）

![image.png](https://backblaze.cosine.ren/juejin/2131c3a1abed46419607069afb8da352~tplv-k3u1fbpfcp-watermark.png)

如图，讲解的很清楚。

## 实际应用

[XMLHttpRequest - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

#### AJAX**之**XHR

- XHR： XMLHttpRequest
- readyState

|      |                  |                                                  |
| ---- | ---------------- | ------------------------------------------------ |
| 0    | UNSENT           | 代理被创建，但尚未调用open()方法。               |
| 1    | OPENED           | open()方法已经被调用。                           |
| 2    | HEADERS_RECEIVED | send()方法已经被调用，并且头部和状态已经可获得。 |
| 3    | LOADING          | 下载中; responseText 属性已经包含部分数据。      |
| 4    | DONE             | 下载操作已完成。                                 |

#### AJAX之Fetch

- XMLHttpRequet的升级版
- 使用Promise
- 模块化设计，Response，Request，Header对象
- 通过数据流处理对象，支持分块读取

#### node中标准库: HTTP/HTTPS

- 默认模块，无需安装其他依赖
  功能有限/不是十分友好

#### 常用的请求库: axios

- [起步 | Axios 中文文档](https://www.axios-http.cn/docs/intro)
- 支持浏览器、nodejs环境
- 丰富的拦截器

```js
//全局配置
axios.defaults.baseURL = "https://api.example.com";
//添加请求拦截器
axios.interceptors.request.use(function (config) {
 //在发送请求之前做些什么
 return config;
}，function (error) {
 //对请求错误做些什么
 return Promise.reject(error );
});

//发送请求
axios( { 
    method: 'get',
    url: 'http://test.com',
    responseType: 'stream
    }).then( function(response) {
    response.data.pipe( fs.createWriteStream('ada_lovelace.jpg'))
});
```

#### 网络优化

- [HTTP/2 - A Real-World Performance Test and Analysis | CSS-Tricks - CSS-Tricks](https://css-tricks.com/http2-real-world-performance-test-analysis/)

  ![image.png](https://backblaze.cosine.ren/juejin/4a15399deba94753848a5a4f8dcdb5b1~Tplv-K3u1fbpfcp-Watermark.png)

- 预解析、预连接等
- 重试是保证稳定的有效手段，但要防止其加剧恶劣情况（比如网络连接就是断开了）。
- 缓存合理使用，作为最后一道防线。

## 了解更多

### 不止HTTP协议一个选择

#### 扩展 - 通信方式

##### WebSocket

- 浏览器与服务器进行**全双工通讯**的网络技术
- 典型场景：实时性要求高，例如**聊天室**
- URL使用**ws://**或wss://等开头

![image.png](https://backblaze.cosine.ren/juejin/1ab8ceb356a8478aa0b717dae29bd5a0~tplv-k3u1fbpfcp-watermark.png)

##### UDP

QUIC：Quick UDP Internet Connection 基于UDP

- 0-RTT建联（**首次建联除外**)。
- 类似TCP的**可靠传输**。
- 类似TLS的**加密传输**，支持完美前向安全。
- 用户空间的拥塞控制，最新的BBR算法。
- 支持h2的基于流的多路复用，但没有 TCP的HOL问题。
- 前向纠错FEC。
- 类似MPTCP的Connection migration。
- 应用暂不多

![image.png](https://backblaze.cosine.ren/juejin/Abd89ebdecba43f680c1e1189bce987d~Tplv-K3u1fbpfcp-Watermark.png)

## 总结感想

今天讲师小姐姐声音超温柔的介绍了HTTP及其常见协议分析、报文结构、缓存策略分析，还讲解了其具体的业务场景使用。

> 本文引用的内容大部分来自杨超男老师的课——HTTP实用指南

---
title: 青训营 |「Web开发的安全之旅」
link: note/front-end/bytedance-note/web-safe-getting-started
catalog: true
date: 2022-01-25 14:30:17
subtitle: Web安全相关知识，包括Web攻击的种类、防御方式等
lang: cn
tags:
  - 前端
  - Web安全
  - XSS
categories:
  - [笔记, 青训营笔记]
---

# 本节课重点内容

安全问题很常见，会危害

- 用户
- 公司
- 程序员（祭天 QAQ）

## 两个角度看 web 安全

### 假如你是一个 hacker——攻击

#### 跨站脚本攻击 XSS(Cross Site Scripting)

![image.png](https://backblaze.cosine.ren/juejin/642c367bce854aeba444870401a60cfa~Tplv-K3u1fbpfcp-Watermark.png)

注入恶意脚本，完成攻击，后果：泄露用户隐私等

XSS 主要利用了开发者对用户提交内容的盲目信任

![image.png](https://backblaze.cosine.ren/juejin/46df16645186444fb853b329f03722a7~tplv-k3u1fbpfcp-watermark.png)

**特点**

- 通常**难以从 UI 上感知**（一般都是暗地里执行脚本）
- 窃取用户信息（**cookie/token**）
- **绘制 UI（如弹窗等）**，诱骗用户点击/填写表单

举个栗子

```js
public async submit(ctx) {
    const {content, id} = ctx.request.body;
    await db.save({
       content, // 没有对content进行过滤！！
       id
    });
}
public async render(ctx) {
    const { content } = await db.query({
        id: ctx.query.id
    });
    // 没有对content进行过滤！！
    ctx.body = `<div>${content}</div>`;
}
```

可以看到上述代码，压根没有对用户输入的 content 内容进行任何过滤。这个时候就可以提交一个`<script>alert('xss');</script>`脚本，进行攻击

xss 攻击也分几大类：Store XSS、Reflected XSS、DOM-based XSS、Mutation-based XSS

##### Store XSS

- 提交的恶意脚本被**存在数据库**中
- 访问页面 -> 读数据 == 被攻击
- **危害最大**，对全部用户可见
- 如：某个视频网站，上传了恶意脚本被存到数据库中，从此电商网站上便多了一个视频共享账户。

##### Reflected XSS

- 不涉及数据库

- 从 **URL** 上攻击，在 URL 上带上脚本

  ![image.png](https://backblaze.cosine.ren/juejin/88c27e79158645c1a293249378d971a6~Tplv-K3u1fbpfcp-Watermark.png)

##### DOM-based XSS

- 不需要服务器的参与

- 恶意攻击的发起+执行，全在浏览器完成

  ![image.png](https://backblaze.cosine.ren/juejin/f120875727634ff7abeb41a2174c616e~tplv-k3u1fbpfcp-watermark.png)

- 完成注入脚本的地方，是由浏览器来的，这是它与 Reflected XSS 的不同之处

##### Mutation-based XSS

- 一个巧妙地攻击方式，利用浏览器的特性

  > 如果用户所提供的富文本内容通过 javascript 代码进入 innerHTML 属性后，一些意外的变化会使得这个认定不再成立：浏览器的渲染引擎会将本来没有任何危害的 HTML 代码渲染成具有潜在危险的 XSS 攻击代码。

- 巧妙，最难防御的一种方式,攻击者非常的懂浏览器

![image.png](https://backblaze.cosine.ren/juejin/337518efa2844250a0bcf70cfc76fd60~Tplv-K3u1fbpfcp-Watermark.png)

#### Cross-site request forgery（CSRF，跨站伪造请求）

- 在用户不知情的前提下

- **利用用户权限**(cookie)

- **构造**指定 HTTP **请求**，进而窃取或修改用户敏感信息

  ![image.png](https://backblaze.cosine.ren/juejin/1d29931c3bf24265bf503f964401c6e7~tplv-k3u1fbpfcp-watermark.png)

  一个用户访问了一个恶意的页面，这个页面向银行发送一个转账请求，ServerA 为银行的服务器，发现这个请求带有用户的 cookie，成功

  > CSRF 通过伪装来自受信任用户的请求来利用受信任的网站。与[XSS](https://link.jianshu.com/?t=http://baike.baidu.com/view/50325.htm)攻击相比，CSRF 攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比[XSS](https://link.jianshu.com/?t=http://baike.baidu.com/view/50325.htm)`更具危险性`。

#### Injection（注入）

- SQL 注入：通过 SQL 参数进行注入

  ![image.png](https://backblaze.cosine.ren/juejin/4e0499bba56f4dc69093fb38c4fa06a8~tplv-k3u1fbpfcp-watermark.png)

  案例：读取请求字段，直接以字符串的形式拼接 SQL 语句

  ```js
  public async rederForm(ctx) {
      const {username, form_id } = ctx.query;
      const result = await sql.query(`
       SELECT a, b, c FROM table
       WHERE username = ${username}
       AND form_id = ${form_id}
      `);
      ctx.body = renderForm(result);
  }
  ```

  那么攻击者可以传入一个 userName：`any; DROP TABLE table;` ，于是被动删库跑路成就达成√

- 命令行注入等![image.png](https://backblaze.cosine.ren/juejin/5e3d42c1f4754e648fc9bf793c315e02~tplv-k3u1fbpfcp-watermark.png)

- 读取+改进行流量攻击

  ![image.png](https://backblaze.cosine.ren/juejin/53c32ca224314a3394d709b9b08e3717~tplv-k3u1fbpfcp-watermark.png)

#### Denial of Service（DOS）攻击

- 通过某种方式(构造特定请求)，导致服务器资源被显著消耗,

- 来不及响应更多请求，导致请求挤压，进而雪崩效应。

- 拓展：正则表达式——贪婪模式

  - 重复匹配时，`?` /`no ?` ：满足`”一个即可“` / `尽可能多`

- 例子：ReDoS:基于正则表达式的 DoS

- 贪婪：n 次不行 ? n-1 次再试试?——回溯

  ![image.png](https://backblaze.cosine.ren/juejin/Ff22b364393045b99c3139a97e5c29ba~Tplv-K3u1fbpfcp-Watermark.png)

- Distributed Dos （DDOS）

  - 短时间内，来自大量**僵尸设备**的请求流量，服务器不能及时完成全部请求，导致请求堆积，进而雪崩效应，无法响应新请求。（量大就完事儿了）

  - 特点：

    - 直接访问 IP

    - 任意 API

    - 消耗大量带宽（耗尽）

      ![image.png](https://backblaze.cosine.ren/juejin/f866aa26f1a346e08b8f646137e0189b~tplv-k3u1fbpfcp-watermark.png)

#### 中间人攻击（传输层）

- **明文传输**

- **信息篡改不可知**

- **对方身份未验证**

  ![image.png](https://backblaze.cosine.ren/juejin/910915a7c3484d038d381b4d0990b51c~tplv-k3u1fbpfcp-watermark.png)

### 假如你是一一个开发者一一防御

#### XSS 攻击防御

- 永远**不要信任用户**的提交内容

  - **不要**将用户的提交内容**直接转换成 DOM**

- 现成工具

  - 主流框架默认防御 XSS（react 等）
  - google-closure-library
  - 服务端：DOMPurify

- 用户需求：不讲武德，必须动态生成 DOM？

  - new DOMParser();

  - svg：也要扫描，因为其中也可以插入 script 标签

  - 不要用户自定义跳转链接（或者做好过滤）！

    `<a href="javascript:alert('xss')"></a>`

- 自定义样式也要留意![image.png](https://backblaze.cosine.ren/juejin/8e67055919de46148ce6f280d1ed61fe~tplv-k3u1fbpfcp-watermark.png)

##### 同源策略（CSP）

- 协议
- 域名
- 端口

任意一者不同，跨域×

[浏览器的同源策略 - Web 安全 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

一般的同源请求都是没有问题的，而跨域的不行，CSP 允许开发者定义

- 哪些源（域名）是被认为是安全的
- 来自安全源的脚本可以被执行，否则直接抛错
- 对 eval + inline script 直接拒绝
- 设置

  - 服务器的响应头部

  ```plain
   Content-Security-Policy: script-src 'self'; // 同源
   Content-Security-Policy: script-src 'self' https://domain.com
  ```

  - 浏览器的响应头部

  ```html
  <meta http-equiv=" Content-Security-Policy" content="script-src self" />
  ```

#### CSRF 攻击防御

![image.png](https://backblaze.cosine.ren/juejin/822df87c893e470aa6d84dfba6702e4a~tplv-k3u1fbpfcp-watermark.png)

- Origin + Referrer
- 其他判断【请求来自于合法来源】的方式
  - 先有页面，后有请求
    - if 请求来自合法页面
    - then 服务器接受过页面请求
    - then 服务器可以标识
- ![image.png](https://backblaze.cosine.ren/juejin/C328ef733885407e87d34d6cbf369a6f~Tplv-K3u1fbpfcp-Watermark.png)

- iframe 攻击：限制 Origin 是吧，那我同源请求

- 避免 GET + POST 一起请求，攻击者一石二鸟！

  ```js
  // 不要像下面这样将更新+获取逻辑放到同一个GET接口
  public async getAndUpdate(ctx) {
      const { update, id } = ctx.query;
      if (update) {
          await this.update(update);
      }
      ctx.body = await this.get(id);
  }
  ```

- SameSite Cookie

  - 限制 Cookie domain

  - 页面域名是否匹配

  - 依赖 cookie 的第三方服务怎么办？

    > 内嵌一个 X 站播放器，识别不了用户登录态，发不了弹幕
    >
    > `Set-Cookie: SameSite=None; Secure ;`

  ![image.png](https://backblaze.cosine.ren/juejin/229b150da1cc42faae95e8e03b5d9d82~Tplv-K3u1fbpfcp-Watermark.png)

- SameSite vs CORS（跨站资源共享）

  ![image.png](https://backblaze.cosine.ren/juejin/8617447577294e10a51366ec5fffa691~tplv-k3u1fbpfcp-watermark.png)

以上这么多防御 CSRF 的方法，那么什么是防御 CSRF 的正确姿势呢？写一个中间件，专门生成这方面的防御。

#### Injection 防御

- 找到项目中查询 SQL 的地方

- 使用 prepared statement

  ```plain
  PREPARE q FROM 'SELECT user FROM users WHERE gender = ?';
  SET @gender = 'female';
  EXECUTE q USING @gender;
  DEALLOCATE PREPARE q;
  ```

- 最小权限原则

  - 所有命令都不要用 sodo || root ×

- 建立允许名单 + 过滤

  - rm 坚决拒绝

- 对 URL 类型参数进行协议、域名、ip 等限制

  - 避免攻击者访问内网

#### 防御 DoS

- Code Review （避免贪婪匹配等）
- 代码扫描 + 正则性能测试
- 避免用户提供的使用正则

#### 防御 DDos

![image.png](https://backblaze.cosine.ren/juejin/a226e027218f4859b2cc48e3a4d491e8~tplv-k3u1fbpfcp-watermark.png)

#### 传输层——防御中间人

搬出大名鼎鼎的 HTTPS

- 可靠性：加密
- 完整性：MAC 验证
- 不可抵赖性：数字签名

![image.png](https://backblaze.cosine.ren/juejin/6543366d374e40e2b3d5f416a1a13ec6~Tplv-K3u1fbpfcp-Watermark.png)

- 拓展：数字签名

  - 私钥（自己藏好）

  - 公钥（公开可见）

  - CA：Certificate Authority 证书机构

  - 数字签名，浏览器内置 CA 公钥

    ![image.png](https://backblaze.cosine.ren/juejin/5b365d8c14274b89ac46232184765713~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/1e477a3d38294c1a900b170673b124d2~tplv-k3u1fbpfcp-watermark.png)

- 当签名算法不够健壮时：被暴力破解（现在都已比较完善）

**HTTP Strict-Transport-Security（HSTS）**

- 将 HTTP 主动升级到 HTTPS

**[Subresource Integrity（SRI）](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity)**

静态资源被劫持篡改？对比 hash

![image.png](https://backblaze.cosine.ren/juejin/Af0b7da8f78e4bc5b9ff452566d5d9d9~Tplv-K3u1fbpfcp-Watermark.png)

## 尾声

- 安全无小事
- 使用的依赖(npm package， 甚至是 NodeJS)可能成为最薄弱的一环
  - **[left-pad 事件](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm.html)**
  - **[eslint-scope 事件](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes)**
  - **[event-stream 事件](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident)**
- 保持学习心态

## 总结感想

这节课老师图文并茂的讲解了 Web 安全相关的很多知识，非常有意思，包括 Web 攻击的种类、防御方式等

> 本文引用的内容大部分来自刘宇晨老师的课、MDN、外部博客引用：[这一次，彻底理解 XSS 攻击](https://juejin.cn/post/6912030758404259854#heading-17)、[浅谈 CSRF](https://www.jianshu.com/p/7f33f9c7997b)

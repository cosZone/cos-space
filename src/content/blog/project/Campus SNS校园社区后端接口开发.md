---
title: Campus SNS 校园社区后端接口开发（附前端地址）
link: campus-sns-develop
catalog: true
subtitle: 使用 koa2 + Sequelize 搭建的校园社区后端，巧妇难为无米之炊！一个厉害的项目的后端！ 
date: 2022-11-13 22:30:22
tags:
- 后端
- 项目
categories:
- 项目集锦
---

使用 koa2 + Sequelize 搭建的校园社区后端，巧妇难为无米之炊！一个厉害的项目的后端！

# 前言及项目介绍

这个项目是我刚学前端时参加的百度前端训练营进阶班的第一题，具备完善的校园社区功能及一个后台管理系统，于今年3月份开发，我负责的主要是后端的发帖管理、分区管理等地方的接口，在接口文档中就可以看到。当时团队里总共6人，3人参与开发后端，2人开发移动端前端，1人开发PC端，并且由于还年轻，写了挺多文档记录。

个人感觉这个接口系统麻雀虽小五脏俱全（某后端爷评价），既有两个前端（PC端的后台管理系统和手机端的校园社区），又有后端完善的接口，倒挺**适合新人**初学，也确实有过学弟学妹来问我我问题，故打算完善一下写篇博客总结一下。

后端项目一直运行在自己的云服务器上，可请求 <http://cosine.ren:8000> 尝试（~~轻点打，求求了，虽然有备份~~），哪天要是挂了我也不好说，建议大家本地运行前后端尝试~

个人认为**优点**是

- **文档**很齐全（接口文档、开发文档、bug记录...），这在以后的我看来也是很有用的事，实习之后就不怎么写文档了
- 基本的增删改查加上统计都有涉及到，接口规范遵循 `Restful` （老实说，当时不知道restful的概念但是自然而然的就用到了）
- 主要参数基本都有中间件进行校验，权限控制等，代码里的注释特别多
- 错误码有专门的说明，接口函数都有注释（实习之后愈发觉得这真的是太棒了...）

**缺点**问题也很明显

- **分支管理**压根没有（当时还不熟悉，加上大家开发的都是不同功能，直接在master分支开发并解决冲突）
- 很多功能**实现简单**，毕竟工期也就快一个月
- 当时刚学，也没有用 prettier 这类**代码格式化**工具，也没上 ts，现在的新项目基本都会使用 ts

# 在线地址及项目演示

上来先放源码地址，当时是在 gitee 进行开发，后来我将后端同步到了github

- 后端接口仓库：[campus-community-backend](https://github.com/yusixian/campus-community-backend)
- 前端（移动端）仓库地址： [campus-sns-campus-community（gitee）](https://gitee.com/honxinn/campus-sns-campus-community)
- 前端（PC端后台管理系统）仓库地址：[back-manage（gitee）](https://gitee.com/honxinn/back-manage)
- 接口文档地址：[校园社区后端接口文档](https://www.apifox.cn/apidoc/shared-9459ed60-58b2-45b8-b5a8-89a63d77357f/api-11836993)

如果觉得不错的话，就 star 一个吧~也欢迎提 issue 和 pr

## 后端接口

- 接口文档：<https://www.apifox.cn/apidoc/shared-9459ed60-58b2-45b8-b5a8-89a63d77357f/api-11836993>
- 仓库链接： <https://github.com/yusixian/campus-community-backend>
- 主要技术栈： `nodejs` `koa2` `websocket` `sequelize`
  - 使用 `PM2` 将项目部署至云服务器，配置 `Nginx` 反向代理
  - 使用 `koa-cors` 解决跨域问题，设置了错误日志及日志分割
  - 利用 `Sequelize ORM` 进行数据库的操作，使用 `JWT` 实现用户身份验证与信息加密，利用 `WebSocket` 实现在线用户数监测
  - 文章的**软删除**、恢复等

![image.png](https://backblaze.cosine.ren/juejin/915cbdc8cc5b42848b2883a15dea1dcc~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/be109940ff294f33a828d05bba7b6029~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/18f99c2b4a6a473ebb33c07b23e4036c~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/6750bfaa8d3f4e4ebd1c041a019f4783~tplv-k3u1fbpfcp-watermark.png)

## 前端（PC端后台管理系统）

- 前端（PC端后台管理系统）地址：<https://gitee.com/honxinn/back-manage>
- 基于 `Vue3` + `Vite` 构建

![image.png](https://backblaze.cosine.ren/juejin/Fd5a2bf10be047edb453f81be9eaaf09~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/E058e9a2c7fd486aa0004369c4f10772~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/a320fa5f6170468c81548b1b8cfcfb68~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/d577025f5fee4850a88b1f85d981e818~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/6ea64d60729f4d88a3a7ec2a3ebedd1f~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/1523139daaa1490f934a814175360e1f~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/cddfac51e0a14b9684e54ed32ce29de0~tplv-k3u1fbpfcp-watermark.png)

## 前端（移动端）

- 前端（移动端）仓库地址：<https://gitee.com/honxinn/campus-sns-campus-community>
- 基于 `Vue3` + `Vite` 构建

| 演示 |  |
| --- | --- |
| ![image.png](https://backblaze.cosine.ren/juejin/fc24fe8a9c95491abb4edf1a3a4d0d22~tplv-k3u1fbpfcp-watermark.png) | ![image.png](https://backblaze.cosine.ren/juejin/5cb2a0b56061471292a941fe33e5ce7c~Tplv-K3u1fbpfcp-Watermark.png)  |
| ![image.png](https://backblaze.cosine.ren/juejin/d99975dee1d340088eff1c9b6ea55ab5~tplv-k3u1fbpfcp-watermark.png) | ![image.png](https://backblaze.cosine.ren/juejin/e64eaa3a6bd943c7b353e67b12a729b4~tplv-k3u1fbpfcp-watermark.png) |
| ![image.png](https://backblaze.cosine.ren/juejin/27576fb449184ca2aa81e7ef12fb9f18~tplv-k3u1fbpfcp-watermark.png) | ![image.png](https://backblaze.cosine.ren/juejin/5ef4ef2d469a4611af1b655f8a8a0f00~tplv-k3u1fbpfcp-watermark.png)|

# 开发文档

[开发记录文档](https://github.com/yusixian/campus-community-backend/blob/master/%E5%BC%80%E5%8F%91%E8%AE%B0%E5%BD%95%E6%96%87%E6%A1%A3.md) 记录了从 0 到 1 的搭建记录，非常详细的~

[bug回忆录](https://github.com/yusixian/campus-community-backend/blob/master/bug%E5%9B%9E%E5%BF%86%E5%BD%95.md) 顾名思义，搭建过程中的问题记录

### 接口功能说明

- [x] 功能实现
  - [x] 数据统计
    - [x] 获取社区十大热帖
    - [x] 获取社区十大红人
    - [x] 近7日文章增长量等统计
  - [x] 用户管理 user
    - [x] 上传头像
    - [x] 修改用户信息
  - [x] 文章管理 article
    - [x] 添加文章
    - [x] 删除/屏蔽文章
    - [x] 获取文章总数
    - [x] 恢复被删除/屏蔽文章
  - [x] 评论管理 comment
    - [x] 回复文章
    - [x] 回复评论
  - [x] 分区管理 partition
    - [x] 添加分区
    - [x] 删除分区
    - [x] 自定义分区图标
  - [x] 系统管理
    - [x] 在线用户
    - [x] 操作日志
  - [x] 用户的注册及登录
    - [x] 用户信息修改等
  - [x] 普通用户功能
    - [x] 发帖 (新发布帖子待管理员审核通过后方可发布)
    - [x] 编辑
    - [x] 删除自己的帖子
  - [x] 管理员功能
    - [x] 帖子修改、删除功能
    - [x] 屏蔽、恢复功能
    - [x] 帖子审核功能
  - [x] 可选功能
    - [x] 支持模糊搜索、搜索关键字联想
    - [x] 支持点赞
    - [x] 支持收藏
    - [x] 支持发图片

## 目录结构

基本上见名知义

- src
  - app
    - `errHandler.js`错误统一处理函数
    - `index.js`进行app的实例化
  - config
    - `config.default.js` 系统的默认配置文件,用dotenv读取`.env`中的配置并暴露出来
  - constant
    - `err.type.js` 错误类型的汇总(常量)
  - controller 所有的业务逻辑
    - `article.controller.js` 文章相关的业务逻辑
    - `user.controller.js` 所有用户相关的业务逻辑
    - ……
  - db
    - `seq.js` 连接数据库的控制文件(通过`.env`中默认配置连接本地数据库)
  - middleware 所有的中间件
    - `article.middleware.js` 文章相关的中间件
    - `auth.middleware.js` 解析token的中间件
    - `user.middleware.js` 用户相关的中间件
    - ……
  - model
    - `article.model.js` 文章信息的数据表文件
    - `user.model.js` 用户信息的数据表文件
    - ……
  - public 静态资源的存储
    - assets 存放图片等资源文件
    - css 存放`css`文件
    - uploads 上传的图片存放地
  - routers
    - `article.route.js` 文章相关的路由注册
    - `user.route.js` 用户相关的路由注册
    - `index.js` 统一注册路由
    - ……
  - service
    - `article.service.js` 文章相关的数据库操作
    - `user.service.js` 用户相关的数据库操作
    - ……
  - views 存储一些路由的模板
    - `index.html` 主路由的html模板
- logs
  - `err.log` 存放错误日志
  - `out.log` 存放输出日志
  - `seq.log` 存放查询日志
- main.js 导入封装的app并在`.env`中指定的端口号进行监听
- .env 存储配置信息
- .gitignore git提交默认忽略`node_modules`(下载的依赖文件)
- package.json npm的插件版本号等
- 一些文档

## 运行方式（后端）

```bash
# clone 项目
git clone https://github.com/yusixian/campus-community-backend.git
# cd到项目目录
# 下载所需依赖
npm install
```

### 数据库的相关配置

- 1.在本地打开数据库(一般都是默认打开的mysql) 如果没有打开使用cmd命令`net start mysql`
- 2.登录数据库后建立一个数据库，比如名字叫`schoolcommunity`，当然你也可以用`navicat`等来创建
- 3.在本项目的 `.env` 文件中更新 mysql 的相关配置
- 4.使用命令`npm run createModel`来创建所有的数据表

### 本地运行

创建完数据库后

```bash
npm install
npm run dev
```

# 开发心得

作为一名前端人，这次后端接口的开发一是有了能独立编写自己的轻量接口的能力，二是也知道了跟后端沟通时应注意哪些细节问题，大家都不容易，三是写接口文档确实费时费力，有时候还会吃力不太好写了忘记改，所以~~能够拥有相当完善的接口文档说明你的后端人特好~~。在今后开发的时候，最好也先按这种思路跟后端对齐一下，再进行开发，很多时候能节省不少功夫。

引用心圆佬引用阿里前端练习生计划开营仪式中梓骞老师说的一段话来收个尾：

- 他们也许不懂**交互设计** 但是没人比他们懂交互设计的实现以及每一个细节

- 他们也许不懂**视觉设计** 但是没人比他们懂视觉设计如何变为现实

- 他们也许不懂**数据库** 但是他们其实才是数据的第一消费者

- 他们也许不是**产品经理** 但是产品的体验几乎都是由他们来决定

~~好吧，我纯粹就是喜欢这段话~~

我期望着尽可能做到多少都懂一些，努力做一个合格的前端人。

下次发文，应该就是开始做做 ts 类型体操了。

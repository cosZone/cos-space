---
title: Hexo + vercel部署博客
link: hexo-vercel-deploy-blog
catalog: true
lang: cn
date: 2022-07-31 01:02:56 
tags:
- 前端
- hexo
categories:
- 工具
---

Hexo + Shoka主题 + vercel搭建的属于自己的博客站点

Github地址: [cos_blogs](https://github.com/yusixian/cos_blogs)

没错，我又又又在折腾了，不过这次是在往更简易的方向折腾，原因是最近公司的项目有用到 vercel，自己用个人版试了试然后就回不去了耶

**现在所有博客如果遇到问题、文章错漏都可以直接在 Github 上的 issue 反馈~**

通过 vercel 部署，强烈安利 vercel！个人版一个月 100G 流量，小站点完全够用~

用Markdown写文章真的超级棒！

# 为什么要换成 vercel

之前的时候使用 GitPage 搭博客，到现在也暴露了不少不足之处

- 目录散乱，直接将public部署到了根目录，没有目录结构
- 还需要另开一个仓库进行整体hexo源文件的备份管理，比较麻烦
- 国内 GitPage 速度访问速度较慢，域名解析也得配置（虽然并不麻烦）
- 每次发布新博客，得 hexo g -d 先删除原有的文件，再重新生成文件
- 仓库只能public（也不算确定，本来就是对外看的）

而 vercel 的优点如下

- 国内速度也很快，且能够自定义域名随便添加
- 每次 提交、分支、合并分支都会生成url，并且有历史记录，备份回滚相当 easy
- serverless 开发模式，比较简单，比较方便
- 仓库直接从 GitHub 导入，私人公开的都可以

在 Setting 中 进行 vercel 设置，覆盖默认设置、绑定新的域名等

![vercelSetting](/img/post/vercel部署Hexo博客/vercelSetting.png)

部署结果可以在Deploy部分看到

![vercel部署](/img/post/vercel部署Hexo博客/vercel部署.png)

每个分支/提交等部署生成url的方式在这里：[Generated URLs](https://vercel.com/docs/concepts/deployments/generated-urls)

# 一些教程

关于 vercel+hexo 的部署方式，具体的可以看这几篇博客!

- [vercel 部署静态博客](https://juejin.cn/post/7063329711341961230)
- 用vercel部署 -> [如何使用 vercel + hexo 搭建博客](https://zhuanlan.zhihu.com/p/342790013)
- shoka主题官方教程 -> [Hexo 主题 Shoka 使用说明](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
  - [**🚀快速开始**](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/) -> [💌依赖插件](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/dependents/) -> [📌基本配置](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/config/) -> [🌈界面显示](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/display/) -> [🦄特殊功能](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/special/)
- 关于shoka主题我自己总结的一篇配置记录: [Hexo 博客 Shoka 主题配置记录](https://ysx.cosine.ren/hexo-shoka-config/)

## 目录说明

```
cos_blogs
├─ package.json
├─ README.md
├─ scaffolds    存放生成草稿/文章/页面基础模板
│  ├─ draft.md
│  ├─ page.md
│  └─ post.md
├─ source
│  ├─ about     关于我的页面
│  ├─ friends   友链页面
│  ├─ img       静态图片资源：文章首图等
│  ├─ musics    歌单页面
│  ├─ _data     翻译文件，用于翻译文章
│  │  └─ languages.yml     自定义菜单等处显示的文字
│  ├─ _drafts   草稿文章 不会发布
│  └─ _posts    已发布的文章
├─ themes  主题目录
│  └─ shoka     shoka主题
│     ├─ languages     语言
│     ├─ layout        一些HTML模板等
│     ├─ source        主题源码
│     └─ _images.yml   随机图库列表
├─ yarn.lock
├─ _config.shoka.yml     shoka主题相关配置
└─ _config.yml           hexo相关配置文件
```

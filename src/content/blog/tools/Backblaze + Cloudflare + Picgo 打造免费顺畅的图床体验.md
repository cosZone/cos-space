---
title: Backblaze + Cloudflare + Picgo 打造免费顺畅的图床体验
link: backblaze-cloudflare-picgo-imgbed
catalog: true
lang: cn
date: 2023-04-17 00:59:10
tags:
- 工具 
categories:
- 工具
---

最近有用到oss存储的需求，跟群友调研了下国内 & 国外的 oss 后，深感找个合适的oss不容易，国内的有阿里云OSS、七牛云、腾讯云，国外的有 Backblaze、Cloudflare R2等，经过~~激烈~~讨论后我决定使用 Backblaze + Cloudflare，这个决定其实并不难，因为 Backblaze 提供的云存储服务价格非常低，而且稳定性和快速性也非常不错。同时，Backblaze 和 Cloudflare 之间的数据传输是免费的。

## 原因及介绍

Backblaze 提供的云存储服务价格低廉，而 Cloudflare 则可以提供稳定且快速的 CDN 服务，两者之间的数据传输也是免费的，使用 Picgo 结合 s3插件 则可以轻松解决图片上传到 Backblaze 的问题。

### Backblaze 简介

> [Backblaze](https://link.zhihu.com/?target=https%3A//www.backblaze.com/)  是一个提供云存储服务的公司，它的B2 Cloud Storage 产品可以让你以极低的价格存储大量的数据。B2 Cloud Storage 的存储费用只有**0.005美元/GB/月**，下载费用只有 **0.01美元/GB**。而且，如果你使用Cloudflare 的CDN服务，那么下载费用就是免费的，这是因为Backblaze 和Cloudflare 是Bandwidth Alliance 的成员，他们之间没有数据传输费用。这样一来，你就可以用很少的钱拥有一个高性能的云存储空间。

优点：**免费、稳定、收费额度的价格也很低廉**

- **免费额度足够大量，付费价格足够低廉**：每月有 10GB 的 **免费额度**，每日有 1GB 的免费下载流量，作为个人图床来说完全够用！并且超过的收费部分每GB也只需0.005美元
- **结合 Cloudflare 下载费用免费**：因为 Backblaze 和 Cloudflare 都是 Bandwidth Alliance的成员，他们之间的数据传输是免费的
- 丰富的 **API**：Backblaze 提供了丰富的 API，可以方便地集成到自己的应用程序中，提高开发效率和便捷性。
- 支持**多种上传方式**：除了 Picgo 外，Backblaze 还支持多种上传方式，如官方提供的 web 界面、CLI 工具、第三方客户端等。
- **不限制文件类型**：相比于一些图床服务只能存储图片类型的文件，Backblaze 没有文件类型的限制，用户可以存储各种类型的文件，如视频、文档、音频等。（~~甚至有人拿来当云盘~~）

缺点：**国内速度不好说、学习成本高、风险分散不均**

- 国内网络环境对于国外云存储服务的访问速度有限制，可能导致上传和下载速度较慢。
- API 调用次数限制：但是绑了卡就没限制
- 学习成本高：使用这个组合需要手动配置多个服务，存在一定的学习成本。
- 风险分散不均：由于数据存储和 CDN 服务分别由 Backblaze 和 Cloudflare 提供，因此存在一定的风险分散不均的情况，比如某个服务出现问题时可能会影响整个图床的正常使用。

当然这些对于这个冲浪选手来说是完全够用了~

### Cloudflare 简介

> [Cloudflare](https://link.zhihu.com/?target=https%3A//www.cloudflare.com/) 是一个提供全球CDN和安全服务的公司，它可以让你的网站更快、更安全、更智能。Cloudflare 有一个免费套餐，可以让你享受无限制的流量和请求，以及很多高级功能，比如SSL证书、防火墙、页面规则、转换规则等。通过 Cloudflare ，你可以将你的 **Backblaze B2 存储桶绑定到你自己的域名**上，还可以设置规则来隐藏桶名、Remove Headers等，比如 files.example.com ，这样你就可以用自己的域名访问你的图片，而不是Backblaze B2 的默认域名。Cloudflare 还可以为你的图片提供缓存和优化，提高图片的加载速度和质量。

### Picgo 简介

> [Picgo](https://github.com/Molunerfinn/PicGo/releases)  是一个开源的图片上传工具，它可以让你方便地将图片上传到各种图床服务，包括Backblaze B2（有s3插件支持）。Picgo 支持Windows、MacOS 和Linux 系统，它有一个简洁的界面和丰富的插件。你可以通过快捷键、拖拽、剪贴板等方式上传图片，也可以对图片进行压缩、裁剪、水印等处理。Picgo 还可以自动生成图片的URL和Markdown 代码，方便你在网上引用图片。

## 前提

需要以下几样东西：

- 一个 [Backblaze](https://link.zhihu.com/?target=https%3A//www.backblaze.com/) 账户（邮箱注册）
- 一个 [Cloudflare](https://link.zhihu.com/?target=https%3A//www.cloudflare.com/) 账户（邮箱注册）
- 一个自己的域名（我用的是阿里云的域名，很早就买了的）
- [Picgo 客户端](https://github.com/Molunerfinn/PicGo/releases)

如果你还没有这些东西，请先去注册/下载/整一个~

关于详细的配置步骤，下面这两篇博文是我认为比较好并且详细的，完全可以顺着走下去：

- [使用 Cloudflare + Backblaze B2+PicGo的搭建免费图床](https://zhuanlan.zhihu.com/p/604285576)
- [使用PicGo+CF(Cloudflare)+B2(Backblaze)作为博客图床](https://blog.ostdb.info/54300)

只不过由于更新等，接下来我主要会说一下我遇到的几个坑点或者原文没有讲的很清楚的地方~

## AliYun 域名控制台更换 DNS 服务到 Cloudflare

转移后就是在 Cloudflare - DNS - Records 进行管理了~

更改DNS服务器需要耗费一些时间，更改成功后，阿里云域名控制台会显示如下

![image.png](https://backblaze.cosine.ren/2023/04/20230417002448.png)

需要注意的是导入域名到Cloudflare的时候我似乎丢失了几条域名解析，记得导入完后检查一遍，比如我的vercel相关解析貌似有一些没导入成功，最后手动配置解析了一下，如果你也有需求，记得导入后检查一下自己域名的解析记录~

![image.png](https://backblaze.cosine.ren/2023/04/20230417003924.png)

## Cloudflare 配置 Transform Rules 重写 URL

根据  [使用 Cloudflare + Backblaze B2+PicGo的搭建免费图床](https://zhuanlan.zhihu.com/p/604285576) 这篇文章提到的重写 URL 路径，在我配置的时候不能直接像文中那样 **Edit expression** 就可以了，而是需要这么玩儿：

![image.png](https://backblaze.cosine.ren/2023/04/20230417001524.png)

- `(http.request.uri.path ne "/file/{bucketName}" and http.host eq "{your custom domain}")`

- Path 重写为`concat("/file/{bucketName}",http.request.uri.path)`

这里的配置实现了 `example.com/xxx.jpg` -> `example.com/file/{bucketName}/xxx.jpg` 的转换，既不会暴露自己的桶名称，还缩短了URL~

## 在 Picgo 中配置 Backblaze 上传

按照博文中 [配置S3插件](https://blog.ostdb.info/54300/#%E5%AE%89%E8%A3%85PicGo%E5%8F%8APicGo-S3-Plugin) 这一步，我在这里的配置死活不对，直到我查到了这篇文章：[Getting Started with the S3 Compatible API – Backblaze Help](https://help.backblaze.com/hc/en-us/articles/360047425453-Getting-Started-with-the-S3-Compatible-API#:~:text=To%20find%20the%20S3%20Endpoint%20for%20your%20account%2C,your%20bucket%2C%20you%E2%80%99ll%20see%20the%20S3%20Endpoint%20listed.)

![image.png](https://backblaze.cosine.ren/2023/04/20230416232027.png)

这下一切就很晴朗了，Endpoint就填入自定义节点，地区则是自己的 S3 Endpoint 的第二部分，如图中的 Endpoint 的地区就是 us-west-001

![](https://help.backblaze.com/hc/article_attachments/360069692933/mceclip0.png)

然后需要将 PathStyleAccess 打开，而下面的 public-read 不用动

![image.png](https://backblaze.cosine.ren/2023/04/20230416232458.png)

配置成功~ 撒花~~

对了，使用 **obsidian** 写这篇文章的时候，图床就是使用  [Image Auto Upload Plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin)  这个插件结合 Picgo，体感十分丝滑

![image.png](https://backblaze.cosine.ren/2023/04/20230417002602.png)

![image.png](https://backblaze.cosine.ren/2023/04/20230417002531.png)

如果是mac用户，推荐使用 DropShare，直接支持 Backblaze！

以上就是我踩的一些坑以及解决方案啦，希望能帮到同样有需求的人~~

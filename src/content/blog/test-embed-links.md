---
title: '测试链接嵌入功能'
date: 2025-12-06
categories: ['工具']
tags: ['测试', '嵌入', '功能']
description: '测试 Tweet 嵌入和链接预览功能'
draft: true
---

# 测试链接嵌入功能

这篇文章用于测试自动嵌入独行链接的功能。

## Tweet 嵌入测试

下面是一条独行的 Twitter 链接,应该自动转换为 Tweet 组件:

https://twitter.com/vercel_dev/status/1997059920936775706

这是普通段落中的链接 [Vercel Tweet](https://twitter.com/vercel_dev/status/1997059920936775706),不应该被嵌入。

使用新域名 x.com 的 Tweet:

https://x.com/vercel_dev/status/1997059920936775706

## 通用链接预览测试

下面是一个独行的普通链接,应该显示 OG 预览卡片:

https://github.com/vercel/react-tweet

这是段落中的链接 [react-tweet](https://github.com/vercel/react-tweet),不应该被嵌入。

https://react-tweet.vercel.app/

https://zhuanlan.zhihu.com/p/1900483903984243480

## Codepen 链接嵌入

https://codepen.io/botteu/pen/YPKBrJX/

## 总结

- ✅ 独行的 Twitter/X 链接应该转换为 Tweet 组件
- ✅ 独行的其他链接应该显示 OG 预览卡片
- ✅ 段落内的链接保持原样
- ✅ 支持深色/浅色主题切换

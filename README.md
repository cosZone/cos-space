# 🚀 cosSpace

在 Astro 上复刻 Shoka 主题，之后考虑换一个名字～

## 前言

- 一开始的初衷是想很喜欢 [Shoka 主题](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)，但又觉得 Hexo 性能太差了，所以使用 Astro 尝试复刻。
- 我也有想过这么多的分类是否应该保留，想了想觉得还是保留了，可以选择不用这么复杂的分类。
- 再后来，就变成了我想要打造自己喜爱的博客。
- 一度纠结于，要复刻 Shoka 的很多样式吗，还是适当阉割改为自己喜爱的形式，最后决定，自己的博客自己做主～
- 轮播图？随机文章封面？为了性能也干掉吧（忍痛）
- 等开发到让我满意之后，要给这个主题起个名字呢。

## 📦 部署

### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FcosZone%2Fcos-space&project-name=my-cos-space&repository-name=my-cos-space)

### 本地开发

1. 克隆项目到本地

```bash
git clone https://github.com/cosZone/cos-space
```

2. 进入项目目录并安装依赖

```bash
cd cos-space
pnpm i
```

3. 启动项目

```bash
pnpm dev
```

## 🙏 鸣谢

感谢以下项目对 cosSpace 的开发提供的灵感及参考：

- [mx-space](https://github.com/mx-space)
- [Hexo 主题 Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- [waterwater.moe](https://github.com/lawvs/lawvs.github.io)
- [yfi.moe](https://github.com/yy4382/yfi.moe)
- [4ark.me](https://github.com/gd4Ark/gd4Ark.github.io)
- ...

## TODO

- [ ] Astro 搜索集成，使用 [Pagefind](https://pagefind.app/)，可参考 https://github.com/shishkin/astro-pagefind
- [ ] 智能文章[相关推荐](https://alexop.dev/posts/semantic-related-posts-astro-transformersjs/)
- [ ] 文档
- [ ] [Page CMS](https://css-tricks.com/using-pages-cms-for-static-site-content-management/)

# astro-koharu

“小春日和” 风格的 Astro 博客主题。

“小春日和” （こはるびより）指的是晚秋到初冬这段时期，持续的一段似春天般温暖的晴天。也就是中文中的“小阳春”。

灵感来自 Hexo 的 Shoka 主题，但不再追求一比一复刻，而是保留它的优点，用更轻量的技术栈，做一款属于自己的个人博客主题。

- 基于 **Astro**，静态输出，加载轻快
- 萌系 / 二次元 / 粉蓝配色，适合 ACG、前端、手账向个人站
- 支持多分类、多标签，但不会强迫你用复杂信息架构
- 尽可能的减少性能开销
- 使用 pagefind 实现无后端的全站搜索。

## 部署

### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cosZone/astro-koharu&project-name=astro-koharu&repository-name=astro-koharu)

### 本地开发

1. 克隆项目到本地

```bash
git clone https://github.com/cosZone/astro-koharu
```

2. 进入项目目录并安装依赖

```bash
cd astro-koharu
pnpm i
```

3. 启动项目

```bash
pnpm dev
```

## 功能特性

- 基于 Astro 5.x，静态站点生成，性能优异
- 优雅的深色/浅色主题切换
- 基于 Pagefind 的无后端全站搜索
- 完整的 Markdown 增强功能（GFM、代码高亮、自动目录）
- 灵活的多级分类与标签系统
- 特色周刊/系列文章支持
- 响应式设计
- 草稿与置顶功能
- 阅读进度条与阅读时间估算
- 友链系统与归档页面
- RSS 订阅支持

**完整使用指南：** 可查看详细的[功能使用文档](./src/content/blog/tools/astro-koharu-使用指南.md)，了解所有功能的配置和使用方法。

## 🙏 鸣谢

感谢以下项目对 astro-koharu 的开发提供的灵感及参考：

- [mx-space](https://github.com/mx-space)
- [Hexo 主题 Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- [waterwater.moe](https://github.com/lawvs/lawvs.github.io)
- [yfi.moe](https://github.com/yy4382/yfi.moe)
- [4ark.me](https://github.com/gd4Ark/gd4Ark.github.io)
- [纸鹿摸鱼处](https://blog.zhilu.site/)
- ...

---
title: Tailwind CSS v4.0 升级与 Astro 5.2 项目迁移记录
link: tailwind-update-v4-migrate
catalog: true
date: 2025-02-03 19:51:00
lang: cn
tags:
  - 前端
  - Tailwind
  - CSS
  - astro
categories:
  - [笔记, 前端]
---

自用小记。

[Tailwind CSS v4.0 - Tailwind CSS](https://tailwindcss.com/blog/tailwindcss-v4)

- [新的高性能引擎](https://tailwindcss.com/blog/tailwindcss-v4#new-high-performance-engine) - 完整构建的速度速度快 5 倍，增量构建的速度快于 100 倍以上 —— 以微秒为单位进行测量。
- [为现代 Web 设计](https://tailwindcss.com/blog/tailwindcss-v4#designed-for-the-modern-web) - 建立在前沿的 CSS 特性之上，使用级联层、 `@property` 和 `color-mix()` 等前沿 CSS 特性注册自定义属性。
- [简化的安装](https://tailwindcss.com/blog/tailwindcss-v4#simplified-installation) - 较少的依赖项，零配置，只需要 CSS 文件中的一行代码。
- [第一方 Vite 插件](https://tailwindcss.com/blog/tailwindcss-v4#first-party-vite-plugin) - 紧密集成，可实现最高性能和最低配置。
- [自动内容检测](https://tailwindcss.com/blog/tailwindcss-v4#automatic-content-detection) - 所有模板文件都是自动发现的，无需配置。
- [内置导入支持](https://tailwindcss.com/blog/tailwindcss-v4#built-in-import-support) - 无需额外工具即可捆绑多个 CSS 文件。
- [CSS-First 配置](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration) - 重新设计的开发人员体验，您可以直接在 CSS 而不是 JavaScript 配置文件中自定义和扩展框架。
- [CSS 主题变量](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables) - 您的所有 design tokens 都以原生 CSS 变量的形式暴露，因此您可以在任何地方访问它们。
- [动态实用程序值和变体](https://tailwindcss.com/blog/tailwindcss-v4#dynamic-utility-values-and-variants) - 不再需要猜测间距中存在哪些值，也不再需要为基本数据属性等扩展配置。
- [现代化的 P3 调色板](https://tailwindcss.com/blog/tailwindcss-v4#modernized-p3-color-palette) - 重新设计的更加生动的调色板，充分利用了现代展示技术。
- [容器查询](https://tailwindcss.com/blog/tailwindcss-v4#container-queries) - 可使用容器查询根据容器大小为元素设计样式，不再需要插件
- [新的 3D 变换实用程序](https://tailwindcss.com/blog/tailwindcss-v4#new-3d-transform-utilities) - 直接在 HTML 中的 3D 空间中变换元素，添加了用于进行 3D 变换的 API，例如 `rotate-x-*` ， `rotate-y-*` ， `scale-z-*` ， `translate-z-*` 和更多。
- [扩展的梯度 API](https://tailwindcss.com/blog/tailwindcss-v4#expanded-gradient-apis) - 径向和圆锥梯度，插值模式等。现在，线性梯度将角度作为值支持，因此您可以使用`bg-linear-45`等实用程序以 45 度角创建梯度。将`bg-gradient-*`重命名为`bg-linear-*`
- [@starting-style support](https://tailwindcss.com/blog/tailwindcss-v4#starting-style-support) - 新的`starting`变体增加了对新的 CSS [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) 功能的支持，从而在首次显示元素时可以过渡元素属性：
- [not-\* variant](https://tailwindcss.com/blog/tailwindcss-v4#not-variant) - 仅在元素不匹配另一个变体，自定义选择器或媒体或功能查询时样式。
- [甚至更多的新实用程序和变体](https://tailwindcss.com/blog/tailwindcss-v4#even-more-new-utilities-and-variants)，包括对`color-scheme`的支持， `field-sizing` ，复杂的阴影， `inert`等。

## 更多新变体

- **新的 [`inset-shadow-*`](https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow) 和 [`inset-ring-*`](https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring) 实用程序** - 使得在一个元素上最多可以堆叠四层盒子阴影。
- **新的 [`field-sizing`](https://tailwindcss.com/docs/field-sizing) 实用程序** - 用于自动化的文本列，而无需编写单行 JavaScript。
  - 使用`field-sizing-content`，允许表单控件根据内容调整其大小
  - 使用`field-sizing-fixed` 固定尺寸：
- **新的 [`color-scheme`](https://tailwindcss.com/docs/color-scheme)**  - 参考 [使用  light-dark() 的 CSS 配色方案相关颜色](https://web.dev/articles/light-dark?hl=zh-cn#introducing_light-dark)
- **新的 [`font-stretch`](https://tailwindcss.com/docs/font-stretch) 实用程序** - 用于仔细调整支持不同宽度的可变字体。
- **新的  [`inert`](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-inert-elements) 变体**  - `inert`变体使您可以样式的元素标记为`inert`属性，这对于添加视觉提示很有用，可以清楚地表明内容的各个部分不是交互式的。
- **新的 [`nth-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#first-last-odd-and-even) 变体** - 使用 `nth-*` 和 `nth-last-*` 变体来根据孩子在列表中的位置设置样式，您可以在默认情况下将您想要的任何数字传递给这些数字，并使用任意值对 `nth-[2n+1_of_li]` 等更复杂的表达式使用任意值。 eg: `nth-3:underline` `nth-last-5:underline` `nth-last-of-type-6:underline`
  - 有关可用伪类变体的完整列表，请参见[伪类参考资料](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference)。
- **新的 [`in-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#implicit-groups) 变体** - 非常类似于 `group-*` ，但无需 `group` 类。
  - `in-*` 变体响应任何父代的状态变化，所以如果你想要更精细的控制，就需要使用 `group` 来代替。
- **支持[`:popover-open`](https://tailwindcss.com/docs/hover-focus-and-other-states#openclosed-state)**  - 使用现有的 `open` 式变体也针对 open popovers.
- **新的[后代变体](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-all-descendants)**- 用于造型所有后代元素，无论好坏。
  - 与 `*` 一样，`**` 变体也可用于为元素的子元素设置样式。主要区别在于 `**` 将对所有后代应用样式，而不仅仅是直接子代。当你将它与另一个变体结合使用，以缩小选择范围时，这一点尤其有用

## 迁移记录

> 对于现有项目，我们发布了一份全面的[升级指南](https://tailwindcss.com/docs/upgrade-guide)，并构建了一个[自动升级工具](https://tailwindcss.com/docs/upgrade-guide#using-the-upgrade-tool)，以尽快和无痛地使用最新版本。

一个小项目先试试水，执行自动化迁移指令。

```bash
npx @tailwindcss/upgrade@next
```

迁移输出如下

```bash
≈ tailwindcss v4.0.2
│ Searching for CSS files in the current directory and its subdirectories…
│ ↳ Linked `./tailwind.config.js` to `./src/styles/theme/shadcn.css`
│ Migrating JavaScript configuration files…
│ ↳ The configuration file at `./tailwind.config.js` could not be automatically migrated to the new CSS configuration format, so your CSS has been
│   updated to load your existing configuration file.
│ Migrating templates…
│ ↳ Migrated templates for configuration file: `./tailwind.config.js`
│ Migrating stylesheets…
│ ↳ Migrated stylesheet: `./src/styles/theme/shadcn.css`
│ Migrating PostCSS configuration…
│ ↳ Installed package: `@tailwindcss/postcss`
│ ↳ Removed package: `autoprefixer`
│ ↳ Removed package: `postcss-import`
│ ↳ Migrated PostCSS configuration: `./postcss.config.js`
│ Updating dependencies…
│ ↳ Updated package: `prettier-plugin-tailwindcss`
│ ↳ Updated package: `tailwindcss`
│ Verify the changes and commit them to your repository.
npm verb exit 0
npm info ok
```

可以看出自动完成了大部分工作，包括 `flex-grow` -> `grow` / `flex-shrink` -> `shrink` 等类名更新，这就是成功迁移了，嗯，貌似表面上没出什么意外，再试试另一个 astro 5.1 项目的升级，先莽一下更新脚本。

```bash
% sudo npx @tailwindcss/upgrade@next
npm verb cli /usr/local/bin/node /usr/local/lib/node_modules/npm/bin/npm-cli.js
npm info using npm@10.5.0
npm info using node@v20.12.2
npm verb title npm exec @tailwindcss/upgrade@next
npm verb argv "exec" "--" "@tailwindcss/upgrade@next"
npm verb logfile logs-max:10 dir:/Users/cosine/.npm/_logs/2025-02-03T10_01_41_235Z-
npm verb logfile /Users/cosine/.npm/_logs/2025-02-03T10_01_41_235Z-debug-0.log
npm sill logfile start cleaning logs, removing 1 files
npm sill logfile done cleaning log files
npm http fetch GET 200 https://registry.npmjs.org/@tailwindcss%2fupgrade 489ms (cache updated)
≈ tailwindcss v4.0.2

│ Searching for CSS files in the current directory and its subdirectories…

│ ↳ Linked `./tailwind.config.mjs` to `./src/styles/global/tailwind.css`

│ Migrating JavaScript configuration files…

│ ↳ Could not load the configuration file: undefined is not a function

npm verb exit 1
npm verb code 1
```

很好，报错 `Could not load the configuration file: undefined is not a function` , 查了下是有插件不兼容。([Could not load the configuration file: v is not a function · tailwindlabs/tailwindcss · Discussion #15781 · GitHub](https://github.com/tailwindlabs/tailwindcss/discussions/15781))

看了一下之前迁移成功的项目里有这两个插件：`tailwindcss-animate` 和 `@tailwindcss/typography`

出问题的 astro 项目里多了一个 `tailwind-clip-path` 插件，注释后就正常执行了。

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
    // require("tailwind-clip-path"),
    require('@tailwindcss/typography'),
  ],
};
```

然后起一下试试：

```bash
> cos-space@0.0.1 dev /Users/cosine/Documents/Programming/cos-space
> astro dev

Package subpath './nesting/index.js' is not defined by "exports" in /Users/cosine/Documents/Programming/cos-space/node_modules/.pnpm/@astrojs+tailwind@5.1.4_astro@5.1.1_@types+node@22.10.5_jiti@2.4.2_rollup@4.29.1_terser@5.37._5qh5alcn5ztelwntajptz64i4q/node_modules/tailwindcss/package.json imported from /Users/cosine/Documents/Programming/cos-space/node_modules/.pnpm/@astrojs+tailwind@5.1.4_astro@5.1.1_@types+node@22.10.5_jiti@2.4.2_rollup@4.29.1_terser@5.37._5qh5alcn5ztelwntajptz64i4q/node_modules/@astrojs/tailwind/dist/index.js
  Stack trace:
    at exportsNotFound (node:internal/modules/esm/resolve:304:10)
    at packageResolve (node:internal/modules/esm/resolve:837:14)
    at defaultResolve (node:internal/modules/esm/resolve:1157:11)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:359:25)
    at ModuleLoader.import (node:internal/modules/esm/loader:322:34)
 ELIFECYCLE  Command failed with exit code 1.
```

很好，我就知道 astro 里的没那么简单迁移，查一下 [astro/packages/integrations/tailwind/CHANGELOG.md at main · withastro/astro · GitHub](https://github.com/withastro/astro/blob/main/packages/integrations/tailwind/CHANGELOG.md#major-changes) Tailwind CSS 现在提供了一个 Vite 插件，这是在 Astro 中使用 Tailwind 4 的首选方法。卸载原来的 `@astrojs/tailwind` ，然后按照 [tailwind 文档进行手动安装](https://tailwindcss.com/docs/installation/framework-guides/astro)。

嗯，还得升一下 astro 版本到 [Astro 5.2 | Astro](https://astro.build/blog/astro-520/)

```bash
npx @astrojs/upgrade
```

```bash
pnpm rm @astrojs/tailwind
pnpm i tailwindcss @tailwindcss/vite
```

成功啦，对比一下配置文件

```diff
diff --git a/astro.config.mjs b/astro.config.mjs
index bf8e9b1..20513bd 100644
--- a/astro.config.mjs
+++ b/astro.config.mjs
@@ -1,22 +1,17 @@
 // @ts-check
 import react from '@astrojs/react';
-import tailwind from '@astrojs/tailwind';
 import { siteConfig } from './src/constants/site-config';
 import icon from 'astro-icon';
 import { defineConfig } from 'astro/config';
 import svgr from 'vite-plugin-svgr';
 import umami from '@yeskunall/astro-umami';
+import tailwindcss from '@tailwindcss/vite';

 // https://astro.build/config
 export default defineConfig({
   site: siteConfig.site,
   integrations: [
     react(),
-    tailwind({
-      // 允许在 Tailwind 的语法基础上编写嵌套的 CSS 声明
-      nesting: true,
-      applyBaseStyles: false,
-    }),
     icon({
       include: {
         gg: ['*'],
@@ -35,7 +30,7 @@ export default defineConfig({
     enabled: true,
   },
   vite: {
-    plugins: [svgr()],
+    plugins: [svgr(), tailwindcss()],
   },
   trailingSlash: 'never',
 });
```

```diff
diff --git a/tailwind.config.mjs b/tailwind.config.mjs
index a7de2d0..28e5899 100644
--- a/tailwind.config.mjs
+++ b/tailwind.config.mjs
@@ -140,10 +140,5 @@ export default {
       },
     },
   },
-  plugins: [
-    require('@tailwindcss/container-queries'),
-    require('tailwindcss-animate'),
-    require('tailwind-clip-path'),
-    require('@tailwindcss/typography'),
-  ],
+  plugins: [require('@tailwindcss/container-queries'), require('tailwindcss-animate'), require('@tailwindcss/typography')],
 };
```

原来的插件失效了，@plugin 引入也不行，不过可以直接写在 css 里问题不大，还有就是 layer 层级问题会导致一些样式继承的问题，总体来说这俩小项目迁起来倒是没什么问题，后面迁移就持续更新这篇文章吧。

## 总结升级问题解决方案

### 问题一：Astro PostCSS 配置冲突

```bash
Error: Package subpath './nesting/index.js' is not defined by "exports" in...
```

**应对策略**：

1. 升级 Astro 至 5.2+ 版本 `npx @astrojs/upgrade`
2. 卸载 `@astrojs/tailwind`
3. 清理旧版 PostCSS 插件依赖
4. 按照 [tailwind 文档进行手动安装](https://tailwindcss.com/docs/installation/framework-guides/astro)，安装 `tailwindcss @tailwindcss/vite` / `astro add tailwind`

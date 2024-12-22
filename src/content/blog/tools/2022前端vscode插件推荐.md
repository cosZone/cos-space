---
title: 2022 前端开发 vscode 常用插件及其他工具推荐
link: vscode-plugin-recommended-2022
catalog: true
lang: cn
date: 2023-01-31 15:28:56
tags:
- 前端
- vscode 
categories:
- 工具
---
总结了下自己的 2022 的常用前端插件以及工具推荐，虽然 vscode 自带的插件同步功能已经很齐全了，但是还是自己总结了一篇以备不时之需。原飞书文档链接：[‍2022 前端开发 vscode 常用插件及其他工具推荐](https://nf2pjr3e5t.feishu.cn/docx/ExC0dt2tlo5sfExZk9ocKHLknle)

# vscode 常用插件

## 开发类

### GitLens — Git supercharged

拓展了vscode本身集成的Git功能，提供了很多好东西

![](https://backblaze.cosine.ren/juejin/896ed607cf504cf2a182d247541cd145~Tplv-K3u1fbpfcp-Zoom-1.png)

### Auto Close Tag

自动闭合HTML、JSX标签

![](https://backblaze.cosine.ren/juejin/Dc6e378b853b44cd9d8a17792c91c04a~Tplv-K3u1fbpfcp-Zoom-1.png)

### Auto Rename Tag

自动 rename 标签

![](https://backblaze.cosine.ren/juejin/Ca513e2974614bbcb89c73cf87aaa14a~Tplv-K3u1fbpfcp-Zoom-1.png)

### change-case

命名转换 Ctrl+Shift+P 输入change case

![](https://backblaze.cosine.ren/juejin/588d36d067294b53bbf0c6b2f174a2d2~Tplv-K3u1fbpfcp-Zoom-1.png)

![](https://backblaze.cosine.ren/juejin/03367e095e0e440caaff6e4af787ffdb~Tplv-K3u1fbpfcp-Zoom-1.png)

### Code Spell Checker

代码中的拼写检查

![](https://backblaze.cosine.ren/juejin/A03c0981961d42ef9e8e311931bfc748~Tplv-K3u1fbpfcp-Zoom-1.png)

![](https://backblaze.cosine.ren/juejin/08c094fba8f84c349e08726d58e75e7a~Tplv-K3u1fbpfcp-Zoom-1.png)

### ES7 React/Redux/GraphQL/React-Native snippets

React代码片段，如题如图

![](https://backblaze.cosine.ren/juejin/90c733f72f704973b55355beaf1bf189~Tplv-K3u1fbpfcp-Zoom-1.png)

### Commit Message Editor

多人协作必备，git提交信息的编辑

![](https://backblaze.cosine.ren/juejin/0819b66cd6764219a37e795c454397d0~Tplv-K3u1fbpfcp-Zoom-1.png)

### ESLint

![](https://backblaze.cosine.ren/juejin/E821b84d00164ef28e24db4a457f2478~Tplv-K3u1fbpfcp-Zoom-1.png)

### Prettier

指定配置文件.prettierrc.js，方便在项目中通过自己项目的prettier配置文件进行格式化

Why Prettier？ <https://prettier.io/docs/en/why-prettier.html>

![](https://backblaze.cosine.ren/juejin/790d631cc229421dafbd8c63b9e5bbc9~Tplv-K3u1fbpfcp-Zoom-1.png)
![](https://backblaze.cosine.ren/juejin/D1e5582cd0914923baddb6a3f9e1198b~Tplv-K3u1fbpfcp-Zoom-1.png)

![](https://backblaze.cosine.ren/juejin/8884949755674c40a77d6ad2b6140e6b~Tplv-K3u1fbpfcp-Zoom-1.png)

### Tailwind CSS IntelliSense（使用Tailwind推荐）

tailwind的自动补全，智能提示

![](https://backblaze.cosine.ren/juejin/5efb09a2a26646588bfce90b4c9b4dd4~Tplv-K3u1fbpfcp-Zoom-1.png)

### Error Lens

改进对错误、警告和其他语言诊断的突出显示。

![](https://backblaze.cosine.ren/juejin/325ca1837fff44dd98d1d00acdcb98f5~Tplv-K3u1fbpfcp-Zoom-1.png)

### CSS Modules

CSS module模式必备

![](https://backblaze.cosine.ren/juejin/73b5d3fc1e074441ba7534a387b44527~Tplv-K3u1fbpfcp-Zoom-1.png)

### px to rem & rpx & vw (cssrem)

顾名思义，方便的进行单位转换

![](https://backblaze.cosine.ren/juejin/F4b75e2133cf4f1081fffc12222dae26~Tplv-K3u1fbpfcp-Zoom-1.png)

### Template String Converter

在字符串中输入${后自动将其变为模板字符串

![](https://backblaze.cosine.ren/juejin/89f5f71adbdb4f2197b12b804ff348dd~Tplv-K3u1fbpfcp-Zoom-1.png)

### TabOut

也是用习惯了就回不去的插件，按Tab跳出括号

![](https://backblaze.cosine.ren/juejin/Ea8b7baf5183478d991298fb91e97a83~Tplv-K3u1fbpfcp-Zoom-1.png)

### vscode-styled-components（使用styled-components推荐）

![](https://backblaze.cosine.ren/juejin/6b25d9386b594ae8b4e59cc2bff209a8~Tplv-K3u1fbpfcp-Zoom-1.png)

### Highlight Matching Tag

顾名思义，高亮标签插件

![](https://backblaze.cosine.ren/juejin/48d1d3b2d475461d99786b592a2aea6e~Tplv-K3u1fbpfcp-Zoom-1.png)

### Live Server

比较经典的插件了：<https://juejin.cn/post/7006338919767736357>

![](https://backblaze.cosine.ren/juejin/313f863f15a74da1b05d330c3648269a~Tplv-K3u1fbpfcp-Zoom-1.png)

### Dev Containers （docker开发适用）

打开docker容器内的文件，用docker开发的都说好

![](https://backblaze.cosine.ren/juejin/7f0daf44f15b4c59ab8cf8864d01e4d9~Tplv-K3u1fbpfcp-Zoom-1.png)

## 辅助类

### Code Runner

这个想必不用多说，右上小三角运行代码

![](https://backblaze.cosine.ren/juejin/936e0d6de2d444afae35b5ce6740f11c~Tplv-K3u1fbpfcp-Zoom-1.png)

### Image Gallery

看图片资源贼好用，推荐一手

![](https://backblaze.cosine.ren/juejin/F1722f02482147eda921db1614fec4e7~Tplv-K3u1fbpfcp-Zoom-1.png)

![](https://backblaze.cosine.ren/juejin/921eefb7e37d48a1b1b95aae99d3a429~Tplv-K3u1fbpfcp-Zoom-1.png)
![](https://backblaze.cosine.ren/juejin/2625f67150614f3aaf2b650e362bdf3c~Tplv-K3u1fbpfcp-Zoom-1.png)

### Image preview

图片链接预览 不必多说的好用

![](https://backblaze.cosine.ren/juejin/6e9db535485a4bb1bbf6fe7e8770393b~Tplv-K3u1fbpfcp-Zoom-1.png)

### Project Manager

vscode的项目管理器，一键切换项目

![](https://backblaze.cosine.ren/juejin/Bcf067868c9143fda8491a84501ccc81~Tplv-K3u1fbpfcp-Zoom-1.png)

![](https://backblaze.cosine.ren/juejin/695e0dd44e4f43ae88759a94405e0049~Tplv-K3u1fbpfcp-Zoom-1.png)

### Todo Tree

顾名思义 展示项目中注释的TODO在哪，只需要TODO自动就会高亮

![](https://backblaze.cosine.ren/juejin/3fe9ed9022de45cd97078a69f779ea19~Tplv-K3u1fbpfcp-Zoom-1.png)
![](https://backblaze.cosine.ren/juejin/62cdfa90c330480886ffd2595cc82f25~Tplv-K3u1fbpfcp-Zoom-1.png)

### Comment Translate

注释翻译，如图

![](https://backblaze.cosine.ren/juejin/7ebfb335a8384ef79d9b34a828c965e4~Tplv-K3u1fbpfcp-Zoom-1.png)

### Live Share

多人协同，共同编辑，共享终端：<https://juejin.cn/post/6844903603182764039>

![](https://backblaze.cosine.ren/juejin/28db2cd8bc3940cea3e6d6fe56ce300d~Tplv-K3u1fbpfcp-Zoom-1.png)

## 实用工具类

### Bookmarks

vscode的书签

![](https://backblaze.cosine.ren/juejin/696877e1c8a9473c97921ef9cb815b3d~Tplv-K3u1fbpfcp-Zoom-1.png)

### Typora

用的是 [Vditor](https://b3log.org/vditor/) 作为vscode的markdown编辑器相当好用，但有时候会与git冲突需要禁用。

![](https://backblaze.cosine.ren/juejin/814648e482fd427f968a784df1044ea1~Tplv-K3u1fbpfcp-Zoom-1.png)

![](https://backblaze.cosine.ren/juejin/96a042bf447e4a62be57f9d6174e4232~Tplv-K3u1fbpfcp-Zoom-1.png)

### :emojisense:

方便的输入emoj表情

![](https://backblaze.cosine.ren/juejin/D73565c91ec443be8da4dc03ecaf5b50~Tplv-K3u1fbpfcp-Zoom-1.png)

### CodeTour

阅读源码时适用

![](https://backblaze.cosine.ren/juejin/Eaca76b552934134b41b20077efc39fa~Tplv-K3u1fbpfcp-Zoom-1.png)

### vscode-pdf

vscode中看pdf文件

![](https://backblaze.cosine.ren/juejin/58cbee89c4bf49538e082a6cc357b734~Tplv-K3u1fbpfcp-Zoom-1.png)

### Office Viewer(Markdown Editor)

pdf都能看了看office文件当然也有插件，这个跟typora插件一样集成 [Vditor](https://b3log.org/vditor/) 可以写md文件

![](https://backblaze.cosine.ren/juejin/A6aa7cbdb3e94f009d750645ada69fe0~Tplv-K3u1fbpfcp-Zoom-1.png)

### CodeSnap

选中代码并生成漂亮的截图（适合秀代码）

![](https://backblaze.cosine.ren/juejin/3a67b45e390c49d783c3c76c5ca51c75~Tplv-K3u1fbpfcp-Zoom-1.png)

### Draw.io Integration

后缀名为.drawio 的文件可以绘制流程图等，适合写技术文档，无需多言

![](https://backblaze.cosine.ren/juejin/4acafe3cb6e24f2b959227f6afaa7609~Tplv-K3u1fbpfcp-Zoom-1.png)

## 外观改善类

### One Dark Pro

Atom 的标志性 One Dark 主题，也是VS Code安装最多的 [主题之一！](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Installs)

![](https://backblaze.cosine.ren/juejin/9fcaa28afa434d039492c73bb22104fd~Tplv-K3u1fbpfcp-Zoom-1.png)

### vscode-icons

改进vscode的文件图标，终于看着舒服多了

![](https://backblaze.cosine.ren/juejin/61c4203228ce4f6bb4e5d835ee456269~Tplv-K3u1fbpfcp-Zoom-1.png)

![](https://backblaze.cosine.ren/juejin/4756cb5e4911429cbeb93e83cac5afa9~Tplv-K3u1fbpfcp-Zoom-1.png)
![](https://backblaze.cosine.ren/juejin/8dbd8cd16e3045459a60f6e7e0d33fdc~Tplv-K3u1fbpfcp-Zoom-1.png)

## 自动补全/智能提示类

### GitHub Copilot

大名鼎鼎的自动补全

![](https://backblaze.cosine.ren/juejin/02a130b6cad34376acff09356701828b~Tplv-K3u1fbpfcp-Zoom-1.png)

### Tabnine AI

虽不及 Copilot 但也有不错的自动补全，胜在免费不用申请？（

![](https://backblaze.cosine.ren/juejin/E503e389ef4b4930924a52deb617ddd9~Tplv-K3u1fbpfcp-Zoom-1.png)

### Mintlify Doc Writer for Python, JavaScript, TypeScript, C++, PHP, Java, C#, Ruby & more

自动分析代码生成注释，适合懒得写文档的

![](https://backblaze.cosine.ren/juejin/Bb2b7ae38c544422817dacc283d8b860~Tplv-K3u1fbpfcp-Zoom-1.png)

### Parameter Hints

函数参数智能提示，不过用多了就会觉得有点干扰。

![](https://backblaze.cosine.ren/juejin/3f6e7a6b6c884acc9863ad05ec4644fd~Tplv-K3u1fbpfcp-Zoom-1.png)

## 刷题类

### Quokka.js

实时打印js输出，适合刷题。

![](https://backblaze.cosine.ren/juejin/8e0f208c46364f0aa1b6bfdd7816bb79~Tplv-K3u1fbpfcp-Zoom-1.png)

### Competitive Programming Helper (cph)

适合竞赛同学、acm（当然也适合刷面试算法题就是了，不过语言是c++。

![](https://backblaze.cosine.ren/juejin/C2aac5f69ea94c058d478b847e47d81b~Tplv-K3u1fbpfcp-Zoom-1.png)

### algorithm

适合力扣刷题

![](https://backblaze.cosine.ren/juejin/6ee29d6a3fe143a5b07da85e6a1d27d8~Tplv-K3u1fbpfcp-Zoom-1.png)

# 工具推荐

## 浏览器插件

* 翻译插件
  * [immersive-translate 沉浸式双语网页翻译扩展（Github）](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fimmersive-translate%2Fimmersive-translate "https://github.com/immersive-translate/immersive-translate")、[介绍 - Immersive Translate](https://link.juejin.cn?target=https%3A%2F%2Fimmersive-translate.owenyoung.com%2F "https://immersive-translate.owenyoung.com/")
  * 侧边翻译 [EdgeTranslate: A translation extension](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FEdgeTranslate%2FEdgeTranslate "https://github.com/EdgeTranslate/EdgeTranslate")
* [VisBug - Microsoft Edge Addons](https://link.juejin.cn?target=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fdetail%2Fvisbug%2Fkdmdoinnkaeognnpegpkepdnggeaodkn "https://microsoftedge.microsoft.com/addons/detail/visbug/kdmdoinnkaeognnpegpkepdnggeaodkn")

## 截图&gif工具

* Snipaste 截图工具，用过都说好：<https://www.snipaste.com/>
* ScreenToGif 顾名思义，录制 gif 的好东西 ：<https://www.screentogif.com/>
* OBS 大名鼎鼎的视频录制和直播推流工具，dddd： <https://obsproject.com/>

## 实用工具

* Everything 快快快快速搜索文件，dddd <https://www.voidtools.com/zh-cn/downloads/>

# 待补充

...如有推荐的插件可以评论

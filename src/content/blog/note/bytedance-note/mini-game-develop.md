---
title: 青训营 |「小游戏开发」笔记
link: note/front-end/bytedance-note/mini-game-development
catalog: true
date: 2022-01-29 14:30:17
subtitle: 本节课讲了前端游戏场景下的游戏开发与普通游戏开发的差异，并且介绍了一些游戏引擎，给出了游戏开发的技能树，在最后也简单介绍了利用Cocos Creator或PixiJS进行游戏开发的步骤。
lang: cn
tags:
- 前端
- 游戏开发
- 游戏引擎
categories:
- [笔记, 青训营笔记]
---
# 前端场景下的游戏开发

## 开发角色和链路

游戏开发的团队分工

组建一个最小但最完整的游戏开发团队只需要3个人:策划、程序、美术。

当然，能力足够强的话可以作为独立开发者。

![image.png](https://backblaze.cosine.ren/juejin/D2b19ef48261481ab4cbb48c14295e0f~Tplv-K3u1fbpfcp-Watermark.png)

**基本链路**

立项阶段 -> 原型阶段 -> Alpha版本 -> Beta阶段 -> 运营阶段

![image.png](https://backblaze.cosine.ren/juejin/93319b604a4d46df9d49cbf8f80f7969~tplv-k3u1fbpfcp-watermark.png)

## 为什么要用游戏引擎

游戏引擎最大的优势：渲染

> 引擎的诞生就是因为一家公司做了一款游戏，做下一款游戏时复用了上一款游戏的代码，后来发现这些代码几乎每个游戏都会用到，抽离出来就成了一个引擎。
>
> 如果不使用引擎，你可以做复杂的动效渲染和交互吗？当然可以。方便吗?不一定。
>
> 所以游戏引擎更像是**一套解决方案**，让你在制作某一类型的产品的时候能够提高你的开发效率。
>
> 你要做多平台移植? React Native、Weex、 Cordova等方案也可以做到。
>
> 你要做物理效果? MatterJS、 ammo.js等物理引擎可以用。
>
> 你要做动画?？CSS实现又不是不行。复杂点？封装一个动画库。

那为什么要用游戏引擎呢？

- 提供一套完整的实现方案，不需要你再自己去拼凑、封装
- **花更少的时间做出更好的效果**，特别是关于渲染效率和性能优化。
- 提供游戏开发时需要的常见功能
  - 引擎会提供许多组件，使用这些组件能缩短开发时间，让游戏开发变得更简单
  - 专业引擎通常会能比自制引擎表现出更好的性能。

游戏引擎通常会包含渲染器，2D/3D图形元素，碰撞检测，物理引擎，声音，控制器支持，动画等
部分。

## 前端过渡到游戏开发

首先要有一个明确的认知：**前端开发和游戏开发不是相斥的。**

现在市场上很多**H5游戏、小游戏**都是Web前端开发制作的，而不是专门的游戏开发团队、专业的游戏研发同学开发。其原因可能在于:

1. 接触前端开发的研发数量远大于接触游戏开发的数量（**招聘成本高**）
2. 2d游戏引擎的上手门槛已经足够低（**易上手**）
3. 活动H5中的游戏玩法的实现方式比较模糊（**开发界限模糊**）
4. 现在很多主流的2d游戏引擎都支持使用Javascript进行开发同时使用相关的工程化能力，也是游戏开发向web前端开发靠拢的一种表现。

因此，以web前端开发的视角看2d游戏引擎，无非是一套框架、一套解决方案而已。

但是开发理念上还是有差别的：**传统游戏开发更关注内容。**

# 游戏引擎

## 市面上常见游戏引擎

我们暂且不讨论一些端游的引擎， 比如

- Unreal （虚幻引擎，代表作《PUBG》、《GTA5》）、
- Source （起源引擎，代表作(《Cs》 、《Dota2》 ）
- Frostbite Engine （寒霜引擎，代表作《战地》、《极品飞车18》）、、
- Unity3D （代表作《炉石传说》、《王者荣耀》）。

路要一步步走，我们先看看我们**作为前端开发最容易上手的引擎。**

### 特定类型的客户端游戏引擎

#### The NVL Maker

[THE NVL Maker](https://www.nvlmaker.net/)文字冒险游戏制作器

**NoCode**形式的开发，只需要写文字脚本加上一定的配置就可以生成一个文字冒险游戏。

代表作：《Fate/stay night》和steam上一众GAL Game。

当然，由于缺乏迭代和运营，该游戏引擎算是比较小众的。也有一个适用于前端的库AVG.js Project。（内核是PixiJS作为渲染引擎）

![image.png](https://backblaze.cosine.ren/juejin/37668e7d322248d9b0f17683d94e7e3e~tplv-k3u1fbpfcp-watermark.png)

#### **RPG Maker**

RPG Maker可以**Low Code**搭建一个关卡类型的游戏，适合代码能力不强但是想发挥自己的创意的开发者。

- 由RPGMaker系列游戏引擎创造的Steam畅销游戏《To The Moon》

### Web游戏引擎

利用Canvas和WebGL为底层技术抽象的图像绘制库（往往还附带一些其他的功能）

Web游戏引擎的通用能力:

- **预加载**
  - 游戏中大量**的静态素材，包括场景、元素、声音、动画、模型、贴图等，如果以原生JS进行请求，并统筹请求时间和加载的时机，将会非常麻烦。**
  - 预加载引擎将加载时机、加载过程加以**抽象**，**解决加载编码中的效率问题**。
- **展示与图层、组合系统**
  - 对于Web游戏编程而言，往往选择Canvas或WebGL作为渲染方式（大家可以想想为什么不用DOM作为渲染方式? ）。
  - Canvas和WebGL作为底层的APl，接口非常基础，需要**大量的编码来编写简单的展示**。而且图形之间没有组合和图层，**很难处理元素组合和图层问题。**
  - **渲染引擎和图层、组合系统应运而生**。
- **动画系统**：动画往往被分为**缓动动画**和**逐帧动画**，这里讨论缓动动画系统。
  - 缓动动画系统在原生JS中需要**搭配帧渲染**进行考量而进行书写，代码量和思考量巨大，抽象程度低，所以需要游戏引擎动画系统。
- **音效和声音系统**：
  - 游戏相较于普通的Web前端而言需要更加**立体、及时的反馈**，声音和音效是反馈的重要组成部分。
  - **声音和音效系统往往包含了声音的播放、音量、截止、暂停等功能的集成。**

#### Cocos

**优势**

- 平台支持能力好
- 完善的游戏功能支持
- 生态较好

**缺点**

- 3D能力仍在建设中
- 版本迭代过快

![image.png](https://backblaze.cosine.ren/juejin/50f2a6ea4fb24aa1b1e586c2f90c44db~Tplv-K3u1fbpfcp-Watermark.png)

#### Laya

**优势**

- 3D能力比较成熟，号称市场占有率90%
- 支持]S、TS、AS
- 引擎体积小

**缺点**

- 界面能力不友好
- 生态很差

![image.png](https://backblaze.cosine.ren/juejin/9512c8eb4d534053ac9cd6e7499b3c38~Tplv-K3u1fbpfcp-Watermark.png)

#### Egret

**优势**

- 工具链比较完善
- 第三方库支持好
- 企业定制能力强

**缺点**

- 更新迭代遭瓶颈
- 生态较差

![image.png](https://backblaze.cosine.ren/juejin/7bf568c8ee034a14a27f0d91d339c833~tplv-k3u1fbpfcp-watermark.png)

可以看到上述游戏引擎的界面都是很相似的

#### CreateJS & Phaser

这两个游戏引擎没有可视化界面。

以CreateJS为例:![image.png](https://backblaze.cosine.ren/juejin/C42808563fa241948b06a224a94303c1~Tplv-K3u1fbpfcp-Watermark.png)

它是多个库的集合

- EASELS (控制素材展示与组合) 、TWEENJS (控制素材缓动动画)、 SOUNDIS（控制声音）、PRELOADIS （控制加载），通过预加载后的素材展示、动画、声音构成游戏。Phaser游戏引擎，除了CreateJS 为基础的展示、声音、动画、加载系统

- 还设计了摄像机、物理引擎、内置浏览器、插件系统等高级功能。

### 功能引擎

大型游戏引擎往往是由小的功能引擎组装成的，一个大型游戏引擎往往包含渲染引擎、物理引擎、UI系统、声音系统、动画系统、粒子系统、骨骼系统、网络系统等组合而成。其中最重要的便是渲染引擎和物理引擎。功能引擎是专注某个方向能力的引擎，其特点是体积小、功能完善。特别是Pixi.js和Three.js这两个渲染引擎，通常被误以为是一个完整的游戏引擎，但它们是专注渲染能力的渲染引擎。

下面介绍几种可能会经常接触的功能引擎:

![image.png](https://backblaze.cosine.ren/juejin/600c9e3952394924b790c74d06c3b247~tplv-k3u1fbpfcp-watermark.png)

- Pixi.js
  - 2D渲染能力强（尤其是WebGL）
  - 复杂动画系统、复杂图片渲染形式、制作自己的2d游戏引擎等
- Three.js
  - 3D渲染能力强
  - 适合3D效果演示或3D类的H5游戏或小游戏
- Box2D.js
  - 2d物理引擎
  - 物体仿真能力

## 2D游戏引擎的技术架构

以Cocos引擎的架构为例子：

![image.png](https://backblaze.cosine.ren/juejin/a7ea1a5dd8ff42a396872d8472b06f7f~tplv-k3u1fbpfcp-watermark.png)

- render（渲染器）、collision（）、Physical（）

- 适配器 for PC、IOS、Andriod、H5…… 以及各平台的构建工具
- 运行时

## Web游戏引擎的渲染原理

以Pixi的渲染流程为例子

大致流程如下

1. 创建一个Renderer渲染器，获取它的view (一个canvas对象) ，添加到Dom Tree中。（或者指定Dom Tree中已经存在的canvas对象作为view）

2. 在MainLoop (主循环）中调用Renderer.render()并传入一个**DisplayObject作为根节点开发渲染**。

3. 从场景树的根节点开始，**以zIndex为序从小到大进行深度优先遍历**，对每个节点进行渲染操作，由后往前把整个场景绘制一次。(CanvasRenderer)

4. WebGL的render方法执行过程（科普）

   ```js
   render(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
       // 1.应用变换(GPU级别) 
       this.projection.transform = transform;
       // 2.渲染纹理绑定与BatchRendering处理
       this.renderTexture.bind(renderTexture);
       this.batch.currentRenderer.start();
       // 3.执行元素渲染，将顶点、索引和纹理等数据添加到BatchRendering中
       display0bject.render();
       // 4.执行renderer的绘制方法
       this.batch.currentRenderer.flush();
       //根据传入的C Lear与renderTexture参数对纹理的处理.。.
       // 5.清空变换
       this.projection.transform = null;
   }
   ```

5. Canvas的render方法执行过程

   以Pixi的渲染流程为例子：

   ```js
   render(displayobject, renderTexture, clear, transform, skipUpdateTransform) {
       const context = this.context;
       // 1.当前状态压入状态栈
       context.save();
       // 2.初始化变换及样式属性
       context.setTransform(1, 0, 0, 1, 0, 0);
       context.globaLAlpha = 1;
       this._activeBlendMode = BLEND_MODES.NORMAL;
       this._outerBlend = false;
       context.globalCompositeOperation = this.blendModes[BLEND_MODES.NORMAL];
       // 3.执行元素渲染
       const tempContext = this.context;
       this.context = context;
       display0bject.renderCanvas(this); 
       this.context = tempContext;
       // 4.从状态栈恢复之前状态
       context.restore();
   }
   ```

# 游戏开发的技能树

![image.png](https://backblaze.cosine.ren/juejin/0eefa193458c4de386328b087ebe7bf6~tplv-k3u1fbpfcp-watermark.png)

# PixiJS+Web开发

## Pixi简介

[PixiJS](https://pixijs.com/)官网乍一看很像一个游戏引擎，但是上面也明确说了：“用最快、最灵活的2DWebGL渲染器创建精美的数字内容”(谷歌机翻)。

- 它本质上还是一个**渲染引擎**，而且自称做得最好。
- 它**不仅仅能做游戏**，还能使用这个技术去**创建任何交互式内容**，比如**APP**， 还能够在它的基础上做自己的游戏引擎。(AVG.js 和Phaserjs 的渲染引擎就是Pixi)

前置技术栈

- Web前端开发基础
- 用过JSON文件，知道是用来干什么的
- 了解过Canvas的绘图API

## 在web项目中加载一个游戏玩法

1. 安装和引入

   - **npm安装** 或者 通过script标签引入`<script src=”pixi.min.js" ></script>`

2. 创建Pixi应用和舞台（Stage）

   ```js
   // 第一步，创建一个显示的矩形区域，创建一个Pixi应用实例的时候会自动创建一个canvas并计算出怎么让你的图片在canvas中显示。
   let app = new PIXI.Application({width: 250, height: 250 });
   // app.stage就是一个[舞台] 它包含了所有你想用Pixi显示的东西。
   
   // 第二步，把canvas添加到DOM Tree中。这个时候就显示了一个250*250的纯黑色的界面
   document.body.appendChild(app.view);
   // PIXI.Application计算了应该使用Canvas还是WebGL去渲染图像，取决于当前浏览器支持哪一个， 一般优先使用WebGL。
   
   // 如果你希望Canvas是透明的，或者强制使用Canvas模式，可以设置
   let app = new PIXI.Application({
       width: 250,
       height: 250,
       transparent: true,
       forceCanvas: true,
   });
   ```

3. 显示一张图片

   概念理解：Sprite（精灵）

   - 学习CSS的时候可能有听过精灵图/雪碧图的概念，但是不一样。Pixi或者更多游戏引擎中Sprite的概念是一个用于**承载图像的对象**，你能够**控制**它的大小、位置等属性来产生交互、动画。**创建和控制 Sprite** 是学习Pixi很重要的部分

   - 而创建一个Sprite需要了解图片怎么加载到Pixi中。这里就有一个概念：**纹理缓存（指可以被GPU处理的图像）**

     - Pixi使用纹理缓存来存储和引用Sprite所需要的纹理。纹理的名称字符串就是图像的地址。比如现在有一个"images/cat.png",我们就可以使用`PIXl.utils.TextureCache["images/cat.png"]`来在纹理缓存找到他

     - 找到它当然要先把它**转化成纹理存储**在纹理缓存中，可以使用`PIXI.loader`加载进来。

       ```js
       PIXI.loader.add("images/cat.png").load(res => {
           let sprite = new PIXI.Sprite(
               PIXI.loader.resources["images/cat.png"].texture
           );
       });
       ```

   - 现在已经创建了一个Sprite了，下一步就是显示它，将他添加到舞台中

     `app.stage.addChild(sprite);`

     ![image.png](https://backblaze.cosine.ren/juejin/3576ca213d864276b857da604d86fe74~tplv-k3u1fbpfcp-watermark.png)

4. 让图片动起来

   前面我们说到了可以设置Sprite的位置和大小，那如果我希望每帧移动一个像素呢？这时候就需要用到游戏循环。（**任何游戏循环的代码都会每帧调用一次**）

   ```js
   app.tiker.add(delta => {
    sprite.x += 11;
   });
   ```

5. 然后加亿点点细节[CacheAsBitmap - PixiJS Examples](https://pixijs.io/examples/#/demos-basic/cacheAsBitmap.js)

# Cocos Creator编辑器开发

## Cocos Creater介绍

Q：Cocos Creator是游戏引擎吗?

A：Cocos+界面编辑 它是一个**完整的游戏开发解决方案**，包含了轻量高效的**跨平台游戏引擎**，以及能让你更快速开发
游戏所需要的各种**图形界面工具**。

![image.png](https://backblaze.cosine.ren/juejin/7f167c9df12c4eeaab85ad179a4c7686~Tplv-K3u1fbpfcp-Watermark.png)

## 编辑器集成的能力

### Cocos的工作流

![image.png](https://backblaze.cosine.ren/juejin/980f6078f6d54e45b6954cf615eccbfc~Tplv-K3u1fbpfcp-Watermark.png)

下载并创建 -> 设计场景&开发 -> 预览和调试 ->  ANYSDK接入 -> 打包发布 -> Cocos Runtime

上图展示了Cocos的工作流

### 创建项目

![image.png](https://backblaze.cosine.ren/juejin/67121fdac5f043a1b213bdf59228178f~tplv-k3u1fbpfcp-watermark.png)

### 搭建场景

Cocos的工作流——**数据驱动**和场景为核心、组件式开发为核心

![image.png](https://backblaze.cosine.ren/juejin/02f481104d614872bea1d70292760d3b~tplv-k3u1fbpfcp-watermark.png)

可以看到，不需要了解css等直接通过右侧的属性检查器就可以调整图片大小等，低代码

结点（cc.Node）是承载组建的实体，我们将具有各种功能的组件（如Sprite、SPine、Label）挂载到节点上来让节点具有各式各样的表现和功能。

由节点来构成节点树，节点树影响真实的渲染层级

![image.png](https://backblaze.cosine.ren/juejin/27368cab4d7e412d8419396ebf210a28~tplv-k3u1fbpfcp-watermark.png)

### 导入资源 + 显示资源

从操作系统中的其他窗口拖拽文件到Cocos Creator窗口中的资源管理器面板上，就能够从外部导入资源。该操作会自动复制资源文件到项目资源文件夹下，并完成导入操作。然后把图片拖到层级管理器即可以生成一个cc.Sprite。

![image.png](https://backblaze.cosine.ren/juejin/4dd195a77f8f436084e7f9a2e88c564f~tplv-k3u1fbpfcp-watermark.png)

### 脚本挂载

test.js

```js
const { property, ccclass } = cc._decorator;
@ccclass
export default class TestComp extends cc.Component {
    onLoad() {
        console.log('TestComp onload');
    }
    
    start() {}
    
    update(dt) {}

    onDestroy() {}
}
```

然后在Cocos Creator中对应的节点把脚本挂载上去。

![image.png](https://backblaze.cosine.ren/juejin/fc5a271f557344329dba8a40efc35d9d~tplv-k3u1fbpfcp-watermark.png)

### 运行调试

![image.png](https://backblaze.cosine.ren/juejin/ca330d4fbcc74bc288c6e07e9ee576b5~tplv-k3u1fbpfcp-watermark.png)

## 游戏的上线

### 构建

![image.png](https://backblaze.cosine.ren/juejin/9cd3c931bd594cd98d4ca30d421b810d~Tplv-K3u1fbpfcp-Watermark.png)

构建游戏，可以选择多平台，产物即对应生成，比如Web Mobile

![image.png](https://backblaze.cosine.ren/juejin/6c91d97b6e864b0f94ff25c3424edff3~tplv-k3u1fbpfcp-watermark.png)

产物可以直接部署在对应的平台，比如web产物部署到服务器、小游戏产物部署到开发者平台。

# 小游戏“小”在哪里

## 游戏发布平台的差异性

![image.png](https://backblaze.cosine.ren/juejin/c8565eb975b4490983eb4211b1ca467b~tplv-k3u1fbpfcp-watermark.png)

- 游戏逻辑上，没有什么差别

- 游戏引擎的不同
- 平台API的差异（最需要关注）
- 渲染等差异不大

## 游戏开发的重要理念

**激发创造**

- 把游戏开发过程当做一个游戏，在规则（自己的技术栈、限定主题、限定资源）的约束下通过创意和技术力挑战个高质量的游戏吧！
- 创意不要被约束了

# 总结感想

本节课讲了前端游戏场景下的游戏开发与普通游戏开发的差异，并且介绍了一些游戏引擎，给出了游戏开发的技能树，在最后也简单介绍了利用Cocos Creator或PixiJS进行游戏开发的步骤。

> 本文引用的内容大部分来自ycaptain老师的课

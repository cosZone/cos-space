---
title: 青训营 |「前端动画实现」
link: note/front-end/bytedance-note/animation-implement
catalog: true
date: 2022-01-21 14:30:17
subtitle: 前端动画的基本原理、分类和如何实现前端动画JS函数封装
lang: cn
tags:
- 前端
- 动画
- CSS
categories:
- [笔记, 青训营笔记]
---
## 动画的基本原理

### 动画是什么

> 动画是通过快速连续排列彼此差异极小的连续图像来制造运动错觉和变化错觉的过程。
>
> ——维基百科

- 快速
- 连续排列
- 彼此差异极小
- 制造 **“错觉”** 的过程

### 动画发展史

如今的前端动画技术已经普及

1. 常见的前端动画技术
   - Sprite动画、CSS动画、JS动画、SVG动画和WebGL动画

2. 按应用分类
   - UI动画、基于Web的游戏动画和动画数据可视化

GIF、Flash的出现，一度成为主流，也是在00年的前后，苹果公司认为Flash会导致CPU的负载，耗电加快，宣布全面放弃Flash，所有的苹果设备电池寿命都显著提高。而如今的web动画主要由CSS、JS动画为主。

### 计算机动画

**计算机图形学**

计算机视觉的基础，涵盖点、线、面、体、场的数学构造方法。

- 几何和图形数据的输入、存储和压缩。
- 描述纹理、曲线、光影等算法。
- 物体图形的数据输出（图形接口、动画技术），硬件和图形的交互技术。
- 图形开发软件的相关技术标准。

**计算机动画** 是计算机图形学的分支，主要包含2D、3D动画。无论动画多么简单，始终需要定义两个基本状态，即**开始状态**和**结束状态**。没有它们，我们将无法定义**插值状态**，从而填补两者之间的空白。

![1.gif](https://backblaze.cosine.ren/juejin/45af169412774ce685832db37df048dd~Tplv-K3u1fbpfcp-Watermark.gif)

快速√ 连续排列 × 彼此差异极小× 制造 “错觉”×

可以看到，上面这张动画只有快速，并没有制造错觉，这就不得不提到帧率这个概念了~~（打游戏的这个概念应该都熟）~~

- 帧：连续变换的多张画面，其中的每一幅画面都是一帧。

- 帧率：用于度量一定时间段内的帧数，通常的测量单位是**FPS（frame per second）**。

- 帧率与人眼：一般**每秒10-12帧**人会认为画面是**连贯**的，这个现象称为**视觉暂留**。对于一些电脑动画和游戏来说，低于 30 FPS 会感受到明显卡顿，目前主流的屏幕、显卡输出为60FPS，效果会明显更流畅。

那么接下来，填补起始点和结束点之间的空白，尝试让动画连贯。

![image.png](https://backblaze.cosine.ren/juejin/6918c4fc6f814e83947dd81d18fb16e4~tplv-k3u1fbpfcp-watermark.png)

空白的补全方式有以下两种

- 补间动画
  - 传统动画中，主画师绘制关键帧，交给清稿部门  ，清稿部门的补间动画师补充关键帧进行交付
  - (类比到这里，前端动画的补间动画师由浏览器来担任，如[`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)，[`transition`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition))
- 逐帧动画（Frame By Frame）
  - 从词语来说意味着全片每一帧逐帧都是**纯手绘**。(如css 的steps实现精灵动画)

## 前端动画分类

### css动画

CSS层叠样式表(Cascading Style Sheets），本身是一种样式表语言，用来描述HTML或XML（包括如SVG、MathML、XHTML之类的XML分支语言），而CSS中的 [`animation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation) 属性是  [`animation-name`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name)，[`animation-duration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration), [`animation-timing-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function)，[`animation-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay)，[`animation-iteration-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count)，[`animation-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction)，[`animation-fill-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode) 和 [`animation-play-state`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state) 属性的一个简写属性形式。

#### animation-name

 [`animation-name`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name) 属性指定应用的一系列动画，每个名称代表一个由[`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)定义的动画序列，其值如下

- `none` （初始值）特殊关键字，表示无关键帧。可以不改变其他标识符的顺序而使动画失效，或者使层叠的动画样式失效。
- `IDENT` 标识动画的字符串，由大小写敏感的字母a-z、数字0-9、下划线(_)和/或横线(-)组成。第一个非横线字符必须是字母，数字不能在字母前面，不允许两个横线出现在开始位置。

多个动画定义使用逗号分隔开即可

```css
/* Single animation */
animation-name: none;
animation-name: test_05;
animation-name: -specific;
animation-name: sliding-vertically;

/* Multiple animations */
animation-name: test1, animation4;
animation-name: none, -moz-specific, sliding;

/* Global values */
animation-name: initial
animation-name: inherit
animation-name: unset
```

#### animation-duration

[`animation-duration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration) 属性指定一个动画周期的时长。默认值为0s，表示无动画。

它的值为一个动画周期的时长，单位为秒(s)或者毫秒(ms)，无单位值无效。也可以指定多个值，他的多个值与animation-name一一对应

> **注意：**负值无效，浏览器会忽略该声明，但是一些早期的带前缀的声明会将负值当作0s。

```css
/* Single animation */
animation-duration: 6s
animation-duration: 120ms

/* Multiple animations */
animation-duration: 1s, 15s
animation-duration: 10s, 30s, 230ms
```

#### animation-timing-function

 [`animation-timing-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function) 属性定义CSS动画在每一动画周期中执行的节奏。可能值为一或多个，它的多个值也是与animation-name一一对应。本身CSS定义了一些缓动函数，我们可以调用这些缓动函数来达到缓入缓出的效果。

> 对于关键帧动画来说，timing function作用于一个关键帧周期而非整个动画周期，即从关键帧开始开始，到关键帧结束结束。
>
> 定义于一个关键帧区块的缓动函数(animation timing function)应用到该关键帧；另外，若该关键帧没有定义缓动函数，则使用定义于整个动画的缓动函数。

```css
/* Keyword values */
animation-timing-function: ease;
animation-timing-function: ease-in;
animation-timing-function: ease-out;
animation-timing-function: ease-in-out;
animation-timing-function: linear;
animation-timing-function: step-start;
animation-timing-function: step-end;

/* Function values */
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
animation-timing-function: steps(4, end);
animation-timing-function: frames(10);

/* Multiple animations */
animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

/* Global values */
animation-timing-function: inherit;
animation-timing-function: initial;
animation-timing-function: unset;
```

#### animation-delay

[`animation-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay) 定义动画于何时开始，即从动画应用在元素上到动画开始的这段时间的长度。（就是延迟多久开始）

`0s`是该属性的默认值，代表动画在应用到元素上后立即开始执行。否则，该属性的值代表动画样式应用到元素上后到开始执行前的时间长度；

**定义一个负值会让动画立即开始。但是动画会从它的动画序列中某位置开始。**例如，如果设定值为-1s，动画会从它的动画序列的第1秒位置处立即开始。

如果为动画延迟指定了一个负值，但起始值是隐藏的，则从动画应用于元素的那一刻起就获取起始值。

```css
animation-delay: 3s;
animation-delay: 2s, 4ms;
```

#### animation-iteration-count

[`animation-iteration-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count) 定义动画在结束前**运行的次数** 可以是1次也可以是无限循环.

- `infinite`

  无限循环播放动画

- `<number>`

  动画播放的次数；默认值为`1`。可以用**小数定义循环**，来**播放动画周期的一部分**：例如，`0.5` 将播放到动画周期的一半。不可为负值。

```css
/* 值为关键字 */
animation-iteration-count: infinite;

/* 值为数字 */
animation-iteration-count: 3;
animation-iteration-count: 2.4;

/* 指定多个值 */
animation-iteration-count: 2, 0, infinite;
```

它的多值跟duration不同，它是在每个动画开始和结束的时候切换自己的执行次数

#### animation-direction

[`animation-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction) 属性指示动画是否反向播放

- `normal` (默认值)

  每个循环内动画**向前循环**，换言之，每个动画循环结束，动画重置到起点重新开始，这是默认属性。

- `alternate`

  动画**交替反向运行**，反向运行时，动画**按步后退**，同时，**带时间功能的函数也反向**，比如，`ease-in` 在反向时成为 `ease-out`。计数取决于开始时是奇数迭代还是偶数迭代

- `reverse`

  **反向运行动画**，每周期结束动画由尾到头运行。

- `alternate-reverse`

  **反向交替**， 反向开始交替

  动画**第一次运行时是反向的，然后下一次是正向，后面依次循环**。决定奇数次或偶数次的计数从1开始。

```css
animation-direction: normal
animation-direction: reverse
animation-direction: alternate
animation-direction: alternate-reverse
animation-direction: normal, reverse
animation-direction: alternate, reverse, normal
```

#### animation-fill-mode

[`animation-fill-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode) 属性设置CSS动画在执行之前和之后如何将样式应用于其目标。

```css
/* Single animation */
animation-fill-mode: none;
animation-fill-mode: forwards;
animation-fill-mode: backwards;
animation-fill-mode: both;

/* Multiple animations */
animation-fill-mode: none, backwards;
animation-fill-mode: both, forwards, none;
```

- `none` (默认)

  当动画未执行时，**动画将不会将任何样式应用于目标**，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。

- `forwards`

  目标将保留由执行期间**遇到的最后一个[关键帧](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)计算值**。 最后一个关键帧取决于[`animation-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction)和[`animation-iteration-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count)的值（就是**最后一个关键帧是什么样子后面就一直会是这个样子**）

- `backwards`

  动画将在应用于目标时**立即应用第一个关键帧中定义的值**，**并在[`animation-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay)期间保留此值**。（这个很重要，delay几s进行的） 第一个关键帧取决于[`animation-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction)的值：`animation-direction`first relevant keyframe`normal` or `alternate``0%` or `from``reverse` or `alternate-reverse``100%` or `to`

- `both`

  动画将遵循`forwards`和`backwards`的规则，从而在两个方向上扩展动画属性。（就是上述二者兼有）

> **注意**：当您在`animation-*`属性上指定多个以逗号分隔的值时，它们将根据值的数量以不同的方式分配给 [`animation-name`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name) 属性中指定的动画。 有关更多信息，请参阅[设置多个动画属性值](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations#setting_multiple_animation_property_values)。

#### animation-play-state

 [`animation-play-state`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state) 属性定义一个动画**是否运行或者暂停**。可以通过**查询它来确定动画是否正在运行**。另外，它的值可以被设置为**暂停和恢复的动画的重放**。恢复一个已暂停的动画，将**从它开始暂停的时候**开始恢复，而不是从动画序列的起点开始。

- `running`

  当前动画正在运行。

- `paused`

  当前动画已被停止。

```css
/* Single animation */
animation-play-state: running;
animation-play-state: paused;

/* Multiple animations */
animation-play-state: paused, running, running;

/* Global values */
animation-play-state: inherit;
animation-play-state: initial;
animation-play-state: unset;
```

一个栗子：[CSS BEER! (codepen.io)](https://codepen.io/mikegolus/pen/jJzRwJ)

去看了看这个大佬的其他项目，都很有意思！[#codevember - 19 - CSS Eggs (codepen.io)](https://codepen.io/mikegolus/pen/aQVdLV)、[Periodic Table of Elements - HTML/CSS (codepen.io)](https://codepen.io/mikegolus/pen/OwrPgB)

#### **transform** API

[`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的。

[`transform-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin) 指定原点的位置，默认的转换原点是 `center` 。

`transform`属性可以指定为关键字值`none` 或一个或多个`<transform-function>`值。

- [`transform-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function)

  要应用的一个或多个CSS变换函数。 变换函数按从左到右的顺序相乘，这意味着复合变换按从右到左的顺序有效地应用。

  - [`scale`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function#scale)（缩放）注意其中心为 [`transform-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin)（缩放）注意其中心为 [`transform-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin)

    ![image.png](https://backblaze.cosine.ren/juejin/93f99f7d68214535ac4eaf6ab1f33ff3~tplv-k3u1fbpfcp-watermark.png)

    ```css
    // 沿x轴缩小为50%
    transform: scale(0.5);
    // 沿x轴缩小为50%，沿y轴放大为之前的2倍
    transform: scale(0.5, 2);
    ```

  - [`rotate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function#rotate)（旋转） 将元素在不变形的情况下旋转到原点周围(如 [`transform-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin) 属性所指定) 。 移动量由指定角度定义;如果为**正值**，则运动将为**顺时针**，如果为负值，则为逆时针 。 180°的旋转称为点反射 (*point reflection*)。

    ![image.png](https://backblaze.cosine.ren/juejin/592ec860492c4406b2178959b0cf4320~tplv-k3u1fbpfcp-watermark.png)

    ```css
    transform: rotate(30deg);
    ```

  - [`skew`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function#skew) （倾斜） 参数表示倾斜角度，单位deg

    一个参数时表示水平方向的倾斜角度（ax）；

    两个参数时表示水平、垂直（ax, ay）。

    ```css
    transform: skew(ax)       
    transform: skew(ax, ay)
    ```

- `none`

  不应用任何变换。

> **注意：**他只能转换由盒模型定位的元素，根据经验如果元素具有display: block，则由盒模型定位元素。

[`transition`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition) 过渡动画，在dom加载完成或class发生变化时触发，这个属性是 [`transition-property`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property)，[`transition-duration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration)，[`transition-timing-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function) 和 [`transition-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay) 的一个简写属性。

```css
/* Apply to 1 property */
/* property name | duration */
transition: margin-right 4s;

/* property name | duration | delay */
transition: margin-right 4s 1s;

/* property name | duration | timing function */
transition: margin-right 4s ease-in-out;

/* property name | duration | timing function | delay */
transition: margin-right 4s ease-in-out 1s;

/* Apply to 2 properties */
transition: margin-right 4s, color 1s;

/* Apply to all changed properties */
transition: all 0.5s ease-out;

/* Global values */
transition: inherit;
transition: initial;
transition: unset;
```

#### keyframe实现动画

[`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes) 关键帧@keyframes at-rule规则通过在动画序列中定义关键帧（或waypoints）的样式来控制CSS动画序列中的中间步骤。和 [转换 transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions) 相比，关键帧 keyframes 可以控制动画序列的中间步骤。

```css
// 从左侧滑入
@keyframes slidein {
  from {
    transform: translateX(0%); 
  }
  to {
    transform: translateX(100%);
  }
}
// 
@keyframes identifier {
  0% { top: 0; }
  50% { top: 30px; left: 20px; }
  50% { top: 10px; }
  100% { top: 0; }
}
```

举个栗子：[my CSS Animation pratice (codepen.io)](https://codepen.io/yusixian/pen/rNGEpoj?editors=1100)

```css
@keyframes identifier {
  0% { top: 0; left: 0; }
  50% { top: 60%; left: 60%;}
  100% {  top: 0; left: 0; }
}
@keyframes slidein {
  from {
    transform: translateX(0%); 
  }
  to {
    transform: translateX(100%);
  }
}
body  >div {
  position: absolute;
  display:flex;
  align-items:center;
  justify-content: center;
  color: #fafafa;
  background-color: #141414;
  padding: 10px;
  width:20%; height:20%;
/*   从左上到右下，持续5s，延迟1s，无限循环 */
/*   animation: identifier 5s linear 1s infinite; */
/*   向右滑，持续1s，两次 */
  animation: slidein 1s 2;
}
```

总结一下：

css动画的优点：简单、高效、声明式的。不依赖于主线程，采用硬件加速（GPU），通过简单的控制keyframe animation播放和暂停。

缺点：不能**动态修改或定义动画**，内容不同的动画**无法实现同步**，**多个动画彼此无法堆叠**。
适用场景：简单的h5活动/宣传页。
推荐库:[Animate.css](https://animate.style/)、[CSShake](https://elrumordelaluz.github.io/csshake/)等。

### svg实现动画

svg是基于XML的矢量图形描述语言，它可以与CSS和]S较好的配合，实现svg动画通常有三种方式:**SMIL、JS、CSS**

- SMIL：同步多媒体集成语言
  - 结论∶兼容性不理想,这里不过多讨论,当然有polyfill的方案:<https://github.com/ericwilligers/svg-animation>
- 使用JS来操作SVG动画自不必多说，目前也有很多现成的类库。例如老牌的Snap.svg以及anime.js，都能让我们快速制作SVG动画。当然,除了这些类库，HTML本身也有原生的 Web Animation 实现。使用Web 8622Animation也能让我们方便快捷地制作动画。这是老师的两个栗子：
  - 文字形变: <https://codepen.io/jiangxiang/pen/MWmdjeY>
  - Path实现写字动画: [SVG 写字动画 (codepen.io)](https://codepen.io/jiangxiang/pen/rNmgjqX)

第一个动画的实现原理

#### 文字溶解原理-filter

[`filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) 属性将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像，背景和边框的渲染。基础案例：<https://codepen.io/jiangxiang/pen/XWeQGQK>

- blur逐渐变小，在blur快没有的时候将其opacity设为0隐藏掉，就可以实现一个溶解效果

#### JS笔画原理-stroke

stroke-dashoffset、stroke-dasharray配合使用实现笔画效果。
[`stroke-dasharray`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray) 属性可控制用来描边的点划线的图案范式。它是一个数列，数与数之间用逗号或者空白隔开，指定短划线和缺口的长度。**如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值**。因此，**5,3,2等同于5,3,2,5,3,2。**
[`stroke-dashoffset`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset) 属性指定了dash模式到路径开始的距离。
老师的示例：[stroke-dasharray&stroke-dashoffset (codepen.io)](https://codepen.io/jiangxiang/pen/LYzvvxd)

```html
// 5px实线 5px空白 x1y1 -> x2y2
<line stroke-dasharray="5, 5" x1="10" y1="10" x2="190" y2="10" />
// 5px实线 10px空白
<line stroke-dasharray="5, 10" x1="10" y1="30" x2="190" y2="30" />
// 10px实线 5px空白
<line stroke-dasharray="10, 5" x1="10" y1="50" x2="190" y2="50" />
// 5px实线 1px空白...
<line stroke-dasharray="5, 1" x1="10" y1="70" x2="190" y2="70" />
<line stroke-dasharray="1, 5" x1="10" y1="90" x2="190" y2="90" />
<line stroke-dasharray="0.9" x1="10" y1="110" x2="190" y2="110" />
<line stroke-dasharray="15, 10, 5" x1="10" y1="130" x2="190" y2="130" />
<line stroke-dasharray="15, 10, 5, 10" x1="10" y1="150" x2="190" y2="150" />
<line stroke-dasharray="15, 10, 5, 10, 15" x1="10" y1="170" x2="190" y2="170" />
// 总长度180 180实线 180空白（全是实线） 这个时候改变dashoffset的值就可以实现笔画效果
<line stroke-dasharray="180" stroke-dashoffset的值就可以实现笔画效果="0" x1="10" y1="190" x2="190" y2="190" />
```

![image.png](https://backblaze.cosine.ren/juejin/D08067ea0b1c4fd78ac56b117d8043a4~Tplv-K3u1fbpfcp-Watermark.png)

直线这种比较简单的可以直接知道其总长度进而通过初始化dashoffset实现笔画效果，那么不规则图形？

> 通过path.getTotalLength();

[path路径](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)- [d](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/d)属性定义
大写字母跟随的是绝对坐标x,y，小写为相对坐标dx,dyM/m绘制起始点。

- L/l绘制一条线段。
  C/c为绘制贝塞尔曲线。
  Z/z将当前点与起始点用直线连接。

- 计算path的长度- path.getTotalLength();
- 计算path上某个点的坐标- path.getPointAtLength(lengthNumber);

老师的例子：[SVG 使用stroke-dashoffset和stroke-dashoffset实现笔画效果 (codepen.io)](https://codepen.io/jiangxiang/pen/eYWagxq)

- svg动画的优点∶通过矢量元素实现动画,不同的屏幕下均可获得较好的清晰度。可以实现一些特殊的效果：**描字，形变，墨水扩散**等。

- 缺点∶使用方式较为**复杂**，**过多使用可能会带来性能**问题。

### js实现动画

JS可以实现复杂的动画，可以操作css、svg也可以操作canvas动画API上进行绘制。

### 如何做选择？

CSS实现

- 优点

  - 浏览器会对CSS3动画做一些优化，导致CSS3动画性能上稍有优势（新建一个图层来跑动画）
  - CSS3动画的代码相对简单

- 缺点

  - 动画控制上不够灵活

  - 兼容性不佳
  - 部分动画无法实现（视差效果、滚动动画）

- 对于简单动画都可以用css实现

JS 实现

- 优点

  - **使用灵活**，同样在定义一个动画的keyframe序列时，可以根据不同的条件调节若干参数（JS动画函数）改变动画方式。（CSS会有非常多的代码冗余）
  - 对比与**CSS的keyframe粒度更粗**，Css**本身的时间函数是有限**的，这块 **JS 都可做弥补。**

  - CSS很难做到**两个以上的状态转化**（要么使用关键帧，要么需要多个动画延时触发，再想到要对动画循环播放或暂停倒序等，**复杂度极高**）

- 缺点

  - 使用到 JS 运行时，**调优方面不如 CSS 简单**，CSS调优方式固定。
  - 对于性能和兼容性较差的浏览器，CSS可以做到优雅降级，而 **JS 需要额外代码兼容。**会影响打包后产物的体积。

总结：

- 当为UI元素采用较小的独立状态时,使用CSS.
- 在需要对动画进行大量控制时，使用JavaScript。
- 在特定的场景下可以使用SVG，可以使用CSS或JS去操作SVG变化。（比如上述的溶解、笔画效果等）

## 实现前端动画

### js动画函数封装

```js
function animate({easing, draw, duration})    {
  let start = performance.now(); // 取当前时间
  return new Promise(resolve => {
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if(timeFraction > 1) timeFraction = 1;
      
      let progress = easing(timeFraction);

      draw(progress);
      
      if(timeFraction < 1) {
          requestAnimationFrame(animate);
      } else {
          resolve();
      }
    });
  });
}
```

这个函数中首先通过[performance.now()](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now)取到当前系统时间，它以一个恒定的速率慢慢增加，不会受到系统时间的影响以浮点数的形式表示时间，**精度最高可达微秒级**，不易被篡改。入参说明：

- draw 绘制函数

  - 可以将其想象为一只画笔，随着函数执行，这个画笔的函数会被反复的调用，并传入当前执行的进度progress，progress取决于easing的值，如若为线性增加的则为0~1。如：

    ```js
    const ball = document.querySelector('.ball');
    const draw = (progress) => {
        ball.style.transform = `translate(${progress}px, 0)`;
    }
    ```

- easing 缓动函数

  - 缓动函数改变（或者说扭曲）动画的时间，将其改为线性/非线性，或者多维度的。如：

    ```js
    easing(timeFraction) {
        return timeFraction ** 2;   //timeFraction的平方
    }
    ```

- duration 持续时间 顾名思义，单位是毫秒

- 最后返回Promise的原因：

  - [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises) 是一个对象，它代表了一个异步操作的最终完成或者失败。

  - 动画可以是连续的，Promise支持通过then函数或await进行顺序调用，可以很容易地拿到这个动画的终态

- 这个动画函数实现一个有限时间的动画封装

- **RequestAnimationFrame (rAF)** vs **SetTimeout** vs **Setlnterval**

  - 使用[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)！为什么？

    该内置方法允许设置回调函数以**在浏览器准备重绘时运行**。通常这很快，但确切的时间取决于浏览器。
    setTimeout和setInterval当页面在后台时,根本**没有重绘**，所以回调不会运行：**动画将被暂停并且不会消耗资源。**参考：[javascript - requestAnimationFrame loop not correct FPS - Stack Overflow](https://stackoverflow.com/questions/43379640/requestanimationframe-loop-not-correct-fps/43381828#43381828)

    >重排：若渲染树的一部分更新，且**尺寸变化**，就会发生重排。
    >
    >重绘：部分节点需要更新，但**不改变其他集合形状**。如改变某个元素的visibility、outline、背景颜色等，就会发生重绘。

### 简单动画

JS执行动画的核心思想

> ∆r = ∆v∆t

简单理解：r为距离，v速度，t是时间。通过比例系数缩放来保证动画的真实感。

举个例子：匀速运动，老师的例子非常全面[JS封装动画函数 (codepen.io)](https://codepen.io/jiangxiang/pen/rNmgVKK)（一定要去看看！）

```js
const ball = document.querySelector('.ball');
const draw = (progress) => {
    ball.style.transform = `translate(${progress}px, 0)`;
}
// 沿x轴匀速运动
animate({
    duration: 1000,
    easing(timeFraction) {
        return timeFraction * 100;
    },
    draw
})
```

![1.gif](https://backblaze.cosine.ren/juejin/Cb13be23f4e34790a350e079ed3cca1e~Tplv-K3u1fbpfcp-Watermark.gif)

- 重力：h = g * t ^2^

```js
t^2^// 重力
const gravity = () => {
  const draw = (progress) => { // 高度500
    ball.style.transform = `translate(0, ${500 * (progress - 1)}px)`;
  };
  animate({
    duration: 1000,
    easing(timeFraction) {
      return timeFraction ** 2; // t平方
    },
    draw,
  });
};

```

![2.gif](https://backblaze.cosine.ren/juejin/36c45c23baed4ed98e29e0e7f45a3140~tplv-k3u1fbpfcp-watermark.png)

- 摩擦力：时间变为2t - t^2^

```js
// 摩擦力
const friction = () => {
  // 初始高度500px
  const draw = (progress) => {
    ball.style.transform = `translate(0, ${500 * (progress - 1)}px)`;
  };
  animate({
    duration: 1000,
    easing(timeFraction) {
      // 初始速度系数为2
      return timeFraction * (2 - timeFraction);
    },
    draw,
  });
};

```

![3.gif](https://backblaze.cosine.ren/juejin/066ff6078d39479da3229092e10b5925~tplv-k3u1fbpfcp-watermark.png)

- 平抛 （x轴匀速，y轴加速） 也就是说，y轴类似重力中的t^2^而x轴速度不变

```js
// 平抛 x
const horizontalMotion = () => {
  const draw = (progress) => {
    ball.style.transform = `translate(${500 * progress.x}px, ${500 * (progress.y - 1)}px)`;
  };

  // 有两个方向，沿着x轴匀速运动，沿着y轴加速运动
  animate({
    duration: 1000,
    easing(timeFraction) {
      return {
        x: timeFraction,
        y: timeFraction ** 2,
      }
    },
    draw,
  });
};
```

![4.gif](https://backblaze.cosine.ren/juejin/0f956087eb91462b9072a126934ff568~tplv-k3u1fbpfcp-watermark.png)

其余的还有很多，再多的话就在easing返回的对象中加入新的属性，如旋转：

- 旋转+平抛

  ```js
  // 旋转 + 平抛
  const horizontalMotionWidthRotate = () => {
    const draw = (progress) => {
      ball.style.transform = `translate(${500 * progress.x}px, ${500 * (progress.y - 1)}px) rotate(${2000 * progress.rotate}deg)`;// 这里的2000也是比例系数
    };
  
    // 有两个方向，沿着x轴匀速运动，沿着y轴加速运动
    animate({
      duration: 2000,
      easing(timeFraction) {
        return {
          x: timeFraction,
          y: timeFraction ** 2,
          rotate: timeFraction,
        }
      },
      draw,
    });
  };
  ```

  ![5.gif](https://backblaze.cosine.ren/juejin/8596a1014d81410e8fbf91ec0a03a3fc~tplv-k3u1fbpfcp-watermark.png)

- 拉弓（x轴匀速，y轴初始速度为负的匀加速）

  ```js
  // 拉弓
  const arrowMove = () => {
    // 抽象出来，初始值为2，到某个临界点变为正的1并且匀速增加
    const back = (x, timeFraction) => {
      return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
    }
    const draw = (progress) => {
      ball.style.transform = `translate(${200*progress.x}px, ${ - 500 * progress.y}px)`;
    };
    animate({
      duration: 1000,
      easing(timeFraction) {
        return {
          x: timeFraction,
          y: back(2, timeFraction),
        };
      },
      draw,
    });
  };
  ```

![6.gif](https://backblaze.cosine.ren/juejin/c78ab72096e1434d9f811e606e7c4c11~tplv-k3u1fbpfcp-watermark.png)

- 贝塞尔曲线 [cubic-bezier(0,2.11,1,.19) ✿ cubic-bezier.com](https://cubic-bezier.com/#0,2.11,1,.19)、[Animated Bézier Curves - Jason Davies](https://www.jasondavies.com/animated-bezier/)

  - ps：讲到这里开始逐渐硬核起来了，tql

  ![10.gif](https://backblaze.cosine.ren/juejin/abef976de60e4f549becd34b269408de~tplv-k3u1fbpfcp-watermark.png)

  ```js
  // 贝塞尔
  const bezier = () => {
    const bezierPath = (x1, y1, x2, y2, timeFraction) => {
      const x = 3 * x1 * timeFraction * (1 - timeFraction) ** 2 + 3 * x2 * timeFraction ** 2 * (1 - timeFraction) + timeFraction ** 3;
      const y = 3 * y1 * timeFraction * (1 - timeFraction) ** 2 + 3 * y2 * timeFraction ** 2 * (1 - timeFraction) + timeFraction ** 3;
      return [x, y];
    }
  
    const draw = (progress) => {
      const [px, py] = bezierPath(0.2, 0.6, 0.8, 0.2, progress);
      // 实际绘制在两个维度上
      ball.style.transform = `translate(${300 * px}px, ${-300 * py}px)`;
    }
  
    animate({
      duration: 2000,
      easing(timeFraction) {
        return timeFraction * (2 - timeFraction);
      },
      draw,
    });
  }
  ```

  ![11.gif](https://backblaze.cosine.ren/juejin/65f2c703e2dd427ea0013d78d30f1f41~tplv-k3u1fbpfcp-watermark.png)

### 复杂动画

- 弹跳小球（缓动函数实现/自动衰减实现）

  - 直接去看老师的例子：[JS封装动画函数 (codepen.io)](https://codepen.io/jiangxiang/pen/rNmgVKK?editors=0010)，自动衰减这里填了之前的一个坑：为什么要使用Promise，在每次执行完毕是，会将句柄再交给上面的函数判断是否有速度的衰减，直到速度为0的时候会自动结束。

  ![7.gif](https://backblaze.cosine.ren/juejin/3fe64ea4171e49f1bf4dd1c4b6b06dc4~tplv-k3u1fbpfcp-watermark.png)

自动衰减：更加复杂

![8.gif](https://backblaze.cosine.ren/juejin/7a7244b30a714bd481b3de84bede051c~tplv-k3u1fbpfcp-watermark.png)

- 椭圆运动

  - 套公式即可，x = a*cos(a)，y = b* sin(a)

    ```js
    // 椭圆
    const ellipsis = () => {
      const draw = (progress) => {
        const x = 150 * Math.cos(Math.PI * 2 * progress);
        const y = 100 * Math.sin(Math.PI * 2 * progress);
        ball.style.transform = `translate(${x}px, ${y}px)`;
      }
      
      animate({
        duration: 2000,
        easing(timeFraction) {
          return timeFraction * (2 - timeFraction);
        },
        draw,
      });
    };
    
    ```

![9.gif](https://backblaze.cosine.ren/juejin/4808e48403684d70b74a9ff5defa419d~tplv-k3u1fbpfcp-watermark.png)

## 相关实践资源

动画代码示例：

- [CodePen](https://codepen.io) 可以提供很多设计灵感
- [CodeSandbox](https://codesandbox.io/dashboard/home?workspace=79846caf-22a5-419f-bd79-64954e7ad9dd) 方便引入SDK

设计网站：

- [Dribbble - Discover the World’s Top Designers & Creative Professionals](https://dribbble.com/)
- 我自己推荐一手figma：[Figma](https://www.figma.com/files/recent?fuid=1037355984934938497)

动画制作工具(一般都是UE、UI同学使用):

- 2D : Animate CC、After Effects
- 3D :Cinema 4D、Blender、Autodesk Maya

SVG:

- Snap.SVG - 现代SVG图形的JavaScript库

- Svg.js - 用于操作和动画SVG的轻量级库。

JS:

- GSAP - JavaScript动画库。

- TweenJS - 一个简单但功能强大的JavaScript补间/动画库。CreateJS库套件的一部分。
- Velocity - 加速的JavaScript动画。

CSS:

- Animate.css - CSS动画的跨浏览器库。像一件简单的事情一样容易使用。

canvas:

- EaselJS - EaselJS 是一个用于在HTML5中构建高性能交互式2D内容的库

- Fabric.js -支持动画的JavaScript画布库。

- Paper.js -矢量图形脚本的瑞士军刀

- Scriptographer - 使用HTML5

  Canvas移植到JavaScript和浏览器。

- Pixijs –使用最快、最灵活的2D WebGL渲染器创建精美的数字内容。

在实际工作中往往是将UI给的动画帧/设计文件转化为代码

- 需要完全前端自己设计自己开发时：

  - 使用已封装好的动画库，从开发成本和体验角度出发进行取舍

- 设计不是很有空时：

  - 清晰度、图片格式可以指定，动画**尽量给出示意或者相似案例参考**。索要精灵图资源等需要帮忙压缩。（移动端的资源适配等）

- 设计资源充足时：

  - 要求设计导出lottie格式文件

    > Lottie是可应用于Android, ios, Web和Windows的库,
    > 通过Bodymovin解析AE动画，并导出可在移动端和web端渲染动画的json文件。

    ```js
    import lottie from 'lottie-web' ;
    this.animation = lottie.loadAnimation({
        container: this.animationRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        aninationData: dataJson,
        path: URL,
    });
    ```

### 优化

- [动画的12项基本法则 - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/動畫的12項基本法則)

- 性能角度

  - 重点：减少重绘、重排，这是整个环节中最为耗时的两环。

> 页面渲染的一般过程为JS -> CSS -> 计算样式 --> 布局 -> 绘制 -> 渲染层合并。
>
> 其中，**Layout(重排)和Paint(重绘)是整个环节中最为耗时的两环**，所以我们尽量避免这两个环节。从性能方面考虑，**最理想的渲染流水线是没有布局和绘制环节**的，**只需要做渲染层的合并**即可。

- 通过[CSS Triggers](https://csstriggers.com/)可以查询CSS属性及其影响的环节

### 建议

- 在实际的应用里，最为简单的一个注意点就是，**触发动画的开始不要用display:none属性值**，因为**它会引起Layout、Paint环节**，通过**切换类名**就已经是一种很好的办法。

> ps：学到了！这就去改改

- CSS3硬件加速又叫做GPU 加速，是利用GPU进行渲染，减少CPU操作的一种优化方案。由于GPU中的transform等CSS属性不会触发repaint，所以能大大提高网页的性能。CSS中的以下几个属性能触发硬件加速：
  - transform
  - opacity
  - filter
  - Will-change
  - 如果有一些元素不需要用到上述属性，但是需要触发硬件加速效果,可以使用一些小技巧来诱导浏览器开启硬件加速。
  - -算法优化
    -线性函数代替真实计算-几何模型优化
    -碰撞检测优化622
    -内存/缓存优化-离屏绘制

## 总结感想

今天的课也非常的硬核，介绍了前端动画的基本原理、前端动画的分类和如何实现前端的动画，并介绍了相关资源与实践方法。让我对前端动画有了一个更深刻的了解，最后给出的资源推荐也很有帮助~

> 本文引用的内容大部分来自蒋翔老师的课、MDN（CSS动画属性的介绍翻了半天MDN，上面写的非常全面并且有很生动的例子，推荐一看）

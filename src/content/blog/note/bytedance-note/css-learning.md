---
title: 青训营 |「CSS布局」
link: note/front-end/bytedance-note/css-learning-layout
catalog: true
date: 2022-01-16 14:30:17
subtitle: 字节青训营笔记，也算是自己进行的布局学习的梳理吧，MDN上讲的很详细,所以大多附上了MDN上的链接。
lang: cn
tags:
- 前端
- CSS
- layout
categories:
- [笔记, 青训营笔记]
---
# 布局（layout）

- 确定内容的大小和位置的算法
- 依据元素、容器、兄弟节点和内容等信息来计算
[CSS 基础框盒模型介绍 - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

> 当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 **CSS 基础框盒模型**（**CSS basic box model**），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。
> 每个盒子由四个部分（或称*区域*）组成，其效用由它们各自的边界（Edge）所定义（原文：defined by their respective edges，可能意指容纳、包含、限制等）。如图，与盒子的四个组成区域相对应，每个盒子有四个边界：*内容边界* *Content edge*、*内边距边界* *Padding Edge*、*边框边界* *Border Edge*、*外边框边界* *Margin Edge*。
>
## width

指定content box 宽度，可取值为长度、百分数、auto等，百分数是相对于content box的宽度。

## height

指定content box 高度可取值为长度、百分数、auto等，百分数是相对于content box的高度。weight/height都需注意的若使用百分比则其content box需指定宽度/高度否则不生效。

## padding

指定四个方向上的内边距。其百分比是相对于容器宽度,说明见 [padding - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding)

- 当只指定**一个**值时，该值会统一应用到**全部四个边**的内边距上。
- 指定**两个**值时，第一个值会应用于**上边和下边**的内边距，第二个值应用于**左边和右边**。
- 指定**三个**值时，第一个值应用于**上边**，第二个值应用于**右边和左边**，第三个则应用于**下边**的内边距。
- 指定**四个**值时，依次（顺时针方向）作为**上边**，**右边**，**下边**，和**左边**的内边距。
![image.png](https://backblaze.cosine.ren/juejin/51e8ae436fdf407182f4831a9092759a~tplv-k3u1fbpfcp-watermark.png)

## margin

指定四个方向上的外边距。其百分比是相对于容器宽度,说明见[margin - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin)

- 当只指定**一个**值时，该值会统一应用到**全部四个边**的外边距上。
- 指定**两个**值时，第一个值会应用于**上边和下边**的外边距，第二个值应用于**左边和右边**。
- 指定**三个**值时，第一个值应用于**上边**，第二个值应用于**右边和左边**，第三个则应用于**下边**的外边距。
- 指定**四个**值时，依次（顺时针方向）作为**上边**，**右边**，**下边**，和**左边**的外边距。
margin collapse：[外边距重叠 - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)。相邻的两个元素之间的外边距重叠，会在垂直方向上发生边界折叠，挑选最大边界范围留下。

## border

指定边框，border-width指定宽度、border-style指定类型（实线/虚线）、border-color指定边框颜色。通常直接将三者结合简写为 border ,MDN描述见[border - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)

- border巧用：制作三角形
  - 首先四个边框设置了不同的颜色。可以发现边角是由斜线切开的。
    ![image.png](https://backblaze.cosine.ren/juejin/9e30527c58ae4a09b158bd1a888961d7~tplv-k3u1fbpfcp-watermark.png)
  - 那么当容器高度和宽度为0的时候，可以看到如图
    ![image.png](https://backblaze.cosine.ren/juejin/51749d92b6bd4a1f8b7c8cac57c551e8~tplv-k3u1fbpfcp-watermark.png)
  - 那如果将其他的边框颜色设为透明（transport）可以发现，制造了一个红色的三角形出来。
    ![image.png](https://backblaze.cosine.ren/juejin/6b3c7bf5d0084c5bb48c827cd23e73e6~Tplv-K3u1fbpfcp-Watermark.png)

## box-sizing

[box-sizing - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
> 在 [CSS 盒子模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model "CSS/Box_model")的默认定义里，对一个元素所设置的 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只会应用到这个元素的内容区。如果这个元素有任何的 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 或 [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。

box-sizing 属性可以被用来调整这些表现:

- `content-box`  是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- `border-box` 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

## overflow

[overflow - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)
> CSS属性 **overflow** 定义当一个元素的内容太大而无法适应 [块级格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 时候该做什么。它是 [`overflow-x`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-x) 和[`overflow-y`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-y)的 [简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)。

将其设置为auto，则当内容过多的时候会显示滚动条，否则不显示。而为使 `overflow`有效果，块级容器必须有一个指定的高度（`height`或者`max-height`）或者将`white-space`设置为`nowrap`。

## 块级元素

[块级元素 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements#block-level_example)
> 块级元素占据其父元素（容器）的整个水平空间，垂直空间等于其内容高度，通常浏览器会在块级元素前后另起一个新行。

- 常见的有body、article、div、main、section、h1-h6、p、ul、li
- display: block

## 行级元素

[行内元素 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elements)
> 一个行内元素只占据它对应标签的边框所包含的空间
> 行级元素和其他行级元素一起，不使用盒模型中的width、height属性

- 常见的有span、em、strong、cite、section、code等

- display: inline

说到display属性，其说明[display - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)：

> **`display`** 属性可以设置元素的内部和外部显示类型 *display types*。元素的外部显示类型 *outer display types* 将决定该元素在[流式布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout)中的表现（[块级或内联元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout)）；元素的内部显示类型 *inner display types* 可以控制其子元素的布局（例如：[flow layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout)，[grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout) 或 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout)）。

- block 块级盒子
- inline 行级盒子
- inline-block 本身是行级，可以被放在行级盒子中，可以设置宽高，作为一个整体不会被拆散成多行。
- none 排版时被完全忽略

## 常规流（Normal Flow）

- 根元素、浮动和绝对定位的元素会脱离常规流，其他元素都在常规流之内（in-flow）。常规流中的盒子，在某种排版上下文中参与布局。
- 行级排版上下文、块级排版上下文、Table排版上下文、Flex排版上下文、Grid排版上下文……

### 行内格式化上下文（Inline formatting context）

[行内格式化上下文（Inline formatting context） - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inline_formatting_context)

> 行内格式化上下文是一个网页的渲染结果的一部分。其中，各行内框（inline boxes）一个接一个地排列，其排列顺序根据书写模式（writing-mode）的设置来决定：
>
> - 对于水平书写模式，各个框从左边开始水平地排列
> - 对于垂直书写模式，各个框从顶部开始水平地排列
>
> 在下面给出的例子中，带黑色边框的两个([`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div))元素组成了一个[块级格式化上下文（block formatting context）](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)，其中的每一个单词都参与一个行内格式化上下文中。水平书写模式下的各个框水平地排列，垂直书写模式下的各个框垂直地排列。

- 只包含行级盒子的容器会创建一个IFC，IFC中排版规则如下
  - 盒子在一行内水平摆放，当一行放不下时会换行显示。
  - `text-align` 决定一行内盒子的**水平对齐**
  - `vertical-align` 决定一个盒子在行内的**垂直对齐**
  - 避开 [浮动](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats) 元素

- 一个段落实际上是一系列行框的集合，这些行框在块的方向上排列。
- 一个行内框（inline box）被分割到多行中时， margins, borders, 以及 padding 的设定均不会在断裂处生效。 下例中有一个 ([`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span)) 元素，它包裹了一系列单词，占据了两行。可以看见在断裂处，`<span>` 的 border 同样发生了断裂。

![image.png](https://backblaze.cosine.ren/juejin/ae65b47548d540e4ac46b9e9ddb2e6d3~tplv-k3u1fbpfcp-watermark.png)

### 块级格式化上下文（Block Formatting Context）

[块格式化上下文 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

- Block Formatting Context（BFC）
- 盒子从上到下摆放
- **BFC内**的**垂直margin会合并**（见前文margin中的margin collapse，外边距重叠）
- **BFC内**盒子的margin则**不会与外面的合并**
- BFC 不会与浮动元素重叠

## FlexBox

[flex 布局的基本概念 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)

- 一种新的排版上下文

- 可以控制子级盒子的：
  - 摆放流向(flex-direction)
    - 默认（`row`）：由左往右 →
    - `row-reverse`：由右往左←
    - `column`：由上到下 ↓
    - `column-reverse`：由下到上↑
  - 摆放顺序
  - 盒子高度和宽度
  - 水平与垂直方向的对齐（严格来说，主轴和交叉轴方向上的对齐，见[`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)和 [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#align-items)）
  - 是否允许折行（`wrap` 、`nowrap` 、`wrap-reverse`）
  - 其他还有[flex 元素上的属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#flex_元素上的属性)（[`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)、[`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)、[`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)）等

- flex子项会创建一个BFC

重点再讲一下主轴和交叉轴的对齐，以默认的由右往左排列（row），其主轴为水平轴，交叉轴为垂直轴。其中主轴（justify-content）的对齐方式有以下几种（初始值为flex-start ）：

- flex-start 在主轴开始的地方对齐
- flex-end 在主轴结束的地方对齐
- center 在主轴上居中对齐
- space-between 在主轴上两端对齐，中间穿插空间
- space-around 在主轴上两边也加上空白，保持元素占用大小不变
- space-evenly 两边与中间的空白大小相同
![image.png](https://backblaze.cosine.ren/juejin/8774e61bcdd34fa4802aeaaa87f311f5~Tplv-K3u1fbpfcp-Watermark.png)

交叉轴的对齐方式如下（初始值为stretch）：

- flex-start：在交叉轴开始的地方对齐
- flex-end：在交叉轴结束的地方对齐
- center：在交叉轴上居中对齐
- stretch：在交叉轴上，拉伸元素以适应容器
- baseline：两边与中间的空白大小相同
- ![image.png](https://backblaze.cosine.ren/juejin/36b54bd7d27d403e883c75633d8f8c91~tplv-k3u1fbpfcp-watermark.png)

如果想给flex中的某个元素搞特殊，那么可以给他设置一个align-self属性，如图

![image.png](https://backblaze.cosine.ren/juejin/3c8cde0097674919bb6007fd308536bf~Tplv-K3u1fbpfcp-Watermark.png)

[order](https://developer.mozilla.org/zh-CN/docs/Web/CSS/order) 可以设置元素们在布局时的顺序

![image.png](https://backblaze.cosine.ren/juejin/486de4617acc4684b76d89c45bc1b083~tplv-k3u1fbpfcp-watermark.png)

那如果网页拉伸或者缩小，flex容器中的内容会如何变呢？

- 可以通过设置flex-grow在有剩余空间的时候控制伸展能力，flex-shrink在剩余空间不足的时候控制收缩。

- [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#flex_元素属性：flex-grow) 属性可以按比例分配空间。如果第一个元素 `flex-grow` 值为2， 其他元素值为1，则第一个元素将占有2/4, 另外两个元素各占有1/4。
- [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#flex_元素属性：_flex-shrink) 与  `flex-grow`  属性一样，可以赋予不同的值来控制flex元素收缩的程度 —— 给`flex-shrink`属性赋予更大的数值可以比赋予小数值的同级元素收缩程度更大。
- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#flex_元素属性：flex-basis) 没有伸展或者收缩时的基础长度

关于flex布局，之前在codepen看到过一个演示项目，可以了解其每个属性的相应作用，强烈推荐自己多试试：[Flexbox playground (codepen.io)](https://codepen.io/enxaneta/details/adLPwv)

![image.png](https://backblaze.cosine.ren/juejin/d5df5c8648ad432e84b600cef93fc53a~tplv-k3u1fbpfcp-watermark.png)

## Grid布局

[Grid - 术语表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid)

- display：grid会使元素生成一个块级的Grid容器

- 可以使用grid-template相关属性将容器划分为网格
  - [`grid-template-rows`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows)   基于 [网格行](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Rows) 的维度，去定义网格线的名称和网格轨道的尺寸大小
  - [`grid-template-columns`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns) 该属性是基于 [网格列](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Column).的维度，去定义网格线的名称和网格轨道的尺寸大小
  - 可以定义[`minmax(min, max)`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/minmax())  ，这是一个来定义大小范围的属性，大于等于min值，并且小于等于max值。如果max值小于min值，则该值会被视为min值。最大值可以设置为网格轨道系数值 `fr` ，但最小值则不行
  - 也可以用单位 `fr` 来定义上述网格轨道大小的弹性系数。 每个定义了  `fr`  的网格轨道会按比例分配剩余的可用空间。当外层用一个 `minmax()` 表示时，它将是一个自动最小值(即 `minmax(auto, <flex>)` )
  - 想要元素跨越多行/多列？
    - grid line 网格线
    - grid area网格区域
    - 使用grid-template-columns-start/grid-template-columns-end等，可简写为grid-area;

照着课上写的一个小demo：[Grid (codepen.io)](https://codepen.io/yusixian/pen/jOGJNqx?editors=0100),也算是一个直观的例子了。

- 首先将容器设置为设置为一个4行2列的grid

```css
#container {
  width: 300px;
  height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
}
```

![image.png](https://backblaze.cosine.ren/juejin/f01af69e4f69457489dc8e5b800379b0~tplv-k3u1fbpfcp-watermark.png)

- 然后将A这个元素,设置从第1个网格行线开始到第3个网格行线,即占两行,列同理占两列,如图

```css
.a {
  grid-row-start: 1;
  grid-column-start: 1;
  grid-row-end: 3;
  grid-column-end: 3;
}
```

可简写为:

```css
.a {
  grid-area:1/1/3/3;
}
```

如图,可以发现A占据了两行两列
![image.png](https://backblaze.cosine.ren/juejin/f58bea121bf0411b99891ab77bd81c80~tplv-k3u1fbpfcp-watermark.png)

- 那么再进行一些更改,将a改为2-4行/列即占据了第2、3行/列,b改为1-3行/列即占据了第1、2行/列

```css
.a {
  grid-area:2/2/4/4;
}
.b {
  grid-area:1/1/3/3;
}
```

![image.png](https://backblaze.cosine.ren/juejin/dab65647e3cf4901a04a51c506ef36dc~tplv-k3u1fbpfcp-watermark.png)

## 浮动（float）

早期的时候，图文环绕利用float实现，现在只需了解即可。详细的还是看[float - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)

- 浮动允许文本和内联元素环绕它。具有浮动属性的元素会从网页的正常流动(文档流)中移除
- 当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到**另外一个浮动的元素**

- 要注意的就是如果使用浮动后，想要接下来的元素强制移至任何浮动元素下方，则须使用[clear](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)属性

## position定位

 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 属性用于指定一个元素在文档中的定位方式。[`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top)，[`right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right)，[`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom) 和 [`left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left) 属性则决定了该元素的最终位置。

position有如下几种定位类型：

- static：默认值，非定位元素
- relative：相对自身原本位置偏移，不脱离文档流
- absolute：绝对定位，相对非static祖先元素定位
- fixed：相对于视口绝对定位

### 相对定位(relative)

position:relative

- 在常规流中布局
- 相对于自己本该在的地方进行偏移（top、left、bottom、right）
- 流内其他元素当它未偏移一样照原样布局

### 绝对定位(absolute)

position:absolute

- 脱离常规流
- 相对于**最近的非static祖先**定位
  - 比如一个图标，要为它做一个角标，则将图标设置为position:relative，再将其position设置为absolute进行偏移即可实现。
- 不会对流内元素布局造成影响

# 建议及感想

> - 充分利用[MDN](https://developer.mozilla.org/zh-CN/) 和 [World Wide Web Consortium (W3C)](https://www.w3.org/) CSS规范
> - 保持好奇心，善用浏览器的开发者工具
> - 持续学习，CSS新特性还在不断出现

也算是给自己CSS学习的一个梳理，关于以上布局，主要还是多用，多查，在实践中成长，用多了自然而然的就记住了，然后平时看到感兴趣的前端项目也要进行学习，看看优秀的项目是如何进行布局的。

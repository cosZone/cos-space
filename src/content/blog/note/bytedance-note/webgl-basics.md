---
title: 青训营 |「WebGL基础」
link: note/front-end/bytedance-note/webgl-basics
catalog: true
date: 2022-01-27 14:30:17
subtitle: 这节课老师非常详尽的讲解了WebGL的绘图及其相关库，展示了很多有意思的WebGL小项目~
lang: cn
tags:
- 前端
- WebGL
- 图形学
categories:
- [笔记, 青训营笔记]
---

# 本节课重点内容

## Why WebGL / Why GPU?

- WebGL是什么?
  - GPU ≠ WebGL ≠ 3D
- WebGL为什么不像其他前端技术那么简单?

## 现代的图像系统

- **光栅(Raster)**：几乎所有的现代图形系统都是**基于光栅来绘制**图形的，光栅就是指**构成图像的像素阵列**。
- **像素(Pixel)**：**一个像素对应图像上的一个点**，它通常保存图像上的某个具体位置的颜色等信息。
- **帧缓存(Frame Buffer)**：在绘图过程中，**像素信息被存放于帧缓存**中，帧缓存是一块内存地址。
- **CPU (Central Processing Unit**)：中央处理单元，负责**逻辑计算**。
- **GPU (Graphics Processing Unit)**：图形处理单元，负责**图形计算**。

![image.png](https://backblaze.cosine.ren/juejin/f97c08e4d8da45c4ae56b62f293a3be2~tplv-k3u1fbpfcp-watermark.png)

- 如上图，现代图像的渲染如图过程

1. 轮廓提取/ meshing
2. 光栅化
3. 帧缓存
4. 渲染

### The Pipeline

![image.png](https://backblaze.cosine.ren/juejin/c26dca222e6942149b5a70c480f401a1~tplv-k3u1fbpfcp-watermark.png)

### GPU

- GPU由**大量的小运算单元**构成
- 每个运算单元只负责处理很**简单**的计算
- 每个运算单元彼此**独立**
- 因此所有计算可以**并行**处理

### WebGL & OpenGL关系

[OpenGL, OpenGL ES, WebGL, GLSL, GLSL ES API Tables (umich.edu)](http://web.eecs.umich.edu/~sugih/courses/eecs487/common/notes/APITables.xml)

![image.png](https://backblaze.cosine.ren/juejin/ce125f7f2cc14fada66e2971853070d2~tplv-k3u1fbpfcp-watermark.png)

## WebGL绘图步骤

**步骤**

1. 创建WebGL上下文
2. 创建WebGL Program
3. 将数据存入缓冲区
4. 将缓冲区数据读取到GPU
5. GPU执行WebGL程序，输出结果

![image.png](https://backblaze.cosine.ren/juejin/a24f2b13adc646e28dec4623c43ee41f~tplv-k3u1fbpfcp-watermark.png)

如图，针对几个单词进行解释：

- Raw Vertices & Primitives 原始顶点&原语
- Vertex Processor **顶点着色器**
- 运算后送到 **片元着色器** 进行处理：Fragment Processor

### 创建WebGL上下文

```js
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
// 创建上下文， 注意兼容
function create3DContext(canvas, options) {
    const names = ['webgl', 'experimental-webgL','webkit-3d','moz-webgl'];  // 特性判断
    if(options.webgl2) names.unshift(webgl2);
    let context = null;
    for(let ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii], options);
        } catch(e) {
            // no-empty
        }
        if(context) {
            break;
        }
    }
    return context;
}
```

### 创建WebGL Program（The Shaders）

1. Vertex Shader（顶点着色器）

   通过类型数组position，**并行**处理每个顶点的位置

   ```js
   attribute vec2 position;// vec2 二维向量
   void main() {
       gl_PointSize = 1.0;
       gl_Position = vec4(position, 1.0, 1.0);
   }
   ```

2. Fragment Shader（片元着色器）

   为顶点轮廓包围的区域内所有像素进行着色

   ```js
   precision mediump float;
   void main() {
       gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);//对应rgba（255，0，0，1.0），红色
   }
   ```

其具体步骤如下：

1. 创建顶点着色器和片元着色器代码：

   ```js
   // 顶点着色器程序代码
   const vertexShaderCode = `
   attribute vec2 position;
   void main() {
       gl_PointSize = 1.0;
       gl_Position = vec4(position, 1.0, 1.0);
   }
   `;
   // 片元着色器程序代码
   const fragmentShaderCode = `
   precision mediump float;
   void main() {
       gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   }
   `;
   ```

2. 使用 **[`createShader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/createShader)** 创建着色器对象

3. 使用 **[`shaderSource()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/shaderSource)** 设置着色器的程序代码

4. 使用 **[`compileShader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/compileShader)** 编译一个着色器

   ```js
   // 顶点着色器
   const vertexShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vertexShader, vertex);
   gl.compileShader(vertexShader);
   // 片元着色器
   const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragmentShader, fragment);
   gl.compileShader(fragmentShader);
   ```

5. 使用**[`createProgram()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/createProgram)** 创建 [`WebGLProgram`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLProgram) 对象

6. 使用 **[`attachShader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/attachShader)** 往 [`WebGLProgram`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLProgram) 添加一个片段或者顶点着色器。

7. 使用 **[`linkProgram()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/linkProgram)**链接给定的[`WebGLProgram`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLProgram)，从而完成为程序的片元和顶点着色器准备GPU代码的过程。

8. 使用 **[`useProgram()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/useProgram)** 将定义好的[`WebGLProgram`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLProgram) 对象添加到当前的渲染状态

   ```js
   // 创建着色器程序并链接
   const program = gl.createProgram();
   gl.attachShader(program, vertexShader);
   gl.attachShader(program, fragmentShader);
   gl.linkProgram(program);
   
   gl.useProgram(program);
   ```

### 将数据存到缓冲区中（Data to Frame Buffer）

- **坐标轴**：webGL的坐标系统是归一化的，**浏览器和canvas2D**的坐标系统是以**左上角为坐标原点，y轴向下，x轴向右**，坐标值相对于原点。而**webGL**的坐标系是以绘制画布的**中心点为原点**，**正常的笛卡尔坐标系**。

通过一个顶点数组表示其顶点，使用 **[`createBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/createBuffer)** 创建并初始化一个用于储存顶点数据或着色数据的[`WebGLBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLBuffer)对象并返回`bufferId`，然后使用 **[`bindBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bindBuffer)** 将给定的 `bufferId` 绑定到目标并返回，最后使用**[`bufferData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bufferData)**，将数据绑定至buffer中。

```js
// 顶点数据
const points = new Float32Array([
    -1, -1,
    0, 1,
    1, -1,
]);
// 创建缓冲区
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
```

### 读取缓冲区数据到GPU（Frame Buffer to GPU）

> - [getAttribLocation()](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getAttribLocation)返回了给定[`WebGLProgram`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLProgram)对象中某属性的下标指向位置。
>
> - [vertexAttribPointer()](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/vertexAttribPointer) 告诉显卡从当前绑定的缓冲区（bindBuffer()指定的缓冲区）中读取顶点数据。
> - [enableVertexAttribArray()](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/enableVertexAttribArray) 可以打开属性数组列表中指定索引处的通用顶点属性数组。

```js
const vPosition = gl.getAttribLocation(program, 'position'); // 获取顶点着色器中的position变量的地址
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); // 给变量设置长度和类型
gl.enableVertexAttribArray(vPosition); // 激活这个变量
```

### 输出结果（Output）

[Output](https://code.h5jun.com/kopozi/edit?js,output)

> [drawArrays()](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/drawArrays) 从向量数组中绘制图元

```js
// output
gl.clear(gl.COLOR_BUFFER_BIT);  //清除缓冲的数据
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
```

![image.png](https://backblaze.cosine.ren/juejin/4a2a842817cf45c1b630cd7cfc168031~tplv-k3u1fbpfcp-watermark.png)

## WebGL太复杂？其他方式

### canvas 2D

看看人家canvas2D，绘制同样的三角形：

```js
// canvas 简单粗暴，都封装好了
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(250, 0);
ctx.lineTo(500, 500);
ctx.lineTo(0, 500);
ctx.fillStyle = 'red';
ctx.fill();
```

### Mesh.js

[mesh-js/mesh.js: A graphics system born for visualization 😘. (github.com)](https://github.com/mesh-js/mesh.js)

```js
const {Renderer, Figure2D, Mesh2D} = meshjs;
const canvas = document.querySelector ('canvas');
const renderer = new Renderer(canvas);

const figure = new Figure2D();
figurie.beginPath();
figure.moveTo(250, 0);
figure.lineTo(500，500);
figure.lineTo(0, 500);
const mesh = new Mesh2D(figure, canvas);
mesh.setFill({
    color: [1, 0, 0, 1],
});
renderer.drawMeshes([mesh]);
```

### Earcut

使用[Earcut](https://github.com/mapbox/earcut)进行三角剖分

```
const vertices = [
    [-0.7, 0.5],
    [-0.4, 0.3],
    [-0.25, 0.71],
    [-0.1, 0.56],
    [-0.1, 0.13],
    [0.4, 0.21],
    [0, -0.6],
    [-0.3, -0.3],
    [-0.6, -0.3],
    [-0.45, 0.0],
];
const points = vertices.flat();
const triangles = earcut(points)
```

### 3D Meshing

由设计师导出给我们，再提取

[SpriteJS/next - The next generation of spritejs.](http://spritejs.com/demo/#/3d/wireframe)

## 图形变换（Transforms）

这就是数字图像处理相关的知识了（学过的都还回来了.jpg）

### 平移

![image.png](https://backblaze.cosine.ren/juejin/2b9bcc7942b446668eeef74d1132d637~tplv-k3u1fbpfcp-watermark.png)

### 旋转

![image.png](https://backblaze.cosine.ren/juejin/ffd20cb1d9b54ce99cfb3bc5a4dc5758~tplv-k3u1fbpfcp-watermark.png)

### 缩放

![image.png](https://backblaze.cosine.ren/juejin/4faf8762b5434e02b5b65397216c536e~Tplv-K3u1fbpfcp-Watermark.png)

### 线性变换（旋转+缩放）

![image.png](https://backblaze.cosine.ren/juejin/B346ba1cae3a413a8532e226fe832e65~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/208ec6cae5a541089c5825d472ded91f~tplv-k3u1fbpfcp-watermark.png)

从线性变换到齐次矩阵

![image.png](https://backblaze.cosine.ren/juejin/D26773fa78f34969b4405ff5d4c25b9c~Tplv-K3u1fbpfcp-Watermark.png)

老师的又一个栗子：[Apply Transforms](https://code.h5jun.com/vikig/edit?js,output)

## 3D Matrix

3D标准模型的**四个齐次矩阵**(mat4)

1. 投影矩阵Projection Matrix（正交投影和透视投影）
2. 模型矩阵Model Matrix （对顶点进行变换Transform）
3. 视图矩阵View Matrix（3D的视角，想象成一个相机，在相机的视口下）
4. 法向量矩阵Normal Matrix（垂直于物体表面的法向量，通常用于计算物体光照）

## Read more

1. [The Book of Shaders](https://thebookofshaders.com/) （介绍片元着色器，非常好玩的）
2. [Mesh.js](https://github.com/mesh-js/mesh.js) （底层库，欸嘿）
3. [Glsl Doodle](https://doodle.webgl.group/) （片元着色器的一个轻量库，有很多小demo）
4. [SpriteJS](http://spritejs.com/#/) （月影老师写的开源库orz）
5. [Three.js](https://threejs.org/)（很多有意思的~~游戏~~项目）
6. [Shadertoy BETA](https://www.shadertoy.com/)（很多有意思的项目）

## 总结感想

这节课老师非常详尽的讲解了WebGL的绘图及其相关库，展示了很多有意思的WebGL小项目~

> 本文引用的大部分内容来自月影老师的课和MDN！月影老师，tql!

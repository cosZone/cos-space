---
title: 青训营 |「Web多媒体入门」笔记
link: note/front-end/bytedance-note/web-multimedia-introduction
catalog: true
date: 2022-01-30 14:30:17
subtitle: 本节课老师科普了Web多媒体技术的基本概念，如编码格式、封装格式、多媒体元素、流媒体协议等，并阐述了Web多媒体的多种应用场景
lang: cn
tags:
- 前端
- 图像编码
- Web多媒体
categories:
- [笔记, 青训营笔记]
---

# Web多媒体历史

- PC时代：Flash等播放插件，富客户端。
- 移动互联网时代：Flash等逐渐被淘汰，HTML5出现了，但其支持视频格式等有限
- Media Source Extensions ，支持多种视频格式等

# 基础知识

## 编码格式

### 图像基本概念

- **图像分辨率**：用于确定组成一副图像的像素数据，就是指在**水平和垂直方向上图像所具有的像素个数**。
- **图像深度**：图像深度是指**存储每个像素所需要的比特数**。图像深度决定了图像的每个像素**可能的颜色数**，或可能的灰度级数。
  - 例如，彩色图像每个像素用R,G,B三个分量表示，**每个分量用8位**，**像素深度为24位**，可以表示的颜色数目为2的24次方，既16777216个；
  - 而一副**单色**图像存储每个像素需要8bit,则图像的**像素深度为8位**，最大灰度数目为2的8次方，既**256**个。
- 图像分辨率与图像深度共同决定了图像所占的大小~

### 视频基本概念

- 分辨率：**每一帧**的图像分辨率
- **帧率**：视频**单位时间**内包含的视频**帧的数量**
- **码率**：就是指**视频单位时间内传输数据量**，一般我们用**kbps**来表示， 即**千位每秒**。
- 分辨率、帧率与码率共同决定视频的大小

### 视频帧的分类

I帧、P帧、B帧

**I帧（帧内编码帧）**：**自带全部信息**的独立帧，**独立**进行解码，不依赖其他帧

**P帧（前向预测编码帧）**：**参考**前面的 I帧 或者 P帧 才能进行编码

**B帧（双向预测编码帧）**：依赖前面与后面的帧，本帧与前后帧的差别

1 -> 2 -> 3 ->.....

![image.png](https://backblaze.cosine.ren/juejin/fcd4aa649e144a3bb7eaf6f0f8ac2ceb~tplv-k3u1fbpfcp-watermark.png)

> DTS（Decode Time Stamp）解码时间戳：决定bit流什么时候开始送入解码器中进行解码。
>
> PTS（Presentation Time Stamp）显示时间戳：决定解码后的视频帧什么时候被显示出来
>
> 在没有B帧存在的情况下DTS的顺序和PTS的顺序应该是一样的

### GOP(group of picture)

两个 I帧 之间的间隔，通常在2~4s

![image.png](https://backblaze.cosine.ren/juejin/cbe3576fcea94d15b56c58c69ce857f7~tplv-k3u1fbpfcp-watermark.png)

I帧比较多的话，视频就会比较大

### 为什么要编码？

视频分辨率：1920 × 1080

那么视频里一张图片大小：1920 × 1080× 24/8 = 6220800Byte(5.2M)

那么帧率为30FPS、时长90分钟的这样一个视频，占用大小：**933G**，**太大了！**

更别说更高的60FPS了……

编码都压缩掉了些什么呢？

- 首先是**空间冗余**：

![image.png](https://backblaze.cosine.ren/juejin/06ef1d1a6add438a9230c3645b153833~tplv-k3u1fbpfcp-watermark.png)

- **时间冗余**：↓只有球的位置发生了变化，其他的都没有变化

![image.png](https://backblaze.cosine.ren/juejin/eca3ad131e344b9daf3f188f276aaa29~tplv-k3u1fbpfcp-watermark.png)

- **编码冗余**：如图的图像，可以蓝色用1白色用0来表示（因为只有这两种颜色，艾特某哈夫曼编码方式）

  ![image.png](https://backblaze.cosine.ren/juejin/4645bf9109fd4e92917c39544e297080~tplv-k3u1fbpfcp-watermark.png)

- **视觉冗余**

  ![image.png](https://backblaze.cosine.ren/juejin/06e0df32ec1d4fbc9c780cd90749b25e~tplv-k3u1fbpfcp-watermark.png)

### 编码数据处理流程

![image.png](https://backblaze.cosine.ren/juejin/43dfe562ac5142dabfcf18a4fc1407b2~tplv-k3u1fbpfcp-watermark.png)

通过**预测**去除空间和时间冗余 -> 变换 去除空间冗余

- **量化** 去除视觉冗余 ：把视觉系统看不太到了的东西去掉
- **熵编码** 去除编码冗余：出现频率高的，编码字符所需长度小

## 封装格式

上述视频编码存储的只是单纯的视频信息

封装格式：存储音视频、图片或者字幕信息的一种容器

![image.png](https://backblaze.cosine.ren/juejin/20164c0c9cf94203966253b7592f05d2~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/429a385de6bc4cd189a250c9706c6d3f~tplv-k3u1fbpfcp-watermark.png)

## 多媒体元素和扩展API

### video & audio

[`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 标签用于在HTML或者XHTML文档中嵌入媒体播放器，用于支持文档内的视频播放。

```html
<!DOCTYPE html>
<html>
<body>
    <video src="./video.mp4" muted autoplay controls width=600 height=300></video>
    <video muted autoplay controls width=600 height=300>
        <source src="./video.mp4"></source>
    </video>
</body>
</html>
```

[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)  元素用于在文档中嵌入音频内容。

```html
<!DOCTYPE html> 
<html>
<body>
    <audio src="./auido.mp3" muted autoplay controls width=600 he ight=300></audio>
    <audio muted autoplay controls width=600 height=300>
     <source src=" ./audio.mp3"></source>
    </audio>
</body>
</html>
```

[HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

| 方法                                                         | 描述                                  |
| ------------------------------------------------------------ | ------------------------------------- |
| [play()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play) | 开始播放音/视频（**异步的**）         |
| [pause()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/pause) | 暂停当前播放的音/视频                 |
| [load()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/load) | 重新加载音/视频元素                   |
| [canPlayType()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/canPlayType) | 检测浏览器是否能播放指定的音/视频类型 |
| addTextTrack()                                               | 向音视频添加新的文本轨道              |

| 属性         | 描述                                                 |
| ------------ | ---------------------------------------------------- |
| autoplay     | 设置或返回是否在加载完成后**自动播放**视频。         |
| controls     | 设置或返回音频/视频**是否显示控件**(比如播放/暂停等) |
| currentTime  | 设置或返回音频/视频中的**当前播放位置**(以秒计)      |
| duration     | 返回当前音频/视频的**长度**(以秒计)                  |
| src          | 设置或返回音频/视频元素的**当前来源**                |
| volume       | 设置或返回音频/视频的**音量**                        |
| buffered     | 返回表示音频/视频**已缓冲部分**的TimeRanges对象      |
| playbackRate | 设置或返回音频/视频播放的**速度**。                  |
| error        | 返回表示音频/视频错误状态的**MediaError对象**        |
| readyState   | 返回音频/视频当前的**就绪状态**。                    |
| ...          | ...                                                  |

| 事件           | 描述                                           |
| -------------- | ---------------------------------------------- |
| loadedmetadata | 当浏览器已加载音频/视频的元数据时触发          |
| canplay        | 当浏览器可以开始播放音频/视频时触发            |
| play           | 当音频/视频已开始或不再暂停时触发              |
| playing        | 当音频/视频在因缓冲而暂停或停止后已就绪时触发  |
| pause          | 当音频/视频已暂停时触发                        |
| timeupdate     | 当目前的播放位置已更改时触发                   |
| seeking        | 当用户开始移动/跳跃到音频/视频中的新位置时触发 |
| seeked         | 当用户已移动/跳跃到音频/视频中的新位置时触发   |
| waiting        | 当视频由于需要缓冲下一帧而停止时触发           |
| ended          | 当目前的播放列表已结束时触发                   |
| ...            | ...                                            |

#### 缺陷

- audio与video不支持直接播放hls、flv等视频格式
- 视频资源的请求和加载无法通过代码控制，也就无法实现以下功能
  - 分段加载（节约流量）
  - 清晰度无缝切换
  - 精确预加载

### MSE（拓展API）

媒体源扩展API (Media Source Extensions)

- 无插件在web端播放流媒体
- 支持播放hIs、flv、 mp4等格式视频
- 可实现视频分段加载、清晰度无缝切换、自适应码率、精确预加载等

- 主流浏览器基本支持，除了IOS的Safari

![image.png](https://backblaze.cosine.ren/juejin/57817e4755fb424cbda2d1810fb702d2~tplv-k3u1fbpfcp-watermark.png)

1. 创建mediaSource实例
2. 创建指向mediaSource的URL
3. 监听sourceopen事件
4. 创建sourceBuffer
5. 向sourceBuffer中加入数据
6. 监听updateend事件

![image.png](https://backblaze.cosine.ren/juejin/6bb5eaa1edf54ad69934d046c3963cf6~tplv-k3u1fbpfcp-watermark.png)

- 播放器播放流程

![image.png](https://backblaze.cosine.ren/juejin/77c9b7a19ea64a7188ccb93eea57e152~tplv-k3u1fbpfcp-watermark.png)

## 流媒体协议

![image.png](https://backblaze.cosine.ren/juejin/ae27e7b4cedb4a72a9648f0d8644b450~tplv-k3u1fbpfcp-watermark.png)

HLS全称是HTTP Live Streaming,是一个由Apple公司提出的基于HTTP的媒体流传输协议，用于实时音视频流的传输。目前HLS协议被广泛的应用于**视频点播**和直播领域。

# 应用场景

![image.png](https://backblaze.cosine.ren/juejin/d112114f71f945a399ecd45fe24b31b1~tplv-k3u1fbpfcp-watermark.png)

- 点播/直播 -> 视频上传 -> 视频转码
- 图片  -> 支持一些新的图片
- 云游戏 -> 不必再下繁琐的客户端等，运行在远端上，视频流来回传播（对延时要求高）

# 总结感想

本节课老师科普了Web多媒体技术的基本概念，如编码格式、封装格式、多媒体元素、流媒体协议等，并阐述了Web多媒体的多种应用场景

> 本文引用的大部分内容来自刘立国老师的课以及MDN

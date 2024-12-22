---
title: Hexo博客Shoka主题配置记录
link: hexo-shoka-config
catalog: true
lang: cn
date: 2022-05-06 23:38:56 
quiz: true
math: true
mermaid: true
tags:
- 前端
- hexo
categories:
- 工具
---
# 起因

今天闲逛的时候看到一个博客用的主题惊为天人:
> 官方配置教程: [Hexo 主题 Shoka & multi-markdown-it 渲染器使用说明](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/) \
> [**🚀快速开始**](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/) -> [💌依赖插件](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/dependents/) -> [📌基本配置](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/config/) -> [🌈界面显示](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/display/) -> [🦄特殊功能](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/special/)

> 过程中遇到的一些问题，有看到这个博客里提到：[Hexo博客搭建：基础配置[主题:shoka]](https://blog.moehz.com/archives/hexo-shoka-build.html)

这个博客主题简直就是为笔记而生~
优点：

- 很二次元！很戳！
- 随机图片还都挺好看！不用自己找图了（也可以自定义图片~）
- 可配置项多，评论好用！
- 其他一些笔记特有的功能

跟着官方的教程配置完后，还有很多拓展功能，故在此处记录一些

# 基础配置

[📌基本配置](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/config/)

## 图片上传及随即图库

使用渣浪图库，使用一些上传工具，比如 [这里](https://pic.gimhoy.com/)

上传后图片的链接是 `http://wx4.sinaimg.cn/large/6833939bly1gicmnywqgpj20zk0m8dwx.jpg` 。

只需要新一行写上 `- 6833939bly1gicmnywqgpj20zk0m8dwx.jpg 。`

如果想要自定义，则在 `<root>/source/_data/` 目录新建一个 `images.yml` 文件，这个文件中的图片至少 6 枚，将完全覆盖默认的图片列表。

## 添加评论功能

[如何获取 LeanCloud 的 appId 和 appKey](https://valine.js.org/quickstart.html)

获取后在 `_config.yml` 修改如下内容：

```yaml
valine:
  appId: #Your_appId
  appKey: #Your_appkey
  placeholder: ヽ(○´∀`)ﾉ♪ # Comment box placeholder
  avatar: mp # Gravatar style : mp, identicon, monsterid, wavatar, robohash, retro
  pageSize: 10 # Pagination size
  lang: zh-CN
  visitor: true # 文章访问量统计
  NoRecordIP: false # 不记录 IP
  serverURLs: # When the custom domain name is enabled, fill it in here (it will be detected automatically by default, no need to fill in)
  powerMode: true # 默认打开评论框输入特效
  tagMeta:
    visitor: 新朋友
    master: 主人
    friend: 小伙伴
    investor: 金主粑粑
  tagColor:
    master: "var(--color-orange)"
    friend: "var(--color-aqua)"
    investor: "var(--color-pink)"
  tagMember:
    master:
      # - hash of master@email.com
      # - hash of master2@email.com
    friend:
      # - hash of friend@email.com
      # - hash of friend2@email.com
    investor:
      # - hash of investor1@email.com
```

评论通知与管理工具建议使用这个 [Valine-Admin](https://github.com/DesertsP/Valine-Admin)。
注意 SITE_URL 需要以 / 结尾。

哇咔咔，评论管理终于有了!

## 搜索配置

搜索采用algolia，我是跟着这个来的 [Algolia搜索引擎](https://cloud.tencent.com/developer/article/1957568)
配置完后，每次发布文章还需要手动一行命令

```bash
hexo clean && hexo g -d && hexo algolia
```

# 界面显示

在 [🌈界面显示](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/display/) 中提到

## 首页置顶及精选分类

在文章的 Front Matter 设置 `sticky: true` ，则该文章将显示在首页最上方的 `置顶文章` 列。
多篇文章按照发布时间倒序排列，不分页。

```yaml
---
title: 置顶文章
sticky: true
---
```

在 `_config.yml` 中的 category_map 设置分类对应的目录。然后在分类对应目录下放一张 `cover.jpg` 图片，就可以将该分类放至首页下展示。

# 特殊功能

[🦄特殊功能](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/special/)

最最最吸引我的一点，下面列举一些我认为会常用到的

## links 链接块

```
{% links %}
- site: #站点名称
  owner: #管理员名字
  url: #站点网址
  desc: #简短描述
  image: #一张图片
  color: #颜色代码
{% endlinks %}
```

## code 代码块

主要有:顶部可配置标题，右上角可配置参考链接，命令行可配置提示内容等等

原始md文件内容：

````raw
```java 行高亮 https://shoka.lostyu.me 参考链接 mark:1,6-7
import java.util.Scanner;
...
Scanner in = new Scanner (System.in);
// 输入 Scan 之后，按下键盘 Alt + “/” 键，Eclipse 下自动补全。

System.out.println (in.nextLine ());
System.out.println ("Hello" + "world.");
```

```bash 命令行提示符 command:("[root@localhost] $":1,9-10||"[admin@remotehost] #":4-6)
pwd
/usr/home/chris/bin
ls -la
total 2
drwxr-xr-x   2 chris  chris     11 Jan 10 16:48 .
drwxr--r-x  45 chris  chris     92 Feb 14 11:10 ..
-rwxr-xr-x   1 chris  chris    444 Aug 25  2013 backup
-rwxr-xr-x   1 chris  chris    642 Jan 17 14:42 deploy
git add -A
git commit -m "update"
git push
```
````

展示如下：

```java 行高亮 https://shoka.lostyu.me 参考链接 mark:1,6-7
import java.util.Scanner;
...
Scanner in = new Scanner (System.in);
// 输入 Scan 之后，按下键盘 Alt + “/” 键，Eclipse 下自动补全。

System.out.println (in.nextLine ());
System.out.println ("Hello" + "world.");
```

```bash 命令行提示符 command:("[root@localhost] $":1,9-10||"[admin@remotehost] #":4-6)
pwd
/usr/home/chris/bin
ls -la
total 2
drwxr-xr-x   2 chris  chris     11 Jan 10 16:48 .
drwxr--r-x  45 chris  chris     92 Feb 14 11:10 ..
-rwxr-xr-x   1 chris  chris    444 Aug 25  2013 backup
-rwxr-xr-x   1 chris  chris    642 Jan 17 14:42 deploy
git add -A
git commit -m "update"
git push
```

## quiz 练习题及答案

ps: 什么神仙功能

需要在 Front Matter 中添加 `quiz: true` ，以正确显示题型标签。

```raw 几个例子
---
title: 练习题与答案
quiz: true
---

1. 编译时多态主要指运算符重载与函数重载，而运行时多态主要指虚函数。 {.quiz .true}

2. 有基类 `SHAPE`，派生类 `CIRCLE`，声明如下变量：  {.quiz .multi}
    ```cpp
    SHAPE shape1,*p1;
    CIRCLE circle1,*q1;
    ```
    下列哪些项是 “派生类对象替换基类对象”。
    - `p1=&circle1;` {.correct}
    - `q1=&shape1;`
    - `shape1=circle1;` {.correct}
    - `circle1=shape1;`
{.options}
    > - :heavy_check_mark: 令基类对象的指针指向派生类对象
    > - :x: 派生类指针指向基类的引用
    > - :heavy_check_mark: 派生类对象给基类对象赋值
    > - :x: 基类对象给派生类对象赋值
    > {.options}

3. 下列叙述正确的是 []{.gap} 。 {.quiz}
    - 虚函数只能定义成无参函数
    - 虚函数不能有返回值
    - 能定义虚构造函数
    - A、B、C 都不对 {.correct}
{.options}

10. 如果定义 `int e=8; double f=6.4, g=8.9;`，则表达式 `f+int (e/3*int (f+g)/2)%4` 的值为 [9.4]{.gap}。 {.quiz .fill}
    > 注意运算顺序和数据类型
    > [8.4]{.mistake}
```

效果如下：

1. 编译时多态主要指运算符重载与函数重载，而运行时多态主要指虚函数。 {.quiz .true}

2. 有基类 `SHAPE`，派生类 `CIRCLE`，声明如下变量：  {.quiz .multi}

    ```cpp
    SHAPE shape1,*p1;
    CIRCLE circle1,*q1;
    ```

    下列哪些项是 “派生类对象替换基类对象”。
    - `p1=&circle1;` {.correct}
    - `q1=&shape1;`
    - `shape1=circle1;` {.correct}
    - `circle1=shape1;`
{.options}
    > - :heavy_check_mark: 令基类对象的指针指向派生类对象
    > - :x: 派生类指针指向基类的引用
    > - :heavy_check_mark: 派生类对象给基类对象赋值
    > - :x: 基类对象给派生类对象赋值
    > {.options}

3. 下列叙述正确的是 []{.gap} 。 {.quiz}
    - 虚函数只能定义成无参函数
    - 虚函数不能有返回值
    - 能定义虚构造函数
    - A、B、C 都不对 {.correct}
{.options}

10. 如果定义 `int e=8; double f=6.4, g=8.9;`，则表达式 `f+int (e/3*int (f+g)/2)%4` 的值为 [9.4]{.gap}。 {.quiz .fill}
    > 注意运算顺序和数据类型
    > [8.4]{.mistake}

| 标签 | 含义 |
| --- | --- |
| `{.quiz}` | 选择题 |
| `{.quiz .multi}` | 多选题 |
| `{.quiz .true}` | 正确的判断题 |
| `{.quiz .false}` | 错误的判断题 |
| `{.quiz .fill}` | 填空题 |
| `[]{.gap}` | 空白下划线 |
| `[答案内容]{.gap}` | 答案内容带下划线 |
| `{.options}` | ABCDE 选项 |
| `{.correct}` | 选择题的正确选项 |
| `>` | 答案解析 |
| `[8.4]{.mistake} ` | 错题备注 |
 
## emoji 绘文字

基于 markdown-it-emoji ，所有标签参考戳此

```raw 示例
:kissing_heart:
:ring:
:notes:
```

😘 💍 🎶

## spoiler 隐藏文字

```raw
!!真的有这么神奇吗!!
!!我不信!!
!!黑幕黑幕黑幕黑幕黑幕黑幕!!： 鼠标滑过显示内容
!!模糊模糊模糊模糊模糊模糊!!{.bulr} ： 选中文字显示内容
```

!!真的有这么神奇吗!!
!!我不信!!
!!黑幕黑幕黑幕黑幕黑幕黑幕!!： 鼠标滑过显示内容
!!模糊模糊模糊模糊模糊模糊!!{.bulr} ： 选中文字显示内容

## label 标签块

```raw
[default]{.label}
[primary]{.label .primary}
[info]{.label .info}
[:heavy_check_mark:success]{.label .success}
[warning]{.label .warning}
[:broken_heart:danger]{.label .danger}
```

[default]{.label}
[primary]{.label .primary}
[info]{.label .info}
[:heavy_check_mark:success]{.label .success}
[warning]{.label .warning}
[:broken_heart:danger]{.label .danger}

## note 提醒块

| 开始行  | `:::[风格颜色]` |
| 结束行 |  `:::` |

```raw
:::default
默认默认
:::

:::primary
基本基本
:::

:::info
提示提示
:::

:::success
成功成功
:::

:::warning
警告警告
:::

:::danger
危险危险
:::

:::danger no-icon
危险危险
:::
```

效果如下

:::default
默认默认
:::

:::primary
基本基本
:::

:::info
提示提示
:::

:::success
成功成功
:::

:::warning
警告警告
:::

:::danger
危险危险
:::

:::danger no-icon
危险危险
:::

## tab 标签卡

标签为：

| 开始行 | `;;;[同一ID] [标签名称]` |
| 结束行 | `;;;` |

```raw
;;;id1 卡片 1
这里是卡片 1 的内容
** 加粗 **
[success]{.label .success}

{% links %}
- site: 優萌初華
  owner: 霜月琉璃
  url: https://shoka.lostyu.me
  desc: 琉璃的医学 & 编程笔记
  image: https://fastly.jsdelivr.net/gh/amehime/shoka@latest/images/avatar.jpg
  color: "#e9546b"
{% endlinks %}
;;;

;;;id1 卡片 2
这里是卡片 2 的内容
:::danger
危险危险
:::
- 第一行
- 第二行
;;;

;;;id2 ②号标签卡片 1
这里是卡片 1 的内容
;;;

;;;id2 ②号标签卡片 2
这里是卡片 2 的内容
;;;
```

;;;id1 卡片 1
这里是卡片 1 的内容
**加粗**
[success]{.label .success}

{% links %}

- site: cos的博客
  owner: cos
  url: <https://ysx.cosine.ren/>
  desc: 余弦的编程笔记 & 生活记录
  image: <https://fastly.jsdelivr.net/gh/yusixian/imgBed@latest/img/tx.jpg>
  color: "#1e80ff"
{% endlinks %}
;;;

;;;id1 卡片 2
这里是卡片 2 的内容
:::danger
危险危险
:::

- 第一行
- 第二行
;;;

;;;id2 ②号标签卡片 1
这里是卡片 1 的内容
;;;

;;;id2 ②号标签卡片 2
这里是卡片 2 的内容
;;;

## collapse 折叠块

本功能基于 markdown-it-container
标签为：
| 开始行 | `+++[风格颜色] [标题文字]` |
| 结束行 | `+++` |

```markdown
+++ 默认默认 这里是一段文字
++ 下划线 ++
+++

+++primary 紫色
:::info
参考信息
:::

- 第一行
- 第二行
+++

+++info  蓝色
;;;id3 卡片 1
这里是卡片 1 的内容
;;;

;;;id3 卡片 2
这里是卡片 2 的内容
;;;
+++

+++success 绿色
{% links %}
- site: 優萌初華
  url: https://shoka.lostyu.me
  color: "#e9546b"
{% endlinks %}
+++

+++warning 黄色
!! 警告警告警告警告警告！！{.bulr}
[label]{.label .success}
+++

+++danger 红色
[danger]{.label .danger}
+++
```

+++ 默认默认 这里是一段文字
++ 下划线 ++
+++

+++primary 紫色
:::info
参考信息
:::

- 第一行
- 第二行
+++

+++info  蓝色
;;;id3 卡片 1
这里是卡片 1 的内容
;;;

;;;id3 卡片 2
这里是卡片 2 的内容
;;;
+++

+++success 绿色
{% links %}

- site: 優萌初華
  url: <https://shoka.lostyu.me>
  color: "#e9546b"
{% endlinks %}
+++

+++warning 黄色
!! 警告警告警告警告警告！！{.bulr}
[label]{.label .success}
+++

+++danger 红色
[danger]{.label .danger}
+++

## media 多媒体

使用 media 标签，目前可选择两种类型，即 audio 和 video 。

效果如下

{% media audio %}

- title: cos的2021年度歌单
  list:
  - <https://music.163.com/playlist?id=7189274318>
- title: cos的2020年度歌单
  list:
  - <https://music.163.com/playlist?id=5400313492>
- title: cos的2019年度歌单
  list:
  - <https://music.163.com/playlist?id=3144460328>
- title: ❤️安利向
  list:
  - <https://music.163.com/playlist?id=3036586237>
{% endmedia %}

## math 数学公式

在 Front Matter 中添加 math: true 以支持 [KaTex](https://katex.org/)

```raw
---
title: 数学公式显示
math: true
---

行内公式：$\sqrt {3x-1}+(1+x)^2$

独立块显示：
$$\begin {array}{c}

\nabla \times \vec {\mathbf {B}} -\, \frac1c\, \frac {\partial\vec {\mathbf {E}}}{\partial t} &
= \frac {4\pi}{c}\vec {\mathbf {j}}    \nabla \cdot \vec {\mathbf {E}} & = 4 \pi \rho \\

\nabla \times \vec {\mathbf {E}}\, +\, \frac1c\, \frac {\partial\vec {\mathbf {B}}}{\partial t} & = \vec {\mathbf {0}} \\

\nabla \cdot \vec {\mathbf {B}} & = 0

\end {array}$$
```

行内公式：$\sqrt {3x-1}+(1+x)^2$

独立块显示：
$$\begin {array}{c}

\nabla \times \vec {\mathbf {B}} -\, \frac1c\, \frac {\partial\vec {\mathbf {E}}}{\partial t} &
= \frac {4\pi}{c}\vec {\mathbf {j}}    \nabla \cdot \vec {\mathbf {E}} & = 4 \pi \rho \\

\nabla \times \vec {\mathbf {E}}\, +\, \frac1c\, \frac {\partial\vec {\mathbf {B}}}{\partial t} & = \vec {\mathbf {0}} \\

\nabla \cdot \vec {\mathbf {B}} & = 0

\end {array}$$

总而言之，这个主题非常强大~

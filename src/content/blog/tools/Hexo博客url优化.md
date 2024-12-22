---
title: Hexo博客url优化
link: hexo-url-optimization
catalog: true
lang: cn
date: 2022-04-14 23:18:56 
subtitle: 关于博客url转义后过于冗长这件事。
header-img: /img/header_img/79119253_p0.jpg
tags:
- 前端
- hexo
categories:
- 工具
---
关于url美化这篇博客讲的非常之好~推荐看一看：[Hexo博客优化：自定义文章URL](https://donnadie.top/hexo-optimization-permalink/)，下面就仅为个人的解决方案

# 起因

事情是这样的，今天分享面经的时候，将链接在群里一发，发现这个url转义后实在是太过于丑陋了QAQ，于是在网上搜索hexo的url优化，发现这个方法。

![QQ图片20220414212434.png](https://backblaze.cosine.ren/juejin/0cdbd6766ccc41c8854bbec9366af392~tplv-k3u1fbpfcp-watermark.png)

Hexo生成文章时，是根据文件名生成的url，而文件名又是中文，故而url会进行转义，转义后的url如上图，显得非常冗长。

# 解决方案探寻

首先，参考官方配置[永久链接（Permalinks）| Hexo](https://hexo.io/zh-cn/docs/permalinks.html)中的配置项，可知可使用的变量如下：

| 变量 | 描述 |
| -- | -- |
| `:year`       | 文章的发表年份（4 位数）                                                                            |
| `:month`      | 文章的发表月份（2 位数）                                                                            |
| `:i_month`    | 文章的发表月份（去掉开头的零）                                                                          |
| `:day`        | 文章的发表日期 (2 位数)                                                                           |
| `:i_day`      | 文章的发表日期（去掉开头的零）                                                                          |
| `:hour`       | 文章发表时的小时 (2 位数)                                                                          |
| `:minute`     | 文章发表时的分钟 (2 位数)                                                                          |
| `:second`     | 文章发表时的秒钟 (2 位数)                                                                          |
| `:title`      | 文件名称 (relative to “source/_posts/“ folder)                                               |
| `:name`       | 文件名称                                                                                     |
| `:post_title` | 文章标题                                                                                     |
| `:id`         | 文章 ID (*not persistent across [cache reset](https://hexo.io/zh-cn/docs/commands#clean)*) |
| `:category`   | 分类。如果文章没有分类，则是 `default_category` 配置信息。                                                  |
| `:hash`       | SHA1 hash of filename (same as `:title`) and date (12-hexadecimal)                       |

可在 `permalink_defaults` 参数下调整永久链接中各变量的默认值：

```yaml
url: https://ysx.cosine.ren/      # 我绑定的域名url
root: /
# permalink: :lang/:title/
permalink: :lang/:link/
permalink_defaults:
  lang: cn
```

当然，愿意的话可以直接用日期、分类、id或者hash为url，但是这样就会出现几个问题

- 日期、分类等进行设置，SEO不友好
  - 用日期等做url的话，由于百度的搜索引擎抓取网页的时:搜索引擎认为对于一般的中小型站点，3层足够承受所有的内容了，所以经常抓取的内容是前三层，而超过三层的内容认为那些内容并不重要，所以不经常爬取。出于这个原因所以permalink后面跟着的最好不要超过2个斜杠。

- 使用算法为每个文章生成独一无二的hash或id
  - 这个方法常用于一些较大的内容发布平台，例如CSDN文章的发布id，B站的视频BV号等，可简单地管理大量的内容而不重复，但是生成的URL并不直观，好的url最好还是能见名知意

对于个人博客的文章，文章的URL最好能大致反映文章的内容，因此为每篇文章手动设置一个见名知义的URL后缀是我认为比较合适的方法。

## 解决步骤

在hexo的配置文件_config.yml中，添加以下配置：

```yaml
url: https://ysx.cosine.ren/      # 我绑定的域名url
root: /
# permalink: :lang/:title/
permalink: :lang/:link/
permalink_defaults:
  lang: cn
```

在以后写博客的时候，可以直接在文章中添加见名知义的link即可，如下：

```yaml
---
title: Hexo博客url优化
link: hexo-url-optimization # 文章实际链接为：https://ysx.cosine.ren/cn/hexo-url-optimization/
catalog: true
lang: cn
date: 2022-04-14 21:18:56 
subtitle: 关于博客url转义后过于冗长这件事。
header-img: /img/header_img/galaxy-ngc-3190-wallpaper-for-2880x1800-60-653.jpg
tags:
- 前端
- hexo
categories:
- 工具
---
```

再加一步，在scaffolds目录下的post.md、draft.md，将link默认设置为文章标题避免遗忘，如下：

```yaml
---
title: {{ title }}
link: {{ title }}
subtitle:
date: {{ date }}
catalog: true
header-img: /img/header_img/galaxy-ngc-3190-wallpaper-for-2880x1800-60-653.jpg
tags:
- 前端
- JavaScript
categories:
- 笔记
---
```

好，现在每次发文时只需要加上link属性中的值改完美化后的名称即可~

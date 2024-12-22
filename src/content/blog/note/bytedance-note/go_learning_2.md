---
title: Go语言初上手（二） 工程实践 | 青训营
link: back-end/go_learning_2
catalog: true
lang: cn
date: 2022-05-08 23:44:01
subtitle: Go语言工程实践
quiz: true
tags:
- 后端
- Go
categories:
- [笔记, 青训营笔记]
---

# 并发编程

- **并发** 是多线程程序在一个核的cpu上运行
![image.png](https://backblaze.cosine.ren/juejin/A70946937e54495499958900ad320e99~Tplv-K3u1fbpfcp-Watermark.png)

- **并行** 是多线程程序在多个核的上运行
![image.png](https://backblaze.cosine.ren/juejin/d4a9265f431c442a84b7012ac324c697~tplv-k3u1fbpfcp-watermark.png)

- Go可以充分发挥多核优势，高效运行
一个重要概念

## 协程

- 协程的开销比线程小，可以理解为轻量级的线程，一个Go程序中可以创建上万个协程。

Go 中 **开启协程** 非常简单，在函数前面增加一个 `go` 关键字就可以为一个函数开启一个协程。

## CSP 与 Channel

CSP(Communicating Sequential Process)

Go 中提倡通过 **通信共享内存** 而不是通过共享内存而实现通信

那么如何通信呢，通过 `channel`

### Channel

语法： `make(chan 元素类型, [缓冲大小])`

- 无缓冲通道 `make(chan int)`
- 有缓冲通道 `make(chan int, 2)`
这个图就非常的生动形象~
![image.png](https://backblaze.cosine.ren/juejin/F103155c3ea8443a98bc54595e52cbfd~Tplv-K3u1fbpfcp-Watermark.png)

![image.png](https://backblaze.cosine.ren/juejin/c7f6b92f7e344344a25b8fee23707079~tplv-k3u1fbpfcp-watermark.png)

以下是一个例子：

- 第一个协程 作为生产者发送`0~9` 到 `src`中
- 第二个协程 作为消费者计算 `src` 中每个数的平方发送到 `dest` 中
- 主线程输出 `dest` 中每个数

```go
package main

func CalSquare() {
   src := make(chan int)     // 生产者
   dest := make(chan int, 3) // 消费者 带缓冲解决生产者太快的问题
   go func() {               // 该线程发送0~9至src中
      defer close(src) // defer 表示延迟到函数结束时执行 用于释放已分配的资源。
      for i := 0; i < 10; i++ {
         // <- 运算符 左侧为收集数据的一方 右侧为要传的数据
         src <- i
      }
   }() // 立即执行
   go func() {
      defer close(dest)
      for i := range src {
         dest <- i * i
      }
   }()
   for i := range dest {
      // 其他复杂操作
      println(i)
   }
}
func main() {
   CalSquare()
}
```

可以看到每次都会是顺序输出，代表着Go是 **并发安全的**

Go 语言也保留了共享内存的做法，使用sync进行同步，如下

```go
package main

import (
   "sync"
   "time"
)

var (
   x    int64
   lock sync.Mutex
)

func addWithLock() { // x加到2000 使用锁则很安全
   for i := 0; i < 2000; i++ {
      lock.Lock() // 加锁
      x += 3
      x -= 2
      lock.Unlock() // 解锁
   }
}
func addWithoutLock() { // 不使用锁
   for i := 0; i < 2000; i++ {
      x += 3
      x -= 2
   }
}
func Add() {
   x = 0
   for i := 0; i < 5; i++ {
      go addWithoutLock()
   }
   time.Sleep(time.Second) // 休眠 1s
   println("WithoutLock x =", x)
   x = 0
   for i := 0; i < 5; i++ {
      go addWithLock()
   }
   time.Sleep(time.Second) // 休眠 1s
   println("WithLock x =", x)
}
func main() {
   Add()
}
```

ps：试了好多次都没冲突，乐。把运算稍微改复杂一点就有冲突了

![image.png](https://backblaze.cosine.ren/juejin/81e6a09747944a53be508927a76745ef~tplv-k3u1fbpfcp-watermark.png)

# 依赖管理

任何大型项目开发都绕不开依赖管理，Go中的依赖主要经历了 GOPATH -> Go Vendor -> Go Module的演变 而现在主要采用Go Module的方式

- 不同环境依赖的版本不同，所以如何控制依赖库的版本？

## GOPATH

- 项目代码直接依赖src下的代码
- 通过 `go get` 下载最新版本的包到src目录下

这样的话，就会出现一个问题：无法实现多版本的控制（A、B依赖于同一个包的不同版本，寄）

## Go Vender

- 项目目录下新增 `vendor`文件，所有依赖包副本形式放在其中
- 通过 vendor => GOPATH 的方式曲线救国

ps：感觉挺像前端的package.json……依赖问题真是绕不过去

这又产生了新的问题：

- 无法控制依赖的版本
- 更新项目时可能出现依赖冲突，从而导致编译出错

## Go Module

- 通过 `go.mod` 文件管理依赖包版本
- 通过 `go get/go mod` 指令工具管理依赖包

达成了终极目标：既能定义版本规则，又能管理项目依赖关系

可以类比一下Java中的Maven

## 依赖配置 `go.mod`

依赖标识语法：模块路径+版本来进行唯一标识

`[Module Path][Version/Pseudo-version]`

```go
module example/project/app     依赖管理基本单元

go 1.16     原生库

require (    单元依赖
    example/lib1 v1.0.2
    example/lib2 v1.0.0 // indirect
    example/lib3 v0.1.0-20190725025543-5a5fe074e612
    example/lib4 v0.0.0-20180306012644-bacd9c7ef1dd // indirect
    example/lib5/v3 v3.0.2
    example/lib6 v3.2.0+incompatible
)
```

如上，需要注意的是：

- 主版本2+的模块会在路径后增加/vN后缀
- 对于没有go.mod文件且主版本2+的依赖，会 `+incompatible`
依赖的版本规则分为语义化版本和基于commit的伪版本

### 语义化版本

格式为：`${MAJOR}.${MINOR}.${PATCH}` V1.3.0、V2.3.0、 ……

- 不同的 `MAJOR` 版本表示是**不兼容的API**
  - 即使是同一个库，MAJOR 版本不同也会被认为是不同的模块
- `MINOR` 版本通常是**新增函数或功能**，**向后兼容**
- 而 `PATCH` 版本一般是 **修复 `bug`**

### 基于commit的版本

格式为：`${vx.0.0-yyyymmddhhmmss-abcdefgh1234}`

- 版本前缀是和语义化版本一样的
- 时间戳 (`yyyymmddhhmmss`)，也就是**提交 `Commit` 的时间**
- 校验码 (`abcdefgh1234`), 12 位的哈希前缀
  - 每次提交 `commit` 后 Go 都会默认生成一个伪版本号

## 小测试

![image.png](https://backblaze.cosine.ren/juejin/837629fe64b0400d87d21752eb2f2cef~tplv-k3u1fbpfcp-watermark.png)

1. 如果X项目依赖了A、B两个项目，且A、B分别依赖了C项目的v1.3、v1.4两个版本，依赖图如上，**最终编译**时所使用的C项目的版本为 []{.gap} ？ {.quiz}
    - v1.3
    - v1.4   {.correct}
    - A用到c时用v1.3编译，B用到c时用v1.4编译
{.options}
    > 答案为：**B 选择最低的兼容版本** \
    > 这个是Go进行版本选择的算法，选择最低的兼容版本，而1.4版本是向下兼容1.3的（语义化版本）。为什么不选1.3呢？因为他又不会向上兼容ovo，倘若还有1.5的话则不会选用1.5，因为1.4就是满足要求的最低兼容版本。

## 依赖分发

这些依赖去哪里下载呢？就是依赖分发

在github等代码托管系统中对应仓库上下载？

github是比较常见给的代码托管系统平台，而`Go Modules` 系统中定义的依赖，最终可以**对应**到多版本代码管理系统中某一项目的**特定提交或版本**

对于 `go.mod` 中定义的依赖，可以从对应仓库中下载指定软件依赖，从而完成依赖分发。

问题也有：

- **无法保证构建确定性**
  - 软件作者直接修改软件版本，导致下次构建使用其他版本的依赖，或者找不到依赖版本
- **无法保证依赖可用性**
  - 软件作者直接代码平台删除软件，导致依赖不可用
- **增加第三方代码托管平台压力**。

通过Proxy方式来解决以上问题

`Go Proxy` 是一个服务站点，它会**缓存源站中的软件内容**，缓存的软件版本不会改变，并且**在源站软件删除之后依然可用**

使用 Go Proxy 之后，构建时会直接从 Go Proxy 站点拉取依赖。

Go Modules通过 **`GOPROXY` 环境变量**控制如何使用 `Go Proxy`

服务站点URL列表，direct表示源站：`GOPROXY="https://proxy1.cn, https://proxy2.cn,direct"`

- GOPROXY是一个 **Go Proxy 站点URL列表**，可以使用 `direct` 表示源站。整体的依赖寻址路径，会优先从 `proxy1` 下载依赖，如果 `proxy1` 不存在，就下到 `proxy2`寻找，如果`proxy2` 也不存在则会**回源**到源站直接下载依赖，缓存到 `proxy` 站点中。

## 工具

`go get example.org/pkg`
| 后缀 | 含义 |
| ---| --- |
| @update | 默认 |
| @none | 删除依赖 |
| @v1.1.2 | tag版本，语义版本 |
| @23dfdd5 | 特定的commit |
| master | 分支的最新commit |

`go mod`

| 后缀 | 含义 |
| ---| --- |
| init | 初始化,创建go.mod文件 |
| download | 下载模炔到本地缓存 |
| tidy | 增加需要的依赖，删除不需要的依赖 |
go mod tidy 可以在每次提交代码前执行一下，就可以减少构建整个项目的时间

# 测试

测试一般分为**回归测试**、**集成测试**、**单元测试**，从前到后**覆盖率逐层变大**，**成本却逐层降低**，所以**单元测试的覆盖率**一定程度上决定这代码的质量。

- 回归测试一般是QA同学手动通过终端回归一些固定的主流程场景
- 集成测试是对系统功能维度做测试验证
- 单元测试测试开发阶段，开发者对单独的函数、模块做功能验证

单元测试主要包括：**输入**、**测试单元**、**输出**以及**校对**

单元的概念较广，包括接口，函数，模块等，用最后的校对来保证代码的功能与我们的预期相符

单元测试有以下几点好处

- 保证质量
  - 整体覆盖率足够时下，既保证了新功能正确性，又未破坏原有代码的正确性
- 提升效率
  - 代码有bug的情况下，通过单测，可以在一个较短周期内定位和修复问题

Go中的单元测试有以下规则：

- 所有测试文件以 `_test.go` 结尾
- `func TestXxx(testing.T)`
- 初始化逻辑放到 `TestMain`函数中（测试前的数据装载配置、测试后的释放资源等）

例子：
main.go

```go
package main

func HelloTom() string {
   return "Jerry"
}
```

main_test.go

```go
package main

import "testing"

func TestHelloTom(t *testing.T) {
   output := HelloTom()
   expectOutput := "Tom"
   if output != expectOutput {
      t.Errorf("Expect %s do not match actual %s", expectOutput, output)
   }
}
```

![image.png](https://backblaze.cosine.ren/juejin/3c37e39ccecd494e8fac79eaa42c5a87~tplv-k3u1fbpfcp-watermark.png)

在实际项目中，单测覆盖率

- 一般项目的要求是50%~60%覆盖率
- 对于重要的资金型服务，覆盖率可能要求达到80%

单测需要保证**稳定性**和**幂等性**

- 稳定是指**相互隔离**，能在任何时间，任何环境，运行测试
- 幂等是指每一次测试运行都应该产生与之前**一样的结果**

而要实现这一目的就要用到`mock`机制。

[bouk/monkey: Monkey patching in Go](https://github.com/bouk/monkey)

monkey是一个开源的mock测试库，可以对method，或者实例的方法进行mock，反射，指针赋值Mockey Patch 的作用域在 Runtime，在运行时通过 Go 的 unsafe 包，能够将内存中函数A的地址替换为运行时函数B的地址，将待打桩函数的实现跳转。

Go 语言还提供了基准测试框架

- **基准测试**是指测试一段程序的运行性能及耗费 CPU 的程度。

而我们在实际项目开发中，经常会遇到代码性能瓶颈问题，为了定位问题经常要对代码做**性能分析**，这就用到了基准测试。使用方法类似于单元测试
> 提到了`fastrand`，地址： [bytedance/gopkg: Universal Utilities for Go](https://github.com/bytedance/gopkg)

# 总结及心得

本节课主要讲了Go中的并发管理、依赖配置和测试，内容较多，需要好好消化。后面还有个项目实践环节，等明天在进行一个实践。

> 本节课内容来源于第三届青训营赵征老师的课程

---
title: Go语言初上手（三）编码规范与性能优化 | 青训营
link: back-end/go_learning_3
catalog: true
lang: cn
date: 2022-05-12 20:44:01
subtitle: Go语言工程实践
quiz: true
tags:
- 后端
- Go
categories:
- [笔记, 青训营笔记]
---
本节课讲了如何写出更简洁清晰的代码，每种语言都有自己的特性，也有自己独特的代码规范，对于 Go 来说，有哪些性能优化的手段、趁手的工具，也都进行了介绍。

高质量代码需要具备正确可靠、简洁清晰的特性

- 正确性：各种边界条件是否考虑完备、错误的调用能否被处理
- 可靠性：异常情况或错误处理明确，依赖的服务异常能够及时处理
- 简洁：逻辑是否简单、后续新增功能是否能够快速支持
- 清晰可读：其他人阅读理解代码时是否能清楚明白、重构时是否不会担心出现无法预料的情况
而这就需要编码规范。

# 编码规范

## 格式化工具

提到编码规范就不得不提到代码格式化工具，推荐使用Go官方提供的格式化工具 `gofmt`，Goland中内置了其功能，常见的IDE也都能方便的配置

- 另一个工具是 `goimports`，相当于 `gofmt` 加上依赖包的管理，自动增删依赖的包。

![image.png](https://backblaze.cosine.ren/juejin/07f5cc789bcc4526a35da211cf843a89~Tplv-K3u1fbpfcp-Zoom-1.png)

> js中也有类似的格式化工具 `Prettier`，可以配合ESLint进行代码格式化。

## 注释规范

好的注释需要

- 解释代码作用

- 解释复杂、不明显的逻辑

- 解释代码实现的原因（这些因素脱离上下文后很难理解）

- 解释代码什么情况会出错（解释一些限制条件）

- 解释公共符号的注释（包中声明的每个公共的符号:变量、常量、函数以及结构等）

  - 例外：不需要注释实现接口的方法

> Google Style 指南中有两条规则：
>
> - 任何既不明显也不简短的 **公共功能** 必须予以注释。
> - 无论长度或复杂程度如何，对 **库** 中的任何函数都必须进行注释

而需要避免的情况如下:

- 对可见名知义的函数进行啰嗦的注释
- 对显而易见的流程进行直接翻译

总而言之，**代码是最好的注释**

- 注释应该提供 **代码未表达出的上下文信息**
- 简洁清晰的代码**对流程注释没有要求**，但是对于为什么这么做，代码的相关背景等可以通过注释补充，提供有效信息。

## 命名规范

### 变量名

- 简洁胜于冗长

  - `i` 和 `index` 的作用范围，不需要 `index` 的额外冗长

```go
// Bad
for index := 0; index < len(s) ; index++ {
    // do something
}
// Good
for i := 0; i < len(s); i++ {
    // do something
}
```

- **缩略词全大写**，但当其 **位于变量开头且不需要导出** 时，**使用全小写**

  - 如使用 `ServeHTTP` 而不是 `ServeHttp`
  - 使用 `XMLHTTPRequest` 或 `xmlHTTPRequest`

- 变量名距离其被使用的地方越远，则越需要携带越多的上下文信息。

  - 如全局变量，在其名字中需要更多的上下文信息，使得在不同地方可以轻易辨认出其含义

```go
// Bad
func ( c *Client ) send( req *Request, t time.Time )

// Good
func ( c *Client ) send( req *Request, deadline time.Time )
```

### 函数命名

- 函数名 **不携带包名的上下文信息**，因为包名和函数名总是成对出现的

  - 如http包中创建服务的函数， `Serve` > `ServeHTTP`，因为调用时总是`http.Serve`

- 函数名 **尽量简短**

- 当名为 `foo` 的包某个函数返回类型 `T` 时(`T`并不是 `Foo` )，可以在函数名中加入返回的类型信息

  - 返回`Foo`类型时，可以省略而不导致歧义

### 包名

- 只由**小写字母**组成。不包含大写字母和下划线等字符
- 简短并包含一定的上下文信息。例如`schema`、 `task`等
- 不要与标准库同名。例如不要使用 `sync` 或者 `strings` 以下规则尽量满足，以标准库包名为例：
- 不使用**常用变量名**作为包名。例如使用 `bufio` 而不是 `buf`
- 使用单数而不是复数。例如使用 `encoding` 而不是 `encodings``
- 谨慎地使用缩写。例如使用 `fmt` 在不破坏上下文的情况下比 `format` 更加简短

总的来说，好的命名降低阅读理解代码的成本，可以能让人把关注点留在主流程上，清晰地理解程序的功能，而不是频繁切换到分支细节，并且必须解释它。

## 控制流程

- 避免嵌套，保持正常流程清晰可读

  - 优先处理错误情况/特殊情况，尽早返回或继续循环来减少嵌套

```go
 // Bad
 if foo {
    return x
 } else {
    return nil
 }
 ​
 // Good
 if foo {
    return x
 }
 return nil
```

- 尽量保持正常代码路径为最小缩进，减少嵌套

```go
 // Bad
 func OneFunc() error {
    err := doSomething()
    if err == nil {
       err := doAnotherThing()
       if err == nil {
          return nil // normal case
       }
       return err
    }
    return err
 }
 ​
 // Good
 func OneFunc() error {
    if err := doSomething(); err != nil {
       return err
    }
    if err := doSomething(); err != nil {
       return err
    }
    return nil // normal case
 }
```

总而言之，程序中流程这一块处理逻辑尽量走直线，避免复杂的嵌套分支，使正常流程代码沿着屏幕向下移动。提升代码可维护性和可读性，因为故障问题大多出现在复杂的条件语句和循环语句中

## 错误处理

- 简单错误

  - 简单的错误指 **仅出现一次** 的错误，且在其他地方 **不需要捕获** 该错误
  - 优先使用 `errors.New` 来创建匿名变量来**直接表示**简单错误
  - 如果有格式化的需求，使用 `fmt.Errorf`

```go
 func defaultCheckRedirect(req *Request, via []*Request) error {
    if len(via) >= 10 {
       return errors.New("stopped after 10 redirects")
    }
    return nil
 }
```

- 复杂错误：使用错误的 `Wrap` 和 `Unwrap`

  - 错误的 `Wrap` 实际上是提供了一个 `error` 嵌套另一个 `error` 的能力，从而生成一个 `error` 的跟踪链
  - 在 `fmt.Errorf` 中使用 `%w` 关键字来将一个错误关联至错误链中
  - 使用 `errors.Is` 判定错误是否为某特定错误，可判定错误链上的所有错误（[go/wrap_test.go · golang/go](https://github.com/golang/go/blob/master/src/errors/wrap_test.go#L255)）
  - 使用 `errors.As` 在错误链上获取特定种类的错误，并将错误赋值给定义好的变量。（[go/wrap_test.go · golang/go](https://github.com/golang/go/blob/master/src/errors/wrap_test.go#L255)）

在Go中，比错误更严重的就是 `panic`，它的出现表示**程序无法正常工作**了

- 不建议在业务代码中使用panic

  - `panic` 发生后，会向上传播至调用栈顶
  - 调用函数全都不包含 `recover` 会造成**整个程序崩溃**。
  - 若问题可以被屏蔽或解决，建议使用 `error` 代替 `panic`

- 当程序**启动阶段**发生**不可逆转**的错误时，可以在 `init` 或 `main` 函数中使用 `panic`（[sarama/main.go · Shopify/sarama](https://github.com/Shopify/sarama/blob/main/examples/consumergroup/main.go#L94)）

有`painc`，自然就会提到 `recover`，如果是引入其它库的`bug`导致`panic`，影响到自身的逻辑时，就需要recover

- `recover` 只能在被 `defer`的函数中使用，嵌套无法生效，只在当前goroutine 生效（[github.com/golang/go/b…](https://github.com/golang/go/blob/master/src/fmt/scan.go#L247)）
- defer的语句是**后进先出**的。
- 如果需要更多的上下文信息，可以 recover 后在 log 中记录当前的调用栈（[github.com/golang/webs…](https://github.com/golang/website/blob/master/internal/gitfs/fs.go#L228)）

### 小结

- `error` 要尽可能提供简明的上下文信息链，方便定位问题
- `panic` 用于真正异常的情况
- `recover` 生效范围，在当前 goroutine 的被 `defer` 的函数中生效

# 性能优化建议

- **前提**：满足正确可靠、简洁清晰等质量因素的前提下，尽可能提高程序的效率
- **折衷**：有时候时间效率和空间效率可能对立，需要分析重要程度进行适当折衷。

针对 Go 语言特性，课上介绍了很多 Go 相关的性能优化建议：

## 预分配内存

使用make() 初始化切片时尽可能提供容量信息

```go
 func PreAlloc(size int) {
    data := make([]int, 0, size)
    for k := 0; k < size; k++ {
       data = append(data, k)
    }
 }
```

这是由于切片本质是一个数组片段的描述，包括数组指针、片段的长度、片段的容量(不改变内存分配情况下的最大长度)，

- 切片操作并不复制切片指向的元素
- 创建一个新的切片会复用原来切片的底层数组 所以预先设置容量的值能够避免额外的内存分配，获得更好的性能

## 字符串处理优化

使用 `strings.Builder` 常见的字符串拼接方式

- `+` 进行连接 （最慢）

- `strings.Builder` （最快）

- `bytes.Buffer` 原理：字符串在 Go 语言中是**不可变类型**，占用内存大小是固定的

- 使用 + 拼接时，生成一个新的字符串，开辟一段新空间，新空间的大小是原来两个字符串的大小之和

- `strings.Builder`，`bytes.Buffer` 的内存是以**倍数**申请的

- `strings.Builder` 和 `bytes.Buffer` 底层都是 `[]byte` 数组

  - `bytes.Buffer` 转化为字符串时重新申请了一块空间存放生成的字符串变量
  - `strings.Builder` 直接将底层的 `[]byte` 转换成了字符串类型返回

```go
 func PreStrBuilder(n int, str string) string {
    var builder strings.Builder
    builder.Grow(n * len(str))
    for i := 0; i < n; i++ {
       builder.WriteString(str)
    }
    return builder.String()
 }
```

## 空结构体

- 空结构体 `struct` 实例**不占据任何的内存空间**

- 可作为各种场景下的占位符使用

  - 节省内存空间
  - 空结构体本身具备很强的语义，即这里不需要任何值，仅作为占位符

- 如实现Set时，利用map的键，而将值设为空结构体。([golang-set/threadunsafe...](https://github.com/deckarep/golang-set/blob/main/threadunsafe.go))

# 相关链接

- [《golang pprof 实战》](https://blog.wolfogre.com/posts/go-ppof-practice/)代码实验用例： [github.com/wolfogre/go…](https://github.com/wolfogre/go-pprof-practice)
- 尝试使用 test 命令，编写并运行简单测试 [go.dev/doc/tutoria…](https://go.dev/doc/tutorial/add-a-test)
- 尝试使用 -bench 参数，对编写的函数进行性能测试，[pkg.go.dev/testing#hdr…](https://pkg.go.dev/testing#hdr-Benchmarks)
- Go 代码 Review 建议 [github.com/golang/go/w…](https://github.com/golang/go/wiki/CodeReviewComments)
- Uber 的 Go 编码规范，[github.com/uber-go/gui…](https://github.com/uber-go/guide)

# 总结及心得

本节课介绍了Go乃至其他语言中常见的代码规范，提出了Go语言中相关的性能优化建议。后续还进行了性能优化的实战练习，使用pprof工具进行。

> 笔记内容来源于第三届青训营张雷老师的课程《高质量编程与性能调优实战》\
> 课程资料：[【Go 语言原理与实践学习资料（上）】第三届字节跳动青训营-后端专场](https://juejin.cn/post/7093721879462019102/#heading-16)

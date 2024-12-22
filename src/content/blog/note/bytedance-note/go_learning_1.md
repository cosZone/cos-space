---
title: Go语言初上手(一) 环境配置与基础语法 | 青训营
link: back-end/go_learning_1
catalog: true
lang: cn
date: 2022-05-07 13:35:01
subtitle: Go语言基本语法，与c++和JS的区别与类似点
quiz: true
tags:
- 后端
- Go
categories:
- [笔记, 青训营笔记]
---

字节第三届青训营是后端专场，开课了，高高兴兴写笔记啦
课上很详细的讲了Go的基本语法，以及再加上自己阅读Go语言圣经的一些总结，得出了这一篇文章，感觉跟JS和c/c++还是有很多共通之处的。

<!-- more -->

内容来源于：[Go语言圣经](https://books.studygolang.com/gopl-zh/ch2/ch2.html) 以及 第三届青训营课程
课程源码 [wangkechun/go-by-example](https://github.com/wangkechun/go-by-example)

# Go 语言简介及安装

## 什么是Go语言

- 高性能、高并发
- 丰富的标准库
- 完善的工具链
- 静态链接
- 快速编译
- **跨平台**
- **垃圾回收**

总而言之，兼顾c/c++的性能，并具有python等语言的简洁、完善的标准库

## 安装
>
> 1. 访问 <https://go.dev/> ，点击 Download ，下载对应平台安装包，安装即可
> 2. 如果无法访问上述网址，可以改为访问 <https://studygolang.com/dl> 下载安装
> 3. 如果访问 github 速度比较慢，建议配置 go mod proxy，参考 <https://goproxy.cn/> 里面的描述配置，下载第三方依赖包的速度可以大大加快
>
## IDE推荐

- vscode 安装Go插件
- [GoLand](https://www.jetbrains.com/go/) JetBrains系列的新IDE，dddd
![image.png](https://backblaze.cosine.ren/juejin/85a838397c9e4ba6a6f4338cd27138f7~tplv-k3u1fbpfcp-watermark.png)

可以通过Github很方便的登录体验该课程的示例项目 [Dashboard — Gitpod](https://gitpod.io/#github.com/wangkechun/go-by-example) （真好，我哭死）

# 基础数据类型

## 整型

与c++中类似，整型分有符号和无符号类型，有符号整数

- int8、int16、int32和int64
- 对应8位、16位、32位、64位大小的**有符号整数**
- uint8、uint16、uint32和uint64则对应**无符号整数**
- 另外的还有两种对应特定CPU平台**机器字大小**的有符号和无符号整数`int`和`uint`，其中`int`也是应用最广泛的数值类型，这两种类型都有同样的大小: 32或64bit
  - 不同的编译器即使在相同的硬件平台上可能产生不同的大小。
- Unicode字符 `rune` 类型是和 `int32`**等价**的类型，通常用于**表示一个Unicode码点**。这两个名称可以互换使用。
- `byte` 是 `uint8` 类型的等价类型，`byte` 类型一般用于强调数值是一个原始的数据而不是一个小的整数。
- `uintptr` 类型，**没有指定具体的bit大小但是足以容纳指针**。只有在底层编程时才需要，特别是Go语言和C语言函数库或操作系统接口相交互的地方。我们将在第十三章的unsafe包相关部分看到类似的例子

可通过 `Printf` 函数的 `%b` 参数打印**二进制格式**的数字，用`%d`、`%o` 或 `%x`参数控制输出的进制格式，这部分与c中的格式化输出类似,

```go
var x uint8 = 1<<1 | 1<<5

fmt.Printf("%08b\n", x) // "00100010", the set {1, 5}

o := 0666
fmt.Printf("%d %[1]o %#[1]o\n", o) // "438 666 0666"

x := int64(0xdeadbeef)
fmt.Printf("%d %[1]x %#[1]x %#[1]X\n", x)
// Output:
// 3735928559 deadbeef 0xdeadbeef 0XDEADBEEF

ascii := 'a'
unicode := '国'
newline := '\n'
fmt.Printf("%d %[1]c %[1]q\n", ascii)   // "97 a 'a'"
fmt.Printf("%d %[1]c %[1]q\n", unicode) // "22269 国 '国'"
```

上面的例子中，一般情况下Printf格式化字符串包含多个`%`参数时将会包含对应相同数量的额外操作数，但是 `%` 之后的`[1]` 副词告诉`Printf`函数**再次使用第一个操作数**。

- `%`后的`#`副词告诉`Printf`在用`%o`、`%x`或 `%X`输出时生成`0`、`0x`或`0X`前缀。
- 字符使用`%c`参数打印，或者使用 `%q` 参数打印**带单引号的字符**

内置的 `len` 函数返回一个有符号的`int`，可以像下面例子那样处理逆序循环。

```go
medals := []string{"gold", "silver", "bronze"}
for i := len(medals) - 1; i >= 0; i-- {
    fmt.Println(medals[i]) // "bronze", "silver", "gold"
}
```

## 浮点数

Go中的浮点型有 `float32` 和 `float64`

其范围极限值可以在math包找到。

- 常量 `math.MaxFloat32` 表示 `float32` 能表示的最大数值，大约是 `3.4e38`；对应的 `math.MaxFloat64` 常量大约是 `1.8e308`。它们分别能表示的最小值近似为 `1.4e-45` 和 `4.9e-324`。
- 使用`Printf`函数的 `%g` 参数打印浮点数，将采用更紧凑的表示形式打印，并提供足够的精度，但是对应表格的数据，使用 `%e`（带指数）或 `%f` 的形式打印可能更合适。所有的这三个打印形式都可以指定**打印的宽度**和控制**打印精度**。

```go
for x := 0; x < 8; x++ {
    fmt.Printf("x = %d e^x = %8.3f\n", x, math.Exp(float64(x)))
}
// x = 0       e^x =    1.000
// x = 1       e^x =    2.718
// x = 2       e^x =    7.389
// x = 3       e^x =   20.086
// x = 4       e^x =   54.598
// x = 5       e^x =  148.413
// x = 6       e^x =  403.429
// x = 7       e^x = 1096.633
```

math包中除了提供大量常用的数学函数外，还提供了IEEE754浮点数标准中定义的特殊值的创建和测试：正无穷大和负无穷大`Inf -Inf`，分别用于表示太大溢出的数字和除零的结果；还有 `NaN` 非数，一般用于表示**无效的除法操作结果**，如0/0或Sqrt(-1)

```go
var z float64
fmt.Println(z, -z, 1/z, -1/z, z/z) // "0 -0 +Inf -Inf NaN"
```

- Go中的 `NaN` 与JS中类似，跟任何数都是不相等的，包括其自身，可以用`math.IsNaN` 用于测试一个数是否是非数 `NaN`

```go
nan := math.NaN()
fmt.Println(nan == nan, nan < nan, nan > nan) // "false false false"
```

## 复数

Go语言提供了两种精度的复数类型：`complex64`和`complex128`，分别对应`float32`和`float64`两种浮点数精度。内置的 `complex` 函数用于构建复数，内建的 `real` 和 `imag` 函数分别返回复数的**实部**和**虚部**

```go
var x complex128 = complex(1, 2) // 1+2i
var y complex128 = complex(3, 4) // 3+4i
fmt.Println(x*y)                 // "(-5+10i)"
fmt.Println(real(x*y))           // "-5"
fmt.Println(imag(x*y))           // "10"
```

如果一个浮点数面值或一个十进制整数面值后面跟着一个i，例如`3.141592i`或`2i`，它将构成一个复数的**虚部**，复数的**实部是0**：

```go
fmt.Println(1i * 1i) // "(-1+0i)", i^2 = -1
```

一个复数常量可以正常加到另一个普通数值常量

```go
fmt.Println(1i * 1i) // "(-1+0i)", i^2 = -1
```

math/cmplx包提供了复数处理的许多函数，例如求复数的平方根函数和求幂函数。

```go
fmt.Println(cmplx.Sqrt(-1)) // "(0+1i)"
```

## 布尔型

`true` or `false`，这一点没什么好说的。

## 字符串

Go中的字符串类型`string`是 **不可变字符串**，与JS一样，与c++不同。
> 不变性意味着如果两个字符串共享相同的底层数据的话也是安全的，这使得复制任何长度的字符串代价是低廉的。同样，一个字符串s和对应的子字符串切片s[7:]的操作也可以安全地共享相同的内存，因此字符串切片操作代价也是低廉的。在这两种情况下都没有必要分配新的内存。

字符串中的第 `i` 个字节并不一定是字符串的第 `i` 个字符，因为对于非ASCII字符的UTF8编码会要两个或多个字节。

`s[i:j]` 基于原始的 `s` 字符串的第 `i` 个字节开始到第 `j` 个字节（**不包含 `j` 本身**）生成一个新字符串。生成的新字符串将包含 `j-i` 个字节。

- `i` 和 `j` 都可以被忽略，当它们被忽略时将采用`0`作为开始位置，采用`len(s)`作为结束的位置。

```go
fmt.Println(s[0:5]) // "hello"
fmt.Println(s[:5]) // "hello"
fmt.Println(s[7:]) // "world"
fmt.Println(s[:])  // "hello, world"
```

`+` 操作符将两个字符串连接构造一个新字符串：

```go
fmt.Println("goodbye" + s[5:]) // "goodbye, world"
```

字符串的比较是通过逐个字节比较完成的，比较结果是字符串自然编码的顺序。

Go语言源文件总是用UTF8编码，并且Go语言的文本字符串也以UTF8编码的方式处理，因此我们可以将Unicode码点也写到字符串面值中。

一个**原生的字符串面值**形式如下，使用反引号代替双引号。

```go
const GoUsage = `Go is a tool for managing Go source code.
Usage:
    go command [arguments]
...`
```

在原生的字符串面值中，**没有转义操作**；全部的内容都是字面的意思，包含退格和换行，因此一个程序中的原生字符串面值可能跨越多行

- 在原生字符串面值内部是无法直接写·反引号的，可以用八进制或十六进制转义或+"`"连接字符串常量完成）。
- 唯一的特殊处理是会**删除回车**以保证在所有平台上的值都是一样的，包括那些把回车也放入文本文件的系统

> Windows系统会把回车和换行一起放入文本文件中

以下是一些字符串方法

```go
package main

import (
 "fmt"
 "strings"
)

func main() {
 a := "hello"
 fmt.Println(strings.Contains(a, "ll"))                // true
 fmt.Println(strings.Count(a, "l"))                    // 2
 fmt.Println(strings.HasPrefix(a, "he"))               // true
 fmt.Println(strings.HasSuffix(a, "llo"))              // true
 fmt.Println(strings.Index(a, "ll"))                   // 2
 fmt.Println(strings.Join([]string{"he", "llo"}, "-")) // he-llo
 fmt.Println(strings.Repeat(a, 2))                     // hellohello
 fmt.Println(strings.Replace(a, "e", "E", -1))         // hEllo
 fmt.Println(strings.Split("a-b-c", "-"))              // [a b c]
 fmt.Println(strings.ToLower(a))                       // hello
 fmt.Println(strings.ToUpper(a))                       // HELLO
 fmt.Println(len(a))                                   // 5
 b := "你好"
 fmt.Println(len(b)) // 6
}
```

> 在go语言里面的话，可以很轻松地用 `%v` 来打印**任意类型的变量**，而不需要区分数字字符串,也可以用 `%+v` 打印详细结果，`%#v` 则更详细。

```go
package main

import "fmt"

type point struct {
 x, y int
}

func main() {
 s := "hello"
 n := 123
 p := point{1, 2}
 fmt.Println(s, n) // hello 123
 fmt.Println(p)    // {1 2}

 fmt.Printf("s=%v\n", s)  // s=hello
 fmt.Printf("n=%v\n", n)  // n=123
 fmt.Printf("p=%v\n", p)  // p={1 2}
 fmt.Printf("p=%+v\n", p) // p={x:1 y:2}
 fmt.Printf("p=%#v\n", p) // p=main.point{x:1, y:2}

 f := 3.141592653
 fmt.Println(f)          // 3.141592653
 fmt.Printf("%.2f\n", f) // 3.14
}
```

### 字符串和数字转换

go 语言当中，关于字符串和数字类型之间的转换都在 `strconv` 这个包下，这个包是 string convert 这两个单词的缩写。可以用 `ParseInt` 或者 `ParseFloat` 来解析一个字符串。也可以用 Atoi 把一个十进制字符串转成数字。可以用 `Itoa` 把数字转成字符串。

- 如果输入不合法，那么这些函数都会返回error **除了Itoa**

```go
package main

import (
 "fmt"
 "strconv"
)

func main() {
 f, _ := strconv.ParseFloat("1.234", 64)
 fmt.Println(f) // 1.234

 n, _ := strconv.ParseInt("111", 10, 64)
 fmt.Println(n) // 111

 n, _ = strconv.ParseInt("0x1000", 0, 64)
 fmt.Println(n) // 4096

 n2, _ := strconv.Atoi("123")
 fmt.Println(n2) // 123

 n2, err := strconv.Atoi("AAA")
 fmt.Println(n2, err) // 0 strconv.Atoi: parsing "AAA": invalid syntax

 n3 := strconv.Itoa(123) // 这个不返回error
 fmt.Println(n3) // 123
}
```

## 常量

同其他语言的常量一样，常量的值不可修改，且必须被初始化，若批量声明常量时其除第一个其他的初始化表达式可被省略，若省略则使用前面的常量表初始化表达式，如下：

```go
const pi = 3.14159 // approximately; math.Pi is a better approximation
const (
    e  = 2.71828182845904523536028747135266249775724709369995957496696763
    pi = 3.14159265358979323846264338327950288419716939937510582097494459
)
const (
    a = 1
    b
    c = 2
    d
)
```

### `iota` 常量生成器
>
> 类似 c/c++ 中的枚举类型 `Enum`!!

常量声明可以使用`iota`常量生成器初始化，它用于生成一组以相似规则初始化的常量，但是不用每行都写一遍初始化表达式。在一个 `const` 声明语句中，在第一个声明的常量所在的行，`iota` 将会被置为 `0`，然后在每一个有常量声明的行加一。

```go
type Weekday int
const (
    Sunday Weekday = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)
// Sunday 对应 0 
// Monday 对应 1 
// ....
// Saturday 对应 6
```

也可以结合复杂的表达式使用 `itoa`，如下例：每个常量对应表达式`1 << iota`，是**连续的2的幂**

```go
type Flags uint

const (
    FlagUp Flags = 1 << iota // is up
    FlagBroadcast            // supports broadcast access capability
    FlagLoopback             // is a loopback interface
    FlagPointToPoint         // belongs to a point-to-point link
    FlagMulticast            // supports multicast access capability
)

fmt.Println(FlagUp, FlagBroadcast, FlagLoopback, FlagPointToPoint, FlagMulticast)
// 1 2 4 8 16
```

### 无类型常量

许多常量并没有一个明确的基础类型。Go的编译器为这些没有明确基础类型的数字常量提供比基础类型更高精度的算术运算；你可以认为 **至少有256bit的运算精度** 。这里有六种未明确类型的常量类型，分别是无类型的布尔型、无类型的整数、无类型的字符、无类型的浮点数、无类型的复数、无类型的字符串。

只有常量可以是无类型的。当一个无类型的常量被赋值给一个变量的时候，无类型的常量将会被**隐式转换**为对应的类型，如果转换合法的话。

- 对于**没有显式类型的变量声明**（包括简短变量声明），常量的形式将**隐式决定**变量的默认类型，
  - 无类型整数常量转换为 `int`，它的**内存大小是不确定**的，无类型浮点数和复数常量则转换为**内存大小明确**的 `float64` 和 `complex128`。

# 程序结构
<https://books.studygolang.com/gopl-zh/ch2/ch2.html>

## 声明与变量

### var

一般语法如下

```go
var 变量名 类型 = 表达式
```

类型省略则根据表达式自动推导，如果表达式为空，则用 **零值** 初始化该变量（因此在Go语言中**不存在未初始化的变量**）

| 类型 | 零值 |
| ---- | ---- |
| 数值 | `0` |
| 布尔 | `false` |
| 字符串 | "" |
| 数组或结构体等聚合类型 | `nil` |  

可以在一个声明语句中同时声明一组变量，或用一组初始化表达式声明并初始化一组变量。

```go
var i, j, k int     // int int int
var b, f, s = true, 2.3, "hello" // bool float64 string
```

一组变量也可以通过调用一个函数，由函数返回的多个返回值初始化：

```go
var f, err = os.Open(name) // os.Open returns a file and an error
```

### 简短变量声明 `:=`

以`名字 := 表达式`的形式声明变量，变量的类型根据表达式来自动推导

- 因为其简洁和灵活的特点，简短变量声明被广泛用于大部分的局部变量的声明和初始化。
- 而var形式的声明语句往往是用于需要显式指定变量类型的地方，或者因为变量稍后会被重新赋值而初始值无关紧要的地方。

```go
i := 100                  // int
i, j := 0, 1              // int int
var boiling float64 = 100 // a float64
var names []string
var err error
```

- 简短变量声明语句对在同级词法域已经声明过的变量只会进行赋值行为
- 如果变量是在外部词法域声明的，那么简短变量声明语句将会在当前词法域重新声明一个新的变量

### 指针

与c语言中类似，通过 `&`操作符取址，通过 `*` 取值

```go
x := 1
p := &x         // p, of type *int, points to x
fmt.Println(*p) // "1"
*p = 2          // equivalent to x = 2
fmt.Println(x)  // "2"
```

任何类型的指针的零值都是 `nil`。

- 若`p`指向某个有效变量，那么 `p != nil` 测试为真。
- 当两指针指向同一个变量或全部是 `nil` 时才相等。

### `new` 函数

`new(T)` 将创建一个 `T` 类型的匿名变量，初始化为 `T类型的零值`，然后返回变量地址，返回的指针类型为 `*T`。

- Go 语言中的`new`是个预定义的**函数**，不是关键字！所以可以重新定义。

```go
p := new(int)   // p, *int 类型, 指向匿名的 int 变量
fmt.Println(*p) // "0"
*p = 2          // 设置 int 匿名变量的值为 2
fmt.Println(*p) // "2"
```

## 自增/自减运算

自增语句`i++`给`i`加1；这和`i += 1`以及`i = i + 1`都是等价的。对应的还有`i--`给`i`减1。它们是**语句**，而不像C系的其它语言那样是表达式。

- 所以`j = i++` **非法**，而且++和--都只能放在变量名后面，因此`--i`也非法。

## 类型 `type`

类似于c++中的typeof的加强版，形式如下

```go
type 类型名 底层类型
```

如下，声明了两种类型：`Celsius` 和 `Fahrenheit` 分别对应不同的温度单位。

- 底层数据类型决定其内部结构和表达方式
- 它们虽然有着相同的底层类型 `float64`，但是它们是不同的数据类型，因此它们**不可以被相互比较或混在一个表达式运算。**
- 类型转换不会改变值本身，但是会使它们的语义发生变化。

```go
import "fmt"

type Celsius float64    // 摄氏温度
type Fahrenheit float64 // 华氏温度

const (
    AbsoluteZeroC Celsius = -273.15 // 绝对零度
    FreezingC     Celsius = 0       // 结冰点温度
    BoilingC      Celsius = 100     // 沸水温度
)

func CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }

func FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }
```

比较运算符==和<也可以用来比较一个命名类型的变量和另一个有相同类型的变量，或有着相同底层类型的未命名类型的值之间做比较。但是如果两个值有着不同的类型，则不能直接进行比较：

```go
var c Celsius
var f Fahrenheit
fmt.Println(c == 0)          // "true"
fmt.Println(f >= 0)          // "true"
fmt.Println(c == f)          // compile error: type mismatch
fmt.Println(c == Celsius(f)) // "true"! 类型转换操作不会改变值
```

命名类型还可以为该类型的值定义新的行为。这些行为表示为一组关联到该类型的函数集合，我们称为**类型的方法集** (在第六章会详细讲)

下面的声明语句，Celsius类型的参数c出现在了函数名的前面，表示声明的是Celsius类型的一个名叫String的方法，该方法返回该类型对象c带着°C温度单位的字符串：

```go
func (c Celsius) String() string { return fmt.Sprintf("%g°C", c) }
```

许多类型都会定义一个String方法，因为当使用fmt包的打印方法时，将会优先使用该类型对应的String方法返回的结果打印

```go
c := FToC(212.0)
fmt.Println(c.String()) // "100°C"
fmt.Printf("%v\n", c)   // "100°C"; no need to call String explicitly
fmt.Printf("%s\n", c)   // "100°C"
fmt.Println(c)          // "100°C"
fmt.Printf("%g\n", c)   // "100"; does not call String
fmt.Println(float64(c)) // "100"; does not call String
```

## 循环 `for`

[命令行参数 · Go语言圣经](https://books.studygolang.com/gopl-zh/ch1/ch1-02.html)

Go中的循环没有while、do while等，只有一种 `for`循环
写法如下：

```
for initialization; condition; post {
    // zero or more statements
}
```

for循环三个部分不需括号包围。**大括号强制要求**，左大括号必须和*post*语句在同一行。

- `initialization` 语句是可选的，在**循环开始前执行**。`initalization` 如果存在，必须是一条*简单语句*（simple statement），即短变量声明、自增语句、赋值语句或函数调用。
- `condition`是一个布尔表达式（boolean expression），其值在每次循环迭代开始时计算。如果为`true`则执行循环体语句。
- `post`语句在每次循环体执行结束后执行，之后再次对`condition`求值。`condition`值为`false`时，循环结束。

for循环的这三个部分每个都可以省略，如果省略`initialization`和`post`，就是while循环，分号也可以省略，如果省略三个部分，则为永真循环，可通过 `break` 跳出：

```go
i := 1
for {
        fmt.Println("loop")
        break
}
for j := 7; j < 9; j++ {
        fmt.Println(j)
}

for n := 0; n < 5; n++ {
        if n%2 == 0 {
                continue
        }
        fmt.Println(n)
}
for i <= 3 {
        fmt.Println(i)
        i = i + 1
}
```

## 分支结构

### if else

Go中的 `if` 类似 python，没有括号，**但后面必须跟大括号**

```go
if 7%2 == 0 {
        fmt.Println("7 is even")
} else {
        fmt.Println("7 is odd")
}

if 8%4 == 0 {
        fmt.Println("8 is divisible by 4")
}

if num := 9; num < 0 {
        fmt.Println(num, "is negative")
} else if num < 10 {
        fmt.Println(num, "has 1 digit")
} else {
        fmt.Println(num, "has multiple digits")
}
```

### switch

go语言里面的 `switch` 分支结构类似c++。但也有很多不同：

- switch 后面的那个变量名，也不要括号
- c++中的switch case 如果不加 `break` 的话会然后会继续往下跑完所有的 case， 在go语言里面的话是**不需要加 `break`** 的
- go语言里面的 switch 功能更强大，可以使用**任意的变量类型**，甚至可以用来取代任意的 if else 语句。

> 你可以在 switch 后面不加任何的变量，然后在 case 里面写条件分支。这样代码相比你用多个 if else 代码逻辑会更为清晰。

```go
package main

import (
 "fmt"
 "time"
)

func main() {
 a := 2
 switch a {
 case 1:
  fmt.Println("one")
 case 2:
  fmt.Println("two")
 case 3:
  fmt.Println("three")
 case 4, 5:
  fmt.Println("four or five")
 default:
  fmt.Println("other")
 }

 t := time.Now()
 switch {
 case t.Hour() < 12:
  fmt.Println("It's before noon")
 default:
  fmt.Println("It's after noon")
 }
}
```

# 进程信息

在 go 里面，我们能够用 `os.argv`  来得到程序执行的时候的指定的命令行参数。比如我们编译的一个 二进制文件，`command`。 后面接 `abcd` 来启动，输出就是 `os.argv` 会是一个长度为 `5` 的 `slice` ,第一个成员代表二进制自身的名字。我们可以用 `so.getenv`来读取环境变量。`exec`

```go
package main

import (
 "fmt"
 "os"
 "os/exec"
)

func main() {
 // go run example/20-env/main.go a b c d
 fmt.Println(os.Args)           // [/var/folders/8p/n34xxfnx38dg8bv_x8l62t_m0000gn/T/go-build3406981276/b001/exe/main a b c d]
 fmt.Println(os.Getenv("PATH")) // /usr/local/go/bin...
 fmt.Println(os.Setenv("AA", "BB"))

 buf, err := exec.Command("grep", "127.0.0.1", "/etc/hosts").CombinedOutput()
 if err != nil {
  panic(err)
 }
 fmt.Println(string(buf)) // 127.0.0.1       localhost
}
```

# 复合数据类型

## 数组

数组是一个由**固定长度**的**特定类型元素**组成的序列，一个数组可以由零个或多个元素组成。因为数组的长度是固定的，因此在Go语言中很少直接使用数组。和数组对应的类型是`Slice`（切片），它是可以增长和收缩的动态序列，slice功能也更灵活，但是要理解slice工作原理的话需要先理解数组。

```go
package main

import "fmt"

func main() {

 var a [5]int
 a[4] = 100
 fmt.Println("get:", a[2])
 fmt.Println("len:", len(a))

 b := [5]int{1, 2, 3, 4, 5}
 fmt.Println(b)

 var twoD [2][3]int
 for i := 0; i < 2; i++ {
  for j := 0; j < 3; j++ {
   twoD[i][j] = i + j
  }
 }
 fmt.Println("2d: ", twoD)
}
```

## 切片 `Slice`

切片不同于数组，可以任意更改长度，也有更多丰富的操作。

- 用 `make` 来**创建一个切片**，可以像数组一样去取值
- 使用 `append` 来追加元素。注意 append 的用法与js中的`concat`相似，返回一个新数组，把 append 的结果赋值为原数组。
- slice 初始化的时候也可以动态的指定长度。 `len(s)`
- slice 拥有像 python 一样的**切片操作**，比如`s[2:5]`代表取出第二个到第五个位置的元素，不包括第五个元素。**不过不同于python，这里不支持负数索引**

```go
package main

import "fmt"

func main() {
 s := make([]string, 3)
 s[0] = "a"
 s[1] = "b"
 s[2] = "c"
 fmt.Println("get:", s[2])   // c
 fmt.Println("len:", len(s)) // 3

 s = append(s, "d")
 s = append(s, "e", "f")
 fmt.Println(s) // [a b c d e f]

 c := make([]string, len(s))
 copy(c, s)
 fmt.Println(c) // [a b c d e f]

 fmt.Println(s[2:5]) // [c d e]
 fmt.Println(s[:5])  // [a b c d e]
 fmt.Println(s[2:])  // [c d e f]

 good := []string{"g", "o", "o", "d"}
 fmt.Println(good) // [g o o d]
}
```

## Map

`map` 是实际使用过程中最频繁用到的数据结构。

- 可以用 `make` 来创建一个空 `map` ，这里会需要两个类型，`key` 和 `value` 的类型
  - `map[string]int` 表示 `key` 类型为`string` 、`value` 类型为 `int`
- `map` 的取值与插入类似c++中STL的map，可直接进行。 `m[key]` `m[key] = value`
- 可以用 `delete` 从里面**删除键值对**
- Go 中的`map`是**完全无序**的，遍历的时候不会按照字母顺序，也不会按照插入顺序输出，而是**随机顺序**

```go
package main

import "fmt"

func main() {
 m := make(map[string]int)
 m["one"] = 1
 m["two"] = 2
 fmt.Println(m)           // map[one:1 two:2]
 fmt.Println(len(m))      // 2
 fmt.Println(m["one"])    // 1
 fmt.Println(m["unknow"]) // 0

 r, ok := m["unknow"]
 fmt.Println(r, ok) // 0 false

 delete(m, "one")

 m2 := map[string]int{"one": 1, "two": 2}
 var m3 = map[string]int{"one": 1, "two": 2}
 fmt.Println(m2, m3)
}
```

## range

对于一个 `slice` 或者一个 `map` 的话，我们可以用 `range` 来快速遍历，这样代码能够更加简洁。 range 遍历的时候，对于**数组**会返回两个值，第一个是索引，第二个是对应位置的值。如果我们不需要索引的话，我们可以用下划线 `_` 来忽略。
> Go语言不允许使用无用的局部变量（local variables），因为这会导致编译错误。用`空标识符`（blank identifier），即`_`（也就是下划线）。空标识符可用于在任何**语法需要变量名但程序逻辑不需要**的时候（如：在循环里）丢弃不需要的循环索引，并保留元素值。

```go
package main

import "fmt"

func main() {
 nums := []int{2, 3, 4}
 sum := 0
 for i, num := range nums {
  sum += num
  if num == 2 {
   fmt.Println("index:", i, "num:", num) // index: 0 num: 2
  }
 }
 fmt.Println(sum) // 9

 m := map[string]string{"a": "A", "b": "B"}
 for k, v := range m {
  fmt.Println(k, v) // b 8; a A
 }
 for k := range m {
  fmt.Println("key: ", k) // key:  a; key:  b
 }
 for _, v := range m {
  fmt.Println("value:", v) // value: A; value: B
 }
}
```

## 结构体

结构体的话是带类型的字段的集合。比如这里 `user` 结构包含了两个字段，`name` 和 `password`

- 可以用结构体的名称去初始化一个结构体变量，构造的时候需要**传入每个字段的初始值**
- 也可以用键值对的方式指定初始值，这样可以只对一部分字段进行初始化
- 同样的结构体也支持指针，这样能够实现直接对于结构体的修改，可以在某些情况下**避免**一些大结构体的**拷贝开销**

```go
package main

import "fmt"

type user struct {
 name     string
 password string
}

func main() {
 a := user{name: "wang", password: "1024"}
 b := user{"wang", "1024"}
 c := user{name: "wang"}
 c.password = "1024"
 var d user
 d.name = "wang"
 d.password = "1024"

 fmt.Println(a, b, c, d)                 // {wang 1024} {wang 1024} {wang 1024} {wang 1024}
 fmt.Println(checkPassword(a, "haha"))   // false
 fmt.Println(checkPassword2(&a, "haha")) // false
}

func checkPassword(u user, password string) bool {
 return u.password == password
}

func checkPassword2(u *user, password string) bool {
 return u.password == password
}
```

## JSON

go语言中的 JSON 操作非常简单

- 对于一个已有的结构体，只要保证**每个字段的第一个字母是大写**，也就是是**公开字段**。那么这个结构体就能用 `JSON.marshaler` 去序列化，变成一个 JSON 的字符串。

> `JSON.marshaler` 返回序列化值和error，如下例 \
> 这样默认序列化出来的字符串，是大写字母开头。可以在后面用 json tag 等语法来去修改输出 JSON 结果里面的字段名。

- 序列化之后的字符串可以用 `JSON.unmarshaler` 去**反序列化**到一个空的变量里面。

```go
package main

import (
 "encoding/json"
 "fmt"
)

type userInfo struct {
 Name  string
 Age   int `json:"age"`
 Hobby []string
}

func main() {
 a := userInfo{Name: "wang", Age: 18, Hobby: []string{"Golang", "TypeScript"}}
 buf, err := json.Marshal(a)
 if err != nil {
  panic(err)
 }
 fmt.Println(buf)         // [123 34 78 97...]
 fmt.Println(string(buf)) // {"Name":"wang","age":18,"Hobby":["Golang","TypeScript"]}

 buf, err = json.MarshalIndent(a, "", "\t")
 if err != nil {
  panic(err)
 }
 fmt.Println(string(buf))

 var b userInfo
 err = json.Unmarshal(buf, &b)
 if err != nil {
  panic(err)
 }
 fmt.Printf("%#v\n", b) // main.userInfo{Name:"wang", Age:18, Hobby:[]string{"Golang", "TypeScript"}}
}
```

## 时间处理

go语言最常用的就是 `time.now()` 来获取当前时间，然后你也可以用 `time.date` 去构造一个**带时区的时间**，有很多方法来获取这个时间点的年月日小时分钟秒，

- 可以用 `Sub`方法对两个时间进行减法，得到一个时间段。
- 时间段又可以得到它有多少小时，多少分钟、多少秒。
- 在和某些系统交互的时候，我们经常会用到时间戳。那可以用 `.UNIX` 来获取时间戳。`time.format`  `time.parse`

```go
package main

import (
 "fmt"
 "time"
)

func main() {
 now := time.Now()
 fmt.Println(now) // 2022-05-07 13:12:03.7190528 +0800 CST m=+0.004990401
 t := time.Date(2022, 5, 7, 13, 25, 36, 0, time.UTC)
 t2 := time.Date(2022, 8, 12, 12, 30, 36, 0, time.UTC)
 fmt.Println(t)                                                  // 2022-05-07 13:25:36 +0000 UTC
 fmt.Println(t.Year(), t.Month(), t.Day(), t.Hour(), t.Minute()) // 2022 March 27 1 25
 fmt.Println(t.Format("2006-01-02 15:04:05"))                    // 2022-05-07 13:25:36
 diff := t2.Sub(t)
 fmt.Println(diff)                           // 2327h5m0s
 fmt.Println(diff.Minutes(), diff.Seconds()) // 139625 8.3775e+06
 t3, err := time.Parse("2006-01-02 15:04:05", "2022-05-07 13:25:36")
 if err != nil {
  panic(err)
 }
 fmt.Println(t3 == t)    // true
 fmt.Println(now.Unix()) // 1651900531
}

```

# 函数

Go和其他很多语言不一样的是，函数参数变量类型是**后置的**。Go 中的函数**原生支持返回多个值**。

- 在实际的业务逻辑代码里面几乎所有的函数都返回两个值，第一个是返回值，第二个值是一个**错误信息**。 如下例中的 `exists`

```go
package main

import "fmt"

func add(a int, b int) int {
 return a + b
}

func add2(a, b int) int {
 return a + b
}

func exists(m map[string]string, k string) (v string, ok bool) {
 v, ok = m[k]
 return v, ok
}

func main() {
 res := add(1, 2)
 fmt.Println(res) // 3

 v, ok := exists(map[string]string{"a": "A"}, "a")
 fmt.Println(v, ok) // A True
}
```

## 错误处理

go 中的错误处理就是**使用一个单独的返回值**来传递错误信息

- 在函数返回值类型后面加一个 `error`， 代表这个函数可能会返回错误。那么在函数实现的时候， `return` 需要同时 `return` 两个值
- 出现错误时，可以 `return nil` 和一个 `error`。如果没有的话，那么返回原本的结果和 `nil`。

```go
package main

import (
 "errors"
 "fmt"
)

type user struct {
 name     string
 password string
}

func findUser(users []user, name string) (v *user, err error) {
 for _, u := range users {
  if u.name == name {
   return &u, nil
  }
 }
 return nil, errors.New("not found")
}

func main() {
 u, err := findUser([]user{{"wang", "1024"}}, "wang")
 if err != nil {
  fmt.Println(err)
  return
 }
 fmt.Println(u.name) // wang

 if u, err := findUser([]user{{"wang", "1024"}}, "li"); err != nil {
  fmt.Println(err) // not found
  return
 } else {
  fmt.Println(u.name)
 }
}
```

# 工具推荐

在课堂中提到的几个代码生成工具

- [Convert curl commands to code (curlconverter.com)](https://curlconverter.com/#go)
- [JSON转Golang Struct - 在线工具 - OKTools](https://oktools.net/json2go)

# 课后练习

1. 修改第一个例子猜谜游戏里面的最终代码，使用fmt.Scanf来简化代码实现

```go
package main

import (
 "fmt"
 "math/rand"
 "time"
)

func main() {
 maxNum := 100
 rand.Seed(time.Now().UnixNano())
 secretNumber := rand.Intn(maxNum)
 // fmt.Println("The secret number is ", secretNumber)

 fmt.Println("Please input your guess")
 //reader := bufio.NewReader(os.Stdin)
 for {
  //input, err := reader.ReadString('\n')
  var guess int
  _, err := fmt.Scanf("%d", &guess)
  fmt.Scanf("%*c")    // 吃回车
  if err != nil {
   fmt.Println("An error occured while reading input. Please try again", err)
   continue
  }
  //input = strings.TrimSuffix(input, "\n")
  if err != nil {
   fmt.Println("Invalid input. Please enter an integer value")
   continue
  }
  fmt.Println("You guess is", guess)
  if guess > secretNumber {
   fmt.Println("Your guess is bigger than the secret number. Please try again")
  } else if guess < secretNumber {
   fmt.Println("Your guess is smaller than the secret number. Please try again")
  } else {
   fmt.Println("Correct, you Legend!")
   break
  }
 }
}
```

2. 修改第二个例子命令行词典里面的最终代码，增加另一种翻译引擎的支持

```go

```

3. 在上一步骤的基础上，修改代码实现并行请求两个翻译引擎来提高响应速度

# 总结及心得

课上很详细的讲了Go的基本语法，以及再加上自己阅读Go语言圣经的一些总结，得出了这一篇文章，感觉跟JS和c/c++还是有很多共通之处的。

> 内容来源于：[Go语言圣经](https://books.studygolang.com/gopl-zh/ch2/ch2.html) 以及 第三届青训营课程

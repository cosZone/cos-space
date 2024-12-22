---
title: 优化 JavaScript 的乐趣和好处【译文】
link: optimizing-javascript-translate
catalog: true
sticky: true
date: 2024-03-28 15:10:00
tags:
- 前端
- JavaScript
- 性能优化
- 译文
categories:
- [笔记, 前端, JavaScript]
---

> 一篇 antfu 推荐的交互式优质性能优化博文，作者有 20 年经验，真的很多细节，试着翻译一下加一点自己的润色，强烈建议阅读英文原文，体验交互式，这里就先用截图替代了。
> 第一次翻译，不足之处欢迎指正！
> 本译文博客链接：<https://ysx.cosine.ren/optimizing-javascript-translate>
> 原文链接：<https://romgrk.com/posts/optimizing-javascript> \
> 原文作者：[romgrk](https://romgrk.com/)

我经常觉得一般的 javascript 代码运行起来比原来慢得多，原因很简单，就是没有进行适当的优化。以下是我发现的常用优化技术的总结。需要注意的是，性能与可读性之间的权衡往往是可读性，因此何时选择性能，何时选择可读性，这个问题留给读者自己去解决。我还想说的是，谈论优化必然需要谈论**基准测试**。如果一个函数一开始的运行时间只占实际总运行时间的一小部分，那么对该函数进行数小时的微优化以使其运行速度提高 100 倍是**毫无意义**的。如果要优化，最重要的第一步就是基准测试。我将在后面的内容中介绍这一主题。还要注意的是，微基准测试（microbenchmarks）通常存在缺陷，这里介绍的可能也包括在内。我已经尽力避免这些陷阱，但**在没有基准测试的情况下，不要盲目应用这里介绍的任何要点**。

我已经为所有可能的情况提供了可运行的示例。它们默认显示我在我的机器上得到的结果（archlinux 上的 brave 122），但是你可以自己运行它们。尽管我不想这么说，但 [Firefox](https://foundation.mozilla.org/en/?form=donate-header) 在优化游戏中已经落后了一点，目前只占流量的一小部分，所以我不建议使用 Firefox 上的结果作为有用的指标。

## 0.避免不必要的工作

这可能听起来很明显，但它需要在这里，因为不可能有另一个优化的第一步：**如果你试图优化，你应该首先考虑避免不必要的工作。** 这包括了诸如记忆化（memoization）、延迟计算（laziness）和增量计算（incremental computation）等概念。具体应用会根据上下文有所不同。例如，在React中，这意味着应用 `memo()`、`useMemo()` 以及其他适用的原语。

## 1.避免字符串比较

JavaScript 很容易隐藏字符串比较的真实开销。如果你需要在 C 语言中比较字符串，你会使用 `strcmp(a, b)` 函数。而 JavaScript 使用 `===` 进行比较，因此你看不到 `strcmp` 。但它是存在的，`strcmp` 通常（但不总是）需要将一个字符串中的每个字符与另一个字符串中的字符进行比较；字符串比较的时间复杂度是 `O(n)` 。**一种常见的要避免的 JavaScript 模式是将字符串用作枚举（strings-as-enums）**。但是，随着 TypeScript 的出现，这应该很容易避免，因为枚举类型默认是整数。

```javascript
// No
enum Position {
  TOP    = 'TOP',
  BOTTOM = 'BOTTOM',
}

// Yeppers
enum Position {
  TOP,    // = 0
  BOTTOM, // = 1
}
```

以下是成本比较：

```javascript
// 1. string compare
const Position = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
}
 
let _ = 0
for (let i = 0; i < 1000000; i++) {
  let current = i % 2 === 0 ?
    Position.TOP : Position.BOTTOM
  if (current === Position.TOP)
    _ += 1
}

// 2. int compare
const Position = {
  TOP: 0,
  BOTTOM: 1,
}
 
let _ = 0
for (let i = 0; i < 1000000; i++) {
  let current = i % 2 === 0 ?
    Position.TOP : Position.BOTTOM
  if (current === Position.TOP)
    _ += 1
}
```

![比较结果](https://backblaze.cosine.ren/blog/1548703b93b17405943b6b28e516ff2b.webp)

## 2.避免不同的形状（ Shapes ）

JavaScript 引擎尝试通过假设对象具有特定的形状，并且函数将接收相同形状的对象来优化代码。这允许它们为该形状的所有对象一次性存储键，并在一个单独的扁平数组中存储值。用 JavaScript 代码表示的话如下例：

```javascript
// 引擎接受的对象
const objects = [
  {
    name: 'Anthony',
    age: 36,
  },
  {
    name: 'Eckhart',
    age: 42
  },
]

// 优化后的内部存储结构类似
const shape = [
  { name: 'name', type: 'string' },
  { name: 'age',  type: 'integer' },
]
 
const objects = [
  ['Anthony', 36],
  ['Eckhart', 42],
]
```

:::info
我使用了 “shape” 这个词来描述这个概念，但要注意，您可能也会发现 “hidden class” 或 “map” 用于描述它，这取决于引擎。
:::

例如，在运行时，如果下面的函数接收到两个具有形状 `{ x: number, y: number }` 的对象，则引擎**将推测未来的对象将具有相同的形状**，并生成针对该形状优化的机器代码。

```javascript
function add(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  }
}
```

如果我们传递的对象不是形状 { x, y } 而是形状 { y, x } ，那么引擎将需要撤销其推测，函数将突然变得相当慢。我在这里的解释会有所保留，因为如果你想了解更多细节，应该阅读 [mraleph 的优秀文章](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html) 。但我要强调的是，V8 引擎特别有3种模式，用于访问：单态（monomorphic，1种形状）、多态（polymorphic，2-4种形状）和巨态（megamorphic，5种以上形状）。假设你真的想保持单态，因为性能下降是很剧烈的：

> 译者注： \
> 在保持代码性能的单态模式下，你需要确保传递给函数的对象保持相同的形状。在 JavaScript 和 TypeScript 的开发过程中，这意味着当你定义和操作对象时，你需要保证属性的添加顺序一致，避免随意添加或删除属性，这样可以帮助 V8 引擎优化对象属性的访问。
> 为了提高性能，尽量避免在运行时改变对象的形状。这涉及到避免添加或删除属性，或者以不同的顺序创建相同属性的对象。通过维持对象属性的一致性，可以帮助 JavaScript 引擎保持对对象的高效访问，从而避免由于形状变化导致的性能下降。

```javascript
// setup
let _ = 0

// 1. monomorphic
const o1 = { a: 1, b: _, c: _, d: _, e: _ }
const o2 = { a: 1, b: _, c: _, d: _, e: _ }
const o3 = { a: 1, b: _, c: _, d: _, e: _ }
const o4 = { a: 1, b: _, c: _, d: _, e: _ }
const o5 = { a: 1, b: _, c: _, d: _, e: _ } // all shapes are equal

// 2. polymorphic
const o1 = { a: 1, b: _, c: _, d: _, e: _ }
const o2 = { a: 1, b: _, c: _, d: _, e: _ }
const o3 = { a: 1, b: _, c: _, d: _, e: _ }
const o4 = { a: 1, b: _, c: _, d: _, e: _ }
const o5 = { b: _, a: 1, c: _, d: _, e: _ } // this shape is different

// 3. megamorphic
const o1 = { a: 1, b: _, c: _, d: _, e: _ }
const o2 = { b: _, a: 1, c: _, d: _, e: _ }
const o3 = { b: _, c: _, a: 1, d: _, e: _ }
const o4 = { b: _, c: _, d: _, a: 1, e: _ }
const o5 = { b: _, c: _, d: _, e: _, a: 1 } // all shapes are different

// test case
function add(a1, b1) {
  return a1.a + a1.b + a1.c + a1.d + a1.e +
         b1.a + b1.b + b1.c + b1.d + b1.e }
 
let result = 0
for (let i = 0; i < 1000000; i++) {
  result += add(o1, o2)
  result += add(o3, o4)
  result += add(o4, o5)
}
```

![比较结果](https://backblaze.cosine.ren/blog/5c3018a8ee1a534088d70bbb58fd0d83.webp)

那么我该怎么办呢？

说来容易做来难：用完全相同的形状创建所有对象。**即使是像以不同的顺序编写 React 组件 props 这样微不足道的事情也会触发这种情况**。

例如，这里是我在 React 的代码库中发现的一些[简单案例](https://github.com/facebook/react/pull/28569)，但几年前它们已经对同一问题产生了[更高的影响](https://v8.dev/blog/react-cliff)，因为它们用整数初始化了一个对象，然后存储了一个浮点数。 **是的，改变类型也会改变形状。** 是的，整数和浮点数类型隐藏在 number 后面。处理它。

:::info
引擎通常可以将整数编码为值。例如，V8 表示 32 位的值，整数作为紧凑的 [Smi](https://medium.com/fhinkel/v8-internals-how-small-is-a-small-integer-e0badc18b6da)（SMall）值，但浮点数和大整数作为指针传递，就像字符串和对象一样。JSC 使用 64 位编码，[双标记](https://ktln2.org/2020/08/25/javascriptcore/)，按值传递所有数字，就像 [SpiderMonkey](https://spidermonkey.dev/) 一样，其余的作为指针传递。
:::

---

> 译者注：
> 这种编码方式允许 JavaScript 引擎在不牺牲性能的前提下，高效地处理各种类型的数字。对于小整数，Smi 的使用减少了需要为其分配堆内存的情况，提高了操作的效率。对于更大的数字，虽然需要通过指针来访问，但这种方式依然能够保证 JavaScript 在处理各种数字类型时的灵活性和效能。
> 这样的设计也反映了 JavaScript 引擎作者在数据表示和性能优化之间权衡的智慧，尤其是在动态类型语言中，这种权衡尤为重要。通过这种方式，引擎能够在执行 JavaScript 代码时，尽可能地减少内存使用和提高运算速度。

## 3.避免使用数组/对象方法

我和其他人一样喜欢函数式编程，但是除非你在 Haskell / OCaml / Rust 中工作，函数式代码被编译成高效的机器代码，否则函数式总是比命令式慢。

```javascript
const result =
  [1.5, 3.5, 5.0]
    .map(n => Math.round(n))
    .filter(n => n % 2 === 0)
    .reduce((a, n) => a + n, 0)
```

这些方法的问题在于：

1. 它们需要制作数组的完整副本，这些副本稍后需要由垃圾收集器释放。我们将在第 5 节中更详细地探讨内存 I/O 的问题。
2. 它们为 N 个操作循环 N 次，而 for 循环只允许循环一次。

```javascript
// setup:
const numbers = Array.from({ length: 10_000 }).map(() => Math.random())

// 1. functional
const result =
  numbers
    .map(n => Math.round(n * 10))
    .filter(n => n % 2 === 0)
    .reduce((a, n) => a + n, 0)

// 2. imperative
let result = 0
for (let i = 0; i < numbers.length; i++) {
  let n = Math.round(numbers[i] * 10)
  if (n % 2 !== 0) continue
  result = result + n
}
```

![比较结果](https://backblaze.cosine.ren/blog/1f70de1c81c51179912d6a3db79c0465.webp)

像 `Object.values()` 、 `Object.keys()` 和 `Object.entries()` 这样的对象方法也会遇到类似的问题，因为它们也会分配更多的数据，而内存访问是所有性能问题的根源。我发誓，我会在第五节给你看的。

## 4.避免间接来源

另一个寻找优化收益的地方是任何间接来源，我可以看到3个主要来源：

```javascript
const point = { x: 10, y: 20 }
 
// 1. 代理对象更难优化，因为它们的 get/set 函数可能正在运行自定义逻辑，因此引擎无法做出通常的假设。
const proxy = new Proxy(point, { get: (t, k) => { return t[k] } })
// 有些引擎可以使代理成本消失，但这些优化的成本很高，而且很容易损坏。
const x = proxy.x
 
// 2. 通常会被忽略，但通过 `.` 或 `[]` 访问对象也是一种间接访问。在简单的情况下，引擎很可能可以优化成本：
const x = point.x
// 但每次额外的访问都会增加成本，并使引擎更难对“点”的状态做出假设：
const x = this.state.circle.center.point.x
 
// 3.最后，函数调用也会产生成本。引擎一般都善于内联这些函数：
function getX(p) { return p.x }
const x = getX(p)
// 但也不能保证一定可以。特别是如果函数调用不是来自静态函数，而是来自参数等：
function Component({ point, getX }) {
  return getX(point)
}
```

代理基准测试目前在 V8 上尤其残酷。上次我检查的时候，代理对象总是从 JIT 返回到解释器，从这些结果来看，情况可能仍然如此。

```javascript
// 1. 代理访问
const point = new Proxy({ x: 10, y: 20 }, { get: (t, k) => t[k] })
 
for (let _ = 0, i = 0; i < 100_000; i++) { _ += point.x }


// 2. 直接访问
const point = { x: 10, y: 20 }
const x = point.x
 
for (let _ = 0, i = 0; i < 100_000; i++) { _ += x }
```

![比较结果](https://backblaze.cosine.ren/blog/4bd25eda7fd9fc4259eec04b33b89420.webp)

我还想展示访问深嵌套对象与直接访问的对比，但引擎很擅长在存在热循环和常量对象时[通过转义分析来优化对象访问](https://youtu.be/KiWEWLwQ3oI?t=1055) 。为了防止这种情况，我插入了一些间接方法。

> 译者注：\
> “热循环”（hot loop） 指的是在程序执行过程中频繁运行的循环，即被大量重复执行的代码部分。因为这部分代码执行次数非常多，所以它们对程序的性能影响尤为显著，成为了性能优化的关键点。后文也有出现。

```javascript
// 1. 嵌套访问
const a = { state: { center: { point: { x: 10, y: 20 } } } }
const b = { state: { center: { point: { x: 10, y: 20 } } } }
const get = (i) => i % 2 ? a : b
 
let result = 0
for (let i = 0; i < 100_000; i++) {
  result = result + get(i).state.center.point.x }


// 2. 直接访问
const a = { x: 10, y: 20 }.x
const b = { x: 10, y: 20 }.x
const get = (i) => i % 2 ? a : b
 
let result = 0
for (let i = 0; i < 100_000; i++) {
  result = result + get(i) }
```

![比较结果](https://backblaze.cosine.ren/blog/bbe56a8907996f6554ab6f9e4f34cb57.webp)

## 5.避免缓存未命中

这一点需要一点底层知识，但即使在 JavaScript 中也有影响，所以我将解释一下。从 CPU 的角度来看，从 RAM 中获取内存的速度很慢。为了加快速度，它主要使用了两种优化方法。

### 5.1 预取（ Prefetching ）

第一种是预取：它会**提前获取更多内存**，希望这些内存是你感兴趣的。它总是猜测，如果你请求一个内存地址，你就会对紧随其后的内存区域感兴趣。因此，按顺序访问数据是关键。在下面的示例中，我们可以观察到按随机顺序访问内存的影响。

```javascript
// setup:
const K = 1024
const length = 1 * K * K
 
// 这些点是一个接一个地创建的，因此它们在内存中是按顺序分配的。
const points = new Array(length)
for (let i = 0; i < points.length; i++) {
  points[i] = { x: 42, y: 0 }
}
 
// 该数组包含与上相同的数据，但随机打乱。
const shuffledPoints = shuffle(points.slice())


// 1. 顺序的
let _ = 0
for (let i = 0; i < points.length; i++) { _ += points[i].x }


// 2. 随机的
let _ = 0
for (let i = 0; i < shuffledPoints.length; i++) { _ += shuffledPoints[i].x }
```

![比较对象](https://backblaze.cosine.ren/blog/5e913d0339a5d8e152f5f89ce817a61d.webp)

那我该怎么办呢？

将这一概念应用于实践可能是最困难的，因为 JavaScript 没有一种方法可以指定对象在内存中的位置，但你可以像上面的例子一样，利用这些知识来发挥优势，例如在重新排序或排序之前对数据进行操作。你不能假设按顺序创建的对象在一段时间后会保持在同一位置，因为垃圾回收器可能会移动它们。但有一个例外，那就是数字数组，最好是 `TypedArray` 实例：

> 有关更详细的示例，[请参阅此链接](https://mrale.ph/blog/2018/02/03/maybe-you-dont-need-rust-to-speed-up-your-js.html#optimizing-parsing---reducing-gc-pressure) *。
>
> * 请注意，它包含一些现已过时的优化，但总体上仍然准确。

---

> 译者注：\
> JavaScript 中的 [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 实例提供了一种高效的方式来处理二进制数据。与常规数组相比，TypedArray 不仅在内存使用上更高效，而且它们访问的是连续的内存区域，这使得它们在进行数据操作时可以实现更高的性能。这与预取的概念密切相关，因为处理连续的内存块通常比随机访问内存更快，尤其是在涉及大量数据时。
> 例如，如果你在处理大量数值数据，比如图像处理或科学计算，使用 Float32Array 或 Int32Array 等 TypedArray 可以让你获得更好的性能。由于这些数组直接操作内存，它们可以更快地读取和写入数据，尤其是在进行顺序访问时。这样做不仅减少了JavaScript运行时的开销，还可以利用现代CPU的预取和缓存机制来加速数据处理。

### 5.2 缓存在 L1/2/3

CPU 使用的第二种优化方式是 L1/L2/L3 缓存：这些缓存就像速度更快的 RAMs，但也更昂贵，因此它们的容量要小得多。它们包含 RAM 数据，但起到 LRU 缓存的作用。数据在 "hot"（正在处理）时进入，当新的工作数据需要空间时再写回主 RAM。因此，这里的关键是**使用尽可能少的数据，将工作数据集保留在快速缓存中**。在下面的示例中，我们可以观察到破坏每个连续缓存的效果。

```javascript
// setup:
const KB = 1024
const MB = 1024 * KB
 
// 这些是适合这些缓存的近似大小。如果您在计算机上没有得到相同的结果，可能是因为您的 sizes 不同。
const L1  = 256 * KB
const L2  =   5 * MB
const L3  =  18 * MB
const RAM =  32 * MB
 
// 我们将为所有测试用例访问相同的缓冲区，但我们只会访问第一个用例中的前 0 到 “L1” 条目，第二个用例中的 0 到 “L2” 条目，依此类推。
const buffer = new Int8Array(RAM)
buffer.fill(42)
 
const random = (max) => Math.floor(Math.random() * max)

// 1. L1
let r = 0; for (let i = 0; i < 100000; i++) { r += buffer[random(L1)] }

// 2. L2
let r = 0; for (let i = 0; i < 100000; i++) { r += buffer[random(L2)] }

// 3. L3
let r = 0; for (let i = 0; i < 100000; i++) { r += buffer[random(L3)] }

// 4. RAM
let r = 0; for (let i = 0; i < 100000; i++) { r += buffer[random(RAM)] }
```

![比较结果](https://backblaze.cosine.ren/blog/3e227b6a47b485c76c32bedef549cc15.webp)

那我该怎么办呢？

**无情地消除每一个可以消除的数据或内存分配**。数据集越小，程序运行的速度就越快。内存I/O是95%程序的瓶颈。另一个好的策略是将您的工作分成块（ chunks ），并确保您一次处理一个小数据集。

有关CPU和内存的更多详细信息，请参阅[此链接](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf)。

:::info

1. 关于不可变数据结构 —— 不可变性对于清晰性和正确性来说是很好的，但是在性能方面，更新不可变的数据结构意味着复制容器，这将导致更多的内存 I/O 刷新缓存。你应该尽可能避免不可变的数据结构。
2. 关于 `...` 扩展运算符 —— 它非常方便，但每次使用它都要在内存中创建一个新对象。更多的内存I/O，更慢的缓存！

:::

## 6.避免大型 Objects

如第 2 节所述，引擎使用 shapes 来优化对象。然而，当 shapes 变得太大时，引擎别无选择，只能使用常规的散列表（如 Map 对象）。正如我们在第 5 节中看到的，缓存未命中会显著降低性能。散列表很容易出现这种情况，因为它们的数据通常是随机的 & 均匀地分布在它们所占用的内存区域中。让我们看看这个通过用户 ID 索引的用户映射是如何表现的。

```javascript
// setup:
const USERS_LENGTH = 1_000

// setup:
const byId = {}
Array.from({ length: USERS_LENGTH }).forEach((_, id) => {
  byId[id] = { id, name: 'John'}
})
let _ = 0

// 1. [] access
Object.keys(byId).forEach(id => { _ += byId[id].id })

// 2. direct access
Object.values(byId).forEach(user => { _ += user.id })
```

![比较对象](https://backblaze.cosine.ren/blog/b3ee78ee0d6e5b47cc270cc06eaae257.webp)

我们还可以观察到性能如何随着对象大小的增加而不断下降：

```javascript
// setup:
const USERS_LENGTH = 100_000
```

![比较对象](https://backblaze.cosine.ren/blog/d90731746929a83825840d8738c22732.webp)

那我该怎么办呢？

如上所述，应避免频繁对大型对象进行索引。最好事先将对象转化为数组。将 ID 组织在模型上可以帮助您组织数据，因为您可以使用 `Object.values()` ，而不必引用键映射来获取 ID。

## 7.使用 eval

有些 JavaScript 模式很难针对引擎进行优化，而通过使用 eval() 或其衍生工具，你可以让这些模式消失。在本例中，我们可以观察到使用 eval() 如何避免了使用动态对象键创建对象的成本：

```javascript
// setup:
const key = 'requestId'
const values = Array.from({ length: 100_000 }).fill(42)
// 1. without eval
function createMessages(key, values) {
  const messages = []
  for (let i = 0; i < values.length; i++) {
    messages.push({ [key]: values[i] })
  }
  return messages
}
 
createMessages(key, values)


// 2. with eval
function createMessages(key, values) {
  const messages = []
  const createMessage = new Function('value',
    `return { ${JSON.stringify(key)}: value }`
  )
  for (let i = 0; i < values.length; i++) {
    messages.push(createMessage(values[i]))
  }
  return messages
}
 
createMessages(key, values)
```

![比较结果](https://backblaze.cosine.ren/blog/0ff31af6a224188f0b6d07af18cbf704.webp)

> 译者注：\
> 在使用 eval 的版本中（通过 Function 构造函数实现），示例首先创建了一个函数，该函数动态生成一个具有动态键和给定值的对象。然后，这个函数在循环中被调用以创建消息数组。这种方式通过预先编译生成对象的函数，减少了运行时的计算和对象创建开销。
> 虽然使用 eval 和 Function 构造函数可以避免某些运行时开销，但它们也引入了潜在的安全风险，因为它们可以执行任意代码。此外，动态评估的代码可能难以调试和优化，因为它在运行时生成，JavaScript 引擎可能无法提前进行有效的优化。
> 因此，虽然这个例子展示了一种性能优化技巧，但在实际应用中，推荐寻找其他方法来优化性能，同时保持代码的安全性和可维护性。在大多数情况下，避免大量动态对象创建的需求，通过**静态分析和重构代码**来提高性能，会是更好的选择。

eval 的另一个很好的用例是编译一个过滤谓词函数，在这个函数中，你可以丢弃那些你知道永远不会被执行的分支。一般来说，任何要在一个非常热的循环中运行的函数都适合进行这种优化。

显然，关于 eval() 的常见警告也适用：不要相信用户输入，对传递到 eval() 代码中的任何内容进行清理，不要产生任何 XSS 可能性。还要注意的是，有些环境不允许访问 eval()，例如带有 CSP 的浏览器页面。

## 8.小心使用字符串

我们已经在上面看到了字符串比它们看起来更昂贵。好吧，我这里有一个好消息和一个坏消息，我将按照唯一的逻辑顺序宣布（先坏，后好）：字符串比它们表面看起来更复杂，但它们也可以非常高效地使用。

字符串操作因其上下文而成为 JavaScript 的核心部分。为了优化大量使用字符串的代码，引擎必须具有创造力。我的意思是，他们必须根据使用情况，用 C++ 中的多种字符串表示法来表示字符串对象。有两种一般情况值得您担心，因为它们适用于 V8（迄今为止最常见的引擎），一般也适用于其他引擎。

首先，使用 `+` 连接的字符串**不会创建两个输入字符串的副本**。该操作创建指向每个子字符串的指针。如果是 typescript 的话，应该是这样的：

```typescript
class String {
  abstract value(): char[] {}
}
 
class BytesString {
  constructor(bytes: char[]) {
    this.bytes = bytes
  }
  value() {
    return this.bytes
  }
}
 
class ConcatenatedString {
  constructor(left: String, right: String) {
    this.left = left
    this.right = right
  }
  value() {
    return [...this.left.value(), ...this.right.value()]
  }
}
 
function concat(left, right) {
  return new ConcatenatedString(left, right)
}
 
const first = new BytesString(['H', 'e', 'l', 'l', 'o', ' '])
const second = new BytesString(['w', 'o', 'r', 'l', 'd'])
 
// 看吧，没有数组副本！
const message = concat(first, second)
```

其次，字符串切片（ string slices ）也不需要创建副本：它们可以简单地指向另一个字符串中的范围。继续上面的例子：

```typescript
class SlicedString {
  constructor(source: String, start: number, end: number) {
    this.source = source
    this.start = start
    this.end = end
  }
  value() {
    return this.source.value().slice(this.start, this.end)
  }
}
 
function substring(source, start, end) {
  return new SlicedString(source, start, end)
}
 
// This represents "He", but it still contains no array copies.
// It's a SlicedString to a ConcatenatedString to two BytesString
const firstTwoLetters = substring(message, 0, 2)
```

但问题是：一旦你需要开始改变这些字节，那就是你开始付出拷贝代价的时刻。假设我们回到我们的 String 类，并尝试添加一个 .trimEnd 方法：

```typescript
class String {
  abstract value(): char[] {}
 
  trimEnd() {
    // `.value()` 这里可能调用我们的 Sliced->Concatenated->2*Bytes 字符串！
    const bytes = this.value()
 
    const result = bytes.slice()
    while (result[result.length - 1] === ' ')
      result.pop()
    return new BytesString(result)
  }
}
```

因此，让我们跳转到一个例子，在这个例子中，比较使用突变操作（ mutation ）和只使用串联操作（ concatenation ）：

```typescript
// setup:
const classNames = ['primary', 'selected', 'active', 'medium']

// 1. mutation
const result =
  classNames
    .map(c => `button--${c}`)
    .join(' ')

// 2. concatenation
const result =
  classNames
    .map(c => 'button--' + c)
    .reduce((acc, c) => acc + ' ' + c, '')
```

![比较对象](https://backblaze.cosine.ren/blog/300a287bce93d62bfe7b9ac6e9bf9fe9.webp)

那么我该怎么办呢？

一般来说，尽最大可能避免突变。这包括 `.trim()` 、`.replace()` 等方法。请考虑如何避免使用这些方法。在某些引擎中，字符串模板也可能比 `+` 慢。目前在 V8 中就是这种情况，但将来可能不会，所以还是要以基准为依据。

关于上面的 `SlicedString` 需要注意的是，如果一个大字符串的小子串还存在内存中，可能会妨碍垃圾回收器收集大字符串！所以如果您**处理大文本并从中提取小字符串，可能会泄漏大量内存。**

```javascript
const large = Array.from({ length: 10_000 }).map(() => 'string').join('')
const small = large.slice(0, 50)
//    ^ will keep  alive
```

这里的解决方案是使用对我们有利的突变方法。如果我们在 small 上使用其中一种方法，它将强制复制，而指向 large 的旧指针就会丢失：

```javascript
// replace a token that doesn't exist
const small = small.replace('#'.repeat(small.length + 1), '')
```

有关更多详细信息，请参见 [V8 上的 string. h](https://github.com/v8/v8/blob/main/src/objects/string.h) 或 [JavaScriptCore 上的 JSString. h](https://github.com/WebKit/WebKit/blob/main/Source/JavaScriptCore/runtime/JSString.h)。

:::info
关于字符串复杂性 —— 我快速浏览了一些东西，但还是有很多实现细节增加了字符串的复杂性。每种字符串表示法通常都有最小长度。例如，对于非常小的字符串，可能不会使用连接字符串。有时也有限制，例如避免指向子串的子串。阅读上面链接的 C++ 文件，即使只是阅读注释，也能很好地了解实现细节。
:::

## 9.进行专业化（ _specialization_ ）

性能优化的一个重要概念是专业化（ _specialization_ ）：**调整逻辑以适应特定用例的限制**。这通常意味着要弄清哪些情况_可能_会发生，并针对这些情况进行编码。

假设我们是一个有时需要在产品列表中添加标签的商家。根据经验，我们知道标签通常是空的。了解了这些信息，我们就可以针对这种情况专门设计我们的函数：

```javascript
// setup:
const descriptions = ['apples', 'oranges', 'bananas', 'seven']
const someTags = {
  apples: '::promotion::',
}
const noTags = {}
 
// 将产品转化为字符串，如果适用的话还包括其标签
function productsToString(description, tags) {
  let result = ''
  description.forEach(product => {
    result += product
    if (tags[product]) result += tags[product]
    result += ', '
  })
  return result
}
 
// Specialize it now
function productsToStringSpecialized(description, tags) {
  // 我们知道 `tags` 很可能是空的，所以我们提前检查一次，然后就可以从内循环中移除 `if` 检查了
  if (isEmpty(tags)) {
    let result = ''
    description.forEach(product => {
      result += product + ', '
    })
    return result
  } else {
    let result = ''
    description.forEach(product => {
      result += product
      if (tags[product]) result += tags[product]
      result += ', '
    })
    return result
  }
}
function isEmpty(o) { for (let _ in o) { return false } return true }
 
// 1. not specialized
for (let i = 0; i < 100; i++) {
  productsToString(descriptions, someTags)
  productsToString(descriptions, noTags)
  productsToString(descriptions, noTags)
  productsToString(descriptions, noTags)
  productsToString(descriptions, noTags)
}


// 2. specialized
for (let i = 0; i < 100; i++) {
  productsToStringSpecialized(descriptions, someTags)
  productsToStringSpecialized(descriptions, noTags)
  productsToStringSpecialized(descriptions, noTags)
  productsToStringSpecialized(descriptions, noTags)
  productsToStringSpecialized(descriptions, noTags)
}
```

![比较结果](https://backblaze.cosine.ren/blog/76411a4f839bb018073e5960f6f43da1.webp)

这种优化可以为你带来适度的改进，但这些改进会累积起来。它们是对更重要的优化（如 shapes 和内存 I/O ）的一个很好的补充。但要注意的是，如果你的条件发生变化，专业化可能会对你不利，所以在应用时一定要小心。

:::info
分支预测和无分支预测代码 —— 从代码中移除分支可以极大地提高性能。有关分支预测器的更多详情，请阅读 stackoverflow 的经典回答：[为什么处理排序数组更快？](https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array)
:::

## 10. 数据结构

关于数据结构的细节，我就不多说了，因为这需要单独写一篇文章。但请注意，使用不正确的数据结构对您的用例造成的影响**可能比上述任何优化都要大**。我建议您熟悉 Map 和 Set 等本地数据结构，并了解链表、优先队列、树（RB 和 B+）和 tries。

但是作为一个快速的例子，让我们比较一下 `Array.includes` 和 `Set.has` 在一个小列表中的表现：

```javascript
// setup:
const userIds = Array.from({ length: 1_000 }).map((_, i) => i)
const adminIdsArray = userIds.slice(0, 10)
const adminIdsSet = new Set(adminIdsArray)
// 1. Array
let _ = 0
for (let i = 0; i < userIds.length; i++) {
  if (adminIdsArray.includes(userIds[i])) { _ += 1 }
}
// 2. Set
let _ = 0
for (let i = 0; i < userIds.length; i++) {
  if (adminIdsSet.has(userIds[i])) { _ += 1 }
}
```

![比较结果](https://backblaze.cosine.ren/blog/d7a10f42c6544835c03ea64b40756af2.webp)

正如你所看到的，数据结构的选择会产生非常大的影响。

作为一个真实的例子，我曾遇到过这样一个场景：通过将数组换成链表，我们[将一个函数的运行时间从 5 秒缩短到了 22 毫秒](https://github.com/mui/mui-x/pull/9200)。

## 11.基准测试（ Benchmarking ）

我把这一部分留到最后，原因只有一个：我需要通过上面有趣的部分建立可信度。现在，我已经掌握了它（希望如此），让我告诉你们，基准测试是优化工作中最重要的部分。它不仅最重要，而且也很难。即使有了 20 年的经验，我有时仍然会创建有缺陷的基准测试，或者错误地使用分析工具。因此，无论如何，请尽最大努力正确创建基准测试。

### 11.0 自顶向下

你的首要任务始终应该是优化**占运行时间最大部分的函数/代码段**。如果你把时间花在优化最重要的部分之外，那就是在浪费时间。

### 11.1 避免微基准（ micro-benchmarks ）

在生产模式下运行代码，并根据这些观察结果进行优化。JS 引擎非常复杂，在微基准测试中的表现往往不同于实际应用场景。例如，看看这个微基准测试：

```javascript
const a = { type: 'div', count: 5, }
const b = { type: 'span', count: 10 }
 
function typeEquals(a, b) {
  return a.type === b.type
}
 
for (let i = 0; i < 100_000; i++) {
  typeEquals(a, b)
}
```

如果你稍加留意，就会发现引擎会将形状 `{ type: string, count: number }` 的函数特殊化。但在实际应用中，这是否成立呢？a 和 b 是否总是这种形状，还是会收到任何形状？如果您在生产过程中会收到很多形状，那么这个函数的行为就会有所不同。

### 11.2 怀疑你的结果

如果你刚刚优化了一个函数，而它现在的运行速度比以前快了 100 倍，那就怀疑它。试着推翻你的结果，试着在生产模式下运行，对它进行压力测试 。同样，也要怀疑你的工具。仅仅使用 devtools 观察基准测试就能改变其行为。

### 11.3 选择您的目标

不同的引擎对某些模式的优化效果有好有坏。您应该针对与您相关的引擎制定基准测试，并**优先考虑哪个引擎更重要**。这是 Babel 中的一个[实际例子](https://github.com/babel/babel/pull/16357)，在这个例子中，提高 V8 意味着降低 JSC 的性能。

## 12.分析和工具

关于分析和开发工具的各种讨论。

### 12.1 浏览器陷阱

如果您在浏览器中进行分析，请确保您使用的浏览器配置文件是干净、空白的。为此，我甚至会使用单独的浏览器。如果您在进行分析时启用了浏览器扩展，它们会扰乱测量结果。特别是 **React devtools** 会显著影响结果，使得代码的渲染速度看起来比实际上呈现给用户的要慢。

### 12.2 Sample vs Structural 分析

浏览器的性能分析工具是基于采样的分析器，它们会定期对你的调用堆栈进行采样。这有一个很大的缺点：一些非常小且频繁被调用的函数可能在这些采样间隙中被调用，而在你看到的堆栈图表中可能会被严重低报。使用 Firefox devtools 自定义采样间隔或使用具有 CPU 节流功能的 Chrome devtools 来缓解此问题。

### 12.3 性能优化中的常用工具

除了常规的浏览器 devtools 外，了解这些设置选项可能会有所帮助：

* Chrome devtools 中有许多实验标志，可以帮助你找出速度慢的原因。当你需要调试浏览器中的样式/布局重新计算时，样式失效跟踪器非常有用。
  <https://github.com/iamakulov/devtools-perf-features>
* deoptexplorer-vscode 扩展允许你加载 V8/chromium 的日志文件，以理解你的代码何时触发去优化，当你向函数传递不同 shapes 时。你不需要这个扩展就能阅读日志文件，但它让体验变得更加愉快。
  <https://github.com/microsoft/deoptexplorer-vscode>
* 你也可以为每个 JS 引擎编译 debug shell ，以更详细地了解它是如何工作的。这样就可以运行 perf 和其他底层工具，还可以检查每个引擎生成的字节码和机器码。
 [V8 示例](https://mrale.ph/blog/2018/02/03/maybe-you-dont-need-rust-to-speed-up-your-js.html#getting-the-code) | [JSC 示例](https://zon8.re/posts/jsc-internals-part1-tracing-js-source-to-bytecode/) | SpiderMonkey 示例（缺失）

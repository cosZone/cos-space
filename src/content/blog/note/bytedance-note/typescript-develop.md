---
title: 青训营 |「TypeScript入门」笔记
link: note/front-end/bytedance-note/typescript-introduction
catalog: true
date: 2022-01-28 14:30:17
subtitle: 这节课老师讲了TypeScript的用处与基本语法、高级类型的应用、类型保护与类型守卫
# sticky: true
lang: cn
tags:
- 前端
- TypeScript
categories:
- [笔记, 青训营笔记]
---

这节课老师讲了TypeScript的用处与基本语法、高级类型的应用、类型保护与类型守卫

# 什么是TypeScript

## 发展历史

- 2012-10：微软发布了TypeScript第一个版本(0.8)
- 2014-10：Angular 发布了基于TypeScript的2.0版本
- 2015-04：微软发布了Visual Studio Code
- 2016-05：@ ty pes/react发布，TypeScript 可开发React
- 2020-09：Vue 发布了3.0 版本，官方支持TypeScript
- 2021-11：v4.5版本发布

## 为什么是TypeScript

![image.png](https://backblaze.cosine.ren/juejin/ab0c1101077f402f8afd8be753442b84~tplv-k3u1fbpfcp-watermark.png)

**动态类型**在**执行过程中**进行类型的匹配，js的弱类型会在执行时进行隐式类型转换，而在静态类型中则不然

TypeScript则为**静态类型**：java、c/c++等

- **可读性增强**：基于语法解析TSDoc，ide增强
- 可维护性增强：**在编译阶段暴露大部分错误**
- 多人合作的大型项目中，可以获得更好的稳定性和开发效率

TypeScript是**JS的超集**

- 包含于兼容所有Js特性， 支持**共存**
- 支持**渐进式引入与升级**

# 基本语法

## 基本数据类型

js ==> ts

![image.png](https://backblaze.cosine.ren/juejin/3ae63f86172341e893293665ce701678~tplv-k3u1fbpfcp-watermark.png)

可以看到，ts的类型定义方式：`let 变量名: 类型 = 值;`

[TypeScript基础类型](https://www.tslang.cn/docs/handbook/basic-types.html)

## 对象类型

[接口 · TypeScript中文网](https://www.tslang.cn/docs/handbook/interfaces.html)

```ts
// 创建一个对象，包括以下属性，类型为IBytedancer
// I表示自定义的一个类型（一个命名约定），与类和对象进行区分
const bytedancer: IBytedancer = {
    jobId: 9303245,
    name: 'Lin',
    sex: 'man',
    age: 28,
    hobby: 'swimming',
}
// 定义一个类型为IBytedancer
interface IBytedancer {
 /* 只读属性readonly:约束属性不可在对象初始化外赋值 */
 readonly jobId: number;
    name: string;
    sex: 'man' | 'woman' | 'other';
    age: number;
    /* 可选属性:定义该属性可以不存在 */
    hobby?: string;
    /* 任意属性:约束所有对象属性都必须是该属性的子类型 */
    [key: string]: any; // any 任何类型
}
/* 报错:无法分配到"jobId"，因为它是只读属性 */
bytedancer. jobId = 12345;
/* 成功:任意属性标注下可以添加任意属性 */
bytedancer .plateform = 'data';
/* 报错:缺少属性"name", 而hobby可缺省 */
const bytedancer2: IBytedancer = {
    jobId: 89757,
    sex: "woman",
    age: 18,
}
```

## 函数类型

js：

```js
function add(x, y!) {
 return x + y;
}
const mult = (x, y) =>  x * y;
```

ts：[函数 · TypeScript中文网](https://www.tslang.cn/docs/handbook/functions.html)

```ts
function add(x: number, y: number): number {
 return x + y;
}
const mult: (x: number, y: number) => number = (x, y) => x * y;
// 简化写法，定义接口IMult
interface IMult {
 (x: number, y: number): number ;
}
const mult: IMult = (x, y) => x * y;
```

可以看到，格式为`function 函数名（参数:类型...）:返回值类型`

## 函数重载

```ts
/* 对getDate函数进行重载，timestamp为可缺省参数 */
function getDate(type: 'string', timestamp?: string): string;
function getDate(type: 'date', timestamp?: string): Date;
function getDate(type: 'string' | 'date', timestamp?: string): Date | string {
    const date = new Date(timestamp);
    return type === 'string' ? date.toLocaleString() : date;
};
const x = getDate('date'); // x: Date
const y = getDate('string', '2018-01-10'); // y: string
```

简化形式如下：

```ts
interface IGetDate {
 (type : 'string', timestamp ?: string): string; // 这个地方返回类型改为any就可以通过了
 (type : 'date', timestamp?: string): Date;
 (type: 'string' | 'date', timestamp?: string): Date | string;
}
/* 报错：不能将类型"(type: any, timestamp: any) => string | Date"分配给类型"IGetDate"。
 不能将类型"string | Date" 分配给类型"string"。
 不能将类型 "Date"分配给类型"string"。ts(2322) */
const getDate2: IGetDate = (type, timestamp) => {
 const date = new Date( timestamp) ; 
 return type === 'string' ? date.toLocaleString() : date;
}
```

## 数组类型

**type**作用就是给类型起一个新名字，**相当于c++中的typedef**

```ts
/* 「类型+方括号」表示 */
type IArr1 = number[];
/* 泛型表示 这两种最常用*/ 
type IArr2 = Array<string | number| Record<string, number> > ;
/* 元组表示 */
type IArr3 = [number, number, string, string];
/* 接口表示 */
interface IArr4 {
 [key: number]: any;
}

const arrl: IArr1 = [1, 2, 3, 4, 5, 6];
const arr2: IArr2 = [1, 2, '3', '4', { a: 1 }];
const arr3: IArr3 = [1, 2, '3', '4'];
const arr4: IArr4 = ['string', () => null, {}, []];
```

## TypeScript补充类型

- **空类型**：表示**无赋值**
- **任意类型**：是**所有类型的子类型**
- **枚举类型**：支持枚举值到枚举名的**正、反向映射**

```ts
/* 空类型，表示无赋值 */
type IEmptyFunction = () => void;
/* 任意类型，是所有类型的子类型 */
type IAnyType = any;
/* 枚举类型:支持枚举值到枚举名的正、反向映射 */
enum EnumExample {
    add = '+',
 mult = '*',
}
EnumExample['add'] === '+';
EnumExample['+'] === 'add';
enum ECorlor { Mon, Tue, Wed, Thu, Fri, Sat, Sun };
ECorlor['Mon'] === 0;
ECorlor[0] === 'Mon' ;
/*泛型*/
type INumArr = Array<number>;
```

## Typescript泛型

**泛型**，之前学过c++的话dddd，跟c++中的差不多：**不预先指定具体的类型，而在使用的时候再指定类型**的一种特性

```js
function getRepeatArr(target) {
 return new Array(100).fill(target); 
}
type IGetRepeatArr = (target: any) => any[];
/* 不预先指定具体的类型，而在使用的时候再指定类型的一种特性 */
type IGetRepeatArrR = <T>(target: T) => T[];
```

泛型还可以使用在以下场景中：

```ts
/*泛型接口&多泛型*/
interface IX<T, U> {
 key: T;
 val: U;
}
/* 泛型类 */
class IMan<T> {
 instance: T;
}
/* 泛型别名 */
type ITypeArr<T> = Array<T>;
```

泛型还可以进行约束**范围**

```ts
/* 泛型约束:限制泛型必须符合字符串 */
type IGetRepeatStringArr = <T extends string>(target: T) => T[];
const getStrArr: IGetRepeatStringArr = target => new Array(100).fill(target);
/* 报错:类型"number"的参数不能赋给类型“string"的参数 */
getStrArr(123) ;

/* 泛型参数默认类型 */
type IGetRepeatArr<T = number> = (target: T) => T[];// 与结构中的默认赋值有点类似
const getRepeatArr: IGetRepeatArr = target => new Array(100).fill(target);// 这里的IGetRepeatArr就是一个类型别名，此处没有传参数给这个类型别名
/* 报错:类型"string"的参数不能赋给类型“numbe r"的参数 */
getRepeatArr('123');
```

## 类型别名 & 类型断言

> ### 类型断言
>
> 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
>
> 通过*类型断言* 这种方式可以**告诉编译器，“相信我，我知道自己在干什么”**。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。
>
> ```ts
> let someValue: any = "this is a string";
> 
> let strLength: number = (someValue as string).length;
> ```
>
> [基础类型 · TypeScript中文网](https://www.tslang.cn/docs/handbook/basic-types.html)

````js
/*通过type关键字定义了IObjArr的别名类型*/
type IObjArr = Array<{
 key: string;
 [objKey: string]: any;
}>
function keyBy<T extends IObjArr>(objArr: Array<T>) {
 /* 未指定类型时，result类型为{} */
 const result = objArr.reduce((res, val, key) => {
  res[key] = val;
  return res;
 }, {});
    /* 通过as关键字，断言result类型为正确类型 */
    return result as Record<string, T> ; 
}
````

上述代码，中有几个点需注意：

> [reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 函数对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。
>
> 语法：`arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

## 字符串/数字 字面量

```js
/* 允许指定字符 串/数字必须的固定值*/
/* IDomTag必须为html、body、div、 span中的其一*/
type IDomTag = 'html' | ' body' | 'div' | 'span';
/* IOddNumber必须为1、 3、5、7、9中的其一 */
type IOddNumber = 1 | 3 | 5 | 7 | 9;
```

# 高级类型

## 联合/交叉类型

为书籍列表编写类型 -> ts类型声明繁琐存在较多重复。[高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)

```ts
const bookList = [ { // 普通js
 author:'xiaoming',
    type:'history',
    range: '2001 -2021',
}, {
    author:'xiaoli',
    type:'Story',
    theme:'love',
}] 
// ts 繁琐
interface IHistoryBook {
    author:String;
    type:String;
    range:String
}
interface IStoryBook { 
    author:String;
    type:String;
    theme:String;
}
type IBookList = Array<IHistoryBook | IStoryBook>;
```

- 联合类型: **IA | IB;** 联合类型表示一个值可以是**几种类型之一**
- 交叉类型: **IA & IB;** 多种类型**叠加**到一起成为一种类型，它包含了所需的所有类型的特性

上述代码可以通过ts简化为：

```ts
type IBookList = Array<{
 author: string;
} & ({
 type: 'history';
 range: string;
} | {
 type: 'story';
 theme: string;
})>; 
/* 限制了author只能为string类型，而type只能'history'/'story'二选一，并且type不同可能的属性不同 */
```

## 类型保护与类型守卫

- 访问联合类型时，处于程序安全，**仅能访问联合类型中的交集部分**

```ts
interface IA { a: 1, a1: 2 }
interface IB { b: 1, b1: 2 }
function log(arg: IA | IB) {
    /*报错:类型"IA | IB" 上不存在属性"a”。 类型"IB"上不存在属性"a"
    结论:访问联合类型时，处于程序安全，仅能访问联合类型中的交集部分*/

 if(arg.a) {
        console.log(arg.a1);
    } else {
        console.log(arg.b1);
    }
}
```

上述报错可通过类型守卫解决：定义一个**函数**，其**返回值**是一个**类型谓词**，**生效范围为子作用域**

```ts
interface IA { a: 1, a1: 2 }
interface IB { b: 1, b1: 2 }

/*类型守卫:定义一个函数，。它的返回值是一个类型谓词，生效范围为子作用域 */
function getIsIA(arg: IA | IB): arg is IA {
    return !!(arg as IA).a;
}
function log2(arg: IA | IB) {
    /* 不存在报错了 */
 if(getIsIA(arg) ) {
        console.log(arg.a1);
    } else {
        console.log(arg.b1);
    }
}
```

或者typeof和instance判断

```ts
// 实现函数reverse 可将数组或字符串进行反转
function reverse(target: string | Array<any>) {
 /* typof 类型保护*/
    if (typeof target === 'string') {
       return target.split('').reverse().join('');
    }
    /* instance 类型保护*/
    if (target instanceof Object) {
        return target.reverse() ;
    }
}
```

不会每次都这么麻烦吧，事实上，只有**当两个类型没有任何重合点的话**才需要类型守卫，如上述的书本例子，可以进行**自动类型推断。**

```tsx
// 实现函数logBook类型
// 函数接受书本类型，并logger出相关特征
function logBook(book: IBookItem) {
 // 联合类型+类型保护=自动类型推断
 if (book.type === 'history'){
  console.log(book.range)
    } else{
        console.log book.theme);
    }
}
```

再来看一个case，实现一个子集不污染的合并函数merge，将sourceObj合并到targetObj中，**sourceObj必须为targetObj的子集**

```js
function merge1(sourceObj, targetObj) { // js中，实现复杂，这样才能不污染
    const result = { ...sourceObj };
    for(let key in targetObj) {
        const itemVal = sourceObj[key];
        itemVal && ( result[key] = itemVal );
    }
    return result;
}
function merge2(sourceObj, targetObj) {// 若这两个入参的类型没问题，则可以这样
    return { ...sourceObj, ...targetObj };
}
```

而一种简单的思想就是在ts中编写两个类型，进行判断，但这样又会存在实现繁琐，增加target需要source联动去除，重复维护了两份x、y

```ts
interface ISource0bj { 
    x?: string; 
    y?: string; 
}
interface ITarget0bf {
    x: string;
    y: string;
}
type IMerge = (source0bj: ISource0bj, target0bj: ITarget0bj) => ITargetObj;
/* 类型实现繁琐:若obj类型较为复杂，则声明source和target便需要大量重复2遍
容易出错:若target增加/减少key,则需要source联动去除 */
```

通过泛型，改进，这里涉及到几个个知识点

> - Partial：一个常见的任务是将一个已知的类型每个属性都变为可选的
>
> TypeScript提供了从旧类型中创建新类型的一种方式——**映射类型**。 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 （直接写就行，ts内置了）
>
> - 关键字**keyof**，其**相当于取值对象中的所有key组成的字符串字面量**
> - 关键字**in**，其相当于取值字符串字面量中的一种可能，**配合泛型P， 即表示每个key**
> - 关键字 **?** ，通过**设定对象可选选项**，即可自动推导出子集类型

```ts
interface IMerge {
    <T extends Record<string, any>>(sourceObj: Partial<T>, targetObj: T): T;
}
// Partial内部实现
type IPartial<T extends Record<string, any>> = {
            [P in keyof T]?:T[P];
}
// 索引类型:关键字[keyof] ，其相当于取值对象中的所有key组成的字符串字面量，如
type IKeys = keyof{a: string; b: number }; // => type IKeys ="a" | "b"
// 关键字[in]，其相当于取值 字符串字面量中的一种可能，配合泛型P， 即表示每个key 
// 关键字[ ? ]，通过设定对象 可选选项，即可自动推导出子集类型
```

## 函数返回值类型

函数返回值类型在定义时候是不明确的，也应该通过泛型进行表达

下文代码delayCall接受一个函数作为入参，其实现延迟1s运行函数func，其返回promise，结果为入参函数的返回结果

```js
// 如何实现函数delayCall的类型声明
// delayCall接受一个函数作为入参，其实现延迟1s运行函数
// 其返回promise，结果为入参函数的返回结果
function delayCall(func) {
    return new Promisd(resolve => {
        setTimeout(() => {
            const result= func );
            resolve(result);
        },1000);
    });
}
```

- 关键字 **extends** **跟随泛型出现时，表示类型推断**，其表达可**类比三元表达式**

  - 如`T === 判断类型?类型A:类型B`  ->  `T extends 判断类型?类型A:类型B`

- 关键字 **infer** 出现在类型推荐中，表示**定义类型变量**，可以用于**指代类型**

  > [infer](https://jkchao.github.io/typescript-book-chinese/tips/infer.html#介绍) 简单示例如下：
  >
  > ```ts
  > type ParamType<T> = T extends (...args: infer P) => any ? P : T;
  > ```
  >
  > 在这个条件语句 `T extends (...args: infer P) => any ? P : T` 中，`infer P` 表示待推断的函数参数。
  >
  > 整句表示为：如果 `T` 能赋值给 `(...args: infer P) => any`，则结果是 `(...args: infer P) => any` 类型中的参数 `P`，否则返回为 `T`。

  - 在这里就相当于把这个函数返回值类型指代为R

```ts
type IDelayCall= <T extends () => any>(func: T) => ReturnType<T>;
type IReturnType<T extends (...args: any) => any> = T extends(...args: any ) => inferR ? R : any
    
// 关键字[extends] 跟随泛型出现时，表示类型推断，其表达可类比三元表达式
// 如T === 判断类型?类型A:类型B
// 关键字[infer] 出现在类型推荐中，表示定义类型变量，可以用于指代类型
// 如该场景下，将函数的返回值类型作为变量，使用新泛型R表示，使用在类型推荐命中的结果中
```

# 工程应用

## TypeScript工程应用——Web

1. **配置webapack loader**相关配置
2. **配置tsconfig.js**文件（宽松——严格，都可以定义）
3. 运行webpack**启动/ 打包**
4. loader处理ts文件时， **会进行编译与类型检查**

相关loader：

1. [awesome-typescript-loader](https://www.npmjs.com/package/awesome-typescript-loader)
2. or [babel-loader](https://www.npmjs.com/package/babel-loader)

## TypeScript工程应用——Node

使用TSC编译

1. 安装Node与npm
2. 配置tsconfig.js文件
3. 使用npm安装tsc
4. 使用tsc运行编译得到js文件

![image.png](https://backblaze.cosine.ren/juejin/56049af605644fb9907feedd9ee14fae~tplv-k3u1fbpfcp-watermark.png)

# 总结感想

这节课老师讲了TypeScript的用处与基本语法、和JS的对比、高级类型的应用，后续也深入讲了一下类型保护与类型守卫，在最后总结了TypeScript如何在工程中进行应用。TypeScript作为JS的一个超集，他增加了类型检查的功能，可以在编译阶段就将代码中的错误暴露出来，这是js这类动态类型所不具备的，在多人合作的大型项目中，使用TS往往可以获得更好的稳定性和开发效率。

> 本文引用的大部分内容来自林皇老师的课以及ts官方文档~

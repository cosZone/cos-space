---
title: 深入JavaScript学习之路（一）对象、类与面向对象编程
link: js-learning-1
catalog: true
subtitle: 红宝书读书笔记 第八章 p205
date: 2022-03-14 16:50:52
cover: img/header_img/galaxy-ngc-3190-wallpaper-for-2880x1800-60-653.jpg
sticky: true
tags:
- 前端
- JavaScript
categories:
- [笔记, 前端, JavaScript]
---
理解对象及其创建过程、ES6语法糖，原型模式、构造函数

理解原型链、盗用构造函数、组合式继承以及最佳实践等
<!-- more -->
# 理解对象
>
> ECMA-262将对象定义为**一组属性的无序集合**，每个属性或方法都有一个名称来表示，可将其想象为一张**散列表**，值可以为数据/函数

- 例1

```js
// 使用 new Object() 进行创建
let person = new Object();
person.name = "cosine";
person.age = 29
person.job = "Software Engineer"; 
person.sayName = function() { 
 console.log(this.name); 
}; 
// 使用对象字面量创建
let person = {
  name: 'cosine',
  age: 29, 
  job: "Software Engineer", 
  sayName() { 
    console.log(this.name); 
  }
}
```

以上两种对象是等价的，其属性和方法都一样
可以思考一下： **new 的过程中做了什么？** 后面也会提到

## 属性类型

ECMA-262 使用一些内部特性来描述属性的特征。这些特性是由为 JavaScript 实现引擎的规范定义的。因此，开发者不能在 JavaScript 中直接访问这些特性。为了将某个特性标识为内部特性，规范会用**两个中括号**把特性的名称括起来，比如`[[Enumerable]]`
属性分两种：**数据属性**和 **访问器属性**

### 数据属性

包含一个**保存数据值**的位置。值会从这个位置读取，也会写入到这个位置。数据属性有 4 个特性描述它们的行为

- `[[Configurable]]` 可配置
 	- 表示属性是否可以通过  `delete` **删除**并**重新定义**
 	- 是否可以**修改**它的特性
 	- 是否可以把它**改为访问器属性**
 	- 默认情况下，所有**直接定义**在对象上的属性的这个特性都是 `true`
- `[[Enumerable]]`  可枚举
 	- 表示属性是否可以通过 `for-in` 循环返回
 	- 默认： `true`
- `[[Writable]]`  可写
 	- 表示属性的值**是否可以被修改**
 	- 默认： `true`
- `[[Value]]`  可写
 	- 包含属性**实际的值**
 	- 这就是前面提到的那个**读取和写入属性值的位置**
 	- 默认： `undefined`

在像前面例子中那样将属性显式添加到对象之后，`[[Configurable]]`、`[[Enumerable]]` 和 `[[Writable]]`都会被设置为 true，而 `[[Value]]` 特性会被设置为指定的值。

#### Object.defineProperty()方法

要修改属性的默认特性，就必须使用  [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法。这个方法接收 3 个参数：

- `obj` 待添加属性的**对象**
- `prop` 待定义或修改的**属性名称**或 **Symbol**
- `descriptor` 要定义或修改的**属性描述符**

设置方法如下例

```js
// Object.defineProperty()设置属性
let person = {};
Object.defineProperty(person, "name", {
  writable: false,    // 看这儿！ 不可修改
  value: "cosine"
});
console.log(person.name); // cosine
person.name = "NaHCOx";   // 试图修改 
console.log(person.name); // 修改无效 print: cosine 
```

创建了一个名为 `name` 的属性并给它赋予了一个**只读**的值，则这个属性的值不能修改了

- **非严格模式**下，尝试给这个属性重新赋值会被**忽略**。
- **严格模式**下，尝试修改只读属性的值会**抛出错误**

类似的规则也适用于创建**不可配置**的属性
把 `configurable` 设置为 `false`，意味着这个属性**不能从对象上删除**。

注意：**一个属性被定义为不可配置之后，就不能再变回可配置的了！！**
> 再次调用 `Object.defineProperty()` 并修改任何非 `writable` 属性则会导致错误

在调用 `Object.defineProperty()`时，`configurable`、`enumerable` 和 `writable` 的值如果不指定，则都默认为 `false`。

### 访问器属性

访问器属性**不包含数据值**。相反，它们包含一个获取（[`getter`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)）函数和一个设置（[`setter`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set)）函数，不过这两个函数不是必需的。

- 读取访问器属性时，会调用 `getter` 函数，返回一个有效的值
- 写入访问器属性时，会调用 `setter` 函数并传入新值，这个函数必须决定对数据做出什么修改

访问器属性有 4 个特性描述它们的行为:

- `[[Configurable]]`：表示属性
 	- 是否可以通过 delete 删除并重新定义
 	- 是否可以修改它的特性
 	- 是否可以把它**改为数据属性**
 	- 默认：`true`
- `[[Enumerable]]`：表示属性是否可以通过 for-in 循环返回。默认`true`
- `[[Get]]`：获取函数，在读取属性时调用。默认值为 `undefined`
- `[[Set]]`：设置函数，在写入属性时调用。默认值为 `undefined`

注意，上述属性的默认值都表示在直接定义对象上时的默认值，若用`Object.defineProperty()`，则没有定义的都为 `undefined`

下面是一个例子

```js
// 访问器属性定义
// 定义一个对象，包含伪私有成员 year_和公共成员 edition 
let book = { 
  year_: 2017, 
  edition: 1 
};
Object.defineProperty(book, "year", {
  get() {
    return this.year_;
  },
  set(newVal) {
    if(newVal > 2017) {
      this.year_ = newVal;
      this.edition += newVal - 2017;
    }
  }
});
book.year = 1999
console.log(book.year);   // 2017
console.log(book.edition);  // 1
book.year = 2018
console.log(book.year);   // 2018
console.log(book.edition);  // 2
```

对象 book 有两个默认属性：year_和 edition
**year_中的下划线常用来表示该属性并不希望在对象方法的外部被访问**
另一个属性 year 被定义为一个访问器属性，其中，

- getter简单返回 year_的值
- setter会做一些计算以决定正确的版本（edition）

因此，把 year 属性修改为 2018 会导致 year_变成 2018，edition 变成 2。而试图修改为1999则不会有变化，这是访问器属性的典型使用场景，即设置一个属性值会导致一些其他变化发生。

获取函数和设置函数不一定都要定义。

- 只定义`getter` 函数意味着属性是**只读**的，尝试修改属性会被**忽略**。在严格模式下，尝试写入只定义了获取函数的属性会抛出错误。
- 类似地，只有定义`setter`的属性是**不能读取**的，非严格模式下读取会返回 `undefined`，严格模式下会抛出错误。

## 其他定义属性函数

其他还可通过 [`Object.defineProperties()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) 定义多个属性，使用 `Object.getOwnPropertyDescriptor()`方法可以取得指定属性的属性描述符 ， `Object.getOwnPropertyDescriptors()` 方法可以取得每个自有属性的属性描述符并在一个新对象中返回。

### 合并对象

把源对象所有的属性一起复制到目标对象上，这种操作也被称为“混入”（mixin），因为目标对象通过混入源对象的属性从而得到了增强。
[`Object.assign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 方法用于将所有**可枚举属性/自有属性**的值从一个或多个源对象分配到目标对象，返回目标对象。

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

`Object.assign()` 实际上执行的是**浅复制**，只会复制对象的引用

- 若多个源对象都有相同的属性，则用**最后一个复制的值**。
- 从源对象**访问器属性**取得的值，比如获取函数，会**作为一个静态值**赋给目标对象。也就是说：**不能在两个对象间转移获取函数和设置函数。**
- 赋值期间出错，则操作会中止并退出，同时抛出错误。没有“回滚”之前赋值的概念，因此它是一个尽力而为、**可能只会完成部分复制**的方法。

## 对象标识及相等判定

ES6之前，有些情况利用===操作符进行判断是无法成功的，如

```js
// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等
console.log(+0 === -0); // true 
console.log(+0 === 0); // true 
console.log(-0 === 0); // true 
// 要确定 NaN 的相等性，必须使用极为讨厌的 isNaN() 
console.log(NaN === NaN); // false 
console.log(isNaN(NaN)); // true 
```

ES6规范改善了这类情况，新增了 [`Object.is()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 方法用于判断两个值是否为同一个值

```js
// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)); // false 
console.log(Object.is(+0, 0)); // true 
console.log(Object.is(-0, 0)); // false 
// 正确的 NaN 相等判定
console.log(Object.is(NaN, NaN)); // true
```

要检查超过两个值，可递归地利用相等性传递即可

```js
function recursivelyCheckEqual(x, ...rest) {
  return Object.is(x, rest[0]) && 
  (rest.length < 2 || recursivelyCheckEqual(...rest));
}
```

## ES6 语法糖

ECMAScript 6 为定义和操作对象新增了很多极其有用的语法糖特性。这些特性都没有改变现有引擎的行为，但极大地提升了处理对象的方便程度。

### 属性名简写

给对象添加变量的时候，经常会发现属性名和变量名是一样的。这个时候就可以使用变量名，不用再写冒号，如果没有找到同名变量，则会抛出 `ReferenceError`。
例如：

```js
let name = 'cosine'; 
let person = { name: name }; 
console.log(person); // { name: 'cosine' }
// 使用语法糖 等价于上面那个
let person = { name }; 
console.log(person); // { name: 'cosine' }
```

代码压缩程序会在不同作用域间保留属性名，以防止找不到引用。

### 可计算属性

可在对象字面量中直接动态的命名属性：

```js
const nameKey = 'name'; 
const ageKey = 'age'; 
const jobKey = 'job'; 
let uniqueToken = 0; 
function getUniqueKey(key) { 
 return `${key}_${uniqueToken++}`; 
} 
let person = { 
 [nameKey]: 'cosine', 
 [ageKey]: 21, 
 [jobKey]: 'Software engineer',
 // 也可以是表达式！
 [getUniqueKey(jobKey+ageKey)]: 'test'
}; 
console.log(person); 
// { name: 'cosine', age: 21, job: 'Software engineer', jobage_0: 'test' }
```

### 简写方法名

直接看：

```js
let person = { 
let person = { 
    // sayName: function(name) { // 旧
    //     console.log(`My name is ${name}`); 
    // } 
    sayName(name) { // 新
        console.log(`My name is ${name}`); 
    } 
}; 
person.sayName('Matt'); // My name is Matt 
```

简写方法名对获取函数和设置函数也是适用的，并且简写方法名与可计算属性键相互兼容，也为后文的类打下了基础

### 对象解构

```js
// 对象解构
let person = { 
    name: 'cosine', 
    age: 21 
}; 
let { name: personName, age: personAge } = person; 
console.log(personName, personAge); // cosine 21 
// 让变量直接使用属性的名称 定义默认值 若未定义默认值则不存在的则为undefined
let { name, age, job = 'test', score } = person; 
console.log(name, age, job, score); // cosine 21 test undefined
```

解构在内部使用函数 `ToObject()`（不能在运行时环境中直接访问）把源数据结构转换为对象。
这意味着在对象解构的上下文中，原始值会被当成对象。也就是说：`null` 和 `undefined` 不能被解构，否则会抛出错误

```js
let { length } = 'foobar'; 
console.log(length); // 6 
let { constructor: c } = 4; 
console.log(c === Number); // true 
let { _ } = null; // TypeError 
let { _ } = undefined; // TypeError
```

想要给**事先声明的变量**解构赋值，则赋值表达式必须**包含在一对括号**中

```js
let personName, personAge; 
let person = { 
 name: 'cosine', 
 age: 21
}; 
({name: personName, age: personAge} = person); 
console.log(personName, personAge); // cosine 21
```

#### 1、嵌套解构

解构对于引用嵌套的属性或赋值目标没有限制。为此，可以通过解构来复制对象属性(浅复制)

```js
let person = { 
    name: 'cosine', 
    age: 21, 
    job: { 
        title: 'Software engineer' 
    } 
}; 
// 声明 title 变量并将 person.job.title 的值赋给它
let { job: { title } } = person; 
console.log(title); // Software engineer 
```

在外层属性没有定义的情况下不能使用嵌套解构。无论源对象还是目标对象都一样

#### 2、部分解构

涉及多个属性的解构赋值是一个输出无关的顺序化操作。如果一个解构表达式涉及多个赋值，开始的赋值成功而**后面的赋值出错**（对不能解构的undefined || null进行解构），则整个解构赋值**只会完成一部分**

#### 3、参数上下文匹配

在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响 arguments 对象，但可以在函数签名中声明在函数体内使用局部变量：

```js
let person = { 
    name: 'cosine', 
    age: 21
}; 
function printPerson(foo, {name, age}, bar) { 
    console.log(arguments); 
    console.log(name, age); 
} 
function printPerson2(foo, {name: personName, age: personAge}, bar) { 
    console.log(arguments); 
    console.log(personName, personAge); 
} 
printPerson('1st', person, '2nd'); 
// ['1st', { name: 'cosine', age: 21 }, '2nd'] 
// 'cosine' 21 
printPerson2('1st', person, '2nd'); 
// ['1st', { name: 'cosine', age: 21 }, '2nd'] 
// 'cosine' 21 
```

# 创建对象

ES6开始，正式支持了类和继承，不过这种支持其实是封装了ES5.1构造函数加原型继承的语法糖。

## 工厂模式

在设计模式那篇博客有提到一些设计模式 ([前端设计模式应用笔记](https://ysx.cosine.ren/cn/%E3%80%90%E7%AC%AC%E4%BA%8C%E5%B1%8A%E9%9D%92%E8%AE%AD%E8%90%A5-%E5%AF%92%E5%81%87%E5%89%8D%E7%AB%AF%E5%9C%BA%E3%80%91-%20%E5%89%8D%E7%AB%AF%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E5%BA%94%E7%94%A8/))， 而工厂模式也是一种广泛使用的设计模式，它提供了一种创建对象的最佳方式。在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。

```js
function createPerson(name, age, job) { 
    let o = new Object(); 
    o.name = name; 
    o.age = age; 
    o.job = job; 
    o.sayName = function() { 
        console.log(this.name); 
    }; 
    return o; 
} 
let person1 = createPerson("cosine", 21, "Software Engineer"); 
let person2 = createPerson("Greg", 27, "Doctor"); 
console.log(person1);   // { name: 'cosine', age: 21, job: 'Software Engineer', sayName: [Function (anonymous)] }
person1.sayName();  // cosine
console.log(person2); // { name: 'Greg', age: 27, job: 'Doctor', sayName: [Function (anonymous)] }
person2.sayName();  // Greg
```

这种模式可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是**什么类型**）

## 构造函数模式

自定义构造函数，以函数的形式为自己的对象类型定义属性和方法。

```js
function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.sayName = function() { 
        console.log(this.name); 
    }; 
} 
let person1 = new Person("cosine", 21, "Software Engineer"); 
person1.sayName(); // cosine
```

- 没有显式地创建对象
- 属性和方法直接赋值给了 this
- 没有 return
- 要创建 Person 的实例，应使用 new 操作符

### new 过程中发生了什么？

划重点，使用new调用构造函数会执行如下几个操作：

1. 在内存中创建一个新对象
2. 将新对象内部的 `[[Prototype]]` 赋值为构造函数的prototype属性。
3. 构造函数内部的 `this` 指向这个新对象
4. 执行构造函数内部的代码（为对象添加属性）
5. **若构造函数返回非空对象，则返回该对象。否则，返回刚创建的新对象！**

上一个栗子的最后，person1有一个constructor属性指向Person

```js
console.log(person1.constructor)    // [Function: Person]
console.log(person1.constructor === Person)    // true
console.log(person1 instanceof Object); // true 
console.log(person1 instanceof Person); // true 
```

定义自定义构造函数可以**确保实例被标识为特定类型**，相比于工厂模式，这是一个很大的好处。
person1 之所以也被认为是 Object 的实例，是因为所有自定义对象都继承自 Object（后文会提到）

注意以下几点：

 1. **构造函数也是函数** ：任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数
 2. **构造函数的主要问题**：其定义的方法会在每个实例上都创建一遍，因此不同实例上的函数虽然同名却不相等，而因为都是做一样的事，所以没必要定义两个不同的 Function 实例。

this 对象可以把函数与对象的绑定**推迟到运行时**，所以可以将函数定义转移到构造函数外部。
这样虽然解决了相同逻辑的函数重复定义的问题，但全局作用域也因此被搞乱了，因为那个函数实际上只能在一个对象上调用。如果这个对象需要多个方法，那么就要在全局作用域中定义多个函数。这会导致自定义类型引用的代码不能很好地聚集一起。而这个新问题可以通过原型模式来解决

## 原型模式

- 每个函数都会创建一个 `prototype` 属性指向原型对象
- 在原型对象上定义的属性和方法可以被所有对象实例共享
- 原来在构造函数中赋给对象实例的值，可以直接赋值给它们的原型

### 1、理解原型

- 无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 `prototype` 属性指向原型对象
- 所有原型对象会获得一个名为 `constructor` 的属性，指回与之关联的构造函数
 	- 如`Person.prototype.constructor` 指向 `Person`
- 然后，可通过构造函数给原型对象添加其他属性和方法
- 原型对象默认只会获得 `constructor` 属性，其他的所有方法都继承自 `Object`
- 每次调用构造函数创建一个新实例，其的内部`[[Prototype]]`指针就会被赋值为构造函数的原型对象
- 脚本中没有访问这个 `[[Prototype]]` 特性的标准方式，但 Firefox、Safari 和 Chrome 会在每个对象上暴露 `__proto__` 属性，通过这个属性可以访问**对象的原型**

正常的原型链都会终止于 Object 的原型对象，而 `Object` 原型的原型为 `null`

```js
console.log(Person.prototype.__proto__ === Object.prototype); // true 
console.log(Person.prototype.__proto__.constructor === Object); // true 
console.log(Person.prototype.__proto__.__proto__ === null); // true 
```

 **构造函数**、**原型对象**和**实例**是 3 个**完全不同**的对象：

```js
console.log(person1 !== Person); // true 
console.log(person1 !== Person.prototype); // true 
console.log(Person.prototype !== Person); // true
```

实例通过 `__proto__` 链接到原型对象，构造函数通过 `prototype` 属性链接到原型对象:

```js
console.log(person1.__proto__ === Person.prototype); // true 
conosle.log(person1.__proto__.constructor === Person); // true 
```

同一个构造函数创建的实例**共享**同一个原型对象，而 `instanceof` 检查实例的原型链中是否包含指定构造函数的原型：

```js
console.log(person1.__proto__ === person2.__proto__); // true 
console.log(person1 instanceof Person); // true 
console.log(person1 instanceof Object); // true 
```

- `isPrototypeOf()` 方法用于测试一个对象是否存在于另一个对象的原型链上。
 	- 与 `instanceof` 运算符不同。在表达式 `object instanceof AFunction`中，`object` 的原型链是针对 `AFunction.prototype` 进行检查的，而不是针对 `AFunction` 本身。
- `getPrototypeOf()`方法，返回参数的内部特性 `[[Prototype]]` 的值
 	- 使用它可以很方便的**取得一个对象的原型**，这在通过原型实现继承时尤为重要。
- `setPrototypeOf()` 方法，可以向实例的私有特性 `[[Prototype]]` 写入一个新值。
 	- 使用它可以**重写一个对象的原型继承关系**

```js
console.log(Person.prototype.isPrototypeOf(person1)); // true 
console.log(Person.prototype.isPrototypeOf(person2)); // true
console.log(Object.getPrototypeOf(person1) == Person.prototype); // true 
console.log(Object.getPrototypeOf(person1).name); // "cosine"
```

> `Object.setPrototypeOf()` 可能会严重影响代码性能。Mozilla 文档说得很清楚：“在所有浏览器和 JavaScript 引擎中，修改继承关系的影响都是微妙且深远的。这种影响并不仅是执行 `Object.setPrototypeOf()`语句那么简单，而是会**涉及所有**访问了那些修改了 `[[Prototype]]` 的对象的代码。

为避免使用  `Object.setPrototypeOf()` 可能造成的性能下降，可以通过  `Object.create()` 来创建一个新对象，同时为其指定原型：

```js
let biped = { 
 numLegs: 1
}; 
let person = Object.create(biped); 
person.name = 'cosine'; 
console.log(person.name); // cosine
console.log(person.numLegs); // 1
console.log(Object.getPrototypeOf(person) === biped); // true 
```

### 2、原型层级

- 通过对象访问属性时，会按照该属性名称进行搜索。
- 如果在这个实例上发现了这个属性，则返回该这个属性对应值。
- 如果在该实例上没有找到，则会进入原型对象，在原型对象上找到属性后，返回对应的值。
- 如果原型对象上没有找到，再到原型对象的原型对象上找……如此往复，直至找到
- 这既是原型用于在多个对象实例间共享属性和方法的原理。

注意以下几点：

- 虽然可以通过实例读取原型对象上的值，但**不可能通过实例重写原型对象上的值**
- 在实例上添加了一个与原型对象中同名的属性，则会在实例上创建这个属性，**这个属性会遮住原型对象上的属性**
- 使用 `delete` 操作符可以**完全删除实例上的这个属性**，从而使标识符解析过程能够继续搜索原型对象

#### hasOwnProperty()

`hasOwnProperty()` 方法用于**确定**某个属性是在**实例上**还是在**原型对象**上。这个方法会在属性存在于调用它的对象**实例**上时返回 `true`

```js
function Person() {} 
Person.prototype.name = "cosine"; 
Person.prototype.age = 21; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}; 
let person1 = new Person(); 
let person2 = new Person(); 

console.log(person1.hasOwnProperty("name")); // false 
person1.name = "Khat";   // 添加了实例上的name， 遮蔽了原型上的name

console.log(person1.name); // "Khat"，来自实例
console.log(person1.hasOwnProperty("name")); // true 

console.log(person2.name); // "cosine"，来自原型
console.log(person2.hasOwnProperty("name")); // false 

delete person1.name; 
console.log(person1.name); // "cosine"，来自原型
console.log(person1.hasOwnProperty("name")); // false
```

### 3、原型和in操作符

`in` 操作符有以下两种使用方式：

- 单独使用 `in` 操作符
- 在 `for-in` 循环中使用

单独使用时，通过对象访问指定属性时返回 `true`，**无论**该属性是在**实例**上还是在**原型**上

```js
console.log(person1.hasOwnProperty("name")); // false 
console.log("name" in person1); // true 

person1.name = "cosine"; 
console.log(person1.name); // "Khat"，来自实例
console.log(person1.hasOwnProperty("name")); // true 
console.log("name" in person1); // true 

console.log(person2.name); // "cosine"，来自原型
console.log(person2.hasOwnProperty("name")); // false 
console.log("name" in person2); // true 

delete person1.name; 
console.log(person1.name); // "cosine"，来自原型
console.log(person1.hasOwnProperty("name")); // false 
console.log("name" in person1); // true 
```

如果要确定某个属性是否存在于原型上，则可以同时使用 `hasOwnProperty()` 和 `in` 操作符

```js
function hasPrototypeProperty(object, name){ 
 return !object.hasOwnProperty(name) && (name in object); 
} ;
```

在 `for-in` 循环中使用 `in` 操作符时，**可以通过对象访问**且**可以被枚举的**属性都会返回，包括可枚举的**实例**属性、**原型**属性（不包括被遮蔽的原型属性和不可枚举的属性），除此之外，`Object.keys()` 方法也可以获得对象上所有可枚举的实例属性，其返回一个包括该对象所有可枚举属性名称的字符串数组

若想获得所有**实例**属性（包括不可枚举），则可以用 `Object.getOwnPropertyNames()`

### 4、属性枚举顺序

- 枚举顺序不确定
 	- `for-in` 循环
 	- `Object.keys()`
 	- 取决于 JavaScript 引擎，可能因浏览器而异。
- 枚举顺序确定
 	- `Object.getOwnPropertyNames()`
 	- `Object.getOwnPropertySymbols()`
 	- `Object.assign()`
 	- 先以 **升序** 枚举**数值键**，然后以 **插入顺序** 枚举**字符串和符号键**。

## 对象迭代

ECMAScript 2017 新增了两个静态方法，用于将对象内容转换为序列化的（可迭代的）格式。这两个静态方法 `Object.values()` 和 `Object.entries()` 接收一个对象，返回它们内容的数组。

- `Object.values()` 返回对象值的数组
- `Object.entries()` 返回键-值对的数组
- 非字符串属性会被转换为字符串输出，符号属性则会被忽略。这两个方法执行的是对象的**浅复制**

### 1、 其他原型语法

为了减少代码冗余，从视觉上更好地封装原型功能，直接通过一个包含所有属性和方法的对象字面量来重写原型成为了一种常见的做法

```js
function Person() {} 
Person.prototype = {
 name: "cosine", 
 age: 21, 
 job: "Software Engineer", 
 sayName() { 
 console.log(this.name); 
 } 
}; 
```

但有一个问题：这样重写后，Person.prototype 的 constructor 属性就不指向 Person了。在创建函数时，也会创建它的 prototype 对象，同时会自动给这个原型的constructor 属性赋值。因此我们需要专门设置一下constructor的值

```js
Person.prototype = { 
 constructor: Person, // 赋值
 name: "cosine", 
 age: 21, 
 job: "Software Engineer", 
 sayName() { 
  console.log(this.name); 
 } 
}; 
```

以这种方式恢复 `constructor` 属性会创建一个`[[Enumerable]]` 为 `true` 的属性。而
原生 `constructor` 属性默认是**不可枚举**的。因此，如果你使用的是兼容 ECMAScript 的 JavaScript 引擎，那可能需要改为使用 `Object.defineProperty()` 方法来定义 `constructor` 属性

### 2、 原型的动态性

因为从 **原型上搜索值** 的过程是**动态**的，所以即使**实例在修改原型之前已经存在**，任何时候对原型对象所做的修改也会在实例上反映出来：

```js
function Person() {} 
let friend = new Person(); 
Person.prototype = { 
 constructor: Person, 
 name: "cosine", 
 age: 21, 
 job: "Software Engineer", 
 sayName() { 
  console.log(this.name); 
 } 
}; 
friend.sayName(); // 错误
```

### 3、 原生对象原型

- 原型模式是实现所有**原生引用类型**的模式。
- 所有原生引用类型的构造函数（包括 `Object`、`Array` 、 `String` 等）都在原型上定义了实例方法。
 	- 数组实例的 `sort()` 等方法就是 `Array.prototype` 上定义
 	- 字符串包装对象的 `substring()` 等方法也是在 `String.prototype` 上定义
- 通过原生对象的原型可以取得所有默认方法的引用，也可以给原生类型的实例定义新的方法（但不建议这么做x）

### 4、 原型的问题

- 弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性值
- 最主要问题源自它的共享特性，一般来说，不同的实例应该有属于自己的属性副本，而原型模式新增的属性会在不同实例上反映出来

# 继承实现

## 原型链

- ECMA-262 将**原型链**定义为ECMAScript的 **主要继承方式**
- 基本思想：通过原型，继承多个引用类型的属性与方法。

回顾一下：每个构造函数有一个原型对象，通过 `prototype` 指向原型对象，原型dx有一个属性 `constructor` 指回构造函数，实例有一个内部指针 `__proto__` 指向原型。

那如果原型是另一个类型的实例呢？那就意味着这个原型本身有一个内部指针 `__proto__` 指向另一个原型对象。相应地另一个原型也有另一个指针 `constructor` 指向另一个构造函
数，这样就在实例和原型之间构造了一条**原型链**。

原型链扩展了前面描述的原型搜索机制。我们知道，在读取实例上的属性时，首先会在实例上搜索这个属性。如果没找到，则会继承搜索实例的原型。在通过原型链实现继承之后，搜索就可以向上，搜索原型的原型。直至原型链的末端

### 1、默认原型

默认情况下，**所有引用类型都继承自 `Object`**，这也是通过原型链实现的。**任何函数的默认原型**都是一个 `Object` 的实例，这意味着这个实例有一个内部指针指向 `Object.prototype`。这也是为什么自定义类型能够继承包括 `toString()`、`valueOf()`在内的所有默认方法的原因。

### 2、原型与继承关系

原型与实例的关系可以通过两种方式来确定。

- 使用 `instanceof`操作符，如果一个**实例的原型链中出现过相应的构造函数**，则 `instanceof` 返回 `true`

```js
console.log(instance instanceof Object); // true 
console.log(instance instanceof SuperType); // true 
console.log(instance instanceof SubType); // true
```

- 使用 `isPrototypeOf()` 方法。只要**该实例原型链中包含这个原型**，这个方法就返回 true

```js
console.log(Object.prototype.isPrototypeOf(instance)); // true 
console.log(SuperType.prototype.isPrototypeOf(instance)); // true 
console.log(SubType.prototype.isPrototypeOf(instance)); // true
```

### 3、原型链的问题

- 在谈到原型的问题时也提到过，原型中包含的引用值会在所有实例间共享，这也是为什么属性通常会在构造函数中定义而不会定义在原型上的原因。
- 在使用原型实现继承时，原型实际上变成了另一个类型的实例。这意味着**原先的实例属性**

```js
function SuperType() { 
 this.colors = ["red", "blue", "green"]; 
} 

function SubType() {} 

// 继承 SuperType 
SubType.prototype = new SuperType(); 

let instance1 = new SubType(); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 

let instance2 = new SubType(); 
console.log(instance2.colors); // "red,blue,green,black" 
```

当 `SubType` 通过原型继承 `SuperType` 后，`SubType.prototype` 变成了 `SuperType` 的一个实例，因而也获得了自己的 `colors` 属性。这类似于创建了 SubType.prototype.colors 属性。最终结果是，`SubType`  的所有实例都会共享这个 `colors` 属性，`instance1.colors` 上的修改也会反映到 `instance2.colors上`

- 第二个问题是，子类型在**实例化**时不能给父类型的**构造函数传参**。事实上，我们无法在不
影响所有对象实例的情况下把参数传进父类的构造函数。再加上之前提到的原型中包含引用值的问题，就导致**原型链基本不会被单独使用**

## 盗用构造函数

基本思路：**在子类构造函数中调用父类构造函数。**
函数就是在特定上下文中执行代码的简单对象，所以可以使用 `apply()` 和 `call()` 方法以**新创建的对象**为上下文执行构造函数。

```js
function SuperType() { 
 this.colors = ["red", "blue", "green"]; 
} 
function SubType() { 
 // 继承 SuperType !!
 SuperType.call(this); 
} 
let instance1 = new SubType(); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 

let instance2 = new SubType(); 
console.log(instance2.colors); // "red,blue,green"
```

通过使用 `call()`（或 `apply()`）方法，`SuperType`构造函数在为 `SubType` 的实例创建的新对象的上下文中执行了。这相当于新的 `SubType` 对象上运行了 `SuperType()` 函数中的所有初始化代码！这样每个实例就有自己的属性了

### 1、传递参数

使用盗用构造函数可以在子类构造函数中向父类构造函数传参。

```js
function SuperType(name){ 
 this.name = name; 
} 
function SubType() { 
 // 继承 SuperType 并传参
 SuperType.call(this, "cosine"); 
 // 实例属性
 this.age = 21; 
} 
let instance = new SubType(); 
console.log(instance.name); // "cosine"; 
console.log(instance.age); // 21
```

### 2、主要问题

盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：

- **必须在构造函数中定义方法**。因此函数**不能重用**
- **子类不能访问父类原型上定义的方法**，因此所有类型**只能使用构造函数模式**

由于存在这些问题，盗用构造函数基本上也不能单独使用。

## 组合式继承

组合继承综合了原型链和盗用构造函数，将两者的优点集中了起来。

- 基本的思路是**使用原型链继承原型上的属性和方法**，而**通过盗用构造函数继承实例属性**
- 既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性

```js
function SuperType(name){ 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 
function SubType(name, age){ 
 // 继承属性
 SuperType.call(this, name); 
 this.age = age; 
} 
// 继承方法
SubType.prototype = new SuperType(); 
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
}; 
let instance1 = new SubType("cosine", 21); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
instance1.sayName(); // "cosine"; 
instance1.sayAge(); // 21 
let instance2 = new SubType("NaHCOx", 22); 
console.log(instance2.colors); // "red,blue,green" 
instance2.sayName(); // "NaHCOx"; 
instance2.sayAge(); // 22
```

## 原型式继承

适用情形：已有一个对象，想在它的基础上再创建一个新对象。你需要把这个对象先传给 object()，然后再对返回的对象进行适当修改。

```js
let person = { 
 name: "Nicholas", 
 friends: ["Shelby", "Court", "Van"] 
}; 
let anotherPerson = Object.create(person, { 
 name: { 
  value: "Greg" 
 } 
}); 
console.log(anotherPerson.name); // "Greg"
```

非常适合以下几种情形：

- **不需要单独创建构造函数**
- 并且**需要**在对象间**共享信息**的场合
- 注意：**属性中包含的引用值始终会在相关对象间共享**

## 寄生式继承

与原型式继承比较接近的一种继承方式是寄生式继承（parasitic inheritance）
创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。
基本的寄生继承模式如下

```js
function createAnother(original) {
 let clone = Object.create(original);   // 调用构造函数创建一个新对象
 clone.sayHi = function() {
        console.log(`Hi! I am ${this.name}`);
    };
    return clone;   // 返回这个对象
}
let person = {
    name: "cosine",
    friends: ['NaHCOx', 'Khat']
};
let person2 = createAnother(person);
person2.name = 'CHxCOOH';
person2.sayHi();    // Hi! I am CHxCOOH
```

该例子通过person为源对象，返回一个增加了sayHi函数的新对象（进行了**增强**），主要适用于**关注对象**而**不在乎构造函数和类型**的场景

需要注意的一点是：

- 通过寄生式继承给对象添加函数会导致函数**难以重用**，与构造函数模式类似

## 寄生式组合继承

组合继承也有效率问题，比如父类构造函数始终会被调用两次

- 在创建子类原型时调用
- 在子类构造函数中调用

```js
function SuperType(name){ 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 
function SubType(name, age){ 
 // 继承属性
 SuperType.call(this, name); // 第二次调用父类构造函数！
 this.age = age; 
} 
// 继承方法
SubType.prototype = new SuperType(); // 第一次调用父类构造函数！
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
}; 
```

本质上，子类的原型最终是要包含父类对象的所有实例属性，所以子类构造函数只需要在执行时 **重写** 自己的原型就可以了。

寄生式组合继承主要思路如下：

- 通过 **盗用构造函数** 继承**属性**
- 使用 **混合式原型链** 继承**方法**
也就是说，将父类原型拿来，并用指向子类的constructor遮蔽原有constructor,

```js
function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype); // 创建父类原型的一个副本
    prototype.constructor = subType;    // 找回重写原型导致丢失的constructor
    subType.prototype = prototype;      // 赋值对象
}
function SuperType(name){ 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 
function SubType(name, age){ 
 // 继承属性
 SuperType.call(this, name); // 第二次调用父类构造函数！
 this.age = age; 
} 
// 继承方法
- SubType.prototype = new SuperType(); // 第一次调用父类构造函数！
+ inheritPrototype(SubType, SuperType); // 变成调用这个函数
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
}; 
```

避免了不必要的多次调用父类构造函数，也保证了原型链不变，可以算是引用类型继承的最佳模式~

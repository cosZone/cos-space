---
title: 深入JavaScript学习之路（二）JavaScript中的类
link: js-learning-2
catalog: true
subtitle: 红宝书读书笔记 第八章 p205
date: 2022-03-17 23:50:52
cover: img/header_img/galaxy-ngc-3190-wallpaper-for-2880x1800-60-653.jpg
tags:
- 前端
- JavaScript
categories:
- [笔记, 前端, JavaScript]
---

上一节都是基于ES5的特性来模拟实现类似于类class的行为，不难看出这些方法各有各自的问题，实现继承的代码也显得非常冗长和混乱。因此，`ES6` 中新引入的 `class` 关键字具备了正式定义类的能力，它实际上是一个**语法糖**，背后使用的仍然是原型和构造函数的概念。

# 类定义

类声明与类表达式两种定义方法，都使用 `class` 关键字

```js
// 类声明
class Person {}  

// 类表达式
const Animal = class {}
```

与函数表达式类似，**类表达式在它们被求值前也不能引用**。
但不同之处在于

- **函数声明可以提升，而类定义不能提升**
- 函数受 **函数作用域** 限制，类受 **块作用域** 限制

```js
// 函数声明可以提升，而类定义不能提升*
console.log(FunctionExpression); // undefined 
var FunctionExpression = function() {}; 
console.log(FunctionExpression); // function() {}

console.log(ClassExpression); // undefined 
var ClassExpression = class {}; 
console.log(ClassExpression); // class {} 
// 函数受函数作用域限制，类受块作用域限制
{ 
    function FunctionDeclaration() {} 
    class ClassDeclaration {} 
} 
console.log(FunctionDeclaration); // FunctionDeclaration() {} 
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
```

## 类构成

类可以包括以下方法，但都不是必须的，空的类定义仍然有效。

- 构造函数（constructor）
- 获取函数及设置函数（get和set）
- 静态类方法（static）
- 其他实例方法

默认情况下，类定义中的代码都在 **严格模式** 下执行。
首字母大写这个就不必多说了，可以用于区分通过他创建的实例

**类表达式**的**名称**是**可选**的。在把类表达式赋值给变量后，可以通过 `name` 属性取得类表达式的名称字符串。但不能在类表达式作用域外部访问这个标识符。

```js
let Person = class PersonName { 
    identify() { 
        console.log(Person.name, PersonName.name); 
    } 
} 
let p = new Person(); 
p.identify(); // PersonName PersonName 
console.log(Person.name); // PersonName 
console.log(PersonName); // ReferenceError: PersonName is not defined 
```

# 类构造函数

`constructor` 关键字用于在类定义块内部**创建类的构造函数**。

- `constructor` 会告诉解释器：使用 `new` 操作符创建类的新实例时，应该**调用这个函数。**
- 构造函数的定义**不是必需**的，**不定义构造函数**相当于将构造函数**定义为空函数**。

## 1、实例化

constructor函数实际上也是个语法糖，他让 JS 解释器知道使用 `new` 来定义类的一个实例时应使用 `constructor` 函数进行实例化。

让我们复习一下使用 `new` 调用构造函数所执行的操作：

- 在内存中创建一个新对象 `let obj = new Object()`
- 将新对象内部的 `[[Prototype]]` 赋值为构造函数的 `prototype`  `obj.__proto__ = constructor.prototype;`
- 构造函数内部的 `this` 指向这个新对象
- 执行这个构造函数内部代码
 	- 上述两步 相当于 `let res = contructor.apply(obj,  args)`
- 若构造函数返回 **非空对象**， 则**返回该对象** `res`；否则，返回刚创建的新对象 `obj`
 	- `return typeof  res === 'object' ? res: obj;`

类实例化时传入的参数会作为**构造函数的参数**，若不需要参数，则类名后面的括号也是可选的 可以直接 `new Person`

类构造函数会在执行之后返回一个对象，这个对象会被用作实例化的对象。
注意：若构造函数返回的这个对象 `res` 是一个非空对象，且这个对象与new中第一步新建的对象`obj`无关系，则新建的对象会被回收哦，而且通过 `instanceof` 检测是无法检测出跟该类有关联，因为并没有修改原型指针。

## 2、类的本质？

```js
class Person {} 
console.log(Person); // class Person {} 
console.log(typeof Person); // function
```

是函数！前面也说到了，它本质上就是一个语法糖，所以它具有跟函数一样的行为。
可以向其他对象或函数引用一样将其当作参数传递，也可以立即实例化（类似函数表达式的立即执行）

```js
// 类可以像函数一样在任何地方定义，比如在数组中
let classList = [ 
 class { 
  constructor(id) { 
   this.id_ = id; 
   console.log(`instance ${this.id_}`); 
  } 
 } 
]; 
function createInstance(classDefinition, id) { 
 return new classDefinition(id); 
} 
let foo = createInstance(classList[0], 3141); // instance 3141 

// 立即执行
let p = new class Foo { 
 constructor(x) { 
  console.log(x); 
 } 
}('bar'); // bar 
console.log(p); // Foo {} 
```

# 实例、原型和类成员

类可以非常方便的定义以下三种成员，跟其它语言相似。

- 实例上的成员
- 原型上的成员
- 类本身的成员（静态类成员）

## 实例成员

在`constructor` 中可以通过this为新创建的实例添加自有属性，每个实例是不会共享这里的属性的。

- ps：在类块中直接写的成员也会成为实例属性

```js
class Person { 
 sex = '女'
 age = 21
 constructor() { 
  // 这个例子先使用对象包装类型定义一个字符串
  // 为的是在下面测试两个对象的相等性
  this.name = new String('Jack'); 
  this.sayName = () => console.log(this.name); 
  this.nicknames = ['Jake', 'J-Dog'] 
 } 
} 
let p1 = new Person(), 
 p2 = new Person(); 
p1.sayName(); // Jack 
p2.sayName(); // Jack 
console.log(p1.name === p2.name); // false 
console.log(p1.sayName === p2.sayName); // false 
console.log(p1.nicknames === p2.nicknames); // false 
console.log(p1.sex, p1.age) // 女 21
```

## 原型成员

将在类块中定义的方法作为原型方法（在所有实例中共享）

```js
class Person { 
    constructor() { 
        // 添加到 this 的所有内容都会存在于不同的实例上
        this.locate = () => console.log('instance'); 
    } 
    // 在类块中定义的所有内容都会定义在类的原型上
    locate() { 
        console.log('prototype'); 
    } 
} 
let p = new Person(); 
p.locate(); // instance 
Person.prototype.locate(); // prototype 
```

类定义也支持获取和设置访问器。语法与行为跟普通对象一样：

```js
class Person { 
 sex = '女'
 age = 21
 constructor() { 
  this.sayName = () => console.log(this.name); 
  this.nicknames = ['Jake', 'J-Dog'] 
 }
    set name(newName) { 
        this.name_ = newName; 
    } 
    get name() { 
        return this.name_; 
    } 
} 
let p = new Person(); 
p.name = 'cosine'; 
console.log(p.name); // cosine 
```

## 静态类方法

静态类成员在类定义中使用 `static` 关键字作为前缀。在静态成员中，`this` 引用类自身。可以通过类名.方法名直接访问

## 非函数原型和类成员

虽然类定义并不显式支持在原型或类上添加成员数据，但在类定义外部，可以手动添加：

```js
// 在类上定义数据成员
Person.greeting = 'My name is'; 
// 在原型上定义数据成员
Person.prototype.name = 'Jake';
```

- 但是不建议这么做，在原型和类上添加可变数据成员是一种反模式。一般来说，对象实例应该独自拥有通过 `this` 引用的数据

## 迭代器与生成器方法

类定义语法支持在原型和类本身上定义生成器方法：

```js
class Person { 
 // 在原型上定义生成器方法
 *createNicknameIterator() { 
  yield 'cosine1'; 
  yield 'cosine2'; 
  yield 'cosine3'; 
 } 
 // 在类上定义生成器方法
 static *createJobIterator() { 
  yield 'bytedance'; 
  yield 'mydream'; 
  yield 'bytedance mydream!'; 
 } 
} 
let jobIter = Person.createJobIterator(); 
console.log(jobIter.next().value); // bytedance 
console.log(jobIter.next().value); // mydream 
console.log(jobIter.next().value); // bytedance mydream!
let p = new Person(); 
let nicknameIter = p.createNicknameIterator(); 
console.log(nicknameIter.next().value); // cosine1 
console.log(nicknameIter.next().value); // cosine2 
console.log(nicknameIter.next().value); // cosine3
```

因为支持生成器方法，所以可以通过添加一个默认的迭代器，把类实例变成可迭代对象

```js
class People { 
    constructor() { 
        this.nicknames = ['cosine1', 'cosine2', 'cosine3']; 
    } 
    *[Symbol.iterator]() { 
        yield *this.nicknames.entries(); 
    } 
} 
let workers = new People(); 
for (let [idx, nickname] of workers) { 
    console.log(idx, nickname); 
}
// 0 cosine1
// 1 cosine2
// 2 cosine3
```

# 继承

ES 6最出色的一点就是原生支持了类继承机制，是之前原型链的一个语法糖

## 继承基础

ES6 类支持**单继承**，使用 `extends` 关键字，可以继承一个类，也可以继承普通的构造函数（保持向后兼容）

- 派生类可以通过原型链访问到类和原型上定义的方法
- `this` 的值会反映调用相应方法的实例或者类。
- `extends` 关键字也可以在类表达式中使用

## 构造函数、HomeObject 和 super()

- 派生类的方法可以通过 `super` 关键字引用它们的原型
 	- 只能在派生类中使用
 	- 仅限于**类构造函数**、**实例方法**和**静态方法**内部
 	- 在类构造函数中使用 `super` 可以调用父类构造函数。
- `[[HomeObject]]`
 	- ES6 给**类构造函数**和**静态方法**添加了内部特性 `[[HomeObject]]`
 	- 指向**定义该方法的对象**的指针，这个指针是自动赋值的，而且只能在 JavaScript 引擎内部访问。
- `super` 始终会定义为 `[[HomeObject]]` 的原型。

在使用 super 时要注意几个问题

- `super` 只能在 **派生类的构造函数和静态方法**中使用
- 不能单独引用 `super` 关键字，要么用它调用构造函数，要么用它引用静态方法
- 调用 `super()` 会调用父类构造函数，并将**返回的实例**赋值给 `this`，所以不能在调用 `super()` 之前引用 `this`
- 需要给父类构造函数传参，则需要手动将其传入`super`
- 如果**没有定义类构造函数**，在实例化派生类时会调用 `super()`，而且会**传入所有传给派生类的参数**
- 如果在派生类中显式定义了构造函数，则要么必须在其中调用 `super()`，要么必须显式的返回一个对象。

## 抽象基类

抽象基类也就是一种**可供其他类继承**，但**本身不会被实例化**的类。在其他语言中也有这种概念。虽然 ECMAScript 没有专门支持这种类的语法 ，但通过 `new.target` 也很容易实现

- `new.target` 保存通过 `new` 关键字调用的类或函数
- 通过在实例化时检测 `new.target` 是不是抽象基类，可以**阻止对抽象基类的实例化**

```js
// 抽象基类 
class Vehicle { 
    constructor() { 
        console.log(new.target); 
        if (new.target === Vehicle) { 
            throw new Error('Vehicle cannot be directly instantiated'); 
        } 
    } 
} 
// 派生类
class Bus extends Vehicle {} 
new Bus(); // class Bus {} 
new Vehicle(); // class Vehicle {} 
// Error: Vehicle cannot be directly instantiated
```

通过在抽象基类的构造函数中进行检查，可以要求派生类必须定义某个方法。因为原型方法在调用原型类的构造函数之前就已经存在了，所以可以通过 this 关键字来检查相应的方法是否定义

```js
// 抽象基类
class Vehicle { 
    constructor() { 
        if (new.target === Vehicle) 
            throw new Error('Vehicle cannot be directly instantiated'); 
        if (!this.foo)
            throw new Error('Inheriting class must define foo()'); 
        console.log('success!'); 
    } 
} 
// 派生类
class Bus extends Vehicle { foo() {} } 
// 派生类
class Van extends Vehicle {} 
new Bus(); // success! 
new Van(); // Error: Inheriting class must define foo() 
```

## 继承内置类型

ES6 类为继承内置引用类型提供了顺畅的机制，开发者可以方便地扩展内置类型，如下，向Array添加了一个洗牌算法的方法

```js
class SuperArray extends Array { 
    shuffle() { 
        // 加一个洗牌算法
        for (let i = this.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); //生成[0, i+1)的随机数
            [this[i], this[j]] = [this[j], this[i]];    // 交换两张牌
        } 
    } 
} 
let a = new SuperArray(1, 2, 3, 4, 5); 
console.log(a instanceof Array); // true 
console.log(a instanceof SuperArray); // true
console.log(a); // [1, 2, 3, 4, 5] 
a.shuffle(); 
console.log(a); // 随机的新数组
a.shuffle(); 
console.log(a); // 随机的新数组
```

有些内置类型的方法会返回新实例。默认情况下，返回实例的类型与原始实例的类型是一致的，但如果想覆盖这个默认行为，则**可以覆盖** `Symbol.species` 访问器，这个访问器**决定在创建返回的实例时使用的类**

```js
class SuperArray extends Array { 
    static get [Symbol.species]() { 
        return Array; 
    } 
} 
let a1 = new SuperArray(1, 2, 3, 4, 5); 
let a2 = a1.filter(x => !!(x%2)) 
console.log(a1); // [1, 2, 3, 4, 5] 
console.log(a2); // [1, 3, 5] 
console.log(a1 instanceof SuperArray, a1 instanceof Array); // true true
console.log(a2 instanceof SuperArray, a2 instanceof Array); // false true
```

## 类混入（多继承的模拟实现）

将不同类的行为集中到一个类是一种常见的 JavaScript 模式。虽然 ES6 **没有显式支持多类继承**，但通过现有特性可以轻松地模拟这种行为。

首先要注意以下两点：

- 如果只是需要**混入多个对象的属性**，那么使用 `Object.assign()` 就可以了。
 	- `Object.assign()` 方法是为了专门为了混入对象行为而设计的。只有在需要**混入类的行为**时才有必要**自己实现混入表达式**。
- 很多 JavaScript 框架（特别是 React）已经**抛弃混入模式**，转向了组合模式
 	- 组合即是把方法提取到独立的类和辅助对象中，然后把它们组合起来，不使用继承。
 	- 众所周知的软件设计原则：**“组合胜过继承（composition over inheritance）。”**

`extends` 关键字后面可以是一个 **JavaScript 表达式**。任何可以解析为一个类或一个构造函数的表达式都是**有效**的。这个表达式会在**求值类定义时被求值**，这就是类混入的原理

如 Person 类需要组合类A、B、C，则需要某种机制实现 B 继承 A，C 继承 B，而 Person再继承C从而实现将A、B、C组合至这个超类中：

```js
class Vehicle {} 
let AMixin = (Superclass) => class extends Superclass { 
    afunc() { console.log('A Mixin'); } 
}; 
let BMixin = (Superclass) => class extends Superclass { 
    bfunc() { console.log('B Mixin'); } 
}; 
let CMixin = (Superclass) => class extends Superclass { 
    cfunc() { console.log('C Mixin'); } 
}; 
function mixin(BaseClass, ...Mixins) { 
    return Mixins.reduce((accumulator, current) => current(accumulator), BaseClass); 
} 
class Bus extends mixin(Vehicle, AMixin, BMixin, CMixin) {} 
let b = new Bus(); 
b.afunc(); // A Mixin 
b.bfunc(); // B Mixin 
b.cfunc(); // C Mixin 
```

# 小结

- ECMAScript 6 新增的类很大程度上是基于既有原型机制的语法糖
- 类的语法让开发者可以优雅地定义向后兼容的类
- 类既可以继承内置类型，也可以继承自定义类型
- 类有效地跨越了**对象实例**、**对象原型**和**对象类**之间的鸿沟
- 通过 **类混入** 可以巧妙地实现类似多继承的效果，但不建议这么做，因为“组合胜过继承”

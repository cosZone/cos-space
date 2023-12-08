---
title: 测试文章
link: test-link-1
subtitle: 红宝书读书笔记 第八章 p205
date: 2022-03-17 23:50:52
tags:
- 前端
- JavaScript
categories:
- [一级, 二级]
---

## 代码块测试

js

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

## 列表测试

- ECMAScript 6 新增的类很大程度上是基于既有原型机制的语法糖
  - 类的语法让开发者可以优雅地定义向后兼容的类
  - `test test code`
- 类既可以继承内置类型，也可以继承自定义类型

1. 类有效地跨越了**对象实例**、**对象原型**和**对象类**之间的鸿沟

- [ ] Hello
- [ ] Test 2
- [x] Yes Yes

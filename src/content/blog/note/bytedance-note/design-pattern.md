---
title: 青训营 |「前端设计模式应用」笔记
link: note/front-end/bytedance-note/design-pattern
catalog: true
date: 2022-02-09 20:30:11
subtitle: 浏览器和js中常用的设计模式，包括单例模式、观察者模式、原型模式、代理模式、迭代器模式等
lang: cn
tags:
- 前端
- JavaScript
- 设计模式
categories:
- [笔记, 青训营笔记]
---
# 什么是设计模式

设计模式是软件设计中常见问题的解决方案模型，是历史经验的总结，与特定语言无关

设计模式大致分为23种设计模式

- 创建型——如何高效灵活的创建一个对象
- 结构型——如何灵活的将对象组装成较大的结构
- 行为型——负责对象间的高效通信和职责划分

# 浏览器中的设计模式

## 单例模式

单例模式——存在一个全局访问对象，在任意地方访问和修改都会反映在这个对象上

最常用的其实就是浏览器中的window对象，提供了对浏览器的操作的封装，常用于缓存与全局状态管理等

### 单例模式实现请求缓存

用单例模式实现请求缓存：相同的url请求，希望第二次发送请求的时候可以复用之前的一些值

首先创建Request类，该类包含一个创建单例对象的静态方法getinstance，然后真正请求的操作为request方法，向url发送请求，若缓存中存在该url则直接返回，反之则缓存到该单例对象中。可以看到如下是上节课讲过的语法~

```ts
import {api} from './utils';
export class Request {
    static instance: Request;
    private cache: Record<string, string>;
    constructor() {
        this.cache = {};
    }
    static getinstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new Request();  // 之前还未有过请求，初始化该单例
        return this.instance;
    }
    public async request(url:string) {
        if(this.cache[url]) {
            return this.cache[url];
        }
        const response = await api(url);
        this.cache[url] = response;

        return response;
    }
}
```

实际中使用如下：利用getInstance静态方法创建该单例对象，并测试起执行时间进行对比。

> ps: 这里的测试是使用[Jest](https://www.jestjs.cn/)进行的，其中用到了部分[expect](https://www.jestjs.cn/docs/expect)的api，可以通过文档了解其用途

```ts
// 不预先进行请求，测试其时间。
test('should response more than 500ms with class', async() => {
    const request = Request.getinstance();  //获取/创建一个单例对象（若之前未创建过则创建）
    const startTime = Date.now();
    await request.request('/user/1');
    const endTime = Date.now();

    const costTime = endTime-startTime;
    expect(costTime).toBeGreaterThanOrEqual(500);
});
// 先进行一次请求，在测试第二次请求的时间
test('should response quickly second time with class', async() => {
    const request1 = Request.getinstance();
    await request1.request('/user/1');

    const startTime = Date.now();   // 测试这一部分的时间
    const request2 = Request.getinstance();
    await request2.request('/user/1');
    const endTime = Date.now();  //

    const costTime = endTime-startTime;
    expect(costTime).toBeLessThan(50);
});
```

而在js中，我们也可以不用class写，这是因为传统的语言中无法export出来一个独立的方法等，只能export出来一个类

```ts
// 不用class？可以更简洁
import {api} from './utils';
const cache: Record<string,string> = {};
export const request = async (url:string) => {
    if(cache[url]) {    // 与class中一致
        return cache[url];
    }
    const response = await api(url);

    cache[url] = response;
    return response;
};
// 使用，可以看出来该方法也符合单例模式，但更加简洁。
test('should response quickly second time', async() => {
    await request('/user/1');
    const startTime = Date.now();   // 测试这一部分的时间
    await request('/user/1');
    const endTime = Date.now();

    const costTime = endTime-startTime;
    expect(costTime).toBeLessThan(50);
});
```

## 发布订阅模式（观察者模式）

应用非常广泛的一种模式，在被订阅对象发生变化时通知订阅者，常见场景很多，从系统架构之间的解耦到业务中的一些实现模式、邮件订阅等等。类似于添加事件

### 发布订阅模式实现用户上线订阅

举个实际应用的例子：通过该模式，我们可以实现用户的相互订阅，在该用户上线时调用相应的通知函数。

如图创建了一个User类， 构造器中初始状态置为离线，其拥有一个followers对象数组，包括了该用户订阅的所有{用户，调用函数}，每次在该用户上线时，遍历其followers进行通知

```ts
type Notify = (user: User) => void;
export class User {
    name: string;
    status: "offline" | "online";// 状态 离线/在线
    followers: { user:User; notify: Notify }[]; // 订阅他人的数组，包括用户及其上线时的通知函数
    constructor(name: string) {
        this.name = name;
        this.status = "offline";
        this.followers = [];
    }
    subscribe(user:User, notify: Notify) {
        user.followers.push({user, notify});
    }
    online() { // 该用户上线 调用其订阅函数
        this.status = "online";
        this.followers.forEach( ({notify}) => {
            notify(this);
        });
    }
}
```

测试函数：还是用jest，创建假的订阅函数进行测试（

```ts
test("should notify followers when user is online for multiple users", () => {
   const user1 = new User("user1");
   const user2 = new User("user2"); 
   const user3 = new User("user3"); 
   const mockNotifyUser1 = jest.fn();   // 通知user1的函数
   const mockNotifyUser2 = jest.fn();   // 通知user2的函数
   user1.subscribe(user3, mockNotifyUser1); // 1订阅了3
   user2.subscribe(user3, mockNotifyUser2); // 2订阅了3
   user3.online();  // 3上线，调用mockNotifyUser1和mockNotifyUser2
   expect(mockNotifyUser1).toBeCalledWith(user3);
   expect(mockNotifyUser2).toBeCalledWith(user3);
});
```

# JavaScript中的设计模式

## 原型模式

可以想到javascript中的常见语言特性：原型链，原型模式指的其实就是复制一个已有的对象来创建新的对象，这在对象十分庞大的时候会有比较好的性能（相比起直接创建）。常用于js中对象的创建

### 原型模式创建上线订阅中的用户

首先，创建一个原型，可以看到这个原型相比起之前的来说没有定义构造器。

```ts
// 原型模式，当然要有原型啦
const baseUser:User = { 
    name: "",
    status: "offline",
    followers: [],
    subscribe(user, notify) {
        user.followers.push({user, notify});
    },
    online() { // 该用户上线 调用其订阅函数
        this.status = "online";
        this.followers.forEach( ({notify}) => {
            notify(this);
        });
    }
}
```

导出在该原型之上创建对象的函数，该函数接受一个name参数，利用[Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 使用原型来创建一个新对象，并在其基础上进行增加或修改

```ts
// 然后导出在该原型之上创建对象的函数
export const createUser = (name:string) => {
    const user:User = Object.create(baseUser);
    user.name = name;
    user.followers = [];
    return user;
};
```

实际使用：可以看到将new User变成了createUser

```ts
test("should notify followers when user is online for user prototypes", () => {
    const user1 = createUser("user1");
    const user2 = createUser("user2");
    const user3 = createUser("user3");
    const mockNotifyUser1 = jest.fn();   // 通知user1的函数
    const mockNotifyUser2 = jest.fn();   // 通知user2的函数
    user1.subscribe(user3, mockNotifyUser1); // 1订阅了3
    user2.subscribe(user3, mockNotifyUser2); // 2订阅了3
    user3.online();  // 3上线，调用mockNotifyUser1和mockNotifyUser2
    expect(mockNotifyUser1).toBeCalledWith(user3);
    expect(mockNotifyUser2).toBeCalledWith(user3);
});
```

## 代理模式

可自定义控制队员对象的访问方式，并且允许在更新前后做一些额外处理，常用于监控、代理工具、前端框架等等。JS中有自带的代理对象：[Proxy()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy) ，在红宝书中代理那章也有详细阐述。

### 代理模式实现用户状态订阅

还是上述观察者模式的例子，可以使用代理模式对其进行优化，让他的online函数只做一件事：更改状态为上线。

```ts
type Notify = (user: User) => void;
export class User {
    name: string;
    status: "offline" | "online";// 状态 离线/在线
    followers: { user:User; notify: Notify }[]; // 订阅他人的数组，包括用户及其上线时的通知函数
    constructor(name: string) {
        this.name = name;
        this.status = "offline";
        this.followers = [];
    }
    subscribe(user:User, notify: Notify) {
        user.followers.push({user, notify});
    }
    online() { // 该用户上线 调用其订阅函数
        this.status = "online";
        // this.followers.forEach( ({notify}) => {
        //     notify(this);
        // });
    }
}
```

创建User的一个代理：ProxyUser

> Proxy函数说明
>
> `target`
>
> 要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
>
> `handler`
>
> 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

```ts
// 创建代理，监听其上线状态的变化
export const createProxyUser = (name:string) => {
    const user = new User(name); //正常的user
    // 代理的对象
    const proxyUser = new Proxy(user, { 
        set: (target, prop: keyof User, value) => {
            target[prop] = value;
            if(prop === 'status') {
                notifyStatusHandlers(target, value);
            }
            return true;
        }
    })
    const notifyStatusHandlers = (user: User, status: "online" | "offline") => {
        if(status === "online") {
            user.followers.forEach(({notify}) => {
                notify(user);
            });
        }
    };
    return proxyUser;
}
```

## 迭代器模式

在不暴露数据类型的情况下访问集合中的数据，常用于数据结构中拥有多种数据类型（列表、

树等），提供通用的操作接口。

### 用for of 迭代所有组件

用到了 [Symbol.iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)  该迭代器可以被 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环使用。

定义一个list 队列，每次从队首取个节点出来，如果这个节点有孩子结点将其全部添加到队尾，每次调用next都返回一个结点~详见代码

```ts
class MyDomElement {
    tag: string;
    children: MyDomElement[];
    constructor(tag:string) {
        this.tag = tag;
        this.children = [];
    }
    addChildren(component: MyDomElement) {
        this.children.push(component);
    }
    [Symbol.iterator]() {
        const list = [...this.children];
        let node;
        return {
            next: () => {
                while((node = list.shift())) { // 每次从队首取个节点出来，如果有孩子结点将其添加到队尾
                    node.children.length > 0 && list.push(...node.children);
                    return { value: node, done: false };
                }
                return { value:null, done:true };
            },
        };
    }
}
```

使用场景如下：通过for of迭代body中的所有子元素

```ts
test("can iterate root element", () => {
    const body = new MyDomElement("body");
    const header = new MyDomElement("header");
    const main = new MyDomElement("main");
    const banner = new MyDomElement("banner");
    const content = new MyDomElement("content");
    const footer = new MyDomElement("footer");
    
    body.addChildren(header);
    body.addChildren(main);
    body.addChildren(footer);
    
    main.addChildren(banner);
    main.addChildren(content);
    
    const expectTags: string[] = [];
    for(const element of body) { // 迭代body的所有元素，需要包含main中的子元素
        if(element) {
            expectTags.push(element.tag);
        }
    }
    
    expect(expectTags.length).toBe(5);
});
```

# 前端框架中的设计模式（React、Vue...）

## 代理模式

与之前讲的Proxy不太一样

### Vue组件实现计数器

```html
<template>
 <button @click="count++">count is:{{ count }}</button>
</template>
<script setup lang="ts">
import {ref} from "vue";
const count = ref(0);
</script>
```

上述代码，为什么count能随点击而变化？这就要说到前端框架中对DOM操作的代理了：

更改DOM属性 -> 视图更新

更改DOM属性 -> 更新虚拟DOM -Diff-> 视图更新

如下就是前端框架对DOM的一个代理，通过其提供的钩子可以在更新前后进行操作：

```html
<template>
 <button @click="count++">count is:{{ count }}</button>
</template>
<script setup lang="ts">
import { ref, onBeforeUpdate, onUpdated } from "vue";
const count = ref(0);
const dom = ref<HTMLButtonElement>();
onBeforeUpdate(() => {
    console.log("Dom before update", dom.value?.innerText);
});
onUpdated(() => {
    console.log("Dom after update", dom.value?.innerText);
});
</script>
```

## 组合模式

可以多个对象组合使用，也可以单个对象独立使用，常应用于前端组件，最经典的就是React的组件结构：

### React组件结构

还是计数器的例子~

```tsx
export const Count = () => {
    const [count, setCount] = useState(0);
    return (
     <button onClick={() => setCount((count) => count+1)}>
         count is: {count}
        </button>
    );
};
```

该Count，既可以独立渲染，也可以渲染在App中，后者就是一种组合

```react
function App() {
    return (
        <div className = "App">
         <Header />
            <Count />
            <Footer />
        </div>
    );
}
```

# 总结感想

下面是老师的一些总结：

> 设计模式不是银弹，总结出抽象的模式听起来比较简单，但是想要将抽象的模式套用到实际的场景中却非常困难，现代编程语言的多编程范式带来了更多的可能性，我们要在真正优秀的开源项目中学习设计模式并不断实践

这节课讲了浏览器和js中常用的设计模式，包括单例模式、观察者模式、原型模式、代理模式、迭代器模式等，还讲了设计模式究竟有什么用~在我看来，从实际的项目中学习设计模式确实是一种比较好的方法。  

> 本文引用的大部分内容来自吴立宁老师的课

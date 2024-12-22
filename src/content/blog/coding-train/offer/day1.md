---
title: 剑指offer day1 栈与队列（简单）
link: coding-train/leetcode/offer/day1
catalog: true
subtitle: 知识点：栈、队列、设计，难度为简单、简单
date: 2022-03-30 16:00:52
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 栈
- 队列
- 设计
categories:
- [题目记录, 剑指offer]
---
day1题目：[剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)、[剑指 Offer 30. 包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)

知识点：栈、队列、设计，难度为简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                       | 知识点         | 难度 |
| ---------------------------------------------------------------------------------------------------------- | -------------- | ---- |
| [剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/) | 栈、设计、队列 | 简单 |
| [剑指 Offer 30. 包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)           | 栈、设计       | 简单 |

# [剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 `appendTail` 和 `deleteHead` ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，`deleteHead` 操作返回 -1 )

**示例 1：**

```
输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出： [null,null,3,-1]
```

**示例 2：**

```
输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出： [null,-1,null,null,5,2]
```

**提示：**

- `1 <= values <= 10000`
- `最多会对 appendTail、deleteHead 进行 10000 次调用`

## 思路及代码

```javascript
// @algorithm @lc id=100273 lang=javascript 
// @title yong-liang-ge-zhan-shi-xian-dui-lie-lcof
var CQueue = function() {
    this.s1 = []        // 入队
    this.s2 = []        // 出队
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.s1.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.s2.length == 0) {
        while(this.s1.length > 0)
            this.s2.push(this.s1.pop())
        return this.s2.length == 0 ? -1 : this.s2.pop()
    } else return this.s2.pop()
};
/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
// 测试
 var obj = new CQueue()
 obj.appendTail(3)
 obj.appendTail(4)
 obj.appendTail(7)
 console.log(obj.deleteHead())
 console.log(obj.deleteHead())
 console.log(obj.deleteHead())
```

# [剑指 Offer 30. 包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

**示例:**

```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
```

**提示：**

1. 各函数的调用总次数不超过 20000 次

注意：本题与主站 155 题相同：[https://leetcode-cn.com/problems/min-stack/](https://leetcode-cn.com/problems/min-stack/)

## 思路及代码

```javascript
// @algorithm @lc id=100302 lang=javascript 
// @title bao-han-minhan-shu-de-zhan-lcof
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.s = []
    this.mins = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.s.push(x)
    if(this.mins.length == 0 || x <= this.mins[this.mins.length - 1])   // push的元素小于当前元素，将其放入mins
        this.mins.push(x)
};

/**
 * @return {void}
 */
 MinStack.prototype.pop = function() {
    let x = this.s.pop()
    if(x === this.mins[this.mins.length - 1]) // 如果pop的元素是mins的最后一个元素，则mins也要pop
        this.mins.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.s[this.s.length - 1]
};

/**
 * @return {number}
 */
 MinStack.prototype.min = function() {
    return this.mins[this.mins.length - 1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
 var obj = new MinStack()
 obj.push(-2)
 obj.push(0)
 obj.push(-3)
 console.log(obj.min())     // -3
 obj.pop()
 console.log(obj.top())     // 0
console.log(obj.min())      // -2
```

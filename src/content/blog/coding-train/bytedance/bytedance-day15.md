---
title: 冲刺春招-精选笔面试66题大通关day15
link: coding-train/leetcode/bytedance/bytedance-day15
catalog: true
subtitle:  今日知识点：栈、队列、回溯、哈希表等，难度为简单、中等、中等
date: 2022-03-22 23:10:32
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 回溯
categories:
- [题目记录, 字节校园]
---

day15题目：[232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)、[22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)、[128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：栈、队列、回溯、哈希表等，难度为简单、中等、中等

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day14](https://juejin.cn/post/7077510120686485541)

# [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（`push`、`pop`、`peek`、`empty`）：

实现 `MyQueue` 类：

- `void push(int x)` 将元素 x 推到队列的末尾
- `int pop()` 从队列的开头移除并返回元素
- `int peek()` 返回队列开头的元素
- `boolean empty()` 如果队列为空，返回 `true` ；否则，返回 `false`

**说明：**

- 你 **只能** 使用标准的栈操作 —— 也就是只有 `push to top`, `peek/pop from top`, `size`, 和 `is empty` 操作是合法的。
- 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

**示例 1：**

```
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

**提示：**

- `1 <= x <= 9`
- 最多调用 `100` 次 `push`、`pop`、`peek` 和 `empty`
- 假设所有操作都是有效的 （例如，一个空的队列不会调用 `pop` 或者 `peek` 操作）

**进阶：**

- 你能否实现每个操作均摊时间复杂度为 `O(1)` 的队列？换句话说，执行 `n` 个操作的总时间复杂度为 `O(n)` ，即使其中一个操作可能花费较长时间。

## 思路

两个栈模拟队列

- `push` 时直接推入栈 `s1`
- 需要 `pop` 或者 `peek` 时利用栈 `s2`
  - 只要 `s2` 为空，将栈 `s1` 中的元素全部依次出栈，并推入栈 `s2`，再对 `s2` 进行 `pop` 或者 `peek` 操作即可得到正确的先进先出顺序
  - 若 `s2` 不为空，直接对 `s2` 进行 `pop` 或者 `peek` 操作即可

## 代码

```cpp
class MyQueue {
public:
    stack<int> s1;
    stack<int> s2;
    MyQueue() {
    }
    
    void push(int x) {
        s1.push(x);
    }
    
    int pop() {
        if(s2.empty()) {
            while(!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        int t = s2.top();
        s2.pop();
        return t;
    }
    
    int peek() {
        if(s2.empty()) {
            while(!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        return s2.top();
    }
    
    bool empty() {
        return s1.empty() && s2.empty();
    }
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue* obj = new MyQueue();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->peek();
 * bool param_4 = obj->empty();
 */
 ```

# [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。

**示例 1：**

```
输入： n = 3
输出： ["((()))","(()())","(())()","()(())","()()()"]
```

**示例 2：**

```
输入： n = 1
输出： ["()"]
```

**提示：**

- `1 <= n <= 8`

## 思路

这道题是 [2020蓝桥杯省模拟赛题目记录](https://blog.csdn.net/qq_45890533/article/details/105668209) 中的括号序列（一模一样），回溯法

- 因为要生成 `n` 对括号，故传入括号总数 `sum` 初始为 `n*2`，已使用左括号数 `lnum` 和右括号数 `rnum`
- 先排列左括号，再排右括号，这样若 `lnum < rnum` 就直接返回
- 当剩余待排括号数 `sum == 0` 时，取出这个括号序列 `par` 并返回
- 当左括号数 `lnum < n`，即还可以放左括号进去，就 `push` 一个左括号入 `par`，并继续生成，返回后则 `pop` 以恢复之前的括号序列。
- 右括号逻辑同理

## 代码

```js
/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function(n) {
    let ans = [];
    let par = [];   // 当前括号序列
    let generate = function(sum, lnum, rnum) {    // 剩余括号数， 已使用左括号数，已使用右括号数
        if(lnum < rnum) return;
        if(sum == 0) {
            ans.push(par.join(''));
            return;
        }
        if(lnum < n) {
            par.push('(');
            generate(sum-1, lnum+1, rnum);
            par.pop();
        }
        if(rnum < n) {
            par.push(')');
            generate(sum-1, lnum, rnum+1);
            par.pop();
        }
    }
    generate(n*2, 0, 0);
    return ans;
};
```

# [128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

给定一个未排序的整数数组 `nums` ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 `O(n)` **的算法解决此问题。

**示例 1：**

```
输入： nums = [100,4,200,1,3,2]
输出： 4
解释： 最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
```

**示例 2：**

```
输入： nums = [0,3,7,2,5,8,4,6,0,1]
输出： 9
```

**提示：**

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## 思路

- 利用hash表存 `nums[i]` 是否存在
- 枚举数组中的每个数 `nums[i]`
  - 以 `nums[i]` 为起点，判断`nums[i]-1`、`nums[i]-2` …… `y`是否存在并更新最大长度，直到`y` 不存在
  - 若 `nums[i]+1` 存在则当前 `nums[i]` 无需判断，直接跳过

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    if(nums.length == 0) return 0;
    let m = new Map()
    for(let i = 0; i < nums.length; ++i) 
        m.set(nums[i], true);
    let ans = 1;
    for(let i = 0; i < nums.length; ++i) {
        if(!m.has(nums[i]+1)) {
            let num = nums[i]-1;
            let cnt = 1;
            while( m.has(num) ) {
                if(++cnt > ans) ans = cnt;
                --num;
            }
        }
    }
    return ans;
};
```

---
title: 剑指offer day27 栈与队列（困难）
link: coding-train/leetcode/offer/day27
catalog: true
subtitle: 知识点：队列、设计、滑动窗口，难度为困难、中等
date: 2022-04-25 23:32:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 队列
- 滑动窗口
- 设计
categories:
- [题目记录, 剑指offer]
---

day27题目：[剑指 Offer 59 - I. 滑动窗口的最大值](https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/)、[剑指 Offer 59 - II. 队列的最大值](https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/)

知识点：队列、设计、滑动窗口，难度为困难、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 59 - I. 滑动窗口的最大值](https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/) | [队列](https://leetcode-cn.com/tag/queue)、[滑动窗口](https://leetcode-cn.com/tag/sliding-window)、[单调队列](https://leetcode-cn.com/tag/monotonic-queue) | 困难 |
| [剑指 Offer 59 - II. 队列的最大值](https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/) | [设计](https://leetcode-cn.com/tag/design)、[队列](https://leetcode-cn.com/tag/queue)、[单调队列](https://leetcode-cn.com/tag/monotonic-queue) | 中等 |

# [剑指 Offer 59 - I. 滑动窗口的最大值](https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/)

给定一个数组 `nums` 和滑动窗口的大小 `k`，请找出所有滑动窗口里的最大值。

**示例:**

```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 
  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**提示：**

你可以假设 *k* 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。

注意：本题与主站 239 题相同：<https://leetcode-cn.com/problems/sliding-window-maximum/>

## 思路及代码

[冲刺春招-精选笔面试66题大通关16](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day16/#239) 同款题

用一个队列q存储下标，其对应元素单调递减

- 若滑动窗口中两个元素 `j < i` 并且 `nums[j] <= nums[i]` ，只要 `j` 还在窗口中，那么 `i` 一定也还在窗口中，所以最值一定不是 `nums[j]`，故可以将其移除
- 滑动过程中记录，若队尾元素小于等于当前新元素，则弹出，直到为空或者队尾元素大于新元素
- 同时若队头所存下标 `q[0]` 小于窗口左侧 `l`，则不断将队首弹出

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if(nums.length === 0) return [];
    let q = []
    let res = []
    for(let i = 0; i < k; ++i) {
        while(q.length && nums[i] >= nums[q[q.length - 1]] )
            q.pop()
        q.push(i)
    }
    res.push(nums[q[0]])
    for(let l = 1; l+k-1 < nums.length; ++l) {
        let r = l+k-1
        while(q.length && nums[q[q.length - 1]] < nums[r]) 
            q.pop()
        q.push(r)
        while(q.length && q[0] < l)
            q.shift()
        res.push(nums[q[0]])
    }
    return res
};
```

# [剑指 Offer 59 - II. 队列的最大值](https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/)

请定义一个队列并实现函数 `max_value` 得到队列里的最大值，要求函数`max_value`、`push_back` 和 `pop_front` 的**均摊**时间复杂度都是O(1)。

若队列为空，`pop_front` 和 `max_value` 需要返回 -1

**示例 1：**

```
输入: 
["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]
[[],[1],[2],[],[],[]]
输出: [null,null,null,2,1,2]
```

**示例 2：**

```
输入: 
["MaxQueue","pop_front","max_value"]
[[],[],[]]
输出: [null,-1,-1]
```

**限制：**

- `1 <= push_back,pop_front,max_value的总操作数 <= 10000`
- `1 <= value <= 10^5`

## 思路及代码

比较类似之前的min栈：[剑指offer day1 栈与队列（简单）](https://ysx.cosine.ren/cn/coding-train/leetcode/offer/day1/#offer-30-min)

```javascript
// @algorithm @lc id=100337 lang=javascript 
// @title dui-lie-de-zui-da-zhi-lcof
var MaxQueue = function() {
    this.maxq = []
    this.q = []
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
    if(this.maxq.length == 0) return -1
    return this.maxq[0] 
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
    this.q.push(value)
    while(this.maxq.length != 0 && this.maxq[this.maxq.length - 1] < value)
        this.maxq.pop()
    this.maxq.push(value)
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
    if(this.maxq.length == 0 || this.q.length == 0) return -1
    let value = this.q.shift()  
    if(this.maxq.length != 0 && value == this.maxq[0])
        this.maxq.shift()
    return value
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */
```

---
title: 剑指offer day23 数学（简单）
link: coding-train/leetcode/offer/day23
catalog: true
subtitle: 知识点：数组、哈希、前缀和，难度为简单、中等
date: 2022-04-21 15:19:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 哈希
- 前缀和
categories:
- [题目记录, 剑指offer]
---

day23题目：[剑指 Offer 39. 数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)、[剑指 Offer 66. 构建乘积数组](https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof/)

知识点：数组、哈希、前缀和，难度为简单、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 39. 数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[哈希表](https://leetcode-cn.com/tag/hash-table)、[分治](https://leetcode-cn.com/tag/divide-and-conquer)、[计数](https://leetcode-cn.com/tag/counting)\ | 简单 |
| [剑指 Offer 66. 构建乘积数组](https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[前缀和](https://leetcode-cn.com/tag/prefix-sum) | 中等 |

# [剑指 Offer 39. 数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

**示例 1:**

```
输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
输出: 2
```

**限制：**

`1 <= 数组长度 <= 50000`

注意：本题与主站 169 题相同：<https://leetcode-cn.com/problems/majority-element/>

## 思路及代码

思路一：利用哈希，当出现次数超过一半就立刻返回，但这样空间复杂度和时间复杂度都为O(n)

```javascript
var majorityElement = function(nums) {
    let m = new Map()
    for ( let i = 0; i < nums.length; i++) {
        if (m.has(nums[i])) {
            let t = m.get(nums[i])
            if(t+1 > Math.floor(nums.length / 2))
                return nums[i]
            m.set(nums[i],t + 1)
        } else m.set(nums[i], 1)
    }
    return nums[nums.length-1]
};
```

思路二：在大神[Krahets](https://leetcode-cn.com/u/jyd/)题解中提到的 [摩尔投票法](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/solution/mian-shi-ti-39-shu-zu-zhong-chu-xian-ci-shu-chao-3/)，主要要注意两个推论，详见题解。

- 推论一： 若记 **众数** 的票数为 `+1` ，**非众数** 的票数为 `-1` ，则一定有所有数字的**票数和** `> 0`。
- 推论二： 若数组的前 `a` 个数字的 **票数和** `= 0` ，则 数组剩余 `(n−a)` 个数字的 **票数和一定仍** `> 0` ，即后 `(n-a)` 个数字的 众数仍为 `x`。

> ps：这个思路真是清奇。没想到

```javascript
var majorityElement = function(nums) {
    let vote = 0;
    let candidate = null;
    for (let num of nums) {
        if (vote === 0) 
            candidate = num;
        vote += (num === candidate) ? 1 : -1;
    }
    return candidate;
};
```

# [剑指 Offer 66. 构建乘积数组](https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof/)

给定一个数组 `A[0,1,…,n-1]`，请构建一个数组 `B[0,1,…,n-1]`，其中 `B[i]` 的值是数组 `A` 中除了下标 `i` 以外的元素的积, 即 `B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]`。不能使用除法。

**示例:**

```
输入: [1,2,3,4,5]
输出: [120,60,40,30,24]
```

**提示：**

- 所有元素乘积之和不会溢出 32 位整数
- `a.length <= 100000`

## 思路及代码

这题就有些类似之前字节校园的题目：[冲刺春招-精选笔面试66题大通关day14：135. 分发糖果](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day14/#%E6%80%9D%E8%B7%AF-3) 的弱化弱化版了，从左往右初始化下数组 `l`, `l[i]`表示i左侧所有数字的乘积，而第二次遍历从右侧开始，算出右侧乘积和后直接加到数组上。

```javascript
/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    let res = new Array(a.length)
    let l = [1]
    for (let i = 1; i < a.length; i++) 
        l.push(l[i-1] * a[i-1])
    let r = 1;
    for (let i = a.length - 1; i >= 0; --i) { // 右侧乘积 & res计算
        if(i != a.length-1)
            r *= a[i+1]
        res[i] = l[i] * r
    }
    return res
};
```

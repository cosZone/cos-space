---
title: 剑指offer day24 数学（中等）
link: coding-train/leetcode/offer/day24
catalog: true
subtitle: 知识点：数学、双指针，难度为中等、简单、简单
date: 2022-04-22 23:49:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数学
- 双指针
categories:
- [题目记录, 剑指offer]
---

day24题目：[剑指 Offer 14- I. 剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/)、[剑指 Offer 57 - II. 和为s的连续正数序列](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)、[剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)

知识点：数学、双指针，难度为中等、简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 14- I. 剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/) | [数学](https://leetcode-cn.com/tag/math)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming) | 中等 |
| [剑指 Offer 57 - II. 和为s的连续正数序列](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/) | [数学](https://leetcode-cn.com/tag/math)、[双指针](https://leetcode-cn.com/tag/two-pointers)、[枚举](https://leetcode-cn.com/tag/enumeration) | 简单 |
| [剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/) | [递归](https://leetcode-cn.com/tag/recursion)、[数学](https://leetcode-cn.com/tag/math) | 简单 |

# [剑指 Offer 14- I. 剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/)

给你一根长度为 `n` 的绳子，请把绳子剪成整数长度的 `m` 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 `k[0],k[1]...k[m-1]` 。请问 `k[0]*k[1]*...*k[m-1]` 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

**示例 1：**

```
输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1
```

**示例 2:**

```
输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36
```

**提示：**

- `2 <= n <= 58`

注意：本题与主站 343 题相同：<https://leetcode-cn.com/problems/integer-break/>

## 思路及代码

数学题，没做出来，看了题解的推导 [面试题14- I. 剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/solution/mian-shi-ti-14-i-jian-sheng-zi-tan-xin-si-xiang-by/)，主要有以下几点

- 将绳子以相等长度切分为多段时，所得乘积最大。
- 尽可能将绳子以`长度3等分` 为多段时，乘积最大
  - 若最后一段为 `2` 保留，不在拆分为 `1+1`
  - 若最后一段为 `1` 应将一份 `3+1` 换为 `2+2`
则有以下算法流程：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
    if(n <= 3) return n-1
    let [a, b] = [Math.floor(n/3), n%3]
    if(b === 0) return Math.pow(3, a)
    if(b === 1) return Math.pow(3, a-1) * 4
    return Math.pow(3, a) * 2
};
```

# [剑指 Offer 57 - II. 和为s的连续正数序列](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)

输入一个正整数 `target` ，输出所有和为 `target` 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

**示例 1：**

```
输入： target = 9
输出： [[2,3,4],[4,5]]
```

**示例 2：**

```
输入： target = 15
输出： [[1,2,3,4,5],[4,5,6],[7,8]]
```

**限制：**

- `1 <= target <= 10^5`

## 思路及代码

双指针。

```javascript
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    let res = []
    let [l, r] = [1, 2]
    while(l < r) {
        let sum = (l+r) * (r-l+1) / 2
        if(sum === target) { 
            let temp = []
            for(let i = l; i <= r; i++)
                temp.push(i)
            res.push(temp)
            ++l
        } else if(sum < target) ++r
        else ++l
    }
    return res
};
```

# [剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)

0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。

例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

**示例 1：**

```
输入: n = 5, m = 3
输出: 3
```

**示例 2：**

```
输入: n = 10, m = 17
输出: 2
```

**限制：**

- `1 <= n <= 10^5`
- `1 <= m <= 10^6`

## 思路及代码

约瑟夫环。

```javascript
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
   let res = 0
   for(let i = 2; i <= n; i++) {
       res = (res + m) % i
   }
   return res
};
```

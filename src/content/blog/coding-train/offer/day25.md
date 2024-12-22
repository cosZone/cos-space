---
title: 剑指offer day25 模拟（中等）
link: coding-train/leetcode/offer/day25
catalog: true
subtitle: 知识点：数组、栈、模拟，难度为简单、中等
date: 2022-04-23 23:00:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 栈
- 模拟
categories:
- [题目记录, 剑指offer]
---

day25题目：[剑指 Offer 29. 顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)、[剑指 Offer 31. 栈的压入、弹出序列](https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/)

知识点：数组、栈、模拟，难度为简单、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 29. 顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[矩阵](https://leetcode-cn.com/tag/matrix)、[模拟](https://leetcode-cn.com/tag/simulation) | 简单 |
| [剑指 Offer 31. 栈的压入、弹出序列](https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/) |  [栈](https://leetcode-cn.com/tag/stack)、[数组](https://leetcode-cn.com/tag/array)、[模拟](https://leetcode-cn.com/tag/simulation) | 中等 |

# [剑指 Offer 29. 顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

**示例 1：**

```
输入： matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出： [1,2,3,6,9,8,7,4,5]
```

**示例 2：**

```
输入： matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出： [1,2,3,4,8,12,11,10,9,5,6,7]
```

**限制：**

- `0 <= matrix.length <= 100`
- `0 <= matrix[i].length <= 100`

注意：本题与主站 54 题相同：<https://leetcode-cn.com/problems/spiral-matrix/>

## 思路及代码

这不还是螺旋矩阵嘛！

移步[冲刺春招-精选笔面试66题大通关day6](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day6/#54)

- 每次就一直往右下左上的顺序走就行了

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    let [n, cnt] = [matrix.length, 1]
    if(n == 0) return []
    let [m, res] = [matrix[0].length, []]
    let sum = n*m
    let [r, c] = [0, 0]
    res.push(matrix[0][0])
    while(cnt < sum) {
        while(c+1 < m && matrix[r][c+1] != null) {
            res.push(matrix[r][c+1])
            ++cnt
            matrix[r][c++] = null
        }
        while(r+1 < n && matrix[r+1][c] != null) {
            res.push(matrix[r+1][c])
            ++cnt
            matrix[r++][c] = null
        }
        while(c-1 >= 0 && matrix[r][c-1] != null) {
            res.push(matrix[r][c-1])
            ++cnt
            matrix[r][c--] = null
        }
        while(r-1 >= 0 && matrix[r-1][c] != null) {
            res.push(matrix[r-1][c])
            ++cnt
            matrix[r--][c] = null
        }
    }
    return res
};
```

# [剑指 Offer 31. 栈的压入、弹出序列](https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/)

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。

**示例 1：**

```
输入： pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
输出： true
解释： 我们可以按以下顺序执行：
push(1), push(2), push(3), push(4), pop() -> 4,
push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
```

**示例 2：**

```
输入： pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
输出： false
解释： 1 不能在 2 之前弹出。
```

**提示：**

1. `0 <= pushed.length == popped.length <= 1000`
1. `0 <= pushed[i], popped[i] < 1000`
1. `pushed` 是 `popped` 的排列。

注意：本题与主站 946 题相同：<https://leetcode-cn.com/problems/validate-stack-sequences/>

## 思路及代码

每次入栈后判断是否可以弹出序列。

```javascript
// @title zhan-de-ya-ru-dan-chu-xu-lie-lcof
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
    let s = []
    let cnt = 0
    for(let i = 0; i < pushed.length; ++i) {
        s.push(pushed[i])
        while(s.length > 0 && s[s.length - 1] === popped[cnt]) {
            s.pop()
            ++cnt
        }
    }
    return s.length == 0
};
```

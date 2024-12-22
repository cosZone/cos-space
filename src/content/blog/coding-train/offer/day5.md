---
title: 剑指offer day5 查找算法（中等）
link: coding-train/leetcode/offer/day5
catalog: true
subtitle: 知识点：数组、二分、哈希，难度为中等、简单、简单
date: 2022-04-03 15:30:52
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 哈希
- 二分
categories:
- [题目记录, 剑指offer]
---
day5题目：[剑指 Offer 04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)、[剑指 Offer 11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)、[剑指 Offer 50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)

知识点：数组、二分、哈希，难度为中等、简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                              | 知识点       | 难度 |
| ----------------------------------------------------------------------------------------------------------------- | ------------ | ---- |
| [剑指 Offer 04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)            | 数组、二分   | 中等 |
| [剑指 Offer 11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)     | 数组、二分   | 简单 |
| [剑指 Offer 50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/) | 字符串、哈希 | 简单 |

# [剑指 Offer 04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

**示例:**

现有矩阵 matrix 如下：

```
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
```

给定 target = `5`，返回 `true`。

给定 target = `20`，返回 `false`。

**限制：**

`0 <= n <= 1000`

`0 <= m <= 1000`

**注意：** 本题与主站 240 题相同：[https://leetcode-cn.com/problems/search-a-2d-matrix-ii/](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)

## 思路及代码

思路1：二分法+一些优化

```javascript
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    if(matrix.length == 0) return false;
    let [n, m] = [matrix.length, matrix[0].length];
    for(let k = 0; k < n; ++k) {
        if(matrix[k][0] > target) 
            break;
        if(matrix[k][m - 1] < target) 
            continue;
        let [l, r] = [0, m-1]
        while(l <= r) {
            let mid = (l+r)>>1;
            if(matrix[k][mid] === target) 
                return true;
            if(matrix[k][mid] > target) r = mid - 1;
            else l = mid + 1;
        }
    }
    return false;
};
```

思路2：站在数组右上角看这其实是一个二叉搜索树：[二维数组中的查找 - 力扣](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/solution/mian-shi-ti-04-er-wei-shu-zu-zhong-de-cha-zhao-zuo/)

二叉搜索树中左边元素都比他小，右边元素都比他大，故这里若当前元素小于目标值则向右（实际是向下r++）找，大于目标值则向左（实际是向左c--）找。

```javascript
var findNumberIn2DArray = function(matrix, target) {
    if(matrix.length == 0) return false;
    let [n, m] = [matrix.length, matrix[0].length];
    let [r, c] = [0, m - 1];
    while(r < n && c >= 0) {
        if(matrix[r][c] == target) return true;
        else if(matrix[r][c] > target) --c;
        else ++r;
    }
    return false;
};
```

# [剑指 Offer 11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

给你一个可能存在 **重复** 元素值的数组 `numbers` ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的**最小元素**。例如，数组 `[3,4,5,1,2]` 为 `[1,2,3,4,5]` 的一次旋转，该数组的最小值为 1。  

注意，数组 `[a[0], a[1], a[2], ..., a[n-1]]` 旋转一次 的结果为数组 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]` 。

**示例 1：**

```
输入： numbers = [3,4,5,1,2]
输出： 1
```

**示例 2：**

```
输入： numbers = [2,2,2,0,1]
输出： 0
```

**提示：**

- `n == numbers.length`
- `1 <= n <= 5000`
- `-5000 <= numbers[i] <= 5000`
- `numbers` 原来是一个升序排序的数组，并进行了 `1` 至 `n` 次旋转

注意：本题与主站 154 题相同：[https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)

## 思路及代码

在之前做过的 `33. 搜索旋转排序数组` 有讲过：[冲刺春招-精选笔面试 66 题大通关 day6](https://juejin.cn/post/7077502432942489607#heading-0)

因为可能有重复的元素，故此题还需注意重复元素处的 `--r`

这题的题解可以看官方的很详细：[旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/solution/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-by-leetcode-s/)

```javascript
var minArray = function(numbers) {
    if(numbers.length == 0) return 0;
    let [l, r] = [0, numbers.length - 1];
    while(l < r) {
        let mid = (l + r) >> 1;
        if(numbers[mid] > numbers[r]) l = mid + 1;
        else if(numbers[mid] < numbers[r]) r = mid;
        else --r;
    }
    return numbers[l];
};
```

# [剑指 Offer 50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

**示例 1:**

```
输入：s = "abaccdeff"
输出：'b'
```

**示例 2:**

```
输入：s = "" 
输出：' '
```

**限制：**

`0 <= s 的长度 <= 50000`

## 思路及代码

遍历一遍用哈希表存，出现过两次以上的都按两次算。

```javascript
var firstUniqChar = function(s) {
    let m = new Map();
    for (let i = 0; i < s.length; i++)
        m.set(s[i], m.has(s[i]) ? 2 : 1);
    for (let i = 0; i < s.length; i++) 
        if (m.get(s[i]) === 1) 
            return s[i];
    return ' ';
};
```

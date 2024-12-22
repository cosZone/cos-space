---
title: 剑指offer day30 分治算法（困难）
link: coding-train/leetcode/offer/day30
catalog: true
subtitle: 知识点：数组、数学、分治，难度为简单、困难
date: 2022-04-28 23:08:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 数学
- 分治
categories:
- [题目记录, 剑指offer]
---

day30题目：[剑指 Offer 17. 打印从1到最大的n位数](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)、[剑指 Offer 51. 数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)

知识点：数组、数学、分治，难度为简单、困难

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 17. 打印从1到最大的n位数](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[数学](https://leetcode-cn.com/tag/math) | 简单 |
| [剑指 Offer 51. 数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)| [树状数组](https://leetcode-cn.com/tag/binary-indexed-tree)、[线段树](https://leetcode-cn.com/tag/segment-tree)、[数组](https://leetcode-cn.com/tag/array) | 困难 |

# [剑指 Offer 17. 打印从1到最大的n位数](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)

输入数字 `n`，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

**示例 1:**

```
输入: n = 1
输出: [1,2,3,4,5,6,7,8,9]
```

说明：

- 用返回一个整数列表来代替打印
- n 为正整数

## 思路及代码

不考虑大数，那么这道题秒杀。考虑的话……不听不听我不听QAQ（以后有机会补上）

```javascript
/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function(n) {
    let maxv = Math.pow(10, n)
    let res = []
    for(let i = 1; i < maxv; ++i) 
        res.push(i)
    return res
};
```

# [剑指 Offer 51. 数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

**示例 1:**

```
输入: [7,5,6,4]
输出: 5
```

**限制：**

`0 <= 数组长度 <= 50000`

## 思路及代码

文字少少，难度大大

直接暴力肯定是不行的，需要用到归并排序，在合并时，左右两数组（`s~mid` 、`mid+1~e`）各自都是从小到大排好序的，那么当左指针 `i` 指向的数大于右指针 `j` 指向的数即 `nums[i] > nums[j]` 时，则 `i~mid`的元素均大于 `j` 位置上的元素, 此时产生的逆序对个数即为 `mid-i+1`

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    let res = 0
    function merge(nums, s, mid, e) {   // 合并s~mid mid+1~e
        let next = new Array(e-s+1)
        let cnt = 0 // 新数组的下标
        let [i, j] = [s, mid+1]
        while(i <= mid && j <= e) {
            if(nums[i] <= nums[j]) {
                next[cnt++] = nums[i++]
            } else {    // 大于 说明产生了逆序对~
                res += mid-i+1 
                next[cnt++] = nums[j++]
            }
        }
        while(i <= mid)
            next[cnt++] = nums[i++]
        while(j <= e)
            next[cnt++] = nums[j++]
        cnt = 0
        while(s <= e)
            nums[s++] = next[cnt++]
    }
    function mergeSort(nums, s, e) {
        if(s >= e) return
        let mid = (s+e)>>1
        mergeSort(nums, s, mid)
        mergeSort(nums, mid+1, e)
        merge(nums, s, mid, e)
    }
    mergeSort(nums, 0, nums.length-1)
    return res
};
```

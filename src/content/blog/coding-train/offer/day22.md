---
title: 剑指offer day22 位运算（中等）
link: coding-train/leetcode/offer/day22
catalog: true
subtitle: 知识点：数组、位运算，难度为中等、中等
date: 2022-04-20 20:30:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 位运算
categories:
- [题目记录, 剑指offer]
---

day22题目：[剑指 Offer 56 - I. 数组中数字出现的次数](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)、[剑指 Offer 56 - II. 数组中数字出现的次数 II](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)

知识点：数组、位运算，难度为中等、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 56 - I. 数组中数字出现的次数](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/) | [位运算](https://leetcode-cn.com/tag/bit-manipulation)[数组](https://leetcode-cn.com/tag/array) | 中等 |
| [剑指 Offer 56 - II. 数组中数字出现的次数 II](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/) | [位运算](https://leetcode-cn.com/tag/bit-manipulation)、[数学](https://leetcode-cn.com/tag/math) | 中等 |

# [剑指 Offer 56 - I. 数组中数字出现的次数](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)

一个整型数组 `nums` 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

**示例 1：**

```
输入： nums = [4,1,4,6]
输出： [1,6] 或 [6,1]
```

**示例 2：**

```
输入： nums = [1,2,10,4,1,4,3,3]
输出： [2,10] 或 [10,2]
```

**限制：**

- `2 <= nums.length <= 10000`

## 思路及代码

分组进行异或，将相同的数字分至一组，不同的两个数组分至不同的一组，通过mask确定分组条件。

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
    let xor = 0  // 为这两数字的异或
    for (let i = 0; i < nums.length; i++) 
    xor ^= nums[i]
    let mask = 1
    while((xor & mask) === 0) 
      mask = mask << 1

    let [a, b] = [0, 0]
    for (let i = 0; i < nums.length; i++) {
        if ((nums[i] & mask) === 0)
            a ^= nums[i]
        else b ^= nums[i]
    }
    return [a, b];
};
```

# [剑指 Offer 56 - II. 数组中数字出现的次数 II](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)

在一个数组 `nums` 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。

**示例 1：**

```
输入： nums = [3,4,3,3]
输出： 4
```

**示例 2：**

```
输入： nums = [9,1,7,9,7,9,7]
输出： 1
```

**限制：**

- `1 <= nums.length <= 10000`
- `1 <= nums[i] < 2^31`

## 思路及代码

每一位贡献加起来%3，为1则为这个数的1。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = new Array(32).fill(0)
    for (let i = 0; i < nums.length; ++i) {
        let num = nums[i]
        for (let j = 0; j < 32 && num; ++j) {
            if ((num & 1) === 1)
                res[j] += 1
            num = num >> 1
        }
    }
    let ans = 0
    for (let i = 0; i < 32; ++i) {
        if (res[i] % 3 !== 0)
            ans += (1 << i)
    }
    return ans
};
```

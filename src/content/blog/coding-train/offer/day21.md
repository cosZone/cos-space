---
title: 剑指offer day21 位运算（简单）
link: coding-train/leetcode/offer/day21
catalog: true
subtitle: 知识点：位运算、数学，难度为简单、简单
date: 2022-04-19 23:50:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 位运算
- 数学
categories:
- [题目记录, 剑指offer]
---

day21题目：[剑指 Offer 15. 二进制中1的个数](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)、[剑指 Offer 65. 不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)

知识点：位运算、数学，难度为简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 15. 二进制中1的个数](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/) | [位运算](https://leetcode-cn.com/tag/bit-manipulation) | 简单 |
| [剑指 Offer 65. 不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/) | [位运算](https://leetcode-cn.com/tag/bit-manipulation)、[数学](https://leetcode-cn.com/tag/math) | 简单 |

# [剑指 Offer 15. 二进制中1的个数](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为 [汉明重量](http://en.wikipedia.org/wiki/Hamming_weight)).）。

**提示：**

- 请注意，在某些语言（如 Java）中，没有无符号整数类型。在这种情况下，输入和输出都将被指定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部的二进制表示形式都是相同的。
- 在 Java 中，编译器使用 [二进制补码](https://baike.baidu.com/item/%E4%BA%8C%E8%BF%9B%E5%88%B6%E8%A1%A5%E7%A0%81/5295284) 记法来表示有符号整数。因此，在上面的 **示例 3** 中，输入表示有符号整数 `-3`。

**示例 1：**

```
输入： n = 11 (控制台输入 00000000000000000000000000001011)
输出： 3
解释： 输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
```

**示例 2：**

```
输入： n = 128 (控制台输入 00000000000000000000000010000000)
输出： 1
解释： 输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。
```

**示例 3：**

```
输入： n = 4294967293 (控制台输入 11111111111111111111111111111101，部分语言中 n = -3）
输出： 31
解释： 输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。
```

**提示：**

- 输入必须是长度为 `32` 的 **二进制串** 。

注意：本题与主站 191 题相同：<https://leetcode-cn.com/problems/number-of-1-bits/>

## 思路与代码

之前曾经接触过一个神奇的运算：`x = x & x-1` 可以将x的最后一位 `1` 变为 `0`

这里就可以用这个性质。

```javascript
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let res = 0
    while(n) {
        n &= n-1
        ++res
    }
    return res
};
```

# [剑指 Offer 65. 不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)

写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

**示例:**

```
输入: a = 1, b = 1
输出: 2
```

**提示：**

- `a`, `b` 均可能是负数或 0
- 结果不会溢出 32 位整数

## 思路与代码

相加可以简单的用异或，但要注意进位，而进位 `c` 也没法直接加，所以需要循环，每次将 `a^b` 即 **ab的无进位和** 赋给a，将 **进位和`c`** 赋给b，直到b也就是进位和为0，就可直接返回a。

- 进位和的计算就可以用`(a&b) << 1`，只有两位都为1才进位

```javascript
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function(a, b) {
    while(b) {
        let c = (a&b)<<1  // 进位和
        a = a^b
        b = c
    }
    return a
};
```

---
title: 剑指offer day31 数学（困难）
link: coding-train/leetcode/offer/day31
catalog: true
subtitle: 知识点：数学，难度为中等、困难、中等
date: 2022-04-29 22:08:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数学
categories:
- [题目记录, 剑指offer]
---

day31题目：[剑指 Offer 14- II. 剪绳子 II](https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof/)、[剑指 Offer 43. 1～n 整数中 1 出现的次数](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/)、[剑指 Offer 44. 数字序列中某一位的数字](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/)

知识点：数学，难度为中等、困难、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 14- II. 剪绳子 II](https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof/) | [数学](https://leetcode-cn.com/tag/math)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming) | 中等 |
| [剑指 Offer 43. 1～n 整数中 1 出现的次数](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/) | [递归](https://leetcode-cn.com/tag/recursion)、[数学](https://leetcode-cn.com/tag/math)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming) | 困难 |
| [剑指 Offer 44. 数字序列中某一位的数字](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/) | [数学](https://leetcode-cn.com/tag/math)、[二分查找](https://leetcode-cn.com/tag/binary-search) | 中等 |

最后一天了……被今天的数学题……按在地上摩擦，嘿嘿嘿

# [剑指 Offer 14- II. 剪绳子 II](https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof/)

给你一根长度为 `n` 的绳子，请把绳子剪成整数长度的 `m` 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 `k[0],k[1]...k[m - 1]` 。请问 `k[0]*k[1]*...*k[m - 1]` 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

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

- `2 <= n <= 1000`

注意：本题与主站 343 题相同：<https://leetcode-cn.com/problems/integer-break/>

## 思路及代码

这道题是之前剪绳子一模一样，不过这里多了取模运算，可以利用贪心思想

- 若 `n < 4`，返回 `n - 1`
- 若 `n == 4`，返回 `4`
- 若 `n > 4`，分成尽可能多的长度为 `3` 的小段，循环中每次长度 `n` 减去`3`，乘积`res`乘以`3`，最后返回时乘上小于等于4的最后一小段后的结果，每次乘法操作后记得 **取余**

```javascript
/**
 * @param {number} n
 * @return {number}
 */
 var cuttingRope = function(n) {
    if(n <= 3) return n-1
    let res = 1
    while(n > 4){
        res = (res * 3) % 1000000007
        n -= 3
    }
    return (res * n) % 1000000007
};
```

# [剑指 Offer 43. 1～n 整数中 1 出现的次数](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/)

输入一个整数 `n` ，求1～n这n个整数的十进制表示中1出现的次数。

例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。

**示例 1：**

```
输入： n = 12
输出： 5
```

**示例 2：**

```
输入： n = 13
输出： 6
```

**限制：**

- `1 <= n < 2^31`

注意：本题与主站 233 题相同：<https://leetcode-cn.com/problems/number-of-digit-one/>

## 思路及代码

题目越短，事越大，看官方题解如下，难得官方题解讲的这么清楚明白一次：

[1～n 整数中 1 出现的次数 - 1～n 整数中 1 出现的次数 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/solution/1n-zheng-shu-zhong-1-chu-xian-de-ci-shu-umaj8/)

总结如下：

> 当数位为 `10^k` 时，最后的 `k` 个数位每 `10^(k+1)`个数会循环一次，并且其中包含 `10^k` 个 1，由于 `n` 包含 `n/10^(k+1)` 个完整的循环，那么这一部分的 `1` 的个数为 `(n/10^(k+1))*10^k`。不在循环中的部分还有 `n mod 10^(k+1)` 个数，这一部分的 `1` 的个数为 `n mod 10^(k+1) - 10^k + 1`，如果这个值小于 `0`，那么调整为出现 `0` 次；如果这个值大于 `10^k` ，那么调整为出现 `10^k` 次。

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function(n) {
    let res = 0
    let mulk = 1
    while(n >= mulk) {
        let rest = Math.min(Math.max(n%(mulk*10)-mulk+1, 0), mulk)
        res += Math.floor(n/(mulk*10))*mulk + rest
        mulk *= 10
    }
    return res
};
```

# [剑指 Offer 44. 数字序列中某一位的数字](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/)

数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。

请写一个函数，求任意第n位对应的数字。

**示例 1：**

```
输入： n = 3
输出： 3
```

**示例 2：**

```
输入： n = 11
输出： 0
```

**限制：**

- `0 <= n < 2^31`

注意：本题与主站 400 题相同：<https://leetcode-cn.com/problems/nth-digit/>

## 思路及代码

建议看题解，自己根本没法讲这么明白：[[JS] 5行代码，几十行注释 - 数字序列中某一位的数字)](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/solution/js-5xing-dai-ma-ji-shi-xing-zhu-shi-by-o-2skd/)

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    let i = 1
    while(i * Math.pow(10, i) < n) {
        n += Math.pow(10, i)
        ++i
    }
    let res = `${Math.floor(n / i)}`
    return parseInt(res[n % i])
};
```

完结撒花~明天开剑指offer专项计划

![image.png](https://backblaze.cosine.ren/juejin/0c32319d3217473485def70035c4b785~Tplv-K3u1fbpfcp-Watermark.png)

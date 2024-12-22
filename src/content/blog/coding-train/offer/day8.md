---
title: 剑指offer day8 动态规划（简单）
link: coding-train/leetcode/offer/day8
catalog: true
subtitle: 知识点：数组、记忆化搜索、动态规划 ，难度为简单、简单、中等
date: 2022-04-06 18:09:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 记忆化搜索
- 动态规划
categories:
- [题目记录, 剑指offer]
---
day8题目：[剑指 Offer 10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)、[剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)、[剑指 Offer 63. 股票的最大利润](https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/)

知识点：数组、记忆化搜索、动态规划 ，难度为简单、简单、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                 | 知识点                                                                                                                                              | 难度 |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| [剑指 Offer 10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)           | [记忆化搜索](https://leetcode-cn.com/tag/memoization)、[数学](https://leetcode-cn.com/tag/math)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming) | 简单 |
| [剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/) | [记忆化搜索](https://leetcode-cn.com/tag/memoization)、[数学](https://leetcode-cn.com/tag/math)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming) | 简单 |
| [剑指 Offer 63. 股票的最大利润](https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/)        | [数组](https://leetcode-cn.com/tag/array)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming)                                                    | 中等 |

# [剑指 Offer 10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

写一个函数，输入 `n` ，求斐波那契（Fibonacci）数列的第 `n` 项（即 `F(N)`）。斐波那契数列的定义如下：

```
F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
```

斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

**示例 1：**

```
输入： n = 2
输出： 1
```

**示例 2：**

```
输入： n = 5
输出： 5
```

**提示：**

- `0 <= n <= 100`

## 思路及代码

本题标签都打了
思路一：递归+记忆化搜索，记得取模

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    let f = new Array(n + 1)
    f[0] = 0
    f[1] = 1
    function fibna(n) {
        return f[n] !== undefined? f[n]: f[n] = (fibna(n-1) + fibna(n-2))%1000000007
    }
    return fibna(n)
};
```

思路二：迭代版，滚动数组优化，由于之受前两项影响，故每次只将前两项存储下来就好了

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if(n in [0, 1]) return n
    let [p, q] = [0, 1]
    for(let i = 2; i <= n; i++) {
        let temp = q
        q = (p+q) % 1000000007
        p = temp
    }
    return q
};
```

# [剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 `n` 级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

**示例 1：**

```
输入： n = 2
输出： 2
```

**示例 2：**

```
输入： n = 7
输出： 21
```

**示例 3：**

```
输入： n = 0
输出： 1
```

**提示：**

- `0 <= n <= 100`

注意：本题与主站 70 题相同：[https://leetcode-cn.com/problems/climbing-stairs/](https://leetcode-cn.com/problems/climbing-stairs/)

## 思路及代码

动态规划，设 `dp` 为第i台阶有多少种跳法，由于每次可以跳一层或二层，则 `dp[i] = dp[i-1]+dp[i-2]`（从 `i-1` 跳一层，从 `i-2` 跳两层）。其实就是上题斐波那契数列，只不过第一项由0变为1罢了。

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
    if(n in [0, 1]) return 1
    let [p, q] = [1, 1]
    for(let i = 2; i <= n; i++) {
        let temp = q
        q = (p+q) % 1000000007
        p = temp
    }
    return q
};
```

# [剑指 Offer 63. 股票的最大利润](https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/)

假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
```

**示例 2:**

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

**限制：**

`0 <= 数组长度 <= 10^5`

**注意：** 本题与主站 121 题相同：[https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

## 思路及代码

之前day14里有做过哦：[冲刺春招-精选笔面试66题大通关day14](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day14/)

本质上就是最小值与最大值的一个差使其最大化，且最大值必须在最小值之后出现

- 用 `min` 记录当前最小值，`ans` 记录最大利润
  - 若当前 `price[i] <= min`，则更新 `min`
  - 否则，记录最大利润，`ans = max(ans, prices[i]-min)`

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let ans = 0
    let min = prices[0]
    for(let i = 1; i < prices.length; ++i) {
        if(prices[i] < min) min = prices[i]
        else ans = Math.max(ans, prices[i] - min)
    }
    return ans
};
```

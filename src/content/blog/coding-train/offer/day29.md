---
title: 剑指offer day29 动态规划（困难）
link: coding-train/leetcode/offer/day29
catalog: true
subtitle: 知识点：字符串、数学、动态规划，难度为困难、中等、中等
date: 2022-04-27 21:12:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 字符串
- 数学
- 动态规划
categories:
- [题目记录, 剑指offer]
---

day29题目：[剑指 Offer 19. 正则表达式匹配](https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/)、[剑指 Offer 49. 丑数](https://leetcode-cn.com/problems/chou-shu-lcof/)、[剑指 Offer 60. n个骰子的点数](https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/)

知识点：字符串、数学、动态规划，难度为困难、中等、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 19. 正则表达式匹配](https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/) | [递归](https://leetcode-cn.com/tag/recursion)、[字符串](https://leetcode-cn.com/tag/string)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming) | 困难 |
| [剑指 Offer 49. 丑数](https://leetcode-cn.com/problems/chou-shu-lcof/) | [哈希表](https://leetcode-cn.com/tag/hash-table)、[数学](https://leetcode-cn.com/tag/math)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming) | 中等 |
| [剑指 Offer 60. n个骰子的点数](https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/) | [数学](https://leetcode-cn.com/tag/math)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming)、[概率与统计](https://leetcode-cn.com/tag/probability-and-statistics) | 中等 |

# [剑指 Offer 19. 正则表达式匹配](https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/)

请实现一个函数用来匹配包含`'. '`和`'*'`的正则表达式。模式中的字符`'.'`表示任意一个字符，而`'*'`表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串`"aaa"`与模式`"a.a"`和`"ab*ac*a"`匹配，但与`"aa.a"`和`"ab*a"`均不匹配。

**示例 1:**

```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```

**示例 2:**

```
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```

**示例 3:**

```
输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
```

**示例 4:**

```
输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
```

**示例 5:**

```
输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
```

- `s` 可能为空，且只包含从 `a-z` 的小写字母。
- `p` 可能为空，且只包含从 `a-z` 的小写字母以及字符 `.` 和 `*`，无连续的 `'*'`。

注意：本题与主站 10 题相同：<https://leetcode-cn.com/problems/regular-expression-matching/>

## 思路及代码

不愧是困难题，想不出来^_^

看完题解，wow还有这种思路

- `dp[i][j]` 表示 `s` 中前 `i` 个字符是否匹配 `p` 中前 `j` 个字符
- `dp[0][0]` 是可行的，置为 `true`，其他初始置为 `false`

遍历时

- 若 `p` 中 第 `j` 个字符不是`*` 或 `.`，则必须在s中匹配一个相同的字母，有 `dp[i][j] = s[i] == p[j] ? dp[i-1][j-1]: false`
- 若 `p` 中 第 `j` 个字符为`.` 一定成功匹配 `dp[i][j] = dp[i-1][j-1]`
- 若为 `*` 则可以
  - 不匹配字符，将该组合扔掉，不再进行匹配  `dp[i][j] |= dp[i][j-2]`
  - 匹配 `s` 末尾的一个字符，将该字符扔掉，而该组合还可以继续进行匹配  `dp[i][j] = dp[i-1][j] | dp[i][j-2]`

```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    let dp = new Array(s.length+1).fill(0).map(() => new Array(p.length+1).fill(false))
    dp[0][0] = true
    for(let i = 0; i <= s.length; ++i) {
        for(let j = 1; j <= p.length; ++j) {
            let c2 = p[j-1]
            if(c2 == '*') {
                dp[i][j] |= dp[i][j-2]  // 不使用*
                c2 = p[j-2]
                if(i != 0 && (c2 == '.' || s[i-1] == c2))
                    dp[i][j] |= dp[i-1][j]
            } else if(i != 0 && (c2 == '.' || s[i-1] == c2)) {
                    dp[i][j] |= dp[i-1][j-1]
            }
        }
    }
    return dp[s.length][p.length]
};
```

# [剑指 Offer 49. 丑数](https://leetcode-cn.com/problems/chou-shu-lcof/)

我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。

**示例:**

```
输入: n = 10
输出: 12
解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
```

**说明:**

1. `1` 是丑数。
1. `n` **不超过**1690。

注意：本题与主站 264 题相同：<https://leetcode-cn.com/problems/ugly-number-ii/>

## 思路及代码

设m1、m2、m3表示×2、×3、×5的结果，比较其指向的值，将最小的放入最终的合并数组中，并将相应指针向后移动一个元素。

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    let dp = new Array(n)
    dp[0] = 1
    let i2 = 0, i3 = 0, i5 = 0
    for (let i = 1; i < n; i++) {
        let m2 = dp[i2] * 2, m3 = dp[i3] * 3, m5 = dp[i5] * 5
        let m = Math.min(Math.min(m2, m3), m5)
        if (m === m2) i2++
        if (m === m3) i3++
        if (m === m5) i5++
        dp[i] = m
    }
    return dp[n-1]
};
```

# [剑指 Offer 60. n个骰子的点数](https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/)

把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。

你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。

**示例 1:**

```
输入: 1
输出: [0.16667,0.16667,0.16667,0.16667,0.16667,0.16667]
```

**示例 2:**

```
输入: 2
输出: [0.02778,0.05556,0.08333,0.11111,0.13889,0.16667,0.13889,0.11111,0.08333,0.05556,0.02778]
```

**限制：**

`1 <= n <= 11`

## 思路及代码

dp[i][j]表示i个骰子时，点数总和取值的概率

- 如1个骰子的时候总和可能为 [1, 2, 3, 4, 5, 6]
- 2个骰子时，为 [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
- i个骰子时，总和个数为 `6*i-(i-1)` 化简为 `5*i+1`
- 由于新增骰子的点数只可能为 1 至 6 ，因此概率 `dp[i-1][x]` 仅与 `dp[i][x+1]`, `dp[i][x+2]`, ... , `dp[i][x+6]` 相关。因此，遍历 `dp[i-1]` 中各点数和的概率贡献值，并将贡献值相加至 `dp[i]` 中所有相关项，即可完成的递推。。
- 也就是说，增加骰子的个数到 `i` 个时，`i-1`个骰子的点数 `j` 会对拥有 `i` 个骰子时的点数 `j+k` 产生影响
- 由于每次都只跟 `i-1` 有关，故可优化空间

```javascript
/**
 * @param {number} n
 * @return {number[]}
 */
var dicesProbability = function(n) {
    let dp = new Array(6).fill(1/6)
    for(let i = 2; i <= n; ++i) {   // i个骰子
        let next = new Array(5*i+1).fill(0) // i*6-(i-1)
        for(let j = 0;  j < dp.length; ++j)
            for(let k = 0; k < 6; ++k)
                next[j+k] += dp[j]*1/6
        dp = next
    }
    return dp
};
```

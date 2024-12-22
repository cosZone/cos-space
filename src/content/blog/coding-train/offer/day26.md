---
title: 剑指offer day26 字符串（中等）
link: coding-train/leetcode/offer/day26
catalog: true
subtitle: 知识点：数组、栈、模拟，难度为简单、中等
date: 2022-04-24 23:00:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 字符串
- 模拟
categories:
- [题目记录, 剑指offer]
---

day26题目：[剑指 Offer 20. 表示数值的字符串](https://leetcode-cn.com/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/)、[剑指 Offer 67. 把字符串转换成整数](https://leetcode-cn.com/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/)

知识点：字符串、模拟，难度为中等、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 20. 表示数值的字符串](https://leetcode-cn.com/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/) | [字符串](https://leetcode-cn.com/tag/string) | 中等 |
| [剑指 Offer 67. 把字符串转换成整数](https://leetcode-cn.com/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/) | [字符串](https://leetcode-cn.com/tag/string) | 中等 |

# [剑指 Offer 20. 表示数值的字符串](https://leetcode-cn.com/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/)

请实现一个函数用来判断字符串是否表示**数值**（包括整数和小数）。

**数值**（按顺序）可以分成以下几个部分：

1. 若干空格
1. 一个 **小数** 或者 **整数**
1. （可选）一个 `'e'` 或 `'E'` ，后面跟着一个 **整数**
1. 若干空格

**小数**（按顺序）可以分成以下几个部分：

1. （可选）一个符号字符（`'+'` 或 `'-'`）

1. 下述格式之一：

    1. 至少一位数字，后面跟着一个点 `'.'`
    1. 至少一位数字，后面跟着一个点 `'.'` ，后面再跟着至少一位数字
    1. 一个点 `'.'` ，后面跟着至少一位数字

**整数**（按顺序）可以分成以下几个部分：

1. （可选）一个符号字符（`'+'` 或 `'-'`）
1. 至少一位数字

部分**数值**列举如下：

- `["+100", "5e2", "-123", "3.1416", "-1E-16", "0123"]`

部分**非数值**列举如下：

- `["12e", "1a3.14", "1.2.3", "+-5", "12e+5.4"]`

**示例 1：**

```
输入： s = "0"
输出： true
```

**示例 2：**

```
输入： s = "e"
输出： false
```

**示例 3：**

```
输入： s = "."
输出： false
```

**示例 4：**

```
输入： s = "    .1  "
输出： true
```

**提示：**

- `1 <= s.length <= 20`
- `s` 仅含英文字母（大写和小写），数字（`0-9`），加号 `'+'` ，减号 `'-'` ，空格 `' '` 或者点 `'.'` 。

## 思路及代码

简简单单一个模拟

- 去除前后空格
- 判断是否存在e/E
  - 存在则判断前缀是否为整数/小数，再判断后缀是否为整数
  - 不存在则直接判断整个是否为整数/小数

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    s = s.trim()    // 去除前后空格
    if(s.length == 0) return false
    function isDigit(ch) {
        return ch >= '0' && ch <= '9'
    }
    function judgeInt(s) {
        let cnt = 0
        if(s[cnt] == '-' || s[cnt] == '+')
            ++cnt
        if(cnt == s.length) return false
        while(cnt < s.length) {
            if(isDigit(s[cnt])) ++cnt 
            else return false
        }
        return true
    }
    function judgeDouble(s) {
        let cnt = 0
        if(s[cnt] == '-' || s[cnt] == '+') 
            ++cnt
        let isDot = false
        let pre = ''
        if(cnt == s.length) return false
        while(cnt < s.length) {
            if(s[cnt] == '.') {
                if(isDot) return false
                if(pre.length == 0 && ( cnt+1 >= s.length || !isDigit(s[cnt+1]) ) ) 
                    return false
                isDot = true
                ++cnt
            } else if(isDigit(s[cnt])) {
                if(!isDot) pre += s[cnt]
                ++cnt
            } else return false
        }
        return true
    }
    let idx = s.indexOf('e')
    if(idx == -1) idx = s.indexOf('E')
    if(idx != -1) {
        let pre = s.slice(0, idx)
        let post = s.slice(idx + 1)
        return (judgeDouble(pre) || judgeInt(pre)) && judgeInt(post)
    } 
    return judgeInt(s) || judgeDouble(s)
};
```

# [剑指 Offer 67. 把字符串转换成整数](https://leetcode-cn.com/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/)

写一个函数 StrToInt，实现把字符串转换成整数这个功能。不能使用 atoi 或者其他类似的库函数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

**说明：**

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

**示例 1:**

```
输入: "42"
输出: 42
```

**示例 2:**

```
输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
```

**示例 3:**

```
输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
```

**示例 4:**

```
输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
```

**示例 5:**

```
输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。
```

注意：本题与主站 8 题相同：<https://leetcode-cn.com/problems/string-to-integer-atoi/>

## 思路及代码

官解是写了个自动机……

纯纯的模拟就行了

```javascript
/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function(str) {
    let flag = 1;
    let [ans, idx] = [0, 0]
    while(idx < str.length && str[idx] == ' ') ++idx;
    if(idx < str.length && (str[idx] == '-' || str[idx] == '+')) {
        str[idx] == '-' ? flag = -1 : flag = 1
        ++idx
    }
    function isDigit(ch) {
        return ch >= '0' && ch <= '9'
    }
    let Int_max = Math.pow(2,31) - 1
    let Int_min = -Math.pow(2,31)
    while(idx < str.length && isDigit(str[idx])) {
        ans = ans * 10 + (str[idx] - '0')
        if(ans*flag >= Int_max) return Int_max
        else if(ans*flag <= Int_min) return Int_min
        ++idx
    }
    return ans*flag
};
```

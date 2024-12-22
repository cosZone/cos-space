---
title: 剑指offer day3 字符串（简单）
link: coding-train/leetcode/offer/day3
catalog: true
subtitle: 知识点：字符串，难度为简单、简单
date: 2022-04-01 21:00:52
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 字符串
categories:
- [题目记录, 剑指offer]
---
day3题目：[剑指 Offer 05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)、[剑指 Offer 58 - II. 左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

知识点：字符串，难度为简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                               | 知识点               | 难度 |
| -------------------------------------------------------------------------------------------------- | -------------------- | ---- |
| [剑指 Offer 05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)                     | 字符串               | 简单 |
| [剑指 Offer 58 - II. 左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/) | 数学、双指针、字符串 | 简单 |

# [剑指 Offer 05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。

**示例 1：**

```
输入： s = "We are happy."
输出： "We%20are%20happy."
```

**限制：**

`0 <= s 的长度 <= 10000`

## 思路及代码

一行代码题

js直接正则替换，或者遍历替换

```javascript
var replaceSpace = function(s) {
    return s.replace(/ /g, '%20');
};
```

# [剑指 Offer 58 - II. 左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

**示例 1：**

```
输入: s = "abcdefg", k = 2
输出: "cdefgab"
```

**示例 2：**

```
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"
```

**限制：**

- `1 <= k < s.length <= 10000`

## 思路及代码

同样一行代码题。

前n个字符转移到最后接上，就好了，也可以双指针（但没必要）

```javascript
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    return s.substr(n) + s.substr(0, n);
};
```

---
title: 剑指offer day16 排序（简单）
link: coding-train/leetcode/offer/day16
catalog: true
subtitle: 知识点：数组、排序，难度为中等、简单
date: 2022-04-14 20:30:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 排序
categories:
- [题目记录, 剑指offer]
---
今天的两道题在之前面试中都有考过：[MetaApp一二面面经（已OC）](https://ysx.cosine.ren/cn/metaapp-review-2022-spring-frontend/)

day16题目：[剑指 Offer 45. 把数组排成最小的数](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)、[剑指 Offer 61. 扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)

知识点：数组、排序，难度为中等、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| -- | -- | -- |
| [剑指 Offer 45. 把数组排成最小的数](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/) | [贪心](https://leetcode-cn.com/tag/greedy)、[字符串](https://leetcode-cn.com/tag/string)、[排序](https://leetcode-cn.com/tag/sorting) | 中等 |
| [剑指 Offer 61. 扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[排序](https://leetcode-cn.com/tag/sorting) | 简单 |

# [剑指 Offer 45. 把数组排成最小的数](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)

输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

**示例 1:**

```
输入: [10,2]
输出: "102"
```

**示例 2:**

```
输入: [3,30,34,5,9]
输出: "3033459"
```

**提示:**

- `0 < nums.length <= 100`

**说明:**

- 输出结果可能非常大，所以你需要返回一个字符串而不是整数
- 拼接起来的数字可能会有前导 0，最后结果不需要去掉前导 0

## 思路及代码

排序规则应该重载成a+b > b+a（字符串形式）

```javascript
/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
    return nums.sort((a, b) => (''+a+b) - (''+b+a)).join('');
};
```

# [剑指 Offer 61. 扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)

从**若干副扑克牌**中随机抽 `5` 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

**示例 1:**

```
输入: [1,2,3,4,5]
输出: True
```

**示例 2:**

```
输入: [0,0,1,2,5]
输出: True
```

**限制：**

数组长度为 5

数组的数取值为 [0, 13] .

## 思路及代码

`最大牌-最小牌<5` 则可构成顺子，所以先给数组排个序， 然后忽略掉大王小王（0），若有重复则直接返回false

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function(nums) {
    nums.sort((a, b) => a - b)
    let idx = 0
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] == 0) ++idx
        else if(nums[i] == nums[i-1]) return false
    }
    return nums[4] - nums[idx] < 5
};
```

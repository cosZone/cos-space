---
title: 剑指offer day10  动态规划（中等）
link: coding-train/leetcode/offer/day10
catalog: true
subtitle: 知识点：字符串、动态规划、滑动窗口，难度为中等、中等
date: 2022-04-08 21:40:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 字符串
- 动态规划
- 滑动窗口
categories:
- [题目记录, 剑指offer]
---
day10题目：[剑指 Offer 46. 把数字翻译成字符串](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)、[剑指 Offer 48. 最长不含重复字符的子字符串](https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/)

知识点：字符串、动态规划、滑动窗口，难度为中等、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                                               | 知识点                                                                                                                                        | 难度 |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| [剑指 Offer 46. 把数字翻译成字符串](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)                        | [字符串](https://leetcode-cn.com/tag/string)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming)                                           | 中等 |
| [剑指 Offer 48. 最长不含重复字符的子字符串](https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/) | [哈希表](https://leetcode-cn.com/tag/hash-table)、[字符串](https://leetcode-cn.com/tag/string)、[滑动窗口](https://leetcode-cn.com/tag/sliding-window) | 中等 |

# [剑指 Offer 46. 把数字翻译成字符串](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)

给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。

**示例 1:**

```
输入: 12258
输出: 5
解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"
```

**提示：**

- `0 <= num < 2^31`

## 思路及代码

类似前些天刷的打家劫舍，状态若能跟前面的组合翻译，则 `dp[i] = dp[i-1]+dp[i-2]`（单独翻译+组合翻译），否则 `dp[i] = dp[i-1]`（单独翻译），同样可以用滚动数组优化。

```javascript
/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
    if(num < 10) return 1
    let [p, q, res] = [0, 1, 1]
    num = num.toString()
    for(let i = 1; i < num.length; ++i) {
        p = q
        q = res
        if(i > 0 && num[i-1]+num[i] >= "10" && num[i-1]+num[i] <= "25")
            res += p
    }
    return res
}
```

# [剑指 Offer 48. 最长不含重复字符的子字符串](https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/)

请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

**示例 1:**

```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列， 不是子串。
```

提示：

- `s.length <= 40000`

注意：本题与主站 3 题相同：[https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

## 思路及代码

当时的思路是滑动窗口，进入窗口的字符若为重复（用hash存判断）的则将左侧窗口滑至该字符（并将hash中相应的key删除）同时记录长度，再继续滑动。

- 现在改了改，可以不用删除，hash存下标，get的时候判断下是否位于l~r的区间中就好了

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let [l, r] = [0, 0]
    let m = new Map()
    let res = 0
    while (r < s.length) {
        if (m.has(s[r]) && m.get(s[r]) >= l)
            l = Math.max(l, m.get(s[r]) + 1)
        m.set(s[r], r)
        r++
        res = Math.max(res, r - l)
    }
    return res
};
```

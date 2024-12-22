---
title: 剑指offer day13 双指针（简单）
link: coding-train/leetcode/offer/day13
catalog: true
subtitle: 知识点：数组、双指针、排序，难度为简单、简单、简单
date: 2022-04-11 22:00:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 双指针
- 排序
categories:
- [题目记录, 剑指offer]
---

day13题目：[剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)、[剑指 Offer 57. 和为s的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/)、 [剑指 Offer 58 - I. 翻转单词顺序](https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/)

知识点：数组、双指针、排序，难度为简单、简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| -- | -- | -- |
| [剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[双指针](https://leetcode-cn.com/tag/two-pointers)、[排序](https://leetcode-cn.com/tag/sorting) | 简单 |
| [剑指 Offer 57. 和为s的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[双指针](https://leetcode-cn.com/tag/two-pointers)、[二分查找](https://leetcode-cn.com/tag/binary-search) | 简单 |
| [剑指 Offer 58 - I. 翻转单词顺序](https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/) | [双指针](https://leetcode-cn.com/tag/two-pointers)、[字符串](https://leetcode-cn.com/tag/string) | 简单 |

# [剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

**示例：**

```
输入： nums = [1,2,3,4]
输出： [1,3,2,4] 
注： [3,1,2,4] 也是正确的答案之一。
```

**提示：**

1. `0 <= nums.length <= 50000`
1. `0 <= nums[i] <= 10000`

## 思路及代码

双指针，左指针 `l` 若为正确的奇数则往右走，右指针 `r` 若为正确的偶数则往左走，走到两指针都不满足条件时交换这两个数即可达成目的

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
    if(nums.length <= 1) return nums
    let [l, r] = [0, nums.length-1]
    while(l < r) {
        if(nums[l] % 2 === 1) ++l
        else if(nums[r] % 2 === 0) --r
        else {
            [nums[l], nums[r]] = [nums[r], nums[l]]
            ++l, --r
        }
    }
    return nums
};
```

# [剑指 Offer 57. 和为s的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/)

输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。

**示例 1：**

```
输入： nums = [2,7,11,15], target = 9
输出： [2,7] 或者 [7,2]
```

**示例 2：**

```
输入： nums = [10,26,30,31,47,60], target = 40
输出： [10,30] 或者 [30,10]
```

**限制：**

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

## 思路及代码

思路1：hash简单粗暴存储

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let m = new Map()
    for(let i = 0; i < nums.length; ++i) {
        if(m.has(target - nums[i])) return [target - nums[i], nums[i]]
        m.set(nums[i], i)
    }
};
```

思路2：双指针
速度非常的amazing啊。由于是排好序的数组，所以左右指针指向的值加起来若等于目标数，则找到结果，否则若小于目标数，则左指针往右走增大当前数，否则右指针往左走减小当前数。

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let [l, r] = [0, nums.length - 1]
    while (l < r) {
        let sum = nums[l] + nums[r]
        if (sum === target) return [nums[l], nums[r]]
        else if (sum < target) ++l;
        else  --r 
    }
};
```

# [剑指 Offer 58 - I. 翻转单词顺序](https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/)

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。

**示例 1：**

```
输入: "the sky is blue"
输出: "blue is sky the"
```

**示例 2：**

```
输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
```

**示例 3：**

```
输入: "a good   example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
```

**说明：**

- 无空格字符构成一个单词。
- 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
- 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

**注意：** 本题与主站 151 题相同：<https://leetcode-cn.com/problems/reverse-words-in-a-string/>

**注意：** 此题对比原题有改动

## 思路及代码

[冲刺春招-精选笔面试66题大通关day22](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day22/#%E6%80%9D%E8%B7%AF)中的同款题目，所以题解直接搬过来。

不讲武德版：一行代码，先去除前后空格，再利用正则将字符串从空白处分割后反转再拼回去

```javascript
var reverseWords = function(s) {
    return s.trim().split(/[ ]+/g).reverse().join(' ')
};
```

`O(1)` 额外空间复杂度的 **原地** 解法：JS字符串不可变，需要O(n)的空间将字符串转换为数组，不行，换成c++的话就是O(1)了。

```javascript
/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function(s) {
    let trim2arr = function(str) {
        let arr = []
        let [l, r] = [0, 0]
        while(l < str.length) {
            while(l < str.length && str[l] === ' ') ++l
            r = l
            while(r < str.length && str[r] !== ' ') ++r
            arr.push(...str.slice(l, r), ' ')
            l = r
        }
        while(arr[arr.length-1] == ' ') arr.pop()
        return arr
    }
    let reverse = function(str, s, e) {
        while(s < e) {
            [str[s], str[e]] = [str[e], str[s]]
            ++s, --e
        }
    }
    let reverseWord = function(arr) {
        let [l, r] = [0, 0]
        while(l < arr.length) {
            while(l < arr.length && arr[l] === ' ') ++l
            r = l
            while(r < arr.length && arr[r] !== ' ') ++r
            reverse(arr, l, r - 1)
            l = r
        }
    }
    let ans = trim2arr(s)               // JS字符串不可变，需要转换成数组
    reverse(ans, 0, ans.length - 1)     // 反转整个字符串
    reverseWord(ans)                    // 反转每个单词
    return ans.join('')                 // 数组转换成字符串
};
```

---
title: 剑指offer day4 查找算法（简单）
link: coding-train/leetcode/offer/day4
catalog: true
subtitle: 知识点：数组、哈希、排序，难度为简单、简单、简单
date: 2022-04-02 23:30:52
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 哈希
- 排序
categories:
- [题目记录, 剑指offer]
---
day4题目：[剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)、[剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)、[剑指 Offer 53 - II. 0～n-1中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)

知识点：数组、哈希、排序，难度为简单、简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                                     | 知识点           | 难度 |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------- | ---- |
| [剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)                   | 数组、哈希、排序 | 简单 |
| [剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/) | 数学、二分       | 简单 |
| [剑指 Offer 53 - II. 0～n-1中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)                          | 数组、           | 简单 |

# [剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

找出数组中重复的数字。

在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

**示例 1：**

```
输入：
[2, 3, 1, 0, 2, 5, 3]
输出： 2 或 3 
```

**限制：**

`2 <= n <= 100000`

## 思路及代码

思路1：排序然后找

```javascript
var findRepeatNumber = function(nums) {
    let n = nums.length
    nums.sort((a, b) => a - b)
    for(let i = 1; i < n; ++i)
        if(nums[i] == nums[i-1]) return nums[i]
};
```

思路2：哈希

```javascript
var findRepeatNumber = function(nums) {
    let m = new Map();
    for(let i = 0; i < nums.length; i++){
        if(m.has(nums[i]))
            return nums[i];
        else m.set(nums[i], true);
    }
};
```

# [剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)

统计一个数字在排序数组中出现的次数。

**示例 1:**

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
```

**示例 2:**

```
输入: nums = [5,7,7,8,8,10], target = 6
输出: 0
```

**提示：**

- `0 <= nums.length <= 105`
- `-109 <= nums[i] <= 109`
- `nums` 是一个非递减数组
- `-109 <= target <= 109`

## 思路及代码

就这样吧，lei了

```javascript
var search = function(nums, target) {
    let n = nums.length;
    let l = 0, r = n - 1;
    while(nums[l] != target && l <= r) ++l
    while(nums[r] != target && l <= r) --r;
    if(l <= r && nums[l] == target && nums[r] == target) return r-l+1
    else return 0
}
```

# [剑指 Offer 53 - II. 0～n-1中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)

一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

**示例 1:**

```
输入: [0,1,3]
输出: 2
```

**示例 2:**

```
输入: [0,1,2,3,4,5,6,7,9]
输出: 8
```

**限制：**
1 <= 数组长度 <= 10000

## 思路及代码

只要下标跟内容不一样，就返回。

```javascript
var missingNumber = function(nums) {
    let n = nums.length;
    for(let i = 0; i < n; ++i)
        if(nums[i] != i) return i
    return n
};
```

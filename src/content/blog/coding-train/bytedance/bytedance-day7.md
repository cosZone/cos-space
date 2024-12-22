---
title: 冲刺春招-精选笔面试66题大通关day7
link: coding-train/leetcode/bytedance/bytedance-day7
catalog: true
subtitle: 今日知识点：数组、动态规划、哈希，难度为简单、中等、困难
date: 2022-03-14 22:10:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 动态规划
categories:
- [题目记录, 字节校园]
---

day7题目：[53. 最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)、[152. 乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/)、[41. 缺失的第一个正数](https://leetcode-cn.com/problems/first-missing-positive/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：数组、动态规划、哈希，难度为简单、中等、困难
<!-- more -->

# 53. 最大子数组和

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

**示例 1：**

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

## 思路

经典做法就是，每次如果加上去之后当前和<0了，那么这个只会让后面的变小所以直接将nowsum置为0。

## 代码

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int ans = -100000;
        int nowsum = 0;
        int n = nums.size();
        for(int i = 0; i < n; ++i) {
            nowsum += nums[i];
            if(nowsum > ans) ans = nowsum;
            if(nowsum < 0) nowsum = 0;
        }
        return ans;
    }
};
```

# 152. 乘积最大子数组

给你一个整数数组 `nums` ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 **32-位** 整数。

**子数组** 是数组的连续子序列。

**示例 1:**

```
输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
```

**示例 2:**

```
输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
```

## 思路
>
> 当前位置如果是一个负数的话，那么我们希望以它前一个位置结尾的某个段的积也是个负数，这样就可以负负得正，并且我们希望这个积尽可能「负得更多」，即尽可能小。如果当前位置是一个正数的话，我们更希望以它前一个位置结尾的某个段的积也是个正数，并且希望它尽可能地大。

好，我觉得官方题解说的很清楚，主要就这一句话

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let minp, maxp, ans;
    minp = maxp = ans = nums[0];
    let n = nums.length;
    for(let i = 1; i < n; ++i) {
        let [tmax, tmin] = [maxp, minp];
        maxp = Math.max(tmax*nums[i], tmin*nums[i], nums[i]);
        minp = Math.min(tmax*nums[i], tmin*nums[i], nums[i]);
        ans = Math.max(ans, maxp)
    }
    return ans;
};
```

# 41. 缺失的第一个正数

给你一个未排序的整数数组 `nums` ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 `O(n)` 并且只使用常数级别额外空间的解决方案。

**示例 1：**

```
输入：nums = [1,2,0]
输出：3
```

**示例 2：**

```
输入：nums = [3,4,-1,1]
输出：2
```

**提示：**

- 1 <= nums.length <= 5 * 10^5^
- -2^31^ <= nums[i] <= 2^31^ - 1

## 思路

一开始的思路，就是非常暴力的hash存，遇到不在的就直接返回...这就很不困难题，也不满足题意（

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    let m = new Map();
    for(let i of nums)
        m.set(i, 1);
    let len = nums.length;
    for(let i = 1; i <= 1000005; ++i) {
        if(!m.has(i)) return i;
    }
};
```

看完题解：哦~由于我们只在意 [1, N] 中的数，因此我们可以先对数组进行遍历，把不在 [1, N][1,*N*] 范围内的数修改成任意一个大于 N的数（例如 N+1）。这样一来，**数组中的所有数就都是正数了**，因此我们就可以将「标记」表示为「负号」，这样一来，每次遇到的有可能是负数但是其绝对值就是原来的数，遍历完后，若数组中每一个数都为负数则答案为N+1，否则就是第一个正数的位置。

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    let n = nums.length;
    for(let i = 0; i < n; ++i) {
        if(nums[i] <= 0) 
            nums[i] = n+1;
    } 
    for(let i = 0; i < n; ++i) {
        let nowp = Math.abs(nums[i]);
        if(nowp <= n) {
            nums[nowp-1] = -Math.abs(nums[nowp-1]);
        }
    } 
    for(let i = 0; i < n; ++i) {
        if(nums[i] > 0) 
            return i+1;
    } 
    return n+1;
};
```

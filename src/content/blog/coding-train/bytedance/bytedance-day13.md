---
title: 冲刺春招-精选笔面试66题大通关day13
link: coding-train/leetcode/bytedance/bytedance-day13
catalog: true
subtitle: 今日知识点：数组、双指针、二分，难度为简单、中等、困难
date: 2022-03-20 23:50:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 双指针
- 二分
categories:
- [题目记录, 字节校园]
---

day13题目：[88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)、[31. 下一个排列](https://leetcode-cn.com/problems/next-permutation/)、[4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：数组、双指针、二分，难度为简单、中等、困难

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day12](https://juejin.cn/post/7076832822635266079)

# [88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

给你两个按 **非递减顺序** 排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n` ，分别表示 `nums1` 和 `nums2` 中的元素数目。

请你 **合并** `nums2` **到 `nums1` 中，使合并后的数组同样按 **非递减顺序** 排列。

**注意：** 最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 `m` 个元素表示应合并的元素，后 `n` 个元素为 `0` ，应忽略。`nums2` 的长度为 `n` 。

**示例 1：**

```
输入： nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出： [1,2,2,3,5,6]
解释： 需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
```

**示例 2：**

```
输入： nums1 = [1], m = 1, nums2 = [], n = 0
输出： [1]
解释： 需要合并 [1] 和 [] 。
合并结果是 [1] 。
```

**示例 3：**

```
输入： nums1 = [0], m = 0, nums2 = [1], n = 1
输出： [1]
解释： 需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```

**提示：**

- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-109 <= nums1[i], nums2[j] <= 109`

**进阶：** 你可以设计实现一个时间复杂度为 `O(m + n)` 的算法解决此问题吗？

## 思路

显而易见的双指针

- 设 `i`、`j` 分别指向`nums1`、`nums2`最后一个元素，`k`指向合并后下标

```js
let [i, j, k] = [m-1, n-1, m+n-1];
```

- 比较 `nums1[i]` 和 `nums2[j]`，谁大就将谁放至 `nums1[k]` 将其对应 `i` 或 `j` 前移

```js
while(i >= 0 && j >= 0) {
    if(nums1[i] >= nums2[j]) {
        nums1[k--] = nums1[i];
        --i;
    } else {
        nums1[k--] = nums2[j];
        --j;
    }
}
```

- 需注意的是当一轮循环结束后仍有 `j >= 0` 说明 `nums2` 中仍有元素未被合并，这个时候直接将其放入 `nums1` 即可

```js
while(j >= 0) {
    nums1[k--] = nums2[j];
    --j;
}
```

## 代码

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let [i, j, k] = [m-1, n-1, m+n-1];
    while(i >= 0 && j >= 0) {
        if(nums1[i] >= nums2[j]) {
            nums1[k--] = nums1[i];
            --i;
        } else {
            nums1[k--] = nums2[j];
            --j;
        }
    }
    while(j >= 0) {
        nums1[k--] = nums2[j];
        --j;
    }
    return nums1;
};
```

# [31. 下一个排列](https://leetcode-cn.com/problems/next-permutation/)

整数数组的一个 **排列**  就是将其所有成员以序列或线性顺序排列。

- 例如，`arr = [1,2,3]` ，以下这些都可以视作 `arr` 的排列：`[1,2,3]`、`[1,3,2]`、`[3,1,2]`、`[2,3,1]` 。

整数数组的 **下一个排列** 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 **下一个排列** 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

- 例如，`arr = [1,2,3]` 的下一个排列是 `[1,3,2]` 。
- 类似地，`arr = [2,3,1]` 的下一个排列是 `[3,1,2]` 。
- 而 `arr = [3,2,1]` 的下一个排列是 `[1,2,3]` ，因为 `[3,2,1]` 不存在一个字典序更大的排列。

给你一个整数数组 `nums` ，找出 `nums` 的下一个排列。

必须 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 修改，只允许使用额外常数空间。

**示例 1：**

```
输入： nums = [1,2,3]
输出： [1,3,2]
```

**示例 2：**

```
输入： nums = [3,2,1]
输出： [1,2,3]
```

**示例 3：**

```
输入： nums = [1,1,5]
输出： [1,5,1]
```

**提示：**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`

## 思路

- 不讲武德版：调algorithm库里的全排列函数捏

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        next_permutation(nums.begin(), nums.end());
    }
};
```

- 正经思路
没啥思路x屈服于题解了：

>首先，下一个排列总是比当前排列要 **大**，除非该排列已经是最大的排列。所以我们需要找到一个 **大于当前序列** 的新序列，且 **变大的幅度** 尽可能 **小**。具体地有：
>
> 1. 将一个左边的 **较小数** 与一个右边的 **较大数** 交换，以能够**让当前排列变大**，从而得到下一个排列
> 2. 同时这个 **较小数** 需要尽量 **靠右**，而 **较大数** 需要尽可能 **小**
> 3. 交换完成后，**较大数右边的数** 需要 **按照升序重新排列**吗，这样可以在保证新排列大于原来排列的情况下，使变大的幅度尽可能小。
> 具体地，我们这样描述该算法，对于长度为 n 的排列 a：
> 1. 首先从后向前查找第一个顺序对 `(i,i+1)`，满足 `a[i] < a[i+1]`。这样 **较小数** 即为 `a[i]`。此时 `[i+1,n)` **必然是下降序列**。
> 2. 如果找到了顺序对，那么在区间 `[i+1,n)` 中 **从后向前** 查找第一个元素 `j` ，满足 `a[i] < a[j]`。这样 **较大数** 即为 `a[j]`。
> 3. 交换 `a[i]` 与 `a[j]`，此时可以证明区间 `[i+1,n)` 必为 **降序**。
> 4. 接使用 **双指针** 反转区间 `[i+1,n)` 使其 **变为升序**。
>
## 代码

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    let len = nums.length;
    let i = len-2;
    while(i >= 0 && nums[i] >= nums[i+1]) --i;
    if(i >= 0) {
        let j = len-1;
        while(j >= 0 && nums[i] >= nums[j]) --j;
        [nums[i], nums[j]] = [nums[j], nums[i]];    // 交换
    }
    var reverseList = function(nums, s, e) {
        if(s >= e) return nums;
        while(s <= e) {
            [nums[s], nums[e]] = [nums[e], nums[s]];
            ++s,--e;
        }
        return nums;
    }
    return reverseList(nums, i+1, len-1);
};
```

# [4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

给定两个大小分别为 `m` 和 `n` 的正序（从小到大）数组 `nums1` 和 `nums2`。请你找出并返回这两个正序数组的 **中位数** 。

算法的时间复杂度应该为 `O(log (m+n))` 。

**示例 1：**

```
输入： nums1 = [1,3], nums2 = [2]
输出： 2.00000
解释： 合并数组 = [1,2,3] ，中位数 2
```

**示例 2：**

```
输入： nums1 = [1,2], nums2 = [3,4]
输出： 2.50000
解释： 合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

**提示：**

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-106 <= nums1[i], nums2[i] <= 106`

## 思路

- 思路1：按[88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)中合并两个有序数组到 `nums1` 中后，直接找其中位数

```js
let len = m+n;
if(len%2 == 0) {
    return (nums1[len/2]+nums1[(len/2)-1])/2;
} else return nums1[(len-1)/2];
```

## 代码

思路一

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let [m, n] = [nums1.length, nums2.length];
    nums1 = nums1.concat(new Array(n).fill(0));
    let [i, j, k] = [m-1, n-1, m+n-1];
    while(i >= 0 && j >= 0) {
        if(nums1[i] >= nums2[j]) {
            nums1[k--] = nums1[i];
            --i;
        } else {
            nums1[k--] = nums2[j];
            --j;
        }
    }
    while(j >= 0) {
        nums1[k--] = nums2[j];
        --j;
    }
    let len = m+n;
    if(len%2 == 0) {
        return (nums1[len/2]+nums1[(len/2)-1])/2;
    } else return nums1[(len-1)/2];
};
```

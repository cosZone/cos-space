---
title: 剑指offer day17 排序（中等）
link: coding-train/leetcode/offer/day17
catalog: true
subtitle: 知识点：数组、设计、排序、双指针，难度为简单、困难
date: 2022-04-15 22:18:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 设计
- 排序
- 双指针
categories:
- [题目记录, 剑指offer]
---
day17题目：[剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)、[剑指 Offer 41. 数据流中的中位数](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/)

知识点：数组、设计、排序、双指针，难度为简单、困难

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 40. 最小                       的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[分治](https://leetcode-cn.com/tag/divide-and-conquer)、[快速选择](https://leetcode-cn.com/tag/quickselect)、[排序](https://leetcode-cn.com/tag/sorting)、[堆（优先队列）](https://leetcode-cn.com/tag/heap-priority-queue) | 简单 |
| [剑指 Offer 41. 数据流中的中位数](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/) | [设计](https://leetcode-cn.com/tag/design)、[双指针](https://leetcode-cn.com/tag/two-pointers)、[数据流](https://leetcode-cn.com/tag/data-stream)[排序](https://leetcode-cn.com/tag/sorting)                                                                        | 困难 |

# [剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)

输入整数数组 `arr` ，找出其中最小的 `k` 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

**示例 1：**

```
输入： arr = [3,2,1], k = 2
输出： [1,2] 或者 [2,1]
```

**示例 2：**

```
输入： arr = [0,1,2,1], k = 1
输出： [0]
```

**限制：**

- `0 <= k <= arr.length <= 10000`
- `0 <= arr[i] <= 10000`

## 思路及代码

思路1：排好序后直接切片

```javascript
var getLeastNumbers = function(arr, k) {
    arr.sort((a, b) => a - b);
    return arr.slice(0, k);
};
```

思路2：快排中进行统计

类似于之前题目：[数组中的第K个最大元素](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day5/#%E6%80%9D%E8%B7%AF-1)

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    function quickSort(arr, s, e) {
        if(s >= e) return
        let [l, r] = [s, e]
        let p = arr[s]
        while(l < r) {
            while(l < r && arr[r] >= p) r--
            while(l < r && arr[l] <= p) l++
            [arr[l], arr[r]] = [arr[r], arr[l]]
        }
        [arr[s], arr[l]] = [arr[l], arr[s]]
        if(k < l) quickSort(arr, s, l - 1)
        else if(k > l) quickSort(arr, l + 1, e)
        else return
    }
    quickSort(arr, 0, arr.length - 1)
    return arr.slice(0, k)
};
```

# [剑指 Offer 41. 数据流中的中位数](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/)

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：

- void addNum(int num) - 从数据流中添加一个整数到数据结构中。
- double findMedian() - 返回目前所有元素的中位数。

**示例 1：**

```
输入： ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
[[],[1],[2],[],[3],[]]
输出： [null,null,null,1.50000,null,2.00000]
```

**示例 2：**

```
输入： ["MedianFinder","addNum","findMedian","addNum","findMedian"]
[[],[2],[],[3],[]]
输出： [null,null,2.00000,null,2.50000]
```

**限制：**

- 最多会对 `addNum、findMedian` 进行 `50000` 次调用。

注意：本题与主站 295 题相同：[https://leetcode-cn.com/problems/find-median-from-data-stream/](https://leetcode-cn.com/problems/find-median-from-data-stream/)

## 思路及代码

思路1：直接插入，插入时保持有序

保存至 `nums` 数组中，通过splice方法对其进行插入

```javascript
/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.nums = []
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    let len = this.nums.length
    if(len === 0) {
        this.nums.push(num)
        return
    }
    if(num < this.nums[0]) {
        this.nums.unshift(num)
    } else if(num > this.nums[len - 1]) {
        this.nums.push(num)
    } else {
        let i = 0
        while(i < len && num > this.nums[i]) ++i
        this.nums.splice(i, 0, num)         // 更改原数组，从i开始插入num，删除0个元素
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    let len = this.nums.length
    if(len === 0) return null
    else if(len % 2 === 0) {    // 偶数
        return (this.nums[len/2-1] + this.nums[len/2]) / 2
    } else return this.nums[Math.floor(len / 2)]
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
```

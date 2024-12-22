---
title: 冲刺春招-精选笔面试66题大通关day21
link: coding-train/leetcode/bytedance/bytedance-day21
catalog: true
subtitle: 今日知识点：数组、排序、动态规划，难度为简单、中等、困难
date: 2022-03-28 20:30:55
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 动态规划
- 排序
categories:
- [题目记录, 字节校园]
---

day21题目：[69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)、[912. 排序数组](https://leetcode-cn.com/problems/sort-an-array/)、[887. 鸡蛋掉落](https://leetcode-cn.com/problems/super-egg-drop/)

今日知识点：数组、排序、动态规划，难度为简单、中等、困难

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day20](https://juejin.cn/post/7079764184023433230)

# [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

给你一个非负整数 `x` ，计算并返回 `x` 的 **算术平方根** 。

由于返回类型是整数，结果只保留 **整数部分** ，小数部分将被 **舍去 。**

**注意：** 不允许使用任何内置指数函数和算符，例如 `pow(x, 0.5)` 或者 `x ** 0.5` 。

**示例 1：**

```
输入： x = 4
输出： 2
```

**示例 2：**

```
输入： x = 8
输出： 2
解释： 8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
```

**提示：**

- `0 <= x <= 2^31 - 1`

## 思路

- 二分，平分根在`0`到`x`之间，且`0`到`x`有序。
- 当 `mid*mid <= x` 说明 `mid` 小了，在右半侧搜寻

## 代码

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let [l, r] = [0, x]
    while (l <= r) {
        let mid = (l+r)>>1
        if (mid*mid <= x) {
            l = mid+1
        } else r = mid-1
    }
    return r
};
```

# [912. 排序数组](https://leetcode-cn.com/problems/sort-an-array/)

给你一个整数数组 `nums`，请你将该数组升序排列。

**示例 1：**

```
输入： nums = [5,2,3,1]
输出： [1,2,3,5]
```

**示例 2：**

```
输入： nums = [5,1,1,2,0,0]
输出： [0,0,1,1,2,5]
```

**提示：**

- `1 <= nums.length <= 5 * 10^4`
- `-5 * 10^4 <= nums[i] <= 5 * 10^4`

## 思路

- 不讲武德版：直接调用排序函数

```javascript
var sortArray = function(nums) {
    return nums.sort((a, b) => a - b);
};
```

要练习各种排序算法的话，这个题目就挺合适的，这里给一个归并排序的版本吧。

![image.png](https://backblaze.cosine.ren/juejin/2bd159fb46df41c193aeaa62e5dcf87e~tplv-k3u1fbpfcp-watermark.png)

## 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    let merge = function(arr, s, m, e, tmp) {
        let [i, j, k] = [s, m+1, 0]
        while(i <= m && j <= e)
            tmp[k++] = arr[i] < arr[j] ? arr[i++] : arr[j++]
        while(i <= m) 
            tmp[k++] = arr[i++]
        while(j <= e)
            tmp[k++] = arr[j++]
        for(let i = 0; i < k; i++) 
            arr[s+i] = tmp[i]
    }
    let mergesort = function (arr, s, e, tmp) {
        if (s >= e) return
        let mid = (s+e)>>1
        mergesort(arr, s, mid, tmp)        // 归并左半部分
        mergesort(arr, mid + 1, e, tmp)    // 归并右半部分
        merge(arr, s, mid, e, tmp)         // 合并两部分
    }
    mergesort(nums, 0, nums.length-1, new Array(nums.length))
    return nums
};
```

# [887. 鸡蛋掉落](https://leetcode-cn.com/problems/super-egg-drop/)

给你 `k` 枚相同的鸡蛋，并可以使用一栋从第 `1` 层到第 `n` 层共有 `n` 层楼的建筑。

已知存在楼层 `f` ，满足 `0 <= f <= n` ，任何从 **高于** `f` 的楼层落下的鸡蛋都会碎，从 `f` 楼层或比它低的楼层落下的鸡蛋都不会破。

每次操作，你可以取一枚没有碎的鸡蛋并把它从任一楼层 `x` 扔下（满足 `1 <= x <= n`）。如果鸡蛋碎了，你就不能再次使用它。如果某枚鸡蛋扔下后没有摔碎，则可以在之后的操作中 **重复使用** 这枚鸡蛋。

请你计算并返回要确定 `f` **确切的值** 的 **最小操作次数** 是多少？

**示例 1：**

```
输入： k = 1, n = 2
输出： 2
解释：
鸡蛋从 1 楼掉落。如果它碎了，肯定能得出 f = 0 。 
否则，鸡蛋从 2 楼掉落。如果它碎了，肯定能得出 f = 1 。 
如果它没碎，那么肯定能得出 f = 2 。 
因此，在最坏的情况下我们需要移动 2 次以确定 f 是多少。 
```

**示例 2：**

```
输入： k = 2, n = 6
输出： 3
```

**示例 3：**

```
输入： k = 3, n = 14
输出： 4
```

**提示：**

- `1 <= k <= 100`
- `1 <= n <= 10^4`

## 思路

- 又是一道完全没有思路的题，看了题解之后，感觉第三种解法最好理解，推荐阅读：[题目理解 + 基本解法 + 进阶解法 - 鸡蛋掉落](https://leetcode-cn.com/problems/super-egg-drop/solution/ji-ben-dong-tai-gui-hua-jie-fa-by-labuladong/)
- 逆向思维，将问题转换为 `k` 个鸡蛋，最少掉落次数为 `f` 次，最大能测的楼层数 `n` 是多少
  - 当 `k == 1` 即只有一个鸡蛋或 `f == 1` 即只有一次掉落机会时，最大楼层数为 `f+1`
  - 其他时候，最大楼层数为鸡蛋碎了的情况，与鸡蛋没碎的情况下能测的最大楼层数加起来
- 当最大能测的楼层数为 `n` 时，我们就返回当前 `f`

## 代码

```javascript
/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function(k, n) {
    let check = function(k, f) {    // k个鸡蛋，f次掉落次数，返回最大的n
        // 1个鸡蛋或1次掉落，最大n为f+1
        if(k === 1 || f === 1) return f + 1;
        return check(k-1, f-1) + check(k, f-1)
    }
    let f = 1
    while(check(k, f) <= n) ++f
    return f
};
```

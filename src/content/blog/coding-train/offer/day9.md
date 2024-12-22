---
title: 剑指offer day9 动态规划（中等）
link: coding-train/leetcode/offer/day9
catalog: true
subtitle: 知识点：数组、分治、动态规划，难度为简单、中等
date: 2022-04-07 15:30:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 数组
- 分治
- 动态规划
categories:
- [题目记录, 剑指offer]
---
day9题目：[剑指 Offer 42. 连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)、[剑指 Offer 47. 礼物的最大价值](https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/)

知识点：数组、分治、动态规划，难度为简单、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                    | 知识点                                                                                                                                                | 难度 |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| [剑指 Offer 42. 连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/) | [数组](https://leetcode-cn.com/tag/array)、[分治](https://leetcode-cn.com/tag/divide-and-conquer)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming) | 简单 |
| [剑指 Offer 47. 礼物的最大价值](https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/)            | [数组](https://leetcode-cn.com/tag/array)、[动态规划](https://leetcode-cn.com/tag/dynamic-programming)、[矩阵](https://leetcode-cn.com/tag/matrix)             | 中等 |

# [剑指 Offer 42. 连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

**示例1:**

```
输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

**提示：**

- `1 <= arr.length <= 10^5`
- `-100 <= arr[i] <= 100`

注意：本题与主站 53 题相同：[https://leetcode-cn.com/problems/maximum-subarray/](https://leetcode-cn.com/problems/maximum-subarray/)

## 思路及代码

在[冲刺春招-精选笔面试66题大通关day7](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day7/)做过主站的题目，每次如果加上去之后会使当前和小于0，那么这个当前和只会让后面的变小所以直接舍弃，将nowsum重新置为0。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let ans = -1000
    let nowsum = 0
    for(let i = 0; i < nums.length; i++){
        nowsum += nums[i]
        ans = Math.max(ans, nowsum)
        if(nowsum < 0) nowsum = 0
    }
    return ans
};
```

# [剑指 Offer 47. 礼物的最大价值](https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/)

在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

**示例 1:**

```
输入: 
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物
```

提示：

- `0 < grid.length <= 200`
- `0 < grid[0].length <= 200`

## 思路及代码

非常经典的走迷宫问题的换个说法，[2022春网易互联网前端暑期实习笔试](https://ysx.cosine.ren/cn/review-interview/%E7%AC%94%E8%AF%95/2022%E6%98%A5%E7%BD%91%E6%98%93%E4%BA%92%E8%81%94%E7%BD%91%E5%89%8D%E7%AB%AF%E6%9A%91%E6%9C%9F%E5%AE%9E%E4%B9%A0%E7%AC%94%E8%AF%95/#%E6%80%9D%E8%B7%AF-4)就有考到类似的。

- `dp[i][j]` 代表i行j列能拿到礼物的最多价值
- 注意先初始化第一行和第一列
- 从上方或左方转移过来，状态转移方程为 `dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]) + grid[i][j]`

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
    if(grid.length === 0) return 0
    let [m, n] = [grid.length, grid[0].length]
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
    dp[0][0] = grid[0][0]
    for(let i = 1; i < m; ++i) 
        dp[i][0] = dp[i-1][0] + grid[i][0]
    for(let j = 1; j < n; ++j) 
        dp[0][j] = dp[0][j-1] + grid[0][j]
    for(let i = 1; i < m; ++i)
        for(let j = 1; j < n; ++j)
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    return dp[m-1][n-1]
};
```

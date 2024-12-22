---
title: 冲刺春招-精选笔面试66题大通关day14
link: coding-train/leetcode/bytedance/bytedance-day14
catalog: true
subtitle: 今日知识点：数组、动态规划、排序等，难度为简单、中等、困难
date: 2022-03-21 18:50:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 动态规划
categories:
- [题目记录, 字节校园]
---

day14题目：[121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)、[56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)、[135. 分发糖果](https://leetcode-cn.com/problems/candy/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：数组、动态规划、排序等，难度为简单、中等、困难

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day13](https://juejin.cn/post/7076832822635266079)

# [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。

你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。

**示例 1：**

```
输入： [7,1,5,3,6,4]
输出： 5
解释： 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**示例 2：**

```
输入： prices = [7,6,4,3,1]
输出： 0
解释： 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

**提示：**

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## 思路

思路非常非常之清晰啊，因为本质上就是最小值与最大值的一个差让其最大化，且最大值必须在最小值之后出现，所以我们

- 用 `minp` 记录当前最小值，`ans` 记录最大利润
  - 若当前 `price[i] <= minp`，则更新 `minp`
  - 否则，记录最大利润，`ans = max(ans, prices[i]-minp)`

## 代码

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    let len = prices.length;
    let ans = 0;
    let minp = Number.MAX_VALUE;
    for(let i = 0; i < len; ++i) {
        if(prices[i] <= minp) minp = prices[i];
        else ans = Math.max(ans, prices[i]-minp);
    }
    return ans;
};
```

# [56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)

以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]` 。请你合并所有重叠的区间，并返回 **一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间** 。

**示例 1：**

```
输入： intervals = [[1,3],[2,6],[8,10],[15,18]]
输出： [[1,6],[8,10],[15,18]]
解释： 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2：**

```
输入： intervals = [[1,4],[4,5]]
输出： [[1,5]]
解释： 区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

**提示：**

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^4`

## 思路

思路非常的清晰啊，因为要合并区间，所以需要先按照每个区间左端点大小升序排列（这样就可以每次与左边的合并即可）

- 排序 `intervals.sort((a, b) => { return a[0] - b[0]; });`
- 用 `ans` 存结果区间数组，以 `k` 记录 `ans` 当前下标
- 每次设 `[prel, prer] = ans[k]`、`[l, r] = intervals[i];`
- 因为排过序了，所以 `prel <= l` 是必然成立的
  - 只需要判断当前区间左端点 `l` 与上一个区间右端点 `prer` 之间关系
  - 若 `l > prer`则 **无需合并**，`push` 之后 `++k`，否则进行一个合并，更改区间右端点。

## 代码

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => { return a[0] - b[0]; });
    let ans = [intervals[0]];
    let k = 0;
    let len = intervals.length;
    for(let i = 1; i < len; ++i) {
        let [prel, prer] = ans[k];
        let [l, r] = intervals[i];
        if(l > prer) {
            ans.push(intervals[i]);
            ++k;
        } else ans[k][1] = Math.max(prer, r);
    }
    return ans;
};
```

# [135. 分发糖果](https://leetcode-cn.com/problems/candy/)

`n` 个孩子站成一排。给你一个整数数组 `ratings` 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

- 每个孩子至少分配到 `1` 个糖果。
- 相邻两个孩子评分更高的孩子会获得更多的糖果。

请你给每个孩子分发糖果，计算并返回需要准备的 **最少糖果数目** 。

**示例 1：**

```
输入： ratings = [1,0,2]
输出： 5
解释： 你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
```

**示例 2：**

```
输入： ratings = [1,2,2]
输出： 4
解释： 你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
```

**提示：**

- `n == ratings.length`
- `1 <= n <= 2 * 10^4`
- `0 <= ratings[i] <= 2 * 10^4`

## 思路

由题意易知 每个孩子要跟左右两边个比较一次，那么我们从左往右扫一遍，然后再从右往左扫一遍取最大即可

- 从左往右，`l[i]` 存储 `i` 孩子与左边的比较后所需最少糖果数，若 `ratings[i] > ratings[i-1]` 则 `l[i] = l[i-1]+1` ，这里需要用数组暂存是因为接下来要跟右边比较
- 从右往左，`r` 记录 `i` 孩子与右边比较后所需最少糖果数，若 `ratings[i] > ratings[i+1]` 则 `++r`，否则 `r = 1`，之后与 `l[i]` 比较二者取较大的一个数作为该孩子所需最少糖果数

## 代码

```js
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    let len = ratings.length;
    let l = new Array(len).fill(1);
    for(let i = 0; i < len; ++i) 
        if(i-1 >= 0 && ratings[i] > ratings[i-1]) 
            l[i] = l[i-1]+1;
    let [ans, r] = [0, 1];
    for(let i = len-1; i >= 0; --i) {
        if(i < len-1 && ratings[i] > ratings[i+1])
            ++r;
        else r = 1;
        ans += Math.max(l[i], r);
    }
    return ans;
};
```

---
title: 冲刺春招-精选笔面试66题大通关18
link: coding-train/leetcode/bytedance/bytedance-day18
catalog: true
subtitle: 今日知识点：数组、动态规划，难度为中等、中等、字节の简单
date: 2022-03-25 19:09:32
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 动态规划
categories:
- [题目记录, 字节校园]
---

day18题目：[322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)、[198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)、 [bytedance-003. 古生物血缘远近判定](https://leetcode-cn.com/problems/LJXRel/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点： 数组、动态规划，难度为中等、中等、字节の简单

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day17](https://juejin.cn/post/7078591217184800805)

# [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

给你一个整数数组 `coins` ，表示不同面额的硬币；以及一个整数 `amount` ，表示总金额。

计算并返回可以凑成总金额所需的 **最少的硬币个数** 。如果没有任何一种硬币组合能组成总金额，返回 `-1` 。

你可以认为每种硬币的数量是无限的。

**示例 1：**

```
输入： coins = [1, 2, 5], amount = 11
输出： 3 
解释： 11 = 5 + 5 + 1
```

**示例 2：**

```
输入： coins = [2], amount = 3
输出： -1
```

**示例 3：**

```
输入： coins = [1], amount = 0
输出： 0
```

**提示：**

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^&4`

## 思路

动态规划

- `dp[i]` 表示凑成金额 `i` 所需最少的硬币个数
- 转移方程为 `dp[i] = min(dp[i-coins[j]]+1, dp[i])`，`j` 为第j个硬币面值，当且仅当这个硬币的面值比当前金额小
- 最后若 `dp[amount] > amount` 说明无法凑成

## 代码

```javascript
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    coins.sort((a, b) => b-a)
    let maxa = amount+1
    let dp = new Array(amount+1).fill(maxa) // 凑成金额i所需最少的硬币个数 
    dp[0] = 0
    for(let i = 1; i <= amount; ++i) {
        for(let j = 0; j < coins.length; ++j) {
            if(coins[j] > i) continue
            let prea = i-coins[j]
            dp[i] = Math.min(dp[prea]+1, dp[i])
        }
    }
    return dp[amount] > amount? -1: dp[amount]
};
```

# [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。

给定一个代表每个房屋存放金额的非负整数数组，计算你 **不触动警报装置的情况下** ，一夜之内能够偷窃到的最高金额。

**示例 1：**

```
输入： [1,2,3,1]
输出： 4
解释： 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 2：**

```
输入： [2,7,9,3,1]
输出： 12
解释： 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

**提示：**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

## 思路

首先，简单的一思索就可以得出这么一个dp：

- `dp[0][i]` 表示偷第 `i` 家可偷得的最大数量， `dp[1][i]` 表示不偷第 `i` 家可偷得的最大数量
- 转移方程就很容易得出：
  - 若偷当前这家，则不可以偷上一家，故 `dp[0][i] = dp[1][i-1]+nums[i]`
  - 若不偷当前这家，则可以偷上一家也可以不偷，取两者中较大的金额 `dp[1][i] = max(dp[0][i-1], dp[1][i-1])`

```js
var rob = function(nums) {
    let dp = new Array(2).fill(0).map((v) => new Array(nums.length).fill(0))
    let ans = nums[0]
    dp[0][0] = nums[0]  // 0为偷 
    dp[1][0] = 0        // 1为不偷
    for(let i = 1; i < nums.length; ++i) {
        dp[0][i] = dp[1][i-1]+nums[i]
        dp[1][i] = Math.max(dp[0][i-1], dp[1][i-1])
    }
    return Math.max(dp[0][nums.length-1], dp[1][nums.length-1])
};
```

其次，可以看到这个 `dp` 每次只和 `i-1` 也就是上一家比较，故可以优化

- 直接用 `pre[0]` 和 `pre[1]` 代替 `dp[0][i-1]` 和 `dp[1][i-1]` 即可，省了一大笔空间！
代码如下：

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let pre = [nums[0], 0]      // pre[0]为偷上一个 pre[1]为不偷上一个
    let ans = nums[0]
    for(let i = 1; i < nums.length; ++i) {
        let t = pre[0]
        pre[0]= pre[1]+nums[i]
        pre[1] = Math.max(t, pre[1])
    }
    return Math.max(pre[0], pre[1])
};
```

# [bytedance-003. 古生物血缘远近判定](https://leetcode-cn.com/problems/LJXRel/)

DNA 是由 ACGT 四种核苷酸组成，例如 AAAGTCTGAC，假定自然环境下 DNA 发生异变的情况有：

1. 基因缺失一个核苷酸
1. 基因新增一个核苷酸
1. 基因替换一个核苷酸

且发生概率相同。\
古生物学家 Sam 得到了若干条相似 DNA 序列，Sam 认为一个 DNA 序列向另外一个 DNA 序列转变所需的最小异变情况数可以代表其物种血缘相近程度，异变情况数越少，血缘越相近，请帮助 Sam 实现获取两条 DNA 序列的最小异变情况数的算法。

**格式：**

```
输入：
- 每个样例只有一行，两个 DNA 序列字符串以英文逗号“,”分割
输出：
- 输出转变所需的最少情况数，类型是数字
```

**示例：**

```
输入：ACT,AGCT
输出：1
```

**提示：**

- 每个 DNA 序列不超过 100 个字符

## 思路

其实就是一个字符串，每次可以进行

- 增加某字符
- 删除某字符
- 修改某字符
求将其变成另一个字符串所需最小次数

像不像之前某个困难题：编辑距离？不过字符的种类只有 `A C G T` 四个罢了

指路：[冲刺春招-精选笔面试 66 题大通关 day11](https://ysx.cosine.ren/cn/%E5%86%B2%E5%88%BA%E6%98%A5%E6%8B%9B-%E7%B2%BE%E9%80%89%E7%AC%94%E9%9D%A2%E8%AF%95%2066%20%E9%A2%98%E5%A4%A7%E9%80%9A%E5%85%B3%20day11/#%E6%80%9D%E8%B7%AF-3)

`dp[i][j]` 表示 `dna1` 中前 `i` 个字符变成 `dna2` 中前j个字符最少需要多少步

- `i=0` 的时候（即第一行）为 `dna2` 前j个数变为空字符串需要几步（自然是j步）

- `j=0` 时（即第一列）为 `dna1` 前 `i` 个数变为空字符串需要几步

- 开始遍历，过程中若当前 `dna1[i] == dna2[j]`，则说明无需变化，`dp[i][j] = dp[i-1][j-1];`

- 否则 `dp[i][j]` 为 `dp[i-1][j-1]`、`dp[i-1][j]`、 `dp[i][j-1])+1` 中最小步数+1

  - 这里最小值若为 `dp[i-1][j-1]` 表示修改一个字符

  - 若为 `dp[i][j-1]` 表示往 `dna2[j-1]` 后面添加一个字符，`dp[i-1][j]` 表示往 `dna1[i-1]` 后面添加一个字符

## 代码

```js
var [dna1, dna2] = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n')[0].split(',')
let [len1, len2] = [dna1.length+1, dna2.length+1]
let dp = new Array(len1).fill(0).map(() => new Array(len2).fill(0))
// dp[i][j]为dna1的0~i-1变到dna2的0~j-1所需最少次数
for(let i = 1; i < len1; ++i)
    dp[i][0] = dp[i-1][0]+1
for(let i = 1; i < len2; ++i)
    dp[0][i] = dp[0][i-1]+1
for(let i = 1; i < len1; ++i) {
    for(let j = 1; j < len2; ++j) {
        if(dna1[i-1] === dna2[j-1]) dp[i][j] = dp[i-1][j-1]
        else dp[i][j] = Math.min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j])+1
    }
}
console.log(dp[len1-1][len2-1])
```

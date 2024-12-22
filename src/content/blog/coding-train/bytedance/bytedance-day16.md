---
title: 冲刺春招-精选笔面试66题大通关16
link: coding-train/leetcode/bytedance/bytedance-day16
catalog: true
subtitle: 今日知识点：正则、树、dfs、滑动窗口，难度为字节の简单、中等、困难
date: 2022-03-24 00:13:32
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 正则
- dfs/bfs
- 滑动窗口
categories:
- [题目记录, 字节校园]
---

day16题目：[bytedance-007. 化学公式解析](https://leetcode-cn.com/problems/fF9c0W/)、[129. 求根节点到叶节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)、[239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：正则、树、dfs、滑动窗口，难度为字节の简单、中等、困难

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day15](https://juejin.cn/post/7077942843163017253)

# [bytedance-007. 化学公式解析](https://leetcode-cn.com/problems/fF9c0W/)

给定一个用字符串展示的化学公式，计算每种元素的个数。规则如下：

- 元素命名采用驼峰命名，例如 `Mg`
- `()` 代表内部的基团，代表阴离子团
- `[]` 代表模内部链节通过化学键的连接，并聚合

例如：H2O => H2O1 Mg(OH)2 => H2Mg1O2

**格式：**

```
输入：
- 化学公式的字符串表达式，例如：K4[ON(SO3)2]2 。
输出：
- 元素名称及个数：K4N2O14S4，并且按照元素名称升序排列。
```

**示例：**

```
输入：K4[ON(SO3)2]2
输出：K4N2O14S4
```

## 思路

评论区大神思路，惊为天人。

- 正则匹配先将所有小括号展开
- 再将所有大括号展开
- 然后将原子展开：`Mg4` -> `MgMgMgMg`
- 最后就是统计词频然后排序即可

## 代码

```js
var input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n')[0]
function replacer(match, str, k) {
    k = k? parseInt(k): 1;
    return str.repeat(k)
}
input = input.replace(/\((.+)\)(\d+)/g, replacer)   // 小括号替换
input = input.replace(/\[(.+)\](\d+)/g, replacer)   // 中括号替换
input = input.replace(/([A-Z][a-z]?)(\d+)/g, replacer)   // 原子展开
var map = new Map()
var ans = []
input = input.match(/[A-Z][a-z]?/g)
for(let i = 0; i < input.length; ++i) {
    let ch = input[i]
    if(!map.has(ch)) {
        map.set(ch, ans.length)
        ans.push([ch, 1])
    } else {
        let key = map.get(ch)
        ++ans[key][1]
    }
}
ans = ans.sort((a, b) => a[0].localeCompare(b[0]));
console.log(ans.toString().replace(/\,/g, ''))
```

# [129. 求根节点到叶节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)

给你一个二叉树的根节点 `root` ，树中每个节点都存放有一个 `0` 到 `9` 之间的数字。

每条从根节点到叶节点的路径都代表一个数字：

- 例如，从根节点到叶节点的路径 `1 -> 2 -> 3` 表示数字 `123` 。

计算从根节点到叶节点生成的 **所有数字之和** 。

**叶节点** 是指没有子节点的节点。

**示例 1：**

![](https://backblaze.cosine.ren/juejin/C2582dda288345e1bfc0171997da14de~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： root = [1,2,3]
输出： 25
解释：
从根到叶子节点路径 1->2 代表数字 12
从根到叶子节点路径 1->3 代表数字 13
因此，数字总和 = 12 + 13 = 25
```

**示例 2：**

![](https://backblaze.cosine.ren/juejin/84606833c16d4dc19afbceb9af735f99~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： root = [4,9,0,5,1]
输出： 1026
解释：
从根到叶子节点路径 4->9->5 代表数字 495
从根到叶子节点路径 4->9->1 代表数字 491
从根到叶子节点路径 4->0 代表数字 40
因此，数字总和 = 495 + 491 + 40 = 1026
```

**提示：**

- 树中节点的数目在范围 `[1, 1000]` 内
- `0 <= Node.val <= 9`
- 树的深度不超过 `10`

## 思路

一眼题，dfs就完事了，到叶子节点将 sum 加到答案中

## 代码

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    let ans = 0
    let dfs = function(rt, sum) {
        if(!rt) return
        sum = sum*10 + rt.val
        if(!rt.left && !rt.right) {
            ans += sum
            return
        }
        if(rt.left) dfs(rt.left, sum);
        if(rt.right) dfs(rt.right, sum);
    }
    dfs(root, 0);
    return ans;
};
```

# [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

给你一个整数数组 `nums`，有一个大小为 `k` **的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回 *滑动窗口中的最大值* 。

**示例 1：**

```
输入： nums = [1,3,-1,-3,5,3,6,7], k = 3
输出： [3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7      5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**示例 2：**

```
输入： nums = [1], k = 1
输出： [1]
```

**提示：**

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

## 思路

队列q存储下标，其对应元素单调递减

- 若滑动窗口中两个元素 `j < i` 并且 `nums[j] <= nums[i]` ，只要 `j` 还在窗口中，那么 `i` 一定也还在窗口中，所以最值一定不是 `nums[j]`，故可以将其移除
- 滑动过程中记录，若队尾元素小于等于当前新元素，则弹出，直到为空或者队尾元素大于新元素
- 同时若队头所存下标 `q[0]` 小于窗口左侧 `l`，则不断将队首弹出

## 代码

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {
    let q = []
    for(let i = 0; i < k; ++i) {    // 可以移除就移除
        while(q.length != 0 && nums[i] >= nums[q[q.length-1]]) 
            q.pop()
        q.push(i)
    }
    let ans = [nums[q[0]]]
    let len = nums.length
    for(let l = 1; l+k-1 < len; ++l) {
        let r = l+k-1
        while(q.length != 0 && nums[r] >= nums[q[q.length-1]]) 
            q.pop()
        q.push(r)
        while(q.length != 0 && q[0] < l) 
            q.shift() // 队首弹出
        ans.push(nums[q[0]])
    }
    return ans
};
```

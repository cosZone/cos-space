---
title: 冲刺春招-精选笔面试66题大通关day2
link: coding-train/leetcode/bytedance/bytedance-day2
catalog: true
subtitle: 知识点：字符串、滑动窗口、二叉树，难度仍为简单、中等、困难。
date: 2022-03-09 18:00:52
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 字符串
- 滑动窗口
categories:
- [题目记录, 字节校园]
---

day2题目：[14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)、[3. 无重复字符的最长子串](https://leetcode-cn.com/problems/lru-cache/)、[124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：字符串、滑动窗口、二叉树，难度仍为简单、中等、困难。
<!-- more -->
# 14. 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1：

>输入：strs = ["flower","flow","flight"]
输出："fl"

示例 2：

> 输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。

## 思路

这道题思路不用多说了吧（）代码一看就懂

## 完整代码

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let ans = "";
    let len = strs.length;
    for(let i = 0; strs[0][i]; ++i) {
        let ch = strs[0][i];
        if(!ch) return ans;
        for(let j = 1; j < len; ++j) {
            if(!strs[j][i] || strs[j][i] != ch) return ans;
        }    
        ans = ans+ch;
    }
    return ans
};
```

# 3. 无重复字符的最长子串

给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

> 示例 1:
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

> 示例 2:
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

> 示例 3:
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

## 思路

剑指offer的时候就做过，滑动窗口，进入窗口的字符若为重复（用hash存判断）的则将左侧窗口滑至该字符（并将hash中相应的key删除）同时记录长度，再继续滑动。

## 完整代码

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let len = s.length;
    if(len == 0) return 0;
    let m = new Map();
    let [l, r] = [0, 0];
    let ans = 0;
    while(r < len) {
        while(m.has(s[r]))    // 出现过
            m.delete(s[l++]);   // 删除最左边的元素 直至出现过的元素消失
        m.set(s[r], r);
        ++r;
        ans = Math.max(ans, r-l);
    }
    return ans;
};
```

# 124. 二叉树中的最大路径和

**路径** 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

**路径和** 是路径中各节点值的总和。

给你一个二叉树的根节点 `root` ，返回其 **最大路径和** 。
> 输入：root = [1,2,3]
输出：6
解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6

> 输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42

## 思路

最大路径和，每个结点的最大路径和等于其左子节点最大路径和+root+右子节点最大路径和，考虑到有负值存在，则路径和有可能小于0，所以需取路径和与0中较大的那个。需要一个maxPath函数 返回左右路径中较大的那个路径和加上根节点值，并在沿途更新ans的最大值。

## 完整代码

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
    let ans = -Infinity;
    var maxPath = function(root) {
        if(!root) return 0;
        let [lp, rp] = [Math.max(maxPath(root.left), 0), Math.max(maxPath(root.right), 0)];
        ans = Math.max(ans, lp+rp+root.val);
        return Math.max(lp, rp) + root.val;
    }
    maxPath(root)
    return ans;
};
```

今天的题目码量倒是很少~

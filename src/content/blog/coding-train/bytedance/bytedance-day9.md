---
title: 冲刺春招-精选笔面试66题大通关day9
link: coding-train/leetcode/bytedance/bytedance-day9
catalog: true
subtitle: 今日知识点：树、层序遍历、处理输入输出？（bushi），难度为中等、中等、字节の简单
date: 2022-03-16 23:10:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 树
- 层序遍历
categories:
- [题目记录, 字节校园]
---

day9题目：[105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)、[103. 二叉树的锯齿形层序遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)、[bytedance-010. 数组组成最大数](https://leetcode-cn.com/problems/9nsGSS/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：树、层序遍历、处理输入输出？（bushi），难度为中等、中等、字节の简单
<!-- more -->
# 105. 从前序与中序遍历序列构造二叉树

给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

**示例 1:**
输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出: [3,9,20,null,null,15,7]

**示例 2:**
输入: preorder = [-1], inorder = [-1]
输出: [-1]

> 提示:
1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder 和 inorder 均 **无重复** 元素
inorder 均出现在 preorder
preorder **保证** 为二叉树的前序遍历序列
inorder **保证** 为二叉树的中序遍历序列

## 思路

也是老题了，因为无重复，所以找出根节点在中序遍历中的下标，算出左右子节点数量，切分递归构建即可。

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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(!preorder || !inorder) return null;
    let root = new TreeNode(preorder[0]);
    let idx = inorder.findIndex((v) => (v == preorder[0]));
    let len = preorder.length;
    let lnum = idx;
    let rnum = lnum == -1 ? len-1 : len-1-lnum;
    if(lnum > 0) 
        root.left = buildTree(preorder.slice(1, lnum+1), inorder.slice(0, lnum+1));
    if(rnum > 0) 
        root.right = buildTree(preorder.slice(len-rnum), inorder.slice(len-rnum));
    return root;
};
```

# 103. 二叉树的锯齿形层序遍历

给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

**示例 1：**
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[20,9],[15,7]]

**示例 2：**
输入：root = [1]
输出：[[1]]

**示例 3：**
输入：root = []
输出：[]

>提示：
树中节点数目在范围 [0, 2000] 内
-100 <= Node.val <= 100

### 思路

层序遍历将结果存至level数组中，然后反转奇数层的结果，简单粗暴の解法，记得特判一下root为空的情况

### 代码

```js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    let level = []  // 每一层的
    let q = []; // 队列
    if(!root) return [];
    q.push(root);
    let nowl = [];
    while(q.length != 0) {
        let nodelist = q.slice(0);
        q = [];
        for(let v of nodelist) {
            nowl.push(v.val);
            if(v.left) q.push(v.left);
            if(v.right) q.push(v.right);
        }
        level.push(nowl);
        nowl = [];
    }
    if(nowl.length != 0) level.push(nowl);
    for(let i = 0; i < level.length; ++i) {
        if(i % 2 == 1) level[i].reverse();
    }
    return level;
};
```

# bytedance-010. 数组组成最大数

给定一组非负整数，重新排列它们的顺序使之组成一个最大的整数。

**示例 1：**
输入：[10,1,2]
输出：2110

**示例 2：**
输入：[3,30,34,5,9]
输出：9534330

ACM模式！！

## 思路

别问，问就是前些天面试刚碰到过，蚌，终生难忘，重载一下排序规则即可。
天哪真有人拿acm模式放核心输出的样例吗，输入输出还是看评论学的，蚌。`var input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n')[0];
`，字符串处理还是js来吧，lei了。

重载排序顺序，利用字符串排序规则，重载小于号a < b 变为a+b > b+a（字符串形式），这样的话比如30， 21 就是3021 > 2130，12，2就是212>12，990，9就是9990 > 9909

## 代码

```js
var input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n')[0];
input = input.slice(1, input.length-1).split(',');
var ans = input.sort((a, b) => ((b+a) - (a+b))).join('');
console.log(ans)
```

---
title: 剑指offer day18 搜索与回溯算法（中等）
link: coding-train/leetcode/offer/day18
catalog: true
subtitle: 知识点：树、dfs/bfs，难度为简单、简单
date: 2022-04-16 17:58:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 树
- dfs/bfs
categories:
- [题目记录, 剑指offer]
---
day18题目：[剑指 Offer 55 - I. 二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)、[剑指 Offer 55 - II. 平衡二叉树](https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/)

知识点：树、dfs/bfs，难度为简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 55 - I. 二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/) | [树](https://leetcode-cn.com/tag/tree)、[深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[广度优先搜索](https://leetcode-cn.com/tag/breadth-first-search) | 简单 |
| [剑指 Offer 55 - II. 平衡二叉树](https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/) | [树](https://leetcode-cn.com/tag/tree)、[深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[二叉树](https://leetcode-cn.com/tag/binary-tree) |简单 |

# [剑指 Offer 55 - I. 二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

例如：

给定二叉树 `[3,9,20,null,null,15,7]`，

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

**提示：**

1. `节点总数 <= 10000`

注意：本题与主站 104 题相同：<https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/>

## 思路及代码

递归，直接返回左右两边最大的深度+1

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```

# [剑指 Offer 55 - II. 平衡二叉树](https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/)

输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

**示例 1:**

给定二叉树 `[3,9,20,null,null,15,7]`

```
    3
   / \
  9  20
    /  \
   15   7
```

返回 `true` 。\
\
**示例 2:**

给定二叉树 `[1,2,2,3,3,null,null,4,4]`

```
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```

返回 `false` 。

**限制：**

- `0 <= 树的结点个数 <= 10000`

注意：本题与主站 110 题相同：<https://leetcode-cn.com/problems/balanced-binary-tree/>

## 思路及代码

先判断当前结点的左右子树高度是否满足平衡二叉树要求，然后判断左右子树是否为平衡二叉树，两条件都满足才能为平衡二叉树

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    function countHeight(root) {
        if(!root) return 0
        return Math.max(countHeight(root.left), countHeight(root.right)) + 1
    }
    if(!root) return true
    return Math.abs(countHeight(root.left) - countHeight(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
};
```

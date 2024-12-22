---
title: 剑指offer day7 搜索与回溯算法（简单）
link: coding-train/leetcode/offer/day7
catalog: true
subtitle: 知识点：二叉树、dfs/bfs，难度为中等、简单、中等
date: 2022-04-05 17:26:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 二叉树
- dfs/bfs
categories:
- [题目记录, 剑指offer]
---
day7题目：[剑指 Offer 26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)、[剑指 Offer 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)、[剑指 Offer 28. 对称的二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

知识点：二叉树、dfs/bfs，难度为中等、简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                        | 知识点                                                                                                      | 难度 |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---- |
| [剑指 Offer 26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)          | [深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[二叉树](https://leetcode-cn.com/tag/binary-tree) | 中等 |
| [剑指 Offer 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/) | [深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[二叉树](https://leetcode-cn.com/tag/binary-tree) | 简单 |
| [剑指 Offer 28. 对称的二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)  | [深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[二叉树](https://leetcode-cn.com/tag/binary-tree) | 简单 |

# [剑指 Offer 26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。

例如:
给定的树 A:

```
     3
    / \
   4   5
  / \
 1   2
```

给定的树 B：

```
   4 
  /
 1`
```

返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

**示例 1：**

```
输入： A = [1,2,3], B = [3,1]
输出： false
```

**示例 2：**

```
输入： A = [3,4,5,1,2], B = [4,1]
输出： true
```

**限制：**

`0 <= 节点个数 <= 10000`

## 思路及代码

每当A、B结点值相同时比较B是否为A的子树（isSame）

```javascript
var isSubStructure = function(A, B) {
    function isSame(a, b) {
        if(!a && !b) return true;
        else if(!b) return true;    // b中不存在但a中存在,没问题
        else if(!a) return false;
        return a.val === b.val && isSame(a.left, b.left) && isSame(a.right, b.right);
    }
    if(!A || !B) return false;
    if(A.val === B.val && isSame(A, B)) return true;
    return isSubStructure(A.left, B) || isSubStructure(A.right, B);
};
```

# [剑指 Offer 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

请完成一个函数，输入一个二叉树，该函数输出它的镜像。

例如输入：

```
     4
   /   \
  2     7
 / \   / \
1   3 6   9`
```

镜像输出：

```
     4
   /   \
  7     2
 / \   / \
9   6 3   1`
```

**示例 1：**

```
输入： root = [4,2,7,1,3,6,9]
输出： [4,7,2,9,6,3,1]
```

**限制：**

`0 <= 节点个数 <= 1000`

注意：本题与主站 226 题相同：[https://leetcode-cn.com/problems/invert-binary-tree/](https://leetcode-cn.com/problems/invert-binary-tree/)

## 思路及代码

简单的递归

```javascript
var mirrorTree = function(root) {
    if(!root) return null
    let newroot = new TreeNode(root.val)
    newroot.left = mirrorTree(root.right)
    newroot.right = mirrorTree(root.left)
    return newroot
};
```

# [剑指 Offer 28. 对称的二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

```
    1
   / \
  2   2
   \   \
   3    3`
```

**示例 1：**

```
输入： root = [1,2,2,3,4,4,3]
输出： true
```

**示例 2：**

```
输入： root = [1,2,2,null,3,null,3]
输出： false
```

**限制：**

`0 <= 节点个数 <= 1000`

注意：本题与主站 101 题相同：[https://leetcode-cn.com/problems/symmetric-tree/](https://leetcode-cn.com/problems/symmetric-tree/)

## 思路及代码

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root) return true
    function isMirror(a, b) {
        if(!a && !b) return true
        else if(!a || !b) return false
        return a.val === b.val && isMirror(a.left, b.right) && isMirror(a.right, b.left)              
    }
    return isMirror(root.left, root.right)
};
```

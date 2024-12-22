---
title: 剑指offer day20 分治算法（中等）
link: coding-train/leetcode/offer/day20
catalog: true
subtitle: 知识点：树、递归、dfs/bfs，难度为中等、简单、简单
date: 2022-04-18 23:30:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 树
- 递归
- 分治
categories:
- [题目记录, 剑指offer]
---

day20题目：[剑指 Offer 07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)、[剑指 Offer 16. 数值的整数次方](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)、[剑指 Offer 33. 二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

知识点：树、递归、分治，难度为中等、中等、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/) | [树](https://leetcode-cn.com/tag/tree)、[数组](https://leetcode-cn.com/tag/array)、[哈希表](https://leetcode-cn.com/tag/hash-table)、[分治](https://leetcode-cn.com/tag/divide-and-conquer) | 中等 |
| [剑指 Offer 16. 数值的整数次方](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/) | [递归](https://leetcode-cn.com/tag/recursion)、[数学](https://leetcode-cn.com/tag/math) | 中等 |
| [剑指 Offer 33. 二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/) | [栈](https://leetcode-cn.com/tag/stack)、[树](https://leetcode-cn.com/tag/tree)、[二叉搜索树](https://leetcode-cn.com/tag/binary-search-tree)、[递归](https://leetcode-cn.com/tag/recursion) | 中等 |

# [剑指 Offer 07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。

假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

**示例 1:**

![](https://backblaze.cosine.ren/juejin/7fa8a56cae82482aa01716055939f2e5~Tplv-K3u1fbpfcp-Zoom-1.png)

```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

**示例 2:**

```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

**限制：**

`0 <= 节点个数 <= 5000`

## 思路及代码

[冲刺春招-精选笔面试66题大通关day9](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day9/#105) 同款题目
因为无重复，所以找出根节点在中序遍历中的下标，算出左右子节点数量，切分递归构建即可。

```javascript
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(preorder.length === 0) return null
    let root = new TreeNode(preorder[0])
    let index = inorder.indexOf(preorder[0])
    root.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index))
    root.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))
    return root
};
```

# [剑指 Offer 16. 数值的整数次方](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)

实现 [pow(*x*, *n*)](https://www.cplusplus.com/reference/valarray/pow/) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。

**示例 1：**

```
输入： x = 2.00000, n = 10
输出： 1024.00000
```

**示例 2：**

```
输入： x = 2.10000, n = 3
输出： 9.26100
```

**示例 3：**

```
输入： x = 2.00000, n = -2
输出： 0.25000
解释： 2-2 = 1/22 = 1/4 = 0.25
```

**提示：**

- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31-1`
- `-10^4 <= xn <= 10^4`

注意：本题与主站 50 题相同：<https://leetcode-cn.com/problems/powx-n/>

## 思路及代码

快速幂板子题，就是稍微注意下，踩了个坑，JS中右移符号`>>`是算术移位，需要考虑符号位，而这里应该用`>>>` 逻辑右移，详见[javascript解决问题移位运算的坑](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/solution/javascriptjie-jue-wen-ti-yi-wei-yun-suan-h4u9/)

```javascript
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    // 快速幂嘛。处理下n为负数的情况
    function qpow(x, n) {
        if(x == 1) return 1
        let res = 1
        while(n) {
            if(n & 1) res *= x
            x *= x
            n >>>= 1
        }
        return res
    }
    return n < 0 ? 1 / qpow(x, -n) : qpow(x, n)
};
```

# [剑指 Offer 33. 二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 `true`，否则返回 `false`。假设输入的数组的任意两个数字都互不相同。

参考以下这颗二叉搜索树：

```
     5
    / \
   2   6
  / \
 1   3
```

**示例 1：**

```
输入: [1,6,3,2,5]
输出: false
```

**示例 2：**

```
输入: [1,3,2,6,5]
输出: true
```

**提示：**

1. `数组长度 <= 1000`

## 思路及代码

```javascript
/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function(postorder) {
    // 小大中间
    function verify(l, r) {
        if(l >= r) return true
        let root = postorder[r]
        let leftRT = l
        // 小 找到第一个大的 实际左子树的根为leftRT-1
        while(postorder[leftRT] < root) ++leftRT  
        let rightRT = leftRT
        // 大 找到第一个小的 按理说会找到root的位置。
        while(postorder[rightRT] > root) rightRT++  
        return rightRT == r && verify(l, leftRT - 1) && verify(leftRT, r - 1)
        // 验证左右子树
    }
    return verify(0, postorder.length - 1)
};
```

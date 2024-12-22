---
title: 剑指offer day19 搜索与回溯算法（中等）
link: coding-train/leetcode/offer/day19
catalog: true
subtitle: 知识点：树、递归、dfs/bfs，难度为中等、简单、简单
date: 2022-04-17 19:48:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 树
- 递归
- dfs/bfs
categories:
- [题目记录, 剑指offer]
---

day19题目： [剑指 Offer 64. 求1+2+…+n](https://leetcode-cn.com/problems/qiu-12n-lcof/)、[剑指 Offer 68 - I. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/)、[剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

知识点：树、递归、dfs/bfs，难度为中等、简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 64. 求1+2+…+n](https://leetcode-cn.com/problems/qiu-12n-lcof/) | [位运算](https://leetcode-cn.com/tag/bit-manipulation)、[递归](https://leetcode-cn.com/tag/recursion)、[脑筋急转弯](https://leetcode-cn.com/tag/brainteaser) | 中等 |
| [剑指 Offer 68 - I. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/) | [树](https://leetcode-cn.com/tag/tree)、[深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[二叉搜索树](https://leetcode-cn.com/tag/binary-search-tree) | 简单 |
| [剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/) | [树](https://leetcode-cn.com/tag/tree)、[深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[二叉树](https://leetcode-cn.com/tag/binary-tree) | 简单 |

# [剑指 Offer 64. 求1+2+…+n](https://leetcode-cn.com/problems/qiu-12n-lcof/)

求 `1+2+...+n` ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

**示例 1：**

```
输入: n = 3
输出: 6
```

**示例 2：**

```
输入: n = 9
输出: 45
```

**限制：**

- `1 <= n <= 10000`

## 思路与代码

看这题的tag：脑筋急转弯就能发现不对劲……

主要就是用短路运算符来代替条件判断

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var sumNums = function(n) {
    n && (n += sumNums(n-1))
    return n
};
```

# [剑指 Offer 68 - I. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
[百度百科](https://baike.baidu.com/item/%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。”

例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]

![](https://backblaze.cosine.ren/juejin/Bc7700522f0a4880ba8b5735e0d7fc7d~Tplv-K3u1fbpfcp-Zoom-1.png)

**示例 1:**

```
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6 
解释: 节点 2 和节点 8 的最近公共祖先是 6。
```

**示例 2:**

```
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
```

**说明:**

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉搜索树中。

注意：本题与主站 235 题相同：<https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/>

## 思路与代码

根据之前[冲刺春招-精选笔面试66题大通关17](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day17/#%E6%80%9D%E8%B7%AF-2)的经验，思路一为先从一个节点往上走将沿途的vis置为true，再从另一个结点往上走，遇到vis为true的就是最近共同祖先，返回。

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if(!root) return null
    let fa = new Map()
    function dfs(rt, pre) {
        if (rt === null) return
        fa.set(rt, pre)
        dfs(rt.left, rt)
        dfs(rt.right, rt)
    }
    dfs(root, null)
    let vis = new Map()
    let nowv = q
    while (nowv) {
        vis.set(nowv, true)
        if(fa.has(nowv)) 
            nowv = fa.get(nowv)
    }
    nowv = p
    while (nowv) {
        if(vis.has(nowv)) 
            return nowv
        if(fa.has(nowv)) 
            nowv = fa.get(nowv)
    }
};
```

思路二则是利用二叉搜索树的性质，从根节点开始遍历，官方题解如下：

- 若当前节点值大于 `p` 和 `q` 的值，说明 `p` 和 `q` 应该在当前节点的左子树，将当前节点移动到它的左子节点；
- 若当前节点的值小于 `p` 和 `q` 的值，说明 `p` 和 `q` 应该在当前节点的右子树，将当前节点移动到它的右子节点；
- 若等于当前节点的值不满足上述两条要求，那么说明当前节点就是「分岔点」。此时，`p` 和 `q` 要么在当前节点的不同的子树中，要么其中一个就是当前节点。

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if(!root) return null
    if(root.val < p.val && root.val < q.val) 
        return lowestCommonAncestor(root.right, p, q)
    else if(root.val > p.val && root.val > q.val) 
        return lowestCommonAncestor(root.left, p, q)
    else return root
};
```

# [剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

[百度百科](https://baike.baidu.com/item/%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。”

例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]

![](https://backblaze.cosine.ren/juejin/Ed3ce8239e9e460aad44bd1fedadd2de~Tplv-K3u1fbpfcp-Zoom-1.png)

**示例 1:**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```

**示例 2:**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
```

**说明:**

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉树中。

注意：本题与主站 236 题相同：<https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/>

## 思路与代码

用上题的思路1就好了。

`fa`存每个结点的父节点，从上向下遍历一次初始化`fa`，再从下往上初始化 `vis`

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(!root) return null
    let fa = new Map()
    function dfs(rt, pre) {
        if (rt === null) return
        fa.set(rt, pre)
        dfs(rt.left, rt)
        dfs(rt.right, rt)
    }
    dfs(root, null)
    let vis = new Map()
    let nowv = q
    while (nowv) {
        vis.set(nowv, true)
        if(fa.has(nowv)) 
            nowv = fa.get(nowv)
    }
    nowv = p
    while (nowv) {
        if(vis.has(nowv)) 
            return nowv
        if(fa.has(nowv)) 
            nowv = fa.get(nowv)
    }
};
```

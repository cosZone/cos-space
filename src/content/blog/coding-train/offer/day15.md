---
title: 剑指offer day15 搜索与回溯算法（中等）
link: coding-train/leetcode/offer/day15
catalog: true
subtitle: 知识点：树、深搜、栈，难度为中等、中等、简单
date: 2022-04-13 23:39:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 树
- dfs/bfs
- 栈
categories:
- [题目记录, 剑指offer]
---
day15题目：[剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)、[剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)、[剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

知识点：树、深搜、栈，难度为中等、中等、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                                         | 知识点                                                                                                                                                                                          | 难度 |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| [剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/) | [树](https://leetcode-cn.com/tag/tree)、[深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[回溯](https://leetcode-cn.com/tag/backtracking)、[二叉树](https://leetcode-cn.com/tag/binary-tree) | 中等 |
| [剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)      | [栈](https://leetcode-cn.com/tag/stack)、[树](https://leetcode-cn.com/tag/tree)、[深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)                                                          | 中等 |
| [剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)            | [树](https://leetcode-cn.com/tag/tree)、[深度优先搜索](https://leetcode-cn.com/tag/depth-first-search)、[二叉搜索树](https://leetcode-cn.com/tag/binary-search-tree)                                     | 简单 |

# [剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)

给你二叉树的根节点 `root` 和一个整数目标和 `targetSum` ，找出所有 **从根节点到叶子节点** 路径总和等于给定目标和的路径。

**叶子节点** 是指没有子节点的节点。

**示例 1：**

![](https://backblaze.cosine.ren/juejin/3e89e063503741e184803a4ba65ad84c~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出： [[5,4,11,2],[5,8,4,5]]
```

**示例 2：**

![](https://backblaze.cosine.ren/juejin/193e8f2bb2d3458f9ed5a24a0f6c57f3~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： root = [1,2,3], targetSum = 5
输出： []
```

**示例 3：**

```
输入： root = [1,2], targetSum = 0
输出： []
```

**提示：**

- 树中节点总数在范围 `[0, 5000]` 内
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

注意：本题与主站 113 题相同：[https://leetcode-cn.com/problems/path-sum-ii/](https://leetcode-cn.com/problems/path-sum-ii/)

## 思路

d！都可以d！

通过dfs，每次传递当前结点和路径和

```javascript
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function(root, target) {
    if(!root) return []
    let res = []
    let path = []
    function dfs(rt, sum) {
        if(!rt) return 
        if(!rt.left && !rt.right) { // 为叶子节点了
            if(rt.val+sum === target) 
                res.push(path.concat(rt.val))
            return 
        } else if(rt.left && rt.right) { // 为非叶子节点
            path.push(rt.val)
            dfs(rt.left, sum+rt.val)
            dfs(rt.right, sum+rt.val)
            path.pop()
        } else if(rt.left) { // 为左子树
            path.push(rt.val)
            dfs(rt.left, sum+rt.val)
            path.pop()
        } else { // 为右子树
            path.push(rt.val)
            dfs(rt.right, sum+rt.val)
            path.pop()
        }
    }
    dfs(root, 0)
    return res
};
```

# [剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。

为了让您更好地理解问题，以下面的二叉搜索树为例：

![](https://backblaze.cosine.ren/juejin/3dadb6015b06426a9e9fec4093e286f9~Tplv-K3u1fbpfcp-Zoom-1.png)

我们希望将这个二叉搜索树转化为双向循环链表。链表中的每个节点都有一个前驱和后继指针。对于双向循环链表，第一个节点的前驱是最后一个节点，最后一个节点的后继是第一个节点。

下图展示了上面的二叉搜索树转化成的链表。“head” 表示指向链表中有最小元素的节点。

![](https://backblaze.cosine.ren/juejin/Cce9cdccc5db401fb5c6c2ed22e53bb4~Tplv-K3u1fbpfcp-Zoom-1.png)

特别地，我们希望可以就地完成转换操作。当转化完成以后，树中节点的左指针需要指向前驱，树中节点的右指针需要指向后继。还需要返回链表中的第一个节点的指针。

**注意：** 本题与主站 426 题相同：[https://leetcode-cn.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/](https://leetcode-cn.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/)

**注意：** 此题对比原题有改动。

## 思路

题目要求节点应从小到大排序，而二叉搜索树的中序遍历是递增的，故中序遍历的同时构建相邻节点的引用关系，注意的是prev和head一开始都为null，直到找到第一个节点时head才被置为第一个结点，然后将prev置为当前节点。所以dfs完后还需进行尾部与头节点的一个连接

```javascript
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function(root) { // 左前右后
    if(!root) return null
    let [head, prev] = [null, null]
    function dfs(rt) {
        if(!rt) return
        dfs(rt.left)
        if(prev) prev.right = rt    // 前结点的右结点指向当前结点
        else head = rt
        rt.left = prev              // 当前结点的前指针指向前结点
        prev = rt
        dfs(rt.right)
    }
    dfs(root)
    head.left = prev
    prev.right = head
    return head
};
```

# [剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

给定一棵二叉搜索树，请找出其中第 `k` 大的节点的值。

**示例 1:**

```
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 4
```

**示例 2:**

```
输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 4
```

**限制：**

- 1 ≤ k ≤ 二叉搜索树元素个数

## 思路

上题也说了，二叉搜索树中序遍历是递增的，而先访问右侧结点的话，右中左则是递减的，因此取k个就好了。

```javascript
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
    let [cnt, res] = [0, 0];
    function dfs(rt) {
        if(!rt) return
        dfs(rt.right)
        if(++cnt === k) {
            res = rt.val
            return
        }
        dfs(rt.left)
    }
    dfs(root)
    return res
};
```

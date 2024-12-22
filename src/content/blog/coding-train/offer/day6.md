---
title: 剑指offer day6 搜索与回溯算法（简单）
link: coding-train/leetcode/offer/day6
catalog: true
subtitle: 知识点：二叉树、dfs/bfs，难度为中等、简单、简单
date: 2022-04-04 18:56:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 二叉树
- dfs/bfs
categories:
- [题目记录, 剑指offer]
---
day6题目：[剑指 Offer 32 - I. 从上到下打印二叉树](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)、[剑指 Offer 32 - II. 从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)、[剑指 Offer 32 - III. 从上到下打印二叉树 III](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)

知识点：二叉树、dfs/bfs，难度为中等、简单、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                                        | 知识点                                                                                                        | 难度 |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---- |
| [剑指 Offer 32 - I. 从上到下打印二叉树](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)           | [广度优先搜索](https://leetcode-cn.com/tag/breadth-first-search)、[二叉树](https://leetcode-cn.com/tag/binary-tree) | 中等 |
| [剑指 Offer 32 - II. 从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)    | [广度优先搜索](https://leetcode-cn.com/tag/breadth-first-search)、[二叉树](https://leetcode-cn.com/tag/binary-tree) | 简单 |
| [剑指 Offer 32 - III. 从上到下打印二叉树 III](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/) | [广度优先搜索](https://leetcode-cn.com/tag/breadth-first-search)、[二叉树](https://leetcode-cn.com/tag/binary-tree) | 中等 |

# [剑指 Offer 32 - I. 从上到下打印二叉树](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

例如:
给定二叉树: `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回：

```
[3,9,20,15,7]
```

**提示：**

1. `节点总数 <= 1000`

## 思路及代码

利用队列q存储，每次取出队列的第一个元素，然后将其左右子节点放入队列，直到队列为空。

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    if(!root) return []
    let ans = []
    let q = []
    q.push(root)
    while(q.length > 0){
        let n = q.length
        for(let i = 0; i < n; ++i) {
            let nowv = q.shift()
            ans.push(nowv.val)
            if(nowv.left) q.push(nowv.left)
            if(nowv.right) q.push(nowv.right)
        }
    }
    return ans
};
```

# [剑指 Offer 32 - II. 从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

例如:
给定二叉树: `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [9,20],
  [15,7]
]
```

**提示：**

1. `节点总数 <= 1000`

## 思路及代码

在上一题基础上，增加一个暂存每一层元素的数组 `level`，每次该层元素放入 `level` 数组，遍历完该层后1 `level` 数组放入结果数组。

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    if(!root) return []
    let ans = []
    let q = []
    q.push(root)
    while(q.length > 0){
        let n = q.length
        let level = []        
        for(let i = 0; i < n; ++i) {
            let nowv = q.shift()
            level.push(nowv.val)  
            if(nowv.left) q.push(nowv.left)
            if(nowv.right) q.push(nowv.right)
        }
        ans.push(level)      
    }
    return ans
};
```

# [剑指 Offer 32 - III. 从上到下打印二叉树 III](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)

请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

例如:
给定二叉树: `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [20,9],
  [15,7]
]
```

**提示：**

1. `节点总数 <= 1000`

## 思路及代码

这不就是之前的二叉树锯齿形遍历吗：[103. 二叉树的锯齿形层序遍历](https://ysx.cosine.ren/cn/coding-train/leetcode/bytedance/bytedance-day9/#%E6%80%9D%E8%B7%AF-2)

在上一题的基础上，再加一个变量 `h` 判断高度，每次放入 `level` 数组时，通过 `h` 判断是从头放还是从尾放。

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return []
    let ans = []
    let q = []
    let h = 0
    q.push(root)
    while(q.length > 0){
        let n = q.length
        let level = []
        for(let i = 0; i < n; ++i) {
            let nowv = q.shift()
            if(h%2 === 0) level.push(nowv.val)
            else level.unshift(nowv.val)
            if(nowv.left) q.push(nowv.left)
            if(nowv.right) q.push(nowv.right)
        }
        ans.push(level)
        ++h
    }
    return ans
};
```

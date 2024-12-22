---
title: 剑指offer day28 搜索与回溯算法（困难）
link: coding-train/leetcode/offer/day28
catalog: true
subtitle: 知识点：树、字符串、回溯，难度为困难、中等
date: 2022-04-26 22:32:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 树
- 字符串
- 回溯
categories:
- [题目记录, 剑指offer]
---

day28题目：[剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/)、[剑指 Offer 38. 字符串的排列](https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/)

知识点：树、字符串、回溯，难度为困难、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目 | 知识点 | 难度 |
| --- | ---- | ---- |
| [剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/) | [树](https://leetcode-cn.com/tag/tree)、[深度优先搜索](https://leetcode-cn.com/tag/depth-first-search) | 困难 |
| [剑指 Offer 38. 字符串的排列](https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/) | [字符串](https://leetcode-cn.com/tag/string)、[回溯](https://leetcode-cn.com/tag/backtracking) | 中等 |

# [剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/)

请实现两个函数，分别用来序列化和反序列化二叉树。

你需要设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

**提示：** 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 [LeetCode 序列化二叉树的格式](https://support.leetcode-cn.com/hc/kb/article/1194353/)。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

**示例：**

![](https://backblaze.cosine.ren/juejin/70a2e7018db1416dab0c4907d0e73893~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： root = [1,2,3,null,null,4,5]
输出： [1,2,3,null,null,4,5]
```

注意：本题与主站 297 题相同：<https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/>

## 思路及代码

- 序列化：先序遍历二叉树，遇到空子树的时序列化成 `N,`，值序列化为值+`,`并继续递归序列化。

```javascript
function seria(root, str) {
    if(root === null) return str+'N,'
    str += `${root.val},`
    str = seria(root.left, str)
    str = seria(root.right, str)
    return str
}
```

- 反序列化：将原先的序列分割开来，得到元素列表，然后从左向右遍历这个序列
  - 当前的元素为 `N`则当前为空树
  - 先解析这棵树的左子树，再解析它的右子树

```javascript
function deseria(arr) {
    if(arr[0] == 'N') {
        arr.shift()
        return null
    }
    let root = new TreeNode(parseInt(arr[0]))
    arr.shift()
    root.left = deseria(arr)
    root.right = deseria(arr)
    return root 
}
```

完整代码：

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    function seria(root, str) {
        if(root === null) return str+'N,'
        str += `${root.val},`
        str = seria(root.left, str)
        str = seria(root.right, str)
        return str
    }
    return seria(root, '')
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    function deseria(arr) {
        if(arr[0] == 'N') {
            arr.shift()
            return null
        }
        let root = new TreeNode(parseInt(arr[0]))
        arr.shift()
        root.left = deseria(arr)
        root.right = deseria(arr)
        return root 
    }
    let arr = data.split(',')
    return deseria(arr)
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
```

# [剑指 Offer 38. 字符串的排列](https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/)

输入一个字符串，打印出该字符串中字符的所有排列。

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

**示例:**

```
输入： s = "abc"
输出：[ "abc","acb","bac","bca","cab","cba" ]
```

**限制：**

`1 <= s 的长度 <= 8`

## 思路及代码

经典の字符串全排列

不过注意，这里是有重复元素的全排列~所以需要用到map，之前出现过的就不必再排列

```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
    let res = [];
    function permu(rest, str) {
        if(rest.length == 0) {
            res.push(str)
            return
        }
        let m = new Map();
        for(let i = 0; i < rest.length; i++) {
            if(m.has(rest[i]))
                continue
            m.set(rest[i], 1)
            let next = rest.slice(0, i) + rest.slice(i+1)
            permu(next, str+rest[i])
        }
    }
    permu(s, '')
    return res;
};
```

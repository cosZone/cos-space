---
title: 冲刺春招-精选笔面试66题大通关day10
link: coding-train/leetcode/bytedance/bytedance-day10
catalog: true
subtitle: 今日知识点：树的遍历、字符串、栈，难度为简单、中等、中等
date: 2022-03-17 19:10:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 树
- 字符串
categories:
- [题目记录, 字节校园]
---

day10题目：[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)、[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)、[394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：树的遍历、字符串、栈，难度为简单、中等、中等

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day9](https://ysx.cosine.ren/cn/%E5%86%B2%E5%88%BA%E6%98%A5%E6%8B%9B-%E7%B2%BE%E9%80%89%E7%AC%94%E9%9D%A2%E8%AF%95%2066%20%E9%A2%98%E5%A4%A7%E9%80%9A%E5%85%B3%20day9/)
<!-- more -->
# 94. 二叉树的中序遍历

给定一个二叉树的根节点 `root` ，返回它的 **中序** 遍历。

**示例 1：**

```
输入： root = [1,null,2,3]
输出： [1,3,2]
```

**示例 2：**

```
输入： root = []
输出： []
```

## 思路

easy题，中序遍历就是 左-根-右 ，前序就是根左右，后序就是左右根。

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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    var ans = [];
    var inorder = function(rt) {
        if(!rt) return;
        inorder(rt.left);
        ans.push(rt.val);
        inorder(rt.right);
    }
    inorder(root);
    return ans;
};
```

# 102. 二叉树的层序遍历

给你二叉树的根节点 `root` ，返回其节点值的 **层序遍历** 。 （即逐层地，从左到右访问所有节点）。

**示例 1：**

```
输入： root = [3,9,20,null,null,15,7]
输出： [[3],[9,20],[15,7]]
```

**示例 2：**

```
输入： root = [1]
输出： [[1]]
```

**示例 3：**

```
输入： root = []
输出： []
```

### 思路

比昨天的题简单，每一层的结点存至q然后用nodelist暂存当前队列中所有结点（即该层的结点）后将q置空，遍历nodelist将每一个节点的孩子节点放入q

### 代码

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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return [];
    let ans = [];
    let nowlist = [];
    let q = [];
    q.push(root)
    while(q.length != 0) {
        let nodes = q.slice(0);
        q = [];
        for(let v of nodes) {
            nowlist.push(v.val);
            if(v.left) q.push(v.left);
            if(v.right) q.push(v.right);
        }
        ans.push(nowlist);
        nowlist = [];
    }
    return ans;
};
```

# 394. 字符串解码

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: `k[encoded_string]`，表示其中方括号内部的 `encoded_string` 正好重复 `k` 次。注意 `k` 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 `k` ，例如不会出现像 `3a` 或 `2[4]` 的输入。

**示例 1：**

```
输入： s = "3[a]2[bc]"
输出： "aaabcbc"
```

**示例 2：**

```
输入： s = "3[a2[c]]"
输出： "accaccacc"
```

**示例 3：**

```
输入： s = "2[abc]3[cd]ef"
输出： "abcabccdcdcdef"
```

**示例 4：**

```
输入： s = "abc3[cd]xyz"
输出： "abccdcdcdxyz"
```

**提示：**

- `1 <= s.length <= 30`
- `s` 由小写英文字母、数字和方括号 `'[]'` 组成
- `s` 保证是一个 **有效** 的输入。
- `s` 中所有整数的取值范围为 `[1, 300]`

## 思路

遍历，若为数字则过滤出来该数字作为k，用一个栈stack存左括号，遇到右括号且栈中左括号数量不为1时出栈，当栈中只有一个左括号时，将该当前tempStr字符串递归解码后返回，重复k次后拼接至答案ans，若为其他则正常存入。

## 代码

```js
/**
 * @param {string} s
 * @return {string}
 */
 var decodeString = function(s) {
    let stack = [];
    let ans = '';
    let len = s.length;
    for(let i = 0; i < len; ++i) {
        if(s[i] >= '0' && s[i] <= '9') {
            let tk = s[i++];
            while(i < len && s[i] >= '0' && s[i] <= '9')
                tk += s[i++];
            let k = parseInt(tk);
            let tempStr = '';
            stack.push(s[i++]);   // 放入'['
            while(i < len && (s[i] != ']' || stack.length != 1)) { // 若s[i] == ']' 并且 stack中只有一个时结束
                if(s[i] == '[') {
                    stack.push(s[i]);
                } else if(s[i] == ']') 
                    stack.pop();
                tempStr += s[i];
                ++i;
            }
            stack.pop();
            let decode = decodeString(tempStr); // 核心
            ans += `${decode.repeat(k)}`;
        } else ans += s[i];
    }
    return ans;
};
```

---
title: 冲刺春招-精选笔面试66题大通关17
link: coding-train/leetcode/bytedance/bytedance-day17
catalog: true
subtitle: 今日知识点：快慢指针、dfs、链表，难度为简单、中等、中等
date: 2022-03-24 17:09:32
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 链表
- 快慢指针
- dfs/bfs
categories:
- [题目记录, 字节校园]
---

day17题目：[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)、[236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)、[92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：快慢指针、dfs、链表，难度为简单、中等、中等

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day16](https://juejin.cn/post/7078327858397118477)

# [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

给你一个链表的头节点 `head` ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。**注意：`pos` 不作为参数进行传递** 。仅仅是为了标识链表的实际情况。

*如果链表中存在环* ，则返回 `true` 。 否则，返回 `false` 。

**示例 1：**

![](https://backblaze.cosine.ren/juejin/194b1ae012b044ec9c443d9fba166f04~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： head = [3,2,0,-4], pos = 1
输出： true
解释： 链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

![](https://backblaze.cosine.ren/juejin/C7e0b3ec5858499488fb3eca9d0a5ed7~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： head = [1,2], pos = 0
输出： true
解释： 链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

![](https://backblaze.cosine.ren/juejin/5eac2477a0684c81910ffe905f60d7d7~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： head = [1], pos = -1
输出： false
解释： 链表中没有环。
```

**提示：**

- 链表中节点的数目范围是 `[0, 10^4]`
- `-10^5 <= Node.val <= 10^5`
- `pos` 为 `-1` 或者链表中的一个 **有效索引** 。

**进阶：** 你能用 `O(1)`（即，常量）内存解决此问题吗？

## 思路

快慢指针，快指针一次走两步，慢指针一次走一步，若有环则一定会遇上的，否则没有环

## 代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if(!head) return false
    let [f, s] = [head, head]
    while(s.next && f.next && f.next.next) {
        f = f.next.next;
        s = s.next
        if(f === s) return true; 
    }
    return false;
};
```

# [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

[百度百科](https://baike.baidu.com/item/%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。”

**示例 1：**

![](https://backblaze.cosine.ren/juejin/3dc124e9ec624327a6c317cee3761d2f~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出： 3
解释： 节点 5 和节点 1 的最近公共祖先是节点 3 。
```

**示例 2：**

![](https://backblaze.cosine.ren/juejin/B2ebbac4b57b4255840806caa1d46ef9~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出： 5
解释： 节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
```

**示例 3：**

```
输入： root = [1,2], p = 1, q = 2
输出： 1
```

**提示：**

- 树中节点数目在范围 `[2, 10^5]` 内。
- `-10^9 <= Node.val <= 10^9`
- 所有 `Node.val` `互不相同` 。
- `p != q`
- `p` 和 `q` 均存在于给定的二叉树中。

## 思路

先从一个节点往上走将沿途的vis置为true，再从另一个结点往上走，遇到vis为true的就是最近共同祖先，返回。

## 代码

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let fa = new Map()
    let vis = new Map()
    let init = function(rt) {
        vis.set(rt.val, false);
        if(rt.left) {
            fa.set(rt.left.val, rt)
            init(rt.left)
        }
        if(rt.right) {
            fa.set(rt.right.val, rt)
            init(rt.right)
        }
    }
    fa.set(root.val, null)
    init(root)
    let ptr = p
    while(ptr && fa.has(ptr.val)) {
        vis.set(ptr.val, true)
        ptr = fa.get(ptr.val)
    }
    ptr = q
    while(ptr && fa.has(ptr.val)) {
        if(vis.get(ptr.val)) return ptr
        ptr = fa.get(ptr.val)
    }
}
```

# [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

给你单链表的头指针 `head` 和两个整数 `left` 和 `right` ，其中 `left <= right` 。请你反转从位置 `left` 到位置 `right` 的链表节点，返回 **反转后的链表** 。

**示例 1：**

![](https://backblaze.cosine.ren/juejin/E7e0b18aac5140ec946a0d1f90bdd11e~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： head = [1,2,3,4,5], left = 2, right = 4
输出： [1,4,3,2,5]
```

**示例 2：**

```
输入： head = [5], left = 1, right = 1
输出： [5]
```

**提示：**

- 链表中节点数目为 `n`
- `1 <= n <= 500`
- `-500 <= Node.val <= 500`
- `1 <= left <= right <= n`

**进阶：**  你可以使用一趟扫描完成反转吗？

## 思路

哎，先来一个反转链表的函数，day1的K组一个反转链表里边我们就写过：

```js
var reverseList = function(s, e) {
    let prev = e.next
    let nowv = s
    while(prev != e) {
        let temp = nowv.next
        nowv.next = prev
        prev = nowv
        nowv = temp
    }
    return [e, s]
}
```

然后，当务之急是找到 `left` 和 `right` 对应的结点指针 `l` 和 `r`，以及 `l` 前面的 `prev`

- 翻转 `let [s, e] = reverseList(l, r)`， 记得在之前先把 `r.next` 存到 `temp`
- 为了让反转后子链表能够顺利的拼回去原链表，需将反转后的 `pre.next` 指向`s`， `e.next` 指向 `temp`

## 代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
 var reverseList = function(s, e) {
    let prev = e.next
    let nowv = s
    while(prev != e) {
        let temp = nowv.next
        nowv.next = prev
        prev = nowv
        nowv = temp
    }
    return [e, s]
}
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    let ehead = new ListNode(0, head)
    let [prev, nowv, prel, l, r] = [ehead, head, ehead, head, head]
    for(let cnt = 1; nowv; ++cnt, nowv = nowv.next) {
        if(cnt === left) {
            prel = prev
            l = nowv
        }
        if(cnt === right) r = nowv
        prev = nowv
    }
    let temp = r.next
    let [s, e] = reverseList(l, r)
    prel.next = s
    e.next = temp
    return ehead.next
};
```

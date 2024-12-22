---
title: 剑指offer day2 链表（简单）
link: coding-train/leetcode/offer/day2
catalog: true
subtitle: 知识点：链表、递归、哈希，难度为简单、中等、中等
date: 2022-03-31 21:00:52
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 链表
- 递归
- 哈希
categories:
- [题目记录, 剑指offer]
---
day2题目：[剑指 Offer 06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)、[剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)、[剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

知识点：链表、递归、哈希，难度为简单、中等、中等

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                     | 知识点         | 难度 |
| -------------------------------------------------------------------------------------------------------- | -------------- | ---- |
| [剑指 Offer 06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/) | 栈、递归、链表 | 简单 |
| [剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)                       | 递归、链表     | 中等 |
| [剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)           | 哈希表、链表   | 中等 |

# [剑指 Offer 06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

**示例 1：**

```
输入： head = [1,3,2]
输出： [2,3,1]
```

**限制：**

`0 <= 链表长度 <= 10000`

## 思路及代码

反过来输出，那就用栈，后进先出。

```javascript
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    let res = []
    while(head){
        res.unshift(head.val)
        head = head.next
    }
    return res
};
```

# [剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

**限制：**

`0 <= 节点个数 <= 5000`

**注意**：本题与主站 206 题相同：[https://leetcode-cn.com/problems/reverse-linked-list/](https://leetcode-cn.com/problems/reverse-linked-list/)

## 思路及代码

老题目了，第三次做，在遍历链表时，将当前节点的 `nowp` 指针改为指向前一个节点 `prev`，最后返回新的链表头 `prep`。

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prep = null
    let nowp = head
    while(nowp) {
        let t = nowp.next 
        nowp.next = prep
        prep = nowp
        nowp = t
    }
    return prep
};
```

# [剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

请实现 `copyRandomList` 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 `next` 指针指向下一个节点，还有一个 `random` 指针指向链表中的任意节点或者 `null`。

**示例 1：**

![](https://backblaze.cosine.ren/juejin/007f0dd6a92d4301af466e05d131103a~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出： [[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**示例 2：**

![](https://backblaze.cosine.ren/juejin/73e989a8aecd4363b7a37940188384de~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： head = [[1,1],[2,1]]
输出： [[1,1],[2,1]]
```

**示例 3：**

```
输入： head = [[3,null],[3,0],[3,null]]
输出： [[3,null],[3,0],[3,null]]
```

**示例 4：**

```
输入： head = []
输出： []
解释： 给定的链表为空（空指针），因此返回 null。
```

**提示：**

- `-10000 <= Node.val <= 10000`
- `Node.random` 为空（null）或指向链表中的节点。
- 节点数目不超过 1000 。

**注意：** 本题与主站 138 题相同：[https://leetcode-cn.com/problems/copy-list-with-random-pointer/](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)

## 思路及代码

### 1、利用map存储拷贝过的结点

并且递归的进行拷贝，如果当前节点被拷贝过则直接返回拷贝后的节点指针

```javascript
var m = new Map()
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if(!head) return null
    if(m.has(head)) return m.get(head)
    let newv = new Node(head.val, null, null)
    m.set(head, newv)
    newv.next = copyRandomList(head.next)
    newv.random = copyRandomList(head.random)
    return newv
};
```

### 2、迭代，拆分节点

这个是看题解发现的思路，将该链表中每一个节点拆分为两个相连的节点，对于任意一个原节点 `S`，其拷贝节点 `S′` 即为其后继节点，然后将新节点的random正确赋值，再将新链表的next正确赋值。

```javascript
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if(!head) return null
    let nowp = head
    for(let nowp = head; nowp; nowp = nowp.next.next) {
        let t = new Node(nowp.val, nowp.next, null)
        nowp.next = t
    }
    for(let nowp = head; nowp; nowp = nowp.next.next) {
        nowp.next.random = nowp.random ? nowp.random.next: null    // 新链表的random赋值
    }
    let res = head.next
    for(let nowp = head; nowp; nowp = nowp.next) {
        let newNode = nowp.next
        nowp.next = newNode.next
        newNode.next = newNode.next? nowp.next.next: null   // 新链表的next赋值
    }
    return res
};

```

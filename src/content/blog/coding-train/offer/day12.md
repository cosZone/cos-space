---
title: 剑指offer day12 双指针（简单）
link: coding-train/leetcode/offer/day12
catalog: true
subtitle: 知识点：链表、哈希、双指针，难度为简单、简单
date: 2022-04-10 17:09:00
cover: img/header_img/polygon-pony-wallpaper-for-1920x1080-63-1175.jpg
tags:
- leetcode
- 链表
- 哈希
- 双指针
categories:
- [题目记录, 剑指offer]
---
day12题目：[剑指 Offer 25. 合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)、[剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

知识点：链表、哈希、双指针，难度为简单、简单

学习计划链接：[「剑指 Offer」 - 学习计划](https://leetcode-cn.com/study-plan/lcof/?progress=7jn70jr)

| 题目                                                                                                                             | 知识点                                                                                                                                       | 难度 |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| [剑指 Offer 25. 合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)                    | [递归](https://leetcode-cn.com/tag/recursion)、[链表](https://leetcode-cn.com/tag/linked-list)                                                     | 简单 |
| [剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/) | [哈希表](https://leetcode-cn.com/tag/hash-table)、[链表](https://leetcode-cn.com/tag/linked-list)、[双指针](https://leetcode-cn.com/tag/two-pointers) | 简单 |

# [剑指 Offer 25. 合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

**示例1：**

```
输入： 1->2->4, 1->3->4
输出： 1->1->2->3->4->4
```

**限制：**

`0 <= 链表长度 <= 1000`

注意：本题与主站 21 题相同：[https://leetcode-cn.com/problems/merge-two-sorted-lists/](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

## 思路及代码

当 `l1` 和 `l2` 都不是空链表时，判断 `l1` 和 `l2` 哪个链表的当前节点的值更小，将较小值的节点添加到结果里，最终判断一下哪个链表还有剩的都接上去

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let ehead = new ListNode(0)
    let nowv = ehead
    while(l1 && l2) {
        if(l1.val >= l2.val) {
            nowv.next = new ListNode(l2.val)
            l2 = l2.next
            nowv = nowv.next
        } else {
            nowv.next = new ListNode(l1.val)
            l1 = l1.next
            nowv = nowv.next
        }
    }
    if(l1) nowv.next = l1
    else if(l2) nowv.next = l2
    return ehead.next
};
```

# [剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

输入两个链表，找出它们的第一个公共节点。

如下面的两个链表 **：**

![](https://backblaze.cosine.ren/juejin/09630395c9ed409cbe6b6c29278aadc3~Tplv-K3u1fbpfcp-Zoom-1.png)

在节点 c1 开始相交。

**示例 1：**

![](https://backblaze.cosine.ren/juejin/5d68825371794dd48e36c7432e2f87ab~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出： Reference of the node with value = 8
输入解释： 相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

**示例 2：**

![](https://backblaze.cosine.ren/juejin/C0ef34bea01b4cad94002457175ac1e2~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出： Reference of the node with value = 2
输入解释： 相交节点的值为 2 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
```

**示例 3：**

![](https://backblaze.cosine.ren/juejin/928e6ca68669418286a9a3738a3c8f2e~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出： null
输入解释： 从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
解释： 这两个链表不相交，因此返回 null。
```

**注意：**

- 如果两个链表没有交点，返回 `null`.
- 在返回结果后，两个链表仍须保持原有的结构。
- 可假定整个链表结构中没有循环。
- 程序尽量满足 O(*n*) 时间复杂度，且仅用 O(*1*) 内存。
- 本题与主站 160 题相同：[https://leetcode-cn.com/problems/intersection-of-two-linked-lists/](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

## 思路及代码

思路1：简单粗暴的用哈希存储 `a`中出现过的结点，再遍历b链表判断，但这显然不满足O(1)内存。

```javascript
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let m = new Map()
    let [a, b] = [headA, headB]
    while(a) {
        m.set(a, a)
        a = a.next
    }
    while(b) {
        if(m.has(b)) return b
        b = b.next
    }
    return null
};
```

思路2：题解中提到利用双指针

设 `a`、`b` 初始指向 `headA` 和 `headB`，
有两种情况，

**情况1 两个链表相交**，设链表 `headA` 的不相交部分有 a 个结点，链表 `headB` 的不相交部分有 b 个结点，两链表相交部分有c个结点，则有

- `a = b` 时，两个指针同时到达第一个公共节点，此时返回这个公共节点就行。
- `a != b` 时，指针 `pA`遍历完链表 `headA` 后去遍历 `headB`，在指针 `pA`移动了 `a+c+b`次、`pB`移动了 `b+c+a`次后两指针会同时抵达公共节点！此时返回的也是第一个公共节点

**情况2：两个链表不相交**
不相交时，设链表 `headA`、`headB`长度分别为 `m`、`n`，则有

- `m = n` 时，两个指针会同时到达尾节点同时变为 `null`，此时返回 `null`
- `m != n` 时，两个指针都会遍历完整个链表后遍历另一个，在指针 `pA` 移动了 `m + n`次、指针 `pB` 移动了 `n + m`次后两个指针又会同时变为 `null`，也返回 `null`

那么代码思路就很明显了，创建两个指针，初始时分别指向两个链表的头节点，然后将两个指针依次遍历两个链表的每个节点

- 每步操作需要同时更新两个指针
- 若指针不为空则将其往后移
- 若指针为空了则将其移至另一个链表头节点
- 当两指针指向同一结点或都为空了，返回其中一个指针就行

```javascript
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if(!headA || !headB) return null
    let [a, b] = [headA, headB]
    while(a !== b) {
        a = a.next
        b = b.next
        if(!a && !b) return null
        if(!a) a = headB
        if(!b) b = headA
    }
    return a
};
```

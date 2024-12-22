---
title: 冲刺春招-精选笔面试66题大通关day1
link: coding-train/leetcode/bytedance/bytedance-day1
catalog: true
subtitle: 知识点：链表；冲刺01简单，冲刺02中等，冲刺03困难；冲刺02容易在面试中遇见。
date: 2022-03-08 18:00:52
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 链表
categories:
- [题目记录, 字节校园]
---

day1题目：[21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)、[146. LRU 缓存](https://leetcode-cn.com/problems/lru-cache/)、[25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)
学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)
<!-- more -->

能用JS实现的我就用JS实现了2333，尽量练一练JS
这一天的都是链表，可以看之前的学习笔记复习：[数据结构学习笔记＜1＞ 线性表](https://blog.csdn.net/qq_45890533/article/details/104528176)

# 21. 合并两个有序链表 （简单）

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

- **递归就完事了。**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let p1 = list1
    let p2 = list2
    if(!p1 && !p2) return null
    else if(!p1) return p2
    else if(!p2) return p1
    else if(p1.val <= p2.val) {
        p1.next = mergeTwoLists(p1.next, p2)
        return p1
    } else {
        p2.next = mergeTwoLists(p2.next, p1)
        return p2
    }
};
```

# 146.LRU缓存 （中等）

请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：

- `LRUCache(int capacity)` 以 **正整数** 作为容量 `capacity` 初始化 `LRU` 缓存
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1` 。
- `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值 `value`；如果不存在，则向缓存中插入该组 `key-value`。如果插入操作导致关键字数量超过 capacity ，则应该 **逐出** 最久未使用的关键字。
函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。

## 思路

双向链表（空头尾结点），链表尾部为最近最少使用，一旦使用了就移至链表头部。

```cpp
struct DLNode { 
    int key, val;
    DLNode* prev;
    DLNode* next;
    DLNode(int key = -1, int val = -1):prev(nullptr), next(nullptr), key(key), val(val){}
};
```

`put` 的时候若关键字不存在，则头插法插入关键字及值，若满了则逐出链表尾部结点 。

```cpp
void put(int key, int value) {
    if(cache.find(key) == cache.end() || cache[key] == nullptr) {
        // 关键字不存在 则插入关键字 头插
        if(size == capacity) {  // 满了 逐出最后一个
            cache[tail->prev->key] = nullptr;
            remove(tail->prev);
        }
        DLNode* newp = insert(key, value);
        cache[key] = newp;
    } else {    // 存在 修改该组值 
        cache[key] = move2head(cache[key]);
        cache[key]->val = value;
    }
}
```

`get` 时若关键字不存在，返回-1，若存在则将其对应结点移至链表头部。

```cpp
int get(int key) {
    if(cache.find(key) == cache.end() || cache[key] == nullptr) 
     return -1;
    cache[key] = move2head(cache[key]);
    return cache[key]->val;
}
```

## 完整代码

```cpp
struct DLNode {
    int key, val;
    DLNode* prev;
    DLNode* next;
    DLNode(int key = -1, int val = -1):prev(nullptr), next(nullptr), key(key), val(val){}
};
class LRUCache {
public:
    int capacity;
    int size;
    unordered_map<int, DLNode*> cache;
    DLNode* head;
    DLNode* tail;
    LRUCache(int c): capacity(c), size(0) {
        head = new DLNode();
        tail = new DLNode();
        head->next = tail;
        tail->prev = head;
    }
    void remove(DLNode* p) {
        p->prev->next = p->next;
        p->next->prev = p->prev;
        delete p;
        --size;
    }
    DLNode* insert(int key, int val) {  // 头插
        DLNode* temp = head->next;
        DLNode* newp = new DLNode(key, val);
        newp->next = temp;
        newp->prev = head;
        temp->prev = newp;
        head->next = newp;
        ++size;
        return newp;
    }
    DLNode* move2head(DLNode* p) {
        DLNode* newp = insert(p->key, p->val);
        remove(p);
        return newp;
    }
    int get(int key) {
        if(cache.find(key) == cache.end() || cache[key] == nullptr) return -1;
        cache[key] = move2head(cache[key]);
        return cache[key]->val;
    }
    
    void put(int key, int value) {
        if(cache.find(key) == cache.end() || cache[key] == nullptr) {// 关键字不存在 则插入关键字 头插
            if(size == capacity) {  // 满了 逐出最后一个
                cache[tail->prev->key] = nullptr;
                remove(tail->prev);
            }
            DLNode* newp = insert(key, value);
            cache[key] = newp;
        } else {    // 存在 修改该组值 
            cache[key] = move2head(cache[key]);
            cache[key]->val = value;
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```

# 25. K 个一组翻转链表（困难）

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

## 思路

WA了一次，发现时反转链表的时候prev设置成null了（上一题惯性2333），应当设置成e.next 因为后面可能还有链表。
分解子问题：反转`s` -> `e`这个链表
则需要这样一个函数`reverseList(s, e)`， 返回reverse后链表的头和尾

```js
var reverseList = function(s, e) {
    let prev = e.next;  // 注意这儿哈
    let nowv = s;
    while(prev != e) {  // 还有这儿哈
        let temp = nowv.next;
        nowv.next = prev;
        prev = nowv;
        nowv = temp;
    }
    return [e, s];
}
```

然后就是反转后将其拼接回去咯~
思路如图，利用带空头结点的链表，并且注意，如果不满k个的话不用反转。
![reverse](https://img-blog.csdnimg.cn/a5a0ef1f08a14c4aa980820ae1cecd24.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)

```js
var reverseKGroup = function(head, k) {
    let ehead = new ListNode(0);
    ehead.next = head;
    let prev = ehead;  // 第一个结点
    while(head) {
        let end = prev;
        for(let i = 0; i < k; ++i) {
            end = end.next;
            if(!end) return ehead.next;
        }
        let temp = end.next;
        [head, end] = reverseList(head, end);   
        // 返回的是反转过后的这个链表head & end
        prev.next = head;
        prev = end;
        end.next = temp;
        head = end.next;
    }
    return ehead.next;
};
```

## 完整代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
 
var reverseList = function(s, e) {
    let prev = e.next;
    let nowv = s;
    while(prev != e) {
        let temp = nowv.next;
        nowv.next = prev;
        prev = nowv;
        nowv = temp;
    }
    return [e, s];
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    let ehead = new ListNode(0);
    ehead.next = head;
    let prev = ehead;  // 第一个结点
    while(head) {
        let end = prev;
        for(let i = 0; i < k; ++i) {
            end = end.next;
            if(!end) return ehead.next;
        }
        let temp = end.next;
        [head, end] = reverseList(head, end);   
        // 返回的是反转过后的这个链表head & end
        prev.next = head;
        prev = end;
        end.next = temp;
        head = end.next;
    }
    return ehead.next;
};
```

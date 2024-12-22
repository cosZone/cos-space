---
title: 冲刺春招-精选笔面试66题大通关day5
link: coding-train/leetcode/bytedance/bytedance-day5
catalog: true
subtitle: 今日知识点：链表、数组、快排，难度为中等、中等、困难
date: 2022-03-12 23:30:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 快速排序
- 链表
categories:
- [题目记录, 字节校园]
---
day5题目：[7. 整数反转](https://leetcode-cn.com/problems/reverse-integer/)、[215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)、[23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：链表、数组、快排，难度为中等、中等、困难

<!-- more -->

# 7. 整数反转

给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。

假设环境不允许存储 64 位整数（有符号或无符号）。

> 示例 1：
> 输入：x = 123
> 输出：321

## 思路

[整数反转-题解](https://leetcode-cn.com/problems/reverse-integer/solution/zheng-shu-fan-zhuan-by-leetcode-solution-bccn/)
看了题解才晓得，是数学题嗷，通过不等式变换
![在这里插入图片描述](https://img-blog.csdnimg.cn/ab6f52e151fa4b2981ff5a239430c580.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)
这我是真没想到（）
取巧一些的话就用long long存防止溢出

## 完整代码

```js
class Solution {
public:
    int reverse(int x) {
        int ans = 0;
        while(x) {
            if(ans > INT_MAX/10 || ans < INT_MIN/10) return 0;
            ans = (ans*10) + x%10;
            x /= 10;
        }
        return ans;
    }
};
```

# 215. 数组中的第K个最大元素

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5

示例 2:
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4

## 思路

取巧一点就直接调sort排好序之后返回。
否则的话手写快排咯~~具体可以看排序那期的学习笔记：[数据结构学习笔记＜8＞ 排序](https://blog.csdn.net/qq_45890533/article/details/108246044)

## 完整代码

暴力（时间反而很快

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end(), greater<int>());
        return nums[k-1];
    }
};
```

手写快排，主元在s~e中随机抽取以避免最坏情况。

```cpp
class Solution {
public:
    int quickSort(vector<int>& nums, int k, int s, int e) {
        int idx = rand()%(e-s+1)+s;
        int m = nums[idx];    // 主元为s~e中随机的一个
        int l = s, r = e;
        nums[idx] = nums[l];
        while(l != r) {
            while(l < r && nums[r] <= m) --r; // 遇到右边有比他大的才停下
            nums[l] = nums[r];
            while(l < r && nums[l] >= m) ++l;
            nums[r] = nums[l];
        }// 处理完后主元m到了正确的位置nums[l]，左边元素都比他大，右边元素都比他小
        nums[l] = m;
        if(l == k-1) return nums[l];
        else if(l > k-1) return quickSort(nums, k, s, l-1);    // 快排左边部分
        else return quickSort(nums, k, l+1, e);
    }
    int findKthLargest(vector<int>& nums, int k) {
        int len = nums.size();
        return quickSort(nums, k, 0, len-1);
    }
};
```

# 23. 合并K个升序链表

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

> 示例 1：
> 输入：lists = [[1,4,5],[1,3,4],[2,6]]
> 输出：[1,1,2,3,4,4,5,6]
> 解释：链表数组如下：
> [
> 1->4->5,
> 1->3->4,
> 2->6
> ]
> 将它们合并到一个有序链表中得到。
> 1->1->2->3->4->4->5->6

## 思路

day1就写过合并两个有序链表，这次的只需要暴力就好了。
但要优化的话，可以使用优先队列每次链表头的结点，取出最顶上的结点放至答案链表后。

## 完整代码

暴力版

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
 
var mergeList = function(list1, list2) {
    let p1 = list1;
    let p2 = list2;
    if(!p1 && !p2) return null;
    else if(!p1) return p2;
    else if(!p2) return p1;
    else if(p1.val <= p2.val) {
        p1.next = mergeList(p1.next, p2);
        return p1;
    } else {
        p2.next = mergeList(p2.next, p1);
        return p2;
    }
}
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    let ans = null;
    let len = lists.length;
    for(let i = 0; i < len; ++i) {
        ans = mergeList(ans, lists[i]);
    }
    return ans;
};
```

优先队列版

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    struct Node {
        int val;
        ListNode *nowp;
        bool operator<(const Node &p1) const {
            return val > p1.val;
        }
    };
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<Node> q;
        ListNode head;
        ListNode *tail = &head;
        for(auto h: lists) {
            if(h) q.push({h->val, h});
        }
        while(!q.empty()) {
            Node nowv = q.top();
            q.pop();
            tail->next = nowv.nowp;
            tail = tail->next;
            ListNode* nexp = nowv.nowp->next;
            if(nexp) q.push({nexp->val, nexp});
        }
        return head.next;
    }
};
```

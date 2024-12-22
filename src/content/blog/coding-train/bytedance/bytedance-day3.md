---
title: 冲刺春招-精选笔面试66题大通关day3
link: coding-train/leetcode/bytedance/bytedance-day3
catalog: true
subtitle: 今日知识点：链表、二叉树，难度仍为简单、中等、困难（字节：重新定义简单）
date: 2022-03-10 17:30:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 链表
- 二叉树
categories:
- [题目记录, 字节校园]
---

day3题目：[206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)、[199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)、[bytedance-016. 16. 最短移动距离](https://leetcode-cn.com/problems/YWWN3V/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：链表、二叉树，难度仍为简单、中等、困难（字节：重新定义简单）。

<!-- more -->

# 206. 反转链表

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

>示例 1：
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

> 示例 2：
输入：head = [1,2]
输出：[2,1]

> 示例 3：
输入：head = []
输出：[]

## 思路

day1做的里边就有这题的思路，也不用多说了

## 完整代码

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let nowv = head;
    while(nowv) {
        let temp = nowv.next;
        nowv.next = prev;
        prev = nowv;
        nowv = temp;
    }
    return prev;
}
```

# 199. 二叉树的右视图

给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
> 示例1:
输入: [1,2,3,null,5,null,4]
输出: [1,3,4]

>示例 2:
输入: [1,null,3]
输出: [1,3]

>示例 3:
输入: []
输出: []

## 思路

这才是简单题吧啊喂，bfs就完事了，先右后左，高度若是小于maxh则不放入答案数组

## 完整代码

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if(!root) return [];
    let maxh = 0;
    let ans = [];
    function bfs(root, h) {
        if(!root) return;
        if(h > maxh) {
            maxh = h;
            ans.push(root.val);
        }
        bfs(root.right, h+1);
        bfs(root.left, h+1);
    }
    bfs(root, 1);
    return ans;
};
```

# bytedance-016. 16. 最短移动距离

给定一棵 n 个节点树。节点 1 为树的根节点，对于所有其他节点 i，它们的父节点编号为 floor(i/2) (i 除以 2 的整数部分)。在每个节点 i 上有 a[i] 个房间。此外树上所有边均是边长为 1 的无向边。
树上一共有 m 只松鼠，第 j 只松鼠的初始位置为 b[j]，它们需要通过树边各自找到一个独立的房间。请为所有松鼠规划一个移动方案，使得所有松鼠的总移动距离最短。

输入：

- 输入共有三行。
- 第一行包含两个正整数 n 和 m，表示树的节点数和松鼠的个数。
- 第二行包含 n 个自然数，其中第 i 个数表示节点 i 的房间数 a[i]。
- 第三行包含 m 个正整数，其中第 j 个数表示松鼠 j 的初始位置 b[j]。
输出：
- 输出一个数，表示 m 只松鼠各自找到独立房间的最短总移动距离。
示例：

> 输入：
     5 4
     0 0 4 1 1
     5 4 2 2
输出：4
解释：前两只松鼠不需要移动，后两只松鼠需要经节点 1 移动到节点 3
提示：

对于 30% 的数据，满足 n,m <=100。
对于 50% 的数据，满足 n,m <=1000。
对于所有数据，满足 n,m<=100000，0<=a[i]<=m, 1<=b[j]<=n。

## 思路

字节，重新定义简单题！还是看评论才有的思路QAQ
注意下标从1开始...
读入房间数的时候，记录总房间数sum，用cnt记录未被使用房间数，读入松鼠时将其所处节点的a[b]减一，后续从最低层开始遍历，遇到松鼠将其往上走，遇到房间且还有需求时将房间往上走（但是只能解决自上而下的最短路径，等官方题解了。）
ps:开不开快读影响很大！
pps:测试用例好像很弱，所以估计还有bug

## 完整代码

```cpp
#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;
const int maxn = 100005;
int n, m, sum, cnt;
int a[maxn], b;
int ans;
int main() {
    ios::sync_with_stdio(false);cin.tie(0);cout.tie(0);
    cin >> n >> m;
    for(int i = 1; i <= n; ++i) {
        cin >> a[i];
        sum += a[i];   //总房间数
    }
    for(int i = 1; i <= m; ++i) {
        cin >> b;
        --a[b];  // 占用该房间，可能使其为
    }
    cnt = sum-m;    // 剩余未被使用房间数
    for(int i = n; i > 1; --i) {
        if(!a[i]) continue;
        if(a[i] > 0 && cnt > 0) {  // 该房间还有用
            int nowh = a[i];
            if(cnt > nowh) cnt -= nowh;
            else {
                int cost = nowh-cnt;
                cnt -= cost;
                a[i/2] += cost;
                ans += cost;
            }
        } else {    // 松鼠 往上走
            int cost = abs(a[i]);
            ans += cost;
            a[i/2] += a[i];
            a[i] = 0;
        }
    }
    cout << ans << endl;
    return 0;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/64d0c97f77624818bed3d56e5669386a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)

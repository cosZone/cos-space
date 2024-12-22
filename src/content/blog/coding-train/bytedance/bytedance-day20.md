---
title: 冲刺春招-精选笔面试66题大通关day20
link: coding-train/leetcode/bytedance/bytedance-day20
catalog: true
subtitle: 今日知识点：数组、二分、模拟，难度为简单、中等、字节の简单
date: 2022-03-27 21:10:55
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 二分
- 模拟
categories:
- [题目记录, 字节校园]
---

day20题目：[704. 二分查找](https://leetcode-cn.com/problems/binary-search/)、[43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)、[bytedance-002. 发下午茶](https://leetcode-cn.com/problems/OMrszv/)

今日知识点： 数组、二分、模拟，难度为简单、中等、字节の简单

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day19](https://juejin.cn/post/7079361446315819044)

# [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target`  ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 `-1`。

**示例 1:**

```
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```

**示例 2:**

```
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```

**提示：**

1. 你可以假设 `nums` 中的所有元素是不重复的。
2. `n` 将在 `[1, 10000]`之间。
3. `nums` 的每个元素都将在 `[-9999, 9999]`之间。

## 思路

直接二分，老朋友了

- 每次令 `mid = (l+r)/2`，若 `nums[mid] == target` 则直接返回下标 `mid`
- 若 `nums[mid] < target`，在 `mid` 右侧搜索，`l = mid+1`
- 否则，在 `mid` 左侧搜索，`l = mid+1`
- 若最后 `l > r` 了则说明找不到，返回 `-1`

## 代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let [l, r] = [0, nums.length - 1];
    while (l <= r) {
        let mid = (l+r) >> 1;
        if(nums[mid] == target) return mid;
        else if(nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
};
```

# [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

给定两个以字符串形式表示的非负整数 `num1` 和 `num2`，返回 `num1` 和 `num2` 的乘积，它们的乘积也表示为字符串形式。

**注意：** 不能使用任何内置的 BigInteger 库或直接将输入转换为整数。

**示例 1:**

```
输入: num1 = "2", num2 = "3"
输出: "6"
```

**示例 2:**

```
输入: num1 = "123", num2 = "456"
输出: "56088"
```

**提示：**

- `1 <= num1.length, num2.length <= 200`
- `num1` 和 `num2` 只能由数字组成。
- `num1` 和 `num2` 都不包含任何前导零，除了数字0本身。

## 思路

模拟竖式乘法
![模拟竖式乘法](https://backblaze.cosine.ren/juejin/698642a0e3724164ad93ef46326d1f8a~Tplv-K3u1fbpfcp-Watermark.png)

- 开头先特判一下是否有哪个数有为 `0` 的情况，直接返回 `0`
- 被乘数 `num1` 位数为 `n` ，乘数 `num2` 位数为 `m`， `num1 * num2` 的结果 `res` 最大总位数为 `n+m`
- `num1[i] * num2[j]` 的结果 `mul`，第一位位于 `res[i+j]`，第二位位于 `res[i+j+1]`。
- 最后需去除前导0

## 代码

```javascript
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if(num1 == '0' || num2 == '0') 
        return '0'
    let [n, m] = [num1.length, num2.length]
    let res = new Array(n+m).fill(0)
    for(let i = n-1; i >= 0; i--) {
        for(let j = m-1; j >= 0; j--) {
            let mul = parseInt(num1[i]) * parseInt(num2[j])
            let p1 = i + j, p2 = i + j + 1
            let sum = mul + res[p2]
            res[p1] += Math.floor(sum / 10)
            res[p2] = sum % 10  // 取余
        }
    }
    let idx = res.findIndex(x => x != 0)  // 去除前导0
    return idx == -1? '0' : res.slice(idx).join('')
};
```

# [bytedance-002. 发下午茶](https://leetcode-cn.com/problems/OMrszv/)

有 K 名字节君，每天下午都要推着推车给字节的同学送下午茶，字节的同学分布在不同的工区，字节的工区分布和字节君的位置分布如下。

![image.png](https://backblaze.cosine.ren/juejin/842b1a582fce4013b8375fd96ccc629b~Tplv-K3u1fbpfcp-Zoom-1.png)

在上图中，每个方框内的单位长度为 1。已知字节君的推车可以装无限份下午茶，所以不需要字节君回到初始地点补充下午茶。每个字节君只有两个动作。

1. 把推车向前移动一个单位。
1. 把一份下午茶投放到当前工区。

现在告诉你字节君的数量以及每个工具需要的下午茶个数请问，所有的字节君最少花费多长时间才能送完所有的下午茶？

**格式：**

```
输入：
- 第一行是字节君的数量K和工区的数量 N
- 第二行 N 个数字是每个工区需要的下午茶数量 Ti
输出：
- 输出一个数字代表所有字节均最少花费多长时间才能送完所有的下午茶
```

**示例 1：**

```
输入：
     3 3
     7 1 1
输出：5
解释：
字节君1：右移->放置->放置->放置->放置
字节君2：右移->放置->放置->放置
字节君3：右移->右移->放置->右移->放置
```

**示例 2：**

```
输入：
     2 4
     3 3 1 1
输出：7
解释：
字节君1：右移->放置->放置->放置->右移->放置->放置
字节君2：右移->右移->放置->右移->放置->右移->放置
```

**提示：**

- `0< K, N <= 1000`
- `0<= Ti <= 10000`

## 思路

又看了评论区大神的解答（）

- 由于配送时间最好情况下为`0`（根本无须配送），最坏情况下为 `N+T中所有数`（一个人配送）
- 故答案可在 `0~N+T中所有数` 中进行二分，若还能有更好情况则取更好情况。
- 在 `check` 函数中检查该配送时间是否足够送完所有工区

## 代码

```cpp
#include <iostream>
using namespace std;
const int maxn = 1005;
int K, N;
int t[maxn], t2[maxn];
bool check(int time) {
    for(int i = 0; i < N; i++) 
        t2[i] = t[i];
    for(int i = 0; i < K; i++) {    // 每个人
        int rest = time;    // 可用时间
        for(int j = 0; j < N; j++) { // 每个工区
            --rest;  // 移动过来。
            if(rest <= 0) break;    // 无时间了
            if(t2[j] < rest) {  // 剩余时间足够送完该工区
                rest -= t2[j];
                t2[j] = 0;
            } else {    // 当前剩余时间不够送完该工区的
                t2[j] -= rest;
                break;
            }
                
        }
    }
    for(int i = 0; i < N; ++i) {
        if(t2[i] > 0) return false;
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);cin.tie(0);cout.tie(0);
    cin >> K >> N;
    int l = 0, r = N;
    for(int i = 0; i < N; i++) {
        cin >> t[i];
        r += t[i];
    }
    while(l < r) {
        int mid = (l + r) >> 1;
        if (check(mid)) r = mid;
        else l = mid + 1;
    }
    cout << l << endl;
    return 0;
}
```

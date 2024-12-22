---
title: 冲刺春招-精选笔面试66题大通关day22
link: coding-train/leetcode/bytedance/bytedance-day22
catalog: true
subtitle: 今日知识点：字符串、递归、链表，难度为中等、中等、中等
date: 2022-03-29 18:30:55
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 字符串
- 递归
- 链表
categories:
- [题目记录, 字节校园]
---

day22题目：[151. 颠倒字符串中的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)、[46. 全排列](https://leetcode-cn.com/problems/permutations/)、[2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

今日知识点：字符串、递归、链表，难度为中等、中等、中等

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day21](https://juejin.cn/post/7080127605222932517)

# [151. 颠倒字符串中的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

给你一个字符串 `s` ，颠倒字符串中 **单词** 的顺序。

**单词** 是由非空格字符组成的字符串。`s` 中使用至少一个空格将字符串中的 **单词** 分隔开。

返回 **单词** 顺序颠倒且 **单词** 之间用单个空格连接的结果字符串。

**注意：** 输入字符串 `s`中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。

**示例 1：**

```
输入： s = "the sky is blue"
输出： "blue is sky the"
```

**示例 2：**

```
输入： s = "  hello world  "
输出： "world hello"
解释： 颠倒后的字符串中不能存在前导空格和尾随空格。
```

**示例 3：**

```
输入： s = "a good   example"
输出： "example good a"
解释： 如果两个单词间有多余的空格，颠倒后的字符串需要将单词间的空格减少到仅有一个。
```

**提示：**

- `1 <= s.length <= 104`
- `s` 包含英文大小写字母、数字和空格 `' '`
- `s` 中 **至少存在一个** 单词

**进阶：** 如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 `O(1)` 额外空间复杂度的 **原地** 解法。

## 思路

不讲武德版：一行代码，先去除前后空格，再利用正则将字符串从空白处分割后反转再拼回去

```javascript
var reverseWords = function(s) {
    return s.trim().split(/[ ]+/).reverse().join(' ').trim();
};
```

`O(1)` 额外空间复杂度的 **原地** 解法：JS字符串不可变，需要O(n)的空间将字符串转换为数组，不行，换成c++的话就是O(1)了。

- 双指针进行反转

```javascript
let reverse = function(str, s, e) {
    while(s < e) {
        [str[s], str[e]] = [str[e], str[s]]
        ++s, --e
    }
}
```

- 将字符串转换为数组`ans`的同时去除前后空格和多余空格 `trim2arr`
- 反转整个数组 `reverse(ans, 0, ans.length - 1)`
- 反转每个单词使单词内部顺序保持不变 `reverseWord(ans)`

## 代码

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let trim2arr = function(str) {
        let arr = []
        let [l, r] = [0, 0]
        while(l < str.length) {
            while(l < str.length && str[l] === ' ') ++l
            r = l
            while(r < str.length && str[r] !== ' ') ++r
            arr.push(...str.slice(l, r), ' ')
            l = r
        }
        while(arr[arr.length-1] == ' ') arr.pop()
        return arr
    }
    let reverse = function(str, s, e) {
        while(s < e) {
            [str[s], str[e]] = [str[e], str[s]]
            ++s, --e
        }
    }
    let reverseWord = function(arr) {
        let [l, r] = [0, 0]
        while(l < arr.length) {
            while(l < arr.length && arr[l] === ' ') ++l
            r = l
            while(r < arr.length && arr[r] !== ' ') ++r
            reverse(arr, l, r - 1)
            l = r
        }
    }
    let ans = trim2arr(s)               // JS字符串不可变，需要转换成数组
    reverse(ans, 0, ans.length - 1)     // 反转整个字符串
    reverseWord(ans)                    // 反转每个单词
    return ans.join('')                 // 数组转换成字符串
};
```

# [46. 全排列](https://leetcode-cn.com/problems/permutations/)

给定一个不含重复数字的数组 `nums` ，返回其 *所有可能的全排列* 。你可以 **按任意顺序** 返回答案。

**示例 1：**

```
输入： nums = [1,2,3]
输出： [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**示例 2：**

```
输入： nums = [0,1]
输出： [[0,1],[1,0]]
```

**示例 3：**

```
输入： nums = [1]
输出： [[1]]
```

**提示：**

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有整数 **互不相同**

## 思路

## 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    let ans = []
    let len = nums.length
    if (len === 0) return ans
    if (len === 1) return [nums]
    let vis = new Array(len).fill(false)
    let permu = function(arr) {
        if (arr.length === len) {
            ans.push(arr.slice())
            return
        }
        for (let i = 0; i < len; i++) {
            if (vis[i]) continue
            vis[i] = true
            arr.push(nums[i])
            permu(arr)
            arr.pop()
            vis[i] = false
        }
    }
    permu([])
    return ans
};
```

# [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例 1：**

![](https://backblaze.cosine.ren/juejin/83bf665da88c4f18b7a726d818ca51fa~Tplv-K3u1fbpfcp-Zoom-1.png)

```
输入： l1 = [2,4,3], l2 = [5,6,4]
输出： [7,0,8]
解释： 342 + 465 = 807.
```

**示例 2：**

```
输入： l1 = [0], l2 = [0]
输出： [0]
```

**示例 3：**

```
输入： l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出： [8,9,9,9,0,0,0,1]
```

**提示：**

- 每个链表中的节点数在范围 `[1, 100]` 内
- `0 <= Node.val <= 9`
- 题目数据保证列表表示的数字不含前导零

## 思路

跟大数加没什么区别，就是换成了链表而已~

## 代码

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let ehead = new ListNode()
    let nowp = ehead 
    let flag = 0    // 进位
    while(l1 || l2 || flag) {
        let x = l1? l1.val: 0
        let y = l2? l2.val: 0
        let sum = x + y + flag
        flag = sum >= 10? 1: 0
        nowp.next = new ListNode(sum % 10)
        nowp = nowp.next
        if(l1) l1 = l1.next
        if(l2) l2 = l2.next
    }
    return ehead.next
};
```

好耶！完成！
![小徽章.png](https://backblaze.cosine.ren/juejin/A14ef457f04f4d85a697dc13ca164927~Tplv-K3u1fbpfcp-Watermark.png)

明天开始剑指offer的刷题

刷完剑指offer就去刷剑指的专项

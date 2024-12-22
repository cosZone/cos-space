---
title: 冲刺春招-精选笔面试66题大通关day8
link: coding-train/leetcode/bytedance/bytedance-day8
catalog: true
subtitle: 今日知识点：栈、深搜/广搜、滑动窗口，难度为简单、中等、困难
date: 2022-03-15 23:10:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- dfs/bfs
- 滑动窗口
categories:
- [题目记录, 字节校园]
---

day8题目：[20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)、[200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)、[76. 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：栈、深搜/广搜、滑动窗口，难度为简单、中等、困难
<!-- more -->

# 20. 有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

 **示例 1：**
输入：s = "()"
输出：true

**示例 2：**
输入：s = "()[]{}"
输出：true

## 思路

典中典堆栈判断有效括号，遇到左括号将其入栈，遇到右括号跟栈顶比较，若不匹配或者栈为空则返回false，全部比较完都没问题且栈为空了则返回true。

## 代码

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    for(let i = 0; i < s.length; ++i) {
        if(s[i] == '{' || s[i] == '(' || s[i] == '[') {
            stack.push(s[i]);
        } else {
            if(stack.length == 0) return false;
            let top = stack.length-1;
            if(s[i] == '}' && stack[top] == '{') stack.pop();
            else if(s[i] == ')' && stack[top] == '(') stack.pop();
            else if(s[i] == ']' && stack[top] == '[') stack.pop();
            else return false;
        }
    }
    return stack.length == 0;
};
```

# 200. 岛屿数量

给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

**示例 1：**
输入：

```
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
```

输出：`1`

**示例 2：**
输入：

```
grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
```

输出：`3`

**提示：**

```
m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] 的值为 '0' 或 '1'
```

## 思路

一眼题，一眼就用dfs就行了，标记数组vis表示是否访问过，对每个没访问过的1进行dfs并++ans。也可以用并查集做。

## 代码

```cpp
class Solution {
public:
    vector<vector<bool> > vis;
    vector<vector<char> > g;
    int n, m;
    int dx[4] = {-1, 1, 0, 0};// 上下左右
    int dy[4] = {0, 0, -1, 1};// 上下左右
    Solution():vis(305, vector<bool>(305, false)) {}
    void dfs(int i, int j) {
        if(vis[i][j]) return;
        vis[i][j] = true;
        for(int k = 0; k < 4; ++k) {
            int nowx = i+dx[k];
            int nowy = j+dy[k];
            if(nowx >= 0 && nowx < m && nowy >= 0 && nowy < n && g[nowx][nowy] == '1') 
                dfs(nowx, nowy); 
        }
    }
    int numIslands(vector<vector<char>>& grid) {
        g = grid;
        m = grid.size();
        n = grid[0].size();
        int ans = 0;
        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j) {
                if(vis[i][j] || grid[i][j] == '0') continue;
                dfs(i, j);
                ++ans;
            }
        }
        return ans;
    }
};
```

# 76. 最小覆盖子串

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

**注意：**
对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。

**示例 1：**
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"

**示例 2：**
输入：s = "a", t = "a"
输出："a"

**示例 3:**
输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。

**提示：**
1 <= s.length, t.length <= 105
s 和 t 由英文字母组成

## 思路

滑动窗口，首先遍历一遍t（t[i]为该字符的ASCII码），将所有出现过的m[t[i]]--，这样遍历完后，m中小于0的就是需要满足的字符数，然后双指针开始滑动窗口，使用cnt作为判断，若cnt为t中字符数则满足条件，将左指针尽可能往右移动。

## 代码

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if(s.length < t.length) return '';
    let m = new Array(130);
    m.fill(0);
    for(let i = 0; i < t.length; ++i) 
        --m[t.charCodeAt(i)];
    let ans = '';
    let cnt = 0;    // 满足字符个数
    for(let l = 0, r = 0; r < s.length; ++r) {
        let k = s.charCodeAt(r);
        if(m[k] < 0) ++cnt;
        ++m[k];
        while(cnt == t.length && m[s.charCodeAt(l)] > 0) 
            m[s.charCodeAt(l++)]--;
        if(cnt == t.length && (ans == '' || r-l+1 <= ans.length) ) {
            ans = s.substring(l, r+1);
        }
    }
    return ans;
};
```

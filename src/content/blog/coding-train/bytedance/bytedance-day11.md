---
title: 冲刺春招-精选笔面试66题大通关day11
link: coding-train/leetcode/bytedance/bytedance-day11
catalog: true
subtitle: 今日知识点：字符串、模拟、动态规划，难度为简单、中等、困难
date: 2022-03-18 18:10:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- leetcode
- 动态规划
- 模拟
categories:
- [题目记录, 字节校园]
---

day11题目：[415. 字符串相加](https://leetcode-cn.com/problems/add-strings/)、[5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)、[72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)

学习计划链接：[冲刺春招-精选笔面试 66 题大通关](https://leetcode-cn.com/study-plan/bytedancecampus/?progress=dcmyjb3)

今日知识点：字符串、模拟、动态规划，难度为简单、中等、困难

昨日题目链接：[冲刺春招-精选笔面试 66 题大通关 day10](https://juejin.cn/post/7076029414655393822)

# 415. 字符串相加

给定两个字符串形式的非负整数 `num1` 和`num2` ，计算它们的和并同样以字符串形式返回。

你不能使用任何內建的用于处理大整数的库（比如 `BigInteger`）， 也不能直接将输入的字符串转换为整数形式。

**示例 1：**

```
输入： num1 = "11", num2 = "123"
输出： "134"
```

**示例 2：**

```
输入： num1 = "456", num2 = "77"
输出： "533"
```

**示例 3：**

```
输入： num1 = "0", num2 = "0"
输出： "0"
```

**提示：**

- `1 <= num1.length, num2.length <= 104`
- `num1` 和`num2` 都只包含数字 `0-9`
- `num1` 和`num2` 都不包含任何前导零

## 思路

flag为进位标志，从右侧开始往左走，若sum大于等于10则进位，非常典型的大数相加了。

## 代码

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let [len1, len2] = [num1.length, num2.length];
    let flag = 0;   // 进位标志
    let ans = '';
    for(let i = len1-1, j = len2-1; i >= 0 || j >= 0 || flag == 1; --i, --j) {
        let x, y;
        x = i >= 0? parseInt(num1[i]): 0;
        y = j >= 0? parseInt(num2[j]): 0;
        let sum = x+y+flag;
        if(sum >= 10) {
            ans += (sum%10);
            flag = 1;
        } else {
            ans += sum;
            flag = 0;
        }
    }
    return ans.split('').reverse().join('');
};
```

# 5. 最长回文子串

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

**示例 1：**

```
输入： s = "babad"
输出： "bab"
解释： "aba" 同样是符合题意的答案。
```

**示例 2：**

```
输入： s = "cbbd"
输出： "bb"
```

**提示：**

- `1 <= s.length <= 1000`
- `s` 仅由数字和英文字母组成

## 思路

也是非常经典的做过好多遍的题了（起码做了有4次了- -），动态规划就行了，核心就是**dp[i][j] 表示i~j是否为回文串**，先遍历一遍，将dp[i][i]都置为true，dp[i][i-1]看情况置为true（前后相同），然后从长度为3开始dp。

##

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let len = s.length;
    let dp = new Array(len).fill(0).map(v => (new Array(len).fill(0))); // JS初始化二维数组全为0
    let maxlen = 1;
    let ans = s[0];
    for(let i = 0; i < len; ++i) {
        dp[i][i] = 1;
        if(i > 0 && s[i-1] == s[i]) {
            dp[i-1][i] = 1;
            maxlen = 2;
            ans = s[i-1]+s[i];
        }
    }
    for(let k = 3; k <= len; ++k) {
        for(let l = 0, r = l+k-1; r < len; ++l, ++r) {
            if(s[l] == s[r] && dp[l+1][r-1] == 1) {
                dp[l][r] = 1;
                if(k > maxlen) {
                    maxlen = k;
                    ans = s.substring(l, r+1);
                }
            }
        }
    }
    return ans;
};
```

# 72. 编辑距离

给你两个单词 `word1` 和 `word2`， *请返回将 `word1` 转换成 `word2` 所使用的最少操作数*  。

你可以对一个单词进行如下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符

**示例 1：**

```
输入： word1 = "horse", word2 = "ros"
输出： 3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

**示例 2：**

```
输入： word1 = "intention", word2 = "execution"
输出： 5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```

**提示：**

- `0 <= word1.length, word2.length <= 500`
- `word1` 和 `word2` 由小写英文字母组成

## 思路

动态规划，没想出来，看了题解。
dp[i][j] 表示word1中前i个字符变成word2中前j个字符最少需要多少步

- `i=0` 的时候（即第一行）为word2前j个数变为空字符串需要几步（自然是j步）
- `j=0` 时（即第一列）为word1前 `i` 个数变为空字符串需要几步
- 开始遍历，过程中若当前 `word1[i] == word2[j]`，则说明无需变化，`dp[i][j] = dp[i-1][j-1];`
- 否则 `dp[i][j]`为`dp[i-1][j-1]`、`dp[i-1][j]`、 `dp[i][j-1])+1`中最小步数+1
  - 这里最小值若为 `dp[i-1][j-1]` 表示修改一个字符，`dp[i][j-1]` 表示往word2[j-1]后面添加一个字符，`dp[i-1][j]` 表示往word1[i-1]后面添加一个字符

## 代码

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let [m, n] = [word1.length+1, word2.length+1];
    let dp = new Array(m).fill(0).map((v) => (new Array(n).fill(0)));
    for(let i = 0; i < m; ++i)
        dp[i][0] = i;   // word1前i个字符串变为''需要多少步
    for(let i = 0; i < n; ++i)
        dp[0][i] = i;   // word2前i个字符串变为''需要多少步
    for(let i = 1; i < m; ++i) {
        for(let j = 1; j < n; ++j) {
            if(word1[i-1] == word2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])+1;
        }
    }
    return dp[m-1][n-1];
};
```

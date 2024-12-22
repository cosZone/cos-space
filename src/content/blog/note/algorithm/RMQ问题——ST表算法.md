---
title: RMQ问题——ST表算法
link: RMQ问题——ST表算法
catalog: true
lang: cn
date: 2020-03-21 20:41:41
subtitle: O(nlogn)复杂度预处理，可以实现O(1)复杂度的查询。
tags:
- c++
- 数据结构
- ST表
categories:
- [笔记, 算法]
---

## ST表是什么

ST表是一个用来解决区间最值问题查询的算法
它用**O(nlogn)复杂度预处理，可以实现O(1)复杂度的查询。**
**缺点：无法支持在线修改**
模板题：[ST表-洛谷](https://www.luogu.com.cn/problem/P3865)

### 1.预处理

用一个二维数组dp[i][j]表示下标为 i ~ i + 2^j^ - 1 的最值（最大or最小值）
则
①易知边界条件dp[i][0]为a[i]，既i~i的最大值为其本身
②接下来是状态转移方程，如图

> #### **1 << j 相当于 2^j^**

![](https://img-blog.csdnimg.cn/20200321173713916.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)
初始化代码

```cpp
void init(int n) {
    for (int i = 0; i < n; i++) {
        dp[i][0] = a[i];
    }
    for (int j = 1; (1<<j) <= n; j++) {
        for (int i = 0; i + (1<<j) <= n; i++) {
            dp[i][j] = max(dp[i][j-1], dp[i+(1<<(j-1))][j-1]);
        }
    }
}
```

### 2.查询

接下来就是查询，因为每次给出的查询区间长度不一定恰好为2^j，所以我们需要以下定理:（参考[大佬证明](https://blog.csdn.net/Hanks_o/article/details/77547380)）

>##  **2^log(a)^>a/2**
>
>### log(a)表示小于等于a的2的最大几次方
>
>###### eg:log(4)=2,log(5)=2,log(6)=2,log(7)=2,log(8)=3,log(9)=3……

若我们要查询a~b区间的最小值
首先我们求出区间长度**len = b-a+1** 并令 **t = log(len)**
由上述定理，**2^t^>len/2**
也就是说，2^t在a,b区间的右半边
a,b的最小值，即为min（a ~ (a+2^t^-1), (b-2^t^+1) ~ t）如图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200321184107899.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)
查询代码：

```cpp
ll sol(int a, int b) {
    int t = (int) (log(b-a+1.0)/log(2.0));
    return max(dp[a][t], dp[b-(1<<t)+1][t]);
}
```

### 3.完整代码

题目：[ST表-洛谷](https://www.luogu.com.cn/problem/P3865)
开了O2优化和快读才能ac

```cpp
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;
const int maxn = 100000;
typedef long long ll;
ll a[maxn];
ll dp[maxn][25];//此处以最大值为例
void init(int n) {
    for (int i = 0; i < n; i++) {
        dp[i][0] = a[i];
    }
    for (int j = 1; (1<<j) <= n; j++) {
        for (int i = 0; i + (1<<j) <= n; i++) {
            dp[i][j] = max(dp[i][j-1], dp[i+(1<<(j-1))][j-1]);
        }
    }
}
ll sol(int a, int b) {
    int t = (int) (log(b-a+1.0)/log(2.0));
    return max(dp[a][t], dp[b-(1<<t)+1][t]);
}
int main() {
    ios::sync_with_stdio(false);
    int n,m;
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    init(n);
    while(m--) {
        int x,y;
        cin >> x >> y;
        cout << sol(x-1,y-1) << endl;
    }
    return 0;
}
```

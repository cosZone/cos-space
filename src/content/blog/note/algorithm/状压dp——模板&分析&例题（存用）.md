---
title: 状压dp——模板&分析&例题（存用）
link: 状压dp——模板&分析&例题（存用）
catalog: true
lang: cn
date:  2020-09-05 22:39:22 
subtitle: 状压dp，即将状态压缩成2进制来保存，是动态规划中的一种非常暴力的做法
tags:
- c++
- 算法
categories:
- [笔记, 算法]
---

状压讲解部分参考博客[状压DP详解（位运算）](https://www.cnblogs.com/smallhester/p/10394328.html)

# 一、什么是状压dp？

> 这里是引用

   状压dp，即将状态压缩成2进制来保存，如矩阵中将一行的状态压缩成一个二进制串，如dp[S][v]中，S可以代表已经访问过的顶点的集合，v可以代表当前所在的顶点为v。S代表的就是一种状态（二进制表示）， (11001)~2~  代表在二进制中{0，3，4}三个顶点已经访问过了，(11001)~2~ 代表的十进制数就是25 ，所以当S为25的时候其实就是代表已经访问过了{0，3，4}三个顶点，那假如一共有5个顶点（标号为01234）的话，所有的顶点都访问完毕，Sj就是　(11111)~2~。

# 二、常用位运算

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200814161751719.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)
对于上面的一些操作举例一些
就如之上的　(11001)~2~　来说是已经访问了0，3，4三个顶点，当我接下去要访问顶点2的话可以有以下操作：1.看看第3位是什么？那么选择取出二进制数x的第k位，y = x >>(k-1) & 1，y = (110)~2~ & 1 = 0，2.把第3位变为1，y = x | (1<<(k-1))，y = (11001)~2~  |  (100)~2~ = (11101)~2~，所以顶点2访问完毕，加入到集合S中也结束了，此时S为(11101)2 = 29。

# 三、例题

## [A-Hie with the Pie](https://vjudge.net/contest/389291#problem/A)

### 题意

给出所有地点之间来往的所需时间（来往时间可能不同），如何用最短时间送完所有地点的订单并返回披萨店（编号0）

### 思路

先用Floyd算法得出最短路矩阵，用S表示状态，dp[S][i]表示送达第i个地点所需的最短时间，由S可知当前已送达哪些城市，S = 1<<N-1即为全部送达的状态（N位全为1）

### 代码

```cpp
// A-Hie with the Pie
#include <iostream>
#include <cstdio>
#include <cmath>
#include <algorithm>
using namespace std;
typedef long long ll;
#define div 1000000007
const int maxn = 12;
const int inf  = 0x3f3f3f;
int N,S,ans;
int dis[maxn][maxn];
int dp[1<<maxn][maxn];
void Floyd() {
    for(int k = 0; k <= N; ++k) {
        for(int i = 0; i <= N; ++i) {
            for(int j = 0; j <= N; ++j) {
                if(dis[i][j] > dis[i][k] + dis[k][j]) {
                    dis[i][j] = dis[i][k] + dis[k][j];
                }
            }
        }
    }
}
int main(){
    while(scanf("%d", &N) && N) {
        for(int i = 0; i <= N; ++i) {
            for(int j = 0; j <= N; ++j) {
                scanf("%d", &dis[i][j]);
            }
        }
        Floyd();
        for(int S = 0; S < (1<<N); ++S) {//S的所有状态
            for(int i = 1; i <= N; ++i) {//所有要送的地点
                if(S & ( 1<<(i-1) )) {  //要送往地点i
                    if(S == ( 1<<(i-1) )) {//若S还没有送往任何一个地点
                        dp[S][i] = dis[0][i];
                        break;
                    } else {
                        dp[S][i] = inf;
                        for(int j = 1; j <= N; ++j) {
                            if(j == i) continue;
                            //枚举除当前要送往地点之外已送达地点，看时间是否更短
                            if(S&( 1<<(j-1) )) {
                                dp[S][i] = min(dp[S][i],dp[S^(1<<(i-1))][j] + dis[j][i]);
                            }
                            
                            
                        }
                    }
                }
            }
        }
        ans = inf;
        for(int i = 1; i <= N; ++i) {
            ans = min(ans, dp[(1<<N)-1][i] + dis[i][0]);
        }
        printf("%d\n",ans);
    }
    return 0;
}
```

## [B - Travelling](https://vjudge.net/contest/389291#problem/B)

### 题意

给出N个城市、M条道路成本，Acmer先生想前往所有城市并且每个城市最多去两次，求最低所需费用，若找不到这样的路线则输出-1

### 思路

三进制状压dp，每位上0表示没去过，1表示去过1次，2表示去过2次，这里用cnt[i][j]来表示i在3进制下从右往左第j位，用three[i]为三进制的第i位位权 即three[i]类似于二进制中1<<i，最后若是全部访问过且每个不超过2次则跟ans比较

### 代码

```cpp
// B - Travelling
#include <iostream>
#include <cstdio>
#include <cstring>
#include <cmath>
#include <algorithm>
using namespace std;
typedef long long ll;
#define div 1000000007
const int maxn = 12;
const int maxt = 59049;
const int inf  = 0x3f3f3f;
int N,M,S,ans;
int three[maxn];//three[i]为三进制的第i位最大值 类似于二进制中1<<i
int map[maxn][maxn];
int cnt[maxt][maxn];//cnt[i][j]表示i在3进制下从右往左第j位
int dp[maxt][maxn];//dp[i][j]表示i状态下前往j城市后总费用
void init() {
    memset(dp, -1, sizeof(dp));
    for(int i = 1; i <= N; ++i) {
        for(int j = 1; j <= N; ++j) {
            map[i][j] = inf;
        }
        map[i][i] = 0;
    }
}
int main(){
    int x = 3;
    three[0] = 0;
    three[1] = 1;
    for(int i = 2; i < maxn; ++i) {
        three[i] = x;
        x *= 3;
    }
    for(int i = 0; i < three[maxn-1]; ++i) {
        int now = i;
        for(int j = 1; j <= 10 && now; ++j) {
            cnt[i][j] = now % 3;
            now /= 3;
        }
    }
    while(~scanf("%d %d", &N, &M)) {
        init();
        for(int i = 1; i <= M; ++i) {
            int u,v,w;
            scanf("%d %d %d", &u, &v, &w);
            if(w < map[u][v]) {
                map[u][v] = map[v][u] = w;
            }
        }
        for(int i = 1; i <= N; ++i) {
            dp[three[i]][i] = 0;
        }
        int ans = inf;
        for(int S = 0; S < three[maxn-1]; ++S) {//S的所有状态
            bool allvis = true;
            for(int i = 1; i <= N; ++i) {//枚举每个城市
                if(cnt[S][i] == 0)   //该状态下有城市还没有被访问过
                    allvis = false;
                if(dp[S][i] == -1) continue;
                for(int j = 1; j <= N; ++j) {   //枚举下一个能访问的城市
                    if(i == j || map[i][j] == inf || cnt[S][j] >= 2) 
                        continue;   
                    int nS = S+three[j];//下一个状态
                    if(dp[nS][j] == -1 || dp[S][i] + map[i][j] < dp[nS][j]) { //下一个城市的总费用小
                        dp[nS][j] = dp[S][i] + map[i][j];
                    }
                }
            }
            if(allvis) {
                for(int i = 1; i <= N; ++i) {
                    if(dp[S][i] != -1) {
                        ans = min(ans, dp[S][i]);
                    }
                }
            }
        }
        if(ans == inf) printf("-1\n");
        else printf("%d\n",ans);
    }
    return 0;
}
```

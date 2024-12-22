---
title: PTA数据结构题目集 第七周——图（中）
link: PTA数据结构题目集 第七周——图（中）
catalog: true
lang: cn
date:   2020-08-08 20:33:20 
subtitle: PTA数据结构题目集 第七周——图（中），涉及图的单源最短路算法（Floyed算法、Dijkstra算法），所用语言为c++。
tags:
- c++
- PTA
- 数据结构
- 最短路
categories:
- 题目记录
---

[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)
学习指路博客  [图论](https://blog.csdn.net/qq_45890533/article/details/105475331)

# 07-图4 哈利·波特的考试 (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1284061680916697088)

>是很基本的算法应用，**一定要做**。如果不会，那么看看小白专场，会详细介绍C语言的实现方法
>
## 题目大意

给出每两个动物之间所需魔咒长度
哈利·波特最后应该带去考场的动物要使得最难变的动物所需总魔咒长度最小。
输出哈利·波特最后应该带去考场的动物的编号、以及最长的变形魔咒的长度

## 思路

用Floyd算法得出最短路矩阵dist(dist[i][j]表示i到j所需最短长度，在每行里找最难变(即dist[i][j]最大)的元素，在这些元素中找最小的，输出最小值的下标i和最小值

## 代码

```cpp
#include <iostream>
#include <cstdio>
#include <cstring>
#include <queue>
using namespace std;
const int maxn = 1005;
const int inf  = 0x3f3f3f;
int N,M,x,y,z;
bool visited[maxn];
int dist[maxn][maxn];
//用Floyd算法得到最短路矩阵
//让最难变的动物咒语长度最小
void init() {
    for(int i = 1; i <= N; ++i) {
       for(int j = 1; j <= N; ++j) {
            dist[i][j] = inf;
        } 
        dist[i][i] = 0;
    }
}
void Floyd() {
    for(int k = 1; k <= N; ++k) {
        for(int i = 1; i <= N; ++i) {
            for(int j = 1; j <= N; ++j) {
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
}
void solve() {
    int num,ans,hardest;
    ans = inf+1;
    Floyd();
    for(int i = 1; i <= N; ++i) {
        hardest = 0;
        for(int j = 1; j <= N; ++j) {
            if(dist[i][j] > hardest) {
                hardest = dist[i][j];
            }
        }
        if(hardest == inf) {
            printf("0");
            return;
        }
        if(hardest < ans) {
            num = i;
            ans = hardest;
        }
    }
    printf("%d %d\n", num, ans);
}
int main(){
    scanf("%d %d", &N, &M);
    init();
    for(int i = 1; i <= M; ++i) {
        scanf("%d %d %d", &x, &y, &z);
        dist[x][y] = dist[y][x] = z;
    }
    solve();
    return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200720184504862.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 07-图5 Saving James Bond - Hard Version (30分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1284061680920891392)

>有余力的话，好人做到底，如果上周已经尝试着救过007了，这周就继续给他建议吧；
>
## 题目大意

输出最少的跳转次数以及沿途跳转的鳄鱼的xy坐标

## 思路

用Floyd算法得出最短路矩阵edge(edge[i][j]表示鳄鱼i到鳄鱼j所需最少跳转次数，初始化时能跳转则置为1，不能则置为0），同时用path存储路径。
注意一点：如果有许多最短路径，只需输出具有最小第一跳转的路径

## 代码

```cpp
// 07-图5 Saving James Bond - Hard Version (30分)
#include <iostream>
#include <cstdio>
#include <cmath>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;
const int maxn = 105;
const int inf = 0x3f3f3f;
int N,D;
bool vis[maxn];
int edge[maxn][maxn];
int path[maxn][maxn];
struct Point {
    int x, y;
    bool visited;
} v[maxn],s;
struct Fjump{
    int id;
    double d;
    bool operator<(const Fjump& f) {
        return d < f.d;
    }
};
vector<Fjump> fj;
void init() {
    for(int i = 0; i <= N+1; ++i) {
        for(int j = 0; j <= N+1; ++j) {
            edge[i][j] = inf;
            path[i][j] = -1;
        }
        edge[i][i] = 0;
    }
}
double countDist(Point a, Point b) {
    return sqrt(pow((a.x-b.x),2) + pow((a.y-b.y),2));
}
bool check(Point a) {
    int s = 50 - D;
    if(abs(a.x) >= s || abs(a.y) >= s) 
        return true;
    else return false;
}
void Floyd() {
    for(int k = 1; k <= N; ++k) {
        for(int i = 1; i <= N; ++i) {
            for(int j = 1; j <= N; ++j) {
                if(edge[i][k] + edge[k][j] < edge[i][j]) {
                    edge[i][j] = edge[i][k] + edge[k][j];
                    path[i][j] = k;
                }
            }
        }
    }
}
bool firstJump(int i) {
    double d = countDist(s,v[i]);
    d -= 7.5;
    return d <= D;
}
void PrintPath(int S, int E) {
    if(path[S][E] != -1) {
        int k = path[S][E];
        PrintPath(S,k);
        printf("%d %d\n", v[k].x, v[k].y);
        PrintPath(k,E);
    }
}
int main(){
    ios::sync_with_stdio(false);
    scanf("%d %d", &N, &D);
    init();
    v[0].visited = false;
    v[0].x = v[0].y = 0;
    for(int i = 1; i <= N; ++i) {
        scanf("%d %d", &v[i].x, &v[i].y);
        v[i].visited = false;
    }
    for(int i = 1; i <= N; ++i) {
        for(int j = 1; j <= N; ++j) {
            if(countDist(v[i],v[j]) <= D)
                edge[i][j] = edge[j][i] = 1;
        }
    }
    Floyd();
    int mind,temp;
    int S,E;
    mind = inf;
    for(int i = 1; i <= N; ++i) {
        if(firstJump(i)) {
            Fjump f;
            f.d = countDist(s, v[i]);
            f.id = i;
            fj.push_back(f);
        }
    }
    sort(fj.begin(), fj.end());
    for(int i = 0; i < fj.size(); ++i) {
        int sa = fj[i].id;
        if(check(v[sa])) {
                S = sa;
                E = sa;
                mind = 2;
                break;
         }
        for(int j = 1; j <= N; ++j) {
            if(sa == j) continue;
            if(check(v[j])) {
                temp = 2 + edge[sa][j];
                if (temp < mind) {
                    S = sa;
                    E = j;
                    mind = temp;
                }
            }
        }
    }
    if(D >= 42.5) { //一步上岸
        printf("1\n");
    } else if (mind != inf) {
        printf("%d\n", mind);
        if(S == E) {
            printf("%d %d\n", v[S].x, v[S].y);
        } else {
            printf("%d %d\n", v[S].x, v[S].y);
            PrintPath(S,E);
            printf("%d %d\n", v[E].x, v[E].y);
        }
    }  else 
        printf("0\n");
    return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729190645667.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 07-图6 旅游规划 (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1284061680920891393)

>Dijkstra算法的变形——姥姥只能帮你到这里了，自己动脑筋想一下怎么改造经典去解决这个问题？实在不会也不要急，再下周会讲算法的。

## 题目大意

给你所有村庄之间的高速公路距离及其所需花费，计算并输出给定的两村庄之间所需最小距离及其花费，若有多条最小路径则输出花费最少的。

## 思路

Dijkstra算法的变形，只需存边的时候同时存储距离及花费，多加一个cost数组，更新dist时的同时更新cost。

## 代码

```cpp
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
using namespace std;
const int maxn = 505;
const int inf  = 0x3f3f3f;
int N,M,S,D,u,v,len,p;
struct Edge {
    int len, pay;
}e[maxn][maxn];
int dist[maxn];
int cost[maxn];
bool vis[maxn];
void init() {
    for(int i = 0; i <= N; ++i) {
        for(int j = 0; j <= N; ++j) {
            e[i][j].pay = e[i][j].len = inf;
        }
        e[i][i].pay = e[i][i].len = 0;
    }
    memset(vis, 0, sizeof(vis));
}
void Dijstra(int u) {
    for(int i = 0; i < N; ++i) {
        dist[i] = e[u][i].len;
        cost[i] = e[u][i].pay;
    }
    for(int i = 1; i <= N; ++i) {
        int t, mindis = inf;
        for(int j = 0; j < N; ++j) {
            if(!vis[j] && dist[j] <= mindis) {
                mindis = dist[j];
                t = j;
            }
        }
        vis[t] = true;
        for(int j = 0; j < N; ++j) {
            if(vis[j] || e[t][j].len == inf) continue;
            if(dist[j] > e[t][j].len + dist[t]) {
                dist[j] = e[t][j].len + dist[t];
                cost[j] = e[t][j].pay + cost[t];
            } else if(dist[j] == e[t][j].len + dist[t]) {
                if(cost[j] > e[t][j].pay + cost[t]) {
                    cost[j] = e[t][j].pay + cost[t];
                }
            }
        }
    }
}
int main(){
    scanf("%d %d %d %d", &N, &M, &S, &D);
    init();
    while(M--) {
        scanf("%d %d %d %d", &u, &v, &len, &p);
        e[u][v].len = e[v][u].len = len;
        e[u][v].pay = e[v][u].pay = p;
    }
    Dijstra(S);
    printf("%d %d\n", dist[D], cost[D]);
    return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200808183438199.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

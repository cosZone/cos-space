---
title: PTA数据结构题目集 第八周——图（下）
link: PTA数据结构题目集 第八周——图（下）
catalog: true
lang: cn
date:  2020-08-21 03:45:26
subtitle: PTA数据结构题目集 第八周——图（下），涉及图的最小生成树（Kruskal算法、Prim算法），所用语言为c++。
tags:
- c++
- PTA
- 数据结构
- 最小生成树
categories:
- 题目记录
---

@[TOC](目录)
[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)
学习指路博客  [解决最小生成树问题(Kruskal算法&Prim算法)](https://blog.csdn.net/qq_45890533/article/details/105684653)、[数据结构学习笔记＜8＞ 排序](https://blog.csdn.net/qq_45890533/article/details/108246044)

# 08-图7 公路村村通 (30分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1286606445168746496)

>非常直白的最小生成树问题，但编程量略大，选做 —— 有时间就写写；

## 题目大意

给你所有村庄之间的高速公路所需成本，计算村村通所需最小成本，典型的最小生成树板子题，用Kruskal算法即可

## 代码

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;
const int maxm = 3030;
const int maxn = 1005;
const int inf = 0x3f3f3f3f;
int fa[maxn];
int N,M;//顶点数 边数
struct edge {
    int u,v,w;
    bool operator<(const edge& a) const {
        return w < a.w;
    }
} E[maxm];//最大边数maxm
int find(int x) {
    return fa[x] == -1 ? x : fa[x] = find(fa[x]);
}
int Kruskal() {
    for(int i = 0; i <= N; ++i) fa[i] = -1;
    int ans,cnt;
    ans = cnt = 0;
    sort(E,E+M);
    for(int i = 0; i < M; ++i) {
        int x = find(E[i].u);
        int y = find(E[i].v);
        if(x != y) {
            fa[x] = y;
            ans += E[i].w;
            cnt++;
        }
        if(cnt == N-1) break;
    }
    if(cnt != N-1) return -1;
    else return ans;
}
int main(){
    cin >> N >> M;
    for(int i = 0; i < M; ++i) {
        cin >> E[i].u >> E[i].v >> E[i].w;
    }
    cout << Kruskal() << endl;
    return 0;
}
```

## 测试点

测试点如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020080818560191.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 08-图8 How Long Does It Take (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1286606445168746497)

>拓扑排序的变形，程序不算复杂，建议尝试；

## 题目大意

给你项目的N个活动检查点（编号从0 ~ N-1）和M个活动，接下来M行每行3个整数分别是活动的开始检查点编号，结束检查点编号和持续时间，找到项目的最早完成时间。

## 思路

拓扑排序的同时计算每个检查点的最早完成时间，最后整个项目的最早完成时间是所有检查点最早完成时间中最大的那个

## 代码

```cpp
// 08-图8 How Long Does It Take (25分)
#include <iostream>
#include <cstdio>
#include <cmath>
#include <cstring>
#include <string>
#include <queue>
#include <algorithm>
using namespace std;
typedef long long ll;
#define div 1000000007
const int maxn = 105;
const int inf  = 0x3f3f3f;
int N,M,ans;
int edge[maxn][maxn];//所有活动
int mint[maxn];//到每个活动检查点的最短时间
int In[maxn];//每个活动检查点的入度
void init() {
    memset(edge, -1, sizeof(edge));
    memset(mint, 0, sizeof(mint));
    memset(In, 0, sizeof(In));
    ans = 0;
}
bool Topsort() {//拓扑排序
    queue<int> q;
    for(int i = 0; i < N; ++i) {
        if(In[i] == 0) {
            mint[i] = 0;//若为起点，则最短时间当然为0
            q.push(i);
        }
    }
    int cnt = 0;
    while(!q.empty()) {
        int v = q.front();
        q.pop();
        cnt++;
        for(int i = 0; i < N; ++i) {
            if(v == i || edge[v][i] == -1) continue;//检查以v为起点的所有边
            In[i]--;
            if(mint[i] < mint[v] + edge[v][i]) 
                mint[i] = mint[v] + edge[v][i];
            if(In[i] == 0) q.push(i);
        }
    }
    if(cnt != N) return false;
    else return true;
}
int main(){
    ios::sync_with_stdio(false);
    cin >> N >> M;
    init();
    for(int i = 0; i < M; ++i) {
        int u,v,w;
        cin >> u >> v >> w;
        edge[u][v] = w;
        In[v]++;
    }
    if(Topsort()) {
        for(int i = 0; i < N; ++i) {
            if(mint[i] > ans) ans = mint[i];
        }
        cout << ans << endl;
    } else cout << "Impossible" << endl;
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200820235833692.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# 08-图9 关键活动 (30分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1286606445168746498)

>在听完课以后，这题的思路应该比较清晰了，只需要在前面一题的程序基础上增加一些内容。不过编程量还是有一些的，根据自己的时间决定，慎入。

## 题目大意

与上题相似，不过除了最早完成时间之外，还要求最晚完成时间进而得出机动时间。最后输出是否能完成该任务，若能则输出关键活动（没有机动时间的活动）

## 代码

```cpp
// 08-图8 How Long Does It Take (25分)
#include <iostream>
#include <cstdio>
#include <cmath>
#include <cstring>
#include <string>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;
typedef long long ll;
#define div 1000000007
const int maxn = 105;
const int inf  = 0x3f3f3f;
int N,M,ans,last;
int edge[maxn][maxn];//所有活动
int mint[maxn];//到每个活动检查点的最短时间
int maxt[maxn];//到每个活动检查点的最长时间
int In[maxn];//每个活动检查点的入度
int Out[maxn];//每个活动检查点的出度
void init() {
    memset(edge, -1, sizeof(edge));
    memset(mint, 0, sizeof(mint));
    memset(maxt, 0x3f, sizeof(maxt));
    memset(In, 0, sizeof(In));
    memset(Out, 0, sizeof(Out));
    ans = last = 0;
}
bool Get_Mint() {
    queue<int> q;
    for(int i = 1; i <= N; ++i) {
        if(In[i] == 0) 
            q.push(i);
    }
    int cnt = 0;
    while(!q.empty()) {
        int v = q.front();
        q.pop();
        cnt++;
        for(int i = 1; i <= N; ++i) {
            if(edge[v][i] == -1) continue;
            In[i]--;
            //<v,i>有有向边
            mint[i] = max(mint[i], mint[v] + edge[v][i]);
            if(In[i] == 0) 
                q.push(i);
        }
    }
    if(cnt != N) return false;
    else return true;
}

void Get_Maxt() {
    queue<int> q;
    maxt[last] = ans;
    for(int v = 1; v <= N; ++v) {
        if(Out[v] == 0) {
            q.push(v);
            Out[v] = -1;
        }
    }
    while(!q.empty()) {
        int v = q.front();
        q.pop();
        for(int i = 1; i <= N; ++i) {
            if(edge[i][v] == -1) continue;
            Out[i]--;
            //<i,v>有有向边
            maxt[i] = min(maxt[i], maxt[v] - edge[i][v]);
            if(Out[i] == 0) {
                q.push(i);
                Out[i] = -1;
            }
        }
    }
}
int main(){
    cin >> N >> M;
    init();
    for(int i = 1; i <= M; ++i) {
        int u,v,w;
        cin >> u >> v >> w;
        edge[u][v] = w;
        In[v]++;
        Out[u]++;
    }
    if(Get_Mint()) { 
        for(int i = 1; i <= N; ++i) {
            if(ans < mint[i]) {
                ans = mint[i];
                last = i;
            }
        }
        cout << ans << endl;
        Get_Maxt(); 
        for(int i = 1; i <= N; ++i) {
            for(int j = N; j >= 1; --j) {
                if(edge[i][j] != -1 && edge[i][j] == maxt[j] - mint[i]) {
                    cout << i << "->" << j << endl;
                }
            }
        }
    } else cout << 0 << endl;
    return 0;
}
```

## 测试点

疯狂WA测试点2和5……最后发现是两行代码弄反了qwq
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020082103435554.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

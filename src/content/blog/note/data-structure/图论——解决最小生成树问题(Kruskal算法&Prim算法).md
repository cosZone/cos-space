---
title: 图论——解决最小生成树问题(Kruskal算法&Prim算法)
link: 图论——解决最小生成树问题(Kruskal算法&Prim算法)
catalog: true
lang: cn
date: 2020-04-22 16:07:46  
subtitle: ——来自算法竞赛入门经典第2版（紫书）
tags:
- c++
- 数据结构
- 最小生成树
categories:
- 数据结构
---

上周末的蓝桥杯省模拟赛时最后一题是一道最小生成树的题目，因为恰好在慕课上刚看到这个地方，所以现学了Prim算法，解决了这个题目(大概)，赛后就打算多琢磨琢磨这一类题目。[题目链接](https://blog.csdn.net/qq_45890533/article/details/105668209)
最小生成树问题，是指给定无向图G=(V,E)，连接G中所有点，且边集是E的子集的树称为G的生成树(Spanning Tree)，而权值最小的生成树称为最小生成树(Minimal Spanning Tree，MST)。

# 一、Kruskal算法

Kruskal算法易于编写，且效率很高
紫书p356描述如下：

Kruskal算法的第一步是给所有边按照从小到大的顺序排列，这一步可以直接使用库函数qsort或者sort。接下来从小到大依次考察每条边(u, v)。

- **情况1：u和v在同一个连通分量中，那么加入(u, v)后会形成环，因此不能选择。**
- **情况2：如果u和v在不同的连通分量，那么加入(u, v)一定是最优的。** 为什么呢？下面用反证法——如果不加这条边能得到一个最优解T,则T+(u, v)一定有且只有一个环，而且环中至少有一条边(u', v')的权值大于或等于(u, v)的权值。删除该边后，得到的新树T' = T + (u, v) - (u', v')不会比T更差。因此，加入(u, v)不会比不加入差。

下面是伪代码：

```cpp
把所有边(按权值)排序，记第i小的边为e[i](1 <= i < m)
初始化MST为空
初始化连通分量，让每个点自成一个独立的连通分量
for(int i = 0; i < m; i++) {
 if(e[i].u 和 e[i].v 不在同一个连通分量) {
  把边e[i]加入MST
  合并e[i].u和e[i].v所在的连通分量
 }
}
```

在上面的伪代码中，最关键的地方在于 **“连通分量的查询与合并”** ：需要知道任意两个点是否在同一连通分量中，还需要合并这两个连通分量。
有一种简介高效的算法可以用来处理这个问题——**并查集**
此处指路大佬解释：[超有爱的并查集~](https://blog.csdn.net/niushuai666/article/details/6662911)
**将每个连通分量看作一个集合**，该集合包含了连通分量中的所有点。这些点两两相通，而具体的连通方式无关紧要。在图中，**每个点都恰好属于一个连通分量**，对应到集合表示中，即为**每个元素恰好属于一个集合**。换句话说，**图的所有连通分量可以用若干个不相交集合来表示。**
奉上自己的并查集板子

```cpp
#include <iostream>
using namespace std;
#define div 1000000007
typedef long long ll;
const int maxn = 1001;
int fa[maxn];//
inline void init(int n) {
    for (int i = 1; i <= n; i++)
        fa[i] = i;
}
int find(int x) {//查询+路径压缩 把沿途的每个节点的父节点都设为根节点
    return x == fa[x] ? x : (fa[x] = find(fa[x]));
}
inline void merge(int i, int j) {
    fa[find(i)] = find(j);//前者的父节点设为后者
}
```

有了并查集之后，Kruskal算法的完整代码便不难给出了。假设第i条边的两个端点序号和权值分别保存在u[i]，v[i]和 w[i]中，而排序后第i小的边的序号保存在r[i]中(间接排序，即排序的关键字是对象的“代号”，而不是对象本身),p为并查集

## 完整代码

```cpp
int cmp(const int i, const int j) { return w[i] < w[j]; } //间接排序函数
int find(int x) { return p[x] == x ? x : p[x] = find(p[x])} //并查集的find
int Kruskal() {
 int ans = 0;
 for(int i = 0; i < n; i++) p[i] = i; //初始化并查集
 for(int i = 0; i < m; i++) r[i] = i;
 sort(r,r+m,cmp);
 for(int i = 0; i < m; i++) {
  int e = r[i];
  int x = find(u[e]);//找出一个端点所在集合编号
  int y = find(v[e]);//找出另一个端点所在集合编号
  if(x != y) {  //若在不同集合，合并
   ans += w[e];
   p[x] = y;
  }
 }
 return ans;
}
```

## 练习题

 题号 |题目名称(英文)|备注|
|--|--|--|--|
 [hdu1863](http://acm.hdu.edu.cn/showproblem.php?pid=1863)| 畅通工程  | 最小生成树 板子题
  [hdu1879](http://acm.hdu.edu.cn/showproblem.php?pid=1879)| 继续畅通工程 | 最小生成树 板子题
 [hdu1875](http://acm.hdu.edu.cn/showproblem.php?pid=1875)|畅通工程再续|最小生成树 板子题
[洛谷P3366](https://www.luogu.com.cn/problem/P3366)| 【模板】最小生成树 |最小生成树 板子题

### 1. [hdu1863畅通工程](http://acm.hdu.edu.cn/showproblem.php?pid=1863)

> Problem Description
省政府“畅通工程”的目标是使全省任何两个村庄间都可以实现公路交通（但不一定有直接的公路相连，只要能间接通过公路可达即可）。经过调查评估，得到的统计表中列出了有可能建设公路的若干条道路的成本。现请你编写程序，计算出全省畅通需要的最低成本。
Input
测试输入包含若干测试用例。每个测试用例的第1行给出评估的道路条数 N、村庄数目M ( < 100 )；随后的 N
行对应村庄间道路的成本，每行给出一对正整数，分别是两个村庄的编号，以及此两村庄间道路的成本（也是正整数）。为简单起见，村庄从1到M编号。当N为0时，全部输入结束，相应的结果不要输出。
 Output
对每个测试用例，在1行里输出全省畅通需要的最低成本。若统计数据不足以保证畅通，则输出“?”。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
const int maxn = 105;
int N,M,cnt;
int u[maxn],v[maxn],w[maxn];
int r[maxn],fa[maxn];
bool cmp(const int r1, const int r2) {
    return w[r1] < w[r2];
}
int find(int x) {
    return fa[x] == x ? x : fa[x] = find(fa[x]);
}
int Kruskal() {
    int ans = 0;
    for(int i = 0; i < M; i++) fa[i] = i;//初始化并查集，让每个点自成一个连通分量
    for(int i = 0; i < N; i++) r[i] = i;//存储边序号
    sort(r, r+N, cmp);//将边从小到大按权值排序
    for(int i = 0; i < N; i++) {
        int e = r[i];
        int x = find(u[e]);
        int y = find(v[e]);
        if(x != y) {
            ans += w[e];
            cnt++;
            fa[x] = y;
        }
    }
    return ans;
}
int main() {
    while(cin >> N >> M) {
        cnt = 0;
        if(N == 0) break;
        for(int i = 0; i < N; i++) {
            cin >> u[i] >> v[i] >> w[i];
        }
        int ans = Kruskal();
        if(cnt != M-1) cout << "?" << endl;
        else cout << ans << endl;
    }
    return 0;
}
```

### 2.[hdu1879继续畅通工程](http://acm.hdu.edu.cn/showproblem.php?pid=1879)

这题相比上题来说，就将已经建好了的道路花费置为0即可，同时注意本题输入输出好像都不能用cincout,会超时。
> Problem Description
省政府“畅通工程”的目标是使全省任何两个村庄间都可以实现公路交通（但不一定有直接的公路相连，只要能间接通过公路可达即可）。现得到城镇道路统计表，表中列出了任意两城镇间修建道路的费用，以及该道路是否已经修通的状态。现请你编写程序，计算出全省畅通需要的最低成本。
Input
测试输入包含若干测试用例。每个测试用例的第1行给出村庄数目N ( 1< N < 100 )；随后的 N(N-1)/2 行对应村庄间道路的成本及修建状态，每行给4个正整数，分别是两个村庄的编号（从1编号到N），此两村庄间道路的成本，以及修建状态：1表示已建，0表示未建。
当N为0时输入结束。
Output
每个测试用例的输出占一行，输出全省畅通需要的最低成本。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
const int maxn = 5008;
int fa[101];
int find(int x) {
    return fa[x] == x ? x : fa[x] = find(fa[x]);
}
struct Edge {
public:
    int u, v, w;
    bool operator<(const Edge &a)const{ 
        return w < a.w;
    }
}E[maxn];

int main() {
    int N;
    while(scanf("%d", &N) != EOF) {
        int ans = 0;
        if(N == 0) break;
        int M = N*(N-1)/2;
        for(int i = 1; i <= M; ++i) {
            int flag;
            scanf("%d%d%d%d", &E[i].u, &E[i].v, &E[i].w, &flag);
            if(flag) E[i].w = 0;
        }
        for(int i = 1; i <= N; ++i) fa[i] = i;//初始化并查集，让每个点自成一个连通分量
        sort(E+1,E+1+M);//将边从小到大按权值排序
        for(int i = 1; i <= M; ++i) {
            int x = find(E[i].u);
            int y = find(E[i].v);
            if(x != y) {
                fa[x] = y;
                ans += E[i].w;
            }
        }
        printf("%d\n",ans);
    }
    return 0;
}
```

### 3.[hdu1875畅通工程再续](http://acm.hdu.edu.cn/showproblem.php?pid=1875)

先输入所有顶点，再判断每两个顶点是否可以构成合适的边
> Problem Description
相信大家都听说一个“百岛湖”的地方吧，百岛湖的居民生活在不同的小岛中，当他们想去其他的小岛时都要通过划小船来实现。现在政府决定大力发展百岛湖，发展首先要解决的问题当然是交通问题，政府决定实现百岛湖的全畅通！经过考察小组RPRush对百岛湖的情况充分了解后，决定在符合条件的小岛间建上桥，所谓符合条件，就是2个小岛之间的距离不能小于10米，也不能大于1000米。当然，为了节省资金，只要求实现任意2个小岛之间有路通即可。其中桥的价格为 100元/米。
 Input
输入包括多组数据。输入首先包括一个整数T(T <= 200)，代表有T组数据。
每组数据首先是一个整数C(C <= 100),代表小岛的个数，接下来是C组坐标，代表每个小岛的坐标，这些坐标都是 0 <= x, y <= 1000的整数。
 Output
每组输入数据输出一行，代表建桥的最小花费，结果保留一位小数。如果无法实现工程以达到全部畅通，输出”oh!”.

```cpp
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cmath>
using namespace std;
const int maxn = 5008;
typedef long long ll;
struct Point {
    int x,y;
} V[101];
struct Edge {
public:
    int u, v;
    double w;
    bool operator<(const Edge &a)const{ 
        return w < a.w;
    }
}E[maxn];
int fa[105];
int find(int x) {
    return fa[x] == -1 ? x : fa[x] = find(fa[x]);
}
int main() {
    int T;
    scanf("%d", &T);
    while(T--) {
        int N;
        scanf("%d", &N);
        for(int i = 0; i < N; ++i) {
            scanf("%d%d", &V[i].x, &V[i].y);
        }
        int k = 0;
        for(int i = 0; i < N-1; ++i) {
            for(int j = i+1; j < N; ++j) {
                double d = sqrt( (V[i].x-V[j].x)*(V[i].x-V[j].x) + 
                (V[i].y-V[j].y)*(V[i].y-V[j].y) );
                if (d <= 1000 && d >= 10) {
                    E[k].u = i;
                    E[k].v = j;
                    E[k].w = d*100;
                    k++;
                }
            }
        }
        for(int i = 0; i < N; ++i) fa[i] = -1;//初始化并查集，让每个点自成一个连通分量
        sort(E,E+k);//将边从小到大按权值排序
        double ans = 0;
        int cnt = 0;
        for(int i = 0; i < k; ++i) {
            int x = find(E[i].u);
            int y = find(E[i].v);
            if(x != y) {
                fa[x] = y;
                ans += E[i].w;
                cnt++;
            }
        }
        if (cnt == N-1) printf("%.1f\n",ans);
        else printf("oh!\n");
    }
    return 0;
}

```

### 4.[洛谷P3366【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)

板子题

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
const int maxm = 200000;
int fa[5005];//最大顶点数5000
int N,M,cnt;//顶点数 边数
struct edge {
    int u,v,w;
    bool operator<(const edge& a) const {
        return w < a.w;
    }
} E[maxm];//最大边数maxn
int find(int x) {
    return fa[x] == -1 ? x : fa[x] = find(fa[x]);
}
int Kruskal() {
    for(int i = 0; i < N; ++i) fa[i] = -1;
    int ans = 0;
    sort(E,E+M);
    for(int i = 0; i < M; ++i) {
        int x = find(E[i].u);
        int y = find(E[i].v);
        if(x != y) {
            fa[x] = y;
            ans += E[i].w;
            cnt++;
        }
    }
    if(cnt == N-1) return ans;
    else return -1;
}
int main() {
    scanf("%d%d", &N, &M);
    for(int i = 0; i < M; ++i) {
        scanf("%d%d%d", &E[i].u, &E[i].v,&E[i].w);
    }
    int ans = Kruskal();
    if(ans == -1) printf("orz\n");
    else printf("%d\n",ans);
    return 0;
}
```

# 二、Prim算法

[来自陈越姥姥的数据结构](https://www.icourse163.org/learn/ZJU-93001#/learn/content?type=detail&id=1214143639&cid=1217772500)
Prim算法基本思路——从一个根节点开始，让一棵小树长大。与Dijkstra算法相近。
Dijkstra算法伪代码：

```cpp
void Dijkstra(Vertex s) {
 while(1) {
  V = 未收录顶点中dist最小者
  if (这样的V不存在)
   break;
  collected[V] = true;//将V收录
  for(V的每个邻接点W) {
   if(collected[W] == false && dist[V] + E(V,W) < dist[W]) {
    dist[W] = dist[V]+E<V,W>;
    path[W] = V;
   } 
  }
}
```

Prim算法伪代码：

```cpp
void Prim(Vertex s) {
 while(1) {
  V = 未收录顶点中dist最小者
  if (这样的V不存在)
   break;
  将V收录进MST
  for(V的每个邻接点W) {
   if(W未被收录 && E(V,W) < dist[W]) {
    dist[W] = E<V,W>;
    parent[W] = V;
   } 
  }
}
```

## Prim算法完整代码

```cpp
double edge[maxn][maxn];//存边的权值~
int vis[maxn];//该点是否已访问过
double dist[maxn];
double ans;
double Prim() {
    for(int i = 2; i <= n; i++) {
        dist[i] = edge[1][i];//初始化dist为根结点1到所有点的距离
    }
    vis[1] = 1;////收录初始点1 vis[i] == 0表示还未被收录
    for(int i = 2; i <= n; i++) {
        int min = INF;
        int v = -1;
        for(int j = 2; j <= n; j++) {//找v————未收录顶点中dist最小者
            if(!vis[j] && dist[j] < min) {
                min = dist[j];
                v = j;
            }
        }
        if(v != -1) {//找到了v~收入MST
            vis[v] = 1;
            ans += dist[v];
            for(int j = 2;j <= n; j++) {//更新距离dist
                if(!vis[j] && edge[v][j] < dist[j]) {//当这点未被访问且到任意一点的距离比现在到树的距离小就更新
                    dist[j] = edge[v][j];
                }
            }
        }
    }
    return ans;
}
```

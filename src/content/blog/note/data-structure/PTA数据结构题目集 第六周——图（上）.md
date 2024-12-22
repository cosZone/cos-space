---
title: PTA数据结构题目集 第六周——图（上）
link: PTA数据结构题目集 第六周——图（上）
catalog: true
lang: cn
date:   2020-08-08 20:09:53 
subtitle: PTA数据结构题目集 第六周 图（上），涉及知识有图的基本表示与遍历方法（DFS/BFS），所用语言为c++。
tags:
- c++
- PTA
- 数据结构
categories:
- 题目记录
---

[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)
学习指路博客 [图](https://blog.csdn.net/qq_45890533/article/details/105475331)

# 06-图1 列出连通集 (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1281571555112456192)

>非常基础的训练，**一定要做**
>
## 题目大意

输出图中所有连通集。先输出DFS的结果，再输出BFS的结果。

## 代码

```cpp
#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;
const int maxn = 11;
int N,E,x,y;
bool visited[maxn];
int edge[maxn][maxn];
queue<int> q;
void DFS(int v) {
    visited[v] = true;
    printf(" %d", v);
    for(int i = 0; i < N; ++i) {
        if(!visited[i] && edge[v][i] == 1) 
            DFS(i);
    }
}
void BFS(int v) {
    q.push(v);
    while(!q.empty()) {
        v = q.front();
        q.pop();
        if(visited[v]) continue;
        visited[v] = true;
        printf(" %d", v);
        for(int i = 0; i < N; ++i) {
            if(!visited[i] && edge[v][i] == 1) 
                q.push(i);
        }
    }
}
int main(){
    scanf("%d %d", &N, &E);
    for(int i = 0; i < E; ++i) {
        scanf("%d %d", &x, &y);
        edge[x][y] = edge[y][x] = 1;
    }
    for(int i = 0; i < N; ++i) visited[i] = false;
    for(int i = 0; i < N; ++i) {
        if(!visited[i]){
            printf("{");
            DFS(i);
            printf(" }\n");
        }
    }
    for(int i = 0; i < N; ++i) visited[i] = false;
    for(int i = 0; i < N; ++i) {
        if(!visited[i]){
            printf("{");
            BFS(i);
            printf(" }\n");
        }
    }
    return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200720143957974.png)

# 06-图2 Saving James Bond - Easy Version (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1281571555116650496)

>可怜的007在等着你拯救，你……看着办哈；

## 代码

```cpp
#include <iostream>
#include <cstdio>
#include <cmath>
#include <queue>
using namespace std;
const int maxn = 105;
int N,D;
bool visited[maxn];
int edge[maxn][maxn];
struct Point {
    int x, y;
    bool visited;
} v[maxn],s;
double countDist(Point a, Point b) {
    return sqrt(pow((a.x-b.x),2) + pow((a.y-b.y),2));
}
bool check(Point a) {
    int s = 50 - D;
    if(abs(a.x) >= s || abs(a.y) >= s) 
        return true;
    else return false;
}
bool DFS(int i) {
    bool ans = false;
    v[i].visited = true;
    if(check(v[i])) {
        return true;
    } else {
        for(int j = 0; j < N; ++j) {
            if(!v[j].visited && countDist(v[i],v[j]) <= 1.0*D) {
                ans = DFS(j);
                if(ans) break;
            }
        }
    }
    return ans;
}
bool firstJump(int i) {
    double d = countDist(s,v[i]);
    d -= 7.5;
    return d <= D;
}
bool Save007() {
    bool ans = false;
    for(int i = 0; i < N; ++i) {
        if(!v[i].visited && firstJump(i)) {
            ans = DFS(i);
            if(ans) break;
        }
    }
    return ans;
}
int main(){
    scanf("%d %d", &N, &D);
    s.visited = false;
    s.x = s.y = 0;
    for(int i = 0; i < N; ++i) {
        scanf("%d %d", &v[i].x, &v[i].y);
        v[i].visited = false;
    }
    if(Save007()) cout << "Yes" << endl;
    else cout << "No" << endl;
    return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200720154807443.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 06-图3 六度空间 (30分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1281571555116650497)

>在听完课以后，这题的思路应该比较清晰了，不过实现起来还是颇有码量的，有时间就尝试一下。
>
## 题目大意

给你一个社交网络图，请你对每个节点计算符合“六度空间”理论的结点占结点总数的百分比。

## 代码

```cpp
#include <iostream>
#include <cstdio>
#include <cstring>
#include <queue>
using namespace std;
const int maxn = 1005;
int N,M,x,y;
bool visited[maxn];
int edge[maxn][maxn];
int BFS(int v) {
    queue<int> q;
    int cnt = 1;
    int level = 0;
    int last = v;
    int now;
    visited[v] = true;
    q.push(v);
    while(!q.empty()) {
        v = q.front();
        q.pop();
        for(int i = 1; i <= N; ++i) {
            if(!visited[i] && edge[v][i] == 1) {
                q.push(i);
                visited[i] = true;
                cnt++;
                now = i;
            }
        }
        if(v == last) {
            level++;
            last = now;
        }
        if(level == 6) break;
    }
    return cnt;
}
int main(){
    scanf("%d %d", &N, &M);
    for(int i = 1; i <= M; ++i) {
        scanf("%d %d", &x, &y);
        edge[x][y] = edge[y][x] = 1;
    }
    for(int i = 1; i <= N; ++i) {
        memset(visited, 0, sizeof(visited));
        double ratio = BFS(i) * 1.0 / N;
        printf("%d: %.2f%\n",i,ratio * 100.0);
    }
    return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200720162512662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

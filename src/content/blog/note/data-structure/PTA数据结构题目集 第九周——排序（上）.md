---
title: PTA数据结构题目集 第九周——排序（上）
link: PTA数据结构题目集 第九周——排序（上）
catalog: true
lang: cn
date:  2020-08-27 00:53:56
subtitle: PTA数据结构题目集 第九周——排序（上），涉及各种排序算法（插入排序、归并排序、堆排序等），所用语言为c++。
tags:
- c++
- PTA
- 排序算法
- 数据结构
categories:
- 题目记录
---

[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)
学习指路博客 [数据结构学习笔记＜8＞ 排序](https://blog.csdn.net/qq_45890533/article/details/108246044)、[归并排序循环实现（存用）](https://blog.csdn.net/qq_45890533/article/details/108249317)

# 09-排序1 排序 (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1289169858763866112)

>一个实验各种排序算法的平台，好好玩哈，然后去论坛晒结果 —— 实在不行可以看给出的参考代码。这是基本训练，一定要做

本题测试的各种排序算法的结果都在博客[数据结构学习笔记＜8＞ 排序](https://blog.csdn.net/qq_45890533/article/details/108246044)里边写了，这里仅给出插入排序的代码

## 代码

```cpp
#include <iostream>
#include <cstdio>
using namespace std;
typedef long long ll;
const int maxn = 100005;
const int inf  = 0x3f3f3f;
int N;
ll a[maxn];
void Insertion_Sort(ll a[], int N) {
    for(int P = 1; P < N; P++) {
        ll t = a[P];//摸下一张牌
        int i;
        for(i = P; i > 0 && a[i-1] > t; --i) 
            a[i] = a[i-1];  //移出空位 直到前面那个这个元素小于当前元素
        a[i] = t;   //新牌落位
    }
}
int main(){
    scanf("%d", &N);
    for(int i = 0; i < N; ++i) 
        scanf("%lld", &a[i]);
    Insertion_Sort(a, N);
    for(int i = 0; i < N; ++i) 
        printf(" %lld"+!i, a[i]);
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200821183558941.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# 09-排序2 Insert or Merge (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1289169858763866113)

>2014年PAT冬季考试真题，供备考的同学练练手，选做；
>
## 题目大意

现在给出整数的初始序列，以及一个序列，这是一些排序方法的多次迭代的结果，你能分辨出我们使用的是哪种排序方法吗？（插入排序还是归并排序）

## 思路

初始序列存在两个数组里，先进行插入排序在每次，在每次迭代后判断序列是否相同，若相同则再做一次迭代后输出，若一直判断不相同则是归并排序。归并排序卡了半天，用递归版的不好处理,得用循环版的，循环版归并排序看这儿：[归并排序循环实现（存用）](https://blog.csdn.net/qq_45890533/article/details/108249317)

## 代码

```cpp
#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;
typedef long long ll;
const int maxn = 110;
const int inf  = 0x3f3f3f;
int N;
ll a[maxn],A[maxn],Copya[maxn];
void swap(ll &a, ll &b){//交换a,b的值
    int tmp = a;
    a = b;
    b = tmp;
}
bool isSame(ll a[], int N) {
    for(int i = 0; i < N; ++i) 
        if(a[i] != A[i]) return false;
    return true;
}
void Merge(ll a[],ll tmp[], int s, int m, int e) {
    //将数组a的局部a[s,m-1]和a[m,e]合并到数组tmp,并保证tmp有序
    int pb = s;
    int p1 = s, p2 = m;//p1指向前一半p2指向后一半
    while (p1 <= m-1 && p2 <= e) {
        if (a[p1] <= a[p2])
            tmp[pb++] = a[p1++];
        else 
            tmp[pb++] = a[p2++];
    }
    while(p1 <= m-1) 
        tmp[pb++] = a[p1++];
    while(p2 <= e) 
        tmp[pb++] = a[p2++];
    for (int i = 0; i < e-s+1; ++i)
        a[s+i] = tmp[i];
}
void Merge_Pass(ll a[], ll b[], int N, int len) {
    //将a数组按len长度切分 归并到b
    //len为当前有序子列的长度
    int i;
    for(i = 0; i <= N - 2*len; i += 2*len) 
        //找每一对要归并的子序列 直到倒数第二对
        Merge(a, b, i, i+len, i+2*len-1); //将a
    if(i+len < N) //最后有2个子列
        Merge(a, b, i, i+len, N-1);
    else  //最后只剩1个有序子列
        for(int j = i; j < N; ++j) b[j] = a[j];
}
void Merge_Sort(ll a[], int N) {
    bool flag = false;
    int len = 1;//初始化有序子列的长度
    ll tmp[maxn];
    while(len < N) {
        Merge_Pass(a, tmp, N, len);
        len *= 2;
        if(isSame(tmp, N)) flag = true;
        else if(flag) return;
        Merge_Pass(tmp, a, N, len);
        len *= 2;
        if(isSame(a, N)) flag = true;
        else if(flag) return;
    }
}
bool Insertion_Sort(ll a[], int N) {
    bool flag = false;
    for(int P = 1; P < N; P++) {
        ll t = a[P];//摸下一张牌
        int i;
        for(i = P; i > 0 && a[i-1] > t; --i) 
            a[i] = a[i-1];  //移出空位 直到前面那个这个元素小于当前元素
        a[i] = t;   //新牌落位
        if(flag) 
            return true;
        if(isSame(a, N)) {
            flag = true;
            continue;
        }
    }
    return false;
}
int main(){
    scanf("%d", &N);
    for(int i = 0; i < N; ++i) {
        scanf("%lld", &a[i]);
        Copya[i] = a[i];
    }
    for(int i = 0; i < N; ++i) 
        scanf("%lld", &A[i]);
    if(Insertion_Sort(a, N)) {
        printf("Insertion Sort\n");
    } else {
        for(int i = 0; i < N; ++i) 
            a[i] = Copya[i];
        Merge_Sort(a, N);
        printf("Merge Sort\n");
    }
    for(int i = 0; i < N; ++i) {
        printf(" %lld"+!i, a[i]);
    }
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200827002703623.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# 09-排序3 Insertion or Heap Sort (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1289169858763866114)

>2015年考研复试上机真题，供备考的同学练练手，选做。
>
## 题目大意

跟上题差不多，不过归并变成了堆排序

## 代码

```cpp
#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;
typedef long long ll;
const int maxn = 110;
const int inf  = 0x3f3f3f;
int N;
ll a[maxn],A[maxn],Copya[maxn];
void swap(ll &a, ll &b){//交换a,b的值
    int tmp = a;
    a = b;
    b = tmp;
}
bool isSame(ll a[], int N) {
    for(int i = 0; i < N; ++i) 
        if(a[i] != A[i]) return false;
    return true;
}
void PercDown(ll a[], int N, int rt) {
    //将N个元素的数组中以a[now]为根的子堆调整为最大堆
    int father, son;
    ll tmp = a[rt];
    for(father = rt; (father*2+1) < N; father = son) {
        son = father * 2 + 1;//左儿子
        if(son != N-1 && a[son] < a[son+1]) //右儿子存在且比左儿子大
            son++;
        if(tmp >= a[son]) break;//找到该放的地方
        else a[father] = a[son];//下滤
    }
    a[father] = tmp;
}
inline void BuildHeap(ll a[], int N) {
    for(int i = N/2-1; i >= 0; --i) {
        PercDown(a, N, i);
    }
}
void Heap_Sort(ll a[], int N) {
    bool flag = false;
    BuildHeap(a, N);
    for(int i = N-1; i > 0; --i) {
        swap(a[0], a[i]);//最大堆顶a[0]与a[i]交换
        PercDown(a, i, 0);//删除后进行调整
        if(flag) return;
        if(isSame(a,N)) flag = true;
    }
}
bool Insertion_Sort(ll a[], int N) {
    bool flag = false;
    for(int P = 1; P < N; P++) {
        ll t = a[P];//摸下一张牌
        int i;
        for(i = P; i > 0 && a[i-1] > t; --i) 
            a[i] = a[i-1];  //移出空位 直到前面那个这个元素小于当前元素
        a[i] = t;   //新牌落位
        if(flag) 
            return true;
        if(isSame(a, N)) {
            flag = true;
            continue;
        }
    }
    return false;
}
int main(){
    scanf("%d", &N);
    for(int i = 0; i < N; ++i) {
        scanf("%lld", &a[i]);
        Copya[i] = a[i];
    }
    for(int i = 0; i < N; ++i) 
        scanf("%lld", &A[i]);
    if(Insertion_Sort(a, N)) {
        printf("Insertion Sort\n");
    } else {
        for(int i = 0; i < N; ++i) 
            a[i] = Copya[i];
        Heap_Sort(a, N);
        printf("Heap Sort\n");
    }
    for(int i = 0; i < N; ++i) {
        printf(" %lld"+!i, a[i]);
    }
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200827005254106.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

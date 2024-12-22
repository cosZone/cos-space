---
title: PTA数据结构题目集 第一周——最大子列和算法、二分查找
link: PTA数据结构题目集 第一周——最大子列和算法、二分查找
catalog: true
lang: cn
date: 2020-08-08 19:12:40
subtitle: PTA数据结构题目集第一周——最大子列和在线处理算法、二分查找，涉及数据结构的这些基本操作，所用语言为c++。
tags:
- c++
- PTA
- 数据结构
categories:
- 题目记录
---


[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)

# 01-复杂度1 最大子列和问题 (20分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1268385944106778624)
> 是本次课最后讲到的4种算法的实验题，属于基本要求，**一定要做**；
>
## 代码

```cpp
#include <iostream>
using namespace std;
int n, x, nowsum, maxsum;
int main() {
    cin >> n;
    for(int i = 0; i < n; ++i) {
        cin >> x;
        nowsum += x;
        if (nowsum > maxsum) {
            maxsum = nowsum;
        } else if(nowsum <= 0) {
            nowsum = 0;
        }
    }
    cout << maxsum << endl;
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020070422313462.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 01-复杂度2 Maximum Subsequence Sum (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1268385944106778625)
> 是2004年浙江大学计算机专业考研复试真题，要求略高，**选做**。；
>
## 题目大意

题目大意为找到最大子序列和，以及最大子序列的第一个和最后一个数字。
要注意若有多个最大子序列，则取索引最小的那个

## 代码

```cpp
#include <iostream>
using namespace std;
#define N 10002
int n, x, nowsum, maxsum, l, r, first,last;
int a[N];
int main() {
    bool allminus = true;
    cin >> n;
    for(int i = 0; i < n; ++i)
        cin >> a[i];
    maxsum = -1;
    for(int i = 0; i < n; ++i) {
        if (a[i] >= 0) 
            allminus = false;
        nowsum += a[i];
        if (nowsum > maxsum && nowsum >= 0) {//最大，更新maxsum和r
            maxsum = nowsum;
            r = i;
            first = l;
            last = r;
        } else if(nowsum < 0) {
            nowsum = 0;
            l = r = i+1;
        }
    }
    if (allminus) {
        cout << 0 << " " << a[0] << " " << a[n-1] << endl;
    } else cout << maxsum << " " << a[first] << " " << a[last] << endl;
    return 0;
}
```

## 测试点

测试点如下，其中5、6易错
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200704223027614.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 01-复杂度3 二分查找 (20分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1268385944106778626)
> 配合课后讨论题给出这道函数填空题，学有余力、并且会C语言编程的你可以尝试一下。你只需要提交一个函数，而不用交如main函数之类的其他函数。不会C语言的话，就研究一下课后关于二分法的讨论题吧
>
## 代码

```cpp
#include <stdio.h>
#include <stdlib.h>

#define MAXSIZE 10
#define NotFound 0
typedef int ElementType;

typedef int Position;
typedef struct LNode *List;
struct LNode {
    ElementType Data[MAXSIZE];
    Position Last; /* 保存线性表中最后一个元素的位置 */
};

List ReadInput(); /* 裁判实现，细节不表。元素从下标1开始存储 */
Position BinarySearch( List L, ElementType X );

int main()
{
    List L;
    ElementType X;
    Position P;

    L = ReadInput();
    scanf("%d", &X);
    P = BinarySearch( L, X );
    printf("%d\n", P);

    return 0;
}

/* 你的代码将被嵌在这里 */
Position BinarySearch( List L, ElementType X ) {
    if (L->Last == 0) return NotFound;
    int l, r, mid, ans;
    l = 1, r = L->Last;
    while(l <= r) {
        mid = (l + r) / 2;
        if(L->Data[mid] == X) {
            ans = mid;
            return ans;
        } else if(L->Data[mid] < X) {
            l = mid + 1;
        } else r = mid - 1;
    }
    return NotFound;
}
```

## 测试点

测试点如下，其中5易错
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200704223540100.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

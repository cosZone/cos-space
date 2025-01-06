---
title: PTA数据结构题目集 第十周——排序（下）
link: PTA数据结构题目集 第十周——排序（下）
catalog: true
lang: cn
date: 2020-08-27 21:09:12
subtitle: PTA数据结构题目集 第十周——排序（下）练习题，涉及各种排序算法的应用、结构体的排序、表排序中的环判断等，所用语言为c++。
tags:
  - c++
  - PTA
  - 数据结构
  - 排序算法
categories:
  - 题目记录
---

[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)
学习指路博客 [数据结构学习笔记＜8＞ 排序](https://blog.csdn.net/qq_45890533/article/details/108246044)

# 10-排序 4 统计工龄 (20 分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1291317697694580736)

> 非常简单的练习，想一下用哪种排序效率最高？此题一定要做；

ps:灰常简单，都不想排序了【狗头保命】

## 代码

```cpp
#include <iostream>
#include <cstdio>
using namespace std;
typedef long long ll;
#define div 1000000007
const int maxn = 100005;
const int inf  = 0x3f3f3f;
int N, x;
int a[55];
int main(){
    cin >> N;
    for(int i = 0; i < N; ++i) {
        cin >> x;
        a[x]++;
    }
    for(int i = 0; i <= 50; ++i)
        if(a[i])
            cout << i << ":" << a[i] << endl;
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200827010535557.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# 10-排序 5 PAT Judge (25 分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1291317697694580737)

> 2014 年 PAT 春季考试真题，供备考的同学练练手；## 题目大意

## 题目大意

PAT 的排名列表从状态列表中生成，该列表显示提交的分数。为 PAT 生成排名列表。给你 N 名用户、K 个问题、M 个提交，最后给出榜单
注意：

- 排名列表必须按排名的递增顺序打印。
- 总分相同的排名相同
- 相同排名的用户，按完全解决的问题数量降序输出。如果仍相同，则按其 ID 的打印顺序增加。
- -1 表示没有编译通过，但-1 算 0 分而不是没有提交。
- 对于那些提交的全部编译没有通过或从未提交的人，不得显示在排名列表中。保证至少有一个用户可以在排名列表中显示。

## 思路

注意几个坑，如果编译未通过有 0 分，但不一定能显示在榜单上，因为如果所有题都编译未通过不可以显示，但若是编译通过有 0 分则算提交

## 代码

```cpp
#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <algorithm>
using namespace std;
typedef long long ll;
#define div 1000000007
const int maxn = 1000005;
const int inf  = 0x3f3f3f;
int N,K,M,cnt;//用户总数 问题总数 提交总数
int p[7];//p[i]表示第i个问题的满分
struct User{
    int id, sum;//id 总分
    int acnum, rank;//完全解决的数量 排名
    bool flag;//是否能显示在榜单中
    int s[7];//每个问题的分数 -1为未提交
    User():sum(0),acnum(0),flag(false) {
        for(int i = 1; i <= 6; ++i) s[i] = -2;//这里-2是为了方便比较
    }
    bool operator<(const User& u) {
        if(flag != u.flag) return flag > u.flag;
        else if(sum != u.sum) return sum > u.sum;
        else if(acnum != u.acnum) return acnum > u.acnum;
        else if(id != u.id) return id < u.id;
    }
} U[maxn];
bool cmp(User& u1, User& u2) {

}
int main(){
    cin >> N >> K >> M;
    for(int i = 1; i <= N; ++i) U[i].id = i;
    for(int i = 1; i <= K; ++i) {
        cin >> p[i];
    }
    for(int i = 0; i < M; ++i) {//每个提交
        int id, num, score;
        cin >> id >> num >> score;
        if(U[id].s[num] == p[num]) continue;
        if(score >= U[id].s[num]) {//这个提交使分数更高
            if(score == -1) //编译未通过 算零分
                U[id].s[num] = 0;
            else {
                U[id].flag = true;
                U[id].s[num] = score;
            }
        }
    }
    for(int i = 1; i <= N; ++i) {//统计ac数、总分、flag等
        for(int j = 1; j <= K; ++j) {
            if(U[i].s[j] != -2) {
                U[i].sum += U[i].s[j];
                if(U[i].s[j] == p[j]) U[i].acnum++;
            }
        }
        if(U[i].flag) //有分的才参加排名
            cnt++;
    }
    sort(U+1, U+N+1);
    U[1].rank = 1;
    for(int i = 2; i <= cnt; ++i) {
        if(U[i].sum == U[i-1].sum) {
            U[i].rank = U[i-1].rank;
        } else U[i].rank = i;
    }
    for(int i = 1; i <= cnt; ++i) {
        printf("%d %05d %d", U[i].rank, U[i].id, U[i].sum);
        for(int j = 1; j <= K; ++j) {
            if(U[i].s[j] == -2) printf(" -");
            else printf(" %d", U[i].s[j]);
        }
        printf("\n");
    }
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020082702231490.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# 10-排序 6 Sort with Swap(0, i) (25 分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1291317697694580738)

> 2013 年免试研究生上机考试真题，需要思考一下，想通了就很容易 —— 于是有时间就想想吧~ 实在想不出也不要紧，最后一次课会专门讲的。

没做出来，看的陈越姥姥的讲解

## 题目大意

给定 N 个数字的排列，如何仅利用与 0 交换达到排序目的。N 个数字的排列由若干个独立的环组成。

## 思路

环分 3 种

- **单元环**：只有 1 个元素：不需要交换
- **环里 n 个元素，包括 0**：需要**n-1 次**交换
- **环里有 n 个元素，不包括 0**：先把 0 换到环里 1 次，再进行(n+1)-1 次交换——一共是**n+1 次**交换

设共有 C 个环，C 个环的元素总数为 S，则

- 若 0 在单元环中，即剩下的所有有 n~i~个元素的环交换次数都为 n~i~+1 次，又因为 n~i~加起来为 S，总交换次数为 S+C
- 若 0 不在单元环中，即有一个环交换次数为 n~0~-1，剩下的 C-1 个有 n~i~个元素的环交换次数都为 n~i~+1 次，又因为 n~i~加起来为 S，总交换次数为 S+C-1-1 = S+C-2

## 代码

```cpp
#include <iostream>
#include <cstdio>
#include <cmath>
#include <cstring>
#include <string>
#include <algorithm>
using namespace std;
typedef long long ll;
#define div 1000000007
const int maxn = 1000005;
const int inf  = 0x3f3f3f;
int a[maxn];//当a[i] = i是说明这个元素放对了地方
int N,S,C;//S为环中元素总数 C为环的个数
bool flag;
void swap(int& a, int& b) {
    int t = a;
    a = b;
    b = t;
}
int main(){
    cin >> N;
    for(int i = 0; i < N; ++i) {
        cin >> a[i];
    }
    if(a[0] == 0) flag = true;
    for(int i = 0; i < N; ++i) {
        if(a[i] !=  i) {
            C++;
            while(a[i] != i) {
                swap(a[i], i);
                S++;
            }
        }
    }
    if(flag) cout << S+C << endl;
    else cout << S+C-2 << endl;
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200827210802817.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

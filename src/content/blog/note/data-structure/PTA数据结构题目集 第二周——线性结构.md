---
title: PTA数据结构题目集 第二周——线性结构
link: PTA数据结构题目集 第二周——线性结构
catalog: true
lang: cn
date: 2020-08-08 19:24:56 
subtitle: PTA数据结构题目集 第二周——线性结构，涉及知识为链表的一些基本操作如合并、反转等。所用语言为c++。
tags:
- c++
- PTA
- 数据结构
categories:
- 题目记录
---

[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)
学习笔记指路博客  [线性表](https://blog.csdn.net/qq_45890533/article/details/104528176)、[堆栈](https://blog.csdn.net/qq_45890533/article/details/104546450)

# 02-线性结构1 两个有序链表序列的合并 (15分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1271415149946912768)
>这是一道C语言函数填空题，训练最基本的链表操作。如果会用C编程的话，**一定要做**；

## 代码

```cpp
#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;
typedef struct Node *PtrToNode;
struct Node {
    ElementType Data;
    PtrToNode   Next;
};
typedef PtrToNode List;

List Read(); /* 细节在此不表 */
void Print( List L ); /* 细节在此不表；空链表将输出NULL */

List Merge( List L1, List L2 );

int main()
{
    List L1, L2, L;
    L1 = Read();
    L2 = Read();
    L = Merge(L1, L2);
    Print(L);
    Print(L1);
    Print(L2);
    return 0;
}

/* 你的代码将被嵌在这里 */
List Merge( List L1, List L2 ) {
    List p1,p2,p3,T;
    T = (List) malloc(sizeof(struct Node));
    p3 = T;
    p1 = L1->Next;
    p2 = L2->Next;
    while (p1 && p2) {  //p1和p2都存在时
        if (p1->Data <= p2->Data) {
            p3->Next = p1;
            p3 = p3->Next;
            p1 = p1->Next;
        } else {
            p3->Next = p2;
            p3 = p3->Next;
            p2 = p2->Next;
        }
    }
    if (p1) {//哪个还存在哪个后边的就全接到p3上
        p3->Next = p1;
    } else p3->Next = p2;
    L1->Next = NULL;
    L2->Next = NULL;
    return T;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200704224117440.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 02-线性结构2 一元多项式的乘法与加法运算 (20分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1271415149946912769)

>这是一道C语言函数填空题，训练最基本的链表操作。如果会用C编程的话，**一定要做**；

## 思路

 **思路:** 用带头结点的链表存储,
 **加法运算时:** 若p1和p2(加法的两链表指针)指数比较后有一方较大，则将那一方直接放到p3中(尾插)，然后较大方的指针后移，若指数相同则**合并同类项**后再插入，注意若系数为0则不将其插入直接两指针后移，最后若还有一方后边有则直接接到L3后，**最后要检查L3为不为空，若为空则插入零多项式。**
**乘法运算时：** 先用L1中的每一项乘L2的第一项得一个多项式，再用L2中从第二项开始的每一项乘以L1一整个多项式(边乘边比较并插入),或利用加函数(但我用的时候超时了…所以没用)，**最后也要检查L3为不为空，若为空则插入零多项式**
ps：合并同类项的时候若系数合成0了，要删掉！

## 代码

```cpp
#include <iostream>
using namespace std;
typedef int ElementType;
typedef struct LNode* List;
struct LNode {
    ElementType factor; //系数
    ElementType exmt; //指数
    List next;
};
void Make_EmptyList(List Head) {
    Head = new LNode;
    Head->exmt = 0;
    Head->factor = 0;
    Head->next = NULL;
}
void E_Insert(List Head, ElementType f, ElementType e) {//尾插法插入
    if(!Head) {
        Make_EmptyList(Head);
    }
    List s = Head;
    while (s->next) {//保证s是最后一个
        s = s->next;
    }
    List p = new LNode;
    p->factor = f;
    p->exmt = e;
    p->next = NULL;
    s->next = p;
}
void H_Insert(List Head, ElementType f, ElementType e) {//头插法插入
    if(!Head) {
        Make_EmptyList(Head);
    }
    List p = new LNode;
    p->factor = f;
    p->exmt = e;
    p->next = Head->next;
    Head->next = p;
}
void PrintList(List Head) {
    List p = Head->next;
    cout << p->factor << " " << p->exmt;
    p = p->next;
    while (p) {
        cout << " " << p->factor << " " << p->exmt;
        p = p->next;
    }
    cout << endl;
}
void Clear_List(List Head) {
    List p1 = Head->next;
    while(p1){
        List p2 = p1->next;
        delete p1;
        p1 = p2;
    }
}
List AddList(List L1, List L2) {
    if (!L1->next) return L2;
    if (!L2->next) return L1;
    List A = new LNode;
    A->next = NULL;
    List p1 = L1->next;
    List p2 = L2->next;
    if(p1->exmt == 0 && p1->factor == 0) return L2;
    if(p2->exmt == 0 && p2->factor == 0) return L1;
    List p3 = A;
    while (p1 && p2) {
        if (p1->exmt > p2->exmt) {
            if(p1->factor != 0) 
                E_Insert(A, p1->factor, p1->exmt);
            p1 = p1->next;
        }
        else if (p1->exmt < p2->exmt) {
            if(p2->factor != 0) 
                E_Insert(A, p2->factor, p2->exmt);
            p2 = p2->next;
        } else {    //p1->exmt == p2->exmt
            int f = p1->factor + p2->factor;
            int e = p1->exmt;
            if(f != 0) 
                E_Insert(A, f, e);
            p1 = p1->next;
            p2 = p2->next;
        }
    }
    while (p3->next) {
        p3 = p3->next;
    }
    if (p1) {//哪个还存在哪个后边的就全接到p3上
        p3->next = p1;
    } else p3->next = p2;
    if(!A->next) {
        E_Insert(A, 0, 0);
    }
    return A;
}
List MultiplyList(List L1, List L2) {
    List L3 = new LNode;
    L3->next = NULL;
    List p1 = L1->next;
    List p2 = L2->next;
    List p3 = L3->next;
    if (!p1 || !p2) {
        E_Insert(L3, 0, 0);
        return L3;
    }
    while (p1) {     //L1中的每一项乘L2的第一项
        int f, e;
        f = p1->factor * p2->factor;
        e = p1->exmt + p2->exmt;
        if(f != 0)
            E_Insert(L3, f, e);
        p1 = p1->next;
    }
    // L2中的每一项乘以L1中一整个多项式
    while (p2->next) {   //L2中的每项p2
        p1 = L1->next;
        p2 = p2->next;
        while (p1) {     //L1中的每一项 * p2
            int f, e;
            f = p1->factor * p2->factor;
            e = p1->exmt + p2->exmt;
            if(f == 0) {
                p1 = p1->next;
                continue;
            }
            p3 = L3;
            while (p3->next && p3->next->exmt > e) {
                p3 = p3->next;
            }
            List np = p3->next;//np->exmt <= e
            if (!np) {
                np = new LNode;
                np->exmt = e;
                np->factor = f;
                np->next = NULL;
                p3->next = np;
            }
            else if (np->exmt < e) {
                List p = new LNode;
                p->exmt = e;
                p->factor = f;
                p->next = np;
                p3->next = p;
            }
            else {
                np->factor += f;
                if(np->factor == 0) {//合并同类项后为0 删除这个
                    p3->next = np->next;
                    delete np;
                }
            } //np->exmt == e
            p1 = p1->next;
        }
    }
    if(!L3->next) {
        E_Insert(L3, 0, 0);
    }
    return L3;
}
int main() {
    List L1, L2, L3, L4;
    int n1, n2, f, e;
    cin >> n1;
    L1 = new LNode;
    L1->next = NULL;
    L2 = new LNode;
    L2->next = NULL;
    L3 = new LNode;
    L3->next = NULL;
    L4 = new LNode;
    L4->next = NULL;
    for (int i = 0; i < n1; ++i) {
        cin >> f >> e;
        E_Insert(L1, f, e);
    }
    cin >> n2;
    for (int i = 0; i < n2; ++i) {
        cin >> f >> e;
        E_Insert(L2, f, e);
    }
    L3 = MultiplyList(L1, L2);
    L4 = AddList(L1, L2);
    PrintList(L3);
    PrintList(L4);
    return 0;
}
```

## 测试点

测试点如下，虽然少但却卡了我半天2333
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200704225608967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 02-线性结构3 Reversing Linked List (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1271415149946912770)

>根据某大公司笔试题改编的2014年春季PAT真题，**不难，可以尝试；**
>
## 题目大意

给定一个常量K和链表L,你应该反转L上每K个元素
例如，给定L为 1→2→3→4→5→6
如果K=3，然后必须输出 3→2→1→6→5→4
如果K=4，必须输出 4→3→2→1→5→6.
输入规格：
每个输入文件包含一个测试用例。对于每个样例 **，第一行包含第一个结点的地址、所有结点数N (≤10^5),一个正K (≤N)它是要反转的子列表的长度。** 节点的地址是5位非负整数，NULL由-1表示。
然后是N行，每行描述如下格式：Address Data Next
**其中Address是节点的位置，Data是整数，Next是下一个节点的位置。**
输出规格：
对于每种情况，输出生成的有序链接列表。每个节点占据一条线，并且以与输入相同的格式打印。

示例输入：
>00100 6 4
00000 4 99999
00100 1 12309
68237 6 -1
33218 3 00000
99999 5 68237
12309 2 33218

示例输出：

>00000 4 33218
33218 3 12309
12309 2 00100
00100 1 99999
99999 5 68237
68237 6 -1

## 思路

用结构体存数据，用数组存储下标索引，翻转时只需翻转数组元素，可利用algorithm库中的reverse函数

## 代码

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
#define maxsize 100002
struct LNode {
    int Data;
    int Next;
}a[maxsize];
int list[maxsize];//每个结点的地址
int Head,N,K,p;//第一个节点地址,所有结点数,翻转子序列长度

int main() {
    cin >> Head >> N >> K;
    list[0] = Head;
    for(int i = 0; i < N; ++i) {
        int index, data, next;
        cin >> index >> data >> next;
        a[index].Data = data;
        a[index].Next = next;
    }
    p = a[Head].Next;
    int sum = 1;
    while(p != -1) {
        list[sum++] = p;
        p = a[p].Next;
    }
    int j = 0;
    while(j + K <= sum) {
        reverse(&list[j], &list[j+K]);
        j = j + K;
    }
    for(int i = 0; i < sum-1; ++i) {
        int id = list[i];//第i个结点的索引
        printf("%05d %d %05d\n", id, a[id].Data, list[i+1]);
    }
    printf("%05d %d -1\n", list[sum-1], a[list[sum-1]].Data);
   return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200705001657198.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 02-线性结构4 Pop Sequence (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1271415149946912771)

>是2013年PAT春季考试真题，考察队堆栈的基本概念的掌握，**应可以一试**。
>
## 题目大意

给定一个可以保留最多M个数的堆栈M。放入N个数字1、2、3、...，N并随机弹出。你应该告诉给定的数字序列是否可能是堆栈的弹出序列。例如，如果M是5,N是7,我们可以从堆栈中获取1、2、3、4 、5、6、7,但不是3、2、1、7、5、6、4
输入规格：
每个输入文件包含一个测试用例。对于每个情况，第一行包含 3 个数字（所有数字不超过 1000）
M（堆栈的最大容量），N（放入序列的长度），以及K（要检查的弹出序列数）。
**接下来K行，每行包含一个含N个数字的弹出序列**。行中的所有数字都用空格分隔。
输出规格：对于每个弹出序列，如果确实是堆栈的可能弹出序列，则用一行"YES"打印，如果不是，则打印为"否"。

示例输入：
>5 7 5
1 2 3 4 5 6 7
3 2 1 7 5 6 4
7 6 5 4 3 2 1
5 6 4 3 7 2 1
1 7 6 5 4 3 2

示例输出：
>YES
>NO
>NO
>YES
>NO

## 思路

处理每个序列时，先将1压入堆栈，每读入一个数x,将其与栈顶元素比较，若大于栈顶元素则压入直到x-1,若等于栈顶元素，直接弹出，若小于栈顶元素则直接false。若栈为空了，则需要压入一个数，若溢出了，则也是false

## 代码

```cpp
#include <iostream>
#include <cstring>
using namespace std;
#define maxsize 100002
int s[maxsize];//堆栈 
int top;//栈顶元素下标  0的时候为空堆栈
int M, N, K;//栈容量，序列长度，几个序列
void s_clear() {
    top = 0;
    memset(s, 0, maxsize);
}
int s_pop() {
    int x = s[top];
    s[top] = 0;
    top--;
    return x;
}
void s_push(int x) {
    top++;
    s[top] = x;
}
bool judge() {
    bool ans = true;
    int k = 1;
    for (int i = 0; i < N; ++i) {
        int x;
        cin >> x;
        if (top == 0) {//堆栈为空
            s_push(k++);
        }
        if (x < s[top]) {
            ans = false;
        } else if (x == s[top]) {
            s_pop();
        }  else {   //若大于栈顶元素
            while (k <= x - 1) {
                s_push(k++);
            }
            s_push(k++);
            if (top > M) ans = false;
            s_pop();
        }
        if (k > N + 1) ans = false;
    }
    return ans;
}
int main() {
    cin >> M >> N >> K;
    for (int i = 0; i < K; ++i) {
        s_clear();
        if (judge()) cout << "YES" << endl;
        else cout << "NO" << endl;
    }
    return 0;
}
```

## 测试点

测试点如下，一次过了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200705142443307.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

---
title: PTA数据结构题目集 第三周——栽树（二叉树等）
link: PTA数据结构题目集 第三周——栽树（二叉树等）
catalog: true
lang: cn
date:  2020-09-05 22:39:22 
subtitle: PTA数据结构题目集 第三周——栽树（二叉树等），涉及知识为二叉树的遍历方法和递归判断树的同构。所用语言为c++。
tags:
- c++
- PTA
- 数据结构
categories:
- 题目记录
---

[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)
学习指路博客 [二叉树](https://blog.csdn.net/qq_45890533/article/details/104870234)、[队列](https://blog.csdn.net/qq_45890533/article/details/104600930)

# 03-树1 树的同构 (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1274008636207132672)

>小白专场会做详细讲解，基本要求，**一定要做**
>**题目大意:给定两棵树，请你判断它们是否是同构的。**
>
## 思路

 1.二叉树的表示
  数组存储结构体，结构体含数据、左右孩子的下标（Null代表-1）
2.建二叉树
返回根节点下标
3.同构判断
利用递归。若R1、R2同时为空，返回true。若其中一个为空，返回false。若根节点元素就不相同，则返回false。然后进行左右子树的判断，若两个左子树都为空，则判断右子树是否同构。若两个左子树都不为空且元素相同，不用交换直接判断，否则交换判断。

## 代码

```cpp
#include <iostream>
using namespace std;
#define maxsize 11
#define Null -1
typedef int Tree;
struct TNode {
    char data;
    Tree left,right;
}T1[maxsize], T2[maxsize];
Tree BuildTree(struct TNode T[]){
    int N,root;
    char l,r;
    bool isroot[maxsize];
    root = Null;
    scanf("%d", &N);
    if(N) {
        for(int i = 0; i < N; ++i) isroot[i] = true;
        getchar();
        for(int i = 0; i < N; ++i) {
            scanf("%c %c %c", &T[i].data, &l, &r);
            getchar();
            if(l != '-') {
                T[i].left = l -'0';
                isroot[T[i].left] = false;
            } else T[i].left = Null;
            if(r != '-') {
                T[i].right = r -'0';
                isroot[T[i].right] = false;
            } else T[i].right = Null;
        }
        for(int i = 0; i < N; ++i) 
            if(isroot[i]) {
                root = i;
                break;
            }
    }
    return root;
}
bool judge(Tree R1, Tree R2) {
    if(R1 == Null && R2 == Null)    
        return true;    //两个都为空
    if((R1 == Null && R2 != Null) || (R1 != Null && R2 == Null))
        return false;   //其中一个为空
    if(T1[R1].data != T2[R2].data)
        return false;   //根节点元素就不一样
    //两个左子树都为空，则判断右子树是否同构
    if(T1[R1].left == Null && T2[R2].left == Null) 
        return judge(T1[R1].right, T2[R2].right);
    //两个左子树都不为空且元素相同，不用交换
    if((T1[R1].left != Null) && (T2[R2].left != Null) 
            && (T1[T1[R1].left].data == T2[T2[R2].left].data))
        return judge(T1[R1].left, T2[R2].left) && 
            judge(T1[R1].right, T2[R2].right);
    else {//交换左右子树，判断
        return judge(T1[R1].left, T2[R2].right) && 
               judge(T1[R1].right, T2[R2].left);
    }
}
int main() {
    Tree R1, R2;
    R1 = BuildTree(T1);
    R2 = BuildTree(T2);
    if(judge(R1, R2)) 
        cout << "Yes" << endl;
    else cout << "No" << endl;
    return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200705220719730.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 03-树2 List Leaves (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1274008636207132673)

>训练建树和遍历基本功，**一定要做**
>
## 题目大意

给定一棵树，你应该按自上而下的顺序列出所有的叶子结点，从左到右。

## 思路

**按自上到下，从左往右的顺序输出叶子结点的，则需要进行层次遍历，整体代码与3-1大致相同**

```cpp
#include <iostream>
#include <queue>
using namespace std;
#define maxsize 11
#define Null -1
typedef int Tree;
int cnt;
struct TNode {
    int data;
    Tree left,right;
}T1[maxsize];
Tree BuildTree(struct TNode T[]){
    int N,root;
    char l,r;
    bool isroot[maxsize];
    root = Null;
    scanf("%d", &N);
    if(N) {
        for(int i = 0; i < N; ++i) isroot[i] = true;
        getchar();
        for(int i = 0; i < N; ++i) {
            scanf("%c %c", &l, &r);
            getchar();
            if(l != '-') {
                T[i].left = l -'0';
                isroot[T[i].left] = false;
            } else T[i].left = Null;
            if(r != '-') {
                T[i].right = r -'0';
                isroot[T[i].right] = false;
            } else T[i].right = Null;
        }
        for(int i = 0; i < N; ++i) 
            if(isroot[i]) {
                root = i;
                break;
            }
    }
    return root;
}
void LevelOrderTraversal(Tree R) {
    queue<Tree> q; //保存暂不访问的节点
    if(R == Null) return;
    q.push(R);
    while(!q.empty()) {
        Tree R1 = q.front();
        q.pop();
        if(T1[R1].left == Null && T1[R1].right == Null) {//为叶子结点
            if(cnt != 0) {
                printf(" %d", R1);
            } else printf("%d",R1);
            cnt++;
        } 
        if(T1[R1].left != Null) {
            q.push(T1[R1].left);
        }
        if(T1[R1].right != Null) {
            q.push(T1[R1].right);
        }
    }

}
int main() {
    int N;
    Tree R1, R2;
    R1 = BuildTree(T1);
    LevelOrderTraversal(R1);
    return 0;
}
```

测试点如下，一次过
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020070613123015.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

# 03-树3 Tree Traversals Again (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1274008636207132674)

>是2014年秋季PAT甲级考试真题，稍微要动下脑筋，想通了其实程序很基础，**建议尝试**

## 题目大意

**给定push序列和pop序列即该二叉树的先序遍历和中序遍历序列，求后序遍历序列**。

## 思路

可用递归实现！先将两个序列搞出来，还原一棵二叉树，再进行后序遍历。

```cpp
#include <iostream>
#include <stack>
#include <queue>
using namespace std;
#define maxsize 35
#define Null -1
int N, x, pcnt,icnt,cnt;
typedef int Tree;
struct TNode {
    int data;
    Tree left,right;
}T1[maxsize];
string o;
stack<char> s;
int c2i(char ch) {
    return ch - '0';
}
Tree Rebuild(string pre,string in) {  //已知前序和中序，求这棵树
    Tree R;
    if(pre.empty() && in.empty()) return Null;
    R = c2i(pre[0]);
    int l, r, Rindex,len;
    len = pre.length();
    Rindex = in.find(pre[0],0); //中序遍历中根节点的下标
    l = Rindex;  //左子树序列的长度
    r = len - 1 - Rindex;  //右子树序列的长度
    if (Rindex != 0)     //存在左子树
        T1[R].left = Rebuild(pre.substr(1,l), in.substr(0, l));
    else T1[R].left = Null;
    if (Rindex != len-1)   //存在右子树 
        T1[R].right = Rebuild(pre.substr(Rindex + 1, r), in.substr(Rindex + 1, r));
    else T1[R].right = Null;
    return R;
}
void PostOrderTraversal(Tree R) {
    if (R == Null) return;
    PostOrderTraversal(T1[R].left);
    PostOrderTraversal(T1[R].right);
    if(cnt == 0) cout << R;
    else cout << " " << R;
    cnt++;
}
int main() {
    string preod,inod;
    char ch;
    cin >> N; 
    getchar();
    int n = 2*N;
    for(int i = 0; i < n; ++i) {
        cin >> o;
        if(o == "Push") {   //前序
            cin >> x;
            ch = x + '0';
            s.push(ch);
            preod = preod + ch;
        } else {    //中序
            inod = inod + s.top();
            s.pop();
        }
        getchar();
    }
    Tree R1;
    R1 = Rebuild(preod, inod);
    PostOrderTraversal(R1);
    cout << endl;
    return 0;
}
```

## 测试点

测试点如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706145014478.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70)

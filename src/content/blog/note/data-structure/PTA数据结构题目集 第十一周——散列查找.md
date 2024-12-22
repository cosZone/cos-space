---
title: PTA数据结构题目集 第十一周——散列查找
link: PTA数据结构题目集 第十一周——散列查找
catalog: true
lang: cn
date:  2020-09-05 22:39:22 
subtitle: PTA数据结构题目集 第十一周——散列查找练习题，涉及散列查找的应用、KMP等，所用语言为c++。
tags:
- c++
- PTA
- KMP
- 数据结构
- 散列查找
categories:
- 题目记录
---

[题目集总目录](https://blog.csdn.net/qq_45890533/article/details/107131440)
学习指路博客 [数据结构学习笔记＜9＞ 散列查找
](https://blog.csdn.net/qq_45890533/article/details/108269198)

# 11-散列1 电话聊天狂人 (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1294124786527993856)

>一定要做。如果不知道怎么下手，可以看“小白专场”，将详细给出C语言实现的方法

## 思路

散列查找，插入的时候若键值已存在改改操作就好，直接用之前的模板

## 代码

```cpp
#include <iostream>
#include <cmath>
#include <utility>
using namespace std;
const int MaxSize = 100000;
typedef int Index;//散列后的下标
//散列单元状态类型，分别对应：有合法元素、空单元、有已删除元素
typedef enum {Legitimate, Empty, Deleted} EntryType;
struct Person {
    string str;
    int num;
    bool operator!=(const Person& p) {
        return str != p.str;
    }
} per;
typedef Person DataType;//数据的类型
struct HashNode {   //散列表单元类型
    DataType data;      //存放元素
    EntryType flag;     //单元状态
};
struct HashTable {  //散列表类型
    int TableSize;      //表长
    HashNode *Units;    //存放散列单元的数组
};
typedef HashTable *ptrHash;
//返回大于N且不超过MaxSize的最小素数，用于保证散列表的最大长度为素数
int NextPrime(int N) {
    int i, p = (N%2) ? N+2 : N+1;//从大于N的下一个奇数p开始
    while(p <= MaxSize) {
        for(i = (int)sqrt(p); i > 2; i--) 
            if(!(p %i)) break;//不是素数
        if(i == 2) break;//for正常结束，是素数
        else p += 2;//试探下一个奇数
    }
    return p;
}
//创建一个长度大于TableSize的空表。（确保素数）
ptrHash CreateTable(int TableSize) {
    ptrHash H;
    int i;
    H = new HashTable;
    H->TableSize = NextPrime(TableSize);
    H->Units = new HashNode[H->TableSize];
    for(int i = 0; i < H->TableSize; ++i) 
        H->Units[i].flag = Empty;
    return H;
}
//返回经散列函数计算后的下标 
Index Hash(DataType Key, int TableSize) { 
    unsigned int h = 0; //散列函数值，初始化为0
    string str = Key.str;
    int len = str.length();
    for(int i = 0; i < len; ++i) 
        h = (h << 5) + str[i];
    
    return h % TableSize;
}
//查找Key元素,这里采用平方探测法处理冲突
Index Find(ptrHash H, DataType Key) {
    Index nowp, newp;
    int Cnum = 0;//记录冲突次数
    newp = nowp = Hash(Key, H->TableSize);
    //若该位置的单元非空且不是要找的元素时发生冲突
    while(H->Units[newp].flag != Empty && H->Units[newp].data != Key) {
        ++Cnum;//冲突增加一次
        if(++Cnum % 2) {
            newp = nowp + (Cnum+1)*(Cnum+1)/4;//增量为+i^2,i为(Cnum+1)/2
            if(newp >= H->TableSize)
                newp = newp % H->TableSize;
        } else {
            newp = nowp - Cnum*Cnum/4;//增量为-i^2,i为Cnum/2
            while(newp < 0)
                newp += H->TableSize;
        }
    }
    return newp;//返回位置，该位置若为一个空单元的位置则表示找不到
}
//插入Key到表中
bool Insert(ptrHash H, DataType Key) {
    Index p = Find(H, Key);
    if(H->Units[p].flag != Legitimate) {
        H->Units[p].flag = Legitimate;
        Key.num = 1;
        H->Units[p].data = Key;
        return true;
    } else {//该键值已存在
        H->Units[p].data.num++;
        return false;
    }
    
}
int main() {
    int N;
    cin >> N;
    N *= 2;
    ptrHash H = CreateTable(N+1);
    for(int i = 0; i < N; ++i) {
        cin >> per.str;
        Insert(H, per);
    }
    string minstr;
    int maxnum = 0;
    int sum = 0;
    for(int i = 0; i < H->TableSize; ++i) {
        HashNode h = H->Units[i];
        if(h.flag != Legitimate) continue;
        if(h.data.num > maxnum) {//有更狂的
            sum = 1;
            minstr = H->Units[i].data.str;
            maxnum = H->Units[i].data.num;
        } else if(h.data.num == maxnum) {
            sum++;
            if(h.data.str < minstr) minstr = h.data.str;
        }
    }
    if(sum == 1) {
        cout << minstr << ' ' << maxnum << endl;
    } else cout << minstr << ' ' << maxnum << ' ' << sum << endl;
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829162852764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# 11-散列2 Hashing (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1294124786527993857)

>2014年考研上机复试真题，比较直白，一定要做；
>
## 思路

有几个坑，1不算素数，如果M为1的话要特判。这题因为没有删除操作直接输出下标，所以只要维护一个数组标记是否存过数。

## 代码

```cpp
#include <iostream>
#include <cmath>
using namespace std;
const int maxn = 100005;
typedef long long ll;
int TableSize;
bool a[maxn];
bool isPrime(int m) { 
    if(m <= 1) return false; 
    int k = (int)sqrt(m);
    for(int i = 2; i <= k; ++i) {
        if(m % i == 0) return false;
    }
    return true;
}
int NextPrime(int m) {
    if(m % 2 == 0 || m == 1)
        m++;
    while(!isPrime(m)) m += 2;
    return m;
}
int Hash(int x) {
    return x % TableSize;
}
void Insert(int x) {
    int p = Hash(x);
    if(!a[p]) { //该位置没有元素
        a[p] = true;
        cout << p;
    } else {
        int newp = p;
        int i;
        for(i = 1; i <= TableSize; ++i) {
            newp = (p+i*i) % TableSize;
            if(!a[newp]) {
                a[newp] = true;
                cout << newp;
                return;
            }
        }
        cout << '-';
    }
}
int main() {
    int M, N, x;
    cin >> M >> N;
    TableSize = NextPrime(M);
    for(int i = 0; i < N; ++i) {
        cin >> x;
        Insert(x);
        if(i == N-1) cout << endl;
        else cout << ' ';
    }
    return 0;
}

```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829190732464.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# 11-散列3 QQ帐户的申请与登陆 (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1294124786527993858)

> 数据结构教材中的练习题，可以用散列，也可以用排序，有兴趣+有时间的，建议两种都试一下。选做；

## 题目大意

实现QQ新帐户申请和老帐户登陆的简化版功能。主要就是判断账号存在与否以及密码是否对应

## 思路

一开始用常规散列查找，移位法和平方探测法后两个样例一直错误，于是改成了用STL中map来替代…

## 代码

用STL中的map做的话，非常简洁

```cpp
#include <iostream>
#include <string>
#include <map>
using namespace std;
int main() {
    map<string, string> user;//账号密码
    int N;
    string o, us, pw;
    cin >> N;
    for(int i = 0; i < N; ++i) {
        cin >> o >> us >> pw;
        if(o == "L") {//Login
            if(user.find(us) == user.end()) 
                cout << "ERROR: Not Exist" << endl;
            else if(user[us] == pw) 
                cout << "Login: OK" << endl;
            else cout << "ERROR: Wrong PW" << endl;
        } else if(o == "N") {//New
            if(user.find(us) != user.end()) 
                cout << "ERROR: Exist" << endl;
            else { 
                user[us] = pw;
                cout << "New: OK" << endl;
            }
        }
    }
    return 0;
} 
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200905223734281.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# 11-散列4 Hashing - Hard Version (30分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1294124786527993859)

> 很好玩的一道题哦，需要思考一下，想通了就很容易 —— 于是有时间就想想吧~ 实在想不通也没关系，下周习题课会讲的。

## 题目大意

- 已知散列函数H(x) = x%N 以及用线性探测法解决冲突问题
- 先给出散列映射的结果，反求输入顺序
  - 当元素x被映射到H(x)位置后，发现这个位置已经有y了，则y一定是在x之前被输入的

## 思路

拓扑排序！其实是将散列映射和拓扑排序融合在了一起~

## 代码

注意有个坑，入度都为0即不确定谁先输出时，挑最小的输出，所以这里用优先队列代替小顶堆来存，并用map记录对应下标~

```cpp
#include <iostream>
#include <cstring>
#include <string>
#include <queue>
#include <map>
using namespace std;
const int maxn = 1005;
int N;
int a[maxn], In[maxn];
int edge[maxn][maxn];
map<int, int> HashIndex;
void Topsort() {//拓扑排序
    for(int i = 0; i < N; ++i) {
        for(int j = 0; j < N; ++j) {
            if(edge[i][j] == 1) {
                In[j]++;
            }
        }
    }
    priority_queue<int,  vector<int>, greater<int> > q;
    for(int i = 0; i < N; ++i) {
        if(In[i] == 0 && a[i] >= 0) {
            q.push(a[i]);
        }
    }
    while(!q.empty()) {
        int num = q.top();
        q.pop();
        cout << num;
        int v = HashIndex[num];
        for(int i = 0; i < N; ++i) {
            if(v == i || edge[v][i] == -1) continue;//检查以v为起点的所有边
            if(--In[i] == 0) q.push(a[i]);
        }
        if(q.empty()) cout << endl;
        else cout << " ";
    }
}
int main() {
    memset(edge, -1, sizeof(edge));
    memset(In, 0, sizeof(In));
    cin >> N;
    for(int i = 0; i < N; ++i){
        cin >> a[i];
        HashIndex[a[i]] = i;
    }
    for(int i = 0; i < N; ++i) {
        if(a[i] < 0) continue;
        int Hash = a[i] % N;
        if(a[Hash] >= 0 && a[Hash] != a[i]) {//该位置已被占有
            for(int j = Hash; j != i; j = (j+1) % N) {
                edge[j][i] = 1;
            }
        }
        
    }
    Topsort();
    return 0;
}
```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200905223424128.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

# Kmp 串的模式匹配 (25分)

[本题链接](https://pintia.cn/problem-sets/1268384564738605056/problems/1296272390837731328)

> 大家可以把找来的各种模式匹配算法都在这里测试一下，看看效果如何。

## 思路

没啥好说的，KMP就完事了

## 代码

```cpp
#include <iostream>
#include <string>
#include <cstring>
#include <algorithm>
using namespace std;
typedef long long ll;
#define div 1000000007
const int maxn = 1000005;
const int inf  = 0x3f3f3f;
int N,M;
int nxt[maxn];
void getnxt(string t) {
    int len = t.length();
    int i = 0, j = -1; 
    nxt[0] = -1;
    while (i < len) {
        if (j == -1 || t[i] == t[j]) {
            i++, j++;
            if (t[i] == t[j])
                nxt[i] = nxt[j]; // next数组优化
            else
                nxt[i] = j;
        } else
            j = nxt[j];
    }
}

int KMP(string s, string t) {//s为文本串，t为模式串(短的那个)
    getnxt(t);
    int len1 = s.length();
    int len2 = t.length();
    int i = 0, j = 0, ans = 0;
    while (i < len1) {
        if (j == -1 || s[i] == t[j]) {
            i++, j++;
            if (j >= len2) {
                return i-j;
            }
        } else
            j = nxt[j];
    }
    return -1;
}
int main(){
    ios::sync_with_stdio(false);
    string String, Pattern;
    cin >> String;
    cin >> N;
    for(int i = 0; i < N; ++i) {
        memset(nxt, 0, sizeof(nxt));
        cin >> Pattern;
        int k = KMP(String, Pattern);
        if(k == -1) cout << "Not Found" << endl;
        else cout << String.substr(k) << endl;
    }
    return 0;
}

```

## 测试点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200905114904982.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODkwNTMz,size_16,color_FFFFFF,t_70#pic_center)

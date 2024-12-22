---
title: PAT乙级刷题感想及踩坑总结
link: PAT乙级刷题感想及踩坑总结
catalog: true
lang: cn
date: 2021-09-11 10:58:02 
subtitle: 《坑 点 大 赏》还有好多坑点没写，等有机会再补吧【咕咕咕】
tags:
- 后端
- c++
- PAT乙级
categories:
- [题目记录, 竞赛]
---

后记：考完PTA乙级了，92分人麻了，字符串的题永远的痛呜呜呜呜（

# 注意点

- 规定几位输出老老实实输出几位，比如规定id4位数就%04d，限制好域宽，不然前导0没了！！这个经常吃亏
  -  典型题：[1065 单身狗 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805266942377984)、[1072 开学寄语 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805263964422144)
- 同理，需要去掉前导0的时候不要犹豫：[1074 宇宙无敌加法器 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805263297527808)
- printf输出%的时候用%%（不会吧不会吧不会只有我忘了吧）
- 注意数据范围，选好用什么类型，有时候需要用long long
- 字符串题getline用烂（）
- 基本上反反复复就用那么几个vector、map，尤其是map的find函数（
- 注意边界，为0，为最大值，重复等情况，

# 好题推荐

- [1003 我要通过！ (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805323154440192)  看到这个通过率就明白了。
- [1013 数素数 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805309963354112) 经典埃式筛法求素数，练习一下。
- [1014 福尔摩斯的约会 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805308755394560)  典型的好玩的字符串题。
- [1024 科学计数法 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805297229447168) 字符串解析，坑点挺多，记得补0，分正负等
- [1034 有理数四则运算 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805287624491008)  gcd、lcm、最简分数 (其实lcm没用上，不过作为一个练习了)
- [1035 插入与归并 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805286714327040)  好题啊好题.jpg，考到了插入排序和归并排序，个人感觉挺难的一道题
- [1040 有理数四则运算 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805282389999616)   字符串，dp
- [1045 快速排序 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805278589960192) 说是快排，其实是找一个元素其左边元素都比他小，右边都比他大，即找主元
- [1049 数列的片段和 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805275792359424) 思维题，找规律
- [1050 螺旋矩阵 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805275146436608) 蓝桥杯模拟赛做过，模拟一下这个过程即可
- [1055 集体照 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805272021680128)  坑点较多，可以一做，结构体。
- [1073 多选题常见计分法 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805263624683520)，是之前1058的选择题plus版本，感觉可以当25分题了（
- [1074 宇宙无敌加法器 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805263297527808)  考到了进制和大整数加法，我愿称之为好题
- [1075 链表元素分类 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805262953594880)  直接用vector模拟链表，注意结点不在链表中的情况 。1070-1075这一套题挺好的
- [1078 字符串压缩与解压 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805262018265088)  字符串处理的好题
- [1080 MOOC期终成绩 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805261493977088)  典型结构体、重载排序规则
- [1084 外观数列 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805260583813120)， 题意读懂就很简单，核心思想类同于1078中的字符串压缩，一个个处理
- [1090 危险品装箱 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/1038429484026175488)  有坑点，但我不说，哎就是玩（

## 1003 我要通过！ (20 分)

- [1003 我要通过！ (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805323154440192)  看到这个通过率就明白了。

```cpp
#include <iostream>
#include <string>
#include <map>
using namespace std;
int main() {
    int T;
    string s;
    cin >> T;
    while(T--) {
        cin >> s;
        map<char, int> m;   //PAT各自的数量
        int vp = 0, vt = 0;
        int len = s.length();
        for(int i = 0; i < len; ++i) {
            m[s[i]]++;
            if(s[i] == 'P') vp = i;
            if(s[i] == 'T') vt = i;
        }
        if(m.size() == 3 && m['P'] == 1 && m['T'] == 1 
        && vt-vp != 1 && vp * (vt-vp-1) == len - vt - 1)
            cout << "YES" << endl;
        else cout << "NO" << endl;
    }
    return 0;
}
```

## 1013 数素数 (20 分)

- [1013 数素数 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805309963354112) 经典埃式筛法求素数，练习一下。

```cpp
#include <iostream>
#include <cstdio>
using namespace std;
typedef long long ll;
const int maxn = 9000000;
int a[maxn]={0};//素数数组 是则为0
int ans[10001];//全是素数
int main() {
    int m, n, k = 0;
    cin >> m >> n;
    for (int i = 2; i < maxn; i++){
        if(a[i] == 1) continue;
        ans[k++] = i;
        for(ll j = (ll)i * i; j < maxn; j += i) a[j] = 1;
    }
    int cnt = 0;
    for(int i = m-1; i <= n-1; i++) {
        cnt++;
        cout << ans[i];
        if(i == n-1) {
            cout << endl;
            break;
        }
        if(cnt%10 == 0) cout << endl;
        else cout << " ";
    }
    return 0;
}

```

## 1014 福尔摩斯的约会 (20 分)

- [1014 福尔摩斯的约会 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805308755394560)  典型的好玩的字符串题。

```cpp
#include <iostream>
#include <cstdio>
using namespace std;
string day[7] = {"MON","TUE","WED","THU","FRI","SAT","SUN"};
int h, m;
char date;
char hour;
string input[4];
int main() {
    for(int i = 0; i < 4; ++i)
        cin >> input[i];
    int len1 = input[0].length();
    int len2 = input[1].length();
    int len = min(len1, len2);
    int k = 0;
    for(int i = 0; i < len; ++i) {
        char ch = input[0].at(i);
        if(ch >= 'A' && ch <= 'G') {
            if(ch == input[1].at(i)) {
                date =  ch;
                k = i;
                break;
            }
        };
    }
    for(int i = k+1; i < len; ++i) {
        char ch = input[0].at(i);
        if((ch >= 'A' && ch <= 'N') || (ch >= '0' && ch <= '9')) {
            if(ch == input[1].at(i)) {
                hour =  ch;
                break;
            }
        };
    }
    if(hour >= '0' && hour <= '9') h = hour - '0';
    else h = hour - 'A' +10;
    int len3 = input[2].length();
    int len4 = input[3].length();
    len = min(len3, len4);
    for(int i = 0; i < len; ++i) {
        char ch = input[2].at(i);
        if((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) {
            if(ch == input[3].at(i)) {
                m = i;
                break;
            } 
        };
    }
    cout << day[date-'A'];
    printf(" %02d:%02d", h, m);
    return 0;
}

```

## 1024 科学计数法 (20 分)

- [1024 科学计数法 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805297229447168) 字符串解析，坑点挺多，记得补0，分正负等

```cpp
#include <iostream>
#include <algorithm>
#include <string>
#include <sstream>
using namespace std;
typedef long long ll;
string str;
string ans;
int ei;
int s2i(string str) {
    int x;
    stringstream ss;
    ss << str;
    ss >> x;
    return x;
}
int main() {
    cin >> str;
    int len = str.length();
    if(str[0] == '-') cout << '-';
    ei = str.find('E');
    string A = str.substr(1, ei-1);
    int lenA = A.length();
    int h = s2i(str.substr(ei+2, len-ei-1));
    if(h == 0) {
        cout << A;
    } else if(str[ei+1] == '-') {
        cout << "0.";
        --h;
        for(int i = 0; i < h; ++i)
            cout << '0';
        for(int i = 0; i < lenA; ++i) {
            if(A[i] == '.') continue;
            cout << A[i];
        }
    } else if(str[ei+1] == '+') {
        cout << A[0];
        for(int i = 2; i < lenA; ++i) {
            cout << A[i];
            --h;
            if(h == 0 && i+1 < lenA) cout << '.'; 
        }
        int len0 = h-(lenA-2)+1;
        for(int i = 0; i < len0; ++i) 
            cout << '0';
    }
    return 0;
}
```

## 1034 有理数四则运算 (20 分)

- [1034 有理数四则运算 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805287624491008)  gcd、lcm (其实lcm没用上，不过作为一个范例了)

```cpp
#include <iostream>
#include <cstdio>
using namespace std;
typedef long long ll;
ll gcd(ll a, ll b) {
    return a%b == 0? b: gcd(b, a%b);
}
ll lcm(ll a, ll b) {
    return (a*b)/gcd(a,b);
}
// k ta/tb
void solve(ll a, ll b) { // 4 -12
    if(a*b == 0) {
        if(!b) printf("Inf");
        else if(!a) printf("0");
        return;
    }
    int flag = 0;
    ll k = a/b; // 0
    ll ta = a;
    ll tb = b;
    if((a>0 && b<0) || (a<0 && b>0)) {//异号
        flag = 1;
        if(a < 0) a *= -1;//
        if(b < 0) b *= -1;
    } else if(a < 0 && b < 0){
        a *= -1, b *= -1;
    }
    // a 4 b 2
    ll t = gcd(a%b, b);
    if(k || !flag) {
        ta = (a%b)/t;
        tb = b / t;
    } else { // !k && flag
        if(ta > 0 && tb < 0) {
            ta = -1*(a%b)/t;
            tb = b/t;
        } else {
            ta = (ta%tb)/t;
            tb = tb / t;
        }
    }
    if(flag) {// 为负数
        if(ta == 0) {
            printf("(%lld)", k);
            return;
        }
        if(k) {
            printf("(%lld %lld/%lld)", k, ta, tb);
        } else {
            printf("(%lld/%lld)", ta, tb);
        }
    } else {
        if(ta == 0) {
            printf("%lld", k);
            return;
        }
        if(k) {
            printf("%lld %lld/%lld", k, ta, tb);
        } else printf("%lld/%lld", ta, tb);
    }

}
ll a1, b1, a2, b2;
int main() {
    scanf("%lld/%lld %lld/%lld", &a1, &b1, &a2, &b2);
    solve(a1, b1);
    printf(" + ");
    solve(a2, b2);
    printf(" = ");
    ll lc = lcm(b1, b2);
    solve(a1*(lc/b1)+a2*(lc/b2), lc);
    printf("\n");
    
    solve(a1, b1);
    printf(" - ");
    solve(a2, b2);
    printf(" = ");
    solve(a1*(lc/b1)-a2*(lc/b2), lc);
    printf("\n");// ohhhhhhhh
    
    solve(a1, b1);
    printf(" * ");
    solve(a2, b2);
    printf(" = ");
    solve(a1*a2, b1*b2);
    printf("\n");
    
    solve(a1, b1);
    printf(" / ");
    solve(a2, b2);
    printf(" = ");
    solve(a1*b2, a2*b1);
    printf("\n");
    return 0;
}
```

## 1035 插入与归并 (25 分)

- [1035 插入与归并 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805286714327040)  好题啊好题.jpg，考到了插入排序和归并排序，个人感觉挺难的一道题

```cpp
#include <iostream>
using namespace std;
typedef long long ll;
const int maxn = 110;
int N;
ll a[maxn], A[maxn], b[maxn];
bool isSame(ll a[], int N) {
    for(int i = 0; i < N; ++i) {
        if(a[i] != A[i]) return false;
    }
    return true;
}
bool Insert_sort(ll a[], int N) {
    bool flag = false;
    for(int p = 1; p < N; ++p) {
        ll t = a[p];
        int i;
        for(i = p; i > 0 && a[i-1] > t; --i) {
            a[i] = a[i-1];
        }
        a[i] = t;
        if(flag) return true;
        if(isSame(a, N)) {
            flag = true;
            continue;
        }
    }
    return false;
}
void Merge(ll a[], ll tmp[], int s, int m, int e) {
    int pb = s;
    int p1 = s, p2 = m;
    while(p1 <= m-1 && p2 <= e) {
        if(a[p1] <= a[p2]) tmp[pb++] = a[p1++];
        else tmp[pb++] = a[p2++];
    }
    while(p1 <= m-1)
        tmp[pb++] = a[p1++];
    while(p2 <= e)
        tmp[pb++] = a[p2++];
    for(int i = 0; i < e-s+1; ++i)
        a[s+i] = tmp[i];
}
void Merge_Pass(ll a[], ll b[], int N, int len) {
    // 按len长度切分 归并到b
    int i;
    for(i = 0; i <= N-2*len; i+=2*len) 
        Merge(a, b, i, i+len, i+2*len-1);
    if(i+len < N) Merge(a, b,i, i+len, N-1);//剩2个子列
    else for(int j = i; j < N; ++j) b[j] = a[j];
}
void Merge_Sort(ll a[], int N) {
    bool flag = false;
    int len = 1;
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
int main() {
    scanf("%d", &N);
    for(int i = 0; i < N; ++i) {
        scanf("%lld", &a[i]);
        b[i] = a[i];
    }
    for(int i = 0; i < N; ++i) {
        scanf("%lld", &A[i]);
    }
    if(Insert_sort(a, N)) {
        printf("Insertion Sort\n");
    } else {
        for(int i = 0; i < N; ++i) 
            a[i] = b[i];
        Merge_Sort(a, N);
        printf("Merge Sort\n");
        
    }
    for(int i = 0; i < N; ++i) {
        printf(" %lld"+!i, a[i]);
    }
    return 0;
}
```

## 1040 有几个PAT (25 分)

- [1040 有理数四则运算 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805282389999616)   字符串，dp

```cpp
// PPAATTPATTAP
#include <iostream>
#include <string>
using namespace std;
string s;
int dp[100010][3];
int main() {
    cin >> s;
    int len = s.length();
    if(s[0] == 'P') dp[0][0] = 1;
    for(int i = 1; i < len; ++i) {
        if(s[i] == 'P') dp[i][0] = dp[i-1][0]+1;
        else dp[i][0] = dp[i-1][0];
        if(s[i] == 'A') dp[i][1] = dp[i-1][1]+dp[i-1][0];
        else dp[i][1] = dp[i-1][1];
        if(s[i] == 'T') dp[i][2] = dp[i-1][2]+dp[i-1][1];
        else dp[i][2] = dp[i-1][2];
        dp[i][0] %= 1000000007;
        dp[i][1] %= 1000000007;
        dp[i][2] %= 1000000007;
    }
    cout << dp[len-1][2];
    return 0;
}
```

## 1045 快速排序 (25 分)

- [1045 快速排序 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805278589960192) 说是快排，其实是找一个元素其左边元素都比他小，右边都比他大，即找主元

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
typedef long long ll;
const int maxn = 100005;
int N;
vector<ll> ans;
ll a[maxn];
bool l[maxn], r[maxn];
ll maxx, minx;
int main() {
    cin >> N;
    maxx = a[0];
    l[0] = true;
    for(int i = 0; i < N; ++i) 
        cin >> a[i];
    for(int i = 1; i < N; ++i) {
        if(a[i] < maxx) {
            l[i] = false;
        } else {
            l[i] = true;
            maxx = a[i];
        }
    }
    minx = a[N-1];
    r[N-1] = true;
    for(int i = N-2; i >= 0; --i) {
        if(a[i] > minx) {
            r[i] = false;
        } else {
            r[i] = true;
            minx = a[i];
        }
    }
    for(int i = 0; i < N; ++i) {
        if(l[i] && r[i]) ans.push_back(a[i]);
    }
    sort(ans.begin(), ans.end());
    int len = ans.size();
    cout << len << endl;
    for(int i = 0; i < len; ++i) {
        printf(" %lld"+!i, ans[i]);
    }
    cout << endl;
    return 0;
}
```

## 1049 数列的片段和 (20 分)

- [1049 数列的片段和 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805275792359424) 思维题，找规律

```cpp
#pragma GCC optimize(2)
#include <iostream>
using namespace std;
const int maxn = 100005;
int N;
long double a[maxn];
long double ans;
int main() {
    cin >> N;
    for(int i = 0; i < N; ++i) {
        cin >> a[i];
        ans += (i+1.0)*(N-i)*a[i];
    }
    printf("%.2llf\n", ans);
    return 0;
}
```

## 1050 螺旋矩阵 (25 分)

- [1050 螺旋矩阵 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805275146436608) 蓝桥杯模拟赛做过，模拟一下这个过程即可

```cpp
#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;
const int maxn = 10005;
int N, m, n, t, nowi, nowj;
int a[maxn];
int b[maxn][maxn];
int main() {
    cin >> N;
    int k = sqrt(N);
    for(int i = 1; i <= k; ++i) {
        if(N % i == 0) {
            n = i, m = N / i;
        } else continue;
    }
    for(int i = 0; i < N; ++i) cin >> a[i];
    sort(a, a+N, greater<int>());
    b[nowi][nowj] = a[t++];
    while(t < N) {
        while(nowj+1 < n && !b[nowi][nowj+1]) { // 右
            b[nowi][++nowj] = a[t++];
        } 
        while(nowi+1 < m && !b[nowi+1][nowj]) { // 下
            b[++nowi][nowj] = a[t++];
        } 
        while(nowj-1 >= 0 && !b[nowi][nowj-1]) {// 左
            b[nowi][--nowj] = a[t++];
        } 
        while(nowi-1 >= 0 && !b[nowi-1][nowj]) {// 上
            b[--nowi][nowj] = a[t++];
        } 
    }
    for(int i = 0; i < m; ++i) {
        for(int j = 0; j < n; ++j) {
            printf(" %d"+!j, b[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```

## 1055 集体照 (25 分)

- [1055 集体照 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805272021680128)  坑点较多，可以一做，结构体。

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
#include <stack>
#include <deque>
using namespace std;
const int maxn = 10005;
int N, K, k;
struct Person {
    string name;
    int height;
    bool operator<(const Person& p1) {
        if(height != p1.height) return height < p1.height;
        return name > p1.name;
    }
} p;
vector<Person> v;
stack<deque<Person>> ans;
// 175 188 190 186
// 168 170 168
// 160 160 159
void solve(vector<Person> t) {
    deque<Person> newt;
    int len = t.size();
    int nowp = len-1;
    newt.push_back(t[nowp--]);
    while(nowp >= 0) {
        newt.push_front(t[nowp--]);
        if(nowp < 0) break;
        newt.push_back(t[nowp--]);
    }
    ans.push(newt);
}
int main() {  
    cin >> N >> K;
    for(int i = 0; i < N; ++i) {
        cin >> p.name >> p.height;
        v.push_back(p);
    }
    sort(v.begin(), v.end());
    k = N / K;
    int i = 0;
    while(i < N) {
        vector<Person> t;
        for(int j = i; j < i+k; ++j) t.push_back(v[j]); 
        i += k;
        if(i+k > N) {
            for(int j = i; j < N; ++j) 
                t.push_back(v[j]); 
            i += k;
        }
        solve(t);
    }
    while(!ans.empty()) {
        deque<Person> d = ans.top();
        cout << d[0].name;
        for(int i = 1; i < d.size(); ++i)
            cout << ' ' << d[i].name;
        cout << endl;
        ans.pop();
    }
    return 0;
}
// 6 2
// sss 190
// die 202 
// wjc 120
// abs 180
// bsw 180
// fwr 100
```

## 1073 多选题常见计分法 (20 分)

- [1073 多选题常见计分法 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805263624683520)，是之前1058的选择题plus版本，感觉可以当25分题了（

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
#include <map>
#include <sstream>
using namespace std;
typedef long long ll;
const int maxn = 1005;
const int maxm = 105;
int N, M, ct;
struct Choice {
    int id, falcnt;
    char val;
    bool operator<(const Choice& c1) {
        if(falcnt != c1.falcnt) return falcnt > c1.falcnt;
        if(id != c1.id) return id < c1.id;
        return val < c1.val;
    }
} c[maxn];
map<string, int> m;
struct Title {
    int id, falcnt;
    int sumg, cnt, rcnt;
    string allr;
    map<char, int> rindex;
    Title():allr(""){}
    bool operator<(const Title& t1) {
        return falcnt != t1.falcnt ? falcnt > t1.falcnt: id < t1.id;
    }
} t[maxm];
// 3 0 0 0
// 3 2 0 1
// 0 0 5 0
string tran(int id, char ch) {
    stringstream ss;
    string s;
    ss << id << '-' << ch;
    ss >> s;
    return s;
}
int main() { 
    cin >> N >> M;
    for(int i = 0; i < M; ++i) {
        cin >> t[i].sumg >> t[i].cnt >> t[i].rcnt;
        t[i].id = i+1;
        t[i].falcnt = 0;
        for(int j = 0; j < t[i].rcnt; ++j) {
            char ch;
            cin >> ch;
            t[i].rindex[ch] = t[i].allr.size();
            t[i].allr += ch;
        }
        cin.ignore();
        // cout << t[i].allr << endl;
    }
    // 
    for(int i = 0; i < N; ++i) {
        int total;     //学生选择的选项数
        char nowc;
        double sum = 0;
        for(int j = 0; j < M; ++j) {//每个多选题
            int flag = 2; // 0 1 2 代表错误 部分正确 全对
            vector<int> v;
            for(int k = 0; k < t[j].rcnt; ++k) v.push_back(0);
            scanf("%*c%d", &total);
            if(total != t[j].rcnt)
                flag = 1;
            for(int x = 0; x < total; ++x) { //每个选项
                scanf("%*c%c", &nowc);
                if(t[j].allr.find(nowc) == string::npos) {  //错选
                    flag = 0;
                    string s = tran(j, nowc);
                    if(m.find(s) == m.end()) {
                        m[s] = ct;
                        c[ct].id = j+1;
                        c[ct].falcnt = 1;
                        c[ct].val = nowc;
                        ++ct;
                    } else ++c[m[s]].falcnt;
                } else v[t[j].rindex[nowc]] = 1;           
            }
            scanf("%*c%*c");
            if(flag != 2) {//漏选
                for(int k = 0; k < t[j].rcnt; ++k) {
                    if(v[k] == 0) {
                        // cout << k << ':' << t[j].allr << ':' << t[j].allr[k] << endl;; 
                        string s = tran(j, t[j].allr[k]);
                        if(m.find(s) == m.end()) {
                            m[s] = ct;
                            c[ct].id = j+1;
                            c[ct].falcnt = 1;
                            c[ct].val = t[j].allr[k];
                            ++ct;
                        } else ++c[m[s]].falcnt;
                    }
                }
            }
            if(flag == 2) sum += t[j].sumg;
            else if(flag == 1) sum += (t[j].sumg*1.0/2);
            else continue;
        }
        printf("%.1f\n", sum);
    }
    sort(c, c+ct);
    if(c[0].falcnt == 0 ) cout << "Too simple" << endl;
    else {
        int k = 0;
        while(k+1 < ct && c[k+1].falcnt == c[k].falcnt) ++k;
        for(int i = 0; i <= k; ++i) 
            cout << c[i].falcnt << ' ' << tran(c[i].id, c[i].val) << endl;
    }
    return 0;
}
// 3 4 
// 3 4 2 a c
// 2 5 1 b
// 5 3 2 b c
// 1 5 4 a b d e
// (2 a c) (3 b d e) (2 a c) (3 a b e)
// (2 a c) (1 b) (2 a b) (4 a b d e)
// (1 c) (1 e) (1 c) (4 a b c d)
```

## 1074 宇宙无敌加法器 (20 分)

- [1074 宇宙无敌加法器 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805263297527808)  考到了进制和大整数加法，我愿称之为好题

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;
typedef long long ll;
const int maxn = 50;
string jw;
string n1, n2;
int main() {
    getline(cin, jw);
    getline(cin, n1);
    getline(cin, n2);
    reverse(jw.begin(), jw.end());
    reverse(n1.begin(), n1.end());
    reverse(n2.begin(), n2.end());
    int N = jw.size();
    int flag = 0;// 进位
    string ans = "";
    if(n1.length() < N) n1.append(N-n1.length(), '0');
    if(n2.length() < N) n2.append(N-n2.length(), '0');
    for(int i = 0; i < N; ++i) {
        int x1 = n1[i]-'0';
        int x2 = n2[i]-'0';
        int d = jw[i]-'0';
        if(d == 0) d = 10;
        int t = x1+x2+flag;
        int x;
        if(t >= d) {
            x = t % d;
            flag = 1;
        } else {
            x = t;
            flag = 0;
        }
        char ch = '0'+x;
        ans += ch;
    }
    if(flag == 1) ans += '1';
    reverse(ans.begin(), ans.end());
    if(ans.find_first_not_of('0') == string::npos) cout << 0 << endl;
    else cout << ans.substr(ans.find_first_not_of('0')) << endl;
    return 0;
}
// 000
// 000
// 00
```

## 1075 链表元素分类 (25 分)

- [1075 链表元素分类 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805262953594880)  直接用vector模拟链表，也可以直接写个链表。1070-1075这一套题挺好的

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
#include <map>
using namespace std;
typedef long long ll;
const int maxn = 1000005;
int p, N, K, head, x;
struct LNode {
    int val;
    int nowp, next;
} a[maxn], t;
map<int, int> m;
vector<LNode> temp;
vector<LNode> ans;
int main() {
   scanf("%d %d %d", &p, &N, &K);
   for(int i = 0; i < N; ++i) {
       scanf("%d %d %d", &a[i].nowp, &a[i].val, &a[i].next);
       m[a[i].nowp] = i;
       if(a[i].nowp == p) head = i;
   }
   x = head;
   while(a[x].next != -1) {
       temp.push_back(a[x]);
       x = m[a[x].next];
   }
   temp.push_back(a[x]);
   int len1 = temp.size();
//    cout << len1 << endl;
   for(int i = 0; i < len1; ++i)
       if(temp[i].val < 0) ans.push_back(temp[i]);
   for(int i = 0; i < len1; ++i)
       if(temp[i].val >= 0 && temp[i].val <= K) ans.push_back(temp[i]);
   for(int i = 0; i < len1; ++i)
       if(temp[i].val >= 0 && temp[i].val > K) ans.push_back(temp[i]);
    int len2 = ans.size();
    for(int i = 0; i < len2; ++i) {
        if(i == len2-1) printf("%05d %d -1\n", ans[i].nowp, ans[i].val);
        else printf("%05d %d %05d\n", ans[i].nowp, ans[i].val, ans[i+1].nowp);

    }   return 0;
}

```

## 1078 字符串压缩与解压 (20 分)

- [1078 字符串压缩与解压 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805262018265088)  字符串处理的好题

```cpp
#include <iostream>
#include <string>
using namespace std;
char ch;
void zip(string s) {
    // cout << "zip";
    char prec = s[0];
    int cnt = 1;
    int len = s.length();
    for(int i = 1; i < len; ++i) {
        if(s[i] == prec) {
            ++cnt;
        } else {
            if(cnt >= 2) cout << cnt;
            cout << prec;
            prec = s[i];
            cnt = 1;
        }
    }
    if(cnt >= 2) cout << cnt;
    cout << prec;
}
void Print(char c, int num) {
    for(int i = 0; i < num; ++i) cout << c;
}
void unzip(string s) {
    // cout << "unzip";
    int len = s.length();
    int cnt = 1;
    char nowc = s[0];
    string nowcnt;
    for(int i = 0; i < len; ++i){
        if(s[i] >= '0' && s[i] <= '9') {
            nowcnt += s[i];
        } else {
            if(nowcnt.length() > 0) cnt = stoi(nowcnt);
            nowc = s[i];
            Print(nowc, cnt);
            cnt = 1;
            nowcnt = "";
        }
    }
}
int main() {
    string str;
    cin >> ch;
    getchar();
    getline(cin, str);
    if(ch == 'C') zip(str);
    else unzip(str);
    return 0;
}
// D
// 10T2h4is i5s a3 te4st CA3a as10Z
```

## 1080 MOOC期终成绩 (25 分)

- [1080 MOOC期终成绩 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805261493977088)  典型结构体、重载排序规则

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
#include <map>
using namespace std;
typedef long long ll;
const int maxn = 1000005;
int P, M, N;
struct Student {
    string name;
    int realg, gp, gm, gf;
    Student():gp(-1), gm(-1), gf(-1),realg(0) {}
    bool operator<(const Student& s1) {
        if(realg != s1.realg) return realg > s1.realg;
        return name < s1.name;
    }
};
vector<Student> v;
vector<Student> ans;
map<string,int> m;
int main() {
    ios::sync_with_stdio(false);
    cin >> P >> M >> N;
    string s;
    int g;
    for(int i = 0; i < P; ++i) {
        Student t;
        cin >> s >> g;
        if(m.find(s) == m.end()) {
            m[s] = v.size();
            t.name = s, t.gp = g;
            v.push_back(t);
        } else v[m[s]].gp = g;
    }
    for(int i = 0; i < M; ++i) {
        Student t;
        cin >> s >> g;
        if(m.find(s) == m.end()) {
            m[s] = v.size();
            t.name = s, t.gm = g;
            v.push_back(t);
        } else v[m[s]].gm = g;
    }
    for(int i = 0; i < N; ++i) {
        Student t;
        cin >> s >> g;
        if(m.find(s) == m.end()) {
            m[s] = v.size();
            t.name = s, t.gf = g;
            v.push_back(t);
        } else v[m[s]].gf = g;
    }
    for(int i = 0; i < v.size(); ++i) {
        if(v[i].gm > v[i].gf) {
            double x = v[i].gm*0.4 + v[i].gf*0.6;
            if((int)(x*10)%10 >= 5) v[i].realg = (int)(x+1);
            else v[i].realg = (int)x;
        }
        else v[i].realg = v[i].gf;
        if(v[i].gp >= 200 && v[i].realg >= 60) ans.push_back(v[i]);
    }
    sort(ans.begin(), ans.end());
    for(auto i: ans) {
        cout << i.name << ' ' << i.gp << ' ' << i.gm << ' ' << i.gf << ' ' << i.realg << endl;
    }
    return 0;
}
```

## 1084 外观数列 (20 分)

- [1084 外观数列 (20 分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805260583813120)， 题意读懂就很简单，核心思想类同于1078中的字符串压缩，一个个处理

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <sstream>
using namespace std;
int N;
string i2s(int x) {
    stringstream ss;
    string str;
    ss << x;
    ss >> str;
    return str;
}
int main() {
    string ans, d;
    cin >> d >> N;
    ans = d;
    for(int i = 1; i < N; ++i){
        string temp = "";
        char prec = ans[0];
        int cnt = 1;
        for(int j = 1; j < ans.length(); ++j) {
            if(ans[j] == ans[j-1]) {
                ++cnt;
            } else {
                temp += prec;
                temp += i2s(cnt);
                cnt = 1;
                prec = ans[j];
            }
        }
        temp += prec;
        temp += i2s(cnt);
        ans = temp;
    }
    cout << ans << endl;
    return 0;
}
// 4 41 4111 41
```

## 1090 危险品装箱 (25 分)

- [1090 危险品装箱 (25 分)](https://pintia.cn/problem-sets/994805260223102976/problems/1038429484026175488)  有坑点，但我不说，哎就是玩（

```cpp
#include <iostream>
#include <map>
#include <vector>
using namespace std;
const int maxn = 10006;
int N, M, x1, x2;
map<int, vector<int> > m1;
int main() {
    scanf("%d %d", &N, &M);
    for(int i = 0; i < N; ++i) {
        cin >> x1 >> x2;
        m1[x1].push_back(x2);
        m1[x2].push_back(x1);
    }
    while(M--) {
        cin >> x1;
        map<int, int> m2;
        bool flag = true;
        vector<int> v(x1);
        for(int i = 0; i < x1; ++i) {
            cin >> v[i];
            m2[v[i]] = 1;
        }
        for(int i = 0; i < x1; ++i) {
            if(m1.find(v[i]) == m1.end()) continue;
            int len = m1[v[i]].size();
            for(auto k : m1[v[i]]) {
                if(m2.find(k) != m2.end()) flag = false;
                if(!flag) break;
            }
        }
        if(flag) cout << "Yes" << endl;
        else cout << "No" << endl;
    }
    return 0;
}
```

# 感想

PTA乙级的题目特别抠细节，往往有些题会卡在那么一两个测试点上令人头疼，但只要程序正常写出来了一般能拿到大部分分，最难好像也就考到排序、dp和一些思维题，没有任何高级算法的出现。最后，善用STL基本上就没问题了。

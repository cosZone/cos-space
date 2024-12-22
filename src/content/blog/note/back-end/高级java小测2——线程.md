---
title: 高级java小测2——线程
link: 高级java小测2——线程
catalog: true
lang: cn
date: 2021-12-01 20:12:48
subtitle: 课堂小测：设计并实现某火车票售票系统的放票功能
tags:
- 后端
- Java
- 多线程
categories:
- [笔记, 后端]
---
# 题目

设计并实现某火车票售票系统的放票功能:

某车次预留100张有座， 在每晚8点开启放票功能，每隔30分钟随机放出10张票。

简单模拟放票、购票功能：显示客户在某时刻抢到某号码的票。
模拟服务器放票，客户端购票功能：服务器显示某时刻放出某些票，在某时刻卖出某张票的信息；客户端显示某时刻买走某张票的信息。

# 思路与代码

服务器为Producer类，客户端为Customer类，均继承Thread实现多线程，然后一个Tickets类，表示余票，一个MyTime类表示时间（

源代码下载在这儿：[cos_javatest2](http://cosine.ren/wp-content/uploads/2021/12/cos_javatest2.zip)

MyTime类：passM函数表示过去minute分钟

```java
public class MyTime {
    int hour;
    int minute;
    public MyTime(int hour, int minute) {
        this.hour = hour%24;
        this.minute = minute%60;
    }
    public synchronized void printTime() {
        System.out.printf("%02d:%02d ", hour, minute);
    }
    public synchronized void passM(int minute) {
        this.minute += minute;
        if(this.minute >= 60) {
            ++this.hour;
            this.minute %= 60;
        }
        this.hour %= 24;
    }

    @Override
    public String toString() {
        return "MyTime{" +
                "hour=" + hour +
                ", minte=" + minute +
                '}';
    }
}
```

Tickets类：

重点，total为总共预留的票数（100），time为时间，cid表示售票编号，已售出1票则为1，pid为存票编号，存了10张则为10，available表示是否还有余票，作为同步的标志。初始化均为0，Tickets为两个线程所共享的对象

```java
import java.util.List;
import java.util.Stack;

public class Tickets {
    int total;          // 票总数
    MyTime time;        // 当前时间
    int cid;            // 售票序号
    int pid;            // 存票序号
    boolean available;      // 是否有余票
    public Tickets(int total, MyTime time) {
        this.total = total;
        this.time = time;
        pid = cid = 0;
        available = false;
    }
    public synchronized void passM(int minute) {
        time.passM(minute);
    }
    public synchronized void put(int num) {  // 同步方法，实现增加票的功能
        if(available) {
            System.out.println("暂未到存票时间，别急放（");
            try {wait();} catch (InterruptedException e) {e.printStackTrace();}
        }
        pid += num;
        time.printTime();
        System.out.printf("Producer 存票%d张, 当前余票：%d\n", num, pid-cid);
        available = true;
        notify();
    }
    public synchronized void sell() {  // 同步方法，实现卖出的功能
        if(!available) {
            System.out.printf("暂无余票，别急哦@Customer %d\n", cid);
            try {wait();} catch (InterruptedException e) {e.printStackTrace();}
        }
        time.printTime();
        if(available && cid < pid) {
            System.out.printf("Customer %d 购买了票 %d\n", ++cid, cid);
        }
        if(cid == pid) available = false;
        notify();
    }
}
```

Customer类如下：继承Thread，重载run
假设每3分钟有一个顾客买票，与Producer类共享Tickets对象，所以Tickets内部的函数都需是同步的。

```java
public class Custormer extends Thread{
    Tickets t = null;
    Custormer(Tickets t) {
        this.t = t;
    }
    @Override
    public void run() {
        System.out.println("Custormer start");
        while(t.cid < t.total) {
            t.sell();
            t.passM(3);
            try { Thread.sleep(10); } catch (InterruptedException e) { e.printStackTrace();}
        }
        System.out.println("Custormer ends");
    }
}
```

Producer类如下：

```java
public class Producer extends Thread {
    Tickets t = null;
    Producer(Tickets t) {
        this.t = t;
    }
    @Override
    public void run() {
        System.out.println("Producer start");
        while(t.pid < t.total) {
            t.put(10);
            try { Thread.sleep(500); } catch (InterruptedException e) { e.printStackTrace();}

        }
        System.out.println("Producer end");
    }
}
```

主函数：new两个线程并启动，设置当前时间为20：00

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("mainThread start");
        MyTime time = new MyTime(20, 0);
        time.printTime();
        System.out.println(" 当前时间");
        Tickets tickets = new Tickets(100, time);
        Producer pthread = new Producer(tickets);
        Custormer cthread = new Custormer(tickets);
        pthread.start();
        cthread.start();
        System.out.println("mainThread end");
    }
}
```

# 运行结果

运行结果如下图

![请添加图片描述](https://img-blog.csdnimg.cn/3e252b685738407d88117e7025042de4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)
![请添加图片描述](https://img-blog.csdnimg.cn/8c5007f08aff4eaba103a1f7de9bcb6a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)
![请添加图片描述](https://img-blog.csdnimg.cn/ef4b3d82c0884b2e94dc906de3cdedb8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)

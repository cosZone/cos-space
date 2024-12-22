---
title: 高级java复习笔记（期末不要挂啦）
link: 高级java复习笔记（期末不要挂啦）
catalog: true
lang: cn
date: 2021-12-16 01:31:07
subtitle: 设计模式 序列化 注册监听器 对象实例化方法 反射的作用 切面编程 套接字 同步 连接池 线程池 比较接口
tags:
- Java
- 设计模式
- 后端
categories:
- [笔记, 后端]
---

**老师：就看看基本的设计模式 序列化 注册监听器 对象实例化方法 反射的作用 切面编程 套接字 同步 连接池 线程池 比较接口 再看看代理模式 策略模式有什么应用 然后复习一下多线程编程 就好了**
肯定还有个重点叫数据库连接吧！（
**行叭**

~~虽然并不想用Java找工作但还是要学一下因为是必修，必修！~~

# Java 对象实例化方法

参考： [Java实例化对象的几种方式](https://blog.csdn.net/u014371184/article/details/78212895)
Java中实例化对象有好几种方式

- **使用new语句进行实例化**，是最常用的创建对象方法
- **通过工厂模式中的方法返回对象**，在下面的设计模式有介绍，eg： String str = String.valueOf(23); 没错，这就是
- **运用反射手段，调用Class.newInstance()函数**（或者Constructor类的）实例方法来实例化
- **调用对象的Clone()方法**
- **通过I/O流（包括反序列化）**，如运用反序列化，使用readObject方法读出一个对象实例化。

# Java 设计模式

设计模式是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性、程序的重用性。

## 工厂模式

参考：[工厂模式 | 菜鸟教程](https://www.runoob.com/design-pattern/factory-pattern.html)
> 工厂模式（Factory Pattern）是 Java 中最常用的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。**在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。**

**意图：定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。**
**主要解决**：主要解决接口选择的问题。
**何时使用**：我们明确地计划不同条件下创建不同实例时。
**如何解决**：让其子类实现工厂接口，返回的也是一个抽象的产品。
**关键代码**：创建过程在其子类执行。
**应用实例**： 您需要一辆汽车，可以直接从工厂里面提货，而不用去管这辆汽车是怎么做出来的，也不需要知道这个汽车里面的具体实现。
**优点：**
1、一个调用者想创建一个对象，只要知道其名称就可以了。
 2、扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。
 3、屏蔽产品的具体实现，调用者只关心产品的接口。

**缺点：**  每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。

## 装饰器模式

参考：[装饰器模式 | 菜鸟教程](https://www.runoob.com/design-pattern/decorator-pattern.html)

> 装饰器模式（Decorator Pattern）**允许向一个现有的对象添加新的功能，同时又不改变其结构。** 这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。
> **这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。**

**何时使用：** 在不想增加很多子类的情况下扩展类。

**如何解决：** 将具体功能职责划分，同时继承装饰者模式。

**关键代码：**  1、Component 类充当抽象角色，不应该具体实现。
 2、修饰类引用和继承 Component 类，具体扩展类重写父类方法。

我们通过下面的实例来演示装饰器模式的用法。其中，我们将把一个形状装饰上不同的颜色，同时又不改变形状类。
![在这里插入图片描述](https://img-blog.csdnimg.cn/bfd7a1979ed04bc5a20fc7f588f77aa8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)

## 观察者模式

参考：[观察者模式 | 菜鸟教程](https://www.runoob.com/design-pattern/observer-pattern.html)
> 当对象间存在一对多关系时，则使用观察者模式（Observer Pattern）。比如，**当一个对象被修改时，则会自动通知依赖它的对象并被自动![在这里插入图片描述](https://img-blog.csdnimg.cn/24a769a7a72741f6803c729ee97e5f56.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5L2ZY29z,size_20,color_FFFFFF,t_70,g_se,x_16)
更新**。观察者模式属于行为型模式。

**关键代码：** 在抽象类里有一个 ArrayList 存放观察者们。
**应用实例：**  拍卖的时候，拍卖师观察最高标价，然后通知给其他竞价者竞价。
**优点：**
1、观察者和被观察者是抽象耦合的。
2、建立一套触发机制。

**缺点：**
1、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。
2、如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。
3、观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

## 代理模式

参考：[代理模式  | 菜鸟教程](https://www.runoob.com/design-pattern/proxy-pattern.html)
> 在代理模式（Proxy Pattern）中，**一个类代表另一个类的功能**。这种类型的设计模式属于结构型模式。
> 在代理模式中，我们创建具有现有对象的对象，以便向外界提供功能接口。

**主要解决：** 在直接访问对象时带来的问题，比如说：要访问的对象在远程的机器上。在面向对象系统中，有些对象由于某些原因（比如对象创建开销很大，或者某些操作需要安全控制，或者需要进程外的访问），直接访问会给使用者或者系统结构带来很多麻烦，我们可以在访问此对象时加上一个对此对象的访问层。
**如何解决：**  增加中间层。
**应用实例：**  1、Windows 里面的快捷方式。
 2、买火车票不一定在火车站买，也可以去代售点。
 3、一张支票或银行存单是账户中资金的代理。支票在市场交易中用来代替现金，并提供对签发人账号上资金的控制。
 **优点：** 1、职责清晰。 2、高扩展性。 3、智能化。
**缺点：**  1、由于在客户端和真实主题之间增加了代理对象，因此有些类型的代理模式可能会造成请求的处理速度变慢。
 2、实现代理模式需要额外的工作，有些代理模式的实现非常复杂。

## 策略模式

参考：[策略模式 | 菜鸟教程](https://www.runoob.com/design-pattern/strategy-pattern.html)

> - 在策略模式（Strategy Pattern）中，**一个类的行为或其算法可以在运行时更改。** 这种类型的设计模式属于行为型模式。
> - 在策略模式中，我们 **创建表示各种策略的对象** 和 **一个行为随着策略对象改变而改变的 context 对象 。策略对象改变 context 对象的执行算法。**

**意图**：定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。

**主要解决**：在有多种算法相似的情况下，使用 if...else 所带来的复杂和难以维护。

**何时使用**：一个系统有许多许多类，而区分它们的只是他们直接的行为。

**如何解决**：将这些算法封装成一个一个的类，任意地替换。

**关键代码**：实现同一个接口。

**应用实例**： 1、诸葛亮的锦囊妙计，每一个锦囊就是一个策略。
2、旅行的出游方式，选择骑自行车、坐汽车，每一种旅行方式都是一个策略。

**优点**： 1、算法可以自由切换。
2、避免使用多重条件判断。
3、扩展性良好。

**缺点**： 1、策略类会增多。
2、所有策略类都需要对外暴露。

ps:策略模式的应用感觉这篇博客讲的特别好！[设计模式 | 策略模式及典型应用](https://cloud.tencent.com/developer/article/1385920)

# Java 序列化

[高级java小测-序列化对象输入输出](https://cosine.ren/index.php/2021/11/24/%E9%AB%98%E7%BA%A7java%E5%B0%8F%E6%B5%8B/)

- Java 提供了一种对象序列化的机制，该机制中，**一个对象可以被表示为一个字节序列，该字节序列包括该对象的数据、有关对象的类型的信息和存储在对象中数据的类型。**
- **将序列化对象写入文件之后，可以从文件中读取出来，并且对它进行反序列化**，也就是说，对象的类型信息、对象的数据，还有对象中的数据类型可以用来在内存中新建对象。
- 整个过程都是 Java 虚拟机（JVM）独立的，也就是说，**在一个平台上序列化的对象可以在另一个完全不同的平台上反序列化该对象。**

详见 [Java 序列化 | 菜鸟教程](https://www.runoob.com/java/java-serialization.html)

# Java 事件处理 监听器

往大里讲有很多方面，这里简单记下
 在Java事件处理体系结构中，主要涉及的对象事件（Event)、事件源(Event Source )、事件监听器(Event Listener)
基于监听器的事件处理机制是一种委派式的事件处理方式，实现步骤:

- 委托:组件将事件处理委托给特定的事件处理对象
- 通知∶触发指定的事件时，就通知所委托的事件处理
- 对象处理∶事件处理对象调用相应的事件处理方法来处理该事件

监听器模式：事件源注册监听器之后，当事件源触发事件，监听器就可以回调事件对象的方法；更形象地说，监听者模式是基于：注册-回调的事件/消息通知处理模式，就是被监控者将消息通知给所有监控者。

1、注册监听器：事件源.setListener。
2、回调：事件源实现onListener。

几种注册监听类的方法参考博客： [Java 注册监听器的方法总结](https://blog.csdn.net/bobo_93/article/details/52658694)
其中，当监听的事件较简单的时候适合用匿名类实现监听类

# Java 反射

参考博客：[Java 反射详解](https://www.cnblogs.com/ysocean/p/6516248.html)

- Java反射就是**在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法**；对于任意一个对象，都能够调用它的任意方法和属性；并且能改变它的属性。而这也是Java被视为动态语言的一个关键性质。
- 具体实现，可以看之前写的作业- - [高级java作业](https://blog.csdn.net/qq_45890533/article/details/121964482)

# Java 切面编程（AOP）

出处：[Spring核心AOP（面向切面编程）总结](https://blog.csdn.net/qq_25827845/article/details/75208354)

AOP（面向切面编程）是Spring框架的特色功能之一。
面向切面编程，指**扩展功能不修改源代码，将功能代码从业务逻辑代码中分离出来。**
主要用于：日志记录，性能统计，安全控制，事务处理，异常处理等等。
主要意图：将日志记录，性能统计，安全控制，事务处理，异常处理等代码从业务逻辑代码中划分出来，通过对这些行为的分离，我们希望可以将它们独立到非指导业务逻辑的方法中，进而改变这些行为的时候不影响业务逻辑的代码。
主要看看概念，不会考太深（吧

# 基于Socket的网络编程（套接字）

参考博客：[Java高级之Socket,反射](https://blog.csdn.net/w252064/article/details/78713442)、[ServerSocket 和 Socket 通信实例 | 菜鸟教程](https://www.runoob.com/java/net-serversocket-socket.html)

**网络上的两个程序通过一个双向的通讯连接实现数据的交换，这个双向链路的一端称为一个Socket。**  Socket通常用来实现客户方和服务方的连接，是TCP/IP协议的一个十分流行的编程界面，**一个Socket由一个IP地址和一个端口号唯一确定**。

在Java环境下，Socket编程主要是指基于TCP/IP协议的网络编程。
代码可参照菜鸟教程中的，一看就懂，过程如下。

1、建立服务器端

- 服务器建立通信ServerSocket
- 服务器建立Socket接收客户端连接
- 建立IO输入流读取客户端发送的数据
- 建立IO输出流向客户端发送数据消息

2、建立客户端

- 创建Socket通信，设置通信服务器的IP和Port
- 建立IO输出流向服务器发送数据消息
- 建立IO输入流读取服务器发送来的数据消息

# 多线程同步

应用详见作业2 [高级java小测2——线程](https://blog.csdn.net/qq_45890533/article/details/121663399?spm=1001.2014.3001.5501)

线程（Thread）是独立于其他线程运行的程序执行单元，在Java的多任务处理中起着举足轻重的作用。

**线程与进程之区别**

- 线程(Thread)：轻量级程序，有开始、执行和结束。多个线程共享一块内存和资源
- 进程(Process)：拥有自己独立的内存空间和资源，正在运行的程序。
- 多线程：在一个程序中同时运行多个任务
- 多进程：在操作系统中能同时运行多个任务（程序）
- **一个进程中可以包含若干个线程，它们可以利用进程所拥有的资源。通常把进程作为分配资源的基本单位，而把线程作为独立运行和独立调度的基本单位。**
- 由于线程比进程更小，基本上不拥有系统资源，故对它的调度所付出的开销就会小得多，能更高效的提高系统内多个程序间并发执行的程度。

线程状态

- born：新线程状态
- runnable：就绪状态
- running：运行状态
- blocked：阻塞状态
- sleeping：休眠状态
- waiting：等待状态
- dead：死亡状态

**线程同步：保证某个资源在某一时刻只能由一个线程访问，以此保证共享数据及操作的完整性。**
**线程同步的几种方式：**[关于线程同步(7种方式)](https://www.cnblogs.com/XHJT/p/3897440.html)

- 同步方法：方法前加synchonized关键字
- 同步代码块：即有synchronized关键字修饰的语句块。
- 使用特殊域变量(volatile)实现线程同步
- 使用重入锁实现线程同步（ReentrantLock类）
- 使用局部变量实现线程同步（ThreadLocal类）
- 使用阻塞队列实现线程同步（实际开发，远离底层结构，LinkedBlockingQueue 类）
- 使用原子变量实现线程同步（AtomicInteger 类）

考试时前四个就够了（）

# 数据库连接池、线程池

在使用数据库的过程中，往往使用数据库连接池而不是直接使用数据库连接进行操作。因为每一个数据库连接的创建和销毁的代价是昂贵的，而**池化技术则负责分配，管理和释放数据库连接，预先创建了资源，这些资源是可复用的**,这样就保证了在多用户情况下只能使用指定数目的资源，**避免了一个用户创建一个连接资源，造成程序运行开销过大**

而线程池同理，**首先创建一些线程，它们的集合称为线程池**，使用线程池可以很好的提高性能，**线程池在系统启动时既创建大量空闲的线程，程序将一个任务传给线程池。线程池就会启动一条线程来执行这个任务，执行结束后，该线程并不会死亡，而是再次返回线程池中成为空闲状态，等待执行下一个任务。**
~~概念了解即可~~
更详细的，看这几篇博客：[java并发实战：连接池实现](https://www.cnblogs.com/lalalagq/p/10286937.html)、[Java中线程池详解
](https://blog.csdn.net/qq_40604313/article/details/119785027)

# Comparable/Comparator 比较接口

参照博客：[Java中实现对象的比较：Comparable接口和Comparator接口](https://www.cnblogs.com/Kevin-mao/p/5912775.html)
自己的应用： [高级java作业](https://blog.csdn.net/qq_45890533/article/details/121964482)

## Comparable接口

- **此接口强行对实现它的每个类的对象进行整体排序。**
- 此排序被称为该类的**自然排序**
- 类的 compareTo方法被称为它的自然比较方法 。实现此接口的对象列表（和数组）可以通过 Collections.sort（和 Arrays.sort ）进行自动排序。实现此接口的对象可以用作有序映射表中的键或有序集合中的元素，**无需指定比较器Comparator**。
- compareTo()方法，只有一个参数，返回值为int，返回值大于0表示对象大于参数对象；小于0表示对象小于参数对象；等于0表示两者相等

## Comparator接口

- Comparable接口将比较代码嵌入需要进行比较的类的自身代码中，而**Comparator接口在一个独立的类中实现比较。**
- 如果前期类的设计没有考虑到类的Compare问题而没有实现Comparable接口，**后期可以通过Comparator接口来实现比较算法进行排序**，并可以为了使用不同的排序标准做准备，比如：升序、降序。
- Comparable接口强制进行自然排序，而**Comparator接口不强制进行自然排序，可以指定排序顺序。**

# JDBC连接数据库

[我的项目文件](http://cosine.ren/wp-content/uploads/2021/12/JavaExp_1.zip)
将数据库连接信息放在mysql.properties配置文件中，文件内容

```java
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/exp_1
user=root
pwd= 你的数据库密码
```

Config类获取配置文件信息

```java
package config;

import java.io.FileInputStream;
import java.util.Properties;

public class Config {
    private  static Properties p = null;
    static {
        try {
            p = new Properties();
            p.load(new FileInputStream("config/mysql.properties"));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static String getValue(String key) {
        return p.get(key).toString();
    }
}

```

定义数据库连接工具类DBUtil，包括配置字段，数据库连接对象Connection、查询结果集ResultSet，提交状态autoCommit(boolean型)、PreparedStatement等，方法包括

- 获取数据库连接方法：getConnection
- 释放资源：closeAll
- 执行sql语句进行数据库数据的查询方法：executeQuery
- 执行sql语句进行数据库数据的增加，删除，修改等更新方法：executeUpdate

```java
public class DBUtil {
    private static String URL;
    private static String USER;
    private static String PASSWORD;
    private static String DRIVER;
    private PreparedStatement ps;
    private Connection connection;  //数据库连接对象
    private ResultSet resultSet;    //查询结果集
    private boolean autoCommit;
    public DBUtil() {
        DRIVER = Config.getValue("driver");
        URL = Config.getValue("url");
        USER = Config.getValue("user");
        PASSWORD = Config.getValue("pwd");
    }
    /**
     * 获取数据库连接
     * @return connection 数据库连接对象
     */
    public Connection getConnection() throws SQLException {
        try {
            Class.forName(DRIVER);
            // 获取数据库连接
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("数据库连接成功");
            return connection;
        } catch (Exception e) {
            // 如果连接过程出现异常，抛出异常信息
            e.printStackTrace();
            throw new SQLException("驱动错误或连接失败！");
        }
    }

    /**
     * 释放资源
     */
    public void closeAll() {
        // 关闭resultSet
        if(resultSet != null) {
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        // 关闭ps
        if(ps != null) {
            try {
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        // 关闭connection
        if(connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 执行sql语句进行数据库数据的查询
     * @param preSql 待填充参数的数据库查询语句
     * @param params 准备填充的参数列表
     * @throws SQLException 数据库更新异常
     * @return ResultSet 结果集
     */
    public ResultSet executeQuery(String preSql, List<Object> params) {
        try {
            ps = connection.prepareStatement(preSql);
            if (ps != null) {
                // 填充参数
                for(int i = 0; i < params.size(); ++i) {
                    ps.setObject(i+1, params.get(i));
                }
            }
            // 执行sql语句
            resultSet = ps.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return resultSet;
    }


    /**
     * 执行sql语句进行数据库数据的增加，删除，修改等更新
     * @param sql 待填充参数的数据库查询语句
     * @param params 准备填充的参数列表
     * @throws SQLException 数据库更新异常
     * @return 是否更新成功
     */
    public boolean executeUpdate(String sql, List<Object> params) throws SQLException {
        int rowNum = -1;        // 如果行号小于零说明更新失败
        ps = connection.prepareStatement(sql);
        if (params != null && !params.isEmpty()) {
            for(int i = 0; i < params.size();  ++i) {
                ps.setObject(i+1, params.get(i));
            }
        }
        rowNum = ps.executeUpdate(); //executeUpdate的返回值是一个整数，指示受影响的行数（即更新计数）
        return rowNum > 0;
    }
}
```

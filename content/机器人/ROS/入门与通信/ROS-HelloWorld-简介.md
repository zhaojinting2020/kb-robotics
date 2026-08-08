---
title: ROS HelloWorld 简介
url: http://www.autolabor.com.cn/book/ROSTutorials/chapter1/13-rosji-cheng-kai-fa-huan-jing-da-jian/131-helloworldshi-xian-jian-jie.html
fetch_source: internet_archive
fetched_at: '2026-06-27T20:03:06+00:00'
polished_at: '2026-06-27T18:51:38+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# ROS HelloWorld 简介

### 1.3.1 HelloWorld实现简介
ROS中涉及的编程语言以C++和Python为主，ROS中的大多数程序两者都可以实现，在本系列教程中，每一个案例也都会分别使用C++和Python两种方案演示，大家可以根据自身情况选择合适的实现方案。

ROS中的程序即便使用不同的编程语言，实现流程也大致类似，以当前HelloWorld程序为例，实现流程大致如下：
- 先创建一个工作空间；
- 再创建一个功能包；
- 编辑源文件；
- 编辑配置文件；
- 编译并执行。上述流程中，C++和Python只是在步骤3和步骤4的实现细节上存在差异，其他流程基本一致。本节先实现C++和Python程序编写的通用部分步骤1与步骤2，1.3.2节和1.3.3节再分别使用C++和Python编写HelloWorld.

#### 1. 创建工作空间并初始化

```bash
mkdir -p 自定义空间名称/src
cd 自定义空间名称
catkin_make
```

上述命令，首先会创建一个工作空间以及一个 src 子目录，然后再进入工作空间调用 catkin_make 命令编译。

#### 2. 进入 src 创建 ros 包并添加依赖

```bash
cd src
catkin_create_pkg 自定义ROS包名 roscpp rospy std_msgs
```

上述命令，会在工作空间下生成一个功能包，该功能包依赖于 roscpp, rospy 与 std_msgs，其中 roscpp 是使用 C++ 实现的库，而 rospy 则是使用 Python 实现的库，std_msgs 是标准消息库，创建 ROS 功能包时，一般都会依赖这三个库实现。

**注意：** 在 ROS 中，虽然实现同一功能时，C++ 和 Python 可以互换，但是具体选择哪种语言，需要视需求而定，因为两种语言相较而言：C++ 运行效率高但是编码效率低，而 Python 则反之，基于二者互补的特点，ROS 设计者分别设计了 roscpp 与 rospy 库，前者旨在成为 ROS 的高性能库，而后者则一般用于对性能无要求的场景，旨在提高开发效率。

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[ROS-话题通信模型|ROS 话题通信模型]]
[[小乌龟键盘无法控制|小乌龟键盘无法控制]]

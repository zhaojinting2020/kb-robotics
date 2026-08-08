---
title: Apollo Cyber RT 框架
url: https://zhuanlan.zhihu.com/p/397607823
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T20:14:40+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Apollo Cyber RT 框架

## [Apollo Cyber RT](https://zhida.zhihu.com/search?content_id=176487663&content_type=Article&match_order=1&q=Apollo+Cyber+RT&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3MjkxNTUsInEiOiJBcG9sbG8gQ3liZXIgUlQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzY0ODc2NjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.s-C3rWg14t1r34QLv29Yrl0zgYIBDa49myuD1GnL6jo&zhida_source=entity)学习
### 什么是Cyber RT？

Cyber RT是百度Apollo推出的代替[ROS](https://zhida.zhihu.com/search?content_id=176487663&content_type=Article&match_order=1&q=ROS&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3MjkxNTUsInEiOiJST1MiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzY0ODc2NjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.M26crVC0OEy49stY65U2ClEUwyDCMD6F1PQ-GWqGUC0&zhida_source=entity)的消息中间件，它是一个开源, 高性能的运行时框架，专为自动驾驶场景而设计。基于中心化的计算模型，针对自动驾驶的高并发, 低延迟, 高吞吐进行了大幅优化。自动驾驶的各个模块通过Cyber进行消息的订阅和发布，同时Cyber还提供了任务调度，录制bag包等功能。通过Cyber实现了自动驾驶的中间层。

### 为什么需要Cyber RT？

Apollo 3.5以前使用的系统为ROS，各节点之间的通信方式为进程间的通信。在实际的应用中，ROS在自动驾驶领域遇到很多挑战：
*   首先ROS的算法模块以独立进程的形式存在，独立进程的节点的运行顺序无法确定，因此业务逻辑的调度顺序无法保证。
*   其次，ROS是一个分布式的系统，存在通信的开销。
*   此外，ROS系统中还存在其他很多不确定的地方，比如内存的动态申请。ROS的资源分配时不确定的，

![Image 1](https://pica.zhimg.com/v2-460efcbc1fc0bf11c0c2ada1936220d8_1440w.jpg)

<p class="kb-image-caption">图例</p>

Cyber主要的作用就是一个消息中间件，它们需要管理不同的模块，并让它们互相之间可以高效通信。在Apollo6.0中，它作为RTOS和自动驾驶各个模块的中间通信接口。
![Image 2](https://pica.zhimg.com/v2-aa05266c9d97d6c40305b023e2aefefc_1440w.jpg)

<p class="kb-image-caption">图例</p>
*   **开发工具：** 提供了一系列的工具包括消息监控(Cyber_monitor)，消息可视化(Cyber_visualizer)，录制/回放工具(Cyber_recorder), ros包录制(rosbag_to_recorder).
### Cyber RT的架构

Cyber RT的框架如下图所示：
*   基础库：Cyber RT为了高性能和减少依赖，实现了自己的基础库。(Lock-free的对象池，队列)
*   通信层：Publish/Subscribe机制，Service/Client机制，服务自发现，自适应的通信机制（共享内存, Socket, 进程内存）
*   数据缓存/融合层：数据缓存与融合。多路传感器之间数据需要融合，而且算法可能需要缓存一定的数据。比如典型的仿真应用，不同算法模块之间需要有一个数据桥梁，数据层起到了这个模块间通信的桥梁的作用
*   计算层：计算模型，任务以及任务调度
*   接口： Cyber RT为开发者提供了component类，开发者的算法业务模块只需要继承该类，实现其中的proc接口即可。该接口类似于ROS的callback，消息通过参数的方式传递。此外Cyber RT也提供了并行计算的相关接口以及用于开发调试, 录制回放的工具。

![Image 3](https://pic3.zhimg.com/v2-90bd571e585c8a1ea4f8261955fc51d4_1440w.jpg)

<p class="kb-image-caption">图例</p>
1.   算法模块：算法模块通过**有向无环图**(DAG, Directed Acyclic Graph)配置任务间的逻辑关系。每个算法都可以进行优先级, 运行时间, 使用资源等方面的配置。
2.   创建任务：Cyber RT可以结合DAG创建任务，任务的实现方式不是thread，而是[协程](https://zhida.zhihu.com/search?content_id=176487663&content_type=Article&match_order=1&q=%E5%8D%8F%E7%A8%8B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3MjkxNTUsInEiOiLljY_nqIsiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzY0ODc2NjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.5gra2iPTOdzYMoeUHJKrC8BQDv7HBTiR7Pu219caO1g&zhida_source=entity)(coroutine).
3.   调度器：调度器根据调度, 任务配置将任务放入相关Processor的队列中。
4.   数据输入: Senor输入数据驱动系统的运转。

![Image 4](https://pic2.zhimg.com/v2-e12d9416e625e71b2108636dbb7f2863_1440w.jpg)

<p class="kb-image-caption">图例</p>

ROS的主要挑战之一是：ROS的算法模块以独立进程的形式存在，独立进程的节点的运行顺序无法确定，因此业务逻辑的调度顺序无法保证。为了解决这个问题，**Cyber RT将调度, 任务从内核空间搬到了任务空间，使得调度可以和算法业务逻辑紧密结合。** 从Cyber RT角度，OS的[Native thread](https://zhida.zhihu.com/search?content_id=176487663&content_type=Article&match_order=1&q=Native+thread&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3MjkxNTUsInEiOiJOYXRpdmUgdGhyZWFkIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTc2NDg3NjYzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.RTeMgukRbH8DDyX-VDGjoaADzSDUkuQJ6G3fy5ao9-Y&zhida_source=entity)相当于物理CPU. 在OS中，是内核中的调度器负责调度任务（进程, 线程……）到物理CPU上运行。而在Cyber RT中，是Cyber RT中的调度器调度协程(Coroutine)在Native Thread上有序运行。

### Cyber RT为什么要使用协程

Apollo将算法模块搭载在协程上，关于协程和线程的区别可以简单的描述为：协程是轻量化的线程，线程是进程下面的多个并行化任务，线程与线程之间的通信必须经过信道进行，然而协程能够直接经过访问全局变量来进行协程之间的通讯。Cyber RT通过croutine模块实现了一个高性能的协程库，为整个系统提供协程的调用。

### Cyber RT的编排调度策略
![Image 5](https://pic3.zhimg.com/v2-ffce71bda054999a3bbaaef5e5a71432_1440w.jpg)

<p class="kb-image-caption">图例</p>

Apollo Cyber​​ RT 框架建立在组件的概念之上。作为 Cyber​​ RT 的构建块，每个组件都是一个特定的算法模块，它处理一组输入并生成一组输出。
![Image 8](https://pic1.zhimg.com/v2-22389a4cc7fc6a1dd49c1fabf6248126_1440w.jpg)

<p class="kb-image-caption">图例</p>

详细步骤参见：[https://github.com/ApolloAuto/a pollo/blob/master/docs/cyber/CyberRT_Quick_Start.md](https://link.zhihu.com/?target=https%3A//github.com/ApolloAuto/apollo/blob/master/docs/cyber/CyberRT_Quick_Start.md)

### 参考

[1] [https://zhuanlan.zhihu.com/p/91 322837](https://zhuanlan.zhihu.com/p/91322837) [2] [https://edu.csdn.net/course/pla y/16425/245037](https://link.zhihu.com/?target=https%3A//edu.csdn.net/course/play/16425/245037) [3] [http://www.javashuo.com/article/p-tuuamgvk-no.html](https://link.zhihu.com/?target=http%3A//www.javashuo.com/article/p-tuuamgvk-no.html) [4] [https://blog.csdn.net/kesalin/a rticle/details/88914029](https://link.zhihu.com/?target=https%3A//blog.csdn.net/kesalin/article/details/88914029) [5] [https://github.com/ApolloAuto/a pollo/blob/master/docs/cyber/](https://link.zhihu.com/?target=https%3A//github.com/ApolloAuto/apollo/blob/master/docs/cyber/)

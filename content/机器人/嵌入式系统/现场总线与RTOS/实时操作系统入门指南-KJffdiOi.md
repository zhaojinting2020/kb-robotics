---
title: 实时操作系统入门指南
url: https://my.feishu.cn/docx/KJffdiOi1ovyhBxGZxTcG2TEnvh
quality: raw
feishu_formatted_at: '2026-06-28T07:15:40+00:00'
wikilinks_refreshed_at: '2026-06-28T07:36:00+00:00'
---

# 嵌入式实时操作系统理论基础

## 什么是实时系统

- 实时系统指能及时响应外部发生的随机事件，并以一定时间内完成对事件处理的计算机应用系统。
- 实时系统的衡量指标包括：
  - 响应时间：计算机识别一个外部事件到做出响应的时间
  - 生存时间：数据有效等待时间
  - 吞吐量：在一定的时间内，系统可以处理的事件总数
- **硬实时系统**：一旦系统响应时间不能满足，就会引起系统崩溃或者致命错误。
- **软实时系统**：偶尔错过时限，系统仍然能正常运行，只是性能会降低。通常用系统平均响应时间来衡量。
- **抢占式调度**：操作系统可以在任务执行过程中中断当前任务，将CPU分配给另一个更高优先级的任务。
- **非抢占式调度**：一旦一个任务开始执行，它将一直运行直到完成或主动放弃CPU.
- 嵌入式实时系统并不一定都使用抢占式调度。选择哪种调度方式取决于系统的具体需求。但在实际应用中，抢占式调度因其能够快速响应高优先级任务而被广泛使用。

- **多数的内核支持两种调度算法**：基于优先级的抢占调度 & 时间片论转调度

## 操作系统及其开发环境

- 最底层针对不同的体系架构提供的csp的支持，对不同的板卡有不同的板级支持包来做一些适配。
- 上一层是内核，提供基础的任务，时钟，中断，内存管理; 多核处理，异常管理等。
- 扩展层提供丰富的网络协议，用户界面，文件系统和USB协议栈。

- SMP（Symmetric Multi-Processing，对称多处理）是一种计算机架构，其中多个处理器（CPU）共享相同的物理内存和操作系统。在 SMP 处理模式下，操作系统可以将任务分配给任何一个处理器，这些处理器在功能上是对称的，即每个处理器都可以执行任何任务。
- SMP多核中，每一个CPU分别对应一个就绪的任务。当一个新建的任务/处于就绪态的任务想要获取CPU资源的时候，可以根据哪个CPU处于空闲状态来把任务分配到对应空闲的cpu上去执行。

- 可以通过特殊的设定，将任务绑定到一个特定的核去运行。
- **BSP架构和启动流程**

- BSP：驱动外设为操作系统提供服务

   
- 时钟和中断启动之后，就可以启动多任务环境了。当所有初始化完成，就会进入UserInit作为应用程序的入口。

   
## 应用部署

**Reworks的加载分为网络加载和本地加载**。网络加载：

通过TFTP服务将Reworks镜像传输到目标机器。在网络加载之前，用户需要配置具体的网络引导参数，包括：目标机器的IP， TFTP服务器的IP等。本地固化加载：

用户将reworks镜像拷贝到SD卡或者移动设备，从该设备加载Reworks镜像。

## Vxworks 操作系统

[vxworks系统框架 - youtube](https://www.youtube.com/watch?v=EdYDv61jvd0&list=PLUvMA4Jsr79AN3-olnBCGw_H60I0O643C&index=3)

[[VxWorks-Workbench-培训资料-VlKAdIBn|Vxworks &amp; WindRiver Workbench 培训资料]]

## 如何连接workbench与CPU

需要一根网线和一根串行通信线。网线负责将编译好的镜像下载到CPU，串行通信线负责显示命令行的输入输出。将网线和串口线连接好。

![20250217-174041](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_012.jpg)

<p class="kb-image-caption">20250217-174041</p>
![20250217-174046](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_013.jpg)

<p class="kb-image-caption">20250217-174046</p>

打开计算机网络，检查串口号，这里可以看到链接电脑和CPU的分别为com1 和 com3.

![20250217-174121](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_014.jpg)

<p class="kb-image-caption">20250217-174121</p>
![20250217-174052](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_015.jpg)

<p class="kb-image-caption">20250217-174052</p>

打开SecureCRT portable（负责显示串口通信的内容），点击左上角的连接，选择合适的serial com

![20250217-174106](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_016.jpg)

<p class="kb-image-caption">20250217-174106</p>
![20250217-174101](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_017.jpg)

<p class="kb-image-caption">20250217-174101</p>

CPU的串口号是10.9.0.18, 我们需要将电脑的串口号改为10.9.0.100

![20250217-174119](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_018.jpg)

<p class="kb-image-caption">20250217-174119</p>
![20250217-174116](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_019.jpg)

<p class="kb-image-caption">20250217-174116</p>

打开“查看网络连接”，选择以太网，右键属性，选择“Internet 协议版本”，修改IP地址和子网掩码。

![20250217-174113](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_020.jpg)

<p class="kb-image-caption">20250217-174113</p>
![20250217-174109](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_021.jpg)

<p class="kb-image-caption">20250217-174109</p>

打开w[ftp](https://baike.baidu.com/item/Ftp/13839)d32（用于显示镜像文件的下载状态）

![20250217-174058](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_022.jpg)

<p class="kb-image-caption">20250217-174058</p>
![image](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_023.png)
打开windriver workbench，选择build project或者rebuild project，编译成功后，命令行会显示Build Finished.

![image](attachments/KJffdiOi1ovyhBxGZxTcG2TEnvh/img_025.png)
参考文章：

[https://www.bilibili.com/video/BV1264y1a7Do/?spm_id_from=333.788.reco...](https://www.bilibili.com/video/BV1264y1a7Do/?spm_id_from=333.788.recommend_more_video.2&vd_source=c8041efd376e7f34e73272f6ae86b7a5)

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[VxWorks-Workbench-培训资料-VlKAdIBn|VxWorks Workbench 培训资料]]
[[嵌入式学习笔记-YuhFd2ye|嵌入式学习笔记]]
[[机器人/PLC与工业/ViGET-许继与DPS/DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]] — _PLC / 工业_
[[HVDC-变压器放电故障诊断-H3ZLdpYX|HVDC 变压器放电故障诊断]] — _PLC / 工业_
[[PLC-基础理论教程-BbIQdZZp|PLC 基础理论教程]] — _PLC / 工业_
[[Profinet-Driver-架构(UfY6)-UfY6dCEK|Profinet Driver 架构（UfY6）]] — _PLC / 工业_
[[SIMATIC-D7-FB-Gen-说明-ZTkwd4rd|SIMATIC D7 FB-Gen 说明]] — _PLC / 工业_

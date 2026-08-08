---
title: 术语定义
url: https://my.feishu.cn/docx/GuiRdHfMrojIP1xN034c4nN9nnc
quality: raw
fetch_source: feishu:cli
fetched_at: '2026-06-27T20:45:00+00:00'
feishu_formatted_at: '2026-06-28T07:15:38+00:00'
wikilinks_repaired_at: '2026-06-27T20:45:00+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
sheets_expanded_at: '2026-06-29T10:25:09+00:00'
---

# 定义

OPC Unified Architecture OPC UA is a platform-independent, service-oriented architecture specification that integrates all functionality from the existing OPC Classic specifications, providing a migration path to a more secure and scalable solution.

## 1.1 什么是OPC？

OPC标准是 “OLE for Process Control” 的缩写，即应用于过程控制的OLE. 它是一种工业标准接口，用于工业控制和生产自动化领域中硬件和软件之间的通信。OPC基于微软的OLE/COM和DCOM技术，为自动化应用提供了一整套接口, 属性和方法的标准集。OPC 主要运行在windows的工业PC上。

OPC UA 是OPC 的后继标准，只是后面增加了UA , 意指”统一架构”(Unified Architecture)，它的主要目的是摆脱windows，实现与平台无关的OPC.OPC UA作为一种跨平台的通信协议，可以与EtherCAT和Profinet等现场总线技术相结合，以实现更广泛的系统集成和数据交换。

OPC UA的基础组建是传输机制和数据建模。OPC UA有多种传输机制，将在1.4做进一步的说明。OPC采用面向对象的概念，提供了一个丰富, 可拓展的信息模型。这个机制允许其他组织定义使用OPC UA作为基础设施的标准信息模型。如：PLCOpen

## 1.3 数据建模（重点）

OPC UA建模的基本概念是节点和节点之间的引用。节点是OPC UA数据交互的基本单元，客户端和服务器之间的交互通信，都是基于节点进行的。OPC UA中预定义了8种节点，一些节点代表类型，一些节点代表实例。

### 实例节点

最重要的节点类别是对象（object），变量（variable）和方法（method）。

- 对象可以拥有变量和方法，而且可以触发事件。
- 变量代表一个值。
- 方法代表服务器中一个由客户端调用并返回结果的方法。方法必须属于一个对象。

### 类型节点

- ObjectType定义对象的类型
- VariableType定义变量的类型。
- 引用类型也是一种节点。节点包含属性和引用。属性被用来描述节点，一个节点可以有不同的属性集。一些公共的属性包括：

OPC UA服务总的来说可以分为两种类型。一种**建立通信通道**，如安全通道，订阅，监视等。另一种用于**交换信息**，如获取有关地址空间结构，读，写，发布等服务。

These services are grouped into several service sets.

- **Discovery Service Set**:Helps clients discover available OPC UA servers and their endpoints.
- **Subscription and Monitoring Service Set**:Clients can create subscriptions to monitor changes to data items. The server sends notifications to the client when data changes. Services include CreateSubscription, ModifySubscription, SetPublishingMode, Publish, Republish, and DeleteSubscriptions
- **Node Management Service Set**:Allows clients to add, delete, and manage nodes and references in the server's address space.
- **View Service Set**:Clients use these services to navigate through the address space or a subset of it (View). Services include Browse, BrowseNext, TranslateBrowsePathsToNodeIds, RegisterNodes, and UnregisterNodes.
- **Query Service Set**:Provides a way for clients to query the server for data, independent of the internal storage schema.
- **Attribute Service Set**:Clients can read and write attributes of nodes, which are part of the server's information model.

### 1.4.2 技术映射

OPC UA mappings define how data and services are transmitted between OPC UA applications **using different transport protocols.** This flexibility allows OPC UA to be used in various industrial and web-based environments while maintaining high performance and security.

### OPC UA对于编码层的映射包括UA二进制和XML.

OPC UA的基本概念是基于一个定义好的规则，将特定的基本数据类型转译到二进制表示，并写入一个二进制流中。大部分复杂数据类型由基本数据类型结合产生，顺序地将他们包含的基本数据类型转译到二进制格式，即可完成复杂数据类型的转译。内建数据类型通过公共的XML规范来编码。更复杂的数据结构由基于嵌套的XML元素构成。

### OPC UA对于安全层的映射包括WS-SecureConversation和UA-SecureConversation.

### OPC UA对于传输层的映射包括UA TCP 和 SOAP/HTTP.

OPC UA TCP 是基于General TCP开发的。具有独特的安全机制和数据编码机制。UA TCP 有 三种消息类型，分别为:

Hello message - 由客户端发送给服务器，以便建立一个socket连接，连接到服务器提供的特定终端。同时从服务器请求数据收发缓冲区的大小，块和消息的最大长度。

Acknowledge message - 作为hello消息的回应，服务器发送一个确认消息，确认数据收发缓冲区的大小，块和消息的最大长度。

Error message - 在发生连接问题的时候，向client发送该信息。

### 1.4.3 安全

OPC UA的安全模型是一个综合性的解决方案，旨在确保工业自动化环境中数据通信的安全性。

OPC UA的安全架构分为应用层和通信层：

- **应用层**：负责用户认证和授权，管理会话（Session）。
- **通信层**：提供数据加密, 消息签名和应用认证，确保数据的保密性, 完整性和真实性。安全通道由通信层保证。

![[attachments/GuiRdHfMrojIP1xN034c4nN9nnc/img_005.png|img_005.png]]
OPC UA SDK 是由Matrikon公司开发的基于C/C++语言的高性能OPC UA通信协议开发包。该公司提供MatrikonFlexOPCServer/MatrikonFlexOPCClient的源码实现。

### 项目进度管理

[Project management](https://my.feishu.cn/docx/ZCaGbhmwdaZdqvsO2CEcGOl2nJ7)

### 软件架构

OPC UA SDK可以编译出MatrikonFlexOPCServer Application & MatrikonFlexOPCClient Application

该代码包含配置好的 CMakeLists 和多个例程，正是这些 CMakeLists 设置和代码中**完善的宏定义**，使得源码能在 Windows 平台和 Linux 平台都能简单通过编译，编译时也能自动适应 C 或 C++的不同语境。

### 编译步骤

Server/Client在linux平台编译的步骤如下：

Server/Client在windows平台编译的步骤如下：

### 配置 OPC Server & OPC Client

在Server和Client都编译成功后，启动OPC UA Server

```text

cd ~/Desktop/MatrikonFlexOPC/MatrikonFlexOPCServer/build/bin
./no_security_single_threaded
```

在终端界面显示出如下图所示，说明Server启动成功。

![[attachments/GuiRdHfMrojIP1xN034c4nN9nnc/img_009.png|img_009.png]]
根据[How to Connect to an OPC UA Server](https://www.cybus.io/learn/machine-connectivity/how-to-connect/how-to-connect-to-an-opc-ua-server/)，启动OPC UA client 并浏览Server的地址空间。另起一个terminal并运行

```text

pip3 install opcua-client
opcua-client
```

在弹出的可视化图形界面OPC UA Client中，指定OPC Server的地址，并点击connect，就会在界面内显示出OPC Server的地址空间节点树。

[OPC UA简介_opcua-CSDN博客](https://blog.csdn.net/m0_46577050/article/details/120898867)

[OPC UA技术通俗理解, 案例体验_opcua-CSDN博客](https://blog.csdn.net/u012351051/article/details/109516421)

[OPC UA信息模型如何工作？\_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1BK411A7nL?spm_id_from=333.788.recommend_more_video.-1&vd_source=c8041efd376e7f34e73272f6ae86b7a5)

[OPC UA协议:优势, 消息结构, 安全协议, 客户端-服务器架构, 节点ID, 地址空间, 实现库与工具, 应用场景_opc ua通讯协议-CSDN博客](https://blog.csdn.net/weixin_61742549/article/details/141557988)

[[2] OPC UA信息建模_opc ua 建模-CSDN博客](https://blog.csdn.net/qq_33406883/article/details/106274134)

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[PLC-基础理论教程-BbIQdZZp|PLC 基础理论教程]]
[[机器人/PLC与工业/PLC-教程与架构/功能块的创建与使用-PHRidZmk|功能块的创建与使用]]
[[EP1501_SmartPLC 技术架构-InO3dHmx|技术架构]]
[[机器人/PLC与工业/ViGET-许继与DPS/DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]] — _PLC / 工业_
[[HVDC-变压器放电故障诊断-H3ZLdpYX|HVDC 变压器放电故障诊断]] — _PLC / 工业_
[[Profinet-Driver-架构(UfY6)-UfY6dCEK|Profinet Driver 架构（UfY6）]] — _PLC / 工业_
[[SIMATIC-D7-FB-Gen-说明-ZTkwd4rd|SIMATIC D7 FB-Gen 说明]] — _PLC / 工业_

## 附件


---
title: 工业通信入门
url: https://my.feishu.cn/docx/RZVpdcXQXodfYYxHa27ck3KhnYc
quality: raw
fetch_source: feishu:cli
fetched_at: '2026-06-27T20:54:11+00:00'
feishu_formatted_at: '2026-06-28T07:15:41+00:00'
wikilinks_repaired_at: '2026-06-27T20:54:11+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
wikilinks_refreshed_at: '2026-06-28T07:15:34+00:00'
sheets_expanded_at: '2026-06-29T10:25:34+00:00'
---

# 计算机网络基础

## 常见的网络模型

| 应用层 | 其作用是通过应用程序间的交互来完成特定的网络应用。 |
| --- | --- |
| 表示层 | 该层提供的服务主要包括数据压缩，数据加密以及数据描述。 |
| 会话层 | 会话层就是负责建立, 管理和终止表示层实体之间的通信会话。 |
| 传输层 | 传输会话层的报文，传输层建立了主机端到端的链接，传输层的作用是为上层协议提供端到端的可靠和透明的数据传输服务，包括处理差错控制和流量控制等问题。TCP协议以及UDP协议 |
| 网络层 | 网络层的主要任务就是选择合适的网间路由和交换节点，确保数据按时成功传送。网络层负责对子网间的数据包进行路由选择。基本数据单位为IP数据报。通讯协议为IP协议 |
| 数据链路层 | 数据链路层在不可靠的物理介质上提供可靠的传输。该层的作用包括：物理地址寻址, 数据的成帧, 流量控制, 数据的检错, 重发等。以太网协议，使用MAC地址 |
| 物理层 | 物理层的作用是实现计算机节点之间比特流的透明传送，尽可能屏蔽掉具体传输介质和物理设备的差异。使其上面的数据链路层不必考虑网络的具体传输介质是什么。传输的是高低电平常用设备有集线器, 中继器, 调制解调器, 网线, 双绞线, 同轴电缆。这些都是物理层的传输介质。 |

<p class="kb-image-caption">QsJwbjk33o182dxUyVzcjLRDnDd</p>

MAC地址，全称为媒体访问控制地址（Media Access Control Address），是网络设备制造商为网络硬件（如无线网卡或以太网网卡）分配的唯一代码。每个网络设备都有一个全球唯一的MAC地址，用于在数据链路层标识网络中的每个设备。

MAC地址通常由48位二进制数组成，并以16进制格式展示，表现为六组双字符，组与组之间用冒号分隔，例如：00:1B:44:11:3A:B7.MAC地址是烧录在网卡（NIC）中的，是全球唯一的，每个网卡在出厂时都会被分配一个独特的MAC地址。在网络通信中，MAC地址用于Ethernet协议，属于数据链路层。

IP地址则用于Internet协议，属于网络层，两者之间没有直接联系。

## TCP通信协议

### TCP报文格式

![QJONbO1ZCoKxW7xzTvEcveadn0b](attachments/RZVpdcXQXodfYYxHa27ck3KhnYc/img_002.png)

<p class="kb-image-caption">QJONbO1ZCoKxW7xzTvEcveadn0b</p>

<p class="kb-image-caption">AyOnbzTQuoFGD3xPHl1cWvAjnEb</p>

UDP与TCP位于同一层，但它不管数据包的顺序, 错误或重发。因此，UDP不被应用于那些使用虚电路的面向连接的服务，UDP主要用于那些面向**查询---应答**的服务，例如NFS. 相对于FTP或Telnet，这些服务需要交换的信息量较小。

UDP的头部如下图所示：

![DbBpbTqcmoqHTjxXSzIcC3f9nLh](attachments/RZVpdcXQXodfYYxHa27ck3KhnYc/img_004.png)

<p class="kb-image-caption">DbBpbTqcmoqHTjxXSzIcC3f9nLh</p>

[计算机网络-OSI七层模型-CSDN博客](https://blog.csdn.net/rambler_designer/article/details/118365613)

[计算机网络基础知识总结 | 菜鸟教程](https://www.runoob.com/w3cnote/summary-of-network.html)

[UDP的首部格式_udp首部-CSDN博客](https://blog.csdn.net/jiaomubai/article/details/100862807)

## 工业通信协议

### 工业通信协议总览

<figure view-type="Preview">

</figure>

#### Modbus

**Modbus** 是一种简单的方式，用于让 PLC 和各种现场设备互相通信。它采用主从结构，由主控制器发起指令，从设备响应，非常适合读取传感器数据或监控系统。添加新设备或升级系统时，Modbus 可以快速集成而不影响现有设备。它的优势在于兼容性强，扩展系统无需大规模改布线或重新编码，同时成本低，可通过串口或以太网高效运行，部署和维护都更方便。

<figure view-type="Preview">

</figure>

#### PROFIBUS

**PROFIBUS** 是一种强大的工业现场总线，适合复杂的过程控制系统。它的通信具有确定性，能保证设备按精确时间传输数据，非常适合高速生产线或精密制造。与分布式 I/O 模块结合良好，方便管理大规模系统。

PROFIBUS 支持多种设备类型，数据传输稳定可靠，还能进行直接诊断，帮助提前发现问题，缩短维护时间。模块化设计让扩展和升级更简单，重新配置快，从而提高整个系统的效率和生产率。

#### Profinet

**Profinet** 是一种由西门子主导的工业以太网协议，用于 PLC, 传感器, 驱动器和 HMI 之间通信。它支持毫秒级实时控制, 分布式 I/O 和设备互操作，布线简单, 兼容标准 TCP/IP 网络，适用于自动化生产线, 分布式控制系统和运动控制。国产高端 PLC（如汇川, 步科, 台达）也普遍支持。

<figure view-type="Preview">

</figure>

#### CANopen

**CANopen** 是建立在控制器局域网（CAN）上的通信协议，强调实时性和灵活配置。它适合那些设备需要持续通信但不能占用太多资源的场景。CANopen 会把数据分成不同的报文对象，可以优先传输关键数据，而非次要信息。设备配置也很直观，传感器和执行器的行为可以统一管理，配置简单易懂。它的好处是可以把多个 PLC 任务整合到一条总线上，降低系统复杂度，从而节省调试和维护成本。同时在汽车或重型机械等环境中，CANopen 更新快, 可靠性高，有助于减少停机时间，并支持未来扩展。

<figure view-type="Preview">

</figure>

#### EtherCAT

**EtherCAT** 是一种高速工业以太网通信协议，专为实时控制和运动控制设计。它采用主从环网结构，数据通过“在途处理”方式高速传输，使每个设备几乎同时接收到控制命令，非常适合高速生产线和精密机械。EtherCAT 支持分布式 I/O, 伺服驱动器和传感器的同步控制，同时布线简单, 延迟低。国产高端 PLC（如汇川, 台达, 步科）在运动控制和机器人应用中广泛支持 EtherCAT，能够显著提高系统响应速度和控制精度，同时便于后期扩展和维护。

<figure view-type="Preview">

</figure>

### OPC UA协议

#### OPC UA 简介

OPC 是 Open Platform Communications（开放平台通信） 的缩写，它是工业 4.0 和物联网（IoT）中最重要的通信标准之一。通过 OPC，可以让工业环境中的机器, 设备和系统以统一的方式进行数据访问，实现跨厂商, 跨平台的数据交换。其中 OPC UA 的 “UA” 代表 Unified Architecture（统一架构），这是 OPC 标准的最新版本。它与早期版本不同，不再依赖 COM/DCOM，而是采用纯 TCP/IP 二进制通信 或 SOAP 协议，更加 跨平台, 开放, 灵活。此外，OPC UA 还支持语义化数据描述，让数据的含义更加明确。

### OPC Server & OPC Client

![image](attachments/RZVpdcXQXodfYYxHa27ck3KhnYc/img_005.png)
在 OPC UA Pub/Sub（发布/订阅） 模式中，通信参与方分为 发布者（Publisher） 和 订阅者（Subscriber）。设备和软件可以通过一个 中介（Broker） 进行通信，而不再依赖传统客户端/服务器那种 一对一 的连接方式。这种结构的好处是：

- 通信速度更快（数据可以同时分发给多个订阅者）；
- 系统负载更低（减少了重复的请求与响应过程）；
- 整体效率更高，能更好地利用处理器资源。

### OPC Classic vs. OPC UA

当前的 OPC 标准是 OPC UA（OPC Unified Architecture，统一架构）。它是旧版 OPC Classic 的继任者。直到今天，许多系统中仍在使用 Classic OPC Server. 旧标准（OPC Classic）在当时已经非常成功——它实现了跨厂商的数据交换，并定义了基础接口规范。但它的最大缺点是：缺乏平台独立性。因为 OPC Classic 基于微软的 COM/DCOM 技术，所以它只能运行在 Windows 系统和网络 上。随着其他平台（如 Linux, Web 架构, 云平台, 物联网设备, CPS 系统 等）的崛起，这种限制逐渐让 OPC 的应用范围受到了约束。于是，OPC 基金会（OPC Foundation） 推出了新一代标准 —— OPC UA. 它以 平台无关性 和 互操作性（interoperability） 为核心目标。从技术上看，OPC UA 建立在现代网络基础之上（TCP/IP, HTTP/SOAP），并在保留原有数据交换概念的同时，进行了整合和扩展，从而成为更开放, 更灵活的新一代工业通信标准。

### OPC Foundation

OPC基金会是该标准背后的组织，拥有678个成员，基础非常广泛。其成员包括自动化行业的全球巨头，如西门子, 霍尼韦尔, 微软, 倍福, SAP, 横河, ABB, 罗克韦尔, 施耐德电气, 万可, Iconics等。所有基金会成员都可以在OPC基金会成员列表中找到。该协会成立于1994年，并于1996年发布了第一个OPC版本。从那时起，基金会一直积极推动OPC标准的持续开发和推广。

### OPC UA and Industry 4.0

2011年，“工业4.0”这一术语首次在一个工作组中提出。而OPC UA早在此之前就已经被定义为标准。然而，OPC UA仍然是工业4.0中领先的通信协议之一。工厂的智能联网需要一种通用语言，OPC UA正好满足这一需求，因此它是实现工业4.0的重要工具。

![image](attachments/RZVpdcXQXodfYYxHa27ck3KhnYc/img_007.png)
 PLC 作为现场控制核心，负责采集电力设备（如变电站, 发电机, 风电/光伏系统）的电压, 电流, 功率等信号。通过 OPC UA，PLC 将这些数据统一传输到监控系统，实现实时监控。
- 故障诊断与预警：  

 当 PLC 检测到设备异常（如过载或过温）时，可通过 OPC UA 向监控系统发送报警信息，实现远程预警和运维管理。
- 数据分析与优化：  

 OPC UA 提供标准化的数据接口，将 PLC 收集的数据上传到能效分析或能源管理平台，支持负荷优化, 能耗分析和发电策略调整。

### 智慧工厂

- 设备互联与数据统一：  

 PLC 控制生产线设备（机器人, 传感器, 机械臂等），OPC UA 将这些设备数据标准化，使不同厂家的设备可以互通。
- 实时监控与自动控制：  

 通过 OPC UA 的订阅/发布机制，PLC 可以实时接收上位系统或其他设备的指令，实现自动调节。例如，当温度传感器检测到过高温度时，PLC 可自动控制冷却系统动作。
- 生产优化与远程管理：  

 工厂管理系统通过 OPC UA 访问 PLC 数据进行生产调度, 预测维护和能耗优化。同时，OPC UA 支持跨网络访问，使多个厂区或生产线的 PLC 数据可以集中管理。

[[术语定义-GuiRdHfM|OPC UA 入门指南]]

### 与上位机, HMI, SCADA系统通信实现

#### HMI

HMI（Human-Machine Interface）就是操作人员与系统, 设备或机器之间的 **用户界面**，通过它可以监控, 控制和交互。

HMI（人机界面） 并不是某个特定的硬件，而是一块 让用户与设备交互的屏幕。HMI 也可以叫做 操作终端（Operator Terminal）, 本地操作界面（Local Operator Interface） 或 图形用户界面（Graphical User Interface, GUI）。如果你对 OT, LOI 或 GUI 这些名字有印象，那是因为你可能已经用过类似的设备。简单来说，HMI 用于 显示数据，帮助用户更直观地理解和控制系统。现代 HMI 的典型例子就是 平板电脑。平板就是一个 GUI，可以让你控制各种流程。例如，如果你的平板或手机通过蓝牙连接电视，你就可以用它来操作电视。HMI 的形态多样，包括电脑显示器, 带内置屏幕的机器等。

SCADA 这个名字不是随便取的，它是 Supervisory Control and Data Acquisition（监控与数据采集） 的缩写。SCADA 系统包含软件和硬件，主要用于以下几个方面：

- 远程或本地控制各种工业过程
- 通过 HMI（人机界面）软件与传感器, 泵, 马达和阀门交互
- 实时监控, 采集和处理数据
- 将事件记录到文件中，方便追踪和分析

SCADA 和 HMI 系统分别用于采集数据和显示数据。而 PLC 作为工业计算机，则充当了工艺过程与控制系统之间的桥梁。因此，PLC 常常与 SCADA 系统和 HMI 一起使用。HMI 在各行各业随处可见，在我们日常生活中也能看到，例如显示器或平板电脑。随着技术发展，出现了新型的 HMI 和 SCADA 系统。现代 HMI 的典型例子是 触摸屏，它为操作员提供了很大的灵活性。工业硬件的发展也推动了 PLC 和 SCADA 系统的升级：PLC 能够执行更复杂的逻辑任务，SCADA 系统则更通用，可以采集大量数据。总的来说，随着技术进步，未来这些系统还会有更多改进和提升，值得期待。

<figure view-type="Preview">

</figure>

<figure view-type="Preview">

</figure>

## 上位机与下位机

上位机：

可以直接发送操作指令的计算机或单片机，一般提供用户操作交互界面并向用户展示反馈数据。典型设备类型：电脑，手机，平板，面板，触摸屏。下位机：

直接与机器相连接的计算机或单片机，一般用于接收和反馈上位机的指令，并且根据指令控制机器执行动作以及从机器传感器读取数据。典型设备类型：PLC，stm32，51，FPGA，ARM等各类可编程芯片。上位机和下位机的关系如下图所示：

![image](attachments/RZVpdcXQXodfYYxHa27ck3KhnYc/img_010.png)

## 附件


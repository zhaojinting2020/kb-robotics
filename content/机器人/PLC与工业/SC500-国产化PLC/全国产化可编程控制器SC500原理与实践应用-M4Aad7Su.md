---
title: 全国产化可编程控制器SC500原理与实践应用
url: https://my.feishu.cn/docx/M4Aad7Su5oJqYDxkcyacVVYwnjf
quality: raw
fetch_source: feishu:cli
fetched_at: '2026-06-28T05:00:45+00:00'
feishu_formatted_at: '2026-06-28T05:00:45+00:00'
urls_repaired_at: '2026-06-28T05:00:45+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
sheets_expanded_at: '2026-06-29T10:25:24+00:00'
---

## 全国产化PLC概述与背景

### PLC基本概念与发展历程

#### PLC的定义与功能

##### PLC 的定义

“PLC” 全称 **Programmable Logic Controller**（可编程逻辑控制器）。根据 IEC 61131-3 以及工业自动化领域常用的定义：

> “PLC 是一种数字操作的电子系统，专用于工业环境；它具备可编程存储器，用于存储用户编程的控制指令，执行逻辑, 顺序, 定时, 计数, 算术等功能，通过数字或模拟输入/输出信号控制机械或过程。”  
>  — 出处：工业自动化文献及教材常见定义 [all-about-industries+2Wikipedia+2](https://www.all-about-industries.com/what-is-a-plc-definition-basics-and-function-a-fb4ac7081223c44a1e45cffa9bbb0159/?utm_source=chatgpt.com)

简单说：PLC 是工业环境下可编程, 可定制控制逻辑的专用控制器，比通用计算机更耐用, 更可靠，更适合工业现场使用。

##### PLC的构成

- CPU模块：PLC的中央处理器，负责执行程序和进行逻辑运算。 
- 内存模块：用于存储系统程序和用户数据。 
- 输入模块：接收来自外部传感器和开关的信号。 
- 输出模块：向外部执行器（如电机, 灯等）发送控制信号。 
- 电源模块：为PLC系统提供工作电源。 
- 编程装置：用于将用户编写的程序下载到PLC的内存中

<p class="kb-image-caption">图例</p>

</figure>

##### PLC硬件

- 基本硬件架构

在 PLC 系统中，连接 I/O 模块到 CPU 有不同的选择。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_002.png)

<p class="kb-image-caption">图例</p>

CPU 和 I/O 模块是分开的，但每个模块都自带连接器，用来把组件连接在一起。这些连接器形成一个连续的数据总线，贯穿整个系统。这条内部数据总线通常被称作背板（backplane）。可以更换，但你需要断开所有位于目标模块下游模块的背板连接，可能会比较麻烦。

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_004.png]]

<p class="kb-image-caption">图例</p>

在这种配置下，需要一个单独的底座来承载模块化组件。每个模块会插入底座的一个插槽，通过底座内置的背板与系统连接。底座有不同数量的插槽，有些底座还自带电源。通常，最左边的前两个插槽是专门留给电源和 CPU 的。最容易更换。只需滑出旧模块，再滑入新模块即可。有些 PLC 甚至支持热插拔（hot swapping），也就是说，在 PLC 通电并且控制流程不中断的情况下就能更换模块。

- 输入输出模块

I/O 模块及其连接的终端设备，让 PLC 能够了解并影响被控制过程的当前状态。市面上有很多种输入和输出模块，但它们大体上可以分为 模拟（analog）, 离散（discrete） 或 特殊功能（specialty） 三类。

<p class="kb-image-caption">图例</p>

是最简单的一类，它给 PLC 提供 开/关控制。可用于交流（AC）或直流（DC）电压范围，为 CPU 提供“是/否”, “真/假”的信号，并允许简单的全开或全关响应。

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_006.png]]

<p class="kb-image-caption">图例</p>

选择电源时，非常重要的一点是：确保它能够为 CPU 和 I/O 模块提供所需的电力。为此，需要进行功率预算分析（power budget analysis），计算应用所需的电流。

- CPU

CPU 硬件主要要求：

**通信接口**：支持串口, 以太网和 USB，用于与外部设备通信。

**协议支持**：支持常用工业协议，如 EtherNet/IP, Modbus TCP，确保与系统兼容。

**内存容量**：提供足够存储空间（如 50MB 及以上），保证程序运行和未来扩展。

**可扩展存储**：支持可拆卸存储卡（1\~32GB），用于数据记录或程序下载。

**附加功能**（可选）：电池备份, 内置 I/O, 状态指示灯或显示屏。

<figure view-type="Preview">

</figure>

##### PLC 软件

### 内置仿真器（Built-in Simulator）

允许在没有实际 PLC 硬件的情况下运行程序。

- 模拟输入, 输出, 寄存器变化
- 验证逻辑正确性
- 调试算法（比如 PID 或状态机）  

### 热插拔（Hot Swapping）与运行时传输（Run Time Transfers）

支持在PLC 正在运行时修改程序。

- 不必停机即可在线编辑, 下载或替换模块
- 热插拔支持现场更换模块（如 I/O 卡）而不影响运行  

### 自动发现（Auto Discovery）

自动扫描并识别网络中的 PLC 设备。

- 一键找到所有在线控制器
- 自动读取硬件配置和固件版本  

### 数据查看与直方图（Data View and Histograms）

实时查看变量值的变化。

- 类似“监控表”或“在线趋势图”
- 支持波形, 直方图分析  

### 安全性（Security）

限制访问和修改权限。

- 用户登录控制
- 程序加密与防篡改
- 审计日志记录  

### 搜索与交叉引用（Search and Cross Reference）

- 查找变量在哪被使用, 赋值或调用
- 快速跳转到引用位置  

### 帮助文件（Help Files）

集成文档和示例。

- 指令说明, 函数块介绍
- 实例演示, 错误码解释  

### 连接方式（Connectivity）

支持多种连接接口：

- USB, Ethernet, 串口, Profibus, Profinet 等
- 甚至远程 VPN 或云连接  

### 可自定义界面（Customizable Layouts）

允许用户调整界面布局。

- 拖拽窗口, 保存工作区布局
- 多显示器支持  

### 项目对比（Project Compare）

对比两个项目的差异。

- 逻辑块变化
- 参数, 符号表, 注释变化  

### 调试工具（Debugging Tools）

提供强大的调试手段：

- 断点, 单步执行, 变量强制（Force）
- 在线监控（Watch）, 状态图可视化  

### Web 服务器与移动应用（Web Server and Mobile Apps）

PLC 内置 Web Server，可通过浏览器或 App 访问：

- 查看状态, 报警, 趋势
- 远程控制或修改参数  

### 邮件功能（Email）

PLC 可自动发送邮件报警或报告。

- 超限报警通知
- 日志, 生产数据发送  

### PID 控制选项（PID Options）

内置 PID 控制器及调参工具。

- 支持手动/自动切换, 增益调试
- 有实时曲线和整定向导  

### 强大的数学功能（Powerful Math Functions）

提供丰富的数学计算库。

- 基本四则运算, 三角函数, 积分, 滤波
- 矩阵, 插值, 统计分析  

### 任务管理器（Task Manager）

定义程序任务的执行周期与优先级。

- 周期任务（如 10ms 循环）
- 事件触发任务（中断, 报警）
- 背景任务  

### 集成功能块（Integrated Function Blocks）

提供标准化, 可复用的功能模块。

- 定时器, 计数器, PID, 运动控制块
- 用户自定义功能块（UDFB）

#### PLC的发展阶段

PLC（可编程逻辑控制器）彻底改变了自动化行业。如今，PLC几乎无处不在，从工厂设备到自动售货机都能看到它的身影。但在1968年新年前夕，可编程控制器甚至还不存在。那时，存在着一系列独特的挑战亟需解决。

- **可编程控制器之前**

在PLC出现之前，机器只能靠继电器控制。继电器通过通电产生磁力，将开关切换“开/关”。例如控制电机时，需要在电源和电机间接一个功率继电器，通电电机开，断电关。多台电机就需要更多继电器，而控制这些继电器的又得用“控制继电器”，层层叠加，工厂里堆满了电气柜。

- **继电器系统的问题**

继电器系统虽然可控，但存在巨大的麻烦：

- 必须严格接线，否则机器失灵。
- 故障排查耗时，线圈损坏, 触点磨损需频繁维护。
- 占用空间大，修改系统几乎意味着重布线。一位70年代的设计师回忆：“控制柜像‘老鼠窝’，经过多次改动后，线缆凌乱, 可靠性下降，排查和改动都非常困难。”

- **PLC的诞生**

为解决这些问题，通用汽车的工程师提出“标准机器控制器”需求。1968年元旦，PLC之父Dick Morley完成了可编程控制器的详细设计。PLC目标包括：

- 固态设计, 灵活且价格可与继电器系统竞争
- 易于编程和维护，兼容梯形图逻辑
- 适应工业环境，抗灰尘, 湿气, 电磁干扰和振动
- 模块化设计，便于扩展和更换

最初的PLC只有125字内存，速度有限，后扩展到1K甚至4K内存，才能可靠运行机器循环。早期PLC使用“行李箱式”编程器，完成逻辑设置后烧录内存。第一次使用PLC的工厂因电源信号复杂，曾短路失败，几年来才完全恢复。

Dick Morley后来创办Modicon公司，推出首款PLC Modicon 084（原型84），虽初期销售不佳，但改进后的Modicon 184彻底改变自动化行业，成为行业标杆。

### PLC的“青春期”

早期PLC可处理输入输出信号, 继电器逻辑, 定时器和计数器。随着发展，增加了单脉冲, 模拟量I/O, 浮点运算, 鼓序列器, 数学函数，尤其是PID功能对过程工业至关重要。编程设备也从专用行李箱, 手持设备，发展到PC专用软件，极大方便编程, 测试和排故。通信方面从RS-232 MODBUS协议，扩展到RS-485, DeviceNet, Profibus，甚至以太网和EtherNet/IP，实现PC与PLC, 电机驱动器和HMI联网。

<figure view-type="Preview">

</figure>

### 国际PLC发展状况

#### 国际plc发展史

### 西门子（Siemens）PLC发展历程

- 1958年：推出首个PLC系列——SIMATIC G [Wikipedia](https://en.wikipedia.org/wiki/Simatic?utm_source=chatgpt.com)
- 1960年代末：推出SIMATIC S5系列，标志着PLC的成熟
- 1990年代：推出S7系列，支持网络通信和模块化扩展
- 2000年代：推出TIA Portal，集成化自动化平台 [Siemens](https://www.siemens.com/global/en/company/about/history/specials/60-years-of-simatic.html?utm_source=chatgpt.com)

### 三菱电机（Mitsubishi Electric）PLC发展历程

- 1973年：开发首个PLC，替代继电器控制面板 [Smart Building International](https://smartbuildingmag.com/news/44831-100-years-of-mitsubishi-electric-%E2%80%93-a-story-of-success?utm_source=chatgpt.com)
- 1980年代：推出F系列PLC，进入中小型控制市场
- 1990年代：推出A系列PLC，支持更高性能和扩展性
- 2000年代：推出Q系列和L系列PLC，支持网络化和智能化控制 [theautomationblog.com](https://theautomationblog.com/mitsubishi-plc-history-and-overview/?utm_source=chatgpt.com)

### 罗克韦尔自动化（Rockwell Automation）PLC发展历程

- 1970年：Allen-Bradley公司推出首个PLC，开创PLC时代 [Rockwell Automation](https://www.rockwellautomation.com/en-us/company/about-us/our-history.html?utm_source=chatgpt.com)
- 1980年代：推出PLC-5系列，支持更高性能和扩展性
- 1990年代：推出ControlLogix系列，支持模块化设计和分布式控制
- 2000年代：推出Studio 5000软件平台，集成化自动化平台 [Control.com](https://control.com/technical-articles/allen-bradley-plcs-a-hardware-history/?utm_source=chatgpt.com)

#### 国际主流 PLC 开发工具

- 欧洲系 PLC 软件

| 厂商 | 开发软件 | 特点与优势 | 典型支持语言 |
| --- | --- | --- | --- |
| Siemens（西门子） | TIA Portal (Totally Integrated Automation Portal) | 行业最成熟的综合自动化平台之一，集成 PLC, HMI, 运动控制和网络配置。强大的调试与诊断工具。 | LD, FBD, ST, SCL, GRAPH（SFC） |
| Beckhoff（倍福） | TwinCAT 3 (The Windows Control and Automation Technology) | 基于 PC 的控制系统，与 Visual Studio 深度集成，支持 C/C++/MATLAB 扩展，兼容所有 IEC 61131-3 语言。 | ST, LD, FBD, SFC, IL, CFC |
| WAGO | WAGO-I/O-PRO / e!COCKPIT (CODESYS-based) | 基于 Codesys 内核，简单易用，开放性强，适合中小规模自动化系统。 | LD, ST, FBD, SFC |
| B&R（Bernecker + Rainer） | Automation Studio | 支持 IEC 61131-3 + 自有高级语言，面向运动控制和机器人系统。 | ST, LD, FBD, CFC, SFC |
| Schneider Electric（施耐德） | EcoStruxure Machine Expert (原 SoMachine) | 面向 Modicon 系列 PLC，支持多任务和可视化调试。集成 CFC, LD, ST, FBD. | LD, FBD, ST, CFC |
| Phoenix Contact | PC Worx / PLCnext Engineer | 支持传统 PLC 和开源 Linux 控制架构 PLCnext，易于云连接。 | ST, FBD, LD, SFC |

- 日本系 PLC 软件

| 厂商 | 开发软件 | 特点与优势 |
| --- | --- | --- |
| Mitsubishi（三菱） | GX Works3 / MELSOFT | 面向 FX/Q/L 系列 PLC，支持 LD/ST/FBD 混合编程，界面友好。 |
| OMRON（欧姆龙） | Sysmac Studio | 集成 PLC, 运动控制, 安全, 视觉系统编程；基于 IEC 标准。 |
| Keyence（基恩士） | KV Studio / KV-X | 界面简洁，主要用于设备级控制，入门友好。 |

- 开放型与教育用 PLC 工具

| 软件 | 背景 | 特点 |
| --- | --- | --- |
| CODESYS | 德国 3S Smart Software Solutions | 最具代表性的开源 IEC 61131-3 平台，支持多厂商 PLC. 广泛用于教学与实验。 |
| OpenPLC | 开源社区项目 | 开放源码, 跨平台（Linux, 树莓派, Windows），适合学习与研究。 |
| AutomationDirect - Do-more / Productivity Suite | 美国 AutomationDirect | 面向工业与教育，界面简洁，支持脚本扩展。 |

### 国产PLC的发展状况

#### 中国PLC市场概览

### 市场规模

2023年中国PLC市场规模约为155亿元人民币，预计到2027年将达到176.6亿元，年均增长约4% [cima.org.cn](https://cima.org.cn/nnews.asp?vid=43481&utm_source=chatgpt.com)。

**市场结构**：

- 小型PLC市场占比约50%，主要应用于中小型设备控制。
- 中大型PLC市场占比约50%，广泛应用于冶金, 电力, 交通等关键基础设施 [m.chyxx.com](https://m.chyxx.com/cyzx/1218635.html?utm_source=chatgpt.com)。

### 主要国产PLC厂商

| 厂商 | 市场定位 | 代表产品系列 |
| --- | --- | --- |
| 汇川技术 | 通用自动化控制 | H3U, H2U-XP, H1U-XP |
| 和利时 | 过程控制与DCS系统 | LE, LEAP, LEAP-X |
| 信捷电气 | 中小型自动化控制 | FX系列, EX系列 |
| 台达电气 | 工业自动化全场景 | AS系列, DVP系列 |

#### 政策支持与国产替代

**国产替代政策**：国家鼓励自主可控的工业控制系统，推动PLC产品的国产化进程。

**信创工程背景**：在“信息技术应用创新工程”（简称“信创工程）”的推动下，国产PLC厂商获得了更多的市场机会和政策支持。

**国产化率提升**：2020年国产PLC市场份额约为11%，2023年已上升至21%，显示出国产替代的加速趋势。

#### 未来发展趋势

**智能化**：PLC将集成更多智能功能，如自诊断, 远程监控和数据分析，以适应智能制造的需求。

**模块化**：模块化设计将成为主流，用户可以根据实际需求灵活组合，降低成本，提高系统的可扩展性。

**边缘计算与AI结合**：PLC将与边缘计算和人工智能技术融合，实现更高效的数据处理和决策支持。

**国产品牌崛起**：随着技术的进步和政策的支持，国产PLC厂商将在市场中占据更大份额，挑战国际品牌的主导地位。

## 国产PLC硬件架构与开发环境

### 通用国产CPU平台架构解析

#### 国产CPU平台架构特点

在现代工业控制系统中，CPU的选择直接影响设备的性能和实时性。现在市场上常见的三大架构是ARM, 龙芯和RISC-V，它们各有特点，适合不同的应用场景。

##### ARM 架构

ARM是一种精简指令集（RISC）架构，以低功耗, 高性能和高集成度著称，广泛应用于嵌入式设备, 移动终端和工业控制器。ARM的主要系列有：

- Cortex-M 系列  

 面向低功耗微控制器市场。它的优势是体积小, 功耗低, 响应快速，非常适合PLC控制器和各类传感器控制板。
- Cortex-R 系列  

 注重高实时性，保证任务能按时完成。支持ECC内存和锁步冗余等可靠性机制，常用于汽车电子和工业安全控制。
- Cortex-A 系列  

 面向高性能计算，能跑Linux等操作系统。适合工业网关, 智能终端和人机界面（HMI）等应用。在实时性方面，ARM有几个特点：支持快速中断响应（NVIC嵌套中断）, 提供精确定时器（SysTick和通用定时器）, 流水线优化加速指令执行，同时还能在低功耗模式下保持定时和中断功能。

##### 龙芯架构

龙芯是中国自主研发的CPU系列，主要基于MIPS指令集，兼顾通用计算与嵌入式控制。

- 实时性方面，龙芯提供多级中断控制, 内置硬件调度，减少任务切换延迟，同时具备ECC和可靠性机制，适合关键工业控制任务。
- 拓展性强，支持各种工业总线和I/O接口，能够适应复杂PLC系统需求。
- 典型应用包括国产工业控制, 嵌入式服务器和智能终端。

##### RISC-V 架构

RISC-V是一种开源指令集架构，硬件厂商和开发者可以根据需要定制CPU指令集，非常灵活。

- 在实时性方面，RISC-V支持多种中断模式，能够满足嵌入式和高实时性应用的要求。
- 可以增加特定应用的优化指令，提高运算效率。
- 标准RISC-V流水线简化，减少指令冲突，提高任务确定性。
- 内置硬件定时器和性能监控寄存器（mtime/timer），方便周期任务调度。
- 生态优势明显，可与开源实时操作系统（如FreeRTOS, Zephyr）结合快速搭建工业控制系统。
- 应用场景包括工业控制, 机器人, 智能家居和科研教育。

### 许继国产PLC硬件接口与外设配置

<figure view-type="Card">

</figure>

### 许继国产PLC开发工具链（ViGET）介绍

##### IDE界面

### 界面

一般情况下，ViGET V2.0 工程工具软件界面架构如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_007.png)

<p class="kb-image-caption">图例</p>

虽然声明看上去所有程序都一样，但是指令则有很大的不同。ViGET V2.0 工程工具软件架构可以同时执行很多文件， 错误报告将在输出窗口（Output Window）中显示。输出窗口位于 ViGET V2.0 工程工具软件架构的底部，用来显示提示信息, 状态信息, 错误信息和调试结果。

### 项目管理器

项目管理器用于 ViGET V2.0 工程工具软件架构的文件管理，ViGET V2.0 使用工程（Project）概念管理各类设计文件，支持 ViGET V2.0 工程和 Function Block 工程。通过使用项目管理器，可以用文件和工程将所做的工作组织起来。在项目管理器中，可以通过右键菜单，创建和编辑文件, 编译和下载应用程序。如图所示即为项目管理器。工程文件下包含了所用到的所有文件，呈树形显示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_008.png)

<p class="kb-image-caption">图例</p>

在打开 ViGET V2.0 工程工具软件后，可以开始工作了。第一步是创建一个新的工程。选择 File->New->Project…或者点击工具栏上的 New Project 按钮。如图 所示为新建工程对话框。在对话框中，选择工程模板，输入工程名和工程存放路径：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_009.png)

<p class="kb-image-caption">图例</p>
- 通过 Recent Projects：在 File 菜单下，可以找到 Recent Projects 菜单项，它列出了近期打开过的工程，在列表中可能找到你想要打开的工程。
- 通过工具栏：点击Open Solution 或Open ViGET Project按钮分别打开 ViGET V2.0 工程和 ViGET 工程。
- 通过主菜单：在主菜单中点击 File->Open. 工程常规操作

在不同的文件/资源节点上的右键菜单中可进行相应的各种操作，例如：编辑, 编译, 激活, 打开所在文件夹，打开文件等。如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_010.png)

<p class="kb-image-caption">图例</p>

在 Project 菜单下，有 Search In Files…, Copy Project, Rename Project, Backup Project, Restore Project 以及 ViGET_V21 Properities…五个选项，分别用来对工程进行拷贝，重命名，备份, 恢复以及显示当前工程的属性页。

- Search In Files…：

编译工程后，使用此选项可以在工程中与 CFC 文件对应的 POE 文件中搜索关键字，并在 Error List 窗口的 Messages Pane 中列出搜索结果，如图所示：

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_013.png]]

<p class="kb-image-caption">图例</p>

用于拷贝工程，在弹出的对话框中可以编辑工程的名字以及存放的新路径，白色区域为可编辑区域，第一个白色区域用于更改拷贝后的工程名字，默认的会在被拷贝的工程名后加上“\_COPY”;第二个为拷贝工程的目标路径。拷贝成功后，会提示用户拷贝成功，如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_014.png)

<p class="kb-image-caption">图例</p>

当重命名工程时，会提示用户是否保存当前工程，点击是（Y）选项后会弹出一个可以编辑工程新名称的对话框，在 Rename Project 对话框中输入新的工程名字即可，如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_015.png)

<p class="kb-image-caption">图例</p>

用于恢复后缀名为”\*. BAK”的工程备份文件，在Restore Project 对话框中可以选择需要被恢复的工程，接着会要求用户选择工程恢复到的具体路径, 如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_017.png)

<p class="kb-image-caption">图例</p>

在 Project 菜单下，有 Library 菜单，在 Library 菜单下有 Use In Current Project, Install New…和 Uninstall Library 选项。在项目管理器 Libraries 节点上右键菜单也会显示上述选项，如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_018.png)

<p class="kb-image-caption">图例</p>

用户可以将 ViGET 工程全部复制到 Openpcs.520\lib 目录下，这样在Libraries 节点下就会显示已经加载的工程库，也可以通过 Install New…菜单加载工程库，此时如果工程库中包含 CFC Function Block 则在工程管理器窗口中显示。反之可以通过 Uninstall Library 选项工程库从 Openpcs.520\lib 目录下移除，同时在工程管理器中也不再显示。Use In Current Project 选项于激活工程库，此时工程管理器窗口中工程库的状态将处于激活状态（红色），同时也会显示在 POUs 窗口中，如图所示：

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_019.png]]

<p class="kb-image-caption">图例</p>

新建设计文件通过工程节点右键菜单完成，在 ViGET V2.0 工程工具软件中可添加 CFC Program, Station Configuration 等文件。在项目管理窗口中ViGET V2.0 工程节点，右键菜单选择 Add->Add New Item…可以看到三个文件类型，如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_020.png)

<p class="kb-image-caption">图例</p>

通过 File/Copy 可以复制 CFC 文件，在弹出的对话中可以编辑 CFC 的名字，同时也会提示选择 Link 到哪个 CPU 上。当创建一个空工程或工程中没有 Station 时，此时 Add New Item 的对话框中多出了“Station Configuration”文件类型，这个因为一个工程只能有一个 Station, 如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_021.png)

<p class="kb-image-caption">图例</p>

功能块管理器(POUs Catalog)是一个将功能块插入到 CFC 程序的一个工具。POUs Catalog 在工程浏览中的下方可见。如果没有，则选择 View->ViGET POUs 则可显示出来。通过使用功能块管理器，可以用拖拉方式将功能块插入到程序中。使用功能块管理器或通过菜单来插入功能块。功能块管理器用于功能块管理，当所有的功能块添加进固件库时，即可在编辑 CFC 文件时从功能块管理器中添加所需的功能块。功能块管理器全面支持Catalog Categories 和 Catalog 的按字母排序，支持多级 Category；支持根据 Catalog 名称和 Category 的快速查找；界面更新采用差别更新的方式，取消无谓界面刷新，有更好的用户体验。功能块管理器分类说明，如图所示：

- Source：原 ViGET 的 POUs 的内容；
- Category：根据分类来组织功能块；
- All：所有 Catalog 按照字母排序。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_022.png)

<p class="kb-image-caption">图例</p>
- 也可以将该文件存放在“\Openpcs.520\MODULES\XJ_CP3000\”等硬件类型相关的目录中，这样可以实现不同的硬件类型采用不同的Category 定义文件；
- 支持多级分类信息。

##### 编译与调试

### 编译

当应用被修改的时候，如 CFC 文件被修改后，需要在 CPU 上执行以下几个操作：

- 编译
- 下载
- 启动

ViGET V2.0 没有自动编译或下载功能，所有动作都必须由用户来完成，对于编译有以下三个菜单：

- Build Active CPU：这个编译用于当前使用的 CPU 资源的增量编译，只编译最终修改过的文件。
- Rebuild Active CPU：重新编译所有属于当前使用 CPU 资源的文件。
- Build All CPUs：编译工程中所有 CPU 资源。
- Rebuild All CPUs：重新编译工程中所有 CPU 资源。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_023.png)

<p class="kb-image-caption">图例</p>

ViGET V2.0 支持程序下载, 变量查看等 Online 功能，支持从项目管理器直接添加要查看的变量，支持从 CFC Editor 窗口直接拖拽要查看的变量，支持多CPU 同时 Online，根据变量所属的 CPU，支持三种变量分组显示方式。下图为Build & Online 工具条用于 Build 和 Online 的相关设置。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_025.png)

<p class="kb-image-caption">图例</p>

CPU 资源 Online 表示该 CPU 建立起在线连接，并且使能对加载程序的在线监测，或者使得用户能够向 CPU 下载一个新的程序。点击 Online->Online Active CPU 使工程与 CPU 连接或断开。如果 CPU 中程序没有修改，在输出窗口中只显示一些信息，在线监测将被使能。如果当前 ViGET V2.0 工程与 CPU中的 ViGET V2.0 工程不同，ViGET V2.0 将弹出如下对话框：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_036.png)

<p class="kb-image-caption">图例</p>

在 Online 运行时，CFC 编辑器默认不显示任何连接点的值，用户必须显示所有连接点的值，可以通过右键菜单“Enable Watch“来显示单个连接点的值。单个连接点的值可以通过右键 Online Properties 菜单来设置。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_037.png)

<p class="kb-image-caption">图例</p>

通过快捷键”Ctrl + Shift + W“可以同时显示或隐藏所有连接点的值。在 Online 模式双击一个连接点可以打开该连接点的 Online Properties 对话框，如下图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_038.png)

<p class="kb-image-caption">图例</p>

支持 CFC 的 Online Consistent State，在 Online 过程中，如果当前 CFC文件被修改，再次点击 Task Monitor 按钮会提示 Choose Online Edit 的方式。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_039.png)

<p class="kb-image-caption">图例</p>
- Download to RAM Only：将程序下载至当前 CPU 的内存中但并不保存程序，当重新启动程序后操作将消失，下次运行 CPU 时，运行的程序为先前保存在内存中的代码；
- Download and Save System：将程序下载并保存至 CPU 的内存中，在工程重新启动后当前程序会一直保存，下次运行 CPU 时，则运行此程序。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_040.png)

<p class="kb-image-caption">图例</p>

在执行了 Download to RAM Only 后可以使用 Save System 来固化应用程序到目标硬件中，其结果与 Download and Save System 的效果是一样的。注意：Save System 只有在停止模式才能工作。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_041.png)

<p class="kb-image-caption">图例</p>

由于 Download to RAM Only 只是将应用程序下载到了目标硬件中，但没有固化应用程序到硬件中，所以在硬件重启或掉电/上电后的执行结果与先前的结果是不一样的。当使用 Download to RAM Only 后选择 Offline 时，ViGET V2.0 会提醒用户是否保存应用程序到 PLC 中。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_042.png)

<p class="kb-image-caption">图例</p>

为了保证当前程序固化到目标硬件中，就可以使用 Save System 来实现。当固化结束后，ViGET V2.0 在 5 秒后会自动关闭 Save System 对话框。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_043.png)

<p class="kb-image-caption">图例</p>

   下载系统固件开始，会有如下图所示的进度对话框。在此过程中务必不要将目标 CPU 断电或重启！如果在此过程中断电或重启了，则目标 CPU 板卡将不能再运行，需要联系硬件的提供者或制造商。
   ![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_049.png)

<p class="kb-image-caption">图例</p>
   - 可以使用 ViGET V2.0 软件的 PLC->Reboot PLC 菜单实现，点击此菜单后，会有一个确认对话框，点击“是”则重启 PLC.ViGET V2.0 将自动 Offline，当 PLC 重启完成后可再次 Online.
   ![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_051.png)

<p class="kb-image-caption">图例</p>

</figure>

## PLC控制逻辑与编程语言

### IEC 61131-3标准与六种编程语言

#### 梯形图（LD）

##### 结构（The Structure）

梯形图逻辑（Ladder Logic）的结构来源于继电器逻辑所用的电气梯形图。这些图记录了继电器控制面板上各设备的接线方式。之所以叫“梯形图”，是因为它的结构看起来像一架梯子：两条竖直的“轨道”，中间有若干“横档”。电源正极（左边）通过横档上连接的物理器件流向电源负极（右边）。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_052.png)

<p class="kb-image-caption">图例</p>

CPU 从头跑到尾再回来的这段时间叫扫描时间。在一些对时序要求特别严格的场合，扫描时间就很重要。如果扫描时间太长，响应会变慢，这时就要用 子程序 或 专用 I/O 模块 来优化。

##### 梯形逻辑中的基本指令

现在我们已经对梯形逻辑有了更好的理解，可以更深入地看看它是如何工作的。要做到这一点，我们首先需要了解布尔代数和逻辑门。我们只需要看看几个逻辑门以及它们的工作方式。在梯形逻辑里，最常见的两个逻辑门是 AND（与门） 和 OR（或门）。从下方的真值表可以看到：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_054.png)

<p class="kb-image-caption">图例</p>

选择哪种方式要看你的应用场景以及你希望系统怎么工作。是不是很简单？从最基本的角度看，这就是梯形逻辑：把一组允许位或触点按照布尔表达式的方式排列，决定某个输出该不该打开。现在的梯形逻辑编程早已不只是简单的触点和线圈，但基本原理没变：每个横档里的输入元件的真假状态，以及它们的连接方式，决定了输出的状态。接下来，我们看看现代 PLC 中有哪些指令。下面的表格列出了 CLICK 编程软件里所有可用的梯形逻辑元件，并附有功能说明。

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_055.png]]

<p class="kb-image-caption">图例</p>

正如你所看到的，梯形逻辑里可用的选项已经远不止常开的触点了，很多功能块也被引入到梯形逻辑中。比如，鼓式顺控（Drum）和通信指令就是一类功能块，它们是已经写好的代码块，可以在你的程序中进行配置和使用。当然，我们不会在这里讲解所有的指令，但其中一个用得比较频繁的就是比较触点（Compare Contact）。比较触点可以用来比较两个数值，这两个数值既可以是变量，也可以是固定值。比较指令会判断这两个数值是否满足以下条件：

- 相等 (Equal)
- 不相等 (Not Equal)
- 大于 (Greater Than)
- 大于或等于 (Greater Than or Equal To)
- 小于 (Less Than)
- 小于或等于 (Less Than or Equal To)

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_062.png)

<p class="kb-image-caption">图例</p>

梯形图（Ladder Logic）是当今工业自动化中使用最广泛的编程语言。它使用简单, 易于追踪，并且能够直观地表示物理元件，这使得它成为许多工程师偏爱的编程方法。更多梯形图教学视频请见：

<figure view-type="Preview">

</figure>

<figure view-type="Preview">

</figure>

#### 功能块图（FBD）

功能块图（Function Block Diagram，简称 FBD）是官方认可且广泛使用的 PLC 编程语言之一。它是一种简单且图形化的方式，可以将各种功能组合在 PLC 程序中。功能块图易学，而且提供了丰富的可能性。

FBD 是 IEC 61131-3 标准中正式认可的 PLC 编程语言之一。它非常灵活，可以让你在项目中轻松集成逻辑, 定时器, PID 控制器，甚至 SCADA 系统。大多数工程师喜欢 FBD，因为它图形化的方式非常直观。工程师习惯把系统用“盒子”表示，而这正是功能块图的核心概念。在系统工程中，你可能已经接触过一种也叫做功能块图（function block diagrams）的东西。PLC 的功能块图与它并没有太大区别。FBD 的优势在于，它可以把用多行代码写的功能封装到一个个“盒子”里。这样，我们就可以很方便地将这些功能连接起来，组成更大的 PLC 程序。

FBD 和梯形图（Ladder Logic）以及结构化文本（Structured Text）一样，遵循 PLCOpen 的 IEC 61131-3 标准。它在 PLC 编程中很常见，经常与结构化文本结合使用，因为它提供了一种直观的方式，将程序中的各个功能模块连接起来。在 FBD 中，所有功能都被封装到功能块里。每个功能块都有一个或多个输入和输出。功能块的作用就是定义输入状态与输出状态之间的关系。下面是一个简单功能块的示意：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_063.png)

<p class="kb-image-caption">图例</p>

根据不同的功能，功能块可以有任意数量的输入和输出。你可以将一个功能块的输出连接到另一个功能块的输入，从而构建出完整的功能块图（Function Block Diagram）。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_064.png)

<p class="kb-image-caption">图例</p>

FBD 提供了许多预定义的功能块，但你也可以灵活地创建自己的功能块。当你需要重复使用某段代码时，这尤其有用，例如控制电机或阀门。自定义功能块可以让你高效地设计程序，同一个功能块可以多次使用。接下来，我们先来看一些 IEC 标准中定义的标准功能块，它们提供了从基础到高级的各种功能。在 IEC 标准中，描述了许多功能块。下面是官方 FBD 描述中最重要的一些功能块概览。

##### 位逻辑功能块（Bit Logic Function Blocks）

  
PLC 程序最基本的功能就是逻辑，也叫组合逻辑（combinatorial logic）。逻辑是最简单的算法形式，它通过输入的状态来决定输出的状态。基本上，FBD 中有两种不同的位逻辑函数或操作。仅凭这两种操作，就可以衍生出许多其他逻辑功能。

### 或逻辑操作（OR Logic Operation）

首先介绍 OR 功能块。它有 2 个输入和 1 个输出，工作原理就像一个 OR 门。只要其中一个输入为真（True），输出也会为真（True）。在 FBD 中，这个功能块通常看起来像这样：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_065.png)

<p class="kb-image-caption">图例</p>

正如你可能已经看到的，OR 操作的符号是 `>=1`。它基本上就是输出成立的条件：如果两个输入的总和大于或等于 1，输出就会为真（True）。OR 功能块的功能等同于梯形图中两个触点的并联连接：只要其中一个触点闭合，输出就会被置位。这里说的输出指的是功能块的输出引脚（output pin），只能连接到另一个功能块的输入。但是，如果我们想用这个输出去设置实际的输出设备或某个位状态，该怎么办呢？这就引出了下一个功能块。

### 赋值操作（Assignment Operation）

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_066.png)

<p class="kb-image-caption">图例</p>

为此，你需要使用赋值功能块（assignment function block）。没错……它本身就是一个功能块，这意味着你不能直接在功能块的输出端设置一个内存地址。赋值功能块的工作原理是：将其输入的值写入 PLC 内存中的某个位置。这个功能块也有一个输出，可以连接到其他功能块。这非常实用，因为你可以在功能块图的任何地方赋值，而不仅仅是在最后一个功能块的输出端。赋值功能块的功能与梯形图中的线圈（coil）相同。

### 与逻辑操作（AND Logic Operation）

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_067.png)

<p class="kb-image-caption">图例</p>

XOR 功能块是 OR 功能块的一种特殊情况。普通 OR 功能块只要求输入总和大于等于 1 就输出为真，而 XOR 功能块要求两个输入中只有一个为真时，输出才为真。例如，如果两个输入都为真，XOR 的输出就为假，因为输入总和大于 1. 虽然 XOR 功能可以用两个 AND 块和一个 OR 块组合实现，但在 Siemens TIA Portal, Codesys 等平台中，XOR 也提供了专门的功能块。

XOR 功能块常用于判断“两个输入中恰好有一个为真”。

### NAND, NOR 等功能块

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_070.png)

<p class="kb-image-caption">图例</p>

以 NAND 功能块 为例，如下图所示：NAND 功能块实际上就是一个 AND 功能块，但输出取反。NAND 的意思是 NOT AND 或 Negated AND.

##### 双稳态功能块（Bistable Function Blocks）

接下来要介绍的是双稳态功能块。我喜欢把它们看作最简单的记忆单元。它可以设置（Set）或复位（Reset）输出，输出（Q）会记住上一次设置输入（S1）的状态。例如：给 S1 一个脉冲，Q1 会被置位。即使 S1 之后变为假（False），输出 Q1 仍然保持为真（True）。可以说 Q1 记住了 S1 曾经发生过什么。这也是为什么双稳态功能块（或触发器）被看作记忆单元。

### 置位/复位（Set/Reset）

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_072.png)

<p class="kb-image-caption">图例</p>

很多人称它为触发器（flip-flop）功能块：Q1 会记住某个时刻 S1 为真，直到 R（Reset）被置为真，Q1 才会复位。因此，输出 Q1 起到简单记忆块的作用。

SR 功能块总是有一个优先级。如果两个输入同时为真，会发生什么？

SR 块的优先级是 Set 优先。所以在两个输入同时为真的情况下，输出会被置位（Set）。但这并不总是你想要的，这就引出了下一个功能块。

### 复位/置位（Reset/Set）

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_073.png)

<p class="kb-image-caption">图例</p>

通常你会把这个输入连接到计数器功能块（counter function block，稍后会讲）。但如果你记得 PLC 的基本工作原理，就会知道 PLC 有扫描周期（scan time 或 cycle time）。

- 扫描周期通常很短（20-50 ms）。
- 当你按下按钮时，即使很快按下再释放，输入保持高电平的时间通常是 100-200 ms.
- 也就是说，这个输入会持续几个扫描周期。每当 PLC 扫描到计数器功能块时，如果输入为真，就会计数一次。结果就是每次按下按钮，计数器可能增加 2, 3, 5 次甚至更多。为了解决这个问题，我们就需要使用边沿检测功能块（Edge Detection Blocks）。

### R_TRIG 功能块（上升沿触发 Rising Edge Trigger）

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_074.png)

<p class="kb-image-caption">图例</p>

如果你想更深入了解定时器，并在 PLC 仿真中观看它们的工作原理，可以阅读关于[关于 PLC 定时器的文章](https://www.plcacademy.com/plc-timers/)。文章中有关于通断延时定时器（On-delay）, 断开延时定时器（Off-delay）和脉冲定时器（Pulse timer）的视频教程。有人认为只需要使用其中一种定时器就够了，因为可以从它衍生出其他类型。但由于三种定时器都被 IEC 61131-3 标准描述，并且大多数软件都提供它们，所以我会一一介绍这三种定时器。

### 脉冲定时器（Pulse Timer, TP）

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_076.png)

<p class="kb-image-caption">图例</p>

</figure>

##### 计数器功能块（Counter Function Blocks）

接下来介绍的功能块不仅有输入和输出，还需要处理另一种数据类型：计数器（Counters）。计数在 PLC 编程中非常基础，例如：

- 机器已经生产了多少产品？
- 当前工具在工序的哪一步？

在 PLC 程序中使用计数器有很多场景。

IEC 标准提供了三种计数器功能块：

- 向上计数器（Count Up）
- 向下计数器（Count Down）
- 可上下计数器（Count Up/Down）

我们先从向上计数器开始，一步步学习如何计数。

### 向上计数器（Up Counter, CTU）

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_079.png)

<p class="kb-image-caption">图例</p>

</figure>

其他更多功能块的讲解请见：

[https://www.plcacademy.com/function-block-diagram-programming/](https://www.plcacademy.com/function-block-diagram-programming/)

#### 结构化文本（ST）

虽然梯形图对初学者来说是一种简单易学的编程语言，但它在阅读和理解上可能非常困难。这也是为什么有人认为结构化文本（Structured Text）是更好的 PLC 编程语言。在大型梯形图程序中导航，就像在干草堆里找针一样困难。即便学习起来看似简单，尤其是对技术员和电工而言，使用起来也不一定最方便。一份对你来说完全合理的梯形图，可能会让别人感到困惑。幸运的是，我们有一种更好的 PLC 编程语言可用，它就是结构化文本（Structured Text）。结构化文本（Structured Text）是一种由 PLCOpen 在 IEC 61131-3 标准中定义的 PLC 编程语言。与基于图形的梯形图或功能块图（Function Block Diagram）不同，结构化文本是一种基于文本的编程语言。起初，你可能会觉得使用图形化编程语言进行 PLC 编程更好，但这只适用于较小的 PLC 程序。使用基于文本的 PLC 编程语言，你的程序占用空间更小，流程和逻辑也更容易阅读和理解。例如，你可以只用一行代码就完成 PLC 模拟量输入或输出的缩放。另一个优势是你可以混合使用不同的编程语言。你甚至可以在功能块中包含用结构化文本编写的函数。由于这是一个标准化的编程语言，我们也可以用结构化文本编程不同品牌的 PLC. 如果你已经熟悉 PHP, Python 或 C 这样的高级编程语言，那么结构化文本（Structured Text）会让你觉得很熟悉。结构化文本的语法设计得像高级编程语言，支持循环, 变量, 条件判断和运算符。但另一方面，如果你从未接触过高级编程语言，结构化文本也可以作为很好的入门语言，让你了解这些语言及其语法。有时，从更简单的编程语言开始学习，有助于理解逻辑和 PLC 的工作原理。在深入本教程之前，我建议先浏览一个用结构化文本编写的 PLC 程序，看看你是否能理解它的功能。

```iecst
PROGRAM stexample
  VAR
    x : BOOL;
  END_VAR
  x := TRUE;
  REPEAT
    x := FALSE;
  UNTIL x := FALSE;
  END_REPEAT;
END_PROGRAM;
```

你首先需要学习的是结构化文本（Structured Text）的结构或语法。当你理解了结构，你就能理解程序的执行流程。以上面的示例为例，你可以看到整个程序以 **PROGRAM** 开始，以 **END_PROGRAM** 结束。两者之间的内容就是你的 PLC 程序。这两个关键字用于界定程序的声明。关于关键字，我们稍后会详细介绍。不要被 **END_PROGRAM** 混淆，因为你的程序不会在这里完全结束。当 PLC 扫描到 **END_PROGRAM** 时，PLC 的扫描循环会重新开始，你的程序会重复执行。

##### 程序流程

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_082.png)

<p class="kb-image-caption">图例</p>

这与梯形图或其他 PLC 编程语言类似——程序会不断循环运行。如果你习惯了像 Arduino UNO 这样的微控制器编程，**PROGRAM/END_PROGRAM** 就类似于 C 语言中的无限循环。在结构化文本编程中，你通常不会直接使用 **PROGRAM/END_PROGRAM** 结构。PLC 编程软件会自动处理这部分，你需要编写的代码就是这个结构内部的内容。使用结构化文本编写的 PLC 程序的流程控制与梯形图相同：逐行执行。

##### 基本语法

编程语言的语法就是它的书写规则，更准确地说，就是定义了使用哪些符号来赋予语言形式和意义。示例中可以看到，结构化文本使用了很多符号，比如冒号（:）和分号（;）。每个符号都有特定用途，用于表示运算符, 函数, 语句或变量。就像一套特殊的代码，每个字符都很重要。随着本教程的深入，你会逐步了解语法的所有细节。但在此，有一些结构化文本语法的一般规则你需要知道：

- 所有语句以分号分隔  

 结构化文本由语句组成，每条语句用分号隔开。
- 语言不区分大小写  

 虽然为了可读性，使用大小写是好习惯，但不是必须的。
- 空格没有功能性作用  

 空格主要用于提高可读性。关键要理解的是，当你用结构化文本编写 PLC 程序时，计算机会把你的代码翻译成 PLC 能理解的语言。当你把结构化文本程序上传到 PLC 时，你使用的编程软件会编译你的程序，也就是把代码转换成 PLC 可以执行的机器码。编译器会利用编程语言的语法来理解你的程序。例如，每次编译器看到分号，它就知道当前语句结束。编译器会读取分号前的所有内容，然后执行该语句。

##### 注释

在文本编程语言中，你可以写一些不会被执行的文本，用来添加注释。注释是很好的编程习惯，尤其是初学者，应始终对代码进行注释，这样以后理解代码会更容易。在结构化文本中，你可以写单行注释或多行注释。单行注释

```python
// comment
```

行尾注释

```python

<expression>; /* comment */
```

多行注释

```python
/* start comment
...
end comment */
```

##### 变量

在深入语句之前，我们先回顾一下关键字（keywords）。变量 X 定义在 VAR 和 END_VAR 之间。

- PROGRAM/END_PROGRAM：界定整个 PLC 程序的主体。
- VAR/END_VAR：界定变量定义区域。这四个都是关键字，在结构化文本中不能用作其他用途，例如程序名不能叫 PROGRAM，因为它只用来界定程序构造。变量是存储数据的地方，每个变量都有特定的数据类型（data type），存储的数据必须与类型一致。例如，BOOL 类型变量只能存储 TRUE 或 FALSE. 此外，每个变量都需要一个名称，以便在程序中使用。

*需要注意的是，当你使用一些 PLC 软件（例如西门子 STEP 7 或 Rockwell）编程时，你通常不会在****VAR/END_VAR*** *构造中声明变量。相反，变量通常被称为* ***标签（tags）*** *或* ***符号（symbols）****。无论变量被称作什么，它们的功能始终相同。使用符合 IEC 61131-3 标准的编程软件（如 STEP 7, Codesys 或 Studio 5000）时，标准数据类型始终可用。*

##### 数据类型

根据你使用的 PLC 品牌，可用的数据类型会有所不同。以西门子 PLC 为例，STEP 7 提供的数据类型与 IEC 61131-3 标准中的标准类型相似。所有标准数据类型由 PLCOpen 组织定义，是 PLC 编程语言的一部分。所有带有结构化文本的 PLC 编程软件都包含这些标准数据类型。在 IEC 标准中，数据类型分为两类：

- 基本数据类型（Elementary data types） 
- 派生数据类型（Derived data types）

### 基本数据类型（Elementary data types）

- **整数（Integers）**

| IEC 数据类型 | 格式 | 范围 |
| --- | --- | --- |
| SINT | Short Integer | -128 … 127 |
| INT | Integer | -32,768 … 32,767 |
| DINT | Double Integer | -2³¹ … 2³¹-1 |
| LINT | Long Integer | -2⁶³ … 2⁶³-1 |
| USINT | Unsigned Short Integer | 0 … 255 |
| UINT | Unsigned Integer | 0 … 2¹⁶-1 |
| UDINT | Unsigned Double Integer | 0 … 2³²-1 |
| ULINT | Unsigned Long Integer | 0 … 2⁶⁴-1 |

- **浮点数（Floating points）**

| IEC 数据类型 | 格式 | 范围 |
| --- | --- | --- |
| REAL | 实数 | ±10^±38 |
| LREAL | 长实数 | ±10^±308 |

- **时间（Time）**

| IEC 数据类型 | 格式 | 示例 |
| --- | --- | --- |
| TIME | 时间间隔 | T#10d4h38m57s12ms |
| DATE | 日历日期 | D#1989-05-22 |
| TIME_OF_DAY | 一天中的时间 | TOD#14:32:07 |
| DATE_AND_TIME | 日期和时间 | DT#1989-06-15-13:56:14.77 |

- **字符串（Strings）**

| IEC 数据类型 | 格式 | 示例 |
| --- | --- | --- |
| STRING | 字符串 | 'My string' |

- **位字符串（Bit strings）**

| IEC 数据类型 | 格式 | 位数 |
| --- | --- | --- |
| BOOL | 布尔 | 1 bit |
| BYTE | 字节 | 8 bits |
| WORD | 字 | 16 bits |
| DWORD | 双字 | 32 bits |
| LWORD | 长字 | 64 bits |

### 派生数据类型（Derived data types）

- 结构化数据类型（Structured data types）
- 枚举数据类型（Enumerated data types）
- 子范围数据类型（Sub-range data types）
- 数组数据类型（Array data types）

派生数据类型是自定义数据类型，通过 **TYPE / END_TYPE** 构造定义。在这两个关键字之间，声明你想要的派生数据类型。不同的数据类型可以存储不同格式的数据，因此可以存储不同的数值。那么，如何将数值赋给变量？又如何使用变量呢？

通过语句（Statements）和运算符（Operators）。

##### 运算符与表达式

运算符用于操作数据，几乎存在于所有编程语言中。和运算符一样，表达式是编程语言中非常重要的部分。表达式是一种结构，当它被计算时，会产生一个结果值。也就是说，当编译器编译一个表达式时，它会计算该表达式，并将语句替换为计算结果。例如，假设有两个变量 **A** 和 **B**：

A 的值为 10，B 的值为 8

```python
A+B
```

这个表达式的结果是 18. 所以，编译器在处理时，会将 A + B 替换为结果 18. 一个表达式由运算符（operators） 和 操作数（operands） 组成。那么，什么是运算符和操作数呢？通过刚才的例子，你已经看到了它们：

- A 和 B 是操作数（operands）
- \+ 是运算符（operator）

结构化文本中有多种运算符可用。IEC 61131-3 标准描述了结构化文本语言中的所有标准运算符：

- 算术运算符（Arithmetic Operators）
- 关系运算符（Relational Operators）
- 逻辑运算符（Logical Operators）/ 按位运算符（Bitwise Operators）

其中一些常用运算符有：

| 操作 | 符号 | 优先级 |
| --- | --- | --- |
| 括号 | (expression) | 最高 |
| 乘方 | ** |  |
| 乘 / 除 / 取模 | * , /, MOD |  |
| 加 / 减 | + , - |  |
| 比较 | <, >, <=, >= |  |
| 等于 / 不等于 | = , <> |  |
| 取反/补码 | – , NOT |  |
| 布尔与 | & , AND |  |
| 布尔异或 | XOR |  |
| 布尔或 | OR | 最低 |

表中运算符按优先级（precedence）排序，也称为运算顺序（order of operations），类似数学中的概念。运算顺序指的是运算执行或计算的顺序。例如，考虑下面的表达式：

```python
A + B * MAX(C, D)
```

编译器会如何计算这个表达式呢？

如你在运算符表中看到的，优先级最高的是括号。这意味着首先计算括号内的内容——本例中是 `(C, D)`。但由于 `MAX(C, D)` 实际上是一个函数，我们需要参考表中函数求值（Function Evaluation）的优先级。因此，在这个表达式中，首先计算函数 `MAX(C, D)` 。函数会返回两个变量 `C` 和 `D` 中较大的值，并用这个值替换函数本身。假设结果是`C`，那么表达式就变为：

```python
A + B * C
```

接下来，你按照运算符优先级表继续往下查，直到找到表达式中使用的下一个运算符。剩下两个操作：乘法和加法。由于乘法优先级高于加法，所以先计算 `B * C`，然后再将结果加到 `A` 上。每次计算表达式时，编译器都会遵循表中规定的运算优先级顺序进行求值。

##### 语句

在前一节中，你了解表达式（expressions）会被计算，也就是说所有表达式都会产生一个结果，编译器会用结果替换表达式本身。但如果你希望 PLC（或编译器）不仅仅是计算结果，而是去执行某些操作呢？

答案就是 语句（Statements）。正如前面提到的，语句就是你告诉 PLC 要做什么。它是你给 PLC 的指令，用来执行具体的动作。如果你只是写一个表达式来得到结果，而不把这个结果用于某个操作（语句），那作用就不大。表达式只是计算，如果不通过语句去执行，就好比买了食材却不去做饭一样。下面，我们来看在结构化文本中可以使用的各种动作或语句。

### 赋值语句

最基础的语句就是赋值语句，它用于把一个值赋给变量。赋值语句在 IEC 标准中由 PLCOpen 定义，也是最先列出的语句类型。

`:=` 是赋值运算符（assignment operator），与表达式中的运算符类似。一个常见错误是将等号 `=` 用作赋值。例子：

`A = B   // 这是表达式，不是赋值
``A := B; // 这是赋值语句`

说明：

`=` 是关系运算符（relational operator），用于判断左右是否相等，结果为 TRUE（1）或 FALSE（0）。

`:=` 是赋值运算符，用于将右边的值赋给左边变量，是动作而非计算。

```iecst
A := B;
```

这个语句告诉编译器：把变量 B 的值赋给变量 A.

```iecst
A := 10;
```

这条语句会把数值 10 赋给变量 A，也就是说，变量 A 现在的值是 10.

```iecst
B := A + 2;
```

赋值语句右边可以是表达式。编译器会先计算表达式 `A + 2` 的结果（假设 A = 10，结果为 12），然后将结果赋值给 B. 编译器实际处理时相当于`B := 12;`

赋值语句中的右侧可以是：

- 数值常量
- 变量
- 函数
- 复杂表达式

编译器会先计算表达式，然后把结果用于赋值。

### 条件语句（Conditional Statements）

赋值语句很简单：把右边的值存到左边变量。但 PLC 程序不仅仅是存值，它是一段逻辑程序（PLC logic），需要根据不同情况做出决策。这也是为什么我们使用 PLC 或其他控制器——来根据当前状态做决定并采取行动。简单来说，PLC 会检查所有输入的状态，然后根据程序逻辑决定应该输出什么。因此，在 PLC 程序中，你需要一种方法来做决策，这就是条件语句的作用。条件语句用于根据条件决定执行哪个操作。在结构化文本中，有两种实现条件语句的方法：

- IF 语句（IF Statements）
- CASE 语句（CASE Statements）

IF 语句

用于判断条件是否成立，并根据判断结果执行不同的操作。虽然 IF 语句很容易理解，但你仍然需要按照特定方式告诉 PLC 条件是什么。这就涉及到语法（syntax）。IF 语句有专门的语法，也就是说，你必须以特定的格式书写，编译器才能理解。就像分号用于结束语句一样，IF 语句也有专门的关键字来构成条件语句。在结构化文本（STL）中，IF 语句的基本语法如下：

```iecst
IF 条件 THEN
    // 条件成立时执行的语句
ELSIF 其他条件 THEN
    // 其他条件成立时执行的语句
ELSE
    // 条件不成立时执行的语句
END_IF;
```

- **IF**：开始条件判断
- **THEN**：条件成立时执行的操作
- **ELSIF**：可选，用于判断其他条件
- **ELSE**：可选，当所有条件都不成立时执行
- **END_IF**：结束 IF 语句

CASE 语句

在结构化文本（ST）中，另一种实现决策的方法就是 CASE 语句。本质上，CASE 和 IF 都是用来做判断的，不同点在于：

- IF 语句使用 布尔条件（TRUE/FALSE） 来做判断
- CASE 语句使用 数值表达式（numeric expression） 来选择分支

因此 CASE 更适合在有多个“数值选项”时使用。

CASE 语句的语法

```iecst
CASE [数值表达式] OF
  结果1: <语句>;
  结果2: <语句>;
  ...
  结果N: <语句>;
ELSE
  <语句>;
END_CASE;
```

- CASE [数值表达式]：判断的条件，可以是一个整型或浮点型表达式
- 结果1, 结果2…：每个可能的值对应要执行的语句
- ELSE：默认分支，如果没有任何结果匹配，就执行这里的语句
- END_CASE：结束 CASE

示例

```iecst
PROGRAM_STEP := 3;
CASE PROGRAM_STEP OF

  1: PROGRAM_STEP := PROGRAM_STEP + 1;
  2: PROGRAM_STEP := PROGRAM_STEP + 2;
  3: PROGRAM_STEP := PROGRAM_STEP + 3;
ELSE

  PROGRAM_STEP := PROGRAM_STEP + 10;
END_CASE;
```

- `PROGRAM_STEP` 初始值为 `3`
- CASE 会判断 `PROGRAM_STEP` 的值
- 因为匹配到 `3`，所以执行 `PROGRAM_STEP := PROGRAM_STEP + 3;`
- 执行结果：`PROGRAM_STEP = 6`

### 迭代与循环

在结构化文本（ST）中，最强大的功能之一就是 循环（Loop） ——它能让某些代码重复执行。在 PLC 编程中，循环非常有用：

- 你可能需要执行某段逻辑固定次数
- 或者一直执行，直到某个条件成立

ST 提供了三种循环语句：

- FOR 循环：用于确定次数的循环
- WHILE 循环：条件为真才继续
- REPEAT 循环：至少执行一次，然后判断是否结束

FOR 循环

FOR 循环里还会用到一些关键词：**TO, BY, DO 和 END_FOR**。在结构化文本（Structured Text）里，FOR 循环的语法是这样的：

```iecst

FOR count := initial_value TO final_value BY increment DO 
    <statement>;
END_FOR;
```

另外，你也可以在循环中使用 IF 语句 和 EXIT 关键字，让循环在还没数到终点时提前结束。只要加上一个布尔条件，当条件为 TRUE 时，循环就会立即停止。

```iecst

IF [boolean expression] THEN
    EXIT;
END_IF;
```

WHILE 循环  

WHILE 循环和 FOR 循环有点不同，它不是预设次数，而是只要条件为 TRUE，就会一直重复执行。换句话说，WHILE 循环会在布尔表达式的结果为 TRUE 时不停运行。

WHILE 循环的语法如下：

```iecst

WHILE [boolean expression] DO  
    <statement>;
END_WHILE;
```

在 WHILE 和 DO 之间写的是布尔表达式。如果这个布尔表达式的结果为 TRUE，那么从 DO 到 END_WHILE 之间的所有语句都会被执行。当程序运行到 END_WHILE 时，会再次检查这个布尔表达式。如果结果依旧是 TRUE，循环就会继续执行。这个过程会一遍又一遍地重复，直到表达式结果不再是 TRUE. 要让循环最终停下来，你必须在循环内部改变布尔表达式里用到的值。只有这样，布尔表达式才能从 TRUE 变成 FALSE，从而跳出循环。下面是一个结构化文本（Structured Text）里 WHILE 循环的示例：

```iecst
counter := 0;
WHILE counter < 10 DO
  counter := counter + 1;

  machine_status := counter * 10;
END_WHILE;
```

你也可以在 WHILE 循环里使用 EXIT 关键字，在布尔表达式变为 FALSE 之前提前结束循环。语法是把 EXIT 放在 IF 语句 中，可以放在 DO 和 END_WHILE 之间的任意位置。

```iecst

IF [boolean expression] THEN
    EXIT;
END_IF;
```

REPEAT 循环  

结构化文本里的最后一种循环是 REPEAT 循环。它的工作方式与 WHILE 循环相反：当布尔表达式为 TRUE 时，循环才会停止。在 ST 中，REPEAT 循环的语法如下：

```iecst
REPEAT
  <语句>;
UNTIL [布尔表达式]
END_REPEAT;
```

注意，这种循环的布尔表达式写在语句之后，因此循环体里的语句 **至少会执行一次**。这种特性很有用，比如你想让某个操作至少执行一次，然后根据条件决定是否继续重复。和 WHILE 循环一样，你必须在循环中改变布尔表达式里用到的值，才能让循环停止。这可以通过增加变量的值（用于计数），或者在循环中使用条件语句（比如 IF 语句）来实现。更多教学视频请见：

<figure view-type="Preview">

</figure>

<figure view-type="Preview">

</figure>

#### 连续功能图（CFC）

##### 简介

连续功能图（CFC, Continuous Function Chart） 是对 IEC 61131-3 标准的扩展，是一种**基于功能块图（FBD, Function Block Diagram） 的图形化编程语言**。与 FBD 不同的是，CFC 不再采用“网络（Network）”结构，而是允许用户 自由摆放图形元素，并可以在程序中创建 反馈回路（feedback loop）。这种灵活性让逻辑表达更直观，特别适合连续控制与复杂信号流的实现。本节以下关于CFC的演示全部以国产化PLC开发工具链ViGET为例。

##### CFC 显示

### CFC 树图显示

在工具栏上点击 Show CFC TreeView图标，即可弹出 CFC 树图, 如图所示：

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_083.png]]

<p class="kb-image-caption">图例</p>

当保存 CFC 文件时，会刷新这个对话框中的信息。这些复合功能块可以通过向任何打开的 CFC 文件拖拽而再次被使用，如同普通功能块一样。拖拽只是将复合功能块复制到一个新的位置，其名字和所有包含的功能块都会自动的全部复制。

##### CFC 文件

ViGET V2.0 工程工具软件是一个用图形化创建自动化程序的设计工具。CFC 图的主要元素是一些能够在图上自由排列的模块（功能块, 用户自定义模块和复合模块）和将一个输出和一个或多个输入连接的连线。

### 模块的使用

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_086.png)

<p class="kb-image-caption">图例</p>
- 向你的 CFC 图中加入模块，右键菜单选择 Insert Function Block…或 Insert Text Block 或 Insert Page Content Text Block 或 Insert Compound Block, 也可通过上图中工具条按钮进行操作。
- 鼠标光标发生变化时，在想要插入新模块的地方单击鼠标左键。
- 重新排列模块，选择模块并拖拉它们到新的位置。
- 当添加新模块或移动已有模块的时候，CFC 编辑器会适当移动边上的已有模块来腾出空间。
- 从图上移除模块时，选择想要移除的模块点击鼠标右键选择 Delete.
- 双击一个模块将出现模块属性，如图所示，可以更改模块的类型, 名字和注释。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_088.png)

<p class="kb-image-caption">图例</p>

连接两个功能块，先选择一个功能块的某个输出管脚（输入管脚），再选择另一个功能块的某个输入管脚（输出管脚），若两个管脚类型相同或兼容，则可完成两个管脚之间的连线。ViGET V2.0 工程工具软件支持多线连接。如图 所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_089.png)

<p class="kb-image-caption">图例</p>

在空白处右键菜单选择 Insert Text Block 来插入一个文本模块。一个文本模块只是一个说明文本，而不能添加任何执行代码。双击文本模块可以在其中编辑文本，添加想要说明的文字，如图所示：

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_091.png]]

<p class="kb-image-caption">图例</p>

CFC 编辑器支持一个功能块或一个用户自定义模块替换成另一个类型的模块，选中模块，右键菜单选择 Replace Function Block…选项。一个类似于 Insert Function block 的对话框将出现，允许用户从已知的功能块和用户自定义模块中选择想要的新模块类型。在选择新的模块类型后，另一个对话框将显示，在替换后允许用户将原来的旧模块的连接映射到新模块之间的连接。对话框的最后一列列出了旧模块类型的连接线的数 类型。用户可以为旧模块类型的每个连接线分配相应的连接线。注意，每个模块的每个连接线只能被分配一次。在选择 CFC 编辑器的 OK 后，在任务对话框中将详细列出新的模块类型和重新连线。

### 隐去没有使用到的连接点

为了使功能块之间的连接更清晰简洁，可在 CFC 编辑界面右键菜单选择 Toggle Unused Connectors 选项，或点击 CFC View 工具条中的 Toggle Unused Connectors 按钮来显示/隐藏所有没有使用到的连接点，如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_093.png)

<p class="kb-image-caption">图例</p>

尽管实际中 CFC 图的长度没有限制，但是在一个很长的图中很难看清图的全貌。复合模块能够更好地组织程序，隐藏复合模块内部的相关逻辑模块组。一个复合模块内部的模块之间的信息，在外面是不可见的。在一个复合模块的外部，只有进入或离开该复合模块是可见的。

### 创建复合模块

创建一个新的复合模块：

在CFC编辑器界面空白处，右键菜单选择Insert Compound Block，或点击CFC View工具条中Insert Compound Block按钮：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_098.png)

<p class="kb-image-caption">图例</p>

在复合模块中可以编辑其他许多模块，如功能块, 文本，也可以插入复合模块。对于复合模块中的复合模块，我们也可以在其中添加其它模块。通过复合模块的使用可以使得 CFC 文件更有层次感，上下逻辑更加清楚。

- 进入复合模块：
   选中复合模块，点击CFC View工具菜单中的Level Down按钮即可进入复合模块中编辑，或者选中复合模块，右键菜单选择Level Down选项，如图所示：
   ![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_101.png)

<p class="kb-image-caption">图例</p>

   当进入复合模块后，同样也可以回退到复合模块的上一层。在复合模块中，点击CFC View工具菜单中的Level Up按钮即可回退到复合模块的上一层，或者在CFC编辑界面的空白处右键菜单选择Level Up选项，如图所示：
   ![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_102.png]]

<p class="kb-image-caption">图例</p>

CFC 编辑器为用户提供了一种特殊的标注方式，称为“页内容文本块”。这种文本块区别于普通文本模块，普通文本模块倾向于对一个页面中某个小模块进行标注，如功能块和复合功能块。页内容文本块是对整页或对一页的大范围内容的说明。页内容文本块的插入：在 CFC 编辑器界面空白处，右键菜单选择 Insert Page Content Text Block 选项，或点击 CFC View 工具条中 Insert Page Content Text Block 按钮，如图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_104.png)

<p class="kb-image-caption">图例</p>

每个页内容文本块都会在总览页面生成一行目录，如果文本块中含有回车，回车在总览页面显示时将被移除。如果文本中的内容长度超过了总览页面一行的长度时，内容将被截断省略。页内容建议使用简短的描述语言，这样在总览页中看起来更清晰。如果一个总览页面放不下所有的页内容文本块的内容，总览页则被分成多个页面显示。当打印 CFC 文件的时候，总览页面当然也是输出文件的一部分。

##### CFC 功能模块（用户功能块）

### CFC 功能块创建

CFC 编辑器可以用来创建用户功能块，即 CFC 功能块，由 CFC 语言组成，是工程的一部分。通过点击 File->New->File…创建 CFC 功能块，或在工程节点上右键菜单选择 Add->Add New Item…选项。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_107.png)

<p class="kb-image-caption">图例</p>
- 使用了 CFC 功能块的功能块不能作为一个任务，因为 CFC 功能块是作为一个整体放入程序中的，同时，Runtime 配置编辑器不能用来定义功能块的运行速率，且只能显示一个任务级；
-  CFC 功能块必须定义一个输入或输出接口；
- “Connect to”对话框只允许插入连接功能块的输入或输出接口。在功能块内部使用右键菜单 User FB Interface 来创建 CFC 功能块的输入或输出接口

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_108.png)

<p class="kb-image-caption">图例</p>

</figure>

#### 各语言的适用场景和特点

| 名称 | 缩写 | 特点 | 常见用途 |
| --- | --- | --- | --- |
| Ladder Diagram | LD | 梯形图，像电路继电图，用“触点”和“线圈”表示逻辑 | 开关量逻辑, 继电控制 |
| Function Block Diagram | FBD | 功能块图，用方块和线连接信号 | 模拟量计算, PID控制 |
| Sequential Function Chart | SFC | 顺序功能图，用“步（Step）”和“转换（Transition）”来表示流程 | 顺序控制, 状态机逻辑 |
| Continuous Function Chart | CFC | 连续功能图，FBD的扩展版，自由连线, 自动确定执行顺序 | 连续控制, 信号处理（如PID链路） |

图形化语言

文本语言

### 编程规范与代码优化技巧

在 PLC 编程中，规范化编程和合理优化可以显著提升程序的可读性, 可维护性和执行效率。本节以结构化文本（ST）语言为例，总结常用方法和技巧。

#### 编程规范

##### 命名规范

- 变量名要有意义，避免使用无意义缩写，例如 `ms1` → `motor_speed`。
- 统一风格：

  - 小写 + 下划线：`current_value`
  - 驼峰式：`CurrentValue`
- 常量或宏使用全大写：`MAX_TEMP`
- 函数/方法命名：用动词开头，描述功能，例如 `calculateSpeed()`。

```iecst
VAR

    motor_speed : INT;       // 电机速度，单位 rpm
    temperature : REAL;      // 当前温度，单位 °C
    MAX_TEMP    : REAL := 100.0; // 最大温度限制
END_VAR
```

##### 注释规范

- 注释应解释“为什么写这段代码”，而非“做了什么”。
- 注释保持简洁, 紧凑, 避免重复。
- 对复杂逻辑或公式建议详细说明计算原理。

```iecst
// 检查电机温度是否超过安全阈值

IF temperature > MAX_TEMP THEN
    motor_speed := 0;   // 温度过高，停止电机
END_IF;
```

#### 代码优化技巧

##### 减少冗余逻辑

- 合并重复条件，避免多处写相同判断。
- 提取公共表达式，赋值给临时变量或封装函数。
- 使用函数/功能块，替代重复代码块，提高复用性。冗余逻辑优化前：

```iecst

$IF sensor1 = TRUE OR sensor2 = TRUE OR sensor3 = TRUE THEN$
    alarm := TRUE;
END_IF;
```

优化后：

```iecst
VAR

    any_sensor_triggered : BOOL;
END_VAR

any_sensor_triggered := sensor1 OR sensor2 OR sensor3;
IF any_sensor_triggered THEN
    alarm := TRUE;
END_IF;
```

##### 循环优化

### FOR 循环优化

- 避免在循环内重复计算或函数调用。
- 尽量把循环体内能提前计算的内容移出循环。优化前：

```iecst
FOR i := 1 TO 100 DO

    sum := sum + ReadSensor(i);
END_FOR;
```

优化后：先读取存入数组，再累加

```iecst
VAR

    sensor_values : ARRAY[1..100] OF INT;
END_VAR
FOR i := 1 TO 100 DO

    sensor_values[i] := ReadSensor(i);
END_FOR;
FOR i := 1 TO 100 DO

    sum := sum + sensor_values[i];
END_FOR;
```

### WHILE / REPEAT 循环优化

- 控制循环次数：避免无限循环。
- 提前退出：使用 `EXIT` 关键字减少不必要迭代。
- 减少循环内部复杂运算：可将计算提前到循环外。示例：

```iecst
WHILE count <= 10 DO

    count := count + 1; // 增量
    ProcessStep(count);
    IF error_detected THEN
        EXIT;  // 遇到错误立即退出循环
    END_IF;
END_WHILE;
```

##### 布尔逻辑优化

使用 短路逻辑 减少计算量：

原写法：

```iecst

$IF sensor1 = TRUE OR sensor2 = TRUE OR sensor3 = TRUE THEN$
    alarm := TRUE;
END_IF;
```

优化后：

```iecst

IF sensor1 OR sensor2 OR sensor3 THEN
    alarm := TRUE;
END_IF;
```

#### 函数封装与模块化

- 将重复逻辑封装为 功能块（Function Block, FB）或函数，提高代码复用性。
- 函数内部可使用局部变量，减少全局变量占用。示例：

```sql

FUNCTION FB_CheckTemperature : BOOL
VAR_INPUT
    temp : REAL;
END_VAR
VAR
    result : BOOL;
END_VAR
IF temp > MAX_TEMP THEN
    result := TRUE;
ELSE
    result := FALSE;
END_IF;

FB_CheckTemperature := result;
```

主程序中调用：

```iecst

IF FB_CheckTemperature(temp) THEN
    motor_speed := 0;
END_IF;
```

## PLC通信协议

### 工业通信协议

#### 工业通信协议总览

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

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_113.png)

<p class="kb-image-caption">图例</p>

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

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/img_115.png)

<p class="kb-image-caption">图例</p>

</figure>

#### OPC UA 应用场景

### 能源监控

- 数据采集与设备监控：  

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

### 与上位机, HMI, SCADA系统通信实现

#### HMI

HMI（Human-Machine Interface）就是操作人员与系统, 设备或机器之间的 **用户界面**，通过它可以监控, 控制和交互。

HMI（人机界面） 并不是某个特定的硬件，而是一块 让用户与设备交互的屏幕。HMI 也可以叫做 操作终端（Operator Terminal）, 本地操作界面（Local Operator Interface） 或 图形用户界面（Graphical User Interface, GUI）。如果你对 OT, LOI 或 GUI 这些名字有印象，那是因为你可能已经用过类似的设备。简单来说，HMI 用于 显示数据，帮助用户更直观地理解和控制系统。现代 HMI 的典型例子就是 平板电脑。平板就是一个 GUI，可以让你控制各种流程。例如，如果你的平板或手机通过蓝牙连接电视，你就可以用它来操作电视。HMI 的形态多样，包括电脑显示器, 带内置屏幕的机器等。

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_116.png]]

<p class="kb-image-caption">图例</p>

SCADA 这个名字不是随便取的，它是 Supervisory Control and Data Acquisition（监控与数据采集） 的缩写。SCADA 系统包含软件和硬件，主要用于以下几个方面：

- 远程或本地控制各种工业过程
- 通过 HMI（人机界面）软件与传感器, 泵, 马达和阀门交互
- 实时监控, 采集和处理数据
- 将事件记录到文件中，方便追踪和分析

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_117.png]]

<p class="kb-image-caption">图例</p>

SCADA 和 HMI 系统分别用于采集数据和显示数据。而 PLC 作为工业计算机，则充当了工艺过程与控制系统之间的桥梁。因此，PLC 常常与 SCADA 系统和 HMI 一起使用。HMI 在各行各业随处可见，在我们日常生活中也能看到，例如显示器或平板电脑。随着技术发展，出现了新型的 HMI 和 SCADA 系统。现代 HMI 的典型例子是 触摸屏，它为操作员提供了很大的灵活性。工业硬件的发展也推动了 PLC 和 SCADA 系统的升级：PLC 能够执行更复杂的逻辑任务，SCADA 系统则更通用，可以采集大量数据。总的来说，随着技术进步，未来这些系统还会有更多改进和提升，值得期待。

<figure view-type="Preview">

</figure>

<figure view-type="Preview">

</figure>

## PLC在典型工业场景中的应用

### 应用案例分享

#### PLC在电力系统中的应用

<p class="kb-image-caption">图例</p>

**发电**：PLC控制电厂中的关键设备，如汽轮机, 发电机和锅炉，通过调整温度, 压力和转速等参数优化性能，确保运行平稳。利用PLC进行太阳能电池板控制，可以实现太阳能资源的自动追踪和太阳能电池板的自动控制，优化太阳能利用效率，减少用电成本。

**能源分配**：管理电网和变电站的电力分配，包括控制断路器, 调节电压和负载，以应对需求波动或故障。

**智能电网**：PLC集成于智能电网，用于监控和管理能耗, 保障电网稳定，并促进可再生能源接入。

**能源管理**：在大型设施中，PLC通过控制照明, 空调和通风系统等，实现用电优化，降低成本。

**安全系统**：安全等级PLC负责关键停机响应，并可检测硬件故障，防止危险事故发生。

#### PLC 在产线自动化控制的应用

PLC在产线自动化控制中有着广泛应用，例如在汽车制造生产线中，PLC可控制机器人焊接, 涂装, 装配等；在食品饮料包装线中，它负责设备的启动, 停机, 速度调节和故障检测；在电子产品组装线中，PLC能协调传送带, 检测站, 点胶机等设备的运行，确保产品精准高效生产。 

### 汽车制造生产线

![[attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_119.png]]

<p class="kb-image-caption">图例</p>

[基于plc的皮带输送机控制系统](https://www.douyin.com/search/%E5%9F%BA%E4%BA%8Eplc%E7%9A%84%E7%9A%AE%E5%B8%A6%E8%BE%93%E9%80%81%E6%9C%BA%E6%8E%A7%E5%88%B6%E7%B3%BB%E7%BB%9F?modal_id=7115762749338111239)

- **应用:** 协调传送带, 视觉检测系统, 点胶机, 贴片机等。 
- **过程:** PLC控制传送带的物料传输，配合视觉系统检测产品有无缺陷，并触发点胶机进行精准点胶，确保电子元件的准确安装。

#### PLC 在交通系统中的应用

PLC（可编程逻辑控制器）在交通系统中广泛应用于交通信号灯控制, 高速公路收费系统和交通管理系统集成等领域。它能根据实时交通流量自动调整信号灯时长，提高道路通行效率；实现收费站的自动化控制，识别车牌等；并作为交通管理的一部分，与其他系统联动，协调信号和处理事件。 

### 交通信号灯控制

- PLC 可以实现交通信号灯的智能化控制，根据车辆探测器和行人按钮等输入信息，动态调整信号灯的运行逻辑和切换时间，以优化交通流量，减少拥堵。 
- 通过模拟控制系统，可以设计出高效的交通信号灯系统，提升交通管理效率和安全性。 

### 高速公路收费系统

- PLC 可用于控制收费站的自动化流程，例如识别车辆车牌，实现自动收费功能。 

### 交通管理系统集成

- PLC 可以作为交通管理系统中的一个节点，与其他设备和系统（如交通监控系统）进行通信和集成。 
- 通过这种集成，可以实现交通信号的协调联动, 事件处理（如突发事故），以及故障诊断等功能，提高整个交通系统的运行效率。 

### 多PLC协同控制策略

在一些复杂的工业系统中，一个PLC往往无法独立完成全部控制任务，需要多个PLC协同工作。这是较为常见的一种应用方式，多个独立的PLC通过网络连接在一起。每个PLC可能负责较大工艺流程中的某个特定部分或功能，例如输送带系统的不同工段。这些PLC之间可以相互通信，并通常与中央HMI连接，由HMI显示信息，让操作员监控和控制整个系统。这种方式非常适合大型工业应用，当单个PLC无法管理复杂流程时，多PLC网络可以提供高度可扩展性 和故障容错能力。

**集中式控制**：所有控制逻辑集中在一台PLC上，优点是统一管理, 调试方便，但缺点是系统规模大时，单点故障风险高。

**分布式控制**：将控制任务分散到多台PLC上，每台PLC负责一个模块或工序，优点是扩展性好, 故障隔离性强，缺点是系统复杂度增加，需要良好的通讯和同步策略。

### 高可用性与冗余系统设计

#### 双机热备份（Hot Standby）

双机热备份是工业控制系统中非常常见的一种高可用性设计方案，主要目的是保证PLC系统在出现故障时能够无缝切换，不影响生产和设备运行。

**基本原理**：

系统中存在两台PLC，一台为主PLC（Active），负责日常控制；另一台为备用PLC（Standby），实时接收主PLC的数据和状态信息。当主PLC出现故障（如CPU停机, 程序异常），备用PLC立即切换为主控，接管全部控制任务。

**同步方式**：

- **数据同步**：主PLC将所有输入, 输出状态以及内部变量实时或周期性传输给备用PLC.
- **逻辑同步**：部分高端PLC支持程序逻辑的实时同步，确保备用PLC可以在任何时刻精确接管当前运行状态。

**应用场景**：

- 电力调度系统：停机可能导致电网事故，必须确保控制不中断。
- 石化或化工流程：反应过程复杂且危险，控制系统必须保证高可靠性。
- 铁路和轨道交通信号系统：列车运行安全要求极高，控制系统必须零宕机。

#### 冗余电源设计

PLC系统的电源稳定性直接影响系统可靠性，尤其在高端工业环境中，断电或电压波动可能导致重大生产事故。

### 单路电源的风险

如果仅使用单路电源，一旦断电或电压异常，PLC立即停机，整个系统控制中断。

**双路/三路电源设计**：

- 双路冗余电源：PLC接入两条独立供电线路，当一条线路出现故障，另一条线路自动供电，系统继续运行。
- 三路冗余电源：用于关键任务场景，进一步提高供电可靠性。

**UPS不间断电源**：

在电力或交通系统中，PLC通常配备UPS，保证短时停电或电压波动时，系统仍能正常运行，并有足够时间切换至备用电源或安全停机。

#### 高可靠性系统设计的关键点

高可靠性系统不仅依赖硬件的稳定性，还需要在软件, 网络和运维层面进行全面设计。

### 硬件可靠性

- 耐环境干扰：选择抗高温, 抗湿, 抗震动的PLC模块，保证在工业现场恶劣环境下稳定运行。
- 冗余模块设计：关键I/O模块采用冗余备份，避免单模块故障导致整个控制系统停机。
- 防护措施：加装过压, 过流, 浪涌保护，防止电气干扰损坏PLC硬件。

### 软件可靠性

- 程序自检机制：PLC程序定期检查自身运行状态，包括变量范围检查, 逻辑完整性检查等。
- 自恢复机制：当检测到异常状态或错误时，PLC能自动尝试恢复正常运行或切换至安全状态。
- 异常日志记录：软件记录所有异常事件，便于事后分析和优化程序逻辑。

### 网络可靠性

- 冗余通信拓扑：工业以太网, Profinet或Modbus TCP等通信网络可以采用环网或双网卡冗余设计。
- 数据同步与校验：多PLC或PLC与上位机之间的数据通信需要实时校验，保证数据一致性。
- 快速故障切换：通信链路异常时，自动切换至备用网络，保证控制系统不中断。

### 运维保障

- 实时监控：SCADA或监控系统实时采集PLC运行状态，包括CPU使用率, 电源状态, I/O状态等。
- 报警机制：故障或异常状态立即触发报警，通知运维人员。
- 远程维护：高级PLC支持远程诊断, 程序更新和故障处理，减少现场停机时间。
- 定期演练：定期模拟电源故障, PLC切换，保证系统应急能力。

#### 国产PLC如何在高端工业场景中提升竞争力。

[大 型 纪 录 片《国 产 PLC 传 奇》](https://www.bilibili.com/video/BV1aw411K7dQ/?spm_id_from=333.337.search-card.all.click&vd_source=c8041efd376e7f34e73272f6ae86b7a5)

学生讨论

## 附件

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[机器人/PLC与工业/SC500-国产化PLC/全国产化可编程控制器SC500课程简介-It8ZddZ8|全国产化可编程控制器SC500课程简介]]
[[机器人/PLC与工业/ViGET-许继与DPS/DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]] — _PLC / 工业_
[[HVDC-变压器放电故障诊断-H3ZLdpYX|HVDC 变压器放电故障诊断]] — _PLC / 工业_
[[PLC-基础理论教程-BbIQdZZp|PLC 基础理论教程]] — _PLC / 工业_
[[Profinet-Driver-架构(UfY6)-UfY6dCEK|Profinet Driver 架构（UfY6）]] — _PLC / 工业_
[[SIMATIC-D7-FB-Gen-说明-ZTkwd4rd|SIMATIC D7 FB-Gen 说明]] — _PLC / 工业_
[[ViGET-Turbo-测试报告-YvCvdNRS|ViGET Turbo 测试报告]] — _PLC / 工业_

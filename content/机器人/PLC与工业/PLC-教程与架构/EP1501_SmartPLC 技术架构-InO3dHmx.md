---
title: 技术架构
url: https://my.feishu.cn/docx/InO3dHmxToFaboxyODncRf7vn2d
quality: raw
fetch_source: feishu:cli
fetched_at: 2026-06-27 20:01:18+00:00
feishu_formatted_at: 2026-06-28 04:29:28+00:00
wikilinks_unbulleted_at: 2026-06-28 05:48:28+00:00
custom-width: 83
---

# 项目概述

EP1501_SmartPLC 是一个基于 VxWorks 的智能可编程逻辑控制器（PLC）固件项目，面向电力系统/变电站自动化。

# 技术架构

## 操作系统与硬件平台

- 实时操作系统: VxWorks 6.9
- CPU架构: PowerPC (PPC85XX)
- BSP: XJ_p1010_EP1501 (基于 P1010 RDB)
- 开发工具: Wind River Workbench

## 核心功能模块

### PLC运行时系统 (LZS)

- 位于 SmartPLC/lzs/ 和 SmartPLC/inc/smartplc/
- 提供PLC核心运行时环境
- 支持功能块编程（FBC）

### IEC61850协议支持

- PIS10/ 目录包含IEC61850实现
- 支持MMS, GOOSE, SV（采样值）等
- 用于变电站通信

### GOOSE协议

- FBC_11_GOOSE/ 实现GOOSE通信
- 用于变电站快速事件传输

### 硬件驱动层

- DFU420硬件: FBC_10_DFU420_Hardware/
- CP5000硬件: FBC_12_CP5000_Hardware/
- 包含数字I/O, 模拟I/O, 通信接口等驱动

### 通信模块

- 多种工业通信协议驱动（comm/）
- HMI通信（commHMI/）
- TCP/IP网络通信
- 支持多种现场总线协议

### 任务调度系统

- tskScheduler/ 实现实时任务调度
- 支持多任务并发执行

### 其他功能

- 时间同步（timeSync/）
- FTP文件传输（ftp/）
- 数据持久化存储

# 应用场景

用于变电站自动化系统，支持：

- IEC61850标准通信
- GOOSE快速事件传输
- 实时控制与监控
- 多种工业通信协议
- 硬件I/O控制

# 项目特点

1. 实时性：基于VxWorks，满足实时控制需求
2. 标准化：支持IEC61850
3. 模块化：功能模块清晰分离
4. 可扩展：支持多种硬件平台和通信协议

这是一个工业级PLC固件项目，适用于电力系统自动化应用。

# 项目架构详解

## 整体架构层次

![image](attachments/InO3dHmxToFaboxyODncRf7vn2d/img_001.png)

<p class="kb-image-caption">图例</p>

## 系统启动流程

### VxWorks 启动序列

![image](attachments/InO3dHmxToFaboxyODncRf7vn2d/img_002.png)

### PLC 系统初始化 (main())

![image](attachments/InO3dHmxToFaboxyODncRf7vn2d/img_003.png)

### 任务调度架构

#### 任务类型与优先级

![image](attachments/InO3dHmxToFaboxyODncRf7vn2d/img_004.png)

#### 任务调度机制

周期性任务 (T1~T5)

- 基于定时器触发
- 每个任务有独立的执行周期
- 通过信号量同步 (task1SemID_nor ~ task5SemID_nor)

中断任务 (I1~I8)

- 硬件中断驱动
- 高优先级，快速响应
- 通过信号量同步 (int1SemID ~ int8SemID)

系统任务 (SYS)

- 系统模式下的程序执行
- 在正常模式之前执行
- 通过 taskCyclicSemID_sys 同步

#### 任务执行模式

每个任务支持多种执行模式：

```C++
typedef enum {
    kInitMode = 0,           // 初始化模式
    kSystemMode = 1,         // 系统模式
    kNormalMode = 2,         // 正常模式
    kFastImport = 3,         // 快速导入
    kConsistentImport = 4,   // 一致性导入
    kConsistentExport = 5,   // 一致性导出
    kFastExport = 6          // 快速导出
} tFBModes;
```

#### 任务上下文切换

每个任务执行时：

1. ENTRY宏: 保存上下文

   - REG_BACKUP() - 保存寄存器集
   - MODE_BACKUP() - 保存模式
   - TA_BACKUP() - 保存任务激活时间
   - 获取任务特定的TA (Task Activation time)
2. 执行: 调用 LzsIpMainLoop() 执行IEC程序
3. EXIT宏: 恢复上下文

   - TA_RESTORE() - 恢复TA
   - MODE_RESTORE() - 恢复模式
   - REG_RESTORE() - 恢复寄存器集

## PLC运行时系统 (LZS)

### 核心组件

LZS Runtime System

├─→ lzscom.h    - 运行时控制 (启动/停止/状态)

├─→ lzsenv.h    - 环境接口 (初始化/持久化)

├─→ lzsip.h     - 解释器 (IEC程序执行)

├─→ lzsstate.h  - 状态管理 (程序流程控制)

├─→ lzstable.h  - 段表管理 (程序段/任务定义)

├─→ lzsvar.h    - 变量管理 (变量表访问)

├─→ lzspers.h   - 持久化 (数据保存/恢复)

└─→ lzsnet.h    - 网络变量

### 程序执行流程

任务触发 (定时器/中断)

    ↓

    LzsIpMainLoop(pControlSet)

    ├─→ 获取程序列表 (pProgramList)

    ├─→ 遍历程序段执行

    │   ├─→ 读取输入变量 (Process Image Input)

    │   ├─→ 执行功能块/程序

    │   └─→ 写入输出变量 (Process Image Output)

    └─→ 更新任务状态

### 内存管理

- 段表 (Segment Table): 管理程序段, 数据段
- 变量表 (Variable Table): 管理IEC变量
- 寄存器集 (Register Set): 每个任务独立的执行上下文
- 进程映像 (Process Image): 输入/输出映像区

## 通信架构

### 通信层次

![image](attachments/InO3dHmxToFaboxyODncRf7vn2d/img_005.png)

### HMI通信 (commHMI/)

- TCP服务器: 监听端口6000
- 多客户端支持: 最多5个并发连接
- 数据交换: 使用共享缓冲区机制
- TX缓冲区: 发送数据
- RX缓冲区: 接收数据
- 通过信号量同步

### IEC61850通信 (PIS10/)

- MMS (Manufacturing Message Specification): 客户端/服务器通信
- GOOSE (Generic Object Oriented Substation Events): 快速事件传输
- SV (Sampled Values): 采样值传输

### 工业协议 (comm/)

支持多种工业通信协议：

- Modbus (mbsu02.h, mob8.h)
- Profibus (pdabb.h)
- 其他协议驱动

## 硬件抽象层

### 硬件平台支持

- DFU420: FBC_10_DFU420_Hardware/
- 数字I/O (DDI.c, DDO)
- 模拟I/O (DFI500.c)
- 通信接口 (DSER.c)
- CP5000: FBC_12_CP5000_Hardware/
- FPGA接口 (SPU_FPGA.h)
- I/O模块 (SDI.c, SDO.c)
- 通信模块

### 硬件驱动接口

通过功能块 (Function Blocks) 封装硬件操作：

- FB_RS_U() - 串口通信功能块
- FB_RCV_U() - 接收功能块
- 硬件特定的功能块

## 数据流

### 输入数据流

硬件I/O → 硬件驱动 → 进程映像输入区 → IEC程序读取

### 输出数据流

IEC程序写入 → 进程映像输出区 → 硬件驱动 → 硬件I/O

### 通信数据流

外部设备 → 网络协议栈 → 通信任务 → LZS运行时 → IEC程序

## 关键特性

1. 实时性保证

   - 基于VxWorks实时操作系统
   - 优先级调度
   - 中断任务快速响应
2. 多任务并发

   - 最多13个任务并发执行
   - 任务间通过信号量同步
   - 上下文隔离
3. 持久化存储

   - 支持程序和数据持久化
   - 冷启动/热启动支持
   - 数据恢复机制
4. 标准化支持

   - IEC 61131-3标准
   - IEC61850标准
   - 多种工业协议
5. 可扩展性

   - 模块化设计
   - 功能块扩展
   - 硬件平台抽象

## 典型执行周期
```
系统时钟中断

↓

T0任务 (看门狗/监控)

↓

系统任务 (SYS) - 系统模式程序

↓

周期性任务 (T1~T5) - 按各自周期执行

↓

中断任务 (I1~I8) - 响应硬件中断

↓

通信任务 - 处理网络通信

↓

空闲任务 - CPU空闲处理
```

该架构设计支持实时控制, 多任务并发, 标准化通信和硬件抽象，适用于工业自动化应用。

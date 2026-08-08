---
title: EtherCAT 实时以太网
url: https://blog.csdn.net/pwl999/article/details/109397700
curated_at: '2026-06-28T20:00:00+00:00'
---

# EtherCAT 实时以太网

EtherCAT（Ethernet for Control Automation Technology）是 Beckhoff 提出的**硬实时**工业以太网协议，报文经过从站时**硬件提取/插入**过程数据，无需从站 CPU 解帧，周期可达微秒级。

## 1. 简介

### 1.1 运动控制背景

运动控制系统协调多轴位置, 速度, 加速度, 力矩；单轴分开环/半闭环/闭环，多轴分点位, 连续轨迹, 同步控制。典型架构：上位机 HMI → 运动控制器 → 驱动器 → 电机 + 反馈。

### 1.2 实时以太网分类

| 类型 | 代表 | 特点 |
|------|------|------|
| 基于 TCP/IP | Modbus/TCP, Ethernet/IP | 吞吐高，实时性一般 |
| 标准以太网帧 + 专用协议 | Powerlink, PROFINET IRT | 较好实时性 |
| 修改/专用链路层 | **EtherCAT**, PROFINET IRT | 硬实时，<1 ms 级 |

### 1.3 EtherCAT 特点

- 主站发帧，从站**逐站**读/写数据并转发，全双工链式回环
- 主站可用**标准网卡**；从站用 ESC（EtherCAT Slave Controller）芯片
- 拓扑灵活：线型, 树型, 星型, 冗余环

## 2. 原理

### 2.1 通信机制

主站 → 从站1 → 从站2 → … → 末站 → 返回主站。每个从站 ESC 在帧经过时处理子报文，延迟仅纳秒级。物理层为标准 100 Mbps 以太网。

### 2.2 实时性：刷新时间估算

最小以太网帧 84 字节，其中最多约 18 字节过程数据（其余为 EtherCAT 开销）。帧在网络上**往返两次**（去 + 回）。

**例 1：1000 路开关量**

- 过程数据：1000/8 = 125 B
- 帧长：84 − 18 + 125 = 191 B = 1528 bit
- 刷新时间：(1528 / 100e6) × 2 ≈ **30.56 µs**

**例 2：100 个伺服（每轴 6 B：控制字 2 + 目标位置 4，或状态字 2 + 实际位置 4）**

- 过程数据：100 × 6 = 600 B
- 帧长：1266 B = 5328 bit
- 刷新时间：(5328 / 100e6) × 2 ≈ **106 µs**

官方"1000 DI / 100 轴"宣传值即源于此理想计算。实际还需加上分布时钟, WKC 等开销，以及从站硬件延时（100M 端口约 1 µs/站，EBus IO 约 0.3 µs/站）。

### 2.3 端口管理

ESC 最多 4 个端口；端口可关闭/切换，逻辑端口配置决定帧处理与转发顺序。

### 2.4 网络拓扑

逻辑上始终为**闭环**：Master 发出，依次经过所有从站再回到 Master. 支持线型, 菊花链, 树型, 星型, **冗余线缆**（单口环回，故障切换约 1 周期）。

### 2.5 协议栈概览

| 缩写 | 含义 |
|------|------|
| CoE | CANopen over EtherCAT |
| SoE | SERCOS over EtherCAT |
| EoE | Ethernet over EtherCAT |
| FoE | File Access over EtherCAT |
| AoE | ADS over EtherCAT |
| PDO | 过程数据对象（周期） |
| SDO | 服务数据对象（非周期） |
| ESM | EtherCAT State Machine |
| ESI | 从站 XML 描述 |
| ENI | 网络配置信息 |
| SM | Sync Manager 同步管理器 |
| FMMU | 现场总线内存管理单元 |
| DC | Distributed Clock 分布时钟 |

### 2.6 数据帧格式

EtherType = **0x88A4**。一帧可含多个**子报文**，每子报文对应一个从站操作。子报文字段要点：

- **地址区**：设备寻址 / 逻辑寻址
- **命令**：APRD, APWR, FPWR 等读写类型
- **WKC**（Working Counter）：成功处理的从站数，主站校验报文是否完整执行

### 2.7 寻址方式

| 方式 | 用途 |
|------|------|
| **位置寻址** | 启动扫描总线；Position 每过一从站减 1，为 0 时该站响应 |
| **节点寻址** | 运行期按 Configured Station Address / Alias 访问 |
| **逻辑寻址** | 过程数据交换；32 bit 逻辑地址经 FMMU 映射到从站物理 RAM |
| **广播** | 初始化, 读全体状态 |

**启动流程**：位置寻址分配节点地址 → 节点寻址配置寄存器/FMMU → 逻辑寻址做 PDO 交换。

**FMMU**：将从站物理地址段映射到主站逻辑过程映像，支持按位映射，减少通信量。

### 2.8 分布式时钟（DC）

选定参考从站，通过 DC 机制同步各站时钟，实现 IEEE1588 级同步，满足多轴插补同步。

### 2.9 应用层

**ESM 状态**：Init → Pre-Op（邮箱）→ Safe-Op（输入有效, 输出安全）→ Op（全功能）→ Bootstrap（FoE 固件更新）。

**邮箱**：SM0（主→从）, SM1（从→主），承载 CoE/SDO, FoE 等非周期服务。

**SII**：EEPROM 存 Vendor ID, Product Code, 配置等，ESC 上电读取。

**设备行规**：CoE（CiA402 驱动）, SoE（IEC 61491）, EoE（内嵌以太网）, FoE（固件下载）, AoE（ADS 路由）。

### 2.10 主站设计

单帧可承载最多约 1486 B 过程数据；多数网络每周期 1–2 帧即可服务全部从站。主站可在 **x86 + 标准 NIC** 上以软件实现，无需专用通信处理器。开源/商业主站：IgH EtherCAT Master, SOEM, TwinCAT 等。

### 2.11 从站设计

- **ESC + PHY**：简单 IO 可无 MCU，32 bit 数字 IO
- **MCU + ESC**：SPI/并行 DPRAM 连接，运行 CoE/FoE 协议栈
- **DPRAM + SM**：协调主站与本地 uC 访问，防冲突
- **FMMU**：仅用于周期过程数据地址翻译

PDO/SDO 经 ESC **硬件**处理，延时约 100–500 ns，与 MCU 响应解耦。

## 3. 从站实现要点

### 3.1 DPRAM 与 SyncManager

ESC 寄存器区 0x0000–0x0FFF（4 KB）；邮箱与过程数据在用户 DPRAM（1–60 KB，视芯片）。标准 SM 配置：

| SM | 方向 | 模式 |
|----|------|------|
| SM0 | 主→从 | 邮箱输出 |
| SM1 | 从→主 | 邮箱输入 |
| SM2 | 主→从 | 过程数据输出（3-buffer） |
| SM3 | 从→主 | 过程数据输入（3-buffer） |

3-buffer 模式物理内存约为过程数据长度的 **3 倍**。主站初始化时从 ESI 读取 SM 长度, 方向, 看门狗等。

### 3.2 FMMU

每个一致输入/输出块通常需 1 个 FMMU；可选 1 个映射邮箱状态标志，避免轮询。

### 3.3 DC, EEPROM, 应用控制器

- 需高精度同步时 ESC 须支持 DC
- EEPROM 经 I²C 连接，存 SII
- 8/16 bit MCU 经 PDI 访问 ESC；32 bit 纯数字 IO 可无 MCU
- 从站协议栈（如 Beckhoff SSC）约 70 KB 量级，含 ESM, CoE 对象字典等

### 3.4 应用层协议选择

| 协议 | 场景 |
|------|------|
| CoE + SDO-Info | 非周期配置, PDO 映射 |
| SoE | SERCOS 系驱动 |
| EoE | Web 服务器, 标准以太网端口 |
| FoE | 固件下载 |
| AoE | .NET / 网关子网访问 |

### 3.5 模块化设备描述（MDP）

基于 CoE 对象字典的二维索引结构，便于主站/组态工具处理模块化从站（多轴驱动, 网关, 总线耦合器等）。

## 4. 应用实例（PC + 运动控制器）

### 4.1 架构

PC（LinuxCNC + RTAI 实时补丁）为主站；ARM + ET1200 ESC 为从站运动控制器；EtherCAT 连接多轴伺服。

### 4.2 RTAI 实时 Linux

双内核法：RTAI 作为 Linux 底层实时扩展（ADEOS 管理中断优先级）。安装概要：打补丁 → 配置编译内核 → `make && make install` → 配置编译 RTAI → latency/preempt 测试。

### 4.3 IgH EtherCAT 主站

```bash
make ethercatMaster
make ethercatMasterinstall
sudo /etc/init.d/ethercat start
ethercat master
```

运行在内核态；用户态经应用接口访问。

### 4.4 LinuxCNC 集成

模块：EmcMot（运动）, EmcIO, EmcTask, GUI.**HAL**（硬件抽象层）用组件+引脚连接 EtherCAT 驱动与 LinuxCNC：每周期下发位置命令, 读编码器反馈。HAL 模块 `ec.ko` 完成主站初始化（PDO/SDO 映射）后进入周期任务。

UI：Python + PyQt，调用 LinuxCNC Python 接口。

### 4.5 ET1200 从站控制器

- 3 个端口：1×MII + 2×EBUS（LVDS 100 Mbit/s，最长 10 m）
- PDI：数字 IO 或 SPI 接 ARM
- 3.3 V 供电，外部 EEPROM 存 SII

### 4.6 从站软件流程

`main()` 初始化 GPIO/SPI/Timer/FSMC/ECAT → 读 AL Event → **同步模式**下在中断中处理周期 PDO，主循环处理邮箱与状态机；**自由运行模式**在主循环轮询 PDO.

## 5. 实验测试摘要

| 测试项 | 结论 |
|--------|------|
| Wireshark 抓包 | 帧类型 0x88A4，子报文 + WKC 与协议一致 |
| 单轴功能 | I/O, 回零, 点动正常 |
| 圆弧插补 | DXF→G 代码，80 mm 圆精度合格 |
| 四轴同步 | 长时间运行指针一致 |
| 30T 转塔冲床 | 非接触测振：调节约 130 ms，稳态误差 ±0.05 mm |

## 6. 工具

### 6.1 TwinCAT

Beckhoff 商业方案：PLC, NC, 可视化, CoE-Online, Process Data 监视。Windows 环境，实时性弱于 RTOS 方案，学习 EtherCAT 协议与一致性测试（ETG.7000/7010, ET9400）常用。

### 6.2 开源主站

| 项目 | 特点 |
|------|------|
| **SOEM** | 简单轻量 |
| **IgH EtherCAT Master** | 功能完整，Linux 常用 |

## 参考资料

<div class="kb-references">
<p>1. EtherCAT Technology Group — 技术概览</p>
<p>2. ETG 规范：ESI, ENI, CiA402 over EtherCAT</p>
<p>3. Beckhoff ET1100/ET1200 数据手册</p>
</div>
## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)

[[PLCopen-运动控制|PLCopen 运动控制]]

[[ReWorks-RTOS-概览|ReWorks RTOS 概览]]

[[ReWorks-自引导工程|ReWorks 自引导工程]]

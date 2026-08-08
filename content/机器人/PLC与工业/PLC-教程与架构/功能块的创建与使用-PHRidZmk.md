---
title: 功能块的创建与使用
url: https://my.feishu.cn/docx/PHRidZmkqoI9xTx9xG3cFPYwnHd
quality: raw
attachments:
- file: attachments/PHRidZmkqoI9xTx9xG3cFPYwnHd/file_001.docx
  title: file_001.docx
fetch_source: feishu:cli
fetched_at: '2026-06-27T20:01:11+00:00'
feishu_formatted_at: '2026-06-28T07:15:37+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# 什么是功能块

功能块是工业自动化中的标准化程序模块，相当于预制的"**智能积木**"。每个功能块封装特定功能（如定时, 计数, PID控制等），有明确的输入, 输出接口和内部处理逻辑。工程师只需像搭积木一样连接不同功能块，无需关心内部细节，即可快速构建控制系统。例如，一个"电机控制块"输入启动信号和转速，输出运行状态，内部自动处理启停, 调速等复杂逻辑。功能块具有可重用性，同一控制逻辑可重复调用，大幅提高编程效率和可靠性，是PLC/DCS编程的核心组件，广泛用于机械控制, 生产线自动化等领域。

# 功能块的使用

# 功能块的创建

## 功能块的三种工作模式

`kNormalMode`, `kSystemMode`, `kInitMode` 是功能块的三种运行模式，通常用于控制功能块在不同阶段的逻辑行为。

- `kInitMode`（初始化模式）

触发时机：系统启动或硬件重新配置时。核心任务：

硬件初始化：映射硬件地址, 验证设备ID. 资源分配：动态分配内存。默认值设置：初始化状态标志。特点：

仅运行一次，成功后切换到其他模式。若失败（如硬件ID不匹配），可能阻塞系统或报错。

---

- `kNormalMode`（正常运行模式）

触发时机：初始化成功后进入常态运行。核心任务：

实时数据处理：如读取编码器脉冲, 计算速度/位置。状态监控：检测溢出, 错误等。响应控制指令：如位置复位, 同步。特点：

周期性执行（如每1ms任务周期）。依赖初始化阶段配置的硬件地址。

---

- `kSystemMode`（系统模式）

触发时机：系统维护, 调试或特权操作时（如固件升级, 参数校准）。核心任务：

高级配置：修改硬件参数（如滤波器系数, 通信波特率）。诊断功能：读取原始寄存器数据, 触发自检流程。安全操作：强制复位硬件, 备份状态。特点：

非实时性：通常由工程师手动触发。高风险：误操作可能导致系统故障，需权限控制。

---

### 三者的关系与切换流程

![image](attachments/PHRidZmkqoI9xTx9xG3cFPYwnHd/img_001.png)

# 常用的功能块

## 计算功能块

## 编码器功能块

## 参考文档

- [file_001.docx](attachments/PHRidZmkqoI9xTx9xG3cFPYwnHd/file_001.docx)
## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[PLC-基础理论教程-BbIQdZZp|PLC 基础理论教程]]
[[EP1501_SmartPLC 技术架构-InO3dHmx|技术架构]]
[[OPC Unified Architecture  -GuiRdHfM|术语定义]]
[[机器人/PLC与工业/ViGET-许继与DPS/DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]] — _PLC / 工业_
[[HVDC-变压器放电故障诊断-H3ZLdpYX|HVDC 变压器放电故障诊断]] — _PLC / 工业_
[[Profinet-Driver-架构(UfY6)-UfY6dCEK|Profinet Driver 架构（UfY6）]] — _PLC / 工业_
[[SIMATIC-D7-FB-Gen-说明-ZTkwd4rd|SIMATIC D7 FB-Gen 说明]] — _PLC / 工业_

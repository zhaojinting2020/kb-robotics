---
title: plcopen 库结构
url: https://my.feishu.cn/docx/Xgc9dSPlto3cwsxLi3oc4waMnnc
quality: raw
attachments:
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_001.pdf
  title: file_001.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_002.pdf
  title: file_002.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_003.pdf
  title: file_003.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_004.pdf
  title: file_004.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_005.pdf
  title: file_005.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_006.pdf
  title: file_006.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_007.pdf
  title: file_007.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_008.pdf
  title: file_008.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_009.pdf
  title: file_009.pdf
- file: attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_010.pdf
  title: file_010.pdf
fetch_source: feishu:cli
fetched_at: '2026-06-27T20:07:17+00:00'
feishu_formatted_at: '2026-06-28T07:15:41+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# plcopen-master

plcopenmaster是一个开源的单轴运动控制库。整体的代码结构如下：

![image](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/img_001.png)
ExeclQueue是一个专门用来管理执行任务的队列。ExeclNode代表一个可执行的任务节点，包含了一个具体的执行逻辑。ExeclNodeContainer 同时包含 ExeclNode\* node 指针和 data 数组，可用于将节点的指针操作与实际数据存储分离。data 数组作为内存池，存储节点的实际数据；node 指针指向 data 数组中的具体对象 (container->node = constructor(container->data);). 这种设计可以更灵活地管理节点的生命周期，同时保持队列操作的高效性。

## motion/

包含运动控制相关的类和工具，如调度器（用以管理轴的运行周期），伺服电机，轴（包括轴的一些基本操作），运动规划相关的工具类等。

### motion/axis

的继承关系如下：

![image](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/img_003.png)
主要实现了轴状态（如 MC_AXISSTATUS_DISABLED , MC_AXISSTATUS_STANDSTILL 等）的管理功能，包括状态的获取, 设置, 合法性校验，以及与错误, 供电状态的联动更新。

#### AxisMotionBase/

作为轴运动的核心基础类，主要为具体的轴运动功能模块（如 AxisMove 移动控制, AxisHoming 回零控制等）提供执行队列的基础管理支持。AxisMotionBase 同时继承 LinkedNode 和 ExeclQueue 的设计是为了实现运动轴的双重角色能力 ：

- 作为链表节点（继承 LinkedNode）

 LinkNode 是基础链表节点类， AxisMotionBase 继承该类，用于将轴运动对象加入系统级的链表中（例如调度器维护的轴运动列表），便于统一管理, 遍历或调度。

- 作为执行队列（继承 ExeclQueue）

ExeclQueue 通常用于管理需要按顺序执行的任务节点。AxisMotionBase 继承 ExeclQueue 后，可直接管理轴的一系列运动指令（如移动, 回零等指令的排队与执行）。这种多继承设计使 AxisMotionBase 同时具备：

被管理能力 ：作为链表节点，可被系统统一调度；

任务执行能力 ：作为执行队列，可管理自身的运动任务序列。

![image](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/img_004.png)
作为执行队列中的通用节点类型，AxisExeclNode 承担着将具体操作（如移动, 回零等）的状态变化同步传递至轴对象与功能块（FunctionBlock）的桥梁作用，确保操作状态在执行队列, 轴实例与功能模块间的协同一致。

#### AxisMove/

MoveNode 是运动控制中的具体执行节点类，继承自 AxisExeclNode 和 ProfileNode（轨迹规划节点基类），核心职责是实现单个运动轨迹的规划与执行逻辑 ，主要体现为在 onExecuting 方法中调用 ProfilesPlanner 生成运动轨迹（从起始位置, 速度, 加速度到目标位置, 速度的平滑过渡），并实时更新轴的位置, 速度和加速度指令。

AxisMove 是轴运动控制的管理类，继承自 AxisMotionBase ，核心职责是管理运动任务的全生命周期 （添加, 验证, 调度），具体功能包括提供运动接口，支持不同运动模式；轨迹规划协作：通过内部 ProfilesPlanner 生成轨迹参数（如位移, 速度曲线），并由 MoveNode 执行具体的轨迹运行逻辑，实现运动指令的闭环控制。

#### AxisHoming/

同理

#### AxisMotion/

AxisMotion继承自AxisMove和AxisHoming 是轴运动控制的基础类，主要负责 坐标转换 ，将底层系统内部的原始位置数据（由 AxisBase 提供）转换为用户可见的工程坐标系位置值。

#### Axis/

Axis 是轴的基础管理类，继承自 AxisMotion，主要负责轴的基础属性管理，与调度器（Scheduler）的交互以及日志记录功能。

### fb/

定义了各种功能块。包括功能块的基类，符合PLCOpen标准的基础功能块（使能控制，执行控制，错误处理等）以及单轴功能块类。

### motion/utils

#### ProfilePlanner/

ProfilePlanner实现了一个运动轨迹规划器，主要用于生成符合运动学约束的轨迹分段。以下是其核心功能总结：

plan() ：

route_calculate() 负责根据运动参数（位移, 速度, 加速度）生成基础的加速/匀速/减速段数据，可能生成多个segment（如先加速, 再匀速, 最后减速）。

route_discretization() 将连续的轨迹段进一步离散化为时间步指令（基于系统频率），可能拆分为更多小segment.

tiny_segment_merge() 合并过短的segment，最终形成 data.segments 中的完整多segment列表，完成所有segment的轨迹规划。

route_calculate（）：

route_calculate 是 ProfilePlanner 轨迹规划器中的核心函数，主要负责根据输入的运动参数生成具体的**轨迹分段数据** （存储在 Segment\* segments 数组中）。以下是其核心功能总结：

速度方向调整：若总位移 shift 为负（需要反向移动），或位移为0但最终速度小于初始速度（需要减速），则反转目标速度 vel 的符号，确保运动方向与需求一致。预减速处理：若初始速度与目标位移方向相反（如当前向右运动但需要向左移动），先减速到0，避免直接反向导致的冲击。反向最终速度处理：若最终需要的速度与目标速度方向相反（如高速正方向运动后需要负方向低速），提前规划最后一段的反向加/减速段。超程检测与调整：若按初始参数计算的位移超过实际需要的位移（超程），通过运动学公式反推实际可达到的最终速度，确保位移符合需求。各段位移与时间计算：根据剩余位移，计算加速段, 匀速段（若有）, 减速段的具体参数，确保总位移匹配。生成轨迹段数组：通过 set_route_segment 宏填充 segments 数组，生成完整的轨迹分段数据（最多5段）。

execute() ：

按时间步长执行轨迹，更新当前位置, 速度和加速度。

#### ProfilesPlanner/

`ProfilesPlanner.cpp` 主要实现了一个轨迹规划器的封装类，来作为 ProfilePlanner 的轻量级封装。plan() 方法通过参数 ProfileNode\* 接收目标点信息（终点位置, 速度, 加速度等）, 实际调用 ProfilePlanner::plan 进行底层轨迹计算。

### Scheduler

scheduler是axis的调度器，通过保存一个axis头节点来保存一个axis链表。主要功能包括：

- 轴管理 ：采用链表结构管理多个运动轴（ Axis ）提供 newAxis() 创建新轴，支持指定伺服驱动( Servo\* )通过 axis() / axisListFirst() / axisListNext() 遍历轴对象
- 调度控制 ：runCycle() ：周期性执行所有轴的控制循环维护全局时钟 mTick 和基准频率 mFreq （默认1000Hz）
- 轴配置管理 ：setAxisConfig() ：批量设置轴的控制参数/度量参数/限位参数等setAxisHomePosition() ：设置轴的原点位置
- 资源管理 ：release() ：安全释放所有轴资源采用PImpl模式隐藏实现细节

### Servo

`Servo.cpp` 实现了一个伺服控制器的核心功能，主要特点包括：

- 核心控制接口 ：电源控制： setPower()运动参数设置： setPos() / setVel() / setTorque()状态读取： pos() / vel() / acc() / torque()故障处理： resetError()
- 运动控制逻辑 ：runCycle() ：根据系统频率计算实时速度/加速度，更新当前位置emergStop() ：紧急停止时立即冻结位置并清零速度/加速度

一个axis对应一个servo.AxisBase内有一个指向servo的指针。在newAxis时会new一个servo传递给指向servo的指针。

## Fb/

![image](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/img_005.png)
FbReadInfoAxisType 相比 FbEnableType 增加了状态反馈和轴控制相关的功能，像一个高级版的开关。其新增成员变量 mAxis\* 是轴设备引用指针。该类专门用于运动控制场景下的轴状态查询。

FbWriteInfoAxisType 相比 FbComExecuteType 主要增加了轴设备写入功能。增加了成员变量mAxis\*，并重写了 onExecTriggered() 方法。

FbExecAxisBufferContType 相比 FbSeqExecuteType 增加了以下功能：

- 轴控制功能 ：通过继承 FbExecAxisType 获得了 mAxis 成员变量，用于关联运动控制轴
- 缓冲模式配置 ：通过继承 FbBufferModeType 获得了 mBufferMode 成员变量，用于设置运动缓冲模式
- 连续执行支持 ：重写了 onOperationDone() 方法，实现了连续缓冲运动的特殊处理逻辑
- 多重继承组合 ：将轴控制( FbExecAxisType )和缓冲模式( FbBufferModeType )功能组合在一起

### FbSingleAxis

定义了一些符合PLCOpen标准的常用功能块

- 运动控制类 （蓝色部分）：

  - FbHome ：回原点功能
  - FbMoveAbsolute ：绝对位置运动
  - FbMoveVelocity ：速度控制运动
- 状态读取类 （绿色部分）：

  - FbReadStatus ：读取轴状态
  - FbReadMotionState ：读取运动状态
- 基础控制类 （橙色部分）：

  - FbPower ：电源控制
  - FbStop ：急停功能
  - FbHalt ：平滑停止

![image](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/img_007.png)
axis_homing.cpp 演示了如何使用PLCopen标准的 FbHome 功能块实现轴的回零操作，包括回零过程的启动, 状态监控, 错误处理以及回零完成后的逻辑控制。

## plcopen-motion-control-master

参考文献：

[file_001.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_001.pdf)

[file_002.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_002.pdf)

[file_003.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_003.pdf)

[file_004.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_004.pdf)

[file_005.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_005.pdf)

[file_006.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_006.pdf)

[file_007.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_007.pdf)

[file_008.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_008.pdf)

[file_009.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_009.pdf)

[file_010.pdf](attachments/Xgc9dSPlto3cwsxLi3oc4waMnnc/file_010.pdf)

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[Profinet-Driver-架构(UfY6)-UfY6dCEK|Profinet Driver 架构（UfY6）]]
[[机器人/PLC与工业/工业通信与协议/工业通信入门-RZVpdcXQ|工业通信入门]]
[[机器人/PLC与工业/ViGET-许继与DPS/DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]] — _PLC / 工业_
[[HVDC-变压器放电故障诊断-H3ZLdpYX|HVDC 变压器放电故障诊断]] — _PLC / 工业_
[[PLC-基础理论教程-BbIQdZZp|PLC 基础理论教程]] — _PLC / 工业_
[[SIMATIC-D7-FB-Gen-说明-ZTkwd4rd|SIMATIC D7 FB-Gen 说明]] — _PLC / 工业_
[[ViGET-Turbo-测试报告-YvCvdNRS|ViGET Turbo 测试报告]] — _PLC / 工业_

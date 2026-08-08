---
title: Apollo 预测模块结构
url: https://blog.csdn.net/qq_41324346/article/details/118294816
curated_at: '2026-06-28T20:00:00+00:00'
---

# Apollo 预测模块结构

阅读 Apollo 预测（Prediction）源码时，container, scenario, evaluator, predictor 等子模块较多，容易不知从何入手。本文只梳理**代码结构**，不涉及具体算法细节。

## 模块职责

预测模块的任务是预测感知模块检测到的**障碍物未来行为**。

| 方向 | 内容 |
|------|------|
| **输入** | 障碍物信息（位置, 速度, 加速度, 方位角）, 本车规划轨迹, 本车定位 |
| **输出** | 障碍物预测轨迹及其概率 |

## 四个核心子模块

1. **Container** — 存储输入数据
   - `PoseContainer`：本车定位
   - `ADCTrajectoryContainer`：本车已规划轨迹
   - `ObstacleContainer`：障碍物信息

2. **Scenario** — 分析本车所处场景

3. **Evaluator** — 预测障碍物的路径与速度，并给出概率

4. **Predictor** — 生成障碍物的预测轨迹

## 说明

CSDN 原文在"调用这些模块"处以 VIP 截断；完整版还涉及 `prediction_component.cc`, `message_process.cc`, `scenario_manager.cc`, `evaluator_manager.cc`, `predictor_manager.cc` 等源文件中的调用流程（见原文摘要）。如需算法与工程细节，可对照 Apollo 源码 `modules/prediction/` 目录阅读。

## 参考

- [Apollo 预测模块代码结构解析（CSDN）](https://blog.csdn.net/qq_41324346/article/details/118294816)

---
title: A* 路径搜索
concept_id: astar-family
compiled_at: '2026-06-27T19:57:21+00:00'
source_count: 5
polished_at: '2026-06-27T20:26:50+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# A* 路径搜索

A* 在加权图/栅格上用 **f(n)=g(n)+h(n)** 搜索最短路径：g 为起点到 n 的实际代价，h 为 n 到目标的启发式估计。当 **h 可采纳（不高估）** 时，A* 保证最优；open/closed 集合的正确维护是工程实现的关键。

## 要点
- **openset 澄清**：第一轮从 open 取出的 start 会扩展邻居后移入 closed；并非"start 不在 open"
- **可见图 / 切线法**：对圆形障碍可先构切线可见图再 A*（成员笔记"圆形障碍 A* 路径"）
- **实现**：Python/C++ 参考 redblobgames 与 daancode 实现
## 与 Dijkstra
h≡0 时 A* 退化为 Dijkstra；好的 h 显著减少扩展节点数。

## Sources
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]] — https://github.com/daancode/a-star/blob/master/source/AStar.cpp
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]] — https://www.redblobgames.com/pathfinding/a-star/implementation.html#python-astar
[[A-算法-openset-澄清|A* 算法 openset 澄清]] — https://stackoverflow.com/questions/13578287/a-a-star-algorithm-clarification
[[Apollo-Cyber-RT-介绍|Apollo Cyber RT 介绍]] — https://developer.apollo.auto/Apollo-Homepage-Document/Apollo_Doc_CN_6_0/%E4%B8%8A%E6%9C%BA%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B/%E5%AE%9E%E6%97%B6%E9%80%9A%E4%BF%A1%E6%A1%86%E6%9E%B6CyberRT%E7%9A%84%E4%BD%BF%E7%94%A8/CyberRT%E4%BB%8B%E7%BB%8D/
[[圆形障碍-A-路径(切线可见图)|圆形障碍 A* 路径（切线可见图）]] — https://redblobgames.github.io/circular-obstacle-pathfinding/

## 相关笔记
[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[Bezier-曲线规划|Bézier 曲线规划]]
[[Dubins-路径规划|Dubins 路径]]
[[RRT-算法族|RRT 算法族]]
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]] — _路径 / 运动规划_
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]] — _路径 / 运动规划_
[[A-算法-openset-澄清|A* 算法 openset 澄清]] — _路径 / 运动规划_
[[Apollo-3.0-编译运行|Apollo 3.0 编译运行]] — _路径 / 运动规划_
[[Apollo-5.0-行为预测|Apollo 5.0 行为预测]] — _路径 / 运动规划_

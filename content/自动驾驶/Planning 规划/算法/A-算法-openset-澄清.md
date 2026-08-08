---
title: A* 算法 openset 澄清
url: https://stackoverflow.com/questions/13578287/a-a-star-algorithm-clarification
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

> 概念页：[[AStar-路径搜索|A* 路径搜索]]

# A* 算法 openset 澄清

问题摘要实现者误以为第一轮 `current` 不在 openset；实际流程是：初始 `{start}` → 取 start → 扩展邻居入 open → start 入 closed → 循环。

A* 核心伪代码text function A*(start, goal)     openSet := {start}     closedSet := {}     gScore[start] := 0     fScore[start] := gScore[start] + h(start, goal)     while openSet not empty         current := openSet 中 fScore 最小节点        if current = goal
            return reconstruct_path(cameFrom, goal)         remove current from openSet         add current to closedSet         for each neighbor of current             if neighbor in closedSet: continue             tentative_g := gScore[current] + dist(current, neighbor)             if neighbor not in openSet or tentative_g < gScore[neighbor]                 cameFrom[neighbor] := current                 gScore[neighbor] := tentative_g                 fScore[neighbor] := tentative_g + h(neighbor, goal)                 if neighbor not in openSet                     add neighbor to openSet
    return failure结论按标准 A* 流程实现即可；若仍报错，检查 openSet 数据结构是否支持"按 f 取最小"及 neighbor 扩展逻辑。

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]]
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]]
[[Apollo-Cyber-RT-介绍|Apollo Cyber RT 介绍]]
[[RRT-快速随机树|RRT 快速随机树]]
[[RRT-路径剪枝|RRT 路径剪枝]]
[[RRT-路径规划课程作业|RRT 路径规划课程作业]]
[[圆形障碍-A-路径(切线可见图)|圆形障碍 A* 路径（切线可见图）]]
[[AStar-路径搜索|A* 路径搜索]] — _路径 / 运动规划_

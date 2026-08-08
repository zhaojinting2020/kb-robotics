---
title: Dubins 路径
concept_id: dubins-family
compiled_at: '2026-06-27T19:57:21+00:00'
source_count: 2
polished_at: '2026-06-27T20:26:50+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Dubins 路径

Dubins 路径是 **平面非完整机器人**（只能前进, 转向半径受限）的最短路径，由 **圆弧–直线–圆弧（LSL, RSR, LSR, RSL, RLR, LRL）** 六种类型之一组成。

## 要点
- **曲率约束**：最小转弯半径 R → 最大曲率 κ=1/R
- **解析解**：对给定起终点位姿可解析求最短 Dubins 类型与参数
- **应用**：停车, 低速 AGV, 路径粗解；高速或复杂障碍需与 A*/RRT 结合
## 扩展
Reeds-Shepp 允许倒车；Frenet 框架下常沿参考线用 Dubins 做横向–纵向解耦。

## Sources
[[Dubins-曲线简介|Dubins 曲线简介]] — https://blog.csdn.net/qq_16775293/article/details/79709788
[[Dubins-路径|Dubins 路径]] — https://zhuanlan.zhihu.com/p/120272035

## 相关笔记
[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[AStar-路径搜索|A* 路径搜索]]
[[Bezier-曲线规划|Bézier 曲线规划]]
[[RRT-算法族|RRT 算法族]]
[[Dubins-路径|Dubins 路径]] — _路径 / 运动规划_
[[Dubins-曲线简介|Dubins 曲线简介]] — _路径 / 运动规划_
[[圆形障碍-A-路径(切线可见图)|圆形障碍 A* 路径（切线可见图）]] — _路径 / 运动规划_
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]] — _路径 / 运动规划_
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]] — _路径 / 运动规划_

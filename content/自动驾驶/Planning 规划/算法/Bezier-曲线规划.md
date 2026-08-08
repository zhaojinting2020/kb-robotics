---
title: Bézier 曲线规划
concept_id: bezier-family
compiled_at: '2026-06-27T19:57:21+00:00'
source_count: 4
polished_at: '2026-06-27T20:26:50+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Bézier 曲线规划

Bézier 曲线用控制点定义平滑路径，常用于 **路径平滑** 与 **曲率连续** 的轨迹段。有理 Bézier（NURBS 特例）可精确表示圆锥曲线；动画演示有助于理解 de Casteljau 递推。

## 要点
- **三次 Bézier**：4 个控制点，端点插值, 中间点拉拽形状
- **路径规划用法**：满足起终点位姿的段之间用 Bézier 连接，再检查曲率/障碍
- **B 样条 / NURBS**：多段拼接时更容易控制连续性
## 与 Dubins / Reeds-Shepp
Bézier 不自带非完整约束；车辆常先用 Dubins 得粗路径，再用 Bézier 平滑。

## Sources
[[贝塞尔曲线路径规划|贝塞尔曲线路径规划]] — https://zhuanlan.zhihu.com/p/136647181
[[Bézier-曲线动画演示|Bézier 曲线动画演示]] — https://www.jasondavies.com/animated-bezier/
[[有理-Bézier-曲线|有理 Bézier 曲线]] — https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/NURBS/RB.html
[[贝塞尔曲线理解|贝塞尔曲线理解]] — https://www.zhihu.com/question/29565629

## 相关笔记
[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[AStar-路径搜索|A* 路径搜索]]
[[Dubins-路径规划|Dubins 路径]]
[[RRT-算法族|RRT 算法族]]
[[Bézier-曲线动画演示|Bézier 曲线动画演示]] — _路径 / 运动规划_
[[有理-Bézier-曲线|有理 Bézier 曲线]] — _路径 / 运动规划_
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]] — _路径 / 运动规划_
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]] — _路径 / 运动规划_
[[A-算法-openset-澄清|A* 算法 openset 澄清]] — _路径 / 运动规划_

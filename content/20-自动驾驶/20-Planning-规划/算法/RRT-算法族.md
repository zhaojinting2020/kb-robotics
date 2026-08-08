---
title: RRT 算法族
concept_id: rrt-family
compiled_at: '2026-06-27T19:57:21+00:00'
source_count: 3
polished_at: '2026-06-27T20:26:50+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# RRT 算法族

RRT（Rapidly-exploring Random Tree）通过随机采样扩展树结构，在高维非凸配置空间中快速探索可行路径。Basic RRT 以起点为根反复随机扩展；**RRT-Connect** 从起点与终点双向生长，通常更快收敛；**RRT*** 在渐近最优意义下继续优化路径代价。

## 要点
- **采样**：在自由空间随机取点，向最近树节点扩展一步（步长/分辨率受限）
- **碰撞检测**：每步扩展需验证边与障碍无交
- **剪枝**：后处理可删除冗余节点, 缩短路径（见成员笔记"RRT 路径剪枝"）
- **与 PRM 对比**：RRT 不区分学习/查询阶段，实现在线规划更直接
## 典型流程
1. 初始化树（根 = 起点）
2. 循环：随机采样 → 找最近节点 → steer → 碰撞检测 → 加入树
3. 若新节点进入目标区域（或 RRT-Connect 两树相遇）→ 回溯得路径
## Sources
[[RRT-快速随机树|RRT 快速随机树]] — https://vslam.net/2021/03/28/route_planning/%E8%B7%AF%E5%BE%84%E8%A7%84%E5%88%92%EF%BC%88%E5%85%AB%EF%BC%89-RRT%E7%AE%97%E6%B3%95/
[[RRT-路径剪枝|RRT 路径剪枝]] — https://blog.csdn.net/songyunli1111/article/details/81227333
[[RRT-路径规划课程作业|RRT 路径规划课程作业]] — https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/index.html

## 相关笔记
[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[AStar-路径搜索|A* 路径搜索]]
[[Bezier-曲线规划|Bézier 曲线规划]]
[[Dubins-路径规划|Dubins 路径]]
[[RRT-快速随机树|RRT 快速随机树]] — _路径 / 运动规划_
[[RRT-路径剪枝|RRT 路径剪枝]] — _路径 / 运动规划_
[[RRT-路径规划课程作业|RRT 路径规划课程作业]] — _路径 / 运动规划_
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]] — _路径 / 运动规划_
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]] — _路径 / 运动规划_

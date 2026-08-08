---
title: A* 算法 Python/C++ 实现
url: https://www.redblobgames.com/pathfinding/a-star/implementation.html#python-astar
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

> 概念页：[[AStar-路径搜索|A* 路径搜索]]

# A* 算法 Python/C++ 实现

Python A* python def a_star_search(graph, start, goal):
    frontier = PriorityQueue()     frontier.put(start, 0)     came_from = {start: None}     cost_so_far = {start: 0}     while not frontier.empty():
        current = frontier.get()         if current == goal:
            break         for nxt in graph.neighbors(current):
            new_cost = cost_so_far[current] + graph.cost(current, nxt)             if nxt not in cost_so_far or new_cost < cost_so_far[nxt]:
                cost_so_far[nxt] = new_cost                 priority = new_cost + heuristic(nxt, goal)                 frontier.put(nxt, priority)                 came_from[nxt] = current
    return came_from, cost_so_far def heuristic(a, b):
    return abs(a[0]-b[0]) + abs(a[1]-b[1])路径重建python def reconstruct_path(came_from, start, goal):
    if goal not in came_from:
        return []     cur, path = goal, []     while cur != start:
        path.append(cur)         cur = came_from[cur]     path.append(start)     path.reverse()
    return path

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]]
[[A-算法-openset-澄清|A* 算法 openset 澄清]]
[[Apollo-Cyber-RT-介绍|Apollo Cyber RT 介绍]]
[[RRT-快速随机树|RRT 快速随机树]]
[[RRT-路径剪枝|RRT 路径剪枝]]
[[RRT-路径规划课程作业|RRT 路径规划课程作业]]
[[圆形障碍-A-路径(切线可见图)|圆形障碍 A* 路径（切线可见图）]]
[[AStar-路径搜索|A* 路径搜索]] — _路径 / 运动规划_

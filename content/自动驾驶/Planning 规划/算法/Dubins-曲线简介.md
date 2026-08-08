---
title: Dubins 曲线简介
url: https://blog.csdn.net/qq_16775293/article/details/79709788
curated_at: '2026-06-28T20:00:00+00:00'
---

# Dubins 曲线简介

**Dubins 曲线**是在满足曲率约束, 且始末切线方向给定的条件下，连接二维平面（X–Y）两点的**最短路径**，并假设车辆**只能向前**行驶。若允许倒车，对应路径为 **Reeds–Shepp 曲线**。

1957 年 Lester Eli Dubins (1920–2010) 证明：最短路径由**最大曲率圆弧**与**直线段**组成。后由 [Pontryagin 最大值原理](https://en.wikipedia.org/wiki/Pontryagin%27s_maximum_principle) 给出同样结论。

> 例：A 为目标点，B 为起点，A, B 处切线均竖直向上，则从 B 到 A 的最短路径为一段 Dubins 曲线（原文图示为紫色路径）。

Dubins 曲线常用于机器人与控制理论，为轮式机器人, 飞机, 水下航行器等规划路径。

## 运动学模型

轮式机器人常用 Dubins 车模型：

\[
\dot{x} = V \cos\theta, \quad \dot{y} = V \sin\theta, \quad \dot{\theta} = u
\]

其中 \((x, y)\) 为位置，\(\theta\) 为航向，\(V\) 为恒定速度，\(u\) 为有界转向率。最大转向率对应最小转弯半径（等价于最大曲率 \(\kappa\)）。给定起终点位姿与切线方向，Dubins 路径给出**可执行的最短连接曲线**。

## 六种最优路径类型

最优路径由 **右转 R**, **左转 L**, **直线 S** 三段组合，必为以下六种之一：**RSR, RSL, LSR, LSL, RLR, LRL**。例如类型 **RSR**：右转弧 → 直线 → 右转弧；沿各段移动相应弧长/长度即得最短曲线，两端切线满足约束且曲率不超过上限。典型示意（类型名即段序列）：

- **RSL** Dubins 路径
- **RSR** Dubins 路径
- **LRL** Dubins 路径

## Dubins 间隔问题

**Dubins 间隔问题**是 Dubins 路径的关键变体：起终点处的航向不再固定为单一值，而是给定**航向区间**；路径在端点处的切线方向须落在对应区间内。

## Matlab 代码

作者提供的 [Matlab 实现](https://download.csdn.net/download/qq_16775293/10310831) 可直接运行。

## 参考

- [Dubins path（Wikipedia）](https://en.wikipedia.org/wiki/Dubins_path)
- 原文：[Dubins 曲线简介（CSDN）](https://blog.csdn.net/qq_16775293/article/details/79709788)

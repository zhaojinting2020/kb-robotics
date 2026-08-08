---
title: Bézier 曲线动画演示
url: https://www.jasondavies.com/animated-bezier/
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:11:42+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

> 概念页：[[Bezier-曲线规划|Bézier 曲线规划]]

# Bézier 曲线动画演示

Play with the control points to modify the curves!

These animations illustrate how a parametric [Bézier curve](http://en.wikipedia.org/wiki/Bezier_Curve) is constructed. The parameter _t_ ranges from 0 to 1. In the simplest case, a first-order Bézier curve, the curve is a straight line between the control points.

For a second-order (quadratic) Bézier curve, first we find two intermediate points that are _t_ along the lines between the three control points. Then we perform the same interpolation step again and find another point that is _t_ along the line between those two intermediate points. Plotting this last point yields a quadratic Bézier curve. The same steps can be repeated for higher orders.

Inspired by a [similar animation on Wikipedia](http://en.wikipedia.org/wiki/Bezier_Curve#Constructing_B.C3.A9zier_curves). Thanks to [Mike Bostock](https://bost.ocks.org/mike/) for the suggestion, and for citing me in his [D3 paper](http://vis.stanford.edu/files/2011-D3-InfoVis.pdf)!

Want to know more about Bézier curves? I highly recommend Mike Kamermans’ interactive online book, [A Primer on Bézier Curves](https://pomax.github.io/bezierinfo/).
© [Jason Davies](https://www.jasondavies.com/) 2010

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[有理-Bézier-曲线|有理 Bézier 曲线]]
[[Powell-无导数优化|Powell 无导数优化]]
[[Bezier-曲线规划|Bézier 曲线规划]] — _路径 / 运动规划_
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]] — _路径 / 运动规划_
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]] — _路径 / 运动规划_
[[A-算法-openset-澄清|A* 算法 openset 澄清]] — _路径 / 运动规划_
[[AStar-路径搜索|A* 路径搜索]] — _路径 / 运动规划_
[[Apollo-3.0-编译运行|Apollo 3.0 编译运行]] — _路径 / 运动规划_

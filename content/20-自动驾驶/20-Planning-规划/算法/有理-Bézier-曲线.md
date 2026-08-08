---
title: 有理 Bézier 曲线
url: https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/NURBS/RB.html
fetch_source: agent_reach:agent_reach:jina
fetched_at: '2026-06-27T16:59:02+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

> 概念页：[[Bezier-曲线规划|Bézier 曲线规划]]

# 有理 Bézier 曲线

![Image 1](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/GrLine.gif)

<p class="kb-image-caption">图例</p>

We have learned that projecting a 4-dimensional B-spline curve to hyperplane _w_=1 yields a 3-dimensional NURBS curve. What if this B-spline curve is a Bézier curve? The result is a **Rational Bézier** curve! The left image below shows a rational Bézier curve of degree 4, and the right one shows the relationship between a 3-dimensional Bézier curve of degree 4 (in red) and its projection rational Bézier curve (in blue) in hyperplane _w_=1.

What is the curve defined by a set of _n_+1 control points **P**0, **P**1, ..., **P**_n_, each of which is associated with a non-negative weight _w_ _i_ (_i.e._, **P**i has weight _w_ _i_>= 0), and knots 0 (multiplicity _n_+1) and 1 (multiplicity _n_+1)? Since the 4-dimensional B-spline curve defined by the lifted control points **P**_w_ _i_ (0 <= _i_<= _n_) reduces to a Bézier curve of degree _n_, its basis functions are _B_ _n_,0(_u_), _B_ _n_,1(_u_), ..., _B_ _n_,_n_(_u_). Projecting this Bézier curve to hyperplane _w_ = 1, we have the following:
![Image 2](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/NURBS/RB-eqn-1.jpg)

<p class="kb-image-caption">图例</p>
![Image 3](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/NURBS/RB-rip.jpg)

<p class="kb-image-caption">图例</p>

This is a special case of NURBS curves and is referred to as a _rational Bézier_ curve. Since a rational Bézier curve is a special case of NURBS curves, rational Bézier curves satisfy all important properties that NURBS curves have. This is similar to the fact that Bézier curves have all the important properties of B-spline curves. However, since there is no internal knots, rational Bézier curves do not have the local modification property, which means modifying a control point or its weight will cause a global change. Moreover, the curve is now contained in the convex hull defined by the whole set of control points, and modifying the weight of a control point will push or pull the curve away from or toward the control point. Of course, rational Bézier curves are projective invariant rather than affine invariant! See [**NURBS: Important Properties**](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/NURBS/NURBS-property.html) for more details.

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[Bézier-曲线动画演示|Bézier 曲线动画演示]]
[[Powell-无导数优化|Powell 无导数优化]]
[[Bezier-曲线规划|Bézier 曲线规划]] — _路径 / 运动规划_
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]] — _路径 / 运动规划_
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]] — _路径 / 运动规划_
[[A-算法-openset-澄清|A* 算法 openset 澄清]] — _路径 / 运动规划_
[[AStar-路径搜索|A* 路径搜索]] — _路径 / 运动规划_
[[Apollo-3.0-编译运行|Apollo 3.0 编译运行]] — _路径 / 运动规划_

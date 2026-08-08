---
title: 机械臂轨迹规划
url: https://my.feishu.cn/docx/LVG3dyAFBoFTXPx788yc8oYbned
quality: raw
fetch_source: feishu:cli
fetched_at: '2026-06-28T05:05:33+00:00'
feishu_formatted_at: '2026-06-28T05:05:33+00:00'
urls_repaired_at: '2026-06-28T05:05:33+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
sheets_expanded_at: '2026-06-29T10:25:37+00:00'
---

# 轨迹规划

## 什么是轨迹规划？

轨迹规划不同于路径规划，其是发生在机器人的运行过程中关节角度的变换，涉及速度，加速度等运动参数，以及机器人末端执行器的运行轨迹的规划。需要通过运动学将关节空间角度和笛卡尔空间位姿进行相互的变换。一个理想的轨迹，他的位置，速度都是连续的。轨迹规划分为在关节空间（Joint Space）下的轨迹规划以及在笛卡尔空间（Cartesian Space）下的轨迹规划。

Joint Space下的轨迹规划

- 定义{T}相对{G}的initial point，via points 和 final point.
- 通过inverse kinematic将手臂末端的状态转换到joint的状态
- 在joint空间smooth trajectory
- 将平滑过的轨迹通过forward kinematics转换成手臂末端的状态，同时检查末端在cartesian space的轨迹可行性。需要计算少量的inverse kinematic和大量的forward kinematics.

Cartesian Space下的轨迹规划

- 定义{T}相对{G}的initial point，via points 和 final point.
- 直接在cartesian space规划末端点的轨迹
- 将规划好的轨迹通过inverse kinematic转换到joint space
- 在joint space下检查轨迹的可行性

在Cartesian下直接规划轨迹更有意义，但是会计算大量的inverse kinematic.

## 基本规划算法

### 笛卡尔空间直线插补

$$x_{C_{i}} = x_{A} + \frac{(x_{B} - x_{A})}{N+1} ×i\\y_{C_{i}} = y_{A} + \frac{(y_{B} - y_{A})}{N+1} ×i\\z_{C_{i}} = z_{A} + \frac{(z_{B} - z_{A})}{N+1} ×i$$

### 笛卡尔空间圆弧插补

已知空间三点

$$A = \begin{bmatrix}x_{A}\\y_{A} \\z_{A}\end{bmatrix}B = \begin{bmatrix}x_{B}\\y_{B} \\z_{B}\end{bmatrix}C = \begin{bmatrix}x_{C}\\y_{C} \\z_{C}\end{bmatrix}$$

假设圆心坐标为

$$O = \begin{bmatrix}x_{O}\\y_{O} \\z_{O}\end{bmatrix}$$

根据三点到圆心的距离相等，可以得到圆心坐标和半径

![image](attachments/LVG3dyAFBoFTXPx788yc8oYbned/img_001.png)

<p class="kb-image-caption">图例</p>

传统的运动控制系统中仅实现基本的直线圆弧插补，这样拟合的效果在现今对插补算法速度和精度越来越高的环境下难以满足复杂工艺。所以在机器人复杂轨迹规划方面基于参数曲线插补技术可以很好的满足工业要求。

B样条曲线，贝塞尔曲线, NURBS曲线之间的关系如图所示：

![image](attachments/LVG3dyAFBoFTXPx788yc8oYbned/img_006.png)

<p class="kb-image-caption">图例</p>

其中$B_{i, n}(t) = \binom{n}{i} t^i (1-t)^{n-i} = (1-t)B_{i, n-1}(t) + tB_{i-1, n-1}(t)$

B样条曲线则是将控制点分组，每几个控制点合并为一个“群组”，在“群组”内采用自定义阶数 k 的基函数的组合来拟合曲线。

![image](attachments/LVG3dyAFBoFTXPx788yc8oYbned/img_007.png)

<p class="kb-image-caption">图例</p>

假设我们有一系列待生成轨迹的joint space中的点，其中一段的时间为$[t_i, t_{i+1}]$。已知$\theta(t_i), \dot{\theta}(t_i), \theta(t_{i+1}), \dot{\theta}(t_{i+1})$四个条件，可以用三次多项式来拟合这一时间段内的轨迹。令

$\tilde{t} = t - t_i$, $\theta(\tilde{t}) = a_0 + a_1\tilde t + a_2 {\tilde t} ^2 + a_3 {\tilde t}^3$

则

$$\theta(\tilde{t}=0) = \theta_i = a_0$$

$$\theta(\tilde{t}=\Delta t) = \theta_(i+1) = a_0 + a_1\Delta t + a_2 {\Delta t} ^2 + a_3 {\Delta t}^3$$

$$\dot\theta(\tilde{t}=0) = \dot\theta_i = a_1$$

$$\dot\theta(\tilde{t}=\Delta t) = \dot\theta_{i+1} = a_1 + 2a_2\Delta t + 3a_3\Delta t^2$$

联立可求得$a_0, a_1, a_2 , a_3 $

## 有障碍物的规划算法

#### Search based planning

Best-First & Dijkstra

![BF](attachments/LVG3dyAFBoFTXPx788yc8oYbned/img_008.gif)

<p class="kb-image-caption">图例</p>

<table><colgroup><col/><col/><col/></colgroup><tbody><tr><td></td><td>Pro</td><td>Con</td></tr><tr><td><b>Search-based Path Planning Algorithms</b></td><td><ul><li><b>Optimality</b>: Algorithms like A* ensure an optimal path if the heuristic is admissible.</li><li><b>Completeness</b>: They will find a solution if one exists in the discretized space.</li><li><b>Suitable for structured environments</b>: Effective in grid-like or low-dimensional spaces.</li></ul></td><td><ul><li><b>Curse of dimensionality</b>: Struggle with high-dimensional spaces due to exponential computational growth.</li><li><b>Slower in dynamic environments</b>: Replanning from scratch with new obstacles is time-consuming.</li><li><b>Heuristic dependency</b>: Poor heuristics lead to inefficient pathfinding.</li></ul></td></tr><tr><td><b>Sampling-based Path Planning Algorithms</b></td><td><ul><li><b>Efficient in high dimensions</b>: RRT and its variants handle continuous and high-dimensional spaces well.</li><li><b>Effective in dynamic environments</b>: Adapt quickly to environmental changes.</li><li><b>Versatility</b>: Perform consistently across different planning scenarios without adjustments.</li></ul></td><td><ul><li><b>Suboptimal paths</b>: Paths may be longer or less smooth than search-based counterparts.</li><li><b>Failure in narrow passages</b>: Random sampling can miss constrained spaces.</li><li><b>Memory consumption</b>: Large sampling can tax memory in resource-limited systems.</li></ul></td></tr></tbody></table>

尽管早期的运动规划算法在理论上具有完备性，但它们难以实现且计算上不可行，因此，研究者们开始关注具有较弱完备性保证的方法，特别是基于采样的方法。综上所述，Sampling-based 路径规划算法更适用于多轴机械臂的运动规划任务。

#### OMPL

OMPL(The Open Motion Planning Library)是一个基于采样方法的开源机器人运动规划库（基于C++），其内的算法大多是基于RRT和RPM衍生出来的，如RRTStar, RRT-Connect等等。现有的运动规划库有很多，如STOMP, SBPL, CHMOP等等。其中，OMPL由于其模块化的设计, 前端GUI的支持, 稳定的更新，已经成为目前最主流的运动规划软件（ROS默认使用OMPL）。**OMPL** 提供了一个简单的图形用户界面（GUI）, 多个教程, 演示和编程作业，以教授学生基于采样的运动规划。

##### CHOMP（Covariant Hamilton Optimization Motion Planning）

##### [STOMP](https://zhida.zhihu.com/search?content_id=196854912&content_type=Article&match_order=1&q=STOMP&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NDAyMDk2NTksInEiOiJTVE9NUCIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjE5Njg1NDkxMiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.7EPP8k3MX9Tw0X1uQQnQqebGCXHZK2oaB78K1UWJh5M&zhida_source=entity) (Stochastc Trajectory Optimization Motion Planning)

## 运动轨迹控制

MPC

WBC

基于浮动基的动力学

## 参考文献

<div class="kb-references">
- [https://zh.wikipedia.org/wiki/%E8%A1%8C%E5%88%97%E5%BC%8F](https://zh.wikipedia.org/wiki/%E8%A1%8C%E5%88%97%E5%BC%8F)

- [https://zhuanlan.zhihu.com/p/686518292](https://zhuanlan.zhihu.com/p/686518292)

- [https://zhuanlan.zhihu.com/p/344934774](https://zhuanlan.zhihu.com/p/344934774)

- [https://zhuanlan.zhihu.com/p/686518292](https://zhuanlan.zhihu.com/p/686518292)

- [为什么要使用样条曲线？\_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1dP411r7Ve?spm_id_from=333.788.player.player_end_recommend&vd_source=c8041efd376e7f34e73272f6ae86b7a5)

- [https://zhuanlan.zhihu.com/p/445466952](https://zhuanlan.zhihu.com/p/445466952)
</div>

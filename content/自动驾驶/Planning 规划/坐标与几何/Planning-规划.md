---
title: Planning 规划
sources:
- title: A* 算法 openset 澄清
  url: https://stackoverflow.com/questions/13578287/a-a-star-algorithm-clarification
- title: A* C++ 实现（daancode）
  url: https://github.com/daancode/a-star/blob/master/source/AStar.cpp
- title: Bézier 曲线动画演示
  url: https://www.jasondavies.com/animated-bezier/
- title: Apollo Cyber RT 介绍
  url: https://developer.apollo.auto/Apollo-Homepage-Document/Apollo_Doc_CN_6_0/%E4%B8%8A%E6%9C%BA%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B/%E5%AE%9E%E6%97%B6%E9%80%9A%E4%BF%A1%E6%A1%86%E6%9E%B6CyberRT%E7%9A%84%E4%BD%BF%E7%94%A8/CyberRT%E4%BB%8B%E7%BB%8D/
- title: RRT 路径规划课程作业
  url: https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/index.html
- title: 圆形障碍 A* 路径（切线可见图）
  url: https://redblobgames.github.io/circular-obstacle-pathfinding/
- title: A* 算法 Python/C++ 实现
  url: https://www.redblobgames.com/pathfinding/a-star/implementation.html#python-astar
- title: Powell 无导数优化
  url: https://blog.csdn.net/shenziheng1/article/details/51028074
- title: 有理 Bézier 曲线
  url: https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/NURBS/RB.html
- title: RRT 路径剪枝
  url: https://blog.csdn.net/songyunli1111/article/details/81227333
- title: RRT 快速随机树
  url: https://vslam.net/2021/03/28/route_planning/%E8%B7%AF%E5%BE%84%E8%A7%84%E5%88%92%EF%BC%88%E5%85%AB%EF%BC%89-RRT%E7%AE%97%E6%B3%95/
- title: 坐标旋转与变换
  url: https://www.cnblogs.com/fangsmile/p/8622421.html
- title: 贝塞尔曲线路径规划
  url: https://zhuanlan.zhihu.com/p/136647181
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Planning 规划

Planning 规划

## 1. A* 算法 openset 澄清
### 1.1 内容
问题摘要实现者误以为第一轮 `current` 不在 openset；实际流程是：初始 `{start}` → 取 start → 扩展邻居入 open → start 入 closed → 循环。

A* 核心伪代码text function A*(start, goal)     openSet := {start}     closedSet := {}     gScore[start] := 0     fScore[start] := gScore[start] + h(start, goal)     while openSet not empty         current := openSet 中 fScore 最小节点        if current = goal
            return reconstruct_path(cameFrom, goal)         remove current from openSet         add current to closedSet         for each neighbor of current             if neighbor in closedSet: continue             tentative_g := gScore[current] + dist(current, neighbor)             if neighbor not in openSet or tentative_g < gScore[neighbor]                 cameFrom[neighbor] := current                 gScore[neighbor] := tentative_g                 fScore[neighbor] := tentative_g + h(neighbor, goal)                 if neighbor not in openSet                     add neighbor to openSet
    return failure结论按标准 A* 流程实现即可；若仍报错，检查 openSet 数据结构是否支持"按 f 取最小"及 neighbor 扩展逻辑。

### 1.2 备注
<span style="color:#999"><em>https://stackoverflow.com/questions/13578287/a-a-star-algorithm-clarification · Stack Overflow</em></span>
## 2. A* C++ 实现（daancode）
### 2.1 内容
要点：
- 仓库 [daancode/a-star](https://github.com/daancode/a-star)：网格 A*，529 stars，含 `AStar.cpp/hpp`, `main.cpp`, CMake.
- `Generator` 配置：地图尺寸, 对角移动（4/8 方向）, 启发式（Manhattan/Euclidean/Octagonal）, 障碍点列表。
- 代价：直走 10，对角 14（≈10×√2）；`f = G + H`，G 为累计代价，H 为启发式。
- `findPath(source, target)` 返回从目标回溯到起点的坐标列表。核心结构struct Node {     Vec2i coordinates;
    Node* parent;
    uint G, H;
    uint getScore() { return G + H; }
};
CoordinateList Generator::findPath(Vec2i source_, Vec2i target_) {     openSet.push_back(new Node(source_));
    while (!openSet.empty()) {         // 取 f=G+H 最小的节点        current = min_by_score(openSet);
        if (current->coordinates == target_) break;
        closedSet.push_back(current);
        for (uint i = 0; i < directions; ++i) {             Vec2i next = current->coordinates + direction[i];
            if (collision || in_closed) continue;
            uint cost = current->G + ((i < 4) ? 10 : 14);
            // 更新或新建 successor，设置 H = heuristic(next, target)

    }     // 沿 parent 回溯路径
}启发式uint Heuristic::manhattan(Vec2i a, Vec2i b) {
    return 10 * (abs(a.x - b.x) + abs(a.y - b.y));
} uint Heuristic::octagonal(Vec2i a, Vec2i b) {     auto d = getDelta(a, b);
    return 10 * (d.x + d.y) + (-6) * min(d.x, d.y);

### 2.2 备注
<span style="color:#999"><em>https://github.com/daancode/a-star/blob/master/source/AStar.cpp</em></span>
## 3. Bézier 曲线动画演示
### 3.1 内容
- 交互式可视化：拖拽控制点观察 Bézier 曲线实时变化。
- 直观展示 de Casteljau 递归插值与多阶曲线形状。
- 适合理解路径规划中平滑曲线与控制点关系。使用建议
- 规划换道/转弯时调节控制点，观察凸包约束与端点切线方向。
- 配合有理 Bézier / B-spline 笔记理解更高阶分段平滑。
### 3.2 备注
<span style="color:#999"><em>https://www.jasondavies.com/animated-bezier/</em></span>
## 4. Apollo Cyber RT 介绍
### 4.1 内容
- **Cyber RT**：Apollo 自研运行时，替代 ROS，面向自动驾驶高并发, 低延迟, 高吞吐。
- 中心化计算模型；模块间通过 **Channel 发布/订阅**（类似 topic）。
- 提供组件（Component）, Timer, Service, 参数服务器, **record/play bag**。
- Planning / Prediction / Control 等模块均为 Cyber 组件，通过 protobuf 消息通信。核心概念| 概念 | 说明 | |------|------| | Node | 逻辑进程单元 | | Channel | 消息总线（Writer/Reader） | | Component | 触发式计算单元（订阅→处理→发布） | | Dag | 组件部署配置 |最小 Writer/Reader（概念）auto node = apollo::cyber::CreateNode("planning_node");
auto writer = node->CreateWriter<PlanningTrajectory>("/apollo/planning");
auto reader = node->CreateReader<PredictionObstacles>(     "/apollo/prediction", callback);

### 4.2 备注
<span style="color:#999"><em>https://developer.apollo.auto/Apollo-Homepage-Document/Apollo_Doc_CN_6_0/%E4%B8%8A%E6%9C%BA%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B/%E5%AE%9E%E6%97%B6%E9%80%9A%E4%BF%A1%E6%A1%86%E6%9E%B6CyberRT%E7%9A%84%E4%BD%BF%E7%94%A8/CyberRT%E4%BB%8B%E7%BB%8D/</em></span>
## 5. RRT 路径规划课程作业
### 5.1 内容
- Brown CS148：Hefty 机器人在足球场避障寻球射门；选用 **双向 RRT** 而非势场/A*。
- 控制循环：感知状态 → RRT 规划 → **relaxation 优化** → PD 跟踪执行。
- 双向 RRT：两棵树（起点/终点）交替扩展，随机采样 q_rand，向 q_near 延伸 ε 步长。
- Relaxation：从路径前后两端尝试直连，删除冗余节点（约 2/3 节点可删）。双向 RRT 伪代码text rrt(start, end):
    T1 = tree(root=start), T2 = tree(root=end)     loop:
        q_rand = random_sample()         q_new = extend(T1, q_rand, epsilon)         if connect(q_new, nearest_in(T2)):
            return merge_paths(T1, T2, q_new)         swap(T1, T2) Relaxation text relaxPath(path):
    newPath = [path[0]]     i = 0     while i < len(path)-1:
        j = len(path)-1         while j > i and not clear(path[i], path[j]): j -= 1         newPath.append(path[j]); i = j
    return newPath实验结论
- 松弛后路径节点少, 转向少，得分时间约为未松弛的 1/2～1/3.
### 5.2 备注
<span style="color:#999"><em>https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/index.html</em></span>
## 6. 圆形障碍 A* 路径（切线可见图）
### 6.1 内容
- A* 不限于网格；圆形障碍森林可转为 **切线可见图（tangent visibility graph）** 再跑 A*。
- 边分两类：**surfing edge**（圆间 bitangent 直线段）与 **hugging edge**（沿圆周的弧段）。
- 内部 bitangent 角：θ = arccos((r_A+r_B)/d)；外部：θ = arccos(|r_A−r_B|/d).
- 可见性：点到线段距离 < 障碍半径则丢弃该 surfing edge.
- **Minkowski 膨胀**：半径 r 的圆可等价为点穿过半径 +r 的障碍。

图构建流程
1. 对每对圆计算 internal/external bitangents → surfing edges.
2. 剔除被第三圆遮挡的 surfing edge（点到线段距离检验）。
3. 在圆上连接相邻 surfing 端点 → hugging edges.
4. 节点 = surfing/hugging 交点；A* 在图上搜索。

点到线段距离（可见性检测）python

# u: 投影参数；E: AB 上最近点；d = |E - C|
u = dot(C - A, B - A) / dot(B - A, B - A) E = A + clamp(u, 0, 1) * (B - A) d = norm(E - C) blocked = d < obstacle_radius优化
- 按需生成边（lazy `neighbors()`）而非 O(n³) 全图。
- 按顺时针/逆时针标注节点，剔除产生 **cusp** 的 hugging edge.
- 允许圆相切/重叠时需 clamp u 并检查 hugging edge 与第三圆交点。
### 6.2 备注
<span style="color:#999"><em>https://redblobgames.github.io/circular-obstacle-pathfinding/</em></span>
## 7. A* 算法 Python/C++ 实现
### 7.1 内容
- Red Blob Games 配套实现：BFS, Dijkstra, Greedy Best-First, A* 完整代码（Python 3 / C++14 / C#）。
- 抽象：`Graph.neighbors()`, `WeightedGraph.cost()`, `PriorityQueue`, `came_from` 外部存储。
- 网格路径可能"不直"：等代价 tie → 可用对角惩罚或 neighbor 顺序 hack.

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

### 7.2 备注
<span style="color:#999"><em>https://www.redblobgames.com/pathfinding/a-star/implementation.html#python-astar</em></span>
## 8. Powell 无导数优化
### 8.1 内容
- **Powell 法**（1964）：无导数直接搜索；n 维问题沿 n 个共轭方向各做一维搜索，n 轮后收敛（二次函数）。
- 不需目标函数可导；n<20 时效果较好；搜索方向未必下降。
- **原始 Powell 缺陷**：方向组线性相关 → 搜索降维, 不收敛。
- **修正 Powell**：每轮检验是否替换下降最大的旧方向；避免方向退化。

修正 Powell 步骤概要text
1. 初始点 x0，n 个线性无关方向 d0..d_{n-1}
2. 沿各 d_j 一维搜索得 y_n
3. 加速方向 d_n = y_n - y_0
4. 若 ||d_n|| < tol: 停止
5. 检验 f3, f1, f2, Δm 决定是否替换某旧方向
6. 沿 d_n 再一维搜索，更新 x_{k+1}，返回 2

一维搜索（概念）python def line_search(f, x0, direction):

    # 求 λ 使 f(x0 + λ*direction) 最小（黄金分割/ Brent 等）
    return x0 + lambda_opt * direction

### 8.2 备注
<span style="color:#999"><em>https://blog.csdn.net/shenziheng1/article/details/51028074</em></span>
## 9. 有理 Bézier 曲线
### 9.1 内容
- **有理 Bézier（Rational Bézier）** 在普通 Bézier 上引入权重 w_i，可精确表示圆锥曲线（圆, 椭圆等）。
- 曲线：C(t) = Σ w_i B_{i, n}(t) P_i / Σ w_i B_{i, n}(t)，t∈[0,1]。
- w_i 全为 1 时退化为普通 Bézier；调整权重可改变曲线形状而不移动控制点。
- NURBS 的基础：有理 Bézier 段拼接 + 节点向量。与普通 Bézier 对比| 特性 | Bézier | 有理 Bézier | |------|--------|-------------| | 控制点 | P_i | P_i + 权重 w_i | | 表示圆 | 近似 | 精确（合适权重） | | 凸包性 | 在控制点凸包内 | 在加权凸包内 |二次有理 Bézier 表示圆（示意）text

# 四分之一圆：3 控制点 + 权重 [1, cos(θ/2), 1]
# 常用于路径规划中平滑转弯曲线
### 9.2 备注
<span style="color:#999"><em>https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/NURBS/RB.html</em></span>
## 10. RRT 路径剪枝
### 10.1 内容
- RRT 原始路径锯齿多, 节点冗余；**剪枝（pruning / unidirectional pruning）** 尝试跳过中间节点。
- 从路径点 i 向前找最远 j，若直线段 i→j 无碰撞则删除 i+1…j−1.
- 与 **path relaxation** 类似：双指针从路径首尾尝试直连。
- Apollo / 开源 RRT 实现中常在回溯后调用 `uniPruning(path)`。剪枝伪代码python def prune_path(path, collision_free):
    if len(path) < 3:
        return path     pruned = [path[0]]     i = 0     while i < len(path) - 1:
        j = len(path) - 1         while j > i + 1 and not collision_free(path[i], path[j]):
            j -= 1         pruned.append(path[j])         i = j
    return pruned注意剪枝只保证几何可达，不保证动力学可行（曲率/转向约束需另验）。

### 10.2 备注
<span style="color:#999"><em>https://blog.csdn.net/songyunli1111/article/details/81227333</em></span>
## 11. RRT 快速随机树
### 11.1 内容
- **RRT**（LaValle & Kuffner）：随机构建空间填充树，适合高维非凸障碍与差分约束。
- **Basic RRT**：根=起点，随机采样 → 找最近节点 → steer 步长扩展 → 进目标区则成功。
- **Goal-biased RRT**：以概率 p 采样目标点，加速收敛。
- **RRT-Connect**：起点/终点各建一棵树，同采样点双向扩展，连接更快。
- 变种：RRT*（渐近最优）, Informed RRT* 等。

Basic RRT 伪代码text V = {x_init} for i = 1..N:
    x_rand = random_sample()  # 或 p 概率采 x_goal     x_near = nearest(V, x_rand)     x_new = steer(x_near, x_rand, step_size)     if collision_free(x_near, x_new):
        V.add(x_new); parent[x_new] = x_near         if in_goal_region(x_new): return path Python 核心片段（steer + 碰撞）python def steer(from_pt, to_pt, max_dist):
    dx, dy = to_pt[0]-from_pt[0], to_pt[1]-from_pt[1]     dist = math.hypot(dx, dy)     if dist <= max_dist:
        return to_pt     theta = math.atan2(dy, dx)
    return (from_pt[0] + max_dist*math.cos(theta), from_pt[1] + max_dist*math.sin(theta)) def uni_pruning(path, edge_ok):
    out = [path[0]]     anchor = path[0]     for i in range(2, len(path)):
        if not edge_ok(anchor, path[i]):
            anchor = path[i-1]             out.append(anchor)     out.append(path[-1])
    return out

### 11.2 备注
<span style="color:#999"><em>https://vslam.net/2021/03/28/route_planning/%E8%B7%AF%E5%BE%84%E8%A7%84%E5%88%92%EF%BC%88%E5%85%AB%EF%BC%89-RRT%E7%AE%97%E6%B3%95/</em></span>
## 12. 坐标旋转与变换
### 12.1 内容
- 二维点绕原点旋转 θ：x' = x cosθ − y sinθ，y' = x sinθ + y cosθ。
- 绕任意点 (cx, cy) 旋转：平移 → 旋转 → 平移回。
- 路径规划中用于 Frenet/全局坐标转换, 障碍物相对坐标计算。旋转矩阵python import math import numpy as np def rotate_2d(x, y, theta, cx=0, cy=0):
    x, y = x - cx, y - cy     c, s = math.cos(theta), math.sin(theta)
    return (c*x - s*y + cx, s*x + c*y + cy)

# 或使用 2×2 矩阵
R = np.array([[c, -s], [s, c]]) p_new = R @ (p - center) + center

### 12.2 备注
<span style="color:#999"><em>https://www.cnblogs.com/fangsmile/p/8622421.html</em></span>
## 13. 贝塞尔曲线路径规划
### 13.1 内容
- n 个控制点 → (n−1) 阶 Bézier；**递归 de Casteljau** 降阶绘制。
- 系数为二项式展开 B_{i, n}(t) = C(n, i) t^i (1−t)^{n−i}；各项系数之和为 1.
- **凸包性质**：曲线在控制点凸包内 → 可用于约束规划曲线范围。
- **端点性质**：曲线过首尾控制点；端点切线方向沿相邻控制点连线 → G1 拼接。
- 导数仍是 Bézier（hodograph），用于曲率/速度规划。

de Casteljau 递归（概念）text

# 三阶：在 AB, BC, CD 上按 t 插值得 E, F, G；再在 EF, FG 得 H, I；最后在 HI 得曲线点
P(t) = (1-t)³P0 + 3(1-t)²t P1 + 3(1-t)t² P2 + t³ P3路径规划应用
- 用控制点凸包限制曲线不碰障；端点切线对齐车道/航向实现平滑换道。
### 13.2 备注
<span style="color:#999"><em>https://zhuanlan.zhihu.com/p/136647181</em></span>

## 相关笔记

[自动驾驶（主题索引）](MOC-autopilot.md)
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]] — _路径 / 运动规划_
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]] — _路径 / 运动规划_
[[A-算法-openset-澄清|A* 算法 openset 澄清]] — _路径 / 运动规划_
[[AStar-路径搜索|A* 路径搜索]] — _路径 / 运动规划_
[[Apollo-3.0-编译运行|Apollo 3.0 编译运行]] — _路径 / 运动规划_
[[Apollo-5.0-行为预测|Apollo 5.0 行为预测]] — _路径 / 运动规划_
[[Apollo-6.0-安装|Apollo 6.0 安装]] — _路径 / 运动规划_
[[Apollo-Cyber-RT-介绍|Apollo Cyber RT 介绍]] — _路径 / 运动规划_

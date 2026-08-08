---
title: VectorNet 论文笔记
url: https://blog.csdn.net/qq_41897558/article/details/120087113
curated_at: '2026-06-28T20:00:00+00:00'
---

# VectorNet 论文笔记

论文：*VectorNet: Encoding HD Maps and Agent Dynamics from Vectorized Representation*（Gao et al., 2020）。本文是对该文的阅读笔记，侧重轨迹预测场景下矢量地图与 agent 动力学的编码方式。

## 要点概览

1. 使用**矢量化高精地图**与**障碍物历史轨迹**，避免栅格化渲染带来的信息损失。
2. 设计 **Polyline 子图网络**与**全局图网络**，分别建模低阶局部几何与高阶交互。
3. 引入 **auxiliary task**（地图元素分类）提升表征与预测性能。

## 背景与动机

近年许多 Prediction 方法将场景渲染为鸟瞰图（BEV），再用 ConvNet 编码。VectorNet 的核心思路是：对 HD Map 与 agent 轨迹做**矢量表示**，跳过有损渲染与重型 ConvNet，直接在折线（polyline）级构图。

![语义地图 vs VectorNet 对比](https://i-blog.csdnimg.cn/blog_migrate/998cded1705814bb201dd894f81de073.png)

在 Argoverse 与 in-house 数据集上，VectorNet 取得 SOTA 级效果，相较语义地图方法约节省 **70% 参数量**，计算开销更低。

## 网络结构总览

![VectorNet 整体架构](https://i-blog.csdnimg.cn/blog_migrate/761ce34291262e9446935fe16f1349fd.png)

整体流程：地图与轨迹 → 矢量折线 → Polyline 子图编码 → 全局图交互 → 轨迹解码（含多模态输出）。

## 向量表示

地图要素在地理坐标中可以是点, 多边形或曲线：

- **车道线**：样条控制点序列
- **人行横道**：多边形顶点
- **停止标志**：单点

Agent 历史/未来轨迹同样是样条/折线。

**地图折线采样**：选定起点与方向，沿样条**等空间间距**采样关键点，相邻点连成向量。

**轨迹折线采样**：从 \(t=0\) 起按固定时间间隔（如 0.1 s）采样，相邻点连成向量。采样足够密时，折线与原始几何近似。每条折线 \(P_j\) 与一条地图要素或一条轨迹一一对应。折线 \(P_j\) 的每个向量 \(v_i\) 视为图中的一个**节点**，特征为：

\[
v_i = [d_i^s, d_i^e, a_i, j]
\]

| 分量 | 含义 |
|------|------|
| \(d_i^s, d_i^e\) | 向量起点, 终点坐标 \((x, y)\) 或 \((x, y, z)\) |
| \(a_i\) | 属性：对象类型, 时间戳, 道路类型, 限速等 |
| \(j\) | 所属折线 id |

## Polyline 子图

对折线 \(P=\{v_1, \ldots, v_p\}\)，先用 MLP 将每个节点 \(v_i\) 映射为隐向量 \(h_i^{(0)}\)，再沿折线顺序用**局部聚合**（如 \(\max\) pooling 或小型 GNN）得到折线级特征 \(r_P\). 多条折线各自独立编码，保留局部几何。

## 全局图与高阶交互

所有折线特征 \(\{r_{P_j}\}\) 构成全局图节点。通过 **Global Graph Network**（自注意力 / 图注意力）建模 agent 之间, agent 与地图之间的交互。相比 BEV ConvNet，全局感受野由图结构显式给出，参数量更小。

## 轨迹生成

以目标 agent 对应折线（或其上下文节点）的聚合特征为条件，解码未来轨迹。通常输出**多模态**分布：\(K\) 条候选轨迹 + 每条的概率（或 logits）。

## 多任务训练

除主任务（轨迹预测）外，增加 **auxiliary task**：预测地图向量节点的语义类别（如车道类型）。辅助损失与主损失联合训练，提升地图语义表征，进而改善预测。

## 损失函数

典型组合：

- **分类损失**：多模态轨迹的模式选择（交叉熵）
- **回归损失**：选中模式下未来 waypoint 的 L2 / Smooth L1
- **辅助损失**：地图节点分类交叉熵

总损失为加权和，具体权重依实现与数据集而定。

## 实验要点

### 数据集

Argoverse Motion Forecasting, in-house 数据等。

### ConvNet baseline 消融

- **感受野**：更大感受野通常更好，但参数量与延迟上升。
- **渲染分辨率**：分辨率提高收益递减，且计算显著增加。

### VectorNet 消融

- **输入节点类型**：同时使用 agent 轨迹与地图要素优于单一模态。
- **图结构**：全局图对交互建模至关重要；去掉高阶交互性能明显下降。

### 与 ConvNet 对比

| 维度 | VectorNet | BEV ConvNet |
|------|-----------|-------------|
| 性能 | Argoverse 等 benchmark 领先 | 强基线但更重 |
| FLOPs / 参数量 | 约少 70% | 高 |
| SOTA 对比 | 优于当时多种公开方法 | — |

## 小结

VectorNet 将 HD Map 与轨迹统一为折线图，用子图 + 全局图两级 GNN 替代栅格 ConvNet，在精度与效率之间取得更好平衡，是自动驾驶轨迹预测领域的代表性矢量方法。

## 参考文献

<div class="kb-references">
<p>Gao et al., *VectorNet: Encoding HD Maps and Agent Dynamics from Vectorized Representation*, 2020.</p>
</div>

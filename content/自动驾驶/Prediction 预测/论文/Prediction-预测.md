---
title: Prediction 预测
sources:
- title: PointPillars 3D 检测
  url: https://zhuanlan.zhihu.com/p/357626425
- title: Apollo 5.0 行为预测
  url: https://www.cnblogs.com/liuzubing/p/11388485.html
- title: 轨迹预测论文集
  url: https://zhuanlan.zhihu.com/p/480433722
- title: Stanford CS224W
  url: http://web.stanford.edu/class/cs224w/
- title: Context-Gated Convolution
  url: https://zhuanlan.zhihu.com/p/183879200
- title: 图注意力网络 GAT
  url: https://zhuanlan.zhihu.com/p/34232818
- title: HBEns 轨迹预测集成
  url: https://mp.weixin.qq.com/s?__biz=MzA5MjM0MDQ1NA==&mid=2650028507&idx=1&sn=d95c214a73b8dee5c7b1066297be7d9a
- title: Waymo Open Dataset
  url: https://github.com/waymo-research/waymo-open-dataset.git
- title: Waymo 运动预测挑战赛
  url: https://waymo.com/open/challenges/2022/motion-prediction/
- title: Waymo 占据流预测
  url: https://waymo.com/open/challenges/2022/occupancy-flow-prediction-challenge/
- title: Siamese 网络
  url: https://blog.csdn.net/ybdesire/article/details/84072339
- title: DenseTNT 与 Teacher Forcing
  url: https://zhuanlan.zhihu.com/p/473702133
- title: 行为预测综述（一）
  url: https://zhuanlan.zhihu.com/p/158951141
- title: VectorNet 论文笔记
  url: https://blog.csdn.net/qq_41897558/article/details/120087113
- title: VectorNet/TNT/DenseTNT
  url: https://zhuanlan.zhihu.com/p/434128352
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Prediction 预测

Prediction 预测

## PointPillars 3D 检测
### 1 内容
结构text Point Cloud → Pillar Partition → Pillar Feature Net → 2D CNN Backbone → Detection Head

### 2 备注
<span style="color:#999"><em>https://zhuanlan.zhihu.com/p/357626425</em></span>
## Apollo 5.0 行为预测
### 1 内容
数据流text Perception + HD Map + Localization → Prediction → Planning → Control

### 2 备注
<span style="color:#999"><em>https://www.cnblogs.com/liuzubing/p/11388485.html</em></span>
## 轨迹预测论文集
### 1 内容
检索建议
- 按数据集（Argoverse / nuScenes / Waymo）与表示（栅格/矢量/图）分类阅读。
### 2 备注
<span style="color:#999"><em>https://zhuanlan.zhihu.com/p/480433722</em></span>
## Stanford CS224W
### 1 内容
要点：
- **CS224W**：Stanford 图机器学习（社交网络, 知识图谱, GNN 等）。
- 与 prediction 关联：GAT, GraphSAGE 等可建模 agent-map 交互（如 VectorNet 全局图）。
- 下次开课：Fall 2026；NVIDIA Auditorium 线下。相关技能
- 图注意力, 链路预测, 节点分类 → 可迁移至多 agent 轨迹预测。
### 2 备注
<span style="color:#999"><em>http://web.stanford.edu/class/cs224w/</em></span>
## Context-Gated Convolution
### 1 内容
要点：
- ECCV 2020：Context-Gated Convolution，哥大+腾讯 AI Lab.
- 即插即用模块：用上下文生成 gate，调制卷积特征（类似 attention gating）。
- 论文：arXiv:1910.05577；代码：context-gated-convolution. 思想text output = Conv(x) * Gate(context(x))

# Gate 由全局/局部上下文预测，增强相关特征, 抑制无关特征
### 2 备注
<span style="color:#999"><em>https://zhuanlan.zhihu.com/p/183879200</em></span>
## 图注意力网络 GAT
### 1 内容
要点：
- **GAT**（Veličković et al.）：对邻居特征做 masked self-attention 聚合。
- α_ij = softmax_j(LeakyReLU(a^T [Wh_i || Wh_j]))；h_i' = σ(Σ_j α_ij W h_j).
- 多头 attention 稳定训练；适用于 agent-agent / agent-lane 交互建模。单层更新python

# 概念伪代码
e_ij = leaky_relu(a.dot(concat(W@h_i, W@h_j))) alpha_ij = softmax_j(e_ij) h_i_new = sigma(sum_j(alpha_ij * W @ h_j))

### 2 备注
<span style="color:#999"><em>https://zhuanlan.zhihu.com/p/34232818</em></span>
## HBEns 轨迹预测集成
### 1 内容
要点：
- **HBEns**（地平线，Waymo 2022）：Base Models + **Model Ensemble** 二阶段框架。
- 输入：HD map + 周围 agent 历史轨迹 → 预测目标 agent 未来轨迹。
- 编码：栅格 CNN / 矢量 Transformer / 图网络均可作 base model；集成层融合多模型输出。
- 优势：base 模型可异构，集成提升精度与设计自由度。框架text Map + History → [Base Model 1..K] → Ensemble → K 条轨迹 + 概率

### 2 备注
<span style="color:#999"><em>https://mp.weixin.qq.com/s?__biz=MzA5MjM0MDQ1NA==&mid=2650028507&idx=1&sn=d95c214a73b8dee5c7b1066297be7d9a</em></span>
## Waymo Open Dataset
### 1 内容
要点：
- Waymo 公开数据集与评测代码：Perception, Motion Prediction, Interaction Prediction 等。
- Perception：高分辨率传感器+多任务标签；Motion：agent 未来轨迹预测 benchmark.
- GitHub 含 TF 示例, metric 实现, WOD devkit. 子数据集text
- Perception Dataset
- Motion Prediction / Interaction Prediction
- Sim Agents (较新)
### 2 备注
<span style="color:#999"><em>https://github.com/waymo-research/waymo-open-dataset.git</em></span>
## Waymo 运动预测挑战赛
### 1 内容
要点：
- **Motion Prediction Challenge**：给定 1s 历史，预测 3s 未来轨迹（8s 总窗口常见设定）。
- 评测：minADE, minFDE, Miss Rate, brier-minFDE 等；需输出 K 条 modal 轨迹+概率。
- 场景含 HD map lane, 交通灯, 多 agent 交互。常用指标text ADE = mean L2 over horizon FDE = L2 at final timestep MR  = fraction with FDE > 2m

### 2 备注
<span style="color:#999"><em>https://waymo.com/open/challenges/2022/motion-prediction/</em></span>
## Waymo 占据流预测
### 1 内容
要点：
- **Occupancy and Flow Prediction**：预测未来时刻 BEV **占据栅格**及**流场**（非仅 agent 轨迹）。
- 更细粒度场景理解：可表达未知物体, 道路占用变化。
- 与 motion prediction 互补：占据用于规划可行域，轨迹用于交互 agent. 输出形式text per-timestep: occupancy grid O(t), flow field F(t) on BEV

### 2 备注
<span style="color:#999"><em>https://waymo.com/open/challenges/2022/occupancy-flow-prediction-challenge/</em></span>
## Siamese 网络
### 1 内容
要点：
- **Siamese Network**：共享权重的双分支，比较两输入相似度（L1/L2 距离或 contrastive loss）。
- 用于轨迹/行为：**相似场景或相似 agent 模式** embedding 匹配。
- 与 triplet loss 结合可做 metric learning. 结构text Input A ──┐          ├── Shared CNN ──→ embedding_a, embedding_b ──→ distance Input B ──┘

### 2 备注
<span style="color:#999"><em>https://blog.csdn.net/ybdesire/article/details/84072339</em></span>
## DenseTNT 与 Teacher Forcing
### 1 内容
要点：
- **Teacher Forcing**：训练时将 **GT 目标/轨迹** 作为解码器输入，加速收敛；推理时用模型自身预测。
- **DenseTNT**：dense 目标概率估计（无锚点）→ NMS 选目标 → 轨迹补全。
- 长期预测：3s/5s/8s 分阶段自回归 dense goal，组合 top-K 目标集。

Teacher Forcing（概念）python

# 训练
decoder_input = ground_truth_goal  # 强制

# 推理
decoder_input = model_predicted_goal

### 2 备注
<span style="color:#999"><em>https://zhuanlan.zhihu.com/p/473702133</em></span>
## 行为预测综述（一）
### 1 内容
要点：
- 行为预测：由历史轨迹预测短期未来轨迹（行人/车辆）。
- 综述来源：*A survey on motion prediction and risk assessment for intelligent vehicles* (2014).
- **必要性**：感知仅当前状态；规划需未来占用与交互；风险估计依赖预测不确定性。
- 方法分类：物理模型, 交互模型, 机器学习（RNN/CNN/GNN）, 意图+轨迹分层。模块位置text Perception → Prediction (motion + intent) → Planning / Risk Assessment

### 2 备注
<span style="color:#999"><em>https://zhuanlan.zhihu.com/p/158951141</em></span>
## VectorNet 论文笔记
### 1 内容
要点：
- **VectorNet**（Waymo, ICLR 2020）：HD map 与 agent 轨迹 **矢量化** 为 polyline，避免栅格化信息损失。
- **Subgraph**：每条 polyline 内 MLP+max pooling 得 polyline embedding.
- **Global graph**：polyline 节点间 self-attention 建模车-车, 车-道交互。
- 输出：目标 agent 未来轨迹分布。

Polyline 特征text每个 vector: (Δx, Δy, obj_type, timestamp, lane_attr, ...) polyline_feat = MaxPool( MLP(v_1), ..., MLP(v_m) )

### 2 备注
<span style="color:#999"><em>https://blog.csdn.net/qq_41897558/article/details/120087113</em></span>
## VectorNet/TNT/DenseTNT
### 1 内容
要点：
- **VectorNet**：矢量 map+agent → polyline subgraph + global attention → 轨迹解码。
- **TNT**：目标驱动；(1) 离散候选目标分类 (2) 条件轨迹回归 (3) 轨迹评分+NMS；防 mode averaging.
- **DenseTNT**：dense 目标概率（无启发式 anchor）→ NMS → 轨迹补全；长期分 3s/5s/8s 分支。
- 数据集：Argoverse（2s 观测/3s 预测）, Waymo in-house；指标 ADE/FDE/MR/brier-minFDE.

TNT 分解text p(trajectory|X) = Σ_τ p(τ|X) · p(traj|τ, X)

# τ: 离散目标点（车道中心线采样 / 行人 grid）
### 2 备注
<span style="color:#999"><em>https://zhuanlan.zhihu.com/p/434128352</em></span>

## 相关笔记

[自动驾驶（主题索引）](MOC-autopilot.md)

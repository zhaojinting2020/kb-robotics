---
title: Siamese 网络
url: https://blog.csdn.net/ybdesire/article/details/84072339
curated_at: '2026-06-28T20:00:00+00:00'
---

# Siamese 网络

孪生网络（Siamese Network）学习**相似度函数**，输入两张图像，输出 embedding 后比较距离，广泛用于人脸识别等 **one-shot** 场景。

## 背景：one-shot 问题

公司员工人脸识别：每人可能只有**一张照片**（训练样本极少），且人员会入职/离职（类别动态变化）。无法为每人训练独立分类器。思路：训练模型输出两张图的**相似度** \(d(A, B)\)，而非固定类别 logits.Siamese 网络即为此类 similarity 学习架构。

## 网络结构

![Siamese 双塔结构](https://i-blog.csdnimg.cn/blog_migrate/e80174fc312ef04b77f9282950d8015c.png)

上下两路为**结构相同, 权重共享**的 CNN（孪生塔）。与传统分类 CNN 不同，输出不是类别，而是固定维 embedding 向量（如 128 维）：

- 同一人：\(f(A)\) 与 \(f(P)\) 欧氏距离**小**
- 不同人：\(f(A)\) 与 \(f(N)\) 欧氏距离**大**

相似度由 embedding 间距离给出：

![欧氏距离计算相似度](https://i-blog.csdnimg.cn/blog_migrate/c8dc2c6883e2e6f4eb64626dd7072b93.png)

## 训练目标

对锚点图像 \(A\), 同身份正样本 \(P\), 异身份负样本 \(N\)，希望：

\[
d(f(A), f(P)) + \alpha < d(f(A), f(N))
\]

其中 \(\alpha\) 为间隔 margin.

![训练三元组示意](https://i-blog.csdnimg.cn/blog_migrate/e970b00a96184618590c822174909db2.png)

常用 **Triplet Loss**（Andrew Ng CNN 课程）：

\[
L = \max\big(\|f(A)-f(P)\|^2 - \|f(A)-f(N)\|^2 + \alpha, \; 0\big)
\]

![Triplet Loss 公式](https://i-blog.csdnimg.cn/blog_migrate/5ef92184c882c14d339ec504b8cd8126.png)

也可使用 Contrastive Loss 等变体。训练时对每个 anchor 采样 hard/easy triplet 影响收敛速度。

## 推理

注册阶段：每人一张图经共享 CNN 得 embedding 存库。识别阶段：查询图 embedding 与库中向量比最近邻距离，低于阈值则判为同一人。

## 参考

- Schroff et al., *FaceNet: A Unified Embedding for Face Recognition and Clustering*, CVPR 2015 — [论文 PDF](https://www.cv-foundation.org/openaccess/content_cvpr_2015/ext/1A_089_ext.pdf)
- Andrew Ng, *Convolutional Neural Networks*, Week 4（Triplet Loss）

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)

[[VectorNet-论文笔记|VectorNet 论文笔记]]

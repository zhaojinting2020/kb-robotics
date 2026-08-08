---
title: PointPillars 3D 检测
url: https://zhuanlan.zhihu.com/p/357626425
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:15:04+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T20:24:23+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# PointPillars 3D 检测

## 1 前言

前面的相关文章中，我们简单解析了自2017年来相关的**3D视觉/点云**算法。本文要解析的模型叫做[PointPillars](https://zhida.zhihu.com/search?content_id=167602095&content_type=Article&match_order=1&q=PointPillars&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4OTEsInEiOiJQb2ludFBpbGxhcnMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNjc2MDIwOTUsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.BKIPU_LW37H4xvflkQ1ZWZekdT34vXmyQxl9b2T7Eww&zhida_source=entity)，是2019年出自工业界的一篇Paper. 该模型最主要的特点是检测**速度和精度的平衡**。该模型的平均检测速度达到了62Hz，最快速度达到了105Hz，确实遥遥领先了其他的模型。这里我们引入[CIA-SSD](https://zhida.zhihu.com/search?content_id=167602095&content_type=Article&match_order=1&q=CIA-SSD&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4OTEsInEiOiJDSUEtU1NEIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTY3NjAyMDk1LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.RVCGg272ZMm4kWRrQ8hUZLBSzL_lm6RehGk-IRpQwLA&zhida_source=entity)模型中的**精度-速度图**，具体对比如下所示。
![Image 1](https://pic1.zhimg.com/v2-eace22a808eb9c3296d3017fb92611a6_1440w.jpg)

<p class="kb-image-caption">图例</p>

（1）将点云数据划纳入一个个**体素**（Voxel）中，构成规则的, 密集分布的**体素集。**常见的有VoxelNet和SECOND，这在之前的文章中已经解析过了；（2）从**俯视**角度将点云数据进行处理，获得一个个**伪图片**的数据。常见的模型有MV3D和AVOD，这也说过了。本文采用了一种不同于上述两种思路的点云建模方法。从模型的名称PointPillars可以看出，该方法将Point转化成一个个的Pillar（柱体），从而构成了**伪图片**的数据。然后对伪图片数据进行BBox Proposal就很简单了，作者采用了SSD的网络结构进行了Proposal. 本文的论文地址为：
代码地址为:

## 2 数据处理和网络结构

前面说到本文的一大亮点是将点云划分为一个个的Pillar，从而构成了**伪图片**的数据。如何构成这个伪图片呢？作者在论文中是给出了这样的图，如下。
![Image 2](https://pic1.zhimg.com/v2-387262df09d8dbbccadd1a05a4c59e02_1440w.jpg)

<p class="kb-image-caption">图例</p>

按照点云数据所在的X，Y轴（不考虑Z轴）将点云数据划分为**一个个的网格**，凡是落入到一个网格的点云数据被视为其处在**一个pillar**里，或者理解为它们构成了一个Pillar. 每个点云用一个 D=9**维的向量**表示，分别为 （x, y, z, r, x_{c}, y_{c}, z_{c}, x_{p}, y_{p}） 。其中 x, y, z, r 为该点云的真实坐标信息（三维）和反射强度； x_{c}, y_{c}, z_{c} 为该点云所处Pillar中所有点的几何中心； x_{p}, y_{p} 为 x-x_{c} , y-y_{c} ，反应了点与几何中心的**相对位置**。假设每个样本中有 P 个非空的pillars，每个pillar中有 N 个点云数据，那么这个样本就可以用一个 (D, P, N) 张量表示。那么可能就有人问了，怎么保证每个pillar中有 N 个点云数据呢？

如果每个pillar中的点云数据数据超过 N 个，那么我们就随机采样至 N  个；如果每个pillar中的点云数据数据少于 N 个，少于的部分我们就填充为0；这样的话，作者很容易就实现了点云数据的张量化，具体过程如下。
![Image 3](https://pic4.zhimg.com/v2-2ff6381d3bb01de8fa9d25f7b29fad13_1440w.jpg)

<p class="kb-image-caption">图例</p>

为了获得伪图片特征，作者将 P 转化为 (H, W) ，即 P\rightarrow H\times W 。那么我们就获得了形如 (C, H, W) 的伪图片了。具体过程如下：
![Image 4](https://pic2.zhimg.com/v2-24c77c2070b5e28c041c8c51fb92a469_1440w.jpg)

<p class="kb-image-caption">图例</p>

之所以选择这样架构，是因为**不同分辨率的特征图负责不同大小物体的检测**。比如分辨率大的特征图往往感受野较小，适合捕捉小物体（在[KITTI](https://zhida.zhihu.com/search?content_id=167602095&content_type=Article&match_order=1&q=KITTI&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4OTEsInEiOiJLSVRUSSIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjE2NzYwMjA5NSwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.8_ZdhPthX_WGSugATbnuGIK5E0HDDTkmhRdwtyUV0lc&zhida_source=entity)中就是行人）。至此，PointPillars的网络结构就讲解完毕了，很简单有木有？

## 3 损失函数

其中 （x, y, z） 为中心， w, h, l 为尺寸数据， \theta 为方向角。那么检测框回归任务中要学习的参数为这**7个变量的偏移量**：
有关分类损失，作者仍然采用了[Focal Loss](https://zhida.zhihu.com/search?content_id=167602095&content_type=Article&match_order=1&q=Focal+Loss&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4OTEsInEiOiJGb2NhbCBMb3NzIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTY3NjAyMDk1LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.BjZdm-w3O3TgN-x3dzwgGPbzGA1OycIcRsU7YmKREl8&zhida_source=entity)，定义如下：
![Image 8](https://picx.zhimg.com/v2-942999307439765afba3649acbf1ae85_1440w.png)

<p class="kb-image-caption">图例</p>

PointPillars是一款能够平衡检测速度和检测精度的3D检测模型。最近我也正在看这个模型的代码，上手玩玩这个模型，希望最后的结果能够惊艳到我（微笑）。如果文章解析部分有理解不到位的地方，欢迎各位批评指正！

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[Context-Gated-Convolution|Context-Gated Convolution]]
[[DenseTNT-与-Teacher-Forcing|DenseTNT 与 Teacher Forcing]]
[[HBEns-轨迹预测集成|HBEns 轨迹预测集成]]
[[Siamese-网络|Siamese 网络]]
[[VectorNet-论文笔记|VectorNet 论文笔记]]
[[VectorNetTNTDenseTNT|VectorNet/TNT/DenseTNT]]
[[图注意力网络-GAT|图注意力网络 GAT]]
[[Apollo-5.0-行为预测|Apollo 5.0 行为预测]] — _预测 / Waymo_

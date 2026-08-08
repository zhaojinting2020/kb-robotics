---
title: VectorNet/TNT/DenseTNT
url: https://zhuanlan.zhihu.com/p/434128352
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:16:05+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# VectorNet/TNT/DenseTNT

### code
### 概述
![Image 1](https://pica.zhimg.com/v2-9f10e4b70ec752f0043e3d3e39c41c38_1440w.jpg)

<p class="kb-image-caption">图例</p>

lane:一个graph包含200个polyline, 一个polyline包含用100个vector向量表示，每个向量长度为9. 在spline上采用等空间间隔采样，连接相邻点构成向量。一般长度每100m打断一下，前面元素数量不到的用0补充然后用mask标记。
agent:采用时间采样的方式。一般会将速度小于1m/s的agent滤掉。每0.1s采个样。
![Image 2](https://pic3.zhimg.com/v2-890a5906f79e28e1822a56bb32484662_1440w.jpg)

<p class="kb-image-caption">图例</p>

polyline subgraphs从vector中抽取实例的特征，比如每辆车和行人的轨迹特征，每个车道lane的特征，每个人行道的特征。全连接网络，一条折线最后凝练出一个特征向量，每个特征向量就是一个node.
![Image 3](https://pic4.zhimg.com/v2-bb043141146b9ec34984bfb6a51ceb53_1440w.jpg)

<p class="kb-image-caption">图例</p>

c.折线子图可以看作是[PointNet](https://link.zhihu.com/?target=https%3A//openaccess.thecvf.com/content_cvpr_2017/papers/Qi_PointNet_Deep_Learning_CVPR_2017_paper.pdf)的一般化
**3.global interaction graph**
global interaction graph是一个基于attention的全连接图，可以让不同实例进行信息交换，比如建模车和车之间的交互关系，车和车道之间的关系，车道和车道之间的关系等等。当行人走上斑马线时，代表斑马线的vector和代表行人的vector之间就会产生信息交换引导模型关注他们之间的联系。各个poluline node 全连接构成全局图：
![Image 6](https://pic1.zhimg.com/v2-5f66f744b8dcfefe0c988937ddc800ca_1440w.jpg)

<p class="kb-image-caption">图例</p>

图具体计算采用[self-attention](https://link.zhihu.com/?target=https%3A//pdfs.semanticscholar.org/3012/b0f92468ec0679ba79bfc6c823979d85ee21.pdf)操作:
![Image 7](https://pic1.zhimg.com/v2-d61fd4ebf29c393f30cebf4211d6d2ea_1440w.jpg)

<p class="kb-image-caption">图例</p>

对于自动驾驶的任务（例如，车辆和行人轨迹预测），中长期未来的不确定性主要可以通过预测agent的可能目标来捕获。这些目标不仅基于可解释的物理实体（如位置），还与意图（如车道改变或右转）密切相关。所以推测，目标的空间可以在场景中离散化——允许确定性模型并行生成不同的目标——然后再进行细化以获得更精确的结果。这些观察结果引导提出了目标驱动轨迹预测框架，名为TNT. 首次将未来预测问题转化为预测离散目标状态上的分布，然后建立一个概率模型，其中轨迹估计和可能性以这些目标为条件。预测任务大致分为三步：
1.   给定环境的context，估计每个候选点的可能性，从而选择概率高的候选点，下图分别用钻石和星星表示候选点和选中点
2.   根据目标，估计每个选定目标的轨迹（分布）
3.   对所有的轨迹进行排名的评分和选择
### 问题建模

通过对目标进行调节，然后对其进行边缘化，从而相应地分解概率分布：
![Image 9](https://pic1.zhimg.com/v2-a6ad4ff13bd7eaf2ca062fe3caf5082c_1440w.jpg)

<p class="kb-image-caption">图例</p>

对于轨迹预测等应用，通过适当设计目标空间 \tau(c_P) （例如目标位置），目标分布 p(\tau|X) 可以很好地捕捉意图不确定性。一旦确定了目标，进一步证明了控制不确定性（例如轨迹）可以通过简单的单峰分布可靠地建模。通过一组离散位置来近似目标空间\tau(c_P) ，**将**p(\tau|X)**的估计主要转化为分类任务**。与潜在变分模型相比，此模型以显式目标分布的形式提供了更好的解释性，并且在设计目标空间T(c)时可以自然地结合专家知识（如道路拓扑）。

### TNT预测
![Image 10](https://pic2.zhimg.com/v2-56f832d1f8c9b540e9e9310eeee3a963_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 11](https://pica.zhimg.com/v2-5e9fc44f35f458e7a9df33dc5508be52_1440w.jpg)

<p class="kb-image-caption">图例</p>

\mathcal N(.|\nu(.)) 表示广义的正态分布，Huber作为距离函数。平均值表示为\nu() ，并假设单位方差。可训练功能 f(.)和\nu(.) 由两层多层感知器（MLP）实现，目标坐标 (x^{k}, y^{k}) 和场景上下文特征 X 作为输入。他们预测目标位置上的离散分布及其最可能的偏移量。训练的loss function定义如下：
![Image 12](https://pic2.zhimg.com/v2-7fe59d076dd192daa8fe0f8c57fa4251_1440w.jpg)

<p class="kb-image-caption">图例</p>

在实践中，生成了较大的candidate（如N = 1000），以增加未来潜在地点的覆盖率；然后保留较少的采样点作为输出(如M = 50)，以便进一步处理，因为这是一个很好的选择，有助于在目标召回和模型效率之间取得平衡。
**目标条件运动估计**

将轨迹建模为 p(s_F|\tau, X)=\prod^{T}_{t=1}p(s_t|\tau, X) , 符合正态分布。有两个假设：时间步长是条件独立的，使模型避免了顺序预测，提高了计算效率；轨迹分布为正态分布。这在短期内肯定是正确的；对于较长的时间范围，可以在（中间）目标预测和运动估计之间进行迭代，这样假设仍然成立。此阶段使用两层MLP实现。它将上下文特征 X 和目标位置 \tau 作为输入，并为每个目标输出一条最可能的未来轨迹 [\hat s_1, ..., \hat s_T] 。由于它是以第一阶段的预测目标为条件的，为了使学习过程顺利进行，训练时通过输入位置真值 （x^u, y^u） 作为目标。该阶段的损失项是预测状态与真值之间的距离 \hat s_t 和真值 s_t 。损失函数如下：
![Image 13](https://picx.zhimg.com/v2-bfc490fa53e9820543ce01d96fd3acd3_1440w.jpg)

<p class="kb-image-caption">图例</p>

从生成的轨迹中选出最可能的轨迹。可能某个target有很高的likelihood, 但是结合轨迹来说可能最后的概率就没有那么高了。论文采用最大熵模型对第二阶段的所有轨迹进行评分：
![Image 14](https://pic2.zhimg.com/v2-f3a67880e8b6b800fda38cbc5e5161f5_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 15](https://pic4.zhimg.com/v2-e2c41e723b9cd740855dadc44f6869c7_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 16](https://pic3.zhimg.com/v2-fbb4f2d0e73847bbb49bbf1c0cf37700_1440w.jpg)

<p class="kb-image-caption">图例</p>

首先根据分数按降序对轨迹进行排序，然后贪婪地挑选它们；如果一条轨迹距离所有选定轨迹足够远，我们也会选择它，否则会将其排除。此处使用的距离度量与评分过程相同。此过程受计算机视觉问题（如目标检测）中常用的非最大值抑制算法的启发。

## DenseTNT
### code
### 概述
![Image 17](https://pica.zhimg.com/v2-af30a7f6ac3913039a1510c167bddc14_1440w.jpg)

<p class="kb-image-caption">图例</p>

图的上半部分显示了一个典型的基于目标的轨迹预测流程。现有的目标预测方法（左下）首先启发式地定义稀疏目标锚，然后对这些锚进行回归和分类以估计目标。相比之下，我们的方法（右下）在不依赖启发式预定义锚（无锚）的质量的情况下估计密集目标的概率。

DenseTNT是一种基于无锚目标的轨迹预测方法。它大大提高了目标估计的性能，而不依赖于启发式预定义目标锚的质量。首先提取稀疏场景上下文特征，然后采用稠密概率估计来生成目标候选的概率分布。最后，轨迹完成模块根据一组选定的目标输出轨迹。

### 方法
![Image 18](https://pic3.zhimg.com/v2-1a629da02a8e0a202104c5c6bf36824c_1440w.jpg)

<p class="kb-image-caption">图例</p>

与将车道和agent栅格化为图像并使用CNNs提取特征的密集编码方法相比，稀疏编码方法将所有地理实体（如车道, 交通灯）和车辆抽象为多段线，更好地捕捉高清地图的结构特征。
**稠密目标概率估计**

在地图上执行密集目标概率估计。具体地说，在一定的采样率下，采用稠密目标编码模块提取道路上所有位置的特征。然后，预测了密集目标的概率分布。密集目标编码模块使用注意机制提取目标和车道之间的局部信息。我们将第i个目标的特征表示为 F_i ，这是通过两层MLP获得的，MLP的输入是目标的二维坐标。目标和车道之间的局部信息可通过注意机制获得：
![Image 19](https://pic3.zhimg.com/v2-a1fdf1648e010e0ac66af7ade0360aa0_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 20](https://pic2.zhimg.com/v2-237dd933e4a1bf559c2cccb6b5d5f1df_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 21](https://pic1.zhimg.com/v2-18064311f3083aa95a29ff3cf18a30c8_1440w.jpg)

<p class="kb-image-caption">图例</p>

与TNT类似，最后一步是根据选定的目标完成每条轨迹。我们只有一条真值轨迹，因此我们在训练期间通过喂真值数据应用了teacher forcing技术。损失项是预测轨迹 \hat s 和真值轨迹 s 之间的偏移量：
![Image 22](https://pica.zhimg.com/v2-26bd7591922ff891907e6bebb6797c66_1440w.jpg)

<p class="kb-image-caption">图例</p>

前面的步骤已经可以在短期（例如3s）运动预测任务中实现良好的性能。然而，长期预测仍然具有挑战性，因为概率分布可能会偏离长期未来。受自然语言处理中句子生成的启发，以自回归的方式分别在3s, 5s和8s生成目标的概率分布。由于目标是分三步进行密集概率估计，因此在模型架构中开发了三个分支。在场景上下文编码中，这三个分支共享子图模块的相同权重，并且具有独立性，例如场景上下文编码中的全局图模块和密集概率估计。通过3s, 5s和8s的目标选择，我们得到了 N^3 目标集。我们根据概率得分对前K个目标集进行排序，然后完成它们以获得K条轨迹。更具体地说，对于每个目标集，我们使用上面的密集目标编码模块来获得3个目标的特征。然后将特征传递给轨迹完成模块，该模块是一个2层MLP. 输出为完整轨迹 [\hat s_1, ..., \hat s_T]。

## 数据集
1.   [Argoverse dataset](https://zhida.zhihu.com/search?content_id=184602494&content_type=Article&match_order=1&q=Argoverse+dataset&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY5NTMsInEiOiJBcmdvdmVyc2UgZGF0YXNldCIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjE4NDYwMjQ5NCwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.KgOIG3MXPPW1SD3-WV5C1fmgztBBNNTC9HxMgcJVFgg&zhida_source=entity)：简介 每条轨迹5s，前2s作为观测，后3s作为标签
2.   in-house behavior prediction dataset： 每条轨迹4s，前1s作为观测，后3s作为标签
## 评价标准

[EvalAI: Evaluating state of the art in AI](https://link.zhihu.com/?target=https%3A//eval.ai/challenge/454/evaluation)
1.   **平均位移误差**：Average displacement error（ADE），每个预测位置和每个真值位置之间的平均欧式距离（L2）差值。在所有预测范围内（over all predicted horizons）。单位是米。
2.   **终点位移误差**：Final displacement error（FDE），终点预测位置和终点真值位置之间的平均L2欧式距离差值。在预测的最后一步中（last predicted step）。单位是米。
3.   **MR(Miss Rate)：**FDE大于2米的轨迹比例。
4.   **K：**为概率最高的轨迹候选数；
5.   **brier-minFDE**的计算方法是在 minFDE 上加了(1-p)^2, p为预测轨迹的概率，考虑了算法预测距离误差和概率的综合考量。

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[DenseTNT-与-Teacher-Forcing|DenseTNT 与 Teacher Forcing]]
[[VectorNet-论文笔记|VectorNet 论文笔记]]
[[Context-Gated-Convolution|Context-Gated Convolution]]
[[HBEns-轨迹预测集成|HBEns 轨迹预测集成]]
[[PointPillars-3D-检测|PointPillars 3D 检测]]
[[Siamese-网络|Siamese 网络]]
[[图注意力网络-GAT|图注意力网络 GAT]]
[[Apollo-5.0-行为预测|Apollo 5.0 行为预测]] — _预测 / Waymo_

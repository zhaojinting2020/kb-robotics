---
title: 图注意力网络 GAT
url: https://zhuanlan.zhihu.com/p/34232818
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:16:25+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# 图注意力网络 GAT

作者：Petar Velickovic, Guillem Cucurull, Arantxa Casanova, Yoshua Bengio来源： ICLR 2018链接： [link](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1710.10903)研究机构：Department of Computer Science and Technology；Centre de Visi´o per Computador, UAB；Montreal Institute for Learning Algorithms源码链接： [source code](https://link.zhihu.com/?target=https%3A//github.com/PetarV-/GAT)

## Introduction

针对图结构数据，本文提出了一种GAT（graph attention networks）网络。该网络使用[masked self-attention](https://zhida.zhihu.com/search?content_id=5882790&content_type=Article&match_order=1&q=masked+self-attention&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY5NzAsInEiOiJtYXNrZWQgc2VsZi1hdHRlbnRpb24iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjo1ODgyNzkwLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.gJZUQWn3nOeiGe7sieqZisULzDNRzGFnWlKAmDN-2p0&zhida_source=entity)层解决了之前基于图卷积（或其近似）的模型所存在的问题。在GAT中，图中的每个节点可以根据邻节点的特征，为其分配不同的权值。GAT的另一个优点在于，无需使用预先构建好的图。因此，GAT可以解决一些基于谱的图神经网络中所具有的问题。实验证明，GAT模型可以有效地适用于（基于图的）归纳学习问题与转导学习问题。

## Definition
*   **归纳学习（Inductive Learning）：**先从训练样本中学习到一定的模式，然后利用其对测试样本进行预测（即首先从特殊到一般，然后再从一般到特殊），这类模型如常见的贝叶斯模型。
*   **转导学习（Transductive Learning）：**先观察特定的训练样本，然后对特定的测试样本做出预测（从特殊到特殊），这类模型如k近邻, SVM等。
## Related Work

在之前的模型中，已经有很多基于神经网络的工作被用于处理图结构的数据。例如，最早的GNN网络（详情见[GNN](https://zhuanlan.zhihu.com/p/28170197)）可以被用于处理有环图, 有向图或无向图。然而，GNN网络本身必须使整个网络达到不动点之后才可以进行计算。针对这一问题，[2]中通过将GRU引入到网络结构中，进一步提出了GGNN网络（详情见[GGNN](https://zhuanlan.zhihu.com/p/28170197)）。后来，人们开始关注将卷积操作引入到图领域中，这一类算法可以被分为谱方法（spectral approaches）与非谱方法（non-spectral approaches）两大类。谱方法是基于对图进行谱表示的一类方法。其上的卷积操作与图拉普拉斯矩阵的特征值分解有关，因此，往往需要进行密集的矩阵运算，而且整个计算并不是局部的。为了解决这一问题，[3]提出了[GCN](https://zhida.zhihu.com/search?content_id=5882790&content_type=Article&match_order=1&q=GCN&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY5NzAsInEiOiJHQ04iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjo1ODgyNzkwLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.MS4-3aowzZN_P-UTCN0E8oPvj3_F8bKo63CP-8J8eFg&zhida_source=entity)网络，该网络可以有效地对节点的一阶邻居进行处理，而且可以避免复杂的矩阵运算。然而，这些模型都依赖于图的结构，因此，在特定图结构上训练得到的模型往往不可以直接被使用到其他图结构上。不同于谱方法，非谱方法是直接在图上（而不是在图的谱上）定义卷积。这类方法的一个挑战在于，如何定义一个可以处理可变大小邻居且共享参数的操作。针对这一问题，在[4]中，作者提出了[MoNet](https://zhida.zhihu.com/search?content_id=5882790&content_type=Article&match_order=1&q=MoNet&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY5NzAsInEiOiJNb05ldCIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjU4ODI3OTAsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.oCOMcz-cqxB0LL7W07WnhQzP-wNiYp0dBGFgeLGEv7c&zhida_source=entity)（mixture model CNN），该方法可以有效地将CNN结构引入到图上。类似地，[5]提出了一种GraphSAGE模型，该模型使用一种归纳的方法来计算节点表示。具体来说，该模型首先从每个节点的邻节点中抽取出固定数量的节点，然后再使用特定的方式来融合这些邻节点的信息（如直接对这些节点的特征向量求平均，或者将其输入到一个RNN中），这一方法已经在很多大型归纳学习问题中取得了很好的效果。在本文中，作者提出了一种基于attention的节点分类网络——GAT. 其基本思想是，根据每个节点在其邻节点上的attention，来对节点表示进行更新。GAT具有以下几个特点：（1）计算速度快，可以在不同的节点上进行并行计算；（2）可以同时对拥有不同度的节点进行处理；（3）可以被直接用于解决归纳学习问题，即可以对从未见过的图结构进行处理。

## Model

### Graph Attentional Layer
首先来介绍单个的graph attentional layer.

单个的 graph attentional layer 的输入是一个节点特征向量集：
![Image 1](https://pic1.zhimg.com/v2-9033aa9b5449288994391041b598afea_1440w.jpg)

<p class="kb-image-caption">图例</p>

其中， a 是一个 \mathbb{R}^{F'}\times\mathbb{R}^{F'}\to\mathbb{R} 的映射， W\in\mathbb{R}^{F'\times F} 是一个权值矩阵（被所有 \vec{h}_{i} 所共享）。一般来说，self-attention会将注意力分配到图中所有的节点上，这种做法显然会丢失结构信息。为了解决这一问题，本文使用了一种masked attention的方式——仅将注意力分配到节点 i 的邻节点集上，即 j\in\mathcal{N}_{i} （在本文中，节点 i 也是 \mathcal{N}_{i} 的一部分）：
![Image 5](https://pica.zhimg.com/v2-20fecd93a7e75b87259a2a5acf5d5004_1440w.jpg)

<p class="kb-image-caption">图例</p>

其中， \vec{a}^{T}\in \mathbb{R}^{2F'} 为前馈神经网络 a 的参数， LeakyReLU 为前馈神经网络的激活函数。此时就可以得到 \vec{h}'_{i} 了：
![Image 7](https://pic3.zhimg.com/v2-abc3784da9b98211f03b51c9187fa106_1440w.jpg)

<p class="kb-image-caption">图例</p>

为了提高模型的拟合能力，在本文中还引入了多抽头的self-attention（如右侧部分。与[《Attention is All You Need》](https://zhuanlan.zhihu.com/p/27464080)一致），即同时使用多个 W^{k} 计算 self-attention, 然后将各个 W^{k} 计算得到的结果合并（连接或求和）：
![Image 8](https://pic3.zhimg.com/v2-f03c04965a6e069f28859499ea4097d0_1440w.jpg)

<p class="kb-image-caption">图例</p>

连接其中， || 表示连接， a_{ij}^{k} 与 W^{k} 表示第 k 个抽头得到的计算结果。由于 W^{k}\in\mathbb{R}^{F'\times F} ，因此这里的 \vec{h}_{i}'\in\mathbb{R}^{KF'} 。同样，可以采取求和的方式来得到 \vec{h}_{i}' ：
![Image 9](https://pic3.zhimg.com/v2-d3a165ce97b7e43fb7b4276757e08ebe_1440w.jpg)

<p class="kb-image-caption">图例</p>
*   **GAT是高效的。**相比于其他图模型，GAT无需使用特征值分解等复杂的矩阵运算。单层GAT的时间复杂度为 O(|V|FF'+|E|F') （与GCN相同）。其中， |V| 与 |E| 分别表示图中节点的数量与边的数量。
*   相比于GCN，每个节点的重要性可以是不同的，因此，GAT具有更强的表示能力。
*   对于图中的所有边，attention机制是共享的。因此GAT也是一种局部模型。也就是说，在使用GAT时，我们无需访问整个图，而只需要访问所关注节点的邻节点即可。这一特点的作用主要有：（1）可以处理有向图（若 j\to i 不存在，仅需忽略 \alpha_{ij} 即可）；（2）可以被直接用于进行归纳学习。
*   最新的归纳学习方法（GraphSAGE）通过从每个节点的邻居中抽取固定数量的节点，从而保证其计算的一致性。这意味着，在执行推断时，我们无法访问所有的邻居。然而，本文所提出的模型是建立在所有邻节点上的，而且无需假设任何节点顺序。
*   GAT可以被看作是MoNet的一个特例。具体来说，可以通过将伪坐标函数（pseudo-coordinate function）设为 u(x, y)=f(x)||f(y) ，其中， f(x) 表示节点 x 的特征， || 表示连接符号；相应的权值函数则变成了 w_{j}(u)=softmax(MLP(u)) 。
## Experiments

本文的实验建立在四个基于图的任务上，这些任务包括三个转导学习（transductive learning）任务以及一个归纳学习（inductive learning）任务。具体如下：

### Transductive Learning
在转导学习任务中，使用了三个标准的引证网络数据集——Cora, Citeseer与[Pubmed](https://zhida.zhihu.com/search?content_id=5882790&content_type=Article&match_order=1&q=Pubmed&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY5NzAsInEiOiJQdWJtZWQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjo1ODgyNzkwLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.A8LIofEFdwaRNoTcOR_fAkef9keuxM5Y5lTovpkW9jc&zhida_source=entity)。在这些数据集中，节点对应于文档，边（无向的）对应于引用关系。节点特征对应于文档的BoW表示。每个节点拥有一个类别标签（在分类时使用softmax激活函数）。每个数据集的详细信息如下表所示：
![Image 10](https://pica.zhimg.com/v2-b0b18a2cf53f26fdcf5ec8e82962659c_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 11](https://picx.zhimg.com/v2-e696cd8ffdf124e5397276c735ed6db1_1440w.jpg)

<p class="kb-image-caption">图例</p>

对于归纳学习，本文使用了一个蛋白质关联数据集（protein-protein interaction, [PPI](https://zhida.zhihu.com/search?content_id=5882790&content_type=Article&match_order=1&q=PPI&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY5NzAsInEiOiJQUEkiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjo1ODgyNzkwLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.X6wcE9EdaSpcgLa-nN6Gmj3L5IN5c5j6GyOMEMhzQPs&zhida_source=entity)），在其中，每张图对应于人类的不同组织。此时，使用20张图进行训练，2张图进行验证，2张图用于测试。每个节点可能的标签数为121个，而且，每个节点可以同时拥有多个标签（在分类时使用sigmoid激活函数）。归纳学习的实验结果如下表所示，可以看到，GAT模型的效果要远远优于其他模型。
![Image 12](https://pic4.zhimg.com/v2-837773a898ae95e49843d5c5ce54f7af_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 13](https://pica.zhimg.com/v2-94e51e85a7cc0b60923991baeeb9beae_1440w.jpg)

<p class="kb-image-caption">图例</p>
*   GAT与GCN有着不同的节点更新方式。GCN使用的是GAT使用self-attention为每个邻节点分配权重，也就是说，GAT的节点更新方式与以下是一个具体的示例。假设有三个节点，每个节点使用二维向量进行表示，则两种网络对应于以上运算。通过对比可以发现，GAT在计算新的节点表示时，相比于GCN，多引入了一个权值矩阵（可以看成将原先的 A 修改成了 A^{new} ）。
## Reference

[1]Veličković P, Cucurull G, Casanova A, et al. [Graph Attention Networks](https://zhida.zhihu.com/search?content_id=5882790&content_type=Article&match_order=1&q=Graph+Attention+Networks&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY5NzAsInEiOiJHcmFwaCBBdHRlbnRpb24gTmV0d29ya3MiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjo1ODgyNzkwLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.QgRweNLe0UEbcRTjz9guOTuOKlz2AglQaTcZpiIwTXY&zhida_source=entity). International Conference on Learning Representations (ICLR), 2018.

[2] Yujia Li, Daniel Tarlow, Marc Brockschmidt, and Richard Zemel. Gated graph sequence neural networks. International Conference on Learning Representations (ICLR), 2016.

[3] Thomas N Kipf and Max Welling. Semi-supervised classification with graph convolutional networks. International Conference on Learning Representations (ICLR), 2017.

[4] Federico Monti, Davide Boscaini, Jonathan Masci, Emanuele Rodol`a, Jan Svoboda, and Michael M Bronstein. Geometric deep learning on graphs and manifolds using mixture model cnns. arXiv preprint arXiv:1611.08402, 2016.

[5] William L Hamilton, Rex Ying, and Jure Leskovec. Inductive representation learning on large graphs. Neural Information Processing Systems (NIPS), 2017.

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[Context-Gated-Convolution|Context-Gated Convolution]]
[[DenseTNT-与-Teacher-Forcing|DenseTNT 与 Teacher Forcing]]
[[HBEns-轨迹预测集成|HBEns 轨迹预测集成]]
[[PointPillars-3D-检测|PointPillars 3D 检测]]
[[Siamese-网络|Siamese 网络]]
[[VectorNet-论文笔记|VectorNet 论文笔记]]
[[VectorNetTNTDenseTNT|VectorNet/TNT/DenseTNT]]
[[Apollo-5.0-行为预测|Apollo 5.0 行为预测]] — _预测 / Waymo_

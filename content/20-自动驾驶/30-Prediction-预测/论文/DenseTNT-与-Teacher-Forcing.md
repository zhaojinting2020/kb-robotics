---
title: DenseTNT 与 Teacher Forcing
url: https://zhuanlan.zhihu.com/p/473702133
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:14:47+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# DenseTNT 与 Teacher Forcing

原文链接：[https://arxiv.org/pdf/2108.0964 0.pdf](https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2108.09640.pdf)本人CSDN：[【笔记】DenseTNT:End-to-end Trajectory Prediction from Dense Goal Sets](https://link.zhihu.com/?target=https%3A//blog.csdn.net/weixin_39397852/article/details/122764880)
**欢迎讨论**

## Abstract

这篇paper是在[TNT](https://link.zhihu.com/?target=https%3A//blog.csdn.net/weixin_39397852/article/details/122758833%3Fspm%3D1001.2014.3001.5502)基础上的改进。TNT的方法是需要预先输入大概的target的，而DenseTNT不需要，是完全anchor free的方法。

## Introduction
![Image 1](https://pic3.zhimg.com/v2-906e289a43265e6f2d82f4a1afd58346_1440w.jpg)

<p class="kb-image-caption">图例</p>

左图的以前的做法是根据lane定义一些anchor再regress和classify获得最终的位置，之后还要通过[NMS](https://zhida.zhihu.com/search?content_id=193398245&content_type=Article&match_order=1&q=NMS&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NjksInEiOiJOTVMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxOTMzOTgyNDUsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.TWgfd5AWGE3KfYVQENwXvhhrPsEKg8GbRF-2VgsqHtQ&zhida_source=entity)的筛选法选出最后的轨迹。右侧的为现在的方法，通过密集地采点避免了定义anchor，同时也避免了使用NMS等规则来筛选。意图中非常重要的一个问题是ground truth只有一个，而对于多意图的预测来说，多个方向的预测都是允许的，这导致了label中有很多都是无效的，因为gt只包含了一个意图下的结果。此处设计了一个offline的model来提供多个意图下的label. 这个model使用了一个优化算法从goal的分布里取出了一个set作为online model的label.

## Method

地图采用vector化后的encode的结果（[VectorNet](https://zhida.zhihu.com/search?content_id=193398245&content_type=Article&match_order=1&q=VectorNet&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NjksInEiOiJWZWN0b3JOZXQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxOTMzOTgyNDUsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.kdClDzE9eklwYZaKq9P892DRLmgsE7Z6EtE_aZq--SI&zhida_source=entity)）。然后用dense goal encoder生成这些goal的概率分布。用这些概率分布获得一个goal set. 在训练过程中使用优化算法制造伪的label.
![Image 2](https://pic4.zhimg.com/v2-ba2e120bf99007857b3216931c16bc67_1440w.jpg)

<p class="kb-image-caption">图例</p>

本文使用VectorNet来提取地图的feature.（没有高精地图的话也可使用CNN）。输出为2D矩阵，每个row表示地图上的元素（lane，agent）的feature.

### Dense goal probability estimation
TNT对于一个goal只预测一条轨迹的概率是有问题的：一个goal只有一条预测（可能通向这个goal的别的预测概率很高），一个goal获取的feature不够丰富（goal附近的点的信息也用上会更好）。我们使用了dense goal encoder. 它以一定的采样频率获取了地图上在道路上的的所有点。然后预测了这些密集点的概率分布。

### Lane scoring

为了减少需要sample的点，我们先预测goal落在不同lane上的概率，这样能过滤掉明显不在candidate lane附近的点，提升运算速度。
![Image 3](https://pic3.zhimg.com/v2-717bf487cab768a475d0100c41087f80_1440w.jpg)

<p class="kb-image-caption">图例</p>

获得概率分布的做法是[self-attention](https://zhida.zhihu.com/search?content_id=193398245&content_type=Article&match_order=1&q=self-attention&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NjksInEiOiJzZWxmLWF0dGVudGlvbiIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjE5MzM5ODI0NSwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.9HEfzYgSI2C2f6PXXgPnj0AfEKheE53a-pvrmFzEQew&zhida_source=entity)。首先agent的feature经过两次MLP. 然后把goal的feature F 作为需要query的的变量，从地图上所有元素（lane，agent）的feature中去查找索引对应的键和值。目的就是建立goal的feature与地图上所有元素的联系。直观上，这一步是把agent的未来状态（goal）表示成由历史的信息作为变量的函数，这个函数采用的是self-attention的做法。
![Image 4](https://pic3.zhimg.com/v2-40c8b5135c3c8e0788dd62176dcf75aa_1440w.jpg)

<p class="kb-image-caption">图例</p>

这一步之后的结果是goal新的feature F. 再通过两次MLP，即下图中的 g(.) .用softmax中的方法获得每个goal的概率。将所有goal在地图上表示出来的话就是一个概率分布heatmap.
![Image 5](https://pic3.zhimg.com/v2-91d975cf749511c57de473ad4eb28ce8_1440w.jpg)

<p class="kb-image-caption">图例</p>

对于多意图的预测，不能像TNT等对预先设定好target采用NMS（靠的近或概率低的过滤掉）。DenseTNT的上一步获得是heatmap，故不能简单使用NMS，因为用于筛选的阈值比较难定。这是因为TNT中采用的是从高到低排序概率，而DenseTNT中的概率分布是针对于整个鸟瞰图的，一旦意图的可能性变多了，平均分布到每一个意图的概率就低了（对于概率分布，所有的点的概率加起来需要为1）。
![Image 7](https://pic1.zhimg.com/v2-509ab35dec5cde50cb4d205e044507ea_1440w.jpg)

<p class="kb-image-caption">图例</p>

因此，我们再加一个预测的任务。它的输入是heatmap，输出是goal set，这个有点像目标检测的框生成。但和目标检测不同，对于一个输入，我们的label只有一个，即gt. 这样的话可能会有别的意图的结果在训练中被忽略。为此，设计了一个offline model来制造这些label. 它和online model的区别就在这一步中。没有使用goal set predictor而是采用了优化算法。
![Image 8](https://pic1.zhimg.com/v2-fede4f86b5b0700e492554f2fb01e0d2_1440w.jpg)

<p class="kb-image-caption">图例</p>

上一步heatmap的输出，实际上是对于地图上众多goal每个点的一个函数。设定 C=\{c_1,c_2,...,c_m\} 为所有dense goal的candidate，heatmap就把 C 映射到一个0到1的的集合，写成 h(c_i)，这也是每个goal的概率。接下来定义一个目标函数E[d(\hat{y},Y)]=\sum_{i=1}^m h(c_i)d(\hat{y},c_i)其中d(\hat{y},c_i)=\min_{y_j\in\hat{y}}||y_j-y_{c_i}||从直观上讲，目标是有M个goal（大池子），要从中选取K个靠谱的goal（小池子）。 d 是针对于大池子的，对于大池子里所有candidate都有一个 d 。这每个candidate都与小池子中的goal计算距离，取最近的作为 d ，即寻找小池子中离candidate最近的点。对于所有的 d ，用概率加权计算期望。总体的话在收敛情况，大池子中的所有goal到距离自己最近的小池子中的goal乘上概率加权应当达到最小。以下是这个优化算法的实现。
![Image 9](https://picx.zhimg.com/v2-bd9e8b6152574a183d2c1b8bbd191b41_1440w.jpg)

<p class="kb-image-caption">图例</p>

模型采用了encode+decode的办法。encoder部分是一层self-attention加上max pooling，decoder部分是2层MLP，输入是heatmap，输出是2K+1个值，分别对应K个2维坐标（goal set）和一个当前goal set的confidence. 考虑到heatmap的概率分布比较散，可以采用N头同时运算。即N个goal set predictor输出N个2K+1的值，从当中选取confidence最高的那个goal set预测。为了运算效率的提升，这N头使用相同的self-attention层，但是不同的2个MLP. 在训练过程中，采用了offline模型的伪label作为监督。上述offline中讲到的初始选定的小池子，在这里采用的是online模型的K个goal的set的预测。然后经过L次随机扰动（即不停随机选取邻居点，L=100），选取当中expected error（offline里的期望项）最小的那个set作为伪label. 标记  \dot{y}​为预测结果， \hat{y} 为伪label，则loss的计算如下。即一一对应后的L1距离之和。
![Image 10](https://pic2.zhimg.com/v2-1206669a686ceb43b2167c6d399c3dc3_1440w.jpg)

<p class="kb-image-caption">图例</p>

再考虑到采用了N头预测，这部分的loss将采用二分类的交叉熵。其中 \mu 为所有head的confidence， \nu 为label，只有expected error最低的label为1，别的为0.
![Image 11](https://picx.zhimg.com/v2-e319a88bfe6327e72578fba7f37af265_1440w.jpg)

<p class="kb-image-caption">图例</p>

这一步和TNT做法类似。类似于dense goal encoding（2层MLP后过self-attention）最后过2层MLP来decode得到整条预测轨迹的state. 采用[teacher forcing](https://zhida.zhihu.com/search?content_id=193398245&content_type=Article&match_order=1&q=teacher+forcing&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NjksInEiOiJ0ZWFjaGVyIGZvcmNpbmciLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxOTMzOTgyNDUsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.SriuOEaRLqzo9PPeGVFStsZX2twZyg-wO6xBeh9KfX0&zhida_source=entity)技巧（因为只有一条gt）训练时只用gt的goal来算这条预测轨迹。Loss的算法和TNT一样，用的是点点之间的Huber loss.
![Image 12](https://pica.zhimg.com/v2-307a13011ead9cbf5e202debe285cc98_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 13](https://pica.zhimg.com/v2-ed229c70aeaa7e19c92d1a8d58be2ffc_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 14](https://pic2.zhimg.com/v2-ba822d5c0518acd98dd67d87394beae3_1440w.jpg)

<p class="kb-image-caption">图例</p>

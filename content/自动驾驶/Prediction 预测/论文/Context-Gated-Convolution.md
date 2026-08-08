---
title: Context-Gated Convolution
url: https://zhuanlan.zhihu.com/p/183879200
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:14:25+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:28:56+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Context-Gated Convolution

论文：[https://arxiv.org/abs/1910.0557 7](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1910.05577)代码：[https://github.com/XudongLinthu/context-gated-convolution](https://link.zhihu.com/?target=https%3A//github.com/XudongLinthu/context-gated-convolution)这是来自哥伦比亚大学和腾讯 AI lab 的工作，也是一种即插即用的模块。论文的动机为：Neurons do change their function according to contexts and task. 但是传统的[CNN](https://zhida.zhihu.com/search?content_id=128995525&content_type=Article&match_order=1&q=CNN&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NTksInEiOiJDTk4iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxMjg5OTU1MjUsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.K_a2W-16NjRNckTkIqPwH9wv_cTssmPOCSrNUszxvgY&zhida_source=entity)并不具有这样的性质。当前也出现了一些方法，作者命名为global feature interaction，如下图所示。这些方法（non-local, SENet, [CBAM](https://zhida.zhihu.com/search?content_id=128995525&content_type=Article&match_order=1&q=CBAM&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NTksInEiOiJDQkFNIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTI4OTk1NTI1LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.ufVxjcUJxs6ejuOLa3byPh_IRTZy9HsNaN8JaA4oc6M&zhida_source=entity)等）考虑到既然卷积层不具有这样的能力，在卷积之前通过 feature interatction 的方式操作。这些方法仍没有办法对卷积核建模做到“changing the structure of correlations over neuronal ensembles”。
![Image 1](https://pic2.zhimg.com/v2-1dca79b14938aab0606fd3bb8fca4c29_1440w.jpg)

<p class="kb-image-caption">图例</p>

作者提出的[Context-Gated Convolution](https://zhida.zhihu.com/search?content_id=128995525&content_type=Article&match_order=1&q=Context-Gated+Convolution&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NTksInEiOiJDb250ZXh0LUdhdGVkIENvbnZvbHV0aW9uIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTI4OTk1NTI1LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.zvqgohTCXPUXAdf0aGftWZuh17En646UDUxaTGgfs4o&zhida_source=entity)，把卷积层当做一个“自适应的处理器”，可以根据图像中的语义信息来调整卷积核的权重。
![Image 2](https://pica.zhimg.com/v2-b94c951498a5c6a145c972d13fec4d62_1440w.jpg)

<p class="kb-image-caption">图例</p>

这个方法实现起来并不容易，因为对于输入feature map 的尺寸为 $\left( c , h , w \right)$ (c, h, w) ， 输出 feature map 的尺寸为 $\left( o , h , w \right)$ (o, h, w) ，这样，卷积参数量就是 $o \times c \times k \times k$ o×c×k×k 。所以，必须把卷积分解为两个： $o \times k \times k$o×k×k 和 $c \times k \times k$c×k×k  。这样来看，还是比较复杂，因此，又进一步借鉴了 [depth-wise separable](https://zhida.zhihu.com/search?content_id=128995525&content_type=Article&match_order=1&q=depth-wise+separable&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NTksInEiOiJkZXB0aC13aXNlIHNlcGFyYWJsZSIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjEyODk5NTUyNSwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.uVe9B0fWb2PlMy33BLi9cK3YR_v9fTeU7F5YiotUneg&zhida_source=entity) 可分离卷积的思想。方法的总体架构如下图所示，包含三个关键模块：context encoding module, [channel interacting module](https://zhida.zhihu.com/search?content_id=128995525&content_type=Article&match_order=1&q=channel+interacting+module&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NTksInEiOiJjaGFubmVsIGludGVyYWN0aW5nIG1vZHVsZSIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjEyODk5NTUyNSwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.9ZgzK9MjkMouF2euMJa_Kt8d8mfywi5iJttPjXtaFZg&zhida_source=entity), 和 gate decoding module.
![Image 3](https://picx.zhimg.com/v2-d32ab2268118e4868f57f652ab946c9d_1440w.jpg)

<p class="kb-image-caption">图例</p>

对于输入为 $c h w$chw 的特征，使用pooling降维成 c h′w′ch′w′ ，转后把 $h \times w$h×w 这个维度转化成一维向量 $d$ 。论文里提到，如果 $d$ 没有定义，就使用 $\left( k \times k \right) / 2$ (k×k)/2 。经过这个模块处理，作出的特征为 $c \times d$c×d 。因为下一步要输出到两个模块，因此，使用了两个独立的BN层。代码如下：

# the context encoding module
self.ce = nn.Linear(ws*ws, num_lat, False) self.ce_bn = nn.BatchNorm1d(in_channels) self.ci_bn2 = nn.BatchNorm1d(in_channels)

# activation function is relu
self.act = nn.ReLU(inplace=True)

## 2, Channel Interaction module
这个模块把输入 c×d 的特征转化为  o×d 的特征。为了保证高效性，这里使用了 grouped FC，代码如下：

# the number of groups in the channel interacting module
if in_channels // 16:
   self.g = 16 else:
  self.g = in_channels

# the channel interacting module
self.ci = nn.Linear(self.g, out_channels // (in_channels // self.g), bias=False) self.ci_bn = nn.BatchNorm1d(out_channels)

## 3, Gate decoding module
这个模块接收两个输入，对于 c×d 的输入，使用FC转化成 c×k×k 的特征； 对于 o×d 输入，使用FC转化成 o×k×k 的特征。然后，两组特征分别沿两个方向复制，得到 o×c×k×k 的特征，然后加一个 sigmoid 函数，实现 gate 操作。代码如下：

# produce gate

out = self.sig(out.view(b, 1, c, self.ks, self.ks) +      oc.view(b, self.oc, 1, self.ks, self.ks))最后，把得到的结果，逐元素点乘的方式与 卷积核 融合。由于在关键的步骤使用了 Grouped FC，所以计算量并没有显著增加，但是因为给卷积核上每个点添加了权重 （注意力机制），性能得到了提升。具体可以参考论文在 ImageNet 和 CIFAR10 上的实验。论文中有一个比较有趣的实验是 feature map 的可视化。在第一列里，可以看到 [ResNet](https://zhida.zhihu.com/search?content_id=128995525&content_type=Article&match_order=1&q=ResNet&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTY4NTksInEiOiJSZXNOZXQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxMjg5OTU1MjUsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.FgNACDd3_TnW8-zzp8qo590DfcH5aytaDL4tqiz06k4&zhida_source=entity) 对于金鱼的捕获不是特别准确，但是 CGC 方法就可以准确的捕获金鱼区域。
![Image 4](https://pic2.zhimg.com/v2-6e95307a8de4816c8a2726fd926cfbad_1440w.jpg)

<p class="kb-image-caption">图例</p>

这是我第一次看到给**卷积核逐点分配权重**，还是比较有意思。Gate decoding module 里，把  c×k×k 的特征和  o×k×k 的特征，分别沿两个方向复制，得到  o×c×k×k 的特征，让我忽然想到了 程明明组的 strip pooling 。不过， strip pooling 仍然是给 feature map 分配权重，这个工作是给卷积核分配权重。

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[DenseTNT-与-Teacher-Forcing|DenseTNT 与 Teacher Forcing]]
[[HBEns-轨迹预测集成|HBEns 轨迹预测集成]]
[[PointPillars-3D-检测|PointPillars 3D 检测]]
[[Siamese-网络|Siamese 网络]]
[[VectorNet-论文笔记|VectorNet 论文笔记]]
[[VectorNetTNTDenseTNT|VectorNet/TNT/DenseTNT]]
[[图注意力网络-GAT|图注意力网络 GAT]]
[[Apollo-5.0-行为预测|Apollo 5.0 行为预测]] — _预测 / Waymo_

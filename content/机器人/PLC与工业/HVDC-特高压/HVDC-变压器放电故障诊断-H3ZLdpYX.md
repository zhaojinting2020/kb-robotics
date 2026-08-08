---
title: HVDC 变压器放电故障诊断
url: https://my.feishu.cn/docx/H3ZLdpYXZoOLREx3ZFXcSEvNnag
quality: raw
fetch_source: feishu:cli
fetched_at: 2026-06-27 20:42:47+00:00
feishu_formatted_at: 2026-06-28 07:15:37+00:00
wikilinks_repaired_at: 2026-06-27 20:42:47+00:00
wikilinks_unbulleted_at: 2026-06-28 05:48:28+00:00
custom-width: 78
---

# 引言（Introduction）

换流变压器是高压直流输电系统的“大心脏”，负责把交流电和直流电互相“转换运输”。它一旦出问题，轻则停电，重则影响整个电网的安全。近些年，随着特高压工程越来越大, 越来越复杂，换流变压器的稳定性要求也越来越高。其中最危险的一种故障叫“突发性放电”，它就像设备内部突然打了一道强闪电，来得快, 能量大, 破坏力强，还很难提前预警，一旦发生可能直接导致绝缘击穿, 绕组变形甚至爆炸。传统的监测系统往往等它已经造成损伤才发现，防不胜防。要想提前发现这种危险，必须盯住它的“前兆”——而局部放电就是其中一个重要信号。在电力系统中，绝缘层就像是设备的“护甲”。一旦护甲出现细小裂缝，里面的电场就可能发生“微型闪电”——这就是局部放电产生的原因。别看它很小，却往往是设备绝缘劣化, 甚至故障爆发的前兆。早期发现和识别 PD，就像医生通过 X 光片找到骨裂，可以在设备出大问题之前提前“做手术”。过去，工程师们主要靠**经验和传统算法**来判断 PD 信号的来源，比如先手动提取一些特征值，再用支持向量机等模型去分类。但这种方法不仅费时，还容易漏掉关键信息。随着人工智能特别是**神经网络**的发展，我们有了新的“侦探工具”——它们可以直接从信号的波形, 图像或频谱里自动学习特征，识别不同类型的放电，就像人脸识别一样精准。根据测量方式的不同，PD 信号可以画成“相位分辨放电图”（PRPD）, 做成“声音一样的频谱图”，或者直接分析单个放电脉冲。针对这些不同“形态”的数据，研究人员尝试了各种神经网络：**卷积神经网络（CNN）**善于看图，**循环神经网络（LSTM）**擅长分析时间序列，还有把两者结合的混合结构，能同时抓住空间和时间特征。实验室里，这些方法的准确率有时能超过 95%，比传统方法更快, 更准。不过，要让它们在真实电网里同样出色，还有一些难关要过：现场数据太少, 不同设备的数据差异大, 模型需要更轻便, 更易解释。未来，结合更多真实工况数据, 找到最合适的数据表达方式，并让模型变得又聪明又好理解，将是让神经网络在 PD 检测中大显身手的关键。

## 局放的测量与表示

局部放电是一种窄而快的脉冲，在实际应用中，PD 数据通常通过以下传感器采集：

- UHF（超高频）传感器：检测超高频电磁波，适用于空隙放电检测。

不同类型 PD 在 PRPD 图谱中放电点的分布差异很大。这种分布差异可以被转换为**像素空间分布特征**，从而能够被卷积神经网络（CNN）处理, 提取和用于模式识别。

## 模型选择

使用机器学习的方法来检测局部放电一般分为传统机器学习方法和基于深度学习的方法。传统方法需要先手动提取一些特征值，再用机器学习模型去分类。特征提取的方法需要大量的人工和专业知识，如：

- **统计参数分析**：从“相分辨局部放电（PRPD）模式”中计算出偏度, 峰度, 均值, 方差和互相关等统计参数。
- **图像处理工具**：对PRPD图像应用纹理分析, 分形特征, 小波图像分解等算法来提取特征。
- **信号处理工具**：通过傅里叶级数分析, 哈尔（Haar）和小波变换等方法，从时域表示中获取特征。以及其他如PCA等降维方法。分类的机器学习模型一般使用支持向量机（SVM），随机森林（Random Forest）和KNN等。用传统机器学习做局部放电检测，优点是实现简单, 计算快, 对小样本友好且容易解释；缺点是高度依赖人工特征，泛化能力弱，难以应对复杂噪声和挖掘深层次信号特征。基于此，现在多采用深度学习的方式来做局部放电检测，主要技术路线有：

- **卷积神经网络（CNN）**：从频谱图像或者PRPD图像中自动提取特征。
- **循环神经网络（RNN）, LSTM**：直接处理从传感器获得的原始时间序列信号，抓时间上的依赖关系。
- **自编码器（Autoencoder）**：做无监督异常检测，不依赖标签, 可发现新型异常。
- **混合模型**：结合CNN和RNN，提取空间和时间特征，更全面。

CNN被用于局放检测的实例包括：

使用经典的 CNN 模型 LeNet-5 被用作分类器，对PRPD频谱进行分类，来识别不同的局部放电。使用MobileNet在保持较好精度的同时，获得更快的推理速度，并显著降低内存占用和算力需求。

## 模型评估指标

在分类问题中，我们通常将希望预测为正的样本称为正样本（Positive），不希望预测为正的样本称为负样本（Negative）。结合模型的预测结果，样本可分为四类：

- **TP（True Positive）**：实际为正样本，且预测为正样本
- **TN（True Negative）**：实际为负样本，且预测为负样本
- **FP（False Positive）**：实际为负样本，但预测为正样本
- **FN（False Negative）**：实际为正样本，但预测为负样本

- 总样本数 = TP + TN + FP + FN
- 实际正样本数 = TP + FN
- 实际负样本数 = TN + FP
- 预测为正样本数 = TP + FP
- 预测为负样本数 = TN + FN

分类或者多分类任务的评测指标主要为 Accuracy，Precision， Recall， F1 Score， AUC-ROC 和 Confusion matrix.

- 准确率（Accuracy） 表示正确预测占样本总数的比例

= 正确预测数 / 总样本数 = （TP+TN）/ （TP + TN + FP + FN）

- 精确率（Precision）表示预测为正的样本中，有多少是真正的正。

= TP / (TP + FP)

- 召回率（Recall）表示所有正样本中，有多少被正确预测了出来。

= TP /（TP + FN）

- F1 Score 表示精确率和召回率的调和平均，综合评价。

= 2 \* (Precision \* Recall) / (Precision + Recall)

- **ROC曲线下面积（AUC-ROC）**评价模型在各种阈值下的表现。越接近1越好。

[Understanding and Localization of Partial Discharge by Numerical Analysis of Acoustic Emission](https://scialert.net/fulltext/?doi=ajsr.2019.384.389)

[https://www.qualitrolcorp.com/wp-content/uploads/2020/10/Online-Parti...](https://www.qualitrolcorp.com/wp-content/uploads/2020/10/Online-Partial-Discharge-Monitoring-and-Discharge-Localization-on-Transformers-by-means-of-UHF-Method.pdf)

[https://www.ieh.uni-stuttgart.de/dokumente/publikationen/2016_Siegel_...](https://www.ieh.uni-stuttgart.de/dokumente/publikationen/2016_Siegel_Beltle_Partial_Discharge_Monitoring_of_Power_Transformers_by_UHF_Sensors.pdf)

[https://www.sciencedirect.com/science/article/pii/S2352484722023046](https://www.sciencedirect.com/science/article/pii/S2352484722023046)

[GIS partial discharge pattern recognition via deep convolutional neural network under complex data s](https://ieeexplore.ieee.org/abstract/document/8341662)

[https://arxiv.org/pdf/1801.04381](https://arxiv.org/pdf/1801.04381)

[https://zhuanlan.zhihu.com/p/695082100](https://zhuanlan.zhihu.com/p/695082100)

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[机器人/PLC与工业/ViGET-许继与DPS/DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]] — _PLC / 工业_
[[PLC-基础理论教程-BbIQdZZp|PLC 基础理论教程]] — _PLC / 工业_
[[Profinet-Driver-架构(UfY6)-UfY6dCEK|Profinet Driver 架构（UfY6）]] — _PLC / 工业_
[[SIMATIC-D7-FB-Gen-说明-ZTkwd4rd|SIMATIC D7 FB-Gen 说明]] — _PLC / 工业_
[[ViGET-Turbo-测试报告-YvCvdNRS|ViGET Turbo 测试报告]] — _PLC / 工业_
[[VxWorks-Workbench-培训资料-VlKAdIBn|VxWorks Workbench 培训资料]] — _PLC / 工业_
[[plcopen-库结构-Xgc9dSPl|plcopen 库结构]] — _PLC / 工业_

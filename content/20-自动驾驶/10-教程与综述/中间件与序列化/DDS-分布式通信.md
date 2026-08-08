---
title: DDS 分布式通信
url: https://zhuanlan.zhihu.com/p/192981171
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T20:16:23+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# DDS 分布式通信

近期，在汽车通信圈讨论较火的话题中，DDS绝对排得上号。而对于面向服务的通信协议，DDS与[SOME/IP](https://zhida.zhihu.com/search?content_id=131018066&content_type=Article&match_order=1&q=SOME%2FIP&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxNzAsInEiOiJTT01FL0lQIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTMxMDE4MDY2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.xu4zzcmfiVlEPBskv-2efTfpeXYptvdn_sMkZhWKIls&zhida_source=entity)各自的优劣？DDS能否替换SOME/IP等问题也随之而来。孰优孰劣，今天暂且不探讨这些问题，我们先来了解下什么是DDS？
**DDS定义：**Data Distribution Service 数据分发服务，是新一代分布式实时通信中间件协议，采用发布/订阅体系架构，强调以数据为中心，提供丰富的QoS服务质量策略，以保障数据进行实时, 高效, 灵活地分发，可满足各种分布式实时通信应用需求。

DDS最早应用在美国海军系统，用于解决军舰系统复杂网络环境中大量软件升级的兼容性问题。在汽车领域，2018年[Adaptive AUTOSAR](https://zhida.zhihu.com/search?content_id=131018066&content_type=Article&match_order=1&q=Adaptive+AUTOSAR&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxNzAsInEiOiJBZGFwdGl2ZSBBVVRPU0FSIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTMxMDE4MDY2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.t2CwXP1wcusJu-rdPYyKdx38NNgodcBx6lPKFlHF5d4&zhida_source=entity)引用了DDS，作为可选择的通信方式之一。目前国内已有主机厂开始研究，主要针对自动驾驶相关需求，工具方面，在汽车电子领域常用的工具厂商也在开发这部分内容。不仅是汽车领域引入DDS，在机器人开发领域，最新升级的[ROS2](https://zhida.zhihu.com/search?content_id=131018066&content_type=Article&match_order=1&q=ROS2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxNzAsInEiOiJST1MyIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTMxMDE4MDY2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.-a21i1rJc2h2P3ihqJJefuVp2h5zBvZEnCt4mWJW2Dg&zhida_source=entity)也引入了DDS中间件来传递信息。
![Image 1](https://picx.zhimg.com/v2-d2431c54f1be2d137761855f7539c72b_1440w.jpg)

<p class="kb-image-caption">图例</p>

DDS规范是由OMG（Object Management Group）对象管理组织发布的。OMG组织是一个国际性, 开放性, 非盈利性技术标准联盟，由供应商, 终端用户, 学术机构, 政府机构推动，已经有31年的历史；OMG工作组针对各种技术和行业制定企业集成标准，并开发可为数千个垂直行业提供现实价值的技术标准。
![Image 2](https://pic2.zhimg.com/v2-4fb83977712da1375facdcccd490abbb_1440w.jpg)

<p class="kb-image-caption">图例</p>

DDS的相关标准包括核心协议(DDSI-RTPS，[DDS-XTypes](https://zhida.zhihu.com/search?content_id=131018066&content_type=Article&match_order=1&q=DDS-XTypes&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxNzAsInEiOiJERFMtWFR5cGVzIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTMxMDE4MDY2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.a5SL-wGcyMOCNs_JeD2_MwZuH22aGc_OWqclnnzwTBI&zhida_source=entity)，DDS-Security，Interface Definition Language (IDL)…)，API(DDS C++ API，DDS Java API)，拓展协议(DDS-RPC，DDS-XML…)等13份协议集合。在分布式系统中，DDS位于操作系统和应用程序之间，支持多种编程语言以及多种底层协议。这便是我们常说的跨平台。
![Image 3](https://pic3.zhimg.com/v2-83ec29d3d590582cb8d07f8ca1a8a4fa_1440w.jpg)

<p class="kb-image-caption">图例</p>
## DDS发布订阅模型[DCPS](https://zhida.zhihu.com/search?content_id=131018066&content_type=Article&match_order=1&q=DCPS&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxNzAsInEiOiJEQ1BTIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTMxMDE4MDY2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.qEFbMszkd7pH-YkccZHrD-NeSVjCMXx47Qbz0VAC6JM&zhida_source=entity)
讲具体协议之前，我们先熟悉下几个专有名词：
*   **Domain：**代表一个通信平面，由Domain ID唯一标识，只有在同一个域内的通信实体才可以通信；如果考虑车内通信，可以只划分1个Domain，也可以按照交互规则或其他规则，定义多个Domain；
*   **Domain Participant：**代表域内通信的应用程序的本地成员身份，简单来说，就是说明同一数据域内的通信成员；
*   **Topic：**是数据的抽象概念，由TopicName标识，关联相应数据的数据类型(DataType)，如果把车内所涉及的所有Topic集合在一起，这样就形成一个虚拟的全局数据空间“Global Data Space”，进一步弱化了节点的概念，所以域参与者已经不是节点的概念了；
*   **DataWriter：**数据写入者，类似缓存，把需要发布的主题数据从应用层写入到DataWriter中；
*   **DataReader：**数据读取者，同样可以理解为一种缓存，从订阅者得到主题数据，随之传给应用层；
*   **Publisher：**发布者，发布主题数据，至少与1个DataWriter关联，通过调用DataWriter的相关函数将数据发出去；
*   **Subscriber：**订阅者，订阅主题数据，至少与1个DataReader关联。当数据到达时，应用程序可能忙于执行其他操作或应用程序只是等待该消息时，这样就会存在两种情况，同步访问和异步通知。接下来，我们看一下DDS的通信模型。根据前面介绍，我们清楚了DDS是一个以数据为中心的中间件协议和API标准，意为用户只关心自己想要的数据，数据通过Topic进行标识，这样发布者根据主题发布数据，订阅者根据自己感兴趣的主题订阅数据。这便是DDS的核心，以数据为中心的发布-订阅模型DCPS（Data-Centric Publish-Subscribe）
![Image 4](https://pica.zhimg.com/v2-ff84b83ecac6b84f96d3631827080188_1440w.jpg)

<p class="kb-image-caption">图例</p>

如果是熟悉的以服务为中心的SOME/IP中间件，我们需要做的是把数据打包成服务，之后服务的消费方向服务提供方通过SD订阅服务中的事件组，当数据发生变化后，相应的事件报文便会发到总线上。相比之下，DDS确实很直接，直接与数据沟通。

## QoS服务质量

DDS的另一重要的知识点是支持QoS(Quality of Service)，目前共支持22种QoS策略，每种策略都可以应用在不同的角色上，而针对同一角色，可单独使用一种QoS，也可以组合使用多种QoS策略。试想一下，QoS应该如何应用呢？具体能起到什么作用？
![Image 5](https://pic4.zhimg.com/v2-f3ff615f94b54c2b584d48ad6661e45f_1440w.jpg)

<p class="kb-image-caption">图例</p>
![Image 6: 动图封面](https://pic3.zhimg.com/v2-99a0e45ef9ac2f87589248a7bc2824b4_b.jpg)

<p class="kb-image-caption">图例</p>

Kind = RELIABLE ，如果当网络发生错误， DataReader可能无法收到DataWriter的样本数据时，会对样本数据进行重发，保证DataReader能够收到数据；
Kind = BEST_EFFORT，如果当网络发生错误， DataWriter不会重新发送丢失的样本数据，这样，无法保证DataReader能够收到数据；
如果在DataWriter上应用此QoS策略，设置Kind = RELIABLE，这样保证了DataWriter发布的数据都能被DataReader收到。
![Image 7](https://pic2.zhimg.com/v2-1398aeb5e9d7367a54ddb8aca4d4ed81_1440w.jpg)

<p class="kb-image-caption">图例</p>

该QoS的作用是避免交付“过期”的数据，参数为时间duration，默认为无穷大，表示数据样本永远不会失效；如果duration设置为有限数值，同时发送方和接收方的时钟同步，通过在发送端的源时间戳添加定义的duration字段，这样接收方根据时间戳信息计算出数据是否已失效，如果失效了，可以直接删除数据。以上是对DDS的介绍。总结起来，DDS更针对的是数据本身，去建立各种机制。DDS目前已经广泛应用于国防, 民航, 工业控制等领域，成为分布式实时系统中数据发布/订阅的标准解决方案。想了解更多关于DDS的内容，请持续关注我们呦！
* * *

喜欢此篇文章欢迎**赞同, 评论, 收藏, 分享**支持小编~
更多技术干货，行业前沿动态，请关注**上海怿星科技官方公众号：**[怿星科技eplanet](https://link.zhihu.com/?target=https%3A//page.ma.scrmtech.com/cyy-form/index%3Fpf_uid%3D31541_2142%26id%3D14292%26main_id%3D31541%26wx_id%3D2142%26channel%3D30443)
_其它平台官方账号：_
**CSDN：**[怿星科技的博客_CSDN博客](https://link.zhihu.com/?target=https%3A//blog.csdn.net/m0_47334080%3Fspm%3D1019.2139.3001.5343)
**Bilibili：**[哔哩哔哩 ( ゜- ゜)つロ 乾杯~ Bilibili——各种教学视频任你学习！](https://link.zhihu.com/?target=https%3A//space.bilibili.com/1552339393%3Fspm_id_from%3D333.1007.0.0)

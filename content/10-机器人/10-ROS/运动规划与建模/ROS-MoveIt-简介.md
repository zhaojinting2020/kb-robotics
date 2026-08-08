---
title: ROS MoveIt 简介
url: https://zhuanlan.zhihu.com/p/77395375
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T17:36:29+00:00'
polished_at: '2026-06-27T18:51:38+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# ROS MoveIt 简介

> **作者：张新宇**
>

> **编辑：胡春旭**
>

> **原文链接：**[ROS史话36篇 | 27. ROS之MoveIt!](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/A6z29xOClUzYVSa0rC6xow)

MoveIt! 第一次看到这个名字可能会觉得很奇怪，名字是怎么来的，怎么还有一个感叹号？如果大家了解一个专门负责抓取的软件叫[GraspIt!](https://zhida.zhihu.com/search?content_id=105328738&content_type=Article&match_order=1&q=GraspIt%21&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTQ1NzksInEiOiJHcmFzcEl0ISIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjEwNTMyODczOCwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.M-S-5nqCTWmzR5bUoQnTRWaGeNrxT8T-NQpQV9xPLBs&zhida_source=entity)，就不会觉得特别奇怪了。

MoveIt!源于ROS的机械臂导航（arm_navigation）软件包，但是MoveIt!的创始团队希望等做更多的东西，不仅仅是用于机械臂。他们期待能**将一个物体从一个地方个移动到另一个地方**，看到GraspIt!这样一个大家熟知的软件，就参考这种命名方法，称为MoveIt!。

MoveIt!最早是用于柳树车库的内容项目[PR2](https://zhida.zhihu.com/search?content_id=105328738&content_type=Article&match_order=1&q=PR2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTQ1NzksInEiOiJQUjIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxMDUzMjg3MzgsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.bJHZnD_z-uicCzslusRKsV_sW68BAeDanSPCBfnCIPY&zhida_source=entity)上，可以让PR2在一份复杂环境中运动，比如可以从冰箱里取出物体，从一个地方拿到另外一个地方。随着功能的完善，MoveIt!一跃成为在工业机器人（主要是机械臂）上最广泛使用的开源操作软件，截止2018年，已经有超过65种机器人使用MoveeIt!进行仿真。国内，大家熟知的**胡春旭（网名，古月）**所在的公司就是使用MoveIt!来仿真，并且控制机械臂来“泡功夫茶”。
![Image 1](https://pic1.zhimg.com/v2-bc7e3d00d16d0bf71d1208275102a702_1440w.jpg)

<p class="kb-image-caption">图例</p>

德国FRANKA EMIKA协作机器人，深圳星河智能科技有限公司展示的“泡功夫茶”机器人传统的工业机器人是预先编程好的，并不能感知周围环境的变化，自然也不能随着环境的变化进行智能的调整运动。现在一个大趋势是，越来越多机器人需要跟工人协同工作，他们跟工人离得非常近，共享同一个工作空间，共同完成一项任务。
**自动驾驶可能是机器人与人类协同工作最好的例子。**在拥挤的街道和高速公路上，行驶中的自动驾驶汽车（如果把他也归类为机器人话）除了与其他车辆共享空间，还必须与行人, 自行车共享空间，相当于协同工作。家庭服务机器人面临的环境更为复杂，凌乱的家居，椅子横七竖八，走到哪里都有障碍物，家庭成员进进出出，不断闯入机器人的领地，动态改变机器人的工作空间。在这样复杂环境中运动的机器人，必须清楚其周围环境，必须避免周围的任何障碍物，必须避免家庭成员发生碰撞。从最早的arm_navigation到后来的MoveIt!都是构建在ROS整个框架下的软件包，专门负责处理上面描述那些问题。MoveIt!的前身arm_navigation软件包专为PR2设计的，负责PR2手臂的运动规划，生成运动轨迹。利用MoveIt!提供的功能，机器人还可以使用三维视觉系统，结合其他传感器，理解周围的环境，并对其进行建模，即用计算机能理解的一种方式进行表达。
**MoveIt!可以生成一套算法，让机器人在这样复杂的环境中进行运动规划，从一个地点安全的到达另外一个地点。**MoveIt!可以实时的监控机器人周围的环境，反馈给运动规划系统。机器人再根据这些变化，进行动态的调整。

MoveIt!将arm_navigation软件包的核心算法从ROS中分离出来，重新封装。MoveIt!降低了对ROS的依赖，代码的复用效率更高。MoveIt!还提供了配置文件和配置界面，让初学者可以快速的上手使用。资深开发人员，还可以将自己的算法直接集成到MoveIt!里，不需要依赖庞大的ROS系统。比如，当时还是美国北卡大学教堂山分校博士生的潘佳，就将自己开发**FCL（Flexible Colllision Labrary）**集成到MoveIt!里，为运动规划提供快速, 高效的碰撞检测算法。
![Image 2](https://pic1.zhimg.com/v2-8cda155c78c1b5a09c1d6b0e38dcf6cc_1440w.jpg)

<p class="kb-image-caption">图例</p>

MoveIt!的创始团队萨钦·启德（SachinChitta），伊万·苏坎（Ioan Sucan），吉尔·琼斯（Gil E. Jones），内森·普利（Thathan Pooley，昵称坚果），苏阿特·戈迪克里（SuatGedikli），戴夫·赫什博格（DaveHershberger）启德领导MoveIt!开发，后来创建了[Kinema 系统公司](https://zhida.zhihu.com/search?content_id=105328738&content_type=Article&match_order=1&q=Kinema+%E7%B3%BB%E7%BB%9F%E5%85%AC%E5%8F%B8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTQ1NzksInEiOiJLaW5lbWEg57O757uf5YWs5Y-4IiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTA1MzI4NzM4LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.4PhYAkurzblBmtM6r10jilLH6dBum52g2ZZDc2nsj8Q&zhida_source=entity)，**世界上第一个将深度学习和3D视觉解决方案用于工业机器人搬运，致力于为物流和制造业构建基于深度学习和三维视觉的机器人解决方案。**2018年，Kinema 系统公司还获得NVIDIA 初创加速计划挑战赛的资助。
![Image 3](https://pic3.zhimg.com/v2-dc9ad9069aa9997eca8634466807a750_1440w.jpg)

<p class="kb-image-caption">图例</p>

苏坎来自德国，毕业于不莱梅的雅克布大学，后来到美国，在莱斯大学获得博士学位。他的导师是莉迪娅·卡娃凯（LydiaKavraki），就是**高维PRM算法**（Probabilistic roadmaps for pathplanning in high-dimensional configuration spaces，1996）的第一作者。卡娃凯出生于希腊，后来在美国求学，卡娃凯导师是斯坦福大学人工智能实验室的让-克劳德·拉脱姆比（Jean-Claude Latombe）。在机器人领域，女性科学家比较少，能取得相当成就的就更少。卡娃凯在机器人运动规划领域的贡献，2002年，她被《麻省理工学院科技评论》杂志评选为**35岁以下杰出青年创新人物**。这篇运动规划的经典文章也成为机器人领域的最重要的文献之一。其实，PRM最早是由荷兰科学家马克·奥维马斯（MarkOvermars）提出来的，很快被在斯坦福读书的卡娃凯关注。这样才有他们共同合作的这篇经典文章。卡娃凯后来在莱斯大学任教，将自己的实验室命名为“卡娃凯实验”，这种命名方式在日本非常普遍，在美国则显得非常另类。苏坎就在“卡娃凯实验”做研究，参与开发一个非常重要的运动规划软件库，**OMPL（Open Motion Planning Library）**。这是一个基于概率的运动规划软件，由马克·摩尔（Mark Moll）领导开发。正是由于OMPL的工作，苏坎读书期间就到柳树车库参加PR2机器人的开发，后来成为MoveiIt!重要成员。
![Image 4](https://pic2.zhimg.com/v2-999d681834ed9b88a134a6c13b2ea3f7_1440w.jpg)

<p class="kb-image-caption">图例</p>

**吉尔·琼斯毕业于卡耐基梅隆大学**，获机器人方向博士学位，**毕业后加入柳树车库**。在柳树车库企业孵化项目中，琼斯作为联合创始人与埃坦•马德-爱泼斯坦一起创建了[hiDOF](https://zhida.zhihu.com/search?content_id=105328738&content_type=Article&match_order=1&q=hiDOF&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTQ1NzksInEiOiJoaURPRiIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjEwNTMyODczOCwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.9s80kQEis1s4ODlz2MRm5AKP2N3yArlyumuvZP_kJ38&zhida_source=entity)。hiDOF是一家从事机器人和自动化软件的咨询公司，2013被Google收购。被Google收购后，琼斯和爱泼斯坦一起加入谷歌，组建了谷歌Tango组。借助[Tango相机](https://zhida.zhihu.com/search?content_id=105328738&content_type=Article&match_order=1&q=Tango%E7%9B%B8%E6%9C%BA&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NTQ1NzksInEiOiJUYW5nb-ebuOacuiIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjEwNTMyODczOCwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.T6xJFkVonERMPiW43luMHfPKGoYfwZZxtN5nyAAXnIc&zhida_source=entity)，移动设备可以获得大量视野范围内物体有关的信息，从而可以测量距离, 识别物体, 创建物体的三维模型, 绘制现场环境的地图。琼斯一直在谷歌工作。
**普利现在谷歌工作。**
**苏阿特·戈迪克里来自德国**，受到柳树车库伟大愿景的召唤，加入该组织。后加入车库孵化的公司Open Perception. 最近又**创建了数据分析公司——CapeAnalytics**，从事数据分析工作。
**赫什博格加入了启德创建的Kinema系统公司**，负责机器视觉相关的软件开发。
> **古月居注**

> 张老师在文中Q到了古月君，功夫手机器人中的运动规划正是基于MoveIt!实现的！

**推荐阅读**

[ROS史话36篇 | 26. ROS驱动DARPA挑战赛](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzIyMzkxODg0Mw%3D%3D%26mid%3D2247485999%26idx%3D1%26sn%3Db2fd3719fa373f7718fdad6d14d054e9%26chksm%3De817a5bbdf602cadfd358f63175beb3326a7901c0eff0febb1e53062dc98793bed6c7cb8a597%26scene%3D21%23wechat_redirect) [ROS史话36篇 | 25. ROS之皆大欢喜（Player与Stage）](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzIyMzkxODg0Mw%3D%3D%26mid%3D2247485937%26idx%3D1%26sn%3D3bd2309032d2db841ba48e8edb159bb3%26chksm%3De817a665df602f73293c100089eacf94d46bbdb5edf5572942f7aee4f83091c20886108d47c7%26scene%3D21%23wechat_redirect) [ROS史话36篇 | 24. ROS之编译系统](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzIyMzkxODg0Mw%3D%3D%26mid%3D2247485936%26idx%3D1%26sn%3Dcf06baee2f3b62bb65a9c9b38f22f758%26chksm%3De817a664df602f72694139f50e922c9c770a82e231ab2506c534185bd38b8c91da8b8cdc8cbc%26scene%3D21%23wechat_redirect) [ROS史话36篇 | 23. ROS之Gazebo](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzIyMzkxODg0Mw%3D%3D%26mid%3D2247485910%26idx%3D1%26sn%3D49aaeecf187da98fcff67fb118cbe66a%26chksm%3De817a642df602f5439b4776d0dee6b74cbf75dd1d682eace754ba51545c6fc65ca58b418fe0c%26scene%3D21%23wechat_redirect)

更多内容欢迎关注：
微信公众号：**古月居** (guyue_home)新浪微博：**[古月春旭](https://link.zhihu.com/?target=https%3A//weibo.com/hcx196)**知乎专栏：**[古月居](https://zhuanlan.zhihu.com/guyuehome)**或访问**古月居网站**：

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[URDF-建模与-xacro|URDF 建模与 xacro]]
[[位置姿态与坐标变换|位置姿态与坐标变换]] — _运动学 / 坐标 / 轨迹_
[[四元数理解|四元数理解]] — _运动学 / 坐标 / 轨迹_
[[机器臂运动学-A311dGJI|机器臂运动学]] — _运动学 / 坐标 / 轨迹_
[[机械臂轨迹规划-LVG3dyAF|机械臂轨迹规划]] — _运动学 / 坐标 / 轨迹_
[[运动控制入门指南-CfHMdigQ|运动控制入门指南]] — _运动学 / 坐标 / 轨迹_
[[逆向运动学求解|逆向运动学求解]] — _运动学 / 坐标 / 轨迹_

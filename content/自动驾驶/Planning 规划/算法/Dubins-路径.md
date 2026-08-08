---
title: Dubins 路径
url: https://zhuanlan.zhihu.com/p/120272035
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T20:19:46+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Dubins 路径

## 1, [Simple Car模型](https://zhida.zhihu.com/search?content_id=114857498&content_type=Article&match_order=1&q=Simple+Car%E6%A8%A1%E5%9E%8B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQzNzYsInEiOiJTaW1wbGUgQ2Fy5qih5Z6LIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTE0ODU3NDk4LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.Kya8qsTRWvEL3pO37y5DG4eLOb5qfrGCb-fis7c9DQQ&zhida_source=entity)
如下图所示，Simple Car模型是一个表达车辆运动的简易模型。Simple Car模型将车辆看做平面上的刚体运动，刚体的原点位于车辆后轮的中心；x轴沿着车辆主轴方向，与车辆运动方向相同；车辆在任意一个时刻的姿态可以表述为(x, y, \theta). 车辆的运动速度为s；方向盘的转角为\phi，它与前轮的转角相同；前轮和后轮中心的距离为L；如果方向角的转角固定，车辆会在原地转圈，转圈的半径为\rho.
![Image 1](https://pic1.zhimg.com/v2-d763af0d8ba6bc3f8defbbf180dd19d6_1440w.jpg)

<p class="kb-image-caption">图例</p>

至此得到了车辆的运动模型([Motion Model](https://zhida.zhihu.com/search?content_id=114857498&content_type=Article&match_order=1&q=Motion+Model&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQzNzYsInEiOiJNb3Rpb24gTW9kZWwiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxMTQ4NTc0OTgsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.VClBsBrDZDyAQQOU9vIQsfPo-PiojFlMomi1dmB6Jzw&zhida_source=entity)). 然后引入[Action变量](https://zhida.zhihu.com/search?content_id=114857498&content_type=Article&match_order=1&q=Action%E5%8F%98%E9%87%8F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQzNzYsInEiOiJBY3Rpb27lj5jph48iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxMTQ4NTc0OTgsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.tBKldsKFrBwAYUgkFycdtfa722eFN5AaWAOZXkBfeek&zhida_source=entity)，假设车辆运动速度s和方向盘转角\phi 由Action变量 u_s 和 u_{\phi}指定，得到：
\dot{x} = u_s cos{\theta}
\dot{y} = u_s sin{\theta}
\dot{\theta} = \frac{u_s}{L} tan{\phi}
假设车辆按照常量速度运行: \mu_s=1，最大转向角度为\phi_{max}，最小转弯半径\rho_{min}，起点为 q_I， 终点为 q_G，我们目标是求解从起 q_I 点到终点 q_G 的最短行驶距离。求解最短距离的过程就是优化如下[Cost](https://zhida.zhihu.com/search?content_id=114857498&content_type=Article&match_order=1&q=Cost&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQzNzYsInEiOiJDb3N0IiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTE0ODU3NDk4LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.YNLngN2FVN362fiIKB_VWPciuH-8pTp5jo7Q-bR9q18&zhida_source=entity)的过程。

L(\widetilde{q}, \widetilde{u}) = \int^{t_F}_{0} \sqrt{\dot{x}^2(t) + \dot{y}^2(t)} dt \tag{12}
t_F 是到达 q_G 所需的时间，q=(x, y, \theta)，当 q_G 不可达时，L(\widetilde{q}, \widetilde{u}) = \infty. 由于速度 u_s 是恒定的，根据前面提到的车辆的运动模型：
\dot{x} = u_s cos{\theta} \tag{13}
\dot{y} = u_s sin{\theta} \tag{14}
\dot{\theta} = \frac{u_s}{L} tan{\phi}
其中：u \in [-tan{\phi_{max}}, tan{\phi_{max}}]。将13)和14)代入12)，可看到，最短行驶距离只与时间 d_F 有关。令S为车辆直行的[Motion Primitive](https://zhida.zhihu.com/search?content_id=114857498&content_type=Article&match_order=1&q=Motion+Primitive&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQzNzYsInEiOiJNb3Rpb24gUHJpbWl0aXZlIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTE0ODU3NDk4LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.0paJ5rPeOkdJ-GBlcLNjwjZ9dvFkp9ZkFk8dwTO6gfc&zhida_source=entity)，L和R分别为车辆左转和右转的Motion Primitive，可以证明，任意起点到终点的Dubins最短路径可以由不超过三个Motion Primitives构成。由三个Motion Primitives构成的序列称为一个[Word](https://zhida.zhihu.com/search?content_id=114857498&content_type=Article&match_order=1&q=Word&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQzNzYsInEiOiJXb3JkIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTE0ODU3NDk4LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.QToXGATVcXURkHZbF-LrGDnjQkCnEXDqICN-r0yk1Ic&zhida_source=entity)。由于两个连续的, 相同的Motion Primitive可以合并为一个Motion Primitive，因此所有可能的Word有10中组合，Dubins证明最优的Word组合只能是如下6个组合之一：
{L_{\alpha}R_{\beta}L_{\gamma}, R_{\alpha}L_{\beta}R_{\gamma}, L_{\alpha}S_dL_{\gamma}, L_{\alpha}S_dR_{\gamma}, R_{\alpha}S_dL_{\gamma}, R_{\alpha}S_dR_{\gamma}}
![Image 2](https://pic2.zhimg.com/v2-4fb1c2d149df08fc847df6d41421b4f9_1440w.jpg)

<p class="kb-image-caption">图例</p>

其中，\alpha, \gamma \in [0, 2 \pi)，\beta \in (\pi, 2\pi)，这里注意，\beta 大于\pi，如果小于\pi，一定有其它的序列优于该序列。

## 3, Dubins计算过程推导
## 3.1 基于向量的切点计算

假设两个最小转弯半径构成的Circle为 C_1 和 C_2，半径分别为 r_1 和 r_2，圆心分别为 p_1=(x_1, y_1)和 p_2=(x_2, y_2).
![Image 3](https://pica.zhimg.com/v2-b064103974e467099343cd1094855ac2_1440w.jpg)

<p class="kb-image-caption">图例</p>

6）计算出n之后，就可以很方便的计算出外切线的切点 p_{ot1}和 p_{ot2}。从C1的圆心出发，沿着向量n的方向，距离为 r_1 的位置即为切点 p_{ot1}，p_{ot2}亦然。

## 3.2 计算[CSC类型的行驶曲线](https://zhida.zhihu.com/search?content_id=114857498&content_type=Article&match_order=1&q=CSC%E7%B1%BB%E5%9E%8B%E7%9A%84%E8%A1%8C%E9%A9%B6%E6%9B%B2%E7%BA%BF&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQzNzYsInEiOiJDU0PnsbvlnovnmoTooYzpqbbmm7Lnur8iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxMTQ4NTc0OTgsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.W-FE2vss2gGqn4crzzNpHe4XnQQWOEGSCztIpz4dBv8&zhida_source=entity)
RSR, LSL, RSL, LSR是CSC类型的行驶曲线，该类型曲线首先计算两个圆的切点，然后车辆沿着最小转弯半径构成的圆周行驶到第一个圆的切点，然后直行到第二个圆的切点，再沿着最小转弯半径构成的圆周行驶到目的地。下面我们以RSR轨迹为例看看如何计算行驶曲线。假设起点 s = (x_1, y_1, \theta_1)和终点 g=(x_2, y_2, \theta_2)，最小转弯半径为 r_{min}。然后我们计算起点和终点的圆心。起点的圆心为:

p_{c1} = (x_1 + r_{min} * cos(\theta_1 - \pi / 2), y_1 + r_{min} * sin(\theta_1 - \pi / 2))
终点的圆心为:

p_{c2} = (x_2 + r_{min} * cos(\theta_2 - \pi / 2), y_2 + r_{min} * sin(\theta_2 - \pi / 2))
![Image 5](https://pic1.zhimg.com/v2-af41b4a2a2b214dfba8baffd91aed144_1440w.jpg)

<p class="kb-image-caption">图例</p>

得到起点和终点的圆心之后，可以利用3.1小节的切点计算方法，得到切点 p_{ot1}和 p_{ot2}。然后就可以得到车辆的行驶轨迹，该轨迹分为三段：start到 p_{ot1}的圆周弧；p_{ot1}和 p_{ot2}的直线距离；p_{ot2}到Goal的圆周弧。至此我们得到了RSR的行驶曲线。
![Image 6: 动图封面](https://pic4.zhimg.com/v2-e3ee651a9c52cd93c33b0578ea6cfd6b_b.jpg)

<p class="kb-image-caption">图例</p>
## 3.3 计算[CCC类型的行驶曲线](https://zhida.zhihu.com/search?content_id=114857498&content_type=Article&match_order=1&q=CCC%E7%B1%BB%E5%9E%8B%E7%9A%84%E8%A1%8C%E9%A9%B6%E6%9B%B2%E7%BA%BF&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQzNzYsInEiOiJDQ0PnsbvlnovnmoTooYzpqbbmm7Lnur8iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxMTQ4NTc0OTgsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.-ZUE0Z5yBmnfqFd1g9JxrFYM6hjO-aFHL8v8y9IusjQ&zhida_source=entity)
如下图所示，C_1 和 C_2 的圆心为 p_1 和 p_2，C_3 是与 C_1 和 C_2 相切的圆，圆心为 p_3.
![Image 7](https://pic1.zhimg.com/v2-6a1232281feff96b4b19e9c590507194_1440w.jpg)

<p class="kb-image-caption">图例</p>

最后可以得到交点 p_{t1} = p_1 + V_2. 按照同样的过程可以计算得到 p_{t2}。然后就可以得到start到 p_{ot1}的圆周弧；p_{ot1}和 p_{ot2}的圆周弧；p_{ot2}到Goal的圆周弧的三段轨迹组成的行驶曲线。
![Image 8: 动图封面](https://pic4.zhimg.com/v2-d36fb97c901b5b355e6abd386b56b001_b.jpg)

<p class="kb-image-caption">图例</p>

1, A Comprehensive, Step-by-Step Tutorial on Computing Dubin’s Curves ([https://gieseanw.files.wordpress.com/2012/10/dubins.pdf](https://link.zhihu.com/?target=https%3A//gieseanw.files.wordpress.com/2012/10/dubins.pdf))
2, Planning Algorithm ([http://planning.cs.uiuc.edu/no de1.html](https://link.zhihu.com/?target=http%3A//planning.cs.uiuc.edu/node1.html))

### 注：本文首发于微信公众号，转载请注明出处，谢谢！
![Image 9](https://pic1.zhimg.com/v2-70deceb3d1add2c151ecec283613824a_1440w.jpg)

<p class="kb-image-caption">图例</p>

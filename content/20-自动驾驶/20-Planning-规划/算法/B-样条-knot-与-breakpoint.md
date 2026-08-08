---
title: B 样条 knot 与 breakpoint
url: https://www.zhihu.com/question/52199904
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T20:16:49+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# B 样条 knot 与 breakpoint

上篇中我们讲解了贝塞尔曲线

B样条是贝塞尔曲线的延申，贝塞尔曲线是B样条的基础， B样条可以看成很多组贝塞尔曲线的拼接。因此，如果你还不了解贝塞尔曲线，建议你先看懂上一篇。

## 由来

贝塞尔曲线是在汽车的曲线设计种首次被提出的，汽车的外形设计十分复杂，控制点的表示方式能够简化其数学描述，将其数学化的表示出来。
![Image 1](https://picx.zhimg.com/50/v2-856d625c9dd3ad0227ed600d3796b105_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

如果要用贝塞尔曲线来设计上图种的汽车造型， 那么汽车的设计简直是噩梦，形状复杂的曲线需要更多的控制点，曲线的阶次就会变得非常高。牵一发而动全身， 想改一下车屁股的造型， 移动一下控制点，结果车头的造型也被改变了。为了克服贝塞尔曲线的以上两大缺点，B样条应运而生了。因此B样条的两个性质就是贝塞尔的缺点反过来：1 可以指定阶次。2 移动控制点仅仅改变曲线的部分形状，而不死整体
B样条采用解决方案是贝塞尔曲线的拼接，也就是把一条曲线变为多段贝塞尔曲线的拼接。

## 定义

先看B样条的定义：
B样条有三大要素：**_节点，控制点，阶次。_**
控制点和贝塞尔的一样，就是空间上决定曲线形状的点。设 _U_ 是 _m_ + 1个非递减数的集合，_u_ 0 <= _u_ 2 <= _u_ 3 <= ... <= _um_。_ui_ 称为**节点**（_knots_）, 集合 _U_ 称为**节点向量**（_knot vector_）, 半开区间[_ui_, _ui_+1) 是第 _i_ 个节点区间（_knot span_）。注意某些 _ui_ 可能相等，某些节点区间会不存在。如果一个节点 _ui_ 出现 _k_ 次 (即，_ui_ = _ui_+1 = ... = _ui+k_-1), 其中 _k_> 1, _ui_ 是一个重复度（_multiplicity_）为 _k_ 的多重节点，写为 _ui_(_k_). 否则，如果 _ui_ 只出现一次，它是一个简单节点。如果节点等间距(即， _ui_+1 - _ui_ 是一个常数，对 0 <= _i_<= _m_ - 1)，节点向量或节点序列称为均匀的；否则它是非均匀的。

节点可认为是分隔点，将区间[_u_ 0, _um_]细分为节点区间。所有B-样条基函数被假设定义域在[_u_ 0, _um_]上。在本文中，我们经常使用 _u_ 0 = 0和 _um_ = 1，所以定义域是闭区间[0,1]。

比如节点向量是 [0, 0.3, 0.5, 0.7, 0.9, 1.0]
![Image 2](https://pica.zhimg.com/50/v2-d62d0d70bf4e3b1d98be02528ae297d6_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

为了定义B-样条基函数，我们还需要一个参数，基函数的次数（degree）_p_，第 _i_ 个 _p_ 次B-样条基函数，写为 _Ni, p_(_u_)，递归定义如下：
![Image 3](https://pic1.zhimg.com/50/v2-ea894435b360e8645415340917d20960_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

上述公式通常称为 _Cox-de Boor_ 递归公式。这个定义看起来很复杂；但是不难理解。如果次数（degree）为零（即， _p_ = 0），这些基函数都是阶梯函数，这也是第一个表达式所表明的。即，如果 _u_ 是在第 _i_ 个节点区间[_ui_, _ui_+1)上基函数 _Ni_, 0(_u_)是1. 例如，如果我们有四个节点 _u_ 0 = 0, _u_ 1 = 1, _u_ 2 = 2和 _u_ 3 = 3, 节点区间 0, 1 和2是[0,1), [1,2), [2,3)，0次基函数是 _N_ 0,0(_u_) = 1 在 [0,1) ，在其它区间是0；_N_ 1,0(_u_) = 1 在 [1,2)上，在其它区间是0；_N_ 2,0(_u_) = 1在[2,3)上，其它区间是0. 如下图所示：
![Image 4](https://pic1.zhimg.com/50/v2-9bef52857a4524ed7f58af71ceab1e96_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

一阶B样条曲线是啥呢？就是把控制点按照顺序连起来得到的曲线，这样的意义就是如果在两个控制点之间的就是直接利用这两个点就行线性插值，再看看 _Ni, p_(_u_)的定义，不就是低一阶曲线的线性插值了嘛， 如果低一阶的曲线是0阶曲线，那么不就是两点之间的线性插值嘛。建议再看一下我在贝塞尔曲线那一篇如何用逐渐减低阶次的方式递归来理解的。你就明白了，B样条就是贝塞尔穿了个马甲。为了理解 _p_ 大于0时计算 _Ni, p_(_u_)的方法，我们使用三角计算格式。所有节点区间列在左边（第一）列，所有零次基函数在第二列。见下图。
![Image 5](https://pica.zhimg.com/50/v2-49753e3f5c0c2d249e671db55502263d_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

因为 _Ni_, 1(_u_) 是从 _Ni_, 0(_u_) 和 _Ni_+1,0(_u_)计算的而 因为 _Ni_, 0(_u_)和 _Ni_+1,0(_u_) 在区间[_ui_, _ui_+1)和[_ui_+1, _ui_+2)分别是非零的，_Ni_, 1(_u_) 在这两个区间都是非零的。换句话说，_Ni_, 1(_u_)在[_ui_, _ui_+2)上是非零的。相似地，因为 _Ni_, 2(_u_) 依赖于 _Ni_, 1(_u_) 和 _Ni_+1,1(_u_)且因为这两个基函数在[_ui_, _ui_+2)和[_ui_+1, _ui_+3)分别是非零的，_Ni_, 2(_u_)在[_ui_, _ui_+3)上非零。总之，为确定基函数 _Ni, p_(_u_), 的非零定义域，可以追溯到三角计算格式直到回到第一列。例如，假设我们想找到 _N_ 1,3(_u_)的非零定义域。基于上述讨论，我们可从西北和西南方向追溯直到第一列为止，如下图中蓝色虚线所示。因此 _N_ 1,3(_u_)在 [_u_ 1, _u_ 2), [_u_ 2, _u_ 3), [_u_ 3, _u_ 4) 和[_u_ 4, _u_ 5)上是非零的。或，相等地，它在[_u_ 1, _u_ 5)上非零。.
![Image 6](https://picx.zhimg.com/50/v2-c824569694b3e6674dbe34b53a9be2d0_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>
### 基函数_Ni, p_(_u_) 在[_ui_, _ui+p_+1)上非零。或，相等地，_Ni, p_(_u_) 在_p_+1个节点区间[_ui_, _ui_+1), [_ui_+1, _ui_+2), ..., [_ui+p_, _ui+p_+1)上非零。
> 我再把这句话翻译成大家更理解的话。**_Ni, p_(_u_) 就是p阶的B样条函数，第i个控制点仅仅在[_ui_, _ui_+1), [_ui_+1, _ui_+2), ..., [_ui+p_, _ui+p_+1)被用上了，在其他的节点区间[_ui，_, _ui+p_+1)之外，根本就没用上。**

接着，我们看相反的方向。给定一个节点区间[_ui_, _ui_+1), 我们想知道哪个基函数会在计算中使用这个区间。我们可以以这个节点区间开始并画一个西北界限箭头和一个西南界限的箭头。所有封闭在楔形里的基函数使用 _Ni_, 0(_u_)（为什么？）因此在该区间是非零的。因此，所有在[_ui_, _ui_+1)上非零的 _p_ 次基函数是这个楔形和包含所有 _Ni, p_(_u_) 的列的交集。实际上，这一列和两个箭头形成一个等边三角形，而这一列是垂直边。从 _Ni_, 0(_u_) 数到 _Ni, p_(_u_) 有 _p_+1列。因此，等边三角形的垂直边至多有 _p_+1 项，即 _Ni, p_(_u_), _Ni_-1, _p_(_u_), _Ni_-2, _p_(_u_), ..., _Ni-p_+2, _p_(_u_), _Ni-p_+1, _p_(_u_) 和 _Ni-p_, _p_(_u_).
![Image 7](https://pic1.zhimg.com/50/v2-d5616f2e136611e5e5ab8224b98135f6_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

让我们看上图。为了找到所有3次在 [_u_ 4, _u_ 5) 上非零的基函数，画出两个箭头和所有在垂直边的函数是我们想要的。这个例子，是 _N_ 1,3(_u_), _N_ 2,3(_u_), _N_ 3,3(_u_), 和 _N_ 4,3(_u_).用黄色三角表示。蓝色 (_resp._, 红色) 三角显示的是在[_u_ 3, _u_ 4) (_resp._, [_u_ 2, _u_ 3) )上非零的3次基函数。注意在[_u_ 2, _u_ 3)上只有3个3次基多项式。.

总之，我们观察到下列特性：

### 在任何一个节点区间 [_ui_, _ui_+1), 最多有_p_+1个 _p_次基函数非零，即：_Ni-p_, _p_(_u_), _Ni-p_+1, _p_(_u_), _Ni-p_+2, _p_(_u_), ..., _Ni_-1, _p_(_u_) 和_Ni_, _p_(_u_),
> 我再把这句话翻译成大家更理解的话。**区间 [_ui_, _ui_+1)中，只有第i-p个控制点到第i和控制点被用上了，其他的控制点的位置不会相应区间 [_ui_, _ui_+1)上曲线的形状。p阶次的B样条，最多用到相对应的p+1个点。再仔细回想一下，这不就是贝塞尔曲线的性质嘛，曲线的阶次等于控制点的个数减1.**
> **因此，你就能更深一步的理解B样条曲线是贝塞尔曲线拼接而来的，在每一个节点的区间内都可以看作一个贝塞尔曲线。**

### 因此，能看出来，节点的设计是很关键的，下一篇我来说一下节点向量的设计。专栏里每一篇都是我一个字一个字打的，都是我认为的原创干货。欢迎指正讨论，转载请注明，认同请点赞。这个系列的文章很容易出错，希望大佬们多多指正补充。仅仅收藏是学不会的，还得点赞喜欢加转发啊。
![Image 8](https://picx.zhimg.com/50/v2-fffd731f067256098d70bd564d5ae197_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

> [搜索结果提示 - 博客园找找看](https://link.zhihu.com/?target=https%3A//zzk.cnblogs.com/s%3Fw%3Dblog%253Aicmzn%2520B-spline)
>

> [CS3621 Introduction to Computing with Geometry Course Notes](https://link.zhihu.com/?target=http%3A//www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/)
>

> [B-样条曲线教程（B-spline Curves Notes）目录](https://link.zhihu.com/?target=https%3A//blog.csdn.net/tuqu/article/details/4749586)
> B样条曲线满足贝塞尔曲线所具有的所有重要性质，又比贝塞尔曲线提供更多的控制灵活性。在上篇中介绍的贝塞尔曲线是**B样条曲线（B-Spline）**的特例，而在实际插值中，主要是利用B样条曲线和NURBS进行插值。上篇链结：
本篇主要介绍**B样条曲线（B-Spline）**，为续解决插值问题打下基础。还是回顾一下几种曲线的关系：
![Image 9](https://picx.zhimg.com/50/v2-735ba0d058dabc26b092a0dba45e49de_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

这两个坑实际上一定程度上限制了贝尔塞曲线的应用。试想一下，用10个控制点好不容易勾出了车顶到车尾的整条曲线，这时候想要增强车尾的溜背感，改变一个控制点。虽然使溜背感增强了，但是整条曲线的位置都变了。然而，使用B样条就不会有这样的问题！

### 1.公式

C(u)=\sum_{i=0}^{n}{N_{i, p}(u)P_i}\\公式1
其中 P_i， i\in[0, n] 为B样条曲线的**控制点（Control Points）**。N_{i, p}为B样条曲线的**基函数（Basis Functions）**，第二个下标 p 表示基函数的**阶（degree）**。看到这里，是不是觉得B样条曲线的公式与贝塞尔曲线的公式非常相似，继续往下看。

### 2.节

虽然公式形式上看起来相似，但是两者的不同点在于**基函数的定义**上：贝塞尔曲线基函数的定义域是 u\in[0,1] ；而B样条曲线引入了**节（Knot）**的概念。节（Knot）将原本的 u\in[0,1]分隔成多个节点段：
\boldsymbol{U=\{{u_0, u_1, ..., u_m}\}}，u_0 \leq u_1 \leq u_2 \leq ... \leq u_m\\
这里 U 叫做节向量**（Knot vector）**， 一般的 u_0=0, u_m=1 _，_ 节向量中的元素 u_i 可以是相同数值**重复**（**multiplicity，重复度**）出现多次，节向量对应到曲线上的点 C(u_i) 叫做**节点（Knot Point）。节点**可以形象的理解成在曲线上打的绳结，将整条绳子（B样条曲线）分成很多**曲线段（curve segment）**，每个曲线段实际上是定义在**节点段（Knot span）**上的P阶的贝塞尔曲线。举例，的B样条曲线，有11个**控制点**（用方块表示）n=10，7个**节点**（用三角形表示）将B样条曲线分成8条**曲线段**对应8个**节点段**（Knot span）。
![Image 10](https://picx.zhimg.com/50/v2-1141ef7a37cb0817296597b1777cb946_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>
![Image 11](https://picx.zhimg.com/50/v2-09dff76f96be4fe838e141c3e5242683_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

N_{i, 0}(u)=\begin{cases} 1\ \ \ if\ \ u_i \leq u < u_{i+1}\\0 \ \ \ otherwise \end{cases}\\ N_{i, p}(u)=\frac{u-u_i}{u_{i+p}-u_i}N_{i, p-1}(u)+\frac{u_{i+p+1}-u}{u_{i+p+1}-u_{i+1}}N_{i+1, p-1}(u) 公式2
注意 p=0 阶基函数 N_{i, 0}(u) 在半开区间 u\in[u_i, u_{i+1}) 为1，此区间外为0.

### 5.完整定义

根据前面的描述总结一下，以下三者共同定义了B样条曲线：
*   **控制点，**P_{0}, P_{1}, P_{2}, ..., P_{n}，共n+1个
*   **p阶**
*   **节向量**\boldsymbol{U} ， u_0, u_1, ..., u_m ，共m+1个

并且 n, m, p 三者的数量关系满足：
m = n + p + 1\\ 公式3

### 6.分类

B样条曲线按照节向量和控制点的不同，可分为以下三类：

### 开放(Open)B样条曲线

节向量（Knot vector）没有特殊结构，生成的B样条曲线不会与第一个和最后一个控制点接触。
![Image 12](https://picx.zhimg.com/50/v2-1f1c9af14054b5f9a51b5405eff58feb_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

B样条曲线与控制多边形的**第一条边和最后一条边相切**，曲线两端分别与**第一个和最后一个控制点重合**。注意，这与贝塞尔曲线一样。要构造这样的B样条曲线，需要**节向量（Knot vector）两端开头和结尾的p+1个值相同，即 u_0 和 u_m 的重复度（Multiplicity）为p+1**。举例：所示为10个控制点(n=9), 3阶(p=3)的固定B样条曲线。按照公式3计算出m=13，即节向量有14个节；要让节向量开头, 结尾4个值相同，节向量为：
U = \{ \color{red}{0, 0, 0, 0}, 0.14, 0.28, 0.42, 0.57, 0.71, 0.85, \color{blue}{1, 1, 1, 1} \}\\
![Image 13](https://picx.zhimg.com/50/v2-972b46f486d8caac39fff982817560d1_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>
![Image 14](https://picx.zhimg.com/50/v2-f7aa92eae7c07dcf0e5c0524eb77d93c_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

De Boor's Algorithm算法提供了一种快速求解B样条曲线上的一点 C(u) 的方法。算法思想是：**在节向量U中重复插入knot u（每次插入knot u会产生新控制点），使其重复度(Multiplicity)等于B样条曲线的阶数p. 那么，最后一次插入knot u时，生成的新控制点(Control point)就是B样条曲线上与u对应的点**C(u)**。**
接下来解释一下算法思想：

### 1. 单位分解 Partition of unity
区间 [u_i, u_{i+1}) 上所有非零基函数之和等于1.

### 2. 重复度的特性

**增加**内部knot的**重复度**会**减少**该Knot处**非零基函数的数量**。如果这个Knot的重复度是k，那么knot上最多有p-k+1个非零基函数。因此，在重复度为p的knot处，只有一个非零基函数，再根据上一条**单位分解**的性质，这个非零基函数在该knot处的值为**1**。令该knot u为 u_i ， N_{i, p}(u) 为在 [u_i, u_{i+1}) 的非零基函数，根据B样条的定义公式，此时有：
C(u)=N_{i, p}(u)Pi=Pi\\

上面公式已经证明了重复度为p的knot u在曲线上的点 C(u) 与控制点 P_i 的关系。接下来就是如何求出 P_i 。
**3.利用重复插knot算法求**P_i

求B样条曲线上 u 对应的点 C(u) 。设 u\in[u_k, u_{k+1}) ， p 为B样条曲线的阶， s 为 u 在节向量中已经存在的重复度。则需要重复插入 u 的次数 h=p-s 。三角计算的公式为：
a_{i, r}=\frac{(u-u_i)}{(u_{i+p-r+1}-u_i)}\\ P_{i, r}=(1 - a_{i, r})P_{i-1, r-1} + a_{i, r}P_{i, r-1}\\ 公式4
其中 i 为受影响控制点下标， r 为插入u的次数。
![Image 15](https://pic1.zhimg.com/50/v2-e0128c87b14cb6f152a6bc2e58614198_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

如上所示，最左边的列为插入u时受影响的初始控制点。计算三角中，P的第一个下标表示受影响控制点的下标；第二个下标表示插入u的次数。从左向右第r列依次为第r次插入u时新生成的控制点。可以看到三角形最终得到一个控制点 P_{k-s, p-s} 就是 C(u) 。
![Image 16](https://pica.zhimg.com/50/v2-76441f3bda1ff7b97e45aa93fc394e20_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>
1.   初始控制点：**最外层**黑色控制点与中**最左列**初始控制点对应，分别为 P_{k-p, 0}, P_{k-p+1,0}, P_{k-p+2,0}, ..., P_{k-s-2,0}, P_{k-s-1,0}, P_{k-s, 0}

2.第1次插入u，根据公式4，求得第二层蓝色线条（对应左2列）新增的控制点为：
\color{blue}{P_{k-p+1,1}, P_{k-p+2,1}, ..., P_{k-s-1,1}, P_{k-s, 1}}
3. 第2次插入u，求得第三层新增的控制点为：

\color{gray}{P_{k-p+2,2}, ..., P_{k-s, 2}}
4. ...重复插入u

5. 最终在插入u到h次时，求得唯一新增控制点：\color{red}{P_{k-s, p-s}} 就是 C(u) 。
### 8. 特性

### 局部修改性-Local Modification Scheme
改变控制点 P_i 的位置只影响区间 [u_i, u_{i+p+1}) 上的曲线 C(u) 。回想一下文章开头提到贝塞尔曲线全局性的坑，B样条曲线的这个特性对曲线形态的微调更友善了。举个列子，下图为11个控制点n=10，p为3阶，节向量含15个knots（m=14）定义的固定B样条曲线。改变控制点 P_2 的位置，将会影响[u_2, u_{2+3+1})上的曲线形态。节向量如下：
U=\{0,0,0,0,0.12,0.25.0.37,0.5,0.62,0.75,0.87,1,1,1,1\}\\
下图中蓝色三角形为节点(knot point)，由于节向量首尾分别有4个节相同，所以一共有7个节点，8个曲线段。
![Image 17](https://picx.zhimg.com/50/v2-60dd2640c1a69f4ddeb460efcd948b89_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

由于u2与u3相同，所以受影响的knot span为： [u_3, u_4), [u_4, u_5), [u_5, u_6) ，分别对应第一, 第二和第三曲线段。下图是改变控制点后的曲线，可以看到受影响的曲线段就是几段，其他曲线段保持不变。
![Image 18](https://picx.zhimg.com/50/v2-30b6a3ab883432ed09b8c2250f56eb47_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

如果B样条曲线的n=p（即，最大控制点下标＝阶数），节向量有2(p+1)个knot，并且分别有p+1个knot在首尾固定。这个B样条曲线就退化成贝塞尔曲线。像**变异递减性-Variation Diminishing Property, 仿射不变性-Affine Invariance**与贝塞尔曲线相似**。**

### 9. 小节

尽管B样条的定义和算法要复杂一些，但是B样条曲线的优点更明显。一方面，B样条曲线满足Bézier曲线所具有的所有重要性质；另一方面，B样条曲线又比Bézier曲线提供更多的控制灵活性。不足的话，B样条曲线仍然是多项式曲线，不能表示许多有用的简单曲线，例如圆和椭圆，这个任务得交给NURBS.

### 10. 实例

使用NURBS-Python生成B-spline曲线。设置9个控制点，3阶和相应的节向量。
from geomdl import BSpline
from geomdl import utilities
from geomdl.visualization import VisMPL
from geomdl import BSpline

# Create a 3-dimensional B-spline Curve
curve = BSpline.Curve()

# Set degree
curve.degree = 3

# Set control points

curve.ctrlpts = [[20, 5], [10, 20], [40, 50], [60, 5], [70,8], [100,56], [50, 50], [40,60]]

# Set knot vector

curve.knotvector = [0, 0, 0, 0, 0.25, 0.4, 0.6, 0.75, 1, 1, 1, 1]

# Set evaluation delta (controls the number of curve points)
curve.delta = 0.01

# Plot the control point polygon and the evaluated curve
curve.vis = VisMPL.VisCurve2D()

# Don't pop up the plot window, instead save it as a PDF file
curve.render(filename="bspline-curve2d.pdf", plot=False)
```

所得图形：
![Image 19](https://pica.zhimg.com/50/v2-9c5599bc822629bad8995547e637c9ea_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

我也是小白，瞎掺和一下，我反正没听过breakpoint这种说法，所以搜了一下，knot和breakpoint是一回事："kont: the _internal_ breakpoints that define the spline. "一个t处插入了多个knot，这个我也没办法理解。
knot 这个东西是个参数，可以根据自己的判断选取knot的数量，比如下面这幅图选了8个节点：
![Image 20](https://picx.zhimg.com/50/v2-2b55065e3388c97f43726becaf231e2d_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>
![Image 21](https://picx.zhimg.com/50/v2-a51e66aa3cf23b226e8b566713944b3d_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>
![Image 22](https://pic1.zhimg.com/50/v2-a39dd722bb8c1af7f1434c98ca5e135b_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>
![Image 23](https://picx.zhimg.com/50/v2-65d4568971c745e4bc80e70a60311e00_720w.jpg?source=1def8aca)

<p class="kb-image-caption">图例</p>

---
title: 机器臂运动学
url: https://my.feishu.cn/docx/A311dGJIdopJ35xO3JQcnMM4nFd
quality: raw
feishu_formatted_at: '2026-06-28T04:31:05+00:00'
equations_repaired_at: '2026-06-28T04:31:05+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
sheets_expanded_at: '2026-06-29T10:25:35+00:00'
---

# 刚体的移动与旋转

## 刚体的移动

刚体在空间中的运动状态有六个自由度，它在世界坐标系下的位姿可以用一个4x4的矩阵表示。

$$T = \begin{bmatrix}R & P \\0 & 1 \\\end{bmatrix}$$

$T$是与刚体相关联的坐标系相对世界坐标系的变换矩阵。

$P$是与刚体相关联的坐标系相对世界坐标系的平移。

$R$是与刚体相关联的坐标系相对世界坐标系的旋转。

$$^{A}_{B}R = \begin{bmatrix}| & | & | \\^{A}\hat{X}_{B} & ^{A}\hat{Y}_{B} & ^{A}\hat{Z}_{B} \\| & | & | \\\end{bmatrix} = \begin{bmatrix}\hat{X}_{B} \cdot \hat{X}_{A} & \hat{Y}_{B} \cdot \hat{X}_{A} & \hat{Z}_{B} \cdot \hat{X}_{A} \\\hat{X}_{B} \cdot \hat{Y}_{A} & \hat{Y}_{B} \cdot \hat{Y}_{A} & \hat{Z}_{B} \cdot \hat{Y}_{A} \\\hat{X}_{B} \cdot \hat{Z}_{A} & \hat{Y}_{B} \cdot \hat{Z}_{A} & \hat{Z}_{B} \cdot \hat{Z}_{A}\\\end{bmatrix}$$

## Rotation Matrix有哪些特性呢？

{A}到{B}的旋转矩阵是{B}到{A}的旋转矩阵的转置。

$$^{A}_{B}R = \begin{bmatrix}\hat{X}_{B} \cdot \hat{X}_{A} & \hat{Y}_{B} \cdot \hat{X}_{A} & \hat{Z}_{B} \cdot \hat{X}_{A} \\\hat{X}_{B} \cdot \hat{Y}_{A} & \hat{Y}_{B} \cdot \hat{Y}_{A} & \hat{Z}_{B} \cdot \hat{Y}_{A} \\\hat{X}_{B} \cdot \hat{Z}_{A} & \hat{Y}_{B} \cdot \hat{Z}_{A} & \hat{Z}_{B} \cdot \hat{Z}_{A}\\\end{bmatrix}={\begin{bmatrix}\hat{X}_{A} \cdot \hat{X}_{B} & \hat{Y}_{A} \cdot \hat{X}_{B} & \hat{Z}_{A} \cdot \hat{X}_{B} \\\hat{X}_{A} \cdot \hat{Y}_{B} & \hat{Y}_{A} \cdot \hat{Y}_{B} & \hat{Z}_{A} \cdot \hat{Y}_{B} \\\hat{X}_{A} \cdot \hat{Z}_{B} & \hat{Y}_{A} \cdot \hat{Z}_{B} & \hat{Z}_{A} \cdot \hat{Z}_{B}\\\end{bmatrix}}^T={^{B}_{A}R}^T$$

旋转矩阵是正交矩阵。

$${^{B}_{A}R}^T \cdot ^{B}_{A}R = \begin{bmatrix}- & {^{A}\hat{X}_{B}}^T & - \\- & {^{A}\hat{Y}_{B}}^T & - \\- & {^{A}\hat{Z}_{B}}^T & - \\\end{bmatrix} \cdot \begin{bmatrix}| & | & | \\^{A}\hat{X}_{B} & ^{A}\hat{Y}_{B} & ^{A}\hat{Z}_{B} \\| & | & | \\\end{bmatrix}= I_{3} = {^{B}_{A}R}^{-1} \cdot {^{B}_{A}R}$$

$${^{A}_{B}R}^T = {^{A}_{B}R}^{-1} = {^{B}_{A}R}$$

## Rotation Matrix有哪些用处？

- 描述一个frame相对于另一个frame的姿态
- 一个刚体由某一种frame表达，转换到由另一个和当前frame有相对转动的frame来表达。

$$^{A}P = {^{A}_{B}R} \cdot {^{B}P}$$

- 将point在同一个frame当中进行转动

$$^{A}P^{'} = {R(\theta)} \cdot {^{A}P}$$

## 刚体绕Fixed Angle旋转

- 已知绕各个轴的旋转角度，求旋转矩阵？刚体绕世界坐标系先对x轴转60度，再对Y轴转30度，如何计算？$^{A}_{B}R_{XYZ}(\alpha, \beta, \gamma)  = R_{Z}(0) \cdot R_{Y}(30) \cdot R_{X}(60)$
- 已知旋转矩阵，求绕各轴的旋转角度？

$^{A}_{B}R_{XYZ}(\alpha, \beta, \gamma)  = \begin{bmatrix}r_{00} & r_{01} & r_{02} \\r_{10} & r_{11} & r_{12} \\r_{20} & r_{21} & r_{22} \\\end{bmatrix}$, 求解$\alpha, \beta, \gamma$

If $\beta \neq 90^\circ$

$$\beta = \arctan(-r_{20}, \sqrt{r_{00}^2 + r_{10}^2}) \\\alpha = \arctan(\frac{r_{10}}{\cos(\beta)}, \frac{r_{00}}{\cos(\beta)}) \\\gamma = \arctan(\frac{r_{21}}{\cos(\beta)}, \frac{r_{22}}{\cos(\beta)})$$

If $\beta = 90^\circ$, $\alpha = 0^\circ, \gamma = \arctan(r_{01}, r_{11})$

If $\beta = -90^\circ$, $\alpha = 0^\circ, \gamma = -\arctan(r_{01}, r_{11})$

## 刚体绕Euler Angle旋转

- 已知绕各个轴的旋转角度，求旋转矩阵？

刚体绕自身坐标系X轴旋转$\alpha$角度，再绕自身坐标系Y轴旋转$\beta$角度，再绕自身坐标系Z轴旋转$\gamma$角度。

$$^{A}_{B}R_{X'Y'Z'}(\alpha, \beta, \gamma)  = R_{X'}(\alpha) \cdot R_{Y'}(\beta) \cdot R_{Z'}(\gamma)$$

- 已知旋转矩阵，求绕各轴的旋转角度？

$^{A}_{B}R_{X'Y'Z'}(\alpha, \beta, \gamma)  = \begin{bmatrix}r_{00} & r_{01} & r_{02} \\r_{10} & r_{11} & r_{12} \\r_{20} & r_{21} & r_{22} \\\end{bmatrix}$, 求解$\alpha, \beta, \gamma$

If $\beta \neq 0^\circ$

$$\beta = \arctan(\sqrt{r_{20}^2 + r_{21}^2}, r_{22}) \\\alpha = \arctan(\frac{r_{12}}{\sin(\beta)}, \frac{r_{02}}{\sin(\beta)}) \\\gamma = \arctan(\frac{r_{21}}{\sin(\beta)}, \frac{-r_{20}}{\sin(\beta)})$$

If $\beta = 0^\circ$, $\alpha = 0^\circ, \gamma = \arctan(-r_{01}, r_{00})$

If $\beta = 180^\circ$, $\alpha = 0^\circ, \gamma = -\arctan(r_{01}, -r_{00})$

## Homogeneous Transformation Matrix

在刚体上建立frame，常建立在刚体的质心上: 

$^{A}P_{B_{org}}  $ 表示origin of {B} represented in {A}

### 变换矩阵的用法

- 描述一个frame相对于另一个frame的空间位姿
- 将point由某一个frame的表达转换到另一个frame来表达。

$$\begin{bmatrix}^{A}P \\1 \\\end{bmatrix} = \begin{bmatrix}^{A}_{B}R & ^{A}P_{B_{org}}\\0 & 1 \\\end{bmatrix} \cdot\begin{bmatrix}^{B}P \\1 \\\end{bmatrix}$$

- 将point在同一个frame内绕一个一般轴进行转动或移动。先移动后转动：$^{A}P_{2} = R_{\hat{k}}(\theta)(^{A}P_{1} + {^{A}Q})$先转动后移动：$\begin{bmatrix}^{A}P_{2} \\1 \\\end{bmatrix} = \begin{bmatrix}R_{\hat{k}}(\theta) & ^{A}Q\\0 & 1 \\\end{bmatrix} \cdot\begin{bmatrix}^{A}P_{1} \\1 \\\end{bmatrix}$**Example：**Point $^{A}P_{1} = \begin{bmatrix}3\\7\\0 \\\end{bmatrix}$, 先绕地面坐标系的Z轴旋转30度，再移动 $^{A}Q = \begin{bmatrix}10\\5\\0 \\\end{bmatrix}$到 $^{A}P_{2}$，求 $^{A}P_{2}$。$^{A}R_{Z}(30^\circ) =\begin{bmatrix}\frac{\sqrt{3}}{2} & \frac{-1}{2} & 0\\\frac{1}{2} & \frac{\sqrt{3}}{2} & 0\\0 & 0 & 1\\\end{bmatrix} $$\begin{bmatrix}^{A}P_{2} \\1 \\\end{bmatrix} = \begin{bmatrix}^{A}R_{Z}(30^\circ) & ^{A}Q\\0 & 1 \\\end{bmatrix} \cdot\begin{bmatrix}^{A}P_{1} \\1 \\\end{bmatrix} = \begin{bmatrix}9.098 \\12.562\\0\\1\\\end{bmatrix}$**要计算绕空间中任意单位向量 $\hat{k}$ 旋转角度 $\theta$的变换矩阵，可以使用罗德里格斯旋转公式。**

![image](attachments/A311dGJIdopJ35xO3JQcnMM4nFd/img_001.png)

<p class="kb-image-caption">图例</p>

$^{A}_{B}T = \begin{bmatrix}^{A}_{B}R & ^{A}P_{B_{org}}\\0 & 1 \\\end{bmatrix} $, $^{B}_{A}T = ^{A}_{B}T^{-1}=\begin{bmatrix}^{A}_{B}R^{T} & -^{A}_{B}R^{T} \cdot {^{A}P_{B_{org}}} \\0 & 1 \\\end{bmatrix} $

## Forward Kinematics 正运动学

### 什么是正运动学？

讨论运动状态本身，未连接到产生运动的力。通俗地来说，就是讨论位置，速度，加速度和时间之间的关系。

### 什么是机械臂？

多个连杆相串联，具有复杂几何外形，连杆之间可以相对移动或者转动，由制动器来驱动。

$$^{W}P = f(\theta_{1}, \theta_{2}, ..., \theta_{n})$$

### 如何描述机械臂的运动状态？

找出各个连杆之间的相对几何状态，在各个连杆上建立frame，以frame的状态来代表连杆的状态。机械臂由关节（Joint）和连杆（Link）两种元件组成。关节又可以分为转动关节和滑动关节。我们可以用四个参数来表达相邻两个连杆之间的位姿关系。假设前杆的方向为$\hat{Z}_{i-1}$，后杆的方向为$\hat{Z}_{i}$，两连杆的中垂线方向为$\hat{X}_{i-1}$和$\hat{X}_{i}$的方向。

![image](attachments/A311dGJIdopJ35xO3JQcnMM4nFd/img_002.png)

<p class="kb-image-caption">图例</p>

${\theta}_{i}$：以$\hat{Z}_{i}$的方向看，$\hat{X}_{i}$与$\hat{X}_{i-1}$之间的夹角（会随着$Joint_{i}$的旋转而变化）

${d}_{i}$：沿着$\hat{Z}_{i}$的方向，$\hat{X}_{i}$与$\hat{X}_{i-1}$之间的距离（会随着$Joint_{i}$的滑动而变化）

Link Transformation

$$^{i-1}P = ^{i-1}_{i}T \cdot ^{i}P$$

根据Euler Angle，

$$^{i-1}_{i}T = T_{\hat{X}_{i-1}}(\alpha_{i-1}) \cdot T_{\hat{X}_{R}}(a_{i-1}) \cdot T_{\hat{Z}_{Q}}(\theta_{i}) \cdot T_{\hat{Z}_{P}}(d_{i}) \\=\begin{bmatrix}1 & 0 & 0 & 0\\0 & \cos(\alpha_{i-1}) & -\sin(\alpha_{i-1}) & 0\\0 & \sin(\alpha_{i-1}) & \cos(\alpha_{i-1}) & 0\\0 & 0 & 0 & 1\\\end{bmatrix} \cdot \begin{bmatrix}1 & 0 & 0 & a_{i-1}\\0 & 1 & 0 & 0\\0 & 0 & 1 & 0\\0 & 0 & 0 & 1\\\end{bmatrix} \cdot \begin{bmatrix}\cos(\theta_{i}) & -\sin(\theta_{i}) & 0 & 0\\\sin(\theta_{i}) & \cos(\theta_{i}) & 0 & 0\\0 & 0 & 1 & 0\\0 & 0 & 0 & 1\\\end{bmatrix} \cdot \begin{bmatrix}1 & 0 & 0 & 0\\0 & 1 & 0 & 0\\0 & 0 & 1 & d_{i}\\0 & 0 & 0 & 1\\\end{bmatrix} \\= \begin{bmatrix}\cos(\theta_{i}) & -\sin(\theta_{i}) & 0 & a_{i-1}\\\cos(\alpha_{i-1})\sin(\theta_{i})& \cos(\alpha_{i-1})\cos(\theta_{i}) & -\sin(\alpha_{i-1}) & -\sin(\alpha_{i-1})d_{i}\\\sin(\alpha_{i-1})\sin(\theta_{i}) & \sin(\alpha_{i-1})\cos(\theta_{i}) & \cos(\alpha_{i-1}) & \cos(\alpha_{i-1})d_{i}\\0 & 0 & 0 & 1\\\end{bmatrix} $$

$${^{i-1}P_{i_{org}}} = \begin{bmatrix} a_{i-1}\\ -\sin(\alpha_{i-1})d_{i}\\ \cos(\alpha_{i-1})d_{i}\\\end{bmatrix} $$

$${^{i-1}_{i}R} = \begin{bmatrix}\cos(\theta_{i}) & -\sin(\theta_{i}) & 0 \\\cos(\alpha_{i-1})\sin(\theta_{i})& \cos(\alpha_{i-1})\cos(\theta_{i}) & -\sin(\alpha_{i-1}) \\\sin(\alpha_{i-1})\sin(\theta_{i}) & \sin(\alpha_{i-1})\cos(\theta_{i}) & \cos(\alpha_{i-1}) \\\end{bmatrix} $$

我们可以通过DH表达法来求得link transformation.

$$^{0}_{n}T = ^{0}_{1}T \cdot ^{1}_{2}T \cdot ... \cdot ^{n-1}_{n}T$$

$$^{0}P = {^{0}_{n}T} \cdot {^{n}P}$$

## Inverse Kinematics 逆运动学

### 什么是逆运动学？

通过正运动学，我们可以在已知关节角度的情况下，求得变换矩阵$^{W}_{H}T$和$^{W}P$. 而在逆运动学的加持下，我们可以计算出，已知空间某一位置有一个物体，我们的机械臂各关节需要运动到什么位置才能抓取它。即已知$^{W}P$和$^{H}P$，求$^{W}_{H}T$。

$$^{W}_{H}T = ^{0}_{6}T = \begin{bmatrix}^{0}_{6}R & ^{0}P_{6_{org}}\\0 & 1 \\\end{bmatrix} = \begin{bmatrix}| & | & | & | \\^{0}\hat{X}_{6} & ^{0}\hat{Y}_{6} & ^{0}\hat{Z}_{6} &^{0}P_{6_{org}} \\| & | & | & | \\0 & 0 & 0 & 1 \\\end{bmatrix}$$

整个$^{0}_{6}T$共有6个自由度和6个限制条件。

### 六轴机械臂的逆运动学

机器人的逆向运动学是，已知末端的位置和姿态，以及所有连杆的几何参数下，求解关节的位置。因为机械臂是nonlinear transendental equations，6个未知数，6个方程并不代表其具有唯一解。我们需要在出现多解的时候，合理地挑选合适的解。一般的方法是选择离当前状态最近的解，或者选择避开障碍物的解法。逆运动学求解通常有两大类方法：解析法, 数值法。在求解方式上，解析法会因机械臂结构的不同而有所差异，而数值法通常可以具有统一的求解方式。

##### 六轴机械臂的逆运动学解析解

现在假设一个六轴机械手臂需要操作某个桌子上的水杯。它需要夹住放在桌子上的水杯。 

![img_v3_02j9_032c2f41-8ec4-4436-bcc0-a98859de61eg](attachments/A311dGJIdopJ35xO3JQcnMM4nFd/img_003.jpg)

<p class="kb-image-caption">图例</p>
![img_v3_02j9_e31c961d-deff-4747-9753-46d2a108386g](attachments/A311dGJIdopJ35xO3JQcnMM4nFd/img_004.jpg)

<p class="kb-image-caption">图例</p>

$${^{i-1}_iT}  = \begin{bmatrix}\cos(\theta_{i}) & -\sin(\theta_{i}) & 0 & a_{i-1}\\\cos(\alpha_{i-1})\sin(\theta_{i})& \cos(\alpha_{i-1})\cos(\theta_{i}) & -\sin(\alpha_{i-1}) & -\sin(\alpha_{i-1})d_{i}\\\sin(\alpha_{i-1})\sin(\theta_{i}) & \sin(\alpha_{i-1})\cos(\theta_{i}) & \cos(\alpha_{i-1}) & \cos(\alpha_{i-1})d_{i}\\0 & 0 & 0 & 1\\\end{bmatrix} $$

$$^{base}_{cup}T = {^{base}_{table}T} \cdot {^{table}_{cup}T} = \begin{bmatrix}1 & 0 & 0 & 830\\0 & 1 & 0 & 20\\0 & 0 & 1 & 330\\0 & 0 & 0 & 1\\\end{bmatrix}\begin{bmatrix}\cos(35^\circ) & -\sin(35^\circ) & 0 & -280\\\sin(35^\circ) & \cos(35^\circ) & 0 & 250\\0 & 0 & 1 & 62.5\\0 & 0 & 0 & 1\\\end{bmatrix}$$

$$^{base}_{cup}T = {^{base}_{0}T} \cdot {^{0}_{6}T} \cdot ^{6}_{cup}T = \begin{bmatrix}1 & 0 & 0 & 0\\0 & 1 & 0 & 0\\0 & 0 & 1 & 373\\0 & 0 & 0 & 1\\\end{bmatrix}{^{0}_{6}T}\begin{bmatrix}0 & 0 & 1 & 0\\0 & -1 & 0 & 0\\1 & 0 & 0 & 206\\0 & 0 & 0 & 1\\\end{bmatrix}$$

$${^0_6T} = \begin{bmatrix}1 & 0.57 & 0.81 & 381.3\\0 & -0.81 & 0.57 & 151.8\\1 & 0 & 0 & 19.5\\0 & 0 & 0 & 1\\\end{bmatrix} = \begin{bmatrix}^{0}_{6}R & ^{0}P_{6_{org}}\\0 & 1 \\\end{bmatrix}$$

 

目前市面上大多数的机械手臂被设计成了具有解析解的形式。如六轴机械臂，相邻的后三轴交与一点, $\hat{Z}_{1}， \hat{Z}_{2}，\hat{Z}_{3}$控制末端夹爪的位置，$\hat{Z}_{4}， \hat{Z}_{5}，\hat{Z}_{6}$控制末端夹爪产生特定的姿态。因为$\hat{Z}_{4}， \hat{Z}_{5}，\hat{Z}_{6}$三个轴交与一点，

$${^{0}P_{6_{org}}} = {^{0}P_{4_{org}}} = {^{0}_{1}T} \cdot {^{1}_{2}T} \cdot {^{2}_{3}T} \cdot {^{3}P_{4_{org}}} $$

$${^0_1T}  = \begin{bmatrix}\cos(\theta_{1}) & -\sin(\theta_{1}) & 0 & a_{0}\\\cos(\alpha_{0})\sin(\theta_{1})& \cos(\alpha_{0})\cos(\theta_{1}) & -\sin(\alpha_{0}) & -\sin(\alpha_{0})d_{1}\\\sin(\alpha_{0})\sin(\theta_{1}) & \sin(\alpha_{0})\cos(\theta_{1}) & \cos(\alpha_{0}) & \cos(\alpha_{0})d_{1}\\0 & 0 & 0 & 1\\\end{bmatrix} = \begin{bmatrix}\cos(\theta_{1}) & -\sin(\theta_{1}) & 0 & 0\\\sin(\theta_{1}) & \cos(\theta_{1}) & 0 & 0\\0 & 0 & 1 & 0\\0 & 0 & 0 & 1\\\end{bmatrix}$$

$${^1_2T}  = \begin{bmatrix}\cos(\theta_{2}) & -\sin(\theta_{2}) & 0 & a_{1}\\\cos(\alpha_{1})\sin(\theta_{2})& \cos(\alpha_{1})\cos(\theta_{2}) & -\sin(\alpha_{1}) & -\sin(\alpha_{1})d_{2}\\\sin(\alpha_{1})\sin(\theta_{2}) & \sin(\alpha_{1})\cos(\theta_{2}) & \cos(\alpha_{1}) & \cos(\alpha_{1})d_{2}\\0 & 0 & 0 & 1\\\end{bmatrix} = \begin{bmatrix}\cos(\theta_{2}) & -\sin(\theta_{2}) & 0 & -30\\0 & 0 & 1 & 0\\-\sin(\theta_{2}) & -\cos(\theta_{2}) & 0 & 0\\0 & 0 & 0 & 1\\\end{bmatrix}$$

$${^2_3T}  = \begin{bmatrix}\cos(\theta_{3}) & -\sin(\theta_{3}) & 0 & a_{2}\\\cos(\alpha_{2})\sin(\theta_{3})& \cos(\alpha_{2})\cos(\theta_{3}) & -\sin(\alpha_{2}) & -\sin(\alpha_{2})d_{3}\\\sin(\alpha_{2})\sin(\theta_{3}) & \sin(\alpha_{2})\cos(\theta_{3}) & \cos(\alpha_{2}) & \cos(\alpha_{2})d_{3}\\0 & 0 & 0 & 1\\\end{bmatrix} = \begin{bmatrix}\cos(\theta_{3}) & -\sin(\theta_{3}) & 0 & 340\\\sin(\theta_{3}) & \cos(\theta_{3}) & 0 & 0\\0 & 0 & 1 & 0\\0 & 0 & 0 & 1\\\end{bmatrix}$$

$ {^{3}P_{4_{org}}}  = \begin{bmatrix} a_{3}\\ -\sin(\alpha_{3})d_{4}\\ \cos(\alpha_{3})d_{4}\\1\\\end{bmatrix}  = \begin{bmatrix} -40\\338\\ 0\\1\\\end{bmatrix} $， $ {^{0}P_{6_{org}}}  = \begin{bmatrix} 381.3\\151.8\\19.5 \\1\\\end{bmatrix} $

联立可得

$$\theta_3 = 2.5^\circ\\\theta_2 = -52.2^\circ\\\theta_1 = 21.8^\circ$$

由$\theta_3 = 2.5^\circ, \theta_2 = -52.2^\circ, \theta_1 = 21.8^\circ$可得${^{0}_{3}R} = \begin{bmatrix}0.6 & 0.7 & -0.37 \\0.24 & 0.28 & 0.92 \\0.76 & -0.64 & 0 \\\end{bmatrix} $

且${^0_6R} = \begin{bmatrix}1 & 0.57 & 0.81 \\0 & -0.81 & 0.57 \\1 & 0 & 0 \\\end{bmatrix} ={^0_3R} \cdot {^3_6R}$, 

得出${^3_6R} = {^0_3R}^{-1} \cdot {^0_6R} = \begin{bmatrix}0.76 & 0.15 & 0.63 \\0.64 & 0.17 & 0.74 \\0 & -0.97 & 0.23 \\\end{bmatrix} $

$${^3_4T}  = \begin{bmatrix}\cos(\theta_{4}) & -\sin(\theta_{4}) & 0 & a_{3}\\\cos(\alpha_{3})\sin(\theta_{4})& \cos(\alpha_{3})\cos(\theta_{4}) & -\sin(\alpha_{3}) & -\sin(\alpha_{3})d_{4}\\\sin(\alpha_{3})\sin(\theta_{4}) & \sin(\alpha_{3})\cos(\theta_{4}) & \cos(\alpha_{3}) & \cos(\alpha_{3})d_{4}\\0 & 0 & 0 & 1\\\end{bmatrix} = \begin{bmatrix}\cos(\theta_{4}) & -\sin(\theta_{4}) & 0 & -40\\0 & 0 & 0 & 338\\-\sin (\theta_{4}) & -\cos(\theta_{4})& -1 & 0\\0 & 0 & 0 & 1\\\end{bmatrix}$$

$${^4_5T}  = \begin{bmatrix}\cos(\theta_{5}) & -\sin(\theta_{5}) & 0 & a_{4}\\\cos(\alpha_{4})\sin(\theta_{5})& \cos(\alpha_{4})\cos(\theta_{5}) & -\sin(\alpha_{4}) & -\sin(\alpha_{4})d_{5}\\\sin(\alpha_{4})\sin(\theta_{5}) & \sin(\alpha_{4})\cos(\theta_{5}) & \cos(\alpha_{4}) & \cos(\alpha_{4})d_{5}\\0 & 0 & 0 & 1\\\end{bmatrix} = \begin{bmatrix}\cos(\theta_{5}) & -\sin(\theta_{5}) & 0 & 0\\\sin(\theta_{5}) & \cos(\theta_{5})& -1 & 0\\0 & 0 & 0 & 0\\0 & 0 & 0 & 1\\\end{bmatrix}$$

$${^5_6T}  = \begin{bmatrix}\cos(\theta_{6}) & -\sin(\theta_{6}) & 0 & a_{5}\\\cos(\alpha_{5})\sin(\theta_{6})& \cos(\alpha_{5})\cos(\theta_{6}) & -\sin(\alpha_{5}) & -\sin(\alpha_{5})d_{6}\\\sin(\alpha_{5})\sin(\theta_{6}) & \sin(\alpha_{5})\cos(\theta_{6}) & \cos(\alpha_{5}) & \cos(\alpha_{5})d_{6}\\0 & 0 & 0 & 1\\\end{bmatrix} = \begin{bmatrix}\cos(\theta_{6}) & -\sin(\theta_{6}) & 0 & 0 \\0 & 0 & 1 & 0\\-\sin(\theta_{6}) & -\cos(\theta_{6}) & 0 & 0\\0 & 0 & 0 & 1\\\end{bmatrix}$$

$${^{0}P_{6_{org}}} = {^{0}_{1}T} \cdot {^{1}_{2}T} \cdot {^{2}_{3}T} \cdot{^{3}_{4}T} \cdot {^{4}_{5}T} \cdot {^{5}_{6}T} \cdot {^{6}P_{6_{org}}} $$

$ {^{0}P_{6_{org}}}  = \begin{bmatrix} 381.3\\151.8\\19.5 \\1\\\end{bmatrix} $, $ {^{6}P_{6_{org}}}  = \begin{bmatrix}0\\0\\0 \\1\\\end{bmatrix} $,

联立可得

$$\theta_6 = ...\\\theta_5 = ...\\\theta_4 = ...$$

##### 六轴机械臂的逆运动学数值解

## 机械臂精度补偿

机器人的定位误差是一个衡量机器人性能好坏的关键指标，定位误差包括了两种，一种是**重复定位误差**，其代表的是指定同一个位置，反复多次定位过去所产生的误差。另一种是**绝对定位误差**，其代表的是期待位姿值和实际位姿值得误差。研究如何补偿机器人运动学参数误差，进而提高机器人末端绝对定位精度具有重大的意义。参考资料

https://zhuanlan.zhihu.com/p/349074802

https://github.com/zhm-real/PathPlanning

https://blog.csdn.net/weixin_36965307/article/details/105222852

[台大机器人学之运动学——林沛群（含课件+书籍）\_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1v4411H7ez/?spm_id_from=333.337.search-card.all.click&vd_source=c8041efd376e7f34e73272f6ae86b7a5)

https://zhuanlan.zhihu.com/p/265458771

https://medium.com/acm-juit/probabilistic-roadmap-prm-for-path-planning-in-robotics-d4f4b69475ea

https://mp.weixin.qq.com/s/4KHwFOTPgESs1_kNBptcAg

https://zhuanlan.zhihu.com/p/8897959791

http://www.diag.uniroma1.it/\~deluca/rob1_en/Article_KinInvPuma600.pdf

---
title: 机械臂动力学
url: https://www.feishu.cn/docx/RKGmdm3HIogerkx8hMcc2oXMnBp
quality: raw
feishu_formatted_at: '2026-06-28T04:31:00+00:00'
equations_repaired_at: '2026-06-28T04:31:00+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
sheets_expanded_at: '2026-06-29T10:25:36+00:00'
---

# Velocity and Static Force

## 1.1 Velocity Propagation from link to link

速度的坐标变换

$$^BV_Q = \frac{d}{dt} {^BP_Q}$$

*$^A(^BV_Q) = {^A(\frac{d}{dt} {^BP_Q})} = {^A_BR}{^BV_Q}$*

$$v_C = {^U V_{C_{org}}}$$

角速度的坐标变换

Frame B 的转动在 frame A 的表达 $^A \Omega _B$

Frame B 的转动在 frame C 的表达 $^C(^A \Omega _B) = {^C_A R} {^A \Omega _B}$

Frame C 的角速度在 frame U下的表达 $\omega _C = {^U\Omega _C}$

### 多坐标系下速度和角速度的分析

$$\vec{r_A} = x_A \hat{I} + y_A \hat{J}\\=\vec{r_B} + \vec{r_{A/B}}\\=(x_B \hat{I} + y_B \hat{J}) + (x_{A/B} \hat{I} + y_{A/B} \hat{J})\\=(x_B \hat{I} + y_B \hat{J}) + (x'_{A/B} \hat{i} + y'_{A/B} \hat{j})$$

对等式两边同时取微分得到

$$\vec{v_A} = (\dot{x_B} \hat{I} + \dot{y_B} \hat{J}) + (\dot{x'}_{A/B} \hat{i} + \dot{y'}_{A/B} \hat{j}) + (x'_{A/B} \dot{\hat{i}} + y'_{A/B} \dot{\hat{j}})\\=\vec{v_B} + \vec{v_{rel}} + \vec\omega \times \vec{r_{A/B}}$$

因此，对机器人来说，假设有一点Q

$$^AV_Q = {^AV_{B_{org}}} + {^A_BR^BV_Q} +  {^A\Omega_B} \times {^A_BR ^BP_Q}$$

### 对Rotation Joint来说

$^i\omega_{i+1} = {^i\omega_{i}} + {^i_{i+1}R}(\dot{\theta_{i+1}}\hat{^{i+1}Z_{i+1}})$ 两边乘以$^{i+1}_iR$, 

$$^{i+1}\omega_{i+1} = {^{i+1}_iR}{^i\omega_{i}} +\dot{\theta_{i+1}}\hat{^{i+1}Z_{i+1}}$$

$^iv_{i+1} = {^iv_{i}} + {^i\omega_i} \times ^iP_{i+1}$ 两边乘以$^{i+1}_iR$, 

$$^{i+1}v_{i+1} = {^{i+1}_iR}({^iv_{i}} + {^i\omega_i} \times ^iP_{i+1})$$

### 对Prismatic Joint来说

$^i\omega_{i+1} = {^i\omega_i} $  两边乘以$^{i+1}_iR$,

$$^{i+1}\omega_{i+1} =  {^{i+1}_i R}{^i\omega_i} $$

$^iv_{i+1} = {^iv_i} +  {^i\omega_i} \times ^iP_{i+1} + {^i_{i+1}R} \dot{d_{i+1}}{^{i+1} \hat{Z}_{i+1}}$两边乘以$^{i+1}_iR$ 

$$^{i+1} v_{i+1} = ^{i+1}_iR({^iv_i} +  {^i\omega_i} \times ^iP_{i+1}) +  \dot{d_{i+1}}{^{i+1} \hat{Z}_{i+1}}$$

### Application of Jacobian Matrix in Robotics

令 

$\hat{x} = f(\hat{\theta})$,  $\dot{\hat{x}}  = \frac{\partial f}{\partial{\hat{\theta}}}  \frac{d \hat{\theta}}{dt}= {J(\hat{\theta})}\dot{\hat{\theta}} $

映射了机械臂末端在笛卡尔空间的速度和各个关节的旋转速度之间的关系。如何从末端点的速度，推断出关节空间内每一个关节的速度？

$$\dot{\hat{\theta}} = J^{-1}(\hat\theta)\dot x$$

如果雅可比矩阵不可逆，

- Workspace boundary singularitiy
- Workspace interior singularity

当一个机械手在奇异点时,

- Lost one or more DOF

### Example: A RR Manipulator

Calculate the velocity propagation from link to link

$$^0_1T = \begin{bmatrix}c_1 & -s_1 & 0 & 0 \\s_1 & c_1 & 0 & 0 \\0 & 0 & 1 & 0 \\0 & 0 & 0 & 1 \\\end{bmatrix}$$

$$^1_2T = \begin{bmatrix}c_2 & -s_2 & 0 & l_1 \\s_2 & c_2 & 0 & 0 \\0 & 0 & 1 & 0 \\0 & 0 & 0 & 1 \\\end{bmatrix}$$

$$^2_3T = \begin{bmatrix}1 & 0 & 0 & l_2 \\0 & 1 & 0 & 0 \\0 & 0 & 1 & 0 \\0 & 0 & 0 & 1 \\\end{bmatrix}$$

根据之前的推导

$$^1\omega_1 = {^1_0R}^0\omega_0 + \dot\theta_1 \hat{^1Z_1} = \begin{bmatrix}0 \\0 \\\dot{\theta_1}\end{bmatrix}$$

$$^2\omega_2 = {^2_1R}^1\omega_1 + \dot\theta_2 \hat{^2Z_2} = \begin{bmatrix}0 \\0 \\\dot{\theta_1} + \dot{\theta_2}\end{bmatrix}$$

$$^3\omega_3 = {^3_2R}^2\omega_2 + \dot\theta_3 \hat{^3Z_3} = {^2\omega_2} = \begin{bmatrix}0 \\0 \\\dot{\theta_1} + \dot{\theta_2}\end{bmatrix}$$

$$^1v_1 = {^1_0R}({^0v_0} + ^0\omega_0 \times {^0P_1}) = \begin{bmatrix}0 \\0 \\0\end{bmatrix}$$

$$^2v_2 = {^2_1R}({^1v_1 } + ^1\omega_1 \times {^1P_2}) = \begin{bmatrix}c_2 & -s_2 & 0  \\s_2 & c_2 & 0 \\0 & 0 & 1  \\\end{bmatrix}\begin{bmatrix}0 \\l_1 \dot\theta_1 \\0\end{bmatrix} = \begin{bmatrix}l_1 s_2 \dot \theta_1 \\l_1 c_2 \dot \theta_1 \\0\end{bmatrix}$$

$$^3v_3 = {^3_2R}({^2v_2} + ^2\omega_2 \times ^2P_3) = \begin{bmatrix}l_1 s_2 \dot \theta_1 \\l_1 c_2 \dot \theta_1 \\0\end{bmatrix} + \begin{bmatrix}0 \\0 \\\dot{\theta_1} + \dot{\theta_2}\end{bmatrix} \times \begin{bmatrix}l_2 \\0 \\0\end{bmatrix} = \begin{bmatrix}l_1 s_2 \dot \theta_1 \\l_1 c_2 \dot \theta_1 + l_2(\dot\theta_1 + \dot\theta_2) \\0\end{bmatrix}$$

### Jacobian matrix in velocity domain

$$^0v_3 = {^0_1R}{^1_2R}{^2_3R}{^3v_3}=\begin{bmatrix}-l_1 s_2 \dot \theta_1 - l_2s_{12}(\dot\theta_1+\dot\theta_2) \\l_1 c_2 \dot \theta_1 + l_2c_{12}(\dot\theta_1 + \dot\theta_2) \\0\end{bmatrix} $$

$$^0v_3 = \begin{bmatrix}v_x \\v_y \\v_z\end{bmatrix} = \begin{bmatrix}-l_1 s_2- l_2s_{12} & - l_2s_{12} \\l_1 c_2 + l_2c_{12} & l_2c_{12} \\0 & 0\end{bmatrix}\begin{bmatrix}\dot\theta_1 \\\dot\theta_2 \\\end{bmatrix}$$

 

$$\begin{bmatrix}v_x \\v_y \\\end{bmatrix} = \begin{bmatrix}-l_1 s_2- l_2s_{12} & - l_2s_{12} \\l_1 c_2 + l_2c_{12} & l_2c_{12} \\\end{bmatrix}\begin{bmatrix}\dot\theta_1 \\\dot\theta_2 \\\end{bmatrix} = J(\hat\theta)\dot{\hat{\theta}}$$

如果 $\det(J) = l_1 l_2 (s_{12}c_1 - s_1c_{12}) = l_1l_2\sin_(\theta_1 + \theta_2 - \theta_1) = l_1l_2s_2 = 0$

可得

$\theta_2 = 0$or $\theta_2 = 180$

### 直接通过几何关系计算

## 1.2 Static Force Propagation from link to link

与机械臂的运动学相反，动力学中，是末端夹爪承受的力传递到了每个关节。通过计算每个关节承受的力，可以保证每个关节所承受的力不超过最大可承受的力。

### 力和力矩的传递公式为

$$^if_i = {^if_{i+1}} = {^i_{i+1}R}{^{i+1}f_{i+1}}$$

$$^in_i = {^in_{i+1}} + {^iP_{i+1}} \times {^if_i} = {^i_{i+1}}R {^{i+1}n_{i+1}} + {^iP_{i+1}} \times {^if_i}$$

### 如果关节是一个转动关节

$$\tau_i = {^in_i^T} \space {^i\hat Z_i}$$

将原本在空间任意方向的力矩投影到z轴方向，这是马达所承受的力矩

其他方向的力矩分量，将由机械臂的结构限制承担

### 如果关节是一个平移关节

$$\tau_i = {^if_i^T} \space {^i \hat Z_i}$$

### Example: A RR Manippulator

假设连杆末端受到一个力 $^3F = \begin{bmatrix}f_x \\ f_y\\0\end{bmatrix}$

$$^3f_3 = {^3F}$$

$^3n_3 = 0$ 假定 $^3F$作用在末端点质心

$$^2f_2 = {^2_3R}\space{^3f_3} = I{^3F} = \begin{bmatrix}f_x \\ f_y\\0\end{bmatrix}$$

$$^2n_2 = {^2_{3}}R \space {^{3}n_{3}} + {^2P_{3}} \times {^2f_2} = \begin{bmatrix}l_2\\0\\0\end{bmatrix} \times \begin{bmatrix}f_x \\ f_y\\0\end{bmatrix} = \begin{bmatrix}0 \\ 0\\ l_2 f_y\end{bmatrix}$$

$$^1f_1 = {^1_2R} \space {^2f_2} =\begin{bmatrix}c_2 & -s2 & 0\\s_2 & c_2 & 0\\0 & 0& 1\\\end{bmatrix}\begin{bmatrix}f_x \\ f_y\\0\end{bmatrix}=\begin{bmatrix}c_2 f_x - s2 f_y\\ s_2 f_x + c_2 f_y\\0\end{bmatrix}$$

$$^1n_1 = {^1n_2} + {^1P_2} \times {^1f_1} = {^1_{2}}R {^{2}n_{2}} + {^1P_{2}} \times {^1f_1} = \begin{bmatrix}c_2 & -s2 & 0\\s_2 & c_2 & 0\\0 & 0& 1\\\end{bmatrix} \begin{bmatrix}0 \\ 0\\ l_2 f_y\end{bmatrix}+ \begin{bmatrix}l_1 \\ 0\\ 0\end{bmatrix} \times\begin{bmatrix}c_2 f_x - s2 f_y\\ s_2 f_x + c_2 f_y\\0\end{bmatrix} = \begin{bmatrix}0\\0\\l_1 s_2 f_x + l_1 c_2 f_y + l_2f_y\\\end{bmatrix}$$

### Jacobian in the force doman

$$\tau_1 = {^1n_1^T}\space {^1\hat Z_1} = l_1 s_2 f_x + (l_1 c_2 + l_2)f_y$$

$$\tau_2 = {^2n_2^T} \space {^2\hat Z_2} = l_2f_y$$

$$\bold{\tau} = \begin{bmatrix}l_1s_1 & l_2+l_1c_2\\0 & l_2 \\\end{bmatrix}\begin{bmatrix}f_x\\f_y \\\end{bmatrix}$$

如果我们忽略重力，根据 the principle of virtual work

$$F^T \delta X = \Gamma^T \delta \theta$$

同时，根据之前所讲的内容 

$$ \delta X = J \delta \theta$$

可得

$$F^T J \delta \theta = \Gamma^T \delta\theta$$

$$\Gamma ^T = F^T J$$

$$\Gamma = J^T F$$

如果J奇异，那么F在某些方向的增大缩小就和$\Gamma$无关

## 1.3 General velocity and force representation

$$^{i+1}\omega_{i+1} = {^{i+1}_iR}{^i\omega_{i}} +\dot{\theta_{i+1}}\hat{^{i+1}Z_{i+1}}$$

$$^{i+1}v_{i+1} = {^{i+1}_iR}({^iv_{i}} + {^i\omega_i} \times ^iP_{i+1})$$

令{i+1} frame 为A frame， {i} frame 为B frame，则

$$^{A}v_{A} = {^{A}_BR}{^Bv_{B}} + {^{A}_BR}{^B\omega_B} \times {^BP_{A}} = {^{A}_BR}{^Bv_{B}} + (-{^BP_{A}}) \times{^{A}_BR}   {^B\omega_B}  = {^{A}_BR}{^Bv_{B}} +{^AP_{B}} \times {^{A}_BR} {^B\omega_B}$$

$$^A\omega_A = {^A_BR}\space {^B\omega_B} +\dot{\theta_{A}} \space \hat{^{A}Z_{A}}$$

$\begin{bmatrix}^Av_A\\^A\omega_A\end{bmatrix} = \begin{bmatrix}^A_BR & ^AP_{BORG} \times {^A_BR}\\0 & {^A_BR}\end{bmatrix}\begin{bmatrix}^Bv_B\\^B\omega_B\end{bmatrix}$, 两边取逆得$\begin{bmatrix}^Bv_B\\^B\omega_B\end{bmatrix} = \begin{bmatrix}^B_AR & -{^B_AR} \space ^AP_{BORG} \times \\0 & {^B_AR}\end{bmatrix}\begin{bmatrix}^Av_A\\^A\omega_A\end{bmatrix}$

$$^if_i = {^if_{i+1}} = {^i_{i+1}R}{^{i+1}f_{i+1}}$$

$$^in_i = {^in_{i+1}} + {^iP_{i+1}} \times {^if_i} = {^i_{i+1}}R {^{i+1}n_{i+1}} + {^iP_{i+1}} \times {^if_i}$$

令{i+1} frame 为A frame， {i} frame 为B frame，则

$$^Bf_B = {^Bf_{A}} = {^B_{A}R}{^{A}f_{A}}$$

$$^Bn_B = {^Bn_{A}} + {^BP_{A}} \times {^Bf_B} = {^B_{A}}R {^{A}n_{A}} + {^BP_{A}} \times {^Bf_B}$$

$\begin{bmatrix}^Bf_B\\^Bn_B\end{bmatrix} = \begin{bmatrix}^B_AR & 0 \\^BP_A \times {^B_AR} & {^B_AR}\end{bmatrix}\begin{bmatrix}^Af_A\\^An_A\end{bmatrix}$, 两边取逆得$\begin{bmatrix}^Af_A\\^An_A\end{bmatrix} = \begin{bmatrix}^A_ABR & 0 \\^AP_{BORG}  & {^A_BR}\end{bmatrix}\begin{bmatrix}^Bf_B\\^Bn_B\end{bmatrix}$

## 操作臂动力学

### 2.1 基本动力学

$$^BA_Q = \frac{d \space ^BV_Q}{dt} = \lim_{t \to 0} \frac{^BV_Q(t+\delta t)-{^BV_Q(t)}} {\delta t}$$

$$^A(^BA_Q) = {^A_BR} \space {^BA_Q}$$

$$^UA_{C_{org}} = a_C$$

$$^A \dot\Omega _B = \frac{d \space {^A\Omega _B}}{dt} = \lim_{t \to 0} \frac{^A\Omega_B(t+\delta t)-{^A\Omega_B(t)}} {\delta t}$$

$$^C(^A \dot\Omega _B) = {^C_AR} \space {^A \dot\Omega _B}$$

$$^U \dot \Omega_C = \dot \omega_C$$

多坐标系的速度变换如下 (假设B frame 相对A frame 有平移有旋转， 物体Q相对B只有平移）

$$^AV_Q = {^AV_{B_{org}}} + {^A_BR^BV_Q} +  {^A\Omega_B} \times {^A_BR ^BP_Q}$$

对两边求导可得

$$^A \dot V_Q \\= {^A \dot V_{B_{org}}} + \frac{d \space ^A_BR ^BV_Q}{dt} + \frac{d \space {^A\Omega_B} \times {^A_BR ^BP_Q}}{dt}\\$$

$$={^A \dot V_{B_{org}}} + (^A_BR\space ^B\dot V_Q + ^A\Omega_B \times  ^A_BR^BV_Q) + ({^A \dot\Omega_B} \times {^A_BR ^BP_Q} + {^A\Omega_B} \times \frac{d {^A_BR ^BP_Q}}{dt}) \\$$

$$={^A \dot V_{B_{org}}} + (^A_BR\space ^B\dot V_Q + ^A\Omega_B \times  ^A_BR^BV_Q) + ({^A \dot\Omega_B} \times {^A_BR ^BP_Q} + {^A\Omega_B} \times (^A_BR^BV_Q + ^A \Omega _B \times ^A_BR^BQ) \space)$$

$$={^A \dot V_{B_{org}}} + {^A_BR} \space {^B\dot V_Q} + 2 \space {^A\Omega_B}\times ^A_BR^BV_Q + ^A\dot \Omega \times {^A_BR} \space {^BQ}+ {^A\Omega_B} \times (^A\Omega_B \times ^A_BR^BQ)$$

可得，多坐标系下的加速度变换公式

$$^AA_Q = \\$$

${^A A_{B_{ORG}}}$\\\ 坐标系B原点相对于坐标系A的加速度

$+ ^A_BR^BA_Q$\\\点Q相对于坐标系B的加速度（旋转后）

$+ {^A \dot \Omega _B} \times {^A_BR} {^BP_Q}$\\\坐标系B相对于坐标系A旋转，造成点Q的切向加速度

$+ {^A\Omega_B} \times {^A\Omega_B} \times {^A_BR^BP_Q}$\\\坐标系B相对于坐标系A旋转， 造成点Q的法向加速度

$+ 2 {^A\Omega_B}\times {^A_BR ^BV_Q}$\\\科氏加速度

多坐标系的角速度变换如下 (假设B frame 相对A frame 有旋转， 物体Q相对B有旋转）

$$^A\Omega_Q = {^A\Omega_B} + {^A_BR}\space{^B\Omega_Q}$$

对两边求导可得，多坐标系下的角加速度变换公式

$${^A\dot \Omega_Q} = {^A\dot\Omega_B} + \frac{d \space {^A_BR^B\Omega_Q}}{dt} = {^A\dot\Omega_B} + {{^A_BR}\space {^B\dot\Omega_Q}} + {^A\Omega_B }\times {^A_BR} \space {^B\Omega_Q}$$

### 2.2 质量分布

什么是惯性张量？

对一个物体惯性矩的广义度量。坐标系A中的惯性张量 (Inertia tensor relative to frame A) 可以用如下的3x3矩阵表示：

$$^AI = \begin{bmatrix}I_{xx} & -I_{xy} & -I_{xz}\\-I_{xy} & I_{yy} & -I_{yz}\\-I_{xz} & -I_{yz} & I_{zz}\\\end{bmatrix}$$

惯性矩 （mass moment of intertia）

$$I_{xx} = \iiint\limits_V (y^2+z^2) \rho dV$$

$$I_{yy} = \iiint\limits_V (x^2+z^2) \rho dV$$

$$I_{zz} = \iiint\limits_V (x^2+y^2) \rho dV$$

惯量积（mass product of inertia）

$$I_{xy} = \iiint\limits_V xy \rho dV$$

$$I_{xz} = \iiint\limits_V xz \rho dV$$

$$I_{yz} = \iiint\limits_V yz \rho dV$$

对于一个对称的物体，当坐标系原点过质心，惯量积为0

### 平行移轴定理

假设C是坐落在刚体质心的坐标系，A为平移后的坐标系，则平行移轴定理可以表示为

$$^AI_{zz} = ^CI_{zz} + m(x^2_c + y^2_c)$$

$$^AI_{xy} = ^CI_{xy} - mx_cy_c$$

### 2.3 牛顿方程和欧拉方程

### 计算速度和加速度的外推法

|  | 角加速度外推法 | 线加速度外推法 |
| --- | --- | --- |
| 旋转轴 | ^{i+1}\omega_{i+1} = {^{i+1}_{i}R}{^i\omega_{i}} + \dot\theta_{i+1} \space \hat{^{i+1}Z_{i+1}} 两边同时求导 {^{i+1}\dot \omega_{i+1}} = {^{i+1}_{i}R}{^i \dot\omega _i} + {^{i+1}_{i}R} ^i\omega_i \times \dot \theta_{i+1} \hat{^{i+1}Z_{i+1}} + \ddot\theta_{i+1}\hat Z_{i+1} | ^iv_{i+1} = {^iv_{i}} + {^i\omega_i} \times ^iP_{i+1} 两边同时求导 ^ia_{i+1} = {^ia_i} + {^i\dot \omega _i} \times {^iP_{i+1}} + {^i \omega _i} \times {^i \omega _i} \times {^iP_{i+1}} 两边同乘 ^{i+1}_i R ^{i+1} a_{i+1} = ^{i+1}_i R（{^ia_i} + {^i\dot \omega _i} \times {^iP_{i+1}} + {^i \omega _i} \times ({^i \omega _i} \times {^iP_{i+1}})） |
| 平移轴 | ^{i+1}\dot\omega_{i+1} = {^{i+1}_iR} \space {^i\dot\omega_i} | ^ia_{i+1} = {^{i+1}_iR} ({^ia_i} + {^i\dot \omega _i} \times {^iP_{i+1}} + {^i \omega _i} \times ({^i \omega _i} \times {^iP_{i+1}})) + 2 \space({^i\omega_{i+1}} \times \dot{d}_{i+1}{^{i+1} \hat{Z}_{i+1}}) + {\ddot d_{i+1}{^{i+1}\hat Z_{i+1}}} |

|  | 角加速度外推法 | 线加速度外推法 |
|-|-|-|
| 旋转轴 | $^{i+1}\omega_{i+1} = {^{i+1}_{i}R}{^i\omega_{i}} + \dot\theta_{i+1} \space \hat{^{i+1}Z_{i+1}}$ 两边同时求导  <br/>${^{i+1}\dot \omega_{i+1}} = {^{i+1}_{i}R}{^i \dot\omega _i} + {^{i+1}_{i}R} ^i\omega_i \times \dot \theta_{i+1} \hat{^{i+1}Z_{i+1}} + \ddot\theta_{i+1}\hat Z_{i+1}$ | $^iv_{i+1} = {^iv_{i}} + {^i\omega_i} \times ^iP_{i+1}$两边同时求导  <br/>$^ia_{i+1} = {^ia_i} + {^i\dot \omega _i} \times {^iP_{i+1}} + {^i \omega _i} \times {^i \omega _i} \times {^iP_{i+1}}$两边同乘 $^{i+1}_i R$  <br/>$^{i+1} a_{i+1} = ^{i+1}_i R（{^ia_i} + {^i\dot \omega _i} \times {^iP_{i+1}} + {^i \omega _i} \times ({^i \omega _i} \times {^iP_{i+1}})）$ |
| 平移轴 | $^{i+1}\dot\omega_{i+1} = {^{i+1}_iR} \space {^i\dot\omega_i}$ | $^ia_{i+1} = {^{i+1}_iR} ({^ia_i} + {^i\dot \omega _i} \times {^iP_{i+1}} + {^i \omega _i} \times ({^i \omega _i} \times {^iP_{i+1}})) + 2 \space({^i\omega_{i+1}} \times  \dot{d}_{i+1}{^{i+1} \hat{Z}_{i+1}}) + {\ddot d_{i+1}{^{i+1}\hat Z_{i+1}}}$ |

连杆质心的线加速度计算公式

$$^i a_{C_i} = {^ia_i} +  {^i \dot\omega _i} \times {^iP_{C_i}} + {^i \omega _i} \times ({^i \omega _i} \times {^iP_{C_i}})$$

### 计算力和力矩的内推法

牛顿方程

$$F = \frac{dmv_c}{dt} = ma_c$$

欧拉方程

$$N = \frac{dI\omega}{dt} = {^CI}\dot\omega + {^C\dot{I}}\omega = {^CI}\dot\omega + \omega \times {^CI} \omega$$

令

$f_i = $连杆 i-1 作用在连杆i上的力

$n_i = $连杆i-1作用在连杆i上的力矩

力和力矩平衡方程为

$${^iF_i} = {^if_i} - {^i_{i+1}R}{^{i+1}f_{i+1}} = m{^ia_{C_i}}$$

$${^iN_i} = {^in_i} - {^in_{i+1}} - {^iP_{C_i}}\times{^if_i} - ({^iP_{i+1}} - {^iP_{C_i}})\times{^if_{i+1}} = {^{C_i}I} \space {^i\dot\omega_i} + {^i\omega_i}\times {^{C_i}I} \space {^i\omega_i}$$

| 力的内推法 | 力矩的内推法 |
| --- | --- |
| {^if_i} = {^i_{i+1}R} \space {^{i+1}f_{i+1}} + {^iF_i} | {^in_i} = {^iN_i} + {^i_{i+1}R} \space {^{i+1}n_{i+1}} + {^iP_{C_i}} \times {^iF_i} + {^iP_{i+1}}\times{^i_{i+1}R} \space {^{i+1}f_{i+1}} |

| 力的内推法 | 力矩的内推法 |
|-|-|
| ${^if_i} = {^i_{i+1}R} \space {^{i+1}f_{i+1}} + {^iF_i}$ | ${^in_i} = {^iN_i} + {^i_{i+1}R} \space {^{i+1}n_{i+1}} + {^iP_{C_i}} \times {^iF_i} + {^iP_{i+1}}\times{^i_{i+1}R} \space {^{i+1}f_{i+1}}$ |

### 计算作用在关节上的力矩

对于转动关节：

$$\tau_i = {{^in_i}^T} \space {^i\hat Z _i}$$

对于移动关节：

$$\tau_i = {{^if_i}^T} \space {^i \hat Z_i}$$

### 2.4 机械臂动力学方程

### 状态空间方程

$$\tau = M(\Theta)\ddot \Theta + V(\Theta, \dot \Theta) + G(\Theta)$$

分别为质量项，离心力和哥氏力，重力矢量

### 位形空间方程

$$\tau = M(\Theta)\ddot \Theta + B(\Theta)(\dot\Theta \dot \Theta) + C(\Theta)(\dot\Theta^2)+ G(\Theta)$$

其中$M(\Theta)$为质量矩阵，$B(\Theta)$是哥氏力系数矩阵，$C(\Theta)$是离心力系数矩阵，$G(\Theta)$是质量项

### 2.5 机械臂动力学的拉格朗日方程

基于能量的分析方法

机械臂的能量分为两种，分别是动能和势能

$$k_i = \frac{1}{2} m_i V_{c_i}^TV_{c_i} + \frac{1}{2} {^i\omega_i}^T {^{C_i}I_i}{^i\omega_i}$$

$$k = \sum_{i=1}^{n} k_i = k(\Theta, \dot\Theta) = \frac{1}{2}\dot\Theta^T M(\Theta)\dot\Theta$$

$$u_i = -m_i g^T \space {^0P_{C_i}} + u_{ref}$$

$$u = \sum_{i=1}^{n} u_i = u(\Theta)$$

拉格朗日方程为

$$L(\Theta, \dot\Theta) = k(\Theta, \dot\Theta) - u(\Theta)$$

等式两边同时求导可得

$$\tau = \frac{d}{dt} \frac{\partial L}{\partial \dot\Theta} - \frac{\partial L}{\partial \Theta} = \frac{d}{dt} \frac{\partial k}{\partial \dot\Theta} - \frac{\partial k}{\partial \Theta} + \frac{\partial u}{\partial \Theta} $$

### Example: A RP Manipulator

${^{C_1}I_1} = \begin{bmatrix}I_{xx1} & 0 & 0 \\0 & I_{yy1} & 0\\0 & 0 & I_{zz1}\\\end{bmatrix}$  ${^{C_2}I_2} = \begin{bmatrix}I_{xx2} & 0 & 0 \\0 & I_{yy2} & 0\\0 & 0 & I_{zz2}\\\end{bmatrix}$

$$k_1 = \frac{1}{2} m_1 (l_1 \dot\theta_1)^2 + \frac{1}{2} I_{zz1} \dot\theta_1^2$$

$$k_2 = \frac{1}{2} m_2 ( (d_2 \dot\theta_1)^2 + (\dot d_2)^2 ) + \frac{1}{2} I_{zz2}\dot\theta_1 ^2$$

$$k(\theta, \dot\theta) = \frac{1}{2} (m_1l_1^2 + m2d_2^2 + I_{zz1} + I_{zz2})\dot\theta_1^2 + \frac{1}{2}m_2\dot d_2^2$$

$$u(\theta) = (m_1l_1+m2d_2)g\sin(\theta_1) +(m_1l_1 +  m_2d_{2max})g$$

令 $\Theta = \begin{bmatrix}\theta_1 \\d_2\end{bmatrix}$,  $\dot\Theta = \begin{bmatrix}\dot\theta_1 \\\dot d_2\end{bmatrix}$

$$\frac{\partial k}{\partial \dot\Theta} =  \begin{bmatrix}(m_1l_1^2 + m2d_2^2 + I_{zz1} + I_{zz2})\dot\theta_1 & m_2\dot d_2\end{bmatrix}$$

$$\frac{d}{dt} \frac{\partial L}{\partial \dot\Theta} = \begin{bmatrix}(m_1l_1^2 + m2d_2^2 + I_{zz1} + I_{zz2})\ddot\theta_1 & m_2\ddot d_2\end{bmatrix}$$

$$\frac{\partial k}{\partial \Theta} = \begin{bmatrix}0 & m_2 \dot\theta_1^2 d_2\end{bmatrix}$$

$$\frac{\partial u}{\partial \Theta} = \begin{bmatrix}(m_1l_1+m2d_2)g\cos(\theta_1)  & m_2 g\sin(\theta_1)\end{bmatrix}$$

$$\tau_1 = (m_1l_1^2 + m2d_2^2 + I_{zz1} + I_{zz2})\ddot\theta_1 + m_2 d_2 \dot\theta_1 \dot d + (m_1l_1+m2d_2)g\cos(\theta_1)$$

$$\tau_2 = m_2 \ddot d_2 - m_2 d_2\dot\theta_1^2  + m_2 g\sin(\theta_1)$$

在关节空间

$$\tau = M(\Theta)\ddot \Theta + V(\Theta, \dot \Theta) + G(\Theta)$$

$$M(\Theta) = \begin{bmatrix}m_1l_1^2 + m2d_2^2 + I_{zz1} + I_{zz2} & 0 \\0 & m2\end{bmatrix}$$

$$V(\Theta, \dot \Theta) = \begin{bmatrix}2m_2 d_2 \dot \theta_1 \dot d_2 \\-m_2 d_2 \dot \theta_1^2\end{bmatrix}$$

$$ G(\Theta) = \begin{bmatrix}(m_1l_1+m2d_2)g\cos(\theta_1) \\m_2 g\sin(\theta_1)\end{bmatrix}$$

在笛卡尔空间

$$F = M_x(\theta)\ddot x + V_x(\theta, \dot \theta) + G_x(\theta)$$

$$\dot X = J\dot \Theta$$

$$\ddot X = \dot J \dot \Theta + J \ddot \Theta$$

$$\ddot \Theta = J^{-1}\ddot X - J^{-1}\dot J\dot \Theta$$

$$\Gamma = J^TF$$

$$F = J^{-T}\Gamma = J^{-T}M(\Theta)\ddot\Theta + J^{-T}V(\Theta, \dot\Theta) + J^{-T}G(\Theta)$$

$$M_x(\Theta) = J^{-T}M(\Theta)J^{-1}$$

$$V_x(\Theta, \dot \Theta) = J^{-T}(V(\Theta, \dot\Theta)-M(\Theta)J^{-1}\dot J \dot \Theta)$$

$$G_x(\Theta) = J^{-T}G(\Theta)$$

---
title: Ex9_Sol
source: converted:attachments/documents/CV_Visual-Navigation-b90f90f38f8a/Ex9_Sol.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-b90f90f38f8a/Ex9_Sol.pdf
  title: Ex9_Sol.pdf
---

# Visual Navigation 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universität München Lehrstuhl für Kommunikation und Navigation 

## Solution of Exercise 9 of January 24, 2020 

http://www.nav.ei.tum.de/visnav 

## – Problem 1 Solution 

a) First, we recognize that the vehicle position has only one degree of freedom: knowledge of the angle _ω_ = _α_ +<sup>_<u>ω</u>_</sup> 2<sup>(seeFigure1-1)issufficienttoplacethevehiclealongthecircleofradius</sup><sup>_r_.Wecanthen</sup> form the state vector in the following way: 

with _ω_ = _ω_<sup>˙</sup> the angular velocity and **m** _i_ = ( _mxi , myi_ )<sup>T</sup> the 2 _×_ 1 vector containing the ( _x, y_ ) coordinates of the _i_ -th landmark. We assume _M_ landmarks in the map. 

The motion model could be simply built by considering that the vehicle moves along the circular trajectory at a constant angular velocity, and the landmarks are static. We can therefore write 

with _∆t_ the time interval used. Note that **g** ( **x** _t−_ 1) is a linear vector function, thus we can write the motion model <u>in a linear form and obtain a linear state transition equation, described</u> by the state 

Figure 1-1: Vehicle trajectory and instantaneous <u>pose.</u> 

Winter Term 2019/2020 

Solution of Exercise 9 

1 

transition matrix **A** _t_ . 

At each step, we inject some error to compensate for the uncertainty on the actual angular velocity. Three possible choices are 

or 

or 

The first matrix only injects error in the angular velocity propagation, whereas the latter two also consider the propagation of uncertainty from the angular velocity to the angle, and thus can be thought as a more realistic setting. 

The choice of the observation model requires a more thoughtful process. The camera captures landmarks and computes their (planar) location in a local reference frame, as visualized in Figure 1-1. We use an alternative approach (i.e. alternative to the one given in the lectures) in modeling the measuring process: instead of considering the pixel coordinates as measurements, we consider the ’reconstructed’ feature points coordinates as measurements. Be careful: these are reconstructed in the reference frame attached to the platform. Therefore, observation of the _i_ -th landmark is 

The coordinate transformation that relates points expressed in the _{x, y}_ frame with points in the _{x_<sup>_′_</sup> _, y_<sup>_′_</sup> _}_ frame is 

with the rotation being expressed as 

and the translation between the two frames (vectorial distance between the two origins) is 

Inversion of (1-7) gives 

The observation model for the _i_ -th landmark is then 

When observing _L_ different landmarks we have then 

Solution of Exercise 9 

Winter Term 2019/2020 

2 

The Jacobian of function **h** ( **x** _t_ ) reads 

with 

The observation noise is described through matrix **Q** _t_ . Considering _L_ uncorrelated observation gives 

b) The state vector at time _t_ reads 

with covariance matrix 

Using these values and expression (1-4) we obtain the following predicted state vector: 

with corresponding covariance matrix 

Note that the accuracy of the predicted state decreases (only the kinematic part obviously). Also, note that the landmarks positions are indeed left unchanged in the prediction step. 

An observation of the first landmark position then becomes available: 

Solution of Exercise 9 

Winter Term 2019/2020 

The Jacobian matrix **H** is (by using _ω_<sup>¯</sup> _t_ +1 = 0 _._ 7854 and **m** ¯ 1 = (0 _._ 7071 _,_ 0 _._ 7071)<sup>T</sup> ) 

The Kalman gain matrix reads then 

The result of the update step reads finally 

and 

Note that the confidence on the positioning of both vehicle and landmarks increases with respect to the initial values at time _t_ . Also, note that the position of the second landmark is updated despite not being observed at the given time _t_ +1. This is due to the preexisting correlation between the landmarks positions. 

Winter Term 2019/2020 

Solution of Exercise 9 

4

---

## 源文件

- [Ex9_Sol.pdf](attachments/documents/CV_Visual-Navigation-b90f90f38f8a/Ex9_Sol.pdf)

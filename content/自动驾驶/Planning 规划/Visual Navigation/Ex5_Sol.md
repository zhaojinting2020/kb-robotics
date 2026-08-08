---
title: Ex5_Sol
source: converted:attachments/documents/CV_Visual-Navigation-1f243b59036b/Ex5_Sol.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-1f243b59036b/Ex5_Sol.pdf
  title: Ex5_Sol.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Solution of Exercise 5 of December 13, 2019** 

http://www.nav.ei.tum.de/visnav 

## **Problem 1 – Solution** 

**_Two view geometry_** 

- a) The fundamental matrix **F** is **F** = **_⌦_ e** _0_ **P**<sup>_0_</sup> **P**<sup>+</sup> . The epipole **e**<sup>_0_</sup> is the projection of the camera center **C** onto the second focal plane characterized by **P**<sup>_0_</sup> : 

The pseudoinverse **P**<sup>+</sup> of matrix **P** is 

Thus, 

b) Using the previously derived fundamental matrix **F** , we can obtain the locus of potential correspondences in the second focal plane to the point (5 _,_ 2)<sup>T</sup> in the first focal plane: this is the epipolar line **l**<sup>_0_</sup> . 

To verify which of the given points could correspond to (5 _,_ 2)<sup>T</sup> , we only need to verify whether the points belong to the line **l**<sup>_0_</sup> : 

Therefore only the second and third points could correspond to point (5 _,_ 2)<sup>T</sup> . 

c) We can solve for **e** in two ways: either by computing the null vector of the fundamental matrix **F** or by projecting the camera center related to matrix **P**<sup>_0_</sup> onto the first focal plane relate to **P** . The null vector approach gives 

_Solution of Exercise 5_ 

_Winter Term 2019/2020_ 

1 

**F** . The solution of the system is given by 

Alternatively, we could find the epipole **e** as **e** = **PC**<sup>_0_</sup> . The camera center related to the second camera matrix **P**<sup>_0_</sup> is the null vector of **P**<sup>_0_</sup> : 

The solution of the system is given by 

d) The epipole **e**<sup>_0_</sup> is easily found as 

The epipole **e** can be found as **e** = **PC**<sup>_0_</sup> . Writing the camera center **C**<sup>_0_</sup> = ( **C**<sup>˜</sup><sup>_0_</sup> _,_ 1)<sup>T</sup> , with **C**<sup>˜</sup><sup>_0_</sup> the Euclidean coordinates, we can compute it as the null vector of camera matrix **P**<sup>_0_</sup> : 

from which 

The fundamental matrix **F** is 

e) 

f) The essential matrix **E** is 

_Solution of Exercise 5_ 

_Winter Term 2019/2020_ 

2 

The epipole **e**<sup>_0_</sup> is 

Therefore 

We need the camera center relative to camera matrix **P** 2: this is the null vector 

Since the null vector of camera matrix **P** is the camera center **C** for which 

it follows that vector **HC** is the null vector of **P** 2, and thus the camera center **C** 2 is **C** 2 = **HC** . The epipole **e**<sup>_0_</sup> is then 

The epipole **e**<sup>_0_</sup> 2<sup>remains unchanged by the transformation.</sup> The essential matrix is, using **P**<sup>_0_</sup> = ⇥ **R** _|_<sup>˜</sup> **t** ⇤ = **RP** + ⇥ **0** _|_<sup>˜</sup> **t** ⇤, is then computed as 

h) The center of the camera moves along the X-axis. After the translation, the camera center will be at position (Eucledian coordinates) 

The translation vector (check the lecture notes) is then<sup>˜</sup> **t** = _−_ **C**<sup>˜</sup> . The epipoles are computed as 

and 

_Solution of Exercise 5_ 

_Winter Term 2019/2020_ 

3 

This is natural: since the focal planes do not rotate during the motion, and they remain coplanar, the projections of the camera centers onto the two planes are ideal points (motion is parallel to the two planes!). 

The fundamental matrix is 

Points in the two images are then related by the identity **x**<sup>_0_T</sup> **Fx** = 0, which gives 

This result was expected: in this translational motion along the X-axis the only (corresponding) pixel coordinate that is going to change is the horizontal one. The vertical position of feature points does not change during the translational motion. 

In the lecture we derived the following relation between pixel coordinates: **x**<sup>_0_</sup> = **x** + _Z_<sup><u>1</u></sup><sup>**e**</sup><sup>_0_. In the motion analyzed</sup> here, this translates into 

The actual movement of the feature point in the image is larger for a) points that are closer to the camera, or b) for larger translations. 

_Solution of Exercise 5_ 

_Winter Term 2019/2020_ 

4

---

## 源文件

- [Ex5_Sol.pdf](attachments/documents/CV_Visual-Navigation-1f243b59036b/Ex5_Sol.pdf)

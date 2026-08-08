---
title: Ex6_Sol
source: converted:attachments/documents/CV_Visual-Navigation-7c4e2dffceb0/Ex6_Sol.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-7c4e2dffceb0/Ex6_Sol.pdf
  title: Ex6_Sol.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Solution to Exercise 6 of December 20, 2019** 

http://www.nav.ei.tum.de/visnav 

## **Problem 1 – Solution** 

## **_Estimation of camera relative movement_** 

a) The implementation of this solution can be found in the Matlab script Ex6 ~~s~~ ol.m. 

Let us denote with **x** and **x**<sup>_0_</sup> the image points available from the first and second frame, respectively. As first step, one computes the essential matrix (since we are working with a calibrated camera) from the nine identities ( **x**<sup>_0_</sup> )<sup>T</sup> **Ex** = 0: 

with the _i_ -row **A** _i_ of **A** formed as 

˜ The solution is obtained by the SVD decomposition of matrix **A** = **USV**<sup>T</sup> : **e** , and thus **E**<sup>˜</sup> , is the column of **V** corresponding to the smallest singular value (the last column when using function svd() in Matlab). 

In order to enforce the constraints associated to the essential matrix (equal singular values), we compute 

We assign the canonical form for the camera matrix at initial position: 

Using 

we then extract the four ambiguous solutions for the camera matrix after the motion: 

with **u** 3 the last column of matrix **U** . 

Note that the orthonormality constraint on **R** in **P**<sup>_0_</sup> _j_<sup>=</sup> ⇥ **R** _|_ **t** ⇤ is respected, but the determinant of **R** could be negative (mathematically admissible, but physically impossible). In case the determinant of the left 3 _⇥_ 3 submatrix of **P**<sup>_0_</sup> _j_<sup>is negative, we can simply invert the sign of all the elements of</sup><sup>**P**</sup><sup>_0_</sup> _j_<sup>(for which an arbitrary scaling</sup> 

_Solution to Exercise 6_ 

_Winter Term 2019/2020_ 

1 

factor does not change the associated projective properties). 

|In order to remove the ambiguity, we select an arbitrary feature correspondence **x**_,_**x**<sup>_0_ </sup>and reconstr<br>coordinates in each of the four possible orientations and translations of the camera after motion:<br>**AX**=<br>2<br>664<br>_x_1**p**<sup>T</sup><br>3 <sup>_−x_3</sup><sup>**p**T</sup><br>1<br>_x_2**p**<sup>T</sup><br>3 <sup>_−x_3</sup><sup>**p**T</sup><br>2<br>_x_<sup>_0_</sup><br>1<sup>**p**</sup><sup>_0_T</sup><br>3 <sup>_−x0_</sup><br>3<sup>**p**</sup><sup>_0_T</sup><br>1<br>_x_<sup>_0_</sup><br>2<sup>**p**</sup><sup>_0_T</sup><br>3 <sup>_−x0_</sup><br>3<sup>**p**</sup><sup>_0_T</sup><br>2<br>3<br>775**X**=**0**|uct the 3D<br>(1-7)|
|---|---|
|with **p**<sup>T</sup><br>_i_ <sup>and (</sup><sup>**p**</sup><sup>_0_</sup><br>_i_<sup>)T the rows of matrices</sup> <sup>**P** and ˆ</sup><sup>**P**</sup><sup>_0_, respectively. We solve for</sup> <sup>**X** for each of the fo</sup><br>cases**P**<sup>_0_</sup><br>_j_<sup>:</sup>|<sup>ur possible</sup>|
|ˆ**X**_j_ = arg<br>min<br>**X**_2_R<sup>4</sup> _, k_**X**_k_=1 <sup>_k_</sup><sup>**A**</sup><sup>_j_</sup><sup>**X**</sup><sup>_k_2</sup>|(1-8)|

Only one among the reconstructed points **X**<sup>ˆ</sup> _j_ is in front of both cameras: this can be easily verified by checking the two conditions 

the point is in front of the second camera. Only one solution will respect both conditions. 

Once the second camera matrix has been computed, the rotation matrix and the translation are easily extracted from **P**<sup>ˆ</sup><sup>_0_</sup> : 

Last, the feature points coordinates in space are computed by solving system (1-8) for each of the given couple of image points **x** and **x**<sup>_0_</sup> . 

The results read 

The true values (used to generate the data points in the exercise) are 

You can see the effect of the scaling ambiguity: both reconstructed translation and 3D coordinates of the feature points are about 0.34 times smaller than the true values. 

_Solution to Exercise 6_ 

_Winter Term 2019/2020_ 

2 

## **Problem 2 – Solution** 

## **_Epipolar geometry of a stereo setup_** 

- a) The left camera matrix is **P** _l_ = **K** [ **I** _|_ **0** ]. We fix the world frame such that the origin coincides with the left camera center ( **C**<sup>˜</sup> _l_ = (0 _,_ 0 _,_ 0)<sup>T</sup> ), and the _Y_ -axis points in the direction of the right camera center. In this frame, the right camera center is (in Euclidean coordinates) 

**C** ˜ _r_ = (0 _, b,_ 0)T 

Since there is no rotation of the right focal plane, the right camera matrix reads 

The epipoles are (homogeneous coordinates) 

and 

Therefore, and coincide with the vanishing points of the Y-axis. The fundamental matrix reads 

b) The epipolar lines pass through the epipoles and two image point correspondences **x** _l_ and **x** _r_ . Consider the left and right image of a 3D point **X**<sup>˜</sup> = ( _X, Y, Z_ )<sup>T</sup> . Its images in the left and right cameras are 

Substituting with the elements of **K** and passing to image inhomogeneous coordinates we obtain 

It follows that the left and right images of the point ( _X, Y, Z_ )<sup>T</sup> have the same image x-coordinate: thus, the epipolar lines are the horizontal lines in the image. The difference of the imaged point coordinates is 

The difference is proportional to the stereo baseline and inversely proportional to the depth ( _Z_ -coordinate) of the point being observed. 

_Solution to Exercise 6_ 

_Winter Term 2019/2020_ 

3

---

## 源文件

- [Ex6_Sol.pdf](attachments/documents/CV_Visual-Navigation-7c4e2dffceb0/Ex6_Sol.pdf)

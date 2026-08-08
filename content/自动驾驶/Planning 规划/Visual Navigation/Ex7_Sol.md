---
title: Ex7_Sol
source: converted:attachments/documents/CV_Visual-Navigation-347d7733cf55/Ex7_Sol.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-347d7733cf55/Ex7_Sol.pdf
  title: Ex7_Sol.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Solution to Exercise 7 of January 10, 2020** 

http://www.nav.ei.tum.de/visnav 

## **Problem 1 – Solution** 

## **_Stereo cameras_** 

a) 

Transforming the images with matrices **H** and **H**<sup>_0_</sup> gives the following relationship between **E** and **E**<sup>¯</sup> : 

We are free to choose the exact values of _h_ 1 and _h_<sup>_0_</sup> 1<sup>, as long as they respect the last identity.We can then set, for</sup> example, 

You are encouraged to verify that this solution does indeed produce the fundamental matrix in the form we wanted. 

Also, note that because of the scaling invariance, the actual value of _b_ is not important. 

b) The triangulation 

_Solution to Exercise 7_ 

_Winter Term 2019/2020_ 

1 

is a nonlinear function of three parameters: the left image coordinates _xl_ and _yl_ and the disparity value _d_ . The nonlinear system can then be linearized around a given point ( _x_<sup>0</sup> _l_<sup>_, y_</sup> _l_<sup>0</sup><sup>_, d_0)Tas</sup> 

given as 

with **_⌃_** the covariance matrix of the ‘measurement’ vector ( _xl, yl, d_ )<sup>T</sup> . The first part of this matrix is known: 

We still need to assign the correct variance and (if any) correlation to the third measurement _d_ (disparity). The latter is given by the difference 

Therefore, vector ( _xl, yl, d_ )<sup>T</sup> can be built from ( _xl, yl, yr_ )<sup>T</sup> as 

We can easily build the variance-covariance matrix of vector ( _xl, yl, yr_ )<sup>T</sup> as _σ_<sup>2</sup> **I** 3, since there is no correlation between left and right image coordinate measurement errors. Therefore, matrix **_⌃_** can be obtained as 

Note that the disparity is characterized by twice the variance describing the single coordinate uncertainty. Furthermore, a negative correlation is present between disparity and coordinate _yl_ , as expected. The product **J** **_⌃_ J**<sup>T</sup> gives then 

This expression highlights how small disparities (far away points) are reconstructed with smaller precision. 

## **Problem 2 – Solution** 

## **_Visual odometry with a stereo camera_** 

The implementation of this solution can be found in the Matlab script Ex7 ~~s~~ ol.m. 

Let us denote with **x** _l_ and **x** _r_ the image points available before the motion from the left and right camera, respectively. Initially, we choose the left and right camera matrices in canonical form: 

_Solution to Exercise 7_ 

_Winter Term 2019/2020_ 

with _b_ the stereo baseline. 

As first step, we compute the disparity for each couple of image points. The images of the point **X** = ( _X, Y, Z_ )<sup>T</sup> in space are 

where **x** ˜ indicates the non-homogeneous image coordinates. The disparity value is then 

_Pay attention here: since we are working with calibrated cameras, the scalar −f is one, thus the inversion of sign in the derivation of the disparity value!_ 

The spatial coordinates of the points are easily reconstructed as 

On computing these coordinates, you can note that, differently from the case of a monocular camera, the points are reconstructed to the correct scale. This because the additional information on the baseline resolves the ambiguity in the overall scale scene. 

After the camera motion, the camera matrices will change proportionally to the rotation and translation performed by the camera coordinate system. We proceed in this way: first, we triangulate assuming _same camera matrices_ as before, and we repeat the above procedure, obtaining 

Since the camera has moved (rotation plus translation), the relation between **X**<sup>_0_</sup> and **X** is 

We can now compute the rotation and translation as detailed in the document _VisNav - Annex B - Point cloud registration_ . The exact motion is a rotation of magnitude 5 degrees about the z-axis, and a translation equal to **t** = ( _−_ 1 _, −_ 1 _,_ 0 _._ 5)<sup>T</sup> . Check how close are the estimated values from the true values. 

_Solution to Exercise 7_ 

_Winter Term 2019/2020_ 

3

---

## 源文件

- [Ex7_Sol.pdf](attachments/documents/CV_Visual-Navigation-347d7733cf55/Ex7_Sol.pdf)

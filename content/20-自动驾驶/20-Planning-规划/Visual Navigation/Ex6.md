---
title: Ex6
source: converted:attachments/documents/CV_Visual-Navigation-b90faeda4b34/Ex6.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-b90faeda4b34/Ex6.pdf
  title: Ex6.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Exercise 6 of December 20, 2019** 

http://www.nav.ei.tum.de/visnav 

## **Problem 1** 

## **_Estimation of camera relative movement_** 

- a) A single _calibrated_ camera captures two sequential images during an arbitrary motion. The normalized image coordinates of nine feature points are given in the columns of two Matlab matrices x.mat and x ~~.~~ mat. You can load these two matrices with commands 

load(’x.mat’) 

load(’x ~~.~~ mat’) 

The _i_ -th column of **x** (in x) and the _i_ -th column of **x**<sup>_0_</sup> (in x ~~)~~ are the images of the same point **X** _i_ in space before and after the motion, respectively. 

Compute the motion of the camera and reconstruct the 3D coordinates of the feature points used. 

## **Problem 2** 

## **_Epipolar geometry of a stereo camera_** 

a) Consider a stereo camera formed as the union of two (left and right) cameras, whose focal planes are coplanar. The distance between the left and right camera centers is the stereo baseline _b_ . The right camera focal plane is not rotated with respect to the left focal camera plane. Starting with the canonical form for the left camera matrix **P** _l_ = **K** _l_ [ **I** _|_ **0** ], derive one of the correct forms for the right camera matrix **P** _r_ , and compute the corresponding epipoles **e** and **e**<sup>_0_</sup> . Also, derive the fundamental matrix **F** . Assume the following calibration matrices: 

b) Assume the both cameras of the stereo pair have same camera calibration matrix 

Verify in this case that the epipolar lines in the stereo pair lie on the same direction, parallel to the stereo baseline. ˜ If the image of a 3D point **X**<sup>˜</sup> = ( _X, Y, Z_ )<sup>T</sup> (Euclidean coordinates) on the left camera is **x** _l_ (Euclidean coordinates, so the real x-y pixel position in the image), derive the corresponding image ˜ **x** _r_ (Euclidean coordinates) on the right camera. Express then the difference of the two positions **x** ˜ _r −_ **x** ˜ _l_ as function of the stereo baseline and the position of the 3D point.

---

## 源文件

- [Ex6.pdf](attachments/documents/CV_Visual-Navigation-b90faeda4b34/Ex6.pdf)

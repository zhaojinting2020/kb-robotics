---
title: Ex7
source: converted:attachments/documents/CV_Visual-Navigation-24e364d599d2/Ex7.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-24e364d599d2/Ex7.pdf
  title: Ex7.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

## **Exercise 7 of January 10, 2020** 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

http://www.nav.ei.tum.de/visnav 

## **Problem 1** 

## **_Stereo cameras_** 

a) Consider a stereo system in which the two sensors are calibrated cameras. Both cameras are characterized by the following essential matrix: 

Verify that a pure projective distortion of type 

of the homography _hi_ as function of _a_ 1, _a_ 2, _a_ 3, _a_ 4, and _a_ 5. 

b) Given a stereo system in which the two cameras have same calibration matrix 

the 3D coordinates of a point in space can be found with a simple triangulation from the left image coordinates ( _xl_ and _yl_ ) and the corresponding disparity value _d_ as 

with _b_ the baseline between the two camera centers. 

Derive the (approximated) variance-covariance matrix that characterizes the error in the triangulated position when the uncertainty in the measurement in (both) image coordinates is described by the variance _σ_<sup>2</sup> , with no correlation between the horizontal and vertical pixel measurements. 

## **Problem 2** **_Visual odometry with a stereo camera_** 

A stereo camera captures two sets of two images (left and right) during an arbitrary motion. The normalized image coordinates (i.e., pre-multiplied with the inverse of the camera calibration matrix) of nine feature points are given in the 

_Winter Term 2019/2020_ 

_Exercise 7_ 

1 

columns of two Matlab matrices x l.mat, x ~~r~~ .mat and x ~~l~~ 2.mat, x ~~r~~ 2.mat. You can load these data in Matlab with commands 

load(’x ~~l~~ .mat’) load(’x ~~r~~ .mat’) (2-1) load(’x ~~l~~ 2.mat’) load(’x ~~r~~ 2.mat’) 

The _i_ -th column of each matrix **x** **~~l~~** , **x** **~~r~~** gives the images of the same point **X** _i_ in space in the left and right image, respectively. The same holds for **x** **~~l~~ 2** , **x** **~~r~~ 2** , after the motion. 

The stereo baseline is 20 cm long. Compute the motion of the camera and reconstruct the 3D coordinates of the feature points used. 

_Winter Term 2019/2020_ 

_Exercise 7_ 

2

---

## 源文件

- [Ex7.pdf](attachments/documents/CV_Visual-Navigation-24e364d599d2/Ex7.pdf)

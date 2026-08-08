---
title: Ex3
source: converted:attachments/documents/CV_Visual-Navigation-ca328b171838/Ex3.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-ca328b171838/Ex3.pdf
  title: Ex3.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Exercise 3 of November 29, 2019** 

http://www.nav.ei.tum.de/visnav 

## **Problem 1** 

## **_Estimation_** 

In this problem you are required to estimate a simple homography between two noisy images (same images of Exercise 1, with some additional noise injected). First, open the script provided as Ex3 ~~r~~ ansac.m. The two images provided are opened and visualized. Then, the Harris corner detector is applied to extract corners in both images, and BRISK-like descriptors are built. Next, the two sets of corners are matched with following parameters: 

The matches found are then visualized both in a false-color image and in a vector plot. As you can see, the number of matches returned are severely affected by outliers. These would jeopardize the estimation of the homography if included in the processing. Your task is to apply the RANSAC algorithm to locate the inliers, and provide an outlierfree estimation. Use the following hypotheses: 

- The homography is a simple similarity: 

with _a_ the scaling factor. The number of parameters to estimate is then four: use the appropriate number of point matches to build the minimum sample _s_ . 

- ¯ 

- - Assume no error in the measurement of the coordinates in the original image points ( **x** = **x** ), and Gaussian noise in the measurement of points in the rotated image. Use **_⌃_**<sup>_0_</sup> = ( _σ_<sup>_0_</sup> )<sup>2</sup> **I** 2, with _σ_<sup>_0_</sup> = 1. The corresponding error to be minimized can be given in terms of algebraic distance: 

This function is used both for estimating the homography **H** and for evaluating how well the chosen couple of points fit the model **x**<sup>_0_</sup> _i_<sup>=</sup><sup>**Hx**¯</sup><sup>_i_,thusfordecidingwhethertheseareinliersoroutlierswithrespecttothe</sup> homography estimation being evaluated. 

- _w_ ) when taking _N_ samples of size _s_ 

_Exercise 3_ 

_Winter Term 2019/2020_ 

1

---

## 源文件

- [Ex3.pdf](attachments/documents/CV_Visual-Navigation-ca328b171838/Ex3.pdf)

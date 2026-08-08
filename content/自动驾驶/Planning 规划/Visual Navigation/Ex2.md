---
title: Ex2
source: converted:attachments/documents/CV_Visual-Navigation-874f6009cf7d/Ex2.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-874f6009cf7d/Ex2.pdf
  title: Ex2.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Exercise 2 of November 22, 2019** 

http://www.nav.ei.tum.de/visnav 

In this series of exercises we will see how to reconstruct, partially or wholly, an image subject to projective distortion. In the first problem, the original image and its projection are both provided, enabling recovering the transformation matrix using a number of point correspondences. In the second problem, only the projected image is available, and we attempt a metric rectification (removal of affine and projective distortions) by recovering points and lines at infinity, or by exploiting the properties of the dual conic. 

## **Problem 1** 

## **_2D projective geometry_** 

Two images are provided as Matlab data structures: _Front.mat_ and _FrontDist.mat_ . First, open and visualize the two images in Matlab using the syntax 

aux1 = open(’Front.mat’); img1 = aux1.img; 

aux2 = open(’FrontDist.mat’); img2 = aux2.img2; (1-1) figure; imshowpair(img1, img2, ’montage’); title(’Original images’) 

Select a number of correspondences between the two image. You may use a corner detector, or manually locating these correspondences. (In the Ex2.m routine provided, two sets of points are already given). The relation between any couple of corresponding points selected in the two images is given by an homography: **x**<sup>_0_</sup> _i_<sup>=</sup><sup>**Hx**</sup><sup>_i_.</sup> 

- a) Derive a homogeneous linear system **Ah** = 0 in which the vector of unknowns **h** contains the elements of the transformation matrix **H** : **h** = � _h_ 11 _, h_ 12 _, h_ 13 _, h_ 21 _, h_ 22 _, h_ 23 _, h_ 31 _, h_ 32 _, h_ 33�T. 

- b) Choose the minimum number of point correspondences between the two images necessary to recover the transformation matrix **H** , form the corresponding linear system and solve for the elements of the transformation matrix. Note that the measurements of the point correspondences are affected by errors (which kind?), and the homogeneous system is generally only solved by the vector with all elements equal to zero. Thus, the following minimization problem has to be addressed: 

min (1-2) **h**<sup>_k_</sup><sup>**Ah**</sup><sup>_k_2</sup> 

In order to avoid the null solution (which is the unconstrained minimizer of the above expression), some constraints are usually imposed on the elements of **h** . We will impose _k_ **h** _k_ = 1: 

**h** ˆ = min (1-3) **h** _, k_ **h** _k_ =1<sup>_k_</sup><sup>**Ah**</sup><sup>_k_2</sup> 

Use the Matlab function _null_ ( _A_ ) to find the solution of this minimization problem. 

- c) Apply the inverse of the estimated transformation matrix **H**<sup>ˆ</sup> to the projected image _FrontDist_ . The Matlab syntax is 

itform = projective2d(inv( _H_<sup>ˆ</sup> )’); 

img = imwarp(img2,itform); (1-4) 

Note that Matlab applies the following transformation: ( **x**<sup>_0_</sup> )<sup>T</sup> = ( **x**<sup>_0_</sup> )<sup>T</sup> **H**<sup>T</sup> : this is the reason of the transposition 

Is the result satisfactory? Are parallelism and perpendicularity of lines restored? 

_Exercise 2_ 

_Winter Term 2019/2020_ 

1 

- d) Apply the above two steps b) and c) on two different sets of points: one set formed by points taken close to each other (e.g., the corners of one of the windows) and one set formed by points at longer mutual distances (e.g., the corners of the building). Analyze which set gives the best estimation and why. 

## **Problem 2** 

### 

If only the projected image is available, one must other means to reconstruct the transformation matrix. There are two viable approaches: stratification (affine rectification followed by metric rectification) or direct rectification by extracting the dual conic **C**<sup>_⇤_</sup> _1_<sup>from the given image.</sup> 

- a) _FrontDist_ . (see lecture notes), which will have coordinates **l** = ( _l_ 1 _, l_ 2 _, l_ 3)<sup>T</sup> . Then, building matrix 

- b) This is accomplished by extracting from the image _FrontDist_ the line at infinity (affine rectification) and the dual conic in the form 

c) Estimate the transformation matrix by extrapolating in the image _FrontDist_ the dual conic **C**<sup>_⇤_</sup> _1_<sup>of the form</sup> 

_Exercise 2_ 

_Winter Term 2019/2020_ 

2 

~~ye~~ 

~~Kea~~ 

~~di = Xi XX~~ 

~~te =~~ <u>Ny</u> ~~KY~~ 

~~Yr = xe = (Xix¥)x(x9 x Ww)~~ <u>Me Saune</u> 

~~Yoo = [Kxxg) % bo~~ <u>*</u> ~~4)~~ <u>Ava = Kase X Yeea i on-</u> ~~+ [bs x x2)« (3 « xe)] x [C89x (xX)~~ ~~<u>| = 2) 2 wormorlisati</u>~~ 

|~~b)~~<br>~~Te~~<br>= ~~4~~ (oq ym<br>L.<br>~~=~~<br>~~JE CEL CE~~|
|---|
|~~T~~<br>~~fe~~<br>~~cs] 24 |~~<br>~~ce - | KKT~~<br>~~RKTV |.~~<br>~~wel a~~<br>~~00~~<br>~~0~~<br>~~yk ye ure~~<br>~~0~~<br>~~0~~<br>~~|~~|
|~~0~~<br>0|
|~~LA t. 43] [+ >P 7 |~~<br>~~52 3~~<br>~~9g~~<br>~~Mm =p~~<br>~~0~~<br>~~@~~<br>~~oO~~<br>~~Mm~~|
|~~hin, tem Lim +42 my fy~~<br>~~& | =0~~<br>os|
|~~because~~<br>~~det UK) =4~~<br>~~and~~<br>~~¥K" smotite~~<br>~~IIS l=4~~<br>~~3) “¢~~|
|~~A=USV9S=%~~|

---

## 源文件

- [Ex2.pdf](attachments/documents/CV_Visual-Navigation-874f6009cf7d/Ex2.pdf)

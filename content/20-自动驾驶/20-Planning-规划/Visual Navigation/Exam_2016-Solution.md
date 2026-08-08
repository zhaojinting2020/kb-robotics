---
title: Exam_2016 - Solution
source: converted:attachments/documents/CV_Visual-Navigation-976d6dc718cb/Exam_2016
  - Solution.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-976d6dc718cb/Exam_2016 - Solution.pdf
  title: Exam_2016 - Solution.pdf
---

# Exam_2016 - Solution

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Visual Navigation** 

Winter Term 2015/2016 

Prof. Dr. sc. nat. C. G¨unther 

Dr. G. Giorgi 

# **Exam – Solution** 

### February 24, 2016 

- The use of the following material is permitted: lecture slides, referenced books and articles, exercises and solutions, a pocket (also programmable) calculator. Cell phones, laptops etc...are prohibited. 

- Please indicate your name and registration number on all pages. The problems are described on 5 pages. Please also return those pages. 

- The examination is subdivided into 3 areas. Each area typically includes several smaller problems, some of which are dependent. 

- The maximum score is reached when a problem is solved. In the case that you cannot solve a problem completely, you have the option to provide a clear and complete description of the solution. A certain credit will also be given for such a description. 

I hereby confirm that I have been informed prior to begin of the examination that I have to notify the examination supervisors immediately if sudden illness occurs during the examination. This will be noted in the examination protocol. An application for exam withdrawal has to be filed immediately at the board of examiners being in charge. A medical certificate from one of the physicians acknowledged by the Technische Universit¨at M¨unchen issued on the same day as the examination must be forwarded without delay. In case the examination is regularly completed despite of illness, a subsequent withdrawal due to illness cannot be accepted. In case the examination is ended due to illness it will not be graded. 

Name: Matriculation number: Course of studies: M¨unchen, (Date) (Signature) 

#### **Problem 1 – Solution** 

a) The camera matrix after a pure translational motion (thus, no rotations were performed) reads 

with C<sup>˜</sup> the Euclidean coordinates of the camera center. 

- b) The rotation matrix about the Z-axis (note that the Z-axis is unchanged after the previous pure translational motion in the direction of Y ) reads 

After the translation of the previous point and the rotation above, the camera matrix P<sup>′′</sup> reads 

c) After a pure translation in the direction of the Y -axis and a pure rotation about the Z-axis, the epipoles (projection of the first/second camera centers into the second/first focal plane) must be at infinite! Indeed, we obtain 

and 

Note that the epipole e is the vanishing point of the Y -axis (obviously since the pure translation was parallel to the Y -axis), whereas the epipole e<sup>′′</sup> is the vanishing point of the X-axis (again obvious, since a rotation of 90 degrees was performed about the Z-axis). 

d) The pixel coordinates at initial position are obtained from projecting the point in space X into the camera focal plane as 

with X<sup>˜</sup> the Euclidean coordinates of the point in space. After the (pure) translational movement, the projection reads 

The latter gives the following system of identities _when passing to Euclidean coordinates_ : 

The solution is 

Therefore, an infinite number of translations can be identified, all causing the image of point X in space to shift from pixel coordinates (1, 1)<sup>T</sup> to pixel coordinates (2, 1)<sup>T</sup> . Note that the ‘easiest’ solution tx = 1 and ty = 0 is obviously included in the family of potential solutions (for tz = 0). 

_Exam – Solution_ 

_Winter Term 2015/2016_ 

2 

(-) 

i IL ]) 

|| 

|| 

- [| 

(=) 

(2-12) 

c) The 3D coordinates of the reconstructed point are found as in (2-8): 

with xland yl the image coordinates (not homogeneous) in the left camera, xr the x-coordinate in the right camera, and d the disparity value. The uncertainty in the measurements of xl, yr and xr is captured by the covariance matrix 

In order to propagate the error, a linearization is required around the chosen point: 

with J the Jacobian of the nonlinear function(s) in (2-12): 

The reconstructed Euclidean coordinates error reads then 

d) The Z-coordinate of a point in space is reconstructed as 

Therefore, 

#### **Problem 3 – Solution** 

> a) The problem is strictly two-dimensional: the two coordinates (X and Z) on the plane (floor of warehouse) completely define the robot’s location, being Y identically null. There is no need to model the robot’s attitude, since it is constant and directed towards the Z-axis per specifications. The velocity is constant, and we can model it with the two variables X<sup>˙</sup> and Z<sup>˙</sup> . A reasonable choice of for the state vector parameters is then 

where m is the 3m-vector containing the 3D coordinates of the stored m features: 

_Exam – Solution_ 

_Winter Term 2015/2016_ 

+t x 2 x 2 m 

c) The initial (mean) robot’s state vector can be written as 

Its covariance, as per problem data, is 

The predicted (mean) value of the state vector is (with ∆t = 1) 

The covariance matrix of the predicted state is 

d) First, we compute the Kalman gain matrix: 

The term (C1Σ<sup>¯</sup> 1C<sup>T</sup> 1<sup>+ Q1)−1, with Q1= σ</sup> m<sup>2I3, reads then</sup> 

_Exam – Solution_ 

_Winter Term 2015/2016_ 

6 

Finally, the Kalman gain matrix is obtained as 

The updated state vector is then 

Thus, only the landmark currently observed is updated. The reason why all the other landmarks are not updated is due to the lack of correlation in the initial (map) covariance matrix σ0<sup>2· I3m.</sup> 

_Exam – Solution_ 

_Winter Term 2015/2016_ 

7

---

## 源文件

- [Exam_2016 - Solution.pdf](attachments/documents/CV_Visual-Navigation-976d6dc718cb/Exam_2016 - Solution.pdf)

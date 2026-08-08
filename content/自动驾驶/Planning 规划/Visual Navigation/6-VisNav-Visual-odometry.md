---
title: 6 VisNav - Visual odometry
source: converted:attachments/documents/CV_Visual-Navigation-abea4ae17dc7/6 VisNav
  - Visual odometry.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-abea4ae17dc7/6 VisNav - Visual
    odometry.pdf
  title: 6 VisNav - Visual odometry.pdf
---

#6 <u>CommunicationsInstitute for</u> 

<u>TUT</u> 

Institute for <u>Yau== andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Institute for <u>Yau== andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

N e —— $a Bi 

Technische Universität München 

## **Monocular visual odometry** 

Workflow (calibrated camera): 

 I) Set the center of world-coordinates on the camera center at initial position: 

### _We assume the camera is calibrated_ 

- II) Acquire image end extract features 

4 

Technische Universität München 

## **Monocular visual odometry** 

Workflow: 

- III) Repeat step II after motion has occurred 

 IV) Apply RANSAC to estimate essential matrix and matched features 

 V) Compute SVD of essential matrix to extract estimated rotation and translation (the latter only up to a scaling factor): 

5 

Institute for Communications <u>L and Navigation</u> 

Institute for <u>L. andCommunicationsNavigationNavigation</u> 

Technische Universität München 

## **Visual odometry with stereo cameras** 

8 

Technische Universität München 

## **Stereo camera geometry** 

###  Couple of image sensors with (ideally) coplanar image planes: 

_Center of world-coordinates is the center of left camera_ 

9 

<u>Lor]L.L. Communicationsandand Navigation</u> 

<u>TUT</u> 

Technische Universität München 

## **Stereo camera geometry** 

###  Geometry of image projection 

_Often (but not always!):_ 

_If calibrated, essential matrix is_ 

Scaling is resolved! Knowledge of baseline enables reconstructing without scale ambiguity, contrary to the monocular case. 

11 

Technische Universität München 

## **Stereo camera geometry** 

 **Disparity** 

_Projection on image planes:_ <u>Stereo disparity:</u> Computation of the disparity enables reconstructing instantaneously the depth of feature points 

Technische Universität München 

## **Stereo camera geometry** 

 The search for candidate matches is performed in one dimension _(on the corresponding to the epipolar line)_ 

13 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Institute for j Communications <u>GE and Navigation</u> 

Technische Universität München 

## **Rectification** 

 The transformation is a planar homography 

 Assuming     is known for the couple of calibrated cameras, and not of the expected shape (it should force the pixels first coordinates to be identical:                                ), we aim for a transformation that brings the fundamental matrix to the following shape: 

16 

Technische Universität München 

## **Rectification** 

- The transformation is a planar homography 

- Applying homographies     and     , points are transformed as 

- Epipolar constraint: 

- Relationship gives nine identities, but one has 16 independent elements to fix 

- Viable approach: use remaining degrees of freedom to minimize distortions. 

17 

Technische Universität München 

## **Rectification** 

###  Example of a stereo rectification algorithm: 

_C. Loop, Z. Zhang, “Computing Rectifying Homographies for Stereo Vision”_ 

###  _Original images:_ 

18 

|sRot ‘|4 |:kiOo alkkeo \|OF TIO} Vi° iV2 **O** U Sim larity affiné Projectoy H) ( ( / = H).sHiaHip H,. = H,,sH,,aH,,p Hp H,..p _ a DoF = 2t2 = 2t2 = = a® a) hd] 6) = 

Institute 

f 

Institute f 

Technische Universität München 

## **Visual odometry with stereo cameras** 

 Workflow: 

- 0) Rectify, if necessary, the stereo set-up 

I) Extract features from stereo pair (with quick epipolar matching) 

II) Fix (arbitrarily) initial camera matrices 

22 

\ AE Pepe ae LR. oO 

<u>oS Communications</u> 

<u>TUT</u> 

( fast triangulation 

——) 

Technische Universität München 

## **Visual odometry with stereo cameras** 

 Workflow: 

III) Triangulate to obtain 3D points from imaged points 

- _Characterization of error_ 

- _Depth is_ 

_- Variance-covariance of  pixel (Gaussian) noise:_ 

- _Non-linear function for triangulation:_ 

25 

Technische Universität München 

## **Visual odometry with stereo cameras** 

 Workflow: 

III) Triangulate to obtain 3D points from imaged points 

- _Characterization of error_ 

- _Dispersion (error) on      :_ 

- _Approximation of 3D  estimate from triangulation:_ 

- _This evaluation (although approximated) becomes extremely useful at later steps_ 

26 

Technische Universität München 

## **Visual odometry with stereo cameras** 

 Workflow: 

IV) Acquire next stereo pair 

- V) Find features in common with previous pair: 

- _a) by tracking points in corresponding left-left and right-right images (example: apply KLT algorithm)_ 

_b) by extracting features and matching from previous set of features_ 

- At this point, two different approaches are available (VIa and VIb): see next slides 

27 

Technische Universität München 

## **Visual odometry with stereo cameras** 

###  Workflow: 

<u>same</u> VIa) Re-triangulate with previous camera matrices 

_We have now two sets of n points                                  related by a rigid body transformation (plus error):_ 

 _MLE:_ 

- _(MLE: Maximum Likelihood Estimator)_ 

28 

Technische Universität München 

## **Visual odometry with stereo cameras** 

 Workflow: 

<u>same</u> VIa) Re-triangulate with previous camera matrices 

- _Under Gaussian hypothesis, we use the previously derived variance-covariance matrix for each “observation”_ 

- _The probability_ 

_is proportional to_ 

_with residuals_ 

29 

Technische Universität München 

## **Visual odometry with stereo cameras** 

 Workflow: 

<u>same</u> VIa) Re-triangulate with previous camera matrices 

- _Maximizing the exponential equals to minimizing expression_ 

- _Non-linear minimization of the squared weighted norm of residuals provides the sought MLE of rotation matrix and translation vector (see Annex B for the solution of this minimization problem)_ 

- _Apply RANSAC to remove outliers in the dataset (wrong triangulations leading to mismatches between           and            )_ 

30 

Technische Universität München 

# **VISUAL NAVIGATION** 

# **Annex B** 

**Point cloud registration (estimation of rotation and translation)** 

R 

X! = RX; +t 

xX xX / 

t 

c= 2 yin Xi yin Xi Xi 

c= . in X in X X 

H = D(X D(X —e)(X} - ey" 

H = USV* 

R= VU* 

t=c’—Re 

Technische Universität München 

## **Visual odometry with stereo cameras** 

 Workflow: VIb) Compute left (and/or right) camera pose only from 3D to 2D correspondences 

- Trade off between periodic triangulations (to acquire new features replacing points that move out from the camera field of view) and propagation from points       triangulated as back as possible (to limit drift) 

31 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

| Institute for for <<"«3«3 Communications 

stitute forCat 

~~+“!~~<sup><u>and</u></sup> ~~Institute~~<sup><u>Navigation</u></sup> ~~for ;~~ 

~~TUT~~ 

Technische Universität München 

## **Further reading** 

 Stereo algorithms and rectification: _M. Pollefeys, R. Koch, L. Van Gool, “A simple and efficient rectification method for general motion” C. Loop, Z. Zhang, “Computing Rectifying Homographies for Stereo Vision”_ 

_D. Oram, “Rectification for Any Epipolar Geometry” H. Hirschmüller, “Accurate and Efficient Stereo Processing by Semi-Global Matching and Mutual Information”_  Visual odometry _D. Nistér, O. Naroditsky, J. Bergen, “Visual Odometry for Ground Vehicle Applications” N. Sünderhauf, P. Protzel, “Stereo Odometry – A Review of Approaches” C.F. Olson, L.H. Matthies, M. Schoppers, M.W. Maimoneb, “Rover navigation using stereo ego-motion”_ 

36

---

## 源文件

- [6 VisNav - Visual odometry.pdf](attachments/documents/CV_Visual-Navigation-abea4ae17dc7/6 VisNav - Visual odometry.pdf)

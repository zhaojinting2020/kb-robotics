---
title: Ex1
source: converted:attachments/documents/CV_Visual-Navigation-d117229fbb25/Ex1.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-d117229fbb25/Ex1.pdf
  title: Ex1.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Exercise 1 of November 08, 2019** 

http://www.nav.ei.tum.de/visnav 

This exercise class aims at making you familiar with various computer vision functions implemented in Matlab. There are a few tasks to be executed, but mainly we will just tune different parameters and see what effect this has on the detection and matching capabilities. 

## **Problem 1** 

## **_Feature detectors_** 

Run the script Coloss ~~C~~ ornerDetectors.m, which applies all the corner detectors implemented in Matlab. Modify the following parameters: 

- a) Harris corner detector and Minimum Eigenvalue (Shi-Tomasi) corner detector. The corners are searched by evaluating the image gradient on a 3-by-3 pixel sliding window. Both implementations accept two input. The first is the size of the Gaussian filter applied to the image (through parameter ’FilterSize’, only odd values accepted, default value=5; standard deviation automatically set to ’FilterSize’/3): this filtering smooths the gradient of the input image, and enables reducing the number of ‘spikes’ due to additive noise on the intensity value of pixels. The second parameter is the detection threshold: the algorithms compute the Harris function ( _r_ ( **A** ) = det **A** _− ↵_ (tr **A** )<sup>2</sup> , with _↵_ = 0 _._ 04) or the minimum eigenvalue for each position of the sliding window in the image, store the maximum value obtained, say _r_ max or _λ_ max, and accept as corners those points for which the Harris function or the minimum eigenvalue returns a value larger than _mqr_ max or _mqλ_ max, respectively. The value of parameter _mq_ is set by the user through the input parameter ’MinQuality’ (default: 0.01). 

of using large or small filtering windows? 

Modify the ’MinQuality’ parameter to reject weaker detected corners. 

Compare the Harris and Minimum Eigenvalue corner detectors: are the same corners detected? 

The coordinates of the corners found are contained in the objects cornersH and cornersME, and can be extracted as cornersH.Location and cornersME.Location. Note that the coordinates of the detected corners are usually not integers. Can you figure out why? 

- b) Feature detector in FAST. 

The FAST corner detector operates by comparing the value of a pixel with the surrounding 16 pixels placed on a Bresenham circle of radius 3 (see lecture notes). The pixel is selected as valid corner when the intensities of at least 12 contiguous pixels on the Bresenham circle are all above or all below the intensity of pixel examined by a threshold _t_ . This threshold _t_ is set by the user in the form of a fraction of the maximum value of the intensity in the image. For example, if the maximum intensity value in the image is _I_ max, the threshold is set as _t_ = _mcI_ max, with _mc_ a scalar value in the range _mc 2_ (0 _,_ 1) defined through input parameter ’MinContrast’ (default: 0.2). If a pixel intensity value is _I_ , it is detected as corner if at least 12 contiguous pixels on the Bresenham circle are all above the value _I_ + _mcI_ max or all below the value _I − mcI_ max. 

The FAST corner detection function also accepts as input the ’MinQuality’ (default: 0.01) parameter, which can be used to eliminate those detected corners that are relatively weak if compared with the strongest detected corner in the image (i.e., the corner for which the distance between its intensity value and the surrounding pixels is the largest among all detected features). 

_Exercise 1_ 

_Winter Term 2019/2020_ 

1 

Modify the ’MinContrast’ parameter. How do we select stronger features by tuning this parameter? 

Through numerical runs, derive and plot the curve that gives the number of detected features as function of the threshold selected in the image provided. 

- c) Feature detector in BRISK. 

BRISK implements a FAST-like corner detector on a pyramid of images obtained by downsampling by a factor of 2<sup>_i_</sup> (octaves) and by a factor of 1 _._ 5 _·_ 2<sup>_i_</sup> (intra-octaves). The Matlab implementation accepts as input the same parameters as in the FAST corner detection function (’MinContrast’ and ’MinQuality’), plus the chosen number of octaves (and corresponding intra-octaves, one for each octave) to process through parameter ’NumOctaves’ (default value: 4). 

The detected corners in our script are plotted in the image as green crosses surrounded by a circle that indicates the scale at which the feature is detected. 

Modify parameters ’MinContrast’ and ’MinQuality’: how do we extract only the ’strongest’ corners? 

At what scale no new features are detected? 

- d) Feature detector in SURF. 

SURF works by detecting corners in a pyramid of images formed by the convolution between a difference of Gaussians and the original image (see lecture notes). The number of difference of Gaussian used (changing each time the standard deviation employed) gives the number of intra-octaves used (scale levels). This is input through parameter ’NumScaleLevels’ (default value: 4, must be greater than or equal to 3). The second parameter to set is the number of octaves to be processed, in which each octave’s resolution is is halved with respect the previous octave. The input parameter is ’NumOctaves’ (default value: 3). 

Octave Filtersizes 1 9 _⇥_ 9 _,_ 15 _⇥_ 15 _,_ 21 _⇥_ 21 _,_ 27 _⇥_ 27 _, . . ._ 2 15 _⇥_ 15 _,_ 27 _⇥_ 27 _,_ 39 _⇥_ 39 _,_ 51 _⇥_ 51 _, . . ._ (1-1) 3 27 _⇥_ 27 _,_ 51 _⇥_ 51 _,_ 75 _⇥_ 75 _,_ 99 _⇥_ 99 _, . . ._ 4 _...._ 

The last parameter to be set is the detection threshold. This is a threshold on the absolute value of the determinant of the Hessian matrix computed at a given pixel. If the determinant of the Hessian is not larger than the threshold, the pixel is rejected as a corner. The input parameter is ’MetricThreshold’ (default value: 1000.0). 

Tune the three parameters to detect only the strongest corners at the maximum number of scales (plotted in our routine as green crosses surrounded by circles with radius proportional to the scale). 

## **Problem 2** 

## **_Feature matching_** 

In this part we will extract matched features from two images. We will make use of two descriptors, irrespective of which corner detection strategy is used: SURF and BRISK descriptors. Yes: we can use one method for detecting corners and a different one to build the feature descriptors: detection and generation of descriptors are independent processes. 

- a) Run the script Coloss ~~D~~ etectAndMatch.m. We detect corners using all the methods seen above, and apply either SURF or BRISK descriptors. The descriptors are built with function extractFeatures, which accepts three input: the image, the detected corners and the kind of descriptors we want to use. The output of the function are the descriptors for each corner and, again, the corners for which a valid descriptor has been created. The latter output can be different in size with respect to the input corners, because the function does not accept corners that lie too close to the edge of the image when the corresponding descriptor cannot be created. Once the descriptor has been created, the matchFeatures function is used to search for corresponding features. By default, the routine search for two matching features by selecting the minimum sum of squared differences (SSD) between two descriptors (this could be changed to the sum of absolute differences, or SSA). For each match the function associates the corresponding SSD as matching metric value. Weak matches are eliminated by checking the ratio between the minimum SSD (best match) and the SSD computed with the second best 

_Exercise 1_ 

_Winter Term 2019/2020_ 

2 

match. When this ratio exceed the threshold the matching is rejected. The input parameter for setting this threshold is ’MatchRatio’ (default value: 0.6). Note that if the image contains repeating patterns, the corresponding matches are likely to be eliminated as ambiguous. 

A second parameter can be used to reject matches which are weak in absolute sense: set the ’MatchThreshold’ (default: 10.0 for binary feature vectors – such as BRISK – or 1.0 for non-binary feature vectors – such as SURF –; defined as a percent value in the range 0-100) to lower values to reduce the chances of weak matches. 

Change the ’Method’ input between ’BRISK’ and ’SURF’, and analyze a feature vector. What kind of feature vector is built? What are the dimensions of this vector? Note that when changing between the two descriptors, the parameter ’MatchThreshold’ has to be changed accordingly! 

Tune the ’MatchThreshold’ and ’MatchRatio’ parameters to improve the matching, using both SURF and BRISK descriptors. 

- b) Two images are provided as Matlab data structures: original.mat and rotated.mat. Open the two images in Matlab using the syntax 

aux1 = open(’original.mat’); img1 = aux1.original; aux2 = open(’rotated.mat’); img2 = aux2.rotated; (2-1) 

Display the images next to each other using syntax 

figure; imshowpair(img1, img2, ’montage’); (2-2) 

The two images are related by a pure camera rotation. Apply a detection and matching algorithm of your choice (use the relevant Matlab code from the routine provided for the previous exercise). Use the matched features to obtain an estimation of the camera rotation. Hint: the center of rotation is the center of the image, at pixel coordinates [310 _,_ 193]. 

_Exercise 1_ 

_Winter Term 2019/2020_ 

3

---

## 源文件

- [Ex1.pdf](attachments/documents/CV_Visual-Navigation-d117229fbb25/Ex1.pdf)

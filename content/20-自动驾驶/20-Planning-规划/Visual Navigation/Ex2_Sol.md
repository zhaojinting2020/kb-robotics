---
title: Ex2_Sol
source: converted:attachments/documents/CV_Visual-Navigation-d4abe9677e2f/Ex2_Sol.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-d4abe9677e2f/Ex2_Sol.pdf
  title: Ex2_Sol.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Solution of Exercise 2 of November 22, 2019** 

http://www.nav.ei.tum.de/visnav 

The implementation of the following solutions can be found in the Matlab script Ex2 ~~s~~ ol.m. The original image _Front.mat_ has been transformed by using the following matrix: 

## **Problem 1 – Solution** 

**_2D projective geometry_** 

a) Each point correspondence gives two equations in **x**<sup>_0_</sup> _i_<sup>=</sup><sup>**Hx**</sup><sup>_i_:</sup> 

Re-ordering the two equations to obtain the elements of **H** in vectorial form gives the homogeneous linear system 

- b) The unknowns in (1-2) are any 8 independent elements of **H** (remember that a generic projection is defined by 8 degrees of freedom, and the overall scaling of the elements of **H** is unimportant). Since each point correspondence gives two equations, we need a minimum of 4 point correspondences to reconstruct matrix **H** . The homogeneous system to be solved is 

**Ah** = **0** 

with 

_Solution of Exercise 2_ 

_Winter Term 2019/2020_ 

1 

Because of uncertainty in the measurement of the point coordinates, we seek the following minimizer: 

Vector **h**<sup>ˆ</sup> is obtained by using function _null_ ( _A_ ) in Matlab. The estimated matrix **H**<sup>ˆ</sup> is then built directly by using the elements of **h**<sup>ˆ</sup> , and dividing by the last element ( **h**<sup>ˆ</sup> (9)), in order to obtain **H**<sup>ˆ</sup> (3 _,_ 3) = 1. This is not strictly necessary, if not for better comparison with the original given matrix. 

- c) The result depends on the errors made during pixel selection. See next point. 

- d) Since the transformation **x**<sup>_0_</sup> = **Hx** does not generally yield integer values for the pixel locations **x**<sup>_0_</sup> , these are selected with a certain error (within _±_ 1 pixel if we can precisely match two pixels in the two images). These errors have larger impact when the baselines between points (linear distances between selected points in an image) are short, and have smaller impact when the baselines are longer. 

We can see this by comparing the estimation of the transformation matrix with two sets of points. closely separated points is 

with _Pc_ 1 _Pc_ 2 points in the transformed image. A second set of points taken with larger distances is 

Run the script to visualize the two sets (plotted with red and green crosses, respectively) and the different result obtained when estimating the transformation matrix **H** . As you can verify, the second set of points produces better results. 

## **Problem 2 – Solution** 

### 

- a) We now operate only with the projected image _FrontDist_ . First, we need to the line at We do this by computing two points at infinity and connecting them. The points at infinity are those points at which parallel lines meet. In order to find two points at infinity, we need two couples of parallel lines. These are easily extracted from the horizontal and vertical borders of the building. To generate the corresponding lines, we can use the four points employed in the previous problem, plus ones to transform these in homogeneous coordinates: 

The four lines are formed by taking the cross product between two points: 

The intersection between **l** _i_ and **m** _i_ 

_Solution of Exercise 2_ 

_Winter Term 2019/2020_ 

2 

The components of **l** _1_ are then used to build 

Note the division by the norm of **l** _1_ : this is necessary to avoid very large entries in **H** . Run the script to visualize the result of the affine reconstruction. 

- b) After applying the transformation found in the previous subproblem, we have eliminated the projective distortion (parallelism of lines is restored). 

The second step in recovers the metric properties by restoring perpendicularity of lines. This is achieved by taking two couples of perpendicular lines and locating the dual conic in the form 

Note that we cannot take the two vertical edges of the building and exploit the perpendicularity with the two horizontal edges, since by doing so we would lose one degree of freedom (two parallel lines only differ by one parameter). We then take the following two sets of points. The first set is composed by the four corners of the building (of which only three are necessary): 

The second set is composed by the four corners of the right uppermost large window (which we assume is approximatively squared): 

We then form the two set of perpendicular lines as 

The two couples of perpendicular lines are used in equation **l**<sup>T</sup> _i_<sup>**C**</sup> _1_<sup>_⇤_</sup> _0_ **m** _i_ = 0 (perpendicularity of lines) to extract _0_ **KK** T **0 S 0** _s_ 1 _s_ 3 the elements of **C**<sup>_⇤_</sup> _1_ =  **0**<sup>T</sup> 0� =  **0**<sup>T</sup> 0�, with **S** the symmetric matrix **S** =  _s_ 3 _s_ 2�: **l** 3(1) **m** 3(1) **l** 3(2) **m** 3(2) **l** 3(1) **m** 3(2) + **l** 3(2) **m** 3(1) _ss_ 121 = **As** = 0 (2-10)  **l** 4(1) **m** 4(1) **l** 4(2) **m** 4(2) **l** 4(1) **m** 4(2) + **l** 4(2) **m** 4(1)�<sup>0</sup> @ _s_ 3A 

Again, because of measurements errors, we need to find vector **s** = ( _s_ 1 _, s_ 2 _, s_ 3)<sup>T</sup> such that 

Matlab solves the minimization problem with function _null_ ( _A_ ). Therefore, we have obtained an estimation of 

_Solution of Exercise 2_ 

_Winter Term 2019/2020_ 

The Cholesky decomposition of **S** gives the sought triangular matrix **K** (see script), which enables reconstructing the metric properties using the transformation 

Applying the transformation **H**<sup>_−_</sup> _a_<sup>1</sup> gives the sought rectified image. 

c) **C**<sup>_⇤_</sup> _1_ 

in the image _FrontDist_ . _0_ of the dual conic. We then need five couples of perpendicular lines to estimate **C**<sup>_⇤_</sup> _1_<sup>from</sup><sup>**l**T</sup> _i_<sup>**C**</sup> _1_<sup>_⇤_</sup> **m** _i_ = 0: 

The full homogeneous system to be solved is 

with 

The couples of orthogonal lines are derived from the points given in the script, using the same procedure described in the previous problem. The solution of 

is extracted using _null_ ( _A_ ) in Matlab. The estimated dual conic is then built directly by using the elements of ˆ **c** : 

The Cholesky decomposition of the upper-left 2 _⇥_ 2 submatrix of **C** gives the sought matrix **K** , whereas **v** can be computed as 

Matrices **H** _a_ and **H** _p_ can then be recovered: 

The composition of the two transformations then gives **H** _pa_ = **H** _p_ **H** _a_ , and applying the inverse transformation **H**<sup>_−_</sup> _pa_<sup>1gives the final rectified image.</sup> 

_Solution of Exercise 2_ 

_Winter Term 2019/2020_ 

4

---

## 源文件

- [Ex2_Sol.pdf](attachments/documents/CV_Visual-Navigation-d4abe9677e2f/Ex2_Sol.pdf)

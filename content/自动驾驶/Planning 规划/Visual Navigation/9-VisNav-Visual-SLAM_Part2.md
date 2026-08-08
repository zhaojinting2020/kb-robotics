---
title: 9 VisNav - Visual SLAM_Part2
source: converted:attachments/documents/CV_Visual-Navigation-65357ad2bea1/9 VisNav
  - Visual SLAM_Part2.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-65357ad2bea1/9 VisNav - Visual
    SLAM_Part2.pdf
  title: 9 VisNav - Visual SLAM_Part2.pdf
---

# 9 VisNav - Visual SLAM_Part2

Technische Universität München 

# **VISUAL NAVIGATION** 

# **Visual SLAM: Simultaneous Localization and Mapping with cameras** 

**Part II** 

<u>ta Institute for for</u> ; ~~and Navigation~~ 

<u>TUT</u> 

pre Nousy: individnal fa" 

Ck-1 Ck—-1: {Zi:k—1 > m1:4-1} Ky—1 -1 = S41 Hg_, (An—1 24-1 HG_, + Qu-1) Mey = Wt Ky—1(Ze—-1 — e—-1 (4) Seer = (L—Kg-1Hy-1) 24-1 

Dee n-1 

Di = lla — biG. tin) ¢ OP EIT NSG k-1 1j,k—-1 IB,. , S (ba) Sin—1 = (Hy, ™,_1H? + Q;); JV 

ooo ~~a <~~ 

#6 <u>CommunicationsInstitute for</u> 

<u>TUT</u> 

1 N+O t+—_+—_+——___++—> / ik ? ? ? i st Sh I ? I S ®y'> ‘ ? e ® OYVS I~O-<sS386 ah : oI ©1 ooSweee--Se-*Sa1 ° IIII II I I MYV VY Vv 

Institute for <u>Yau== andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

IO ~~i~~ 

Technische Universität München 

## **Data association** 

- Statistical validation in the observation space: batch gating with the JCBB algorithm 

 JCBB, a modification of the SCNN, enables back-tracking on branches of the three. Two evaluations of each node ‘quality’ are computed: Joint Compatibility (JC) and Node Quality 

- _At level k, we use the previous  k-1 associations_ 

_and evaluate the ij association computing the Joint Compatibility, including all previous k-1 pairings :_ 

7 

Institute for Communicationsandand <u>Navigation</u> 

<u>Yau==</u> 

Nid 0) 

~~ae~~ Lor] ~~| ond~~ eleeehtl ~~Navigation~~ ions 

~~TUM~~ 

Technische Universität München 

## **Data association** 

- Statistical validation in the observation space: batch gating with the JCBB algorithm 

- Then, the algorithm backtracks, and tries to evaluate a different node. From this node it only goes deep (Bound) if the number of jointly-compatible associations is already equal or larger than the best stored so far (       ) 

_Observation space_ 

_Map space_ 

_Accepted association Rejected association_ 

10 

Institute for <u>Yau== andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

BR a— 

Technische Universität München 

## **Data association** 

- Statistical validation in the observation space: batch gating with the JCBB algorithm 

- _Note that the evaluation of the JC_ 

_, at each node of the search._ 

_This is avoided by computing the inverse          iteratively from the . previous inverse_ 

- _This computation only requires evaluating the inverse of a constantsized (small) matrix – not demonstrated in here._ 

12 

= FAW larimayk akin 

m; — (mx,my,mz,b; )* )* 

bo 

2 2 m Dj; = ||\m;* — m5*k ||. =* a 

<u>LandCommunicInstituteNavigfCommunicInstituteNavigfInstituteNavigfNavigff</u> **<u>ati</u>** <u>ononsons</u> 

<u>TUT</u> 

>LandCommunicInstituteNavigfCommunicInstituteNavigfInstituteNavigfNavigff 

m;** = (my,my,mz,b;7)7) nnnED 

— 

Institute for <u>Yau== andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

——s ene 

-2 APA 

### extended Kalman - Filter 

__ 

MW = B+ Kile Kile _ h(/4,)) 8i 

~ | 

Institute for 

ee (M*) 

x (M°) 

/ / T / / —_ / >: __ eeUm, _-1,y1-1Um, _-1,y1-1 _-1,y1-1 G1+R,+R, Giamymy ee x (M) 

ee (M*) 

~ | 

Institute for 

— 

Institute for <u>Yau;; andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Technische Universität München 

## **Map management strategies in Visual SLAM** 

 Two families of approaches: methods that improve on existing filtering techniques (such as EKF-SLAM) by exploiting the ‘sparseness’ of the observation Jacobian (e.g. _Postponement_ , _Compressed EKF_ , _Local Map Sequencing_ , _Divide and Conquer_ ) and methods that approach the SLAM problem in a radically different way (e.g. _graph-SLAM, bundle adjustment_ ) 

 _Postponement_ and _Compressed EKF_ only update a subset of the state vector associated to a submap of points (recently observed and predicted to be observed next). Due to the sparseness of the Jacobian matrices, the prediction and update steps can be reshaped to only include the subset of variables in the state vector. The full update can be postponed indefinitely (but must be done periodically to update the full map) 

20 

<u>Lad Sear Sear</u> 

<u>TUM</u> 

en ows | [eT ey CEL oO oO 6 oo lancl mavks : ~~anal UII lb~~ 

a Gowelakion between presewvesl | ol’scavoledl lancl mavks we 

Technische Universität München 

## **Map management strategies in Visual SLAM** 

- _Local map sequencing_ : a map is initialized and managed from a local reference frame for _k_ steps. The elements of the local map are statistically independent and uncorrelated with all other submaps. 

- During local map building, there is no need to compute the correlations between features in the current local map and features in any other local map. The cost of local map becomes independent from the full size of the map. 

- The last known pose in the previous state vector relative to submap _i-1_ is used as a first known pose in the current state _i_ . 

- vector in the local submap 

- Submaps are _joined_ using common map elements in overlapping consecutive submaps. Correlations are then ‘automatically’ created 

22 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

<u>Hg stitute for for</u> 

<u>TUT</u> 

Technische Universität München 

## **Other approaches to SLAM** 

 _Graph-SLAM_ :  the map is NOT part of the state vector, and the full trajectory of the agent is estimated. The correlation between two different poses arises from observations of the same landmark taken from the two poses. 

25 

| Institute for Pais Communications <u>4 and Navigation</u> 

Technische Universität München 

## **Other approaches to SLAM** 

- _Graph-SLAM_ :  the map is NOT part of the state vector, and the full trajectory of the agent is estimated. The correlation between two different poses arises from observations of the same landmark taken from the two poses. 

- A constraint consists in a probability distribution over the relative transformations between the two poses. These transformations are either odometry measurements or motion model propagation between sequential robot positions or are determined by aligning the observations acquired at the two robot locations (1<sup>st</sup> step: . 

- _graph construction)_ 

- Once the graph is constructed one seeks to find the configuration of the robot poses that best satisfies the constraints (2<sup>nd</sup> step: . 

- _graph optimization)_ 

27 

<u>Lak SarnincatonsInstitute forInstitute for for</u> 

<u>TUT</u> 

<u>+4G4G</u> CcInstituteNavigation foricationsNavigation forications foricationsications ~~and~~ <u>InstituteNavigation foricationsNavigation forications foricationsications</u> 

<u>(x')7QX.P Ptx =/ (x/\T) Fx = 0</u> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Technische Universität München 

## **Other approaches to SLAM** 

- _Bundle Adjustment_ : the full SLAM problem is resolved with a batch (nonlinear) least-squares estimation. This could be seen as an extension of the Graph-SLAM method approach that explicitly includes landmark positions in the unknown vector. 

- Combine all motion/odometry information and landmark measurements in a unique (vector) function: 

31 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

<u>Figg Senrintaion</u> 

<u>TUT</u> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u>

---

## 源文件

- [9 VisNav - Visual SLAM_Part2.pdf](attachments/documents/CV_Visual-Navigation-65357ad2bea1/9 VisNav - Visual SLAM_Part2.pdf)

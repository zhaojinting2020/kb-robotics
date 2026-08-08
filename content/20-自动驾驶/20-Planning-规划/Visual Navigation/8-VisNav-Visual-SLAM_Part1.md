---
title: 8 VisNav - Visual SLAM_Part1
source: converted:attachments/documents/CV_Visual-Navigation-853667cc99d7/8 VisNav
  - Visual SLAM_Part1.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-853667cc99d7/8 VisNav - Visual
    SLAM_Part1.pdf
  title: 8 VisNav - Visual SLAM_Part1.pdf
---

# 8 VisNav - Visual SLAM_Part1

Technische Universität München 

# **VISUAL NAVIGATION** 

# **Visual SLAM: Simultaneous Localization and Mapping with cameras** 

**Part 1** 

Ww oO” t FART Word Word iN) Cowdinate Vt Camera m= {m), ..., M,j;} 

Technische Universität München 

## **Problem definition and characteristics** 

 SLAM: find the a posteriori probability 

_or_ 

_(online SLAM)_ 

_pose map (full SLAM) path            map_ 

4 

<u>“~~ aCommunicaICommunicaIICommunicaIII</u> **<u>n</u>** <u>stituteddd Naviga for for for</u> **<u>tio</u>** <u>nnsns</u> 

<u>aCommunicaICommunicaIICommunicaIII</u> **<u>n</u>** <u>stituteddd Naviga for for for</u> **<u>tio</u>** 

<u>TUT</u> 

mM 5 jt correction mr, = m, _ : paren’ aay new [aval mays to prenons vie 

ld _—_ ° A Gy oat Te = ea + Tel + Tel + + Ex) thea thea y Ye = Ye + Yr—1 At + + Yr—1 At + Yr—1 At + At + + Ey) 42, <6 ra O, = Oy4t+ 0,_,At +(EB) 0. 0,_,At +(EB) 0. +(EB) 0. 0. : ve = Xt] + Ee) Ee) Moo) ~Mlo)r0b) dt _ Yt—-1 + (Ey) Noo) (Ey) Noo) Noo) <u>A —_ Oy +(€4) Moe)</u> 

Lar | Institute for 

||Ye<br>1|WS<br>0|m<br>ae 7e<br>0<br>At|e<br>0||<br>O||||
|---|---|---|---|---|---|---|---|---|
||0<br>ajo <br>t~<br>19<br><br>|1<br> 0<br>0<br>|0<br>0<br>1<br>0<br>0<br>1<br><br>|At<br>0<br>O<br>|0<br>At <br>Of}<br>|-(t <br>103|An]<br>I||
|y|Rain<br>lg|9|9<br>0|1|0||||
||0|0<br>|0<br>0<br>|0<br>|1<br>||||
|UT<br>||A?<br>|0<br>|0<br>|0<br>|0<br>0<br><br>|||
|<\O||0|AZ|0|0|0<br>0|||
|L|R’—o2||9|0|At?|0|0<br>0_|At?I3|03|
||<br>a<br>|<br>0<br>|oO<br>|oO<br>|1<br>|<br>0<br>0<br><br>|0;|Is|
||hameron<br>||2<br>|9<br>|0<br>|0<br>|1<br>0<br><br>|||
||<br>ansuo|<br>0|oOo|oO|0|0<br>1|||
|_<br>oo<br>T||_|/|||/|||

Technische Universität München 

## **An example of filter construction: planar motion with constant velocity** 

 State vector (online SLAM): 

 Map points:                                                     with 

_Obviously, thus_ 

###  State transition model: 

8 

== (3) mo, €m my, ¢m nl; nl; XL z,=P({7*)=|R|t]( ,°) =R(6)m;+ 1 it y AEA WHI AM h;(x) l= 1 0 -—m,,sin?—mj,cos@ 0 --O cos@ —sin@ --0 ‘10 1 mji,cos?-my,snd O --O sin@ cosd --O (_____________] R(@) = <u>earcos?</u> —sin@a 

m «= (3) moecem m m Q; — Oop<1202 (‘Vvv(0, Qt h° Zt = h| Me) + He| %- se) + 5 Ji T oz/ax H,=|: Ht= | ajax J. 320 [ax 

Mi-l |g, Bel(x;_1) ut Xt At Xt-1 _ Hy = AtHi_1 by ) Dut Dt — A, d4-1 A; + R; Ky K, = 4H} (H,»,H? + Q,) ity = * ty + Ky(ae Ky(ae — W(,)) W(,)) 

Technische Universität München 

## **An example of filter construction: planar motion with constant velocity** 

 Nota: predicted state variance-covariance matrix is 

- Pose covariance is updated according to motion model 

- Correlation pose-landmarks is updated at each step 

- Update (prediction step) leaves the covariance of the landmarks unaffected (expected, as we consider only static landmarks) 

_Using_ 

12 

Technische Universität München 

## **An example of filter construction: planar motion with constant velocity** 

 Nota: (linearized) observation model is described by matrix 

_Sparse matrix_ 

- Gain matrix: 

_No longer a sparse matrix, and of limited size_ 

- Update current belief: 

; > 

Mb, = Pet Ki; (Zz — h(f1,)) ae H,>»,H? + elon on Td Qe cortainty. of pst Zt h(1,) Ze = h(de)t|| He lXe-ae) lXe-ae) + Se Se H,>)H? 

Ze = h(de)t|| He lXe-ae) lXe-ae) + Se Se H,>)H? Cov (24 _h(ae))hat) | = HeHt avoulL xt -ae)- A Ae 

St 

| <u>CommunicationsInstitute for</u> 

<u>TUT</u> 

[.- | Institute for for «Communications <u>0 and Navigation</u> 

SLAM with lovp Closure 

<u>TUT</u> 

Lor | Communica ions 

Lor | Communica <u>(a eelNavigationNavigation</u> 

<u>LA</u> 

<u>and Navigation</u> 

= Yi = Ww =Kim'+ b, MN, = | : (acinar48 an A 3 f(x,,z)) Jp= Ee oF | = J. Ju| aXt I 0 Ax; _ AXia = J, Jy Az, - Jy axt t+Je o2% 1 0 2 O (" Ix! -> _ Dy dyed y L. . | O 224 0) jp" na Joy J, diJ 5 + Jz) diz Jo, Je 

Technische Universität München 

## **Data association** 

- How do we associate the landmarks being observed with the _M_ landmarks present in the map? 

I) How to recognize already mapped landmarks among the currently observed landmarks (database scan and loop closures)? II) How to handle previously unseen landmarks (initialization and map updates)? 

- Complexity of exhaustive search: 

_# landmarks observed (N: new  ;  O:old) Landmark in the map       Landmark not in the map_ 

20 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Technische Universität München 

## **Data association** 

- Statistical validation in the observation space: individual gating ( _a.k.a. Nearest Neighbor_ ) 

_: actual observation computed with i-th landmark : predicted observation based on the j-th landmark, conditional on the predicted pose_ 

- Evaluate squared weighted distance (individual gate) 

 distributes according to a central               distribution for a correct association          and according to a noncentral             for a wrong association, with noncentrality parameter     proportional to the mismatch between       and                    and    the dimensionality of observation 

22 

X'ly.v) = =|, 57 <u>enX'[yv)</u> ~~pen~~ <u>[D=MisiMa</u><sup>)</sup> Xi (x) (x) locally ake (x) (x) D;, , aa» <u>Co</u> 

QD TER Ha tne$ 

Technische Universität München 

## **Data association** 

- Statistical validation in the observation space: individual gating 

- Collect all potential associations whose distance       does not exceed the threshold: 

- _If only one candidate is found, association is straightforward_ 

- _If multiple associations are found, select the one with minimum_ 

_the map_ 

- Search logic: 

_Observation space_ 

_Map space_ 

… 

_Accepted association Rejected association_ 

24 

Technische Universität München 

## **Data association** 

- Statistical validation in the observation space: individual gating 

- Collect all potential associations whose distance       does not exceed the threshold: 

- _If only one candidate is found, association is straightforward_ 

- _If multiple associations are found, select the one with minimum_ 

_the map_ 

- Search logic: 

_Observation space_ 

_Map space_ 

… 

_Accepted association Rejected association_ 

25 

<u>Lig nInst nInstInst</u> **<u>i</u>** <u>tute forna; forna;na;;</u> 

<u>TUT</u> 

(LS 

Cad aleMe Rij en 

i nd 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u>

---

## 源文件

- [8 VisNav - Visual SLAM_Part1.pdf](attachments/documents/CV_Visual-Navigation-853667cc99d7/8 VisNav - Visual SLAM_Part1.pdf)

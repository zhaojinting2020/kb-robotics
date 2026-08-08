---
title: 4 VisNav - SingleViewGeometry
source: converted:attachments/documents/CV_Visual-Navigation-465282e1e5de/4 VisNav
  - SingleViewGeometry.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-465282e1e5de/4 VisNav - SingleViewGeometry.pdf
  title: 4 VisNav - SingleViewGeometry.pdf
---

# 4 VisNav - SingleViewGeometry

mAX KI x = Pxja~ RX vKREL-C\K vEM: Pa |X C= -W\"' Pe 

Technische Universität München 

# **Camera model** 

 Imaging: projection form        (points in 3D homogeneous coordinates) to       (points in planar homogeneous coordinates) 

- Simplest projection: pinhole model 

_Camera center_ 

_Principal point_ 

_:  Focal distance_ 

2 

Technische Universität München 

# **Camera model** 

 Imaging: projection form        (points in 3D homogeneous coordinates) to       (points in planar homogeneous coordinates) 

- Principal point offset 

_Origin of image coordinate system_ 

_Camera center_ 

_:  Focal distance_ 

4 

Technische Universität München 

# **Camera model** 

 Imaging: projection form        (points in 3D homogeneous coordinates) to       (points in planar homogeneous coordinates) 

- Camera rotation and translation 

6 

P2 

t] x x VOX = Ko 4) 44 fF KTR P=K[R|t]=kLe| -ReJ Ino explicit on with explicit Cameva center K Rt 

Lar | Institute for 

Technische Universität München 

# **Camera model** 

- Imaging: projection form        (points in 3D homogeneous coordinates) to       (points in planar homogeneous coordinates) 

- Some modifications: 

_Coordinates in terms of non-square pixels  ( DoF(_ **P** _)=10 ):_ 

𝑚 _where                     , with       the  number of image pixels per unit_ 𝛼= −𝑓𝑚 _coordinate_ 

9 

Technische Universität München 

# **Camera model** 

- 1-dimensional right null space 

- 3D points on line through **C** (camera center) and arbitrary point **A** : 

- Projection: 

- All point on line map to the same point       in the image plane 

   - _Thus, depth perception is lost._ 

12 

P 

P= [M. | P| 

3yte 3x3 3x4 4x4 P=USV‘ V LsageePt | M = KR(yp ovthowomal, rarnix 

ee 

(of = 41) 

Technische Universität München 

# **Estimation of camera matrix parameters** 

- Camera matrix estimated from 2D  3D point correspondences 

- When data are affected by errors: 

##  Solution: perform SVD 

15 

Technische Universität München 

# **Calibration procedures** 

- Camera calibration: from known 3D world coordinates 

s—0 Ay = Ay ~~00)~~ 

<u>iInstitute for 4Institute for 4 for 4 4</u> 

<u>TUT</u> 

oo Geese SSeS eeea a ae ooo Rew, 22 ae og ganFEEEEEEEEEEEEEEEEEEEEEEEEE | BEEEEEEEEEEEEEE **EE** EEE PEEAo a Senn Ge Ltt Oe Gee EEA FEE EEE GEE EEE EEE EEE EEE EEE EEE GREEEEE ROE Sh 0 ee ee eM pieeo) Be eee STILL ILL EL LLL) Cnc ccc errrSCTTETTLILCEeLLUOCCCLECLIELECLLrr)LeetTerrier re) LOLOLee ee ee TT2 Tree Lecter Lei Lo ELLEEELcLeceelerercirrecciert tree eeei 3s GisSS -0SL Cee Berth oe Seer Soe Hee ee Smee eeeeeREESEEeeeooeePepteeegee2 Libido)tee. sa ee bo CESSES EEEEEEEEEEEEEEE SY OE HLA A Gk SESE <u>EEEEy) EEREPEL</u> ELLICLELITLL LETT Eee <u>Te</u> 

r L(7) 

xq V L(7)x = L(r)PX 

v= 2.+ L(r)(x — 2) 2) y= ye + L(F)(y — Ye) 

L(*) = ko t+ ky + kor ky + kor + kor kor + kgf? +... 

(Xe, Ye) 

Lar | Institute for 

Xd Vv Lr alt, x) Lr alt, x) alt, x) x) = Ly alt, PX) alt, PX) PX) 

r 

(Le, Yo) 

a(ko + + kyr + + kof? + kgr? +...) + (2Piry + + Po(7* + 2x7))(1 + P37? + Pyrt +...) Lyra (t, x) x) = y(ko + kyf + + kor? + kg kg +...) + (2Pory + + Py (F? (F? + 2y?))(1 + Pgh Pgh + Pyar? +...) 

> Institute for (SE Communications <u>42) and Navigation</u> 

K 

Institute for <u>Yau==</u> Communicationsandand <u>Navigation</u> 

Pp? P2 

Pp? Pp? 1 0 0 O P= 3 x 3 homography | O 1 0 0 [4 x 4 homography| 0 0 1 O 

Technische Universität München 

# **Appendix: single view geometry definitions and properties** 

##  Action of a projective camera on planes 

- Let align the world frame with a given plane    : 

27 

Y 1 

—-H|[Z 

Technische Universität München 

# **Appendix: single view geometry definitions and properties** 

##  Action of a projective camera on lines 

- Forward projection: line maps to lines 

29 

<u>Lig SaprmnicatorInstitute for</u> 

<u>TUT</u> 

Technische Universität München 

# **Appendix: single view geometry definitions and properties** 

 Action of a projective camera on quadrics/conics 

- Back-projection of a conic      on image plane maps into a cone (degenerate quadric) 

31 

Technische Universität München 

# **Appendix: single view geometry definitions and properties** 

 Action of a projective camera on smooth surfaces 

- Smooth surface are projected to continuous line 

- The apparent contour is back-projected to planes tangent to the contour generator 

_Apparent contour Contour generator_ 

32 

~~vi!~~<sup>Communications</sup> Institute ~~for~~ 

Technische Universität München 

# **Appendix: single view geometry definitions and properties** 

- The cone of rays:  the “cone” formed by the rays connecting the camera center to the contour generator 

_Contour generator_ 

34 

oo <<) ~\s P=KRI| —-C P’=K’R’[I| =| ApS ApS —C| [= 1 1 Xx ; P’=K’R’(KR)'P = x’~ Hx H = K’R’(KR)"' ~~ne.~~ <u>Ty),</u> ~~ae~~

---

## 源文件

- [4 VisNav - SingleViewGeometry.pdf](attachments/documents/CV_Visual-Navigation-465282e1e5de/4 VisNav - SingleViewGeometry.pdf)

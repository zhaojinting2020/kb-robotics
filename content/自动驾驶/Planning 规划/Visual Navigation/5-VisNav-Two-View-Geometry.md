---
title: 5 VisNav - Two View Geometry
source: converted:attachments/documents/CV_Visual-Navigation-69a0d35d307b/5 VisNav
  - Two View Geometry.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-69a0d35d307b/5 VisNav - Two View
    Geometry.pdf
  title: 5 VisNav - Two View Geometry.pdf
---

# 5 VisNav - Two View Geometry

Technische Universität München 

### **VISUAL NAVIGATION Two view geometry** 

Technische Universität München 

##### **Two view geometry** 

Lecture objectives: 

- Characterization of the geometry relating two images of the same environment 

- Estimation of the relative movement that characterizes the relative position(s) of the camera(s) 

- Reconstruction of the 

3D points positions 

2 

Technische Universität München 

##### **Two view geometry** 

 I) If     is known, what kind of geometrical constraints arise on the corresponding image in the second focal plane? 

 II) Given a set of correspondences , can we reconstruct both camera matrices          ? 

 III) Given a set of correspondences and camera matrices         , can we estimate the 3D coordinates of points     ? 

3 

Technische Universität München 

##### **Epipolar geometry** 

 I) If     is known, what kind of geometrical constraints arise on the corresponding image in the second focal plane? 

4 

> 

Institute for 

; 

<u>TUT</u> 

<u>“~~ CommunicationsandInstituteNavigation forandInstituteNavigation forInstituteNavigation forNavigation for for</u> 

<u>ta cermin Pe RR</u> 

<u>=S>(ppt)(ppt)7=1</u> 

<u>> pt = PTC ppt)</u> 

<u>TUT</u> 

x 

X 

pr FT PP*t =I — P(P"(PP")"') x = Ix ~PP'™x X”~ PTx x? x V PX x X(\) =Ptx +AC hy C VAN : rou forxx <u>aa</u> 

C x X(A)=Ptx+AC C Px a \ X VY =elx x w Qe' PP x / N <u><mark>—</mark> (x’) "Fx "Fx</u> <u><mark>—</mark> 0 aa</u> 

<u><mark>(x')TQ.P’P*x —</mark> (x’) "Fx "Fx</u> <u><mark>—</mark> 0</u> 

l' ~ Fx (e')"F =0 

Fv /pt+ QeP'P* ., 0, «. lw Flx’ .@: O Fe = 0 

X=ext l'n FQ,I LvFTOQ.1 xoxl/l/ 

Technische Universität München 

##### **Epipolar geometry: fundamental matrix** 

- Properties of fundamental matrix 

_V) Same fundamental matrix for infinite projections:_ **_projective ambiguity:_** _VI) If              and               are characterized by the same fundamental matrix      , then an homography       exists, for which_ 

11 

<mark>J</mark> Object point point<sup><mark>= KRTF) ; jeg</mark></sup> ~~<u>A im</u>~~ <mark>e'v</mark><sup><mark>PC</mark></sup> <mark>kits RAK +lw RAK +lw +lwlw « ge)»a (atesed 5)iL kA4) Aa De (ki" x) x) = ALERKxx + De F (KE) * (KRKF') Nal</mark> ~~<u><u</u>~~ <mark>Kee’) _2¢ (ky1x') = (Kyaw)Be RKita (Kyaw)Be RKitaBe RKita RKita | det(K) Dg RAT</mark> 0 <mark>2 «TRS OER KA KA x =0 =0 if X and x! are already Cali broted F xT 1¢R x —0 E</mark> 

Technische Universität München 

##### **Epipolar geometry: fundamental matrix** 

- Properties of fundamental matrix 

_VII) The camera matrices corresponding to a fundamental matrix may be chosen as_ 

These are the canonical form of the camera matrices (only relative movement is observable!) 

12 

Technische Universität München 

##### **Epipolar geometry: an example** 

 Example: pure translational motion of same camera 

######  Camera matrices: 

13 

Technische Universität München 

##### **Epipolar geometry: an example** 

 Example: pure translational motion of same camera 

- Camera matrices: 

- Epipoles: 

- Fundamental matrix: 

- Back-projection from first image: 

- Projection at translated position: 

14 

| Institute for <<"«« Communications <u>0 and Navigation</u> 

## ~~Re~~ 

# ba ~~De De~~ 

($A K x=K™'x~|R|t|X 1 % - 30F Rr 3Der Y — 2bF P={I|0],P’=[R|t?] + QRE~ (x')"Bx = 0 ~~ED)~~ 

Technische Universität München 

##### **Two view geometry** 

 II) Given a set of correspondences , can we reconstruct both camera matrices          ? 

 III) Given a set of correspondences and camera matrices         , can we estimate the 3D coordinates of points     ? 

18 

Technische Universität München 

##### **Methodology** 

 Reconstruction problem: find                    from a set of correspondences 

- Outline of methodology: 

I) Compute fundamental matrix (or essential matrix for calibrated cameras) 

II) Compute camera matrices III) Reconstruct spatial coordinates of points 

19 

(x;) "Fx; = 0 one -funchion AAP xiSO xX,assy we 

P=|I|0 P! = [QF (el) oy erp" erp" Ly yout \yal we we C c! ox ond cx 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

; 

(x,// ) "Fx; "Fx; = 0 

F 

eit fit vi 2ofie try fist c5rufor t+ 0522 foo + Ly fo3 + 2131 + 22 f32 + fs3 = 0 

Af =0 uh 4 F=arg min |jAf|l? FER® , ||f\|/=1 

<mark>7 tH i</mark> | <mark>FE X MA AA Ar %\'</mark> 1 <mark>Ad 4] |% $2 ‘i i |</mark><sup>3</sup> <mark>| ' fA) (>= Vs (</mark> 

<u>~~ stitute for for</u> 

EF = ~~Uel~~ =, | va" 

rkK(F)=2 ss detF=0 EF 

<u>_LL Communicandand Navig</u> **<u>ati</u>** <u>ononsons</u> 

<u>TUT</u> 

Technische Universität München 

##### **Estimation of fundamental matrix** 

######  This is know as the **8-point algorithm** 

_I) Linear solution_ 

_II) Enforce rank-deficiency_ 

26 

K 

_ _ x=K ‘x E=QR 

_ _ —1 x=K ‘x , x=K’=K’ x’ E=QR (x') "Ex = 0 Xj x, detE =0 SVD(E) = Udiag(o,o,0)V* 

~~fal Siero fo (Home~~ 

~~HE OL OARE) TUM~~ 

#### SVD(E) = Udiag(o,¢,0)V* 

P=[I|0 P’ = = [R|t] =[UWV"|| us) P’ = (R|t] =([UW'V’"|| us] p’ = R | t | | = [WV [WV | — us| P’ =|R =|R | t| =(UW'V' | — u3| 

brLandpv —-;Landpv —-;pv —-; —-; <u>CommunicInstituteNavig forInstituteNavig forNavig for for</u> **<u>atio</u>** <u>nnsns</u> 

<u>TUT</u> 

Xx; 

4— 

4 X; = K K 

E=arg min ||Aell e€R? , |le||=1 (0, 0,0) E = arg min |E — B||? detE=0 , ECR?*? ; a 0 0 ; (a +b) /2 /2 0 0 E-U|0 bd 0 vis E-U 0 (a+b)/2 0} v™ 00 cf] ou 0 0 0 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

vepra jection %2PR 2 

| 

Lar _| _| Institute for for ; <u>CGM Sra</u> ~~Navigation~~ 

~~TUT~~ 

F 

F=QM=-{R 

a 6 aa+ hb F=|c d ac+(/d e f aet+Bf 

y<sup>a“</sup> ~~ | CommunicationsInstitute forInstitute for <u>L and Navigation</u> 

Fo 

Fi (e’)"Fh =O Foe=0 ey° +eo* =e, 2 +e 2 =1 (1,0, Re(1,0,¢3)"= , R’e’ = e%)" e, e2 O e, e5 O R= —€2Q @] 0 R’ = —e} e4 0 0 O 1 0 O 1 a/ // pT ~~ooOE RERO~~ 

S> (a (oc), !) + @(2:,%) @(2:,%) 

~~ns~~ 

ae a) W(t) U=F x 0 .~ ; = F“(0,t,1)7 a = ° = (—f'(ct+d),at+b,ct+d)" d?(x',V'(t)) = (tty = (tty (tty (at++ b)2 + + f’*(ct + + d)? 

t? ct + + d)? 1+(tf)? (at +b)? +b)? + f’?(ct + d) + d) d) 

g(t) = t((at +b)? + +b)? + + fl (et + + d)*)? — (ad — — bc)(1+ f?t?)?(at + + b)(ct + + d) =0 Candtauns 4b 

g(t) = t((at +b)? + f(a + +b)? + f(a + + f(a + f(a + + d)*)? — (ad — — bc)(1+ f7t?)?(at + + b)(ct + d) =0 

gt) 

Emin s(t) 

I(tmin ) — (tin, 1, —tmin) I’ (tmin ) — (— f’ (ctmin + d), Atmin + b, Clmin + d)* 

x, x’ 

l= (11, lo, l3)* x x = (—Lls, —Iols, 1? + 12)" = ( 143; 263, i+ 5) T (RTS t—larysTay xX T R x 

x, x’ 

nw 

(x)A/I\TA/I\T "Fx;““ = 0 

(x. )"Fx; )"Fx; = 0 

EF d2 (x! X!) + B(x; &; 

P= 

Institute for 

— 

> x; = PH" —_ 'HX, , x’,// = P’H"'HX;// _ 

x; =- PH 'HX,, x’ = P’H 'HxX; H.= sR t ~ | 5) , P=K[R, tp fee 4h Paxil /eafBan Gnd ~~EO~~ <u>= KLPp. a</u> 

<u>| Communications</u> 

<u>TUT</u> 

~~Sa~~ <u>~~ Communications</u> 

~~| | | |~~ 

n>od 

X; 

/ x;CC = HX; , t=1,...,0.. 

C —] 

Technische Universität München 

##### **Two view geometry: results** 

######  We have seen how to: 

a) reconstruct the camera matrix, thus the movement of the camera, from point correspondences between two images b) reconstruct the 3D coordinates of points in space from their images on two different focal planes 

- The simultaneous estimation of camera matrices (i.e., movement) and 3D points is ambiguous (up to a similarity) when using a single camera (either calibrated or uncalibrated). The ambiguity can be resolved by using 3D points with known coordinates 

- The procedures overviewed in this lecture are usually applied to a moving monocular camera, in which the (relative) rotation and translation across frames can only be reconstructed up to a similarity (most important: scaling cannot be recovered) 

51 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u>

---

## 源文件

- [5 VisNav - Two View Geometry.pdf](attachments/documents/CV_Visual-Navigation-69a0d35d307b/5 VisNav - Two View Geometry.pdf)

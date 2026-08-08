---
title: 3 VisNav - Estimation
source: converted:attachments/documents/CV_Visual-Navigation-6374631ce724/3 VisNav
  - Estimation.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-6374631ce724/3 VisNav - Estimation.pdf
  title: 3 VisNav - Estimation.pdf
---

# 3 VisNav - Estimation

y<sup>a“</sup> ~~ | CommunicationsInstitute forInstitute for for <u>L and Navigation</u> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

<u>> Lofof</u> 

<u>Communicandand Navig</u> **<u>ati</u>** <u>ononsons</u> 

<u>TUT</u> 

Technische Universität München 

# **Intro** 

##  Nomenclature 

_-           observations (measurements) - expected values - estimated values_ 

_- expectation operator (mean) -           dispersion operator (variancecovariance matrix)_ 

_(Multivariate) Gaussian pdf_ 

_-_ 

_-_ 

_Mahalanobis distance_ 

4 

<u>é.</u> 

<u>Corrtnunisations</u> 

<u>TUT</u> 

y € R” peEkRm y ~ N(y,d) N(y,d) 

E(y)=f(p) , Diy)= % 

E(y) — AnxmP E(y) =f(p) E(y) + f(p) + Jejs (Pp =P) ee _ f(D) Opi OPm af,(B) fab) ~~aJeip = | Opi:: OPm::~~ 

y € R” 

p € R” E(y) — AnxmP os taiWw i At 7 Ke 4 He i. jy «e=y-—Ap 

p = = arg min (||y — — Ap||s) ~~per~~ 

p _ (ATS TA) TATD Hy 

D(p) = Np = (ATE A)7 

<u>psn=sn== arg min:(|ly:(|ly(|ly</u> _—— <u>Aplls)Apll2Apll2</u> 

«e=y-—Ap 

p=argAA min.. _ |ly— Ap|ls9)9) peR”™ , |p ||= 

Vy 1 y-Aplls + X Ulpil 0) | =0 

lsin88 cos @ p = | /sin@sin > fT 6, b) = ar min — Ap(0, ¢)||3 PUG 0) = are oD coon IY 7 APO Mlle nos<sup>@</sup> 

p=arg min |ly—Aplls pER™,, ||p||=l L(p,A) =(y—- Ap)"hy—] Ap)"hy—]hy—]—] (y — Ap) — Ap) Ap) + A(p*p — — 1°)22 Vp,rL(p, d) <mark>=</mark> 0 AP , er 28] 

pa=a== arg min.. |ly _¢—— £(p)|Ix Ely) = f(pi) + Jelp, (p — pi) | : : | A ° y) ee a Fae p © arg min |[Ay; — Jeip, APi||S pER™ 

0 p = arg88 minmin llymin lly lly —f (Pp) |S2 |S22 ipl© Api = (Jip, = Ieip;) IF, = Ay: Ypiyi —] _ = (Je), = Jelp,) Po 

Ap; < «€ 

p=arg min jy —-T(p)I/ls pek™” 

Technische Universität München 

# **Examples of estimation problems in CV** 

 Example: find     such that                 between four corresponding matches in two 2D images. 

16 

<mark>: OCLC,</mark> ~~<u>ae 8</u>~~ <mark>h</mark> ~~<u>xt</u>~~ <mark>A 39 hawt wt xy 0 u AK Z. 3x) hg</mark> 

~ | 

Institute for 

— 

Aonxgh = 0 

A S\ rapa Vo OT eei iad 

n>A 

More eat medh ov) E(Aonxgh) = 0 hon needol 

Siguiay A h— arg mix || Ah||? = Vinin heR”™ 

daig (i Hxs) = Hexsll”[> (neosuremat ervey BABA = llee||” 

TV re Taat 2 daig(%iHxi) 2 daig(%iHxi) daig(%iHxi) = arg min 

**|** Abl 

Lar | Institute for 

Institute for <u>L. andCommunicationsNavigationNavigation</u> 

<u>se) reamStart to Consider Measuvemait error</u> 

<u>1m</u> 

H77 : 2 / 2 —1l/ = arg min arg min min ) > (dy (x;, Hx;) + (dy (x;, Hx;) + (x;, Hx;) + Hx;) + + dy, (x;,H (x;,H x!) Hl 1=1 measure mont uncowtainty mont uncowtainty uncowtainty of Invosurement untortor tainty v ight image of left imag @ H = arg min (a, (xi, %:) + db, (x!,%,)) = arg min (a, (xi, %:) + db, (x!,%,)) arg min (a, (xi, %:) + db, (x!,%,)) min (a, (xi, %:) + db, (x!,%,)) (a, (xi, %:) + db, (x!,%,)) (xi, %:) + db, (x!,%,)) %:) + db, (x!,%,)) + db, (x!,%,)) db, (x!,%,)) (x!,%,)) 

Technische Universität München 

# **Examples of estimation problems in CV** 

##  Symmetric transfer error VS reprojection error 

##  STE: 

##  Reprojection: 

24 

ae : 2 (./ | 2 (x, H-'x’ H = arg> Cones = arg> Cones arg> Cones> Cones Cones Hx;) + ds;, (x;,H + ds;, (x;,H ds;, (x;,H (x;,H x!) a = OS - Aw Yay (wi ths) + (xi - Hai 21 xr - HX") |x) — — Hox |[2, + + [xi — — Hx!2,2, 

- | (x!) : ( (x? @ Is) vec(H) @ Is) vec(H) Is) vec(H) vec(H) | ~~Ce Xj (x7 @ I3) vec(H~*) @ I3) vec(H~*) I3) vec(H~*) vec(H~*) blkdg(X/,5;)~~ Vi {; (H) di,ov 

H = = are min min )> (ad, (x’, Hx;) + d& (x, H-'x’)) Hx;) + d& (x, H-'x’)) + d& (x, H-'x’)) (x, H-'x’)) H-'x’)) Miz ) A , 2 xX = arg ma ly —_ f(H)||s Y =(Y1,---,¥n)y= blkdg(%14 ov, cy Yin,ov) 

H = arg min (3, (x:, %) +d, (x1, *)) Aik ; H x; (since x; = Hx;) [xt — 802, + [bes — Rll, = |x) — BBBIZ, + I — IR, <u>-|@)- (eee),</u> x; x; blkdg(=!,5;) ~~SZ,~~ <u>©</u> 

H = = are min min (45, (x;, xj) + dss, (x%, x) (x;, xj) + dss, (x%, x) xj) + dss, (x%, x) + dss, (x%, x) dss, (x%, x) (x%, x) x) st. x, = Hx; 

1% H} H} = arg min arg min min lly — f(x, H)||5 — f(x, H)||5 f(x, H)||5 H)||5 X = (X],...,Xp)* f = (f;,...,f,)° y= blkdg(X4 ov, my Yn,ov) 

Technische Universität München 

# **Examples of estimation problems in CV** 

##  Gold-standard algorithm flowchart 

|Preparation<br>Normalize image 1<br>Preparation<br>Normalize image 2<br>Initialization<br>variables<br>Counter|
|---|
|Update<br>Update parameter vectors<br>Estimation<br>Minimize (linearized) re-<br>projection error,<br>Iterate until convergence<br>criterion is met<br>N<br>Y|

29 

Institute for Communications <u>L and Navigation</u> 

J.LL 

<u>CommunicandInstiandInstiInsti Navigff</u> **<u>ati</u>** <u>ononsons</u> 

<u>TUT</u> 

— rere outlines 

<u>Fwaa CommunicationsInstituteInstituteInstitute</u> for ~~LET and Navigation,~~ 

<u>CommunicationsInstituteInstituteInstitute</u> for 

<u>TUT]</u> 

= Institute for * a Communications <u>L and Navigation</u> 

” «= Communications <u>a Institute for for</u> 

<u>TUT</u> 

~ | 

Institute for 

— 

Vstance between lhe and pant 

l, = (a, b, c)" xi = (11, %2,%3)" 1 Ly “ q+ 2b+¢ 2b+¢ di(xi1s) X2 T2 T2 O61) = Ss (—, =, )] 0] => 0] => => x | = Taeas! a5) Taeas! a5)as! a5) a5) \O) ara WN fe, di(xi Z vu N (oD RB ts) % 7, , 

Lar | Institute for tions <u>ai snd |NavigationNavigation</u> 

<u>TUM</u> 

m Model t? 1 line, fundamental matrix 3.84 0? 0? 2 Jel\x-4xll homography, camera matrix matrix 5.99 o? o? ~~3 trifocal tensor tensor i 78107 ————~~ 

x; 2 ‘ ~ N(0.0°1I)( ) =» ~~ee~~ 

es Gii-------aaaD GLa 

P(di <t?)=a=0.95 =>tg LL (EEE 

Technische Universität München 

# **Robust estimation** 

- How many subset samples should one try? 

- _Choose number of samples      so that at least one sample is free of outliers with probability_ 

- _Probability that a point is an inlier:       , thus the probability that a point is an outlier is_ 

- Probability that taking     different samples of     points (assumed independent) returns an outlier-free sample with probability     : 

_Probability  of Probability  of having an outlier in having all samples a single sample affected by outliers_ _~~of s point~~_ 

38 

~~ae~~ Ler | | ~~| ond~~ Cornenantna ~~Navigation~~ ions 

~~TUM~~ 

### e=—l—-—w 

a N= log(1 — P) — P) P) l 1 s og( — W W ) 

|Sample size|||Propor|tion of|outliers|€||
|---|---|---|---|---|---|---|---|
|s|5%|10%|20%|25%|30%|40%|50%|
|2|2|3|5|6|7|11|17|
|3<br>|3<br>|4<br>|7<br>|9<br>|11<br>|19<br>|35<br>|
|||||||||
|5<br>|4<br>|6<br>|12<br>|17<br>|26<br>|57<br>|146<br>|
|6|4|7|16|24|37.|97|293|
|7|4|8|20|33|54|163|588|
|8|5|9|26|44|78|272|#1177|

Technische Universität München 

# **Robust estimation** 

##  When to terminate? 

- _A rule of thumb is to terminate when finding a sample with a consensus equal to the expected number of outliers. Example. Expected ratio of inliers in the data set of      points is reached:_ 

- _Tricky: we often do not know the probability of inliers_ 

- _Alternative approach: adaptively adjust the expected probability of inliers by starting with 0.5 and adjusting during search_ 

- This method is named RANdom SAmple Consensus (RANSAC) algorithm _. Alternative robust estimation approach: Least Median of Squares (LMS) , with model scored by taking the median of squared distances (rather than the number of inliers)._ 

40 

Institute for j Communications <u>(an and Navigation</u> 

use + 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

~~TG~~ - -<sup>a</sup> ~~andnavgation~~ CommunicationsInstitute forInstitute for 

y<sup>a“</sup> ~~ | CommunicationsInstitute forInstitute for <u>L and Navigation</u> 

a11B ve Q1n,B A®B= | io 3 Am1B vc AmnB a: vec(A) = ain 

(A@B)T = AT@B (A®B)'t = A t@B" (A®B)(C@D) = AC®@BD (If conforming matrices) vec(ABC) = (CT ®@ A)vecB 

p=arg min _ |ly— Aplls peER™ , ||p||=1 ae gem one L(p,A) = (y — Ap)"="*(y — Ap)"="*(y Ap)"="*(y — Ap) Ap) + A(p"p A(p"p — |”) 

(ATS "'A+AIp—ATH "'y=0 3S <u>p"p—l? =0</u> 

p=(ATH'1A4ADTATDCy {} A p(A)"p(A) - 1? =0 

A ; 9) p=arg min |y—Aplls pER”™,, ||p||=l »=-2A = USV" y’ = Sty T —laTrTriTtT../ p()) pA) = V(S°s+AIUS'U'y A ~ 2 T I\'T T —2atTyrTtT../ p(d)"p(A)= (y')"US(S™S +2) 28"UTy L(y)a Uty’ a =P or A) “ 0;(UTy); P(A) = ——=. Vi ~~» ran~~

---

## 源文件

- [3 VisNav - Estimation.pdf](attachments/documents/CV_Visual-Navigation-6374631ce724/3 VisNav - Estimation.pdf)

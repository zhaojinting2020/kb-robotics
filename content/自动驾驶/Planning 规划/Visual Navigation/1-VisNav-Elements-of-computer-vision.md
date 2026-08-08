---
title: 1 VisNav - Elements of computer vision
source: converted:attachments/documents/CV_Visual-Navigation-7e968ebfcb11/1 VisNav
  - Elements of computer vision.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-7e968ebfcb11/1 VisNav - Elements
    of computer vision.pdf
  title: 1 VisNav - Elements of computer vision.pdf
---

# 1 VisNav - Elements of computer vision

<u>> L.ftft Communicationsandand Navigation</u> 

<u>TUT</u> 

><sup>a</sup> ~ | | CommunicationsInstitute forInstitute for ~~LIE and Navigation~~ 

[- | Institute for 

Technische Universität München 

## **Image characteristics** 

- Image (digital): ordered collection of pixels, each representing a “quantum of information” relative to the brightness of a specific color 

- Numerical point of view: tensor (multi-dimensional matrix ) in which each 2-dimensional submatrices provides single-channel information. We name such tensor the “intensity” of the pixel at position    : 

- The quantized digital information contained in the pixel depends on _- scene illumination_ 

   - _characteristics of medium_ 

   - _camera optics (aperture, focal length, distortions, etc..)_ 

   - _number and characteristics of photo-sensors used_ 

   - _quantization levels_ 

4 

«|L.L. 

Institute for <u>andCommunicationsNavigationNavigation</u> 

<u>TUT</u> 

y<sup>a“</sup> ~~ | CommunicationsInstitute forInstitute for <u>L and Navigation</u> 

~~ | Institute for <<" «, Communications <u>4 and Navigation</u> 

<u>FfL.</u> > <u>CommunicationsandInstituteNavigationfandInstituteNavigationfInstituteNavigationfNavigationff</u> 

<u>CommunicationsandInstituteNavigationfandInstituteNavigationfInstituteNavigationfNavigationff</u> 

<u>TUT</u> 

<u>br]L.L. Communicationsandand Navigation</u> 

<u>TUT</u> 

<u>_ Communications</u> ~~LET and Navigation,~~ 

<u>TUT</u> 

40 Waid ice, NE 

fac(Au) = S~ w(x;) S~ w(x;) w(x;) (I(x: + Au) + Au) Au) — I(x:))° a = See re rs a aaah cape i 

fac(Au) {Sy (I(x; + Au) _ I(x;))° - wil pole with inp voto ¥ eee, , eae fl OEEDODODODO “=a 

fac(Au) = S~ w(x;) S~ w(x;) w(x;) (I(x: + Au) + Au) Au) — I(x:))° | 

Technische Universität München 

## **Features** 

- This suggests to look for “gradients” in the image 

- First-order Taylor expansion: 

#### _IMAGE GRADIENT_ 

14 

Technische Universität München 

## **Corner detectors** 

Panoramic of features detectors: 

- _Harris corner detector_ 

- _Minimum eigenvalues algorithm_ 

- _FAST (Features from Accelerated Segment Test)_ 

- _BRISK (Binary Robust Invariant Scalable Keypoints)_ 

- _SURF (Speeded Up Robust Features)_ 

- _SIFT (Scale-Invariant Feature Transform)_ 

43 

Technische Universität München 

## **Corner detectors** 

- Image gradient is also known as Harris matrix 

- Relation with axis of an ellipse: 

16 

S_ w(x)? (x) A=) A(x;) = i S— w(x) Le (xi) Ly (xi) Le (xi) Ly (xi) (xi) Ly (xi) Ly (xi) (xi) i 

S_ w(xi) Le (xi) Ly (x) Le (xi) Ly (x) (xi) Ly (x) Ly (x) (x) i ; S_ w(x:)ZF (xi) w(x:)ZF (xi)ZF (xi) (xi) i | ’ \ ki ic \ ki ic ki ic ic ‘aaa‘yaa‘ya‘y‘y 177 

\max \min Amax Amin 

# r(A) — AmaxAmin —_ a(Amax + min) min) 

0.04 < a < 0.06 

~~ae~~ Lor] Comin ~~and Navigation~~ nections ~~Newd mwh~~ 

~~zx~~ 

~~Vw~~ 

~~TUM~~ 

~~Me to COM~~ 

yer(A) 2 2 h2at — AmaxAmin _ a(Amax + Amin) — det A —_ a(trA ) 2 Oparecions A Opevach> 

, det A A trA + € A max BXmin 

Amin = rust haveto got Ay not Sfictont 

<u>of,</u> 

<u>CommunicationsInstitute</u> f 

<u>TUT</u> 

[>] 

a = 0.04 

r(A) 

Technische Universität München 

## **Corner detectors** 

###  Harris detector: invariants 

- Invariance to rotation: corners are detected as such independently from rotations (magnitude of eigenvalues does not change) 

21 

[.- | 

Institute for 

— 

Technische Universität München 

## **Corner detectors** 

Panoramic of features detectors: 

- _Harris corner detector_ 

- _Minimum eigenvalues algorithm_ 

- _FAST (Features from Accelerated Segment Test)_ 

- _BRISK (Binary Robust Invariant Scalable Keypoints)_ 

- _SURF (Speeded Up Robust Features)_ 

- _SIFT (Scale-Invariant Feature Transform)_ 

43 

| Institute for for "(eis Communications 

Amin > Ath 

Lr | inetitute for for 

Technische Universität München 

## **Corner detectors** 

Panoramic of features detectors: 

- _Harris corner detector_ 

- _Minimum eigenvalues algorithm_ 

- _FAST (Features from Accelerated Segment Test)_ 

- _BRISK (Binary Robust Invariant Scalable Keypoints)_ 

- _SURF (Speeded Up Robust Features)_ 

- _SIFT (Scale-Invariant Feature Transform)_ 

43 

= 

Institute for 

b 8 DP we at same due 7 

Institute for 

Lar | Institute for 

Lr | stitute for for 

tl----) 

Technische Universität München 

## **Corner detectors** 

Panoramic of features detectors: 

- _Harris corner detector_ 

- _Minimum eigenvalues algorithm_ 

- _FAST (Features from Accelerated Segment Test)_ 

- _BRISK (Binary Robust Invariant Scalable Keypoints)_ 

- _SURF (Speeded Up Robust Features)_ 

- _SIFT (Scale-Invariant Feature Transform)_ 

43 

<u>~~(an(an stituteand Navigation forand Navigation for Navigation for for</u> 40 rotation — RA 7 

~~ia Smninatons~~ 

~~TUT~~ 

ei 

~~magye 4 diftewol S226~~ and Stave fy Corns \n wl S\red In Aug 

wot orough hime +0 compute ~~wo big~~ <u>abet</u> ~~meu~~ <u>(0.</u> ~~between ae~~ 

Ler 

| 

stitute for 

— 

Technische Universität München 

## **Corner detectors** 

- Example: design function of the image points (on the squared region of variable size) whose behavior is scale-independent (other than rotation!) 

- Detect the value of the region size that maximizes the chosen function 

- Same feature detected at region size (scale)    on the left and at region size (scale)     on the right 

26 

<u>oS44 Communicandand Navig</u> **<u>ati</u>** <u>ononsons</u> 

<u>TUT</u> 

G(e,y.0) 1 o-(0? +y?)/(20?) +y?)/(20?) +56 = 270== 

~~Laplacian of ltaussian~~ <u>- high lg ht Tegions</u> ~~of rapid~~ <u>intensity</u> ~~Change~~ <u>, is</u> ~~there~~ <u>used 0s</u> ~~edqo~~ <u>detection Sdurie image (10) frraved</u> ~~<u>“</u>~~ <u>egy where the edge is Di fponennce of Granssian</u> ~~<u>—</u>~~ <u>capProximasion</u> ~~<u>¢f Lok,</u>~~ <u>easy ty</u> ~~<u>compuht</u>~~ 

Technische Universität München 

## **Corner detectors** 

- SIFT (Scale-Invariant Future Transform) procedures 

- Cycle Gaussian filtering through      (E.g. 

) 

- Cycle scale: descale original image by a factor 2 (keep every other row and column) 

- Typical iterations: 5 blur levels (sigmas), 4 scaling levels 

- Nota: the scale-space of the image has to be used in extracting the descriptors, so it will be re-used 

28 

Sf,LL 

<u>CommunicandInstiandInstiInsti Navigff</u> **<u>ati</u>** <u>ononsons</u> 

<u>TUT</u> 

| Institute for for <<"«3«3 Communications <u>0 and Navigation</u> 

y a__ CommunicationsInstituteInstitute for <u>L. and Navigation</u> 

~~ae~~ Ler | | ~~ond~~ Cornenantna ~~Navigation~~ ions 

~~how by~~ 

~~iS~~ 

~~tek~~ 

~~wi~~ 

~~- wise?~~ 

~~TUN~~ 

y ~~ | Institute for ~~0 ___ LMM“aw andCommunicationsNavigation~~ 

y<sup>a“</sup> ~~ | CommunicationsInstitute forInstitute for <u>L and Navigation</u> 

<u>L.</u> 

Institute f <u>andCommunicationsNavigation</u> 

<u>TUT</u> 

<u>Vas and</u><sup>Communications</sup> InstituteNavigationforNavigationforfor 

Institute for <u>L. andCommunicationsNavigationNavigation</u> 

br|)OY|)OYOY <u>CommunicandInstituteNavig forandInstituteNavig forInstituteNavig forNavig for for</u> **<u>ati</u>** <u>ononsons</u> 

<u>TUT</u> 

> y(ap/ax)[ax alapjax) ( f Joy H(x) = | "" vy det H = AmaxAmin trH = Amax + Amin Arian +4 mnin +24 04 bpnin _ Amon, dws 5 tno Amir Lintn H prota 

Institute for Communications <u>and Navigation</u> 

<u>L</u> 

Technische Universität München 

## **Corner detectors** 

Panoramic of features detectors: 

- _Harris corner detector_ 

- _Minimum eigenvalues algorithm_ 

- _FAST (Features from Accelerated Segment Test)_ 

- _BRISK (Binary Robust Invariant Scalable Keypoints)_ 

- _SURF (Speeded Up Robust Features)_ 

- _SIFT (Scale-Invariant Feature Transform)_ 

43 

<u>+Yau=Yau== andCommunicationsInstituteNavigation forCommunicationsInstituteNavigation forInstituteNavigation forNavigation for for</u> 

<u>TUT</u> 

OOTL OT Pary 

Re 

“n-—_- rrr’ 

<u>+ Institute for for</u> ~~LMM; andNavCommun~~ **~~i~~** ~~gc~~ **~~ation~~** ~~s~~ 

<u>TUT</u> 

<u>L.</u> 

<u>andCommunicationsNavigationNavigation</u> 

<u>TUT</u> 

Technische Universität München 

## **Corner detectors** 

Panoramic of features detectors: 

- _Harris corner detector_ 

- _Minimum eigenvalues algorithm_ 

- _FAST (Features from Accelerated Segment Test)_ 

- _BRISK (Binary Robust Invariant Scalable Keypoints)_ 

- _SURF (Speeded Up Robust Features)_ 

- _SIFT (Scale-Invariant Feature Transform)_ 

43 

<a 1<y noes i=0 j=0 LL xy = <u>H(x) Dzyx(x) D =</u> 

“]_ 

CommunicationsInstitute f 

<u>LorL.L. | Communicationsandand Navigation</u> 

<u>TUT</u> 

ieeaed when moe a<sup>ast</sup> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

~~|||~~ 

Oo 

m(a,y) = V(L(a + + 1,y) — L(x —1,y))? + (L(a,y +1) +1) — L(a,y — 1))? ® z + F 4 = tam Lhe ¥ +L) = E(t, y = VY) changenV asta (wy) = arctan Lix+1,y)-L(a@-l,y)—_— ~~ x — 

Institute for <u>L. andCommunicationsNavigationNavigation</u> 

##### Gradient Magnitude (left), and Gradient Direction (right) 

~~|~~ —] Institute for ~~| ||~~ 

Oo = 1.50 keypoint 

<u>iq] Somnnicstions</u> 

<u>TUT</u> 

(ange to rismadching. 

TT ST S00 2008000TTTT - me EER -_S2= 25htttt PSTTETE may at Sia} Bee | icl | Csi icl | Csi | Csi Csi EC Soe Cer 7 7 TT] ioerel | PCCP SSG SeeeeeeTT SeeeeeeTTTT TT 

~ | Institute for 

~ | Institute for <<" <u>«= Communications</u> 

<u>TUT</u> 

<u>a.</u> Communications_ 

<u>)</u> (/ 

<u>TM</u> 

g 

br] Cornunheations 

[. Institute for ~~Eas| Communications TUM a~~ <u>Navigation</u> 

Technische Universität München 

## **Feature matching** 

- The best candidate match for each keypoint is found by identifying its nearest neighbor in the database of keypoints 

- Extensive search is potentially slow: use of approximated methods that return a closest neighbor with high probability OR use indexing/hashing strategies. 

- Speed increases when matches are known to be close in the image space (small difference between images): search around the image coordinates of each point 

- There could be false positives (matching of non-corresponding features) and false negatives (rejected matching of corresponding features). This problem is addressed by applying robust estimation introduced later in this course 

- procedures ( <u>), e.g., RANSAC</u> 

67 

Technische Universität München 

## **Feature matching** 

- Simplest approach: SSD (Sum of Squared Distances) between feature vectors 

- Refinement:                                 (larger for ambiguous matches) 

 Evaluation of matching strategy: ROC (Receiver Operator Characteristic) curve 

- The larger the area under the curve, the better the performance 

68 

_ Institute for y a Communications ~~LET and Navigation,~~ 

a Communications <u>L.__ andInstituteNavigation forInstituteNavigation forNavigation for for</u> 

<u>TUT</u> 

_ Institute for > a Communications ~~LET and Navigation,~~ 

<u>FlL.L.</u> a <u>CommunicationsandInstituteNavigationforandInstituteNavigationforInstituteNavigationforNavigationforfor</u> 

<u>TUT</u> 

_ Institute for » a Communications <u>L. and Navigation</u> 

###### Point matches, SURF features 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u>

---

## 源文件

- [1 VisNav - Elements of computer vision.pdf](attachments/documents/CV_Visual-Navigation-7e968ebfcb11/1 VisNav - Elements of computer vision.pdf)

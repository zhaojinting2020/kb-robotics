---
title: 7 VisNav - Probabilistic Estimation
source: converted:attachments/documents/CV_Visual-Navigation-eecd419b4369/7 VisNav
  - Probabilistic Estimation.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-eecd419b4369/7 VisNav - Probabilistic
    Estimation.pdf
  title: 7 VisNav - Probabilistic Estimation.pdf
---

# 7 VisNav - Probabilistic Estimation

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

Institute for <u>Vas andCommunicationsNavigationCommunicationsNavigationNavigation</u> 

0< P(A) <1 

P(AU B) = P(A) + P(B) — P(ANB) 

ANB AUB 

b 

P(a € (a,b)) = / p(x)da P((e#=X)AY=Y)) = Play) P((x=X)A(Y=Y)) = P(x) Ply) 

p(x) 

S- p(x) = = 1 

Y = S$ p(aly)ply) <u>Y</u> 

_ plz,y)y) 

/ p(a)dex = 1 = | v(cly)p(opay 

~~ee~~ 

Technische Universität München 

## **Bayes rules** 

- Bayes theorem 

###  “Bayesian interpretation” 

“ “ .         “ in _x_ ” **A-posteriori Conditional prob prior belief belief** in _x_ of obtaining _y,_ (before _y_ is observed) after accounting         given _x”_ for ” _y_ 

6 

Technische Universität München 

## **Bayes rules** 

 A working example 

- _x x=0_ or _x=1_ is a binary state: (example: door open/close) 

- _x_ : 

- Initially, we do not know the state of 

rot  _z1_ is an observation of the current value of state oin _x_ , for which ver sio n 

- _x_ 

- What is the probability of the two states of given the current observation of _x_ ? 

8 

Technische Universität München 

## **Bayes rules** 

 A working example 

- _x z_ 

- Suppose we add another observation of , _2_ , for which 

- _x_ 

- What is the probability of the two states of given the additional observation? 

- Using the corresponding Bayesian rule: 

- How do we quantify                       ? 

9 

p(x ets tay eee ty) = PUGml Bey Bey n= PC] A15+++s2n=1) P(Zn| Z1,+++,%n—1) 

n Ly-++52n—1 

P(x = 1) z ,2 — _ P(zq|a = 1) P(x = 1|z1) — P(za\a = 1)P(x = 1]z1) + P(ze|x = 0) P(x = 021) 5 s 0-6 4b ~ 8 P(x NeP(zq|xP(zq|x =0)P(xa#=O0|z1) 3 = 0} 22, — UNE 

Ya Ra fy Ut Lt—1 —7 Xt P(rz\Ut) = [oe Ut, T¢-1)P(Le-1)<sup>dx</sup> p(x|Ur) = S_ p(a| Ue, Te—1)P(Lt-1) ~~—_________pomelata)=~~ Wt ~~2 Pet | to eer) Phe)~~ 

Technische Universität München 

## **State updates** 

- …. Back again on the working example 

- We were at 

- Suppose now we send a command _ux_  _0_ to change the state of _x_ to zero (example: shut the door), which has the following probabilities _x_ : 

- of succeeding in changing the state of 

- As direct consequence, 

13 

Technische Universität München 

## **State updates** 

###  …. Back again on the working example 

- What are the probabilities associated to the two possible values (0 and 1) of state _xt_ ? 

and 

14 

Technische Universität München 

## **Bayesian filters** 

###  <u>Given</u> 

- History of observations 

- History of ‘commands’ 

- Sensor model 

- State transition model 

- Prior probability of system state (prior belief) 

###  <u>Obtain</u> 

- Current system state estimation (and its covariance), often : 

- named (posterior) _belief_ 

Nota: it is sometimes useful to also obtain the _predictor:_ 

15 

Lar | Institute for 

Lar | Institute for 

a s iPlxa\x%>) bol b>) aXe 

a 

#(t) = = <mark>a)</mark> = x(t) =x(t) + / =x(t) + / + / / (r)dr x(t) = a = x(t) =x(to) +&-(t—to) x(t) <mark>=A</mark> x(t) =x(to) +X(t0)-(t=t0)+ ff x(r)ar x(t) =O =O x(t) =x (to) (to) + lo) lo) (t= to) + S(t to) + S(t + S(t S(t to)? 

<u>TUT</u> 

T 

|||||||||||a= (a,<br>Ay<br>a.)|
|---|---|---|---|---|---|---|---|---|---|---|
|Xt=||(<r||Ut|Xt||Vit|Vy|t|pT<br>V4<br>Ay,<br>Ay<br>a.)|
||<br>X<br>|Yay<br>|24<br>|Viti<br>|Vyas<br>|Vaty<br>|Ae<br>|<br>Qy<br>|<br>Oe<br>||
|||<br>0|<br>0|<br> A|<br>0|<br>0|SA?|CO|0)|HEE HEI + Very ot + OxSat?|
|||1<br>|0<br>|0<br>|A;<br>|O<br>|0<br>|5A?<br>|0<br>|Yt =Yt-i+Vyotat<sup>+Ay-sate</sup><br>|
||o|o|1|0|0|A|0|0|34;|<br>Zr = Zea t Vatust + Ae -tat?|
||0|0|0|1|0|0|=A;|0|0|Vet= Vet + axst|
|x=|10<br>|0<br>|0<br>|O<br>|1<br>|0<br>|0<br>|Ay<br>|0<br>|Xt—1Vyit=Vy+fyat<br> <br>|
||0<br>|0<br>|0<br>|0<br>|0<br>|1<br>|0<br>|0<br>|AY |<br>|<br> Yet=Vet<br>+02-60<br>|
|||0|0|0|0|0|1|0|0 |}|@& =ax|
||0|0|0|O|0|0|0|1|0|Oyek|
||0|0|0|O|0|0|0|0|1|<br>Az=&2|

# ~~Te~~ 

Technische Universität München 

## **The Kalman filter** 

 Gaussian variable: 

- A Kalman Filter (KF) describes the belief in terms of mean and covariance 

- This requires three properties to hold: 

: I)    Linearity of next-state probability 

II)   Linearity of measurement probability                  : 

III)   Initial belief normally distributed: 

22 

_— Marr BM, = Agwy,_, + Bir Bir fy»oo Dt Dut = A,~d1~-1A; + Ri + Ri Ri 24144 K;, Zt = = —1 K, = 5,Cf (C,a,C7 4 Q;) i = fay + <u>Kee=</u> Cott) 

<u>L</u> 

<u>TUM</u> 

At B; Et Ci OF <u>oeC12— C,Crp,. +Q: “5.=</u> 

| Institute for for "(eis Communications <u>|) and Navigation</u> 

pr|)~CE «=||)~CE «=| CommunicationsandInstituteNavigation forMcaandInstituteNavigation forMcaInstituteNavigation forMcaNavigation forMca 

” US ommunications | <u>Institute for , for , ,</u> 

<u>TUT</u> 

«= Communications <u>pr | Institute for for</u> 

<u>TUT</u> 

pr|)~CE «=||)~CE «=| CommunicationsandInstituteNavigation forMcaandInstituteNavigation forMcaInstituteNavigation forMcaNavigation forMca 

<u>A~~</u> | CommunicationsInstitute forInstitute for for <u>|) and Navigation</u> 

xt = ASS =D: uy, + E+ X, = 8(X-1, us) + &| not linear transition 

Zt Se Z, = h(x;) + 6; jot luineav measrenoa 

<u>h</u> 

Xt = 8(Xr-1, Ut) + & & Zt, = h(x;) + 6; 1 — [ye X, © g(My_1, Us) + Gis (* Gis (* (* 1 7 7 t ' + G=Je, & Z © lh(f,) + He(x: — f,) + 0% 

<u>H; — Jh</u> 

Hy_1 | Ut Bel(x;_1) dut—1 Lt ek BM, = S(My_1, UL) by, , Ut Sie =) Gp De _-1 Gy_, _-1 Gy_, Gy_, + Ry Ry Ky K, = ©; H} (Hy=/H? + Q:) 

fy = By + Ke( Ke( — h(H,)) 

Technische Universität München 

## **Further reading** 

_S. Thrun, W. Burgard, D. Fox, “Probabilistic Robotics” The MIT Press, 2005. ISBN-10:0262201623; ISBN-13:978-0262201629_ 

34

---

## 源文件

- [7 VisNav - Probabilistic Estimation.pdf](attachments/documents/CV_Visual-Navigation-eecd419b4369/7 VisNav - Probabilistic Estimation.pdf)

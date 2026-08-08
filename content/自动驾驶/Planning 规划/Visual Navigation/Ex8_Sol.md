---
title: Ex8_Sol
source: converted:attachments/documents/CV_Visual-Navigation-cfb345d5b85d/Ex8_Sol.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-cfb345d5b85d/Ex8_Sol.pdf
  title: Ex8_Sol.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Solution to Exercise 8 of January 17, 2020** 

http://www.nav.ei.tum.de/visnav 

## **Problem 1 – Solution** 

a) The a priori belief on the robot’s position _x_ (initially unknown) can be described with a discrete uniform distribution: 

The measurement describes the robot’s position with the following conditional probabilities: 

Application of the Bayes theorem gives 

The robot is in the remaining locations with probability 

b) For each of the possible four locations _A_ , _B_ , _C_ and _D_ we can calculate the probability of predicted robot’s position (denoted here with _x_ ¯) after execution of the command _u_ +2 as 

_Solution to Exercise 8_ 

_Winter Term 2019/2020_ 

1 

position is poorer than the initial one (prior to the execution the command). 

c) The new measurement _z_ 2 is characterized by the following conditional probabilities: 

Since the measurement are conditionally independent given the actual state _x_ , we can easily derive the updated robot’s probabilistic position as 

where we have stressed the fact that the a priori knowledge on _x_ is our predicted state _x_ ¯ as computed in the previous problem. 

The total probability _P_ ( _z_ 2) reads 

which gives 

You can draw some conclusions when observing the behavior of the robot’s position probabilistic estimate across steps (1-1), (1-3,1-4), (1-5,1-6,1-7,1-8), and (1-12). 

_Solution to Exercise 8_ 

_Winter Term 2019/2020_ 

2 

**_Probabilistic estimation_** 

## **Problem 2 – Solution** 

- a) The state transition model describes how the state vector evolves with time: **x** _t_ = _f_ ( **x** _t−_ 1). In the given problem, the constant velocity assumption enables a linear state transition model: 

with _∆t_ the time interval considered and **_✏_** _t_ the state transition noise that we are going to inject (Normal – bivariate – Gaussian variable). 

- b) In the prediction step we estimate the train position based on the assumed motion model. Due to the linearity of the state transition model, the state vector at any time remains a Gaussian variable. After one second, the state vector probability distribution can be described with the following mean and covariance matrix: 

where we have denoted with _σp_<sup>2the process noise variance that we are free to inject in this prediction step.Note</sup> that the uncertainty in the train position is now higher than the initial one, even when we do not add any process noise. 

- c) The observation model links the measurements with the state variables. In this problem, an observation of the second state variable (the train speed) is available, and the observation model can be formulated in linear form as 

where _δt_ describes the measurement noise. The latter is given as Gaussian variable with zero mean and variance **Q** _t_ = _σm_<sup>2.</sup> 

d) 

The updated state vector is then characterized by the following mean and covariance matrix: 

You can note that the resulting state vector estimation is a weighted mean among all the different contributes. If the measurement error is very large compared to the process noise, the update will be closer to the predicted values, and viceversa. 

_Solution to Exercise 8_ 

_Winter Term 2019/2020_ 

3 

**_Bonus: the Monty Hall problem_** 

## **Problem 3 – Solution** 

The chances of getting a Ferrari ( _F_ ) or one of the two goats ( _G_ 1 or _G_ 2) are initially 

Therefore, the chances of winning a Ferrari ( _W_ ) depends _conditionally_ on your choice (your ‘observation’ _x_ ), and are computed straightforwardly as 

The total probability of winning the Ferrari is then 

This result is perfectly in agreement with intuition, that is, you can win a Ferrari only if you have initially chosen the door hiding the Ferrari ( _x_ = _F_ ). 

After the host opens the door, you need to compute the total probability of winning a Ferrari under the two conditions of keeping or switching your choice. 

### **_Keeping the original door_** 

The conditional probabilities are exactly the same as in (3-2). The total probability of winning the Ferrari, _conditionally_ on the fact that you retain the original choice, are then 

Therefore, by keeping your original door, the chances of winning the Ferrari remain at 1/3, not even increasing at 50% as intuitively one would say. 

### **_Switching the original choice_** 

The conditional probabilities are now different from (3-2)! By switching, you will win whenever you have initially chosen one of the two doors hiding a goat: 

The total probability of winning the Ferrari, _conditionally_ on the fact that you switch your original choice, is now 

This result demonstrates that the switching strategy pays off. Intuitively, you may have understood this immediately, without computations: by switching, under the condition that the host always opens a doors hiding a goat, one wins whenever one of the two doors hiding a goat was initially chosen, and the probability of such event is indeed 2/3. 

_Solution to Exercise 8_ 

_Winter Term 2019/2020_ 

4

---

## 源文件

- [Ex8_Sol.pdf](attachments/documents/CV_Visual-Navigation-cfb345d5b85d/Ex8_Sol.pdf)

---
title: Ex8
source: converted:attachments/documents/CV_Visual-Navigation-ca789aac02f0/Ex8.pdf
source_type: PDF
quality: draft
attachments:
- file: attachments/documents/CV_Visual-Navigation-ca789aac02f0/Ex8.pdf
  title: Ex8.pdf
---

# **Visual Navigation** 

Winter Term 2019/2020 

Dr. Gabriele Giorgi 

Technische Universit¨at M¨unchen Lehrstuhl f¨ur Kommunikation und Navigation 

## **Exercise 8 of January 17, 2020** 

http://www.nav.ei.tum.de/visnav 

## **Problem 1** 

## **_Probabilistic estimation_** 

A robot’s position along a circular corridor is described in terms of four consecutive discrete locations, tagged with the letters of the alphabet _A_ , _B_ , _C_ and _D_ . Note that after position _D_ comes position _A_ (circular trajectory). Initially, the location _x_ of the robot is unknown. 

- a) The probability of obtaining the measured value is 0.8 if the robot were at location B and 0.01 if the robot were in one of all remaining locations. Compute the probabilistic robot’s position (that is, the probability that the robot is in each of the four possible locations) after the measurement has been taken. 

- b) The robot is then given a command _u_ +2 to move clockwise by two positions. The uncertainty in the execution of the command is such that the following probabilities can be assigned: 

with _l_ a generic position of the robot and ¯ _x_ the position of the robot after having applied the command. Note that the probability that the robot returns or stays in the initial position _l_ is zero. Compute the (probabilistic) predicted position of the robot after the command has been executed. 

- c) A second measurement is taken after the robot has moved. The probability of obtaining the second measured value when the robot is at location _C_ is 0.6, when at location _D_ is 0.9, when at location _A_ is 0.1, and when at _B_ is 0.01. 

Compute the updated robot’s (probabilistic) position after the new measurement has been included. 

## **Problem 2** **_Probabilistic estimation_** 

Consider a train moving on a straight railway section. The train travels in one direction with constant velocity, which is initially assumed to be 1 m/s. The train position can be given in terms of a single variable, _p_ , which equals to the distance traveled from an initial point _p_ = 0. Also, we consider the train (one-dimensional) velocity as a state parameter. Thus, the train state at any given time instance is given by vector **x** = ( _p, p_ ˙)<sup>T</sup> . 

Every second, a tachymeter installed on the train provides an estimate of the train’s velocity, with an error that can be described by a Gaussian distribution with zero mean and standard deviation _σm_ . 

_Exercise 8_ 

_Winter Term 2019/2020_ 

1 

- a) Derive the state transition model. 

- b) Predict the position of the train at time _t_ = 1 _s_ when starting from the initial position _p_ = 0 and initial velocity estimation _p_ ˙ = 1 _m/s_ . Assume the state vector to be normally distributed with mean **_µ_** 0 = (0 _,_ 1) and covariance **_⌃_** 0 = _σ_<sup>2</sup> **I** 2. Choose a floating value for the process noise that we can inject in this step (prediction). 

- c) Derive the observation model. 

- d) Compute the updated state vector at time _t_ = 1 and the corresponding variance-covariance matrix after including a velocity measurement _zt_ = 1 _._ 05 _m/s_ . 

## **Problem 3** 

## **_Bonus: the Monty Hall problem_** 

In a game show, you can choose one of three doors, and you will win whatever is behind the door you choose. Behind one door there is a brand new Ferrari, whereas behind each of the other two there is a goat. You select a door, and the host, who knows which of the other two doors hides a goat, opens one of the other two doors, revealing a goat. You are then given the chance to switch the door you selected with the other closed door. Does switching enhance your chances of winning the Ferrari? Try to derive it using the concept of conditional probability. 

_Exercise 8_ 

_Winter Term 2019/2020_ 

2 

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

- [Ex8.pdf](attachments/documents/CV_Visual-Navigation-ca789aac02f0/Ex8.pdf)

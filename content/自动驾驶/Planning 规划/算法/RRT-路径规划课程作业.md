---
title: RRT 路径规划课程作业
url: https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/index.html
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:13:10+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T20:24:23+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
tables_repaired_at: '2026-06-28T18:55:36+00:00'
---

> 概念页：[[RRT-算法族|RRT 算法族]]

# RRT 路径规划课程作业

![Image 1](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/hefty.gif)

<p class="kb-image-caption">图例</p>

Our mission for this assignment was to enable Hefty to navigate around a soccer field, find the ball, and score a goal while avoiding the obstacles on the field. This makes for an interesting and challenging problem because it not only requires Hefty to be able to plan a path to a specific location, but to be able to adapt as his objective (the ball) moves. There are many ways to approach the problem of path planning; you can use potential fields, a search algorithm like A* or a more random search like Rapidly-Exploring Random Trees. We chose to implement an RRT-based algorithm, and we feel that this has allowed us to overcome the shortcomings of the other methods to create an efficient and robust path planner.

## Approach and Methods

We chose to implement our path planning using Rapidly-Exploring Random Trees rather than other methods like Potential Fields or A* search. We felt that an RRT-based algorithm could overcome some of the shortcomings of other methods (local minima for Potential Fields and trying to find a good heuristic for A*).

Here is what Hefty does during each iteration of the control loop:
1.   Get my state.
2.   Plan a path.
3.   Optimize the path.
4.   Follow the path.

 Each of these steps is detailed in one of the sections below.

### State Control

Hefty is controlled by two sets of states, his OD State (Offense/Defense State) and his Action State. Rather than being a FSA, Hefty's state controller sets his current state based simply on the state of the field and not at all on Hefty's previous state. The OD State control is simple; if the ball is closer to the goal Hefty is defending, he's on defense otherwise he's on offense.

The action state is more complicated:
![Image 2](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/states.gif)

<p class="kb-image-caption">图例</p>
| Action State | Result |
| --- | --- |
| GOTO_BALL_SCORE | Go behind the ball to get in scoring position. |
| SCORE_GOAL | Take a shot on goal. |
| GOTO_BALL_CLEAR | Push the ball away from your goal. |
| GOTO_GOAL_DEFENSE | Play goalie. |
| GOTO_INTERCEPT | Get between the ball and your goal. | Once Hefty has a state, he uses his current location and state information to plan a path to his objective. |

### RRT Path Planning

We implemented Rapidly-Exploring Random Trees for our planning algorithm. RRT works by creating two trees: one with a root at the starting position and the other with a root at the ending position. The trees then alternate roles with one adding a node and then the other trying to connect to it until a path is found. Although this may seem inefficient and too nondeterministic, it actually works quickly (Hefty can plan a new path without noticeably stopping to recalculate) and finds a path (when one exists) on the first try almost every time.

Here's pseudocode for the RRT algorithm:
EPSILON = max length of an edge in the tree;
K = max number of nodes in the tree;
rrt(start,end){ 	startNode = new Node at start;
	startTree = new RRTree(startNode);
	endNode = new Node at end;
	endTree = new RRTree(endNode);
	return makePath(startTree,endTree);
} makePath(t1,t2){ 	qRandom = new Node at random location;
	qNear = nearest node to qRandom in t1;
	qNew = new Node EPSILON away from qNear 			in direction of qRandom;
	t1.add(qNew);

	if(there's a path from qNew to the closest node in t2){ 		path = path from qNew to root of t1;
		path.append(path from qNew to root of t2);
		return path;
	}else if(size(t1) < K){
		return makePath(t2,t1);
	}else{
		return FAIL;

}  Here's a sample of the RRT algorithm in action:
![Image 3](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/rrt1.gif)

<p class="kb-image-caption">图例</p>
![Image 4](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/rrt2.gif)

<p class="kb-image-caption">图例</p>
![Image 5](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/rrt3.gif)

<p class="kb-image-caption">图例</p>

A node (qNew) is then added to the path in the direction of qRandom a maximum distance of EPSILON away from the nearest node already in the path (qNear) which currently is Hefty's position.
![Image 6](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/rrt4.gif)

<p class="kb-image-caption">图例</p>

The algorithm then checks if there is a path to qNew from the closest node in the tree starting at the ball. In this case, there isn't so the algorithm continues.
![Image 7](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/rrt5.gif)

<p class="kb-image-caption">图例</p>

The trees then switch roles. A new qRandom (not shown) is selected and then a new node is added to the tree rooted at the ball.
![Image 8](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/rrt6.gif)

<p class="kb-image-caption">图例</p>

The algorithm then checks if there is a path from the new node to the closest node in the tree rooted at Hefty (there isn't).
![Image 9](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/rrt7.gif)

<p class="kb-image-caption">图例</p>

The trees switch roles again and a new node is added to Hefty's tree. The node is connected to the closest node already in the tree, which in this case is the last node added.
![Image 10](https://cs.brown.edu/courses/cs148/documents/asgn3_planning/btcohen/images/rrt8.gif)

<p class="kb-image-caption">图例</p>

The algorithm then checks if there is a path from the new node to the closest node in the ball's tree. Since there is, the tree returns this path.

For simplicity's sake, the example above doesn't include any nodes that aren't used in the final path. In practice, many more nodes are added to each tree than are actually used in the path; however, when a connection is found, only the nodes along the path to that point in each tree are actually added to the path.

As you can see in the example above, although the path returned by rrt will eventually get Hefty to the ball, it is not very efficient (if the first node were removed, the path would be shorter, contain fewer direction changes and still get Hefty to the ball). We solved this problem by relaxing the path and removing the unnecessary nodes.

### Relaxation

The nature of the RRT causes it to make paths that are less than optimal. They tend to be wandering and indirect, and even the straight parts have multiple nodes as a result of the epsilon value. Since more nodes and longer path segments make Hefty slower, we try to remove as many as we can to make for longer path segments.

Here's pseudocode for the relaxation algorithm:
relaxPath(path){ 	newPath = new Path;
	currForward = first node in path;
	while(currForward <= end of path){ 		newPath.append(currForward);
		currBackward = last node in path;
		while(currBackward != currForward && !relaxationFound){ 			if(there is a clear path from currBackward to currForward) 				relaxationFound = true;
			else 				currBackward--;

		} 		if(relaxationFound) 			currForward = currBackward;
		else 			currForward++;

	return newPath;

}  Here's the relaxation method running on a sample path:

### Motion Control

Hefty's motion controller is fairly simple. Hefty drives straight for the next node in his path. When he arrives, he rotates until he is facing his new node and then drives straight for that node. Although this isn't the quickest method of following a path, it gets the job done. We've also implemented a PD controller so that Hefty does drive smoothly along straight paths.

## Experiments and Results
We tested Hefty with a variety of initial configurations. For each configuration, he planned similar (though not identical) paths most of the time; however he did occasionally take significantly longer than average.

Below are two examples of Hefty's obstacle avoidance and ball seeking abilities. The configuration is the same for both videos. Below each video are the relaxed and unrelaxed paths that Hefty planned.

These two examples show the difference that relaxing a path makes. Approximately 2/3 of the nodes are removed in each case. These are printout of what Hefty actually planned, not just illustrations. We made a method called matlabPrint which prints out the code necessary to display the path in Matlab. If you run Hefty, the code should automatically print every time he plans a new path; simply copy it and paste it into the Matlab console to display the path.

We also tested the time it took Hefty to score from various staring configurations. In all the trials below, Hefty was shooting on the right goal:

## Conclusion and Discussion
Hefty's biggest weakness is his motion controller. The way we have currently implemented it, Hefty drives straight for the next node in his path. When he arrives, he rotates until he is facing his new node and then drives straight for that node. We are planning on implementing a much better motion controller for the future. We plan to have Hefty beginning to rotate towards his next node before he arrives at his current one. This will allow him to drive much more smoothly and should also make him quicker as he would no longer have to stop at each node.

Our use of an RRT algorithm allowed Hefty to complete his tasks in half to a quarter of the maximum time allowed. In addition to this, our implementation is robust enough to adapt to a moving ball or obstacle. Although our path planner may occasionally produce paths that are less than optimal (because of the inherent randomness of the randomness), it will never get suck (unlike potential fields). We feel that because of this (and the implementations of potential fields that we've seen), using RRTs instead of Potential Fields has made Hefty more adaptable and robust.

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[RRT-快速随机树|RRT 快速随机树]]
[[RRT-路径剪枝|RRT 路径剪枝]]
[[A-C++-实现(daancode)|A* C++ 实现（daancode）]]
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]]
[[A-算法-openset-澄清|A* 算法 openset 澄清]]
[[Apollo-Cyber-RT-介绍|Apollo Cyber RT 介绍]]
[[圆形障碍-A-路径(切线可见图)|圆形障碍 A* 路径（切线可见图）]]
[[RRT-算法族|RRT 算法族]] — _路径 / 运动规划_

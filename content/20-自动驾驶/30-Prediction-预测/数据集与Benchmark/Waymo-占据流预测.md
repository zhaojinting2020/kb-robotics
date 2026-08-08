---
title: Waymo 占据流预测
url: https://waymo.com/open/challenges/2022/occupancy-flow-prediction-challenge/
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T16:35:17+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Waymo 占据流预测

![Image 1: Waymo Open Dataset](https://waymo.com/static/images/dataset/dataset-logo.svg)

<p class="kb-image-caption">图例</p>
![Image 2: occupancy-and-flow-prediction-hero@2x](https://lh3.googleusercontent.com/y6iAIdvDQyUt1hx_Ly6wropx_o9ILOCNrcZLiQmndrlm5VaCvCn0gnnCBXRXPJVd79T7YiR7VrUOMDu9Yj7o__pBJBVn22K_Aio)

<p class="kb-image-caption">图例</p>
![Image 3: Occupancy and Flow Prediction Figure 1](https://storage.googleapis.com/waymo-prod-cdn/uploads/6665edacd96e9120ecccd3989796035c-unnamed.gif)

<p class="kb-image-caption">图例</p>
![Image 4: Occupancy and Flow Prediction Figure 1](https://storage.googleapis.com/waymo-prod-cdn/uploads/9252c3c1910abc449d08f60550362c6e-unnamed__1_.gif)

<p class="kb-image-caption">图例</p>
![Image 5: Occupancy and Flow Prediction Figure 1](https://lh3.googleusercontent.com/nsmyef7MJfYZKkmHuLX3jNaIi7pDDPGU5nHpWUuZtS4wJl7DoWntFbh2rVdFjHm-SCI73rtP5LMr3RE-8iz7YvebYxG0473VxQ=e365-s420)

<p class="kb-image-caption">图例</p>

Figure 1. **Left**: Sample occupancy predictions. Red pixels show occupancy predictions for vehicles. The black box shows ground-truth future occupancy of the ego vehicle. **Right**: Sample flow predictions. Gray boxes show agent occupancies over the input interval (history + current). Colored pixels show predicted flow direction (hue) and magnitude (saturation) at each location in the grid.

### Note: The[tutorial notebook](https://github.com/waymo-research/waymo-open-dataset/blob/master/tutorial/tutorial_occupancy_flow.ipynb)demonstrates all the items discussed on this web page, including construction of ground-truth, training a baseline model with sample losses, computing the metrics, and generating submission files over the test dataset.
### Note: The output representation for the occupancy flow tasks is very similar to other well-studied tasks like semantic segmentation and video prediction. So, it is possible to adopt models designed for these tasks to solve the occupancy flow challenge.
This challenge consists of three connected tasks, defined for the [Waymo Open Motion Dataset](https://waymo.com/open/data/motion/). All tasks use the same inputs: A one-second history of a number of agents in a scene. The objective for the tasks is to predict future occupancies and flow (motion) of **only vehicles** over 8 seconds into the future. All predictions are dense grids in bird's-eye view (BEV). Note that for this challenge the predictions should include **all vehicles**, ignoring the value of `objects_of_interest` and `tracks_to_predict` in the dataset protos. Our [sample code](https://github.com/waymo-research/waymo-open-dataset/blob/master/tutorial/tutorial_occupancy_flow.ipynb) demonstrates how to construct the ground truth for all tasks.

The WOD motion dataset contains agent positions (and other attributes) at 10 Hz. Each example in the training and validation sets contains 1 second of history data, 1 timestep for the current time, and 8 seconds of future data. This corresponds to 10 history timesteps, 1 current timestep, and 80 future timesteps, for a total of 91 timesteps per scene. The 91 timesteps in each example can be organized as:
`{t - 10, t - 9, …, t - 1, t, t + 1, …, t + 79, t + 80}` where `t` indicates the current timestep. Note that agents are not necessarily present in all timesteps. For example, an agent may get occluded in the future, or it may be currently occluded and only appear in future data. Presence and absence of agents at particular timesteps is indicated by the `valid` data attributes.

The test set hides the ground truth future data. Each example in the test set contains a total of 11 timesteps (10 history and 1 current timesteps).

### Waypoints

When constructing the ground-truth for the occupancy flow challenge, we divide the 80 future timesteps into 8 one-second intervals, each containing 10 timesteps. For example, the first interval consists of the first 10 future timesteps `{t + 1, t + 2, …, t + 10}` and the last waypoint consists of the last 10 future timesteps `{t + 71, t + 72, …, t + 80}` in every scenario.

For all tasks in this challenge the objective is to predict 8 disjoint BEV grids corresponding to the 8 intervals. The prediction targets are taken from the last timestep in each interval, that is, timesteps `{t + 10, t + 20, …, t + 80}`. We refer to each of these 8 timesteps as a **waypoint**. In this document and in the codebase, we identify these waypoints using the index variable $k \in \left\{0 , \ldots , 7 \right\}$ . Ground-truth flow fields are constructed from the displacements between the waypoints, that is `{t ⇒ t + 10, t + 10 ⇒ t + 20, …, t + 70 ⇒ t + 80}`.

The released code also supports constructing [cumulative waypoints](https://github.com/waymo-research/waymo-open-dataset/blob/1297cdcbcd103d4befb4b498e50a0c030053e6c0/waymo_open_dataset/protos/occupancy_flow_metrics.proto#L38-L55), which aggregate occupancy and flow using all the 10 timesteps in each one-second interval. This setting might be preferred in some planning applications, but for this challenge the submissions should predict the individual sub-sampled waypoints (`cumulative_waypoints = false`).

The [released code](https://github.com/waymo-research/waymo-open-dataset/blob/master/tutorial/tutorial_occupancy_flow.ipynb) contains the complete implementation for constructing the ground-truth for all 3 tasks using TensorFlow operations. If you prefer to use other frameworks, we suggest running the code to precompute and store ground-truth data as numpy arrays.

The following sections describe how agents are filtered based on current visibility and agent type (vehicle/pedestrian/cyclist) to get included and rendered in each ground-truth waypoint grid.

## Task 1
### Future Occupancy of Currently-Observed Vehicles
Given histories of all agents over input timesteps `{t - 10, t - 9, ..., t}`, predict future occupancy of **all vehicles** that are **present at the current timestep t**, for 8 seconds into the future. More specifically, the predictions are 8 occupancy grids $O_{k}^{b} , k \in \left\{0 , \ldots , 7 \right\}$, capturing future occupancy of all currently-visible vehicles at 8 different waypoints. Each occupancy grid $O_{k}^{b}$ is a `256 x 256 x 1` array containing values in range `[0, 1]` indicating the probability that some part of some currently-observed vehicle will occupy that grid cell.

Our [sample code](https://github.com/waymo-research/waymo-open-dataset/blob/master/tutorial/tutorial_occupancy_flow.ipynb) demonstrates how the ground truth occupancy grids are constructed for each waypoint. In the ground-truth occupancy grids, each grid cell is set to either `0` or `1`.

## Task 2
### Future Occupancy of Currently-Occluded Vehicles
![Image 6: Occupancy and Flow Prediction Figure 2](https://storage.googleapis.com/waymo-prod-cdn/uploads/3b2d0933da6cb0fa3e3cc6a7dafaf726-unnamed__2_.gif)

<p class="kb-image-caption">图例</p>
![Image 7: Occupancy and Flow Prediction Figure 2](https://storage.googleapis.com/waymo-prod-cdn/uploads/a97dda51494256794d6c902015c9bc71-unnamed__3_.gif)

<p class="kb-image-caption">图例</p>

Figure 2. Future occupancy grids for currently-observed agents (**left**) and currently-occluded agents (**right**). Red and green pixels show ground-truth future occupancies for vehicles and pedestrians. The black box shows ground-truth future occupancy of the ego vehicle.

Given histories of all agents over input timesteps `{t - 10, t - 9, ..., t}`, predict future occupancy of **all vehicles** that are **not present at the current timestep t**, for 8 seconds into the future. More specifically, the predictions are 8 occupancy grids $O_{k}^{b} , k \in \left\{0 , \ldots , 7 \right\}$, capturing future occupancy of all currently-occluded vehicles at 8 different waypoints. Each occupancy grid $O_{k}^{b}$ is a `256 x 256 x 1` array containing values in range `[0, 1]` indicating the probability that some part of some currently-occluded vehicle will occupy that grid cell.

Note: an occluded vehicle appears in the ground-truth occupancy grids only at timesteps when it has become disoccluded and observed by the ego vehicle (and not earlier).

## Task 3
### Future Flow of All Vehicles
Given histories of all agents over input timesteps `{t - 10, t - 9, ..., t}`, predict future flow of **all vehicles** (currently observed or occluded), for 8 seconds into the future. More specifically, the predictions are 8 flow fields $F_{k} , k \in \left\{0 , \ldots , 7 \right\}$, capturing future flow of all vehicles at 8 different waypoints. Each flow field $F_{k}$ is a `256 x 256 x 2` array containing `(dx, dy)` values indicating the displacement over 1 second of the vehicle part that occupies that grid cell.

In ground truth, flow is constructed between timesteps which are 1 second (10 steps) apart. For example, flow for the last timestep `t + 80` is constructed by comparing timestep `t + 80` with timestep `t + 70`. Every occupied grid cell at timestep `t + 80` stores a `(dx, dy)` vector pointing to its earlier location at timestep `t + 70`. Note that the flow vectors point back in time. The ground-truth flow vectors are set to `(0, 0)` for any grid cells that are not occupied at timestep `t + 80`. Note that in effect $F_{k}$ captures displacements between two successive occupancy waypoints $O_{k - 1}$ and $O_{k}$.

Flow metrics are measured only over the occupied grid cells. In other words, grid cells whose ground-truth flow is `(0, 0)` are excluded from the metrics. Therefore, you are free to predict any value for the unoccupied cells. We recommend excluding the unoccupied cells from your flow loss function as well. These settings decouple the flow prediction and occupancy prediction tasks, and encourage the model to capture the general motion patterns of the scene in the predicted flow fields. Requiring the model to predict `(0, 0)` flow vectors for the unoccupied cells may lead to conservative predictions where the model predicts smaller flow vectors as an average between a true motion vector and a `(0, 0)` vector in areas which are not certain to be occupied.

## Metrics
### Occupancy metrics

The occupancy metrics are used for tasks 1 and 2. They compare ground-truth and predicted occupancy grids for each of the 8 waypoints.

Let $O_{k}^{b}$, $\hat{O}_{k}^{b}$ denote the ground-truth and predicted future occupancy at waypoint $k$ of currently-observed vehicles. Let $O_{k}^{c}$, $\hat{O}_{k}^{c}$ denote the ground-truth and predicted future occupancy at waypoint $k$ of currently-occluded vehicles.

Treating the occupancy of each grid cell as a separate binary prediction, the $\text{AUC}$ metric uses a linearly-spaced set of thresholds in [0, 1] to compute pairs of precision and recall values and estimate the area under the PR-curve. More specifically, we compute $\text{AUC} \left( O_{k}^{b} , \hat{O}_{k}^{b} \right)$ for currently-observed vehicles and $\text{AUC} \left( O_{k}^{c} , \hat{O}_{k}^{c} \right)$ for currently-occluded vehicles.

The $\text{Soft}-\text{IoU}$ metric measures the soft intersection-over-union between ground-truth and predicted occupancy grids as:
$$ \text{Soft}-\text{IoU} \left( O_{k}^{b} , \hat{O}_{k}^{b} \right) = \frac{\underset{x , y}{\sum} O_{k}^{b} \hat{O}_{k}^{b}}{\underset{x , y}{\sum} O_{k}^{b} + \hat{O}_{k}^{b} - O_{k}^{b} \hat{O}_{k}^{b}} $$ If $O_{k}^{b}$ is empty, the $\text{Soft}-\text{IoU}$ metric is set to zero. Similarly, we compute $\text{Soft}-\text{IoU} \left( O_{k}^{c} , \hat{O}_{k}^{c} \right)$ for currently-occluded vehicles.All metrics are averaged over the 8 predicted waypoints.
### Flow Metric

The End-Point Error ($\text{EPE}$) metric measures the mean L2 distance between the ground-truth flow field $F_{k}$ and predicted flow field $\hat{F}_{k}$ as:
$$ \parallel F_{k} \left( x , y \right) - \hat{F}_{k} \left( x , y \right) \parallel_{2} \textrm{ }\text{where}\textrm{ } F_{k} \left( x , y \right) \neq \left( 0 , 0 \right) .
$$
### Joint Occupancy and Flow Metrics
The joint metrics measure the joint accuracy of occupancy and flow predictions at each waypoint $k$. Given three predictions $\hat{O}_{k}^{b}$, $\hat{O}_{k}^{c}$, $\hat{F}_{k}$ for waypoint $k$, we compute the **Flow-Grounded Occupancy** metrics as follows:
First, we compute the ground-truth occupancy of all vehicles (currently observed or occluded) at waypoint $k$ as:
$$ O_{k} = O_{k}^{b} + O_{k}^{c} $$ and at waypoint $k - 1$ as $$ O_{k - 1} = O_{k - 1}^{b} + O_{k - 1}^{c} .
$$ We also compute the predicted occupancy of all vehicles as $$ \hat{O}_{k} = \hat{O}_{k}^{b} + \hat{O}_{k}^{c} .
$$ If the predicted occupancies are accurate, we should have $\hat{O}_{k} = O_{k}$. The occupancy metrics defined above already evaluate this expectation. To ensure correctness of the predicted flow field, $\hat{F}_{k}$, we use it to warp the ground-truth origin occupancy of that flow field ($O_{k - 1}$) as $$ \hat{W}_{k} = \hat{F}_{k} \circ O_{k - 1} $$ where $\circ$ indicates function application -- applying the flow field as a function to transform the occupancy. If the predicted flow is accurate, it should be able to reach and cover the future occupancy $O_{k}$. Note that since we predict backward flow fields, $\hat{W}_{k}$ may predict expansion of occupancy in different directions and reach a larger area beyond $O_{k}$. Therefore, we multiply $\hat{W}_{k}$ element-wise with $\hat{O}_{k}$, to get $$ \hat{W}_{k} \hat{O}_{k} .
$$ If the predicted occupancy and flow at waypoint $k$ are accurate, this term should be equal to the ground-truth $O_{k}$. In other words, for a grid cell to be marked as occupied in $\hat{W}_{k} \hat{O}_{k}$, it should be supported by both occupancy and flow predictions. Therefore, the flow-grounded occupancy metrics compute $\text{AUC}$ and $\text{Soft}-\text{IoU}$ between $\hat{W}_{k} \hat{O}_{k}$ and ground-truth $O_{k}$ as $\text{AUC} \left( O_{k} , \hat{W}_{k} \hat{O}_{k} \right)$ and $\text{Soft}-\text{IoU} \left( O_{k} , \hat{W}_{k} \hat{O}_{k} \right)$.
All metrics are averaged over the 8 predicted waypoints.

## Leaderboard

Disqualified from the 2022 Waymo Open Dataset Challenge.
0.8033 0.2349 0.1650 0.0169 3.6717 0.8389 0.6328 5/24/2022, 6:08:36 AM 0.8029 0.2346 0.1646 0.0169 3.6944 0.8380 0.6324 5/23/2022, 9:25:40 AM 0.8014 0.2336 0.1386 0.0285 2.6191 0.8246 0.5488 5/22/2022, 12:10:27 PM 0.8154 0.5321 0.2077 0.0606 2.6831 0.8196 0.6256 31M 5/10/2025, 11:55:49 PM 0.7917 0.5029 0.1965 0.0603 3.0837 0.8069 0.6114 4/25/2025, 12:05:44 PM 0.7972 0.3429 0.1937 0.0241 2.9574 0.8026 0.5156 8/26/2023, 1:41:16 PM 0.7972 0.3429 0.1937 0.0241 2.9574 0.8026 0.5156 3/19/2024, 3:03:02 AM 0.7775 0.4909 0.1778 0.0450 3.2036 0.7854 0.5301 9/1/2022, 6:16:05 PM 0.7565 0.3934 0.1707 0.0404 3.3075 0.7784 0.4654 5/24/2022, 4:55:05 AM 0.7514 0.4818 0.1610 0.0183 3.5867 0.7772 0.5551 5/24/2022, 5:33:44 AM 0.7514 0.4818 0.1610 0.0183 3.5867 0.7772 0.5551 24 5/21/2024, 2:24:25 AM 0.7506 0.4838 0.1599 0.0188 3.6162 0.7763 0.5571 5/24/2022, 2:40:16 AM 0.7548 0.4884 0.1736 0.0448 3.5827 0.7669 0.5298 5/24/2022, 12:30:30 AM 0.7548 0.4884 0.1736 0.0448 3.5827 0.7669 0.5298 24 5/21/2024, 2:38:55 AM 0.7438 0.2173 0.1680 0.0189 3.8705 0.7653 0.5376 9/2/2022, 8:07:59 PM 0.7694 0.5021 0.1651 0.0423 3.5868 0.7614 0.5377 2/12/2023, 3:08:52 PM 0.7374 0.4350 0.1542 0.0381 3.4778 0.7565 0.4664 5/23/2022, 5:54:22 PM 0.7552 0.2299 0.1658 0.0180 3.3779 0.7564 0.4431 41M 5/23/2024, 12:12:21 AM 0.7001 0.3799 0.1244 0.0247 3.8040 0.7552 0.4493 6/13/2023, 1:24:55 PM 0.7297 0.4532 0.1485 0.0322 4.5966 0.7422 0.4987 5/23/2022, 3:57:12 PM 0.7332 0.4211 0.1656 0.0389 3.6699 0.7403 0.4498 24 5/23/2024, 2:30:37 PM 0.7790 0.5350 0.0065 0.0064 4.8996 0.7391 0.6297 12/26/2023, 11:58:27 PM 0.6909 0.4123 0.1153 0.0211 4.1810 0.7333 0.4684 5/23/2022, 12:46:17 PM 0.6941 0.4114 0.1413 0.0309 4.2751 0.7324 0.4691 5/22/2022, 9:41:59 AM

## Submit

Submissions for this version of the challenge are closed. You can submit to the [2024 version of the Occupancy and Flow Prediction challenge](https://waymo.com/open/challenges/2024/occupancy-flow-prediction/).

Sign in to submit You must be signed in to upload submissions. Please sign in to continue.

[Sign in](https://waymo.com/open/auth/login?continue=https%3A%2F%2Fwaymo.com%2Fopen%2Fchallenges%2F2022%2Foccupancy-flow-prediction-challenge%2F)

## Rules Regarding Awards
See the [Official Challenge Rules here](https://waymo.com/open/challenges/terms).

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[Waymo-Open-Dataset|Waymo Open Dataset]]
[[Waymo-运动预测挑战赛|Waymo 运动预测挑战赛]]
[[Apollo-5.0-行为预测|Apollo 5.0 行为预测]]
[[Context-Gated-Convolution|Context-Gated Convolution]] — _预测 / Waymo_
[[DenseTNT-与-Teacher-Forcing|DenseTNT 与 Teacher Forcing]] — _预测 / Waymo_
[[HBEns-轨迹预测集成|HBEns 轨迹预测集成]] — _预测 / Waymo_
[[PointPillars-3D-检测|PointPillars 3D 检测]] — _预测 / Waymo_
[[Siamese-网络|Siamese 网络]] — _预测 / Waymo_

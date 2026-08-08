---
title: Waymo 运动预测挑战赛
url: https://waymo.com/open/challenges/2022/motion-prediction/
fetch_source: agent_reach:agent_reach:jina
fetched_at: '2026-06-27T16:59:05+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Waymo 运动预测挑战赛

![Image 1: Waymo Open Dataset](https://waymo.com/static/images/dataset/dataset-logo.svg)

<p class="kb-image-caption">图例</p>
![Image 2: Open / Motion Prediction Hero](https://lh3.googleusercontent.com/ZLgg1NuryajGNQrlu0Bu6D1MVQd5qWyISzsq9jPyLKauQu-ZwhCfklD_sX_SJ6_JqFGtWNFzi3k6rCNF6LUzM3ZK2MIyevCwvMg)

<p class="kb-image-caption">图例</p>

Given agents' tracks for the past 1 second on a corresponding map, predict the positions of up to 8 agents for 8 seconds into the future. To enable the motion prediction challenge, the ground truth future data for the test set is hidden from challenge participants. As such, the test sets contain only 1 second of history data. The validation sets contain the ground truth future data for use in model development. In addition, the test and validation sets provide a list of up to 8 object tracks in the scene to be predicted. These are selected to include interesting behavior and a balance of object types.

## Leaderboard

**This leaderboard only displays submissions made on or after March 15, 2023, when the 2023 Waymo Open Dataset Challenges start.**
**With the latest v1.2.0 of the Motion Dataset, Lidar data is now available for the 1s history data.**
To view a ranked leaderboard for the 2023 Motion Prediction Challenge, with Soft mAP as the ranking metric, please select "Show results with Soft mAP only" under the "Soft mAP" column. To view a ranked leaderboard with mAP as the ranking metric, please select "Show all" under the "Soft mAP" column, and click on the "mAP" column to sort. Submissions before March 9, 2022 will not have a Soft mAP score.

Note: the rankings displayed on this leaderboard may not accurately reflect the final rankings for this Challenge.

All Avg 0.4594 0.4492 0.5640 1.1344 0.1160 0.1272 5/24/2022, 3:57:44 AM All Avg 0.4507 0.4364 0.5509 1.1199 0.1058 0.1237 11/1/2022, 8:22:44 PM All Avg 0.4335 0.4190 0.5454 1.1280 0.1228 0.1270 10/5/2022, 8:26:54 PM All Avg 0.4260 0.4118 0.5447 1.1255 0.1229 0.1272 10/5/2022, 8:35:19 PM All Avg 0.4259 0.4119 0.5533 1.1608 0.1354 0.1253 5/21/2022, 2:27:02 AM All Avg 0.4229 0.4150 0.6411 1.3125 0.1407 0.1317 10/14/2022, 9:32:31 AM All Avg 0.4216 0.4129 0.6050 1.2207 0.1351 0.1277 5/17/2022, 5:34:50 AM All Avg 0.4207 0.4133 0.6532 1.3409 0.1473 0.1317 9/16/2022, 1:27:15 PM All Avg 0.4177 0.4161 73041728.0000 1.5596 0.1220 0.1340 12/22/2022, 8:38:01 PM All Avg 0.3930 0.3866 0.5913 1.2507 0.1603 0.1391 5/26/2022, 3:00:21 PM All Avg 0.3797 0.3700 0.6431 1.3405 0.1592 0.1447 5/24/2022, 6:06:56 AM All Avg 0.3766 0.3710 0.6777 1.3558 0.1646 0.1420 5/24/2022, 5:45:35 AM All Avg 0.3709 0.3577 0.7676 1.1077 0.1325 0.1557 5/24/2022, 4:04:37 AM All Avg 0.3445 0.3383 0.6945 1.4652 0.1846 0.1519 5/24/2022, 5:05:20 AM All Avg 0.3442 0.3383 0.6951 1.4678 0.1854 0.1516 10/15/2022, 7:11:23 AM All Avg 0.3396 0.3259 0.6207 1.2391 0.1718 0.1406 5/24/2022, 8:09:48 AM All Avg 0.3367 0.3213 0.6255 1.2432 0.1740 0.1413 5/24/2022, 6:29:15 AM All Avg 0.3319 0.3168 0.6063 1.2415 0.1678 0.1389 5/24/2022, 1:56:03 AM All Avg 0.3211 0.2877 0.7479 1.1687 0.1457 0.1552 5/23/2022, 7:11:13 PM All Avg 0.3134 0.3033 0.6761 1.3754 0.2057 0.1445 1/8/2023, 3:46:59 PM All Avg 0.3095 0.2787 0.6053 1.2897 0.1641 0.1415 6/29/2022, 8:31:51 AM All Avg 0.2928 0.2790 0.8320 1.6969 0.2394 0.1549 5/24/2022, 6:27:43 AM All Avg 0.2657 0.2481 0.6955 1.3530 0.1942 0.1511 8/12/2022, 8:25:20 AM All Avg 0.2571 0.2047 0.7002 1.4365 0.2113 0.1419 5/23/2022, 8:30:03 AM

## Submit

Submissions are uploaded as serialized [MotionChallengeSubmission protos](https://github.com/waymo-research/waymo-open-dataset/blob/master/src/waymo_open_dataset/protos/motion_submission.proto). Each ScenarioPredictions proto within the submission corresponds to a single scenario in the test set and contains up to 8 predictions for the objects listed in the tracks_to_predict field of the scenario. For this challenge, each JointPredictions proto will contain a prediction for only one object as these are independent predictions. Each MultiModalPrediction proto will contain up to 6 trajectory predictions each with a confidence value. Trajectory predictions must contain exactly 16 position samples each corresponding to the future 8 seconds sampled at 2 Hz. IMPORTANT: note that predictions do not include the current time step so the first prediction sample must correspond to 0.5 seconds into the future (Scenario track step 15), not the current time.

To submit your entry to the leaderboard, upload your file as a serialized MotionChallengeSubmission proto file compressed into a .tar.gz archive file. If the single proto is too large, you can shard them across multiple files where each file contains a subset of the predictions. Then tar and gzip them into a .tar.gz file before uploading.

To be eligible to participate in the challenge, each individual/all team members must read and agree to be bound by the [Official Challenge Rules](https://waymo.com/open/challenges/terms).

You can only submit against the Test Set 3 times every 30 days. (Submissions that error out do not count against this total.) Sign in to submit You must be signed in to upload submissions. Please sign in to continue.

[Sign in](https://waymo.com/open/auth/login?continue=https%3A%2F%2Fwaymo.com%2Fopen%2Fchallenges%2F2022%2Fmotion-prediction%2F)

## Metrics

Leaderboard ranking for this challenge is by the average Soft mAP (see definition below) across evaluation times (3, 5, and 8 seconds) averaged over the individual results for all object types. Miss rate will be used as a secondary metric.

All metrics described below are computed by first bucketing all objects into object type. The metrics are then computed per type. The metrics for each object type (ADE, FDE, Miss Rate, Overlap rate, and mAP) are all computed at 3, 5, and 8 second timestamps.

### Definitions
*   Let G be a set of N agents.
*   Let K be the number of predicted future trajectories.
*   Let T be the number of time steps per trajectory.
*   G is associated with a future trajectory distribution:

$$ \left\{ \left( l_{G}^{i} S_{G}^{i} \right) \right\}_{i = 1}^{K} $$ Where $l_{G}^{i}$ is an un-normalized likelihood for prediction i.
Where $S_{g}^{i}$ is the predicted trajectory for prediction i.

### minADE

**Minimum Average Displacement Error**
Let $\hat{s} G^{k}$ be the ground truth for the agent.

The minADE metric computes the mean of the l2 norm between the ground truth for all agents in G and the closest prediction.
$$ \text{minADE} \left( G \right) = \underset{i}{min} \frac{1}{T} \sum_{t = 1}^{T} \left|\right. \left|\right. \hat{s}_{G}^{t} - s_{G}^{i t} \left|\right. \left|\right._{2} $$ Where T is the last prediction time step to include in the metric.
### minFDE

**Minimum Final Displacement Error**
The minFDE metric is equivalent to evaluating the minADE metric at a single time step T:
$$ \text{minFDE} \left( G \right) = \underset{i}{min} \left|\right. \left|\right. \hat{s}_{G}^{T} - s_{G}^{i T} \left|\right. \left|\right._{2} $$
### Miss Rate

A miss is defined as the state when none of the individual K predictions for an object are within a given lateral and longitudinal threshold of the ground truth trajectory at a given time T.

I.e. For prediction i, the displacement vector at time T is rotated into the ground truth agent coordinate frame.
$$ D_{j}^{i} = \left( \hat{s}_{G_{j}}^{i T} - s_{G_{j}}^{i T} \right) \cdot R_{j}^{T} $$ where $R_{j}$ is a rotation matrix to align a unit x vector with the jth agent’s ground truth axis at time T.
If for any prediction i, $d_{y}^{i}$< Threshold lat and $d_{x}^{i}$< Threshold lon the prediction is considered a correct prediction rather than a miss, otherwise a single miss is counted for prediction i. The miss rate is calculated as the total number of misses divided by the total number of objects predicted.

The thresholds change with both velocity and measurement step T as follows:
The thresholds are also scaled according to the initial speed of the agent. The scaling function is a piecewise linear function of the initial speed vi:
$$ \text{Scale} \left( V_{i} \right) = \begin{cases} 0.5 & \text{if}\textrm{ } V_{i} < \textrm{ }\text{1}.\text{4 m}/\text{s} \\ 0.5 + 0.5 \alpha & \text{if 1}.\text{4 m}/\text{s}\textrm{ } < V_{i} < \textrm{ }\text{11 m}/\text{s} \\ 1 & \text{if}\textrm{ } V_{i} > \textrm{ }\text{11 m}/\text{s} \end{cases} $$ where 𝝰=(vi - 1.4) / (11 - 1.4) The thresholds are calculated as:
Thresholdlat(vi, T) = Scale(vi) * Thresholdlat(T) Thresholdlon(vi, T) = Scale(vi) * Thresholdlon(T)

### Overlap Rate

For the purposes of this dataset challenge, the overlap rate is computed by taking the highest confidence prediction from each set of predictions for each object. If any of these predicted agent trajectories overlap at any time with any other objects that were visible at the prediction time step (compared at each time step up to T) it is considered a single overlap. The overlap rate in this challenge is computed as the total number of overlaps divided by the total number of objects predicted.

### mAP

The first step to computing the mAP metric is determining a trajectory bucket for the ground truth of the objects to be predicted. The buckets include straight, straight-left, straight-right, left, right, left u-turn, right u-turn, and stationary. For each bucket, the following is computed.

Trajectory predictions are sorted by confidence value. Using the same definition of a miss as defined above, any trajectory predictions classified as a miss are assigned a false positive and any that are not considered a miss are assigned a true positive. Consistent with object detection mAP metrics, only 1 true positive is allowed for each prediction - it is assigned to the highest confidence prediction, all other predictions for the object are assigned a false positive. True positives and false positives are stored along with their confidences in a list per bucket. To compute the metric, the bucket entries are sorted and a P/R curve is computed.
![Image 3](https://lh3.googleusercontent.com/rycHKuPlqlI7E-S8DD-XKZx8F4A7jrWylSPnunsOVat20fIXaIf3ln0sq96glEt9fAjRNxui9d1_xwMF75EqBhsiiYps9ypr3TE=e365-s420)

<p class="kb-image-caption">图例</p>

As in the above simple example for marginal prediction on two agents, the white arrows are ground truth trajectories, and the colored arrows are predicted trajectories with confidence scores. For object 1, only the blue trajectory is within the given lateral and longitudinal threshold compared to the ground truth; and for object 2, both the red trajectory and the orange trajectory are within the given lateral and longitudinal threshold. When computing the precision and recall, only the red trajectory of object 2 will be considered as true positive since the red trajectory has a higher confidence score. The precision and recall based on sorting the confidence stores can be computed as:
While specific models can produce probabilities over the specific trajectories, for the purpose of evaluation and in this example, we are only looking at the scores' relative ranking and do not require that they sum to 1.

The mAP metric is computed using the interpolated precision values as described in "The PASCAL Visual Object Classes (VOC) Challenge" (Everingham, 2009, p. 11) using the newer method that includes all samples in the computation consistent with the current PASCAL challenge metrics.

After an mAP metric has been computed for all trajectory shape buckets, an average across all buckets is computed as the overall mAP metric.

### Soft mAP

The soft mAP metric differs from the mAP metric described above only in the way that it handles multiple matching predictions for a given trajectory. In both cases, only the highest confidence matching prediction is counted as a true positive. In the standard mAP metric, additional matching predictions count as false positives but in the soft mAP case, additional matching predictions are ignored and are not penalized as part of the metric computation. For the 2023 Motion Prediction Challenge, Soft mAP is the metric used to rank the leaderboard.

## Rules Regarding Awards
See the [Official Challenge Rules here](https://waymo.com/open/challenges/terms).

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[Waymo-Open-Dataset|Waymo Open Dataset]]
[[Waymo-占据流预测|Waymo 占据流预测]]
[[Apollo-5.0-行为预测|Apollo 5.0 行为预测]]
[[Context-Gated-Convolution|Context-Gated Convolution]] — _预测 / Waymo_
[[DenseTNT-与-Teacher-Forcing|DenseTNT 与 Teacher Forcing]] — _预测 / Waymo_
[[HBEns-轨迹预测集成|HBEns 轨迹预测集成]] — _预测 / Waymo_
[[PointPillars-3D-检测|PointPillars 3D 检测]] — _预测 / Waymo_
[[Siamese-网络|Siamese 网络]] — _预测 / Waymo_

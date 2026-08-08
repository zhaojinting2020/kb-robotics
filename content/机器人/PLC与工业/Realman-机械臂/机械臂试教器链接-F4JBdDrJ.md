---
title: 机械臂试教器链接
url: https://my.feishu.cn/docx/F4JBdDrJFowGOpxZ8fcc1I7knOd
quality: raw
fetch_source: feishu:cli
fetched_at: '2026-06-28T04:57:36+00:00'
feishu_formatted_at: '2026-06-28T07:15:38+00:00'
urls_repaired_at: '2026-06-28T04:57:36+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# 机械臂与笔记本有线链接

有线连接示教器前需要将电脑 ip 更改到`192.168.1.xx`网段，`xx`可为除 192.168.1.18 中“18”以外的 ip，建议配置为 192.168.1.100. 配置方法如下：

[ubuntu修改配置IP地址和DNS的方法总结(4种)\_ubuntu手动设置ip地址-CSDN博客](https://blog.csdn.net/davidhzq/article/details/102991577)

## 机械臂试教器链接

（1）打开浏览器，输入网址`192.168.1.18`。

（2）输入账号：`user`，密码：`123`，点击登录。

![image](attachments/F4JBdDrJFowGOpxZ8fcc1I7knOd/img_001.png)
本Demo是一个使用睿尔曼C++二次开发包，基于 Cmake 构建的项目，演示不连接机械臂, 独立使用算法, 进行算法初始化, 机械臂型号设置, 坐标系设置, 运动学正解, 运动学逆解, 欧拉角转四元数, 四元数转欧拉角等功能。机械臂位姿的两种表达方式，分别关节角度数组和机械臂终端的空间位姿。

```text

float joint_angles[ARM_DOF];
```

关节角度数组有六个元素，分别对应机械臂六个关节的角度，共计6个自由度。

```text
typedef struct
{

    rm_position_t position;     ///< 位置，单位：m
    rm_quat_t quaternion;       ///< 四元数
    rm_euler_t euler;           ///< 欧拉角，单位：rad
}rm_pose_t;
```

机械臂末端执行器的空间位姿可以用position = [x, y, z]^T 和euler angles = [rx, ry, rz]^T 表示，共计6个自由度。为了避免欧拉角出现奇异，提供了四元数表达空间位姿作为补充。各个demo的原理和功能如下：

Demo/RMDemo_Cpp/RMDemo_SimpleProcess

依次演示机械臂的六种运动形式，分别为

```text

int rm_movej(rm_robot_handle *handle, const float *joint, int v, int r,int trajectory_connect,int block);
```

狄卡尔空间直线运动，指定机械臂各个**关节角度，**控制机械臂运动到目标位置。需要为函数提供6个关节的角度。

```text

int rm_movej_p(rm_robot_handle *handle,rm_pose_t pose, int v, int r, int trajectory_connect, int block);
```

指定机械臂终端的**目标位姿**，机械臂自主计算每个关节的角度，自主规划轨迹。

```text

int rm_movel(rm_robot_handle *handle,rm_pose_t pose, int v, int r, int trajectory_connect, int block);
```

样条曲线运动，指定机械臂终端的目标位姿，样条曲线下发点位，规划运动轨迹。

```text

int rm_movec(rm_robot_handle *handle,rm_pose_t pose_via, rm_pose_t pose_to, int v, int r, int loop, int trajectory_connect, int block);
```

圆弧运动，指定圆弧运动的中间点和终点（rm_pose_t pose_via, rm_pose_t pose_to），用于圆弧运动。

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[机械臂奇异点规避|机械臂奇异点规避]]
[[睿尔曼快速使用手册-V1.5|睿尔曼快速使用手册 V1.5]]
[[机器人/PLC与工业/ViGET-许继与DPS/DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]] — _PLC / 工业_
[[HVDC-变压器放电故障诊断-H3ZLdpYX|HVDC 变压器放电故障诊断]] — _PLC / 工业_
[[PLC-基础理论教程-BbIQdZZp|PLC 基础理论教程]] — _PLC / 工业_
[[Profinet-Driver-架构(UfY6)-UfY6dCEK|Profinet Driver 架构（UfY6）]] — _PLC / 工业_
[[SIMATIC-D7-FB-Gen-说明-ZTkwd4rd|SIMATIC D7 FB-Gen 说明]] — _PLC / 工业_

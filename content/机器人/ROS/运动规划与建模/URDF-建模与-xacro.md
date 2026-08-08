---
title: URDF 建模与 xacro
url: https://blog.csdn.net/qq_43551910/article/details/121773348
curated_at: '2026-06-28T20:00:00+00:00'
---

# URDF 建模与 xacro

## link 与 joint

- `<link>`：描述刚体外观（visual）, 惯性（inertial）, 碰撞（collision）
- `<joint>`：连接 parent/child，类型含 `fixed`, `continuous`, `revolute` 等
- `collision` 几何通常略大于 `visual`，留安全裕度

### 底盘 URDF 片段

```xml
<robot name="test_mrobot_chassis">
  <link name="base_link">
    <visual>
      <geometry><cylinder length="0.005" radius="0.13"/></geometry>
      <material name="yellow"><color rgba="1 0.4 0 1"/></material>
    </visual>
  </link>
  <joint name="left_motor_wheel_joint" type="continuous">
    <parent link="left_motor"/>
    <child link="left_wheel_link"/>
    <axis xyz="0 1 0"/>
  </joint>
</robot>
```

## 工具链

```bash
sudo apt-get install liburdfdom-tools
check_urdf model.urdf
urdf_to_graphiz model.urdf   # 生成 PDF 拓扑图
```

## RViz 显示

```xml
<launch>
  <param name="robot_description" textfile="$(find pkg)/urdf/robot.urdf"/>
  <node name="joint_state_publisher_gui" pkg="joint_state_publisher_gui" type="joint_state_publisher_gui"/>
  <node name="robot_state_publisher" pkg="robot_state_publisher" type="robot_state_publisher"/>
  <node name="rviz" pkg="rviz" type="rviz" required="true"/>
</launch>
```

## xacro 要点

- 根标签加 `xmlns:xacro="http://www.ros.org/wiki/xacro"`
- `<xacro:property>` 定义常量；`<xacro:macro>` 复用结构
- 编译：`rosrun xacro xacro model.xacro > model.urdf`，或在 launch 中 `command="$(find xacro)/xacro ..."`

## 改进建议

- 根 link 带 inertia 时 KDL 可能报错：加 dummy fixed link 作根
- 补充 `<inertial>` 与 `<collision>` 供 Gazebo 物理仿真
- URDF 文件内避免中文字符

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[ROS-MoveIt-简介|ROS MoveIt 简介]]
[[位置姿态与坐标变换|位置姿态与坐标变换]] — _运动学 / 坐标 / 轨迹_
[[四元数理解|四元数理解]] — _运动学 / 坐标 / 轨迹_
[[机器臂运动学-A311dGJI|机器臂运动学]] — _运动学 / 坐标 / 轨迹_
[[机械臂轨迹规划-LVG3dyAF|机械臂轨迹规划]] — _运动学 / 坐标 / 轨迹_
[[运动控制入门指南-CfHMdigQ|运动控制入门指南]] — _运动学 / 坐标 / 轨迹_
[[逆向运动学求解|逆向运动学求解]] — _运动学 / 坐标 / 轨迹_

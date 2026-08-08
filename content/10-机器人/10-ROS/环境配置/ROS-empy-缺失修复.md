---
title: ROS empy 缺失修复
url: https://blog.csdn.net/weixin_44857882/article/details/124296306
curated_at: '2026-06-28T20:00:00+00:00'
---

# ROS empy 缺失修复

Ubuntu 20.04 + ROS Noetic 执行 `catkin_make` 时常见：

```text
-- Could NOT find PY_em (missing: PY_EM)
CMake Error at /opt/ros/noetic/share/catkin/cmake/empy.cmake:30 (message):
  Unable to find either executable 'empy' or Python module 'em'...
  try installing the package 'python3-empy'
```

## 问题原因

- `empy` 是 ROS 消息/模板生成依赖（提供 Python 模块 `em`）
- CMake 日志里 `PYTHON_EXECUTABLE` 若指向 **Anaconda** 的 Python（如 `~/anaconda3/bin/python3`），而 empy 装在系统 Python 下，就会找不到模块
- 仅 `pip install empy` 在 Anaconda 环境中往往**不能**让 catkin 在系统 Python 路径下找到它

## 解决方案

### 1. 安装系统包（推荐）

```bash
sudo apt-get install python3-empy python3-catkin-pkg
```

### 2. 强制使用系统 Python 编译

```bash
catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3
```

可写入 `~/.bashrc` 持久化：

```bash
export PYTHON_EXECUTABLE=/usr/bin/python3

# 或
alias catkin_make='catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3'
```

### 3. 编译前退出 Conda

若安装 Anaconda 时执行过 `conda init`，终端默认激活 base，ROS 会误用 Conda 解释器：

```bash
conda deactivate
catkin_make
```

### 4. pip 安装（仅当确认使用同一 Python 时）

```bash
/usr/bin/python3 -m pip install empy

# 或指定版本（部分环境需 empy 3.x）
sudo pip3 install empy==3.3.4
```

## 后续：catkin_pkg 找不到

若继续报：

```text
ImportError: No module named 'catkin_pkg'
```

将 dist-packages 加入 `PYTHONPATH`（`~/.bashrc`）：

```bash
export PYTHONPATH=$PYTHONPATH:/usr/lib/python3/dist-packages
source ~/.bashrc
```

可用 `locate catkin_pkg`（需 `sudo apt install mlocate`）确认路径。

## 参考

- 原文：[ubuntu20.04 出现 Unable to find empy（CSDN）](https://blog.csdn.net/weixin_44857882/article/details/124296306)

## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)

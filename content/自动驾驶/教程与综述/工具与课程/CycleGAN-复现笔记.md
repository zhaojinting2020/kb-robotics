---
title: CycleGAN 复现笔记
url: https://blog.csdn.net/qianqianlwg/article/details/131163503
curated_at: '2026-06-28T20:00:00+00:00'
---

# CycleGAN 复现笔记

基于 [pytorch-CycleGAN-and-pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix) 官方项目的 Windows 复现流程（Anaconda 方式）。

## CycleGAN 简介

CycleGAN 用于**无配对**图像域转换：将一组图像从域 A 映射到域 B，无需成对训练数据。典型例子：马↔斑马, 夏↔冬场景。

- 使用对抗损失 + **循环一致性损失**（cycle consistency）保证 \(G_{AB}(G_{BA}(x)) \approx x\)
- 应用：风格迁移, 图像翻译, 黑白上色, 人脸表情, 服装/室内设计效果图等

## 环境要求

| 项目 | 要求 |
|------|------|
| 系统 | Windows（文中示例 Windows 11） |
| Python | 3.x（示例 3.8） |
| 计算 | CPU 或 NVIDIA GPU + CUDA CuDNN |
| 示例配置 | PyTorch 1.9.0, CUDA 11.1, RTX 3060 Laptop |

前置安装：Anaconda, CUDA, PyCharm（可选）。

## 一, 克隆项目

PyCharm：**Tools → Space → Clone Repository**，填入仓库 URL：

- 官方镜像：<https://gitcode.net/mirrors/junyanz/pytorch-cyclegan-and-pix2pix.git>
- 作者翻译版：<https://github.com/qianqianlwg/cycleGAN-.git>

## 二, 创建 Conda 环境

### 方法一：PyCharm 自动创建

克隆后 PyCharm 提示"正在创建 conda 环境"时，在 Conda 配置中指定 `conda.exe` 路径，并指向项目根目录的 `environment.yml`。等待依赖安装完成。查找 conda 路径：

```bash
where conda

# 或
where anaconda
```

### 方法二：手动创建

```bash
conda create -n pytorch-CycleGAN-and-pix2pix python=3.8
conda activate pytorch-CycleGAN-and-pix2pix
cd pytorch-CycleGAN-and-pix2pix
pip install -r requirements.txt

# 或
conda env update -f environment.yml
```

下载慢时可配置清华镜像源。完成后 `conda list` 查看已装包。

## 三, 下载数据集

1. 官方数据集：<https://people.eecs.berkeley.edu/~taesung_park/CycleGAN/datasets/>
2. 解压到项目 `datasets/` 目录（路径可自定义）

## 四, 训练模型

### 1. 配置 train.py

首次运行 `train.py` 可能报错退出，属正常；之后在 PyCharm 运行配置中添加参数：

```bash
--dataroot [trainA 所在数据集路径] --name [权重保存名] --model cycle_gan
```

示例（maps 数据集）：

```bash
--dataroot ./datasets/maps --name maps_cyclegan --model cycle_gan
```

### 2. Visdom 可视化（可选）

```bash
python -m visdom.server
```

浏览器打开 <http://localhost:8097> 查看 loss 曲线。配置完成后运行 `train.py` 开始训练。移动端 RTX 3060 训练官方 maps（约 2000 张）约 **10 epoch/小时**，需按显卡与数据量调整 `batch_size` 等。训练完成后权重保存在 `checkpoints/[name]/`。

## 五, 自定义数据集

目录命名约定：

- 训练：`trainA`, `trainB`
- 测试：`testA`, `testB`（原文笔误写为 tastA/tastB）

收集图像后按上述结构放置，在 `train.py` 配置中修改 `--dataroot` 指向你的目录，其余同第四节。

## 六, 测试 / 推理

1. 准备待转换图片目录（`testA` 或 `testB`）
2. 配置 `test.py` 运行参数（同样需先运行一次以生成配置项）：

```bash
--dataroot [testA 路径] --name [训练时的 name] --model cycle_gan
```

3. 将要用到的生成器权重复制或重命名为 `latest_net_G_A.pth` / `latest_net_G_B.pth`（依测试域而定，放在 `checkpoints/[name]/`）

运行 `test.py`，结果输出到 `results/[name]/`。

## 八, 常见问题

### CUDA 与 PyTorch 版本不匹配

报错通常提示当前 PyTorch 未编译对应 CUDA 版本。处理：

- 到 [PyTorch 官网](https://pytorch.org/) 按本机 CUDA 版本重装 torch/torchvision
- 或升级/降级 CUDA 驱动以匹配已装 PyTorch

确保 `nvidia-smi` 显示的 CUDA 与 `python -c "import torch; print(torch.version.cuda)"` 一致。

## 参考

- 原文：[CycleGAN 复现笔记（CSDN）](https://blog.csdn.net/qianqianlwg/article/details/131163503)
- 官方仓库：[junyanz/pytorch-CycleGAN-and-pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix)

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[CycleGAN-训练流程|CycleGAN 训练流程]]

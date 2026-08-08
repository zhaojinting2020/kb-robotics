---
title: ReWorks 自引导工程
url: https://blog.csdn.net/zhengluanfeng1985/article/details/131796154
fetch_source: csdn:content_views+follow
fetched_at: '2026-06-28T09:45:25+00:00'
curated_at: '2026-06-28T10:00:00+00:00'
---

# ReWorks 自引导工程

ReWorks 的**自引导工程（Bootloader 工程）**用于在目标板上电后完成引导加载，并将 ReWorks 操作系统镜像下载, 启动。以下流程基于 ReDe IDE，以 IMX6Q_SMP 平台为例。

## 开发与集成流程概览

1. 自引导工程开发与集成流程（整体流程图见原文 / 配套视频）
2. 新建工程
3. 资源配置
4. 代码编写
5. 构建项目：右键构建项目，或点击工具栏"构建"按钮
6. 配置 TFTP 服务路径：右键 `IMX6Q_SMP` 文件夹，配置 TFTP 服务路径
7. 打开串口终端
8. 启动开发板，查看网卡信息

## 参考视频

流程演示素材来源：[1.ReDe 开发入门 - 自引导工程（Bilibili）](https://www.bilibili.com/video/BV1ff4y1P7H4/)

---
title: Apollo Prediction 笔记
url: https://xwlu.github.io/2019/09/19/apollo-prediction/
fetch_source: agent_reach:agent_reach:jina
fetched_at: '2026-06-27T16:59:07+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T20:24:24+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Apollo Prediction 笔记

### 30 pages (0.2 seconds)

```mermaid
flowchart TB
  subgraph seq ["序列容器 vector/deque"]
    begin["begin/end 迭代器"]
    front["front/back 元素引用"]
  end
  begin --> iterOps["遍历 insert erase"]
  front --> elemOps["读写首尾元素"]
```

```
mermaid
flowchart TB   subgraph seq ["序列容器 vector/deque"]     begin["begin/end 迭代器"]     front["front/back 元素引用"]   end   begin --> iterOps["遍历 insert erase"]   front --> elemOps["读写首尾元素"]
mermaid flowchart TB   subgraph seq ["序列容器 vector/deque"]     begin["begin/end 迭代器"]     front["front/back 元素引用"]   end   begin --> iterOps["遍历 insert erase"]   front --> elemOps["读写首尾元素"]

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[Apollo-Prediction-笔记|Apollo Prediction 笔记]]
[[Apollo-3.0-编译运行|Apollo 3.0 编译运行]]
[[Apollo-6.0-安装|Apollo 6.0 安装]]
[[Apollo-Cyber-RT-框架|Apollo Cyber RT 框架]]
[[Apollo-预测模块结构|Apollo 预测模块结构]]
[[VSCode-调试-Apollo|VSCode 调试 Apollo]]
[[Cyber-RT-常用命令|Cyber RT 常用命令]]
[[VSCode-连接-Docker-调试|VSCode 连接 Docker 调试]]

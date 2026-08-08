---
title: Cyber RT 常用命令
url: https://zhuanlan.zhihu.com/p/403986063
fetch_source: browser_cookies
fetched_at: '2026-06-27T20:15:31+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Cyber RT 常用命令

## Cyber RT编译
cyber RT的编译需要在docker环境下进行，因此在编译前需要打开docker:
cd apollo
bash docker/scripts/dev_start.sh
bash docker/scripts/dev_into.sh
```
cyber RT采用两种编译方法：

# 采用apollo.sh 编译
./apollo.sh build cyber

# 也可以使用bazel命令直接编译
bazel build //cyber/examples/common_component_example/...
```
### 启动，关闭节点
启动节点可以采用cyber_launch start “对应路径”+launch 文件:
`cyber_launch start cyber/examples/common_component_example/common.launch`关闭同理 cyber_launch stop “对应路径”+launch 文件。此外，还可以直接使用mainboard命令启动相应的dag文件来启动节点:
`mainbooard -d cyber/examples/common_component_example/common.dag`### Cyber RT 常用命令行工具
- `cyber_visualizer`: 可视化工具，可以用来显示cyber RT的channel中的数据，一般用来作为激光点云和摄像头数据的可视化工具。
- `cyber_monitor`: 该命令可以在terminal中实时显示cyber所有channel的信息。通道信息的默认显示为红色。但是，如果有数据流过通道，则通道的相应行显示为绿色。
- `cyber_node`: 该命令行工具用于打印Cyber RT节点信息。
- `cyber_channel`: 打印Cyber RT通道信息。
- `cyber_service`: 打印cyber RT节点信息。
- `cyber_recorder`: 数据的录制回放工具，它提供了许多有用的功能，包括记录文件, 回放记录文件, 分割记录文件, 检查记录文件信息等。
- `cyber_launch`: 该命令用于加载模块。
- `rosbag_to_record`: 该命令行工具用于将ROS系统的rosbag工具记录的消息文件转换Apollo Cyber RT提供的记录文件。
### 参考

---
title: Apollo 3.0 编译运行
url: https://zhuanlan.zhihu.com/p/29722428
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:17:05+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Apollo 3.0 编译运行

## 文章 历史
1.   apollo1.5的编译及运行
2.   apollo3.0的编译及运行
1. 下载[docker](https://zhida.zhihu.com/search?content_id=4077470&content_type=Article&match_order=1&q=docker&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3MjkyNTYsInEiOiJkb2NrZXIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjo0MDc3NDcwLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.nnaUqqhjYmNK4nTjDKUi-NS54ITjpA6hYvAISRcfPmM&zhida_source=entity)镜像 并启动docker服务

`bash docker/scripts/dev_start.sh`
2. 进入docker`bash docker/scripts/dev_into.sh`
3. compile

`bash [apollo.sh](https://link.zhihu.com/?target=http%3A//apollo.sh/) build`
4. 运行

`bash scripts/bootstrap.sh`可以通过 [http://172.21.81.72:8888/](https://link.zhihu.com/?target=http%3A//172.21.81.72%3A8888/) 查看
5. 运行bag

`rosbag play -l demo_2.5.bag`
6. dreamview展示结果

![Image 1](https://pic2.zhimg.com/v2-d4b32a5fa8ff721ef8b7233506b422e3_1440w.jpg)

<p class="kb-image-caption">图例</p>

我的环境win7下virtualbox 中的ubuntu14.04，打开bash 运行如下命令开始编译安装cd ~/git/apollo git clone https://github.com/ApolloAuto/apollo

# 安装docker

bash docker/scripts/install_docker.sh

# 出错 /var/run/docker.sock: permission denied. refer : http://blog.csdn.net/qiyueqinglian/article/details/50952870 用以下方法解决
sudo gpasswd -a ${USER} docker

# 新开一个窗口确保没有以sudo方式运行docker，运行下面的下命令正常输出则docker安装成功
docker ps  # 正常输出 CONTAINER ID        IMAGE    COMMAND

# 用下面的命令下载开发分支

bash docker/scripts/dev_start.sh

# 创建文件夹时相关权限不够 mount 时加上 -o gid=1000,uid=1000 1000为id当前用户名获取。
bash docker/scripts/dev_into.sh #这条命令没有输出,主要是用来进入docker容器#编译apollo bash apollo.sh build

# 输出结果
# [ OK ] Build passed!
# [INFO] Took 5822.738 seconds
# start Human Machine Interface(HMI)
bash scripts/hmi.sh

# output
Start roscore...

HMI ros node service running at localhost:8887 HMI running at http://localhost:8887用我的ip访问http://192.168.21.239:8887/ Replay demo rosbag

# in a different terminal, in the apollo directory
bash docker/scripts/dev_into.sh # jump into the docker container rosbag play -l ./docs/demo_guide/demo.bag #1.0的bag包rosbag play -l ./docs/demo_guide/demo_1.5.bag #1.5的bag包Dreamview should show a running vehicle with trajectory now.

## Apollo1.5运行的结点
1.5bag包里的消息path:        ./docs/demo_guide/demo_1.5.bag version:     2.0 duration:    17.0s start:       Sep 13 2017 04:58:04.00 (1505249884.00) end:         Sep 13 2017 04:58:20.00 (1505249901.00) size:        15.5 MB messages:    9025 compression: none [20/20 chunks] types:       pb_msgs/ADCTrajectory        [97587fe9a5b2df2b61888d56c6fc697b]              pb_msgs/Chassis              [d6a21658031a6a4615858d76f8b5178e]              pb_msgs/ControlCommand       [67f7ff8a4c675dc97a8c7ce6d6289943]              pb_msgs/GnssStatus           [6ab9bfa7e56e2724f6d30280b731fef2]              pb_msgs/Gps                  [8fad5985ce947d3b6854fd093a59c429]              pb_msgs/Imu                  [bdef0ba51869607ed95736d41e80c1f5]              pb_msgs/InsStat              [36306149a641468d85afa4cf44de7141]              pb_msgs/LocalizationEstimate [503c8e75900db180bc61534806a37cfb]              pb_msgs/PerceptionObstacles  [c6fd886a685be1dbbc6174bbc5a754de]              pb_msgs/PredictionObstacles  [45bac0c01020cbf041fb9bd39f790e93] topics:      /apollo/canbus/chassis              1700 msgs    : pb_msgs/Chassis              /apollo/control                     1698 msgs    : pb_msgs/ControlCommand              /apollo/localization/pose           1700 msgs    : pb_msgs/LocalizationEstimate              /apollo/perception/obstacles         170 msgs    : pb_msgs/PerceptionObstacles              /apollo/planning                      85 msgs    : pb_msgs/ADCTrajectory              /apollo/prediction                   170 msgs    : pb_msgs/PredictionObstacles              /apollo/sensor/gnss/corrected_imu   1700 msgs    : pb_msgs/Imu              /apollo/sensor/gnss/gnss_status       68 msgs    : pb_msgs/GnssStatus              /apollo/sensor/gnss/ins_stat          34 msgs    : pb_msgs/InsStat              /apollo/sensor/gnss/odometry        1700 msgs    : pb_msgs/Gps按上述命令启动hmi,用chrome打开[http://localhost:8887](https://link.zhihu.com/?target=http%3A//localhost%3A8887/)，localhost也可以换成ip在另一个电脑上打开。如下图，注意，prediction planing模块并没有开启，因为看上面bag包里的消息top已经包含，/apollo/planning 和 /apollo/prediction 两个topic了，表明dreamview中的车是按照bag包里的这两个录制的消息来跑的。
![Image 2](https://pic1.zhimg.com/v2-fa19a266cab4bc24cd2cfad91a45db52_1440w.jpg)

<p class="kb-image-caption">图例</p>

---
title: Apollo 6.0 安装
url: https://zhuanlan.zhihu.com/p/403590569
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T20:14:31+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# Apollo 6.0 安装

本文旨在详细记录 Apollo 6.0 在个人电脑的 Ubuntu 18.04 系统中的完整安装及运行过程。

### 硬件要求
百度Apollo系统正常需要安装在工业计算机IPC中，在个人电脑上也可以安装。由于网上没有查到具体的硬件要求，这里PO出个人笔记本电脑配置作为参考：电脑型号：神州战神z7m，CPU i7, 16G内存，GPU: GTX965m. 实测可以跑通。

### Apollo安装过程
1.   安装Nvidia显卡驱动。

sudo apt-get update
sudo apt-add-repository multiverse
sudo apt-get update
sudo apt-get install nvidia-driver-455
```
安装完毕采用`nvidia-smi` 命令查看显卡:
安装docker
curl https://get.docker.com | sh
sudo systemctl start docker && sudo systemctl enable docker
```
重启 Docker [守护进程](https://zhida.zhihu.com/search?content_id=177816566&content_type=Article&match_order=1&q=%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQwNjAsInEiOiLlrojmiqTov5vnqIsiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzc4MTY1NjYsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.fG9gRdFOFuGQXdtDif2M6IDc_mtCIIs9JgF3pTx1V0A&zhida_source=entity)以使改动生效：
`sudo systemctl restart docker`
完成 Docker 安装后，在终端中执行下述命令并重启系统，这样可以免去每次执行 Docker 命令时需要添加 `sudo` 的繁琐：
sudo groupadd docker
sudo usermod -aG docker your_username
```
1.   安装nvidia工具包
如果是在物理机中安装的 Ubuntu，且机器配有 NVIDIA [显卡](https://zhida.zhihu.com/search?content_id=177816566&content_type=Article&match_order=3&q=%E6%98%BE%E5%8D%A1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQwNjAsInEiOiLmmL7ljaEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzc4MTY1NjYsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MywiemRfdG9rZW4iOm51bGx9.VRBbx6WNEjhlQ5DGZbpYacF02eGKBzCPIR4uimGbv2E&zhida_source=entity)，在安装了驱动的前提下，还需要安装 NVIDIA 容器工具包以运行 Apollo Docker 镜像中的 CUDA：
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get -y update
sudo apt-get install -y nvidia-docker2
```
1.   git clone源码
# 使用 SSH 的方式
git clone git@github.com:ApolloAuto/apollo.git

# 使用 HTTPS 的方式
git clone https://github.com/ApolloAuto/apollo.git
```
### Docker构建启动Apollo
1.   进入到 Apollo 源码根目录，终端执行下述命令以启动 Apollo Docker 开发容器：
`./docker/scripts/dev_start.sh`
1.   进入docker
`./docker/scripts/dev_into.sh`
1.   容器中构建Apollo,
./apollo.sh build
#若编译失败可多尝试几次，卡死可尝试
 ./apollo.sh build_opt
```
1.   启动Apollo

`./scripts/bootstrap.sh start`
上述命令会启动 DreamView 并使能模块监控机制，在浏览器中访问 http://localhost:8888 来显示 DreamView 界面。

### 踩坑记录
### git clone Apollo仓库遇到错误
andre@andre-CN15S:~$ git clone git clone https://github.com/ApolloAuto/apollo.git
Cloning into 'apollo'...
remote: Enumerating objects: 2618, done.
remote: Counting objects: 100% (2618/2618), done.
remote: Compressing objects: 100% (1495/1495), done.
error: RPC failed; curl 56 GnuTLS recv error (-110): The TLS connection was non-properly terminated.
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```
**解决办法：**
[https://github.com/ApolloAuto/a pollo/issues/10378](https://link.zhihu.com/?target=https%3A//github.com/ApolloAuto/apollo/issues/10378)

### Apollo执行 ./apollo.h build遇到错误
(16:20:38) ERROR: no such package '@com_github_grpc_grpc//bazel': java.io.
IOException: Error downloading [https://apollo-system.cdn.bcebos.com/archive/6.0/v1.30.0.tar.gz, https://github.com/grpc/grpc/archive/v1.30.0.tar.gz] to /apollo/.cache/bazel/540135163923dd7d5820f3ee4b306b32/external/com_github_grpc_grpc/temp13334635335104087956/v1.30.0.tar.gz: Unknown host: github.com
(16:20:38) INFO: Elapsed time: 164.995s
(16:20:38) INFO: 0 processes.
(16:20:38) FAILED: Build did NOT complete successfully (0 packages loaded)
```
**解决办法：** 多编译几次 就好了

### 安装VS code并配置C++环境
VS code安装和配置参见: [https://segmentfault.com/a/1190 000020155987](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000020155987)

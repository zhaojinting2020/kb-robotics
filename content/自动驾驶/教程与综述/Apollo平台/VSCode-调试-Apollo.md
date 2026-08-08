---
title: VSCode 调试 Apollo
url: https://zhuanlan.zhihu.com/p/436866369
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T20:15:49+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# VSCode 调试 Apollo

## 引言

[apollo自动驾驶框架](https://zhida.zhihu.com/search?content_id=185211074&content_type=Article&match_order=1&q=apollo%E8%87%AA%E5%8A%A8%E9%A9%BE%E9%A9%B6%E6%A1%86%E6%9E%B6&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxMzUsInEiOiJhcG9sbG_oh6rliqjpqb7pqbbmoYbmnrYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxODUyMTEwNzQsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.dJyXSmg-woV-DzUSILVAYtWQh_aASVTcyGZcrdQ-YcU&zhida_source=entity)是优秀的开源工程。作为自动驾驶开发人员，无论是架构设计还是算法细节的完善，apollo都有很多值得学习的地方。但是按照官方提供的[GDB环境配置](https://zhida.zhihu.com/search?content_id=185211074&content_type=Article&match_order=1&q=GDB%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxMzUsInEiOiJHRELnjq_looPphY3nva4iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxODUyMTEwNzQsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.vYCt9Dl0DoYQ-pn2A7JJat6luChJWUCiXwMNneJ4TcY&zhida_source=entity)来看，复杂导致实际的调试效率低下。本文带你快速用vscode搭建起一个debug环境，快速上手使用apollo!

## 1.安装环境

主机系统：18.04.5 LTS（Bionic Beaver）
运行内存：16G
显卡：NVIDIA GTX 2080 8G
apollo 6.0
```
## 2.前置安装
### 2.1 安装apollo的环境

这部分安装的相关教程可以参考官方文档，或者参考以下链接的文章
[自动驾驶开发者说| 框架 |如何快准狠的安装apollo6.0？ - 冯偲的文章 - 知乎](https://zhuanlan.zhihu.com/p/430933600)

### 2.2 vscode 插件安装--**Remote - Containers**
Remote - Containers可以进入[docker容器](https://zhida.zhihu.com/search?content_id=185211074&content_type=Article&match_order=1&q=docker%E5%AE%B9%E5%99%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxMzUsInEiOiJkb2NrZXLlrrnlmagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxODUyMTEwNzQsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.kaIhZN1gpWtOyX3IK-ZJpW8Nmga5xX-9J9kMCZbpeDQ&zhida_source=entity)里，结合vscode使用可以实现容器内的代码修改和调试。在vscode扩展功能中可以搜索并安装。

### 2.3 启动Apollo环境
cd apollo/

bash docker/scripts/dev_start.sh
```

完成启动之后使用docker ps查看所有的apollo镜像完成启动
![Image 1](https://picx.zhimg.com/v2-189576fc56b056df0d9ed34cbfd08a35_1440w.jpg)

<p class="kb-image-caption">图例</p>

如中在命令窗口中，选择Open Container Configuration File，打开容器配置文件，配置进入容器后的一些环境变量，用户等，参考配置如下：注意："remoteUser"需要修改成远程调试的用户名。
{
	"extensions": [

		"BazelBuild.vscode-bazel",
		"DamianKoper.gdb-debug",
		"eamodio.gitlens",

		"GitHub.vscode-pull-request-github",
		"Gruntfuggly.todo-tree",

		"jeff-hykin.better-cpp-syntax",
		"mhutchie.git-graph",

		"MS-CEINTL.vscode-language-pack-zh-hans",
		"ms-vscode-remote.remote-containers",
		"ms-vscode-remote.remote-ssh",
		"ms-vscode-remote.remote-ssh-edit",
		"ms-vscode-remote.remote-wsl",
		"ms-vscode.cmake-tools",
		"ms-vscode.cpptools",

		"ms-vscode.cpptools-extension-pack",
		"ms-vscode.cpptools-themes",
		"ms-vsliveshare.vsliveshare",
		"twxs.cmake"
	],

	"workspaceFolder": "/apollo",
	"remoteUser": "fc",
	"remoteEnv": {

		"HISTFILE": "/apollo/.dev_bash_hist"
	}
}
```
## 5. 开始调试
1. 进入Apollo的目录， 重新编译Apollo代码，生成可调式的可执行文件。
`bash apollo.sh build_dbg`
2. 配置vscode的调试文件launch.json，参考如下
{

    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {

            "name": "g++ - 生成和调试活动文件",
            "type": "cppdbg",
            "request": "launch",

            "program": "/apollo/bazel-bin/cyber/mainboard",
            "args": ["-d","/apollo/modules/perception/production/dag/dag_streaming_perception.dag"],
            "stopAtEntry": false,
            "cwd": "/apollo",
            "environment": [],

            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {

                    "description": "为 gdb 启用整齐打印",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],

            // "preLaunchTask": "C/C++: g++ 生成活动文件",
            "miDebuggerPath": "/usr/bin/gdb"
        }
    ]
}
```

参数解释：
"program":是可执行文件的的路径，在这个调试配置中，调用的是mainboard可执行文件，该可执行程序可以加载相关模块的dag文件，完成模块的启动和运行。

"args" ：设置可执行文件的输入参数 "-d"为mainboard的参数，表明输入dag文件式，"/apollo/modules/perception/production/dag/dag_streaming_perception.dag为需要调试的dag文件，这个文件可以根据你自己的需要更改。
3. 打断点，按下F5调试。

![Image 4](https://pic4.zhimg.com/v2-3a913cbc8fccef687616653419a24a5f_1440w.jpg)

<p class="kb-image-caption">图例</p>

[自动驾驶开发者说 | 前沿|如何进行LiDAR-Camera（雷达-相机）的联合标定？](https://zhuanlan.zhihu.com/p/477131687)
[自动驾驶开发者说|前沿|如何用360度全景图来深度估计？](https://zhuanlan.zhihu.com/p/472369406)
[自动驾驶开发者说|前沿|如何进行多传感器的融合？](https://zhuanlan.zhihu.com/p/470238242)

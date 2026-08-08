---
title: VSCode 连接 Docker 调试
url: https://zhuanlan.zhihu.com/p/468146522
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T20:16:05+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

# VSCode 连接 Docker 调试

## 0 引言

在网上或者官方教程中，通常使用`terminal`进入`docker`，从而进行`apollo`的调试，这对于后端(服务器)人员是很友好的。但对于一些刚入门算法工程师显得有点困难，可能遇到的问题如下：
1.   由于`terminal`没有界面，寻找文件会比较花费时间，比如`control`默认的数据保存目录为`/tmp`，但`/tmp`无法在docker外部进行查找；
2.   `apollo`由git进行管理，修改代码后，在上传git之前，想对比修改的差异，通常使用git diff对比整个模块文件夹，但仍然不够直观；
3.   `apollo`的[python脚本](https://zhida.zhihu.com/search?content_id=192163595&content_type=Article&match_order=1&q=python%E8%84%9A%E6%9C%AC&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODI3NjQxNTMsInEiOiJweXRob27ohJrmnKwiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxOTIxNjM1OTUsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.V5-W2bDF5fuyX-fr31Y9kf-Z-5ywk1dgNWy0n2nbie0&zhida_source=entity)无法在外部运行，只能在`dokcer`里面通过`terminal`命令运行python脚本，若修改脚本，难以设置断点进行调试；
4.   `apollo`的单元测试，如何运行和调试对新手是个比较难的问题。诸如上述问题，处于算法开发初期的工程师，若能拥有图形化界面，能够给自己写的代码设置断点(需要结合log)，调试时间及调试难度会大大降低。

## 2 vscode进入docker容器

在使用`vscode`进入`dokcer`容器之前，需要按照官方教程安装好`apollo`，需要启动`apollo`环境
cd apollo/

bash docker/scripts/dev_start.sh
```
1.`vscode`需要借助`Remote-Containers`插件进入`apollo`的`docker`容器，安装`Remote-Containers`插件
![Image 1](https://pic1.zhimg.com/v2-bb98e5e8755a87ee45371a7c36f247e6_1440w.jpg)

<p class="kb-image-caption">图例</p>

2.在`vscode`左侧侧边栏会显示`Remoter Explorer`图标，点击图标后会显示本机安装的容器，选择`apolloauto/apollo:dev`(即选择`apollo`的`docker`运行环境容器)，右键选择`Attach to Container`即可。
![Image 2](https://pic4.zhimg.com/v2-9a33dc4d08be588e670b2349924db73b_1440w.jpg)

<p class="kb-image-caption">图例</p>

在`vscode`中使用`docker`的终端环境，需要配置容器内用户和环境，按`ctrl+shift+p`，输入`open container configuration file`，打开容器配置文件，主要填写`remoteUser`和`remoteEnv`，`remoteUser`填写本机用户名。此外，在容器的`vscode`，可自行安装需要的插件，比如C/C++。
{
    "workspaceFolder": "/",
    "extensions": [
        "ms-vscode.cpptools"
    ],

    "remoteUser": "yanghq13",
    "remoteEnv": {

        "HISTFILE": "/apollo/.dev_bash_hist"
    }
}
```
![Image 4](https://pic4.zhimg.com/v2-a40bb665fe520a4998a4ba12eaaa577d_1440w.jpg)

<p class="kb-image-caption">图例</p>

在配置好容器环境后，点击`vscode`最底下的`warning`按钮，选择`TERMINAL`即可使用`docker`环境的终端，其用户名显示为`yanghq13@in_dev_docker`，在该终端运行`bash apollo.sh build`，完成`apollo`的编译。
![Image 5](https://pic2.zhimg.com/v2-cc116360321885c4b8d0d70d7a64bb35_1440w.jpg)

<p class="kb-image-caption">图例</p>

使用`vscode`调试c++程序，需要编写`launch.json`(需要在容器的`vscode`安装插件C/C++)，按住`ctrl+shift+p`，输入`open 'launch.json'`。以`control`为例，调试脚本如下
{
    "version": "0.2.0",
    "configurations": [
        {

            "name": "g++ - 生成和调试活动文件",
            "type": "cppdbg",
            "request": "launch",

            "program": "/apollo/bazel-bin/cyber/mainboard",
            "args": ["-d","/apollo/modules/control/dag/control.dag"],
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

            "miDebuggerPath": "/usr/bin/gdb"
        }
    ]
}
```

编写好调试脚本后，在`control_component.cc`设置一个断点，按`F5`开始调试，程序会停止在断点处。点击`vscode`左侧侧边栏的`Run and Debug`图标，可以查看此时c++程序出现的变量。由此，可以进行任意断点的调试。
> 这个断点调试可以结合`apollo bag`数据的回放，通过在需要debug的代码处添加时间戳判断，并打上断点(主要是为了在出现问题的时间停止程序)，可以查看这一时刻的变量，方便调试。有兴趣可以自行尝试。

![Image 6](https://pic4.zhimg.com/v2-41c4f68bbaf9cb63f36630d64d793909_1440w.jpg)

<p class="kb-image-caption">图例</p>

`apollo`每个模块都编test写有对应的单元测试文件(后缀带有test)，在很多资料介绍中，很少有介绍是怎么调试的。单元测试基于`google_test`编写，想编写单元测试代码的可自行查阅`google_test`规则。
`launch.json`如下
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Launch",
            "type": "cppdbg",
            "request": "launch",

            "program": "/apollo/bazel-bin/modules/control/control_component_test",
            "args": [],
            "stopAtEntry": false,

            "cwd": "${workspaceFolder}",
            "environment": [],

            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {

                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],

            "miDebuggerPath": "/usr/bin/gdb"
        }
    ]
}
```

同理，编写好调试脚本后，在`control_component_test.cc`设置一个断点，按F5开始调试，程序会停止在断点处。由此，可进行单元测试的调试。
![Image 7](https://picx.zhimg.com/v2-0d951a6d3f93db1432930a77c9e5396f_1440w.jpg)

<p class="kb-image-caption">图例</p>

`apollo`在`tools`文件夹下，有非常多的`python`脚本，几乎覆盖了所有模块。每个模块的算法工程师可以基于这些`python`脚本，进行相应的修改，以解决某些问题(比如数据处理，模拟消息发送等). 而这些`python`脚本在外部无法运行(多是因为找不到诸如`modules.canbus.proto`的`proto`文件)，在·窗口通过`python`运行的话，设置断点较为困难，给`python`脚本修改带来了相当大的难度。
`launch.json`如下
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python",
            "type": "python",
            "request": "launch",
            "stopOnEntry": false,

            "pythonPath": "/usr/bin/python",
            "program": "/apollo/modules/tools/record_play/rtk_player_yanghq13.py",
            "cwd": "${workspaceRoot}",
            "env": {},

            "envFile": "${workspaceRoot}/.env",
            "debugOptions": [
                "WaitOnAbnormalExit",
                "WaitOnNormalExit",
                "RedirectOutput"
            ]
        }
    ]
}
```

同理，编写好调试脚本后，在`rtk_player_yanghq13.py`设置一个断点，按F5开始调试，程序会停止在断点处。由此，可进行python脚本的调试。
![Image 8](https://pica.zhimg.com/v2-92dc2699eea4ac402eb88021ae539c1c_1440w.jpg)

<p class="kb-image-caption">图例</p>

本文比较适合刚接触`apollo`的算法工程师及其他人员，对于具有相当丰富`apollo`调试经验的人员来说可能并不具有帮助作用，可根据需要自行选择是否按照本文进行`apollo`的调试。

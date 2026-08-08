---
title: 嵌入式学习笔记
url: https://my.feishu.cn/docx/YuhFd2yeNoYVsax5yWKcx4cLnjg
quality: raw
attachments:
- file: attachments/YuhFd2yeNoYVsax5yWKcx4cLnjg/file_001.docx
  title: file_001.docx
fetch_source: feishu:cli
fetched_at: '2026-06-28T05:05:04+00:00'
feishu_formatted_at: '2026-06-28T07:15:40+00:00'
urls_repaired_at: '2026-06-28T05:05:04+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
wikilinks_refreshed_at: '2026-06-28T07:36:00+00:00'
---

# 嵌入式学习笔记

## 什么是uboot

引导加载程序。在计算机系统启动时，操作系统需要被加载到内存中运行，而引导加载程序就是负责完成这个任务的软件。U-Boot作为引导加载程序，它在硬件启动后首先运行，为操作系统提供启动所需的硬件初始化和软件环境。

## 什么是在线引导与mmc加载

在嵌入式系统开发中，“在线引导”和“MMC加载”是两种常见的启动方式，它们主要用于将操作系统或应用程序加载到内存中并运行。在线引导是一种通过网络下载操作系统映像并启动系统的方式。这种方式通常用于开发阶段，方便快速更新和调试系统。

MMC加载是指通过MMC（MultiMediaCard）存储介质（如SD卡或eMMC）加载操作系统映像并启动系统。这种方式在嵌入式设备中非常常见，尤其是在需要离线启动的场景中。在线引导：适合开发和调试阶段，通过网络快速下载和更新操作系统映像，方便快捷。

MMC加载：适合离线启动场景，通过MMC存储介质加载操作系统映像，稳定可靠，易于部署。在实际应用中，可以根据具体需求选择合适的启动方式。例如，在开发阶段可以使用在线引导快速更新系统，而在产品部署阶段可以使用MMC加载确保系统的稳定运行。

## 参考资料

<div class="kb-references">
<p>[https://www.runoob.com/linux/linux-system-boot.html](https://www.runoob.com/linux/linux-system-boot.html)</p>
<p>[file_001.docx](attachments/YuhFd2yeNoYVsax5yWKcx4cLnjg/file_001.docx)</p>
</div>
## 相关笔记

[机器人（主题索引）](../../../../index/MOC-robotics.md)
[[VxWorks-Workbench-培训资料-VlKAdIBn|VxWorks Workbench 培训资料]]
[[实时操作系统入门指南-KJffdiOi|实时操作系统入门指南]]
[[机器人/PLC与工业/ViGET-许继与DPS/DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]] — _PLC / 工业_
[[HVDC-变压器放电故障诊断-H3ZLdpYX|HVDC 变压器放电故障诊断]] — _PLC / 工业_
[[PLC-基础理论教程-BbIQdZZp|PLC 基础理论教程]] — _PLC / 工业_
[[Profinet-Driver-架构(UfY6)-UfY6dCEK|Profinet Driver 架构（UfY6）]] — _PLC / 工业_
[[SIMATIC-D7-FB-Gen-说明-ZTkwd4rd|SIMATIC D7 FB-Gen 说明]] — _PLC / 工业_

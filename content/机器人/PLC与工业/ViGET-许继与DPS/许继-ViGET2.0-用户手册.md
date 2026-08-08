---
title: ViGET 2.0 工程工具软件用户手册
note_type: manual
quality: curated
source_type: PDF
converted_at: '2026-06-28T11:51:36+00:00'
converter: markitdown
---

# ViGET 2.0 工程工具软件用户手册

> 本手册为许继集团有限公司 ViGET 2.0 工程工具软件的官方用户手册，涵盖软件安装, CFC 文件编辑, 硬件配置器, Shared Memory, 编译, Online 功能, 工程统计, 版本管理及 SmartSim 仿真等完整内容。

---

## 目录

1. [[#警告信息]]
2. [[#一, ViGET V2.0 工程工具软件简介]]
3. [[#二, ViGET V2.0 工程工具软件工具]]
4. [[#三, CFC 文件编辑（CFC Editor）]]
5. [[#四, 硬件配置器功能介绍与使用]]
6. [[#五, Shared Memory 变量编辑与使用]]
7. [[#六, Build]]
8. [[#七, Online 功能]]
9. [[#八, 工程统计（Project Statistics）]]
10. [[#九, 版本管理工具的介绍和使用]]
11. [[#十, SmartSim 仿真]]

---

## 警告信息

### 注意

手册中的信息未能包括装置的所有细节和变化，也未能提供与安装, 运行和维护相关的每个问题的解决方案。如果购买方所要求的进一步信息或特殊问题没有提及，请与销售方联系。同时，这本手册不能成为以前或已存在的协议, 约定或关系的一部分或修正。出售合同包含了销售方全部义务。双方合同中包括的保证是销售方唯一保证，在此的任何声明不能作为保证，也不能修正已存在的保证。

### 警告

电力设施中某些装置带有危险的电压。如果不遵守规定，就会导致严重的人身伤亡和设备损害。只有具有一定资格的人员才能在相关设备及附近工作。相关人员必须根据用户手册，具有关于所有警告信息和维护措施的完整知识。设备成功和安全的运行决定于正确的处理, 安装, 操作和维护。

### 定义

**专业人员**

在用户手册和产品标识中，对"专业人员"作如下定义："专业人员"应该熟悉设备的安装, 启动和操作以及遇到的问题，他或她必须具有以下资格：
1. 对于设备的启动, 关闭, 清洁, 电路的接地和监视，经过安全规范的培训和认可；
2. 对于保护装置的正确和使用，经过安全规范的培训和认可；
3. 经过急救培训。

**危险**

在用户手册和产品标识中，"危险"表示如果不采取正确的预防措施，就会发生严重的人身伤亡和设备损害。

**警告**

在用户手册和产品标识中，"警告"表示如果不采取正确的预防措施，可能发生严重的人身伤亡和设备损害。

**小心**

在用户手册和产品标识中，"小心"表示如果不采取正确的预防措施，可能发生一般的人身伤亡和设备损害。

**注意**

在用户手册和产品标识中，"注意"表示产品或用户手册的需要特别注意的每个部分。

### 静电防护

电路板有些部分可能由于静电放电遭到破坏。在接触任何电路板之前，身体应进行放电，方法是接触导体或接地的物体（比如裸露的金属机箱，插座保护导体连接部分）。

### 运行安全

在运行时设备有危险电压；无视安全规范会导致严重的人身伤亡和财产损失；相关操作规范中的警告信息必须严格注意，这一点十分重要。

---

## 一, ViGET V2.0 工程工具软件简介

### 1.1 硬件支持

ViGET V2.0 工程工具软件至少需要满足以下要求的计算机：
- **Pentium II 处理器**
- **1G 内存**
- **2G 硬盘**
- **Windows XP SP3，Windows 2003，32位和64位 Windows 7**

### 1.2 安装程序

安装 ViGET V2.0 工程工具软件一般只需要逐步点击下一步按钮来进行安装，不需要进行太多的参数设置。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_001.jpg)

<p class="kb-image-caption">图1.1 ViGET V2.0安装向导</p>

### 1.3 启动 ViGET V2.0 工程工具软件

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_002.jpg)

<p class="kb-image-caption">图1.2 ViGET V2.0工程工具软件启动界面</p>

如图1.2 所示，ViGET V2.0 工程工具软件的主界面被分为六个区域：
1. **菜单和工具栏**
2. **项目管理窗口**
3. **POUs, Hardware Library, Shared Memory 等工具窗口**
4. **编辑窗口**
5. **输出窗口**
6. **属性窗口**

---

## 二, ViGET V2.0 工程工具软件工具

### 2.1 ViGET V2.0 工程工具软件架构

#### 2.1.1 简介

一般情况下，ViGET V2.0 工程工具软件界面架构如图2.1所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_005.jpg)

<p class="kb-image-caption">图2.1 ViGET工程工具软件架构图</p>

工程信息显示在右边的**项目管理器**中。编辑栏显示在中间位置。大多数编程人员习惯使用分屏技术，在上层文件中编辑声明，在下层文件中编辑指令程序。虽然声明看上去所有程序都一样，但是指令则有很大的不同。ViGET V2.0 工程工具软件架构可以同时执行很多文件，错误报告将在**输出窗口**（Output Window）中显示。

#### 2.1.2 输出窗口

输出窗口位于 ViGET V2.0 工程工具软件架构的底部，用来显示提示信息, 状态信息, 错误信息和调试结果。

### 2.2 项目管理器

#### 2.2.1 简介

**项目管理器**用于 ViGET V2.0 工程工具软件架构的文件管理，ViGET V2.0 使用工程（Project）概念管理各类设计文件，支持 ViGET V2.0 工程和 Function Block 工程（在**功能块管理器**中介绍）。通过使用项目管理器，可以用文件和工程将所做的工作组织起来。在项目管理器中，可以通过右键菜单，创建和编辑文件, 编译和下载应用程序。

ViGET V2.0 工程（.ViDPSProj）与 ViGET 工程（.VAR）完全兼容，支持原有全部文件。项目管理器展现 ViGET V2.0 工程用户设计的内容，是对各类文件和资源操作的主要入口，支持硬件信息配置, 工程库, CFC 文件的直接显示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_006.png)

<p class="kb-image-caption">图2.2 项目管理器</p>

如图2.2 所示即为项目管理器。工程文件下包含了所用到的所有文件，呈树形显示。

#### 2.2.2 工程（Projects）

**A. 创建新工程**

（1）在打开 ViGET V2.0 工程工具软件后，可以开始工作了。第一步是创建一个新的工程。选择 `File -> New -> Project…` 或者点击工具栏上的 **New Project** 按钮。如图 2.3 所示为新建工程对话框。在对话框中，选择工程模板，输入工程名和工程存放路径。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_008.png)

<p class="kb-image-caption">图2.3 新建工程窗口</p>

（2）在项目管理器中打开工程，如图 2.4 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_004.png)

<p class="kb-image-caption">图2.4 项目管理器中打开工程</p>

（3）在不同的文件/资源节点上的右键菜单中可进行相应的各种操作，例如：编辑, 编译, 激活, 打开所在文件夹，如图2.5 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_007.jpg)

<p class="kb-image-caption">图2.5 项目管理器右键菜单</p>

（4）设计节点处直接双击鼠标打开文件或者右键菜单选择 **Open** 选项打开文件。例如：
- a) 项目管理器中双击 CFC 文件，即打开 **CFC 编辑器**主视图；
- b) 双击硬件配置器按钮，即进入硬件编辑器主视图，或在硬件配置器节点处右键菜单选择 **Open** 选项，如图 2.6 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_009.png)

<p class="kb-image-caption">图2.6 打开硬件配置器</p>

**B. 打开工程**

有三种方法打开一个工程：
（1）**通过 Recent Projects**：在 `File` 菜单下，可以找到 **Recent Projects** 菜单项，它列出了近期打开过的工程，在列表中可能找到你想要打开的工程。
（2）**通过工具栏**：点击 **Open Solution** 或 **Open ViGET Project** 按钮分别打开 ViGET V2.0 工程和 ViGET 工程。
（3）**通过主菜单**：在主菜单中点击 `File -> Open`。

**C. 工程常规操作**

在 **Project** 菜单下，有 **Search In Files…**, **Copy Project**, **Rename Project**, **Backup Project**, **Restore Project** 以及 **ViGET_V21 Properities…** 五个选项，分别用来对工程进行拷贝, 重命名, 备份, 恢复以及显示当前工程的属性页。

- **Search In Files…**：编译工程后，使用此选项可以在工程中与 CFC 文件对应的 POE 文件中搜索关键字，并在 **Error List** 窗口的 **Messages Pane** 中列出搜索结果，如图 2.7 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_011.png)

<p class="kb-image-caption">图2.7 搜索到的信息列表</p>

- **Copy Project**：用于拷贝工程，在弹出的对话框中可以编辑工程的名字以及存放的新路径，白色区域为可编辑区域，第一个白色区域用于更改拷贝后的工程名字，默认的会在被拷贝的工程名后加上"_COPY"；第二个为拷贝工程的目标路径。拷贝成功后，会提示用户拷贝成功，如图 2.8 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_010.png)

<p class="kb-image-caption">图2.8 Copy Project对话框</p>
- **Rename Project**：当重命名工程时，会提示用户是否保存当前工程，点击是（Y）选项后会弹出一个可以编辑工程新名称的对话框，在 **Rename Project** 对话框中输入新的工程名字即可，如图 2.9 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_012.png)

<p class="kb-image-caption">图2.9 Rename Project对话框</p>

- **Backup Project**：用于备份工程，备份文件后缀名为"*.BAK"，在 **Backup Project To** 对话框中可以选择工程文件备份的路径和名称，如图 2.10 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_016.png)

<p class="kb-image-caption">图2.10 Backup Project对话框</p>

- **Restore Project**：用于恢复后缀名为"*.BAK"的工程备份文件，在 **Restore Project** 对话框中可以选择需要被恢复的工程，接着会要求用户选择工程恢复到的具体路径，如图2.11 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_013.png)

<p class="kb-image-caption">图2.11 Restore Project对话框</p>

**D. 工程库编辑**

在 **Project** 菜单下，有 **Library** 菜单，在 **Library** 菜单下有 **Use In Current Project**, **Install New…** 和 **Uninstall Library** 选项。在项目管理器 **Libraries** 节点上右键菜单也会显示上述选项，如图 2.12 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_014.png)

<p class="kb-image-caption">图2.12 工程库编辑菜单</p>

用户可以将 ViGET 工程全部复制到 `Openpcs.520\lib` 目录下，这样在 Libraries 节点下就会显示已经加载的工程库，也可以通过 **Install New…** 菜单加载工程库，此时如果工程库中包含 CFC Function Block，则在工程管理器窗口中显示。反之可以通过 **Uninstall Library** 选项将工程库从 `Openpcs.520\lib` 目录下移除，同时在工程管理器中也不再显示。

**Use In Current Project** 选项用于激活工程库，此时工程管理器窗口中工程库的状态将处于激活状态（红色），同时也会显示在 **POUs 窗口**中，如图 2.13 所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_015.png)

<p class="kb-image-caption">图2.13 工程管理器和POUs窗口工程库显示</p>
#### 2.2.3 文件（Files）

新建设计文件通过工程节点右键菜单完成，在 ViGET V2.0 工程工具软件中可添加 **CFC Program**, **Station Configuration** 等文件。在项目管理窗口中 ViGET V2.0 工程节点，右键菜单选择 `Add -> Add New Item…` 可以看到三个文件类型，如图2.14 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_015.png)

<p class="kb-image-caption">图2.14 添加新文件窗口1</p>

通过 `File/Copy` 可以复制 CFC 文件，在弹出的对话中可以编辑 CFC 的名字，同时也会提示选择 Link 到哪个 CPU 上。当创建一个空工程或工程中没有 Station 时，此时 **Add New Item** 的对话框中多出了"Station Configuration"文件类型，这个因为一个工程只能有一个 Station，如图2.15 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_017.png)

<p class="kb-image-caption">图2.15 添加新文件窗口2</p>
### 2.3 功能块管理器（POUs Catalog）

**功能块管理器**（POUs Catalog）是一个将功能块插入到 **CFC 程序**的一个工具。POUs Catalog 在工程浏览中的下方可见。如果没有，则选择 `View -> ViGET POUs` 则可显示出来。通过使用功能块管理器，可以用拖拉方式将功能块插入到程序中。使用功能块管理器或通过菜单来插入功能块。功能块管理器用于功能块管理，当所有的功能块添加进固件库时，即可在编辑 CFC 文件时从功能块管理器中添加所需的功能块。功能块管理器全面支持 **Catalog Categories** 和 **Catalog** 的按字母排序，支持多级 Category；支持根据 Catalog 名称和 Category 的快速查找；界面更新采用差别更新的方式，取消无谓界面刷新，有更好的用户体验。功能块管理器分类说明，如图 2.16 所示：
- **Source**：原 ViGET 的 POUs 的内容；
- **Category**：根据分类来组织功能块；
- **All**：所有 Catalog 按照字母排序。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_018.png)

<p class="kb-image-caption">图2.16 POU功能块管理结构示意图</p>

**功能块管理器的使用**：
- 上方浅黄色底色文本框，用于输入功能块名称，进行快速查找，如图 2.17 所示；
- 查找不区分大小写，部分匹配；
- **ESC** 键隐藏条件文本框，回车键定位当前选中的 FB；
- 也可以将该文件存放在"\Openpcs.520\MODULES\XJ_CP3000\"等硬件类型相关的目录中，这样可以实现不同的硬件类型采用不同的 Category 定义文件；
- 支持多级分类信息。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_019.png)

<p class="kb-image-caption">图2.17 POU快速搜索功能块功能</p>
### 2.4 CFC 树图显示（Show CFC TreeView）

在工具栏上点击 **Show CFC TreeView** 图标，即可弹出 **CFC 树图**，如图2.18 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_021.png)

<p class="kb-image-caption">图2.18 CFC树图显示窗口</p>
### 2.5 CFC 列表显示（Show CFC ListView）

在工具栏上点击 **Show CFC ListView** 图标，即可弹出 **CFC 列表**，如图2.19 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_022.png)

<p class="kb-image-caption">图2.19 CFC列表显示窗口</p>
### 2.6 Chart Hierarchy

**Chart Hierarchy** 主要用于列出工程中所有的**复合模块**，如图 2.20 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_024.jpg)

<p class="kb-image-caption">图2.20 Chart Hierarchy窗口</p>

当保存 CFC 文件时，会刷新这个对话框中的信息。这些复合功能块可以通过向任何打开的 CFC 文件拖拽而再次被使用，如同普通功能块一样。拖拽只是将复合功能块复制到一个新的位置，其名字和所有包含的功能块都会自动的全部复制。

---

## 三, CFC 文件编辑（CFC Editor）

### 3.1 CFC Editor 介绍

ViGET V2.0 工程工具软件是一个用图形化创建自动化程序的设计工具。CFC 图的主要元素是一些能够在图上自由排列的模块（功能块, 用户自定义模块和复合模块）和将一个输出和一个或多个输入连接的连线。

### 3.2 CFC 双屏显示

CFC 的双屏显示能够使用户更方便地编辑 **CFC 文件**，可以通过点击工具条 **Show CFC Dual View** 按钮实现，这样用户可以在同一个界面中编辑同一个 CFC 文件的不同页面。在屏幕的左侧显示的是 CFC 文件的第 1 页，右侧则显示的是 CFC 文件的第 4 页，用户可以通过点击功能块的管脚，进行连线等编辑，CFC 文件的编辑与单屏显示的 CFC 文件编辑方法一样。当 CFC 文件以双屏显示时，按钮会显示为被选中状态，再次点击按钮时，CFC 文件显示将还原为单屏显示状态，同时按钮也恢复为未选中状态。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_025.png)

<p class="kb-image-caption">图3.1 CFC双屏显示窗口</p>
### 3.3 CFC 适合界面显示

除了 CFC 文件的双屏显示外，CFC 编辑器还支持适合宽度, 高度, 页面和原始大小等显示方式。可通过 `Edit -> Fit To View` 选择需要的显示方式，如图 3.2 所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_026.png)

<p class="kb-image-caption">图3.2 CFC适合界面显示菜单</p>

也可以通过工具条按钮选择需要的显示方式，如图 3.3 所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_027.png)

<p class="kb-image-caption">图3.3 CFC适合界面显示工具条按钮</p>
- **Fit To Width**：CFC 文件的宽度适合屏幕的显示宽度；
- **Fit To Height**：CFC 文件的一页的显示高度适合屏幕的显示高度；
- **Fit To Page**：CFC 文件的一整页能够在界面中完全显示；
- **Original Size**：显示为 CFC 文件的原始大小。

### 3.4 模块的使用

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_027.png)

<p class="kb-image-caption">图3.4 模块示意图</p>

如图3.4 所示为 CFC 图中的几个基本模块示意图，针对 CFC 文件可以通过右键菜单或 CFC View 工具菜单做如下操作：

<p class="kb-image-caption">图3.5 CFC View工具菜单</p>
- 向你的 CFC 图中加入模块，右键菜单选择 `Insert Function Block…` 或 `Insert Text Block` 或 `Insert Page Content Text Block` 或 `Insert Compound Block`，也可通过上图中工具条按钮进行操作。
- 鼠标光标发生变化时，在想要插入新模块的地方单击鼠标左键。
- 重新排列模块，选择模块并拖拉它们到新的位置。
- 当添加新模块或移动已有模块的时候，CFC 编辑器会适当移动边上的已有模块来腾出空间。
- 从图上移除模块时，选择想要移除的模块点击鼠标右键选择 **Delete**。
- 双击一个模块将出现模块属性，如图 3.6 所示，可以更改模块的类型, 名字和注释。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_030.png)

<p class="kb-image-caption">图3.6 模块属性窗口</p>
### 3.5 功能块连线说明

连接两个功能块，先选择一个功能块的某个输出管脚（输入管脚），再选择另一个功能块的某个输入管脚（输出管脚），若两个管脚类型相同或兼容，则可完成两个管脚之间的连线。ViGET V2.0 工程工具软件支持多线连接。如图 3.7 所示。

<p class="kb-image-caption">图3.7 功能块连接示意图</p>

选中一个输入或输出管脚，右键菜单选择 **Properties** 属性或双击某个管脚，如图3.8 所示为块连接属性。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_030.png)

<p class="kb-image-caption">图3.8 模块连接属性窗口</p>

除了以上方式建立两个功能块管脚连接外，一个功能块的管脚也可以拖放到另一个管脚建立连接，允许的行为如下：
- 拖一个输入到另一个输出，反之亦然；
- 在一个页面内，用户可以通过拖放输入到另一个类型一致且没有连接线的输入来移动已存在的连线；
- 在一个页面内，用户可以通过拖放输入到另一个类型一致且没有连接线的输入，与此同时按住"**Ctrl**"键来复制已存在的连线；
- 在一个页面内，用户可以通过拖放输出到另一个类型一致的输出来移动已存在的连线。

### 3.6 CFC 文件补充说明

#### 3.6.1 文本模块（Text Block）

在空白处右键菜单选择 `Insert Text Block` 来插入一个文本模块。一个文本模块只是一个说明文本，而不能添加任何执行代码。双击文本模块可以在其中编辑文本，添加想要说明的文字，如图 3.9 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_033.png)

<p class="kb-image-caption">图3.9 文本编辑模块</p>
#### 3.6.2 使用常数作为输入

使用一个常数作为一个模块的输入，选择输入端，右键菜单选择属性并在默认值项的编辑区域输入常量值。

#### 3.6.3 执行顺序

CFC 文件中 Function Block 的执行顺序是根据 Tree View 窗口中 Function Block 的上下位置来确定，如图 3.10 所示。根据需要，我们可以拖动 Function Block，通过改变它的上下位置来改变它的执行顺序。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_034.png)

<p class="kb-image-caption">图3.10 模块执行顺序图</p>

在有复合模块的地方，复合模块在执行顺序中将作为一个整体来执行。复合模块的内容将以同样的规则执行本身，这个与现代编程语言中的子程序相同。

#### 3.6.4 替换模块

CFC 编辑器支持一个功能块或一个用户自定义模块替换成另一个类型的模块，选中模块，右键菜单选择 `Replace Function Block…` 选项。一个类似于 Insert Functionblock 的对话框将出现，允许用户从已知的功能块和用户自定义模块中选择想要的新模块类型。在选择新的模块类型后，另一个对话框将显示，在替换后允许用户将原来的旧模块的连接映射到新模块之间的连接。对话框的最后一列列出了旧模块类型的连接线的数据类型。用户可以为旧模块类型的每个连接线分配相应的连接线。注意，每个模块的每个连接线只能被分配一次。在选择 CFC 编辑器的 **OK** 后，在任务对话框中将详细列出新的模块类型和重新连线。

#### 3.6.5 隐去没有使用到的连接点

为了使功能块之间的连接更清晰简洁，可在 CFC 编辑界面右键菜单选择 `Toggle Unused Connectors` 选项，或点击 CFC View 工具条中的 **Toggle Unused Connectors** 按钮来显示/隐藏所有没有使用到的连接点，如图 3.11, 图3.12, 图3.13 所示。没有任何连接线和值的连接点即为没有使用到的连接点。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_035.png)
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_040.png)

<p class="kb-image-caption">图3.11 CFC View工具条Toggle Unused Connectors</p>

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_037.png)

<p class="kb-image-caption">图3.12 显示没有使用的连接点</p>

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_047.png)

<p class="kb-image-caption">图3.13 隐藏没有使用的连接点</p>

#### 3.6.6 隐藏/显示栅格

在 CFC 图中右键菜单选择 `View/Hide Grid` 项，将在显示或隐藏栅格间切换。栅格的显示可以帮助各个模块放置和排列位置。如图 3.14, 图 3.15 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_039.png)

<p class="kb-image-caption">图3.14 显示栅格</p>

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_039.png)

<p class="kb-image-caption">图3.15 隐藏栅格</p>
#### 3.6.7 复制或移动页面

在 CFC 文件中有个特殊的功能，可复制或移动一个 CFC 文件中的一个或多个页面到另一个 CFC 文件中，可通过 CFC 编辑界面上的右键菜单 `Copy/Move Page` 实现，如图3.16 所示：

<p class="kb-image-caption">图3.16 Copy/Move Page</p>

在一个源 CFC 文件上右键菜单选择 **Copy/Move Page**，将此 CFC 文件复制或移动到目标文件上。通过下图的对话框选择源页面（Source）和目标页面（Target）需要复制或移动的页面范围，如图 3.17 所示。

> **注**：目标 CFC 文件（Target->Plan）当前必须处于打开状态，否则不可选。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_041.png)

<p class="kb-image-caption">图3.17 Copy/Move Page</p>

> **注**：页面的复制或移动不包括与其他页面的连线, **Shared Memory 变量**, I/O 地址和全局变量，连线必须由用户在复制或移动后手动添加。

#### 3.6.8 bool 类型管脚值取反

为了方便编程人员设置或改变 bool 类型的管脚值，点击 CFC View 工具条上的 **Negate Input** 按钮即可将 bool 类型的输入管脚值取反，如图 3.18 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_042.png)

<p class="kb-image-caption">图3.18 输入管脚取反</p>
### 3.7 复合模块

#### 3.7.1 复合模块介绍

复合模块是一个组织应用程序的方法。CFC 编辑器的编辑区域只有一个页面的宽度。通过选择纸张的大小，决定水平放置模块的数量。一个功能图表垂直方向可以无限延伸。尽管实际中 CFC 图的长度没有限制，但是在一个很长的图中很难看清图的全貌。复合模块能够更好地组织程序，隐藏复合模块内部的相关逻辑模块组。一个复合模块内部的模块之间的信息，在外面是不可见的。在一个复合模块的外部，只有进入或离开该复合模块是可见的。

#### 3.7.2 创建复合模块

创建一个新的复合模块：
（1）在 CFC 编辑器界面空白处，右键菜单选择 `Insert Compound Block`，或点击 CFC View 工具条中 **Insert Compound Block** 按钮，如图3.21 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_043.png)

<p class="kb-image-caption">图3.19 插入复合模块</p>

（2）光标变化，如图3.22 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_044.png)

<p class="kb-image-caption">图3.20 光标变化</p>

（3）在想要新建复合模块的地方点击鼠标，如图3.23 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_045.png)

<p class="kb-image-caption">图3.21 放置复合模块</p>
#### 3.7.3 复合模块使用

在复合模块中可以编辑其他许多模块，如功能块, 文本，也可以插入复合模块。对于复合模块中的复合模块，我们也可以在其中添加其它模块。通过复合模块的使用可以使得 CFC 文件更有层次感，上下逻辑更加清楚。

（1）**进入复合模块**：选中复合模块，点击 CFC View 工具菜单中的 **Level Down** 按钮即可进入复合模块中编辑，或者选中复合模块，右键菜单选择 **Level Down** 选项，如图3.24 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_046.png)

<p class="kb-image-caption">图3.22 复合模块Level Down</p>

（2）**进入上一层**：当进入复合模块后，同样也可以回退到复合模块的上一层。在复合模块中，点击 CFC View 工具菜单中的 **Level Up** 按钮即可回退到复合模块的上一层，或者在 CFC 编辑界面的空白处右键菜单选择 **Level Up** 选项，如图3.25 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_047.jpg)

<p class="kb-image-caption">图3.23 复合模块Level Up</p>

（3）**编辑复合功能块**：当添加一个复合功能块后，选中该复合功能块，右键菜单选择 `Chart Interface…` 选项，可对复合模块添加对外的连接接口，如图3.26 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_057.jpg)

<p class="kb-image-caption">图3.24 Chart Interface菜单</p>

如图3.27 所示，在 **Chart Interface** 对话框中可定义复合功能块的输入输出接口，设置其名称, 数据类型和初始值。

<p class="kb-image-caption">图3.25 Chart Interface对话框</p>

### 3.8 页内容文本块

CFC 编辑器为用户提供了一种特殊的标注方式，称为"**页内容文本块**"。这种文本块区别于普通文本模块，普通文本模块倾向于对一个页面中某个小模块进行标注，如功能块和复合功能块。页内容文本块是对整页或对一页的大范围内容的说明。

**页内容文本块的插入**：在 CFC 编辑器界面空白处，右键菜单选择 `Insert Page Content Text Block` 选项，或点击 CFC View 工具条中 **Insert Page Content Text Block** 按钮，如图3.28 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_061.png)

<p class="kb-image-caption">图3.26 Insert Page Content Text Block</p>

页内容文本块用淡蓝色显示，用来区别普通文本模块（淡黄色显示），如图 3.29 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_063.png)

<p class="kb-image-caption">图3.27 页内容文本块</p>

当页内容文本块被修改或删除的时候，CFC 编辑器会在第一层, 第一页自动生成或修改页面内容总览。如果删除了所有的页内容文本块，CFC 编辑器会自动删除页内容总览。在页内容总览界面中列出了一个 CFC 文件中所有页面的页内容文本，包括复合功能块里面的。总览中列出了页码以及复合功能块的位置路径信息等，如图3.30 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_052.png)

<p class="kb-image-caption">图3.28 页内容总览</p>

每个页内容文本块都会在总览页面生成一行目录，如果文本块中含有回车，回车在总览页面显示时将被移除。如果文本中的内容长度超过了总览页面一行的长度时，内容将被截断省略。页内容建议使用简短的描述语言，这样在总览页中看起来更清晰。如果一个总览页面放不下所有的页内容文本块的内容，总览页则被分成多个页面显示。当打印 CFC 文件的时候，总览页面当然也是输出文件的一部分。

### 3.9 CFC 功能模块（用户功能块）

#### 3.9.1 CFC 功能块创建

CFC 编辑器可以用来创建用户功能块，即 **CFC 功能块**，由 CFC 语言组成，是工程的一部分。通过点击 `File -> New -> File…` 创建 CFC 功能块，或在工程节点上右键菜单选择 `Add -> Add New Item…` 选项，如图 3.31 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_053.png)

<p class="kb-image-caption">图3.29 CFC Function Block 创建</p>

编辑 CFC 功能块与编辑 CFC 文件类似，但有以下不同之处：
- 不能使用 **Shared Memory 变量**, I/O 连接, 外部连接和全局变量；
- 使用了 CFC 功能块的功能块不能作为一个任务，因为 CFC 功能块是作为一个整体放入程序中的，同时，Runtime 配置编辑器不能用来定义功能块的运行速率，且只能显示一个任务级；
- CFC 功能块必须定义一个输入或输出接口；
- "Connect to"对话框只允许插入连接功能块的输入或输出接口。在功能块内部使用右键菜单 `User FB Interface` 来创建 CFC 功能块的输入或输出接口，如图 3.32 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_054.png)
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_064.png)

<p class="kb-image-caption">图3.30 CFC Function Block 接口编辑菜单</p>

如图 3.33 所示，定义一个 CFC 功能块的输入输出接口，可设置每个变量的名称和数据类型，输入接口还可设置初始值。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_055.png)
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_065.png)

<p class="kb-image-caption">图3.31 CFC Function Block 输入输出编辑窗口</p>

只有当输入输出接口与 CFC 功能块内部的功能块管脚相连后，在 CFC 功能块的外部才能看到这些输入输出接口，如图 3.34 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_056.png)

<p class="kb-image-caption">图3.32 内部功能块与对外的输入输出接口连接</p>

在完成了 CFC 功能块后，为了确保功能块的正确性，需要使用 **Syntax Check** 对功能块进行语法检测，如图 3.35 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_057.png)

<p class="kb-image-caption">图3.33 Syntax Check菜单</p>
#### 3.9.2 CFC 功能块使用

在 **POUs 窗口**中可以看到 Project 节点下出现了用户自己定义的 CFC 功能块。在编辑其他 CFC 文件时，可将自定义的功能块与其他功能块一起使用，如图3.36 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_059.png)

<p class="kb-image-caption">图3.34 CFC 功能块使用</p>
### 3.10 CFC 文件打印

通过点击 `File -> Print…` 打印 CFC 文件，或点击 **Standard** 工具条上的 **Print** 按钮可打印 CFC 文件，如图 3.37 所示。一个 CFC 文件的打印输出包括所有层的 CFC 文件，包括复合功能块中的子 CFC 文件。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_060.png)

<p class="kb-image-caption">图3.35 打印菜单项</p>

通过点击 `File -> File Properties` 编辑 CFC 文件的属性信息，如添加作者姓名和 CFC 文件的描述信息，如图 3.38 所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_061.png)

<p class="kb-image-caption">图3.36 CFC文件属性</p>

通过点击 `File -> Print Setup…` 设置打印输出的内容和颜色，**Print Setup** 对话框的 **Paper format** 选项卡如图 3.39 所示，可选择打印纸张的大小，是否含有边界空白，纸张方向以及是否彩色打印。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_062.png)

<p class="kb-image-caption">图3.37 打印设置菜单项1</p>

**Print Setup** 对话框的 **Labeling fields** 选项卡如图3.40 所示，用于设置文件的页眉和页脚信息。页眉页脚分成三个区域：左边, 中间和右边，用户可以通过相应属性编辑信息。页眉中间默认显示文件名称；页脚左边默认显示打印日期；页脚右边默认显示页码信息。除此之外，页眉的左边和右边可以由用户通过按钮选择需要添加的信息，同时页脚的中间也可以通过同样的方式添加相关打印信息。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_063.png)

<p class="kb-image-caption">图3.38 打印设置菜单项2</p>

如图 3.41 所示为打印出来的效果图，页面顶部的为页眉，最底部的为页脚，左侧的是文件的描述信息，在页脚上方的文字为文件的作者, 路径等信息。

---

## 四, 硬件配置器功能介绍与使用

**硬件配置器**主要为 ViGET V2.0 工程配置和编辑硬件信息，由硬件库和硬件配置编辑器组成。硬件库为硬件配置编辑器提供可以使用的硬件模块。硬件配置编辑器则为工程配置各个硬件模块及其参数。打开 ViGET V2.0 工程的 Station Configuration File（.hwconfig 文件）即可打开硬件编辑器窗口，硬件库窗口可通过点击 `View -> Hardware Library` 打开。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_064.png)

<p class="kb-image-caption">图4.1 硬件配置器示意图</p>
### 4.1 硬件配置器文件说明

硬件配置文件（*.hwconfig 文件）是 ViGET V2.0 工程中配置硬件架构组成的一个文件，可以配置各个硬件的属性，以及各硬件之间的父子关系。硬件库由 .hwlib 文件生成，具体参见硬件配置器设计文档。

### 4.2 硬件配置器使用说明

1. **在 ViGET V2.0 工程中添加 .hwconfig 文件**：当我们新建一个空 ViGET V2.0 工程或工程中没有任何硬件配置文件时，在工程节点处，右键菜单选择 `Add -> Add New Item…`，在 **Add New Item** 对话框中选择 **Station Configuration** 并设置文件名称，如图4.2 所示；

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_065.png)

<p class="kb-image-caption">图4.2 添加 .hwconfig文件窗口</p>

2. 添加成功，自动打开硬件配置编辑器窗口和硬件库窗口，有较好的窗口关联性，也可通过双击 Station 打开编辑器界面；
3. **从硬件库中拖拽硬件**：从硬件库中拖拽一个 Rack 类型的硬件，当选中某个硬件后，硬件编辑器窗口硬件可放置处会变成绿色，表示可以放置某个硬件；
4. **放置 CPU 或其他子硬件**：在硬件库中选中某个硬件时，硬件编辑器相应的颜色会变成绿色；点击保存后，在项目管理器中的工程节点下也会添加已放置的 CPU；

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_066.png)

<p class="kb-image-caption">图4.3 硬件编辑器窗口</p>

5. **配置硬件属性**：通过属性窗口，对硬件编辑器中的硬件属性进行编辑，属性窗口可通过点击 `View -> Properties Window` 打开。如图4.4 所示，深色字体表示硬件属性可编辑。硬件属性设置方便，属性窗口各个属性显示直观；属性分类清晰，属性值选择方式多样，例如枚举类型。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_067.png)

<p class="kb-image-caption">图4.4 硬件编辑器属性窗口</p>

6. **常用操作支持**：硬件配置器支持硬件模块的复制, 剪切, 粘贴, 删除和移动等操作。当按住 **Ctrl** 键移动模块时，会达到复制的效果。

   > **注**：若当前选中的硬件为活动的 CPU，则不能对其进行删除和剪切操作。

7. **多级 Undo/Redo**：硬件配置器支持多级 Undo/Redo，也可以单步回退，不管是对硬件编辑器还是对硬件属性的编辑，都可以撤销多级操作，使得用户在配置硬件的时候灵活方便。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_068.png)

<p class="kb-image-caption">图4.5 硬件编辑器多级Undo/Redo操作</p>
### 4.3 硬件配置文件打印

**Print Setup** 对话框包含 **Paper format** 和 **Labeling fields** 选项卡，可根据需要对所要打印的硬件配置信息进行设置。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_069.png)

<p class="kb-image-caption">图4.6 &quot;Paper format&quot;选项卡</p>

如图4.6 所示，在 **Paper format** 选项卡中，可根据需要选择所要打印的内容，并对页脚页眉, 标题和字体分别进行设置，对上下左右边距进行调整以便装订成册。具体内容如下：

**Print Range**
- **All**——打印硬件配置信息的所有相关内容。
- **Module description**——只打印模块的槽位, 名称, 类型和功能描述。
- **Order list**——只打印所用到模块的一个清单。

**Option**
- **With parameter description**——可选项，勾选后将在打印内容中包含各模块的详细参数信息，可以配合 All 或 Module description 使用。

**Font Settings**
设置所要打印的页脚页眉, 标题和字体，包括字体类型和大小。具体操作方法如下：
1. 从列表框中选择需要设置的内容
2. 从 Family 下拉框中选择需要的字体类型
3. 从 Size 下拉框中选择需要的字体大小

**Margin**
- Top——设置上边距
- Bottom——设置下边距
- Left——设置左边距
- Right——设置右边距

如图 4.8 所示，在 **Labeling fields** 选项卡中，可对页眉, 页脚和标题进行设置。可手动编辑页眉页脚中的内容，也可点击右侧按钮，在弹出的菜单中选择比较常规的页眉页脚信息。点击 **Default** 按钮可将所有设置变成默认设置。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_070.jpg)

<p class="kb-image-caption">图4.7 &quot;Labeling fields&quot;选项卡</p>

---

## 五, Shared Memory 变量编辑与使用

### 5.1 Shared Memory 变量编辑

在 **Shared Memory 变量编辑器**中，可以定义多个不同数据类型的 **Shared Memory** 变量，Shared Memory 变量可以用在 cp 系统目标硬件中。每个 Shared Memory 变量都有其独一无二的名字, 相应的数据类型, 访问模式和连接状态等。

> **注意**：Shared Memory 变量只能供 CP 系统（如 XJ_CP3000）目标硬件使用，若供 MS 系统（如 XJ_MS3000）目标硬件使用，会导致编译失败。

1. **打开 Shared Memory 变量编辑窗口**：可通过 `View -> Shared Memory` 菜单，或工具条按钮打开 Shared Memory 变量编辑窗口。
2. **Shared Memory 变量编辑**：
   - 使用 **Add** 按钮可添加变量，默认变量名为 var<n>，变量类型为 BOOL，访问模式为 Fast，可对变量的上述属性进行修改。**Connected** 属性是只读的，只有当此变量被使用时，才为被连接状态。
   - 使用 **Delete** 按钮可删除所选中的变量，只有当变量为未连接状态时才能被删除。
   - 在搜索域输入想要查找的变量，按 **Find Next** 按钮即可查找。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_071.png)

<p class="kb-image-caption">图5.1 Shared Memory 编辑窗口</p>

3. **Shared Memory 属性说明**：
   - **Fast**：Fast 属性用于数据传输的一致性，创建时默认的将 Shared Memory 设置为 Fast，则忽略了数据的一致性。Fast 的 Shared Memory 变量的更新值，其他 CPU 可以实时获得。当 Shared Memory 为非 Fast 变量时，所有的变量读写都进入了"一致性"模式，如他们通过数据一致性缓存系统进行数据传输。在中断任务中只能使用 Fast 的 Shared Memory 变量，不能处于"一致性"模式；在同一个 CPU 资源中不允许读写一个相同的 Shared Memory 变量，Shared Memory 变量只允许在不同 CPU 被读写。
   - **Connected**：当 Shared Memory 被使用时，Connected 属性会自动设置为 Yes.
   - **Comment**：用于描述 Shared Memory 变量的相关信息。

### 5.2 Shared Memory 变量使用

1. **在 CFC 文件中连接变量**：在 CFC 文件中，选中某个模块的引脚，点击右键菜单 `Connect to…`。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_072.png)

<p class="kb-image-caption">图5.2 引脚连接</p>

选择变量：由于模块的引脚是 INT 类型的，所以连接此引脚的变量也只能是 INT 类型的，在 Shared Memory 选型页中选择需要的变量，点击 **OK** 即可连接成功。

<p class="kb-image-caption">图5.3 变量选择</p>

2. **功能块引脚与变量连接成功**

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_095.png)

<p class="kb-image-caption">图5.4 引脚和变量连接</p>

---

## 六, Build

### 6.1 编译

当应用被修改的时候，如 **CFC 文件**被修改后，需要在 **CPU** 上执行以下几个操作：
- 编译
- 下载（参见[[#7.5 下载 Download|后续章节]]）
- 启动（参见[[#7.2 在线 Online|后续章节]]）

ViGET V2.0 没有自动编译或下载功能，所有动作都必须由用户来完成。对于编译有以下四个菜单：
- **Build Active CPU**：这个编译用于当前使用的 CPU 资源的增量编译，只编译最终修改过的文件。
- **Rebuild Active CPU**：重新编译所有属于当前使用 CPU 资源的文件。
- **Build All CPUs**：编译工程中所有 CPU 资源。
- **Rebuild All CPUs**：重新编译工程中所有 CPU 资源。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_075.png)

<p class="kb-image-caption">图6.1 编译菜单项示意图</p>

所有的编译结果都会在工程**输出窗口**中显示，如下图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_076.png)

<p class="kb-image-caption">图6.2 编译输出窗口</p>

编译成功后，在输出窗口的最后一行会报告 0 个失败（0 failed）。

---

## 七, Online 功能

ViGET V2.0 支持程序下载, 变量查看等 **Online 功能**，支持从项目管理器直接添加要查看的变量，支持从 **CFC Editor** 窗口直接拖拽要查看的变量，支持多 CPU 同时 Online，根据变量所属的 CPU，支持三种变量分组显示方式。下图为 **Build & Online** 工具条用于 Build 和 Online 的相关设置。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_077.png)

<p class="kb-image-caption">图7.1 Build &amp; Online工具条</p>

**Build & Online 工具条**从左至右选择框或按钮使用说明：
- **CPU 选择框**：选择需要编译或 Online 的 CPU；
- **Build Active CPU**：编译当前激活的 CPU；
- **Rebuild Active CPU**：重新编译当前激活的 CPU；
- **Build All CPUs**：编译所有 CPU；
- **Rebuild All CPUs**：重新编译所有 CPU；
- **Build Stop**：暂停编译；
- **Active CPU Properties**：设置当前激活 CPU 的属性；
- **Online Active CPU**：连接 Online 当前激活 CPU；
- **PC->PLC (Download To RAM Only)**：只下载至内存中但不保存在系统中；
- **PC->PLC (Download And Save System)**：下载并保存在系统中；
- **Cold Start**：冷启动；
- **Warm Start**：温启动；
- **Hot Start**：热启动；
- **Task Monitor**：数据监测，在 Online 时可显示/隐藏引脚值。在 ViGET V2.0 主菜单 **Online** 和 **PLC** 中也有对应的菜单项。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_078.png)

<p class="kb-image-caption">图7.2 Online菜单项</p>

在 PLC 菜单下添加了 **Connections**, **PLC Info**, **PLC Resource Info** 等菜单。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_119.png)

<p class="kb-image-caption">图7.3 PLC菜单项</p>

### 7.1 CPU 属性设置

为了使程序成功下载到目标 CPU 板中，需要一个硬件平台。在下载程序前，必须对目标 CPU 进行属性设置。

1. 点击 Build & Online 工具条中的 **Active CPU Properties** 图标，如果工具条没有显示，则可在工具栏的空白处点击右键选择需要的工具条。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_080.png)

<p class="kb-image-caption">图7.4 CPU属性设置菜单</p>

2. CPU 属性包括一般属性, 周期设置, 时钟设置, 执行顺序, 连接等几类属性，具体设置如图所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_125.png)

<p class="kb-image-caption">图7.5 CPU属性设置窗口</p>

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_083.png)

<p class="kb-image-caption">图7.6 周期设置</p>

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_083.png)

<p class="kb-image-caption">图7.7 时钟设置</p>

IP address 依据实际的目标 CPU 板的设计，且 PC 机 IP 要同板卡 IP 处于同一个 IP 段。

**ESP 板卡正确配置**如图7.10, 图7.11 所示：
- Baud Rate 115200
- 8/None/1/no protocol
- No CRC
- No Via USB

串行通讯端口（COM Port）的选择取决于运行 ViGET（工程工作站）的个人电脑。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_086.png)

<p class="kb-image-caption">图7.10 CPU属性设置窗口</p>
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_087.png)

<p class="kb-image-caption">图7.11 CPU连接设置</p>
### 7.2 在线 Online

CPU 资源 Online 表示该 CPU 建立起在线连接，并且使能对加载程序的在线监测，或者使得用户能够向 CPU 下载一个新的程序。点击 `Online -> Online Active CPU` 使工程与 CPU 连接或断开。如果 CPU 中程序没有修改，在输出窗口中只显示一些信息，在线监测将被使能。如果当前 ViGET V2.0 工程与 CPU 中的 ViGET V2.0 工程不同，ViGET V2.0 将弹出如下对话框：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_088.png)

<p class="kb-image-caption">图7.12 Online提示</p>

在此情况下，在线监测对现在编译工程不起作用，只能使用当前下载的工程中的已有数据，下载工程中的所有数据是可以被监测的；其他在变量观测窗口和 CFC 文件中的管脚值将显示为"<n/a>"（不可获得）。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_130.png)

<p class="kb-image-caption">图7.13 变量值不可获得</p>

### 7.3 Online 功能块设置

在 Online 运行时，CFC 编辑器默认不显示任何连接点的值，用户必须显示所有连接点的值，可以通过右键菜单"**Enable Watch**"来显示单个连接点的值。单个连接点的值可以通过右键 **Online Properties** 菜单来设置。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_090.png)

<p class="kb-image-caption">图7.14 Online Properties菜单</p>

通过快捷键"**Ctrl + Shift + W**"可以同时显示或隐藏所有连接点的值。在 Online 模式双击一个连接点可以打开该连接点的 **Online Properties** 对话框，如下图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_132.png)

<p class="kb-image-caption">图7.15 Set Variable窗口</p>

在"**Set Variable**"部分，可以手动的修改连接点的值，注意以下事项：
- 如果连接点是一个由输入点输入的输入点，那么此连接点的值将被其他输入重置；
- 如果连接点是一个由模块内部设置的输出点，手动设置的值将被模块重置。

"**Make Persistent**"只会出现在没有连接的模块输入连接点，选中它会有如下效果：
- 点击 **OK** 之后，新的值在 Online 时将被使用；
- 输入的值将被视为连接点的值为一个常量，当 CFC 文件被修改时，它必须手动保存修改；
- 运行系统会将保存修改的值在内存中，也就是说当工程重新启动后，修改值将会保留存在，工程被编译和下载后修改的常量值也同样会保留。

### 7.4 在线监视 Choose Online Edit/Monitoring

支持 CFC 的 **Online Consistent State**，在 Online 过程中，如果当前 CFC 文件被修改，再次点击 **Task Monitor** 按钮会提示 **Choose Online Edit** 的方式。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_133.png)

<p class="kb-image-caption">图7.16 Online Monitor</p>

- **Start Monitoring**：Online 执行的为未修改的 CFC 文件。

### 7.5 下载 Download

将程序下载到当前 CPU 有两种方式，分别为 **Download to RAM Only** 和 **Download and Save System**。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_093.png)

<p class="kb-image-caption">图7.17 Online Download</p>
- **Download to RAM Only**：将程序下载至当前 CPU 的内存中但并不保存程序，当重新启动程序后操作将消失，下次运行 CPU 时，运行的程序为先前保存在内存中的代码；
- **Download and Save System**：将程序下载并保存至 CPU 的内存中，在工程重新启动后当前程序会一直保存，下次运行 CPU 时，则运行此程序。

### 7.6 保存程序 Save System

当下载并保存应用程序到目标硬件的内存中，表明当重启或掉电/上电后，应用程序没有丢失仍然在存储空间中，且 CPU 重启后能够马上运行应用程序。在执行了 **Download to RAM Only** 后可以使用 **Save System** 来固化应用程序到目标硬件中，其结果与 **Download and Save System** 的效果是一样的。

> **注意**：Save System 只有在停止模式才能工作。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_094.png)

<p class="kb-image-caption">图7.18 Save System 和Erase</p>

由于 **Download to RAM Only** 只是将应用程序下载到了目标硬件中，但没有固化应用程序到硬件中，所以在硬件重启或掉电/上电后的执行结果与先前的结果是不一样的。当使用 **Download to RAM Only** 后选择 **Offline** 时，ViGET V2.0 会提醒用户是否保存应用程序到 PLC 中。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_095.png)

<p class="kb-image-caption">图7.19 Save System 提示</p>

为了保证当前程序固化到目标硬件中，就可以使用 **Save System** 来实现。当固化结束后，ViGET V2.0 在 5 秒后会自动关闭 **Save System** 对话框。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_096.png)

<p class="kb-image-caption">图7.20 Save System 关闭提示</p>
### 7.7 变量值观测

1. **Watch Variables 窗口**：在运行时，可通过 `View -> Watch Variables` 菜单打开 Watch Variables 窗口。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_097.png)

<p class="kb-image-caption">图7.21 Watch Variables窗口</p>

**Watch Variables 窗口**工具条从左至右菜单按钮说明：
- **Add Watch Variable**：添加需要观察的变量；
- **Watch Variable Properties**：设置变量属性；
- **Delete Watch Variable**：删除 Watch Variables 窗口添加的变量；
- **Show Variables in List Mode**：变量以列表模式显示；
- **Show Variables Grouped by CPU**：变量根据 CPU 分组显示；
- **Show Variables Tabbed by CPU**：变量根据 CPU 分 Tab 显示；
- **Set Number Format to Decimal**：变量数值以十进制显示；
- **Set Number Format to Hexadecimal**：变量数值以十六进制显示；
- **Set Number Format to Binary**：变量数值以二进制显示；
- **Set Number Format to Octal**：变量数值以八进制显示；
- **Set Selected Number Format to Decimal**：选中的数值以十进制显示；
- **Set Selected Number Format to Hexadecimal**：选中的数值以十六进制显示；
- **Set Selected Number Format to Binary**：选中的数值以二进制显示；
- **Set Selected Number Format to octal**：选中的数值以八进制显示；
- **Variable Running Graph**：变量运行曲线。

2. **添加观察变量**：添加变量时，支持下拉列表选择；可以直接从项目管理器添加选中的变量；可以直接从 CFC Editor 中直接将管脚拖入 Watch Variable 窗口。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_098.png)

<p class="kb-image-caption">图7.22 变量添加</p>

3. **变量显示模式示意**

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_099.png)

<p class="kb-image-caption">图7.23 列出所有变量</p>
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_100.png)

<p class="kb-image-caption">图7.24 根据CPU分组显示</p>
### 7.8 保护定值单观测与编辑

1. **Protection Setting Value 窗口**：在运行时，可通过 `View -> Protection Setting Value` 菜单打开 Protection Setting Value 窗口。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_102.png)

<p class="kb-image-caption">图7.26 根据CPU分TAB显示</p>

**Protection Setting Value 窗口**工具条从左至右菜单按钮说明：
- **Mould**：打开保护定值单模板；
- **Add Row**：添加保护定值单的行；
- **Delete Row**：删除保护定值单空白行；
- **Add Project Variable**：添加需要观测的变量；
- **Delete Project Variable**：删除保护定值单某行的变量信息；
- **Save As**：保存保护定值单。

2. **添加观测变量**：添加变量时，支持下拉列表选择，选择要添加的行，直接从项目管理器添加选中变量；可以直接从 CFC Editor 中直接将管脚拖入到 Protection Setting Value 窗口的某行。
3. **编辑定制单**：双击观测值所在的行，能够编辑整定值, 定制单位, 定值名称等。

### 7.9 刷新率 Online Refresh Rate

**Online Refresh Data** 菜单用于设置 CFC 文件中功能块管脚数据显示的刷新频率。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_103.png)

<p class="kb-image-caption">图7.27 Online Refresh Data</p>
### 7.10 Online Variable Graph

#### 7.10.1 Online Variable Graph 菜单

除了可以观察变量外，还可以通过图形的方式查看不同时间的变量值，通过菜单 `Online -> Online Variable Graph` 或观测变量窗体的工具条按钮查看变量的趋势图窗口。当 Online，并在变量观察窗口中添加了需要观察的变量，Graph 菜单会点亮，每个 Graph 对应一个变量。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_104.png)
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_151.png)

<p class="kb-image-caption">图7.28 Variable Online Graph菜单</p>

同时，在检测变量的窗体中添加了 **Online Variable Graph** 菜单。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_105.png)
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_153.png)

<p class="kb-image-caption">图7.29 Variable Online Graph窗口菜单</p>

#### 7.10.2 Online Variable Graph 使用

**注意**：
- 在 Online 模式时，若在观测窗体中有被选中需要进行监测的变量，才能使用 **Variable Online Graph** 菜单的下拉菜单；
- 在 Online 模式时，若没有选中要进行被监测的变量，Variable Online Graph 菜单的下拉菜单不可以使用；
- 在非 Online 状态时，**Variable Online Graph** 的菜单不能使用。在显示变量的趋势图窗体中会有将所选中变量的变量名字, 变量类型，变量所属 CPU, 变量所属功能块的信息显示。**Refresh Rate** 设置趋势图显示的刷新频率，其后面的开始显示或暂停显示按钮。窗体左侧是以数值方式显示检测变量，右侧是以折线图图形化的方式显示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_155.png)

<p class="kb-image-caption">图7.30 Online Variable Graph窗体</p>

在变量列表中选中一个变量后，点击 **Graph** 菜单，可在界面中看见此变量随时间变化的不同值，在不同的 Graph 窗口设定显示的速率，在同一时间可观察四个变量的趋势图，或可观测一个变量在四个不同时间段的趋势图。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_107.png)

<p class="kb-image-caption">图7.31 变量趋势图</p>

**Online Variable Graph 窗体 Tools 菜单项**：
- **Clear data**：将所有显示的数据清空。
- **Export data**：将显示的数据导出保存为 TXT 文档。
- **Fit to view**：调整显示状态，把最新绘制的点显示在可视区域。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_108.png)

<p class="kb-image-caption">图7.32 变量趋势图菜单</p>

**Online Variable Graph 右键菜单**：
- **Fit to view**：同上，快捷键 **Home**
- **Copy screenshot**：复制变量趋势图，快捷键 **F11**
- **Save screenshot**：保存变量趋势图，快捷键 **Ctrl+S**
- **Report feedback**：反馈报告

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_109.png)

<p class="kb-image-caption">图7.33 变量趋势图右键菜单</p>
### 7.11 PLC Connection 信息

支持 **PLC Connections** 的显示，并在 PLC 主菜单中添加了 **Connections** 菜单。下图即为 Connection 信息对话框，可添加或移除连接方式。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_110.png)

<p class="kb-image-caption">图7.34 Connections</p>
### 7.12 Info 信息

支持 **PLC Info** 的显示, **PLC Resource Info** 的显示, **PLC Firmware Library Info** 的显示。对于 Online 信息添加了如下菜单：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_111.png)

<p class="kb-image-caption">图7.35 PLC菜单</p>
- **PLC Info 信息显示对话框**

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_160.png)

<p class="kb-image-caption">图7.36 PLC Info</p>

- **PLC Resource Info 信息显示对话框**

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_164.png)

<p class="kb-image-caption">图7.37 PLC Resource Info</p>

- **PLC Firmware Library Info 信息显示对话框**

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_163.png)

<p class="kb-image-caption">图7.38 PLC Firmware Library Info</p>

### 7.13 下载固件 Download Firmware

**Firmware Download**（固件下载）用于向目标 CPU 板中下载系统固件。为了能够执行固件下载，用户需要有与相应 CPU 板对应的系统固件：
- **CP 平台**（EPU20 板卡）的镜像文件称为 **EPU20**。
- **MS 平台**（ESP 板卡）的镜像文件称为 **ESP.bin**。系统固件文件必须由板卡制造商/提供商提供。通过以下步骤可以完成系统固件的下载：

1. ViGET V2.0 必须使得目标 CPU 板卡处于连接状态，并且 PLC 必须处于停止模式，可通过工具条的按钮状态判断 PLC 所处的模式，如下图所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_115.jpg)

<p class="kb-image-caption">图7.39 PLC停止模式工具条按钮状态</p>

2. 选择菜单 `PLC -> Download Firmware`。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_116.png)

<p class="kb-image-caption">图7.40 Download Firmware菜单</p>

在打开文件对话框中，选择系统固件，并打开。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_117.png)

<p class="kb-image-caption">图7.41 打开镜像文件对话框</p>

3. 当打开镜像文件后，会有一个确认对话框，用于确认是否替换当前目标硬件中的固件，点击"是"确认。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_165.png)

<p class="kb-image-caption">图7.42 确认替换固件对话框</p>

4. 下载系统固件开始，会有如下图所示的进度对话框。在此过程中**务必不要将目标 CPU 断电或重启**！如果在此过程中断电或重启了，则目标 CPU 板卡将不能再运行，需要联系硬件的提供者或制造商。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_119.jpg)

<p class="kb-image-caption">图7.43 固件下载进度显示</p>

5. 当下载完成后，进度显示结束，并有 5 秒倒计时后，将自动关闭对话框。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_120.png)

<p class="kb-image-caption">图7.44 下载完成窗口</p>

为了能够运行新的固件文件，必须重启目标 CPU 板卡，重启 CPU 可以通过以下两种方法实现：
1. 可以使用 ViGET V2.0 软件的 `PLC -> Reboot PLC` 菜单实现，点击此菜单后，会有一个确认对话框，点击"是"则重启 PLC.ViGET V2.0 将自动 Offline，当 PLC 重启完成后可再次 Online.

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_179.jpg)

<p class="kb-image-caption">图7.45 确认重启对话框</p>

2. 重启 PLC 也可以通过将 PLC 断电，然后再上电来完成，或通过复位按钮。

### 7.14 诊断工具 Diagnostic Tool

诊断工具可通过 `Online -> Open Diagnostic Tool` 菜单打开，它用于加载和显示记录在目标 CPU 的异常处理系统中的错误信息，以及在目标 CPU 中运行数据。在诊断工具中显示的所有 online 数据都来自于 ViGET V2.0 当前 active 的资源。Online 数据只有与目标 CPU 建立 Online 关系时才能获得。当诊断工具被打开时，ViGET V2.0 仍然可以执行其他操作。在 ViGET V2.0 中无论什么时候建立或停止 Online 连接，诊断工具能够在 online 和 offline 模式之间切换。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_122.png)

<p class="kb-image-caption">图7.46 诊断工具菜单</p>

诊断工具共有三个选项页，分别为 **Error log**, **Exception Buffer** 和 **Performance Monitoring**，前两者的界面非常相似。Error log 和 Exception Buffer 选项页分别有 **Online** 和 **Offline** 两种模式。

#### 7.14.1 Error log，System Error Panel 和 Exception Buffer

如果当 ViGET V2.0 工程与目标 CPU 处于 Online 状态时打开诊断工具，工具的 Error Log 页面处于 Online 模式。刚开始其页面为空的列表，只有等待的信息，因为从目标 CPU 中传送错误日志数据需要几秒钟的时间完成。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_123.png)

<p class="kb-image-caption">图7.47 诊断工具</p>

当传送结束后，当前 CPU 中记录的所有错误信息都将显示在诊断工具中。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_124.png)

<p class="kb-image-caption">图7.48 Error Log</p>

错误列表可以按照列来排序，点击不同的列头可按照时间, 分类等进行升序或降序排序。显示的当前 PC 中错误信息列表都可以保存为一个文件，可点击"**Save As Log File**"完成。通过点击"**Load Log File**"选择先前保存的文件并查看，此时可能会处于 Online 或 Offline 模式。在加载了先前保存的日志文件后，诊断工具将处于 Offline 模式。Online 或 Offline 模式显示在诊断工具右上角的组合框中。如果诊断工具与 CPU 处于 Online 状态，则可以查看 CPU 传输过来的错误信息，工具可自动接收并显示当前 CPU 传送的所有错误信息。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_125.png)

<p class="kb-image-caption">图7.49 诊断工具Offline/Online切换</p>

如果没有与 CPU 处于 Online 连接，则组合下拉框不能选择。

"**System Error Panel**"和"**Exception Buffer**"的工作方式与 Error Log 类似，不同的是：

"**System Error Panel**"页面理论上与"Error Log"页面的内容一样，但有如下不同：
- Error Log 列出了每一条错误信息：同样的错误信息如果发生多次的话，就会被列出多次（除了不同的参数和时间）。
- Error Log 会溢出：当错误溢出时，会丢弃比较旧的错误信息。
- System error 页面每条错误信息只有一条记录，只有发生且没有被标识过的错误信息才会被记录。System error 页面不会记录每个错误出现的次数，也不会因为错误溢出而丢弃错误信息。
- System error 页面中，第一次出现的错误信息会用粗体字体显示出来。

"**Exception Buffer**"显示 CPU 的所有异常信息等，诊断工具会显示最近执行的功能块以及 CPU 重要寄存器的内容。

"Error Log", "System Error Panel" and "Exception Buffer"这三个界面的第一次刷新，当打开诊断工具之后第一次激活 tab 页时，它会自动就进行。使用"**Refresh**"按钮可从连接的 CPU 中获取最新的数据。

"Error Log", "System Error Panel" and "Exception Buffer"这三个界面使用"**Clear**"按钮将清除从连接 CPU 内存中获取的数据，然后诊断工具将被更新，显示的是一个空列表。三个界面中都各自有"Clear"按钮，点击当前页面的按钮只是清空了当前页面的列表项，清除每个界面中的内容需分别点击相应页面的"Clear"按钮。

#### 7.14.2 Performance Monitoring

点击 **Performace Monitoring** 选项页可查看从目标 CPU 中的执行监测数据，这个选项页只有当诊断工具与目标 CPU 处于 Online 时才有效。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_127.png)

<p class="kb-image-caption">图7.50 诊断工具菜单</p>

在 **Performance Monitoring** 选项页中可以查看以下不同类型的数据：
- **CPU 负载**：此项用于显示 CPU 执行负载应用程序所花的时间百分比。页面的右侧记录了此页面激活前的所有 CPU 负载值。
- **任务信息（系统任务）**：系统任务项显示了目标 CPU 上操作系统级别任务所执行的时间，这些操作系统任务为所有应用任务 I1…I8 和 T1…T5，加上一个系统模式任务和一个 T0 调度器任务。操作系统任务负责执行除了系统模式外其它所有任务模式的应用程序。
- **任务信息（细节）**：此项用于显示一个任务不同模式的执行时间。

  > **注**：这些项只有当目标 CPU 被激活在运行系统中时才能有效，只有固件的提供商才能激活这些设备，如果没有激活，则所有显示的值都为 0.

- **其他执行数据（定制测量）**：这些项的显示与其他执行测量不同，不同的固件版本会有不同的显示数据。

  > **注**：这些项只有当目标 CPU 被激活在运行系统中时才能有效，只有固件的提供商才能激活这些设备，如果没有激活，则所有显示的值都为 0. 每个数据的上传和显示都是由展开按钮（每项上面有向上/向下的箭头标志）控制的，只有当一个执行数据项被展开，它的数据将会从目标 CPU 上被上传，所有展开项的显示值将每秒上传一次。只有被上传或显示的执行数据项才是 CPU 负载，它总是可以见的而不需要折叠。CPU 负载也是唯一总是有效的，它不需要在目标 CPU 的运行系统上被激活。通过"**Save As CSV**"按钮保存执行数据，它将保存所有展开的执行数据项至一个文件，这个文件可以通过电子表格软件打开，如 Excel.

### 7.15 CRC 程序版本校验

**CRC** 版本校验功能是用来唯一性标记每个工程中 CPU 下的程序。每个工程程序中包含的 CPU 都有自己的 **CRC 码**，程序的逻辑关系和设置参数不变，则对应的 CRC 码也不会改变，如此每个工程版本程序都有对应的 CRC 码，确定各个工程所用程序的唯一性。在 Online 模式下，通过 **Output 窗口**或者菜单 `PLC -> Resource Information` 查看相应的 CRC 码，如图7.50, 图7.51 所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_127.png)

<p class="kb-image-caption">图7.50 Output窗口显示CRC</p>

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_196.png)

<p class="kb-image-caption">图7.51 Resource Information</p>

---

## 八, 工程统计（Project Statistics）

### 8.1 工程统计

一个工程的所有统计信息都将在 **Project Statistics** 窗口中列出，可以通过 `Tools -> Project Statistics` 菜单打开。工程统计窗口总共分为五个部分（用 Tab 页面表示）。

- **CPU Statistics**：CPU Statistics 页面用于显示每个 CPU 的应用信息，这个信息来源于 CPU 的 CFC 文件。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_129.png)

<p class="kb-image-caption">图8.1 CPU Statistics</p>
- **CFC Blocks**：CFC Blocks 页面列出了整个工程应用中所有 CFC 文件中所有功能块信息。双击列表中的条目可跳转至此模块所在 CFC 文件。点击列的顶端可将模块排序。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_130.png)

<p class="kb-image-caption">图8.2 CFC Blocks</p>
- **I/O Connections**：I/O Connections 页面显示了 CFC 文件中的所有 I/O 连接点，双击列表中的条目可定位至其所在的 CFC 文件。点击列的顶端可对列表排序。

- **Execution Time**：Execution Time 页面估算出了每个 CPU 执行需要的大概时间，根据每个 CPU 中使用的所有 CFC 文件信息统计计算而来。这个信息能够获取下载程序的 CPU 负载能力信息，如可以计算 CPU 还能加载多少程序。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_131.png)

<p class="kb-image-caption">图8.3 Execution Time</p>
- **Shared Memory**：Shared Memory 页面列出了所有 Shared Memory 的连接信息（并非 Shared Memory 变量）。通常每个变量列出了多行，这是依赖于每个变量被读或被写的地方数量。未连接的变量也会被列出，但没有连接信息。双击列表中的条目可定位至所在的 CFC 文件中，点击列表的顶端可将列表排序。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_202.png)

<p class="kb-image-caption">图8.4 Shared Memory</p>

**Project Statistics** 窗口中的 **Refresh** 按钮用于刷新工程中的所有统计信息。在比较大的工程中，刷新需要几分钟，刷新完成后会在 output 窗口输出完成信息。

---

## 九, 版本管理工具的介绍和使用

### 9.1 ViGET V2.0 版本管理工具介绍

ViGET V2.0 工程工具软件中集成了 **Git** 版本工具，使得 ViGET V2.0 工程**版本管理**更加方便。在 ViGET V2.0 工程工具软件中使用版本管理工具，需要通过 ViGET V2.0 菜单 `Tools -> Options` 对话框中的 **Source Control** 选项设置版本管理工具，在 **Current source control plug-in** 选择下拉框中选择 **Git Source Control Provider**。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_133.jpg)
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_206.jpg)

<p class="kb-image-caption">图9.1 Current source control plug-in选择</p>

选择后会在 Options 对话框中增加 ViGET V2.0 版本管理工具的 Git 设置对话框，如下图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_134.jpg)

<p class="kb-image-caption">图9.2 版本工具默认窗口</p>
### 9.2 ViGET V2.0 工程版本管理使用介绍

#### 9.2.1 本机版本管理使用

**使用人员**：单个工程人员

**版本管理步骤**：

**(1) 在本机创建版本库**

在工程节点选择鼠标右键选择 `Git -> Initialize New Repository` 创建版本管理库。同时查看工程所在的目录，发现库已经建好。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_135.jpg)

<p class="kb-image-caption">图9.3 本机版本库</p>

**(2) 添加/提交文件或文件夹**

- 选择右键菜单 `Git（master）-> Commit`，也可通过在工程中使用 **TortoiseGit** 将需要的工程文件以及文件夹添加进版本库中。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_209.jpg)

<p class="kb-image-caption">图9.4 提交本机版本库</p>

- 在 **Commit** 对话框中，首先写 **Message** 信息，以告知其他开发人员本次所提交代码的目的或意义，如下图所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_211.png)

<p class="kb-image-caption">图9.5 提交本机版本库信息</p>

- 将需要加入版本管理库的文件 Add 进来。如下图所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_138.png)

<p class="kb-image-caption">图9.6 添加文件</p>
- 点击 **OK** 即可，如 Commit 成功则会有如下对话框：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_213.png)

<p class="kb-image-caption">图9.7 提交成功</p>

- 此时在工程所在目录可看到文件已经被添加。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_214.png)

<p class="kb-image-caption">图9.8 工程提交成功</p>

当工程文件被修改，需要提交修改文件时，只需再次做第二个步骤即可。通过 Commit，可将每次的修改提交到本机，实现工程的版本管理。

**查看工程版本**

通过右键菜单 `Git（master）-> Show Log` 可查看工程版本历史记录。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_141.png)

<p class="kb-image-caption">图9.9 Show Log</p>
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_142.png)

<p class="kb-image-caption">图9.10 历史版本信息</p>
#### 9.2.2 本机和服务器端版本管理

**使用人员**：多个工程人员, 服务器

**版本管理步骤**：

**(1) 在服务器端创建版本库**

在服务器上创建版本库，可将某个已经添加进版本管理里的工程中的隐藏文件夹 .git（如案例一中的 .git 文件夹）拷贝到服务器上的某个目录下。或在服务器上创建一个空的版本库，然后再由某个工程人员在其本机上添加相关工程。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_143.png)

<p class="kb-image-caption">图9.11 服务器创建版本库</p>
- 使用 **Git Create repository here…** 在公共服务器上建立一个空版本库。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_144.png)

<p class="kb-image-caption">图9.12 创建空版本库</p>

**(2) 本机从服务器 Clone 工程文件**

工程人员从服务器上获取版本库，使用 **TortoiseGit** 右键菜单 `Git Clone…` 将服务器上的版本库拷贝下来。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_219.png)

<p class="kb-image-caption">图9.13 本机克隆服务器版本库</p>

设置 Clone 的源，下图中克隆的工程所在服务器的地址为 `D:\ViGETgit` 目录下，可通过 Dir 选择服务器以及工程所在目录。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_220.png)

<p class="kb-image-caption">图9.14 本机克隆服务器版本库</p>

**(3) Commit 提交修改的工程文件**

这步的操作同案例一中的步骤 2，Commit 动作只是将修改的工程文件提交到本机，还没有提交至服务器。

**(4) Pull 和 Push**

**Pull** 和 **Push** 对话框可通过项目管理器的右键菜单 `Git（master）-> Sync` 打开。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_147.png)

<p class="kb-image-caption">图9.15 提交本机修改</p>
![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_148.png)

<p class="kb-image-caption">图9.16 Pull和Push对话框</p>
- **Pull 获取服务器端代码**：若有其他工程人员向服务器提交了他们的代码修改，则在提交本机的代码修改时，需要将服务器上的最新代码获取下来，除了以上方法，还可在工程中通过右键菜单 `TortoiseGit -> Pull…` 即可。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_149.png)

<p class="kb-image-caption">图9.17 Pull和Push</p>
- **Push 向服务器提交代码**：待获取服务器端最新代码后，为了将本机的修改提交至服务器，可使用右键菜单 **Push**。通过多次的 Commit, Pull 和 Push 即可实现工程的版本管理。

#### 9.2.3 文件状态说明

在下图中，打上小勾的文件为在本机已经修改但没有提交的文件，文件左边有个图标的为本机版本库中的原始文件。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_221.png)

<p class="kb-image-caption">图9.18 文件管理状态</p>

#### 9.2.4 查看修改 log

- 通过右键菜单 `Git（master）-> Show log`，可以看到修改 log 的情况。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_151.png)

<p class="kb-image-caption">图9.19 Show Log菜单</p>
#### 9.2.5 Undo File Changes 和 Revert

- 当选中某个有修改的文件时，**Undo File Changes** 使能，其作用可将当前文件的修改去除，回退到版本库中此文件的最新版本。
- 右键菜单 `Git（master）-> Revert`，可以通过选择对话框中需要回退的文件，可单个或多个回退，这是与 **Undo File Changes** 菜单最大的区别，如下图所示。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_152.png)

<p class="kb-image-caption">图9.20 Revert菜单</p>
- Revert 成功，会有如下对话框。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_153.png)

<p class="kb-image-caption">图9.21 Revert成功</p>

---

## 十, SmartSim 仿真

### 10.1 SmartSim 仿真

使用 **SmartSim** 仿真的步骤：

1. 右键单击需要仿真的 CPU，选择 **Properties**，如图10.1 所示：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_155.png)

<p class="kb-image-caption">图10.1 右单击要仿真的CPU</p>

2. 在弹出的对话框中，把 **Hardware Module** 文件和 **Connection** 按照下图设置：

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_154.png)

<p class="kb-image-caption">图10.2 属性设置</p>

3. 按照在实际 CPU 编辑运行程序的方法，编辑 CFC 程序，编译下载运行，如图10.3.（注意：目前 **SmartSim** 仅支持部分逻辑算法等与实际硬件无关的功能块）。

![image](attachments/M4Aad7Su5oJqYDxkcyacVVYwnjf/viget/img_157.png)

<p class="kb-image-caption">图10.3 仿真运行中</p>

---

## 相关资源

- [[许继-ViGET-Turbo|许继 ViGET Turbo]]
- [[DPS3000-入门手册-KbUfdx2J|DPS3000 入门手册]]
- [[ViGET-Turbo-测试报告-YvCvdNRS|ViGET Turbo 测试报告]]

## 相关概念索引

- [[CFC Editor]] — CFC 图形化编程编辑器
- [[硬件配置器]] — 硬件架构配置工具
- [[项目管理器]] — 工程文件和资源管理窗口
- [[功能块管理器]] / [[POUs]] — 功能块目录管理工具
- [[输出窗口]] — 编译和状态信息输出区域
- [[Shared Memory]] — 共享内存变量机制
- [[Online 功能]] — 在线连接, 监测和下载功能
- [[CPU]] — 目标处理器单元
- [[复合模块]] — CFC 中的层级模块组织方式
- [[版本管理]] — Git 集成版本控制
- [[SmartSim]] — 软件仿真功能
- [[Build]] — 编译系统
- [[工程统计]] — Project Statistics 统计工具

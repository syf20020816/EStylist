# How To Use

首先，我们来了解一下软件的整体构成，EStylist目前由6个模块构成

Firstly, let's take a look at the overall composition of the software. EStylist is currently composed of six modules

![image-20230622233621386](.\HowToUse\imgs\image-20230622233621386.png)

1. 首页 Index
2. 模板编辑 Template-Edit
3. 邮件发送 Email-Send
4. 文档 Doc
5. 更新信息 Update-Info
6. 设置 Settings

我们主要来了解一下：模板编辑、邮件发送、设置这三大主要功能

Let's mainly learn about the three main functions: template editing, email sending, and settings

## Settings

首先我们要了解的是设置，通过设置，我们能够更好的使用程序，并且如果您需要通过EStylist发送邮件模板则必须先了解这些设置

The first thing we need to understand is the settings. Through these settings, we can better use the program, and if you need to send email templates through EStylist, you must first understand these settings

<img src=".\HowToUse\imgs\image-20230622234353511.png" alt="image-20230622234353511" style="zoom: 67%;" />

### Configurations

| Configuration         | Option | Main |
| --------------------- | ------ | ---- |
| 配置路径 **Config Path!** | ./conf/EStylist_config.json | 🚫 |
| 模板路径 **Template Path!** | ./templates | ❎ |
| 邮箱 **Email**    | Your SMTP Email | ✅ |
| 密码 **Password** | Your SMTP Password | ✅ |
| SMTP              | Any SMTP Service Address<br />such as : smtp.gmail.com | ✅ |
| 自动加载模板 **Automatically load templates** | true<br />false | ❤️ |
| 工作区占比 **Proportion of workspaces** | 1:1<br />2:3<br />3:2<br />6:4<br />4:6<br />13:7<br />7:13<br />3:1 | ❤️ |
| 语言 Language | 中文<br />English | ❤️ |

>✅：important and must be configured
>🚫：No configuration required
>❎：It is not recommended to modify the configuration
>❤️：Please configure according to your preferences
>
>✅：重要且必须配置
>🚫：无需配置
>❎：不建议修改配置
>❤️：请根据您的偏好进行配置

❗请记住修改配置后请保存

❗Please remember to save after modifying the configuration

## Template-Edit

模板编辑是EStylist的核心功能，他的目的是设计出你满意的邮箱模板，或者可以是个人卡片，对于学习过CSS的用户来说可能能够快速上手，但是若你没有学过，请一定要仔细学习这个部分

Template editing is the core function of EStylist. Its purpose is to design a satisfactory email template, or it can be a personal card. For users who have studied CSS, it may be easy to get started quickly, but if you have not studied it, please carefully study this section

<img src=".\HowToUse\imgs\image-20230623010128337.png" alt="image-20230623010128337" style="zoom:67%;" />

### Configurations

| 中文       | English                 | description                                                  |
| ---------- | ----------------------- | ------------------------------------------------------------ |
| 构建底板   | Building the base plate | 构建邮件的底板，底板是邮件的主要底色和主内容间距<br />Build the bottom plate of the email, which is the main color and content spacing of the email |
| 构建区域   | Build Area              | 区域是模板内容的外层，一个区域可以放置一个模块<br />Regions are the outer layer of template content, and each region can accommodate one module |
| 构建模块   | Build Model             | 模块则是核心内容，当前分为文字、链接、图片三种<br />The module is the core content, currently divided into three types: text, links, and images |
| 高度       | Height                  | 只有模块会有高度<br />Only the module will have a height     |
| 宽度       | Width                   | 宽度指的是模块或区域宽度<br />Width refers to the width of a module or area |
| 内容位置   | Content Position        | 内容位置将修改内容在模块容器中的位置，左、右、中间<br />The content location will modify the position of the content in the module container, left, right, and center |
| 圆角       | Radius                  | 圆角主要用于设置模块边角是否圆滑<br />Round corners are mainly used to set whether the module corners are smooth |
| 上传       | Upload                  | 上传只用于图片模块，用于上传本地图片<br />Upload only for image module, for uploading local images |
| 地址       | Url                     | 地址指的一般是图片的地址，用于上传网络图片或者是链接的地址<br />Address generally refers to the address of the image, which is used for uploading network images or links |
| 模块类型   | Model Types             | 模块类型主要有图片、文字、链接<br />The main types of modules include images, text, and links |
| 文字位置   | Text Pos                | 设置文字的位置，后续可能会去除以变得更加简单使用<br />Set the position of the text, which may be removed later to make it easier to use |
| 内容       | Content                 | 内容文字<br />Content Text                                   |
| 字体颜色   | Font Color              |                                                              |
| 字体粗细   | Font Weight             |                                                              |
| 区域跨度   | Column Span             | 区域跨度是指区域的横向占比<br />Regional span refers to the horizontal proportion of an area |
| 背景色     | BG Color                |                                                              |
| 排版方向   | Direction               | 用于设置排版的方向是横向还是纵向<br />Used to set whether the layout direction is horizontal or vertical |
| 字体       | Font Family             |                                                              |
| 字体大小   | Font Size               |                                                              |
| 内边距     | Padding                 | 模块、区域、底板的边距离内容的距离<br />The distance between the edges of the module, area, and base plate and the content |
| 外边距     | Margin                  | 模块、区域、底板的边距离外部其他区域的距离<br />The distance between the edges of modules, areas, and base plates and other external areas |
| 子区域个数 | Child Area Num          | 区域中的子区域个数<br />Number of sub regions in the region  |

### Understanding of Padding and Margins

![image-20230623004342298](.\HowToUse\imgs\image-20230623004342298.png)

### tools

工具在右下角，当前一共有6种

The tools are in the bottom right corner, currently there are a total of 6 types

![image-20230623005030946](.\HowToUse\imgs\image-20230623005030946.png)

| icon                                                         | des                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20230623005149823](.\HowToUse\imgs\image-20230623005149823.png) | 缩小模板编辑区<br />Shrink the template editing area         |
| ![image-20230623005217185](.\HowToUse\imgs\image-20230623005217185.png) | 放大模板编辑区<br />Enlarge the template editing area        |
| ![image-20230623005224310](.\HowToUse\imgs\image-20230623005224310.png) | 上传JSON模板文件<br />Upload JSON template file              |
| ![image-20230623005233341](.\HowToUse\imgs\image-20230623005233341.png) | 下载JSON模板以及HTML文件<br />Download JSON templates and HTML files |
| ![image-20230623005248274](.\HowToUse\imgs\image-20230623005248274.png) | 将模板存储到暂存区中，暂存区中的模板不会随着页面切换而消失，但关闭程序会消失<br />Store the template in the temporary storage area. The template in the temporary storage area will not disappear with page switching, but will disappear when the program is closed |
| ![image-20230623005259709](.\HowToUse\imgs\image-20230623005259709.png) | 删除当前模板以及暂存区缓存<br />Delete the current template and temporary storage cache |

> ❗下载下来的文件将存储到EStylist所在的templates目录下
>
> ❗The downloaded files will be stored in the templates directory where EStylist is located
>
> ❗上传文件时请不要焦急，为了完整的解析文件程序会等待1.5s左右的时间，请不要手动关闭，程序解析结束会自动关闭
>
> ❗Please do not be anxious when uploading files. In order to fully parse the file, the program will wait for about 1.5 seconds. Please do not manually close it. The program will automatically close after parsing

## Email-Send

最后是邮件发送，值得注意的是EStylist旨在发送构建好的邮件模板，若你想要发送寻常的邮件，请移步到普通邮箱

Finally, there is email sending. It is worth noting that EStylist aims to send built email templates. If you want to send regular emails, please move to regular email

<img src=".\HowToUse\imgs\image-20230623004500093.png" alt="image-20230623004500093" style="zoom:67%;" />

### Buttons

| button      | des                                                          |
| ----------- | ------------------------------------------------------------ |
| Choose      | 选择你需要发送的模板<br />Choose the template you need to send |
| Send        | 发送邮件<br />Send Email                                     |
| Add Contact | 添加联系人邮件<br />Add contact email                        |


export const getStr = (language: string, i18n: I18n): string => {
  let res = "";
  if (language == "Chinese") {
    res = i18n.zh;
  } else {
    res = i18n.en;
  }
  return res;
};

export let pagei18n = {
  tips: {
    infos: {
      delCache: {
        zh: "删除模板和缓存?",
        en: "Delete The Template And Cache?",
      } as I18n,
      downloadComponentSuccess: {
        zh: "成功下载组件！请检查您的组件存储目录！",
        en: "Download Component Successfully! Please Check Your Component Store Dir!",
      } as I18n,
      downloadComponentFail: {
        zh: "下载组件失败！!",
        en: "Download Component Failed!",
      } as I18n,
      downloadTemplateSuccess: {
        zh: "成功下载模板！请检查您的模板存储目录！",
        en: "Download Template Successfully! Please Check Your Template Store Dir!",
      } as I18n,
      downloadTemplateFail: {
        zh: "下载模板失败！!",
        en: "Download Template Failed!",
      } as I18n,
      delContractSuccess: {
        zh: "删除联系人成功!",
        en: "Del Contact Successfully!",
      } as I18n,
      delContractFail: {
        zh: "删除联系人失败!",
        en: "Del Contact Failed!",
      } as I18n,
      noTemplate: {
        zh: "您并没有模板!",
        en: "You Have No Templates!",
      } as I18n,
      loadTemplateSuccess: {
        zh: "加载模板成功!",
        en: "Load Templates Successfully!",
      } as I18n,
      uploadComponentSuccess: {
        zh: "上传组件成功!请稍等!",
        en: "Upload Component Successfully! Please Wait a moment!",
      } as I18n,
      uploadComponentFail: {
        zh: "上传组件失败!",
        en: "Upload Component Failure!",
      } as I18n,
      uploadTemplateSuccess: {
        zh: "上传模板成功!请稍等!",
        en: "Upload Template Successfully! Please Wait a moment!",
      } as I18n,
      uploadTemplateFail: {
        zh: "上传模板失败!",
        en: "Upload Template Failure!",
      } as I18n,
      addContractSuccess: {
        zh: "添加联系人成功!",
        en: "Add Contact Successfully!",
      } as I18n,
    },
    work: {
      zh: "处理",
      en: "Work",
    } as I18n,
    icon: {
      delCache: {
        zh: "清理缓存",
        en: "Delete Cache",
      } as I18n,
      downloadTemplate: {
        zh: "下载模板",
        en: "Download Template",
      } as I18n,
      downloadComponent: {
        zh: "下载组件",
        en: "Download Component",
      } as I18n,
      uploadComponent: {
        zh: "上传组件",
        en: "Upload Component",
      } as I18n,
      uploadTemplate: {
        zh: "上传模板",
        en: "Upload Template",
      } as I18n,
      zoomOut: {
        zh: "缩小",
        en: "Zoom Out",
      } as I18n,
      zoomIn: {
        zh: "放大",
        en: "Zoom In",
      } as I18n,
      edit: {
        zh: "模板|组件编辑",
        en: "Template|Component Edit",
      } as I18n,
      componentLib: {
        zh: "组件商店",
        en: "Component Library",
      } as I18n,
      templateLib: {
        zh: "模板商店",
        en: "Template Library",
      } as I18n,
      send: {
        zh: "邮件发送",
        en: "Email Send",
      } as I18n,
      doc: {
        zh: "文档",
        en: "Docs",
      } as I18n,
      info: {
        zh: "更新信息",
        en: "Update Info",
      } as I18n,
      settings: {
        zh: "设置",
        en: "Settings",
      } as I18n,
    },
  },
  common: {
    alert: {
      addModel: {
        zh: "当前已有子区域,添加模块将删除子区域",
        en: "There are currently sub areas, adding a module will delete the sub area",
      } as I18n,
    },
    uploadTemplate: {
      title: {
        zh: "选择上传模板",
        en: "Choose Upload Template",
      } as I18n,
      placeholder: {
        zh: "选择JSON文件",
        en: "Choose JSON File",
      } as I18n,
    },
    dowloadTemplate: {
      title: {
        zh: "确认存储文件",
        en: "Confirm Save File",
      } as I18n,
      placeholder: {
        zh: "请为存储文件命名",
        en: "Please name the storage file",
      } as I18n,
    },
    cancel: {
      zh: "取消",
      en: "Cancel",
    } as I18n,
    confirm: {
      zh: "确认",
      en: "Confirm",
    } as I18n,
  },
  edit: {
    tool: {
      target: {
        zh: "目标",
        en: "Target",
      } as I18n,
      config: {
        zh: "参数配置",
        en: "configuration parameters",
      } as I18n,
      configInfo: [
        {
          zh: "底板|区域|组件都是由下方参数定义的",
          en: "The base plate, area, and components are all defined by the following parameters",
        } as I18n,
        {
          zh: "通过修改参数定义自己的设计",
          en: "Define your own design by modifying parametersl",
        } as I18n,
      ],
      level: {
        zh: "层级树",
        en: "Level Tree",
      } as I18n,
      levelInfo: {
        zh: "模板层级表示底板、区域、组件形成的组合设计层级",
        en: "The template hierarchy represents the combined design hierarchy formed by the base plate, area, and components",
      } as I18n,
      color: {
        zh: "调色器",
        en: "Color Tool",
      } as I18n,
      switch: {
        zh: "切换工具:工具有调色器和字体调节器",
        en: "Switching tools: Tools include color palettes and font adjusters",
      } as I18n,
      colorInfo: {
        zh: "调色器可以控制全局颜色以及组件颜色",
        en: "The color palette can control global colors and component colors",
      } as I18n,
      font: {
        zh: "字体调节器",
        en: "Font Tool",
      } as I18n,
      fontInfo: {
        zh: "字体调节器用于控制字体样式",
        en: "Font adjuster used to control font style",
      } as I18n,
    },
    starContribute: {
      zh: "点赞 | 贡献",
      en: "Star | Contribute",
    } as I18n,
    designMail: {
      zh: "设计邮件",
      en: "Design Mail",
    } as I18n,
    designComponent: {
      zh: "设计组件",
      en: "Desgin Component",
    } as I18n,
    tips: {
      zh: "建议",
      en: "Tips",
    } as I18n,
    addChildArea: {
      title: {
        zh: "提示",
        en: "Alert",
      } as I18n,
      word: {
        zh: "当前区域下含有模块,是否添加子区域?确定则删除当前区域下的模块!",
        en: "The current area contains modules. Do you want to add a sub area? Confirm to delete the module under the current area!",
      } as I18n,
    },
    basePlateTitle: {
      zh: "构建底板",
      en: "Building the base plate",
    } as I18n,
    areaTitle: {
      zh: "构建区域",
      en: "Build Area",
    } as I18n,
    childAreaTitle: {
      zh: "构建子区域",
      en: "Build Child Area",
    } as I18n,
    modelTitle: {
      zh: "构建模块",
      en: "Build Model",
    } as I18n,
    contentPos: {
      zh: "内容位置",
      en: "Content Position",
    } as I18n,
    radius: {
      zh: "圆角",
      en: "Radius",
    } as I18n,
    upload: {
      zh: "上传",
      en: "Upload",
    } as I18n,
    src: {
      zh: "地址",
      en: "Url",
    } as I18n,
    height: {
      zh: "高度",
      en: "Height",
    } as I18n,
    modelTypes: {
      zh: "模块类型",
      en: "Model Types",
    } as I18n,
    textAlign: {
      zh: "文字位置",
      en: "Text Pos",
    } as I18n,
    content: {
      zh: "内容",
      en: "Content",
    } as I18n,
    componentName: {
      zh: "组件名称",
      en: "Component Name",
    } as I18n,
    fontStyles: {
      zh: "文字样式",
      en: "Font Styles",
    } as I18n,
    fontColor: {
      zh: "字体颜色",
      en: "Font Color",
    } as I18n,
    fontWeight: {
      zh: "字体粗细",
      en: "Font Weight",
    } as I18n,
    colSpan: {
      zh: "区域跨度",
      en: "Column Span",
    } as I18n,
    bgColor: {
      zh: "背景色",
      en: "BG Color",
    } as I18n,
    direction: {
      zh: "排版方向",
      en: "Direction",
    } as I18n,
    width: {
      zh: "宽度",
      en: "Width",
    } as I18n,
    fontFamily: {
      zh: "字体",
      en: "Font Family",
    } as I18n,
    fontSize: {
      zh: "字体大小",
      en: "Font Size",
    } as I18n,
    padding: {
      zh: "内边距",
      en: "Padding",
    } as I18n,
    margin: {
      zh: "外边距",
      en: "Margin",
    } as I18n,
    top: {
      zh: "上",
      en: "Top",
    } as I18n,
    left: {
      zh: "左",
      en: "Left",
    } as I18n,
    right: {
      zh: "右",
      en: "Right",
    } as I18n,
    bottom: {
      zh: "下",
      en: "Bottom",
    } as I18n,
    border: {
      zh: "边框",
      en: "Border",
    } as I18n,
    areaNum: {
      zh: "子区域个数",
      en: "Child Area Num",
    } as I18n,
  },
  send: {
    contact: {
      title: {
        zh: "添加联系人邮箱",
        en: "Add Contact Email",
      } as I18n,
      // placeholder: {
      //   zh: "选择HTML文件",
      //   en: "Choose HTML File",
      // } as I18n,
    },
    uploadTemplate: {
      title: {
        zh: "选择上传模板",
        en: "Choose Upload Template",
      } as I18n,
      placeholder: {
        zh: "选择HTML文件",
        en: "Choose HTML File",
      } as I18n,
    },
    title: {
      zh: "主题",
      en: "Title",
    } as I18n,
    recipient: {
      zh: "收件人",
      en: "Recipient",
    } as I18n,
    cc: {
      zh: "抄送",
      en: "Carbon Copy",
    } as I18n,
  },
  info: {
    what: {
      zh: "什么是EStylist",
      en: "What is EStylist",
    } as I18n,
    des: {
      zh: "EStylist 是一款第三方应用软件，旨在帮助用户编写邮件模板。无论是商务邮件、求职信、感谢信还是其他类型的邮件，EStylist 都可以提供专业的模板和编辑功能，让用户能够轻松地撰写出富有表达力和专业感的邮件。如果你经常被丑陋的电子邮件所困扰，并想追求电子邮件的布局和风格。想要像Stream或GitHub那样精致的电子邮件，EStylist将帮助您构建精美的电子邮件！",
      en: "EStylist is a third-party application designed to assist users in writing email templates. EStylist can provide professional templates and editing functions for business emails, Cover letter, thank-you letters and other types of emails, so that users can easily write expressive and professional emails. If you are often troubled by ugly emails and want to pursue the layout and style of emails. If you want exquisite emails like Stream or GitHub, EStylist will help you build exquisite emails!",
    } as I18n,
    promise: {
      zh: "承诺",
      en: "Promise",
    } as I18n,
    promiseDes: {
      zh: "本程序永远不会索要任何您的个人信息，所有的信息都会存储在你的电脑上。",
      en: "This program will never request any personal information from you, and all information will be stored on your computer.",
    } as I18n,
    update: [
      {
        zh: "并非最新版本,可以进行更新(请保证网络连接通畅,且能够正常连接到GitHub!),您是否需要进行和更新?",
        en: "It is not the latest version and can be updated (please ensure smooth network connection and normal connection to GitHub!). Do you need to update it?",
      } as I18n,
      {
        zh: "当前已经是最新版本,无需进行更新!",
        en: "Currently, it is the latest version and no update is required!",
      } as I18n,
    ],
  },
  lib: {
    fileName: {
      zh: "文件名称",
      en: "File Name",
    } as I18n,
    preview: {
      zh: "预览",
      en: "Preview",
    } as I18n,
    fileSize: {
      zh: "文件大小(单位:B)",
      en: "File Size(unit:B)",
    } as I18n,
    download: {
      zh: "下载地址",
      en: "Download URL",
    } as I18n,
  },
  doc: {
    intro: {
      zh: "介绍",
      en: "Introduction",
    } as I18n,
    prepare: {
      zh: "准备工作",
      en: "Preparation",
    } as I18n,
    use: {
      zh: "如何使用",
      en: "How To Use",
    } as I18n,
    example: {
      zh: "例子",
      en: "Example",
    } as I18n,
    update: {
      zh: "更新信息",
      en: "Update Info",
    } as I18n,
    contribute: {
      zh: "贡献",
      en: "Contribute",
    } as I18n,
  },
  settings: {
    dir: {
      zh: "软件安装目录",
      en: "Installation Dir",
    } as I18n,
    version: {
      zh: "版本",
      en: "Version",
    } as I18n,
    email: {
      zh: "邮箱",
      en: "Email",
    } as I18n,
    componentPath: {
      zh: "组件路径",
      en: "Component Path",
    } as I18n,
    downloadUrl: {
      zh: "资源下载路径",
      en: "Resource Download URL",
    } as I18n,
    password: {
      zh: "密码",
      en: "Password",
    } as I18n,
    connector: {
      zh: "联系人列表",
      en: "Contact List",
    } as I18n,
    title: {
      zh: "设置",
      en: "Settings",
    } as I18n,
    confPath: {
      zh: "配置路径",
      en: "Config Path",
    } as I18n,
    templatePath: {
      zh: "模板路径",
      en: "Template Path",
    } as I18n,
    autoTemplate: {
      zh: "自动加载模板",
      en: "Automatically load templates",
    } as I18n,
    spaceProportion: {
      zh: "工作区占比",
      en: "Proportion of workspaces",
    } as I18n,
    lang: {
      zh: "语言",
      en: "Language",
    } as I18n,
  },
  index: {
    title: {
      zh: "首页",
      en: "Index",
    } as I18n,
    des: {
      zh: "EStylist 是一款第三方应用软件，旨在帮助用户编写邮件模板。无论是商务邮件、求职信、感谢信还是其他类型的邮件，EStylist 都可以提供专业的模板和编辑功能，让用户能够轻松地撰写出富有表达力和专业感的邮件。如果你经常被丑陋的电子邮件所困扰，并想追求电子邮件的布局和风格。想要像Stream或GitHub那样精致的电子邮件，EStylist将帮助您构建精美的电子邮件！",
      en: "EStylist is a third-party application designed to assist users in writing email templates. EStylist can provide professional templates and editing functions for business emails, Cover letter, thank-you letters and other types of emails, so that users can easily write expressive and professional emails. If you are often troubled by ugly emails and want to pursue the layout and style of emails. If you want exquisite emails like Stream or GitHub, EStylist will help you build exquisite emails!",
    } as I18n,
  },
  buttons: {
    addArea: {
      zh: "添加区域",
      en: "Add Area",
    } as I18n,
    addAreaInfo: [
      {
        zh: "区域会被添加到底板中",
        en: "Add Area into Base Plate ",
      } as I18n,
      {
        zh: "区域是一个可以容纳一组组件的容器",
        en: "An area is a container that can accommodate a set of components",
      } as I18n,
    ],
    addDefineComponentInfo: {
      zh: "自定义组件将被添加到底板中",
      en: "Custom components will be added to the motherboard",
    } as I18n,
    addDefineComponent: {
      zh: "添加自定义组件",
      en: "Add Custom Component",
    } as I18n,
    addComponent: {
      zh: "添加组件",
      en: "Add Component",
    } as I18n,
    addComponentInfo: [
      {
        zh: "组件会被添加到区域中",
        en: "Components will be added to the area",
      } as I18n,
      {
        zh: "组件是模板的主要构成要素",
        en: "Components are the main constituent elements of templates",
      } as I18n,
    ],
    delComponent: {
      zh: "删除组件",
      en: "Delete Component",
    } as I18n,
    delComponentInfo: {
      zh: "当前组件将会从该区域移除",
      en: "The current component will be removed from this area",
    } as I18n,
    delArea: {
      zh: "删除区域",
      en: "Delete Area",
    } as I18n,
    delAreaInfo: {
      zh: "删除当前区域,同时删除包含的组件",
      en: "Delete Area while also removing the included components",
    } as I18n,
    copyColor: {
      zh: "复制调色器的颜色",
      en: "Copy the color of the color palette",
    } as I18n,
    copyFont: {
      zh: "复制字体调节器",
      en: "Copy Font Tool Styles",
    } as I18n,
    star: {
      project: {
        zh: "为项目点赞",
        en: "Star Project",
      } as I18n,
      lib: {
        zh: "为模板|组件库点赞",
        en: "Star Libs",
      } as I18n,
      contribute: {
        zh: "贡献",
        en: "Contribute",
      } as I18n,
      learn: {
        zh: "学习如何贡献",
        en: "Learn How To Contribute",
      } as I18n,
    },
    know: {
      zh: "我懂了",
      en: "I get it",
    } as I18n,
    addContract: {
      zh: "添加联系人",
      en: "Add Contract",
    } as I18n,
    choose: {
      zh: "选择模板",
      en: "Choose Template",
    } as I18n,
    send: {
      zh: "发送",
      en: "Send",
    } as I18n,
    preview: {
      zh: "预览",
      en: "Preview",
    } as I18n,
    download: {
      zh: "下载",
      en: "Download",
    } as I18n,
    refresh: {
      zh: "刷新",
      en: "Refresh",
    } as I18n,
    checkUpdate: {
      zh: "检查更新",
      en: "Check Updates",
    } as I18n,
    addModel: {
      zh: "添加模块",
      en: "Add Model",
    } as I18n,
    delModel: {
      zh: "删除模块",
      en: "Del Model",
    } as I18n,
    changeArea: {
      zh: "修改子区域个数",
      en: "Change Area Num",
    } as I18n,
    save: {
      zh: "保存",
      en: "Save",
    } as I18n,
    change: {
      zh: "修改",
      en: "Change",
    } as I18n,
  },
  placeholder: {
    color: {
      zh: "设置颜色,透明为transparent",
      en: "Set color,transparent means using lower layer colors",
    } as I18n,
  },
};

let settings_title: I18n = {
  zh: "设置",
  en: "Settings",
};

export interface I18n {
  zh: string;
  en: string;
}

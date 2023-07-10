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
  common: {
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
    basePlateTitle: {
      zh: "构建底板",
      en: "Building the base plate",
    } as I18n,
    areaTitle: {
      zh: "构建区域",
      en: "Build Area",
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
      zh: "EStylist的意思是电子邮件设计者。我想知道你是否经常被丑陋的电子邮件所困扰，并想追求电子邮件的布局和风格。你想要像Stream或GitHub那样精致的电子邮件吗？让EStylist帮助您构建精美的电子邮件！",
      en: "EStylist means email designer. I wonder if you are often troubled by ugly emails and want to pursue the layout and style of emails. Do you want emails as exquisite as Stream or GitHub? Let EStylist help you build exquisite emails!",
    } as I18n,
    promise: {
      zh: "承诺",
      en: "Promise",
    } as I18n,
    promiseDes: {
      zh: "本程序永远不会索要任何您的个人信息，所有的信息都会存储在你的电脑上。",
      en: "This program will never request any personal information from you, and all information will be stored on your computer.",
    } as I18n,
  },
  settings: {
    email: {
      zh: "邮箱",
      en: "Email",
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
      en: "Config Path!",
    } as I18n,
    templatePath: {
      zh: "模板路径",
      en: "Template Path!",
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
      zh: "我将帮助你构建时尚的邮件!",
      en: "I will help you make a fashion email!",
    } as I18n,
  },
  buttons: {
    checkUpdate:{
      zh: "检查更新",
      en: "Check Updates",
    } as I18n,
    addModel: {
      zh: "添加模块",
      en: "Add Model",
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
};

let settings_title: I18n = {
  zh: "设置",
  en: "Settings",
};

interface I18n {
  zh: string;
  en: string;
}

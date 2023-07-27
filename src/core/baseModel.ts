/**
 * ============================================
 * @author:syf20020816@outlook.com
 * @since:20230619
 * @version:0.0.1
 * @type:interface
 * @description: 样式表
 * ============================================
 */

/**
 * 外层容器样式表
 */
export interface BaseModel {
  width: number;
  bgColor: string;
  direction: string;
  padding: number;
}

/**
 * 内层容器样式表
 */
export interface AreaModel {
  id: number;
  bgColor: string;
  textAlign: string;
  direction: string;
  span: number;
  modelItem: Array<ModelItem>;
  justifyContent: string;
}

export interface Model {
  base: BaseModel;
  areas: Array<AreaModel>;
  areasLen: number;
}
export enum BorderType {
  solid = "solid",
  dotted = "dotted",
  double = "double",
  dashed = "dashed",
}
export interface BorderItem {
  width: number;
  borderType: BorderType;
  color: string;
}

export interface Border {
  top: BorderItem;
  right: BorderItem;
  bottom: BorderItem;
  left: BorderItem;
}

export interface ModelItem {
  id: number;
  type: string;
  height: string;
  width: string;
  bgColor: string;
  fontSize: number;
  fontColor: string;
  fontWeight: boolean;
  fontFamily: string;
  textAlign: string;
  direction: string;
  padding: Array<number>;
  margin: Array<number>;
  src: string;
  content: string;
  borderRadius: number;
  justifyContent: string;
  border: Border;
}

export interface Settings {
  version: string;
  store: string;
  template: string;
  dir: string;
  auto: boolean;
  proportion: string;
  language: string;
  email: string;
  password: string;
  smtp: string;
  contacts: Array<string>;
}

export const defaultAreaModels: Array<AreaModel> = [
  {
    bgColor: "#fff",
    direction: "y",
    textAlign: "center",
    span: 1,
    justifyContent: "center",
    modelItem: new Array(),
  } as AreaModel,
];

export const defalutModelItem: ModelItem = {
  id: 0,
  type: "div",
  height: "30px",
  width: "auto",
  bgColor: "#fff",
  fontSize: 16,
  fontColor: "#000",
  fontFamily: "Helvetica",
  textAlign: "center",
  direction: "x",
  fontWeight: false,
  padding: [0, 0, 0, 0],
  margin: [0, 0, 0, 0],
  content: "示例文字|地址",
  borderRadius: 0,
  justifyContent: "center",
  src: "",
  border: {
    left: {
      width: 0,
      borderType: BorderType.solid,
      color: "#fff",
    },
    top: {
      width: 0,
      borderType: BorderType.solid,
      color: "#fff",
    },
    right: {
      width: 0,
      borderType: BorderType.solid,
      color: "#fff",
    },
    bottom: {
      width: 0,
      borderType: BorderType.solid,
      color: "#fff",
    },
  },
};

/**
 * 默认的区域模型
 */
export const defaultAreaModel: AreaModel = {
  id: 0,
  bgColor: "#fff",
  direction: "y",
  textAlign: "center",
  span: 1,
  justifyContent: "center",
  modelItem: [defalutModelItem],
};

export const defalutModel: Model = {
  base: {
    width: 320,
    bgColor: "#fff",
    areaNum: 1,
    direction: "y",
    padding: 46,
  } as BaseModel,
  areas: [
    {
      id: 0,
      bgColor: "#fff",
      direction: "y",
      textAlign: "center",
      span: 1,
      justifyContent: "center",
      modelItem: [defalutModelItem],
    },
  ] as Array<AreaModel>,
  areasLen: 1,
};

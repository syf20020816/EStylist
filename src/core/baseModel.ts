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
  // 0.0.2版本被认为是不需要的，弃用
  // fontSize: number;
  areaNum: number;
  direction: string;
  padding: number;
}

/**
 * 内层容器样式表
 */
export interface AreaModel {
  // 0.0.2版本被认为是不需要的，弃用
  // height: number;
  // width: number;
  // areaNum: number;
  // fontSize: number;
  // fontColor: string;
  // fontFamily: string;
  // padding: Array<number>;
  // margin: Array<number>;
  // areas: Array<AreaModel> | null;
  id: number;
  bgColor: string;
  textAlign: string;
  direction: string;
  span: number;
  modelItem: Array<ModelItem>;
  justifyContent: string;
}

// export type FontFamily =

export interface Model {
  base: BaseModel;
  areas: Array<AreaModel>;
  areasLen: number;
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
  borderRadius: string;
  justifyContent: string;
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
  borderRadius: "0px",
  justifyContent: "center",
  src: "",
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

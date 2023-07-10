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
  bgColor: string;
  // 0.0.2版本被认为是不需要的，弃用
  // fontSize: number;
  // fontColor: string;
  // fontFamily: string;
  textAlign: string;
  areaNum: number;
  direction: string;
  // 0.0.2版本被认为是不需要的，弃用
  // padding: Array<number>;
  // 0.0.2版本被认为是不需要的，弃用
  // margin: Array<number>;
  span: number;
  areas: Array<AreaModel> | null;
  modelItem: ModelItem | undefined;
  justifyContent: string;
}

// export type FontFamily =

export interface Model {
  base: BaseModel;
  areas: Array<AreaModel>;
  areasLen: number;
}

export interface ModelItem {
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

export const defaultAreaModel: Array<AreaModel> = [
  {
    bgColor: "#fff",
    areaNum: 0,
    direction: "y",
    textAlign: "center",
    span: 1,
    areas: new Array(),
    justifyContent: "center",
    modelItem: undefined,
  } as AreaModel,
];

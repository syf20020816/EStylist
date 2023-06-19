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
  fontSize: number;
  areaNum: number;
  direction: string;
  padding: number;
}

/**
 * 内层容器样式表
 */
export interface AreaModel {
  height: number;
  width: number;
  bgColor: string;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  textAlign: string;
  areaNum: number;
  direction: string;
  padding: Array<number>;
  margin: Array<number>;
  span: number;
}

// export type FontFamily =

export interface Model {
  base: BaseModel;
  areas: Array<AreaModel>;
  areasLen: number;
}

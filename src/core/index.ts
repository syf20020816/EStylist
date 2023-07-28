import {
  BaseModel,
  AreaModel,
  Model,
  ModelItem,
  Settings,
  defaultAreaModel,
  defaultAreaModels,
  defalutModelItem,
  defalutModel,
  BorderType,
} from "./baseModel";
import { getStr, pagei18n } from "./i18n";
import {
  JustifyContent,
  TextAlign,
  ModelTypes,
  FontFamily,
  Direction,
  BorderTypes,
} from "./selectOptions";
import { buildRef } from "./macro";

export type { BaseModel, AreaModel, Model, ModelItem, Settings };

export {
  getStr,
  pagei18n,
  defaultAreaModel,
  defalutModel,
  defaultAreaModels,
  defalutModelItem,
  JustifyContent,
  TextAlign,
  ModelTypes,
  Direction,
  FontFamily,
  buildRef,
  BorderTypes,
  BorderType,
};

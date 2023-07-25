import { defineStore } from "pinia";
import {
  Settings,
  defalutModel,
  Model,
  ModelItem,
  AreaModel,
  defalutModelItem,
} from "../core";
import cloneDeep from "lodash/cloneDeep";
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const indexStore = defineStore("index", {
  // other options...
  state: () => {
    return {
      activeTarget: {
        name: "",
        info: "",
      },
      currentMailModel: defalutModel as Model,
      settings: {} as Settings,
      templates: [] as Array<string>,
      htmlTemplates: [] as Array<string>,
      templateMailModel: {} as Model,
      templateMailHtml: "",
    };
  },
  actions: {
    pushCurrentMailModel(index: number) {
      const len = this.currentMailModel.areas[index].modelItem.length;

      const newItem = { ...defalutModelItem, id: len };
      const areas = cloneDeep(this.currentMailModel.areas[index].modelItem);
      areas.push(newItem);

      // this.currentMailModel.areas[index].modelItem.push(item);
      this.currentMailModel.areas[index].modelItem = areas;
    },
    pushAreaToCurrentMailModel(item: AreaModel) {
      const len = this.currentMailModel.areas.length;
      const newItem = { ...item, id: len };
      this.currentMailModel.areas.push(newItem);
    },
    paddingChange(
      fIndex: number,
      sIndex: number,
      index: number,
      value: number
    ) {
      const paddings = cloneDeep(
        this.currentMailModel.areas[fIndex].modelItem[sIndex].padding
      );
      paddings[index] = value;
      this.currentMailModel.areas[fIndex].modelItem[sIndex].padding = paddings;
    },
    marginChange(fIndex: number, sIndex: number, index: number, value: number) {
      const margins = cloneDeep(
        this.currentMailModel.areas[fIndex].modelItem[sIndex].margin
      );
      margins[index] = value;
      this.currentMailModel.areas[fIndex].modelItem[sIndex].margin = margins;
    },
  },
});

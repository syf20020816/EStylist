import { defineStore } from "pinia";
import { Settings, defalutModel, Model, ModelItem } from "../core";
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const indexStore = defineStore("index", {
  // other options...
  state: () => {
    return {
      currentMailModel: defalutModel as Model,
      settings: {} as Settings,
      templates: [] as Array<string>,
      htmlTemplates: [] as Array<string>,
      templateMailModel: {} as Model,
      templateMailHtml: "",
    };
  },
  actions: {
    pushCurrentMailModel(index: number, item: ModelItem) {
      const len = this.currentMailModel.areas[index].modelItem.length;
      const newItem = { ...item, id: len };
      this.currentMailModel.areas[index].modelItem.push(newItem);
    },
  },
});

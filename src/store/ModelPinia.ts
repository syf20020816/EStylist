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
export const modelStore = defineStore("model", {
  // other options...
  state: () => {
    return {
      targetChoose: {
        basePlate: {
          name: "邮件底板",
          info: "邮件底板是一个最外层容器,底板的下层是区域,所有的区域都在底板中",
        },
        area: false,
        model: false,
      },
    };
  },
  actions: {},
});

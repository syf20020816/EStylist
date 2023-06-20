import { defineStore } from "pinia";
import { Settings } from "../core";
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const indexStore = defineStore("index", {
  // other options...
  state: () => {
    return {
      settings: {} as Settings,
    };
  },
  actions: {},
});

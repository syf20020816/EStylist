import { defineStore } from "pinia";
import {
  Settings,
  defalutModel,
  Model,
  ModelItem,
  AreaModel,
  defalutModelItem,
  BorderType,
} from "../core";
import { generateUUID } from "../util";
import cloneDeep from "lodash/cloneDeep";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const indexStore = defineStore("index", {
  // other options...
  state: () => {
    return {
      fontStyles: {
        fontSize: 16,
        fontFamily: "Helvetica",
        fontColor: "#000000",
        fontWeight: false,
      },
      activeTarget: {
        name: "",
        info: "",
      },
      globalColor: "#dedeff",
      currentMailModel: defalutModel as Model,
      settings: {} as Settings,
      templates: [] as Array<string>,
      htmlTemplates: [] as Array<string>,
      templateMailModel: {} as Model,
      templateMailHtml: "",
    };
  },
  actions: {
    //添加组件到区域中
    pushModelToArea(index: number) {
      // const len = this.currentMailModel.areas[index].modelItem.length;
      let len = generateUUID();
      const newItem = {
        ...defalutModelItem,
        id: len,
      };
      const areas = cloneDeep(this.currentMailModel.areas[index].modelItem);
      areas.push(newItem);

      // this.currentMailModel.areas[index].modelItem.push(item);
      this.currentMailModel.areas[index].modelItem = areas;
    },
    //添加区域到底板中
    pushAreaToCurrentMailModel(item: AreaModel) {
      let len = 0;
      if (this.currentMailModel.areas.length != 0) {
        len =
          this.currentMailModel.areas[this.currentMailModel.areas.length - 1]
            .id;
      }
      let newItem = { ...item, id: len + 1 };

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
    deepCloneBorderColor(
      areaIndex: number,
      modelIndex: number,
      direction: string
    ) {
      const border = cloneDeep(
        this.currentMailModel.areas[areaIndex].modelItem[modelIndex].border
      );

      switch (direction) {
        case "top":
          border.top.color = this.globalColor;
          break;
        case "right":
          border.right.color = this.globalColor;
          break;
        case "bottom":
          border.bottom.color = this.globalColor;
          break;
        case "left":
          border.left.color = this.globalColor;
          break;
        default:
          break;
      }
      this.currentMailModel.areas[areaIndex].modelItem[modelIndex].border =
        border;
    },
    deepCloneBorderChange(areaIndex:number,modelIndex:number,direction:string,newValue:number){
      const border = cloneDeep(
        this.currentMailModel.areas[areaIndex].modelItem[modelIndex].border
      );
      switch (direction) {
        case "top":
          border.top.width = newValue
          break;
        case "right":
          border.right.width = newValue
          break;
        case "bottom":
          border.bottom.width = newValue
          break;
        case "left":
          border.left.width = newValue
          break;
        default:
          break;
      }

      this.currentMailModel.areas[areaIndex].modelItem[modelIndex].border =
        border;
    }
  },
});

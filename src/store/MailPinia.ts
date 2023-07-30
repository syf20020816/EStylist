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
export const mailStore = defineStore("mail", {
  // other options...
  state: () => {
    return {
      //选择组件设计的组件
      componentIndex: 0,
      //选择的组件
      modelId: {
        areaIndex: 0,
        modelIndex: 0,
      },
      //选择的区域ID
      areaId: 0,
      targetChoose: {
        basePlate: {
          active: false,
          name: "邮件底板",
          info: "邮件底板是一个最外层容器,底板的下层是区域,所有的区域都在底板中",
        },
        area: {
          active: false,
          name: "区域",
          info: "区域是邮件底板的内部容器,区域依旧是一个容器,区域中可以存在很多组件,这些组件的外部属性是相同的",
        },
        model: {
          active: false,
          name: "组件",
          info: "组件是模板的最小构成单位,在EStylist中组件由系统组件、自定义组件、第三方组件",
        },
        componentArea: {
          active: false,
          name: "区域",
          info: "区域是邮件底板的内部容器,区域依旧是一个容器,区域中可以存在很多组件,这些组件的外部属性是相同的",
        },
        component: {
          active: false,
          name: "组件",
          info: "组件是模板的最小构成单位,在EStylist中组件由系统组件、自定义组件、第三方组件",
        },
      },
    };
  },
  actions: {
    //targetId:0->basePlate,1->area,2->model
    activeTarget(targetId: number) {
      switch (targetId) {
        case 0:
          this.targetChoose.basePlate.active = true;
          this.targetChoose.area.active = false;
          this.targetChoose.model.active = false;
          this.targetChoose.componentArea.active = false;
          this.targetChoose.component.active = false;
          break;
        case 1:
          this.targetChoose.basePlate.active = false;
          this.targetChoose.area.active = true;
          this.targetChoose.model.active = false;
          this.targetChoose.componentArea.active = false;
          this.targetChoose.component.active = false;
          break;
        case 2:
          this.targetChoose.basePlate.active = false;
          this.targetChoose.area.active = false;
          this.targetChoose.model.active = true;
          this.targetChoose.componentArea.active = false;
          this.targetChoose.component.active = false;
          break;
        case 3:
          this.targetChoose.basePlate.active = false;
          this.targetChoose.area.active = false;
          this.targetChoose.model.active = false;
          this.targetChoose.componentArea.active = true;
          this.targetChoose.component.active = false;
          break;
        case 4:
          this.targetChoose.basePlate.active = false;
          this.targetChoose.area.active = false;
          this.targetChoose.model.active = false;
          this.targetChoose.componentArea.active = false;
          this.targetChoose.component.active = true;
          break;
        default:
          break;
      }
    },
    chooseModel(areaIndex: number, modelIndex: number) {
      this.modelId.areaIndex = areaIndex;
      this.modelId.modelIndex = modelIndex;
    },
  },
});

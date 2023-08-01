import { defineStore } from "pinia";
import { I18n } from "../core";
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
          name: {
            zh: "邮件底板",
            en: "Base Plate",
          } as I18n,
          info: {
            zh: "邮件底板是一个最外层容器,底板的下层是区域,所有的区域都在底板中",
            en: "The Base Plate is the outermost container, and the lower layer of the bottom plate is the area, all of which are in the bottom plate",
          } as I18n,
        },
        area: {
          active: false,
          name: {
            zh: "区域",
            en: "Area",
          } as I18n,
          info: {
            zh: "区域是邮件底板的内部容器,区域依旧是一个容器,区域中可以存在很多组件,这些组件的外部属性是相同的",
            en: "The area is the internal container of the Base Plate, and it is still a container. There can be many components in the area, and their external properties are the same",
          } as I18n,
        },
        model: {
          active: false,
          name: {
            zh: "组件",
            en: "Component",
          } as I18n,
          info: {
            zh: "组件是模板的最小构成单位,在EStylist中组件由系统组件、自定义组件、第三方组件",
            en: "A component is the smallest constituent unit of a template, and in EStylist, a component consists of system components, custom components, and third-party components",
          } as I18n,
        },
        componentArea: {
          active: false,
          name: {
            zh: "区域",
            en: "Area",
          } as I18n,
          info: {
            zh: "区域是邮件底板的内部容器,区域依旧是一个容器,区域中可以存在很多组件,这些组件的外部属性是相同的",
            en: "The area is the internal container of the Base Plate, and it is still a container. There can be many components in the area, and their external properties are the same",
          } as I18n,
        },
        component: {
          active: false,
          name: {
            zh: "组件",
            en: "Component",
          } as I18n,
          info: {
            zh: "组件是模板的最小构成单位,在EStylist中组件由系统组件、自定义组件、第三方组件",
            en: "A component is the smallest constituent unit of a template, and in EStylist, a component consists of system components, custom components, and third-party components",
          } as I18n,
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

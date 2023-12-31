/**
 * ============================================
 * @author:syf20020816@outlook.com
 * @since:20230223
 * @version:0.2.0
 * @type:ts
 * @description:vue-router设置页面路由地址
 * ============================================
 */

import Index from "../views/Index.vue";
import MailInfo from "../views/MailInfo.vue";
import MailSend from "../views/MailSend.vue";
import MailEdit from "../views/MailEdit.vue";
import Setting from "../views/Setting.vue";
import TemplateLib from "../views/TemplateLib.vue";
import ComponentLib from "../views/ComponentLib.vue";
import Doc from "../views/Doc.vue";
import { RouteRecordRaw } from "vue-router";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/info",
    component: MailInfo,
  },
  {
    path: "/edit",
    component: MailEdit,
  },
  {
    path: "/send",
    component: MailSend,
  },
  {
    path: "/setting",
    component: Setting,
  },
  {
    path: "/doc",
    component: Doc,
  },
  {
    path: "/templateLib",
    component: TemplateLib,
  },
  {
    path: "/componentLib",
    component: ComponentLib,
  },
];

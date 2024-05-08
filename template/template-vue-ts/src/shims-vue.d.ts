import { App, ComponentCustomProperties } from 'vue';
import { DefineComponent } from 'vue';
//通用声明
// Vue
declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean | string | number;
    permissions?: string[];
    roles?: string;
  }
}

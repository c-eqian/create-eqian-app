import * as components from '@element-plus/icons-vue';
import { useSFCWithInstall } from 'co-utils-vue';
import type { App } from 'vue';

import CzSvg from './index.vue';
// @ts-ignore
CzSvg.install = (app: App) => {
  app.component(CzSvg.name, CzSvg);
  // @ts-ignore
  Object.keys(components).forEach(key => {
    const componentConfig = components[key];
    app.component(componentConfig.name, componentConfig);
  });
};
export default CzSvg as useSFCWithInstall<typeof CzSvg>;

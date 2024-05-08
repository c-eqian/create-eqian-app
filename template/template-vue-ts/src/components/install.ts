import type { App } from 'vue';

import ZkSvg from '@/components/CzSvg';

function install(app: App) {
  app.use(ZkSvg);
}

export default {
  install
};

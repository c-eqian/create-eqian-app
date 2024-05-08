import './styles/index.scss';
import 'animate.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import 'element-plus/dist/index.css';
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

import ElementPlus from 'element-plus';
// @ts-ignore
import locale from 'element-plus/dist/locale/zh-cn.mjs';
import { createApp } from 'vue';

import componentsInstall from '@/components/install';
import directive from '@/directive';
import { usePa } from '@/hooks/use-store/init';
import router from '@/router';

import App from './App.vue';

createApp(App)
  .use(router)
  .use(usePa)
  .use(directive)
  .use(componentsInstall)
  .use(ElementPlus, {
    zIndex: 2000,
    locale
  })
  .mount('#app');

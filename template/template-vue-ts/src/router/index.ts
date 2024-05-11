import 'nprogress/nprogress.css';

// @ts-ignore
import NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';

import { useGetTokenCookie } from '@/hooks/use-cookie/auth';

import commonRouter from './common';
import modulesRoutes from './modules';

const notFound404 = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  children: []
};
const routes: Array<any> = [...commonRouter, ...modulesRoutes];
const router = createRouter({
  history: createWebHistory(),
  routes
});
router.addRoute(notFound404);
router.beforeEach((to, _from, next) => {
  if (to.meta.auth && to.path !== '/login' && !useGetTokenCookie()) {
    next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
    NProgress.done();
  }
  NProgress.start();
  next();
  // // 是否需要权限
});
router.afterEach(() => {
  NProgress.done();
});
// router.beforeEach((to,from)=>{

// })
export default router;

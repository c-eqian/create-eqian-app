/**
 * @Author: eqian
 * @Date: 2024/4/15
 * @email: 2429120006@qq.com
 * @Description: 公共路由；基础路由
*/

export const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/modules/Index.vue'),
        meta: { title: '首页' },
        children: []
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/components/CzErrorPage/404.vue'),
    meta: { title: '404' },
    children: []
  },
  {
    path: '/403',
    name: 'NotPermission',
    component: () => import('@/components/CzErrorPage/403.vue'),
    meta: { title: '403' },
    children: []
  }
];

export default routes;

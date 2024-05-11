import { IMenu } from './index';
/**
 * 菜单转换路由
 */
export const useMenuToRoutes = (menus: IMenu[]) => {
  // 匹配modules里面所有的.vue文件,根据菜单生成对应路由
  const modules: Record<string, any> = import.meta.glob('@/modules/**/*.vue');
  return menus.map(item => {
    return {
      path: item.path,
      name: item.name,
      label: item.label,
      icon: item.icon,
      component: () => import('@/layout/index.vue'),
      // component: modules['/src/layout/admin/index.vue'],
      children: item.children.map(r => {
        return {
          path: item.path + r.path,
          name: r.name,
          label: r.label,
          icon: r.icon,
          component: modules[`/src/modules/${r.component}.vue`]
            ? modules[`/src/modules/${r.component}.vue`]
            : import('@/components/CzErrorPage/404.vue'),
          meta: {
            title: r.label,
            isAuth: true
          }
        };
      }),
      meta: {}
    };
  });
};

import { RouteRecordRaw } from 'vue-router';

// 读取modules下的所有路由表
const modules: Record<string, any> = import.meta.glob('@/modules/**/router.ts', { eager: true });
// eslint-disable-next-line import/no-mutable-exports
let modulesRoutes: RouteRecordRaw[] = [];
Object.keys(modules).forEach(fileName => {
  if (modules[fileName] && modules[fileName].default) {
    modulesRoutes = modulesRoutes.concat(modules[fileName].default);
  }
});
export default modulesRoutes;

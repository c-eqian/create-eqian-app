/**
 * @Author: 十三
 * @Date: 2024/5/10
 * @email: 2429120006@qq.com
 * @Description: 菜单 hook可以请求菜单列表，如果没有则固定即可
*/
export interface IMenu {
    id?: number | string;
    path: string;
    name: string;
    label: string;
    redirect?: string;
    visible?: boolean;
    icon: string;
    component: string;
    children: IMenu[];
}

/**
 * 侧边栏菜单
 * 菜单模板
 */
export const tempBackEndMenuList: IMenu[] = [
  {
    path: '/systemManage',
    name: 'SystemManage',
    label: '系统管理',
    redirect: '/systemManage/test1',
    icon: 'setting',
    //   指定布局
    component: 'layout/index',
    children: [
      {
        path: '/test1',
        name: 'SystemManageTest1',
        label: '子系统管理-1',
        icon: 'setting',
        //   指定布局
        component: 'system/test1/index',
        children: []
      },
      {
        path: '/test2',
        name: 'SystemManageTest2',
        label: '子系统管理-2',
        icon: 'setting',
        //   指定布局
        component: 'system/test2/index',
        children: []
      }
    ]
  }
];

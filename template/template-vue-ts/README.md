

# 说明

本代码库尽量保持代码规范

1. 组件命名请使用大驼峰命名规范

2. 枚举常量请在`constant`文件中定义

3. 新增`hooks`时请使用`use-xxx`命名文件

4. 样式尽量保存统一，使用[tailwindcss](https://www.tailwindcss.cn/)， 以`cz-`为前缀

5. 新增业务路由模块时，请在新建一个`modules/xxx/router.ts`文件新增路由

   例如

   ```typescript
   export default [
     {
       path: '/index',
       name: 'Index',
       component: () => import('@/modules/Index/Chat.vue'),
       meta: {
         title: '首页',
         isAuth: false
       }
     }
   ];
   ```

# 技术框架

🎉`vue3.x`

🎈`tailwindcss`

🎗️`vite5.x`

🥪`element-plus`

# 目录树

```shell
|-- src 
|   |-- api # 网络请求
|   |-- assets # 资源文件
|   |-- components # 全局组件
|   |-- constant # 枚举常量
|   |-- core # 核心层 例如网络
|   |-- directive # 自定义指令
|   |-- hooks # 全局hooks
|   |-- layout # 全局布局
|   |-- modules # 业务模块组件
|   |-- router # 路由
|   `-- styles # 全局样式
`-- types # 类型文件
```

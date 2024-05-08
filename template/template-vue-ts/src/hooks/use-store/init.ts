/**
 * @Author: eqian
 * @Date: 2024/4/15
 * @email: 2429120006@qq.com
 * @Description: 持久化插件
*/
import { createPinia } from 'pinia';
// 引入持久化插件
import pinPluginPersist from 'pinia-plugin-persist';

export const usePa = createPinia().use(pinPluginPersist);

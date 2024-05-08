/**
 * @Author: eqian
 * @Date: 2024/4/15
 * @email: 2429120006@qq.com
 * @Description: 系统持久化存储
*/
import { defineStore } from 'pinia';

export const useSystemStore = defineStore('SYSTEM', {
  state: () => {
    return {
      theme: 'light'
    };
  },
  actions: {
    settingTheme(theme: string) {
      this.theme = theme;
    }
  },
  // 使用该插件，开启数据缓存
  persist: {
    // 这里存储默认使用的是session
    enabled: true,
    strategies: [
      {
        // key的名称
        key: 'SYSTEM',
        // 更改默认存储，我更改为localStorage
        storage: localStorage
        // 默认是全部进去存储, 可以选择哪些进入local存储，这样就不用全部都进去存储了
      }
    ]
  }
});

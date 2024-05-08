/**
 * @Author: eqian
 * @Date: 2024/4/15
 * @email: 2429120006@qq.com
 * @Description: 用户信息
 */
import { defineStore } from 'pinia';

export const useUserStore = defineStore('USER_STORE', {
  state: () => {
    return {
      userInfo: {}
    };
  },
  actions: {
    setUserInfo(data:any) {
      this.userInfo = data;
    },
    login(data: any) {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    }
  },
  // 使用该插件，开启数据缓存
  persist: {
    // 这里存储默认使用的是session
    enabled: true,
    strategies: [
      {
        // key的名称
        key: 'USER_STORE',
        // 更改默认存储，我更改为localStorage
        storage: localStorage
        // 默认是全部进去存储, 可以选择哪些进入local存储，这样就不用全部都进去存储了
      }
    ]
  }
});

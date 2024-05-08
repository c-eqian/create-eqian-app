/**
 * @Author: eqian
 * @Date: 2024/4/15
 * @email: 2429120006@qq.com
 * @Description: 请求处理
*/
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';

let loadingInstance: any;
export const showLoading = (text: string) => {
  loadingInstance = ElLoading.service({
    lock: true,
    text,
    background: 'rgba(0, 0, 0, 0.7)'
  });
};
export const closeLoading = () => {
  if (loadingInstance) {
    loadingInstance.close();
  }
};
export const messageTip = (text: string) => {
  ElMessage.error(text);
};
export const loginConfirm = (showCancelButton = true, showClose = true) => {
  return ElMessageBox.confirm(
    '登录已过期或令牌无效，请先登录！',
    '提示',
    {
      confirmButtonText: '去登录',
      cancelButtonText: '取消',
      type: 'warning',
      showClose,
      showCancelButton,
      lockScroll: false,
      closeOnClickModal: false
    }
  );
};

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: { [x: string]: any; }) {
  let result = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = `${encodeURIComponent(propName)}=`;
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null
                        && value[key] !== ''
                        && typeof value[key] !== 'undefined'
          ) {
            const _params = `${propName}[${key}]`;
            const subPart = `${encodeURIComponent(_params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
}

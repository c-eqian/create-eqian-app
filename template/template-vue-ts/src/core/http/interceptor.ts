import axios, { AxiosError, AxiosInstance } from 'axios';
import { ElMessage } from 'element-plus';

import { AxiosCanceler } from '@/core/http/cancelRequest';
import { useGetTokenCookie } from '@/hooks/use-cookie/auth';

import { closeLoading, loginConfirm, messageTip, showLoading, tansParams } from './handleRequest';
import { CODE_ENUM, code_label, IRequestParamsConfig, IResponse } from './type';

const baseUrl = import.meta.env.VITE_BASE_URL;
const baseConfig = {
  // 默认地址
  // 设置超时时间
  timeout: 10000,
  retry: 3,
  retryDelay: 1000,
  // 跨域时候允许携带凭证
  withCredentials: true
};

class RequestHttp {
  // 定义成员变量并指定类型
  #service: AxiosInstance;

  public constructor(config?: IRequestParamsConfig) {
    const _config = Object.assign(baseConfig, config);
    // 实例化axios
    this.#service = axios.create(_config);
    const axiosCanceler = new AxiosCanceler();
    /**
         * 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
    this.#service.interceptors.request.use(
      // @ts-ignore
      (conf: IRequestParamsConfig) => {
        // 处理完整的 URL. 非 http, https 的才处理
        const isExternal = /^(https?:)/.test(conf.url!);
        if (!isExternal) {
          conf.url = `${baseUrl}${conf.url!.replace(/^\//, '')}`;
        }
        if (useGetTokenCookie()) {
          conf.headers = {
            Authorization: `${useGetTokenCookie()}` || ''
          };
        }
        const newConfig = {
          ...baseConfig,
          ...config,
          ...conf
        };

        if (newConfig.cache) {
          if (newConfig.method === 'get') {
            newConfig.params = {
              ...newConfig.params,
              _t: Date.parse(`${new Date()}`) / 1000
            };
          } else if (newConfig.method === 'post') {
            newConfig.data = {
              ...newConfig.data,
              _t: Date.parse(`${new Date()}`) / 1000
            };
          }
        }
        if (newConfig.method === 'get') {
          newConfig.params = {
            ...newConfig.params
          };
          newConfig.url = `${newConfig.url}?${tansParams(newConfig.params)}`.slice(0, -1);
          newConfig.params = {};
        }
        if (newConfig.isLoading) {
          showLoading(newConfig.loadingText || '加载中....');
        }
        config?.isCancel && axiosCanceler.addPending(newConfig);
        return newConfig;
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error);
      }
    );

    /**
         * 响应拦截器
         * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
    this.#service.interceptors.response.use(
      // @ts-ignore
      async (response: IResponse) => {
        closeLoading();
        response && axiosCanceler.removePending(response.config);
        if (response.config.isExtra) {
          return response;
        }
        const { data } = response; // 解构
        const { code } = data;
        if (code !== CODE_ENUM['00000']) {
          if (code === CODE_ENUM.A0220) {
            try {
              await loginConfirm(false, false);
              window.location.href = '/login';
            } catch (_e) {
              window.location.href = '/login';
            }
          }
          messageTip((code && code_label[code]) || '请求失败');
          return Promise.reject((code && code_label[code]) || '请求失败');
        }
        if (response.config.isShowSuccessText) {
          ElMessage.success(data.msg);
        }
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        response && axiosCanceler.removePending(response.config);
        if (axios.isCancel(error)) return;// 防止取消请求引起响应异常
        closeLoading();
        if (!window.navigator.onLine) {
          messageTip('网络连接失败');
          return;
        }
        // eslint-disable-next-line consistent-return
        return Promise.reject(error);
      }
    );
  }

  // 常用方法封装
  async get<T>(params: IRequestParamsConfig): Promise<T> {
    const res = await this.#service.get(params.url!, params);
    return res?.data;
  }

  async post<T>(params: IRequestParamsConfig): Promise<T> {
    const res = await this.#service.post(params.url!, params.data, params);
    return res?.data;
  }

  async put<T>(params: IRequestParamsConfig): Promise<T> {
    const res = await this.#service.put(params.url!, params.data, params);
    return res?.data;
  }

  async delete<T>(params: IRequestParamsConfig): Promise<T> {
    const res = await this.#service.delete(params.url!, params);
    return res?.data;
  }
}

// 导出一个实例对象
export default RequestHttp;

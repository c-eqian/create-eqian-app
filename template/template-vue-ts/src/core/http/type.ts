import { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export enum CODE_ENUM {
  '00000' = '00000',
  'B0001' = 'B0001',
  'A0220' = 'A0220',
  'A0210' = 'A0210',
  'A0301' = 'A0310',
  'A0201' = 'A0201',
  'A0400'= 'A0400'
}
export const code_label: Record<CODE_ENUM, string> = {
  [CODE_ENUM['00000']]: '请求成功',
  [CODE_ENUM.B0001]: '系统异常',
  [CODE_ENUM.A0220]: '用户未登录',
  [CODE_ENUM.A0210]: '用户名或密码错误',
  [CODE_ENUM.A0301]: '权限不足',
  [CODE_ENUM.A0201]: '用户不存在',
  [CODE_ENUM.A0400]: '请求参数错误'
};
// 数据返回的接口
// 定义请求响应参数，不含data
export interface IResult<T = any> {
  code?: CODE_ENUM;
  msg?: string;
  status?: number;
  data?: T;
}

// @ts-ignore
export interface IRequestParamsConfig extends AxiosRequestConfig {
  isCancel?: boolean;
  isLoading?: boolean;
  loadingIcon?: string;
  loadingText?: string;
  isExtra?: boolean;
  isShowSuccessText?: boolean;
  cache?: boolean;
  header?: {
    'Content-Type':string;
  };
}

// 请求响应参数，包含data
// @ts-ignore
export interface IResponse extends AxiosResponse {
  data: IResult;
  config: IRequestParamsConfig;
}

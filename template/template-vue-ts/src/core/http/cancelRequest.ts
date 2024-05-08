import { IRequestParamsConfig } from '@/core/http/type';

const getPendingUrl = (config: IRequestParamsConfig): string => {
  return [config.method, config.url, config.params, config.data].join('&');
};

export class AxiosCanceler {
  #pendingMap:Map<string, AbortController>;

  public constructor() {
    // 用于存储每个请求的标识和取消函数
    this.#pendingMap = new Map<string, AbortController>();
  }

  /**
   * 添加请求
   * @param config 请求配置
   */
  public addPending(config: IRequestParamsConfig): void {
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = config.signal || controller.signal;
    if (!this.#pendingMap.has(url)) {
      // 如果当前请求不在等待中，将其添加到等待中
      this.#pendingMap.set(url, controller);
    }
  }

  /**
   * 清除所有等待中的请求
   */
  public removeAllPending(): void {
    this.#pendingMap.forEach(abortController => {
      if (abortController) {
        abortController.abort();
      }
    });
    this.reset();
  }

  /**
   * 移除请求
   * @param config 请求配置
   */
  public removePending(config: IRequestParamsConfig): void {
    const url = getPendingUrl(config);
    if (this.#pendingMap.has(url)) {
      // 如果当前请求在等待中，取消它并将其从等待中移除
      const abortController = this.#pendingMap.get(url);
      if (abortController) {
        abortController.abort(url);
      }
      this.#pendingMap.delete(url);
    }
  }

  /**
   * 重置
   */
  public reset(): void {
    this.#pendingMap.clear();
  }
}

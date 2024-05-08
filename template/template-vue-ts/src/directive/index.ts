import { App, DirectiveBinding } from 'vue';

interface IDirective extends DirectiveBinding {
    value: string;
}

export const imgLazy = {
  mounted(el: HTMLImageElement, binding: IDirective) {
    const { value } = binding;
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = value;
        // 停止监听
        stop();
      }
      el.onerror = () => {
        el.src = new URL('../assets/svg/img-error.svg', import.meta.url).href;
        console.log('加载出错');
      };
      el.onload = ev => {
        console.log(ev);
      };
    });
  }
};
export default {
  install(app: App<Element>) {
    app.directive('img-lazy', imgLazy);
  }
};

import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 请求拦截
instance.interceptors.request.use(
  (config) => {
    if (config.url.includes('/passport')) {
      return config;
    }
    return {
      // 一些地址需要传递 appkey 值
      ...config,
      params: {
        ...config.params,
        appkey: store.state.user.appkey,
      },
    };
  },
  (error) => Promise.reject(error), // Promise.reject 失败的函数值
);
// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.data.status === 'fail') {
      return Promise.reject(response.data.msg);
    }
    return response.data.data;
  },
  (error) => Promise.reject(error),
);

export default instance;

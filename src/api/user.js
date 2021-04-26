// 对用户操作的接口管理
import axios from '@/axios';

// 创建实例 => 选择接口 => 请求/响应拦截 => 返回处理拦截结果
export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
};

import axios from '@/axios';

export default {
  // 查询产品列表
  list(params) {
    return axios.get('/products/all', { params });
  },
  // 删除商品
  remove(params) {
    return axios.delete(`/products/${params.id}`);
  },
};

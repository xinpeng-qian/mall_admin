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
  // 添加
  add(params) {
    return axios.post('/products/add', params);
  },
  // 描述
  detail(id) {
    return axios.get(`/products/${id}`);
  },
  // 编辑
  edit(params) {
    return axios.put('/products/edit', params);
  },
};

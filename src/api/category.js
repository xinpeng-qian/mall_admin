// 查询类目列表信息
import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/category/all', { params });
  },
};

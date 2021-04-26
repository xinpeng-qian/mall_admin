import Vue from 'vue';
import VueRouter from 'vue-router';
import getMenuRoutes from '@/utils/permission';
import store from '../store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      // 元信息，用于自定义一些信息。
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '统计',
          icon: 'area-chart',
          hidden: false,
        },
        component: () => import('../views/page/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/sbout',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '其他',
      icon: 'ellipsis',
      hidden: true,
    },
  },
];

const asyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      icon: 'shop',
      hidden: false,
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '产品列表',
          icon: 'unordered-list',
          hidden: false,
        },
        component: () => import('../views/page/productList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '产品添加',
          icon: 'file-add',
          hidden: false,
        },
        component: () => import('../views/page/productAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
          icon: 'project',
          hidden: false,
        },
        component: () => import('../views/page/category.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);
        // then 方法为的想让 getMenuRoutes 得到结果方可直接跳转 menuRoutes 下动态添加的页面
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
        });
        isAddRoutes = true;
      }
      next();
    } else {
      next('/login');
    }
  }
  next();
});

export default router;

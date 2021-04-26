import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  // 单一状态树，使用一个对象就包含了全部的应用层级状态。
  state: {
    // 切换菜单闭合的状态 false 不闭合 true 闭合
    collapsed: false,
    // 用户信息
    user: getUserCookie(), // 刷新后依然可以从 cookie 里找到
  },
  mutations: {
    // 改变 store 中的状态的唯一方法
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
  },
  actions: {
    // context.commit 提交一个 mutation
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
  },
  modules: {},
});

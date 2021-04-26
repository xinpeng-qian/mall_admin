<template>
  <div class="home">
    <menuList />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
import menuList from './components/menu.vue';
import navigation from './components/navigationBar.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    menuList,
    navigation,
  },
  methods: {
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/home.less');
</style>

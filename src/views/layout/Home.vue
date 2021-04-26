<template>
  <div class="home">
    <menuList :key="key" />
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
      key: new Date().getTime(),
    };
  },
  components: {
    menuList,
    navigation,
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/home.less');
</style>

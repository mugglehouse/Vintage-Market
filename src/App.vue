<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入全局組件
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  // 注册组件
  components: {
    Header,
    Footer,
  },
  mounted() {
    // vuex---三级联动获取服务器数据---组件使用dispatch告诉actions  (使用namespaced的话，组件使用dispatch调用actions的方法时，需要加上路径！)
    this.$store.dispatch("home/categoryList");
    this.$store.dispatch('home/getBannerList');
    this.$store.dispatch('home/getFloorList');
    this.$store.dispatch('search/getSearchList');
  },
};
</script>

<style scoped>

</style>


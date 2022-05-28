<template>
  <div>
    <!-- 引入三级联动全局组件 -->
    <TypeNav />
    <LsitContainer />
    <Recommend />
    <Like />
    <Floor v-for="f in floorList" :key="f.id" :floor="f" />
  </div>
</template>

<script>
import LsitContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend/index.vue";
import Like from "@/pages/Home/Like/index.vue";
import Floor from "@/pages/Home/Floor/index.vue";

// 引入store
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState("home", ["floorList"]),
  },
  mounted() {
    console.log("@@", this.floorList);
    // 获取用户信息
    this.$store.dispatch("user/getUserInfo");
  },
  components: {
    LsitContainer,
    Recommend,
    Like,
    Floor,
  },
};
</script>

<style lang="less" scoped>
</style>
<template>
  <div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="searchList.total"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import search from "@/store/search";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Pagination",
  data() {
    return {
      currentPage1: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },

  computed: {
    //获取仓库中的数据
    ...mapState("search", ["searchList"]),
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 切换页面
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit('getPageNo',val)
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  text-align: center;
  font-size: 30px;
}
</style>
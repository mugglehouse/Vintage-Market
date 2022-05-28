<template>
  <div>
    <div class="order-right">
      <div class="order-content">
        <div class="title">
          <h3>我的订单</h3>
        </div>
        <!-- 标题 -->
        <div class="chosetype">
          <table>
            <thead>
              <tr>
                <th width="29%">商品</th>
                <th width="31%">订单详情</th>
                <th width="13%">收货人</th>
                <th>金额</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
          </table>
        </div>
        <!-- 一级订单列表 -->
        <div class="orders">
          <table
            class="order-item"
            v-for="order in myOrderList.records"
            :key="order.id"
          >
            <!-- 头部 -->
            <thead>
              <tr>
                <th colspan="5">
                  <span class="ordertitle"
                    >{{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                    <span class="pull-right delete"
                      ><img src="../images/delete.png" /></span
                  ></span>
                </th>
              </tr>
            </thead>
            <!-- 主体 -->
            <tbody>
              <!-- 二级订单列表 -->
              <tr v-for="(cart, index) in order.orderDetailList" :key="cart.id">
                <!-- 商品信息 -->
                <td width="60%">
                  <div class="typographic">
                    <img
                      :src="cart.imgUrl"
                      style="width: 100px; height: 100px"
                    />
                    <a href="#" class="block-text">{{ cart.skuName }}</a>
                    <span>x{{ cart.skuNum }}</span>
                    <a href="#" class="service">售后申请</a>
                  </div>
                </td>
                <!-- 收货信息 -->
                <td
                  :rowspan="order.orderDetailList.length"
                  width="8%"
                  class="center"
                  v-if="index == 0"
                >
                  {{ order.consignee }}
                </td>
                <td
                  :rowspan="order.orderDetailList.length"
                  width="13%"
                  class="center"
                  v-if="index == 0"
                >
                  <ul class="unstyled">
                    <li>总金额¥{{ order.totalAmount }}</li>
                    <li>在线支付</li>
                  </ul>
                </td>
                <td
                  :rowspan="order.orderDetailList.length"
                  width="8%"
                  class="center"
                  v-if="index == 0"
                >
                  <a href="#" class="btn">{{ order.orderStatusName }} </a>
                </td>
                <td
                  :rowspan="order.orderDetailList.length"
                  width="13%"
                  class="center"
                  v-if="index == 0"
                >
                  <ul class="unstyled">
                    <li>
                      <a href="mycomment.html" target="_blank">评价|晒单</a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分页器 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="50"
            layout="total, prev, pager, next"
            :total="myOrderList.pages"
            background
          >
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data() {
    return {
      // 初始化参数
      page: 1,
      limit: 3,
      // 订单列表
      myOrderList: {},
      // 分页器
      currentPage1: 1,
    };
  },
  mounted() {
    this.getMyOrderList();
  },
  methods: {
    // 获取订单列表
    async getMyOrderList() {
      const { page, limit } = this;
      // 组件挂载时发请求
      let result = await this.$API.reqMyOrderList(page, limit);
      console.log("myOrderList", result);
      if (result.code == 200) {
        this.myOrderList = result.data;
      } else {
        alert("fail");
      }
    },
    // 分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getMyOrderList();
    },
  },
};
</script>

<style lang="less" scoped>
</style>
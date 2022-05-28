<template>
  <!-- 小图轮播 -->
  <div class="swiper-slide">
    <div class="block">
      <el-carousel
        :interval="4000"
        type="card"
        height="56px"
        @change="handleChange"
        :autoplay='false'
      >
        <el-carousel-item v-for="slide in skuImageList" :key="slide.id">
          <img class="medium" :src="slide.imgUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  props: ["skuImageList"],
  methods: {
    handleChange(val) {
      console.log("valllll", val);
      this.$bus.$emit('getIndex',val);
    },
  },
};
</script>

<style lang="less" scoped>

.swiper-slide {
  left: -50%;
}

.block {
  width: 200px;
  height: 56px;
  img {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    padding: 2px;
    width: 50px;
    height: 50px;
    display: block;

    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }

}
</style>
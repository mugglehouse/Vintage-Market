<template>
  <div>
    <!--列表-->
    <div class="list-container">
      <div class="sortList clearfix">
        <div class="center">
          <!--banner轮播-->
          <div class="swiper-slide">
            <div class="block">
              <el-carousel trigger="click" height="455px">
                <el-carousel-item v-for="b in bannerList" :key="b.id">
                  <img :src="b.imgUrl" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <!-- banner轮播 -->
        </div>
        <div class="right">
          <h2>Find Your Style</h2>
          <img src="./images/a.png" alt="" />
          <h2>In Vintage Market</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "lsitContainer",
  computed: {
    ...mapState("home", ["bannerList"]),

  },
  mounted() {
    console.log("@", this.bannerList);
  },
};
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;
      h2{
        margin-top: 15px;
        text-align: center;
        color: #734931;
      }
      img{
        margin-top: 20px;
        width: 250px;
        
      }
      
    }
  }
}，

.swiper-slide{
    width: 721px;
    height: 455px;  
}

.swiper-slide img{
    width: 92%;
    margin-left: 30px;
}
.ads{
    width: 170px;
    height: 80px;
}
.ads img{
    width: 100%;
}


</style>
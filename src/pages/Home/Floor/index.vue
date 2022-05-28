<template>
  <div>
    <!--楼层-->
    <div class="floor">
      <div class="py-container">
        <div class="title clearfix">
          <!-- 标题 -->
          <h3 class="fl">{{ floor.name }}</h3>
          <div class="fr">
          </div>
        </div>
        <div class="tab-content">
          <div class="tab-pane">
            <div class="floor-1">
              <div class="blockgary">
                <!-- 关键字 -->
                <!-- 图片1 -->
                <img :src="floor.imgUrl" />
              </div>
              <div class="floorBanner">
                <div class="swiper-container" id="floor1Swiper">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <div class="block">
                        <el-carousel trigger="click" height="380px">
                          <el-carousel-item
                            v-for="img in floor.carouselList"
                            :key="img.id"
                          >
                            <img :src="img.imgUrl" />
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
              <div class="split">
                <span class="floor-x-line"></span>
                <div class="floor-conver-pit">
                  <img :src="floor.recommendList[0]" />
                </div>
                <div class="floor-conver-pit">
                  <img :src="floor.recommendList[1]" />
                </div>
              </div>
              <div class="split center">
                <h2>中世纪服饰</h2>
                <img :src="floor.bigImg" />
              </div>
              <div class="split">
                <span class="floor-x-line"></span>
                <div class="floor-conver-pit">
                  <img :src="floor.recommendList[2]" />
                </div>
                <div class="floor-conver-pit">
                  <img :src="floor.recommendList[3]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "Floor",
  props: ["floor"],
};
</script>

<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #734931;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #734931;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #734931;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 240px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 260px;
            height: 100%;
            img {
              height: 95%;
            }
          }

          .split {
            width: 240px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
            h2{
              color: #f1ede6;
              text-align: center;
              padding:5px;
              background-color: #624332;
            }
            img {
              width: 235px;
            }
          }
        }
      }
    }
  }
}
</style>


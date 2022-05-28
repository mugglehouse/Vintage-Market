<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <!-- 响应式控制显示和隐藏三级联动 -->
        <div @mouseenter="enterShow" @mouseleave="leaveHide">
          <!-- 给三级联动加一个过渡动画 -->
          <transition name="sort">
            <div class="sort" v-show="show">
              <!-- 路由转发：编程式导航+事件委派 -->
              <div class="all-sort-list2" @click="goSearch">
                <!-- 一级 -->
                <div
                  v-for="c1 in categoryList"
                  :key="c1.categoryId"
                  class="item"
                >
                  <h3>
                    <!-- 每个a标签绑定自定义属性，标明和区分a -->
                    <a
                      class="nava"
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <div class="item-list clearfix">
                    <div class="subitem">
                      <!-- 二级 -->
                      <dl
                        v-for="c2 in c1.categoryChild"
                        :key="c2.categoryId"
                        class="fore"
                      >
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <!-- 三级 -->
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <h2 class="all">All Vintage Soft</h2>
        </div>
        <nav class="nav">
          <a href="###">Phone</a>
          <a href="###">Camara</a>
          <a href="###">Clothing</a>
          <a href="###">Toy</a>
          <a href="###">Book</a>
          <a href="###">clock</a>
          <a href="###">Jewelry</a>
          <a href="###">Art</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
// 引入
import { mapState } from "vuex";

export default {
  name: "TypeNav",
  // 组件一挂载完毕，就通知vuex获取三级联动的列表数据（共享）
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 三级联动--路由跳转--编程式导航+事件委派
    goSearch(event) {
      // 1、获取触发点击事件的子节点
      let element = event.target;
      // 2、获取子节点的自定义属性(这里规定用小写data-)
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 3、判断子节点是否有categoryame这个属性，有则为a标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 4、判断是哪一级的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 三级联动--路由跳转时--合并params参数
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    // 三级联动--隐藏显示控制
    enterShow() {
      this.show = true;
    },
    leaveHide() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  mounted() {
    // 路由转发---home->serach组件会重新挂载，如果重新挂载将三级联动隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
    console.log("routtttt", this.$route);
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #734931;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #734931;
      line-height: 45px;
      text-align: center;
      color: rgb(255, 255, 255);
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #734931;
      }
      a:hover {
        color: #fffeee;
        text-decoration: none;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: hsl(40, 55%, 96%);
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          // hover实现
          :hover {
            background-color: #734931;
            a {
              color: #fff;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;

                  a {
                    color: #b9cebf;
                  }
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  a {
                    color: rgb(251, 246, 246);
                  }

                  a:hover {
                    color: #b9cebf;
                  }

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
              background-color: #734931;
              color: rgb(223, 201, 201);
            }
          }
        }
 
      }
    }

    // 三级联动过渡动画
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
  }
}
</style>
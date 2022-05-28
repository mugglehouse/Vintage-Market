<template>
  <div>
    <!-- 三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 商品属性值面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--品牌选择-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--排序-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 判断是1还是2 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <!-- 判断是asc还是desc -->
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <span>随便点一个商品</span>
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 点击商品，跳转到商品详情页面 -->
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="javascript:void(0);"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 更新searchParams参数 -->
          <Pagination @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // search---请求参数
      searchParams: {
        // 分类
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        //关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 10,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  computed: {
    // getters属性是没有区分模块的，直接在store上，能使用
    // ...mapState('search',['searchList']),
    ...mapGetters("search", ["goodsList", "trademarkList", "attrsList"]),

    // 判断点击的是综合还是价格
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    // search---请求数据
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },

    // 删除分类面包屑
    removeCategoryName() {
      // 将参数中的分类名字、Id undefine（这样就可以不带给服务器）
      this.searchParams.categoryName = "";
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 重新发请求，重新渲染页面
      this.getData();
      // 路由url参数也要变化 (删除面包屑，意思是删除分类params，但query参数没删)
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
      // this.$router.push({name:'search'})
    },

    // 删除关键字面包屑
    removeKeyword() {
      // 删除关键字
      this.searchParams.keyword = undefined;
      // 重新发请求，重新渲染页面
      this.getData();
      // header组件中的search模块关键字置空
      this.$bus.$emit("clear");
      // 路由url
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },

    // 删除品牌面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },

    // 删除商品属性值面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },

    // 品牌信息---自定义事件回调---更新searchParams---重新发请求
    trademarkInfo(trademark) {
      console.log("aaaaaa", trademark);
      // searchParams -- 加上品牌信息
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 重新发请求
      this.getData();
    },

    // 商品属性信息---自定义事件回调---更新searchParams---重新发请求
    attrInfo(attr, attrValue) {
      // console.log('attrInfo',attr,attrValue)
      // searchParams -- 加上 props (后端规定这样的数据方式)
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数据去重---不能用户点击一个，就push一个进去
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      // 重新发请求，重新渲染页面
      this.getData();
    },

    // 排序操作 1:asc
    changeOrder(flag) {
      // 保存原来的order
      let originOrder = this.searchParams.order;
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      // 定义一个新order
      let newOrder = "";
      // 如果点击相同，切换升降序
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 如果点击不同，默认降序
        newOrder = `${flag}:${"desc"}`;
      }
      // 改变oreder值--更新searchParams
      this.searchParams.order = newOrder;
      // 再次请求--重新渲染页面
      this.getData();
    },

    // 分页器--自定义事件回调--接收子传父的pageNo
    getPageNo(pageNo) {
      console.log("Page!!", pageNo);
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },

  // search---发请求前，更新params参数
  beforeMount() {
    // 合并参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // console.log('fffff',this.$store,this.$store.state.search.searchList)
    console.log("aaaaa", this.goodsList);
    this.getData();
  },
  // 监听search路由的变化，路由一遍，就重新发一次请求，params参数重新改变，重新渲染页面
  watch: {
    $route(newValue, oldValue) {
      // 更新params参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 重新发请求
      this.getData();
      // 请求后清理params参数（1，2，3级Id）,分类的名字和关键字不用清理，因为每次路由变化，都会更新
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #734931;
          background: #fffceb;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #fffaf2;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #734931;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      margin-top: 20px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fffceb;
          border: 1px solid #fffceb;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #734931;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #734931;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #734931;
                  color: #734931;

                  &:hover {
                    border: 1px solid #734931;
                    background-color: #734931;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
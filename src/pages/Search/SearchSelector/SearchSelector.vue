<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌列表 -->
        <ul class="logo-list">
          <li v-for="trademark in trademarkList" :key="trademark.tmId" @click="trademarkHandler(trademark)">{{trademark.tmName}}</li>
        </ul>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="type-wrap" v-for="attr in attrsList" :key='attr.attrId' >
      <!-- 属性类别 -->
      <div class="fl key">{{attr.attrName}}</div>
      <div class="fl value">
        <!-- 属性值 -->
        <ul class="type-list">
          <li v-for="attrValue in attr.attrValueList" :key='attrValue' @click="attrInfo(attr,attrValue)">
            <a>{{attrValue}}</a>
          </li>

        </ul>
      </div>
      <div class="fl ext"></div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    name: 'SearchSelector',
    computed:{
      ...mapGetters('search',['trademarkList','attrsList'])
    },
    methods:{
      // 添加品牌面包屑--- trademarks
      // 将点击的品牌的信息传给search组件（子传父） 父重新整理数据，重新渲染页面---自定义事件
      trademarkHandler(trademark){
        this.$emit('trademarkInfo',trademark)
      },

      // 商品属性面包屑 --- props
      attrInfo(attr,attrValue){
        this.$emit('attrInfo',attr,attrValue)
        // console.log('attr and value',attr,attrValue);
      }
    }

  }
</script>

<style lang="less" scoped>
  .selector {
    border: 1px solid #ddd;
    margin-bottom: 5px;
    overflow: hidden;

    .logo {
      border-top: 0;
      margin: 0;
      position: relative;
      overflow: hidden;

      .key {
        padding-bottom: 87px !important;
      }
    }

    .type-wrap {
      margin: 0;
      position: relative;
      border-top: 1px solid #ddd;
      overflow: hidden;

      .key {
        width: 100px;
        background: #fffceb;
        line-height: 26px;
        text-align: right;
        padding: 10px 10px 0 15px;
        float: left;
      }

      .value {
        overflow: hidden;
        padding: 10px 0 0 15px;
        color: #333;
        margin-left: 120px;
        padding-right: 90px;

        .logo-list {
          li {
            float: left;
            border: 1px solid #734931;
            margin: -1px -1px 0 0;
            width: 105px;
            height: 52px;
            text-align: center;
            line-height: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
            color: #734931;
            font-style: italic;
            font-size: 14px;
            background-color: #fffceb;
            

            img {
              max-width: 100%;
              vertical-align: middle;
            }
          }
          li:hover{
            color: rgb(143, 182, 175);
          }
        }

        .type-list {
          li {
            float: left;
            display: block;
            margin-right: 30px;
            line-height: 26px;

            a {
              text-decoration: none;
              color: #734931;
            }
            a:hover{
              color: aquamarine;
            }
          }
        }
      }

      .ext {
        position: absolute;
        top: 10px;
        right: 10px;

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
          padding: 0 10px;
          background: #fff;
          border: 1px solid #d5d5d5;
        }

        a {
          color: #666;
        }
      }
    }
  }
</style>
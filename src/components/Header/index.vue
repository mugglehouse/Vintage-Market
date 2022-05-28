<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>Welacom to Vintage Market！</p>
            <!-- 用户未登录 -->
            <p v-if="!userName">
              <!-- 声明式路由导航 -->
              <router-link to="/login" class="login">登录</router-link>
              <router-link to="/register" class="register">注册</router-link>
            </p>
            <!-- 用户已登录 -->
            <p v-else>
              <a>{{ userName }}</a>
              <a class="register" @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <router-link to='/introduct'>About Vintage Market</router-link>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <!-- 声明式路由导航 -->
          <router-link class="logo" title="Vintage Market" to="/home">
            <img src="./images/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <!-- 编程式路由导航 -->
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              Search
            </button>
          </form>

    <span>测试说明：列表选择--手机，搜索框搜--手机/华为/苹果</span>
        </div>
      </div>

    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  methods: {
    // 搜索
    goSearch() {
      // 搜索框里合并query参数
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 退出登录（发请求 + 清除token/userInfo等数据）
    async logout() {
      try {
        await this.$store.dispatch("user/userLogout");
        // 退出成功
        this.$router.push("/home");
      } catch (error) {
        // 退出失败
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #734931;
    height: 30px;
    line-height: 30px;
    color: rgb(255, 243, 243);

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          a {
            color: #b9cebf;
          }

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
            color: #b9cebf;
          }

          .login {
            color: #b9cebf;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;
          color: rgb(255, 243, 243);

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
        a:hover {
          color: #b9cebf;
          text-decoration: none;
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 150px;
          margin: 50px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 120px;
      margin-right: 300px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 35px;
          padding: 0px 4px;
          border: 2px solid #734931;
          border-radius: 10px 0 0 10px;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 35px;
          width: 68px;
          background-color: #734931;
          border: none;
          border-radius: 0 10px 10px 0;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>>

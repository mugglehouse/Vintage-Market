<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>

      <!-- 手机号 -->
      <div class="content">
        <!-- 表单验证--name:验证的字段 -->
        <label>手机号:</label>
        <input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
        <span>11位手机号</span>
      </div>

      <!-- 验证码 -->
      <div class="content">
        <label>验证码:</label>
        <input
          placeholder="请输入你的验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <button style="width: 100px; height: 38px" @click="getCode">
          获取验证码
        </button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>

      <!-- 登录密码 -->
      <div class="content">
        <label>登录密码:</label>
        <input
          placeholder="请输入你的密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
        <span>字母+数字</span>
      </div>

      <!-- 确认密码 -->
      <div class="content">
        <label>确认密码:</label>
        <input
          placeholder="请输入确认密码"
          v-model="password1"
          name="password1"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password1') }"
        />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>

      <!-- 同意协议 -->
      <div class="controls">
        <input
          type="checkbox"
          v-model="agree"
          name="agree"
          v-validate="{ required: true, tongyi: true }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《Vintage Market用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
      </ul>
      <div class="address">Vintage Market</div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      // 收集表单数据
      phone: "",
      code: "",
      password: "",
      password1: "",
      agree: true,
    };
  },

  methods: {
    // 获取验证码
    getCode() {
      // 要进行判断，成功的两个条件为 phone不为空+code成功请求
      const { phone } = this;
      try {
        phone && this.$store.dispatch("user/getCode", phone);
        // 成功--更新code
        this.code = this.$store.state.user.code;
      } catch (error) {
        // 失败--抛错
        alert(error.message);
      }
    },
    // 完成注册
    async userRegister() {
      // 确保全部表单验证成功，才能进入注册
      const success = await this.$validator.validateAll();
      if (success) {
        try {
          const { phone, code, password, password1 } = this;
          phone &&
            code &&
            password == password1 &&
            (await this.$store.dispatch("user/userRegister", {
              phone,
              code,
              password,
            }));
          // 成功--路由跳转到登录页面
          this.$router.push("/login");
        } catch (error) {
          // 失败--抛错
          alert(error.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;
    background-color: #fffeee;

    h3 {
      background: #734931;
      margin: 0;
      padding: 6px 15px;
      color: #fffeee;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #b9cebf;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: #734931;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: #734931;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #734931;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
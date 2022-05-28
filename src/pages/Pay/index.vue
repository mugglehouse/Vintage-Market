<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>欢迎再次购物</h4>   
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入qrcode依赖包
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      payInfo: {},
      timer: null,
      code: "",
    };
  },
  computed: {
    orderId() {
      return this.$route.query.orderId;
    },
  },
  // 不能在生命周期中加async
  mounted() {
    this.getPayInfo();
  },
  methods: {
    async getPayInfo() {
      let result = await this.$API.reqPayInfo(this.orderId);
      console.log("PayInfo", result.data);
      if (result.code == 200) {
        this.payInfo = result.data;
      } else {
        alert(result.data);
      }
    },
    async open() {
      // 1、生成二维码
      // --QRCode返回的是一个promise，需要用async-await获取promise的结果
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      console.log("url", url);
      // 2、设置弹窗（/前面一定要有空格！）
      this.$alert(`<img src=${url} />`, "请你微信支付", {
        dangerouslyUseHTMLString: true,
        center: true,
        showCancelButton: true,
        cancelButtonText: "支付遇见问题",
        confirmButtonText: "已支付成功",
        showClose: false,
        // 弹窗关闭前的回调--设置限定条件
        // --type（confirm/cancle）--instance（当前组件实例）--done（关闭弹窗）
        beforeClose: (type, instance, done) => {
          // 1、取消支付
          if (type == "cancel") {
            alert("请联系管理员");
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 关闭弹窗
            done();
          } else {
            // 2、判断是否支付成功
            // 支付成功
            // if (this.code == 200) {
              clearInterval(this.timer);
              this.timer = null;
              done();
              this.$router.push("/paysuccess");
            // } 
          }
        },
      });
      // 3、判断是否支付成功
      // --长轮询--设置一个定时器--每隔一秒发一次请求询问是否成功支付
      if (!this.timer) {
        this.timer = setInterval(async () => {
          let result = await this.$API.reqPayStatus(this.orderId);
          // console.log("payStatus", result);
          // 支付成功
          if (result.code == 200) {
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 保存code
            this.code = result.code;
            // 关闭弹窗
            this.$msgbox.close();
            // 路由跳转--成功支付页面
            this.$router.push("/paysuccess");
          } else {
            // 支付失败
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;
  background-color: #fffeee;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #734931;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #734931;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #734931;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #734931;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #734931;
        border: 1px solid #734931;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
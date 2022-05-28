<template>
  <div>
    <!-- 猜你喜欢 -->
    <div class="like">
      <div class="py-container">
        <div class="title">
          <h3 class="fl">猜你喜欢</h3>
          <a href="javascript:;" class="fr tip changeBnt">换一换</a>
        </div>
        <div class="bd">
          <ul class="favourate">
            <li>
              <img src="./images/like_01.png" alt="" />
              <div class="like-text">
                <p>佳能单反</p>
                <h3>¥198000.00</h3>
              </div>
            </li>
            <li>
              <img src="./images/like_02.png" alt="" />
              <div class="like-text">
                <p>复古喇叭音响</p>
                <h3>¥48000.00</h3>
              </div>
            </li>
            <li>
              <img src="./images/like_03.png" alt="" />
              <div class="like-text">
                <p>牛仔皮帽</p>
                <h3>¥12000.00</h3>
              </div>
            </li>
            <li>
              <img src="./images/like_04.png" alt="" />
              <div class="like-text">
                <p>80年代闹钟</p>
                <h3>¥4900.00</h3>
              </div>
            </li>
            <li>
              <img src="./images/like_05.png" alt="" />
              <div class="like-text">
                <p>60年代老爷车</p>
                <h3>¥4900000.00</h3>
              </div>
            </li>
            <li>
              <img src="./images/like_06.png" alt="" />
              <div class="like-text">
                <p>中世纪皇冠</p>
                <h3>¥1900.00</h3>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Like",
};
</script>

<style lang="less" scoped>
.like {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      overflow: hidden;

      .fl {
        float: left;
        font-size: 20px;
        line-height: 30px;
        color: #734931;
      }

      .fr {
        float: right;
        width: 66px;
        height: 25px;
        font-size: 15px;
        font-weight: 400;
        color: #734931;
        text-decoration: none;
      }
    }

    .bd {
      .favourate {
        overflow: hidden;
        padding: 10px 10px;
        box-sizing: border-box;
        display: flex;

        li {
          height: 250px;
          margin: 0 -1px;
          overflow: hidden;
          background-color: rgb(255, 253, 243);
          position: relative;
          width: 16.667%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          img {
            height: 142px;
            transition: all 400ms;

            &:hover {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }

          .like-text {
            padding: 0;
            width: 142px;
            border-right: 1px solid #6f4747;

            p {
              margin: 5px 0;
            }

            h3 {
              color: rgb(160, 61, 36);
              font-size: 20px;
              line-height: 30px;
              margin: 9px 0;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>
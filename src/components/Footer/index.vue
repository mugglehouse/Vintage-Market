<template>
  <div>
    <footer class="footer w">
      <div class="logo1">
        <router-link to='/introduct' class="me">
          <img src="./images/logo2.png" alt="About us" />
          <p>About me</p>
        </router-link>
      </div>
      <div class="foot">
        <div class="f5">
          <ul>
            <li>Want to get in touch? We’d love to hear from you!</li>
            <li>Contact with 863457210@qq.com</li>
            <li>Or weibo named muggle</li>
            <li>©2022 Muggle Terms and Conditions Privacy Cookie Policy</li>
          </ul>
        </div>
        <div class="f6">
          <ul>
            <li>
              <a href="">Pricing</a>
            </li>
            <li><a href="">Exolore</a></li>
            <li><a href="">Join us</a></li>
            <li><a href="">About</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>

.w {
  width: 1200px;
  margin: 0px auto;
}
.footer {
  height: 400px;
  color: #fff5e7;
}

.logo1 {
  width: 250px;
  height: 250px;
  margin: 30px auto;
}

.logo1 img {
  width: 230px;
  height: 230px;
  transition: all 0.5s;
}

.logo1 img:hover {
  width: 240px;
  height: 240px;
}

.logo1 p {
  text-align: center;
  font-size: 16px;
}

.foot {
  position: relative;
  height: 210px;
  background-color: #734931;
}

.foot .f5 ul {
  float: left;
  width: 600px;
  margin: 20px;
}

.foot .f6 ul {
  float: right;
  width: 100px;
  margin: 20px;
}

.foot ul li {
  padding: 10px;
  font-size: 16px;
}

.foot a {
  color: #fff5e7;
}

.foot a:hover {
  color: aquamarine;
  text-decoration: none;

}

.me:hover{
    color: #fff5e7;
    text-decoration: none;
}
</style>
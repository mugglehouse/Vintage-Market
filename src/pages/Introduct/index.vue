<template>
  <div>
    <!-- body -->
    <div class="mus w">
      <!-- text -->
      <div class="txt">
        <p>Welcom to Muggle Vintage Market</p>
      </div>
      <!-- bear -->
      <div class="bear"></div>
      <div class="run"></div>
      <!-- audio -->
      <div class="music">
        <audio controls id="auto"  autoplay="autoplay" loop="loop">
          <source src="./media/music1.mp3" audio="audio/mpeg" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
name: "Introduct";
export default {};
</script>

<style>
/* 1、主体 */

/*（1） 音乐 */

.w {
  width: 1200px;
  margin: 0 auto;
}

.mus {
  position: relative;
  height: 600px;
  top: 60px;
}

/* 小熊 */

.bear {
  position: absolute;
  width: 250px;
  height: 250px;
  left: 40%;
  top: 80px;
  background-color: #734931;
  border-radius: 150px;
  transition: all 0.5s;
}

.bear:hover {
  width: 270px;
  height: 270px;
  left: 39%;
}

.run {
  position: absolute;
  width: 200px;
  height: 100px;
  top: 140px;
  background: url(./images/bear.png);
  animation: bear 0.5s steps(8) infinite, move 2s linear forwards;
}

@keyframes bear {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1600px 0;
  }
}

@keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: 50%;
    transform: translateX(-50%);
  }
}

/* 音乐播放器 */

.music {
  position: absolute;
  width: 301px;
  height: 50px;
  top: 380px;
  left: 457px;
  background-color: #734931;
  border-radius: 50px;
}

audio {
  position: absolute;
  padding: 8px 8px 12px 8px;
}

/* （2）文本 */

.txt {
  position: absolute;
  width: 0px;
  height: 50px;
  left: 30%;
  font-size: 30px;
  color: #734931;
  overflow: hidden;
  /* 文字强制一行内显示 */
  white-space: nowrap;
  animation: w 2s steps(28) forwards;
}

@keyframes w {
  0% {
    width: 0;
  }
  100% {
    width: 520px;
  }
}

/* CSS的初始化 */

/* 把我们所有标签的内外边距清零 */

* {
  margin: 0;
  padding: 0;
  /* css3盒子模型 */
  box-sizing: border-box;
}

/* em 和 i 斜体的文字不倾斜 */

em,
i {
  font-style: normal;
}

/* 去掉li 的小圆点 */

li {
  list-style: none;
}

img {
  /* border 0 照顾低版本浏览器 如果 图片外面包含了链接会有边框的问题 */
  border: 0;
  /* 取消图片底侧有空白缝隙的问题 */
  vertical-align: middle;
}

button {
  /* 当我们鼠标经过button 按钮的时候，鼠标变成小手 */
  cursor: pointer;
}

a {
  color: #734931;
  text-decoration: none;
}

a:hover {
  color: #734931;
}

button,
input {
  /* "\5B8B\4F53" 就是宋体的意思 这样浏览器兼容性比较好 */
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  /*去除搜索和按钮边框 */
  border: 0;
  outline: none;
}

body {
  /* CSS3 抗锯齿形 让文字显示的更加清晰 */
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  color: #666;
}

.hide,
.none {
  display: none;
}

/* 清除浮动 */

.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}

.clearfix {
  *zoom: 1;
}
</style>
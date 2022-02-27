<template>
  <div class="box">
    <img name="images" src="/images/CSS3/CardPackage/1.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/2.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/3.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/4.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/5.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/6.jpeg" alt="" />
  </div>
</template>
<style scoped>
/* 清楚默认样式 */
* {
  margin: 0;
  padding: 0;
}
.box {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 500px;
  width: 300px;
  height: 188px;
}
.box img {
  position: absolute;
  width: 300px;
  height: 188px;
  left: 0;
  top: 0;
  /* 设置公共基准点 */
  transform-origin: top right;
  /* 设置旋转动画 */
  transition: all 1s ease;
}
.box:hover img:nth-child(1) {
  transform: rotate(60deg);
}
.box:hover img:nth-child(2) {
  transform: rotate(120deg);
}
.box:hover img:nth-child(3) {
  transform: rotate(180deg);
}
.box:hover img:nth-child(4) {
  transform: rotate(240deg);
}
.box:hover img:nth-child(5) {
  transform: rotate(300deg);
}
.box:hover img:nth-child(6) {
  transform: rotate(360deg);
}
</style>
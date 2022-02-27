<template>
  <div class="box">
    <img name="images" src="/images/CSS3/CardPackage/1.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/2.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/3.jpeg" alt="" />
  </div>
  <div class="box2">
    <img name="images" src="/images/CSS3/CardPackage/4.jpeg" alt="" />
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
  margin: 10px auto;
  width: 300px;
  height: 564px;
  border: 2px solid blue;
  /* 透视 */
  perspective: 500px;
}
.box2 {
  position: relative;
  margin: 10px auto;
  width: 300px;
  height: 188px;
  border: 2px solid red;
  /* 透视 */
  perspective: 500px;
}
.box img {
  float: left;
  width: 300px;
  height: 188px;
}
.box2 img {
  width: 300px;
  height: 188px;
}

.box img:nth-child(1):hover {
  transition: all 1s ease;
  transform: translateX(200px);
}
.box img:nth-child(2):hover {
  transition: all 1s ease;
  transform: translateY(100px);
}
.box img:nth-child(3):hover {
  transition: all 1s ease;
  transform: translateZ(50px);
}
.box2 img:nth-child(1) {
  /* transition: all 1s ease; */
  /* 旋转和位移可以同时设置，但是顺序不同，导致效果也有差异 */
  transform: rotateY(70deg) translateX(150px);
}
</style>
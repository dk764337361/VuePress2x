<template>
  <div class="carousel">
    <div class="pic">
      <img src="/images/CSS3/lunbo1/01.jpg" alt="" />
      <img src="/images/CSS3/lunbo1/02.jpg" alt="" />
      <img src="/images/CSS3/lunbo1/03.jpg" alt="" />
      <img src="/images/CSS3/lunbo1/01.jpg" alt="" />
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.carousel {
  position: relative;
  width: 800px;
  height: 500px;
  margin: 50px auto;
  border: 2px solid black;
  overflow: hidden;
}
.carousel .pic {
  position: absolute;
  left: 0;
  width: 5000px;
  height: 500px;
  /* 添加绑定动画 */
  -webkit-animation: move 10s ease infinite;
}
.carousel .pic img {
  float: left;
  width: 800px;
  height: 500px;
}
/* 百分比定义动画细节 */
@keyframes move {
  /* 动画过程，可以添加任意百分比出的动画细节 */
  /* 从头开始，最好保持跟默认样式的状态一致 */
  0% {
    transform: translateX(0);
  }
  33.33% {
    transform: translateX(-800px);
  }
  66.66% {
    transform: translateX(-1600px);
  }
  100% {
    transform: translateX(-2400px);
  }
}
</style>
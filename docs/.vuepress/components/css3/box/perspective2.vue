<template>
  <div class="box">
    <img name="images" src="/images/CSS3/CardPackage/1.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/2.jpeg" alt="" />
    <img name="images" src="/images/CSS3/CardPackage/3.jpeg" alt="" />
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
        margin: 100px auto;
        width: 300px;
        height: 564px;
        border: 1px solid black;
        /* 透视 */
        perspective: 1000px;
      }
      .box img {
        /* position: absolute; */
        width: 300px;
        height: 188px;
        float: left;
        /* left: 0;
        top: 0; */
      }
      .box img:nth-child(1):hover {
        transition: all 1s ease;
        transform: rotateX(60deg);
      }
      .box img:nth-child(2):hover {
        transition: all 1s ease;
        transform: rotateY(60deg);
      }
      .box img:nth-child(3):hover {
        transition: all 1s ease;
        transform: rotateZ(50deg);
      }
</style>
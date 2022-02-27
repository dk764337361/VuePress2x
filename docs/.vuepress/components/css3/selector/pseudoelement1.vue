<template>
  <div class="box">
    <p class="ps0">这是第一行段落</p>
    <p class="ps1">这是第二行段落</p>
    <p></p>
    <p></p>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 400px;
  padding: 10px;
  border: 1px solid #000;
}
.box p {
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  background-color: skyblue;
}
/* 给box盒子内部提娜佳伪元素 */
.box::before {
  content: "1";
  display: block; /*需要处理成块级元素才能设置高宽*/
  width: 200px;
  height: 50px;
  background-color: gold;
  margin-bottom: 10px;
}
.ps0::first-letter {
  color: red;
  font-size: 30px;
}
.ps1::first-line {
  color: yellow;
}
</style>
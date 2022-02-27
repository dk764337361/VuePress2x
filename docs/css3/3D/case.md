# 3D 正方形案例

<img src="/images/CSS3/027.png" style="width: 100%; display:inline-block; margin: 0 ;">

## 旋转坐标

<img src="/images/CSS3/028.png" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/CSS3/029.png" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/CSS3/030.png" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/CSS3/031.png" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/CSS3/032.png" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/CSS3/033.png" style="width: 100%; display:inline-block; margin: 0 ;">

## 设置 transform-style
::: details 点击查看代码
```vue {30-31}
<template>
  <div class="box">
    <div class="stage">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  </div>
</template>
<style scoped>
/* 清除默认样式 */
* {
  margin: 0;
  padding: 0;
}
.box {
  margin: 200px auto;
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
.stage {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid black;
  /* 设置内部子元素再3D空间进行展示 */
  transform-style: preserve-3d;
  /* 透视 */
  perspective: 5000px;
  /* 过渡 */
  transition: all 4s ease;
}
.stage:hover {
  transform: rotateX(360deg) rotateY(360deg);
  -webkit-transform: rotateX(360deg) rotateY(360deg);
}
.stage div {
  position: absolute;
  width: 200px;
  height: 200px;
  text-align: center;
  font: bold italic 80px/200px "arial";
}
.stage div:nth-child(1) {
  background-color: rgba(255, 0, 0, 0.5);
  transform: translateZ(100px);
}
.stage div:nth-child(2) {
  background-color: rgba(0, 255, 0, 0.5);
  transform: rotateX(90deg) translateZ(100px);
}
.stage div:nth-child(3) {
  background-color: rgba(0, 0, 255, 0.5);
  transform: translateZ(-100px);
}
.stage div:nth-child(4) {
  background-color: rgba(255, 255, 0, 0.5);
  transform: rotateX(90deg) translateZ(-100px);
}
.stage div:nth-child(5) {
  background-color: rgba(255, 0, 255, 0.5);
  transform: rotateY(90deg) translateZ(100px);
}
.stage div:nth-child(6) {
  background-color: rgba(0, 255, 255, 0.5);
  transform: rotateY(90deg) translateZ(-100px);
}
</style>
```
::: 

光标移到图片试试看:laughing::laughing:

<BoxCase />

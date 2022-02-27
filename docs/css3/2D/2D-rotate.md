# 2D 转换-旋转

## 旋转-rotate()

transform 的属性值为rotate()时，可以实现元素的旋转。
<img src="/images/CSS3/020.png" style="width: 30%; display: block; margin: 0 ;">

### 书写语法：
totate(数字deg)

其中，deg为度数单位，正数表示顺时针旋转，负数表示逆时针旋转。2D的旋转只有一个属性值。

::: warning
元素旋转后，坐标轴也跟着发生转变。

因此，多个属性值同时设置给transform时，书写顺序不同导致的转换效果有差异。
:::
```vue {15-19}
<template>
  <div class="BoxTransition"> <img src="/images/CSS3/sea.jpg" alt=""></div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.BoxTransition {
  margin-top: 150px;
  width: 450px;
  height: 338px;
  border: 2px solid black;
}
.BoxTransition img:hover {
  /* 先位移后旋转 */
  /* transform: translate(150px) rotate(40deg); */
  /* 先旋转后位移 */
  transform: rotate(40deg) translate(150px);
}
</style>
```
光标移到图片试试看:laughing::laughing:

<BoxRotate />
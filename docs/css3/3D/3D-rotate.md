# 3D转换-旋转rotate()

3D旋转比2D旋转更复杂，需要分别对三个方向的旋转值：

| 值            | 说明              |
| -------------- | ------------------- |
| rotateX(angle) | 定义沿着X轴的3D旋转 |
| rotateX(angle) | 定义沿着Y轴的3D旋转 |
| rotateX(angle) | 定义沿着Z轴的3D旋转 |

::: warning
元素旋转后，坐标轴也跟着发生转变。

属性值的角度分正负，正数表示沿对坐标轴顺时针方向旋转，负数表示沿对坐标轴逆时针方向旋转。
:::

<img src="/images/CSS3/026.png" style="width: 50%; display:inline-block; margin: 0 ;">

```vue {20-21,30-41}
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
```
光标移到图片试试看:laughing::laughing:


<perspective2 />

# 3D转换-透视perspective

- transform属性不止能实现2D转换，也可以制作3D立体转换效果，比普通的X、y轴组成的平面效果多了一条z轴，如下图：
<img src="/images/CSS3/024.png" style="width: 50%; display: block; margin: 0 ;">

## 透视的概念

电脑显示屏是一个2D平面，图像之所以具有立体感（3D效果），其实只是以中国视觉呈现，通过透视可以实现此目的。

透视可以将一个2D平面，在转换的过程中，呈现3D效果。

透视特点：近大远小。

::: tip
并非任何情况下需要透视效果，根据开发需要进行设置，如果需要展示z轴的变化，则设置透视效果。
:::

## 透视属性perspective

属性名：perspective

作用：设置在z轴的视线焦点的观察位置，从而实现3D查看效果。

属性值：像素值，数值越大，观察点距离z轴原点越远，图形效果越完整且接近原始尺寸。

::: warning
透视属性需要设置给3D变化元素的父级。
:::

## 3D旋转

3D旋转比2D旋转更复杂，需要分别对三个方向的旋转值：

| 值            | 说明              |
| -------------- | ------------------- |
| rotateX(angle) | 定义沿着X轴的3D旋转 |
| rotateY(angle) | 定义沿着Y轴的3D旋转 |
| rotateX(angle) | 定义沿着Z轴的3D旋转 |

<img src="/images/CSS3/025.png" style="width: 50%; display:inline-block; margin: 0 ;">

```vue {18-19,28-31}
<template>
  <div class="box">
    <img name="images" src="/images/CSS3/CardPackage/1.jpeg" alt="" />
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
        margin: 500px auto;
        width: 300px;
        height: 188px;
        border: 1px solid black;
        /* 透视 */
        perspective: 1000px;
      }
      .box img {
        position: absolute;
        width: 300px;
        height: 188px;
        left: 0;
        top: 0;
      }
      .box img:hover {
        transition: all 1s ease;
        transform: rotateX(50deg);
      }
</style>
```
光标移到图片试试看:laughing::laughing:


<perspective1 />

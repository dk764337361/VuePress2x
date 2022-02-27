# 2D转换-基准点
## transform-origin 属性

作用：

- 设置调整元素的水平和垂直方向原点的位置。
- 调整元素的基准点。

属性值：包含两个，中间使用空格分隔。

| 值 | 说明                                                             |
| -- | ------------------------------------------------------------------ |
| x  | 定义X轴的原点在何处。可能的值：left、center、right、像素值、百分比 |
| y  | 定义Y轴的原点在何处。可能的值：top、center、bottom、像素值、百分比 |

```vue {15-18}
<template>
  <div class="BoxTransition"><img src="/images/CSS3/sea.jpg" alt="" /></div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.BoxTransition {
  margin-top: 100px;
  width: 350px;
  height: 263px;
  border: 2px solid black;
}
.BoxTransition img:hover {
/*以top为原点 */
  transform-origin: top left;
  transform: rotate(30deg);
}
</style>
```
<img src="/images/CSS3/023.png" style="width: 70%; display: block; margin: 0 ;">
<img src="/images/CSS3/022.png" style="width: 70%; display: block; margin: 0 ;">

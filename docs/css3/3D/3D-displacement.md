# 3D 位移 translate()

位移也分三个方向的移动：

属性值：

| 值            | 说明              |
| -------------- | ------------------- |
| translateX() | 定义沿着X轴的位移值 |
| translateY() | 定义沿着Y轴的位移值 |
| translateZ() | 定义3D位移，设置Z轴的位移值 |

属性值为像素值或百分比，正负表示位移的方向。正值向对应轴的正方向移动，负值向对应轴的负方向移动。

```css
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
.box2 img:nth-child(1){
  /* transition: all 1s ease; */
  /* 旋转和位移可以同时设置，但是顺序不同，导致效果也有差异 */
  transform: rotateY(70deg) translateX(150px);
}
```
光标移到图片试试看:laughing::laughing:


<perspective3 />

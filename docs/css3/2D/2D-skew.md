# 2D 转换-倾斜

## 缩放 skew()

transform 的属性值为 skew()时，可以实现元素的倾斜。
<img src="/images/CSS3/021.png" style="width: 30%; display: block; margin: 0 ;">


### 书写语法：
transform:skew(数字deg,数字deg);

两个属性值分别表示水平和垂直方向倾斜的角度，属性值可以为正可以为负，第二个数值不写默认为0。
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
  /* transform: skew(0,30deg); */
  /* transform: skew(20deg,30deg); */
  /* transform: skew(20deg,-30deg); */
  transform: skew(30deg);
}
</style>
```

<BoxSkew />
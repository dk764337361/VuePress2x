# 边框圆角 border-radius

- 属性名：border-radius
- 作用：设置边框的圆角。
- 属性值： 可以是像素值，或者百分比。

| 属性值            | 说明                                                                |
| ----------------- | ------------------------------------------------------------------- |
| x-radius/y-radius | /分割两部分属性值，前面为水平半径，后面为垂直半径，得到的是椭圆角。 |
| radius            | 一个属性值，则水品和垂直都设置为同一个值，得出圆角效果。            |

```css
border-radius: 100px/30px; /*水平/垂直*/
```

<img src="/images/CSS3/005.png" style="width: 40%; display: block; margin: 0 ;">

## 圆形写法

#### 写法一

```css
border-radius: 50px; /*当曲率为宽高的一半时为正圆*/
```

或

```css
border-radius: 50%; /*百分比是按宽度大小的比例进行计算，50%为正圆*/
```

<img src="/images/CSS3/006.png" style="width: 20%; display: block; margin: 0 ;">

#### 写法二

```css
.radius3 {
  width: 100px;
  height: 100px;
  padding: 30px;
  border-radius: 130px; /*当有padding或其他属性时，宽高要加上这类属性的值才能变为正圆*/
  background-color: gold;
}
```

<img src="/images/CSS3/007.png" style="width: 100%; display: block; margin: 0 ;">

## 单一属性

- `border-top-left-radius` ：左上角半径；
- `border-top-right-radius` ：右上角半径；
- `border-bottom-right-radius` ：右下角半径；
- `border-bottom-left-radius` ：左下角半径；

```css
.radius4 {
  width: 200px;
  height: 200px;
  border-top-left-radius: 10%;
  border-top-right-radius: 20%;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 50px;
  background-color: yellowgreen;
}
```
<img src="/images/CSS3/008.png" style="width: 100%; display: block; margin: 0 ;">

## 简写方法(四值法)

- `border-radius` 相当于四个单一属性的简写方法，类似 padding 也可以有四种植的写法。
- `border-radius` ：`左上角` `右上角` `右下角` `左下角`；
- `border-radius` ：`左上角 右上角` 和 `右下角 左下角`；
- `border-radius` ：`左上角和右下角` `右上角和左下角`；
- `border-radius` ：四个角相同；

```css
.radius5 {
  width: 200px;
  height: 200px;
  /* border-radius:20px 40px 60px 80px; */
  /* border-radius:20px 40px 10px; */
  /* border-radius:20px 50px; */
  border-radius: 50px;
  background-color: blue;
}
```

## `/`的属性值写法

- `border-radius`属性值中出现了`/`斜线，那么`/`前面那可以设置水平方向四种值的写法，`/`后面那可以设置垂直方向四种值的写法。

```css
.radius6 {
  width: 200px;
  height: 200px;
  border-radius: 50% 20% 40%/20% 30%;
  background-color: pink;
}
```
<img src="/images/CSS3/004.png" style="width: 40%; display: block; margin: 0 ;">

### 浏览器兼容

- IE8 及以下版本浏览器不支持`border-radius`属性，其他浏览器都支持。

### 举例：

::: details 点击查看代码

```vue
<template>
  <div class="radius1"></div>
  <div class="radius2"></div>
  <div class="radius3"></div>
  <div class="radius4"></div>
  <div class="radius5"></div>
  <div class="radius6"></div>
</template>
<style scoped>
.radius1 {
  width: 100px;
  height: 100px;
  border-radius: 50px; /*当曲率为宽高的一半时为正圆*/
  /*border-radius: 50%;*/ /*百分比是按宽度大小的比例进行计算，50%为正圆*/
  background-color: pink;
}
.radius2 {
  width: 200px;
  height: 100px;
  border-radius: 100px/30px; /*水平/垂直*/
  background-color: gold;
}
.radius3 {
  width: 100px;
  height: 100px;
  padding: 30px;
  border-radius: 130px; /*当有padding或其他属性时，宽高要加上这类属性的值才能变为正圆*/
  background-color: gold;
}
.radius4 {
  width: 200px;
  height: 200px;
  border-top-left-radius: 10%;
  border-top-right-radius: 20%;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 50px;
  background-color: yellowgreen;
}
.radius5 {
  width: 200px;
  height: 200px;
  /* border-radius:20px 40px 60px 80px; */
  /* border-radius:20px 40px 10px; */
  /* border-radius:20px 50px; */
  border-radius: 50px;
  background-color: blue;
}
.radius6 {
  width: 200px;
  height: 200px;
  border-radius: 50% 20% 40%/20% 30%;
  background-color: pink;
}
</style>
```
:::


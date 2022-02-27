## margin 塌陷

- 同级塌陷：如果两个盒子都设置了 margin-？会出现 margin 重叠，较大的 margin 包含较小的 margin。
  <img src="/images/css/030.png" style="width: 100%; display: block; margin: 0 ;">
  ::: tip 提示
  解决方法：只设置其中一边的 margin
  :::

```css
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
  /* margin-bottom: 50px; */
}
.box1 {
  width: 200px;
  height: 200px;
  background-color: burlywood;
  margin-top: 120px;
}
```

- 父子元素塌陷：如果父不设置了 margin，儿子设置了，会出现子重叠父的 margin 0。
  <img src="/images/css/031.png" style="width: 100%; display: block; margin: 0 ;">

::: tip 提示
解决方法：不使用儿子的 margin，而使用父的 padding 或 border 将边距分隔开。
:::

```css
* {
  margin: 0;
  padding: 0;
}
.box2 {
  width: 200px;
  height: 150px;
  padding-top: 50px;
  background-color: cornflowerblue;
}
.box2 p {
  width: 100px;
  height: 100px;
  background-color: rgb(54, 238, 9);
}
```

- 水平方向没有 margin 塌陷
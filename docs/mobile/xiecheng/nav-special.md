# 携程网首页-nav 特殊结构布局

# 前期准备
- 倍数计算，用于`民俗·客栈`这一格子
<img src="/images/mobile/flex/043.png" style="width: 100%; display:block; margin: 0 ;">


::: tip HTML 修改之处
第一个 nav-common，删除了一个 a 标签组合
:::

```html{4-12}
<!-- 主导航部分开始 -->
<nav class="nav">
  <div class="nav-common">
    <a href="#">
      <span>机票</span>
    </a>
    <a href="#">
      <span>火车票</span>
    </a>
    <a href="#">
      <span>汽车·船票</span>
    </a>
  </div>
  <div class="nav-common">
    <a href="#">
      <span>机票</span>
    </a>
    <a href="#">
      <span>火车票</span>
    </a>
    <a href="#">
      <span>汽车·船票</span>
    </a>
    <a href="#">
      <span>专车·租车</span>
    </a>
  </div>
  <div class="nav-common">
    <a href="#">
      <span>机票</span>
    </a>
    <a href="#">
      <span>火车票</span>
    </a>
    <a href="#">
      <span>汽车·船票</span>
    </a>
    <a href="#">
      <span>专车·租车</span>
    </a>
  </div>
</nav>
<!-- 主导航部分结束 -->
```

```css{35-53}
/* 主导航部分开始 */
.nav {
  margin: 0 12px;
  border-radius: 8px;
  overflow: hidden;
}
.nav .nav-common {
  display: flex;
  background-image: linear-gradient(to right, #4b8fed, #53bced);
  border-bottom: 1px solid #fff;
}
.nav .nav-common a:nth-child(3) {
  border-bottom: 0;
}
.nav .nav-common a {
  padding: 25.6px 0;
  line-height: 14px;
  color: #fff;
}
.nav .nav-common a:nth-child(1) {
  flex: 1.347;
  padding-left: 12px;
  background: url(../images/flight.png) no-repeat right bottom;
  background-size: auto 34px;
}
.nav .nav-common a:nth-child(2) {
  background: url(../images/train.png) no-repeat left bottom;
  background-size: 37px auto;
}
.nav .nav-common a:nth-child(n + 2) {
  flex: 1;
  border-left: 1px solid #fff;
  text-align: center;
}
/* 添加导航中不同的样式部分 */
.nav .nav-common:nth-child(1) {
  background-image: linear-gradient(to right, #fa5a56, #fb8550 56%);
}
.nav .nav-common:nth-child(1) a:nth-child(3) {
  flex: 2;
  background-image: url(../images/hot_sale.png), linear-gradient(to right, #ffbc49, #ffd252);
  background-size: 161px auto;
  background-position: right bottom;
  color: #a05416;
}
.nav .nav-common:nth-child(1) a:nth-child(1) {
  background-image: url(../images/hotel.png);
  background-size: 73px auto;
}
.nav .nav-common:nth-child(1) a:nth-child(2) {
  background-image: url(../images/minsu.png);
  background-size: 73px auto;
}
/* 主导航部分结束 */
```

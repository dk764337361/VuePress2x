# 携程网首页-nav 公共结构布局

## 前期准备

- 倍数的计算

<img src="/images/mobile/flex/041.png" style="width: 100%; display:block; margin: 0 ;">

## 效果制作

<img src="/images/mobile/flex/042.png" style="width: 50%; display:block; margin: 0 ;">

```html
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

```css
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
.nav .nav-common a:nth-child(3) {
  border-bottom: 0;
}
/* 主导航部分结束 */
```



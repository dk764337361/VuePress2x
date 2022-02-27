# 携程网首页-热门活动底部布局

<img src="/images/mobile/flex/047.png" style="width: 50%; display:block; margin: 0 ;">

```html
<!-- 热门活动区域开始 -->
<div class="sales-box">
  <div class="sales-hd">
    <h2>
      <i></i>
    </h2>
    <a href="#" class="more">获取更多福利</a>
  </div>
  <div class="sales-bd">
    <a href="#">
      <img src="images/activity_01.png" alt="" />
      <span>广告</span>
    </a>
    <a href="#">
      <img src="images/activity_02.jpg" alt="" />
      <span>广告</span>
    </a>
  </div>
</div>
<!-- 热门活动区域结束 -->
```

```css
/* 热门活动区域开始 */
.sales-box {
  border-top: 1px solid #dbdbdb;
}
.sales-box .sales-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  padding: 0 8px 1px;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
}
.sales-box .sales-hd h2 {
  position: relative;
  width: 79px;
  height: 15px;
  background: url(../images/hot.png) no-repeat 0 -20px;
  background-size: 79px auto;
}
.sales-box .sales-hd h2 i {
  position: absolute;
  right: -40px;
  top: 0;
  width: 36px;
  height: 15px;
  background: url(../images/icon-gg@2x.png) no-repeat;
  background-size: 36px auto;
}
.sales-box .sales-hd .more {
  position: relative; /*.more::after需要用父相子绝*/
  height: 20px;
  padding: 0 18px 0 12px;
  border-radius: 10px;
  background-image: linear-gradient(to right, #dc5569, #e068c4);
  font-size: 12px;
  color: #fff;
}
.sales-box .sales-hd .more::after {
  position: absolute;
  right: 9px;
  top: 5px;
  content: "";
  display: block;
  width: 7px;
  height: 7px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
}
.sales-box .sales-bd {
  display: flex;
  width: 100%;
}
.sales-box .sales-bd a {
  flex: 1;
  position: relative;
  border-top: 2px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
}
.sales-box .sales-bd a:nth-child(1) {
  border-right: 1px solid #f2f2f2;
}
.sales-box .sales-bd a img {
  display: block;
  width: 100%;
}
.sales-box .sales-bd a span {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 26px;
  height: 14px;
  border-top-right-radius: 4px;
  background-color: #b3b3b3;
  color: #fff;
  font-size: 12px;
  line-height: 14px;
}
/* 热门活动区域结束 */
```

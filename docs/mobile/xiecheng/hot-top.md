# 携程网首页-热门活动顶部布局
## 常见模块命名
<img src="/images/mobile/flex/046.png" style="width: 100%; display:block; margin: 0 ;">

## 前期准备

- normalize.css 只是初始化，并没有清除 h 标签的默认边距。
- 在 index.css 添加

```css
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  padding: 0;
}
```

## 制作效果

<img src="/images/mobile/flex/045.png" style="width: 50%; display:block; margin: 0 ;">

```html
<!-- 热门活动区域开始 -->
<div class="sales-box">
  <div class="sales-hd">
    <h2>
      <i></i>
    </h2>
    <a href="#" class="more">获取更多福利</a>
  </div>
  <div class="sales.bd"></div>
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
/* 热门活动区域结束 */
```

# 京东首页-优惠活动布局

  <img src="/images/mobile/mobilebase/029.png" style="width: 80%; display:block; margin: 0 ;">
- index.html

```html
<!-- 优惠活动布局开始 -->
<div class="youhui">
  <a href=""><img src="images/banner_bottom_01.dpg" alt=""/></a>
  <a href=""><img src="images/banner_bottom_02.dpg" alt=""/></a>
  <a href=""><img src="images/banner_bottom_03.dpg" alt=""/></a>
</div>
<!-- 优惠活动布局结束 -->
```

- index.css

```css
/* 优惠活动部分 */
.youhui {
  width: 100%;
  overflow: hidden;
}
.youhui a {
  float: left;
  width: 33.333%;
}
.youhui a img {
  display: block;
  width: 100%;
}
/* 优惠活动部分结束 */
```

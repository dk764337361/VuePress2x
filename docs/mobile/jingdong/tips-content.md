# 京东首页-tips 区域内容填充

## X 和logo

- index.html

```html{3-4}
<!-- 提示内容，跳转App开始 -->
<div class="top-tips">
  <div><img src="images/close.png" alt="" /></div>
  <div><img src="images/logo1.png" alt="" /></div>
  <div>3</div>
  <div>4</div>
</div>
<!-- 提示内容，跳转App结束 -->
```

- index.css
```css
.top-tips div:nth-child(1) img {
  width: 10px;
}
.top-tips div:nth-child(2) img {
  width: 30px;
}
```
::: tip 提示
- 此时会出现 logo1.png 底部基线对齐 close.png
:::
  <img src="/images/mobile/mobilebase/013.png" style="width: 60%; display:inline-block; margin: 0 ;">

::: tip 提示
* 解决方法：设置垂直方向的对齐
:::
  <img src="/images/mobile/mobilebase/014.png" style="width: 60%; display:inline-block; margin: 0 ;">

```css{3-4,8-9}
.top-tips div:nth-child(1) img {
  width: 10px;
  /* 设置垂直方向的对齐 */
  vertical-align: middle;
}
.top-tips div:nth-child(2) img {
  width: 30px;
  /* 设置垂直方向的对齐 */
  vertical-align: middle;
}
```

## 提示语和“立即打开”
  <img src="/images/mobile/mobilebase/015.png" style="width: 60%; display:inline-block; margin: 0 ;">

- index.html

```html{5-6}
    <!-- 提示内容，跳转App开始 -->
    <div class="top-tips">
    <div><img src="images/close.png" alt=""></div>
    <div><img src="images/logo1.png" alt=""></div>
    <div>打开京东APP，购物更轻松</div>
    <div>立即打开</div>
  </div>
    <!-- 提示内容，跳转App结束 -->
```

- index.css
```css{4-5}
.top-tips div:nth-child(4) {
  float: left;
  width: 25%;
  height: 45px;
  background-color: #f63515;
}
```


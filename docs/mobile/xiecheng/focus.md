# 携程网首页-焦点图布局

## 前期补充
- 补充：给 search-index 添加固定定位

```css
.search-index {
  position: fixed; /*添加固定定位*/
  left: 0;
  top: 0;
  z-index: 20; /*防止被焦点图部分压盖*/
  display: flex;
  width: 100%;
  height: 44px;
  padding-left: 12px;
  box-sizing: border-box;
  background-color: pink;
  align-items: center;
}
```

## 焦点图效果图

<img src="/images/mobile/flex/038.png" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/mobile/flex/039.png" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!-- 焦点图部分 -->
<div class="focus">
  <a href="#">
    <img src="images/banner.jpg" alt="" />
  </a>
</div>
<!-- 焦点图部分结束 -->
```

```css
/* 焦点图部分 */
.focus {
  position: relative; /* 焦点图渐变颜色，用父相子绝 */
  width: 100%;
  padding: 0 25%;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  transform: translateX(-16.6666%); /* 向左移动25%，25%÷100%=-16.6666% */
  overflow: hidden;
}
.focus a {
  display: block;
}
.focus a img {
  display: block;
  width: 100%;
}
.focus::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0)
  );
}
/* 焦点图部分结束 */
```

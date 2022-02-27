# 阿里百秀-header 区域响应式制作

## logo 区域响应式制作

- index.html

```html
<!-- Logo区域 -->
<h1 class="logo">
  <a href="index.html">
    <!-- 响应式图片：https://v3.bootcss.com/css/#helper-classes -->
    <img src="images/logo.png" class="img-responsive hidden-xs" />
    <!-- class="visible-xs"在超小屏幕中隐藏 -->
    <span class="visible-xs">阿里百秀</span>
  </a>
</h1>
<!-- Logo区域结束 -->
```

- index.css

```css
header .logo {
  margin: 0; /*清除h标签默认边距*/
  background-color: #6c94d5;
}
header .logo a {
  display: block;
}
header .logo a span {
  display: block;
  height: 50px;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
  color: #fff;
}
/* 进行媒体查询，制作响应式效果 */
@media screen and (min-width: 768px) {
  header .logo img {
    margin: 0 auto;
  }
}
@media screen and (max-width: 991px) {
  header nav a {
    float: left;
    width: 20%;
  }
}
```

## nav 区域响应式制作

```css
/* 超小屏幕，小屏幕 */
@media screen and (max-width: 991px) {
  header nav a {
    float: left;
    width: 20%;
  }
}
/* 超小屏幕 */
@media screen and (max-width: 767px) {
  header nav a {
    font-size: 14px;
  }
}
```

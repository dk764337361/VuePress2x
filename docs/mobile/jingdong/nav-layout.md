# 京东首页-超市导航布局

  <img src="/images/mobile/mobilebase/030.png" style="width: 50%; display:block; margin: 0 ;">

- index.html

```html
<div class="mall-nav">
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
</div>
<div class="mall-nav mall-nav-2">
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
  <a href="#">
    <img src="images/nav01.webp" alt="" />
    <span>京东超市</span>
  </a>
</div>
```

- index.css

```css
/* 导航区域开始 */
nav {
  position: relative;
  width: 100%;
  height: 162px;
  overflow: hidden;
}
nav .mall-nav {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /*清除浮动*/
}
nav .mall-nav-2 {
  left: 100%;
}
nav .mall-nav a {
  float: left;
  width: 20%;
  color: #666;
  text-decoration: none;
  text-align: center;
  font-size: 12px;
}
nav .mall-nav a img {
  display: block;
  width: 40px;
  margin: 10px auto 0;
}
nav .mall-nav a span {
  display: block;
  height: 18px;
  margin-top: 6px;
  line-height: 18px;
}
/* 导航区域结束 */
```

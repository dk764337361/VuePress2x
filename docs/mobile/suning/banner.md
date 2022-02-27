# 苏宁首页-banner 区域


<img src="/images/mobile/rem/021.png" style="width: 50%; display:block; margin: 0 ;">

- index.html

```html
<!-- 轮播图 -->
<div class="banner">
  <div class="wrapper">
    <ul>
      <li class="current">
        <a href=""><img src="images/banner.jpg" alt=""/></a>
      </li>
      <li>
        <a href=""><img src="images/banner.jpg" alt=""/></a>
      </li>
      <li>
        <a href=""><img src="images/banner.jpg" alt=""/></a>
      </li>
      <li>
        <a href=""><img src="images/banner.jpg" alt=""/></a>
      </li>
      <li>
        <a href=""><img src="images/banner.jpg" alt=""/></a>
      </li>
      <li>
        <a href=""><img src="images/banner.jpg" alt=""/></a>
      </li>
    </ul>
  </div>
</div>
<!-- 轮播图结束 -->
```

- index.less

```css
//banner区域
.banner {
  width: (750rem / @baseFont);
  height: (260rem / @baseFont);
  background: url(../images/banner_bg.png) no-repeat 0 0;
  background-size: (750rem / @baseFont) auto;
  .wrapper {
    width: (702rem / @baseFont);
    height: (260rem / @baseFont);
    margin: 0 auto;
    background-color: pink;
    overflow: hidden;
    ul {
      position: relative;
      width: (2000rem / @baseFont);
      height: (260rem / @baseFont);
      margin: 0;
      li {
        position: absolute;
        left: (702rem / @baseFont);
        top: 0;
        width: (702rem / @baseFont);
        height: (260rem / @baseFont);
        border-radius: (24rem / @baseFont);
        overflow: hidden;

        &.current {
          left: 0;
        }
        img {
          width: (702rem / @baseFont);
          height: (260rem / @baseFont);
        }
      }
    }
  }
}
//banner区域结束
```

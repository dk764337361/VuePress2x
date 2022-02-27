# 苏宁首页-nav 区域

<img src="/images/mobile/rem/022.png" style="width: 50%; display:block; margin: 0 ;">

- index.html

```html
    <!-- nav 导航部分 -->
    <div class="nav">
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
      <a href="#">
        <img src="images/nav_01.png" alt="">
        <p class="title">苏宁秒杀</p>
      </a>
    </div>
    <!-- nav 导航部分结束 -->
```

- index.less

```css
//nav 区域
.nav {
  width: (750rem / @baseFont);
  height: (308rem / @baseFont);
  a {
    float: left;
    width: (150rem / @baseFont);
    height: (142rem / @baseFont);
    text-decoration: none;
    color: #666;
    font-size: (22rem / @baseFont);
    img {
      display: block;
      width: (84rem / @baseFont);
      height: (84rem / @baseFont);
      margin: (24rem / @baseFont) (33rem / @baseFont) 0;
    }
    p {
      height: (
        28rem / @baseFont
      ); //p标签是标准流的块级元素，如果不设置宽度，就自动撑满父级a的宽度
      margin-top: (5rem / @baseFont);
      line-height: (28rem / @baseFont);
      text-align: center;
    }
  }
}
//nav 区域结束
```
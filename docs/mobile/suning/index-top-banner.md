# 苏宁首页-top-banner 区域
<img src="/images/mobile/rem/016.png" style="width: 50%; display:block; margin: 0 ;">

- index.html

```html
<!-- 顶部banner区域 -->
<div class="top-banner">
  <a href="#" class="top-banner-img">
    <img src="images/top_banner.jpg" alt="" />
  </a>
  <a href="#" class="close"></a>
</div>
<!-- 顶部banner区域结束 -->
```

- index.less

```css
ul,ol {
  list-style: none;
}
// 后续的尺寸都需要使用 rem 单位
@baseFont: 50px;
// top-banner 区域
.top-banner {
  position: relative;
  width: (750rem / @baseFont); //750rem(px)/50px=15rem
  height: (100rem / @baseFont); //100rem(px)/50px=2rem
  .top-banner-img {
    display: block;
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .close{
    position: absolute;
    left: 0.1rem; //0.1rem*50px=5px
    top: 0.5rem; //0.5rem*50px=25px
    width: (50rem / @baseFont);  //50rem(px)/50px=1px
    height: (50rem / @baseFont);  //50rem(px)/50px=1px
    background: url(../images/close.png) no-repeat center center;
    background-size: (30rem / @baseFont) auto; //图片30px*30px, 30rem(px)/50px=0.6
  }
}
```

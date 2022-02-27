# 苏宁首页-header-search 区域内容

<img src="/images/mobile/rem/019.png" style="width: 50%; display:block; margin: 0 ;">

- index.html

```html{8-14}
<!-- header 区域 -->
<div class="header">
  <div class="header-top">
    <a href="#" class="classify"><img src="images/classify.png" alt=""/></a>
    <a href="#" class="ad"><img src="images/ad.gif" alt=""/></a>
    <a href="#" class="login"><img src="images/login.png" alt=""/></a>
  </div>
  <div class="search">
    <a href="#"></a>
    <i></i>
    <form>
      <input type="search" placeholder="400元北京消费补贴" />
    </form>
  </div>
</div>
<!-- header 区域结束 -->
```

- index.less

```css
  .search {
    position: relative;
    width: (750rem / @baseFont);
    height: (92rem / @baseFont);
    padding: 0 (24rem / @baseFont);
    box-sizing: border-box; //因为设置了padding必然超过750，需要设置box-sizing
    a {
      position: absolute;
      top: 0;
      left: (24rem / @baseFont);
      width: (702rem / @baseFont);
      height: (88rem / @baseFont);
      // background-color: red;
    }
    i {
      position: absolute;
      left: (42rem / @baseFont);
      top: (
        26rem / @baseFont
      ); //a标签的height: (88rem / @baseFont) - i标签的height: (36rem / @baseFont); = 26rem
      width: (36rem / @baseFont);
      height: (36rem / @baseFont);
      background: url(../images/search_btn.png) no-repeat 0 0;
      background-size: (36rem / @baseFont) auto;
    }
    form {
      display: flex;
      width: (702rem / @baseFont);
      height: (88rem / @baseFont);
      align-items: center;
      // background-color: greenyellow;
      input {
        width: (702rem / @baseFont);
        height: (64rem / @baseFont);
        padding: (3rem/ @baseFont) (20rem/ @baseFont) 0 (65rem/ @baseFont);
        border: 0;
        border-radius: (32rem / @baseFont);
        font-size: 0.56rem;
        line-height: (64rem / @baseFont);
        box-sizing: border-box;
      }
    }
```

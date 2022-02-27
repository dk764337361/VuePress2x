# 苏宁首页-header-top 区域内容

<img src="/images/mobile/rem/018.png" style="width: 50%; display:block; margin: 0 ;">

- index.html

```html
<!-- header 区域 -->
<div class="header">
  <div class="header-top">
    <a href="#" class="classify"><img src="images/classify.png" alt=""/></a>
    <a href="#" class="ad"><img src="images/ad.gif" alt=""/></a>
    <a href="#" class="login"><img src="images/login.png" alt=""/></a>
  </div>
  <div class="search"></div>
</div>
<!-- header 区域结束 -->
```

- index.less

```css
//header区域
.header {
  width: (750rem / @baseFont);
  height: (180rem / @baseFont);
  background-color: #ffdb47;
  .header-top {
    display: flex;
    width: (682rem / @baseFont);
    height: (88rem / @baseFont);
    padding: 0 (34rem / @baseFont);
    justify-content: space-between;
    align-items: center;
    .classify {
      img {
        display: block;
        width: (36rem / @baseFont);
        height: (60rem / @baseFont);
      }
    }
    .ad {
      img {
        display: block;
        width: (450rem / @baseFont);
        height: (55rem / @baseFont);
        margin-right: (50rem / @baseFont);
      }
    }
    .login {
      img {
        display: block;
        width: (36rem / @baseFont);
        height: (60rem / @baseFont);
      }
    }
  }
  .search {
    width: (750rem / @baseFont);
    height: (92rem / @baseFont);
    padding: 0 (24rem / @baseFont);
    box-sizing: border-box; //因为设置了padding必然超过750，需要设置box-sizing
  }
}
```

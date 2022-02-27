# 苏宁首页-header 结构布局
<img src="/images/mobile/rem/017.png" style="width: 50%; display:block; margin: 0 ;">

- index.html

```html
<!-- header 区域 -->
<div class="header">
  <div class="header-top">1</div>
  <div class="search">2</div>
</div>
<!-- header 区域结束 -->
```

- index.less

```css
//header区域
.header {
  width: (750rem / @baseFont);
  height: (180rem / @baseFont);
  // background-color: #ffdb47;
  background-color: #ffdb47;
  .header-top {
    width: (682rem / @baseFont);
    height: (88rem / @baseFont);
    padding: 0 (34rem / @baseFont);
  }
  .search {
    width: (750rem / @baseFont);
    height: (92rem / @baseFont);
    padding: 0 (24rem / @baseFont);
    box-sizing: border-box;  //因为设置了padding必然超过750，需要设置box-sizing
  }
}
```

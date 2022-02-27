# 京东首页-tips区域布局

- 京东首页-设置 tips 布局中的百分比

## 制作效果
<img src="/images/mobile/mobilebase/012.png" style="width: 50%; display:inline-block; margin: 0 ;">

index.html

```html
<body>
  <!-- 提示内容，跳转App开始 -->
  <div class="top-tips">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
  <!-- 提示内容，跳转App结束 -->
</body>
```

index.css

```css
.top-tips {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background-color: #333;
  line-height: 45px;
  text-align: center;
  color: #fff;
}
.top-tips div:nth-child(1) {
  float: left;
  width: 8%;
}
.top-tips div:nth-child(2) {
  float: left;
  width: 10%;
}
.top-tips div:nth-child(3) {
  float: left;
  width: 57%;
}
.top-tips div:nth-child(4) {
  float: left;
  width: 25%;
}
```


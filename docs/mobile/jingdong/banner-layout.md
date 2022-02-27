# 京东首页-焦点图布局

  <img src="/images/mobile/mobilebase/026.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
  <img src="/images/mobile/mobilebase/027.png" style="width: 100%; display:inline-block; margin: 0 ;">

  - index.html

```html{8}
    <!-- main主要内容区域开始 -->
    <main class="content">
      <!-- 焦点图部分开始 -->
      <div class="banner">
        <!-- 利用一个标签的背景制作了大盒子的背景的效果 -->
        <div class="banner-bg"></div>
      </div>
      <!-- 焦点图部分结束 -->
    </main>
    <!-- main主要内容区域开始 -->
```

- index.css
```css{7}
.search-box {
  position: fixed;
  top: 45px; /* 因为.top-tips的height:45px; */
  left: 0;
  width: 100%;
  height: 44px;
  z-index: 20;/*防止被banner-bg被压盖*/
}
/* 主要内容区域开始 */
.content{
  width: 100%;
  height: 100px;
  margin-top: 45px;  /* top-tips脱离标准流，占据了content 45px（content属于标准流） */
  background-color: #f6f6f6;
}
/* 焦点图部分开始 */
.banner{
  position: relative; /*banner-bg需要需要父相子绝*/
  width: 100%;
  height: 187px;
  background-color: pink;
}
.banner .banner-bg{
position: absolute;
left: -25%; /*拽回自身（150%）的25%*/
width: 150%;
height: 145px;
border-bottom-left-radius: 100%;
border-bottom-right-radius: 100%;
background-color: #f00;
}
/* 焦点图部分结束 */

/* 主要内容区域结束 */
```


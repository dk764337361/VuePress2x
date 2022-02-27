# 京东首页-搜索框布局

## 制作思路

  <img src="/images/mobile/mobilebase/016.png" style="width: 100%; display:inline-block; margin: 0 ;">

## 制作效果

  <img src="/images/mobile/mobilebase/017.png" style="width: 80%; display:block; margin: 0 ;">

- index.html

```html
<!-- 搜索框开始 -->
<header class="search-box">
  <div class="search-btn"></div>
  <div class="search"></div>
  <div class="login"></div>
</header>
<!-- 搜索框结束 -->
```

- index.css

```css{3,11,19}
/* 搜索框开始 */
.search-box {
  position: fixed;
  top: 45px; /* 因为.top-tips的height:45px; */
  left: 0;
  width: 100%;
  height: 44px;
  background-color: pink;
}
.search-box .search-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 44px;
  background-color: blue;
}
.search-box .login {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 44px;
  background-color: skyblue;
}
.search-box .search {
  height: 30px;
  margin: 7px 50px;
  border-radius: 15px;
  background-color: #fff;
}
/* 搜索框结束 */
```

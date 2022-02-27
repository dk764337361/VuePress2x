# 京东首页-搜索框内容填充

## 左与右效果
  <img src="/images/mobile/mobilebase/018.png" style="width: 80%; display:block; margin: 0 ;">

- index.html

```html{4}
<!-- 搜索框开始 -->
<header class="search-box">
  <div class="search-btn">
    <span></span>
  </div>
  <div class="search"></div>
  <div class="login">登录</div>
</header>
<!-- 搜索框结束 -->
```

- index.css

```css{16-17}
.search-box .search-btn span {
  display: block;
  width: 20px;
  height: 18px;
  margin: 14px 0 0 15px;
  background: url(../images/s-btn.png) no-repeat 0 0;
  background-size: 20px 18px;
}
.search-box .login {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 44px;
  line-height: 44px;
  color: #fff;
  text-align: left;
}
```

## 中间搜索框效果

### 左：引入logo和灰竖条

- index.html

```html{4,7}
<!-- 搜索框开始 -->
    <header class="search-box">
      <div class="search-btn">
        <span></span>
      </div>
      <div class="search">
        <span></span>
      </div>
      <div class="login">登录</div>
    </header>
<!-- 搜索框结束 -->
```
  <img src="/images/mobile/mobilebase/019.png" style="width: 50%; display:inline-block; margin: 0 ;">
  <img src="/images/mobile/mobilebase/020.png" style="width: 50%; display:inline-block; margin: 0 ;">

- index.css
```css{3-4,12-14}
.search-box .search span {
  float: left;
  /* 设置灰竖线需要父相子绝 */
  position: relative;
  width: 20px;
  height: 15px;
  margin: 8px 8px 0 15px;
  background: url(../images/logo2.png) no-repeat 0 0;
  background-size: 20px 15px;
}
.search-box .search span::after {
  position: absolute;
  /* 灰竖线向右移动8px */
  right: -8px;
  content: "";
  width: 1px;
  height: 15px;
  background-color: #ccc;
}
```

## 中间 搜索图标-二倍精灵图
### 制作效果

  <img src="/images/mobile/mobilebase/024.png" style="width: 100%; display:inline-block; margin: 0 ;">


### 二倍精灵图做法


- 在`Firework`里面把精灵图等比例缩放为原来的一半
- 之后根据新的大小，测量坐标。
- 注意代码里面`background-size`也要写：精灵图原来宽度的一半

  <img src="/images/mobile/mobilebase/021.png" style="width: 100%; display:inline-block; margin: 0 ;">
  <img src="/images/mobile/mobilebase/022.png" style="width: 100%; display:inline-block; margin: 0 ;">
  <img src="/images/mobile/mobilebase/023.png" style="width: 100%; display:inline-block; margin: 0 ;">

  - index.html

```html{8}
<!-- 搜索框开始 -->
    <header class="search-box">
      <div class="search-btn">
        <span></span>
      </div>
      <div class="search">
        <span></span>
        <i></i>
      </div>
      <div class="login">登录</div>
    </header>
<!-- 搜索框结束 -->
```

- index.css
```css{3-4,12-14}
.search-box .search i {
  float: left;
  width: 18px;
  height: 15px;
  margin: 8px 0 0 15px;
  background: url(../images/jd-sprites.png) no-repeat -82px 0;
  background-size: 200px 200px;
}
```

## 中间 input输入框

### 制作效果

  <img src="/images/mobile/mobilebase/025.png" style="width: 100%; display:inline-block; margin: 0 ;">


```html{9}
<!-- 搜索框开始 -->
    <header class="search-box">
      <div class="search-btn">
        <span></span>
      </div>
      <div class="search">
        <span></span>
        <i></i>
        <input type="search" name="" id="" placeholder="超薄本">
      </div>
      <div class="login">登录</div>
    </header>
<!-- 搜索框结束 -->
```

- index.css
```css
.search-box .search {
  /* input需要需要父相子绝 */
  position: relative;
  height: 30px;
  margin: 7px 50px;
  border-radius: 15px;
  background-color: #fff;
}
.search-box .search input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 30px;
  padding: 0 20px 0 78px;
  border: none;
  background-color: transparent; /*CSS3设置背景透明*/
  font-size: 12px;
}
```



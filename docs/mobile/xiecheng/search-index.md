# 携程网首页-搜索框布局

<img src="/images/mobile/flex/034.png" style="width: 100%; display:block; margin: 0 ;">

```html
<!-- 搜索框区域 -->
<div class="search-index">
  <div class="search"></div>
  <div class="login"></div>
</div>
<!-- 搜索框区域结束 -->
```

```css{3,7-8,12}
/* 搜索框区域 */
.search-index {
  display: flex;
  width: 100%;
  height: 44px;
  padding-left: 12px;
  box-sizing: border-box;
  align-items: center;
  background-color: pink;
}
.search-index .search {
  flex: 1;
  height: 28px;
  padding: 2px 5px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: #fff;
}
.search-index .login {
  width: 51px;
  height: 44px;
  padding-right: 4px;
  background-color: skyblue;
}
/* 搜索框区域结束 */
```

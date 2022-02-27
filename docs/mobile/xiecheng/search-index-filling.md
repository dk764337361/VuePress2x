# 携程网首页-搜索框填充

<img src="/images/mobile/flex/035.png" style="width: 100%; display:block; margin: 0 ;">

```html
<!-- 搜索框区域 -->
<div class="search-index">
  <div class="search">
    <span>搜索:目的地/酒店/景点/航班号</span>
  </div>
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
  background-color: pink;
  align-items: center;
}
.search-index .search {
  display: flex;
  align-items: center;
  flex: 1;
  height: 28px;
  padding: 2px 5px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: #fff;
}
.search-index .search span {
  position: relative;
  padding-left: 35px;
  line-height: 18px;
  font-size: 15px;
  color: #666;
}
/*搜索图标用伪类元素创建，用父相子绝 */
.search-index .search span::after {
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  position: absolute;
  left: 10px;
  top: 2px;
  background: url(../images/sprite.png) no-repeat 0px 0px;
  background-size: 21px auto;
}
.search-index .login {
  width: 51px;
  height: 44px;
  padding-right: 4px;
  background-color: skyblue;
}
/* 搜索框区域结束 */
```

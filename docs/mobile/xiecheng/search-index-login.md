# 携程网首页-login 登录内容

- 经典 flex 上下布局

## 常见 flex 布局思路

<img src="/images/mobile/flex/036.png" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/037.png" style="width: 100%; display:block; margin: 0 ;">

```html
    <!-- 搜索框区域 -->
    <div class="search-index">
      <div class="search">
        <span>搜索:目的地/酒店/景点/航班号</span>
      </div>
      <div class="login">
        <span>我 的</span>
      </div>
    </div>
    <!-- 搜索框区域结束 -->
```

```css
/* 搜索框区域 */
.search-index .login {
  /* 内部进行flex 布局 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 51px;
  height: 44px;
  padding-right: 4px;
  background-color: skyblue;
}
.search-index .login::after {
  content: "";
  display: block;
  width: 22px;
  height: 22px;
  background: url(../images/sprite.png) no-repeat 0 -36px;
  background-size: 21px auto;
  order: -1;
}
.search-index .login span{
  font-size: 12px;
  color: #fff;
  line-height: 12px;
}
/* 搜索框区域结束 */
```

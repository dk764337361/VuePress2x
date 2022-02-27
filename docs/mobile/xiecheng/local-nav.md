# 携程网首页-local-nav 布局

## 前期准备

- 设置公共样式
```css
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  color: #222;
  text-decoration: none;
}
```

## 效果制作

<img src="/images/mobile/flex/040.png" style="width: 50%; display:block; margin: 0 ;">

```html
<!-- local nav部分 -->
<ul class="local-nav">
  <li>
    <a href="#">
      <i></i>
      <span>攻略·景点</span>
    </a>
  </li>
  <li>
    <a href="#">
      <i></i>
      <span>攻略·景点</span>
    </a>
  </li>
  <li>
    <a href="#">
      <i></i>
      <span>攻略·景点</span>
    </a>
  </li>
  <li>
    <a href="#">
      <i></i>
      <span>攻略·景点</span>
    </a>
  </li>
  <li>
    <a href="#">
      <i></i>
      <span>攻略·景点</span>
    </a>
  </li>
</ul>
<!-- local nav部分结束 -->
```

```css
/* local nav部分开始 */
.local-nav {
  display: flex;
  position: relative;
  height: 64px;
  padding: 4px 0 8px;
  margin: -52px 12px 10px; /* 不设置宽度，宽度自动内减 */
  border-radius: 8px;
  background-color: #fff;
}
.local-nav li {
  flex: 1;
}
.local-nav li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.local-nav li a i {
  width: 40px;
  height: 40px;
  background: url(../images/localnav_bg.png) no-repeat 0 0;
  background-size: 40px auto;
}
.local-nav li a span {
  font-size: 12px;
}
.local-nav li a span {
  font-size: 12px;
}
.local-nav li:nth-child(2) a i {
  background-position: 0 -40px;
}
.local-nav li:nth-child(3) a i {
  background-position: 0 -80px;
}
.local-nav li:nth-child(4) a i {
  background-position: 0 -120px;
}
.local-nav li:nth-child(5) a i {
  background-position: 0 -160px;
}
/* local nav部分结束 */
```

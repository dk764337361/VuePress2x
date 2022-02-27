# 携程网首页-subnav-entry 布局

## 效果制作

- 制作原理：flex布局（多行）+百分比

<img src="/images/mobile/flex/044.png" style="width: 50%; display:block; margin: 0 ;">

```html
<!-- subnav-entry开始 -->
<ul class="subnav-entry">
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>自由行</span></a>
  </li>
</ul>
<!-- subnav-entry结束 -->
```

```css{2-24}
/* subnav-entry开始 */
.subnav-entry {
  display: flex;
  flex-wrap: wrap;
  margin: 0 12px;
}
.subnav-entry li {
  width: 20%;
}
.subnav-entry li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 12px;
  line-height: 12px;
}
.subnav-entry li a i {
  width: 28px;
  height: 28px;
  margin: 10px 0 5px;
  background: url(../images/subnav-bg.png) no-repeat 6px -137px;
  background-size: 24px;
}
.subnav-entry li:nth-child(2) a i {
  background: url(../images/subnav-bg.png) no-repeat 4px -108px;
  background-size: 24px;
}
.subnav-entry li:nth-child(3) a i {
  background: url(../images/subnav-bg.png) no-repeat 6px -22px;
  background-size: 24px;
}
.subnav-entry li:nth-child(4) a i {
  background: url(../images/subnav-bg.png) no-repeat 0 -272px;
  background-size: 24px;
}
.subnav-entry li:nth-child(5) a i {
  background: url(../images/subnav-bg.png) no-repeat 0 -80px;
  background-size: 24px;
}
.subnav-entry li:nth-child(7) a i {
  background: url(../images/subnav-bg.png) no-repeat 4px -108px;
  background-size: 24px;
}
.subnav-entry li:nth-child(8) a i {
  background: url(../images/subnav-bg.png) no-repeat 0 -196px;
  background-size: 24px;
}
/* subnav-entry结束 */
```

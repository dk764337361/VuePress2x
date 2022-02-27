# 携程网首页-tool-box 布局

<img src="/images/mobile/flex/044.png" style="width: 50%; display:block; margin: 0 ;">

```html
<!-- tool-box开始 -->
<ul class="tool-box">
  <li>
    <a href="#"><i></i><span>电话预约</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>下载客户端</span></a>
  </li>
  <li>
    <a href="#"><i></i><span>我的</span></a>
  </li>
</ul>
<!-- tool-box结束 -->
```

```css
/* tool-box开始 */
.tool-box {
  display: flex;
  height: 60px;
  background-color: #fff;
  border-top: 2px solid #f2f2f2;
  border-bottom: 2px solid #f2f2f2;
}
.tool-box li {
  flex: 1;
}
.tool-box li a {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.tool-box li a i {
  width: 20px;
  height: 20px;
  background-size: 20px auto;
}
.tool-box li:nth-child(1) a i {
  background: url(../images/Tel.png) no-repeat;
}
.tool-box li:nth-child(2) a i {
  background: url(../images/download.png) no-repeat;
}
.tool-box li:nth-child(3) a i {
  background: url(../images/my.png) no-repeat;
}
.tool-box li a span {
  font-size: 12px;
}
/* tool-box结束 */
```

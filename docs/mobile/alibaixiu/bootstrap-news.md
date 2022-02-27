# 阿里百秀-new 区域
<img src="/images/mobile/bootstrap/021.png" style="width: 100%; display:inline-block; margin: 0; border:1px solid rgba(0,0,0,0.7);">

- index.html

```html
<main class="col-md-7">
  <!-- new 区域 开始 -->
  <!-- (list-unstyled) : https://v3.bootcss.com/css/无样式列表 -->
  <!-- （快速清除浮动）：https://v3.bootcss.com/css/#helper-classes-clearfix -->
  <ul class="news list-unstyled clearfix">
    <li>
      <a href="#">
        <img src="images/lg.png" alt="" />
        <p>阿里百阿里百秀阿里百秀阿里百秀阿里百秀</p>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="images/1.jpg" alt="" />
        <p>阿里百阿里百秀阿里百秀阿里百秀阿里百秀</p>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="images/2.jpg" alt="" />
        <p>阿里百阿里百秀阿里百秀阿里百秀阿里百秀</p>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="images/3.jpg" alt="" />
        <p>阿里百阿里百秀阿里百秀阿里百秀阿里百秀</p>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="images/4.jpg" alt="" />
        <p>阿里百阿里百秀阿里百秀阿里百秀阿里百秀</p>
      </a>
    </li>
  </ul>
  <!-- new 区域 结束 -->
</main>
```

- index.css

```css
/* news部分样式开始 */
main .news {
  border-bottom: 1px solid #ccc;
}
main .news li {
  float: left;
  width: 25%; /*在不同尺寸下，li的width为父级*/
  height: 128px; /*在不同尺寸下，设置height不变*/
  padding-right: 10px;
  margin-bottom: 10px;
}

main .news li:nth-child(1) {
  width: 50%;
  height: 266px; /*在不同尺寸下，设置高度不变*/
}

main .news li a {
  position: relative; /*main .news li a p 需要父相子绝*/
  display: block;
  width: 100%; /*在不同尺寸下，a的width跟随父级li的width*/
  height: 100%; /*在不同尺寸下，a的height跟随父级li的height*/
}
main .news li a img {
  display: block;
  width: 100%;
  height: 100%;
}
main .news li a p {
  display: block;
  width: 100%;
  height: 100%;
}
main .news li a p {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 41px;
  padding: 5px 10px 0;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 12px;
  line-height: 16px;
}
main .news li:nth-child(1) a p {
  padding: 0 10px;
  font-size: 20px;
  line-height: 41px;
}
/* news部分样式结束 */
```

# 京东首页-滑动轮播图布局

## 图片格式压缩技术

- DPG图片压缩技术

京东自主研发推出DPG图片压缩技术,
经测试该技术,可直接节省用户近50%的浏览流量,极大的提升了用户的网页打开速度。能够兼容jpeg,实现全平台、全部浏据空间。
览器的兼容支持,经过内部和外部上万张
图片的人眼浏览测试后发现,压缩后的图
片和webp的清晰度对比没有差距。

- webp图片格式

谷歌开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有JPEG的2/3,并能节省大量的服务器宽带资源和数


## 制作效果
- index.html

```html{7-11}
    <main class="content">
      <!-- 焦点图部分开始 -->
      <div class="banner">
        <!-- 利用一个标签的背景制作了大盒子的背景的效果 -->
        <div class="banner-bg"></div>
        <!-- 制作滑动轮播图 -->
        <ul>
          <li><a href="#"><img src="images/banner01.dpg" alt=""></a></li>
          <li><a href="#"><img src="images/banner01.dpg" alt=""></a></li>
          <li><a href="#"><img src="images/banner01.dpg" alt=""></a></li>
        </ul>
        <!-- 制作滑动轮播图结束 -->
      </div>
      <!-- 焦点图部分结束 -->
    </main>
```

- index.css

```css{6}
.banner {
  position: relative; /*banner-bg需要需要父相子绝*/
  width: 100%;
  height: 187px;
  /* background-color: pink; */
  overflow: hidden; /*轮播图溢出隐藏*/
}
/* 制作滑动轮播图开始 */
.banner ul {
  position: relative;
  margin: 0;
  list-style: none;
}
.banner ul li {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 187px;
  padding: 44px 3.333% 0;
  box-sizing: border-box;
}
.banner ul li:nth-child(2) {
  left: 100%;
}
.banner ul li:nth-child(3) {
  left: 200%;
}
.banner ul li a {
  display: block;
}
.banner ul li a img {
  display: block;
  width: 100%;
  border-radius: 10px;
}
/* 制作滑动轮播图结束 */
```



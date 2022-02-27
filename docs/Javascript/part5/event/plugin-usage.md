# jQuery 插件使用

## 如何获取插件

- 百度搜索、github 搜索
- 看技术文章
- 跟别人交流
- jQuery 插件库之家： http://www.htmleaf.com

## 插件使用方法

- 找到并且下载插件
- 在项目外写一个 demo（先学会使用，让后再加入项目中）
- 看源码，看文档

::: warning 注意

1. 复制结构，保证结构关系是一致的。标签名不一致无所谓
2. 样式，可以选择复制，也可以定义自己需要的样式
3. 先引入 jQuery 文件，再引入插件库文件，再去使用
4. 复制源代码或看文档使用
   :::

## 案例

### 使用放大镜插件

- [放大镜插件下载](http://www.jacklmoore.com/zoom/)

- demo 演示

<img src="/images/Javascript/JQ/zoom.gif" style="width: 50%; display:inline-block; margin: 0 ;">

- 项目结构

```
jQuery zoom
    ├─── demo.html
    ├─── img
    │    └── b.jpg
    └─── lib
         ├── jquery-1.12.4.js
         └── jquery-1.12.4.min.js
         └── jquery.zoom.js   引入插件里必要的文件
         └── jquery.zoom.min.js  引入插件里必要的文件
```

- 自定义 demo.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      div {
        width: 400px;
        border: 1px solid #ccc;
        margin: 10px auto;
      }
      img {
        width: 400px;
      }
    </style>
  </head>

  <body>
    <div id="box">
      <img src="img/b.jpg" alt="" />
    </div>
    <!-- 必须先引入 JQ 的文件，因为后面的插件需要依赖它 -->
    <script src="lib/jquery-1.12.4.min.js"></script>
    <!-- 第二步：引入需要使用的插件 -->
    <script src="lib/jquery.zoom.min.js"></script>
    <!-- 第三步：书写必要的 js 代码 -->
    <script>
      // $('#box').zoom();
      $("#box").zoom({ on: "grab" });
    </script>
  </body>
</html>
```

### 使用轮播图插件

- [谷歌样式 jquery 水平滚动 Carousel 插件](http://www.htmleaf.com/jQuery/Slideshow-Scroller/201905105642.html)

- demo 演示

http://www.htmleaf.com/Demo/201905105643.html

- 项目结构

```
jQuery carousel
    ├─── index.html
    ├─── img
    │    └── jd1.jpg
    │    └── jd2.jpg
    │    └── jd3.jpg
    │    └── jd4.jpg
    │    └── jd5.jpg
    │    └── jd6.jpg
    │    └── jd7.jpg
    │    └── jd8.jpg
    └─── lib
         ├── jquery.gScrollingCarousel.js引入插件里必要的文件
         └── jquery-1.11.0.min.js
```

- 自定义 demo.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/jquery.gScrollingCarousel.css" />
    <script src="js/jquery-1.11.0.min.js"></script>
    <script src="js/jquery.gScrollingCarousel.js"></script>
    <script>
      // 插件初始化
      $(document).ready(function() {
        $(".g-scrolling-carousel .items").gScrollingCarousel();
      });
    </script>
  </head>
  <body>
    <div class="g-scrolling-carousel">
      <div class="items">
        <a href="#"><img src="img/jd1.jpg" alt=""/></a>
        <a href="#"><img src="img/jd2.jpg" alt=""/></a>
        <a href="#"><img src="img/jd3.jpg" alt=""/></a>
        <a href="#"><img src="img/jd4.jpg" alt=""/></a>
        <a href="#"><img src="img/jd5.jpg" alt=""/></a>
        <a href="#"><img src="img/jd6.jpg" alt=""/></a>
      </div>
    </div>
  </body>
</html>
```

- jquery.gScrollingCarousel.css
```css{1-5,77-88}
.g-scrolling-carousel {
  position: relative;
  width: 1640px;
  margin: 0 auto;
}
.g-scrolling-carousel .items {
  overflow-x: scroll;
  white-space: nowrap;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
.g-scrolling-carousel .items::-webkit-scrollbar {
  display: none;
}
.jc-right,
.jc-left {
  width: 36px;
  height: 36px;
  color: #757575;
  margin-bottom: auto;
  margin-top: auto;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  opacity: 0.94;
}
.jc-right {
  right: -18px;
}
.jc-left {
  left: -18px;
}

.jc-right:hover,
.jc-left:hover {
  opacity: 0.98;
}
.jc-right svg,
.jc-left svg {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 24px;
  height: 24px;
  fill: #757575;
}
.jc-right:hover svg,
.jc-left:hover svg {
  fill: #000;
}
@media (pointer: coarse) {
  .jc-right,
  .jc-left {
    display: none !important;
  }
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.g-scrolling-carousel .items {
  padding: 5px 0;
}
.g-scrolling-carousel .items a {
  display: inline-block; /* notice the comments between inline-block items */
  margin-right: 10px;
  width: 395px;
  height: 170px;
  box-shadow: 0 0 5px #000;
  text-align: center;
}
.g-scrolling-carousel .items a img {
  display: block;
  width: 100%;
}
```

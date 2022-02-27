# 轮播图-3D

<img src="/images/Javascript/JQ/carousel_3D.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 项目结构

```
3D_carousel
    ├─── 3D_carousel.html
    ├─── img
    │    └── pic1.jpg
    │    └── pic2.jpg
    │    └── pic3.jpg
    │    └── pic4.jpg
    └─── lib
         ├── jquery-1.12.4.js
         └── jquery-1.12.4.min.js
```

## 思路步骤

### 1. 每个 li 标签放 4 个相同的 div 背景图片

```html
<div class="carousel">
  <ul>
    <li>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </li>
    <li>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </li>
    <li>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </li>
    <li>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </li>
  </ul>
</div>
<input type="button" value="下一张" class="btn" />
```

### 2. 调整每个 div 的位置。

```css
/* 设置每个 li 标签中所有的 div 的背景图片定位 */
.carousel ul li:nth-child(1) div {
  background-position: 0 0;
}
.carousel ul li:nth-child(2) div {
  background-position: -150px 0;
}
.carousel ul li:nth-child(3) div {
  background-position: -300px 0;
}
.carousel ul li:nth-child(4) div {
  background-position: -450px 0;
}
```

<video src="/videos/01.mp4" controls="controls" loop="loop" height="500"></video>

### 3. 设置 3D 转换-透视 perspective

```css
.carousel ul li {
  position: absolute;
  top: 0;
  width: 150px;
  height: 360px;
  transform-style: preserve-3d;
  perspective: 50000px;
  transition: all 1s ease 0s;
}
```

### 4. 在 CSS 调整每个 div 的 transform 的 rotateX 角度，在（js）点击按钮时进行角度的计算。

<img src="/images/Javascript/JQ/07.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```css
.carousel ul li div:nth-child(1) {
  background-image: url(images/pic1.jpg);
  transform: rotateX(0deg);
}
.carousel ul li div:nth-child(2) {
  background-image: url(images/pic2.jpg);
  transform: rotateX(90deg);
}
.carousel ul li div:nth-child(3) {
  background-image: url(images/pic3.jpg);
  transform: rotateX(180deg);
}
.carousel ul li div:nth-child(4) {
  background-image: url(images/pic4.jpg);
  transform: rotateX(270deg);
}
```

```js
var btn = $(".btn");
var lis = $(".carousel ul li");
var sem = 0;
btn.click(function() {
  sem -= 90
  lis.css({
    transform: "rotateX(" + sem + "deg)",
  });
```

### 5. 在 CSS 调整每个 div 的 transform 的 translateZ 角度。

<img src="/images/Javascript/JQ/08.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/Javascript/JQ/09.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```css
.carousel ul li div:nth-child(1) {
  background-image: url(images/pic1.jpg);
  /transform: rotateX(0deg) translateZ(180px);
}
.carousel ul li div:nth-child(2) {
  background-image: url(images/pic2.jpg);
  transform: rotateX(90deg) translateZ(180px);
}
.carousel ul li div:nth-child(3) {
  background-image: url(images/pic3.jpg);
  transform: rotateX(180deg) translateZ(180px);
}
.carousel ul li div:nth-child(4) {
  background-image: url(images/pic4.jpg);
  transform: rotateX(270deg) translateZ(180px);
}
```

### 6. 设置 transition 延迟

```css
.carousel ul li:nth-child(1) {
  left: 0;
  transition-delay: 0s;
}
.carousel ul li:nth-child(2) {
  left: 150px;
  transition-delay: 0.1s;
}
.carousel ul li:nth-child(3) {
  left: 300px;
  transition-delay: 0.2s;
}
.carousel ul li:nth-child(4) {
  left: 450px;
  transition-delay: 0.3s;
}
```

## 完成后的代码

<video src="/videos/02.mp4" controls="controls" loop="loop" height="500"></video>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>轮播图</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .carousel {
        position: relative;
        width: 600px;
        height: 360px;
        border: 1px solid #ddd;
        margin: 100px auto;
      }
      ul {
        list-style: none;
      }

      .carousel ul li {
        position: absolute;
        top: 0;
        width: 150px;
        height: 360px;
        transform-style: preserve-3d;
        perspective: 50000px;
        transition: all 1s ease 0s;
      }
      .carousel ul li:nth-child(1) {
        left: 0;
        transition-delay: 0s;
      }
      .carousel ul li:nth-child(2) {
        left: 150px;
        transition-delay: 0.1s;
      }
      .carousel ul li:nth-child(3) {
        left: 300px;
        transition-delay: 0.2s;
      }
      .carousel ul li:nth-child(4) {
        left: 450px;
        transition-delay: 0.3s;
      }

      .carousel ul li div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 360px;
        background-size: 600px 360px;
      }

      .carousel ul li div:nth-child(1) {
        background-image: url(images/pic1.jpg);
        /* transform: translateZ(180deg); */
        transform: rotateX(0deg) translateZ(180px);
      }
      .carousel ul li div:nth-child(2) {
        background-image: url(images/pic2.jpg);
        transform: rotateX(90deg) translateZ(180px);
      }
      .carousel ul li div:nth-child(3) {
        background-image: url(images/pic3.jpg);
        transform: rotateX(180deg) translateZ(180px);
      }
      .carousel ul li div:nth-child(4) {
        background-image: url(images/pic4.jpg);
        transform: rotateX(270deg) translateZ(180px);
      }

      /* 设置每个 li 标签中所有的 div 的背景图片定位 */
      .carousel ul li:nth-child(1) div {
        background-position: 0 0;
      }
      .carousel ul li:nth-child(2) div {
        background-position: -150px 0;
      }
      .carousel ul li:nth-child(3) div {
        background-position: -300px 0;
      }
      .carousel ul li:nth-child(4) div {
        background-position: -450px 0;
      }

      .btn {
        display: block;
        width: 100px;
        height: 50px;
        border: 1px solid #000;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="carousel">
      <ul>
        <li>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </li>
        <li>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </li>
        <li>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </li>
        <li>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </li>
      </ul>
    </div>
    <input type="button" value="下一张" class="btn" />

    <script src="js/jquery-1.12.4.js"></script>
    <script>
      var btn = $(".btn");
      var lis = $(".carousel ul li");
      var sem = 0;

      // 给事件添加一把锁，用于防抖
      var lock = false;

      btn.click(function() {
        // 先判断锁的状态
        if (lock) return;
        // 一旦动画开始，就上锁
        lock = true;
        sem -= 90;

        lis.css({
          transform: "rotateX(" + sem + "deg)",
        });
        // 动画执行完成时，释放锁
        var timeout = (1 + 0.1 * lis.length) * 1000;
        setTimeout(function() {
          lock = false;
        }, timeout);
      });
    </script>
  </body>
</html>
```

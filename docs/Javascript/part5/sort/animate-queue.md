# 动画排队

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      div {
        width: 200px;
        height: 200px;
        border: 10px solid #ccc;
        position: absolute;
        left: 0;
        top: 0;
        background: url(images/0.jpg) no-repeat center center;
      }
      .box2 {
        border-radius: 50%;
        overflow: hidden;
      }
      div span {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      }
    </style>
  </head>
  <body>
    <div class="box1"><span></span></div>
    <!-- <div class="box2"><span></span></div> -->

    <script src="js/jquery-1.12.4.min.js"></script>
  </body>
</html>
```

- ① 同一个元素对象身上，如果定义了多个动画，动画会排队等待执行。
- ② 如果是不同的元素对象都有动画，不会出现排队机制。
- ③ 如果是的其他非运动的代码，也不会等待运动完成。

<img src="/images/Javascript/JQ/animate-queue01.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```js
// 获取元素
var $box1 = $(".box1");
var $box2 = $(".box2");

var during = 2000;
// 给 第一个 元素添加动画
//左上角到右下角动画
$box1.animate({ left: 400, top: 400 }, during);
//四个方向排队运动动画
// $box1.animate({"left": 400},during)
// $box1.animate({"top": 400},during)
// $box1.animate({"left": 0},during)
// $box1.animate({"top": 0},during)
// $box2.animate({"top": 400},during)
```

- ④ 之前学习的自带动画的显示隐藏方法，如果设置给同一个元素，也有动画排队。


<img src="/images/Javascript/JQ/animate-queue02.gif" style="width: 30%; display:inline-block; margin: 0 ;">

```js
// 获取元素
var $box1 = $(".box1");
var $box2 = $(".box2");

var during = 2000;
// 给 第一个 元素添加动画

// 注意：其他的运动方法，如果设置给同一个元素，也会发生排队
$box1.mouseenter(function() {
  $(this)
    .children()
    .slideUp(during);
});
$box1.mouseleave(function() {
  $(this)
    .children()
    .slideDown(during);
});

// 给同一个元素的多个运动进行链式调用写法
// $box1.children().fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500)
```

- 同一个元素身上的运动，可以简化成链式调用的方法。

<img src="/images/Javascript/JQ/animate-queue03.gif" style="width: 30%; display:inline-block; margin: 0 ;">

```js
// 获取元素
var $box1 = $(".box1");
var $box2 = $(".box2");

var during = 2000;

// 给同一个元素的多个运动进行链式调用写法
$box1.children().fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
```

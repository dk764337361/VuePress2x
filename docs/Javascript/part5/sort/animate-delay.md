# 动画延迟 delay()

- delay：延迟的意思。
- 将 delay() 设置在某个运动方法之前，表示后面的运动要在规定的时间之后再执行，有延迟运动的效果。
- 参数：时间的数值，表示延迟的时间。
  
::: warning 注意
- 除了 animate 方法之外，其他的运动方法也有延迟效果。
:::

<img src="/images/Javascript/JQ/delay.gif" style="width: 50%; display:inline-block; margin: 0 ;">

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
    <div class="box2"><span></span></div>

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $box1 = $(".box1");
      var $box2 = $(".box2");
      var during = 2000;
      // 延迟
      $box1.animate({ left: 500 }, during);
      $box2.delay(2000).animate({ left: 500 }, during);
    </script>
  </body>
</html>
```

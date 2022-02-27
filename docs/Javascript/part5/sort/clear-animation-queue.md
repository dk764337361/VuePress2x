# 清空多次点击事件造成动画排队

## 动画排队问题
- 如果将开启运动的程序放在一个事件函数中，事件多次被触发，会执行多次函数，就会在一个元素身上添加了多个动画，会进行动画排队。
- 需要去清除排队的动画，进行防骚扰操作。

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

## 方法一： stop()方法
- 利用 stop() 方法。
- 在每一个运动函数之前都增加一个 stop(true)，表示在运动执行之前，会将前面排队的动画清空，然后停止在当前位置。

## 方法二：return

- 利用函数节流方法，如果元素在运动，直接 return，不要执行后面的运动代码。
- 每个 jQuery 对象，都能调用一个 is() 方法，作用是显示元素对象的某种状态。
- 如果参数位置是 is(“:animated”),返回值是布尔值，true 表示正在运动，false 表示没有运动。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        div{
            width: 200px;
            height: 200px;
            border: 10px solid #ccc;
            position: absolute;
            left: 0;
            top: 0;
            background: url(images/0.jpg) no-repeat center center;
        }
        
        div span{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
        }
    </style>
</head>
<body>
    <div class="box1"><span></span></div>

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
        var $box1 = $(".box1");
        var during = 1000;        

        // 将运动设置给事件，事件多次触发会积累动画出现动画排队
        // 清除动画排队方法1： 在每一次新的运动开始之前，去停止之前所有的动画排队
        // $box1.mouseenter(function () {
        //     $(this).children().stop(true).slideUp(during)
        // })
        // $box1.mouseleave(function () {
        //     $(this).children().stop(true).slideDown(during)
        // })

        // 清空动画排队方法2：使用函数节流方式
        $box1.mouseenter(function () {
            // 判断元素自己是否在运动中，如果是，那么直接返回不要往下添加新的运动
            if ($(this).children().is(":animated")) {
                return;
            }
            // 如果走到这里，说明元素没有在运动，就可以添加新运动
            $(this).children().stop(true).slideUp(during)
        })
        $box1.mouseleave(function () {
            // 判断元素自己是否在运动中，如果是，那么直接返回不要往下添加新的运动
            if ($(this).children().is(":animated")) {
                return;
            }
            $(this).children().stop(true).slideDown(during)
        })
    </script>
</body>
</html>
```
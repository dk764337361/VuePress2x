# 停止动画 stop()方法
- stop() 作用：设置元素对象身上的排队的动画以何种方式进行停止。
- 有两个参数，都是布尔值。
  - 参数1：设置是否清空后面的动画排队，如果是 true 表示清空，如果是 false 表示不清空只停止当前的一个动画。
  - 参数2：设置当前动画是否立即完成，如果是 true 表示立即完成，对象会立刻走到结束位置，如果是 false 表示不完成当前动画，立即停止在当前位置。
- 默认情况下，两个参数值默认值为 false。
- 根据两个参数的值，可以得到四种停止方式。

## 应用
- 实际工作中，一般要求清空后面的排队，停止在当前位置，多使用 stop(true),第二个参数不设置默认为 false。

## 举例：  
- stop(true,true)清空动画，立即走到结尾
  
<img src="/images/Javascript/JQ/truetrue.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- stop(true,false)清空动画，停在当前
  
<img src="/images/Javascript/JQ/truefalse.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- stop(false,true)不清空后面的动画，当前运动立即走到结尾
  
<img src="/images/Javascript/JQ/falsetrue.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- stop(false,false)不清空后面的动画，当前运动立即停止在当前位置
  
<img src="/images/Javascript/JQ/falsefalse.gif" style="width: 100%; display:inline-block; margin: 0 ;">

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
            top: 30px;
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
    <input type="button" value="true,true" id="btn1">
    <input type="button" value="true,false" id="btn2">
    <input type="button" value="false,true" id="btn3">
    <input type="button" value="false,false" id="btn4">
    <div class="box1"><span></span></div>

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
        var $box1 = $(".box1");
        var during = 2000;
        // box1 有四个运动进行排队
        $box1.animate({"left" : 500},during);
        $box1.animate({"top" : 500},during);
        $box1.animate({"left" : 0},during);
        $box1.animate({"top" : 30},during);

        // 添加按钮点击事件
        // 清空动画，走到结尾
        $("#btn1").click(function () {
            $box1.stop(true,true)
        })

        // 清空动画，停在当前
        $("#btn2").click(function () {
            $box1.stop(true,false)
        })

        // 不清空后面的动画，当前运动立即走到结尾
        $("#btn3").click(function () {
            $box1.stop(false,true)
        })

        // 不清空后面的动画，当前运动立即停止在当前位置
        $("#btn4").click(function () {
            $box1.stop(false,false)
        })

        // 在实际工作中，一般要求会清空后面的动画，当前动画要停止在当前的位置
        // 更多时候使用 stop(true)
    </script>
</body>
</html>
```
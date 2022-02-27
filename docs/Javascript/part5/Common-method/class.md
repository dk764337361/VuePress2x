# 操作类名方法

## addClass() 添加类名

- 语法：jQuery 对象.addClass('类名')
- 参数：字符串格式的类名。

## removeClass() 移除类名

- 删除指定的类名
- 语法：jQuery 对象.removeClass();
- 参数：字符串格式的类名。
- 不传参数，表示删除所有的类名

## toggleClass() 类名切换

- 若这个类名存在，则会移除该类名。否则添加该类名
- 语法：jQuery 对象.toggleClass('类名');
- 参数：字符串格式的类名。
- 优点：三个方法只操作参数部分的类名，不影响原有的其他类名。

<img src="/images/Javascript/JQ/toggleClass.gif" style="width: 20%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: pink;
      }
      .demo {
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <input type="button" value="添加" id="btn1" />
    <input type="button" value="删除" id="btn2" />
    <input type="button" value="切换" id="btn3" />
    <div id="box" class="box"></div>

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 给 box 切换 demo 的类名，从而改变背景颜色
      var $box = $("#box");
      var $btn1 = $("#btn1");
      var $btn2 = $("#btn2");
      var $btn3 = $("#btn3");

      // jQuery 中的类名控制方法，只会操作指定的类名，不会影响其他类名
      // 点击按钮 添加，让元素增加一个类名
      $btn1.click(function() {
        $box.addClass("demo");
      });

      // 点击按钮 删除，让元素减少一个类名
      $btn2.click(function() {
        // $box.removeClass("demo")
        // 如果不传参数，会删除所有类名
        $box.removeClass();
      });

      // 点击按钮 切换，让元素在一个类名中进行添加和删除的自动切换
      $btn3.click(function() {
        $box.toggleClass("demo");
      });
    </script>
  </body>
</html>
```

## hasClass() 检测类名是否存在

- 语法：jQuery 对象.hasClass('类名');
- 返回值：true 和 false

<img src="/images/Javascript/JQ/hasClass.gif" style="width: 20%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .box{
            width: 100px;
            height: 100px;
            background-color: pink;
        }
        .demo{
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <input type="button" value="切换" id="btn3">
    <div id="box" class="box"></div>

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
        // 给 box 切换 demo 的类名，从而改变背景颜色
        var $box = $("#box");
        var $btn3 = $("#btn3");

        // 判断一个类名在标签中是否加载
        console.log($box.hasClass("demo"))
        // 模拟一下 切换 类名的效果
        $btn3.click(function () {
          // 判断 box 是否有 demo 的类名
          if ($box.hasClass("demo")) {
            // 如果有 demo，就删除
            $box.removeClass("demo")
          } else {
            // 如果没有 demo，就添加一个
            $box.addClass("demo")
          }
        })
    </script>
</body>
</html>
```

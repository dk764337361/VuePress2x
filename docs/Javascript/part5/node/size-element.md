# jQuery 操作元素的尺寸

## width() 和 height() 方法

操作的大小仅仅是内容部分,不包括 padding、border、margin

- 设置：
  - 语法：jQuery 对象.width(数字);
- 获取：
  - 语法：jQuery 对象.width();

## innerWidth() 和 innerHeight() 方法

操作的大小是内容部分 + padding

- 设置：
  - 语法：jQuery 对象.innerWidth(数字);
- 获取：
  - 语法：jQuery 对象.innerWidth();

## outerWidth() 和 outerHeight() 方法

操作的大小是内容部分 + padding + border

- 设置：
  - 语法：jQuery 对象.outerWidth(数字);
- 获取：
  - 语法：jQuery 对象.outerWidth();

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
      .box {
        width: 200px;
        height: 200px;
        padding: 50px;
        border: 20px solid skyblue;
        margin: 30px;
        background: pink;
      }
    </style>
  </head>
  <body>
    <div class="box">123</div>
    <script src="js/jquery-1.12.4.js"></script>
    <script>
      var $box = $(".box");
      // 获取内容区域的大小
      // console.log($box.width());
      // 设置大小
      // $box.width(300)

      // 获取内容区域 + padding 区域的大小
      // console.log($box.innerWidth())
      // 设置,将增加或减少的值设置给了 width 属性
      // $box.innerWidth(400)

      // 获取 border 及以内区域的大小
      // console.log($box.outerWidth())
      // 设置,将增加或减少的值设置给了 width 属性
      $box.outerWidth(440);
    </script>
  </body>
</html>
```

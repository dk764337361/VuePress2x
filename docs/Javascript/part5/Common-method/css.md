# 操作样式方法

## css() 方法
- jQuery 对象有一个 css() 的方法，用于调用 css 属性值或者更改 css 属性值。
- 语法：jQuery对象.css(name,value);
- 参数1：字符串格式的 css 样式属性名
- 参数2：设置或更改的属性值。

::: warning 注意
- 一个参数：表示调用 css 属性的值，得到的是某个元素的计算后样式，值为字符串格式。
- 两个参数：表示设置 css 样式属性，第二个参数可以是字符串格式的属性值，如果带单位的数字的属性值，可以写成带单位的字符串格式、不带单位的字符串、纯数字、带 += 等赋值运算的字符串。
- css() 方法的第一个参数，复合属性的单一属性写法可以是`驼峰命名法`，也可以是`横线写法`。
- 可以给同一个对象同时设置多条 css 属性，将多条属性的属性和属性值写成`对象格式`，传给 css()的参数。
:::


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .box {
      width: 200px;
      height: 200px;
      background-color: pink;
    }
  </style>
</head>
<body>
  <div class="box" style="width: 300px;"></div>
  <script src="js/jquery-1.12.4.min.js"></script>
  <script>
    // 获取元素
    var $box = $(".box")
    
    // css() 传一个参数：获取对应的属性值
    console.log($box.css("width"))
    // 复合属性的单一属性写法，可以是横线写法，也可以是驼峰命名法
    console.log($box.css("background-color"))
    console.log($box.css("backgroundColor"))

    // css() 传入两个参数：设置或更改对应的属性值
    // $box.css("width","400px")
    // $box.css("width","400")
    // $box.css("width",500)
    // $box.css("width","+=100px")

    // 设置多条属性，可以使用对象形式的参数
    $box.css({
      "width": 200,
      "height": 300
    })

  </script>
</body>
</html>
```
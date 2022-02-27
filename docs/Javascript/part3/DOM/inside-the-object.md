# 元素对象内部获取标签元素

- 获取的元素对象内部，本身也可以调用根据标签获取元素方法，例如 div 元素对象也可以调用 getElementsByTagName 方法。
- 目的：缩小选择元素的范围，类似 css 中的后代选择器。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #box1 p {
      color: red;
    }
  </style>
</head>
<body>
  <div id="box1">
    <p>text1 of box1</p>
    <p>text2 of box1</p>
    <p>text3 of box1</p>
    <p>text4 of box1</p>
  </div>
  <div id="box2">
    <p>text1 of box2</p>
    <p>text2 of box2</p>
    <p>text3 of box2</p>
    <p>text4 of box2</p>
  </div>
  <script>
    // 元素对象内部可以继续打点调用通过标签名获取元素的方法
    // 类似于 css 中 后代选择器，缩小选择范围
    // var box1 = document.getElementById("box1").getElementsByTagName("p");

    // 我们习惯将连续调用方式拆开书写,方便后期调用。
    var box1 = document.getElementById("box1");
    var ps1 = box1.getElementsByTagName("p");
    console.log(ps1);
  </script>
</body>
</html>
```
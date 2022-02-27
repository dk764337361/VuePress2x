# 根据选择器获取元素

- 方法 1：调用 document 对象的 querySelector 方法，通过 css 中的选择器去选取第一个符合条件的标签元素。
- 方法 2：调用 document 对象的 querySelectorAll 方法，通过 css 中的选择器去选取所有符合条件的标签元素。
- 参数：字符串类型的 css 中的选择器。
- 浏览器兼容问题：不支持 IE8 以下的浏览器

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>  
  <script>
    // // 在结构之前使用 选择器 选取方法
    // var para = document.querySelector("#box1 .para");
    // console.log(para);

    // 选择所有符合条件的元素
    // var paras = document.querySelectorAll("#box1 .para");
    // console.log(paras);
  </script>
</head>
<body>
  <div id="box1">
    <p>text1 of box1</p>
    <p class="para">text2 of box1</p>
    <p class="para">text3 of box1</p>
    <p>text4 of box1</p>
  </div>
  <div id="box2">
    <p>text1 of box2</p>
    <p class="para">text2 of box2</p>
    <p class="para">text3 of box2</p>
    <p>text4 of box2</p>
  </div>
  <script>
    // 在结构之后使用 选择器 选取方法
    var para = document.querySelector("#box1 .para");
    console.log(para); //    <p class="para">text2 of box1</p>
    var paras = document.querySelectorAll("#box1 .para");
    console.log(paras); //NodeList(2)
    // 兼容问题：在 IE8 以下不能使用
  </script>
</body>
</html>
```
# offset偏移量属性

<img src="/images/Javascript/offset.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- offsetParent 偏移参考父级，距离自己最近的有定位的父级，如果都没有定位参考 body(html)
- offsetLeft/offsetTop 偏移位置
- offsetWidth/offsetHeight 偏移大小
::: tip 提示
- `offsetWidth/offsetHeight `包括`border`,包含`padding`。
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
      }
      #box {
        /* position: relative; */
        width: 300px;
        height: 300px;
        border: 10px solid yellowgreen;
        background-color: skyblue;
        overflow: hidden;
        margin: 50px;
      }
      #child {
        width: 100px;
        height: 100px;
        background-color: pink;
        margin: 50px;
        border: 10px solid yellow;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <div id="child"></div>
    </div>
    <script>
      // 获取元素
      var child = document.getElementById("child");
      // 元素天生就认识自己的偏移参考父级
      // console.log(child.offsetParent);

      // 偏移位置
      // console.log(child.offsetLeft);
      // console.log(child.offsetTop);

      // 偏移大小
      console.log(child.offsetWidth);
      console.log(child.offsetHeight);
    </script>
  </body>
</html>
```

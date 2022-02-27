# client客户端大小

<img src="/images/Javascript/client.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- client 系列没有参考父级元素。
- clientLeft/clientTop 边框区域尺寸，不常用
- clientWidth/clientHeight 边框内部大小
::: tip 提示
- `clientWidth/clientHeight `不包括`border`,包含`padding`。
- `clientLeft/clientTop` 包括`border`。
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
        width: 100px;
        height: 100px;
        margin: 50px;
        border: 40px solid red;
        padding: 10px;
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div id="box"></div>
    <script>
      var box = document.getElementById("box");

      // client 客户端大小
      console.log("box.clientLeft:" + box.clientLeft); //border 40px
      console.log("box.clientTop:" + box.clientTop); //border 40px
      console.log("box.clientWidth:" + box.clientWidth); //width  100px+padding 左右20px
      console.log("box.clientHeight:" + box.clientHeight); //height  100px+padding 左右20px
    </script>
  </body>
</html>
```

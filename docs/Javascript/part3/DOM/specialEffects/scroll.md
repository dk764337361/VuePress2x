# scroll滚动偏移属性

  <img src="/images/Javascript/scroll.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- `scrollLeft/scrollTop` 盒子内部滚动出去的尺寸
- `scrollWidth/scrollHeight` 盒子内容的宽度和高度

::: tip 提示
`scrollWidth/scrollHeight`不包括`border`,包含`padding`。
:::
<img src="/images/Javascript/box-scroll.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      body {
        margin: 0;
      }

      #box {
        width: 200px;
        height: 200px;
        margin: 50px;
        border: 30px solid red;
        padding: 50px;
        background-color: green;
        overflow: auto;
      }

      #box p {
        width: 300px;
        height: 300px;
        background-color: pink;
      }
    </style>
  </head>

  <body>
    <div id="box">
      <p></p>
    </div>
    <script>
      var box = document.getElementById("box");
      // 滚动偏移位置和大小
      // 滚动条滚动事件
      box.onscroll = function() {
        console.log("box.scrollLeft:" + box.scrollLeft); //#box p的width300px + #box 的padding: 50px =400px
        console.log("box.scrollTop:" + box.scrollTop); //#box p的height300px + #box 的padding: 50px =400px
      };

      // console.log(box.scrollLeft);
      // console.log(box.scrollTop);
      console.log("box.scrollWidth:" + box.scrollWidth);
      console.log("box.scrollHeight:" + box.scrollHeight);
      console.log("box.scrollLeft:" + box.scrollLeft);
      console.log("box.scrollTop:" + box.scrollTop);

      console.log("box.clientWidth:" + box.clientWidth); // width: 200px + padding: 50px=300px -17px的滚动条宽度 = 283px
      console.log("box.clientHeight:" + box.clientHeight); // width: 200px + padding: 50px=300px -17px的滚动条高度 = 283px
      console.log("box.offsetWidth:" + box.offsetWidth); // width: 200px + padding: 50px=300px + border: 30px = 360px
      console.log("box.offsetHeight:" + box.offsetHeight); // width: 200px + padding: 50px=300px + border: 30px = 360px
    </script>
  </body>
</html>
```

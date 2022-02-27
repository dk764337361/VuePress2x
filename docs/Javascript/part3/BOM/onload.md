# window.onload 事件

- 我们可以给 window 对象或者 `<img>` 等元素添加 onload 加载事件，表示只有绑定事件的元素加载完毕才能触发事件，才能执行事件函数。
- 其中 window 对象加载完毕：指的是所有 HTML 结构加载完，并且外部引入资源（js、css、img、视频）也加载完毕。

::: tip 提示
给 window 对象添加 onload 加载事件,要等所有 HTML 结构加载完，页面加载显示效率会比较慢。

而单单给`<img>` 等元素添加 onload 加载事件，页面加载显示效率会比较快。
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      #box {
        width: 440px;
        border: 10px solid #f00;
      }
      #box img {
        display: block;
        width: 440px;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <img src="images/lunbo/01.jpg" alt="" />
      <img src="images/lunbo/02.jpg" alt="" />
      <img src="images/lunbo/03.jpg" alt="" />
      <img src="images/lunbo/04.jpg" alt="" />
      <img src="images/lunbo/05.jpg" alt="" />
    </div>

    <script>
      var box = document.getElementById("box");
      // var pic = document.getElementsByTagName("img")[0];
      var pics = document.getElementsByTagName("img");

      // Chrome 浏览器渲染加载的机制，由于图片加载时间过长，避免等待，图片在加载过程中，会先执行后面的 js 代码
      // 后续需要使用到 图片的宽度或高度等尺寸，在 js 中可能获取不到
      // console.log(box.clientHeight);//0

      // 图片的加载事件,只要图片加载完毕渲染成功后，就能够立即执行事件函数
      // pic.onload = function () {
      ////判断pic[0]是否加载完毕
      //   // 在这里已经保证图片加载成功
      //   console.log(box.clientHeight);
      // };

      // 计数器
      // var sum = 0;
      // for (var i = 0 ; i < pics.length ; i++) {
      //   pics[i].onload = function () {
      //     sum++;
      //     // 判断这一次是否加载所有图片完毕
      //     if (sum >= pics.length) {
      //       console.log(box.clientHeight);
      //     }
      //   };
      // }

      window.onload = function() {
        console.log(box.clientHeight);
      };
    </script>
  </body>
</html>
```

## 应用

- 利用 window.onload 事件，可以将 js 代码提前到 html 结构之前。

::: warning 注意
一个页面中只能有一个 window.onload 事件。
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      #box {
        width: 440px;
        border: 10px solid #f00;
      }
      #box img {
        display: block;
        width: 440px;
      }
    </style>
    <script>
      // window.onload 事件，一个页面只能使用一次
      window.onload = function() {
        // 事件被触发时，页面所有内容都已经加载完毕，获取元素不会出现错误
        var box = document.getElementById("box");
        var pics = document.getElementsByTagName("img");
        console.log(box.clientHeight);
      };
    </script>
  </head>
  <body>
    <div id="box">
      <img src="images/wufeng/01.jpg" alt="" />
      <img src="images/wufeng/02.jpg" alt="" />
      <img src="images/wufeng/03.jpg" alt="" />
      <img src="images/wufeng/04.jpg" alt="" />
      <img src="images/wufeng/05.jpg" alt="" />
    </div>
  </body>
</html>
```

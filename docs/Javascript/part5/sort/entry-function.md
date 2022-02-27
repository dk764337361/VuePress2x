# jQuery 中的入口函数

## 入口函数

- 原生的 window.onload
- jQuery 中的入口函数
- 语法 1：

```js
$(document).ready(function() {
  // 获取元素
});
```

- 语法 2：

```js
$(function() {
  // 获取元素
});
```

::: warning 注意

- onload 事件，等待所有的页面中的资源（DOM 树、图片、视频、音频等外部资源）加载完毕之后，才会执行
- jq 的入口函数,仅仅需要等待 DOM 树加载完成就立即执行
  :::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>入口函数</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // onload 事件在加载时，指的是页面中所有的资源【DOM树、音频、视频、图片等】加载完毕后，才能触发
      // 一个页面中只能出现一次（如果多次书写，后面会覆盖前面的onload）
      window.onload = function() {
        console.log(1);
        var btn = document.getElementsByTagName("input")[0];
        console.log(btn);
      };

      // jQuery中的入口函数
      // 仅仅需要等待页面中的 DOM 树加载完毕就可以执行了，比原生window.onload快。
      $(document).ready(function() {
        console.log(2);
        var btn = document.getElementsByTagName("input")[0];
        console.log(btn);
      });

      // jQuery中的入口函数-简化
      // 在一个页面中，可以书写多个 jQuery 的入口函数，执行顺序按照前后加载顺序执行
      $(function() {
        console.log(3);
        var btn = document.getElementsByTagName("input")[0];
        console.log(btn);
      });
      // $(function () {

      // })
    </script>
  </head>

  <body>
    <input type="button" value="按钮" />
  </body>
</html>
```

# \$() 方法

在 DOM 操作中，基本都是从获取元素开始的。

jQuery 中封装了一个更加强大的获取元素方法 \$()。

- 在 jQuery 中，只有一个全局变量 \$,这是 jQuery 的一大特点，避免了全局变量的污染。
- 最开始变量不叫做 \$，叫做 jQuery() 方法，在库中两个名字是并存的，都可以使用。
- 经典错误：\$ 未定义
  - 原因 1：JQ 文件未正确引用
  - 原因 2：JQ 文件出了问题

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <p>段落1</p>
    <p>段落2</p>
    <p>段落3</p>
    <p>段落4</p>
    <p>段落5</p>
    <p>段落6</p>
    <p>段落7</p>
    <p>段落8</p>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      $("p").css("background-color", "red");
      // jQuery("p").css("background-color","red")
    </script>
  </body>
</html>
```

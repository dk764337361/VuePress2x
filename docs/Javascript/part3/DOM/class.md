# class类名属性操作

## class 更改 css 的方法

- 修改元素的 className 属性相当于直接修改标签的类名。
- 如果需要修改多条 css 样式，可以提前将修改后的样式设置到一个类选择器中，后续通过
  修改类名的方式，批量修改 css 样式。

::: tip 总结
class 更改 css 适用于`批量`更改css 样式
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .cls {
        width: 100px;
        height: 100px;
        background-color: pink;
      }
    </style>
    <script src="common.js"></script>
  </head>
  <body>
    <input type="button" value="按钮" id="btn" />
    <div id="box">文字</div>
    <script>
      // 问题：实际工作中我们应该选择哪种方法？
      // 获取元素
      var btn = my$("btn");
      var box = my$("box");
      // 给按钮添加事件
      btn.onclick = function() {
        // 1.通过更改类名
        // box.className = "cls";
        // 2.通过元素对象的 style 属性进行设置
        box.style.width = "100px";
        box.style.height = "200px";
        box.style.backgroundColor = "yellow";
      };
    </script>
  </body>
</html>
```

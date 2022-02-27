# 兄弟节点常用属性

- `nextSibling` 只读属性，返回与该节点同级的下一个节点，如果没有返回 null。
- `previousSibling` 只读属性，返回与该节点同级的上一个节点，如果没有返回 null。
- `nextElementSibling` 只读属性，返回与该节点同级的下一个元素节点，如果没有返回 null。
- `previousElementSibling` 只读属性，返回与该节点同级的上一个元素节点，如果没有返回 null。

::: warning 注意
`nextElementSibling` 和 `previousElementSibling` 有兼容性问题，<Badge type="danger" text="IE9" vertical="bottom" /> 以后才支持。
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="box">
      <p>这是段落1</p>
      <p>这是段落2</p>
      <p id="p3">这是段落3</p>
      <p>这是段落4</p>
      <p>这是段落5</p>
    </div>
    <script src="common.js"></script>
    <script>
      // 获取元素
      var p3 = my$("p3");
      // 上一个兄弟节点
      console.log(p3.previousSibling); //#text
      // 下一个兄弟节点
      console.log(p3.nextSibling); //#text
      // 上一个兄弟元素的节点
      console.log(p3.previousElementSibling); //<p>这是段落2</p>
      // 下一个兄弟元素的节点
      console.log(p3.nextElementSibling); //<p>这是段落4</p>
    </script>
  </body>
</html>
```

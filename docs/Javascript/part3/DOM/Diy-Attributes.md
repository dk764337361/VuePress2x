# 自定义属性操作

- getAttribute(name) 获取标签行内属性
- setAttribute(name，value) 设置标签行内属性
- removeAttribute(name) 移除标签行内属性
- 与 element.属性的区别: 上述三个方法用于获取任意的行内属性，包括自定义的属性。

::: tip 提示
对于元素自有属性可以使用<Badge type="warning" text=" . 语法" vertical="top" />进行调用

```html
<div id="box" age="18" sex="male">小明</div>
<script>
  console.log(box.id);
</script>
```
:::

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="box" age="18" sex="male">小明</div>
  <script>
    // 获取元素
    var box = document.getElementById("box");
    // 元素自有属性
    console.log(box.id);
    // 元素自定义的新属性不能用点语法直接调用
    // 可以调用元素对象的获取自定义属性的方法
    console.log(box.getAttribute("age"));
    console.log(box.getAttribute("sex"));
    // 也可以调用自有的属性
    console.log(box.getAttribute("id"));

    // 设置属性,添加新的自定义属性或者自有属性
    box.setAttribute("age","20");
    box.setAttribute("city","Beijing");
    // 传的参数不需要进行属性名的修改
    box.setAttribute("class","demo");

    // 移除属性
    box.removeAttribute("age");
    box.removeAttribute("class");
  </script>
</body>
</html>
```

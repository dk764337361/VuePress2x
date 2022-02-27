# jQuery 事件对象

## 事件对象

- 事件处理程序的第一个形参 e

## 鼠标事件对象相关的属性

- 事件对象.clientX/Y 参照浏览器
- 事件对象.pageX/Y 参照文档
- 事件对象.offsetX/Y 参照元素

## 键盘事件对象相关的属性

- 事件对象.keyCode 返回键码数字
- 事件对象.altKey/shiftKey/ctrlKey 返回是布尔值。 检测是否按下（true）

## 公共的属性或方法

- 属性
  - 事件对象.target 最初触发事件的 DOM 元素
  - 事件对象.currentTarget 在事件冒泡阶段中的当前 DOM 元素
- 方法：
  - 事件对象.preventDefault(); 阻止默认行为
  - 事件对象.stopPropagation(); 阻止事件冒泡

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
    <script src="js/jquery-1.12.4.js"></script>
    <script>
      // 键盘按下事件中，获取键码的数字
      $(document).keydown(function(e) {
        console.log(e.keyCode);
      });
    </script>
  </body>
</html>
```

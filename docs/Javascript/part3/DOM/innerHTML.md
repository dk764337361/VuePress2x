# innerHTML 和 innerText 属性

## 获取标签内部内容的属性

- 获取标签内部内容的属性有两个：innerHTML 和 innerText
- innerHTML 属性，在获取标签内部内容时，如果包含标签，获取的内容会包含标签，获取的
  内容包括空白换行等。
- innerText 属性，在获取标签内部内容时，如果包含标签，获取的内容会过滤标签，获取的
  内容会去掉换行和缩进等空白。

## 更改标签内容

还可以通过两个属性给双标签内部去更改内容：

- innerHTML 设置属性值，有标签的字符串，会按照 HTML 语法中的标签加载。
- innerText 设置属性值，有标签的字符串，会按照普通的字符加载。
  对比使用场景
- innerText：在设置纯字符串时使用。
- innerHTML：在设置有内部子标签结构时使用。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="box">
      这是一个 div 标签
      <span>这是一个 span 标签</span>
    </div>
    <script>
      // 获取元素
      var box = document.getElementById("box");
      // 打印 box 对象
      console.dir(box);
      // 调用标签内部内容
      console.log(box.innerHTML);
      console.log(box.innerText);
      // 设置标签内部的内容
      // box.innerHTML = "<h2>hello JS</h2>";
      box.innerText = "<h2>hello JS</h2>";
    </script>
  </body>
</html>
```

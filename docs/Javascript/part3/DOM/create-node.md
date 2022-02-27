# 创建新节点的方法

- document.createElement("div") 创建元素节点
- document.createAttribute("id") 创建属性节点
- document.createTextNode("hello") 创建文本节点
- 一般将创建的新节点存在变量中，方便使用。

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
      <p>段落内容 1</p>
      <p>段落内容 2</p>
      <p>段落内容 3</p>
      <p>段落内容 4</p>
    </div>
    <script src="common.js"></script>
    <script>
      // 创建新的节点
      var div = document.createElement("div");
      console.dir(div);

      var cls = document.createAttribute("class");
      console.dir(cls);

      var txt = document.createTextNode("hello");
      console.dir(txt);
      // 创建的新的节点，是存储在内存中的，但是并没添加到 DOM 树上
    </script>
  </body>
</html>
```

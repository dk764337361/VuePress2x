# 节点属性

- nodeType 节点的类型，属性值为数字，表示不同的节点类型，共 12 种，只读

```html
<div id="box">div 1</div>
```

1. 元素节点 --> `<div>`
2. 属性节点 --> id="SB"
3. 文本节点 --> div 1

- nodeName 节点的名称(标签名称)，只读
- nodeValue 节点值，返回或设置当前节点的值

  元素节点的 nodeValue 始终是 null

<img src="/images/Javascript/element.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/Javascript/Attributes.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/Javascript/text.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
    <div id="box">div 1</div>
    <script>
      var box = document.getElementById("box");
      // 元素节点
      // console.dir(box);
      // 属性节点获取
      var idNode = box.getAttributeNode("id");
      console.dir(idNode);
      idNode.nodeValue = "demo";

      // 文本节点
      var childNodes = box.childNodes;
      console.log(childNodes);
      childNodes[0].nodeValue = "box 1";
    </script>
  </body>
</html>
```

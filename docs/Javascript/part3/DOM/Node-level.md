# 父子节点常用属性

- `childNodes(父元素节点)` 只读属性，获取一个节点所有`子节点`的实时的集合，集合是动态变化的。
- `children(子元素节点)` 只读属性，返回一个节点所有的`子元素节点`集合，是一个动态更新的 HTML 元素
  集合。
- `firstChild` 只读属性，返回该节点的第一个子节点，如果该节点没有子节点则返回 null。
- `lastChild` 只读属性，返回该节点的最后一个子节点，如果该节点没有子节点则返回 null。
- `parentNode` 返回一个当前节点的父节点，如果没有这样的节点，比如说像这个节点是树结构
  的顶端或者没有插入一棵树中，这个属性返回 null。
- `parentElement` 返回当前节点的父元素节点，如果该元素没有父节点，或者父节点不是一个 DOM
  元素，则返回 null。

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
      <p>段落</p>
      <span>span 小盒子</span>
    </div>
    <script>
      var box = document.getElementById("box");
      // 获取子节点
      console.log(box.childNodes); //或获取所有类型的子节点
      console.log(box.children); //或获取所有元素类型的子节点
      console.log(box.firstChild); //或获取所有类型的子节点的第一个
      console.log(box.lastChild); //或获取所有类型的子节点的最后一个
      console.log(box.firstElementChild); //或获取所有元素类型的子节点的第一个
      console.log(box.lastElementChild); //或获取所有元素类型的子节点的最后一个
      // 获取父级
      console.log(box.parentNode);
      console.log(box.parentElement);
    </script>
  </body>
</html>
```

## 总结

### 不常用

- `childNodes` //NodeList(5) [text, p, text, span, text]
- `firstElementChild` // `<p>段落</p>`
- `lastElementChild` //`<span>span 小盒子</span>`

- `parentNode`
- `parentElement`

```html
<!-- parentNode、parentElement 都输出 -->
<body>
  <div id="box">
    <p>段落</p>
    <span>span 小盒子</span>
  </div>
  <body></body>
</body>
```

### 常用

- `children` //HTMLCollection(2) [p, span]
- `firstChild` //#text
- `lastChild `//#text

## 案例：利用父子节点重写“隔行变色”

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      td {
        width: 100px;
        height: 40px;
      }
    </style>
  </head>
  <body>
    <table border="1" style="border-collapse: collapse;">
      <tbody id="tb">
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <script src="common.js"></script>
    <script>
      // 获取父级元素
      var tb = my$("tb");
      // 获取子元素的所有节点
      var trs = tb.children; //获取的是所有的子元素的节点
      // console.log(trs); //HTMLCollection(8) [tr, tr, tr, tr, tr, tr, tr, tr]
      // 隔行变色
      for (var i = 0; i < trs.length; i++) {
        if (i % 2 == 0) {
          trs[i].style.backgroundColor = "pink";
        } else {
          trs[i].style.backgroundColor = "skyblue";
        }
      }
    </script>
  </body>
</html>
```

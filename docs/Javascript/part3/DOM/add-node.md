# 添加节点方法

## 1.添加：parentNode.appendChild(child)

- parentNode.appendChild(child)：将一个节点添加到指定父节点的子节点列表末尾。

```html{25-31}
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
      <p id="p2">段落内容 2</p>
      <p>段落内容 3</p>
      <p>段落内容 4</p>
    </div>
    <script src="common.js"></script>
    <script>
      // 创建新的节点
      var div = document.createElement("div");
      var cls = document.createAttribute("class");
      var txt = document.createTextNode("hello");
      // 创建的新的节点，是存储在内存中的，但是并没添加到 DOM 树上
      // 获取元素
      var box = my$("box");
      var p2 = my$("p2");
      box.appendChild(div);
      // 文本节点也可以添加到元素内部
      div.appendChild(txt);
      // 注意：自己创建的元素节点本身也是一个对象，也可以去添加一些新的属性和方法，这些操作将来在元素加载到 DOM 树中时，依旧保留

      // DOM 中原有的节点也可以传给 appendChild 的参数
      box.appendChild(p2);
    </script>
  </body>
</html>
```

## 2.替换：parentNode.replaceChild(newChild, oldChild)

- parentNode.replaceChild(newChild, oldChild)：用指定的节点替换当前节点的一个子节
  点，并返回被替换掉的节点。

```html{26-27}
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
      <p id="p2">段落内容 2</p>
      <p>段落内容 3</p>
      <p>段落内容 4</p>
    </div>
    <script src="common.js"></script>
    <script>
      // 创建新的节点
      var div = document.createElement("div");
      var cls = document.createAttribute("class");
      var txt = document.createTextNode("hello");
      // 创建的新的节点，是存储在内存中的，但是并没添加到 DOM 树上
      div.appendChild(txt);
      // 获取元素
      var box = my$("box");
      var p2 = my$("p2");
      // 替换节点
      box.replaceChild(div, p2);
    </script>
  </body>
</html>
```

## 3.插入：parentNode.insertBefore(newNode, referenceNode)

parentNode.insertBefore(newNode, referenceNode)：在参考节点之前插入一个拥有指定
父节点的子节点，referenceNode 必须设置，如果 referenceElement 为 null 则 newNode
将被插入到子节点的末尾。

```html{27-29}
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
      <p id="p2">段落内容 2</p>
      <p>段落内容 3</p>
      <p>段落内容 4</p>
    </div>
    <script src="common.js"></script>
    <script>
      // 创建新的节点
      var div = document.createElement("div");
      var cls = document.createAttribute("class");
      var txt = document.createTextNode("hello");
      // 创建的新的节点，是存储在内存中的，但是并没添加到 DOM 树上
      div.appendChild(txt);
      // 获取元素
      var box = my$("box");
      var p2 = my$("p2");

      //在某个指定子节点之前添加一个新的子节点
      box.insertBefore(div, p2);
      // box.insertBefore(div,null);
    </script>
  </body>
</html>
```

## 4.移除：parentNode.removeChild(child)

parentNode.removeChild(child)：移除当前节点的一个子节点。这个子节点必须存在于当
前节点中。

```html{27}
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
      <p id="p2">段落内容 2</p>
      <p>段落内容 3</p>
      <p>段落内容 4</p>
    </div>
    <script src="common.js"></script>
    <script>
      // 创建新的节点
      var div = document.createElement("div");
      var cls = document.createAttribute("class");
      var txt = document.createTextNode("hello");
      // 创建的新的节点，是存储在内存中的，但是并没添加到 DOM 树上
      div.appendChild(txt);
      // 获取元素
      var box = my$("box");
      var p2 = my$("p2");

      box.removeChild(p2);
    </script>
  </body>
</html>
```

## 5.克隆：Node.cloneNode()

克隆 Node.cloneNode()：克隆一个节点，并且可以选择是否克隆这个节点下的所有内容。参数为
Boolean 布尔值，表示是否采用深度克隆。

- 如果为 true,则该节点的所有后代节点也都会被克隆
- 如果为 false,则只克隆该节点本身，默认值为 true，节点下的内容会被克隆。

::: warning 注意
克隆时，标签上的属性和属性值也会被复制，写在标签行内的绑定事件可以被复制，
但是通过 JavaScript 动态绑定的事件不会被复制。
:::

```html{24-30}
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
      <p id="p2">段落内容 2</p>
      <p>段落内容 3</p>
      <p>段落内容 4</p>
    </div>
    <script src="common.js"></script>
    <script>
      // 获取元素
      var box = my$("box");
      var p2 = my$("p2");
      box.onclick = function() {
        alert(2);
      };

      // 克隆元素 box
      // 浅度克隆
      // var newBox = box.cloneNode(false);
      // 深度克隆
      var newBox = box.cloneNode(true);
      newBox.id = "newBox";
      document.body.appendChild(newBox);
    </script>
  </body>
</html>
```

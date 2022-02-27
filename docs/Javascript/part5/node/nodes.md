# jQuery 节点操作

## 创建元素

- 语法：`$('<li></li>')`

## 追加元素 1

- 向父元素`最后`追加

语法：父元素 jQuery 对象.append(新创建的 jQuery 对象);

语法：新创建 jQuery 对象.appendTo('父元素选择器' 或 父元素 jQuery 对象);

- 向父元素最`前面`追加

语法：父元素 jQuery 对象.prepend(新创建的 jQuery 对象);

语法：新创建 jQuery 对象.prependTo('父元素选择器' 或 父元素 jQuery 对象);

## 追加元素 2

- 向元素`后面`追加新的兄弟

语法：jQuery 对象.after(新创建的 jQuery 对象);

语法：新创建 jQuery 对象.insertAfter('选择器' 或 jQuery 对象);

- 向元素`前面`追加新的兄弟

语法：jQuery 对象.before(新创建的 jQuery 对象);

语法：新创建 jQuery 对象.insertBefore('选择器' 或 jQuery 对象);

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
    <div class="box">
      <h2>标题</h2>
      <p>段落</p>
    </div>
    <ul>
      <li>这是原有的标签</li>
      <li>这是原有的标签</li>
      <li>这是原有的标签</li>
      <li>这是原有的标签</li>
    </ul>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      var $ul = $("ul");
      var $box = $(".box");
      var newlist = $("<li>这是新创的标签</li>");
      //向父元素`最后`追加
      // $ul.append(newlist);
      // newlist.appendTo($ul);

      //向父元素`前面`追加
      //$ul.prepend(newlist)
      //newlist.prependTo($ul);

      //向一个元素后面追加新的兄弟元素
      //   $box.after(newlist)
      //   newlist.insertAfter($box)
      //   newlist.insertAfter($ul)

      //向一个元素前面追加新的兄弟元素
      //   $box.before(newlist)
      //   newlist.insertBefore($box)
      //   newlist.insertBefore($ul)
    </script>
  </body>
</html>
```

## 删除元素

- 语法：jQuery 对象.remove();
- 删除谁就让谁调用这个方法

## 清空元素

- 清空方式 1：jQuery 对象.empty(); 推荐使用， 清空内部的所有元素及元素相关的事件
- 清空方式 2：jQuery 对象.html(''); 仅仅清空内部的元素，不清清理内存中的元素的事件。

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
    <div class="box">
      <p>段落</p>
      <h2>标题</h2>
    </div>
    <ul>
      <li>这是第 1 个标签</li>
      <li>这是第 2 个标签</li>
      <li class="third">这是第 3 个标签</li>
      <li>这是第 4 个标签</li>
      <li>这是第 5 个标签</li>
    </ul>

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 删除元素自己
      // $(".third").remove();

      // 清空元素内部的所有子节点
      // 方法1： empty() 方法，清除所有子节点的同事，清除子节点上的事件
      // $(".box").empty();
      // 方法2： html() 方法，将参数设置为空字符串
      // $(".box").html("");
    </script>
  </body>
</html>
```

## 克隆元素

- 语法：jQuery 对象.clone(布尔值); 返回克隆好的元素
- 参数：默认是 false,表示仅仅克隆内容。 true，克隆内容和事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      div {
        width: 200px;
        height: 200px;
        background-color: pink;
        margin-bottom: 20px;
      }
      .demo {
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>标题1</h2>
      <p>段落1</p>
    </div>
    <div class="demo">
      <h2>标题2</h2>
      <p>段落2</p>
    </div>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      $(".box").click(function() {
        alert("你好");
      });

      // 获取 box 元素
      var $box = $(".box");
      // 克隆 box
      // var $newBox = $box.clone(false); //只克隆内容，不克隆事件
      var $newBox = $box.clone(true); //克隆内容，克隆事件
      // // 添加到 body 最后
      $("body").append($newBox);
    </script>
  </body>
</html>
```

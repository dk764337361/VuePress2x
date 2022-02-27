# 操作标签的内容

## html()方法

html() 方法相当于原生 JS 中的 innerHTML 属性，用来获取或设置标签内部内容。

方法可以传递一个参数，自定义的字符串内容。

- 获取：文本和内部标签
  - 语法：jQuery 对象.html();
- 设置：若设置标签时，标签会被渲染
  - 语法：jQuery 对象.html('文本内容');

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="box">这是原始的 div1</div>
    <div class="box">这是原始的 div2</div>
    <div class="box">这是原始的 div3</div>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $box = $(".box");
      // html() 方法相当于原生 js 中的 innerHTML 属性
      // html() 方法，如果传递参数，批量更改元素内部的内容
      // $box.html("这是一个新的内容")
      // 如果内部的字符串包含了标签的语法的字符，会按照 html 语法进行加载
      // $box.html("这是新增加的子级<p>这是段落</p>");

      // html() 方法不传递参数，是获取元素内容
      // 获取时只能获取第一个元素内部的文案
      // console.log($box.html())

      //使用函数来设置所有匹配元素的内容。
      $box.html((n) => {
        return "新的标签信息" + n;
      });
    </script>
  </body>
</html>
```

## text()

- text() 方法相当于原生 JS 中的 innerText 属性，用来获取或设置标签内部文字。
- 获取：仅仅是文本
  - 语法：jQuery 对象.text();
- 设置：若设置标签时，标签会被当做普通文本
  - 语法：jQuery 对象.text('文本内容');

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="box">这是原始的 div1 <span>span1</span></div>
    <div class="box">这是原始的 div2 <span>span2</span></div>
    <div class="box">这是原始的 div3 <span>span3</span></div>

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $box = $(".box");
      // text() 方法相当于 innerText 属性
      // 获取，获取所有的标签内部的文字内容，忽略标签
      // console.log($box.text())

      // 设置,会将书写的内容都当成普通文字，不会按照标签加载
      $box.text("普通文本<p>段落</p>");
    </script>
  </body>
</html>
```

## val()

- val() 方法相当于原生 JS 中的 value 属性，用来获取或设置表单元素内容。
- 获取：表单元素的 value
  - 语法：jQuery 对象.val();
- 设置：表单元素的 value
  - 语法：jQuery 对象.val('文本内容');

::: warning 注意
单标签 input 使用不了 text()
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="box">这是原始的 div1 <span>span1</span></div>
    <input type="text" value="请输入用户名1" /><br />
    <input type="text" value="请输入用户名2" /><br />
    <textarea cols="30" rows="10">请输入自我介绍</textarea><br />
    <select>
      <option value="tianjin">天津</option>
      <option value="beijing">北京</option>
      <option value="shanghai">上海</option>
    </select>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $box = $(".box");
      var $input = $("input");
      var $ta = $("textarea");
      var $se = $("select");
      var $opt = $("option");

      // html 方法
      //注意：单标签input使用不了text()
      console.log($input.text());
      console.log($ta.text());
      console.log($ta.html());
      console.log($se.text());
      console.log($se.html());
      console.log($opt.text());
      console.log($opt.html());

      // 通过 val() 进行获取
      console.log($box.val());
      console.log($input.val());
      console.log($ta.val());
      console.log($se.val());
      console.log($opt.val());

      // 设置内容
      $input.val("haha");
      $ta.val("haha");
      $se.val("beijing"); //把北京选项设置为默认
      $opt.val("guangzhou");
    </script>
  </body>
</html>
```

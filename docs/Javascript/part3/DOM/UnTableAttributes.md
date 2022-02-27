# 非表单元素的属性

- 例如：href、title、id、src 等。
- 调用方式：元素对象打点调用属性名，例如 obj.href。
- 注意：部分的属性名跟关键字和保留字冲突，会更换写法。

  - class → className
  - for → htmlFor
  - rowspan → rowSpan

- 属性赋值：给元素属性赋值,等号右侧的赋值都是字符串格式。

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
    <a href="http://www.baidu.com" title="跳转到百度页面" id="link">跳转</a>
    <img src="images/a.jpg" alt="美女" class="pic" id="pic" />
    <script>
      // 获取元素
      var link = document.getElementById("link");
      var pic = document.getElementById("pic");
      // 调用元素对象的属性，从而操作 HTML 中标签的属性
      console.log(link.href);
      console.log(link.title);
      console.log(link.id);
      console.log(pic.src);
      console.log(pic.alt);
      console.log(pic.className);
      // 等号赋值，值必须是字符串类型的
      pic.src = "images/b.jpg";
    </script>
  </body>
</html>
```

## 案例 1

- 点击按钮切换图片
<img src="/images/Javascript/girls.gif" style="width: 60%; display:block; margin: 0 ;">
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="点击" id="btn" /><br />
    <img src="images/a.jpg" id="pic" />
    <script>
      // 获取元素
      var btn = document.getElementById("btn");
      var pic = document.getElementById("pic");
      // 通过一个变量作为判断条件，变量值为 1，认为加载的是 a 图片，如果为 2 ，认为加载的是 b 图片
      var num = 1;
      // 给按钮添加点击事件
      btn.onclick = function() {
        // 给图片换 src 的属性值
        // 通过 if 语句判断，如果是 a 图片，就换成 b 图片，反之换成 a 图片
        if (num === 1) {
          pic.src = "images/b.jpg";
          // 数字要对应发生变化
          num = 2;
        } else {
          pic.src = "images/a.jpg";
          num = 1;
        }
      };
    </script>
  </body>
</html>
```

## 案例 2

- 点击按钮显示隐藏 div
<img src="/images/Javascript/hide.gif" style="width: 60%; display:block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      }
      .hide {
        display: none;
      }
      .show {
        display: block;
      }
    </style>
  </head>
  <body>
    <input type="button" value="点击隐藏" id="btn" />
    <div id="box"></div>
    <script>
      // 获取元素
      var btn = document.getElementById("btn");
      var box = document.getElementById("box");
      // 点击按钮，让 div 显示或隐藏
      // box.style.display = "none";
      btn.onclick = function() {
        // 元素 div 当前是显示的，需要让他隐藏
        // 根据 按钮 的 value 值进行条件判断
        if (btn.value === "点击隐藏") {
          box.className = "hide";
          btn.value = "点击显示";
        } else {
          box.className = "show";
          btn.value = "点击隐藏";
        }
      };
    </script>
  </body>
</html>
```

## 案例 3

- 美女相册
<img src="/images/Javascript/hotgirls.gif" style="width: 60%; display:block; margin: 0 ;">

```html{88-89,97-99}
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title></title>
    <style type="text/css">
      body {
        font-family: "Helvetica", "Arial", serif;
        color: #333;
        background-color: #ccc;
        margin: 1em 10%;
      }

      h1 {
        color: #333;
        background-color: transparent;
      }

      a {
        color: #c60;
        background-color: transparent;
        font-weight: bold;
        text-decoration: none;
      }

      ul {
        padding: 0;
      }

      li {
        float: left;
        padding: 1em;
        list-style: none;
      }

      #imagegallery {
      }

      #imagegallery a {
        margin: 0px 20px 20px 0px;
        padding: 0px;
        display: inline;
      }

      #imagegallery a img {
        border: 0;
      }
    </style>
  </head>

  <body>
    <h2>
      美女画廊
    </h2>

    <div id="imagegallery">
      <a href="images/1.jpg" title="美女A">
        <img src="images/1-small.jpg" width="100px" alt="美女1" />
      </a>
      <a href="images/2.jpg" title="美女B">
        <img src="images/2-small.jpg" width="100px" alt="美女2" />
      </a>
      <a href="images/3.jpg" title="美女C">
        <img src="images/3-small.jpg" width="100px" alt="美女3" />
      </a>
      <a href="images/4.jpg" title="美女D">
        <img src="images/4-small.jpg" width="100px" alt="美女4" />
      </a>
    </div>

    <div style="clear:both"></div>

    <img id="image" src="images/placeholder.png" alt="" width="450px" />

    <p id="des">选择一个图片</p>
    <script>
      // 1.获取元素
      var imagegallery = document.getElementById("imagegallery");
      var links = imagegallery.getElementsByTagName("a");
      var image = document.getElementById("image");
      var des = document.getElementById("des");

      // 2.遍历数组，添加点击事件
      for (var i = 0; i <= links.length - 1; i++) {
        links[i].onclick = function() {
          // alert("aaa");
          // 3.更改 image 内部的 src 属性值
          // this 关键字指代的是触发事件的真正事件源
          image.src = this.href;
          // 4.更改 des 内部的文字内容
          des.innerText = this.title;
          // 5.取消 a 标签的默认跳转效果
          return false;
        };
      }

      // for 循环内部添加的绑定事件，在触发时，所有的批量添加的事件已经成功，触发事件时都是在循环结束之后
      // 批量绑定的事件的事件函数内部如果有 变量 i，要注意，函数执行时已经是在循环结束后
      // 循环内部定义的变量是一个全局变量，在循环后执行的 i 变量的值是 i 跳出循环时的值
      // image.src = links[i].href;
      // console.log(i);
    </script>
  </body>
</html>
```

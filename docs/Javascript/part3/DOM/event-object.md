# 事件对象e

- 只要触发事件，就会有一个对象，内部存储了与事件相关的数据。
- e 在低版本浏览器中有兼容问题，低版本浏览器使用的是 window.event
- 事件对象常用的属性：

  - e.eventPhase 查看事件触发时所处的阶段
    - 1：捕获阶段
    - 2：目标阶段
    - 3：冒泡阶段
  - e.target 用于获取触发事件的元素
  - e.srcElement 用于获取触发事件的元素，低版本浏览器使用
  - e.currentTarget 用于获取绑定事件的事件源元素
  - e.type 获取事件类型
  - e.clientX/e.clientY 所有浏览器都支持，鼠标距离浏览器窗口左上角的距离
  - e.pageX/e.pageY IE8 以前不支持，鼠标距离整个 HTML 页面左上顶点的距离

## e.target\srcElement\currentTarget

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      #box1 {
        width: 300px;
        height: 300px;
        background-color: yellowgreen;
      }
      #box2 {
        width: 200px;
        height: 200px;
        background-color: pink;
      }
      #box3 {
        width: 100px;
        height: 100px;
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <div id="box1">
      <div id="box2">
        <div id="box3"></div>
      </div>
    </div>
    <script>
      // 获取元素
      var box1 = document.getElementById("box1");
      var box2 = document.getElementById("box2");
      var box3 = document.getElementById("box3");

      // 添加事件
      box1.onclick = function(e) {
        // e指的就是存储事件对象的参数，只要事件被触发，e就会自动接收数据
        // 兼容问题
        e = e || window.event;
        // e.eventPhase 判断出事件执行时处于哪个阶段
        // 1：捕获阶段
        // 2：目标阶段
        // 3：冒泡阶段
        // console.log(e.eventPhase);

        // 获取真正触发事件的元素
        // var target = e.target || e.srcElement;
        // console.log(target);

        // 获取绑定事件的事件源元素
        console.log(e.currentTarget);
        // this 等同于e.currentTarget
        console.log(this);
      };
    </script>
  </body>
</html>
```

## `e.type`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      #box1 {
        width: 200px;
        height: 200px;
        background-color: yellowgreen;
      }
    </style>
  </head>
  <body>
    <div id="box1"></div>
    <script>
      // 获取元素
      var box1 = document.getElementById("box1");

      // e.type 属性获取事件类型
      // box1.onclick = function (e) {
      //     // 事件对象兼容
      //     e = e || window.event;
      //     // 触发的事件类型
      //     console.log(e.type);
      // };

      // 更多时候可能给同一个元素对象添加不同的事件类型，对应执行的事件函数内部的代码 不同
      // box1.onmouseover = function () {
      //     box1.style.backgroundColor = "skyblue";
      // };
      // box1.onmouseout = function () {
      //     box1.style.backgroundColor = "yellowgreen";
      // };
      // 可以将 所有给一个元素绑定的事件的事件函数写在一个 函数内，通过函数内部的 e.type 判断走不同的分支
      box1.onmouseover = fn;
      box1.onmouseout = fn;
      // 避免添加多个函数，占用更多的内存
      function fn(e) {
        e = e || window.event;
        // 根据事件类型，执行不同的代码
        switch (e.type) {
          case "mouseover":
            box1.style.backgroundColor = "pink";
            break;
          case "mouseout":
            box1.style.backgroundColor = "yellowgreen";
            break;
        }
      }
    </script>
  </body>
</html>
```

## e.clientX\clientY\pageX\pageY

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
      body {
        height: 1000px;
      }
      #box1 {
        width: 200px;
        height: 200px;
        margin: 100px;
        margin-top: 500px;
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <div id="box1"></div>
    <script>
      // 获取元素
      var box1 = document.getElementById("box1");

      // 事件对象中有一些获取尺寸的属性
      box1.onclick = function(e) {
        // client系列： 客户端尺寸，点击的点参考浏览器窗口左上角的距离
        console.log(e.clientX);
        console.log(e.clientY);
        // page 系列：html 页面尺寸，点击的点参考html文档左上角的距离
        console.log(e.pageX);
        console.log(e.pageY);
      };
    </script>
  </body>
</html>
```

## 案例：图片跟随鼠标移动效果

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
      #pic {
        position: fixed;
      }
    </style>
  </head>
  <body>
    <img src="images/tianshi.gif" alt="" id="pic" />
    <script>
      // 通过 鼠标移动事件给 图片添加 left 和 top 的值
      // 获取元素
      var pic = document.getElementById("pic");
      // 给整个文档添加鼠标移动事件
      document.onmousemove = function(e) {
        e = e || window.event;
        // 给元素的css 属性赋值
        pic.style.left = e.clientX + "px";
        pic.style.top = e.clientY + "px";
      };
    </script>
  </body>
</html>
```

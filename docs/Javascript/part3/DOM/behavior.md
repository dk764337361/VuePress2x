# 取消默认行为和阻止冒泡

- 取消默认行为和阻止事件传播的方式
  - e.preventDefault() 取消默认行为
  - e.returnValue 取消默认行为，低版本浏览器使用
  - e.stopPropagation(); 阻止冒泡，标准方式
  - e.cancelBubble = true; 阻止冒泡，IE 低版本，标准中已废弃

## 取消默认行为

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <a id="link" href="52_图片跟随鼠标移动效果.html">点击</a>
    <script>
      var link = document.getElementById("link");
      link.onclick = function(e) {
        e = e || window.event;
        alert("hello");
        // 1.普通的方式阻止默认行为
        // return false;

        // 2.DOM 的方法
        // e.preventDefault();
        // 低版本浏览器需要使用一个对象的属性
        e.returnValue = false;
      };
    </script>
  </body>
</html>
```

## 阻止冒泡

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      #box1 {
        width: 300px;
        height: 300px;
        background-color: red;
      }

      #box2 {
        width: 200px;
        height: 200px;
        background-color: green;
      }

      #box3 {
        width: 100px;
        height: 100px;
        background-color: blue;
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
      // 事件冒泡
      var box1 = document.getElementById("box1");
      var box2 = document.getElementById("box2");
      var box3 = document.getElementById("box3");

      var array = [box1, box2, box3];

      for (var i = 0; i < array.length; i++) {
        var box = array[i];
        box.onclick = function(e) {
          e = e || window.event;
          console.log(this.id);
          // 阻止事件冒泡
          // e.stopPropagation();
          // 低版本浏览器使用 属性
          e.cancelBubble = true;
        };
      }
    </script>
  </body>
</html>
```

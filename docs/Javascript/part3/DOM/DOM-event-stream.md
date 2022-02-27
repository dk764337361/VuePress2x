# DOM 事件流

## 什么是 DOM 事件流？

<img src="/images/Javascript/DOM-event-stream.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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

      // 添加点击事件
      // addEventListener 有第三个参数，用来决定事件流的方向
      // 参数值是 布尔类型的值，false 表示事件冒泡过程，true 表示事件捕获过程
      // 参数默认值是 false
      box1.addEventListener(
        "click",
        function() {
          console.log(1);
        },
        false
      );
      box2.addEventListener(
        "click",
        function() {
          console.log(2);
        },
        false
      );
      box3.addEventListener(
        "click",
        function() {
          console.log(3);
        },
        false
      );
      box1.addEventListener(
        "click",
        function() {
          console.log(this.id);
        },
        true
      );
      box2.addEventListener(
        "click",
        function() {
          console.log(this.id);
        },
        true
      );
      box3.addEventListener(
        "click",
        function() {
          console.log(this.id);
        },
        true
      );
    </script>
  </body>
</html>
```

## 事件流的三个阶段

### 第一个阶段：事件捕获
### 第二个阶段：事件执行过程
### 第三个阶段：事件冒泡

  - addEventListener() 第三个参数为 false 时，事件冒泡
  - addEventListener() 第三个参数为 true 时，事件捕获
  - onclick 类型：只能进行事件冒泡过程，没有捕获阶段
  - attachEvent() 方法：只能进行事件冒泡过程，没有捕获阶段

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

        // 添加点击事件
        // addEventListener 有第三个参数，用来决定事件流的方向
        // 参数值是 布尔类型的值，false 表示事件冒泡过程，true 表示事件捕获过程
        // 参数默认值是 false

        // box1.addEventListener("click",function () {
        //     console.log(1);
        // },false);
        // box2.addEventListener("click",function () {
        //     console.log(2);
        // },false);
        // box3.addEventListener("click",function () {
        //     console.log(3);
        // },false);
        // box1.addEventListener("click",function () {
        //     console.log(this.id);
        // },true);
        // box2.addEventListener("click",function () {
        //     console.log(this.id);
        // },true);
        // box3.addEventListener("click",function () {
        //     console.log(this.id);
        // },true);

        // onclick 属性添加事件方法只有冒泡过程，没有捕获过程
        // attachEvent() 方法添加事件方法只有冒泡过程，没有捕获过程
        // box1.onclick = function () {
        //     console.log(1);
        // };
        // box2.onclick = function () {
        //     console.log(2);
        // };
        // box3.onclick = function () {
        //     console.log(3);
        // };

        box1.attachEvent("onclick", function() {
          console.log("解绑box1:");
          //解绑box1:
        });
        box2.attachEvent("onclick", function() {
          console.log("解绑box2:");
          //解绑box2:
          //解绑box1:
        });
        box3.attachEvent("onclick", function() {
          console.log("解绑box3:");
          //解绑box3:
          //解绑box2:
          //解绑box1:
        });
      </script>
    </body>
  </html>
  ```

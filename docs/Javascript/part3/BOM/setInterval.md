# window.setInterval 定时器

- 定时器是 window 对象的一个方法，相当于定时闹钟，每隔固定的时间响一次
- 语法：window.setInterval(func,interval);

  - 第一个参数：每次执行的函数，可以是匿名函数定义，或者是一个函数名的引用，注意不要加 () 。
  - 第二个参数：时间间隔，以毫秒计数，1000 毫秒等于 1 秒。
  - 功能：每隔一个指定的时间，周期性的执行一个函数。

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <script>
        var i = 1;
        // 定时器也是异步语句
        // 开启定时器：每隔 0.5 秒输出一次 i，并且让 i 每次自加
        // 程序执行到定时器代码部分就相当于开启了一个定时器，不需要进行其他的打开操作
        // 第一次执行函数时是在第一个时间间隔之后
        window.setInterval(function() {
          console.log(i++);
        }, 500);
      </script>
    </body>
  </html>
  ```

  ## 应用:简单运动

- 提高运动速度的方法
  - 1、缩短时间间隔，增加了每秒移动的次数。
  - 2、加大步长，让每一次走的步长增加。

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
        .box {
          position: absolute;
          top: 100px;
          left: 0;
          width: 100px;
          height: 100px;
          background-color: skyblue;
        }
      </style>
    </head>
    <body>
      <input type="button" value="开始" id="start" />
      <div class="box" id="box"></div>
      <script>
        // 简单运动
        // 获取元素
        var start = document.getElementById("start");
        var box = document.getElementById("box");
        // 点击开始按钮，让 box 向右运动
        // 全局变量存储 left 的属性值，会每次发生变化
        // 信号量,初始值必须与属性初始值保持一致
        var nowLeft = 0;
        // 定时器，制作运动过程
        start.onclick = function() {
          setInterval(function() {
            // 信号量进行自加
            nowLeft += 5;
            // 将最新的 nowLeft 的值赋值给元素的 css 属性
            box.style.left = nowLeft + "px";
          }, 100);
        };
      </script>
    </body>
  </html>
  ```

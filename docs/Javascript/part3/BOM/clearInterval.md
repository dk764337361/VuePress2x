# window.clearInterval 清除定时器

- window 对象的一个方法
- 语法：window.clearInterval(timer);
  - 参数：指定的定时器变量名引用。
  - 功能：清除指定的定时器。

::: warning 注意
清除的定时器需要存储到一个变量中，便于后期清除调用。
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
    <script>
      var i = 1;
      // 定时器也是异步语句
      // 要想清除定时器，在定义的时候必须存到一个变量中
      var timer = setInterval(function() {
        console.log(i++);
      }, 500);
      // 清除定时器
      window.clearInterval(timer);
    </script>
  </body>
</html>
```

## 清除定时器的问题

## 问题 1

- 将定时器的开始和停止过程书写在不同的事件函数内部，容易出现用户错误点击情况
  - 1、多次点击开始，会造成加速
  - 2、多次点击开始，不能够再停止

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
    <input type="button" value="结束" id="end" />
    <div class="box" id="box"></div>
    <script>
      // 简单运动
      // 获取元素
      var start = document.getElementById("start");
      var end = document.getElementById("end");
      var box = document.getElementById("box");
      // 信号量
      var nowLeft = 0;
      // 全局定义一个变量存储定时器
      var timer;
      // 定时器
      start.onclick = function() {
        timer = setInterval(function() {
          // 信号量进行自加
          nowLeft += 5;
          // 将最新的 nowLeft 的值赋值给元素的 css 属性
          box.style.left = nowLeft + "px";
        }, 100);
      };
      // 清除定时器
      end.onclick = function() {
        clearInterval(timer);
      };
    </script>
  </body>
</html>
```

### 解决方法：设表先关

- 每次开启新定时器之前，都清除一次前面的定时器

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
    <input type="button" value="结束" id="end" />
    <div class="box" id="box"></div>
    <script>
      // 简单运动
      // 获取元素
      var start = document.getElementById("start");
      var end = document.getElementById("end");
      var box = document.getElementById("box");
      // 信号量
      var nowLeft = 0;
      // 全局定义一个变量存储定时器
      var timer;
      // 定时器
      // 定时器写在事件函数内部，会由于事件多次被触发，导致定时器累积
      // 解决方法：设表先关，每次重新开启一个定时器之前都先关闭一下之前的定时器
      start.onclick = function() {
        // 先清除定时器
        clearInterval(timer);
        timer = setInterval(function() {
          // 信号量进行自加
          nowLeft += 5;
          // 将最新的 nowLeft 的值赋值给元素的 css 属性
          box.style.left = nowLeft + "px";
        }, 100);
      };
      // 清除定时器
      end.onclick = function() {
        clearInterval(timer);
      };
    </script>
  </body>
</html>
```

## 问题 2

- 需求：要求元素走到指定位置停止，例如让元素停止在 500px 的位置.
- 问题：如果步长设置的不合理，停止的位置可能不是正好在 500 处。

### 解决方法：拉钟停表

- 在定时器内部每次都要判断是否走到了终点，要不要停止定时器
- 如果走到或超过了终点，强行拉到重点，并停止定时器

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
    <input type="button" value="结束" id="end" />
    <div class="box" id="box"></div>
    <script>
      // 简单运动
      // 获取元素
      var start = document.getElementById("start");
      var end = document.getElementById("end");
      var box = document.getElementById("box");
      // 信号量
      var nowLeft = 0;
      // 全局定义一个变量存储定时器
      var timer;
      // 定时器
      // 定时器写在事件函数内部，会由于事件多次被触发，导致定时器累积
      // 解决方法：设表先关，每次重新开启一个定时器之前都先关闭一下之前的定时器
      start.onclick = function() {
        // 先清除定时器
        clearInterval(timer);
        timer = setInterval(function() {
          // 信号量进行自加
          nowLeft += 5;
          // 将最新的 nowLeft 的值赋值给元素的 css 属性
          box.style.left = nowLeft + "px";
        }, 100);
      };
      // 清除定时器
      end.onclick = function() {
        clearInterval(timer);
      };
    </script>
  </body>
</html>
```

## 问题 3
- 需求：在规定时间内让元素走到规定的结束位置，时间间隔可以更改
  - 例如：让元素在 2 秒钟内，left 属性从 0 走到 500px.

### 解决方法：步标整除

- 总距离 = 步长 * 次数；
- 时间间隔自定义，总时长固定
- 求出总次数 = 总时间 / 时间间隔
- 定义计数器变量，每执行一次定时器函数增加计数 1，直到执行达到总次数，停止定时器

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .box {
      position: absolute;
      top: 100px;
      left: 200px;
      width: 100px;
      height: 100px;
      background-color: skyblue;
    }
  </style>
</head>
<body>
  <input type="button" value="开始" id="start">
  <div class="box" id="box"></div>
  <script>
    // 简单运动
    // 获取元素
    var start = document.getElementById("start");
    var box = document.getElementById("box");
    
    // 已知 开始位置、结束位置、总时长、时间间隔
    // 总距离 = 步长 * 总次数
    // 总距离 = 结束位置 - 起始位置  ，已知可以求出来
    // 总次数 = 总时长 / 时间间隔 ，已知可以求出来
    // 步长 = （结束位置 - 起始位置） / （总时长 / 时间间隔）
    // 信号量 ,也相当于初始值
    var nowLeft = 200;
    // 结束位置
    var endLeft = 500;
    // 总时长
    var time = 1000;
    // 时间间隔
    var interval = 50;
    // 运算总次数
    var maxcount = time / interval;
    // 运算出每一次的步长
    var step = (endLeft - nowLeft) / maxcount;
    // console.log(step);
    // 定义一个次数的累加器
    var count = 0;
    // 准备条件结束可以开始定时器了
    var timer;
    start.onclick = function () {
      timer = setInterval(function () {
        // 让元素的属性每一次变化一个步长
        nowLeft += step;
        // 每运动一次让次数累加器加 1
        count++;
        // 停止定时器
        if (count >= maxcount) {
          // 拉终停表
          nowLeft = endLeft;
          clearInterval(timer);
        }
        // 给属性赋值
        box.style.left = nowLeft + "px";
      },interval);
    };
  </script>
</body>
</html>
```
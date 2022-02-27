# window.setTimeout延时器

- 延时器是 window 对象的一个方法，类似于定时炸弹
- 语法：window.setTimeout(func,time);
  - 第一个参数：延时执行的函数，可以是匿名函数定义，或者是一个函数名的引用，注意不要加 () 。
  - 第二个参数：延时的时间，以毫秒计数，1000 毫秒等于 1 秒。
  - 功能：在指定的时间后，延迟执行一个函数。



## 应用：函数节流操作

- 功能要求：在两秒后才能点击按钮在控制台打印数据。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" id="btn" value="点击按钮" />
    <script>
      // 点击输出 随机数
      var btn = document.getElementById("btn");
      // 绑定事件
      // 函数节流操作
      // 定义一个开关，给函数上一把锁，true 表示锁住状态，不能执行后面的代码，false 表示打开状态，可以执行后面的代码
      // 初始状态锁是打开的
      var lock = false;
      btn.onclick = function() {
        // 函数内部需要判断，是否在指定的时间之外触发事件
        // 如果锁是打开的，可以往后执行，
        // 如果锁是锁住的，不能执行后面的代码
        if (lock) {
          return;
        }
        console.log(Math.random());
        // 执行完毕后，锁应该被锁住
        lock = true;
        // 隔 2秒 后，锁再次打开
        setTimeout(function() {
          lock = false;
        }, 2000);
      };
    </script>
  </body>
</html>
```

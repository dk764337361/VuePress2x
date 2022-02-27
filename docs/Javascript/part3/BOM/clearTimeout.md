# windows.clearTimeout清除延时器

- window 对象的一个方法
- 语法：window.clearTimeout(timeout);
  - 参数：指定的延时器变量名引用。
  - 功能：清除指定的延时器。

::: warning 注意
清除的延时器需要存储到一个变量中，便于后期清除调用。
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
      // javasscript是单线程（从头往下执行）
      // 延时器是异步语句（从下往上执行）
      // 延时器为了保证后期能够被清除，需要定义赋值给一个变量
      var timeout = window.setTimeout(function() {
        console.log("boom");
      }, 2000);
      // 同步语句（从头往下执行）
      console.log(1);
      console.log(2);
      console.log(3);
      console.log(4);

      // 清除延时器
      window.clearTimeout(timeout);
    </script>
  </body>
</html>
```
# XMLHttpRequest 2.0

HTML5 中对 XMLHttpRequest 类型全面升级，更易用，更强大.

## onload / onprogress

- xhr.onload 事件：只在请求完成时触发
- xhr.onprogress 事件：只在请求进行中触发

::: tip 提示
这两条属性本质是对原生 xhr.readyState 的拆分，让其更易用
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:3000/posts");
      xhr.onload = function() {
        console.log("load", this.readyState);
      };
      xhr.onprogress = function(e) {
        console.log("progress", this.readyState);
        // 在周期性请求过程中，接收到的数据的个数
        console.log(e);
        console.log(e.loaded); // 接收数据的数量
        console.log(e.total); // 接收数据的总个数
      };
      xhr.send(null);
    </script>
  </head>

  <body></body>
</html>
```

## response 属性

- 以对象的形式表述响应体，其类型取决于 responseType 的值。你可以尝试设置 responseType 的值，以便通过特定的类型请求数据。
- responseType 要在调用 open() 初始化请求之后，在调用 send() 发送请求到服务器之前设置方可生效。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:3000/posts");
      xhr.responseType = "json";
      xhr.onload = function() {
//XHR1.0的responseText返回的数据是字符串类型，而XHR2.0的response返回的是对象格式，省去了转换的麻烦。
        console.log(this.response);
      };
      xhr.send(null);
    </script>
  </head>

  <body></body>
</html>
```

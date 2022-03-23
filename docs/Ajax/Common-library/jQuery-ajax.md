# JQ 内置的AJAX请求方法

## \$.ajax()

- 常用选项参数介绍：
- url：请求地址
- type：请求方法，默认为 `get`
- dataType：服务端响应数据类型
- contentType：请求体内容类型，默认 `application/x-www-form-urlencoded`
- data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递
- timeout：请求超时时间
- beforeSend：请求发起之前触发
- success：请求成功之后触发（响应状态码 200）
- error：请求失败触发
- complete：请求完成触发（不管成功与否）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // $.ajax()
      // 参数是一个 配置的对象
      console.log($.ajax());
      $.ajax({
        url: "http://localhost:3000/posts",
        type: "get",
        dataType: "json",
        data: { id: 2 },
        beforeSend: function(xhr) {
          console.log("before send");
          console.log(xhr);
        },
        success: function(data) {
          console.log(data);
        },
        // error: function (xhr) {
        //   console.log(xhr);
        // },
        // complete: function (xhr) {
        //   console.log(xhr);
        // }
      });
    </script>
  </head>
  <body></body>
</html>
```

## \$.get() 查询

- GET 请求快捷方法
  - \$.get(url, data, callback)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 发送 get 请求
      // $.ajax({
      //   url: "http://localhost:3000/comments",
      //   type: "get",
      //   dataType: "json",
      //   data: {"id": 2},
      //   success: function (data) {
      //     console.log(data);
      //   }
      // })

      // 化简后的方法直接发送 get 请求
      $.get("http://localhost:3000/comments", { id: 1 }, function(data) {
        console.log(data);
      });
    </script>
  </head>
  <body></body>
</html>
```

## \$.post()添加

- POST 请求快捷方法
  - \$.post(url, data, callback)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 发送 post 请求
      // $.ajax({
      //   url: "http://localhost:3000/comments",
      //   type: "post",
      //   dataType: "json",
      //   data: {"postId": 2, "content": "bad"},
      //   success: function (data) {
      //     console.log(data);
      //   }
      // })

      // $.post() 快捷方法发送请求
      $.post(
        "http://localhost:3000/comments",
        { postId: 3, content: "bad" },
        function(data) {
          console.log(data);
        }
      );
    </script>
  </head>
  <body></body>
</html>
```

## put 更改和 delete 删除

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // put 请求，更改数据
      // $.ajax({
      //   url: "http://localhost:3000/comments/4",  //请求ID为4的数据
      //   type: "put",
      //   dataType: "json",
      //   data: {"content": "good", "postId": 2},
      //   success: function (data) {
      //     console.log(data)
      //   }
      // })

      // delete 请求，删除数据
      $.ajax({
        url: "http://localhost:3000/comments/5", ////请求ID为5的数据
        type: "delete",
        success: function(data) {
          console.log(data); //删除数据后，返回空对象
        },
      });
    </script>
  </head>
  <body></body>
</html>
```

## 其他方法

### \$.ajaxSetup()

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // ajaxSetup() 方法，设置默认的参数
      $.ajaxSetup({
        url: "http://localhost:3000/users",
        type: "post",
      });
      // 发送 ajax请求
      $.ajax({
        data: { name: "polly", age: 17, class: 4 },
      });
      $.ajax({
        data: { name: "james", age: 18, class: 4 },
      });
    </script>
  </head>
  <body></body>
</html>
```

::: tip 提示
更多 Ajax 方法请查询手册
:::

# 原生 AJAX 具体用法

- dbs.json

```json
{
  "users": [
    {
      "id": 1,
      "name": "tom",
      "age": 19,
      "class": 1
    },
    {
      "id": 2,
      "name": "jerry",
      "age": 18,
      "class": 2
    },
    {
      "id": 3,
      "name": "lucy",
      "age": 19,
      "class": 1
    },
    {
      "name": "lily",
      "age": "19",
      "class": "2",
      "id": 4
    },
    {
      "name": "lulu",
      "age": 18,
      "class": 2,
      "id": 5
    },
    {
      "name": "harry",
      "age": 18,
      "class": 1,
      "id": 6
    },
    {
      "name": "john",
      "age": "19",
      "class": "2",
      "id": 7
    }
  ],
  "posts": [
    {
      "id": 1,
      "userId": 1,
      "title": "javascript",
      "content": "js 是一门非常好学语言"
    },
    {
      "id": 2,
      "userId": 1,
      "title": "jquery",
      "content": "jq 是一门非常好学语言"
    },
    {
      "id": 3,
      "userId": 2,
      "title": "html",
      "content": "html 是一门非常好学语言"
    },
    {
      "id": 4,
      "userId": 3,
      "title": "css",
      "content": "css 是一门非常好学语言"
    }
  ],
  "comments": [
    {
      "id": 1,
      "postId": 1,
      "content": "good"
    },
    {
      "id": 2,
      "postId": 3,
      "content": "better"
    },
    {
      "id": 3,
      "postId": 4,
      "content": "best"
    }
  ]
}
```

## GET 请求

- 通常在一次 GET 请求过程中，参数传递都是通过 URL 地址中的 `?` 参数传递。
- 一般在 GET 请求中，无需设置请求头
- 无需设置响应体，可以传 null 或者干脆不传

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      var xhr = new XMLHttpRequest();
      // 发送 GET 请求
      xhr.open("GET", "http://localhost:3000/users?age=19");
      xhr.send(null);
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      };
    </script>
  </head>
  <body></body>
</html>
```

## POST 请求

- POST 请求过程中，都是采用请求体承载需要提交的数据。
- 需要设置请求头中的 Content-Type，以便于服务端接收数据
- 需要提交到服务端的数据可以通过 send 方法的参数传递

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      var xhr = new XMLHttpRequest();
      // post 请求
      xhr.open("POST", "http://localhost:3000/users");
      // 设置请求头
      // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xhr.setRequestHeader("Content-Type", "application/json");
      // xhr.send("name=lily&age=19&class=2");
      // xhr.send(`{
      //   "name": "lulu",
      //   "age": 18,
      //   "class": 2
      // }`);
      xhr.send(
        JSON.stringify({
          name: "harry",
          age: 18,
          class: 1,
        })
      );
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      };
    </script>
  </head>
  <body></body>
</html>
```

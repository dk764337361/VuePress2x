# Axios 库

[Axios官方网站](https://axios-http.com/docs/intro)

- 地址：https://unpkg.com/axios/dist/axios.min.js
- 使用 script 标签引入

## 体验

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script>
      // 体会 get 请求
      axios
        .get("http://localhost:3000/db")
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
        .get("http://localhost:3000/users")
        .then(function(response) {
          // console.log(response)
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    </script>
  </head>
  <body></body>
</html>
```

## config 常用配置项

- url 用于请求的服务器 URL，必需
- method 创建请求时使用的方法
- baseURL 传递相对 URL 前缀，将自动加在 url 前面
- headers 即将被发送的自定义请求头
- params 即将与请求一起发送的 URL 参数
- data 作为请求主体被发送的数据
- timeout 指定请求超时的毫秒数(0 表示无超时时间)
- responseType 表示服务器响应的数据类型，默认 “json”

## then 和 catch

```js
axios()
  .then(function(response) {
    // 正常请求的响应信息对象 response
  })
  .catch(function(error) {
    //捕获错误
  });
```

## Axios API

- 可以通过向 axios() 传递相关配置来创建请求

### axios(url, config) config 可选

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      // axios 方法
      //默认使用get方法，其他方法为默认
      axios("http://localhost:3000/posts", {
        params: {
          id: 1,
        },
      })
        .then(function(res) {
          console.log(res.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    </script>
  </head>

  <body></body>
</html>
```

### axios(config) config 为对象格式的配置选项

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      // axios 方法
      axios({
        url: "/comments",
        method: "post",
        baseURL: "http://localhost:3000",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 1000,
        data: {
          postId: 3,
          content: "better",
        },
      })
        .then(function(res) {
          console.log(res.data);
        })
        .catch(function(error) {
          console.log(error);
        });
      // axios({
      //   url: "/comments",
      //   method: "get",
      //   baseURL: "http://localhost:3000",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   params:{
      //     id:1
      //   },
      // }).then(function (res) {
      //   console.log(res.data)
      // }).catch(function (error) {
      //   console.log(error)
      // })
    </script>
  </head>
  <body></body>
</html>
```

## 全局配置默认值

- 可以指定将被用在各个请求的配置默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';……
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      // 全局配置默认值
      axios.defaults.baseURL = "http://localhost:3000";
      // axios 方法
      axios({
        url: "/comments",
        method: "get",
      })
        .then(function(res) {
          console.log(res.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    </script>
  </head>
  <body></body>
</html>
```

## 拦截器

- 在请求或响应被 then 或 catch 处理前拦截它们。

<img src="/images/Ajax/05.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      // 使用拦截器，对请求进行拦截处理
      axios.interceptors.request.use(function(config) {
        config.params = {
          id: 2,
        };
        config.baseURL = "http://localhost:3000";
        return config;
      });
      // 对响应进行拦截
      axios.interceptors.response.use(function(response) {
        return response.data;
      });
      // axios 方法
      axios("/posts")
        .then(function(res) {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios("/comments")
        .then(function(res) {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    </script>
  </head>
  <body></body>
</html>
```

## 快速请求方法

### axios.get(url[, config])

### axios.post(url[, data[, config]])

### axios.delete(url[, config])

### axios.put(url[, data[, config]])


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    // get 请求
    // axios.get("http://localhost:3000/users?id=2")
    //   .then(function (res) {
    //     console.log(res.data)
    //   })
    // axios.get("http://localhost:3000/users",{
    //   params: {
    //     id: 3
    //   }
    // })
    //   .then(function (res) {
    //     console.log(res.data)
    //   })

    // post 请求 ，添加数据
    axios.post("http://localhost:3000/users",{
      "name": "nancy",
      "age": 19,
      "class": 2
    })
    .then(function (res) {
      console.log(res.data)
    })
    
  </script>
</head>
<body>
</body>
</html>
```
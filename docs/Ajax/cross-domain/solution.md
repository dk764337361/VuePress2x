# 跨域解决方案

## 方法一：JSONP

### JSONP 原理

- JSON with Padding，是一种借助于 script 标签发送跨域请求的技巧。
- 原理就是在客户端借助 script 标签请求服务端的一个地址
- 地址返回一段带有某个全局函数调用的 JavaScript 脚本
- 在调用函数中，原本需要返回给客户端的数据通过参数传递给这个函数
- 这样客户端的函数中就可以通过参数得到原本服务端想要返回的数据

### 演示服务端

<img src="/images/Ajax/07.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 演示客户端

<img src="/images/Ajax/08.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 演示响应结果

<img src="/images/Ajax/09.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 演示控制台结果

<img src="/images/Ajax/10.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### JSONP 注意事项

- JSONP 只能发送 GET 请求

- JSONP 用的是 script 标签，与 AJAX 提供的 XMLHttpRequest 没有任何关系


### jQuery 中对 JSONP 的支持

- jQuery基本使用 $.ajax(）
- jQuery 中使用 JSONP 就是将 dataType 设置为 jsonp

::: warning 注意
Axios没有对JSONP进行支持，建议使用JQ封装好的JSONP
:::

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>  
</head>
<body>
  <input type="button" value="请求" class="btn">
  <script src="js/jquery-1.12.4.min.js"></script>
  <script>
    $(".btn").click(function () {
      // 发送跨域的 ajax 请求
      $.ajax({
        url: "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web",
        type: "GET",
        dataType: "jsonp",
        jsonp: "cb",    //这条属性可以设置回调函数的参数名称（必须与后台接口的回调函数参数名保持一致）
        jsonpCallback: "abc", //jQ 自动分配的回调函数的名称进行重命名
        data: {"wd": "ajax"},
        success: function (data) {
          console.log(data)
        }
      })
    })
  </script>
</body>
</html>
```

<img src="/images/Ajax/11.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/Ajax/12.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


## 方法二：CORS

### cors 跨域
- Cross Origin Resource Share，跨域资源共享
- 这种方案无需客户端作出任何变化（客户端不用改代码），只是在被请求的服务端响应的时候添加一个 Access-Control-Allow-Origin 的响应头，表示这个资源是否允许指定域请求。
- Access-Control-Allow-Origin 的值：
  - `*` 表示允许任意源访问，不安全
  - `http://foo.com` 允许指定的源访问

### 服务端演示

<img src="/images/Ajax/13.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

# 原生 Ajax 详解-XHR 对象

## XMLHttpRequest 类型对象

AJAX API 中核心提供的是一个 XMLHttpRequest 类型，所有的 AJAX 操作都需要使用到这个类型。

### 兼容 IE6 写法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 1.创建一个 XMLHttpRequest 类型的对象
      var xhr = null;
      // 兼容写法
      if (window.XMLHttpRequest) {
        // 标准浏览器
        xhr = new XMLHttpRequest();
      } else {
        // IE 6 浏览器
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
    </script>
  </head>
  <body></body>
</html>
```

### xhr.open() 方法开启请求

- 本质上 XMLHttpRequest 就是 JavaScript 在 Web 平台中发送 HTTP 请求的手段，所以我们发送出去的请求仍然是 HTTP 请求，同样符合 HTTP 约定的格式。
- 语法：xhr.open(method, url)
- method：要使用的 HTTP 方法，比如
  - 「GET」获取
  - 「POST」提交
  - 「PUT」更改
  - 「DELETE」删除
  - ......
- url：要向其发送请求的 URL 地址，字符串格式。

```html{19-24}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 1.创建一个 XMLHttpRequest 类型的对象
      var xhr = null;
      // 兼容写法
      if (window.XMLHttpRequest) {
        // 标准浏览器
        xhr = new XMLHttpRequest();
      } else {
        // IE 6 浏览器
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      // 2.open() 方法开启请求
      // xhr.open("GET","https://jsonplaceholder.typicode.com/users?id=1");
      xhr.open("POST", "https://jsonplaceholder.typicode.com/users");
      // 设置请求头
      // 一般 get 方法不需要设置"请求头"，而 post 方法必须设置"请求头"
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      // 3.send() 方法发送一次请求
      // 如果是 get 方法请求，不需要再 send 中传参数，它如果想传参数，直接写在网址上
      // xhr.send(null);
      xhr.send("name=harry&age=19");

      xhr.onreadystatechange = function() {
        // 通过判断 xhr 的 readyState ，确定此次请求是否完成
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      };
    </script>
  </head>
  <body></body>
</html>
```

### xhr.send()方法和请求头

#### setRequestHeader() 方法设置请求头

- 此方法必须在 open() 方法和 send() 之间调用。
- 语法：xhr.setRequestHeader(header, value);
- header: 一般设置 “Content-Type” ，传输数据类型，即服务器需要我们传送的数据类型
- value: 具体的数据类型，常用 "application/x-www-form-urlencoded" 和"application/json"。

### xhr.readyState 响应状态属性

- readyState 属性返回一个 XMLHttpRequest 代理当前所处的状态，由于 readystatechange 事件是在 xhr 对象状态变化时发（不单是在得到响应时），也就意味着这个事件会被触发多次，所以我们有必要了解每一个状态值代表的含义：

| readyState | 状态描述     | 说明                                                |
| ---------- | ---------------- | ----------------------------------------------------- |
| 0          | UNSENT           | 代理 XHR 被创建，但尚未调用 open() 方法  |
| 1          | OPENED           | open() 方法已经被调用，建立了连接。     |
| 2          | HEADERS_RECEIVED | send() 方法已经被调用，并且已经可以获取状态行和响应头 |
| 3          | LOADING          | 响应体下载中， responseText 属性可能已经包含部分数据 |
| 4          | DONE             | 响应体下载完成，可以直接使用 responseText |

<img src="/images/Ajax/03.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 事件处理函数
-  一般我们都是在 readyState 值为 4 时，执行响应的后续逻辑。
```js
xhr.onreadystatechange = function() {
if (this.readyState === 4) {
// 后续逻辑......
}
};
```

```html{18,21,25-35}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 1.创建一个 XMLHttpRequest 类型的对象
      var xhr = null;
      // 兼容写法
      if (window.XMLHttpRequest) {
        // 标准浏览器
        xhr = new XMLHttpRequest();
      } else {
        // IE 6 浏览器
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      console.log("UNSENT", xhr.readyState);//0
      // 2.open() 方法开启请求
      xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
      console.log("OPENED", xhr.readyState);//1
      // 3.send() 方法发送一次请求
      xhr.send("name=harry&age=19");
      // 4.指定回调函数，处理得到的数据
      xhr.onreadystatechange = function() {
        // 通过判断 xhr 的 readyState ，确定此次请求是否完成
        if (this.readyState === 2) {
          console.log("headers received", xhr.readyState);//2
        } else if (this.readyState === 3) {
          console.log("loading", xhr.readyState);//3
          console.log(xhr.responseText);
        } else if (this.readyState === 4) {
          console.log("done", xhr.readyState);//4
          console.log(xhr.responseText);
        }
      };
    </script>
  </head>
  <body></body>
</html>
```

### 同步与异步

现实场景理解：
- 同步：一个人在同一个时刻只能做一件事情，在执行一些耗时的操作（不需要看管）不去做别的事，只是等待
- 异步：在执行一些耗时的操作（不需要看管）去做别的事，而不是等待

#### Ajax 中的实现
- xhr.open() 方法第三个参数要求传入的是一个 boolean 值，其作用就是设置此次请求是否采用异步方式执行
  - 默认为 true 异步，如果需要同步执行可以通过传递 false 实现
  - 如果采用同步方式执行，则代码会卡死在 xhr.send() 这一步

::: tip 建议
- 为了让这个事件可以更加可靠（一定触发），在发送请求 send() 之前，一定是先注册readystatechange
- 不论是同步或异步都能触发成功
- 了解同步模式即可，切记不要使用同步模式
:::


```html{19-28}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script>
    // 1.创建一个 XMLHttpRequest 类型的对象 
    var xhr = null;
    // 兼容写法
    if (window.XMLHttpRequest) {
      // 标准浏览器
      xhr = new XMLHttpRequest();
    } else {
      // IE 6 浏览器
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 2.打开一个与网址之间的连接 
    // 设置同步或异步
    xhr.open("GET","https://jsonplaceholder.typicode.com/users",true);
    // xhr.open("GET","https://jsonplaceholder.typicode.com/users",false);
    // 如果设置了同步加载，程序会卡在 send 部分
    xhr.onreadystatechange = function () {
      // 通过判断 xhr 的 readyState ，确定此次请求是否完成
      if (this.readyState === 4) {
        console.log("请求成功")
      }
    }
    // 3.通过连接发送一次请求
    xhr.send(null);
    // 4.指定 xhr 状态变化事件处理函数 
    
    // Ajax 后面的代码
    console.log("After Ajax");
  </script>
</head>
<body>
  
</body>
</html>
```



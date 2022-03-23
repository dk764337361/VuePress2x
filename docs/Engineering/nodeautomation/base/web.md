# 网站概述

## 网站的组成

从开发者的角度来看，web 应用主要由三部分组成：用户界面，业务逻辑，数据。

1. 用户界面 (视图层)：用于将数据展示给用户的地方，采用 HTML，CSS，JavaScript 编写。

2) 业务逻辑 (控制层)：实现业务需求和控制业务流程的地方，可以采用 Java, PHP, Python, JavaScript 编写。

3. 数据 (模型层)：应用的核心部分, 应用业务逻辑的实现，用户界面的展示都是基于数据的， web 应用中的数据通常是存储在数据库中的，数据库可以采用 MySql, Mongodb 等。

```js
const fs = require("fs");
function readFile(fileName, callback) {
  if (typeof fileName !== "string") {
    return process.nextTick(
      callback,
      new TypeError("filename 必须是字符串类型")
    );
  }
  fs.readFile(fileName, (err, data) => {
    if (err) return callback(err);
    return callback(null, data);
  });
}
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
  console.log("ok");
}
console.log("start");
sleep(2000);
console.log("end");
console.log("start");
setImmediate(sleep, 2000);
console.log("end");
```

## 什么是 web 服务器

服务器是指能够向外部(局域网或者万维网)提供服务的机器(计算机)就是服务器。

在硬件层面，web 服务器就是能够向外部提供网站访问服务的计算机。

在这台计算机中存储了网站运行所必须的代码文件和资源文件。

在软件层面，web 服务器控制着用户如何访问网站中的资源文件，控制着用户如何与网站进行交互。

## 客户端

web 应用中的客户端是指用户界面的载体，实际上就是浏览器。

用户可以通过浏览器这个客户端访问网站应用的界面，通过用户界面与网站应用进行交互。

## 网站的运行

web 应用是基于请求和响应模型的。
<img src="/images/nodeautomation/37.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/38.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## IP 和域名

Internet Protocol address：互联网协议地址，标识网络中设备的地址，具有唯一性。例如:45.113.192.101
<img src="/images/nodeautomation/39.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

域名 (Domain Name)：是由一串用点分隔的字符组成的互联网上某一台计算机或计算机组的名称，用于在数据传输时标识计算机的电子方位 (摘自维基百科)。

```sh
ping www.baidu.com
```

## DNS 服务器

Domain Name Server：域名服务器，互联网域名解析系统，它可以将"人类可识别"的标识符映射为系统内部通常为数字形式的标识码。(摘自维基百科)
<img src="/images/nodeautomation/40.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/41.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 端口

是设备与外界通讯交流的出口，此处特指计算机中的虚拟端口。0 ~ 65535

比如在一座大厦当中有很多房间，每间房间都提供着不同的服务，我们可以通过房间号找到提供不同服务的房间。

服务器就是这座大厦，在服务器中可以提供很多服务，比如 web 访问服务，邮件的收发服务，文件的上传下载服务，用户在找到服务器以后如何去找具体的服务呢？答案就是端口号，端口号就是大厦中的房间号，在服务器中通过端口号区分不同的服务。

也就是说，服务器中的各种应用，要想向外界提供服务，必须要占用一个端口号。

通常 web 应用占用 80 端口，在浏览器中访问应用时 80 可以省略，因为默认就访问 80。

## URL

URL：统一资源定位符，表示我们要访问的资源在哪以及要访问的资源是什么。

`protocol://hostname[:port]/path`

`http://www.example.com/index.html`

## 前台和后台, 前端与后端

前台和后台都是指用户界面。前台是为客户准备的，每个人都可以访问的用户界面。后台是为网站管理员准备的，只有登录以后才能访问的用户界面，用于管理网站应用中的数据。

前端是指开发客户端应用的程序员。

后端是指开发服务器端应用程序的程序员。

## 开发环境说明

在开发环境中，开发者机器既充当了客户端的角色又充当了服务器的角色。

```
本机 IP: 127.0.0.1
本机域名: localhost
```

## 创建 web server

1. 创建软件层面的 web 服务器，用于控制资源要如何被访问。
<img src="/images/nodeautomation/42.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

在浏览器输入:

`localhost:3000`

`localhost:3000/api/course`
```js
const http = require("http");
// 创建 web server
const server = http.createServer(function(req, res) {
  // req 请求对象, 包含请求信息
  // res 响应对应, 用于对请求进行响应
  if (req.url === "/") {
    res.write("Hello Node.js");
    res.end();
  }
  if (req.url === "/api/course") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});
server.listen(3000);
console.log("web server is running...");
```

这种方法无法构建复杂的大型应用程序，因为在大型应用程序中会有各种各种的请求需要处理，我们不想将所有的 if 条件判断都写在 createServer 方法的回调函数中。
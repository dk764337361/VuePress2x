# location 对象

- location 对象是 window 对象下的一个属性，使用的时候可以省略 window 对象
- location 可以获取或者设置浏览器地址栏的 URL

## location 对象的成员

- 使用 chrome 的控制台查看
- 查 MDN：https://developer.mozilla.org/zh-CN/
- 成员：
  - `assign()` / `reload()` / `replace()`
  - hash / host/ hostname / search / `href`……

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <input type="button" value="跳转" id="btn">
  <script>
    var btn = document.getElementById("btn");
    btn.onclick = function () {
      // 输出URL地址
      // console.log(location.href);
      // 重新赋值，可以跳转到新页面，并且记录历史
      // location.href = "http://www.lagou.com";

      // assign 委派
      // assign() 方法的作用 与 href 属性一样，可以设置页面跳转的地址
      // location.assign("http://www.lagou.com");

      // replace 替换
      // 功能：替换掉地址栏中当前的网址，但是不记录历史
      // location.replace("http://www.lagou.com");

      // reload 重新加载
      // 类似 键盘中 f5 功能,类似于false效果， ctrl+f5 强制刷新，从服务器获取页面，相当于 true 的效果
      // 参数：true 强制从服务器获取页面，false 如果浏览器有缓存网页的话，会直接从缓存中获取页面
      location.reload(true);
    };
  </script>
</body>
</html>
```

## URL

- 统一资源定位符 (Uniform Resource Locator, URL)
- URL 的组成：scheme://host:port/path?query#fragment
- 例如：http://www.lagou.com:80/a/b/index.html?name=zs&age=18#bottom
- scheme:通信协议，常用的 http,ftp,maito 等
- host:主机，服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。
- port:端口号，整数，可选，省略时使用方案的默认端口，如 http 的默认端口为 80。
- path:路径，由零或多个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。
- query:查询，可选，用于给动态网页传递参数，可有多个参数，用'&'符号隔开，每个参数的名和值用'='符号隔开。例如：name=zs
- fragment:信息片断，字符串，锚点。

## history 对象

- history 对象是 window 对象下的一个属性，使用的时候可以省略 window 对象
- history 对象可以与浏览器历史记录进行交互，浏览器历史记录是对用户所访问的页面按时间顺序进行的记录和保存。
- back()
- forward()
- go()

<CodeGroup>
  <CodeGroupItem title="first.html" active>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>First</h1>
    <a href="second.html">跳转到二级页面</a><br />
    <input type="button" value="前进" id="btn" />
    <script>
      var btn = document.getElementById("btn");
      btn.onclick = function() {
        // 前进，查看之前记录的跳转后的页面
        // history.forward();
        history.go(1);
      };
    </script>
  </body>
</html>
```

  </CodeGroupItem>

  <CodeGroupItem title="second.html" >

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Second</h1>
    <input type="button" value="后退" id="btn" />
    <script>
      var btn = document.getElementById("btn");
      btn.onclick = function() {
        // 回退历史记录访问
        // history.back();
        history.go(-1);
      };
    </script>
  </body>
</html>
```

  </CodeGroupItem>
</CodeGroup>

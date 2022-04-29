# 前端路由

前端路由，指的是 URL 与内容间的映射关系（URL、内容、映射关系。）

## Hash 方式

### 1.通过 hashchange 事件监听 hash 变化，并进行网页内容更新。

<img src="/images/vue/231.jpg" style="width: 70%; display:inline-block; margin: 0 ;">
<img src="/images/vue/232.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>
      <a href="#/">首页</a>
      <a href="#/category">分类页</a>
      <a href="#/user">用户页</a>
    </div>
    <div id="container">
      这是首页功能
    </div>

    <script>
      var container = document.getElementById("container");

      window.onhashchange = function() {
        console.log(window.location.hash);
        // 获取 url 中的 hash
        var hash = location.hash.replace("#", "");
        console.log(hash);
        // 根据不同 hash 值，更改网页内容（功能）
        var str = "";
        switch (hash) {
          case "/":
            str = "这是首页的功能";
            break;
          case "/category":
            str = "这是分类的功能";
            break;
          case "/user":
            str = "这是用户的功能";
            break;
        }
        container.innerHTML = str;
      };
    </script>
  </body>
</html>
```

<img src="/images/vue/037.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 2.封装以备复用。

<img src="/images/vue/233.jpg" style="width: 70%; display:inline-block; margin: 0 ;">
<img src="/images/vue/234.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

### 3.特点总结：

- Hash 方式兼容性好。
- 地址中具有 #，不太美观。
- 前进后退功能较为繁琐。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>
      <a href="#/">首页</a>
      <a href="#/category">分类页</a>
      <a href="#/user">用户页</a>
    </div>
    <div id="container">
      这是首页功能
    </div>

    <script>
      // 准备对象，用于封装 hash 功能。
      var router = {
        // 路由存储位置： 保存了 url 与 内容处理函数的对应关系。
        routes: {},
        // 定义路由规则的方法
        route: function(path, callback) {
          this.routes[path] = callback;
        },
        // 初始化路由的方法
        init: function() {
          var that = this;
          window.onhashchange = function() {
            // 当 hash 改变，我们需要得到当前新的 hash
            var hash = location.hash.replace("#", "");
            // 根据 hash 触发 routes 中的对应 callback
            that.routes[hash] && that.routes[hash]();
          };
        },
      };

      var container = document.getElementById("container");
      // 定义路由规则
      router.route("/", function() {
        container.innerHTML = "这是首页功能";
      });
      router.route("/category", function() {
        container.innerHTML = "这是分类功能";
      });
      router.route("/user", function() {
        container.innerHTML = "这是用户功能";
      });

      // 初始化路由
      router.init();
    </script>
  </body>
</html>
```

## History 方式

- History 方式采用 HTML5 提供的新功能实现前端路由。
  <img src="/images/vue/235.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

### 1.在操作时需要通过 history.pushState() 变更 URL 并执行对应操

作。
<img src="/images/vue/236.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/237.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/238.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>
      <a href="/">首页</a>
      <a href="/category">分类</a>
      <a href="/user">用户</a>
    </div>
    <div id="container">这是首页功能</div>

    <script>
      var router = {
        // 存储路由的对象
        routes: {},
        // 定义路由的方法
        route(path, callback) {
          this.routes[path] = callback;
        },
        // 用于触发指定的路由操作
        go(path) {
          // 更改 url
          history.pushState(null, null, path);
          // 触发路由对应的回调函数
          this.routes[path] && this.routes[path]();
        },
      };

      // 设置 a 标签的功能
      var links = document.querySelectorAll("a");
      var container = document.querySelector("#container");

      // 阻止 a 标签的跳转
      links.forEach(function(ele) {
        ele.addEventListener("click", function(event) {
          //把获取到的href属性传给go方法
          router.go(this.getAttribute("href"));
          event.preventDefault();
        });
      });

      // 路由规则
      router.route("/", function() {
        container.innerHTML = "首页功能";
      });

      router.route("/category", function() {
        container.innerHTML = "分类功能";
      });

      router.route("/user", function() {
        container.innerHTML = "用户功能";
      });
    </script>
  </body>
</html>
```

### 2.前进后退功能，首先需要在更改 url 时保存路由标记。

<img src="/images/vue/239.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 3.通过 popstate 事件监听前进后退按钮操作，并检测 state。

<img src="/images/vue/240.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 4.调用初始化方法监听前进后退操作并处理。

<img src="/images/vue/241.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>
      <a href="/">首页</a>
      <a href="/category">分类</a>
      <a href="/user">用户</a>
    </div>
    <div id="container">
      这是首页功能
    </div>

    <script>
      var router = {
        // 存储路由的对象
        routes: {},
        // 定义路由的方法
        route(path, callback) {
          this.routes[path] = callback;
        },
        // 用于触发指定的路由操作
        go(path) {
          // 更改 url
          history.pushState({ path: path }, null, path);
          // 触发路由对应的回调函数
          this.routes[path] && this.routes[path]();
        },
        // 设置初始化方法，用来检测前进后退按钮的功能
        init() {
          var that = this;
          window.addEventListener("popstate", function(e) {
            console.log(e);
            var path = e.state ? e.state.path : "/";
            that.routes[path] && that.routes[path]();
          });
        },
      };

      router.init();

      // 设置 a 标签的功能
      var links = document.querySelectorAll("a");
      var container = document.querySelector("#container");

      links.forEach(function(ele) {
        ele.addEventListener("click", function(event) {
          router.go(this.getAttribute("href"));
          event.preventDefault();
        });
      });

      // 路由规则
      router.route("/", function() {
        container.innerHTML = "首页功能";
      });

      router.route("/category", function() {
        container.innerHTML = "分类功能";
      });

      router.route("/user", function() {
        container.innerHTML = "用户功能";
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/038.gif" style="width: 100%; display:inline-block; margin: 0 ;">


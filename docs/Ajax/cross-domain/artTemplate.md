# 模板引擎

## 模板引擎作用

- 减少字符串拼接
- 在模板里面解析 json，然后跟 html 内容拼接，性能会更好

## artTemplate 模板引擎介绍

- art-template 是一个简约、超快的模板引擎。
- 网址：https://github.com/aui/artTemplate
- 中文使用文档：https://aui.github.io/art-template/zh-cn/docs/
- 常用语法：
  - `<% 与 %>` 符号包裹起来的语句则为模板的逻辑表达式
  - `<%= content %>`为输出表达式
  - ......

## artTemplate 模板引擎使用步骤

### 使用步骤

1. 引入模板文件
2. 创建模板
3. 将数据跟模板进行绑定
4. 在模板里面编写代码解析数据
5. 绑定数据和模板之后得到内容
6. 将数据内容写到页面上面。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <!-- 1、引入模板的文件 -->
    <script src="js/template-native.js"></script>
    <!-- 2、创建模板 -->
    <script type="text/html" id="tem">
      <!-- 3、添加模板中的结构 -->
      <% for (var i = 0 ; i < 5 ; i++) { %>
        <div>这是一个模板中的 div<%= i %></div>
        <div>这是一个模板中的 div<%= name %></div>
      <% } %>
      <!-- 4、在模板中编写 js 代码解析数据 -->
    </script>
  </head>
  <body>
    <div class="box"></div>
    <script>
      // 5、将模板内的内容添加到 box 里面
      // template() 方法可以调用模板内容
      // 参数1： 调用的模板的id
      // 参数2：是一个对象型的数据，数据会传给模板，对象中的每个属性的属性名在模板中可以直接当变量名使用
      $(".box").html(template("tem", { name: "tom" }));
    </script>
  </body>
</html>
```

## 模板引擎案例

### 重新制作百度搜索

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      ul {
        list-style: none;
      }
      input {
        border: 0;
        outline: none;
      }
      .box {
        width: 500px;
        height: 50px;
        margin: 20px auto;
      }
      .box .search-box {
        float: left;
        width: 400px;
        border: 2px solid #0af;
        box-sizing: border-box;
      }
      .box .search-box .txt {
        display: block;
        height: 46px;
        padding-left: 10px;
        line-height: 46px;
        font-size: 16px;
        color: #333;
      }
      .box .search-box ul li {
        padding: 0 10px;
        line-height: 36px;
      }
      .box .btn {
        float: left;
        width: 100px;
        height: 50px;
        background-color: #0af;
        font-size: 18px;
        color: #fff;
        font-weight: bold;
      }
    </style>
    <script src="js/template-native.js"></script>
    <script id="tem" type="text/html">
      <!-- 循环添加多个 li 标签 -->
      <!-- 个数是按照获取的数据确定的,数据中有一个 g 属性，就是我们需要的数组 -->
      <% for (var i = 0 ; i < g.length ; i++){ %>
        <li><%= g[i].q %></li>
      <% } %>
    </script>
  </head>
  <body>
    <div class="box">
      <div class="search-box">
        <input type="text" class="txt" />
        <ul class="suggest-list"></ul>
      </div>
      <input type="button" value="搜索" class="btn" />
    </div>
    <!--引包  -->
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      //  添加一个 txt 中的按键弹起事件，每输入一个文字都会触发事件
      var $txt = $(".txt");
      var $ul = $(".suggest-list");

      $txt.keyup(function() {
        // 获取搜索联想的数据
        var keyword = $(this).val();
        // 发送数据请求
        $.ajax({
          url:
            "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web",
          dataType: "jsonp",
          jsonp: "cb",
          data: { wd: keyword },
          success: function(data) {
            // console.log(data);
            // 直接调用模板，添加给ul内部
            $ul.html(template("tem", data));
          },
        });
      });
    </script>
  </body>
</html>
```

### 留言板

#### 查询数据

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/index.css" />
    <script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/template-native.js"></script>
    <!-- 创建模板 -->
    <script id="tem" type="text/html">
        <!-- 将拿到的数据中 的 comments 变量进行遍历 -->
      <% for (var i=0 ; i < comments.length ; i++) { %>
        <li>
          <p class="floor">
            <%= comments[i].id %>楼<a href="javascript:;" class="delete">删除</a>
          </p>
          <p class="author">层主：<span class="name">
              <%= comments[i].username %>
            </span></p>
          <p class="content">
            <%= comments[i].content %>
          </p>
        </li>
        <% } %>
    </script>
  </head>

  <body>
    <div class="main">
      <div class="post">
        <h2>新年快乐</h2>
        <p class="author">楼主：行痴</p>
        <p class="txt">新的一年，祝大家新年快乐，身体健康，升职加薪！</p>
      </div>
      <div class="reply">
        <h4>发表回复</h4>
        <p>用户名：<input type="text" class="user" /></p>
        <textarea class="editor"></textarea>
        <input type="button" value="发表" class="btn" />
      </div>
      <div class="cmts">
        <ul class="list"></ul>
      </div>
    </div>
    <script>
      // 获取元素
      var $list = $(".cmts .list");
      // 获取后台数据
      $.ajax({
        url: "http://localhost:3000/db/",
        type: "GET",
        success: function(data) {
          console.log(data);
          //将得到的数据通过模板添加到页面中
          $list.html(template("tem", data));
        },
      });
    </script>
  </body>
</html>
```

#### 增加数据

- 方法一：循环遍历输出

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/index.css" />
    <script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/template-native.js"></script>
    <!-- 创建模板 -->
    <script id="tem" type="text/html">
      <!-- 将拿到的数据中 的 comments 变量进行遍历 -->
      <% for (var i=0 ; i < comments.length ; i++) { %>
      <li>
        <p class="floor">
          <%= comments[i].id %>楼<a href="javascript:;" class="delete">删除</a>
        </p>
        <p class="author">
          层主：<span class="name"> <%= comments[i].username %> </span>
        </p>
        <p class="content"><%= comments[i].content %></p>
      </li>
      <% } %>
    </script>
  </head>

  <body>
    <div class="main">
      <div class="post">
        <h2>新年快乐</h2>
        <p class="author">楼主：行痴</p>
        <p class="txt">新的一年，祝大家新年快乐，身体健康，升职加薪！</p>
      </div>
      <div class="reply">
        <h4>发表回复</h4>
        <p>用户名：<input type="text" class="user" /></p>
        <textarea class="editor"></textarea>
        <input type="button" value="发表" class="btn" />
      </div>
      <div class="cmts">
        <ul class="list"></ul>
      </div>
    </div>
    <script>
      // 获取元素
      var $list = $(".cmts .list");
      var $btn = $(".reply .btn");
      var $user = $(".reply .user");
      var $editor = $(".reply .editor");
      // 获取后台数据
      getdata();
      function getdata() {
        $.ajax({
          url: "http://localhost:3000/db/",
          type: "GET",
          success: function(data) {
            console.log(data);
            //将得到的数据通过模板添加到页面中
            $list.html(template("tem", data));
          },
        });
      }

      // 添加一项新的数据到数据库中
      // 添加点击事件
      $btn.click(function() {
        var username = $user.val();
        var content = $editor.val();
        $.ajax({
          url: "http://localhost:3000/comments/",
          type: "POST",
          dataType: "json",
          data: { username: username, content: content },
          success: function(data) {
            console.log(data);
            getdata();
          },
        });
        // 清空输入
        $user.val("");
        $editor.val("");
      });
    </script>
  </body>
</html>
```

- 方法二：制作一个模板需要的对象数据

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/index.css" />
    <script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/template-native.js"></script>
    <!-- 创建模板 -->
    <script id="tem" type="text/html">
        <!-- 将拿到的数据中 的 comments 变量进行遍历 -->
      <!-- 在每个li标签中添加一个自定义标签属性，记录自己的id -->
      <% for (var i=0 ; i < comments.length ; i++) { %>
        <li uid="<%= comments[i].id %>">
          <p class="floor">
            <%= comments[i].id %>楼<a href="javascript:;" class="delete">删除</a>
          </p>
          <p class="author">层主：<span class="name">
              <%= comments[i].username %>
            </span></p>
          <p class="content">
            <%= comments[i].content %>
          </p>
        </li>
        <% } %>
    </script>
  </head>

  <body>
    <div class="main">
      <div class="post">
        <h2>新年快乐</h2>
        <p class="author">楼主：行痴</p>
        <p class="txt">新的一年，祝大家新年快乐，身体健康，升职加薪！</p>
      </div>
      <div class="reply">
        <h4>发表回复</h4>
        <p>用户名：<input type="text" class="user" /></p>
        <textarea class="editor"></textarea>
        <input type="button" value="发表" class="btn" />
      </div>
      <div class="cmts">
        <ul class="list"></ul>
      </div>
    </div>
    <script>
      // 获取元素
      var $list = $(".cmts .list");
      var $btn = $(".reply .btn");
      var $user = $(".reply .user");
      var $editor = $(".reply .editor");
      // 获取后台数据
      getdata();
      function getdata() {
        $.ajax({
          url: "http://localhost:3000/db/",
          type: "GET",
          success: function(data) {
            console.log(data);
            //将得到的数据通过模板添加到页面中
            $list.html(template("tem", data));
          },
        });
      }

      // 添加一项新的数据到数据库中
      // 添加点击事件
      $btn.click(function() {
        var username = $user.val();
        var content = $editor.val();
        $.ajax({
          url: "http://localhost:3000/comments",
          type: "POST",
          dataType: "json",
          data: { username: username, content: content },
          success: function(data) {
            // console.log(data);
            // 制作一个模板需要的对象数据，将 data 作为数组中的项
            $list.append(template("tem", { comments: [data] }));
          },
        });
        // 清空输入
        $user.val("");
        $editor.val("");
      });
    </script>
  </body>
</html>
```

#### 删除数据

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="css/index.css">
  <script src="js/jquery-1.12.4.min.js"></script>
  <script src="js/template-native.js"></script>
  <!-- 创建模板 -->
  <script id="tem" type="text/html">
    <!-- 将拿到的数据中 的 comments 变量进行遍历 -->
  <!-- 在每个li标签中添加一个自定义标签属性，记录自己的id -->
  <% for (var i=0 ; i < comments.length ; i++) { %>
    <li uid="<%= comments[i].id %>">
      <p class="floor">
        <%= comments[i].id %>楼<a href="javascript:;" class="delete">删除</a>
      </p>
      <p class="author">层主：<span class="name">
          <%= comments[i].username %>
        </span></p>
      <p class="content">
        <%= comments[i].content %>
      </p>
    </li>
    <% } %>
  </script>
</head>

<body>
  <div class="main">
    <div class="post">
      <h2>新年快乐</h2>
      <p class="author">楼主：行痴</p>
      <p class="txt">新的一年，祝大家新年快乐，身体健康，升职加薪！</p>
    </div>
    <div class="reply">
      <h4>发表回复</h4>
      <p>用户名：<input type="text" class="user"></p>
      <textarea class="editor"></textarea>
      <input type="button" value="发表" class="btn">
    </div>
    <div class="cmts">
      <ul class="list">

      </ul>
    </div>
  </div>
  <script>
    // 获取元素
    var $list = $(".cmts .list");
    var $btn = $(".reply .btn");
    var $user = $(".reply .user");
    var $editor = $(".reply .editor");
    // 获取后台数据
    $.ajax({
      url: "http://localhost:3000/db",
      type: "GET",
      success: function (data) {
        // console.log(data)
        // 将得到的数据通过模板添加到页面中
        $list.html(template("tem", data));
        // 在这里可以正常获取所有添加的元素
        // 需要获取 删除按钮，添加点击事件，删除自己所在的 li 标签
        deleteData();
      }
    });

    // 添加一项新的数据到数据库中
    // 添加点击事件
    $btn.click(function () {
      var username = $user.val();
      var content = $editor.val();
      $.ajax({
        url: "http://localhost:3000/comments",
        type: "POST",
        dataType: "json",
        data: { username: username, content: content },
        success: function (data) {
          // console.log(data);
          // 制作一个模板需要的对象数据，将 data 作为数组中的项
          $list.append(template("tem", { "comments": [data] }));
          deleteData();
        }
      })
      // 清空输入
      $user.val("");
      $editor.val("");
    })

    // 定义 点击 按钮 删除的函数
    function deleteData() {
      $(".cmts .list .delete").click(function () {
        // 要找到自己的祖先中的li 标签
        $li = $(this).parents("li");
        // 找到 li 标签记录的在数据库中的 id
        var index = $li.attr("uid");
        // 发送请求到数据库，删除对应的数据
        $.ajax({
          url: "http://localhost:3000/comments/" + index,
          type: "DELETE"
        })
        // 从 DOM结构中删除对应的 li
        $li.remove();
      })
    }


  </script>
</body>

</html>
```
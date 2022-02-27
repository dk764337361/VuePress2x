# 案例

## 拖拽案例

  <img src="/images/Javascript/drag.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title></title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .nav {
        height: 30px;
        background: #036663;
        border-bottom: 1px solid #369;
        line-height: 30px;
        padding-left: 30px;
      }

      .nav a {
        color: #fff;
        text-align: center;
        font-size: 14px;
        text-decoration: none;
      }

      .d-box {
        width: 400px;
        height: 300px;
        border: 5px solid #eee;
        box-shadow: 2px 2px 2px 2px #666;
        position: absolute;
        top: 40%;
        left: 40%;
        background-color: white;

        /* 不让文字被选中 */
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .hd {
        width: 100%;
        height: 25px;
        background-color: #7c9299;
        border-bottom: 1px solid #369;
        line-height: 25px;
        color: white;
        cursor: move;
      }

      #box_close {
        float: right;
        cursor: pointer;
      }
    </style>
  </head>

  <body>
    <div class="nav">
      <a href="javascript:;" id="register">注册信息</a>
    </div>
    <div class="d-box" id="d_box">
      <div class="hd" id="drop">
        注册信息 (可以拖拽)
        <span id="box_close">【关闭】</span>
      </div>
      <div class="bd"></div>
    </div>
    <script src="common.js"></script>
    <script>
      // 获取元素
      var box = document.getElementById("d_box");
      var drop = document.getElementById("drop");
      var close = document.getElementById("box_close");

      // 给 drop 添加鼠标按下事件，在内部继续绑定一个鼠标移动事件
      drop.onmousedown = function(e) {
        e = e || window.event;
        // 记忆鼠标按下时，鼠标在父盒子内部的间距
        var l = e.pageX - box.offsetLeft;
        var t = e.pageY - box.offsetTop;
        // 鼠标移动事件
        drop.onmousemove = function(e) {
          e = e || window.event;
          // 鼠标移动过程中，可以计算 box 的 left 和 top
          var nowleft = e.pageX - l;
          var nowtop = e.pageY - t;
          // 赋值给 box 的样式属性
          box.style.left = nowleft + "px";
          box.style.top = nowtop + "px";
        };
      };

      // 鼠标弹起事件
      drop.onmouseup = function() {
        drop.onmousemove = null;
      };

      // 点击 关闭 box
      close.onclick = function() {
        box.style.display = "none";
      };
    </script>
  </body>
</html>
```

## 弹出登录窗口

  <img src="/images/Javascript/pop-up.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        .login-header {
            width: 100%;
            text-align: center;
            height: 30px;
            font-size: 24px;
            line-height: 30px;
        }

        ul,
        li,
        ol,
        dl,
        dt,
        dd,
        div,
        p,
        span,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        a {
            padding: 0px;
            margin: 0px;
        }

        .login {
            width: 512px;
            position: absolute;
            border: #ebebeb solid 1px;
            height: 280px;
            left: 50%;
            right: 50%;
            background: #ffffff;
            box-shadow: 0px 0px 20px #ddd;
            z-index: 9999;
            margin-left: -256px;
            margin-top: 140px;
            display: none;
        }

        .login-title {
            width: 100%;
            margin: 10px 0px 0px 0px;
            text-align: center;
            line-height: 40px;
            height: 40px;
            font-size: 18px;
            position: relative;
            cursor: move;
            -moz-user-select: none;
            /*火狐*/
            -webkit-user-select: none;
            /*webkit浏览器*/
            -ms-user-select: none;
            /*IE10*/
            -khtml-user-select: none;
            /*早期浏览器*/
            user-select: none;
        }

        .login-input-content {
            margin-top: 20px;
        }

        .login-button {
            width: 50%;
            margin: 30px auto 0px auto;
            line-height: 40px;
            font-size: 14px;
            border: #ebebeb 1px solid;
            text-align: center;
        }

        .login-bg {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0px;
            left: 0px;
            background: #000000;
            filter: alpha(opacity=30);
            -moz-opacity: 0.3;
            -khtml-opacity: 0.3;
            opacity: 0.3;
            display: none;
        }

        a {
            text-decoration: none;
            color: #000000;
        }

        .login-button a {
            display: block;
        }

        .login-input input.list-input {
            float: left;
            line-height: 35px;
            height: 35px;
            width: 350px;
            border: #ebebeb 1px solid;
            text-indent: 5px;
        }

        .login-input {
            overflow: hidden;
            margin: 0px 0px 20px 0px;
        }

        .login-input label {
            float: left;
            width: 90px;
            padding-right: 10px;
            text-align: right;
            line-height: 35px;
            height: 35px;
            font-size: 14px;
        }

        .login-title span {
            position: absolute;
            font-size: 12px;
            right: -20px;
            top: -30px;
            background: #ffffff;
            border: #ebebeb solid 1px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
        }
    </style>
</head>

<body>
    <div class="login-header"><a id="link" href="javascript:void(0);">点击，弹出登录框</a></div>
    <div id="login" class="login">
        <div id="title" class="login-title">登录会员
            <span><a id="closeBtn" href="javascript:void(0);" class="close-login">关闭</a></span>
        </div>
        <div class="login-input-content">
            <div class="login-input">
                <label>用户名：</label>
                <input type="text" placeholder="请输入用户名" name="info[username]" id="username" class="list-input">
            </div>
            <div class="login-input">
                <label>登录密码：</label>
                <input type="password" placeholder="请输入登录密码" name="info[password]" id="password" class="list-input">
            </div>
        </div>
        <div id="loginBtn" class="login-button"><a href="javascript:void(0);" id="login-button-submit">登录会员</a></div>
    </div>
    <!-- 遮盖层 -->
    <div id="bg" class="login-bg"></div>
    <script>
        // 获取元素
        var link = document.getElementById("link");
        var login = document.getElementById("login");
        var bg = document.getElementById("bg");
        var closeBtn = document.getElementById("closeBtn");

        // 添加 link 的点击事件，让登录窗口和遮盖层显示
        link.onclick = function () {
            login.style.display = "block";
            bg.style.display = "block";
        };

        // 添加 btn 的点击事件，让登录窗口和遮盖层隐藏
        closeBtn.onclick = function () {
            login.style.display = "none";
            bg.style.display = "none";
        };
    </script>
</body>

</html>
```
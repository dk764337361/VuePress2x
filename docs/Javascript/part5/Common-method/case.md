# 综合案例

## 发送验证码控制按钮禁用

<img src="/images/Javascript/JQ/verification-code.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```html{15}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" />
    <input type="button" value="发送" />
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $btn = $("input:button");
      // 添加按钮的点击事件
      $btn.click(function() {
        // 定义一个变量存储时间的数字
        var n = 5;
        // 让按钮被禁用
        // 替换按钮的文字内容
        $(this)
          .prop("disabled", true)
          .val(n + "s 后重新发送");
        // 每隔 1s 更改倒计时内容
        // 通过定时器进行每隔 1s 减时间效果
        var timer = setInterval(() => {
          n--;
          // 文字内容发生变化
          // 定时器内部的this指向的默认为 window
          $(this).val(n + "s 后重新发送");
          // 判断如果时间到了 0 ，就要停止定时器
          if (n <= 0) {
            clearInterval(timer);
            // 5s 结束后，需要让文字恢复 发送
            // 让按钮取消禁用
            $(this)
              .val("重新发送")
              .prop("disabled", false);
          }
        }, 1000);
      });
    </script>
  </body>
</html>
```

## 放大镜切换项(初始版)

<img src="/images/Javascript/JQ/magnifier.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 页面结构

```
放大镜初始版
    ├─── index.html
    ├─── css
    │    └── index.css
    ├─── img
    │    └── b1.jpg
    │    └── b2.jpg
    │    └── b3.jpg
    │    └── m1.jpg
    │    └── m2.jpg
    │    └── m3.jpg
    │    └── s1.jpg
    │    └── s2.jpg
    │    └── s3.jpg
    └─── lib
         ├── jquery-1.12.4.js
         └── jquery-1.12.4.min.js
```

### 排他思想
- index.html
  
```html{44-50}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <!--版心  -->
    <div class="w">
      <!-- 左侧 -->
      <div class="leftBox">
        <!-- 上 -->
        <div class="top">
          <img src="img/m1.jpg" />
        </div>
        <ul>
          <li class="active">
            <img src="img/s1.jpg" msrc="m1.jpg" bsrc="b1.jpg" />
          </li>
          <li>
            <img src="img/s2.jpg" msrc="m2.jpg" bsrc="b2.jpg" />
          </li>
          <li>
            <img src="img/s3.jpg" msrc="m3.jpg" bsrc="b3.jpg" />
          </li>
        </ul>
      </div>
      <!-- 右侧 -->
      <div class="rightBox">
        <img src="img/b1.jpg" alt="" />
      </div>
    </div>
    <script src="lib/jquery-1.12.4.js"></script>
    <script>
      // 获取元素
      var $imgs = $(".leftBox ul li img");
      var $mimg = $(".leftBox .top img");
      var $bimg = $(".rightBox img");
      // 1.给小图的图片添加鼠标移上事件，切换类名
      $imgs.mouseenter(function() {
        // 排他操作
        // 给图片自己的父级添加类名,让父级的兄弟取消类名
        $(this)
          .parent()
          .addClass("active")
          .siblings()
          .removeClass("active");
        // 2.更改中图和大图的路径
        // 存储路径中的前缀
        var path = "img/";
        // 中图和大图的路径存在了对应小图的自定义属性中
        var msrc = path + $(this).attr("msrc");
        var bsrc = path + $(this).attr("bsrc");
        // 直接设置给对应的图片
        $mimg.attr("src", msrc);
        $bimg.attr("src", bsrc);
      });
    </script>
  </body>
</html>
```

- index.css

```css
/* 初始化 */
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}

/* 版心 */
.w {
  width: 1120px;
  margin: 0 auto;
}

/* 左侧盒子 */
.leftBox {
  width: 400px;
  float: left;
}
.leftBox .top {
  width: 400px;
  border:1px solid #ccc;
}
.leftBox .top img {
  width: 400px;

}
.leftBox ul {
  width: 188px;
  margin: 10px auto;
}
.leftBox ul li {
  float: left;
  width: 54px;
  height: 54px;
  border:1px solid #fff;
}
.leftBox ul li.active {
  border-color: red;
}
.leftBox ul li + li {
  margin-left: 10px;
}

/* 右侧盒子 */
.rightBox {
  float: left;
  margin-left:10px;
  width: 500px;
  height: 500px;
  border:1px solid #ccc;
  overflow: hidden;
}
```
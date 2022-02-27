# 综合案例

## 下拉菜单

<img src="/images/Javascript/JQ/Drop-down-menu.gif" style="width: 50%; display:inline-block; margin: 0 ;">

### 目录结构

```
放大镜初始版
    ├─── index.html
    ├─── img
    │    └── bg.jpg
    │    └── libg.jpg
    └─── lib
         ├── jquery-1.12.4.js
         └── jquery-1.12.4.min.js
```

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title></title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
      }

      ul {
        list-style: none;
      }

      .wrap {
        width: 330px;
        height: 30px;
        margin: 100px auto 0;
        padding-left: 10px;
        background-image: url(img/bg.jpg);
      }

      .wrap li {
        background-image: url(img/libg.jpg);
      }

      .wrap > ul > li {
        float: left;
        margin-right: 10px;
        position: relative;
      }

      .wrap a {
        display: block;
        height: 30px;
        width: 100px;
        text-decoration: none;
        color: #000;
        line-height: 30px;
        text-align: center;
      }

      .wrap li ul {
        position: absolute;
        top: 30px;
        display: none;
      }
    </style>
  </head>

  <body>
    <div class="wrap">
      <ul id="menu">
        <li>
          <a href="javascript:void(0);">一级菜单1</a>
          <ul class="ul">
            <li>
              <a href="javascript:void(0);">二级菜单11</a>
            </li>
            <li>
              <a href="javascript:void(0);">二级菜单12</a>
            </li>
            <li>
              <a href="javascript:void(0);">二级菜单13</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:void(0);">一级菜单2</a>
          <ul>
            <li>
              <a href="javascript:void(0);">二级菜单21</a>
            </li>
            <li>
              <a href="javascript:void(0);">二级菜单22</a>
            </li>
            <li>
              <a href="javascript:void(0);">二级菜单23</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:void(0);">一级菜单3</a>
          <ul>
            <li>
              <a href="javascript:void(0);">二级菜单31</a>
            </li>
            <li>
              <a href="javascript:void(0);">二级菜单32</a>
            </li>
            <li>
              <a href="javascript:void(0);">二级菜单33</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <script src="lib/jquery-1.12.4.min.js"></script>
    <script>
      // 给最外层的 li 标签添加事件
      var $lis = $(".wrap #menu > li");

      // // 鼠标进入，让内部的子级的 ul 进行显示
      // $lis.mouseenter(function () {
      //   $(this).children("ul").show()
      // })
      // // 鼠标离开，让内部的子级的 ul 进行隐藏
      // $lis.mouseleave(function () {
      //   $(this).children("ul").hide()
      // })

      // 升级，让它进行运动的显示和隐藏
      // 鼠标进入，让内部的子级的 ul 进行显示
      $lis.mouseenter(function() {
        // 动画开始之前，清空动画排队
        $(this)
          .children("ul")
          .stop(true)
          .slideDown(500);
      });
      // 鼠标离开，让内部的子级的 ul 进行隐藏
      $lis.mouseleave(function() {
        $(this)
          .children("ul")
          .stop(true)
          .slideUp(500);
      });
    </script>
  </body>
</html>
```

## 手风琴轮播图
<img src="/images/Javascript/JQ/06.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 目录结构

```
手风琴特效
    ├─── index.html
    ├─── img
    │    └── fq1.jpg
    │    └── fq2.jpg
    │    └── fq3.jpg
    │    └── fq4.jpg
    │    └── fq5.jpg
    └─── jquery-1.12.4.js
```

### 轮播图结构

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      ul {
        list-style: none;
        width: 1300px;
      }

      #box {
        width: 1200px;
        height: 400px;
        border: 2px solid red;
        margin: 100px auto;
      }

      #box li {
        float: left;
        width: 240px;
        height: 400px;
      }
      /* li 标签的背景图，需要使用 js 代码动态添加 */
    </style>
  </head>

  <body>
    <div id="box">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <script src="jquery-1.12.4.js"></script>
  </body>
</html>
```

```html
<script>
  // 获取所有的 li 标签
  var $lis = $("#box ul li");
  // 模拟后台提供的图片数据
  var arr = ["fq1.jpg", "fq2.jpg", "fq3.jpg", "fq4.jpg", "fq5.jpg"];
  // 记录文件路径
  var path = "img/";
  var during = 1000;
  // 给每一个 li 去添加背景图
  // 遍历方法
  $lis.each(function(i) {
    // 存储路径
    var url = "url(" + path + arr[i] + ")";
    // this 指的是遍历的这一次的 li 元素
    $(this).css("background-image", url);
  });
</script>
```
### 轮播图动画

```html
  <script>
    // 获取所有的 li 标签
    var $lis = $("#box ul li");
    // 模拟后台提供的图片数据
    var arr = ["fq1.jpg","fq2.jpg","fq3.jpg","fq4.jpg","fq5.jpg"];
    // 记录文件路径
    var path = "img/";
    var during = 1000;
    // 给每一个 li 去添加背景图
    // 遍历方法
    $lis.each(function (i) {
      // 存储路径
      var url = "url(" + path + arr[i] + ")";
      // this 指的是遍历的这一次的 li 元素
      $(this).css("background-image",url);
    })

    // 给每个 li 标签添加鼠标进入事件，让自己的宽度变为 800，让其他的兄弟变为 100
    $lis.mouseenter(function () {
      $(this).stop(true).animate({"width": 800},during)
      .siblings().stop(true).animate({"width": 100},during)
    })

    // 给最外层的大盒子添加鼠标离开事件，让所有的 li 恢复默认宽度
    $("#box").mouseleave(function () {
      $lis.stop(true).animate({"width": 240},during)
    })

  </script>
```

## 京东淡入淡出轮播图

<img src="/images/Javascript/JQ/jingdong.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 目录结构

```
京东轮播图
    ├─── index.html
    ├─── lib
    │    └── jquery-1.12.4.js
    │    └── jquery-1.12.4.min.js
    ├─── img
         └── jd1.jpg
         └── jd2.jpg
         └── jd3.jpg
         └── jd4.jpg
         └── jd5.jpg
         └── jd6.jpg
         └── jd7.jpg
         └── jd8.jpg
```

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <title>京东商城</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .slider {
      height: 340px;
      width: 790px;
      margin: 100px auto;
      position: relative;
    }

    .slider ul li {
      position: absolute;
      display: none;
    }

    .slider ul li:first-child {
      display: block;
    }


    .arrow {
      display: none;
    }

    .slider:hover .arrow {
      display: block;
    }

    .arrow-left,
    .arrow-right {
      font-family: "SimSun", "宋体";
      width: 30px;
      height: 60px;
      background-color: rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 50%;
      margin-top: -30px;
      cursor: pointer;
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-weight: 700;
      font-size: 30px;
    }

    .arrow-left:hover,
    .arrow-right:hover {
      background-color: rgba(0, 0, 0, .5);
    }

    .arrow-left {
      left: 0;
    }

    .arrow-right {
      right: 0;
    }
    .slider ol{
      position: absolute;
      left:100px;
      bottom: 30px;
      width: 240px;
      height: 20px;
    }
    .slider ol li{
      float: left;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      border-radius: 50%;
      background:rgba(255, 255, 255, .5);
      cursor:pointer;
    }
    .slider ol li.cur{
      background-color: #fff;
    }
  </style>
</head>

<body>
  <div class="slider">
    <ul>
      <li><a href="#"><img src="img/jd1.jpg" alt=""></a></li>
      <li><a href="#"><img src="img/jd2.jpg" alt=""></a></li>
      <li><a href="#"><img src="img/jd3.jpg" alt=""></a></li>
      <li><a href="#"><img src="img/jd4.jpg" alt=""></a></li>
      <li><a href="#"><img src="img/jd5.jpg" alt=""></a></li>
      <li><a href="#"><img src="img/jd6.jpg" alt=""></a></li>
      <li><a href="#"><img src="img/jd7.jpg" alt=""></a></li>
      <li><a href="#"><img src="img/jd8.jpg" alt=""></a></li>
    </ul>
    <!--箭头-->
    <div class="arrow">
      <span class="arrow-left">&lt;</span>
      <span class="arrow-right">&gt;</span>
    </div>
    <!-- 下标 -->
    <ol>
      <li class="cur"></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ol>
  </div>

  <script src="lib/jquery-1.12.4.js"></script>
  <script>
    // 获取元素
    var $ulLis = $(".slider ul li");
    var $olLis = $(".slider ol li");
    // 信号量编程
    var idx = 0;
    // 右按钮事件
    $(".arrow-right").click(function () {
      // 函数节流，防骚扰
      if ($ulLis.eq(idx).is(":animated")) return;
      // 让当前这一个 li 去淡出隐藏
      $ulLis.eq(idx).fadeOut();
      // 让信号量自加
      idx++;
      if (idx > $ulLis.length - 1) {
        idx = 0;
      }
      move();
    })
    // 左按钮事件
    $(".arrow-left").click(function () {
      // 函数节流，防骚扰
      if ($ulLis.eq(idx).is(":animated")) return;
      // 让当前这一个 li 去淡出隐藏
      $ulLis.eq(idx).fadeOut();
      // 让信号量自减
      idx--;
      if (idx < 0) {
        idx = $ulLis.length - 1;
      }
      move();
    })

    // 添加小圆点的事件
    $olLis.click(function () {
      // 函数节流，防骚扰
      if ($ulLis.eq(idx).is(":animated")) return;
      // 让当前的这一个 li 去淡出隐藏
      $ulLis.eq(idx).fadeOut();
      // 找到点击的当前的小圆点对应的下标，赋值给信号量
      idx = $(this).index();
      move();
    })

    // 封装公共部分
    function move () {
      // 让指定的一项 li 进行淡入显示
      $ulLis.eq(idx).fadeIn();
      $olLis.eq(idx).addClass("cur").siblings().removeClass("cur");
    }
  </script>
</body>
</html>
```



# jQuery 事件操作

## 简单方式注册事件

- 语法：jQuery 对象.事件名(事件处理程序);

## on 方法

### 注册事件

- 注册简单事件语法：jQuery 对象.on('事件名',事件处理程序);
- 事件委托的实现：jQuery 对象.on('事件名','选择器',事件处理程序);
- 选择器：子孙元素

::: tip 提示
在事件处理程序中，this 代表的是子孙元素（所点最先触发的）
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="按钮" />
    <script src="js/jquery-1.12.4.js"></script>
    <script>
      // 简单注册事件的方式
      // $("input").click(function () {
      //     alert(1)
      // })

      // 使用 on 方法注册简单事件
      // on() 方法的封装的底层实际是 addEventListener()
      $("input").on("click", function() {
        alert(2);
      });
      $("input").on("click", function() {
        alert(3);
      });
    </script>
  </body>
</html>
```

### 实现事件委托

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <ul>
      <li>刘备</li>
      <li>诸葛亮</li>
      <li>关羽</li>
      <li>张飞</li>
    </ul>
    <script src="js/jquery-1.12.4.js"></script>
    <script>
      // 原生 DOM 中如何实现事件委托
      // var ul = document.getElementsByTagName("ul")[0];
      // ul.onclick = function (e) {
      //     e.target.style.background = "pink";
      // };

      // jQuery 中的事件委托
      // on() 方法传递三个参数
      // 参数1： 事件类型
      // 参数2： 进行委托的子元素的选择器
      // 参数3： 事件处理程序
      $("ul").on("click", "li", function() {
        // 在事件委托过程中，事件函数的内部 this 不是指向事件源，而是指向触发事件的 委托子元素
        alert($(this).text());
      });
    </script>
  </body>
</html>
```

## off 方法移除事件

- 解绑简单的事件：jQuery 对象.off('click',事件处理程序名称)
- 解绑事件委托注册的事件：jQuery 对象.off('click',‘选择器’,事件处理程序名称)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="按钮" />
    <ul>
      <li>刘备</li>
      <li>诸葛亮</li>
      <li>关羽</li>
      <li>张飞</li>
    </ul>
    <script src="js/jquery-1.12.4.js"></script>
    <script>
      // 定义事件处理函数
      var fun1 = function() {
        alert(2);
      };
      var fun2 = function() {
        alert(3);
      };
      // 绑定简单事件
      $("input").on("click", fun1);
      $("input").on("click", fun2);

      // 解绑事件
      $("input").off("click", fun2);

      var fn1 = function() {
        alert($(this).text());
      };
      var fn2 = function() {
        alert($(this).index());
      };
      // 绑定事件委托的事件
      $("ul").on("click", "li", fn1);
      $("ul").on("click", "li", fn2);

      // 解绑事件委托
      $("ul").off("click", "li", fn2);
    </script>
  </body>
</html>
```

## trigger 自动触发事件
- 语法：jQuery 对象.trigger('事件名');

### 完善京东轮播图


```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
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
        background-color: rgba(0, 0, 0, 0.5);
      }

      .arrow-left {
        left: 0;
      }

      .arrow-right {
        right: 0;
      }
      .slider ol {
        position: absolute;
        left: 100px;
        bottom: 30px;
        width: 240px;
        height: 20px;
      }
      .slider ol li {
        float: left;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
      }
      .slider ol li.cur {
        background-color: #fff;
      }
    </style>
  </head>

  <body>
    <div class="slider">
      <ul>
        <li>
          <a href="#"><img src="img/jd1.jpg" alt=""/></a>
        </li>
        <li>
          <a href="#"><img src="img/jd2.jpg" alt=""/></a>
        </li>
        <li>
          <a href="#"><img src="img/jd3.jpg" alt=""/></a>
        </li>
        <li>
          <a href="#"><img src="img/jd4.jpg" alt=""/></a>
        </li>
        <li>
          <a href="#"><img src="img/jd5.jpg" alt=""/></a>
        </li>
        <li>
          <a href="#"><img src="img/jd6.jpg" alt=""/></a>
        </li>
        <li>
          <a href="#"><img src="img/jd7.jpg" alt=""/></a>
        </li>
        <li>
          <a href="#"><img src="img/jd8.jpg" alt=""/></a>
        </li>
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
      $(".arrow-right").click(function() {
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
      });
      // 左按钮事件
      $(".arrow-left").click(function() {
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
      });

      // 添加小圆点的事件
      $olLis.click(function() {
        // 函数节流，防骚扰
        if ($ulLis.eq(idx).is(":animated")) return;
        // 让当前的这一个 li 去淡出隐藏
        $ulLis.eq(idx).fadeOut();
        // 找到点击的当前的小圆点对应的下标，赋值给信号量
        idx = $(this).index();
        move();
      });

      // 封装公共部分
      function move() {
        // 让指定的一项 li 进行淡入显示
        $ulLis.eq(idx).fadeIn();
        $olLis
          .eq(idx)
          .addClass("cur")
          .siblings()
          .removeClass("cur");
      }

      // 可以利用 JQ 中的 trigger 方法，自动执行右按钮事件
      function autoPlay() {
        $(".arrow-right").trigger("click");
      }
      var timer = setInterval(autoPlay, 1000);

      // 鼠标移上停止定时器
      $(".slider").on("mouseenter", function() {
        clearInterval(timer);
      });
      // 鼠标离开重新开启定时器
      $(".slider").on("mouseleave", function() {
        timer = setInterval(autoPlay, 1000);
      });
    </script>
  </body>
</html>
```

# 案例综合运用：

案例资料包：http://www.cdkgg.com/images/Javascript/material.zip

## 1.多属性运动

- 功能要求：元素在运动到终点的同时改变元素的宽度
- 此功能缺点：耦合性太强

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
      .box {
        position: absolute;
        top: 100px;
        left: 0;
        width: 100px;
        height: 100px;
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <input type="button" value="开始" id="start" />
    <div class="box" id="box"></div>
    <script>
      // 简单运动
      // 获取元素
      var start = document.getElementById("start");
      var box = document.getElementById("box");
      // 已知 开始位置、结束位置、总时长、时间间隔
      // 总距离 = 步长 * 总次数
      // 总距离 = 结束位置 - 起始位置  ，已知可以求出来
      // 总次数 = 总时长 / 时间间隔 ，已知可以求出来
      // 步长 = （结束位置 - 起始位置） / （总时长 / 时间间隔）
      // 信号量 ,也相当于初始值
      var nowLeft = box.offsetLeft;
      var nowWidth = box.offsetWidth;
      // console.log(nowLeft);
      // 结束位置
      var endLeft = 500;
      var endWidth = 200;
      // 总时长
      var time = 1000;
      // 时间间隔
      var interval = 50;
      // 运算总次数
      var maxcount = time / interval;
      // 运算出每一次的步长
      var stepLeft = (endLeft - nowLeft) / maxcount;
      var stepWidth = (endWidth - nowWidth) / maxcount;
      // 定义一个次数的累加器
      var count = 0;
      // 准备条件结束可以开始定时器了
      var timer;
      start.onclick = function() {
        timer = setInterval(function() {
          // 让元素的属性每一次变化一个步长
          nowLeft += stepLeft;
          nowWidth += stepWidth;
          // 每运动一次让次数累加器加 1
          count++;
          // 停止定时器
          if (count >= maxcount) {
            // 拉终停表
            nowLeft = endLeft;
            nowWidth = endWidth;
            clearInterval(timer);
          }
          // 给属性赋值
          box.style.left = nowLeft + "px";
          box.style.width = nowWidth + "px";
        }, interval);
      };
    </script>
  </body>
</html>
```

## 2.多属性运动-进阶（封装动画函数）

封装动画函数

- 单一动画
- 多属性动画

<CodeGroup>
  <CodeGroupItem title="HTML" active>

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
      .box {
        position: absolute;
        top: 100px;
        left: 0;
        width: 100px;
        height: 100px;
        opacity: 0.5;
        background-color: #0f0;
      }
    </style>
  </head>
  <body>
    <input type="button" value="开始" id="start" />
    <div class="box" id="box"></div>
    <script src="animate.js"></script>
    <script>
      // 获取元素
      var start = document.getElementById("start");
      var box = document.getElementById("box");
      // 补充 获取计算后样式的方法
      // console.dir(window.getComputedStyle(box));
      // console.log(window.getComputedStyle(box).width);
      // console.log(window.getComputedStyle(box).height);
      // console.log(window.getComputedStyle(box).backgroundColor);
      // console.log(window.getComputedStyle(box)["opacity"]);

      // box 是需要运动的元素
      // 多属性运动
      // 共同点：总时间、时间间隔是相同的，自定义
      // 不同的：起始位置（通过程序方法自动获取当前页面最终显示效果）和结束位置（自定义指定的）

      // 函数参数
      // 参数1：元素对象，它要进行运动
      // 参数2：结束位置，以对象数据方式传递
      // 参数3：总时间

      // 调用函数
      start.onclick = function() {
        animate(box, { left: 400, width: 300 }, 2000);
      };
    </script>
  </body>
</html>
```

  </CodeGroupItem>

  <CodeGroupItem title="animate.js">

```js
// 多属性运动
// 共同点：总时间、时间间隔是相同的，自定义
// 不同的：起始位置（通过程序方法自动获取当前页面最终显示效果）和结束位置（自定义指定的）

// 函数参数
// 参数1：元素对象，它要进行运动
// 参数2：结束位置，以对象数据方式传递
// 参数3：总时间
// 自定义动画函数
function animate(ele, end, time) {
  // 已知结束位置，总时间，时间间隔 50，缺少起始位置
  // 起始位置要根据结束位置提供的属性进行获取
  // 起始位置的对象，需要先定义一个空对象
  var now = {};
  // start.left = 100;
  // end 对象遍历，获取属性名
  for (var k in end) {
    now[k] = parseFloat(window.getComputedStyle(ele)[k]);
  }
  // console.log(start);
  // 自定义时间间隔
  var interval = 50;
  // 计算总次数
  var maxCount = time / interval;
  // 次数累加器
  var count = 0;
  // 对象中的每个属性都有自己的步长，也可以放到一个步长对象中
  var step = {};
  // 遍历结束对象，计算每个属性的步长
  for (var k in end) {
    step[k] = (end[k] - now[k]) / maxCount;
  }
  // console.log(step);
  // ====================准备工作结束，开启定时器=========================
  var timer;
  timer = setInterval(function() {
    // 让每个属性发生变化，赋值给 now 对象中的每一项
    for (var k in end) {
      now[k] += step[k];
    }
    // 累计运动次数
    count++;
    // 判断定时器是否结束
    if (count >= maxCount) {
      // 拉终停表
      for (var k in end) {
        now[k] = end[k];
      }
      clearInterval(timer);
    }
    // 赋值给对应元素对象属性
    for (var k in now) {
      // 判断如果是 不透明度属性，不要加px单位
      if (k === "opacity") {
        ele.style[k] = now[k];
      } else {
        ele.style[k] = now[k] + "px";
      }
    }
  }, interval);
}
```

  </CodeGroupItem>
</CodeGroup>

## 3.简单无缝滚动轮播图

<img src="/images/Javascript/simple-carousel.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 关键点：找到 ul 元素的运动的折返点
- 耦合性比较强，只适用于一部分程序
  - 如果传入的图片大小不一，要重新计算折返点。

<CodeGroup>
  <CodeGroupItem title="HTML" active>

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .scroll {
        position: relative;
        width: 830px;
        height: 130px;
        border: 10px solid #000;
        margin: 100px auto;
        overflow: hidden;
      }
      .scroll ul {
        position: absolute;
        top: 0;
        left: 0;
        width: 5000px;
        height: 130px;
      }
      .scroll ul li {
        float: left;
        width: 200px;
        height: 130px;
        margin-right: 10px;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="scroll" id="scroll">
      <ul id="munit">
        <li><img src="images/shuzi/0.png" alt="" /></li>
        <li><img src="images/shuzi/1.png" alt="" /></li>
        <li><img src="images/shuzi/3.png" alt="" /></li>
        <li><img src="images/shuzi/4.png" alt="" /></li>
        <li><img src="images/shuzi/5.png" alt="" /></li>
        <li><img src="images/shuzi/6.png" alt="" /></li>
        <li><img src="images/shuzi/7.png" alt="" /></li>
        <li><img src="images/shuzi/0.png" alt="" /></li>
        <li><img src="images/shuzi/1.png" alt="" /></li>
        <li><img src="images/shuzi/3.png" alt="" /></li>
        <li><img src="images/shuzi/4.png" alt="" /></li>
        <li><img src="images/shuzi/5.png" alt="" /></li>
        <li><img src="images/shuzi/6.png" alt="" /></li>
        <li><img src="images/shuzi/7.png" alt="" /></li>
      </ul>
    </div>
    <script src="common.js"></script>
    <script>
      // 1.获取元素
      var scroll = my$("scroll");
      var munit = my$("munit");
      // 2.自己进行滚动播放
      var nowLeft = 0;
      // 关键点：找到 ul 元素的运动的折返点
      // 耦合性比较强，只适用于一部分程序
      var back = -1470; //7张图片X 210(width: 200px;margin-right: 10px;)=1470
      var timer;
      timer = setInterval(run, 10);
      // 3.鼠标移上 scroll 元素，让运动停止
      scroll.onmouseover = function() {
        clearInterval(timer);
      };
      // 4.鼠标离开 scroll 元素，让运动重新开始
      scroll.onmouseout = function() {
        timer = setInterval(run, 10);
      };

      // 运动函数
      function run() {
        // nowLeft 进行自减
        nowLeft -= 2;
        // 每次都要判断，是否走到了折返点，如果走到了，让他瞬间切换到 0
        if (nowLeft <= back) {
          nowLeft = 0;
        }
        // 给ul 赋值
        munit.style.left = nowLeft + "px";
      }
    </script>
  </body>
</html>
```

  </CodeGroupItem>

  <CodeGroupItem title="common.js" >

```js
// 定义一个获取元素的函数
function my$(id) {
  return document.getElementById(id);
}

// DOM 2 级事件绑定方式
// 自己制作一个兼容所有浏览器的绑定事件的函数
// 参数：事件源，事件类型，事件函数
function addEvent(ele, type, fn) {
  // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
  // IE 9 以下的浏览器，使用 attachEvent 方法
  // 浏览器能力检测
  if (ele.addEventListener) {
    ele.addEventListener(type, fn);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + type, fn);
  }
}

// 兼容所有浏览器的 解除绑定事件的函数
// 参数：事件源，事件类型，事件函数
function removeEvent(ele, type, fn) {
  // 浏览器能力检测
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent("on" + type, fn);
  }
}
```

  </CodeGroupItem>
</CodeGroup>

## 4.高级无缝滚动轮播图

<CodeGroup>
  <CodeGroupItem title="HTML" active>

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .scroll {
        position: relative;
        width: 830px;
        height: 130px;
        border: 10px solid #000;
        margin: 100px auto;
        overflow: hidden;
      }

      .scroll .inner {
        position: relative;
        width: 5000px;
      }

      .scroll ul {
        position: absolute;
        top: 0;
        left: 0;
        height: 130px;
        list-style: none;
      }

      .scroll ul li {
        float: left;
        margin-right: 10px;
      }
    </style>
  </head>

  <body>
    <div class="scroll" id="scroll">
      <div class="inner">
        <ul id="munit">
          <li><img src="images/shuzi/0.png" alt="" /></li>
          <li><img src="images/shuzi/1.png" alt="" /></li>
          <li><img src="images/shuzi/2.png" alt="" /></li>
          <li><img src="images/shuzi/3.png" alt="" /></li>
          <li><img src="images/shuzi/4.png" alt="" /></li>
          <li><img src="images/shuzi/5.png" alt="" /></li>
          <li><img src="images/shuzi/6.png" alt="" /></li>
        </ul>
      </div>
    </div>
    <script src="common.js"></script>
    <script>
      // 获取元素
      var scroll = my$("scroll");
      var munit = my$("munit");
      // 2.折返点计算需要通过 js 自动计算
      var back = -munit.offsetWidth;
      console.log(back);
      // 1.自动生成另一组对应的图片结构 li
      munit.innerHTML = munit.innerHTML + munit.innerHTML;
      // 自己进行滚动播放
      var nowLeft = 0;
      var timer;
      timer = setInterval(run, 5);
      // 3.鼠标移上 scroll 元素，让运动停止
      scroll.onmouseover = function() {
        clearInterval(timer);
      };
      // 4.鼠标离开 scroll 元素，让运动重新开始
      scroll.onmouseout = function() {
        timer = setInterval(run, 5);
      };

      // 运动函数
      function run() {
        // nowLeft 进行自减
        nowLeft -= 1;
        // 每次都要判断，是否走到了折返点，如果走到了，让他瞬间切换到 0
        if (nowLeft <= back) {
          nowLeft = 0;
        }
        // 给ul 赋值
        munit.style.left = nowLeft + "px";
      }
    </script>
  </body>
</html>
```

  </CodeGroupItem>

  <CodeGroupItem title="common.js" >

```js
// 定义一个获取元素的函数
function my$(id) {
  return document.getElementById(id);
}

// DOM 2 级事件绑定方式
// 自己制作一个兼容所有浏览器的绑定事件的函数
// 参数：事件源，事件类型，事件函数
function addEvent(ele, type, fn) {
  // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
  // IE 9 以下的浏览器，使用 attachEvent 方法
  // 浏览器能力检测
  if (ele.addEventListener) {
    ele.addEventListener(type, fn);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + type, fn);
  }
}

// 兼容所有浏览器的 解除绑定事件的函数
// 参数：事件源，事件类型，事件函数
function removeEvent(ele, type, fn) {
  // 浏览器能力检测
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent("on" + type, fn);
  }
}
```

  </CodeGroupItem>
</CodeGroup>

## 5.完整切换效果轮播图

<img src="/images/Javascript/carousel.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

<CodeGroup>
  <CodeGroupItem title="HTML" active>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      ul,
      ol {
        list-style: none;
      }
      .carousel {
        position: relative;
        width: 880px;
        height: 550px;
        border: 1px solid #333;
        margin: 50px auto;
      }
      .pic li {
        position: absolute;
        left: 0;
        top: 0;
        width: 880px;
        height: 550px;
        display: none;
      }
      .pic li.current {
        display: block;
      }
      .btn a {
        position: absolute;
        top: 50%;
        width: 80px;
        height: 80px;
        margin-top: -40px;
        background-color: rgba(255, 255, 255, 0.3);
        text-decoration: none;
        color: #444;
        text-align: center;
        line-height: 80px;
        font-size: 60px;
        font-family: "SimSun";
      }
      .btn .left {
        left: 10px;
      }
      .btn .right {
        right: 10px;
      }
      .btn a:hover {
        background-color: rgba(255, 255, 255, 0.7);
      }
      .sub {
        position: absolute;
        bottom: 30px;
        left: 50%;
        width: 200px;
        height: 40px;
        margin-left: -100px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.3);
      }
      .sub li {
        float: left;
        width: 20px;
        height: 20px;
        margin: 10px;
        border-radius: 50%;
        background-color: #ccc;
        cursor: pointer;
      }
      .sub li.current {
        background-color: #0ff;
      }
    </style>
  </head>
  <body>
    <div class="carousel" id="carousel">
      <ul class="pic" id="pic">
        <li class="current"><img src="images/lunbo/01.jpg" alt="" /></li>
        <li><img src="images/lunbo/02.jpg" alt="" /></li>
        <li><img src="images/lunbo/03.jpg" alt="" /></li>
        <li><img src="images/lunbo/04.jpg" alt="" /></li>
        <li><img src="images/lunbo/05.jpg" alt="" /></li>
      </ul>
      <div class="btn" id="btn">
        <a href="javascript:;" class="left" id="leftbtn">&lt;</a>
        <a href="javascript:;" class="right" id="rightbtn">&gt;</a>
      </div>
      <ol class="sub" id="sub">
        <li class="current"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ol>
    </div>
    <script src="common.js"></script>
    <script>
      // 编程思路：信号量编程，通过一个全局变量的信号量，在不同的事件函数中进行信息传递，让多个事件进行协同作业
      // 1.获取元素
      var carousel = my$("carousel");
      var ul = my$("pic");
      var ulLis = ul.children;
      var leftbtn = my$("leftbtn");
      var rightbtn = my$("rightbtn");
      var ol = my$("sub");
      var olLis = ol.children;
      // 全局信号量，存储的是要展示的图片所在 li 的下标
      var idx = 0;
      // 2.右按钮事件，切换到下一张
      rightbtn.onclick = rightHandle;
      // 3.左按钮事件，切换到上一张
      leftbtn.onclick = function() {
        // 信号量自减
        idx--;
        // 判断 idx 是否是超过最小的下标，如果是，就相当于从第一张要切换到最后一张
        if (idx < 0) {
          idx = ulLis.length - 1;
        }
        // 调用一个切换函数
        change();
      };
      // 4.下标小圆点事件，点哪个小圆点，对应展示图片
      for (var i = 0; i < olLis.length; i++) {
        // 存储自己的下标
        olLis[i].index = i;
        // 给每个小圆点添加点击事件，然后获取对应下标，赋值给信号量
        olLis[i].onclick = function() {
          // 获取当前点击的元素的下标
          // this.index
          idx = this.index;
          // 调用一个切换函数
          change();
        };
      }
      // 5.轮播图自动播放,执行类似右按钮的事件
      var timer;
      timer = setInterval(rightHandle, 3000);
      // 6.鼠标移上轮播图，停止自动轮播
      carousel.onmouseover = function() {
        clearInterval(timer);
      };
      // 7.鼠标离开轮播图，重新开始自动轮播
      carousel.onmouseout = function() {
        timer = setInterval(rightHandle, 3000);
      };
      // 定义 右按钮事件函数
      function rightHandle() {
        // 信号量自加
        idx++;
        // 判断 idx 是否是超过最大的下标，如果是，就相当于从最后一张要切换到第一张
        if (idx > ulLis.length - 1) {
          idx = 0;
        }
        // 调用一个切换函数
        change();
      }
      // 定义切换函数
      function change() {
        // 排他思想
        // 对应控制
        // 让所有 li 标签清除类名
        for (var i = 0; i < ulLis.length; i++) {
          ulLis[i].className = "";
          olLis[i].className = "";
        }
        // 保留自己
        ulLis[idx].className = "current";
        olLis[idx].className = "current";
      }
    </script>
  </body>
</html>
```

  </CodeGroupItem>

  <CodeGroupItem title="common.js">

```js
// 定义一个获取元素的函数
function my$(id) {
  return document.getElementById(id);
}

// DOM 2 级事件绑定方式
// 自己制作一个兼容所有浏览器的绑定事件的函数
// 参数：事件源，事件类型，事件函数
function addEvent(ele, type, fn) {
  // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
  // IE 9 以下的浏览器，使用 attachEvent 方法
  // 浏览器能力检测
  if (ele.addEventListener) {
    ele.addEventListener(type, fn);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + type, fn);
  }
}

// 兼容所有浏览器的 解除绑定事件的函数
// 参数：事件源，事件类型，事件函数
function removeEvent(ele, type, fn) {
  // 浏览器能力检测
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent("on" + type, fn);
  }
}
```

  </CodeGroupItem>
</CodeGroup>

## 6.返回顶部特效

```
backtop
    ├─── index.html
    ├─── css
    ├─── images
    │    └── content.png
    └─── js
         ├── common.js
         └── index.js
```

- 获取页面纵坐标卷动的距离
  - 方法一：document.body.scrollTop 在谷歌有兼容性问题
  - 方法二 document.documentElement.scrollTop

::: warning 注意
  documentElement 对应的是 html 标签，而 body 对应的是 body 标签
:::

<CodeGroup>
<CodeGroupItem title="index.html" active>

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title></title>
    <link rel="stylesheet" href="css/main.css" />
  </head>
  <body>
    <div id="wrap">
      <div id="top" class="header" data-reactid=".0.0">
        <div class="wrapper clearfix" data-reactid=".0.0.0">
          <a class="logo" href="/p/index.html" data-reactid=".0.0.0.0"></a>
          <div class="search-box" data-reactid=".0.0.0.1">
            <input type="text" value="" data-reactid=".0.0.0.1.0" />
            <div class="search-btn" data-reactid=".0.0.0.1.1"></div>
            <div class="hot-words" data-reactid=".0.0.0.1.2">
              <a data-reactid=".0.0.0.1.2.$0">趣味测试</a
              ><a data-reactid=".0.0.0.1.2.$1">魁拔</a
              ><a data-reactid=".0.0.0.1.2.$2">迪丽热巴</a>
              <a data-reactid=".0.0.0.1.2.$3">吴亦凡</a
              ><a data-reactid=".0.0.0.1.2.$4">鹿晗</a>
            </div>
          </div>
          <div class="user-wrapper" data-reactid=".0.0.0.2">
            <div class="login-wrap" data-reactid=".0.0.0.2.0">
              <a
                class="btn-login"
                href="javascript:void(0)"
                data-reactid=".0.0.0.2.0.0"
                >登录</a
              >
            </div>
          </div>
          <div class="links" data-reactid=".0.0.0.3">
            <div
              class="slide-down-container admin-links"
              data-reactid=".0.0.0.3.1"
            >
              <div class="title" data-reactid=".0.0.0.3.1.0">
                <span data-reactid=".0.0.0.3.1.0.0"></span
                ><span class="title-span" data-reactid=".0.0.0.3.1.0.1"
                  >部落管理</span
                >
                <i class="slide-down-icon" data-reactid=".0.0.0.3.1.0.2"></i>
              </div>
              <ul class="slide-down-content" data-reactid=".0.0.0.3.1.1">
                <li data-reactid=".0.0.0.3.1.1.$=10">
                  <a
                    target="_blank"
                    href="/buluoadmin/home.html"
                    data-reactid=".0.0.0.3.1.1.$=10.0"
                    >运营平台</a
                  >
                </li>
                <li data-reactid=".0.0.0.3.1.1.$=11">
                  <a
                    target="_blank"
                    href="/apply.html"
                    data-reactid=".0.0.0.3.1.1.$=11.0"
                    >创建部落</a
                  >
                </li>
              </ul>
            </div>
            <div
              class="slide-down-container help-links"
              data-reactid=".0.0.0.3.2"
            >
              <div class="title" data-reactid=".0.0.0.3.2.0">
                <span data-reactid=".0.0.0.3.2.0.0"></span
                ><span class="title-span" data-reactid=".0.0.0.3.2.0.1"
                  >帮助</span
                >
                <i class="slide-down-icon" data-reactid=".0.0.0.3.2.0.2"></i>
              </div>
              <ul class="slide-down-content" data-reactid=".0.0.0.3.2.1">
                <li data-reactid=".0.0.0.3.2.1.$=10">
                  <a
                    target="_blank"
                    href="/tribe.html"
                    data-reactid=".0.0.0.3.2.1.$=10.0"
                    >部落简介</a
                  >
                </li>
                <li data-reactid=".0.0.0.3.2.1.$=11">
                  <a
                    target="_blank"
                    href="http://kf.qq.com/product/buluo.html"
                    data-reactid=".0.0.0.3.2.1.$=11.0"
                    >帮助中心</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="cls" id="content">
        <img src="images/content.png" width="100%" />
      </div>
      http://buluo.qq.com/p/detail.html?bid=17266&pid=9498777-1455945612&from=grp_sub_obj
    </div>
    <div class="to-top" id="totop"></div>
    <script src="js/common.js"></script>
    <script src="js/index.js"></script>
  </body>
</html>
```

  </CodeGroupItem>

  <CodeGroupItem title="index.js" >

```js
// 获取页面纵坐标卷动的距离
// 方法一：document.body.scrollTop 在谷歌有兼容性问题
// 方法二：document.documentElement.scrollTop
// 注意：documentElement 对应的是 html 标签，而 body 对应的是 body 标签

// 获取元素
var header = my$("top");
var backtop = my$("totop");
// 1.在页面往下卷动到一定距离后，让 header 高度变低，让 返回顶部按钮出现
// 添加页面滚动事件
window.onscroll = function() {
  // 判断卷动走的距离，如果超过 10 px，就让 header 变低，让 返回顶部按钮出现
  var scrollTops = document.documentElement.scrollTop || document.body.scrollTop;
  console.log("使用的是：" + scrollTops);
  if (scrollTops > 10) {
    header.className = "header fixed";
    backtop.style.display = "block";
  } else {
    header.className = "header";
    backtop.style.display = "none";
  }

  // console.log(document.documentElement.scrollTop);
};
// 变量存储定时器
var timer;
// 2.点击返回顶部，让页面以动画的方式跳转到页面顶部
backtop.onclick = function() {
  // 终点
  var target = 0;
  // 起始点
  var current = scrollTops;
  // 步长
  var step = 30;
  timer = setInterval(function() {
    // 获取当前卷动的值，每次递减一个步长
    current -= step;
    // 停止定时器
    if (current <= target) {
      current = target;
      clearInterval(timer);
    }
    // 重新赋值
    scrollTops = current;
  }, 10);
};
```

  </CodeGroupItem>

  <CodeGroupItem title="common.js" >

```js
// 定义一个获取元素的函数
function my$(id) {
  return document.getElementById(id);
}

// DOM 2 级事件绑定方式
// 自己制作一个兼容所有浏览器的绑定事件的函数
// 参数：事件源，事件类型，事件函数
function addEvent(ele, type, fn) {
  // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
  // IE 9 以下的浏览器，使用 attachEvent 方法
  // 浏览器能力检测
  if (ele.addEventListener) {
    ele.addEventListener(type, fn);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + type, fn);
  }
}

// 兼容所有浏览器的 解除绑定事件的函数
// 参数：事件源，事件类型，事件函数
function removeEvent(ele, type, fn) {
  // 浏览器能力检测
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent("on" + type, fn);
  }
}
```

  </CodeGroupItem>
</CodeGroup>

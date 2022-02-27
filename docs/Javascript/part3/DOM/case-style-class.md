# 案例：用style 与 class 属性制作

## 开关灯

<img src="/images/Javascript/light.gif" style="width: 60%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="关灯" id="btn" />
    <script src="common.js"></script>
    <script>
      // 获取元素
      var btn = my$("btn");
      // console.log(btn);
      // 思路一：定义一个判断变量，true 表示开灯状态，false 表示关灯状态
      // var isOpen = true;
      // 点击事件，控制 body 的背景
      btn.onclick = function() {
        // 开灯时，需要点击后让它关灯并切换文字为 开灯
        // if (isOpen) {
        //   document.body.style.backgroundColor = "black";
        //   this.value = "开灯";
        //   isOpen = false;
        // } else {
        //   document.body.style.backgroundColor = "white";
        //   this.value = "关灯";
        //   isOpen = true;
        // }
        // 思路二：直接使用 btn 的 value 值进行判断
        if (this.value === "关灯") {
          document.body.style.backgroundColor = "black";
          this.value = "开灯";
        } else {
          document.body.style.backgroundColor = "white";
          this.value = "关灯";
        }
      };
    </script>
  </body>
</html>
```

## 隐藏显示二维码

- onmouseover
- onmouseout
- [replace()方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

<img src="/images/Javascript/QRcode.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title></title>
    <style>
      .box {
        width: 50px;
        height: 50px;
        background: url(images/bgs.png) no-repeat -159px -51px;
        position: fixed;
        right: 10px;
        top: 40%;
      }
      .erweima {
        position: absolute;
        top: 0;
        left: -150px;
      }
      .box a {
        display: block;
        width: 50px;
        height: 50px;
      }
      .hide {
        display: none;
      }
      .show {
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="box" id="box">
      <div class="erweima hide" id="er">
        <img src="images/456.png" alt="" />
      </div>
    </div>
    <script src="common.js"></script>
    <script>
      // 获取元素
      var box = my$("box");
      var er = my$("er");
      // 给 box 添加鼠标移上事件 onmouseover ，添加鼠标离开事件 onmouseout
      box.onmouseover = function() {
        // 让子级元素进行显示，就是将 hide 改为 show
        // er.className = "erweima show";
        er.className = er.className.replace("hide", "show");
      };
      box.onmouseout = function() {
        // 让子级元素进行隐藏，就是将 show 改为 hide
        // er.className = "erweima hide";
        er.className = er.className.replace("show", "hide");
      };
    </script>
  </body>
</html>
```

## 排他思想-高亮显示输入的文本框

<img src="/images/Javascript/exclusive.gif" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/Javascript/JD.gif" style="width: 50%; display:inline-block; margin: 0 ;">

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
    <input type="text" /><br />
    <input type="text" /><br />
    <input type="text" /><br />
    <input type="text" /><br />
    <input type="text" /><br />
    <input type="text" /><br />
    <input type="text" /><br />
    <button id="btn">按钮</button>
    <script>
      // 获取元素
      var txts = document.getElementsByTagName("input");
      // 添加批量的获取焦点事件
      for (var i = 0; i < txts.length; i++) {
        // 排他思想：1.排除其他 2.保留自己

        // 给每一个input标签添加获取焦点事件
        txts[i].onfocus = function() {
          // 排除其他的方法：将所有的项包含自己都设置为默认样式
          // 遍历数组，让所有的样式恢复默认
          for (var j = 0; j < txts.length; j++) {
            txts[j].style.backgroundColor = "";
          }
          // 设置元素自己高亮显示
          // 保留自己的特殊样式
          // this 指代事件源自己
          this.style.backgroundColor = "yellow";
        };
      }
    </script>
  </body>
</html>
```

## 设置元素的大小和位置

<img src="/images/Javascript/position.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      div {
        width: 100px;
        height: 100px;
        background-color: pink;
      }
      .new {
        position: absolute;
        width: 200px;
        height: 200px;
        left: 200px;
        top: 200px;
      }
    </style>
  </head>
  <body>
    <input type="button" value="按钮" id="btn" />
    <div id="box"></div>
    <script src="common.js"></script>
    <script>
      //获取元素
      var btn = my$("btn");
      var box = my$("box");
      // 添加事件
      btn.onclick = function() {
        // 修改类名
        // box.className = "new";
        // 修改 style 样式对象中的属性
        box.style.width = "200px";
        box.style.height = "200px";
        box.style.left = "200px";
        box.style.top = "200px";
        box.style.position = "absolute";
      };
    </script>
  </body>
</html>
```

## 隔行变色和高亮显示

<img src="/images/Javascript/color.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      td {
        width: 100px;
        height: 40px;
      }
    </style>
  </head>
  <body>
    <table border="1" style="border-collapse: collapse;">
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>

    <script>
      // 获取所有的行
      var trs = document.getElementsByTagName("tr");
      // 1.隔行变色
      for (var i = 0; i < trs.length; i++) {
        // 下标为偶数的行显示粉色
        // 下标为奇数的行显示灰色
        if (i % 2 == 0) {
          trs[i].style.backgroundColor = "pink";
        } else {
          trs[i].style.backgroundColor = "lightgray";
        }
        // 2.鼠标移上高亮显示，鼠标离开恢复默认
        // 全局变量
        var bgc;
        // 鼠标移上高亮显示
        trs[i].onmouseover = function() {
          // 定义变量记录 tr 原来的颜色
          bgc = this.style.backgroundColor;
          this.style.backgroundColor = "skyblue";
        };
        // 鼠标离开恢复默认
        trs[i].onmouseout = function() {
          this.style.backgroundColor = bgc;
        };
      }
    </script>
  </body>
</html>
```

## 对应控制思想-tab 切换

- 排他思想
- 对应控制思想

<img src="/images/Javascript/tab.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```html{69-70}
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
      ul {
        list-style-type: none;
      }
      .box {
        width: 400px;
        height: 300px;
        border: 1px solid #ccc;
        margin: 100px auto;
        overflow: hidden;
      }
      .hd {
        height: 45px;
      }
      .hd span {
        display: inline-block;
        width: 90px;
        background-color: pink;
        line-height: 45px;
        text-align: center;
        cursor: pointer;
      }
      .hd span.current {
        background-color: skyblue;
      }
      .bd div {
        height: 255px;
        background-color: skyblue;
        display: none;
      }
      .bd div.current {
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="hd" id="hd">
        <span class="current">体育</span>
        <span>娱乐</span>
        <span>新闻</span>
        <span>综合</span>
      </div>
      <div class="bd" id="bd">
        <div class="current">我是体育模块</div>
        <div>我是娱乐模块</div>
        <div>我是新闻模块</div>
        <div>我是综合模块</div>
      </div>
    </div>
    <script src="common.js"></script>
    <script>
      // 获取元素
      var hd = my$("hd");
      var spans = hd.getElementsByTagName("span");
      var bd = my$("bd");
      var divs = bd.getElementsByTagName("div");
      // 鼠标移上某个 span 让它添加一个类名，其他的失去类名
      for (var i = 0; i < spans.length; i++) {
        // 给每一个 span 元素添加一个新的属性，记录自己在数组中的下标
        spans[i].index = i;
        spans[i].onmouseover = function() {
          // console.dir(this);
          // 1.让 span 自己进行切换
          // 排他思想：
          // 排除其他
          for (var j = 0; j < spans.length; j++) {
            spans[j].className = "";
            // 由于 divs 中数据个数与 spans 一样，所以可以再同一个遍历循环中，进行排他操作
            divs[j].className = "";
          }
          // 保留自己
          this.className = "current";
          // console.log(this.index);
          // 2.让 bd 中的 div 也对应进行切换
          // 对应控制思想：有两组数据中存储了相同个数的元素对象，一组对象的变化，会引起另外一组的变化
          // 实现方法：找两个数据中的共同点，两个数组中元素对象的下标是一样的
          // 对应控制中也会涉及到排他的操作
          // 保留 div 自己的类名
          divs[this.index].className = "current";
        };
      }
    </script>
  </body>
</html>
```

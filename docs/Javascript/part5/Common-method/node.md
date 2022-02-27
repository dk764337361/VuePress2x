# 关系查找方法

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

      .box {
        width: 1000px;
        height: 80px;
        border: 1px solid #333;
        margin-top: 10px;
      }

      .box p,
      .box h2 {
        float: left;
        width: 80px;
        height: 80px;
        margin-right: 20px;
        background-color: #ccc;
      }
    </style>
  </head>

  <body>
    <div class="box">
      <p>p</p>
      <p>p</p>
      <p>p</p>
      <p>p</p>
      <h2>h2</h2>
      <h2>h2</h2>
      <h2>h2</h2>
    </div>
    <div class="box">
      <p>p</p>
      <p>p</p>
      <p>p</p>
      <p>p</p>
      <h2>h2</h2>
      <h2>h2</h2>
      <h2>h2</h2>
    </div>
    <div class="box">
      <p>p</p>
      <p>p</p>
      <p>p</p>
      <p>p</p>
      <h2>h2</h2>
      <h2>h2</h2>
      <h2>h2</h2>
    </div>

    <script src="js/jquery-1.12.4.min.js"></script>
  </body>
</html>
```

## \$(this) 自己

- 在原生的 DOM 操作中，事件函数内部有一个 this 关键字指向的就是触发事件的事件源，在 jQuery 中将 this 关键字传递给 \$() 方法，得到就是指向自己的 jQuery 对象，就可以使用 JQ 的方法。

## parent() 父级

- jQuery 对象都有一个 parent() 方法，得到的是自己的父亲级。
- 父级得到的也是一个 jQuery 对象，直接继续打点调用 JQ 方法和属性。

## children() 子级

- jQuery 对象内部有一个 children() 方法，可以得到自己的所有子级元素组成的 jQuery 对象。
- 得到的子级组成的 jQuery 对象可以继续调用 JQ 方法和属性。
- 获得子级时，不限制标签类型。
- children() 可以传参数：参数是字符串格式的选择器，在选中所有子级的情况下，保留满足选择器的部分，进行了二次选择。

## siblings() 兄弟

- jQuery 对象通过调用 siblings() 方法可以得到除了自己以外的所有同级元素（兄弟）组成 jQuery 对象，找到的只能是亲的兄弟，不能是叔叔家的兄弟。
- 得到 jQuery 对象可以继续使用 JQ 的方法和属性。
- siblings() 方法得到的 jQuery 对象可以进行二次选择，通过给参数传递字符串格式的选择器。

```js
// 获取所有的 p 标签
var $ps = $("p");
var $box = $(".box");

// 批量添加事件
$ps.click(function() {
  // 让点击的自己 颜色变红色
  // this 指向的是触发事件的事件源的原生 JS 对象
  // 需要转换成 jQuery对象
  // $(this).css("background-color","red")

  // 找到事件源的 父级元素，添加黄色背景
  // $(this).parent().css("background-color","yellow")

  // 查找兄弟元素
  // $(this).siblings().css("background-color","skyblue")
  $(this)
    .siblings("h2")
    .css("background-color", "skyblue");
});

// 通过点击 div 获取它的子级元素
// $box.click(function () {
//   // 获取子级
//   // $(this).children().css("background-color","pink")
//   // 添加参数后，会按照指定的选择器在子级中进行二次选择
//   $(this).children("p").css("background-color","pink")
// })
```

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

      .box {
        width: 1000px;
        height: 80px;
        border: 1px solid #333;
        margin-top: 10px;
        background-color: #fff;
      }

      .box p,
      .box span {
        float: left;
        width: 80px;
        height: 80px;
        margin-right: 20px;
        background-color: #ccc;
      }
      .box span {
        background-color: pink;
      }
    </style>
  </head>

  <body>
    <div class="box" id="box1">
      <p></p>
      <p></p>
      <p></p>
      <p>
        <!-- <span></span> -->
      </p>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <script src="js/jquery-1.12.4.min.js"></script>
  </body>
</html>
```

## find() 后代元素

- jQuery 对象可以利用 find() 方法，传递一个参数，参数部分规定的选择器，查找范围是 jQuery 对象的所有后代。
- 参数是字符串格式的选择器。

```js
// 获取元素
var $box1 = $("#box1");
var $box = $(".box");
var $child = $box.children();
// find() 方法查找后代中的 span 元素
$box1.find("span").css({
  width: 50,
  height: 50,
});

// 兄弟元素查找
// next() 下一个兄弟
// prev() 上一个兄弟
// nextAll() 后面所有兄弟
// prevAll() 前面所有兄弟

// parents() 查找包含body在内的祖先级
$child.click(function() {
  // 让自己变红色，让下一个兄弟变粉色
  // $(this).css("background-color", "red")
  // .next().css("background-color", "skyblue")
  // 让自己变红色，让上一个兄弟变蓝色
  // $(this).css("background-color", "red")
  // .prev().css("background-color", "blue")
  // 让自己变红色，让前面所有兄弟变蓝色，让后面所有兄弟变黄色
  // $(this).css("background-color", "red")
  // .prevAll().css("background-color", "blue")
  // $(this).nextAll("p").css("background-color", "yellow")

  // 让自己变红色，祖先级变天蓝色
  $(this)
    .css("background-color", "red")
    .parents("div")
    .css("background-color", "skyblue");
});
```

## 兄弟元素

- 紧邻的兄弟元素方法
  - next() 下一个兄弟
  - prev() 前一个兄弟
- 多选方法
  - nextAll() 后面所有兄弟
  - prevAll() 前面所有兄弟
  - 通过传递参数可以进行二次选择，参数是字符串格式的选择器，在前面或后面兄弟中选中符合选择器规定的部分。

```js
// 获取元素
var $box1 = $("#box1");
var $box = $(".box");
var $child = $box.children();

// 兄弟元素查找
// next() 下一个兄弟
// prev() 上一个兄弟
// nextAll() 后面所有兄弟
// prevAll() 前面所有兄弟

// parents() 查找包含body在内的祖先级
$child.click(function() {
  // 让自己变红色，让下一个兄弟变粉色
  // $(this).css("background-color", "red")
  // .next().css("background-color", "skyblue")
  // 让自己变红色，让上一个兄弟变蓝色
  // $(this).css("background-color", "red")
  // .prev().css("background-color", "blue")
  // 让自己变红色，让前面所有兄弟变蓝色，让后面所有兄弟变黄色
  // $(this).css("background-color", "red")
  // .prevAll().css("background-color", "blue")
  // $(this).nextAll("p").css("background-color", "yellow")

  // 让自己变红色，祖先级变天蓝色
  $(this)
    .css("background-color", "red")
    .parents("div")
    .css("background-color", "skyblue");
});
```

## parents() 祖先级

通过该方法得到的是指定对象的包含 body 在内的所有祖先级元素组成的 jQuery 对象。

- 通过传参进行二次选择，参数位置是字符串格式的选择器

```js
// 获取元素
var $box1 = $("#box1");
var $box = $(".box");
var $child = $box.children();

// parents() 查找包含body在内的祖先级
$child.click(function() {
  // 让自己变红色，祖先级变天蓝色
  $(this)
    .css("background-color", "red")
    .parents("div")
    .css("background-color", "skyblue");
});
```

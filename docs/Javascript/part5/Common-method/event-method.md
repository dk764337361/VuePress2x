# 常用事件方法

- jQuery 对象封装了一系列的事件方法。
- 事件方法与原生 JS 事件方法名称类似，不需要写 on。
- 事件方法需要 jQuery 对象打点调用，小括号内的参数是事件函数。
  - 例如点击事件：click() 方法。

## mouseenter() 鼠标移入

<Badge type="danger" text="JQuery 中自己的事件方法。" vertical="bottom" />

- 鼠标进入一个元素触发的事件。

## mouseleave() 鼠标移出

<Badge type="danger" text="JQuery 中自己的事件方法。" vertical="bottom" />

- 鼠标离开一个元素触发的事件。

### 对比

::: warning 注意
mouseenter 和 mouseleave 没有事件冒泡。在使用时替换 mouseover 和 mouseout 更加合适。
:::


## hover() 方法
- hover 事件相当于将 mouseoenter 和 mouseleave 事件进行了合写。
- 参数：有两个参数，第一个参数是鼠标移上执行的事件函数，第二个参数是鼠标离开执行事件函数。

## 举例
### 给box切换demo 的类名，从而改变背景颜色  
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      #parents {
        width: 200px;
        height: 200px;
        background-color: yellowgreen;
      }
      .box {
        width: 100px;
        height: 100px;
        background-color: pink;
      }
      .demo {
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <input type="button" value="切换" id="btn1" />
    <div id="parents">
      <div id="box" class="box"></div>
    </div>

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 给 box 切换 demo 的类名，从而改变背景颜色
      var $box = $("#box");
      var $btn1 = $("#btn1");
      var $parents = $("#parents");

      // 添加事件，使用 自己对象的方法
      // $btn1.click(function () {
      //   $box.toggleClass("demo")
      // })

      // hover() 方法，对mouseenter 和 mouseleave 进行了合并书写
    //   $box.hover(
    //     function() {
    //       // 鼠标移入
    //       $box.addClass("demo");
    //     },
    //     function() {
    //       // 鼠标离开
    //       $box.removeClass("demo");
    //     }
    //   );

      // jQuery 中增加了自己的事件类型：mouseenter 和 mouseleave
      // 没有事件冒泡
      $box.mouseenter(function() {
        // 鼠标进入元素，触发事件
        console.log("box-mouse-in");
      });

      $box.mouseleave(function() {
        // 鼠标离开元素，触发事件
        console.log("box-mouse-out");
      });
      $parents.mouseenter(function() {
        // 鼠标进入元素，触发事件
        console.log("parents-mouse-in");
      });

      $parents.mouseleave(function() {
        // 鼠标离开元素，触发事件
        console.log("parents-mouse-out");
      });

      //原生JS的 mouseover 和 mouseout ：有事件冒泡
      // $box.mouseover(function () {
      //   // 鼠标进入元素，触发事件
      //   console.log("box-mouse-in")
      // })

      // $box.mouseout(function () {
      //   // 鼠标离开元素，触发事件
      //   console.log("box-mouse-out")
      // })
      // $parents.mouseover(function () {
      //   // 鼠标进入元素，触发事件
      //   console.log("parents-mouse-in")
      // })

      // $parents.mouseout(function () {
      //   // 鼠标离开元素，触发事件
      //   console.log("parents-mouse-out")
      // })
    </script>
  </body>
</html>
```

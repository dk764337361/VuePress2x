# each() 遍历

jQuery 对象进行的操作都是批量操作，批量操作只能执行一些简单的效果。

如果想对 JQ 对象中的每一个元素以及内部的后代元素进行一些复杂操作，程序很难执行

- 参数是一个函数。
- 作用：就是对 jQuery 对象中的元素每一个都执行函数内部的操作。
- each 方法的基本原理就是 for 循环，从对象的下标为 0 的项一直遍历到最后一项，然后对每一项进行操作。

## 优点 1

- each 的函数内部，也有一个 this，指向的是进来遍历的每一次的元素。
- 案例：让每一个 div 内部的第二个元素变红。
<img src="/images/Javascript/JQ/03.jpg" style="width: 50%; display:block; margin: 0 ;">

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
      .box {
        width: 500px;
        height: 100px;
        border: 1px solid #000;
        margin-bottom: 10px;
      }
      .box p {
        float: left;
        width: 100px;
        height: 100px;
        margin-right: 10px;
        background-color: #ccc;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 选择所有的 box 元素
      var $box = $(".box");

      // 案例一：给每个 box 内部的第二个 p 添加红色
      //1.传统思路：
      // $box.children().eq(1).css("background","red");

      // 2.each()思路： each() 遍历
      // 将 jQuery 对象中的每一项单独拿出来进行操作
      $box.each(function() {
        // this 关键字，指向的是每一次遍历的元素对象
        // 就可以针对每一个元素进行单独操作
        $(this)
          .children()
          .eq(1)
          .css("background", "red");
      });
    </script>
  </body>
</html>
```

## 优点 2

- each 的函数可以传一个参数 i，i 表示的是这一次的遍历对象在整体的 jQuery 对象大排队中的下标位置。

<img src="/images/Javascript/JQ/each.gif" style="width: 100%; display:inline-block; margin: 0 ;">

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
      .box {
        width: 500px;
        height: 100px;
        border: 1px solid #000;
        margin-bottom: 10px;
      }
      .box p {
        float: left;
        width: 100px;
        height: 100px;
        margin-right: 10px;
        background-color: #ccc;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 选择所有的 box 元素
      var $box = $(".box");

      // 案例二：选择所有的 p 标签
      var $ps = $(".box p");
      // 添加点击事件
      // $ps.click(function () {
      // 	// 获取元素在自己的父级中 兄弟间的下标
      // 	console.log($(this).index())
      // })
      // 通过each 方法进行操作
      $ps.each(function(i) {
        // i 记录的是这一次遍历时当前元素在 jQuery 对象大排序中的位置
        $(this).click(function() {
          // 这个内部的this 就是事件源
          console.log(i);
          console.log($(this).index());
        });
      });
    </script>
  </body>
</html>
```

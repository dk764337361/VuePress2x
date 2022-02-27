# 排序方法

## eq() 大排序

- jQuery 中获得的对象，内部包含选择的一组原生 js 对象，在 jQuery 对象中会进行一个大的排序，这个排序与原来的 HTML 结构没有关系。
- eq() 方法在 jQuery 对象中通过下标获取某个对象，下标是 jQuery 对象中的大的排序的下标。

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
      <p class="cur"></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p class="cur"></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p class="cur"></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p class="cur"></p>
    </div>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 选择所有的 p 标签元素
      // var $ps = $("p");
      // 生成的 jQuery 对象，内部包含所有的原生 js 对象
      // jQuery 对象是一个类数组对象，内部所有的 数据会进行一个大的排序
      // 排序与自己原来的父级没有关系，只与 在 jQuery 对象中的新的位置有关
      // 重点体现在 eq()  方法中
      // 给指定位置的对象添加颜色
      // $ps.eq(1).css("background-color","red");
      // $ps.eq(6).css("background-color","red");
      // $ps.eq(9).css("background-color","red");
      // $ps.eq(11).css("background-color","red");

      // 通过类名选择标签
      $(".cur")
        .eq(2)
        .css("background-color", "red");
    </script>
  </body>
</html>
```

## index() 在兄弟中的排序

- jQuery 对象调用 index() 方法时，得到的是它自己在 HTML 结构中的兄弟中的下标位置。与
- jQuery 大排序没有关系。

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
      <p class="cur"></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p class="cur"></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p class="cur"></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p class="cur"></p>
    </div>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 选择所有的 p 标签元素
      var $ps = $("p");
      // index() 方法获取下标时，排序跟新生成的 jQuery 对象无关
      // 它依赖于自身元素在父级中同级元素之间的位置
      // 添加点击事件
      $ps.click(function() {
        // 点击输出自己的 index() 的值
        console.log($(this).index());
      });
    </script>
  </body>
</html>
```

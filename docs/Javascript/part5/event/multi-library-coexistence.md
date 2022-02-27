# 多库共存问题
## 关于 $ 冲突的问题
- 解决方案1：jQuery 中不使用 $,使用 jQuery
- 解决方案2：jQuery 库释放 $ 符合的使用权，用其他简单的符号代替
  - jQuery.noConflict(); 释放 $,把 $ 代表的函数返回给用户，用户可以用其他变量接收

- 自定义库other.js

```js
var $ = 123;
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button>按钮</button>
  <!-- 引入了一个 jQ 的库 -->
  <script src="js/jquery-1.12.4.min.js"></script>
  <!-- 又引入了另一个 other 库 -->
  <script src="js/other.js"></script>
  <script>
    // 使用多个库
    // 问题：后面的其他库中也有 $ 的标识符
    // $("button").click(function () {
    //   alert(1);
    // })

    // console.log($)

    // 解决方法1： 使用 jQuery 标识符进行调用
    // jQuery("button").click(function () {
    //   alert(1);
    // })

    // 解决方法2：释放 $ 符号
    var $1 = jQuery.noConflict();
    // console.log($1)
    $1("button").click(function () {
      alert(1);
    })
  </script>
</body>
</html>
```
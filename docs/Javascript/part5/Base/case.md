# 表格隔行变色案例

案例：比较原生 js 方法和 jQuery 方法制作表格的隔行变色。

<img src="/images/Javascript/JQ/02.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    p {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
    }
    table {
      border-collapse: collapse;
    }
    td {
      width: 100px;
      height: 50px;
    }
  </style>
</head>

<body>
  <table border="1">
    <tr>
      <td></td>
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
      <td></td>
    </tr>
    <tr>
      <td></td>
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
      <td></td>
    </tr>
    <tr>
      <td></td>
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
      <td></td>
    </tr>
    <tr>
      <td></td>
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
      <td></td>
    </tr>
    <tr>
      <td></td>
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
      <td></td>
    </tr>
  </table>
  <script src="js/jquery-1.12.4.min.js"></script>
  <script>
    // 原生方法
    // var trs = document.getElementsByTagName("tr");
    //遍历偶数
    // for (var i = 0 ; i < trs.length ; i+=2) {
    //   trs[i].style.backgroundColor = "skyblue"
    // }
    //遍历奇数
    // for (var i = 1 ; i < trs.length ; i+=2) {
    //   trs[i].style.backgroundColor = "skyblue"
    // }

    // jQuery的方法
    $("tr:even").css("background-color","yellowgreen")
  </script>
</body>

</html>
```
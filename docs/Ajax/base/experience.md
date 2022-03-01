# 体验 AJAX

- 使用 jQuery 中封装的 Ajax，快速体验带来的效果
- [jQuery官方免费数据测试接口](https://jsonplaceholder.typicode.com/)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // jQuery 中的 Ajax 方法
      $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        type: "GET",
        dataType: "json",
        // data: { id: 1 },//查询ID为1的数据
        success: function(data) {
          // 使用请求成功的数据
          console.log(data);
        },
      });
    </script>
  </head>
  <body></body>
</html>
```

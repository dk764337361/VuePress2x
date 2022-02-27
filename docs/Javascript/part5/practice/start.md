# 星星

<img src="/images/Javascript/JQ/start.gif" style="width: 50%; display:inline-block; margin: 0 ;">

## 写法一(老师)

```html
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="js/jquery-1.12.4.js"></script>
    <style>
      #dv span {
        font-size: 50px;
        width: 260px;
        background-color: #cccccc;
        color: Yellow;
        cursor: pointer;
      }
    </style>
    <script type="text/javascript">
      $(function() {
        // 定义是否被点击选中星星
        var isChecked = false;
        $("#dv>span")
          .mousemove(function() {
            if (!isChecked) {
              // 没被选中时，鼠标移上哪个 span ，让它和前面的 span 内容为 ★，后面的 span 内容为 ☆
              $(this)
                .text("★")
                .prevAll()
                .text("★")
                .end()
                .nextAll()
                .text("☆");
            }
          })
          .mouseout(function() {
            if (!isChecked) {
              // 鼠标离开后，如果没有点击选择，就让所有 span 内容恢复为 ☆
              $("#dv>span").text("☆");
            }
          })
          .click(function() {
            // 鼠标点击了某个 span，表示选择
            // 后期鼠标移上或离开，都会保持当前选中的状态
            isChecked = true;
          });
      });
    </script>
  </head>

  <body>
    <div id="dv">
      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
  </body>
</html>
```

## 写法二（自己）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/index.css" />
  </head>
  <body>
    <div class="start">
      <a href="#">☆</a>
      <a href="#">☆</a>
      <a href="#">☆</a>
      <a href="#">☆</a>
      <a href="#">☆</a>
    </div>
    <script src="lib/jquery-1.12.4.min.js"></script>
    <script src="lib/index.js"></script>
  </body>
</html>
```

```js
$(".start").on("mouseenter", "a", function() {
  $(this)
    .html("★")
    .prevAll()
    .html("★");
});
$(".start").on("mouseleave", "a", function() {
  $(this)
    .html("☆")
    .prevAll()
    .html("☆");
});
```

```css
.start {
  margin: 0 auto;
  background-color: rgb(204, 204, 203);
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.start a {
  text-decoration: none;
  color: yellow;
  width: 50px;
  height: 50px;
  font-size: 50px;
}
```

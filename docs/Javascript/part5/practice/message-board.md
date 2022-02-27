# 留言版

<img src="/images/Javascript/JQ/message-board.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 写法一(老师)

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="js/jquery-1.12.4.js"></script>
    <style type="text/css">
      #main {
        background-color: coral;
        margin: 0px auto;
        width: 500px;
      }

      #dv {
        /*position:relative;*/
        margin-left: 48px;
      }

      #btndv {
        margin-left: 422px;
      }

      .pContent {
        width: 422px;
        margin-left: 78px;
      }
    </style>
    <script type="text/javascript">
      $(function() {
        $("#btn").click(function() {
          //得到用户输入的昵称和内容
          var $nickname = $("#nickname").val();
          var $content = $("#content").val();
          // 获取匿名的复选框选中情况
          var $niname = $("#ni").prop("checked");
          // 根据选中情况，决定是否匿名
          if ($niname) {
            $nickname = "路人甲";
          }
          // 判断用户输入
          if ($nickname.length !== 0 && $content.length !== 0) {
            // 发表添加用户名和当前时间
            $("<p id='pName'></p>")
              .text($nickname + " " + new Date().toLocaleTimeString())
              .appendTo($("#main"));
            // 发表添加用户输入的内容
            $("<p class='pContent'></p>")
              .text($content)
              .appendTo($("#main"));
            //发表完毕之后，清空文本框中的内容
            $("#nickname").val("");
            $("#content").val("");
          } else {
            alert("昵称和内容不能为空");
          }
        });
      });
    </script>
  </head>

  <body>
    <div id="main">
      <label for="nickname">昵称：</label
      ><input type="text" name="nickname" id="nickname" />
      <div id="dv">
        <textarea id="content" cols="50" rows="10" maxlength="500"></textarea>
      </div>
      <div id="btndv">
        <input type="checkbox" value="匿名" id="ni" />匿名
        <input id="btn" type="button" value="发表" />
      </div>
      <hr style="border: 2px solid green" />
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
    <script src="lib/jquery-1.12.4.min.js"></script>
  </head>
  <body>
    <div class="box1">
      呢称：<input type="text" class="input1" /><br />
      内容：<input type="text" class="input2" /><br />
      <div class="last">
        <input type="checkbox" name="unkowname" class="checkbox" /><span
          >匿名</span
        >
        <input type="button" value="发表" class="button" />
      </div>
      <div class="box2"></div>
    </div>
    <script src="lib/index.js"></script>
  </body>
</html>
```

```js
//获取元素
var input1 = $(".input1");
var input2 = $(".input2");
var checkbox = $(".checkbox");
var button = $(".button");
var box2 = $(".box2");
var myDate = new Date();
var timer = "";
var h = myDate.getHours(); //获取当前小时数(0-23)
var m = myDate.getMinutes(); //获取当前分钟数(0-59)
var s = myDate.getSeconds(); //获取当前秒
var str = h + ":" + m + ":" + s;

button.click(() => {
  var name = input1.val();
  var content = input2.val();
  console.log(name);
  //判断早/中/晚
  if (h < 12) {
    timer = "上午";
  } else if (h < 18) {
    timer = "上午";
  } else {
    timer = "晚上";
  }
  //判断内容是否为空
  if (name === "" || content === "") {
    alert("昵称和内容不能为空");
  }
  //判断复选框是否被选上
  if (checkbox.is(":checked")) {
    console.log("被选中");
    name = "路人甲";
  } else {
    console.log("没被选中");
  }
  var newlist = $(
    '<div class="contentbox">' +
      "昵称：" +
      name +
      "<span>" +
      timer +
      str +
      "</span>" +
      '<div class="content">' +
      content +
      "</div>" +
      "</div>"
  );

  box2.append(newlist);
});
```

```css
.box1 {
  margin: 0 auto;
  background-color: rgb(204, 204, 203);
  width: 500px;
  height: 500px;
  position: relative;
}
.box1 .input2 {
  width: 400px;
  height: 200px;
}

.box1 .last {
  position: absolute;
  right: 40px;
  text-align: center;
}
.box1 .checkbox {
  width: 20px;
  height: 20px;
  vertical-align: sub;
}
.box1 .span {
  vertical-align: middle;
  display: inline-block;
}
.box1 .box2 {
  margin-top: 30px;
}
.box1 .box2 .contentbox {
  margin-top: 10px;
}
.box1 .box2 .contentbox span {
  margin-left: 10px;
}
.box1 .box2 .contentbox .content {
  margin-left: 110px;
  margin-top: 10px;
}
```

# 计算器

<img src="/images/Javascript/JQ/calculator.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="js/jquery-1.12.4.js"></script>
    <script type="text/javascript">
      $(function() {
        var result;
        // var select = $(".select");
        $("#btn").click(function() {
          // 获取运算符号
          var $oper = $("#operation>option:selected").text();
          //   var $oper = select.find("option:selected").val();

          // 获取操作数
          var val1 = parseFloat($("#num1").val());
          var val2 = parseFloat($("#num2").val());
          switch ($oper) {
            case "请选择":
              alert("请选择运算方式");
              break;
            case "+":
              result = val1 + val2;
              break;
            case "-":
              result = val1 - val2;
              break;
            case "*":
              result = val1 * val2;
              break;
            case "/":
              result = val1 / val2;
              break;
          }
          $("#result").val(result);
          //   $("#result").attr("value", result);
        });
      });
    </script>
  </head>

  <body>
    <input type="text" value="" id="num1" />
    <select id="operation">
      <option value="0" selected="selected">请选择</option>
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
    </select>
    <input type="text" value="" id="num2" />
    <input type="button" value="=" id="btn" />
    <input type="text" id="result" />
  </body>
</html>
```

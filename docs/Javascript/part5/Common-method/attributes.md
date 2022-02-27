# 操作标签的属性

## attr()和 removeAttr()方法

### attr()

- attr：全称 attribute，属性的意思。
- 作用：用来获取或者设置标签的属性值。
- 设置标签的属性
  - 语法：jQuery 对象.attr(name,value);
- 获取标签属性值
  - 语法：jQuery 对象.attr(name);

### removeAttr()

- 作用：移除标签的属性
- 语法：removeAttr(name);

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <img src="images/cat.jpg" alt="这是一只猫" hobby="fish" class="pic" />
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $pic = $(".pic");

      // 标签属性设置：需要传 2 个参数
      // $pic.attr("src","images/cat2.jpg")
      $pic.attr("hobby", "sleep");

      // 获取标签属性的值：需要 1 个参数
      console.log($pic.attr("alt"));
      console.log($pic.attr("hobby"));

      // 删除属性方法 removeAttr()
      $pic.removeAttr("hobby");
    </script>
  </body>
</html>
```

## prop() 方法

针对：selected、checked、disabled 等表单元素的属性。此类属性的属性值与属性名相同。
- 直接操作的就是布尔值

- 获取
  - 语法：\$('input').prop('属性名');
- 设置
  - 语法：\$('input').prop('属性名',值);

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="按钮" disabled="disabled" class="btn" /><br />
    <input type="checkbox" checked="checked" class="choose" /> 绘画
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $btn = $(".btn");
      var $choose = $(".choose");
      var btn = document.querySelector(".btn");

      // 获取 disabled 的属性值
      // console.log(btn.disabled)
      // console.log($btn.attr("disabled"))
      // console.log($btn[0].disabled)

      // prop() 方法，直接操作的就是布尔值
      console.log($btn.prop("disabled"));
      console.log($choose.prop("checked"));

      // 设置
      $btn.prop("disabled", false);
    </script>
  </body>
</html>
```

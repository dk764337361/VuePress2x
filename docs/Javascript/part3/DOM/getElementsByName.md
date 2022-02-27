# 根据 name 获取元素(不推荐)

- 方法：调用 document 对象的 getElementsByName 方法。
- 参数：字符串类型的 name 属性值。
- 返回值：name 属性值相同的元素对象组成的数组。
- 不建议使用：在 IE 和 Opera 中有兼容问题，会多选中 id 属性值相同的元素。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  
</head>
<body>
  <form>
    <input type="radio" name="age">0~10<br>
    <input type="radio" name="age">11~20<br>
    <input type="radio" name="age">20~30<br>
  </form>
  <div id="age">年龄</div>
  <script>
    // 通过标签的 name 属性获取元素
    var ages = document.getElementsByName("age");
    // NodeList  节点列表集合  类数组
    console.log(ages);
    // 兼容问题：在 IE 和 Opera中 有兼容问题，会多选中 id 属性值相同的部分
  </script>
</body>
</html>
```
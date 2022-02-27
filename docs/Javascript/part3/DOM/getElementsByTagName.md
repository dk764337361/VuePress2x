# 根据标签名获取元素

- 方法：调用 document 对象的 getElementsByTagName 方法。
- 参数：字符串类型的标签名。
- 返回值：同名的元素对象组成的数组。

```html
<p>text1</p>
<p>text2</p>
<p>text3</p>
<p>text4</p>
<div>div1</div>
<div>div2</div>
<div>div3</div>
<div>
  <p>text5</p>
</div>
```

::: warning 注意 1
操作数据时需要按照操作数组的方法进行。
:::

```js
console.log(divs);
// 通过标签名获取元素
var ps = document.getElementsByTagName("p");
console.log(ps);
// HTMLCollection  html 元素组成的集合 伪数组
// 操作室需要按照操作数组的方法进行
// 遍历数组
for (var i = 0; i <= ps.length - 1; i++) {
  // 输出每一项
  console.log(ps[i]);
}
ps[0].style.background = "pink";
```

::: warning 注意 2
getElementsByTagName 方法内部获取的元素是动态增加的：

`<script>`标签开始时写在`<body>`前，

开始时，数组并没有获取到具体数据，

等到 body 加载完，数据动态 push 到数组里。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 提前获取元素
      var divs = document.getElementsByTagName("div");
      console.log(divs); //HTMLCollection []
    </script>
  <body>
    <p>text1</p>
    <p>text2</p>
    <p>text3</p>
    <p>text4</p>
    <div>div1</div>
    <div>div2</div>
    <div>div3</div>
    <div>
      <p>text5</p>
    </div>
  </body>
</html>
```

<img src="/images/Javascript/getElementsByTagName.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
:::

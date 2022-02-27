# jQuery 对象

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    </style>
  </head>
  <body>
    <p>段落1</p>
    <p>段落2</p>
    <p>段落3</p>
    <p>段落4</p>
    <p>段落5</p>
    <p>段落6</p>
    <p>段落7</p>
    <p>段落8</p>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script></script>
  </body>
</html>
```
- \$() 方法获取到的内容叫做 jQuery 对象
- 内部封装了大量的属性和方法,比如 .css() 和 .html() 和 .animate() 等方法都是 jQuery 对象的方法。
- 通过 \$() 获取的元素是一组元素，进行操作时是批量操作。

```js
// 通过 $() 方法获取到的 是 JQ 对象
// 获取的是一组 html 的元素，会进行批量操作
$("p").css("background-color", "pink");
$("p").html("你好");
$("p").animate({ width: 300 }, 1000);
```
## jQuery 对象和原生 js 对象

- jQuery 对象得到后，只能使用 jQuery 对象的方法，不能使用原生 js 元素对象的方法。
- 原生 JS 对象也不能使用 jQuery 的方法。
- jQuery 对象实际是一个类数组对象，内部包含所有的获取的原生 js 对象，以及大量的 jQuery 的方法和属性。

```js
// jQuery 对象是不能使用原生 JS 对象的方法的
console.log($("p").innerHTML);
$("p").style.backgroundColor = "red";

// 原生 JS 对象也不能使用 JQ 对象的方法
var ps = document.getElementsByTagName("p");
ps[0].html("haha");
```
```js
// 打印输出一下 JQ 对象
console.log($("p"));
```

<img src="/images/Javascript/JQ/01.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## jQuery 对象中原生 js 对象的个数

- \$().length
- \$().size()

```js
// 获取 JQ 对象内部 原生 JS 对象的个数
console.log($("p").length);
console.log($("p").size());
```

## jQuery对象与原生js对象-互相转换

- jQuery 转原生：直接利用数组下标方式，得到 jQuery 封装的原生对象。
- 原生转 jQuery：将原生对象用 \$() 方法包裹即可。

```js
// JQ 对象转换为 原生 JS 对象
var $ps = $("p");
$ps[0].innerHTML = "你好";

// 原生 JS 对象 转换为 JQ 对象
var op = document.getElementsByTagName("p")[0];
$(op).css("background-color", "skyblue");
```

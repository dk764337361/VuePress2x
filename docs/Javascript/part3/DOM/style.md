# style 行内样式属性操作

## style 更改 css 的方法

1. 更改类名的方式去更改样式
2. 根据对象的 style 属性去操作样式

   ::: tip 总结
   style 更改 css 适用于更改`单条`css 样式
   :::

- 使用 style 属性方式设置的样式显示在标签行内。
- element.style 属性的值，是所有行内样式组成的一个样式对象。
- 样式对象可以继续点语法调用或更改 css 的行内样式属性，例如 width、height 等属性。

::: warning 注意 1
类似 background-color 这种复合属性的单一属性写法，是由多个单词组成的，要修改为驼峰命名方式书写 backgroundColor。
:::

::: warning 注意 2
通过样式属性设置宽高、位置的属性类型是字符串，需要加上 px 等单位。
:::

## 案例

1. 封装获取 id 函数的公共文件`common.js`

```js
// 定义一个获取元素的函数
function my$(id) {
  return document.getElementById(id);
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .bg {
        background-color: pink;
      }
    </style>
    <script src="common.js"></script>
  </head>
  <body>
    <input type="button" value="按钮" id="btn" />
    <div id="box" style="width: 100px" class="bg">文字</div>
    <script>
      // 获取元素
      var btn = my$("btn");
      var box = my$("box");
      // console.log(btn);
      // 1.更改类名的方式去更改样式
      // 2.根据对象的 style 属性去操作样式
      console.log(btn.style); //CSSStyleDeclaration {accentColor: '', additiveSymbols: '', alignContent: '', alignItems: '', alignSelf: '', …}

      // 元素对象的 style 属性的值是一个行内样式组成对象，对象内部封装了所有的行内的样式属性及属性值
      // 元素的样式属性对象可以继续打点调用，获取或设置相关的行内样式属性
      console.log(box.style); //CSSStyleDeclaration {accentColor: '', additiveSymbols: '', alignContent: '', alignItems: '', alignSelf: '', …}
      console.log(box.style.width);

      // 注意：如果使用的 css 属性名是复合属性的单一属性，需要更改为驼峰命名法
      console.log(box.style.backgroundColor); //提示：获取不到背景颜色。原因：style是获取不到内嵌式类名class属性名定义的css
      box.style.width = "200px";
    </script>
  </body>
</html>
```

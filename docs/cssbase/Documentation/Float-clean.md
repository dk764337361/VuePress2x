# 清除浮动
清除浮动的影响，有以下几种方法：

- 方法一：[给父元素添加height](../Documentation/Float-clean.md#给父元素添加height)、

- 方法二：[clear属性](../Documentation/Float-clean.md#clear属性)、

- 方法三：[隔墙法](../Documentation/Float-clean.md#隔墙法)、

- 方法四：[内墙法](../Documentation/Float-clean.md#内墙法)、

- 方法五：[伪类](../Documentation/Float-clean.md#伪类)、

- 方法五：[溢出隐藏](../Documentation/Float-clean.md#溢出隐藏)、

## 给父元素添加height

给标准流的父元素强制给一个合适的高度：
<img src="/images/css/055.png" style="width: 100%; display: inline-block; margin: 0 ;">

::: tip 提示
解决：父元素有了高度，前面的浮动不能影响后面元素的标准流位置和贴边。

问题：父元素高度不是自适应，一旦子元素高度变化，问题可能再次出现。

注意：这种height清除浮动的方法，只适合父盒子高度固定的情况。
:::

<img src="/images/css/056.png" style="width: 100%; display: inline-block; margin: 0 ;">

## clear属性

clear，清除。

作用：清除标签元素自身受到的前面的浮动元素的影响。

属性值：

​ left 清除前面左浮动带来的影响

​ right 清除前面右浮动带来的影响

​ both 清除前面所有浮动带来的影响

给标准流父元素添加 clear 属性，父元素不受前面浮动影响，不会再占有浮动让出的位置。

```css
clear: both;
```
::: tip 提示
解决：浮动元素影响后面元素标准流位置和贴边。

问题：父元素不能高度自适应，两个父元素之间如果有 margin 效果不正确。
:::

<img src="/images/css/057.png" style="width: 100%; display: inline-block; margin: 0 ;">

## 隔墙法

`外墙法：`**在两个大的父盒子之间，添加一个空的 `<div>` 标签，标签上带有 clear：both 属性。

<img src="/images/css/058.png" style="width: 100%; display: inline-block; margin: 0 ;">

::: tip 提示
解决：浮动影响后面元素标准流位置和贴边，模拟父元素间的距离。

问题：父元素没有高度自适应。
:::

```html{19-22,32}
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        clear: both;
        margin-bottom: 10px;
        width: 1000px;
        border: 10px solid black;
      }
      .box p {
        float: left;
        margin-right: 10px;
        width: 100px;
        height: 150px;
        background-color: skyblue;
      }
      .cl {
        clear: both;
        height: 10px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="cl"></div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  </body>
```

## 内墙法

在父元素内部，所有的浮动子元素后面添加一个空的 `<div>` 元素，标签高度为 0，添加 clear 属性。

<img src="/images/css/059.png" style="width: 100%; display: inline-block; margin: 0 ;">

::: tip 提示
解决：父元素高度自适应，浮动影响后面的元素位置和贴边。

缺点：浮动是 css 样式属性带来的问题，内墙法使用 HTML 结构去辅助解决问题，如果页面中浮动元素很多，需要添加多个没有语义的空标签，造成 HTML 结构的冗余。
:::

```html{19-21,30,37}
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        clear: both;
        margin-bottom: 10px;
        width: 1000px;
        border: 10px solid black;
      }
      .box p {
        float: left;
        margin-right: 10px;
        width: 100px;
        height: 150px;
        background-color: skyblue;
      }
      .cl {
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <div class="cl"></div>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <div class="cl"></div>
    </div>
  </body>
```

## 伪类
本质是使用伪类方法利用css代码书写一堵内墙。

伪类选择器：通过选中的标签添加伪类，去选中标签的某个状态或位置。

:after：这个伪类表示选中的是某个标签内部的最后的位置。

书写方法：前面必须加普通的选择器，后面连续书写伪类名称。

将伪类添加给一个选中父盒子的选择器后面，一般给需要清除浮动的父盒子设置一个clearfix的类名。

```html{18-24}
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        margin-bottom: 10px;
        width: 1000px;
        border: 10px solid black;
      }
      .box p {
        float: left;
        margin-right: 10px;
        width: 100px;
        height: 150px;
        background-color: skyblue;
      }
      .clearfix:after {
        content: "1"; /*添加一个文字内容*/
        display: block; /*将文字转为块级元素*/
        height: 0; /*将盒子高度固定为0，避免影响父盒子高度*/
        clear: both; /*清除前面浮动影响*/
        visibility: hidden; /*将创建的元素占位置隐藏*/
      }
    </style>
  </head>
  <body>
    <div class="box clearfix">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box clearfix">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  </body>
```
## 溢出隐藏
小偏方：给内部有浮动子元素的父元素添加溢出隐藏属性，可以解决浮动的所有问题。

```css
overflow: hidden;
```
补充：overflow 属性。

元素高度设置后，overflow：hidden；效果是将超过高度的部分直接隐藏。
<img src="/images/css/060.png" style="width: 30%; display: inline-block; margin: 0 ;">

元素高度没有设置时，如果元素同时设置了overflow：hidden属性，元素会自适应内容的高度。

<img src="/images/css/061.png" style="width: 30%; display: inline-block; margin: 0 ;">

高度自适应原因：一个元素没有设置高度，同时设置了溢出隐藏，浏览器在加载盒子尺寸时，遇到溢出隐藏浏览器会强制性去检索内部的子元素的高度，不论子元素是标准流还是浮动，都会将最高的高度作为父盒子高度加载。
```html{10}
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        margin-bottom: 10px;
        width: 1000px;
        border: 10px solid black;
        overflow: hidden;
      }
      .box p {
        float: left;
        margin-right: 10px;
        width: 100px;
        height: 150px;
        background-color: skyblue;
      }
      .demo {
        width: 100px;
        overflow: hidden;
        border: 2px solid black;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
```

浮动影响后面的元素：父元素有了高度后，可以管理住内部所有的浮动元素，不会延伸到后面标签中影响贴边。

::: details  总结：

如果父元素高度是固定的，建议使用 height 属性解决。

如果父元素高度需要自适应，建议使用 overflow 属性解决浮动问题。

:::

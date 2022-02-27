# CSS2.1
本章节为[拉钩大前端急训营](https://kaiwu.lagou.com/)学习笔记，感谢bobo与小夏

## 什么是FC？

Formatting Contexts，是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

### BFC块级格式化上下文

#### BFC布局规则：
- 内部的盒子会在垂直方向，一个个地放置；
- 盒子垂直方向的距离由margin决定，属于同一个BFC的两个响铃Box的上下margin会发生重叠；
- 每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此；
- BFC的区域不会与float重叠；
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此；
- 计算BFC的高度时，浮动元素也参与计算。

#### 产生BFC的方式：
- 根元素;
- float的属性不为none;
- position 为absolute 或fixed;
- display 为 inline-block ,table-cell,table-caption,flex;
- overflow 不为visible时,而是hidden。

### IFC行内格式化上下文

- IFC的line box(线框)高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响）
- IFC中的line box 一般左右都贴紧整个IFC，单是会因为float元素而扰乱。float元素会位于IFC与line box之间，使得line box宽度缩短。同个ifc下的多个line box高度会不同。IFC中是不可能由块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。
- 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-alingn则可以使其水平居中。
- 垂直居中：创建一个IFC，用其中一个最高的元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

### GFC 网格布局格式化上下文
GridLayout Formatting Contexts，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器上定义`网格定义行`和`网格定义列`属性在网格项目上定义`网格行`和`网格列`为每个网格项目定义位置和空间。

那么GFC有什么用呢？和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对其以及更为精细的渲染语义和控制。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .wrapper {
      display: grid;
      grid-template-columns: 100px 2fr 1fr;  /*模板的列的宽度*/
      grid-template-rows: 100px 100px 50px; /*模板的行的高度*/
    }
    .wrapper div {
      background-color: antiquewhite;
      border: 2px solid yellowgreen;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
  </div>
</body>
</html>
```
### FFC 自适应格式化上下文

Flex Formating Contexts,display值为flex或者inline-flex的元素将会生成自适应容器,多用于`移动端`。

Flex Box 由伸缩器和伸缩项目组成.通过设置元素的display属性为flex或者inline-flex可以得到一个伸缩容器.
设置flex的容器被渲染为一个块级元素,而设置为inline-flex的容器则渲染为一个行内元素。

伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩容器内的一切元素都不受影响。简单地说,Flex box定义了伸缩容器内伸缩项目该如何布局。

## 重构和重绘
<img src="/images/css/Refactor.png" style="width: 100%; display: block; margin: 0 auto;">


回流(Reflow)：render tree中的一部分（或全部）因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。
回流的时候，浏览器会使渲染树受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分分到屏幕中，该过程称为重绘。

重绘：render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响render 树重新布局的，
比如修改字体颜色。

他们的区别很大：

1：回流必将引起重绘，而重绘不一定会引起回流，比如只有颜色改天的时候就只会发生重绘而不会引起回流。

2：当页面布局和几何属性改变时就需要回流，比如：添加或者删除可见的DOM元素，元素位置改变，
元素尺寸改变--边距、填充、边框、宽度和高度，内容改变。

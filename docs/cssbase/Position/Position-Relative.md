# 相对定位

属性值：relative，相对的意思。

参考元素：标签加载的原始位置。

必须搭配偏移量属性才能发生位置移动。
```css
position: relative; 
left: 100px; 
top: 100px;
```
<img src="/images/css/080.png" style="width: 30%; display: block; margin: 0 ;">

## 相对定位的性质
相对定位的元素不脱离标签的原始状态（标准流、浮动），不会让出原来占有的位置。标签显示效果上，原位留坑，形影分离。


::: warning 注意
①：偏移量属性的值是区分正负的。
:::

正数：表示偏移方向与属性名方向相反。

负数：表示偏移方向与属性名方向相同。
```css
left: ‐50px;
top: ‐100px;
```
<img src="/images/css/081.png" style="width: 30%; display: block; margin: 0 ;">


::: warning 注意
②：同一个方向，不能设置两个偏移量属性，如果水平方向同时设置了 left 和 right 属性，只会加载 left 属性。垂直方向只加载 top 属性
:::

```css
left: ‐50px; 
top: ‐100px; 
right: ‐50px; 
bottom: ‐50px;
```
<img src="/images/css/081.png" style="width: 30%; display: block; margin: 0 ;">

建议：书写时从水平方向和垂直方向各挑一个属性进行组合。

::: warning 注意
③：由于相对定位的参考元素是自身，left 的正值等价于 right 的负值，top 的正值等价于 bottom 的负值。
:::

为了方便记忆，可以只使用 left、top 组合。
```css
right: ‐50px; 
bottom: ‐50px;
```
等价于：
```css
left: 50px; 
top: 50px;
```

<img src="/images/css/082.png" style="width: 30%; display: block; margin: 0 ;">

## 相对定位的应用

<img src="/images/css/083.png" style="width: 100%; display: block; margin: 0 ;">
<img src="/images/css/084.png" style="width: 30%; display: block; margin: 0 ;">

::: details 点击查看代码
```html{27-32}
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        width: 1080px;
        height: 50px;
        margin: 100px auto;
        background-color: skyblue;
      }
      .box ul li {
        list-style: none;
        float: left;
        width: 180px;
        height: 50px;
      }
      .box ul li a {
        text-align: center;
        display: block;
        text-decoration: none;
        width: 180px;
        height: 50px;
        font: 16px/50px "微软雅黑";
        color: black;
      }
      .box ul li a:hover {
        border-top: 4px solid gold;
        top: -4px;
        width: 180px;
        position: relative;
      }
      .box2 {
        margin: 10px auto;
        width: 300px;
        border: 2px solid black;
        text-indent: 2em;
        font: 16px/50px "微软雅黑";

      }
      .box2 span {
        position: relative;
        top: -10px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <ul>
        <li><a href="">首页</a></li>
        <li><a href="">首页</a></li>
        <li><a href="">首页</a></li>
        <li><a href="">首页</a></li>
        <li><a href="">首页</a></li>
        <li><a href="">首页</a></li>
      </ul>
    </div>
    <div class="box2">
      <p>
        新闻标题新闻标题新闻标题<span>[1]</span>新闻标题新闻标题新闻标题新闻标题新闻标题新闻
        标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题
        新闻标题新闻标题新闻标题新闻标题
      </p>
    </div>
```
:::
# 显示模式display

标准流中的元素有自己默认的浏览器加载模式，但是加载模式不是一成不变的，后期可以通过 display 属性更改一个标签的显示模式。

属性值：元素根据属性值不同，可以加载对应元素等级的显示模式的特点。

block 砖、块的意思，表示元素要以块级元素模式加载，具备块级特点

| 属性值       |                                                  |
| ------------ | ------------------------------------------------ |
| block        | 表示元素要以块级元素模式加载，具备块级特点       |
| inline       | 表示元素要以行级元素模式加载，具备行级特点       |
| inline-block | 表示元素要以行内块元素模式加载，具备行内块特点   |
| none         | 表示标签及内部内容直接隐藏，让出原有标准流的位置 |

## block

<img src="/images/css/032.png" style="width: 30%; display: block; margin: 0 ;">

```css{7}
div {
  width: 200px;
  height: 200px;
  background-color: pink;
}
span {
  display: block;
  width: 200px;
  height: 200px;
  background-color: rgb(250, 226, 14);
}
```

## inline

![](/images/css/033.png)

```css{2}
div {
  display: inline;
  width: 200px;
  height: 200px;
  background-color: pink;
}
span {
  width: 200px;
  height: 200px;
  background-color: rgb(250, 226, 14);
}
```

## inline-block

<img src="/images/css/032.png" style="width: 30%; display: block; margin: 0 ;">

```html{8,16}
    <style>
      div {
        width: 200px;
        height: 200px;
        background-color: pink;
      }
      span {
        display: inline-block;
        width: 200px;
        height: 200px;
        background-color: rgb(250, 226, 14);
      }
    </style>
  </head>
  <body>
    <div>div</div><span> span </span>
  </body>
```

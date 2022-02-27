# 浮动float

浮动是一种脱离标准文档流的一种方式，让同一级的元素可以在同一排显示

| 属性值 |     |
| ------ | --- |
| left   |     |
| right  |     |

## 没有设置浮动的情况：

![](/images/css/034.png)

```html
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        div {
            width: 1000px;
            height: 100px;
            border: 2px solid rebeccapurple;
        }
        div p {
            width: 100px;
            height: 100px;
            border: 2px solid red;
            background-color: rgb(146, 250, 9);
        }
    </style>
</head>
<body>
    <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
    </div>
</body>
```

## 设置了浮动的情况

![](/images/css/035.png)
![](/images/css/036.png)

```html{12,13}
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        div {
            width: 1000px;
            height: 100px;
            border: 2px solid rebeccapurple;
        }
        div p {
            float: right;
            /* float: left; */
            width: 100px;
            height: 100px;
            border: 2px solid red;
            background-color: rgb(146, 250, 9);
        }
    </style>
</head>
<body>
    <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
    </div>
</body>
```

## 总结浮动性质

为了更好的利用浮动进行布局，我们需要了解浮动相关的性质。

浮动的元素脱离标准流

- 标准文档流特点：区分行块。

- 块级元素：可以设置宽高，必须独占一行。

- 行内元素：不能设置宽高，可以并排一行。


::: warning
浮动的元素脱离了标准流的限制，具备`行块二象性`（行内块元素），浮动的元素可以设置宽高，还可以并排一行，而且不会有空白折叠现象，如果元素不设置宽高，可以被元素内容自动撑开。
:::

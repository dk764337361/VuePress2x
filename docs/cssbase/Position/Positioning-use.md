# 压盖效果



::: tip
所有的定位类型都可以实现压盖效果。

由于绝对定位的元素脱标，不占标准流位置，压盖效果更彻底，实际工作中，`常见的是`绝对定位制作的压盖。
:::

```html
    <div class="box">                               相对定位
        <img src="\test\images\logo.jpg" alt="">    标准流-子级 
        <p></p>                                     P标签压盖img
    </div>
```

## 压盖
<img src="/images/css/098.png" style="width: 50%; display: block; margin: 0 ;">

::: details

```css{20-22}
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        .box{
            border: 10px solid gold ;
            width: 400px;
            position: relative;
            margin: 100px auto;
        }
        img {
            width: 200px;
            height: 200px;
        }
       .box p{
            background-color: pink;
            width: 100px;
            height: 100px;
            top:  50px;
            left: 50px;
            position: absolute;
        }

```
::: 

## 居中
第一步：在居中的方向使用一个偏移量属性，例如 left，设置属性值为 50%。导致图片的左顶点移动到参考元素的中心位置。

百分比形式的属性值，百分百参考的是参考元素的 border 以内的宽度。

第一步：

```css
left: 50%;
```
<img src="/images/css/099.png" style="width: 50%; display: block; margin: 0 ;">

第二步：给绝对定位的子盒子设置一个同方向的 margin，例如 margin-­left，属性值为负的自身宽度的一半。

```css
margin-left: -50px;
```

<img src="/images/css/100.png" style="width: 50%; display: block; margin: 0 ;">

::: details
```css{20-22}
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        .box{
            border: 10px solid gold ;
            width: 400px;
            position: relative;
            margin: 100px auto;
        }
        img {
            width: 200px;
            height: 200px;
        }
       .box p{
            background-color: pink;
            width: 100px;
            height: 100px;
            top:  25%;
            left: 50%;
            margin-left: -50px;
            position: absolute;
        }
    </style>
</head>
<body>
    <div class="box">
        <img src="\test\images\logo.jpg" alt="">
        <p></p>
    </div>
</body>
```
::: 

::: tip
注意：不论子盒子的宽度是否比参考元素更宽，都能使用以上方法进行居中设置。
:::


## 扩展应用

①解决标准流中，宽的子盒子在窄的父盒子中的居中，可以设置大的子盒子相对定位，利用相对定位居中的方法进行居中。
<img src="/images/css/101.png" style="width: 50%; display: block; margin: 0 ;">

::: details
```css{16-18}
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        .box{
            border: 5px solid red ;
            width: 200px;
            height: 100px;
            margin: 100px auto;
        }
       .box p{
            background-color: pink;
            width: 500px;
            height: 100px;
            left: 50%;
            margin-left: -250px;
            position: relative;
        }
    </style>
    <div class="box">
        <p></p>
    </div>
```
::: 

②浮动的元素居中，在不改变原始浮动状态情况下，可以利用相对定位居中方法。
<img src="/images/css/102.png" style="width: 50%; display: block; margin: 0 ;">

::: details
```css{17-19}
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        .box{
            border: 5px solid red ;
            width: 200px;
            height: 100px;
            position: relative;
            margin: 100px auto;
        }
       .box p{
            background-color: pink;
            width: 100px;
            height: 100px;
            left: 250px;
            float: left;
            position: relative;
        }
    </style>
    <div class="box">
        <p></p>
    </div>
```
::: 